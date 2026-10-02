// Tipos, constantes y validación de una venta de servicio — sin ningún
// import de Supabase.
//
// Por qué está separado de lib/ventasServicios.ts: ese archivo importa
// createClient() de lib/supabase/server.ts, que a su vez usa next/headers —
// una API exclusiva de Server Components. VentaServicioForm.tsx (cliente)
// necesita MONEDAS/METODOS_PAGO/ESTADOS_SERVICIO como VALORES en tiempo de
// ejecución para pintar los <option> del formulario, no solo como tipos, así
// que un `import type` no alcanza. Si esas constantes vivieran en el mismo
// archivo que createClient(), importarlas arrastraría next/headers al
// bundle del navegador — exactamente el error que tiró el build la primera
// vez que se escribió esto.

export const MONEDAS = ['USD', 'MXN'] as const
export type Moneda = (typeof MONEDAS)[number]

export const METODOS_PAGO = ['transferencia', 'paypal', 'mercadopago', 'efectivo', 'otro'] as const
export type MetodoPago = (typeof METODOS_PAGO)[number]

export const ESTADOS_SERVICIO = ['pendiente', 'pagado', 'cancelado'] as const
export type EstadoServicio = (typeof ESTADOS_SERVICIO)[number]

export interface VentaServicio {
  id: string
  cliente: string
  servicio: string
  vendedor: string
  importe_cents: number
  moneda: Moneda
  metodo_pago: MetodoPago
  estado: EstadoServicio
  notas: string | null
  fecha_venta: string
  creado_el: string
}

export interface VentaServicioNueva {
  cliente: string
  servicio: string
  vendedor: string
  importe_cents: number
  moneda: Moneda
  metodo_pago: MetodoPago
  estado: EstadoServicio
  notas: string | null
  fecha_venta: string
}

const LIMITES = { cliente: 160, servicio: 200, vendedor: 120, notas: 2000 } as const

function esMoneda(v: string): v is Moneda {
  return (MONEDAS as readonly string[]).includes(v)
}
function esMetodoPago(v: string): v is MetodoPago {
  return (METODOS_PAGO as readonly string[]).includes(v)
}
function esEstadoServicio(v: string): v is EstadoServicio {
  return (ESTADOS_SERVICIO as readonly string[]).includes(v)
}

export type Validacion = { ok: true; datos: VentaServicioNueva } | { ok: false; motivo: string }

/** Sin Zod, a mano — mismo criterio que lib/mensajes.ts y lib/guias.ts. */
export function validarVentaServicio(bruto: {
  cliente: string
  servicio: string
  vendedor: string
  importe: string
  moneda: string
  metodo_pago: string
  estado: string
  notas: string
  fecha_venta: string
}): Validacion {
  const cliente = bruto.cliente.trim()
  const servicio = bruto.servicio.trim()
  const vendedor = bruto.vendedor.trim()
  const notas = bruto.notas.trim()

  if (!cliente || cliente.length > LIMITES.cliente) return { ok: false, motivo: 'cliente inválido' }
  if (!servicio || servicio.length > LIMITES.servicio) return { ok: false, motivo: 'servicio inválido' }
  if (!vendedor || vendedor.length > LIMITES.vendedor) return { ok: false, motivo: 'vendedor inválido' }
  if (notas.length > LIMITES.notas) return { ok: false, motivo: 'notas demasiado largas' }
  if (!esMoneda(bruto.moneda)) return { ok: false, motivo: 'moneda inválida' }
  if (!esMetodoPago(bruto.metodo_pago)) return { ok: false, motivo: 'método de pago inválido' }
  if (!esEstadoServicio(bruto.estado)) return { ok: false, motivo: 'estado inválido' }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(bruto.fecha_venta)) return { ok: false, motivo: 'fecha inválida' }

  const importe = Math.round(Number(bruto.importe) * 100)
  if (!Number.isFinite(importe) || importe <= 0) return { ok: false, motivo: 'importe inválido' }

  return {
    ok: true,
    datos: {
      cliente,
      servicio,
      vendedor,
      importe_cents: importe,
      moneda: bruto.moneda,
      metodo_pago: bruto.metodo_pago,
      estado: bruto.estado,
      notas: notas || null,
      fecha_venta: bruto.fecha_venta,
    },
  }
}
