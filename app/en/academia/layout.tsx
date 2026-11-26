// /en/academia usa EXACTAMENTE la misma puerta que /academia: AcademiaShell
// comprueba la sesión en el servidor antes de leer nada. Solo cambia el
// idioma del contenedor (lang="en" desde el primer HTML, P2-04).
import AcademiaShell from '@/app/academia/AcademiaShell'

export { metadata } from '@/app/academia/layout'

export default function AcademiaLayoutEn({ children }: { children: React.ReactNode }) {
  return <AcademiaShell lang="en">{children}</AcademiaShell>
}
