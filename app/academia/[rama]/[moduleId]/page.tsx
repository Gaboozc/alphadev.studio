import { notFound } from 'next/navigation'
import { MODULES } from '../../modules'
import { RAMAS, RAMA_OF_TRACK, moduleHref, ramaBySlug } from '../../ramas'
import { metaOfTrack, toModuleMeta } from '../../queries'
import ModuleContent from './ModuleContent'

interface Props {
  params: Promise<{ rama: string; moduleId: string }>
}

export function generateStaticParams() {
  return MODULES.map((m) => ({
    rama: RAMAS.find((r) => r.id === RAMA_OF_TRACK[m.track])!.slug,
    moduleId: m.id,
  }))
}

export default async function ModulePage({ params }: Props) {
  const { rama, moduleId } = await params
  const mod = MODULES.find((m) => m.id === moduleId)
  if (!mod || !ramaBySlug(rama)) notFound()

  // Un módulo vive en una sola rama: pedirlo bajo otra es una URL inválida,
  // no una alternativa. Así evitamos servir la misma página en dos URLs.
  if (moduleHref(mod) !== `/academia/${rama}/${moduleId}`) notFound()

  // Solo metadatos: la página del módulo lista lecciones, no las muestra.
  return <ModuleContent module={toModuleMeta(mod)} trackModules={metaOfTrack(mod.track)} />
}
