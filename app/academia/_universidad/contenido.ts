// Lectura del contenido del catálogo universidad. SOLO SERVIDOR.
//
// El contenido vive como .md/.csv en content/academia/ (paquete de Prof. X,
// mismos nombres en ES y EN). Se lee con fs en el servidor y se convierte a
// HTML aquí: al cliente no baja ni el markdown ni el parser.
//
// next.config.ts incluye content/academia/** en el trazado de archivos de las
// rutas /academia y /en/academia, para que existan en la función de Vercel.

import * as fs from 'node:fs'
import { join as joinPath } from 'node:path'
import { cache } from 'react'
import { Marked } from 'marked'
import {
  type Catalogo,
  type Curso,
  type Lang,
  PIEZAS_UNIDAD,
  UI,
  carpetaCursoS0,
  claveDePieza,
  claveEnriquecida,
  numeroUnidadSlug,
  parseCsv,
  rutaCurso,
  rutaGlosario,
  rutaUnidad,
} from '@/lib/academia/universidad'

// Acceso a disco acotado a content/academia (ya incluido en el trazado por
// next.config.ts). El comentario evita que Turbopack trace todo el proyecto.
const existsSync = (p: string) => fs.existsSync(/*turbopackIgnore: true*/ p)
const readFileSync = (p: string, enc: 'utf8') => fs.readFileSync(/*turbopackIgnore: true*/ p, enc)
const readdirSync = (p: string) => fs.readdirSync(/*turbopackIgnore: true*/ p)
const statSync = (p: string) => fs.statSync(/*turbopackIgnore: true*/ p)

const RAIZ = joinPath(process.cwd(), 'content', 'academia')
// Une rutas sin path.join para que el análisis estático no las trate como
// acceso dinámico a todo el proyecto (siempre cuelgan de RAIZ).
const join = (...partes: string[]) => partes.join('/')
const RAIZ_IDIOMA: Record<Lang, string> = {
  es: join(RAIZ, 'semestre-0'),
  en: join(RAIZ, 'semestre-0-en'),
}

export const getCatalogo = cache((): Catalogo => {
  const raw = JSON.parse(readFileSync(join(RAIZ, 'catalogo-academia.json'), 'utf8')) as Catalogo
  return { courses: raw.courses, legacy_lessons: raw.legacy_lessons }
})

// El contenido es del repo (no lo escribe un usuario), así que el HTML se
// confía. Aun así se desactiva el HTML crudo embebido: el paquete no lo usa y
// así un .md futuro no puede inyectar scripts por descuido.
const md = new Marked({ gfm: true })
md.use({
  renderer: {
    html() {
      return ''
    },
  },
})

export function mdAHtml(texto: string): string {
  return md.parse(limpiarMd(texto), { async: false }) as string
}

/**
 * Quita los comentarios HTML (`<!-- TRANSLATION NOTES … -->` y similares)
 * FUERA de los bloques de código. Son notas internas de Prof. X: nunca deben
 * llegar al HTML. Dentro de un bloque ``` se respetan (pueden ser ejemplo).
 */
export function limpiarMd(texto: string): string {
  const partes = texto.split(/(^```[\s\S]*?^```)/m)
  return partes
    .map((p) => (p.startsWith('```') ? p : p.replace(/<!--[\s\S]*?-->\n?/g, '')))
    .join('')
}

/** Baja un nivel los encabezados (h1→h2…): cada pieza vive bajo el h1 de la página. */
export function bajarEncabezados(html: string): string {
  return html.replace(/<(\/?)h([1-5])(?=[\s>])/g, (_m, cierre: string, n: string) => `<${cierre}h${Number(n) + 1}`)
}

export interface Cabecera {
  titulo: string
  meta: string
  pregunta: string
}

const quitarNegritas = (t: string) => t.replace(/\*\*/g, '').trim()

/**
 * Separa la cabecera de un guia.md (h1, «Semanas… · horas», «Pregunta guía»)
 * del cuerpo, para pintarla con el patrón v3 y no repetirla (P1-04).
 */
