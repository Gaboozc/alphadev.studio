// Todo lo que toca la tabla `ventas`.
//
// Dos mundos conviven aquí, y la frontera importa:
//
//   - Quien COMPRA no tiene sesión (no hay cuentas de comprador). Registrar
//     su compra o firmar su descarga necesita el cliente de SERVICIO
//     (clienteServicio(), de lib/supabase/admin.ts), porque no hay una
//     sesión con la que las políticas RLS puedan razonar.
//   - El ADMIN sí tiene sesión (entró por /acceso). Leer el panel de ventas
//     o reenviar/revocar un enlace usa el cliente normal — RLS lo permite
//     porque es_admin() es true.
//
// Este es el ÚNICO archivo del proyecto que puede importar
// lib/supabase/admin — lo exige eslint.config.mjs.

import { randomBytes } from 'node:crypto'
import { createClient } from '@/lib/supabase/server'
import { clienteServicio } from '@/lib/supabase/admin'

export interface Venta {
  id: string
  guia_id: string
  paypal_order_id: string
  email: string
  importe_cents: number
  moneda: string
  estado: 'pagada' | 'reembolsada'
  token: string
  token_vence_el: string
  descargas: number
  creado_el: string
}

/** Una venta con el título de su guía, para el panel. */
export interface VentaConGuia extends Venta {
  guia_titulo: string
  guia_slug: string
}

const DIAS_VIGENCIA_ENLACE = 7
const MAX_DESCARGAS = 5

function generarToken(): string {
  // 24 bytes al azar, en base64url (sin +, /, ni relleno =): sale limpio en
  // una URL sin necesidad de codificarlo.
  return randomBytes(24).toString('base64url')
}

// ─── Comprador sin sesión (cliente de servicio) ────────────────────────────

/**
 * Registra una compra YA VERIFICADA contra PayPal (el llamador comprobó el
 * capture antes de invocar esto — esta función no vuelve a comprobar nada,
 * confía en quien la llama). Idempotente por `paypal_order_id`: si el
 * webhook y el retorno del comprador llegan los dos, la segunda llamada
 * devuelve el token que ya existía en vez de crear una fila nueva.
 */
export async function registrarVenta(datos: {
  guiaId: string
  paypalOrderId: string
  email: string
  importeCents: number
}): Promise<{ token: string }> {
  const admin = clienteServicio()
  const token = generarToken()
  const token_vence_el = new Date(Date.now() + DIAS_VIGENCIA_ENLACE * 24 * 60 * 60 * 1000).toISOString()

  const { error } = await admin.from('ventas').insert({
    guia_id: datos.guiaId,
    paypal_order_id: datos.paypalOrderId,
    email: datos.email.trim().toLowerCase(),
    importe_cents: datos.importeCents,
    moneda: 'USD',
    token,
    token_vence_el,
  })

  if (!error) return { token }

  // 23505 = unique_violation. Es la carrera esperada: el retorno del
  // comprador y el webhook registrando la MISMA orden casi a la vez. Quien
  // llegó segundo no falla, adopta el token que ya quedó guardado.
  if (error.code === '23505') {
    const { data } = await admin
      .from('ventas')
      .select('token')
      .eq('paypal_order_id', datos.paypalOrderId)
      .maybeSingle()
    if (data) return { token: data.token }
  }

  throw new Error(`[ventas] no se pudo registrar: ${error.message}`)
}

/**
 * El token de descarga de una orden ya registrada, o null si no existe
 * ninguna venta para ella todavía. Sirve para dos casos: alguien recarga
 * /recursos/gracias después de ya haber recibido su enlace, o el webhook y
 * el retorno del comprador llegaron casi a la vez y uno de los dos se
 * encuentra con `capturarOrden` devolviendo 'ya_capturada' — en vez de
 * fallar, va a buscar aquí lo que el otro ya registró.
 */
export async function tokenDeOrden(paypalOrderId: string): Promise<string | null> {
  const admin = clienteServicio()
  const { data } = await admin
    .from('ventas')
    .select('token')
    .eq('paypal_order_id', paypalOrderId)
    .maybeSingle()
  return data?.token ?? null
}

