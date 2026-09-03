import { notFound } from 'next/navigation'
import { MODULES } from '../../../modules'
import { RAMAS, RAMA_OF_TRACK, lessonHref, ramaBySlug } from '../../../ramas'
import { modulesOfTrack } from '../../../queries'
import LessonPage from './LessonPage'

interface Props {
  params: Promise<{ rama: string; moduleId: string; lessonId: string }>
}

export function generateStaticParams() {
  return MODULES.flatMap((m) =>
    m.lessons.map((l) => ({
      rama: RAMAS.find((r) => r.id === RAMA_OF_TRACK[m.track])!.slug,
      moduleId: m.id,
      lessonId: l.id,
    })),
  )
}

export default async function LessonRoute({ params }: Props) {
  const { rama, moduleId, lessonId } = await params
  const mod = MODULES.find((m) => m.id === moduleId)
  if (!mod || !ramaBySlug(rama)) notFound()

  const lesson = mod.lessons.find((l) => l.id === lessonId)
  if (!lesson) notFound()

  // La lección solo existe bajo la rama de su módulo (ver nota en [rama]/page.tsx).
  if (lessonHref(mod, lessonId) !== `/academia/${rama}/${moduleId}/${lessonId}`) notFound()

  const lessonIndex = mod.lessons.findIndex((l) => l.id === lessonId)

  return (
    <LessonPage
      module={mod}
      lesson={lesson}
      trackModules={modulesOfTrack(mod.track)}
      lessonIndex={lessonIndex}
      prevLesson={lessonIndex > 0 ? mod.lessons[lessonIndex - 1] : null}
      nextLesson={lessonIndex < mod.lessons.length - 1 ? mod.lessons[lessonIndex + 1] : null}
    />
  )
}
