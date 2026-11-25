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
  carpetaCursoS0,
  claveDePieza,
  claveEnriquecida,
  parseCsv,
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
  return md.parse(texto, { async: false }) as string
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
}

function primerTitulo(texto: string): string {
  const m = /^#\s+(.+)$/m.exec(texto)
  return m ? m[1].trim() : ''
}

/** Lee un archivo del curso en `lang`; si no existe en EN, cae al ES. */
export function leerArchivo(curso: Curso, rel: string, lang: Lang): Pieza | null {
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
  return { archivo: rel, html: mdAHtml(texto), idioma, fallback: idioma !== lang, titulo: primerTitulo(texto) }
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
        pieza: leerArchivo(curso, `${slug}.md`, lang),
        clave: clave ? leerArchivo(curso, clave, lang) : null,
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
      const pieza = leerArchivo(curso, `${slug}/${archivo}`, lang)
      return {
        id,
        etiqueta: pieza?.titulo ?? id,
        pieza,
        clave: c ? leerArchivo(curso, `${slug}/claves/${c}`, lang) : null,
      }
    })
  }

  return PIEZAS_UNIDAD.map((p) => {
    const clave = claveDePieza(slug, p)
    return {
      id: p,
      etiqueta: etiquetas[p] ?? p,
      pieza: leerArchivo(curso, `${slug}/${p}.md`, lang),
      clave: clave ? leerArchivo(curso, clave, lang) : null,
    }
  }).filter((b) => b.pieza)
}

export function existeUnidad(curso: Curso, slug: string): boolean {
  const carpeta = carpetaCursoS0(curso)
  if (!carpeta) return false
  if (slug === 'checkpoint' || slug === 'proyecto-final') return existsSync(join(RAIZ_IDIOMA.es, carpeta, `${slug}.md`))
  return /^u\d+-/.test(slug) && existsSync(join(RAIZ_IDIOMA.es, carpeta, slug))
}
