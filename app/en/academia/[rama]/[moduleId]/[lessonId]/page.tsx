// Espejo en inglés de una lección de la Biblioteca (spec §3.3). La ruta
// española NO cambia.
// - Si Prof. X ya la tradujo (87 lecciones «mantener», content/academia/
//   biblioteca-en/), se muestra en inglés con el mismo chrome.
// - Si no, se muestra el español con el aviso "This lesson is only available
//   in Spanish for now." (nunca 404).
import { notFound } from 'next/navigation'
import { AvisoSoloEs } from '@/app/academia/_universidad/vistas'
import { leccionEn } from '@/app/academia/_universidad/biblioteca-en'
import LessonPage from '@/app/academia/[rama]/[moduleId]/[lessonId]/LessonPage'
import { generateStaticParams } from '@/app/academia/[rama]/[moduleId]/[lessonId]/page'
import { lessonProps } from '@/app/academia/[rama]/[moduleId]/[lessonId]/lesson-props'

export { generateStaticParams }

interface Props {
  params: Promise<{ rama: string; moduleId: string; lessonId: string }>
}

export default async function LessonRouteEn({ params }: Props) {
  const { rama, moduleId, lessonId } = await params
  const props = lessonProps(rama, moduleId, lessonId)
  if (!props) notFound()

  const en = leccionEn(rama, moduleId, lessonId)
  if (en) {
    // Solo se sustituye el texto; tipo, preguntas y embed son los del original.
    return (
      <div lang="en" data-idioma-leccion="en">
        <LessonPage {...props} lesson={{ ...props.lesson, ...en }} />
      </div>
    )
  }

  return (
    <>
      <div className="acad-wrap" data-aviso-idioma="es">
        <AvisoSoloEs />
      </div>
      <div lang="es" data-idioma-leccion="es">
        <LessonPage {...props} />
      </div>
    </>
  )
}
