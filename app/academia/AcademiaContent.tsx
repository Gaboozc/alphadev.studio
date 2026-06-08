'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MODULES, type Track } from './modules'
import { useProgress } from './hooks/useProgress'

const TYPE_ICON: Record<string, string> = {
  video: '▶',
  audio: '◉',
  reading: '◻',
  practice: '◈',
  exam: '?',
  project: '◆',
  mentoria: '◐',
  live: '●',
}

const TRACKS: { id: Track; label: string; icon: string; description: string }[] = [
  { id: 'marketing', label: 'Marketing', icon: '◎', description: 'Estrategia, contenido orgánico, Meta Ads y medición.' },
  { id: 'uiux', label: 'UI/UX', icon: '◑', description: 'Figma, prototipos, UX Writing y testing de usabilidad.' },
  { id: 'ia', label: 'Inteligencia Artificial', icon: '◈', description: 'Prompting, agentes, RAG y automatización con IA.' },
  { id: 'web', label: 'Desarrollo Web', icon: '◻', description: 'HTML, CSS, React, Next.js y deployment en producción.' },
  { id: 'copy', label: 'Copywriting', icon: '◉', description: 'Persuasión, fórmulas, landing pages y emails que convierten.' },
  { id: 'seo', label: 'SEO', icon: '◇', description: 'Keyword research, SEO técnico y link building.' },
  { id: 'branding', label: 'Branding', icon: '◆', description: 'Identidad de marca, naming y brand strategy.' },
  { id: 'data', label: 'Data & Analytics', icon: '○', description: 'GA4, Looker Studio, SQL y toma de decisiones basada en datos.' },
  { id: 'ads', label: 'Publicidad', icon: '▲', description: 'Meta Ads, Google Ads, TikTok Ads y remarketing.' },
  { id: 'email', label: 'Email Marketing', icon: '◲', description: 'Listas, secuencias, automatizaciones y deliverability.' },
  { id: 'video', label: 'Video', icon: '▶', description: 'Producción, edición, YouTube y contenido short-form.' },
  { id: 'community', label: 'Community', icon: '◐', description: 'Gestión de comunidades, engagement y crecimiento orgánico.' },
  { id: 'prodai', label: 'Producto IA', icon: '◍', description: 'Construir y lanzar productos digitales con IA integrada.' },
  { id: 'ventas', label: 'Ventas', icon: '◁', description: 'CRM, pipeline, negociación y cierre de deals.' },
]

