import type { Metadata } from 'next'
import AcademiaContent from './AcademiaContent'
import { LEARNING_PATHS, RETOS } from './modules'
import { allMeta } from './queries'

export const metadata: Metadata = {
  title: 'Academia',
  robots: { index: false, follow: false },
}

export default function AcademiaPage() {
  // Los conteos se calculan en el servidor. Al cliente solo baja el catálogo
  // sin cuerpo de lecciones (ver ModuleMeta en types.ts).
  const catalogo = allMeta()

  return (
    <AcademiaContent
      catalogo={catalogo}
      totalLecciones={catalogo.reduce((a, m) => a + m.lessons.length, 0)}
      rutas={LEARNING_PATHS.length}
      retos={RETOS.length}
      retosActivos={RETOS.filter((r) => r.status === 'activo').length}
    />
  )
}
