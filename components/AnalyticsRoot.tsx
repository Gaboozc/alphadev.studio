'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import { useLang } from '@/lib/i18n/LanguageContext'
import {
  EVENTO_ABRIR_BANNER,
  EVENTO_CONSENTIMIENTO,
  guardarConsentimiento,
  leerConsentimiento,
  revocarConsentimiento,
  type ConsentState,
} from '@/lib/analytics/consent'
import {
  aplicarRevocacionGa4,
  cargarGa4SiCorresponde,
  idMedicionActual,
  rutaPrivadaParaMedicion,
} from '@/lib/analytics/runtime'

function almacenLocal(): Storage | null {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

function suscribirConsentimiento(avisar: () => void): () => void {
  window.addEventListener(EVENTO_CONSENTIMIENTO, avisar)
  return () => window.removeEventListener(EVENTO_CONSENTIMIENTO, avisar)
}

function leerConsentimientoCliente(): ConsentState {
  return leerConsentimiento(almacenLocal())
}

export default function AnalyticsRoot() {
  const pathname = usePathname() ?? '/'
  const { lang } = useLang()
  const id = idMedicionActual()
  const consent = useSyncExternalStore(
    suscribirConsentimiento,
    leerConsentimientoCliente,
    () => 'unknown' as ConsentState,
  )
  const [forzarBanner, setForzarBanner] = useState(false)

  useEffect(() => {
    const alAbrir = () => setForzarBanner(true)
    window.addEventListener(EVENTO_ABRIR_BANNER, alAbrir)
    return () => window.removeEventListener(EVENTO_ABRIR_BANNER, alAbrir)
  }, [])

  useEffect(() => {
    if (!id) return
    if (consent === 'granted') cargarGa4SiCorresponde(pathname)
    if (consent === 'denied') aplicarRevocacionGa4()
  }, [id, consent, pathname])

  if (!id || rutaPrivadaParaMedicion(pathname)) return null

  const mostrarBanner = consent === 'unknown' || forzarBanner

  const copy =
    lang === 'en'
      ? {
          title: 'Optional measurement',
          body: 'If you accept, we load Google Analytics to count visits and confirmed conversions. We do not send names, emails, phone numbers, message text, or checkout tokens. You can reject or change this later.',
          accept: 'Accept',
          reject: 'Reject',
        }
      : {
          title: 'Medición opcional',
          body: 'Si aceptas, cargamos Google Analytics para contar visitas y conversiones confirmadas. No enviamos nombres, correos, teléfonos, el texto de tus mensajes ni tokens de pago. Puedes rechazar o cambiarlo después.',
          accept: 'Aceptar',
          reject: 'Rechazar',
        }

  function aplicar(valor: 'granted' | 'denied') {
    if (valor === 'denied') {
      revocarConsentimiento(almacenLocal())
      aplicarRevocacionGa4()
    } else {
      guardarConsentimiento(almacenLocal(), 'granted')
    }
    setForzarBanner(false)
    window.dispatchEvent(new Event(EVENTO_CONSENTIMIENTO))
  }

  if (!mostrarBanner) return null

  return (
    <div className="ads-consent" role="dialog" aria-labelledby="ads-consent-title" aria-describedby="ads-consent-body">
      <div className="ads-consent-inner">
        <p id="ads-consent-title" className="ads-consent-title">
          {copy.title}
        </p>
        <p id="ads-consent-body" className="ads-consent-body">
          {copy.body}
        </p>
        <div className="ads-consent-actions">
          <button type="button" className="btn-glow ads-consent-accept" onClick={() => aplicar('granted')}>
            {copy.accept}
          </button>
          <button type="button" className="ads-consent-reject" onClick={() => aplicar('denied')}>
            {copy.reject}
          </button>
        </div>
      </div>
    </div>
  )
}
