import type { Metadata } from 'next'
import { ProgramaVista } from '@/app/academia/_universidad/vistas'
import { programaPorSlug } from '@/lib/academia/universidad'

export const metadata: Metadata = {
  title: `${programaPorSlug('ingenieria-software-ia')!.es} — Academia`,
  robots: { index: false, follow: false },
}

export default function Page() {
  return <ProgramaVista slug="ingenieria-software-ia" lang="es" />
}
