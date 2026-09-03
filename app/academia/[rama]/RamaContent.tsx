'use client'

import Link from 'next/link'
import Icon from '@/components/Icon'
import {
  RAMAS,
  TRACK_META,
  countLessons,
  isCapstone,
  moduleHref,
  type Rama,
} from '../ramas'
import { modulesOfRama, modulesOfTrack } from '../queries'
import { useProgress } from '../hooks/useProgress'

export default function RamaContent({ ramaId }: { ramaId: Rama }) {
  const { getModuleProgress, hydrated } = useProgress()
  const rama = RAMAS.find((r) => r.id === ramaId)!
  const allMods = modulesOfRama(ramaId)

  let done = 0
  let total = 0
  if (hydrated) {
    allMods.forEach((m) => {
      const p = getModuleProgress(m.id)
      done += p.done
      total += p.total
    })
  }
  const percent = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div className="acad-page">
      <div className="acad-wrap">
        <Link href="/academia" className="acad-crumb">
          <span style={{ display: 'flex', transform: 'rotate(180deg)' }}>
            <Icon name="arrowRight" size={14} />
          </span>
          Todas las ramas
        </Link>

        {/* ── Encabezado de la rama ── */}
        <header className="acad-head">
          <p className="eyebrow">
            {rama.familia === 'construir' ? 'Construir' : 'Crecer'}
          </p>
          <h1>{rama.label}</h1>
          <p>{rama.description}</p>

          <div className="acad-stats">
            <div>
              <span className="acad-stat-num">{rama.tracks.length}</span>
              <span className="acad-stat-label">Áreas</span>
            </div>
            <div>
              <span className="acad-stat-num">{allMods.length}</span>
              <span className="acad-stat-label">Módulos</span>
            </div>
            <div>
              <span className="acad-stat-num">{countLessons(allMods)}</span>
              <span className="acad-stat-label">Lecciones</span>
            </div>
            {hydrated && percent > 0 && (
              <div>
                <span className="acad-stat-num">{percent}%</span>
                <span className="acad-stat-label">Completado</span>
              </div>
            )}
          </div>
        </header>

        {/* ── Un bloque por área de estudio ── */}
        {rama.tracks.map((track) => {
          const meta = TRACK_META[track]
          const mods = modulesOfTrack(track)

          return (
            <section key={track} className="acad-area">
              <div className="acad-area-head">
                <div className="acad-area-icon">
                  <Icon name={meta.icon} size={18} />
                </div>
                <div>
                  <h2>{meta.label}</h2>
                  <p>{meta.description}</p>
                </div>
              </div>

              <div className="acad-mods">
                {mods.map((mod, index) => {
                  const p = getModuleProgress(mod.id)
                  const complete = hydrated && p.total > 0 && p.done === p.total

                  return (
                    <Link
                      key={mod.id}
                      href={moduleHref(mod)}
                      className={`acad-mod${isCapstone(mod) ? ' acad-mod-capstone' : ''}`}
                    >
                      <div className={`acad-mod-num${complete ? ' acad-mod-num-done' : ''}`}>
                        {complete ? <Icon name="check" size={14} /> : index + 1}
                      </div>

                      <div className="acad-mod-body">
                        <h3>{mod.title}</h3>
                        <p>{mod.description}</p>

                        {hydrated && p.done > 0 && (
                          <div className="acad-bar" style={{ marginBottom: '0.55rem' }}>
                            <span style={{ width: `${p.percent}%` }} />
                          </div>
                        )}

                        <div className="acad-mod-meta">
                          {isCapstone(mod) && (
                            <span className="acad-badge" style={{ marginRight: '0.5rem' }}>
                              Capstone
                            </span>
                          )}
                          {mod.lessons.length} lecciones · {mod.duration}
                          {hydrated && p.done > 0 ? ` · ${p.done}/${p.total} hechas` : ''}
                        </div>
                      </div>

                      <span className="acad-mod-arrow">
                        <Icon name="arrowRight" size={18} />
                      </span>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
