// Consentimiento de analítica. Por defecto no hay permiso: no se carga
// ningún script de terceros hasta que la persona acepta. Rechazar y
// revocar son el mismo estado persistido.

export type ConsentState = 'unknown' | 'granted' | 'denied'

export const CLAVE_CONSENTIMIENTO = 'ads-analytics-consent'
export const EVENTO_CONSENTIMIENTO = 'ads-consent-change'
export const EVENTO_ABRIR_BANNER = 'ads-consent-open'

export function parseConsent(bruto: string | null | undefined): ConsentState {
  if (bruto === 'granted' || bruto === 'denied') return bruto
  return 'unknown'
}

export function debeCargarGa4(opts: {
  measurementId: string | null
  consent: ConsentState
}): boolean {
  return Boolean(opts.measurementId) && opts.consent === 'granted'
}

/** Sin elección, se trata como deny: no hay medición “por si acaso”. */
export function consentimientoEfectivo(consent: ConsentState): 'granted' | 'denied' {
  return consent === 'granted' ? 'granted' : 'denied'
}

export type AlmacenConsentimiento = {
  getItem(clave: string): string | null
  setItem(clave: string, valor: string): void
  removeItem(clave: string): void
}

export function leerConsentimiento(almacen: AlmacenConsentimiento | null): ConsentState {
  if (!almacen) return 'unknown'
  try {
    return parseConsent(almacen.getItem(CLAVE_CONSENTIMIENTO))
  } catch {
    return 'unknown'
  }
}

export function guardarConsentimiento(
  almacen: AlmacenConsentimiento | null,
  valor: 'granted' | 'denied',
): ConsentState {
  if (!almacen) return valor
  try {
    almacen.setItem(CLAVE_CONSENTIMIENTO, valor)
  } catch {
    // Sin almacenamiento el valor vale para esta visita.
  }
  return valor
}

export function revocarConsentimiento(almacen: AlmacenConsentimiento | null): ConsentState {
  return guardarConsentimiento(almacen, 'denied')
}
