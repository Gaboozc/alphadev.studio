// Middleware: refresca la sesión de Supabase y manda a /acceso a quien no la
// tenga.
//
// IMPORTANTE: esto NO es la protección. Es comodidad de navegación.
// La versión de Next.js instalada tiene avisos publicados de bypass de
// middleware en App Router, y aunque no los tuviera, apoyar la seguridad en
// una sola capa es un error de diseño. La comprobación que de verdad protege
// vive en el servidor, justo antes de leer el contenido: `app/academia/
// layout.tsx` para la Academia, `app/admin/layout.tsx` (que además exige
// esAdmin(), no solo sesión) para el panel. Ver el módulo web-5 de la
// Academia.
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
  // El panel de admin (/admin) exige sesión igual que la Academia, pero NO
  // exige que esa sesión sea admin: eso lo comprueba app/admin/layout.tsx
  // con esAdmin(). Aquí solo se descarta a quien no tiene sesión en
  // absoluto, para no dejar pasar una petición sin cookies hasta el layout.
  const esAdminRoute = ruta === '/admin' || ruta.startsWith('/admin/')
  const esPrivada = esAcademia || esAdminRoute

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Sin configuración no se puede verificar a nadie. Se deniega el acceso a lo
  // privado, pero no se lanza: un fallo de configuración no debe traducirse en
  // un 500 para el visitante.
  if (!url || !key) {
    return esPrivada ? aAcceso(request, ruta) : NextResponse.next()
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

    if (esPrivada && !usuario) return aAcceso(request, ruta)

    // Quien ya entró no necesita ver el formulario otra vez.
    //
    // El `?destino=` se respeta solo si empieza con una de las rutas
    // privadas que este archivo conoce — mismo criterio que destinoSeguro()
    // en app/acceso/actions.ts, duplicado aquí porque ese archivo es
    // 'use server' y no se puede importar desde el middleware. Sin esto,
    // alguien con sesión abierta que visitara /admin vía /acceso?destino=
    // /admin rebotaba siempre a /academia, igual que le pasaba a quien
    // recién iniciaba sesión antes de este arreglo.
    if (ruta === '/acceso' && usuario) {
      const pedido = request.nextUrl.searchParams.get('destino') ?? ''
      const vaAAdmin = pedido.startsWith('/admin')
      const destino = request.nextUrl.clone()
      destino.pathname = vaAAdmin ? '/admin' : '/academia'
      destino.search = ''
      return NextResponse.redirect(destino)
    }

    return response
  } catch {
    // Si Supabase no responde, se deniega lo privado y se deja pasar el resto.
    // Los layouts de la Academia y del admin vuelven a comprobar, así que
    // nada queda expuesto.
    return esPrivada ? aAcceso(request, ruta) : NextResponse.next()
  }
}

export const config = {
  matcher: ['/academia', '/academia/:path*', '/admin', '/admin/:path*', '/acceso'],
}
