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
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // ¿Responde Supabase desde el servidor de Vercel? Es la otra mitad del
  // problema: las variables pueden estar bien y la red no llegar.
  let alcanzable: unknown = 'no comprobado'
  if (url && key) {
    try {
      const r = await fetch(url + '/auth/v1/health', {
        headers: { apikey: key },
        cache: 'no-store',
      })
      alcanzable = { estado: r.status, ok: r.ok }
    } catch (e) {
      alcanzable = { error: e instanceof Error ? e.message : String(e) }
    }
  }

  return NextResponse.json({
    NEXT_PUBLIC_SUPABASE_URL: describir(url),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: describir(key),
    supabaseAlcanzable: alcanzable,
    // Nombres parecidos, por si hubo una errata al teclear
    parecidas: Object.keys(process.env)
      .filter((k) => /SUPA|SUPBA|SUBA/i.test(k))
      .sort(),
  })
}
