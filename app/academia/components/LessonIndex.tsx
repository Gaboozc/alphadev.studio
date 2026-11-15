'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import AcadIcon, { type AcadIconName } from './AcadIcon'
import { ACAD_COPY } from '../copy'
import { lessonHref } from '../ramas'
import type { LessonMeta, ModuleMeta } from '../types'
import {
  estadoPieza,
  formatoContador,
  tipoDePieza,
} from '@/lib/academia/ui'

function estadoLabel(e: ReturnType<typeof estadoPieza>): string {
  if (e === 'completada') return ACAD_COPY.completada
  if (e === 'en_curso') return ACAD_COPY.enCurso
  return ACAD_COPY.sinEmpezar
}

function estadoIcon(e: ReturnType<typeof estadoPieza>): AcadIconName {
  if (e === 'completada') return 'circle-check-big'
  if (e === 'en_curso') return 'circle-dot'
  return 'circle-dashed'
}

function Item({
  mod,
  lesson,
  currentId,
  done,
  enCurso,
}: {
  mod: ModuleMeta
  lesson: LessonMeta
  currentId: string
  done: boolean
  enCurso: boolean
}) {
  const tipo = tipoDePieza(lesson.type)
  const estado = estadoPieza(done, enCurso)
  const isCurrent = lesson.id === currentId
  const contadores: string[] = []
  if (lesson.tasksCount > 0) {
    const c = formatoContador(0, lesson.tasksCount, 'comprobaciones rápidas')
    if (c) contadores.push(c)
  }

  return (
    <Link
      href={lessonHref(mod, lesson.id)}
      className={`acad-index__item${isCurrent ? ' is-current' : ''}`}
      id={isCurrent ? undefined : `pieza-${lesson.id}`}
    >
      <AcadIcon name={tipo.icon as AcadIconName} size={16} />
      <div className="acad-index__item-body">
        <p className="acad-index__item-title">{lesson.title}</p>
        <div className="acad-index__item-type">
          <span>{tipo.label}</span>
        </div>
        <div className="acad-index__row">
          {contadores.map((c) => (
            <span key={c} className="acad-v3-chip">
              {c}
            </span>
          ))}
          <span className={`acad-index__state${done ? ' is-done' : ''}`}>
            <AcadIcon name={estadoIcon(estado)} size={16} />
            {estadoLabel(estado)}
          </span>
        </div>
      </div>
    </Link>
  )
}

function ListaPiezas({
  mod,
  currentId,
  isCompleted,
}: {
  mod: ModuleMeta
  currentId: string
  isCompleted: (moduleId: string, lessonId: string) => boolean
}) {
  return (
    <>
      {mod.lessons.map((lesson) => {
        const done = isCompleted(mod.id, lesson.id)
        return (
          <Item
            key={lesson.id}
            mod={mod}
            lesson={lesson}
            currentId={currentId}
            done={done}
            enCurso={!done && lesson.id === currentId}
          />
        )
      })}
    </>
  )
}

export function LessonIndexPanel({
  mod,
  currentId,
  isCompleted,
  titleId,
}: {
  mod: ModuleMeta
  currentId: string
  isCompleted: (moduleId: string, lessonId: string) => boolean
  titleId?: string
}) {
  return (
    <nav aria-labelledby={titleId}>
      <h2 id={titleId} className="acad-index__title">
        {ACAD_COPY.indiceTitulo(mod.number)}
      </h2>
      <ListaPiezas mod={mod} currentId={currentId} isCompleted={isCompleted} />
    </nav>
  )
}

export function LessonIndexSheet({
  open,
  onClose,
  mod,
  currentId,
  isCompleted,
  returnFocusRef,
}: {
  open: boolean
  onClose: () => void
  mod: ModuleMeta
  currentId: string
  isCompleted: (moduleId: string, lessonId: string) => boolean
  returnFocusRef: React.RefObject<HTMLElement | null>
}) {
  const titleId = useId()
  const sheetRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  // Abierto = muestra todas las secciones; plegado = botón "Ver las n…"
  const [expanded, setExpanded] = useState(true)
  const n = mod.lessons.length

  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    const returnEl = returnFocusRef.current
    closeRef.current?.focus()

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !sheetRef.current) return
      const focusables = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      const target = returnEl ?? prev
      target?.focus?.()
    }
  }, [open, onClose, returnFocusRef])

  if (!open) return null

  return (
    <>
      <div
        className="acad-lesson__backdrop is-open"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={sheetRef}
        className="acad-lesson__sheet is-open"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="acad-lesson__sheet-head">
          <h2 id={titleId} className="acad-index__title" style={{ margin: 0 }}>
            {ACAD_COPY.indiceTitulo(mod.number)}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="acad-v3-btn acad-v3-btn--secondary"
            aria-label={ACAD_COPY.cerrarIndice}
            onClick={onClose}
          >
            <AcadIcon name="x" size={20} />
          </button>
        </div>

        {!expanded ? (
          <button
            type="button"
            className="acad-v3-btn acad-v3-btn--secondary acad-index__expand"
            onClick={() => setExpanded(true)}
          >
            {ACAD_COPY.verSecciones(n)}
          </button>
        ) : (
          <>
            <div ref={listRef} className="acad-lesson__sheet-body">
              <ListaPiezas
                mod={mod}
                currentId={currentId}
                isCompleted={isCompleted}
              />
            </div>
            <button
              type="button"
              className="acad-v3-btn acad-v3-btn--secondary acad-index__expand"
              onClick={() => setExpanded(false)}
            >
              {ACAD_COPY.plegarIndice}
            </button>
          </>
        )}
      </div>
    </>
  )
}
