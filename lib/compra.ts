// Orquesta la confirmación de una compra: captura contra PayPal (o adopta lo
// que ya haya registrado el otro lado de la carrera), registra la venta y
// manda el correo.
//
// Dos llamadores comparten esta única función, a propósito — duplicarla
// entre los dos es como se cuelan las inconsistencias:
//   - app/recursos/gracias/  → el retorno normal del comprador
//   - app/api/pagos/paypal/  → la red de seguridad si cerró la pestaña antes
//     de volver, o si PayPal reintenta el evento

import { capturarOrden } from '@/lib/paypal'
import { registrarVenta, tokenDeOrden } from '@/lib/ventas'
import { guiaPorId } from '@/lib/guias'
import { enviarCorreoDescarga } from '@/lib/correo'
import { SITE_URL } from '@/lib/site-config'

export type ResultadoConfirmacion = { ok: true; token: string } | { ok: false }

export async function confirmarCompra(orderId: string): Promise<ResultadoConfirmacion> {
  // ¿Ya la registró el otro lado de la carrera? Evita capturar dos veces la
  // misma orden en el caso común (no hace falta llegar a 'ya_capturada').
  const existente = await tokenDeOrden(orderId)
  if (existente) return { ok: true, token: existente }

  const captura = await capturarOrden(orderId)

  if (captura.estado === 'ya_capturada') {
    // El otro lado ganó la carrera justo entre el chequeo de arriba y esta
    // llamada a PayPal. Su respuesta de error no trae los datos del pago
    // (ver lib/paypal.ts), así que la única fuente que queda es la propia
    // base: si de verdad ya se registró, aparece ahora.
    const token = await tokenDeOrden(orderId)
    return token ? { ok: true, token } : { ok: false }
  }

  if (captura.estado !== 'capturada') return { ok: false }

  const { token } = await registrarVenta({
    guiaId: captura.guiaId,
    paypalOrderId: orderId,
    email: captura.email,
    importeCents: captura.importeCents,
  })

  const guia = await guiaPorId(captura.guiaId)
  if (guia) {
    const enlace = `${SITE_URL}/recursos/descargar/${token}`
    // Best-effort: si el correo falla, la venta ya quedó registrada y el
    // comprador ya tiene (o va a tener, al volver a /recursos/gracias) el
    // botón de descarga en pantalla.
    await enviarCorreoDescarga({ destinatario: captura.email, tituloGuia: guia.titulo, enlace })
  }

  return { ok: true, token }
}
