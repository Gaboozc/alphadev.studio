import type { Metadata } from 'next'
import { UnidadVista } from '@/app/academia/_universidad/vistas'
import { getCatalogo, unidadesS0, existeUnidad } from '@/app/academia/_universidad/contenido'
import { cursosDePrograma } from '@/lib/academia/universidad'

interface Props {
  params: Promise<{ curso: string; unidad: string }>
}

export function generateStaticParams() {
  return cursosDePrograma(getCatalogo(), 'S0').flatMap((c) => [
    ...unidadesS0(c, 'es').map((u) => ({ curso: c.slug, unidad: u.slug })),
    ...['checkpoint', 'proyecto-final'].filter((s) => existeUnidad(c, s)).map((s) => ({ curso: c.slug, unidad: s })),
  ])
}

export const metadata: Metadata = {
  title: 'Semestre 0 — Academia',
  robots: { index: false, follow: false },
}

export default async function Page({ params }: Props) {
  const { curso, unidad } = await params
  return <UnidadVista curso={curso} unidad={unidad} lang="es" />
}
