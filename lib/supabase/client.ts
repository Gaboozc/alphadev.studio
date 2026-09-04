// Cliente de Supabase para el NAVEGADOR. Solo se usa en el formulario de
// acceso: el resto de la aplicación consulta desde el servidor.
//
// La clave que lleva es la pública: está diseñada para viajar al navegador y
// solo puede hacer lo que permitan las políticas de la base.

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
