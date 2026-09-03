import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RAMAS, ramaBySlug } from '../ramas'
import RamaContent from './RamaContent'

interface Props {
  params: Promise<{ rama: string }>
}

export function generateStaticParams() {
  return RAMAS.map((r) => ({ rama: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { rama } = await params
  const meta = ramaBySlug(rama)
  return {
    title: meta ? `${meta.label} — Academia` : 'Academia',
    robots: { index: false, follow: false },
  }
}

export default async function RamaPage({ params }: Props) {
  const { rama } = await params
  const meta = ramaBySlug(rama)

  // Nota: las URLs viejas eran /academia/<módulo> y ahora son
  // /academia/<rama>/<módulo>. No se redirigen: `redirect()` no se ejecuta en
  // rutas prerenderizadas como ésta (queda como instrucción que el router no
  // aplica). El mapeo de URLs viejas va en el middleware de la Fase 2.
  if (!meta) notFound()

  return <RamaContent ramaId={meta.id} />
}
