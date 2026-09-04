// Middleware: refresca la sesión de Supabase y manda a /acceso a quien no la
// tenga.
//
// IMPORTANTE: esto NO es la protección. Es comodidad de navegación.
// La versión de Next.js instalada tiene avisos publicados de bypass de
// middleware en App Router, y aunque no los tuviera, apoyar la seguridad en
// una sola capa es un error de diseño. La comprobación que de verdad protege
// vive en `app/academia/layout.tsx`, en el servidor, justo antes de leer el
// contenido. Ver el módulo web-5 de la Academia.
//
// El `matcher` cubre SOLO las rutas privadas y la de acceso. Es deliberado:
// si este archivo falla, el sitio público no puede caerse con él.

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

function aAcceso(request: NextRequest, destino?: string) {
  const url = request.nextUrl.clone()
  url.pathname = '/acceso'
  url.search = ''
  if (destino) url.searchParams.set('destino', destino)
  return NextResponse.redirect(url)
}

export async function middleware(request: NextRequest) {
  const ruta = request.nextUrl.pathname
  const esAcademia = ruta === '/academia' || ruta.startsWith('/academia/')

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Sin configuración no se puede verificar a nadie. Se deniega el acceso a lo
  // privado, pero no se lanza: un fallo de configuración no debe traducirse en
  // un 500 para el visitante.
  if (!url || !key) {
    return esAcademia ? aAcceso(request, ruta) : NextResponse.next()
  }

  try {
    let response = NextResponse.next({ request })

    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            // Mismas garantías que en el servidor: la sesión no debe ser
            // legible desde JavaScript.
            response.cookies.set(name, value, {
              ...options,
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
            }),
          )
        },
      },
    })

    // Refresca el token si caducó. Debe ir antes de cualquier comprobación.
    const { data } = await supabase.auth.getUser()
    const usuario = data.user

    if (esAcademia && !usuario) return aAcceso(request, ruta)

    // Quien ya entró no necesita ver el formulario otra vez.
    if (ruta === '/acceso' && usuario) {
      const destino = request.nextUrl.clone()
      destino.pathname = '/academia'
      destino.search = ''
      return NextResponse.redirect(destino)
    }

    return response
  } catch {
    // Si Supabase no responde, se deniega lo privado y se deja pasar el resto.
    // El layout de la Academia vuelve a comprobar, así que nada queda expuesto.
    return esAcademia ? aAcceso(request, ruta) : NextResponse.next()
  }
}

export const config = {
  matcher: ['/academia', '/academia/:path*', '/acceso'],
}
