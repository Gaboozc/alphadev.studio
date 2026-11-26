import type { Metadata } from 'next'
import { PortadaUniversidad } from '@/app/academia/_universidad/vistas'

export const metadata: Metadata = {
  title: 'Academy',
  robots: { index: false, follow: false },
}

export default function AcademiaPageEn() {
  return <PortadaUniversidad lang="en" />
}
