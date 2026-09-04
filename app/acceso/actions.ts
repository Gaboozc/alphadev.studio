'use server'

// El inicio de sesión ocurre en el SERVIDOR a propósito.
//
// Si se hace desde el navegador, @supabase/ssr guarda la sesión con
// document.cookie, y una cookie escrita por JavaScript nunca puede ser
// httpOnly: cualquier script de la página —incluida una dependencia
// comprometida— podría leerla. Haciéndolo aquí, es el servidor quien pone la
// cookie y puede marcarla httpOnly. Ver la lección w5-l3 de la Academia.

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/**
 * Solo se admiten rutas internas como destino tras entrar.
 *
 * `destino` viene de la URL, así que un atacante puede proponer lo que quiera.
 * Sin esta comprobación, /acceso?destino=https://sitio-falso.com mandaría al
 * usuario fuera justo después de autenticarse, que es el escenario clásico de
 * una redirección abierta.
 */
function destinoSeguro(valor: string): string {
  if (!valor.startsWith('/')) return '/academia'
  if (valor.startsWith('//')) return '/academia' // //host equivale a un absoluto
  if (!valor.startsWith('/academia')) return '/academia'
  return valor
}

export async function entrar(_previo: string | null, formData: FormData): Promise<string | null> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const destino = destinoSeguro(String(formData.get('destino') ?? '/academia'))

  if (!email || !password) return 'Escribe tu correo y tu contraseña.'

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  // Un único mensaje para los dos casos: así el formulario no sirve para
  // averiguar qué correos están registrados (lección w5-l2).
  if (error) return 'Correo o contraseña incorrectos.'

  redirect(destino)
}
