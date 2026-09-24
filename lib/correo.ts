// Envío de correo transaccional con Resend, por `fetch` directo — sin
// instalar su SDK. Es una llamada HTTP con un token en el header; el
// paquete oficial no ahorra nada que valga una dependencia nueva (ver la
// sección de supply chain del CLAUDE.md).
//
// Requiere RESEND_API_KEY y que el dominio alphadev.studio esté verificado
// en Resend (los registros DNS van en Vercel). Sin eso, esta función falla
// en silencio — a propósito: un correo que no sale no debe tumbar la compra,
// que ya quedó registrada en la base y el comprador ya tiene el botón de
// descarga en pantalla.

const REMITENTE = 'AlphaDev Studios <guias@alphadev.studio>'

function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function enviarCorreoDescarga(datos: {
  destinatario: string
  tituloGuia: string
  enlace: string
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[correo] falta RESEND_API_KEY; no se envió el correo de', datos.destinatario)
    return false
  }

  const titulo = escaparHtml(datos.tituloGuia)

  try {
    const respuesta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: REMITENTE,
        to: [datos.destinatario],
        subject: `Tu guía: ${datos.tituloGuia}`,
        html: `
          <p>Gracias por tu compra.</p>
          <p>Tu guía <strong>${titulo}</strong> está lista:</p>
          <p><a href="${datos.enlace}">Descargar la guía</a></p>
          <p style="color:#6B5F52;font-size:0.875rem">
            El enlace es válido 7 días y hasta 5 descargas. Si lo pierdes,
            responde este correo y te mandamos uno nuevo.
          </p>
        `,
      }),
    })

    if (!respuesta.ok) {
      console.error('[correo] Resend respondió', respuesta.status, await respuesta.text())
      return false
    }
    return true
  } catch (e) {
    console.error('[correo] fallo de red enviando a', datos.destinatario, e)
    return false
  }
}
