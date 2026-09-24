// El catálogo de guías: validación, alta, edición y las consultas que usan el
// panel de admin y la tienda pública.
//
// Todo lo de aquí corre con la SESIÓN DEL ADMIN (createClient() normal), no
// con la clave de servicio: Gabriel ya está autenticado cuando gestiona el
// catálogo, y las políticas RLS de `guias` (supabase/sql/02-guias.sql) le
// dan permiso porque es_admin() es true. La clave de servicio solo hace
// falta para lo que compra alguien SIN sesión — eso vive en lib/ventas.ts.

import { createClient } from '@/lib/supabase/server'
import type { Lang } from '@/lib/i18n'

export interface Guia {
  id: string
  slug: string
  titulo: string
  titulo_en: string | null
  descripcion: string
  descripcion_en: string | null
  precio_cents: number
  moneda: 'USD'
  archivo: string
  portada: string | null
  publicada: boolean
  creado_el: string
  actualizado_el: string
}

/**
 * Título en `lang`, con caída al español si no hay traducción cargada.
 * Regla del catálogo: "si faltan, se muestra el español" — nunca un hueco.
 */
export function tituloDeGuia(guia: Guia, lang: Lang): string {
  return (lang === 'en' && guia.titulo_en) || guia.titulo
}

export function descripcionDeGuia(guia: Guia, lang: Lang): string {
  return (lang === 'en' && guia.descripcion_en) || guia.descripcion
}

export interface GuiaNueva {
  slug: string
  titulo: string
  titulo_en: string | null
  descripcion: string
  descripcion_en: string | null
  precio_cents: number
  archivo: string
  portada: string | null
}

const LIMITES = {
  slug: 80,
  titulo: 160,
  descripcion: 2000,
} as const

const SLUG_VALIDO = /^[a-z0-9]+(-[a-z0-9]+)*$/

export type Validacion =
  | { ok: true; datos: GuiaNueva }
  | { ok: false; motivo: string }

/**
 * Valida a mano, sin Zod: son pocos campos y cada dependencia nueva es
 * superficie de ataque (ver la sección de supply chain del CLAUDE.md). Los
 * límites espejan los CHECK de la tabla — uno da un mensaje legible, el otro
 * aguanta si alguien se salta la aplicación.
 */
export function validarGuia(bruto: {
  slug: string
  titulo: string
  titulo_en: string
  descripcion: string
  descripcion_en: string
  precio_usd: string
  archivo: string
  portada: string
}): Validacion {
  const slug = bruto.slug.trim().toLowerCase()
  const titulo = bruto.titulo.trim()
  const descripcion = bruto.descripcion.trim()
  const archivo = bruto.archivo.trim()

  if (!SLUG_VALIDO.test(slug) || slug.length > LIMITES.slug) {
    return { ok: false, motivo: 'slug inválido (solo minúsculas, números y guiones)' }
  }
  if (!titulo || titulo.length > LIMITES.titulo) return { ok: false, motivo: 'título inválido' }
  if (!descripcion || descripcion.length > LIMITES.descripcion) {
    return { ok: false, motivo: 'descripción inválida' }
  }
  if (!archivo) return { ok: false, motivo: 'falta subir el PDF' }

  const precio = Math.round(Number(bruto.precio_usd) * 100)
  if (!Number.isFinite(precio) || precio <= 0) return { ok: false, motivo: 'precio inválido' }

  const tituloEn = bruto.titulo_en.trim()
  const descripcionEn = bruto.descripcion_en.trim()
  if (tituloEn.length > LIMITES.titulo) return { ok: false, motivo: 'título en inglés demasiado largo' }
  if (descripcionEn.length > LIMITES.descripcion) {
    return { ok: false, motivo: 'descripción en inglés demasiado larga' }
  }

  return {
    ok: true,
    datos: {
      slug,
      titulo,
      titulo_en: tituloEn || null,
      descripcion,
      descripcion_en: descripcionEn || null,
      precio_cents: precio,
      archivo,
      portada: bruto.portada.trim() || null,
    },
  }
}

