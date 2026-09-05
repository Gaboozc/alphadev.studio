'use server'

// Acciones del panel.
//
// Una Server Action es un endpoint público: cualquiera puede invocarla con su
// id, sin pasar por la página. Por eso cada una vuelve a comprobar que quien
// llama es admin — la guarda del layout no cubre esto.

import { revalidatePath } from 'next/cache'
import { ESTADOS, cambiarEstado, type Estado } from '@/lib/mensajes'
import { esAdmin } from '@/lib/perfil'

function esEstado(v: string): v is Estado {
  return (ESTADOS as readonly string[]).includes(v)
}

export async function marcarEstado(formData: FormData) {
  if (!(await esAdmin())) return

  const id = String(formData.get('id') ?? '')
  const estado = String(formData.get('estado') ?? '')
  if (!id || !esEstado(estado)) return

  try {
    await cambiarEstado(id, estado)
  } catch (e) {
    console.error('[admin] no se pudo cambiar el estado:', e)
    return
  }

  revalidatePath('/academia/admin')
}
