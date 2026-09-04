'use client'

import Link from 'next/link'
import Icon from '@/components/Icon'
import type { ModuleMeta } from './types'
import { FAMILIAS, RAMAS, RAMA_OF_TRACK, TRACK_META, ramaHref, ramasOfFamilia } from './ramas'
import { useProgress } from './hooks/useProgress'

interface Props {
  catalogo: ModuleMeta[]
  totalLecciones: number
  rutas: number
  retos: number
  retosActivos: number
}

// Todo llega ya calculado desde el servidor: este componente nunca ve el
// contenido de las lecciones.
export default function AcademiaContent({ catalogo, totalLecciones, rutas, retos, retosActivos }: Props) {
  const { getModuleProgress, hydrated } = useProgress()

  const modulosDeRama = (rama: string) => catalogo.filter((m) => RAMA_OF_TRACK[m.track] === rama)
  const cuentaLecciones = (ms: ModuleMeta[]) => ms.reduce((a, m) => a + m.lessons.length, 0)

  return (
    <div className="acad-page">
      <div className="acad-wrap">

        {/* ── Encabezado ── */}
        <header className="acad-head">
          <p className="eyebrow">AlphaDev Studios — Estudio privado</p>
          <h1>Academia</h1>
          <p>
            {RAMAS.length} ramas de estudio. Elige por dónde entrar y avanza a tu
            ritmo: cada rama guarda tu progreso módulo por módulo.
          </p>

          <div className="acad-stats">
            <div>
              <span className="acad-stat-num">{RAMAS.length}</span>
              <span className="acad-stat-label">Ramas</span>
            </div>
            <div>
              <span className="acad-stat-num">{catalogo.length}</span>
              <span className="acad-stat-label">Módulos</span>
            </div>
            <div>
              <span className="acad-stat-num">{totalLecciones}</span>
              <span className="acad-stat-label">Lecciones</span>
            </div>
            <div>
              <span className="acad-stat-num">{rutas}</span>
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
              {rutas} recorridos armados que cruzan varias ramas y te
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
              {retos} retos con fecha, entregable concreto y criterios de
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
                const mods = modulosDeRama(rama.id)

                let done = 0
                let total = 0
                if (hydrated) {
                  mods.forEach((m) => {
                    const p = getModuleProgress(m.lessons)
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
                        {mods.length} módulos · {cuentaLecciones(mods)} lecciones
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
