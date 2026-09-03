import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/Icon'
import { LEARNING_PATHS } from '../modules'
import { RAMAS, RAMA_OF_TRACK, TRACK_META } from '../ramas'
import { moduleById } from '../queries'

export const metadata: Metadata = {
  title: 'Rutas de aprendizaje — Academia',
  robots: { index: false, follow: false },
}

const LEVEL_LABEL: Record<string, string> = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
}

export default function RutasPage() {
  return (
    <div className="acad-page">
      <div className="acad-wrap">
        <Link href="/academia" className="acad-crumb">
          <span style={{ display: 'flex', transform: 'rotate(180deg)' }}>
            <Icon name="arrowRight" size={14} />
          </span>
          Academia
        </Link>

        <header className="acad-head">
          <p className="eyebrow">Rutas de aprendizaje</p>
          <h1>De cero a un perfil completo</h1>
          <p>
            Cada ruta encadena módulos de varias ramas en el orden correcto. Si no
            sabes por dónde empezar, empieza por aquí en vez de elegir módulos sueltos.
          </p>
        </header>

        <div className="acad-list">
          {LEARNING_PATHS.map((path) => {
            // Ramas que toca la ruta, sin repetir.
            const ramaIds = [...new Set(path.tracks.map((t) => RAMA_OF_TRACK[t]))]
            const firstModule = path.moduleIds.map(moduleById).find(Boolean)

            return (
              <article key={path.id} className="acad-item">
                <div className="acad-item-head">
                  <h3>{path.title}</h3>
                  <span className="acad-badge">{LEVEL_LABEL[path.level] ?? path.level}</span>
                  <span className="acad-badge acad-badge-neutral">{path.duration}</span>
                </div>

                <p style={{ marginBottom: '0.75rem' }}>{path.subtitle}</p>
                <p>{path.description}</p>

                <div className="acad-rama-areas">
                  {ramaIds.map((id) => (
                    <span key={id} className="acad-chip">
                      {RAMAS.find((r) => r.id === id)?.label}
                    </span>
                  ))}
                </div>

                <div className="acad-meta">
                  <div>
                    Para quién
                    <strong>{path.forWho}</strong>
                  </div>
                  <div>
                    Al terminar
                    <strong>{path.outcome}</strong>
                  </div>
                  <div>
                    Módulos
                    <strong>{path.moduleIds.length}</strong>
                  </div>
                </div>

                {firstModule && (
                  <div style={{ marginTop: '1.1rem' }}>
                    <Link
                      href={`/academia/${RAMAS.find((r) => r.id === RAMA_OF_TRACK[firstModule.track])!.slug}/${firstModule.id}`}
                      className="acad-go"
                      style={{ fontSize: '0.8125rem', textDecoration: 'none' }}
                    >
                      Empezar por “{firstModule.title}”
                      <Icon name="arrowRight" size={14} />
                    </Link>
                  </div>
                )}
              </article>
            )
          })}
        </div>

        {/* Nota de orientación */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.8125rem',
            color: 'var(--text-subtle)',
            marginTop: '2rem',
            lineHeight: 1.6,
          }}
        >
          ¿Prefieres armar tu propio recorrido? Entra por{' '}
          <Link href="/academia" style={{ color: 'var(--gold)' }}>
            las ramas
          </Link>{' '}
          y elige área por área. Las áreas que cubre cada ruta son:{' '}
          {[...new Set(LEARNING_PATHS.flatMap((p) => p.tracks))]
            .map((t) => TRACK_META[t]?.label)
            .filter(Boolean)
            .join(', ')}
          .
        </p>
      </div>
    </div>
  )
}
