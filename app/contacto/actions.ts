'use server'

// Envío del formulario de contacto.
//
// Corre en el servidor por la misma razón que el login: el navegador no debe
// decidir qué se guarda. Aquí se valida, se limita el ritmo y se escribe.

import { headers } from 'next/headers'
import { guardarMensaje, validarMensaje } from '@/lib/mensajes'

// Se devuelve un código, no un texto: el sitio es bilingüe y la frase que ve
// la persona la elige el cliente con su diccionario.
export type ErrorEnvio = 'campos' | 'ritmo' | 'servidor'
export type ResultadoEnvio = { ok: true } | { ok: false; error: ErrorEnvio }

// ─── Límite por IP ────────────────────────────────────────────────────────────
// En memoria, así que vive por instancia y se pierde en cada arranque en frío.
// No frena a alguien decidido: frena el envío repetido por accidente y los
// robots torpes. El límite serio es la política RLS y los CHECK de la tabla.

const VENTANA_MS = 60_000
const MAX_POR_VENTANA = 3
const recientes = new Map<string, number[]>()

function demasiadoSeguido(ip: string): boolean {
  const ahora = Date.now()
  const previos = (recientes.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS)

  if (previos.length >= MAX_POR_VENTANA) {
    recientes.set(ip, previos)
    return true
  }

  previos.push(ahora)
  recientes.set(ip, previos)

  // El Map crecería sin fin en una instancia de vida larga.
  if (recientes.size > 500) {
    for (const [clave, marcas] of recientes) {
      if (marcas.every((t) => ahora - t >= VENTANA_MS)) recientes.delete(clave)
    }
  }
  return false
}

async function ipDeQuienEnvia(): Promise<string> {
  const h = await headers()
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() || 'desconocida'
}

// ─── La acción ────────────────────────────────────────────────────────────────

export async function enviarMensaje(
  _previo: ResultadoEnvio | null,
  formData: FormData,
): Promise<ResultadoEnvio> {
  // Trampa para robots: el campo está oculto por CSS, una persona no lo ve ni
  // lo rellena. Si viene con algo, se responde éxito y no se guarda nada —
  // decirle al robot que falló solo le enseña a esquivarlo.
  if (String(formData.get('sitio') ?? '')) return { ok: true }

  if (demasiadoSeguido(await ipDeQuienEnvia())) {
    return { ok: false, error: 'ritmo' }
  }

  const validacion = validarMensaje({
    categoria: String(formData.get('categoria') ?? ''),
    nombre: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    empresa: String(formData.get('company') ?? ''),
    mensaje: String(formData.get('message') ?? ''),
    extra: {
      platform: String(formData.get('platform') ?? ''),
      users: String(formData.get('users') ?? ''),
      stack: String(formData.get('stack') ?? ''),
    },
  })

  if (!validacion.ok) {
    console.warn('[contacto] envío rechazado:', validacion.motivo)
    return { ok: false, error: 'campos' }
  }

  try {
    await guardarMensaje(validacion.datos)
  } catch (e) {
    // El detalle al registro; a la pantalla, algo accionable. Perder un
    // mensaje en silencio es peor que pedir que escriban un correo — de eso se
    // encarga el texto de 'servidor' en el diccionario.
    console.error('[contacto] no se pudo guardar el mensaje:', e)
    return { ok: false, error: 'servidor' }
  }

  return { ok: true }
}
