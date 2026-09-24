// Cliente de Supabase con la clave de SERVICIO. Bypassa RLS por completo.
//
// Existe por una sola razón: quien compra una guía no tiene sesión (no hay
// cuentas de comprador — decisión de producto). Registrar esa compra o
// firmar la descarga tiene que hacerlo el servidor con un privilegio que la
// sesión de nadie tiene, porque no hay sesión.
//
// `import 'server-only'` hace que empaquetar esto en un bundle de cliente
// falle en build, no en producción. Y el único módulo que puede importar
// este archivo es `lib/ventas.ts` — lo exige `eslint.config.mjs`, para que
// "solo lib/ventas.ts lo usa" sea una regla que el CI comprueba, no una que
// alguien tiene que recordar.

import 'server-only'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function clienteServicio() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      'Faltan NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY. ' +
        'La segunda es la clave de servicio de Supabase (Project Settings → ' +
        'API → service_role) y NUNCA lleva el prefijo NEXT_PUBLIC_: si lo ' +
        'llevara, Next.js la metería en el JavaScript del navegador.',
    )
  }

  // Cinturón y tirantes: si alguien renombra la variable con el prefijo
  // público por error, que falle aquí y no en silencio en el navegador de
  // un visitante.
  if (process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY no debería existir. La clave de ' +
        'servicio va en SUPABASE_SERVICE_ROLE_KEY, sin el prefijo NEXT_PUBLIC_.',
    )
  }

  return createSupabaseClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
