'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SECCIONES = [
  { href: '/admin', label: 'Resumen' },
  { href: '/admin/mensajes', label: 'Mensajes' },
  { href: '/admin/guias', label: 'Guías' },
  { href: '/admin/ventas', label: 'Ventas' },
] as const

// Reusa .adm-tab tal cual: mismo lenguaje visual que las pestañas de estado
// del inbox, para que el panel se sienta como una sola pieza en vez de tres
// páginas sueltas.
export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="adm-tabs" aria-label="Secciones del panel">
      {SECCIONES.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`adm-tab${pathname === href ? ' is-active' : ''}`}
          aria-current={pathname === href ? 'page' : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
