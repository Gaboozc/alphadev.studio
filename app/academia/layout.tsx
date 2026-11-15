import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AcademiaNav from './components/AcademiaNav'
import ProgresoProvider from './components/ProgresoProvider'
import { allMeta } from './queries'
import { construirIndice } from '@/lib/academia/progreso'
import { getUsuario } from '@/lib/supabase/server'
import { esAdmin } from '@/lib/perfil'
import './academia.css'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function AcademiaLayout({ children }: { children: React.ReactNode }) {
  // ── La protección real ──
  // Ocurre en el servidor y ANTES de leer el catálogo. Si no hay sesión, no se
  // construye nada: el contenido nunca sale de aquí. El middleware hace lo
  // mismo antes, pero esta es la capa de la que dependemos de verdad.
  //
  // Bypass SOLO en next dev si ACADEMIA_DEV_BYPASS=1 (no commitear activo).
  const bypassDev =
    process.env.NODE_ENV === 'development' &&
    process.env.ACADEMIA_DEV_BYPASS === '1'

  let email = ''
  let admin = false

  if (bypassDev) {
    email = 'dev@local'
    admin = true
  } else {
    const usuario = await getUsuario()
    if (!usuario) redirect('/acceso')
    email = usuario.email ?? ''
    admin = await esAdmin()
  }

  const catalogo = allMeta()
  const indice = construirIndice(catalogo)

  return (
    <div data-academia>
      <ProgresoProvider indice={indice}>
        <AcademiaNav catalogo={catalogo} email={email} admin={admin} />
        <div style={{ paddingTop: '3.5rem' }}>
          {children}
        </div>
      </ProgresoProvider>
    </div>
  )
}
