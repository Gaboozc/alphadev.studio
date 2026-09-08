// Icono para la pantalla de inicio de iOS.
//
// Se genera en vez de ser un PNG suelto por lo mismo que la OG image: usa el
// Playfair de verdad, con los hex exactos de la paleta. Y aquí importa más que
// en el favicon — iOS lo muestra a 180px, donde la diferencia entre la serif
// real y la del sistema se nota.
//
// Sin esquinas redondeadas a propósito: iOS aplica su propia máscara, y
// redondear aquí dejaría un borde recortado.

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Ruta literal: construirla por partes impide que Turbopack la resuelva y
// acaba trazando el proyecto entero en el bundle. Ver app/opengraph-image.tsx.
const playfair = readFileSync(join(process.cwd(), 'app/_og/PlayfairDisplay-Bold.ttf'))

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#9A7235',
          color: '#FAFAF7',
          fontFamily: 'Playfair',
          fontSize: 124,
          lineHeight: 1,
          // Compensa el hueco óptico bajo la línea base de la letra.
          paddingBottom: 4,
        }}
      >
        A
      </div>
    ),
    { ...size, fonts: [{ name: 'Playfair', data: playfair, weight: 700, style: 'normal' }] },
  )
}
