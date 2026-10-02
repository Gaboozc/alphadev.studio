'use server'

// Acciones del panel de servicios. Cada una vuelve a comprobar esAdmin() por
// su cuenta — son endpoints públicos que no pasan por app/admin/layout.tsx.

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { esAdmin } from '@/lib/perfil'
import {
  actualizarVentaServicio,
  crearVentaServicio,
  eliminarVentaServicio,
  validarVentaServicio,
} from '@/lib/ventasServicios'

export type ResultadoGuardar = { ok: true } | { ok: false; motivo: string }

/** Crea o actualiza según venga `id` en el formulario. */
export async function guardarVentaServicio(
  _prev: ResultadoGuardar | null,
  formData: FormData,
): Promise<ResultadoGuardar> {
  if (!(await esAdmin())) return { ok: false, motivo: 'no autorizado' }

  const id = String(formData.get('id') ?? '').trim()

  const validacion = validarVentaServicio({
    cliente: String(formData.get('cliente') ?? ''),
    servicio: String(formData.get('servicio') ?? ''),
    vendedor: String(formData.get('vendedor') ?? ''),
    importe: String(formData.get('importe') ?? ''),
    moneda: String(formData.get('moneda') ?? ''),
    metodo_pago: String(formData.get('metodo_pago') ?? ''),
    estado: String(formData.get('estado') ?? ''),
    notas: String(formData.get('notas') ?? ''),
    fecha_venta: String(formData.get('fecha_venta') ?? ''),
  })

  if (!validacion.ok) return { ok: false, motivo: validacion.motivo }

  try {
    if (id) await actualizarVentaServicio(id, validacion.datos)
    else await crearVentaServicio(validacion.datos)
  } catch (e) {
    console.error('[admin/servicios] no se pudo guardar:', e)
    return { ok: false, motivo: 'no se pudo guardar' }
  }

  revalidatePath('/admin/servicios')
  revalidatePath('/admin')
  redirect('/admin/servicios')
}

export async function eliminarVentaServicioAction(formData: FormData): Promise<void> {
  if (!(await esAdmin())) return
  const id = String(formData.get('id') ?? '')
  if (!id) return

  try {
    await eliminarVentaServicio(id)
  } catch (e) {
    console.error('[admin/servicios] no se pudo borrar:', e)
    return
  }
  revalidatePath('/admin/servicios')
  revalidatePath('/admin')
}