export default function AcademiaContent() {
  const [activeTrack, setActiveTrack] = useState<Track>('marketing')
  const { getModuleProgress, hydrated } = useProgress()

  const activeTrackData = TRACKS.find((t) => t.id === activeTrack)!

  const trackModules = MODULES
    .filter((m) => m.track === activeTrack)
    .sort((a, b) => {
      const aCapstone = a.id.includes('capstone') ? 1 : 0
      const bCapstone = b.id.includes('capstone') ? 1 : 0
      return aCapstone - bCapstone
    })

  const trackProgress = (() => {
    let done = 0
    let total = 0
    trackModules.forEach((m) => {
      const p = getModuleProgress(m.id)
      done += p.done
      total += p.total
    })
    return { done, total, percent: total > 0 ? Math.round((done / total) * 100) : 0 }
  })()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 1.5rem' }}>

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
              marginBottom: '0.75rem',
            }}
          >
            Academia
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
            }}
          >
            Elegí un área de estudio y completá los módulos en orden.
          </p>
        </div>

        {/* Track selector — horizontal scrollable tabs */}
        <div
          style={{
            overflowX: 'auto',
            marginBottom: '1.75rem',
            marginLeft: '-1.5rem',
            marginRight: '-1.5rem',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            scrollbarWidth: 'none',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', paddingBottom: '4px', width: 'max-content' }}>
            {TRACKS.map((track) => {
              const isActive = activeTrack === track.id
              const mods = MODULES.filter((m) => m.track === track.id)
              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTrack(track.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '99px',
                    border: isActive ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                    background: isActive ? 'var(--gold-bg)' : 'var(--bg-card)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    transition: 'all 150ms ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--gold-border)'
                      e.currentTarget.style.color = 'var(--text)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--text-muted)'
                    }
                  }}
                >
                  <span style={{ fontSize: '0.75rem' }}>{track.icon}</span>
                  {track.label}
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.6875rem',
                      color: isActive ? 'var(--gold)' : 'var(--text-subtle)',
                      background: isActive ? 'rgba(154,114,53,0.12)' : 'var(--bg-deep)',
                      borderRadius: '99px',
                      padding: '0.1rem 0.4rem',
                      fontWeight: 600,
                    }}
                  >
                    {mods.length}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active track header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '1.375rem',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '0.25rem',
            }}
          >
            {activeTrackData.label}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
            }}
          >
            {activeTrackData.description}
          </p>
        </div>

        {/* Track progress */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '1rem',
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text)' }}>
                Progreso — {activeTrackData.label}
              </span>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--gold)' }}>
                {hydrated ? `${trackProgress.done}/${trackProgress.total}` : '—'}
              </span>
            </div>
            <div style={{ height: '6px', background: 'var(--bg-deep)', borderRadius: '99px', overflow: 'hidden' }}>
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
          </div>
          {hydrated && (
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: trackProgress.percent > 0 ? 'var(--gold)' : 'var(--text-subtle)',
                flexShrink: 0,
              }}
            >
              {trackProgress.percent}%
            </span>
          )}
        </div>

        {/* Module cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {trackModules.map((mod, index) => {
            const progress = getModuleProgress(mod.id)
            const isCapstone = mod.id.includes('capstone')

            return (
              <Link
                key={mod.id}
                href={`/academia/${mod.id}`}
                style={{
                  display: 'block',
                  background: 'var(--bg-card)',
                  border: isCapstone ? '1px solid var(--gold-border)' : '1px solid var(--border)',
                  borderRadius: '1rem',
                  padding: '1.5rem 1.75rem',
                  textDecoration: 'none',
                  transition: 'border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-hover)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(154,114,53,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isCapstone ? 'var(--gold-border)' : 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  {/* Number */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '50%',
                      background: progress.done === progress.total && progress.total > 0 ? 'var(--gold)' : 'var(--gold-bg)',
                      border: '1px solid var(--gold-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 700,
                      fontSize: '0.9375rem',
                      color: progress.done === progress.total && progress.total > 0 ? '#fff' : 'var(--gold)',
                    }}
                  >
                    {progress.done === progress.total && progress.total > 0 && hydrated ? '✓' : index + 1}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
                      <h2
                        style={{
                          fontFamily: 'var(--font-playfair)',
                          fontSize: '1.0625rem',
                          fontWeight: 700,
                          color: 'var(--text)',
                          margin: 0,
                        }}
                      >
                        {mod.title}
                      </h2>
                      {isCapstone && (
                        <span
                          style={{
                            fontFamily: 'var(--font-inter)',
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            color: 'var(--gold)',
                            background: 'var(--gold-bg)',
                            border: '1px solid var(--gold-border)',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '99px',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          Capstone
                        </span>
                      )}
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

                    {/* Lesson type icons + meta */}
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.875rem' }}>
                      {mod.lessons.map((l) => (
                        <span
                          key={l.id}
                          title={l.title}
                          style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'var(--text-subtle)' }}
                        >
                          {TYPE_ICON[l.type] ?? '·'}
                        </span>
                      ))}
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                        · {mod.lessons.length} lecciones · {mod.duration}
                      </span>
                    </div>

                    {/* Progress bar */}
                    {hydrated && (
                      <div>
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
                        {progress.done > 0 && (
                          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6875rem', color: 'var(--text-subtle)', marginTop: '0.375rem' }}>
                            {progress.done}/{progress.total} completadas
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '1.125rem', color: 'var(--gold)', flexShrink: 0, alignSelf: 'center' }}>
                    →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