// ─── Escritura (panel de admin) ─────────────────────────────────────────────

export async function crearGuia(datos: GuiaNueva): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('guias').insert(datos)
  if (error) throw new Error(error.message)
}

export async function actualizarGuia(id: string, datos: Partial<GuiaNueva>): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('guias')
    .update({ ...datos, actualizado_el: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(error.message)
}

export async function publicarGuia(id: string, publicada: boolean): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('guias').update({ publicada }).eq('id', id)
  if (error) throw new Error(error.message)
}

/**
 * Borra la guía. La FK `on delete restrict` de `ventas.guia_id` hace que esto
 * falle si ya vendió algo — a propósito: se despublica, no se borra, para no
 * romper el historial ni el enlace de quien ya pagó.
 */
export async function borrarGuia(id: string): Promise<{ ok: true } | { ok: false; motivo: string }> {
  const supabase = await createClient()
  const { error } = await supabase.from('guias').delete().eq('id', id)
  if (error) {
    if (error.code === '23503') {
      return { ok: false, motivo: 'ya tiene ventas: despublícala en vez de borrarla' }
    }
    return { ok: false, motivo: error.message }
  }
  return { ok: true }
}

/**
 * URL firmada para SUBIR el PDF directo desde el navegador del admin, sin
 * pasar por una función de Vercel — una guía con imágenes puede pesar más de
 * lo que acepta el límite de payload de una Server Action.
 *
 * Funciona con la sesión del admin porque la política de `storage.objects`
 * en supabase/sql/02-guias.sql da INSERT a `authenticated` + es_admin(). No
 * hace falta la clave de servicio para esto.
 */
export async function crearUrlDeSubida(
  ruta: string,
): Promise<{ ok: true; ruta: string; token: string } | { ok: false; motivo: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase.storage.from('guias').createSignedUploadUrl(ruta)
  if (error || !data) return { ok: false, motivo: error?.message ?? 'no se pudo preparar la subida' }
  // `data.path` es la ruta final que Supabase de verdad firmó; puede diferir
  // de `ruta` si normaliza separadores. Se devuelve esa, no la de entrada.
  return { ok: true, ruta: data.path, token: data.token }
}

/**
 * Nombre de archivo seguro para guardar en Storage: minúsculas, solo
 * [a-z0-9._-], sin espacios ni acentos. Evita rutas raras si alguien sube
 * "Guía de SEO (final) v2.pdf".
 */
export function nombreDeArchivoSeguro(nombreOriginal: string): string {
  const normalizado = nombreOriginal
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita acentos
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return normalizado || 'archivo.pdf'
}

// ─── Lectura ─────────────────────────────────────────────────────────────────
// Devuelven [] / null ante cualquier fallo en vez de lanzar: la tienda
// prefiere mostrarse vacía a romperse. Mismo criterio que lib/mensajes.ts.

export async function listarGuias(): Promise<Guia[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('guias').select('*').order('creado_el', { ascending: false })
  if (error) {
    console.error('[guias] no se pudieron listar:', error.message)
    return []
  }
  return (data ?? []) as Guia[]
}

/** Solo las publicadas — lo que ve un visitante sin sesión en /recursos. */
export async function listarGuiasPublicadas(): Promise<Guia[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('guias')
    .select('*')
    .eq('publicada', true)
    .order('creado_el', { ascending: false })
  if (error) {
    console.error('[guias] no se pudieron listar las publicadas:', error.message)
    return []
  }
  return (data ?? []) as Guia[]
}

export async function guiaPorSlug(slug: string): Promise<Guia | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('guias').select('*').eq('slug', slug).maybeSingle()
  if (error || !data) return null
  return data as Guia
}

export async function guiaPorId(id: string): Promise<Guia | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('guias').select('*').eq('id', id).maybeSingle()
  if (error || !data) return null
  return data as Guia
}
