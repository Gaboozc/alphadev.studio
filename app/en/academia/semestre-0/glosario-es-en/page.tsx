import type { Metadata } from 'next'
import { GlosarioVista } from '@/app/academia/_universidad/vistas'

export const metadata: Metadata = {
  title: 'ES–EN Glossary · Academy',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <GlosarioVista lang="en" />
}
