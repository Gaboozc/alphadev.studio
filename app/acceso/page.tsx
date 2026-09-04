import type { Metadata } from 'next'
import { Suspense } from 'react'
import AccesoForm from './AccesoForm'

export const metadata: Metadata = {
  title: 'Acceso — Academia',
  robots: { index: false, follow: false },
}

export default function AccesoPage() {
  return (
    <Suspense fallback={null}>
      <AccesoForm />
    </Suspense>
  )
}
