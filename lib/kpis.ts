// Los números del Resumen del panel: ventas de guías (PayPal) + ventas de
// servicios (registradas a mano), sobre el rango de fechas que el admin
// elija. Corre con la sesión del admin (createClient() normal) — son
// lecturas, y RLS ya le permite al admin ver todo.
//
// Nunca se suman cents de monedas distintas: los servicios se cotizan en
// USD o MXN según el segmento de cliente (ver docs/paquetes-y-precios.md si
// existe), y un total que mezclara las dos sería un número que no significa
// nada. Todo lo que junta dinero de varias filas devuelve un total POR
// MONEDA, nunca un solo número.

import { createClient } from '@/lib/supabase/server'
import { listarVentasServiciosEnRango, type VentaServicio } from '@/lib/ventasServicios'

export interface TotalPorMoneda {
  moneda: string
  cents: number
}

function sumarPorMoneda(filas: { moneda: string; importe_cents: number }[]): TotalPorMoneda[] {
  const acumulado = new Map<string, number>()
  for (const fila of filas) {
    acumulado.set(fila.moneda, (acumulado.get(fila.moneda) ?? 0) + fila.importe_cents)
  }
  return [...acumulado.entries()].map(([moneda, cents]) => ({ moneda, cents }))
}

// ─── Rango de fechas ─────────────────────────────────────────────────────────

/** 'YYYY-MM-DD' en hora local — lo que entiende un <input type="date">. */
export function formatoFecha(fecha: Date): string {
  const y = fecha.getFullYear()
  const m = String(fecha.getMonth() + 1).padStart(2, '0')
  const d = String(fecha.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Por defecto, los últimos 30 días — hasta que el admin elija otro rango. */
export function rangoPorDefecto(): { desde: string; hasta: string } {
  const hoy = new Date()
  const hace30 = new Date()
  hace30.setDate(hace30.getDate() - 29) // 30 días incluyendo hoy
  return { desde: formatoFecha(hace30), hasta: formatoFecha(hoy) }
}

/** Valida 'YYYY-MM-DD' y que desde <= hasta; si no, cae al rango por defecto. */
export function normalizarRango(desdeRaw?: string, hastaRaw?: string): { desde: string; hasta: string } {
  const formato = /^\d{4}-\d{2}-\d{2}$/
  if (desdeRaw && hastaRaw && formato.test(desdeRaw) && formato.test(hastaRaw) && desdeRaw <= hastaRaw) {
    return { desde: desdeRaw, hasta: hastaRaw }
  }
  return rangoPorDefecto()
}

// ─── Guías (PayPal) ──────────────────────────────────────────────────────────

export interface ResumenGuias {
  ventas: number
  nuevas: number
  recurrentes: number
  importeCents: number // siempre USD — es la única moneda que acepta la tienda de guías
}

async function calcularResumenGuias(desde: string, hasta: string): Promise<ResumenGuias> {
  const vacio: ResumenGuias = { ventas: 0, nuevas: 0, recurrentes: 0, importeCents: 0 }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ventas')
    .select('email, importe_cents, creado_el')
    .eq('estado', 'pagada')
    .order('creado_el', { ascending: true })

  if (error || !data) {
    if (error) console.error('[kpis] no se pudieron calcular las guías:', error.message)
    return vacio
  }

  // "Nueva" = la primera compra de ese correo EN LA VIDA DEL NEGOCIO, no
  // solo dentro del rango elegido. Por eso se recorre TODO el historial en
  // orden ascendente sin importar el rango, y solo se suma al resultado la
  // venta que cae dentro de [desde, hasta].
  const vistos = new Set<string>()
  const resumen = { ...vacio }

  for (const fila of data as { email: string; importe_cents: number; creado_el: string }[]) {
    const fecha = formatoFecha(new Date(fila.creado_el))
    const esNueva = !vistos.has(fila.email)
    vistos.add(fila.email)

    if (fecha < desde || fecha > hasta) continue

    resumen.ventas += 1
    resumen.importeCents += fila.importe_cents
    if (esNueva) resumen.nuevas += 1
    else resumen.recurrentes += 1
  }

  return resumen
}

// ─── Servicios (registro manual) ────────────────────────────────────────────

export interface ResumenServicios {
  cerradas: number
  pendientes: number
  canceladas: number
  porMoneda: TotalPorMoneda[] // solo de las cerradas (estado = 'pagado')
}

export interface ResumenVendedor {
  vendedor: string
  ventas: number
  porMoneda: TotalPorMoneda[]
}

async function calcularResumenServicios(
  filas: VentaServicio[],
): Promise<{ resumen: ResumenServicios; porVendedor: ResumenVendedor[] }> {
  const pagadas = filas.filter((f) => f.estado === 'pagado')

  const resumen: ResumenServicios = {
    cerradas: pagadas.length,
    pendientes: filas.filter((f) => f.estado === 'pendiente').length,
    canceladas: filas.filter((f) => f.estado === 'cancelado').length,
    porMoneda: sumarPorMoneda(pagadas),
  }

  const porVendedorMap = new Map<string, VentaServicio[]>()
  for (const fila of pagadas) {
    const lista = porVendedorMap.get(fila.vendedor) ?? []
    lista.push(fila)
    porVendedorMap.set(fila.vendedor, lista)
  }

  const porVendedor: ResumenVendedor[] = [...porVendedorMap.entries()]
    .map(([vendedor, ventasDeVendedor]) => ({
      vendedor,
      ventas: ventasDeVendedor.length,
      porMoneda: sumarPorMoneda(ventasDeVendedor),
    }))
    .sort((a, b) => b.ventas - a.ventas)

  return { resumen, porVendedor }
}

// ─── Mensajes ────────────────────────────────────────────────────────────────

async function contarMensajesEnRango(desde: string, hasta: string): Promise<number> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('mensajes').select('creado_el')

  if (error || !data) {
    if (error) console.error('[kpis] no se pudieron contar los mensajes:', error.message)
    return 0
  }

  return (data as { creado_el: string }[]).filter((fila) => {
    const fecha = formatoFecha(new Date(fila.creado_el))
    return fecha >= desde && fecha <= hasta
  }).length
}

// ─── Todo junto ──────────────────────────────────────────────────────────────

export interface ResumenRango {
  desde: string
  hasta: string
  guias: ResumenGuias
  servicios: ResumenServicios
  porVendedor: ResumenVendedor[]
  mensajes: number
}

export async function calcularResumen(desdeRaw?: string, hastaRaw?: string): Promise<ResumenRango> {
  const { desde, hasta } = normalizarRango(desdeRaw, hastaRaw)

  const [guias, filasServicios, mensajes] = await Promise.all([
    calcularResumenGuias(desde, hasta),
    listarVentasServiciosEnRango(desde, hasta),
    contarMensajesEnRango(desde, hasta),
  ])

  const { resumen: servicios, porVendedor } = await calcularResumenServicios(filasServicios)

  return { desde, hasta, guias, servicios, porVendedor, mensajes }
}
