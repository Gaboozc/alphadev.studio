'use client'

interface MediaEmbedProps {
  type: 'youtube' | 'audio' | 'link'
  url: string
  title?: string
}

function getYouTubeEmbedUrl(url: string): string {
  // Handles youtu.be/ID and youtube.com/watch?v=ID formats
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`
  const longMatch = url.match(/[?&]v=([^&]+)/)
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`
  return url
}

export default function MediaEmbed({ type, url, title }: MediaEmbedProps) {
  if (type === 'youtube') {
    return (
      <div
        style={{
          position: 'relative',
          paddingBottom: '56.25%',
          height: 0,
          overflow: 'hidden',
          borderRadius: '0.75rem',
          background: 'var(--bg-deep)',
        }}
      >
        <iframe
          src={getYouTubeEmbedUrl(url)}
          title={title ?? 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-presentation"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
    )
  }

  if (type === 'audio') {
    return (
      <div
        style={{
          background: 'var(--bg-alt)',
          border: '1px solid var(--gold-border)',
          borderRadius: '0.75rem',
          padding: '1.25rem 1.5rem',
        }}
      >
        {title && (
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--gold)',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Audio Overview
          </p>
        )}
        <audio
          controls
          src={url}
          style={{ width: '100%', accentColor: 'var(--gold)' }}
        >
          Tu navegador no soporta audio.
        </audio>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.75rem',
            color: 'var(--text-subtle)',
            marginTop: '0.5rem',
          }}
        >
          Generado con NotebookLM
        </p>
      </div>
    )
  }

  // type === 'link'
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
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
      <span style={{ fontSize: '1.25rem' }}>↗</span>
      <span
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'var(--gold)',
        }}
      >
        {title ?? url}
      </span>
    </a>
  )
}
