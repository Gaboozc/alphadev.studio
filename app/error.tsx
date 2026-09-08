'use client'

// Frontera de error de las rutas del sitio. Sustituye a la página que falló,
// pero el layout —navbar, footer, idioma— sigue en pie, así que quien visita
// no se queda sin salidas.

import { useEffect } from 'react'
import ErrorScreen from '@/components/ErrorScreen'
import { useLang } from '@/lib/i18n/LanguageContext'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { dict } = useLang()
  const e = dict.errors

  useEffect(() => {
    // En producción Next reemplaza el mensaje por un `digest` para no filtrar
    // detalles del servidor al navegador. Ese digest es lo que permite cruzar
    // este error con la línea real del registro de Vercel.
    console.error('[error]', error.digest ?? error.message)
  }, [error])

  return (
    <ErrorScreen
      label={e.error_label}
      title={e.error_title}
      body={e.error_body}
      acciones={[
        { label: e.retry, onClick: reset, primary: true },
        { label: e.home, href: '/' },
      ]}
    />
  )
}
