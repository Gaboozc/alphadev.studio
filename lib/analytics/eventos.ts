// Eventos de medición. Las conversiones solo salen tras un éxito confirmado
// en el servidor. Los clics de CTA son secundarios y no se marcan como
// conversión. Nada de PII, query strings ni identificadores de pedido.

export const CONVERSIONES = ['generate_lead', 'purchase'] as const
export type NombreConversion = (typeof CONVERSIONES)[number]

export const SECUNDARIOS = ['cta_click'] as const
export type NombreSecundario = (typeof SECUNDARIOS)[number]

export const CTA_SLOTS = [
  'hero_primary',
  'hero_secondary',
  'nav',
  'cta_section',
  'servicios',
] as const
export type CtaSlot = (typeof CTA_SLOTS)[number]

const PARAMETROS_PROHIBIDOS = new Set([
  'email',
  'e-mail',
  'mail',
  'phone',
  'tel',
  'telephone',
  'nombre',
  'name',
  'message',
  'mensaje',
  'user_id',
  'userId',
  'client_id',
  'order_id',
  'orderId',
  'transaction_id',
  'transactionId',
  'token',
  'email_address',
  'phone_number',
  'address',
  'dni',
  'page_location',
  'page_referrer',
  'search',
  'q',
])

export type EventoGa = {
  name: string
  params: Record<string, string>
  conversion: boolean
}

export function esCtaSlot(valor: string): valor is CtaSlot {
  return (CTA_SLOTS as readonly string[]).includes(valor)
}

export function urlSinQuery(href: string): string {
  try {
    const url = new URL(href, 'https://www.alphadev.studio')
    url.search = ''
    url.hash = ''
    return `${url.origin}${url.pathname}`
  } catch {
    const sinQuery = href.split('?')[0] ?? ''
    return sinQuery.split('#')[0] ?? ''
  }
}

export function paramsSeguros(
  entrada: Record<string, unknown> | undefined,
): Record<string, string> {
  if (!entrada) return {}
  const out: Record<string, string> = {}
  for (const [clave, valor] of Object.entries(entrada)) {
    if (PARAMETROS_PROHIBIDOS.has(clave)) continue
    if (typeof valor !== 'string' && typeof valor !== 'number' && typeof valor !== 'boolean') {
      continue
    }
    const texto = String(valor)
    if (texto.includes('@')) continue
    if (/^\+?\d[\d\s().-]{7,}$/.test(texto)) continue
    out[clave] = texto
  }
  return out
}

export function eventoPageView(pathname: string): EventoGa {
  return {
    name: 'page_view',
    params: paramsSeguros({ page_path: pathname.split('?')[0] ?? pathname }),
    conversion: false,
  }
}

export function eventoConversion(nombre: NombreConversion): EventoGa {
  return {
    name: nombre,
    params: {},
    conversion: true,
  }
}

export function eventoCta(slot: CtaSlot): EventoGa {
  return {
    name: 'cta_click',
    params: { slot },
    conversion: false,
  }
}

export function claveDedupeConversion(nombre: NombreConversion): string {
  return `ads-conv:${nombre}`
}

export type AlmacenDedupe = {
  getItem(clave: string): string | null
  setItem(clave: string, valor: string): void
}

export function yaEmitidaConversion(
  almacen: AlmacenDedupe | null,
  nombre: NombreConversion,
): boolean {
  if (!almacen) return false
  try {
    return almacen.getItem(claveDedupeConversion(nombre)) === '1'
  } catch {
    return false
  }
}

export function marcarConversionEmitida(
  almacen: AlmacenDedupe | null,
  nombre: NombreConversion,
): void {
  if (!almacen) return
  try {
    almacen.setItem(claveDedupeConversion(nombre), '1')
  } catch {
    // Sin sessionStorage se acepta un posible duplicado en esta visita.
  }
}

export function debeEmitirConversion(
  almacen: AlmacenDedupe | null,
  nombre: NombreConversion,
  opts: { consentGranted: boolean; measurementId: string | null },
): boolean {
  if (!opts.consentGranted || !opts.measurementId) return false
  return !yaEmitidaConversion(almacen, nombre)
}
