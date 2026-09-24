'use server'

import { revalidatePath } from 'next/cache'
import { esAdmin } from '@/lib/perfil'
import { reenviarEnlace, revocarVenta } from '@/lib/ventas'
import { enviarCorreoDescarga } from '@/lib/correo'
import { guiaPorId } from '@/lib/guias'
import { SITE_URL } from '@/lib/site-config'

/** Renueva el token de una venta y reenvía el correo con el enlace nuevo. */
export async function reenviarVenta(formData: FormData): Promise<void> {
  if (!(await esAdmin())) return

  const id = String(formData.get('id') ?? '')
  const email = String(formData.get('email') ?? '')
  const guiaId = String(formData.get('guia_id') ?? '')
  if (!id || !email) return

  const resultado = await reenviarEnlace(id)
  if (!resultado) return

  const guia = await guiaPorId(guiaId)
  if (guia) {
    const enlace = `${SITE_URL}/recursos/descargar/${resultado.token}`
    await enviarCorreoDescarga({ destinatario: email, tituloGuia: guia.titulo, enlace })
  }

  revalidatePath('/admin/ventas')
}

export async function revocarVentaAction(formData: FormData): Promise<void> {
  if (!(await esAdmin())) return
  const id = String(formData.get('id') ?? '')
  if (!id) return

  try {
    await revocarVenta(id)
  } catch (e) {
    console.error('[admin/ventas] no se pudo revocar:', e)
    return
  }
  revalidatePath('/admin/ventas')
}
