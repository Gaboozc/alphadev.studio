// Mensajes del formulario de contacto.
//
// Todo lo que toca la tabla `mensajes` pasa por aquí: validación, alta y las
// consultas del panel. Las políticas RLS de Supabase (ver supabase/sql/01)
// son la barrera de verdad — esto es la capa de arriba, no el candado.

import { createClient } from '@/lib/supabase/server'

export const CATEGORIAS = ['consultation', 'app', 'internal', 'api', 'other'] as const
export type Categoria = (typeof CATEGORIAS)[number]

export const ESTADOS = ['nuevo', 'leido', 'respondido', 'archivado'] as const
export type Estado = (typeof ESTADOS)[number]

export interface Mensaje {
  id: string
  categoria: Categoria
  nombre: string
  email: string
  empresa: string | null
  mensaje: string
  extra: Record<string, string> | null
  estado: Estado
  creado_el: string
}

/** Lo que se puede insertar: sin id, sin estado, sin fecha. */
export interface MensajeNuevo {
  categoria: Categoria
  nombre: string
  email: string
  empresa: string | null
  mensaje: string
  extra: Record<string, string> | null
}

// ─── Validación ───────────────────────────────────────────────────────────────
// A mano y no con Zod: son cinco campos, y cada dependencia nueva es
// superficie de ataque (ver la sección de supply chain del CLAUDE.md).
//
// Los límites son los mismos que los CHECK de la tabla. Duplicarlos es
// deliberado: aquí dan un mensaje legible, allá impiden que alguien salte la
// aplicación y escriba con la clave anon directamente.

const LIMITES = {
  nombre: 120,
  email: 200,
  empresa: 160,
  mensaje: 5000,
} as const

function esCategoria(v: string): v is Categoria {
  return (CATEGORIAS as readonly string[]).includes(v)
}

// `motivo` es para el registro del servidor, no para la pantalla: el sitio es
// bilingüe y el texto visible se elige en el cliente a partir de un código.
export type Validacion =
  | { ok: true; datos: MensajeNuevo }
  | { ok: false; motivo: string }

export function validarMensaje(bruto: {
  categoria: string
  nombre: string
  email: string
  empresa: string
  mensaje: string
  extra: Record<string, string>
}): Validacion {
  const nombre = bruto.nombre.trim()
  const email = bruto.email.trim().toLowerCase()
  const empresa = bruto.empresa.trim()
  const mensaje = bruto.mensaje.trim()

  if (!esCategoria(bruto.categoria)) return { ok: false, motivo: 'categoría inválida' }
  if (!nombre) return { ok: false, motivo: 'nombre vacío' }
  if (nombre.length > LIMITES.nombre) return { ok: false, motivo: 'nombre demasiado largo' }

  // Comprobación deliberadamente laxa: algo@algo.algo. Validar correos con una
  // expresión estricta rechaza direcciones legítimas, y el único test real es
  // que llegue el correo.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > LIMITES.email) {
    return { ok: false, motivo: 'correo inválido' }
  }
  if (empresa.length > LIMITES.empresa) return { ok: false, motivo: 'empresa demasiado larga' }
  if (!mensaje) return { ok: false, motivo: 'mensaje vacío' }
  if (mensaje.length > LIMITES.mensaje) return { ok: false, motivo: 'mensaje demasiado largo' }

  // Solo se guardan los extras con contenido, recortados.
  const extra: Record<string, string> = {}
  for (const [k, v] of Object.entries(bruto.extra)) {
    const limpio = v.trim().slice(0, 300)
    if (limpio) extra[k] = limpio
  }

  return {
    ok: true,
    datos: {
      categoria: bruto.categoria,
      nombre,
      email,
      empresa: empresa || null,
      mensaje,
      extra: Object.keys(extra).length ? extra : null,
    },
  }
}

// ─── Escritura ────────────────────────────────────────────────────────────────

export async function guardarMensaje(datos: MensajeNuevo): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('mensajes').insert(datos)
  if (error) throw new Error(error.message)
}

// ─── Lectura (panel) ──────────────────────────────────────────────────────────
// Devuelven [] ante cualquier fallo en vez de lanzar: el panel prefiere
// mostrarse vacío a romperse.

export async function listarMensajes(estado?: Estado): Promise<Mensaje[]> {
  const supabase = await createClient()
  let consulta = supabase.from('mensajes').select('*').order('creado_el', { ascending: false }).limit(200)
  if (estado) consulta = consulta.eq('estado', estado)

  const { data, error } = await consulta
  if (error) {
    console.error('[mensajes] no se pudieron listar:', error.message)
    return []
  }
  return (data ?? []) as Mensaje[]
}

/** Cuántos hay de cada estado, para las pestañas del panel. */
export async function conteoPorEstado(): Promise<Record<Estado, number>> {
  const vacio = { nuevo: 0, leido: 0, respondido: 0, archivado: 0 } as Record<Estado, number>

  const supabase = await createClient()
  const { data, error } = await supabase.from('mensajes').select('estado')
  if (error) {
    console.error('[mensajes] no se pudo contar:', error.message)
    return vacio
  }

  for (const fila of (data ?? []) as { estado: Estado }[]) {
    if (fila.estado in vacio) vacio[fila.estado] += 1
  }
  return vacio
}

export async function cambiarEstado(id: string, estado: Estado): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('mensajes').update({ estado }).eq('id', id)
  if (error) throw new Error(error.message)
}
