// Espejo en inglés de una lección de la Biblioteca. La lección solo existe en
// español: se muestra tal cual con el aviso "This lesson is only available in
// Spanish for now." (spec §3.3). La ruta española NO cambia.
import { AvisoSoloEs } from '@/app/academia/_universidad/vistas'
import LessonRoute, { generateStaticParams } from '@/app/academia/[rama]/[moduleId]/[lessonId]/page'

export { generateStaticParams }

export default async function LessonRouteEn(props: Parameters<typeof LessonRoute>[0]) {
  return (
    <>
      <div className="acad-wrap" data-aviso-idioma="es">
        <AvisoSoloEs />
      </div>
      {await LessonRoute(props)}
    </>
  )
}
