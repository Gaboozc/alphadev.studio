// Perfil del usuario de la sesión: nombre, correo y si es administrador.

import { createClient, getUsuario } from '@/lib/supabase/server'

export interface Perfil {
  user_id: string
  email: string
  nombre: string | null
  es_admin: boolean
}

/**
 * Perfil de quien tiene la sesión abierta, o null.
 *
 * Nunca lanza: cualquier fallo se trata como "no hay perfil", que deniega en
 * vez de romper la página. Mismo criterio que getUsuario().
 */
export async function getPerfil(): Promise<Perfil | null> {
  try {
    const usuario = await getUsuario()
    if (!usuario) return null

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('perfiles')
      .select('user_id, email, nombre, es_admin')
      .eq('user_id', usuario.id)
      .maybeSingle()

    if (error || !data) return null
    return data as Perfil
  } catch {
    return null
  }
}

/** true solo si hay sesión Y su perfil tiene es_admin. */
export async function esAdmin(): Promise<boolean> {
  const perfil = await getPerfil()
  return perfil?.es_admin === true
}
