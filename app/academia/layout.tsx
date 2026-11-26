import type { Metadata } from 'next'
import AcademiaShell from './AcademiaShell'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

// La protección real (sesión comprobada en el servidor antes de leer nada)
// vive en AcademiaShell, compartida con /en/academia.
export default function AcademiaLayout({ children }: { children: React.ReactNode }) {
  return <AcademiaShell lang="es">{children}</AcademiaShell>
}
