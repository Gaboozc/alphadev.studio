import { redirect } from 'next/navigation'
import AcademiaNav from './components/AcademiaNav'
import ProgresoProvider from './components/ProgresoProvider'
import { allMeta } from './queries'
import { construirIndice } from '@/lib/academia/progreso'
import { getUsuario } from '@/lib/supabase/server'
import { esAdmin } from '@/lib/perfil'
import './academia.css'

// Puerta y chrome de la Academia, compartidos por /academia y /en/academia
// (una sola puerta: los dos layouts llaman a esta función).
export default async function AcademiaShell({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: 'es' | 'en'
}) {
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
    // `lang` va en el HTML del servidor (P2-04): el <html lang> del layout raíz
    // no conoce la ruta; este contenedor sí, y los lectores de pantalla lo
    // respetan desde el primer HTML. El efecto de LanguageContext queda de respaldo.
    <div data-academia lang={lang}>
      <ProgresoProvider indice={indice}>
        <AcademiaNav catalogo={catalogo} email={email} admin={admin} />
        <div style={{ paddingTop: '3.5rem' }}>
          {children}
        </div>
      </ProgresoProvider>
    </div>
  )
}
