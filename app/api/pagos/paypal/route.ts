import { NextResponse, type NextRequest } from 'next/server'
import { verificarFirmaWebhook } from '@/lib/paypal'
import { confirmarCompra } from '@/lib/compra'

// Red de seguridad: si el comprador cierra la pestaña justo después de pagar
// y antes de volver a /recursos/gracias, esta es la única forma de que su
// compra se registre igual.
//
// No se maneja el reembolso aquí. Extraer el id de la orden desde el evento
// de reembolso de PayPal exige una llamada extra a su API (el payload de
// PAYMENT.CAPTURE.REFUNDED no trae el order_id directo, solo un link a la
// captura) — con el volumen de esta tienda, el botón "Revocar" de
// /admin/ventas hace lo mismo en un clic cuando Gabriel procese el reembolso
// desde el propio panel de PayPal. Si el volumen crece, esto se automatiza.
export const dynamic = 'force-dynamic'

interface EventoPaypal {
  id: string
  event_type: string
  resource: {
    id?: string
    supplementary_data?: { related_ids?: { order_id?: string } }
  }
}

export async function POST(request: NextRequest) {
  let cuerpo: EventoPaypal
  try {
    cuerpo = await request.json()
  } catch {
    return new NextResponse('cuerpo inválido', { status: 400 })
  }

  // La verificación es contra la propia API de PayPal (server-to-server),
  // no un HMAC local: es lo que impide que cualquiera con curl le mande a
  // esta ruta un evento inventado y se auto-conceda una guía gratis.
  const firmaValida = await verificarFirmaWebhook(request.headers, cuerpo)
  if (!firmaValida) {
    console.warn('[webhook paypal] firma inválida', cuerpo.event_type)
    return new NextResponse('firma inválida', { status: 401 })
  }

  let orderId: string | undefined
  if (cuerpo.event_type === 'CHECKOUT.ORDER.APPROVED') {
    orderId = cuerpo.resource.id
  } else if (cuerpo.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
    orderId = cuerpo.resource.supplementary_data?.related_ids?.order_id
  } else {
    // Cualquier otro evento se reconoce y se ignora con 200: un 4xx aquí
    // hace que PayPal marque el endpoint como roto y deje de mandar nada.
    return NextResponse.json({ ok: true, ignorado: cuerpo.event_type })
  }

  if (!orderId) {
    console.error('[webhook paypal] evento sin order id:', cuerpo.event_type)
    return NextResponse.json({ ok: true, ignorado: 'sin order id' })
  }

  try {
    const resultado = await confirmarCompra(orderId)
    if (!resultado.ok) {
      // No es necesariamente un error nuestro: puede ser la misma carrera
      // entre este webhook y el retorno del comprador que confirmarCompra ya
      // sabe absorber, resuelta apenas unos milisegundos tarde. 500 para que
      // PayPal reintente — un 200 aquí perdería la venta en silencio si de
      // verdad falló.
      console.error('[webhook paypal] confirmarCompra no pudo resolver', orderId)
      return new NextResponse('no confirmado', { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    // 500 a propósito: queremos que PayPal reintente. Aquí sí hay una venta
    // en juego.
    console.error('[webhook paypal] fallo al confirmar', orderId, e)
    return new NextResponse('error', { status: 500 })
  }
}