export function partirCabecera(texto: string): { cabecera: Cabecera; cuerpo: string } {
  const lineas = limpiarMd(texto).split('\n')
  const cab: Cabecera = { titulo: '', meta: '', pregunta: '' }
  const fuera = new Set<number>()
  for (let i = 0; i < lineas.length && i < 16; i++) {
    const l = lineas[i].trim()
    if (!cab.titulo && /^#\s+/.test(l)) {
      cab.titulo = l.replace(/^#\s+/, '').trim()
      fuera.add(i)
      continue
    }
    if (!cab.meta && /^\*\*(Semanas?|Weeks?)\b/.test(l)) {
      cab.meta = quitarNegritas(l)
      fuera.add(i)
      continue
    }
    const pg = /^\*\*(Pregunta guía|Guiding question)[^*]*:\*\*\s*(.+)$/.exec(l)
    if (!cab.pregunta && pg) {
      cab.pregunta = quitarNegritas(pg[2])
      fuera.add(i)
    }
  }
  const cuerpo = lineas.filter((_, i) => !fuera.has(i)).join('\n').replace(/^\s*\n/, '')
  return { cabecera: cab, cuerpo }
}

// ─── Rutas de archivo citadas en el texto (respuesta 3 de Prof. X) ───────────
// Si la pieza se publica, se convierte en enlace en el mismo idioma. Si es
// interna (rework/, _tools/, plan-revision, carpetas del repo…), se quita.

const PIEZA_DE_CLAVE: Record<string, string> = {
  'clave-comprobaciones': 'comprobaciones-rapidas',
  'clave-cuestionario': 'cuestionario',
  'soluciones-ejercicios': 'ejercicios',
}

export interface ContextoRutas {
  curso: Curso
  lang: Lang
  /** Unidad de la página donde se muestra el texto (u1-…, checkpoint…). */
  unidad?: string
}

type Destino = { href: string; texto: string } | 'quitar' | null

const ES_INTERNA =
  /^(rework\/|_tools\/|plan-revision|semestre-0(-en)?\/|app\/|Gaboozc\/|alphadev\.studio\/academia|claves\/$|u\d+-\*\/|\d{2}-[a-z-]+\/$)/

function etiquetaPieza(id: string, lang: Lang): string {
  const t = UI[lang]
  return t.piezas[id] ?? (id === 'checkpoint' ? t.checkpoint : id === 'proyecto-final' ? t.proyectoFinal : id)
}

function resolverRuta(ruta: string, ctx: ContextoRutas): Destino {
  const t = UI[ctx.lang]
  const r = ruta.replace(/^\.\//, '')
  if (ES_INTERNA.test(r)) return 'quitar'

  const unidadActual = ctx.unidad ?? ''
  const enUnidad = (slug: string, ancla: string, texto: string): Destino => {
    if (slug && slug !== unidadActual && !existeUnidad(ctx.curso, slug)) return null
    const base = slug && slug !== unidadActual ? rutaUnidad(ctx.curso, slug, ctx.lang) : ''
    return { href: `${base}#${ancla}`, texto }
  }

  // Claves: claves/u1-clave-cuestionario.md, ../claves/…, claves/checkpoint-clave.md
  const clave = /(?:^|\/)claves\/(?:(u\d+)-(clave-comprobaciones|clave-cuestionario|soluciones-ejercicios)|(checkpoint)-clave|(\d{2})-[^/]+)\.md$/.exec(r)
  if (clave) {
    if (clave[3]) return enUnidad('checkpoint', 'checkpoint-solucion', t.claveDe(t.checkpoint))
    if (clave[4]) {
      const pieza = buscarPiezaEnriquecida(ctx, clave[4])
      return pieza ? enUnidad('', `${pieza.id}-solucion`, t.claveDe(pieza.titulo)) : null
    }
    const pieza = PIEZA_DE_CLAVE[clave[2]]
    const slug = slugDeUnidad(ctx.curso, clave[1]) ?? ''
    return enUnidad(slug === unidadActual ? '' : slug, `${pieza}-solucion`, t.claveDe(etiquetaPieza(pieza, ctx.lang)))
  }

  // Otra unidad: ../u2-slug/guia.md, u2-slug/, ../u2-slug/
  const otra = /^(?:\.\.\/)?(u\d+-[a-z0-9-]+)\/(?:([a-z-]+)\.md)?$/.exec(r)
  if (otra) {
    const [, slug, pieza] = otra
    const n = numeroUnidadSlug(slug)
    const nombreUnidad = slug.endsWith('-enriquecida')
      ? `${t.unidadN(n ?? 0)} · ${t.enriquecida}`
      : t.unidadN(n ?? 0)
    if (!pieza) {
      if (!existeUnidad(ctx.curso, slug)) return null
      return { href: rutaUnidad(ctx.curso, slug, ctx.lang), texto: nombreUnidad }
    }
    return enUnidad(slug, pieza, `${nombreUnidad} · ${etiquetaPieza(pieza, ctx.lang)}`)
  }

  // Pieza de la misma unidad
  const misma = /^(guia|comprobaciones-rapidas|ejercicios|cuestionario|reflexion)\.md$/.exec(r)
  if (misma) return enUnidad('', misma[1], etiquetaPieza(misma[1], ctx.lang))

  // Pieza de una unidad enriquecida: 03-tarjetas-repaso.md, 03-tarjetas.csv
  const nn = /^(\d{2})-[a-z0-9-]+\.(md|csv)$/.exec(r)
  if (nn) {
    const id = r.replace(/\.(md|csv)$/, '')
    const pieza = buscarPiezaEnriquecida(ctx, nn[1], id)
    return pieza ? enUnidad('', pieza.id, pieza.titulo) : null
  }

  if (r === '00-syllabus.md') return { href: `${rutaCurso(ctx.curso, ctx.lang)}#sec-syllabus`, texto: t.syllabus }
  if (r === 'checkpoint.md') return enUnidad('checkpoint', 'checkpoint', t.checkpoint)
  if (r === 'proyecto-final.md') return enUnidad('proyecto-final', 'proyecto-final', t.proyectoFinal)
  if (r === 'glosario-es-en.md') return { href: rutaGlosario(ctx.lang), texto: t.glosario }
  return null
}

function slugDeUnidad(curso: Curso, u: string): string | null {
  const carpeta = carpetaCursoS0(curso)
  if (!carpeta) return null
  return (
    dirs(join(RAIZ_IDIOMA.es, carpeta)).find((d) => d.startsWith(`${u}-`) && !d.endsWith('-enriquecida')) ?? null
  )
}

function buscarPiezaEnriquecida(ctx: ContextoRutas, nn: string, idExacto?: string): { id: string; titulo: string } | null {
  const carpeta = carpetaCursoS0(ctx.curso)
  const slug = ctx.unidad ?? ''
  if (!carpeta || !slug.endsWith('-enriquecida')) return null
  const archivos = files(join(RAIZ_IDIOMA.es, carpeta, slug))
  const archivo =
    archivos.find((a) => idExacto && a.replace(/\.(md|csv)$/, '') === idExacto) ??
    archivos.find((a) => a.startsWith(`${nn}-`) && a.endsWith('.md'))
  if (!archivo) return null
  const id = archivo.replace(/\.(md|csv)$/, '')
  if (archivo.endsWith('.csv')) return { id, titulo: UI[ctx.lang].tarjetas }
  const ruta = existsSync(join(RAIZ_IDIOMA[ctx.lang], carpeta, slug, archivo))
    ? join(RAIZ_IDIOMA[ctx.lang], carpeta, slug, archivo)
    : join(RAIZ_IDIOMA.es, carpeta, slug, archivo)
  return { id, titulo: primerTitulo(readFileSync(ruta, 'utf8')) || id }
}

const escaparHtml = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Convierte o quita las rutas de archivo citadas como `código` (fuera de <pre>). */
export function enlazarRutas(html: string, ctx: ContextoRutas): string {
  return html
    .split(/(<pre[\s\S]*?<\/pre>)/)
    .map((trozo) => {
      if (trozo.startsWith('<pre')) return trozo
      return trozo.replace(/(\s*\()?<code>([^<]+)<\/code>(\))?/g, (m, abre: string | undefined, ruta: string, cierra: string | undefined) => {
        const d = resolverRuta(ruta.trim(), ctx)
        if (d === null) return m
        if (d === 'quitar') return abre && cierra ? '' : `${abre ?? ''}${cierra ?? ''}`
        return `${abre ?? ''}<a href="${escaparHtml(d.href)}">${escaparHtml(d.texto)}</a>${cierra ?? ''}`
      })
    })
    .join('')
}

export interface Pieza {
  /** Ruta relativa a la carpeta del curso (p. ej. u1-x/guia.md). */
  archivo: string
  html: string
  /** Idioma en el que realmente se muestra. */
  idioma: Lang
  /** true si se pidió EN y no existe: se muestra el ES con aviso. */
  fallback: boolean
  titulo: string
  cabecera: Cabecera
}

function primerTitulo(texto: string): string {
  const m = /^#\s+(.+)$/m.exec(texto)
  return m ? m[1].trim() : ''
}

export interface OpcionesLectura {
  /** Unidad de la página (para resolver rutas relativas y anclas). */
  unidad?: string
  /** Quita la cabecera (h1, semanas, pregunta guía): la pinta la vista. */
  sinCabecera?: boolean
  /** Baja un nivel los encabezados (piezas dentro de la unidad). */
  bajar?: boolean
}

/** Lee un archivo del curso en `lang`; si no existe en EN, cae al ES. */
export function leerArchivo(curso: Curso, rel: string, lang: Lang, op: OpcionesLectura = {}): Pieza | null {
  const carpeta = carpetaCursoS0(curso)
  if (!carpeta) return null
  const pedido = join(RAIZ_IDIOMA[lang], carpeta, rel)
  let ruta = pedido
  let idioma: Lang = lang
  if (!existsSync(pedido)) {
    const es = join(RAIZ_IDIOMA.es, carpeta, rel)
    if (lang === 'en' && existsSync(es)) {
      ruta = es
      idioma = 'es'
    } else return null
  }
  const texto = readFileSync(ruta, 'utf8')
  const { cabecera, cuerpo } = partirCabecera(texto)
  let html = mdAHtml(op.sinCabecera ? cuerpo : texto)
  if (op.bajar) html = bajarEncabezados(html)
  html = enlazarRutas(html, { curso, lang, unidad: op.unidad })
  return {
    archivo: rel,
    html,
    idioma,
    fallback: idioma !== lang,
    titulo: primerTitulo(texto),
    cabecera,
  }
}

/** Glosario ES–EN (recurso de S0). Solo existe en semestre-0-en/. */
export function leerGlosario(): { html: string; titulo: string } | null {
  const ruta = join(RAIZ_IDIOMA.en, 'glosario-es-en.md')
  if (!existsSync(ruta)) return null
  const texto = readFileSync(ruta, 'utf8')
  return { html: mdAHtml(texto.replace(/^#\s+.+\n/, '')), titulo: primerTitulo(texto) }
}

export function leerCsv(curso: Curso, rel: string, lang: Lang): { filas: string[][]; fallback: boolean } | null {
  const carpeta = carpetaCursoS0(curso)
  if (!carpeta) return null
  let ruta = join(RAIZ_IDIOMA[lang], carpeta, rel)
  let fallback = false
  if (!existsSync(ruta)) {
    ruta = join(RAIZ_IDIOMA.es, carpeta, rel)
    fallback = lang === 'en'
    if (!existsSync(ruta)) return null
  }
  return { filas: parseCsv(readFileSync(ruta, 'utf8')), fallback }
}

export interface UnidadS0 {
  slug: string
  titulo: string
  enriquecida: boolean
}

function dirs(p: string): string[] {
  if (!existsSync(p)) return []
  return readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory())
}

function files(p: string): string[] {
  if (!existsSync(p)) return []
  return readdirSync(p).filter((n) => statSync(join(p, n)).isFile()).sort()
}

/** Unidades de un curso de S0 (carpetas u*), en el orden de su número. */
export function unidadesS0(curso: Curso, lang: Lang): UnidadS0[] {
  const carpeta = carpetaCursoS0(curso)
  if (!carpeta) return []
  const slugs = dirs(join(RAIZ_IDIOMA.es, carpeta))
    .filter((d) => /^u\d+-/.test(d))
    .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))
  return slugs.map((slug) => {
    const enriquecida = slug.endsWith('-enriquecida')
    const base = leerArchivo(curso, `${slug}/${enriquecida ? 'README.md' : 'guia.md'}`, lang)
    return { slug, titulo: base?.titulo || slug, enriquecida }
  })
}

export interface BloqueUnidad {
  id: string
  etiqueta: string
  pieza: Pieza | null
  clave: Pieza | null
  csv?: { filas: string[][]; fallback: boolean } | null
}

/** Las piezas de una unidad, cada una con su clave (si la hay). */
export function bloquesUnidad(curso: Curso, slug: string, lang: Lang, etiquetas: Record<string, string>): BloqueUnidad[] {
  const carpeta = carpetaCursoS0(curso)
  if (!carpeta) return []

  // Pseudo-unidades del curso: checkpoint y proyecto final.
  if (slug === 'checkpoint' || slug === 'proyecto-final') {
    const clave = claveDePieza(slug, slug)
    return [
      {
        id: slug,
        etiqueta: '',
        pieza: leerArchivo(curso, `${slug}.md`, lang, { unidad: slug, sinCabecera: true, bajar: true }),
        clave: clave ? leerArchivo(curso, clave, lang, { unidad: slug, bajar: true }) : null,
      },
    ]
  }

  if (slug.endsWith('-enriquecida')) {
    const dir = join(RAIZ_IDIOMA.es, carpeta, slug)
    const claves = files(join(dir, 'claves'))
    // El README presenta la unidad: va primero.
    const orden = files(dir).sort((a, b) => (a === 'README.md' ? -1 : b === 'README.md' ? 1 : a.localeCompare(b)))
    return orden.map((archivo) => {
      const id = archivo.replace(/\.(md|csv)$/, '')
      if (archivo.endsWith('.csv')) {
        return { id, etiqueta: etiquetas.tarjetas ?? id, pieza: null, clave: null, csv: leerCsv(curso, `${slug}/${archivo}`, lang) }
      }
      const c = claveEnriquecida(archivo, claves)
      const esReadme = archivo === 'README.md'
      const pieza = leerArchivo(curso, `${slug}/${archivo}`, lang, { unidad: slug, sinCabecera: esReadme, bajar: true })
      return {
        id,
        etiqueta: (esReadme ? etiquetas.presentacion : pieza?.titulo) ?? id,
        pieza,
        clave: c ? leerArchivo(curso, `${slug}/claves/${c}`, lang, { unidad: slug, bajar: true }) : null,
      }
    })
  }

  return PIEZAS_UNIDAD.map((p) => {
    const clave = claveDePieza(slug, p)
    return {
      id: p,
      etiqueta: etiquetas[p] ?? p,
      pieza: leerArchivo(curso, `${slug}/${p}.md`, lang, { unidad: slug, sinCabecera: p === 'guia', bajar: true }),
      clave: clave ? leerArchivo(curso, clave, lang, { unidad: slug, bajar: true }) : null,
    }
  }).filter((b) => b.pieza)
}

export function existeUnidad(curso: Curso, slug: string): boolean {
  const carpeta = carpetaCursoS0(curso)
  if (!carpeta) return false
  if (slug === 'checkpoint' || slug === 'proyecto-final') return existsSync(join(RAIZ_IDIOMA.es, carpeta, `${slug}.md`))
  return /^u\d+-/.test(slug) && existsSync(join(RAIZ_IDIOMA.es, carpeta, slug))
}
