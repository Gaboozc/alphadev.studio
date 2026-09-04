// DIAGNÓSTICO TEMPORAL — quitar cuando el acceso funcione en producción.
//
// Informa si las variables de entorno llegaron al runtime, sin revelar sus
// valores: solo si están definidas, su longitud y su prefijo. Con eso se
// distingue "no llegaron" de "llegaron mal escritas o con espacios".

import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function describir(valor: string | undefined) {
  if (valor === undefined) return { definida: false }
  return {
    definida: true,
    longitud: valor.length,
    prefijo: valor.slice(0, 12),
    conEspacios: valor !== valor.trim(),
    vacia: valor.trim() === '',
  }
}

export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_SUPABASE_URL: describir(process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: describir(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    // Nombres parecidos, por si hubo una errata al teclear
    parecidas: Object.keys(process.env)
      .filter((k) => /SUPA|SUPBA|SUBA/i.test(k))
      .sort(),
  })
}
