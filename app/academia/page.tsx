import type { Metadata } from 'next'
import { PortadaUniversidad } from './_universidad/vistas'

export const metadata: Metadata = {
  title: 'Academia',
  robots: { index: false, follow: false },
}

// Portada tipo universidad (decisión de Gabe, 25 nov 2026): Semestre 0,
// después las 3 carreras S1–S6, optativas y la Biblioteca. La portada
// anterior por ramas (AcademiaContent) sigue en el repo; las ramas y sus
// lecciones se siguen abriendo en las mismas URLs desde la Biblioteca.
export default function AcademiaPage() {
  return <PortadaUniversidad lang="es" />
}
