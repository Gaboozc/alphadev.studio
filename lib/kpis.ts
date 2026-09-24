// Los números del panel de admin: cuánto se vendió, a quién, y cuántos
// mensajes llegaron — por período. Corre con la sesión del admin
// (createClient() normal), no con la clave de servicio: son lecturas, y
// RLS ya le permite al admin ver todo.

import { createClient } from '@/lib/supabase/server'

function haceDias(n: number): Date {
  const fecha = new Date()
  fecha.setDate(fecha.getDate() - n)
  return fecha
}

function inicioDeHoy(): Date {
  const fecha = new Date()
  fecha.setHours(0, 0, 0, 0)
  return fecha
}

// ─── Ventas ──────────────────────────────────────────────────────────────────

export interface ResumenVentas {
  ventas: number
  importeCents: number
  /** Primera compra de ese correo, alguna vez — no solo dentro del período. */
  nuevas: number
  /** El correo ya había comprado algo antes de esta venta. */
  recurrentes: number
}

export interface KpisVentas {
  hoy: ResumenVentas
  semana: ResumenVentas
  mes: ResumenVentas
  total: ResumenVentas
}

function resumenVacio(): ResumenVentas {
  return { ventas: 0, importeCents: 0, nuevas: 0, recurrentes: 0 }
}

export async function calcularKpisVentas(): Promise<KpisVentas> {
  const vacio: KpisVentas = { hoy: resumenVacio(), semana: resumenVacio(), mes: resumenVacio(), total: resumenVacio() }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ventas')
    .select('email, importe_cents, creado_el')
    .eq('estado', 'pagada')
    .order('creado_el', { ascending: true })

  if (error || !data) {
    if (error) console.error('[kpis] no se pudieron calcular las ventas:', error.message)
    return vacio
  }

  const inicioHoy = inicioDeHoy()
  const inicioSemana = haceDias(7)
  const inicioMes = haceDias(30)
  const vistos = new Set<string>()

  const acc = vacio

  // Orden ascendente: para cuando llegamos a una venta, `vistos` refleja
  // TODO lo anterior de ese correo, sin importar si cayó dentro o fuera del
  // período — así "nueva" siempre significa "la primera compra de ese
  // correo en la vida del negocio", no "la primera de esta semana".
  for (const fila of data as { email: string; importe_cents: number; creado_el: string }[]) {
    const fecha = new Date(fila.creado_el)
    const esNueva = !vistos.has(fila.email)
    vistos.add(fila.email)

    const cubos: ResumenVentas[] = [acc.total]
    if (fecha >= inicioMes) cubos.push(acc.mes)
    if (fecha >= inicioSemana) cubos.push(acc.semana)
    if (fecha >= inicioHoy) cubos.push(acc.hoy)

    for (const cubo of cubos) {
      cubo.ventas += 1
      cubo.importeCents += fila.importe_cents
      if (esNueva) cubo.nuevas += 1
      else cubo.recurrentes += 1
    }
  }

  return acc
}

// ─── Mensajes ────────────────────────────────────────────────────────────────

export interface KpisMensajes {
  hoy: number
  semana: number
  mes: number
  total: number
}

export async function calcularKpisMensajes(): Promise<KpisMensajes> {
  const vacio: KpisMensajes = { hoy: 0, semana: 0, mes: 0, total: 0 }

  const supabase = await createClient()
  const { data, error } = await supabase.from('mensajes').select('creado_el')

  if (error || !data) {
    if (error) console.error('[kpis] no se pudieron calcular los mensajes:', error.message)
    return vacio
  }

  const inicioHoy = inicioDeHoy()
  const inicioSemana = haceDias(7)
  const inicioMes = haceDias(30)
  const acc = vacio

  for (const fila of data as { creado_el: string }[]) {
    const fecha = new Date(fila.creado_el)
    acc.total += 1
    if (fecha >= inicioMes) acc.mes += 1
    if (fecha >= inicioSemana) acc.semana += 1
    if (fecha >= inicioHoy) acc.hoy += 1
  }

  return acc
}
