import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AcademiaNav from './components/AcademiaNav'
import { allMeta } from './queries'
import { getUsuario } from '@/lib/supabase/server'
import { esAdmin } from '@/lib/perfil'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function AcademiaLayout({ children }: { children: React.ReactNode }) {
  // ── La protección real ──
  // Ocurre en el servidor y ANTES de leer el catálogo. Si no hay sesión, no se
  // construye nada: el contenido nunca sale de aquí. El middleware hace lo
  // mismo antes, pero esta es la capa de la que dependemos de verdad.
  const usuario = await getUsuario()
  if (!usuario) redirect('/acceso')

  const catalogo = allMeta()
  const admin = await esAdmin()

  return (
    <>
      <AcademiaNav catalogo={catalogo} email={usuario.email ?? ''} admin={admin} />
      <div style={{ paddingTop: '3.5rem' }}>
        {children}
      </div>
    </>
  )
}
