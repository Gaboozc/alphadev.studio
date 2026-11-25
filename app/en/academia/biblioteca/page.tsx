import type { Metadata } from 'next'
import { BibliotecaVista } from '@/app/academia/_universidad/vistas'
import { RAMAS } from '@/app/academia/ramas'

export const metadata: Metadata = {
  title: 'Library — Academy',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <BibliotecaVista lang="en" ramas={RAMAS.map((r) => ({ slug: r.slug, label: r.label }))} />
}
