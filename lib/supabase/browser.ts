// Cliente de Supabase para el NAVEGADOR — pero no para sesión ni para auth.
//
// El resto del proyecto evita a propósito un cliente de Supabase en el
// navegador para todo lo que toca autenticación: `@supabase/ssr` en cliente
// guarda la sesión con `document.cookie`, y una cookie escrita por
// JavaScript nunca puede ser httpOnly (ver `app/acceso/actions.ts`).
//
// Esto es distinto. Sirve para UNA sola operación: subir un archivo a una
// signed upload URL ya generada por el servidor (`lib/guias.ts`,
// `crearUrlDeSubida`). La autorización de esa subida vive en el token de la
// URL, no en ninguna sesión — este cliente nunca lee ni escribe cookies
// (`persistSession: false`), así que la advertencia de arriba no aplica.

import { createClient } from '@supabase/supabase-js'

export function clienteDeSubida() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error('Faltan las variables públicas de Supabase.')
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