/** Reembolso confirmado por PayPal: la venta deja de dar acceso. */
export async function revocarVentaPorOrden(paypalOrderId: string): Promise<void> {
  const admin = clienteServicio()
  const { error } = await admin
    .from('ventas')
    .update({ estado: 'reembolsada' })
    .eq('paypal_order_id', paypalOrderId)
  if (error) throw new Error(`[ventas] no se pudo revocar: ${error.message}`)
}

/**
 * Valida el token de descarga y cuenta la descarga, atómicamente (la función
 * de Postgres hace el UPDATE...RETURNING en una sola sentencia — dos clics
 * simultáneos no se saltan el límite de 5). Devuelve la ruta del archivo si
 * el token es válido, o null si no.
 */
export async function consumirDescarga(
  token: string,
): Promise<{ archivo: string; titulo: string; tituloEn: string | null } | null> {
  const admin = clienteServicio()
  const { data, error } = await admin.rpc('consumir_descarga', { p_token: token })
  if (error || !data || data.length === 0) return null

  const fila = data[0] as { archivo: string; titulo: string; titulo_en: string | null }
  return { archivo: fila.archivo, titulo: fila.titulo, tituloEn: fila.titulo_en }
}

/** Firma una URL de 60 segundos para el objeto ya validado por consumirDescarga(). */
export async function firmarDescarga(archivo: string): Promise<string | null> {
  const admin = clienteServicio()
  const nombre = archivo.split('/').pop() ?? 'guia.pdf'
  const { data, error } = await admin.storage
    .from('guias')
    .createSignedUrl(archivo, 60, { download: nombre })
  if (error || !data) return null
  return data.signedUrl
}

// ─── Admin (sesión propia) ──────────────────────────────────────────────────

export async function listarVentas(): Promise<VentaConGuia[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ventas')
    .select('*, guias(titulo, slug)')
    .order('creado_el', { ascending: false })
    .limit(500)

  if (error) {
    console.error('[ventas] no se pudieron listar:', error.message)
    return []
  }

  return (data ?? []).map((fila) => {
    const { guias, ...venta } = fila as Venta & { guias: { titulo: string; slug: string } | null }
    return {
      ...venta,
      guia_titulo: guias?.titulo ?? '(guía borrada)',
      guia_slug: guias?.slug ?? '',
    }
  })
}

/** Totales por guía, para el "¿cómo se mueve esto?" que pidió Gabriel. */
export async function totalesPorGuia(): Promise<{ guia_id: string; ventas: number; importe_cents: number }[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ventas')
    .select('guia_id, importe_cents')
    .eq('estado', 'pagada')

  if (error) {
    console.error('[ventas] no se pudieron totalizar:', error.message)
    return []
  }

  const acumulado = new Map<string, { ventas: number; importe_cents: number }>()
  for (const fila of (data ?? []) as { guia_id: string; importe_cents: number }[]) {
    const actual = acumulado.get(fila.guia_id) ?? { ventas: 0, importe_cents: 0 }
    actual.ventas += 1
    actual.importe_cents += fila.importe_cents
    acumulado.set(fila.guia_id, actual)
  }
  return [...acumulado.entries()].map(([guia_id, totales]) => ({ guia_id, ...totales }))
}

/** Renueva el token y el vencimiento — para quien perdió su enlace. */
export async function reenviarEnlace(id: string): Promise<{ token: string } | null> {
  const supabase = await createClient()
  const token = generarToken()
  const token_vence_el = new Date(Date.now() + DIAS_VIGENCIA_ENLACE * 24 * 60 * 60 * 1000).toISOString()

  const { error } = await supabase
    .from('ventas')
    .update({ token, token_vence_el, descargas: 0 })
    .eq('id', id)

  if (error) {
    console.error('[ventas] no se pudo renovar el enlace:', error.message)
    return null
  }
  return { token }
}

export async function revocarVenta(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('ventas').update({ estado: 'reembolsada' }).eq('id', id)
  if (error) throw new Error(error.message)
}

export { MAX_DESCARGAS }
