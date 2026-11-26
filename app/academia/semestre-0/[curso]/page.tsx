import type { Metadata } from 'next'
import { CursoVista } from '@/app/academia/_universidad/vistas'
import { getCatalogo } from '@/app/academia/_universidad/contenido'
import { cursoPorSlug, cursosDePrograma, tituloCurso } from '@/lib/academia/universidad'

interface Props {
  params: Promise<{ curso: string }>
}

export function generateStaticParams() {
  return cursosDePrograma(getCatalogo(), 'S0').map((c) => ({ curso: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { curso } = await params
  const c = cursoPorSlug(getCatalogo(), 'S0', curso)
  return {
    title: c ? `${c.code} · ${tituloCurso(c, 'es')}` : 'Academia',
    robots: { index: false, follow: false },
  }
}

export default async function Page({ params }: Props) {
  const { curso } = await params
  return <CursoVista programa="semestre-0" curso={curso} lang="es" />
}
