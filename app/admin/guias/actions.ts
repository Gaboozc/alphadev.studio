'use server'

// Acciones del panel de guías. Cada una es un endpoint público — cualquiera
// puede invocarla con su id sin pasar por la página — así que todas vuelven
// a comprobar esAdmin() por su cuenta, igual que app/admin/actions.ts.

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { esAdmin } from '@/lib/perfil'
import {
  actualizarGuia,
  borrarGuia,
  crearGuia,
  crearUrlDeSubida,
  nombreDeArchivoSeguro,
  publicarGuia,
  validarGuia,
} from '@/lib/guias'

export type ResultadoSubida =
  | { ok: true; ruta: string; token: string }
  | { ok: false; motivo: string }

/**
 * Prepara la subida directa del PDF desde el navegador del admin a Storage,
 * sin que el archivo pase por una función de Vercel. `slug` ya validado en
 * el cliente (el propio input lo fuerza a minúsculas y guiones), pero se
 * revalida aquí: el cliente no es de fiar.
 */
export async function prepararSubida(slug: string, nombreOriginal: string): Promise<ResultadoSubida> {
  if (!(await esAdmin())) return { ok: false, motivo: 'no autorizado' }

  const slugLimpio = slug.trim().toLowerCase()
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slugLimpio)) {
    return { ok: false, motivo: 'escribe primero un slug válido' }
  }

  const ruta = `${slugLimpio}/${nombreDeArchivoSeguro(nombreOriginal)}`
  const resultado = await crearUrlDeSubida(ruta)
  if (!resultado.ok) return resultado
  return { ok: true, ruta: resultado.ruta, token: resultado.token }
}

export type ResultadoGuardar = { ok: true } | { ok: false; motivo: string }

/** Crea o actualiza según venga `id` en el formulario. */
export async function guardarGuia(_prev: ResultadoGuardar | null, formData: FormData): Promise<ResultadoGuardar> {
  if (!(await esAdmin())) return { ok: false, motivo: 'no autorizado' }

  const id = String(formData.get('id') ?? '').trim()

  const validacion = validarGuia({
    slug: String(formData.get('slug') ?? ''),
    titulo: String(formData.get('titulo') ?? ''),
    titulo_en: String(formData.get('titulo_en') ?? ''),
    descripcion: String(formData.get('descripcion') ?? ''),
    descripcion_en: String(formData.get('descripcion_en') ?? ''),
    precio_usd: String(formData.get('precio_usd') ?? ''),
    archivo: String(formData.get('archivo') ?? ''),
    portada: String(formData.get('portada') ?? ''),
  })

  if (!validacion.ok) return { ok: false, motivo: validacion.motivo }

  try {
    if (id) {
      await actualizarGuia(id, validacion.datos)
    } else {
      await crearGuia(validacion.datos)
    }
  } catch (e) {
    const mensaje = e instanceof Error ? e.message : 'error desconocido'
    // 23505 = slug duplicado (unique_violation) — el único conflicto posible
    // aquí, y el único que vale la pena traducir a algo legible.
    if (mensaje.includes('duplicate key') || mensaje.includes('23505')) {
      return { ok: false, motivo: 'ya existe una guía con ese slug' }
    }
    console.error('[admin/guias] no se pudo guardar:', e)
    return { ok: false, motivo: 'no se pudo guardar' }
  }

  revalidatePath('/admin/guias')
  revalidatePath('/recursos')
  redirect('/admin/guias')
}

export async function cambiarPublicacion(formData: FormData): Promise<void> {
  if (!(await esAdmin())) return
  const id = String(formData.get('id') ?? '')
  const publicada = formData.get('publicada') === 'true'
  if (!id) return

  try {
    await publicarGuia(id, publicada)
  } catch (e) {
    console.error('[admin/guias] no se pudo publicar/despublicar:', e)
    return
  }
  revalidatePath('/admin/guias')
  revalidatePath('/recursos')
}

export async function eliminarGuia(formData: FormData): Promise<void> {
  if (!(await esAdmin())) return
  const id = String(formData.get('id') ?? '')
  if (!id) return

  const resultado = await borrarGuia(id)
  if (!resultado.ok) {
    // No hay dónde mostrar el motivo en un <form action> sin JS — se registra
    // y la fila simplemente no desaparece, que ya es la señal de que algo
    // impidió el borrado.
    console.warn('[admin/guias] no se borró:', resultado.motivo)
    return
  }
  revalidatePath('/admin/guias')
  revalidatePath('/recursos')
}
