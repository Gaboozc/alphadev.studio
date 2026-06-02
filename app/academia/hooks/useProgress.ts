'use client'

import { useState, useEffect, useCallback } from 'react'
import { MODULES } from '../modules'

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

  const getModuleProgress = useCallback(
    (moduleId: string): { done: number; total: number; percent: number } => {
      const mod = MODULES.find((m) => m.id === moduleId)
      if (!mod) return { done: 0, total: 0, percent: 0 }
      const total = mod.lessons.length
      const done = mod.lessons.filter((l) => completed?.[l.id]).length
      return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) }
    },
    [completed],
  )

  const getGlobalProgress = useCallback((): {
    done: number
    total: number
    percent: number
  } => {
    const total = MODULES.reduce((acc, m) => acc + m.lessons.length, 0)
    const done = MODULES.reduce(
      (acc, m) => acc + m.lessons.filter((l) => completed?.[l.id]).length,
      0,
    )
    return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) }
  }, [completed])

  const hydrated = completed !== null

  return { isCompleted, toggleLesson, getModuleProgress, getGlobalProgress, hydrated }
}
