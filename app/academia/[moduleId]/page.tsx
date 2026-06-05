import { notFound } from 'next/navigation'
import { MODULES } from '../modules'
import ModuleContent from './ModuleContent'

interface Props {
  params: Promise<{ moduleId: string }>
}

export function generateStaticParams() {
  return MODULES.map((m) => ({ moduleId: m.id }))
}

export default async function ModulePage({ params }: Props) {
  const { moduleId } = await params
  const mod = MODULES.find((m) => m.id === moduleId)
  if (!mod) notFound()

  const trackModules = MODULES.filter((m) => m.track === mod.track)

  return <ModuleContent module={mod} trackModules={trackModules} />
}
