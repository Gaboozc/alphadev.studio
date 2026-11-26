// Espejo en inglés de las rutas de aprendizaje: contenido solo en español.
import { AvisoSoloEs } from '@/app/academia/_universidad/vistas'
import RutasPage, { metadata } from '@/app/academia/rutas/page'

export { metadata }

export default function RutasPageEn() {
  return (
    <>
      <div className="acad-wrap">
        <AvisoSoloEs />
      </div>
      <RutasPage />
    </>
  )
}
