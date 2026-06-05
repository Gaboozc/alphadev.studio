'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MODULES, type Track } from './modules'
import { useProgress } from './hooks/useProgress'

const STATUS_LABEL: Record<string, string> = {
  available: 'Disponible',
  locked: 'Bloqueado',
  completed: 'Completado',
}

const TYPE_ICON: Record<string, string> = {
  video: '▶',
  audio: '◉',
  reading: '◻',
  practice: '◈',
}

const TRACKS: { id: Track; label: string; subtitle: string }[] = [
  {
    id: 'marketing',
    label: 'Marketing Digital',
    subtitle: 'Marca, ads y medición',
  },
  {
    id: 'uiux',
    label: 'UI/UX & Diseño',
    subtitle: 'Figma, video y sistemas',
  },
]

export default function AcademiaContent() {
  const [activeTrack, setActiveTrack] = useState<Track>('marketing')
  const { getModuleProgress, getGlobalProgress, hydrated } = useProgress()

  const trackModules = MODULES.filter((m) => m.track === activeTrack)
  const trackLessonIds = trackModules.flatMap((m) => m.lessons.map((l) => l.id))
  const trackProgress = (() => {
    if (!hydrated) return { done: 0, total: trackLessonIds.length, percent: 0 }
    const global = getGlobalProgress()
    // getGlobalProgress counts all modules — compute per-track manually
    let done = 0
    trackModules.forEach((m) => {
      const p = getModuleProgress(m.id)
      done += p.done
    })
    const total = trackLessonIds.length
    return { done, total, percent: total > 0 ? Math.round((done / total) * 100) : 0 }
  })()

  // suppress unused var warning while keeping getGlobalProgress available
  void getGlobalProgress

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        paddingTop: '2rem',
        paddingBottom: '4rem',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--gold)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            AlphaDev Studios — Estudio privado
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '1rem',
            }}
          >
            Academia
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '1rem',
              color: 'var(--text-muted)',
              maxWidth: '520px',
              lineHeight: 1.65,
            }}
          >
            Dos tracks de aprendizaje aplicado a AlphaDev Studios. Completá los módulos en orden.
          </p>
        </div>

        {/* Track tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2rem',
            background: 'var(--bg-alt)',
            border: '1px solid var(--border)',
            borderRadius: '0.875rem',
            padding: '0.375rem',
          }}
        >
          {TRACKS.map((track) => {
            const isActive = activeTrack === track.id
            return (
              <button
                key={track.id}
                onClick={() => setActiveTrack(track.id)}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  borderRadius: '0.625rem',
                  border: isActive ? '1px solid var(--gold-border)' : '1px solid transparent',
                  background: isActive ? 'var(--bg-card)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 200ms ease, border-color 200ms ease',
                  boxShadow: isActive ? '0 1px 6px rgba(154,114,53,0.07)' : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--text)' : 'var(--text-muted)',
                    marginBottom: '0.125rem',
                  }}
                >
                  {track.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.75rem',
                    color: isActive ? 'var(--gold)' : 'var(--text-subtle)',
                  }}
                >
                  {track.subtitle}
                </div>
              </button>
            )
          })}
        </div>

        {/* Track progress */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text)',
              }}
            >
              Progreso — {TRACKS.find((t) => t.id === activeTrack)?.label}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--gold)',
              }}
            >
              {hydrated ? `${trackProgress.done}/${trackProgress.total} lecciones` : '—'}
            </span>
          </div>
          <div
            style={{
              height: '6px',
              background: 'var(--bg-deep)',
              borderRadius: '99px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: hydrated ? `${trackProgress.percent}%` : '0%',
                background: 'var(--gold)',
                borderRadius: '99px',
                transition: 'width 600ms ease',
              }}
            />
          </div>
          {hydrated && trackProgress.percent > 0 && (
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.75rem',
                color: 'var(--text-subtle)',
                marginTop: '0.5rem',
              }}
            >
              {trackProgress.percent}% completado
            </p>
          )}
        </div>

        {/* Module cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {trackModules.map((mod) => {
            const progress = getModuleProgress(mod.id)
            const isLocked = mod.status === 'locked'

            return (
              <div
                key={mod.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '1rem',
                  padding: '1.75rem',
                  opacity: isLocked ? 0.6 : 1,
                  transition: 'border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease',
                  cursor: isLocked ? 'default' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!isLocked) {
                    e.currentTarget.style.borderColor = 'var(--border-hover)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(154,114,53,0.08)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  {/* Module number */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '50%',
                      background: isLocked ? 'var(--bg-deep)' : 'var(--gold-bg)',
                      border: `1px solid ${isLocked ? 'var(--border)' : 'var(--gold-border)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 700,
                      fontSize: '0.9375rem',
                      color: isLocked ? 'var(--text-subtle)' : 'var(--gold)',
                    }}
                  >
                    {mod.number}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        marginBottom: '0.375rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <h2
                        style={{
                          fontFamily: 'var(--font-playfair)',
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          color: 'var(--text)',
                          margin: 0,
                        }}
                      >
                        {mod.title}
                      </h2>
                      <span
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          color: isLocked ? 'var(--text-subtle)' : 'var(--gold)',
                          background: isLocked ? 'var(--bg-deep)' : 'var(--gold-bg)',
                          padding: '0.1875rem 0.5rem',
                          borderRadius: '99px',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {STATUS_LABEL[mod.status]}
                      </span>
                    </div>

                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.6,
                        marginBottom: '1rem',
                      }}
                    >
                      {mod.description}
                    </p>

                    {/* Lesson type icons */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        marginBottom: '1rem',
                      }}
                    >
                      {mod.lessons.map((l) => (
                        <span
                          key={l.id}
                          title={l.title}
                          style={{
                            fontFamily: 'var(--font-inter)',
                            fontSize: '0.75rem',
                            color: 'var(--text-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                          }}
                        >
                          <span>{TYPE_ICON[l.type]}</span>
                        </span>
                      ))}
                      <span
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontSize: '0.75rem',
                          color: 'var(--text-subtle)',
                        }}
                      >
                        {mod.lessons.length} lecciones · {mod.duration}
                      </span>
                    </div>

                    {/* Progress bar */}
                    {hydrated && !isLocked && (
                      <div style={{ marginBottom: '1rem' }}>
                        <div
                          style={{
                            height: '4px',
                            background: 'var(--bg-deep)',
                            borderRadius: '99px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              width: `${progress.percent}%`,
                              background: 'var(--gold)',
                              borderRadius: '99px',
                              transition: 'width 600ms ease',
                            }}
                          />
                        </div>
                        {progress.done > 0 && (
                          <p
                            style={{
                              fontFamily: 'var(--font-inter)',
                              fontSize: '0.6875rem',
                              color: 'var(--text-subtle)',
                              marginTop: '0.375rem',
                            }}
                          >
                            {progress.done}/{progress.total} completadas
                          </p>
                        )}
                      </div>
                    )}

                    {/* CTA */}
                    {!isLocked && (
                      <Link
                        href={`/academia/${mod.id}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          fontFamily: 'var(--font-inter)',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          color: 'var(--gold)',
                          textDecoration: 'none',
                          borderBottom: '1px solid var(--gold-border)',
                          paddingBottom: '1px',
                          transition: 'color 200ms ease, border-color 200ms ease',
                        }}
                      >
                        {progress.done > 0 ? 'Continuar módulo' : 'Empezar módulo'} →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
