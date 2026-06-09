'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MODULES, type Track } from '../modules'
import { useProgress } from '../hooks/useProgress'

const TRACKS: { id: Track; label: string; icon: string }[] = [
  { id: 'marketing', label: 'Marketing', icon: '◎' },
  { id: 'uiux', label: 'UI/UX', icon: '◑' },
  { id: 'ia', label: 'Inteligencia Artificial', icon: '◈' },
  { id: 'web', label: 'Desarrollo Web', icon: '◻' },
  { id: 'copy', label: 'Copywriting', icon: '◉' },
  { id: 'seo', label: 'SEO', icon: '◇' },
  { id: 'geo', label: 'GEO', icon: '◉' },
  { id: 'branding', label: 'Branding', icon: '◆' },
  { id: 'data', label: 'Data & Analytics', icon: '○' },
  { id: 'ads', label: 'Publicidad', icon: '▲' },
  { id: 'email', label: 'Email Marketing', icon: '◲' },
  { id: 'video', label: 'Video', icon: '▶' },
  { id: 'community', label: 'Community', icon: '◐' },
  { id: 'prodai', label: 'Producto IA', icon: '◍' },
  { id: 'ventas', label: 'Ventas', icon: '◁' },
]

export default function AcademiaNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { getModuleProgress, hydrated } = useProgress()

  const currentModuleId = pathname.split('/')[2] ?? ''
  const currentModule = MODULES.find((m) => m.id === currentModuleId)
  const [expandedTrack, setExpandedTrack] = useState<Track | null>(
    currentModule?.track ?? 'marketing'
  )

  function close() {
    setOpen(false)
  }

  return (
    <>
      {/* ── Fixed top bar ── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3.5rem',
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.25rem',
          zIndex: 100,
        }}
      >
        <Link
          href="/academia"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '1.125rem',
              fontWeight: 700,
              color: 'var(--gold)',
            }}
          >
            ADS
          </span>
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--text-subtle)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Academia
          </span>
        </Link>

        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            alignItems: 'flex-end',
          }}
        >
          <span style={{ display: 'block', width: '20px', height: '2px', background: 'var(--text)', borderRadius: '2px' }} />
          <span style={{ display: 'block', width: '20px', height: '2px', background: 'var(--text)', borderRadius: '2px' }} />
          <span style={{ display: 'block', width: '14px', height: '2px', background: 'var(--text)', borderRadius: '2px' }} />
        </button>
      </header>

      {/* ── Overlay ── */}
      <div
        onClick={close}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(26,21,18,0.4)',
          zIndex: 150,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 250ms ease',
        }}
      />

      {/* ── Sidebar drawer ── */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '300px',
          background: 'var(--bg-card)',
          borderRight: '1px solid var(--border)',
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 250ms ease',
        }}
      >
        {/* Sidebar header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.25rem 1rem',
            borderBottom: '1px solid var(--border)',
            flexShrink: 0,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: 'var(--gold)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '0.2rem',
              }}
            >
              AlphaDev Studios
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text)',
                margin: 0,
              }}
            >
              Academia
            </h2>
          </div>
          <button
            onClick={close}
            aria-label="Cerrar menú"
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              padding: '0.375rem 0.625rem',
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Back to site */}
        <div
          style={{
            padding: '0.75rem 1.25rem',
            borderBottom: '1px solid var(--border)',
            flexShrink: 0,
          }}
        >
          <Link
            href="/"
            onClick={close}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
          >
            ← Volver al sitio
          </Link>
        </div>

        {/* Track + module list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0' }}>
          {TRACKS.map((track) => {
            const trackMods = MODULES.filter((m) => m.track === track.id).sort((a, b) => {
              const aC = a.id.includes('capstone') ? 1 : 0
              const bC = b.id.includes('capstone') ? 1 : 0
              return aC - bC
            })

            const isExpanded = expandedTrack === track.id

            let trackDone = 0
            let trackTotal = 0
            if (hydrated) {
              trackMods.forEach((m) => {
                const p = getModuleProgress(m.id)
                trackDone += p.done
                trackTotal += p.total
              })
            }
            const trackPercent = trackTotal > 0 ? Math.round((trackDone / trackTotal) * 100) : 0

            return (
              <div key={track.id}>
                {/* Track row */}
                <button
                  onClick={() => setExpandedTrack(isExpanded ? null : track.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.625rem 1.25rem',
                    background: isExpanded ? 'var(--gold-bg)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 150ms ease',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.875rem',
                      color: isExpanded ? 'var(--gold)' : 'var(--text-subtle)',
                      flexShrink: 0,
                      width: '1.25rem',
                    }}
                  >
                    {track.icon}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.875rem',
                      fontWeight: isExpanded ? 600 : 400,
                      color: isExpanded ? 'var(--gold)' : 'var(--text)',
                      flex: 1,
                    }}
                  >
                    {track.label}
                  </span>
                  {hydrated && trackPercent > 0 && (
                    <span
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        color: 'var(--gold)',
                      }}
                    >
                      {trackPercent}%
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: '0.625rem',
                      color: isExpanded ? 'var(--gold)' : 'var(--text-subtle)',
                      transform: isExpanded ? 'rotate(180deg)' : 'none',
                      transition: 'transform 200ms ease',
                      flexShrink: 0,
                    }}
                  >
                    ▾
                  </span>
                </button>

                {/* Module list (expanded) */}
                {isExpanded && (
                  <div
                    style={{
                      background: 'var(--bg)',
                      borderTop: '1px solid var(--border)',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    {trackMods.map((mod, idx) => {
                      const isActive = mod.id === currentModuleId
                      const isCapstone = mod.id.includes('capstone')
                      const progress = hydrated ? getModuleProgress(mod.id) : { done: 0, total: 0, percent: 0 }
                      const isDone = hydrated && progress.done === progress.total && progress.total > 0

                      return (
                        <Link
                          key={mod.id}
                          href={`/academia/${mod.id}`}
                          onClick={close}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.625rem',
                            padding: '0.5rem 1rem 0.5rem 1.5rem',
                            textDecoration: 'none',
                            background: isActive ? 'var(--gold-bg)' : 'none',
                            borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent',
                            transition: 'background 150ms ease',
                          }}
                        >
                          {/* Number / check */}
                          <span
                            style={{
                              flexShrink: 0,
                              width: '1.375rem',
                              height: '1.375rem',
                              borderRadius: '50%',
                              background: isDone ? 'var(--gold)' : isActive ? 'rgba(154,114,53,0.15)' : 'var(--bg-deep)',
                              border: `1px solid ${isDone || isActive ? 'var(--gold-border)' : 'var(--border)'}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontFamily: 'var(--font-inter)',
                              fontSize: '0.5625rem',
                              fontWeight: 700,
                              color: isDone ? '#fff' : isActive ? 'var(--gold)' : 'var(--text-subtle)',
                            }}
                          >
                            {isDone ? '✓' : idx + 1}
                          </span>

                          {/* Title */}
                          <span
                            style={{
                              fontFamily: 'var(--font-inter)',
                              fontSize: '0.8125rem',
                              color: isActive ? 'var(--gold)' : isDone ? 'var(--text-subtle)' : 'var(--text-muted)',
                              fontWeight: isActive ? 600 : 400,
                              lineHeight: 1.35,
                              flex: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {mod.title}
                          </span>

                          {isCapstone && (
                            <span
                              style={{
                                fontSize: '0.5rem',
                                color: 'var(--gold)',
                                flexShrink: 0,
                              }}
                            >
                              ◆
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Sidebar footer */}
        <div
          style={{
            padding: '0.875rem 1.25rem',
            borderTop: '1px solid var(--border)',
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.75rem',
              color: 'var(--text-subtle)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            {MODULES.length} módulos · 14 áreas de estudio
          </p>
        </div>
      </aside>
    </>
  )
}
