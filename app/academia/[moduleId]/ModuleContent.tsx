'use client'

import Link from 'next/link'
import type { Module } from '../modules'
import { useProgress } from '../hooks/useProgress'
import MediaEmbed from '../components/MediaEmbed'

const TYPE_LABEL: Record<string, string> = {
  video: 'Video',
  audio: 'Audio',
  reading: 'Lectura',
  practice: 'Práctica',
  course: 'Curso',
}

const RESOURCE_ICON: Record<string, string> = {
  course: '🎓',
  video: '▶',
  article: '◻',
  tool: '⚙',
  certification: '★',
}

const TRACK_LABEL: Record<string, string> = {
  marketing: 'Marketing Digital',
  uiux: 'UI/UX & Diseño',
}

function getEmbedType(lesson: Module['lessons'][number]): 'youtube' | 'audio' | 'link' | null {
  if (!lesson.embedUrl) return null
  if (lesson.embedUrl.includes('youtube.com') || lesson.embedUrl.includes('youtu.be'))
    return 'youtube'
  if (lesson.type === 'audio') return 'audio'
  return 'link'
}

interface Props {
  module: Module
  trackModules: Module[]
}

export default function ModuleContent({ module: mod, trackModules }: Props) {
  const { isCompleted, toggleLesson, getModuleProgress, hydrated } = useProgress()
  const progress = getModuleProgress(mod.id)

  const currentIndex = trackModules.findIndex((m) => m.id === mod.id)
  const prev = currentIndex > 0 ? trackModules[currentIndex - 1] : null
  const next = currentIndex < trackModules.length - 1 ? trackModules[currentIndex + 1] : null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        {/* ── Sidebar ── */}
        <aside
          style={{
            position: 'sticky',
            top: '1.5rem',
            paddingTop: '2rem',
            paddingBottom: '2rem',
          }}
        >
          {/* Back link */}
          <Link
            href="/academia"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.8125rem',
              color: 'var(--gold)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              marginBottom: '1.5rem',
            }}
          >
            ← Academia
          </Link>

          {/* Track label */}
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: 'var(--text-subtle)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            {TRACK_LABEL[mod.track]}
          </p>

          {/* Module list */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {trackModules.map((m) => {
              const isActive = m.id === mod.id
              const mp = getModuleProgress(m.id)

              return (
                <Link
                  key={m.id}
                  href={`/academia/${m.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.625rem',
                    padding: '0.625rem 0.75rem',
                    borderRadius: '0.625rem',
                    textDecoration: 'none',
                    background: isActive ? 'var(--gold-bg)' : 'transparent',
                    border: `1px solid ${isActive ? 'var(--gold-border)' : 'transparent'}`,
                    transition: 'background 200ms ease, border-color 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'var(--bg-alt)'
                      e.currentTarget.style.borderColor = 'var(--border)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'transparent'
                    }
                  }}
                >
                  {/* Number circle */}
                  <span
                    style={{
                      flexShrink: 0,
                      width: '1.375rem',
                      height: '1.375rem',
                      borderRadius: '50%',
                      background: isActive ? 'var(--gold)' : 'var(--bg-deep)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      color: isActive ? '#fff' : 'var(--text-subtle)',
                      marginTop: '1px',
                    }}
                  >
                    {m.number}
                  </span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.8125rem',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? 'var(--text)' : 'var(--text-muted)',
                        lineHeight: 1.4,
                        margin: 0,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {m.title}
                    </p>

                    {/* Mini progress bar */}
                    {hydrated && mp.total > 0 && (
                      <div
                        style={{
                          marginTop: '0.375rem',
                          height: '2px',
                          background: 'var(--bg-deep)',
                          borderRadius: '99px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${mp.percent}%`,
                            background: 'var(--gold)',
                            borderRadius: '99px',
                          }}
                        />
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* ── Main content ── */}
        <main style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
          {/* Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--gold)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              Módulo {mod.number}
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '0.875rem',
              }}
            >
              {mod.title}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.9375rem',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                marginBottom: '1.25rem',
              }}
            >
              {mod.description}
            </p>

            {/* Module progress bar */}
            {hydrated && (
              <div style={{ maxWidth: '360px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                    {progress.done}/{progress.total} lecciones
                  </span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)' }}>
                    {progress.percent}%
                  </span>
                </div>
                <div style={{ height: '5px', background: 'var(--bg-deep)', borderRadius: '99px', overflow: 'hidden' }}>
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
              </div>
            )}
          </div>

          {/* Lessons */}
          <section style={{ marginBottom: '3rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '1.25rem',
              }}
            >
              Lecciones
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {mod.lessons.map((lesson, idx) => {
                const done = isCompleted(lesson.id)
                const embedType = getEmbedType(lesson)

                return (
                  <div
                    key={lesson.id}
                    style={{
                      background: 'var(--bg-card)',
                      border: `1px solid ${done ? 'var(--gold-border)' : 'var(--border)'}`,
                      borderRadius: '0.875rem',
                      padding: '1.25rem 1.5rem',
                      transition: 'border-color 200ms ease',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem',
                        marginBottom: embedType || lesson.content ? '1rem' : 0,
                      }}
                    >
                      <button
                        onClick={() => toggleLesson(lesson.id)}
                        aria-label={done ? 'Marcar como no completada' : 'Marcar como completada'}
                        style={{
                          flexShrink: 0,
                          width: '1.625rem',
                          height: '1.625rem',
                          borderRadius: '50%',
                          border: `2px solid ${done ? 'var(--gold)' : 'var(--border)'}`,
                          background: done ? 'var(--gold)' : 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          transition: 'background 200ms ease, border-color 200ms ease',
                          marginTop: '1px',
                        }}
                      >
                        {done ? '✓' : ''}
                      </button>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-inter)',
                              fontSize: '0.6875rem',
                              fontWeight: 600,
                              color: 'var(--text-subtle)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.06em',
                            }}
                          >
                            {idx + 1}. {TYPE_LABEL[lesson.type] ?? lesson.type}
                          </span>
                        </div>
                        <p
                          style={{
                            fontFamily: 'var(--font-inter)',
                            fontSize: '0.9375rem',
                            fontWeight: 500,
                            color: done ? 'var(--text-subtle)' : 'var(--text)',
                            textDecoration: done ? 'line-through' : 'none',
                            transition: 'color 200ms ease',
                          }}
                        >
                          {lesson.title}
                        </p>
                      </div>
                    </div>

                    {lesson.embedUrl && embedType && (
                      <div style={{ marginBottom: lesson.content ? '1rem' : 0 }}>
                        <MediaEmbed type={embedType} url={lesson.embedUrl} title={lesson.title} />
                      </div>
                    )}

                    {lesson.content && (
                      <p
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontSize: '0.875rem',
                          color: 'var(--text-muted)',
                          lineHeight: 1.65,
                          paddingLeft: '2.625rem',
                        }}
                      >
                        {lesson.content}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* Resources */}
          {mod.resources.length > 0 && (
            <section style={{ marginBottom: '3rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  marginBottom: '1.25rem',
                }}
              >
                Recursos del módulo
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {mod.resources.map((res) => (
                  <a
                    key={res.url}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      background: 'var(--bg-alt)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.75rem',
                      padding: '1rem 1.25rem',
                      textDecoration: 'none',
                      transition: 'border-color 200ms ease, transform 200ms ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--gold-border)'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{RESOURCE_ICON[res.type] ?? '◻'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)', margin: 0 }}>
                        {res.title}
                      </p>
                      <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'var(--text-subtle)', textTransform: 'capitalize', margin: 0, marginTop: '0.125rem' }}>
                        {res.type}
                      </p>
                    </div>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: 'var(--gold)', flexShrink: 0 }}>↗</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Prev / Next navigation */}
          <nav
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              borderTop: '1px solid var(--border)',
              paddingTop: '2rem',
            }}
          >
            {prev ? (
              <Link
                href={`/academia/${prev.id}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  padding: '1rem 1.25rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.875rem',
                  textDecoration: 'none',
                  transition: 'border-color 200ms ease, transform 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold-border)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  ← Anterior
                </span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)' }}>
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/academia/${next.id}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  padding: '1rem 1.25rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.875rem',
                  textDecoration: 'none',
                  textAlign: 'right',
                  transition: 'border-color 200ms ease, transform 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold-border)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Siguiente →
                </span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)' }}>
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </main>
      </div>
    </div>
  )
}
