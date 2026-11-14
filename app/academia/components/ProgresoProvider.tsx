'use client'

// Un solo estado de progreso para toda la Academia. El índice (lessonId →
// moduleIds) llega del servidor; aquí solo se lee/escribe localStorage.

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  clave,
  resolver,
  type EstadoV2,
  type Indice,
} from '@/lib/academia/progreso'

const STORAGE_V1 = 'alphadev-academia-progress'
const STORAGE_V2 = 'alphadev-academia-progress-v2'

type ProgressApi = {
  isCompleted: (moduleId: string, lessonId: string) => boolean
  toggleLesson: (moduleId: string, lessonId: string) => void
  getModuleProgress: (mod: {
    id: string
    lessons: { id: string }[]
  }) => { done: number; total: number; percent: number }
  hydrated: boolean
}

export const ProgresoContext = createContext<ProgressApi | null>(null)

function leerRaw(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function escribirV2(estado: EstadoV2): void {
  try {
    localStorage.setItem(STORAGE_V2, JSON.stringify(estado))
  } catch {
    // Storage full or unavailable — follow in memory
  }
}

export default function ProgresoProvider({
  indice,
  children,
}: {
  indice: Indice
  children: ReactNode
}) {
  const [estado, setEstado] = useState<EstadoV2 | null>(null)

  useEffect(() => {
    const rawV1 = leerRaw(STORAGE_V1)
    const rawV2 = leerRaw(STORAGE_V2)
    const ahora = new Date().toISOString()
    const { estado: siguiente, escribir } = resolver(rawV1, rawV2, indice, ahora)
    if (escribir) escribirV2(siguiente)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEstado(siguiente)
  }, [indice])

  const isCompleted = useCallback(
    (moduleId: string, lessonId: string): boolean => {
      return estado?.done[clave(moduleId, lessonId)] === true
    },
    [estado],
  )

  const toggleLesson = useCallback((moduleId: string, lessonId: string) => {
    setEstado((prev) => {
      const base: EstadoV2 = prev ?? {
        version: 2,
        done: {},
        migratedFromV1: false,
        migratedAt: new Date().toISOString(),
      }
      const k = clave(moduleId, lessonId)
      const nextDone = { ...base.done }
      if (nextDone[k]) {
        delete nextDone[k]
      } else {
        nextDone[k] = true
      }
      const siguiente: EstadoV2 = { ...base, done: nextDone }
      escribirV2(siguiente)
      return siguiente
    })
  }, [])

  const getModuleProgress = useCallback(
    (mod: {
      id: string
      lessons: { id: string }[]
    }): { done: number; total: number; percent: number } => {
      const total = mod.lessons.length
      const done = mod.lessons.filter(
        (l) => estado?.done[clave(mod.id, l.id)] === true,
      ).length
      return {
        done,
        total,
        percent: total === 0 ? 0 : Math.round((done / total) * 100),
      }
    },
    [estado],
  )

  const value = useMemo<ProgressApi>(
    () => ({
      isCompleted,
      toggleLesson,
      getModuleProgress,
      hydrated: estado !== null,
    }),
    [isCompleted, toggleLesson, getModuleProgress, estado],
  )

  return (
    <ProgresoContext.Provider value={value}>{children}</ProgresoContext.Provider>
  )
}
