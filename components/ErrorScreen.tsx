'use client'

// Pantalla compartida por el 404 y por el error de servidor.
//
// Una sola pieza para las dos porque son el mismo momento desde el punto de
// vista de quien visita: algo no está donde esperaba. Lo único que cambia es
// el texto y a dónde puede ir después.

import Link from 'next/link'

interface Accion {
  label: string
  href?: string
  onClick?: () => void
  primary?: boolean
}

export default function ErrorScreen({
  label,
  title,
  body,
  acciones,
}: {
  label: string
  title: string
  body: string
  acciones: Accion[]
}) {
  return (
    <section
      style={{
        background: 'var(--bg)',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        padding: '8rem 1.5rem 6rem',
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto', width: '100%' }}>
        <p className="eyebrow">{label}</p>

        <h1
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(2.2rem, 6vw, 3.4rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            margin: '0.75rem 0 0',
          }}
        >
          {title}
        </h1>

        {/* .gold-divider trae `margin: auto` porque casi siempre acompaña a un
            bloque centrado. Aquí el texto va a la izquierda, así que se anula. */}
        <div className="gold-divider" style={{ marginLeft: 0, marginRight: 0 }} />

        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            margin: '0 0 2rem',
          }}
        >
          {body}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {acciones.map((a) =>
            a.href ? (
              <Link key={a.label} href={a.href} className={a.primary ? 'btn-glow' : 'btn-secondary'}>
                {a.label}
              </Link>
            ) : (
              <button
                key={a.label}
                type="button"
                onClick={a.onClick}
                className={a.primary ? 'btn-glow' : 'btn-secondary'}
              >
                {a.label}
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
