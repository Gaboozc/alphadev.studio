// Espejo en inglés de un módulo de la Biblioteca: español con aviso.
import { AvisoSoloEs } from '@/app/academia/_universidad/vistas'
import ModulePage, { generateStaticParams } from '@/app/academia/[rama]/[moduleId]/page'

export { generateStaticParams }

export default async function ModulePageEn(props: Parameters<typeof ModulePage>[0]) {
  return (
    <>
      <div className="acad-wrap">
        <AvisoSoloEs />
      </div>
      {await ModulePage(props)}
    </>
  )
}
