// Middleware: refresca la sesión de Supabase en cada petición y manda a
// /acceso a quien no la tenga.
//
// IMPORTANTE: esto NO es la protección. Es comodidad de navegación.
// La versión de Next.js instalada tiene avisos publicados de bypass de
// middleware en App Router, y aunque no los tuviera, apoyar la seguridad en
// una sola capa es un error de diseño. La comprobación que de verdad protege
// vive en `app/academia/layout.tsx`, en el servidor, justo antes de leer el
// contenido. Ver el módulo web-5 de la Academia.

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PROTEGIDAS = ['/academia']

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    },
  )

  // Refresca el token si caducó. Debe ir antes de cualquier comprobación.
  const { data } = await supabase.auth.getUser()
  const usuario = data.user

  const ruta = request.nextUrl.pathname
  const esProtegida = PROTEGIDAS.some((p) => ruta === p || ruta.startsWith(p + '/'))

  if (esProtegida && !usuario) {
    const url = request.nextUrl.clone()
    url.pathname = '/acceso'
    // Guardamos a dónde iba para devolverlo ahí después de entrar.
    url.searchParams.set('destino', ruta)
    return NextResponse.redirect(url)
  }

  // Quien ya entró no necesita ver el formulario otra vez.
  if (ruta === '/acceso' && usuario) {
    const url = request.nextUrl.clone()
    url.pathname = '/academia'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    // Todo salvo archivos estáticos e imágenes.
    '/((?!_next/static|_next/image|favicon.ico|assets|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|vcf)$).*)',
  ],
}
