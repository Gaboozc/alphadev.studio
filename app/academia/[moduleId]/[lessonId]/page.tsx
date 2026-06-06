import { notFound } from 'next/navigation'
import { MODULES } from '../../modules'
import LessonPage from './LessonPage'

interface Props {
  params: Promise<{ moduleId: string; lessonId: string }>
}

export function generateStaticParams() {
  return MODULES.flatMap((m) =>
    m.lessons.map((l) => ({ moduleId: m.id, lessonId: l.id }))
  )
}

export default async function LessonRoute({ params }: Props) {
  const { moduleId, lessonId } = await params
  const mod = MODULES.find((m) => m.id === moduleId)
  if (!mod) notFound()

  const lesson = mod.lessons.find((l) => l.id === lessonId)
  if (!lesson) notFound()

  const trackModules = MODULES.filter((m) => m.track === mod.track)
  const lessonIndex = mod.lessons.findIndex((l) => l.id === lessonId)
  const prevLesson = lessonIndex > 0 ? mod.lessons[lessonIndex - 1] : null
  const nextLesson = lessonIndex < mod.lessons.length - 1 ? mod.lessons[lessonIndex + 1] : null

  return (
    <LessonPage
      module={mod}
      lesson={lesson}
      trackModules={trackModules}
      lessonIndex={lessonIndex}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
    />
  )
}
