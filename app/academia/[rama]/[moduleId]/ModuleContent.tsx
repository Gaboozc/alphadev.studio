'use client'

import Link from 'next/link'
import type { LessonType, ModuleMeta } from '../../types'
import { lessonHref, moduleHref, ramaOfModule } from '../../ramas'
import { useProgress } from '../../hooks/useProgress'
import AcadIcon, { type AcadIconName } from '../../components/AcadIcon'
import { ACAD_COPY } from '../../copy'
import {
  acentoDeRama,
  estadoPieza,
  formatoContador,
  leccionContinuar,
  tipoDePieza,
} from '@/lib/academia/ui'

const LEYENDA_TIPOS: LessonType[] = [
  'reading',
  'video',
  'practice',
  'exam',
  'project',
  'audio',
]

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

interface Props {
  module: ModuleMeta
  ramaModules: ModuleMeta[]
  /** @deprecated prefer ramaModules; se mantiene por compatibilidad de props */
  trackModules?: ModuleMeta[]
}

export default function ModuleContent({ module: mod, ramaModules }: Props) {
  const { isCompleted, getModuleProgress, hydrated } = useProgress()
  const progress = getModuleProgress(mod)
  const rama = ramaOfModule(mod)
  const accent = acentoDeRama(rama.id)
  const soloUno = ramaModules.length === 1

  const continueId = hydrated
    ? leccionContinuar(mod.lessons, (id) => isCompleted(mod.id, id))
    : mod.lessons[0]?.id ?? null
  const continueLesson = mod.lessons.find((l) => l.id === continueId)

  // Tipos presentes en este módulo (leyenda)
  const tiposPresentes = LEYENDA_TIPOS.filter((t) =>
    mod.lessons.some((l) => l.type === t),
  )

  return (
    <div data-academia data-accent={accent} className="acad-temario">
      <p className="acad-lesson__meta" style={{ marginBottom: '0.5rem' }}>
        {ACAD_COPY.temario}
      </p>
      <h1 className="acad-lesson__title" style={{ marginTop: 0 }}>
        Unidad {mod.number}: {mod.title}
      </h1>

      {mod.guidingQuestion ? (
        <div className="acad-guia">
          <p className="acad-guia__label">{ACAD_COPY.preguntaGuiaLabel}</p>
          <p className="acad-guia__q">{mod.guidingQuestion}</p>
        </div>
      ) : null}

      <p style={{ color: 'var(--acad-ink-2)', maxWidth: '34em' }}>{mod.description}</p>

      {hydrated && (
        <p className="acad-v3-chip" style={{ marginTop: '1rem' }}>
          {ACAD_COPY.piezas(progress.done, progress.total) ??
            `${progress.done}/${progress.total}`}
        </p>
      )}

      {tiposPresentes.length > 0 && (
        <div className="acad-temario__legend" aria-label="Tipos de pieza">
          {tiposPresentes.map((t) => {
            const tipo = tipoDePieza(t)
            return (
              <span key={t}>
                <AcadIcon name={tipo.icon as AcadIconName} size={16} />
                {tipo.label}
              </span>
            )
          })}
        </div>
      )}

      {continueLesson && (
        <div className="acad-temario__continue">
          <Link
            href={lessonHref(mod, continueLesson.id)}
            className="acad-v3-btn acad-v3-btn--primary"
          >
            {ACAD_COPY.continuar(continueLesson.title)}
          </Link>
        </div>
      )}

      {ramaModules.map((m) => {
        const mp = getModuleProgress(m)
        const piezasLabel = formatoContador(mp.done, mp.total, 'piezas')
        const modDone = hydrated && mp.total > 0 && mp.done === mp.total
        const modCurso =
          hydrated && mp.done > 0 && mp.done < mp.total
        const est = estadoPieza(!!modDone, !!modCurso)
        const isCurrentMod = m.id === mod.id
        const open = soloUno || isCurrentMod

        const body = (
          <div className="acad-temario__mod-body">
            {[...m.lessons]
              .sort((a, b) => {
                // Checkpoint (exam) y proyecto al final del temario si existen
                const rank = (t: string) =>
                  t === 'project' ? 2 : t === 'exam' ? 1 : 0
                return rank(a.type) - rank(b.type)
              })
              .map((lesson) => {
              const tipo = tipoDePieza(lesson.type)
              const done = isCompleted(m.id, lesson.id)
              const enCurso = isCurrentMod && !done && lesson.id === continueId
              const estL = estadoPieza(done, !!enCurso)
              const isCurrent = isCurrentMod && lesson.id === continueId

              return (
                <Link
                  key={lesson.id}
                  id={`pieza-${lesson.id}`}
                  href={lessonHref(m, lesson.id)}
                  className={`acad-temario__pieza${isCurrent ? ' is-current' : ''}`}
                >
                  <AcadIcon name={tipo.icon as AcadIconName} size={20} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600 }}>{lesson.title}</div>
                    <div
                      className="acad-index__item-type"
                      style={{ marginTop: '0.25rem' }}
                    >
                      <AcadIcon name={tipo.icon as AcadIconName} size={16} />
                      {tipo.label}
                    </div>
                    <div className="acad-index__row">
                      {lesson.tasksCount > 0 &&
                        formatoContador(0, lesson.tasksCount, 'comprobaciones rápidas') && (
                          <span className="acad-v3-chip">
                            {formatoContador(
                              0,
                              lesson.tasksCount,
                              'comprobaciones rápidas',
                            )}
                          </span>
                        )}
                      <span className={`acad-index__state${done ? ' is-done' : ''}`}>
                        <AcadIcon name={estadoIcon(estL)} size={16} />
                        {estadoLabel(estL)}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}

          </div>
        )

        if (soloUno) {
          return (
            <div key={m.id} style={{ border: '1px solid var(--acad-line-strong)', borderRadius: 12, marginBottom: '0.75rem', background: 'var(--acad-card)' }}>
              <div style={{ padding: '1rem 1.125rem', display: 'flex', gap: '0.75rem', alignItems: 'center', fontWeight: 600 }}>
                <span style={{ flex: 1 }}>
                  Unidad {m.number}: {m.title}
                </span>
                {piezasLabel && <span className="acad-v3-chip">{piezasLabel}</span>}
                <span className={`acad-index__state${modDone ? ' is-done' : ''}`}>
                  <AcadIcon name={estadoIcon(est)} size={16} />
                  {estadoLabel(est)}
                </span>
              </div>
              {body}
            </div>
          )
        }

        return (
          <details key={m.id} open={open}>
            <summary>
              <span style={{ flex: 1 }}>
                Unidad {m.number}: {m.title}
              </span>
              {piezasLabel && <span className="acad-v3-chip">{piezasLabel}</span>}
              <span className={`acad-index__state${modDone ? ' is-done' : ''}`}>
                <AcadIcon name={estadoIcon(est)} size={16} />
                {estadoLabel(est)}
              </span>
            </summary>
            {body}
          </details>
        )
      })}

      <p style={{ marginTop: '2rem' }}>
        <Link href="/academia" style={{ color: 'var(--acad-ink-2)' }}>
          ← Academia
        </Link>
        {' · '}
        <Link href={moduleHref(mod)} style={{ color: 'var(--acad-ink-2)' }}>
          {rama.label}
        </Link>
      </p>
    </div>
  )
}
