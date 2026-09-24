import { NextResponse, type NextRequest } from 'next/server'
import { consumirDescarga, firmarDescarga } from '@/lib/ventas'

// Nunca cacheable: un 302 cacheado por el CDN entregaría la URL firmada del
// primer comprador que pasó por aquí al siguiente que pida la misma ruta.
export const dynamic = 'force-dynamic'

function respuestaError(mensaje: string, status: number) {
  // Página mínima, sin pasar por el layout del sitio: es un caso de borde
  // (enlace vencido, ya usado 5 veces, o inventado) que no necesita nav ni
  // footer. Bilingüe en una sola pantalla porque no sabemos en qué idioma
  // llegó quien la ve.
  return new NextResponse(
    `<!doctype html><html><head><meta charset="utf-8"><title>AlphaDev Studios</title></head>` +
      `<body style="font-family:system-ui,sans-serif;background:#FAFAF7;color:#1A1512;` +
      `display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:2rem;">` +
      `<div style="max-width:480px;text-align:center;"><p>${mensaje}</p></div></body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } },
  )
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  // Un Route Handler no tiene el equivalente de error.tsx: un throw sin
  // atrapar aquí sale como un 500 vacío, sin el mensaje bilingüe. Por
  // ejemplo, si falta SUPABASE_SERVICE_ROLE_KEY en el entorno —
  // clienteServicio() lanza a propósito en vez de fallar en silencio.
  try {
    const resultado = await consumirDescarga(token)
    if (!resultado) {
      return respuestaError(
        'Este enlace ya no es válido: venció, se usó el máximo de veces, o no existe. ' +
          'Escríbenos si necesitas que te lo reenviemos. / This link is no longer valid: ' +
          'it expired, reached its download limit, or does not exist. Write to us if you need it resent.',
        410,
      )
    }

    const urlFirmada = await firmarDescarga(resultado.archivo)
    if (!urlFirmada) {
      return respuestaError(
        'No pudimos preparar tu descarga. Inténtalo de nuevo en un momento. / ' +
          "We couldn't prepare your download. Please try again in a moment.",
        500,
      )
    }

    return NextResponse.redirect(urlFirmada, {
      status: 302,
      headers: { 'Cache-Control': 'no-store, private' },
    })
  } catch (e) {
    console.error('[recursos/descargar] fallo inesperado:', e)
    return respuestaError(
      'No pudimos preparar tu descarga. Inténtalo de nuevo en un momento. / ' +
        "We couldn't prepare your download. Please try again in a moment.",
      500,
    )
  }
}
