import type { Metadata } from 'next'
import { ProgramaVista } from '@/app/academia/_universidad/vistas'
import { programaPorSlug } from '@/lib/academia/universidad'

export const metadata: Metadata = {
  title: `${programaPorSlug('optativas')!.en} — Academy`,
  robots: { index: false, follow: false },
}

export default function Page() {
  return <ProgramaVista slug="optativas" lang="en" />
}
