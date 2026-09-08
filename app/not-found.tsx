import type { Metadata } from 'next'
import NotFoundContent from './NotFoundContent'

// noindex: una página de error nunca debe acabar en resultados de búsqueda.
export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return <NotFoundContent />
}
