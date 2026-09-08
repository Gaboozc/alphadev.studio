// Imagen de Open Graph — la tarjeta que se ve al compartir el sitio.
//
// Se compone aquí y no es un PNG suelto a propósito: el texto sale de las
// tipografías reales de la marca, con los hex exactos de la paleta, y si mañana
// cambia el titular la imagen se regenera sola. El fondo sí es un asset
// generado (app/_og/background.jpg).
//
// Next detecta este archivo por convención y añade <meta og:image> y
// twitter:image a todas las páginas. No hay que declararlo en el metadata.

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const alt = 'AlphaDev Studios — Te hacemos existir en internet'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Los assets viven en app/_og/: una carpeta privada, el guion bajo la deja
// fuera del enrutador.
//
// Cada ruta se escribe literal y completa. Construirlas con partes sueltas
// (`join(raiz, ...partes)`) impide que el analizador de Turbopack sepa qué se
// lee, y entonces traza el proyecto entero —carpeta public incluida— dentro
// del bundle del servidor.
//
// Y con readFileSync sobre una ruta del sistema, no con `new URL(...,
// import.meta.url)`: dentro del bundle, import.meta.url no es una URL válida
// y el objeto URL no es el que espera node:fs.
const inter = readFileSync(join(process.cwd(), 'app/_og/Inter-SemiBold.ttf'))
const playfair = readFileSync(join(process.cwd(), 'app/_og/PlayfairDisplay-Bold.ttf'))

// Satori no resuelve rutas del proyecto: el fondo entra como data URI.
const fondo = `data:image/jpeg;base64,${readFileSync(
  join(process.cwd(), 'app/_og/background.jpg'),
).toString('base64')}`

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
        { name: 'Playfair', data: playfair, weight: 700, style: 'normal' },
        { name: 'Inter', data: inter, weight: 600, style: 'normal' },
      ],
    },
  )
}
