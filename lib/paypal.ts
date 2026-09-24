// Integración con PayPal Orders API v2, por `fetch` directo — sin instalar
// su SDK ni cargar ningún script de PayPal en la página. Es HTTP simple con
// Basic Auth para el token y Bearer para el resto.
//
// PAYPAL_API_BASE es https://api-m.sandbox.paypal.com mientras se prueba y
// https://api-m.paypal.com en producción — el único valor que cambia al
// pasar de sandbox a real.

import 'server-only'

const API_BASE = process.env.PAYPAL_API_BASE ?? 'https://api-m.sandbox.paypal.com'

function credenciales(): { clientId: string; clientSecret: string } {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    throw new Error('Faltan PAYPAL_CLIENT_ID y PAYPAL_CLIENT_SECRET.')
  }
  return { clientId, clientSecret }
}

async function tokenDeAcceso(): Promise<string> {
  const { clientId, clientSecret } = credenciales()
  const respuesta = await fetch(`${API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  })

  if (!respuesta.ok) {
    throw new Error(`[paypal] no se pudo obtener el token (${respuesta.status})`)
  }

  const datos = (await respuesta.json()) as { access_token: string }
  return datos.access_token
}

export interface OrdenCreada {
  id: string
  urlAprobacion: string
}

/**
 * Crea la orden de PayPal. El precio se pasa desde la base de datos —
 * `precioCents` viene siempre de `lib/guias.ts`, nunca de un valor que el
 * navegador pudiera manipular.
 */
export async function crearOrden(datos: {
  guiaId: string
  titulo: string
  precioCents: number
  returnUrl: string
  cancelUrl: string
}): Promise<OrdenCreada> {
  const token = await tokenDeAcceso()

  const respuesta = await fetch(`${API_BASE}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          custom_id: datos.guiaId,
          description: datos.titulo.slice(0, 127), // límite de PayPal
          amount: {
            currency_code: 'USD',
            value: (datos.precioCents / 100).toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: 'AlphaDev Studios',
        user_action: 'PAY_NOW',
        return_url: datos.returnUrl,
        cancel_url: datos.cancelUrl,
      },
    }),
    cache: 'no-store',
  })

  if (!respuesta.ok) {
    throw new Error(`[paypal] no se pudo crear la orden (${respuesta.status}): ${await respuesta.text()}`)
  }

  const orden = (await respuesta.json()) as { id: string; links: { rel: string; href: string }[] }
  const aprobacion = orden.links.find((l) => l.rel === 'approve')
  if (!aprobacion) throw new Error('[paypal] la orden no trajo un enlace de aprobación')

  return { id: orden.id, urlAprobacion: aprobacion.href }
}

export type ResultadoCaptura =
  // Se capturó ahora mismo, con los datos del pago en la respuesta.
  | { estado: 'capturada'; guiaId: string; email: string; importeCents: number }
  // Alguien más (el webhook, o un segundo clic del comprador) la capturó
  // antes: la respuesta de error de PayPal para este caso NO trae los datos
  // del pago, así que quien llama debe ir a buscar la venta ya registrada
  // (ventaExistePorOrden / tokenDeOrden en lib/ventas.ts) en vez de reintentar
  // la captura.
  | { estado: 'ya_capturada' }
  | { estado: 'error' }

/**
 * Captura una orden ya aprobada por el comprador. Es la única fuente de
 * verdad de "esto se pagó de verdad" — nada se registra en la base sin pasar
 * por aquí primero.
 */
export async function capturarOrden(orderId: string): Promise<ResultadoCaptura> {
  const token = await tokenDeAcceso()

  const respuesta = await fetch(`${API_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  const cuerpo = (await respuesta.json()) as {
    status?: string
    purchase_units?: {
      custom_id?: string
      payments?: { captures?: { amount?: { value?: string } }[] }
    }[]
    payer?: { email_address?: string }
    details?: { issue?: string }[]
  }

  if (!respuesta.ok) {
    if (cuerpo.details?.some((d) => d.issue === 'ORDER_ALREADY_CAPTURED')) {
      return { estado: 'ya_capturada' }
    }
    console.error('[paypal] fallo al capturar', orderId, respuesta.status, cuerpo)
    return { estado: 'error' }
  }

  const unidad = cuerpo.purchase_units?.[0]
  const captura = unidad?.payments?.captures?.[0]
  const valor = captura?.amount?.value
  const email = cuerpo.payer?.email_address
  const guiaId = unidad?.custom_id

  if (!guiaId || !email || !valor || cuerpo.status !== 'COMPLETED') {
    console.error('[paypal] captura sin los datos esperados', orderId, cuerpo)
    return { estado: 'error' }
  }

  return { estado: 'capturada', guiaId, email, importeCents: Math.round(Number(valor) * 100) }
}

/**
 * Verifica la firma de un evento de webhook contra la propia API de PayPal.
 * `headers` son los del request tal como llegaron; `cuerpoBruto` es el JSON
 * ya parseado del body (PayPal pide el objeto, no el texto crudo, para
 * esta verificación en particular).
 */
export async function verificarFirmaWebhook(headers: Headers, cuerpoBruto: unknown): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID
  if (!webhookId) {
    console.error('[paypal] falta PAYPAL_WEBHOOK_ID')
    return false
  }

  const token = await tokenDeAcceso()

  const respuesta = await fetch(`${API_BASE}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      auth_algo: headers.get('paypal-auth-algo'),
      cert_url: headers.get('paypal-cert-url'),
      transmission_id: headers.get('paypal-transmission-id'),
      transmission_sig: headers.get('paypal-transmission-sig'),
      transmission_time: headers.get('paypal-transmission-time'),
      webhook_id: webhookId,
      webhook_event: cuerpoBruto,
    }),
    cache: 'no-store',
  })

  if (!respuesta.ok) return false
  const resultado = (await respuesta.json()) as { verification_status?: string }
  return resultado.verification_status === 'SUCCESS'
}
