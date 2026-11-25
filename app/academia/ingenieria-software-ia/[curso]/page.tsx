import type { Metadata } from 'next'
import { CursoVista } from '@/app/academia/_universidad/vistas'
import { getCatalogo } from '@/app/academia/_universidad/contenido'
import { cursoPorSlug, cursosDePrograma, tituloCurso } from '@/lib/academia/universidad'

interface Props {
  params: Promise<{ curso: string }>
}

export function generateStaticParams() {
  return cursosDePrograma(getCatalogo(), 'IS').map((c) => ({ curso: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { curso } = await params
  const c = cursoPorSlug(getCatalogo(), 'IS', curso)
  return {
    title: c ? `${c.code} · ${tituloCurso(c, 'es')}` : 'Academia',
    robots: { index: false, follow: false },
  }
}

export default async function Page({ params }: Props) {
  const { curso } = await params
  return <CursoVista programa="ingenieria-software-ia" curso={curso} lang="es" />
}
