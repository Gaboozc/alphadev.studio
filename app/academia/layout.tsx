import type { Metadata } from 'next'
import PasswordGate from './components/PasswordGate'
import AcademiaNav from './components/AcademiaNav'
import { allMeta } from './queries'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AcademiaLayout({ children }: { children: React.ReactNode }) {
  // El catálogo se construye aquí, en el servidor, y baja al menú sin el cuerpo
  // de las lecciones. Ver la nota de ModuleMeta en types.ts.
  const catalogo = allMeta()

  return (
    <PasswordGate>
      <AcademiaNav catalogo={catalogo} />
      <div style={{ paddingTop: '3.5rem' }}>
        {children}
      </div>
    </PasswordGate>
  )
}
