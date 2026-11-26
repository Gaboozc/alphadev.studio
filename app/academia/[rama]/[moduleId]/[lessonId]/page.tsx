import { notFound } from 'next/navigation'
import { MODULES } from '../../../modules'
import { RAMAS, RAMA_OF_TRACK } from '../../../ramas'
import { lessonProps } from './lesson-props'
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
  const props = lessonProps(rama, moduleId, lessonId)
  if (!props) notFound()
  return <LessonPage {...props} />
}
