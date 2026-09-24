'use server'

import { redirect } from 'next/navigation'
import { guiaPorId } from '@/lib/guias'
import { crearOrden } from '@/lib/paypal'
import { localizedPath } from '@/lib/i18n/routes'
import { SITE_URL } from '@/lib/site-config'
import type { Lang } from '@/lib/i18n'

/**
 * Arranca el checkout de PayPal. El precio se relee de la base con `guiaId`
 * — el formulario manda el id, nunca el precio: un campo oculto con el
 * precio sería editable desde las herramientas de desarrollo del navegador.
 */
export async function iniciarCompra(formData: FormData): Promise<void> {
  const guiaId = String(formData.get('guiaId') ?? '')
  const slug = String(formData.get('slug') ?? '')
  const lang: Lang = formData.get('lang') === 'en' ? 'en' : 'es'

  const guia = await guiaPorId(guiaId)
  if (!guia || !guia.publicada || guia.slug !== slug) {
    redirect(localizedPath('/recursos', lang))
  }

  let urlAprobacion: string
  try {
    const orden = await crearOrden({
      guiaId: guia.id,
      titulo: guia.titulo,
      precioCents: guia.precio_cents,
      returnUrl: `${SITE_URL}${localizedPath('/recursos/gracias', lang)}?guia=${guia.slug}`,
      cancelUrl: `${SITE_URL}${localizedPath(`/recursos/${guia.slug}`, lang)}`,
    })
    urlAprobacion = orden.urlAprobacion
  } catch (e) {
    console.error('[recursos] no se pudo crear la orden de PayPal:', e)
    redirect(`${localizedPath(`/recursos/${guia.slug}`, lang)}?error=pago`)
  }

  redirect(urlAprobacion)
}
