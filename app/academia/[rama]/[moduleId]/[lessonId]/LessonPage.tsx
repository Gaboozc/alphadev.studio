'use client'

import Link from 'next/link'
import type { Lesson, LessonMeta, ModuleMeta } from '../../../types'
import { moduleHref, lessonHref } from '../../../ramas'
import { useProgress } from '../../../hooks/useProgress'
import LessonContent from '../../../components/LessonContent'
import MediaEmbed from '../../../components/MediaEmbed'

const TYPE_LABEL: Record<string, string> = {
  video: 'Video',
  audio: 'Audio',
  reading: 'Lectura',
  practice: 'Práctica',
}

const TYPE_COLOR: Record<string, string> = {
  video: '#2563eb',
  audio: '#7c3aed',
  reading: '#059669',
  practice: '#d97706',
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

function getEmbedType(lesson: Lesson): 'youtube' | 'audio' | 'link' | null {
  if (!lesson.embedUrl) return null
  if (lesson.embedUrl.includes('youtube.com') || lesson.embedUrl.includes('youtu.be'))
    return 'youtube'
  if (lesson.type === 'audio') return 'audio'
  return 'link'
}

interface Props {
  module: ModuleMeta
  lesson: Lesson
  lessonIndex: number
  // Solo metadatos: de la anterior y la siguiente basta el enlace, no su cuerpo.
  prevLesson: LessonMeta | null
  nextLesson: LessonMeta | null
}

export default function LessonPage({ module: mod, lesson, lessonIndex, prevLesson, nextLesson }: Props) {
  const { isCompleted, toggleLesson, getModuleProgress, hydrated } = useProgress()
  const done = isCompleted(lesson.id)
  const embedType = getEmbedType(lesson)
  const progress = getModuleProgress(mod.lessons)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div className="lesson-layout">
        {/* ── Sidebar ── */}
        <aside className="lesson-aside">
          {/* Back to module */}
          <Link
            href={moduleHref(mod)}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.8125rem',
              color: 'var(--gold)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              marginBottom: '1.25rem',
            }}
          >
            ← Volver al módulo
          </Link>

          {/* Module info */}
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: 'var(--text-subtle)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.25rem',
            }}
          >
            {TRACK_LABEL[mod.track]} · Módulo {mod.number}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '0.9375rem',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '0.875rem',
              lineHeight: 1.35,
            }}
          >
            {mod.title}
          </p>

          {/* Module progress */}
          {hydrated && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6875rem', color: 'var(--text-subtle)' }}>
                  {progress.done}/{progress.total} completadas
                </span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--gold)' }}>
                  {progress.percent}%
                </span>
              </div>
              <div style={{ height: '3px', background: 'var(--bg-deep)', borderRadius: '99px', overflow: 'hidden' }}>
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

          {/* Lesson list */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {mod.lessons.map((l, idx) => {
              const isActive = l.id === lesson.id
              const isLessonDone = isCompleted(l.id)

              return (
                <Link
                  key={l.id}
                  href={lessonHref(mod, l.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.625rem',
                    padding: '0.5rem 0.625rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    background: isActive ? 'var(--gold-bg)' : 'transparent',
                    border: `1px solid ${isActive ? 'var(--gold-border)' : 'transparent'}`,
                    transition: 'background 150ms ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'var(--bg-alt)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {/* Completion dot */}
                  <span
                    style={{
                      flexShrink: 0,
                      width: '1.125rem',
                      height: '1.125rem',
                      borderRadius: '50%',
                      marginTop: '2px',
                      background: hydrated && isLessonDone
                        ? 'var(--gold)'
                        : isActive
                          ? 'var(--gold-bg)'
                          : 'var(--bg-deep)',
                      border: `2px solid ${isActive ? 'var(--gold)' : hydrated && isLessonDone ? 'var(--gold)' : 'var(--border)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.5rem',
                      color: '#fff',
                      fontWeight: 700,
                    }}
                  >
                    {hydrated && isLessonDone ? '✓' : ''}
                  </span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.75rem',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? 'var(--text)' : 'var(--text-muted)',
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      {idx + 1}. {l.title}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.625rem',
                        color: 'var(--text-subtle)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        margin: '0.125rem 0 0',
                      }}
                    >
                      {TYPE_LABEL[l.type] ?? l.type}
                    </p>
                  </div>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* ── Main content ── */}
        <main className="lesson-main">

          {/* Lesson header */}
          <div
            style={{
              marginBottom: '2rem',
              paddingBottom: '2rem',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: 'var(--gold)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Módulo {mod.number} · Lección {lessonIndex + 1}
              </span>
              <span style={{ color: 'var(--border)', fontSize: '0.75rem' }}>·</span>
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: TYPE_COLOR[lesson.type] ?? 'var(--text-subtle)',
                  background: `${TYPE_COLOR[lesson.type] ?? 'var(--bg-deep)'}18`,
                  border: `1px solid ${TYPE_COLOR[lesson.type] ?? 'var(--border)'}40`,
                  padding: '0.125rem 0.5rem',
                  borderRadius: '99px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {TYPE_LABEL[lesson.type] ?? lesson.type}
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '1.25rem',
                lineHeight: 1.25,
              }}
            >
              {lesson.title}
            </h1>

            {/* Mark complete button */}
            <button
              onClick={() => toggleLesson(lesson.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1.25rem',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: done ? '#fff' : 'var(--gold)',
                background: done ? 'var(--gold)' : 'transparent',
                border: `2px solid ${done ? 'var(--gold)' : 'var(--gold-border)'}`,
                borderRadius: '0.625rem',
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
              onMouseEnter={(e) => {
                if (!done) {
                  e.currentTarget.style.background = 'var(--gold-bg)'
                  e.currentTarget.style.borderColor = 'var(--gold)'
                } else {
                  e.currentTarget.style.background = 'var(--gold-dark)'
                }
              }}
              onMouseLeave={(e) => {
                if (!done) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'var(--gold-border)'
                } else {
                  e.currentTarget.style.background = 'var(--gold)'
                }
              }}
            >
              <span>{done ? '✓' : '○'}</span>
              {done ? 'Completada' : 'Marcar como completada'}
            </button>
          </div>

          {/* Embed (video / audio) */}
          {lesson.embedUrl && embedType && (
            <div style={{ marginBottom: '2rem' }}>
              <MediaEmbed type={embedType} url={lesson.embedUrl} title={lesson.title} />
            </div>
          )}

          {/* Main lesson content */}
          <div className="lesson-card">
            <LessonContent
              content={lesson.content}
              tasks={lesson.tasks}
              tip={lesson.tip}
            />
          </div>

          {/* Module resources */}
          {mod.resources.length > 0 && (
            <section style={{ marginBottom: '3rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  marginBottom: '1rem',
                }}
              >
                Recursos del módulo
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {mod.resources.map((res) => (
                  <a
                    key={res.url}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem',
                      background: 'var(--bg-alt)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.75rem',
                      padding: '0.875rem 1.125rem',
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
                    <span style={{ fontSize: '0.9375rem', flexShrink: 0 }}>{RESOURCE_ICON[res.type] ?? '◻'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)', margin: 0 }}>
                        {res.title}
                      </p>
                      <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6875rem', color: 'var(--text-subtle)', textTransform: 'capitalize', margin: 0, marginTop: '0.1rem' }}>
                        {res.type}
                      </p>
                    </div>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: 'var(--gold)', flexShrink: 0 }}>↗</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Prev / Next lesson navigation */}
          <nav
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              borderTop: '1px solid var(--border)',
              paddingTop: '2rem',
            }}
          >
            {prevLesson ? (
              <Link
                href={lessonHref(mod, prevLesson.id)}
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
                  ← Lección anterior
                </span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)', lineHeight: 1.4 }}>
                  {prevLesson.title}
                </span>
              </Link>
            ) : (
              <Link
                href={moduleHref(mod)}
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
                  ← Volver al módulo
                </span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)' }}>
                  {mod.title}
                </span>
              </Link>
            )}

            {nextLesson ? (
              <Link
                href={lessonHref(mod, nextLesson.id)}
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
                  Siguiente lección →
                </span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)', lineHeight: 1.4 }}>
                  {nextLesson.title}
                </span>
              </Link>
            ) : (
              <Link
                href={moduleHref(mod)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  padding: '1rem 1.25rem',
                  background: 'var(--gold-bg)',
                  border: '1px solid var(--gold-border)',
                  borderRadius: '0.875rem',
                  textDecoration: 'none',
                  textAlign: 'right',
                  transition: 'border-color 200ms ease, transform 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Módulo completado ✓
                </span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)' }}>
                  Volver al módulo →
                </span>
              </Link>
            )}
          </nav>
        </main>
      </div>
    </div>
  )
}
