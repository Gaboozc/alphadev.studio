import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/Icon'
import { RETOS } from '../modules'
import { RAMAS, RAMA_OF_TRACK } from '../ramas'

export const metadata: Metadata = {
  title: 'Retos — Academia',
  robots: { index: false, follow: false },
}

const STATUS: Record<string, { label: string; neutral: boolean }> = {
  activo: { label: 'Activo', neutral: false },
  proximo: { label: 'Próximo', neutral: true },
  completado: { label: 'Completado', neutral: true },
}

// Los activos primero, después los próximos, al final los completados.
const ORDER: Record<string, number> = { activo: 0, proximo: 1, completado: 2 }

export default function RetosPage() {
  const retos = [...RETOS].sort((a, b) => (ORDER[a.status] ?? 9) - (ORDER[b.status] ?? 9))

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
          <p className="eyebrow">Retos</p>
          <h1>Aprende construyendo algo real</h1>
          <p>
            Plazo corto, entregable concreto y criterios claros. Terminas con algo
            que puedes mostrar, no con un certificado.
          </p>
        </header>

        <div className="acad-list">
          {retos.map((reto) => {
            const status = STATUS[reto.status] ?? { label: reto.status, neutral: true }
            const ramaIds = [...new Set(reto.tracks.map((t) => RAMA_OF_TRACK[t]))]

            return (
              <article key={reto.id} className="acad-item">
                <div className="acad-item-head">
                  <h3>{reto.title}</h3>
                  <span className={`acad-badge${status.neutral ? ' acad-badge-neutral' : ''}`}>
                    {status.label}
                  </span>
                  <span className="acad-badge acad-badge-neutral">{reto.duration}</span>
                </div>

                <p style={{ marginBottom: '0.75rem' }}>{reto.tagline}</p>
                <p>{reto.description}</p>

                <div className="acad-rama-areas">
                  {ramaIds.map((id) => (
                    <span key={id} className="acad-chip">
                      {RAMAS.find((r) => r.id === id)?.label}
                    </span>
                  ))}
                </div>

                <div className="acad-meta">
                  <div>
                    Entregable
                    <strong>{reto.deliverable}</strong>
                  </div>
                  {reto.startDate && (
                    <div>
                      Arranca
                      <strong>{reto.startDate}</strong>
                    </div>
                  )}
                  {reto.endDate && (
                    <div>
                      Cierra
                      <strong>{reto.endDate}</strong>
                    </div>
                  )}
                </div>

                {reto.requirements.length > 0 && (
                  <details style={{ marginTop: '1.1rem' }}>
                    <summary
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: 'var(--gold)',
                        cursor: 'pointer',
                      }}
                    >
                      Requisitos y cómo entregar
                    </summary>
                    <div style={{ marginTop: '0.9rem' }}>
                      <RetoList title="Requisitos" items={reto.requirements} />
                      <RetoList title="Cómo entregar" items={reto.howToSubmit} />
                      <RetoList title="Premios" items={reto.prizes} />
                    </div>
                  </details>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function RetoList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <div style={{ marginBottom: '1rem' }}>
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-subtle)',
          margin: '0 0 0.45rem',
        }}
      >
        {title}
      </p>
      <ul
        style={{
          margin: 0,
          paddingLeft: '1.1rem',
          fontFamily: 'var(--font-inter)',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
        }}
      >
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  )
}
