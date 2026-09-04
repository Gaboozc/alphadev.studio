'use client'

// Este hook NO importa el contenido de los módulos a propósito: al ser de
// cliente, hacerlo metería el texto de todas las lecciones en el paquete de
// JavaScript. Recibe las lecciones por parámetro desde quien ya las tiene.

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'alphadev-academia-progress'

type CompletedSet = Record<string, boolean>

function readStorage(): CompletedSet {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CompletedSet) : {}
  } catch {
    return {}
  }
}

function writeStorage(data: CompletedSet): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Storage full or unavailable — fail silently
  }
}

export function useProgress() {
  // null = not yet hydrated from localStorage (avoids SSR mismatch)
  const [completed, setCompleted] = useState<CompletedSet | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompleted(readStorage())
  }, [])

  const toggleLesson = useCallback((lessonId: string) => {
    setCompleted((prev) => {
      const current = prev ?? {}
      const next = { ...current, [lessonId]: !current[lessonId] }
      writeStorage(next)
      return next
    })
  }, [])

  const isCompleted = useCallback(
    (lessonId: string): boolean => {
      return completed?.[lessonId] ?? false
    },
    [completed],
  )

  // Recibe las lecciones del módulo, no su id: así el hook no necesita conocer
  // el catálogo y el contenido se queda en el servidor.
  const getModuleProgress = useCallback(
    (lessons: { id: string }[]): { done: number; total: number; percent: number } => {
      const total = lessons.length
      const done = lessons.filter((l) => completed?.[l.id]).length
      return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) }
    },
    [completed],
  )

  const hydrated = completed !== null

  return { isCompleted, toggleLesson, getModuleProgress, hydrated }
}
