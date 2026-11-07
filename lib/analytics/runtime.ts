// Pegamento de cliente para GA4. No se carga el script hasta consentimiento
// + ID válido. Los eventos no llevan query ni PII. Este módulo no habla
// con la red de Google por sí mismo en tests: el envío pasa por gtag.

import { debeCargarGa4, leerConsentimiento, type ConsentState } from './consent'
import {
  debeEmitirConversion,
  eventoConversion,
  eventoCta,
  eventoPageView,
  marcarConversionEmitida,
  type CtaSlot,
  type NombreConversion,
} from './eventos'
import { measurementIdDesdeEnv } from './id'

type Gtag = (...args: unknown[]) => void

function almacenLocal(): Storage | null {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

function almacenSesion(): Storage | null {
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

export function idMedicionActual(): string | null {
  return measurementIdDesdeEnv({
    NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  })
}

export function consentimientoActual(): ConsentState {
  return leerConsentimiento(almacenLocal())
}

export function rutaPrivadaParaMedicion(pathname: string): boolean {
  return (
    pathname === '/acceso' ||
    pathname.startsWith('/acceso/') ||
    pathname.startsWith('/academia') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/tarjeta')
  )
}

function gtag(): Gtag | undefined {
  const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] }
  return w.gtag
}

function emitir(nombre: string, params: Record<string, string>) {
  const fn = gtag()
  if (!fn) return
  fn('event', nombre, params)
}

export function cargarGa4SiCorresponde(pathname: string): boolean {
  const id = idMedicionActual()
  const consent = consentimientoActual()
  if (rutaPrivadaParaMedicion(pathname)) return false
  if (!debeCargarGa4({ measurementId: id, consent })) return false
  if (!id) return false

  const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] }
  if (!w.dataLayer) w.dataLayer = []
  if (!w.gtag) {
    w.gtag = (...args: unknown[]) => {
      w.dataLayer?.push(args)
    }
  }

  if (!document.getElementById('ads-gtag')) {
    w.gtag('js', new Date())
    w.gtag('config', id, {
      send_page_view: false,
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    })
    const script = document.createElement('script')
    script.id = 'ads-gtag'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
    document.head.appendChild(script)
  }

  const vista = eventoPageView(pathname)
  emitir(vista.name, vista.params)
  return true
}

export function aplicarRevocacionGa4(): void {
  const fn = gtag()
  if (!fn) return
  fn('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

export function registrarClicCta(slot: CtaSlot): void {
  const id = idMedicionActual()
  if (!debeCargarGa4({ measurementId: id, consent: consentimientoActual() })) return
  const ev = eventoCta(slot)
  emitir(ev.name, ev.params)
}

export function registrarConversion(nombre: NombreConversion): boolean {
  const id = idMedicionActual()
  const consentGranted = consentimientoActual() === 'granted'
  if (!debeEmitirConversion(almacenSesion(), nombre, { consentGranted, measurementId: id })) {
    return false
  }
  const ev = eventoConversion(nombre)
  emitir(ev.name, ev.params)
  marcarConversionEmitida(almacenSesion(), nombre)
  return true
}
