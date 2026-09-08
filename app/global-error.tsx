'use client'

// Último recurso: se muestra cuando el fallo ocurre en el propio layout raíz.
//
// Aquí NO hay layout, así que no hay globals.css, ni las variables de color, ni
// las tipografías de next/font, ni el proveedor de idioma. Por eso todo va con
// valores literales y una pila de fuentes del sistema: si esta pantalla
// dependiera de algo del layout, podría fallar exactamente por lo mismo que la
// hizo aparecer.
//
// Por la misma razón está solo en español: el diccionario vive en un contexto
// de React que aquí no existe.

import { useEffect } from 'react'

const SERIF = 'Georgia, "Times New Roman", serif'
const SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[global-error]', error.digest ?? error.message)
  }, [error])

  return (
    <html lang="es">
      <body style={{ margin: 0, background: '#FAFAF7', color: '#1A1512' }}>
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1.5rem',
          }}
        >
          <div style={{ maxWidth: 520, width: '100%' }}>
            <p
              style={{
                fontFamily: SANS,
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#9A7235',
                margin: 0,
              }}
            >
              AlphaDev Studios
            </p>

            <h1
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(1.9rem, 5vw, 2.6rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                margin: '0.75rem 0 0',
              }}
            >
              Se nos rompió algo
            </h1>

            <div style={{ width: 56, height: 2, background: '#9A7235', margin: '1.25rem 0' }} />

            <p
              style={{
                fontFamily: SANS,
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#6B5F52',
                margin: '0 0 2rem',
              }}
            >
              No es culpa tuya. Vuelve a intentarlo; si sigue pasando, escríbenos a{' '}
              <a href="mailto:zavarsegabriel@gmail.com" style={{ color: '#9A7235' }}>
                zavarsegabriel@gmail.com
              </a>{' '}
              y lo revisamos.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={reset}
                style={{
                  fontFamily: SANS,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#FAFAF7',
                  background: '#9A7235',
                  border: '1px solid #9A7235',
                  borderRadius: '0.5rem',
                  padding: '0.7rem 1.4rem',
                  cursor: 'pointer',
                }}
              >
                Intentar de nuevo
              </button>
              {/* <a> y no <Link> a propósito: el árbol de React se ha roto, y
                  una navegación de cliente lo conservaría. Aquí hace falta una
                  recarga completa. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/"
                style={{
                  fontFamily: SANS,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#1A1512',
                  border: '1px solid #E8E2D9',
                  borderRadius: '0.5rem',
                  padding: '0.7rem 1.4rem',
                  textDecoration: 'none',
                }}
              >
                Ir al inicio
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
