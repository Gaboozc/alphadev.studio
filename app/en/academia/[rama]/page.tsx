// Espejo en inglés de una rama de la Biblioteca. El contenido de las ramas
// existe solo en español: se muestra el español con aviso, nunca un 404
// (spec §3.3). Las URLs son las de siempre con el prefijo /en.
import { AvisoSoloEs } from '@/app/academia/_universidad/vistas'
import RamaPage, { generateMetadata, generateStaticParams } from '@/app/academia/[rama]/page'

export { generateMetadata, generateStaticParams }

export default async function RamaPageEn(props: Parameters<typeof RamaPage>[0]) {
  return (
    <>
      <div className="acad-wrap">
        <AvisoSoloEs />
      </div>
      {await RamaPage(props)}
    </>
  )
}
