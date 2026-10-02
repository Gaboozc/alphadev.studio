// Ventas de servicios registradas a mano — sitios web, paquetes, lo que
// cierre alguien del equipo con un cliente. Distinto de lib/ventas.ts (las
// compras automáticas de guías por PayPal): aquí no hay comprador anónimo,
// así que todo corre con la sesión del admin, sin cliente de servicio.
//
// Los tipos, constantes y la validación viven en ventasServiciosTipos.ts,
// aparte: ese archivo no importa nada de Supabase, así que un componente de
// cliente puede usar MONEDAS/METODOS_PAGO/ESTADOS_SERVICIO como valores
// (para pintar un <select>) sin arrastrar next/headers al navegador.

import { createClient } from '@/lib/supabase/server'
import type { VentaServicio, VentaServicioNueva } from '@/lib/ventasServiciosTipos'

export * from '@/lib/ventasServiciosTipos'

export async function crearVentaServicio(datos: VentaServicioNueva): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('ventas_servicios').insert(datos)
  if (error) throw new Error(error.message)
}

export async function actualizarVentaServicio(id: string, datos: VentaServicioNueva): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('ventas_servicios').update(datos).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function eliminarVentaServicio(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('ventas_servicios').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function ventaServicioPorId(id: string): Promise<VentaServicio | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('ventas_servicios').select('*').eq('id', id).maybeSingle()
  if (error || !data) return null
  return data as VentaServicio
}

/** Todas, más recientes primero — para la lista del panel. */
export async function listarVentasServicios(): Promise<VentaServicio[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ventas_servicios')
    .select('*')
    .order('fecha_venta', { ascending: false })
    .order('creado_el', { ascending: false })

  if (error) {
    console.error('[ventas_servicios] no se pudieron listar:', error.message)
    return []
  }
  return (data ?? []) as VentaServicio[]
}

/** Solo las de un rango de fechas (inclusive) — para el Resumen. */
export async function listarVentasServiciosEnRango(desde: string, hasta: string): Promise<VentaServicio[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ventas_servicios')
    .select('*')
    .gte('fecha_venta', desde)
    .lte('fecha_venta', hasta)

  if (error) {
    console.error('[ventas_servicios] no se pudo consultar el rango:', error.message)
    return []
  }
  return (data ?? []) as VentaServicio[]
}
