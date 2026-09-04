// Cliente de Supabase para el SERVIDOR (Server Components, Route Handlers,
// Server Actions). La sesión vive en cookies httpOnly que el navegador no
// puede leer desde JavaScript — ver el módulo web-5 de la Academia.

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // @supabase/ssr no marca httpOnly por su cuenta. Lo forzamos:
              // es lo que impide que un script de la página lea la sesión.
              cookieStore.set(name, value, {
                ...options,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
              })
            })
          } catch {
            // Un Server Component no puede escribir cookies. No es un error:
            // el middleware ya refrescó la sesión antes de llegar aquí.
          }
        },
      },
    },
  )
}

/**
 * Devuelve el usuario autenticado, o null.
 *
 * Usa getUser() y NO getSession(): getSession lee la cookie sin verificarla
 * contra el servidor de Supabase, así que un valor manipulado pasaría.
 * getUser valida el token en cada llamada. En el servidor, siempre getUser.
 */
export async function getUsuario() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error) return null
  return data.user
}
