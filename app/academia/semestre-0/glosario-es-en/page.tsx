import type { Metadata } from 'next'
import { GlosarioVista } from '@/app/academia/_universidad/vistas'

// Recurso de S0 (respuesta 5 de Prof. X). Ruta fija: gana a [curso].
export const metadata: Metadata = {
  title: 'Glosario ES–EN · Academia',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <GlosarioVista lang="es" />
}
