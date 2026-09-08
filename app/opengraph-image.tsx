// Imagen de Open Graph — la tarjeta que se ve al compartir el sitio.
//
// Se compone aquí y no es un PNG suelto a propósito: el texto sale de las
// tipografías reales de la marca, con los hex exactos de la paleta, y si mañana
// cambia el titular la imagen se regenera sola. El fondo sí es un asset
// generado (public/assets/img/og-background.jpg).
//
// Next detecta este archivo por convención y añade <meta og:image> y
// twitter:image a todas las páginas. No hay que declararlo en el metadata.

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const alt = 'AlphaDev Studios — Te hacemos existir en internet'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const raiz = process.cwd()
const leer = (...partes: string[]) => readFileSync(join(raiz, ...partes))

// El fondo va como data URI: Satori no resuelve rutas relativas del proyecto.
const fondo = `data:image/jpeg;base64,${leer('public', 'assets', 'img', 'og-background.jpg').toString('base64')}`

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#FAFAF7',
        }}
      >
        {/* El fondo se estira a 1200x630; la ilustración vive en el tercio
            derecho, así que un recorte leve no se lleva nada por delante. */}
        {/* next/image no existe dentro de Satori: aquí no hay navegador ni
            optimizador, solo un renderizador de SVG. <img> es lo único. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fondo}
          width={1200}
          height={630}
          style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
          alt=""
        />

        {/* Todo el texto dentro del 80% central: Twitter y WhatsApp recortan
            los bordes de la tarjeta. */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            padding: '0 88px',
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontFamily: 'Inter',
              fontSize: 21,
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: '#6B5F52',
            }}
          >
            ALPHADEV STUDIOS
          </div>

          <div
            style={{
              fontFamily: 'Playfair',
              fontSize: 70,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              color: '#1A1512',
              marginTop: 26,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* nowrap: el corte de línea lo decide el diseño, no el ancho
                disponible. Sin esto el titular se parte en tres. */}
            <span style={{ whiteSpace: 'nowrap' }}>Te hacemos existir</span>
            <span style={{ whiteSpace: 'nowrap' }}>en internet</span>
          </div>

          <div style={{ display: 'flex', width: 68, height: 3, backgroundColor: '#9A7235', marginTop: 34 }} />

          <div
            style={{
              fontFamily: 'Inter',
              fontSize: 22,
              fontWeight: 600,
              color: '#9A8E84',
              marginTop: 26,
            }}
          >
            alphadev.studio
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Playfair', data: leer('public', 'fonts', 'PlayfairDisplay-Bold.ttf'), weight: 700, style: 'normal' },
        { name: 'Inter', data: leer('public', 'fonts', 'Inter-SemiBold.ttf'), weight: 600, style: 'normal' },
      ],
    },
  )
}
