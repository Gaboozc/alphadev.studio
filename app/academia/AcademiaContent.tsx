'use client'

import Link from 'next/link'
import Icon from '@/components/Icon'
import { MODULES, LEARNING_PATHS, RETOS } from './modules'
import { FAMILIAS, RAMAS, TRACK_META, countLessons, ramaHref, ramasOfFamilia } from './ramas'
import { modulesOfRama } from './queries'
import { useProgress } from './hooks/useProgress'

export default function AcademiaContent() {
  const { getModuleProgress, hydrated } = useProgress()

  const totalLessons = countLessons(MODULES)
  const retosActivos = RETOS.filter((r) => r.status === 'activo').length

  return (
    <div className="acad-page">
      <div className="acad-wrap">

        {/* ── Encabezado ── */}
        <header className="acad-head">
          <p className="eyebrow">AlphaDev Studios — Estudio privado</p>
          <h1>Academia</h1>
          <p>
            Seis ramas de estudio. Elige por dónde entrar y avanza a tu ritmo:
            cada rama guarda tu progreso módulo por módulo.
          </p>

          <div className="acad-stats">
            <div>
              <span className="acad-stat-num">{RAMAS.length}</span>
              <span className="acad-stat-label">Ramas</span>
            </div>
            <div>
              <span className="acad-stat-num">{MODULES.length}</span>
              <span className="acad-stat-label">Módulos</span>
            </div>
            <div>
              <span className="acad-stat-num">{totalLessons}</span>
              <span className="acad-stat-label">Lecciones</span>
            </div>
            <div>
              <span className="acad-stat-num">{LEARNING_PATHS.length}</span>
              <span className="acad-stat-label">Rutas</span>
            </div>
          </div>
        </header>

        {/* ── Rutas y retos ── */}
        <section className="acad-feature-grid" style={{ marginBottom: '3.5rem' }}>
          <Link href="/academia/rutas" className="acad-feature">
            <div className="acad-feature-top">
              <Icon name="bookOpen" size={18} />
              <span>Rutas de aprendizaje</span>
            </div>
            <h3>¿No sabes por dónde empezar?</h3>
            <p>
              {LEARNING_PATHS.length} recorridos armados que cruzan varias ramas y te
              llevan de cero a un perfil completo, en orden.
            </p>
          </Link>

          <Link href="/academia/retos" className="acad-feature">
            <div className="acad-feature-top">
              <Icon name="flag" size={18} />
              <span>Retos</span>
            </div>
            <h3>Aprende construyendo algo real</h3>
            <p>
              {RETOS.length} retos con fecha, entregable concreto y criterios de
              evaluación.{retosActivos > 0 ? ` ${retosActivos} activo${retosActivos > 1 ? 's' : ''} ahora.` : ''}
            </p>
          </Link>
        </section>

        {/* ── Familias → ramas ── */}
        {FAMILIAS.map((familia) => (
          <section key={familia.id} className="acad-familia">
            <div className="acad-familia-head">
              <h2>{familia.label}</h2>
              <span>{familia.description}</span>
            </div>

            <div className="acad-ramas">
              {ramasOfFamilia(familia.id).map((rama) => {
                const mods = modulesOfRama(rama.id)

                let done = 0
                let total = 0
                if (hydrated) {
                  mods.forEach((m) => {
                    const p = getModuleProgress(m.id)
                    done += p.done
                    total += p.total
                  })
                }
                const percent = total > 0 ? Math.round((done / total) * 100) : 0

                return (
                  <Link key={rama.id} href={ramaHref(rama)} className="acad-rama">
                    <div className="acad-rama-icon">
                      <Icon name={rama.icon} size={22} />
                    </div>

                    <h3>{rama.label}</h3>
                    <p>{rama.description}</p>

                    <div className="acad-rama-areas">
                      {rama.tracks.map((t) => (
                        <span key={t} className="acad-chip">{TRACK_META[t].label}</span>
                      ))}
                    </div>

                    {hydrated && percent > 0 && (
                      <div className="acad-bar">
                        <span style={{ width: `${percent}%` }} />
                      </div>
                    )}

                    <div className="acad-rama-foot">
                      <span>
                        {mods.length} módulos · {countLessons(mods)} lecciones
                        {hydrated && percent > 0 ? ` · ${percent}%` : ''}
                      </span>
                      <span className="acad-go">
                        Entrar <Icon name="arrowRight" size={14} />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
