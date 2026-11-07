// Textos de privacidad para analítica: tienen que ser ciertos con y sin ID.
// No prometen medición operativa si el identificador no está configurado.

export function analiticaOperativa(measurementId: string | null): boolean {
  return measurementId !== null
}

export function copyPrivacidadAnalitica(lang: 'es' | 'en', operativa: boolean): {
  titulo: string
  cuerpo: string
} {
  if (lang === 'en') {
    return operativa
      ? {
          titulo: 'Optional analytics',
          cuerpo:
            'If you accept, we load Google Analytics to count visits and two conversions: a contact form that was actually saved, and a guide purchase after payment is confirmed. We do not send names, emails, phone numbers, message text, order ids, or URL query strings. The default is reject. You can change this later from the banner or the footer.',
        }
      : {
          titulo: 'Analytics',
          cuerpo:
            'This site has no analytics identifier configured. We do not load Google Analytics or other third-party trackers. If an identifier is added later, nothing loads until you accept, and you can reject or revoke it.',
        }
  }

  return operativa
    ? {
        titulo: 'Analítica opcional',
        cuerpo:
          'Si aceptas, cargamos Google Analytics para contar visitas y dos conversiones: un formulario de contacto que sí se guardó, y la compra de una guía cuando el pago está confirmado. No enviamos nombres, correos, teléfonos, el texto de tus mensajes, identificadores de pedido ni la query de la URL. El valor por defecto es rechazar. Puedes cambiarlo después desde el aviso o el pie de página.',
      }
    : {
        titulo: 'Analítica',
        cuerpo:
          'Este sitio no tiene un identificador de analítica configurado. No cargamos Google Analytics ni otros rastreadores de terceros. Si más adelante se añade un identificador, no se carga nada hasta que aceptes, y puedes rechazar o revocar.',
      }
}
