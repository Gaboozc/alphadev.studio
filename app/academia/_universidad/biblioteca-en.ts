// Las 87 lecciones «mantener» de la Biblioteca ya traducidas por Prof. X
// (content/academia/biblioteca-en/, espejo 1:1 de las lecciones actuales).
// SOLO SERVIDOR. Cada .md trae en la cabecera su URL /en/academia/<rama>/<módulo>/<id>;
// con ella se indexa. Las demás lecciones siguen en español con aviso.

import * as fs from 'node:fs'
import { join as joinPath } from 'node:path'
import { cache } from 'react'
import type { Lesson } from '@/app/academia/types'
import { limpiarMd } from './contenido'

const existsSync = (p: string) => fs.existsSync(/*turbopackIgnore: true*/ p)
const readFileSync = (p: string, enc: 'utf8') => fs.readFileSync(/*turbopackIgnore: true*/ p, enc)
const readdirSync = (p: string) => fs.readdirSync(/*turbopackIgnore: true*/ p, { withFileTypes: true })

const RAIZ = joinPath(process.cwd(), 'content', 'academia', 'biblioteca-en')
const join = (...partes: string[]) => partes.join('/')

export type LeccionEn = Pick<
  Lesson,
  'title' | 'content' | 'tasks' | 'tip' | 'projectBrief' | 'deliverables' | 'rubrica' | 'discussionPrompts'
>

const SECCIONES: Record<string, keyof LeccionEn> = {
  content: 'content',
  tasks: 'tasks',
  tip: 'tip',
  'project brief': 'projectBrief',
  deliverables: 'deliverables',
  rubric: 'rubrica',
  'discussion questions': 'discussionPrompts',
}
const LISTAS = new Set<keyof LeccionEn>(['tasks', 'deliverables', 'rubrica', 'discussionPrompts'])

function archivos(dir: string): string[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir).flatMap((e) =>
    e.isDirectory() ? archivos(join(dir, e.name)) : e.name.endsWith('.md') ? [join(dir, e.name)] : [],
  )
}

/** Parte el .md en las secciones que usa LessonPage (fuera de bloques de código). */
export function parsearLeccionEn(texto: string): { clave: string | null; leccion: LeccionEn } {
  const lineas = limpiarMd(texto).split('\n')
  const titulo = (lineas[0] ?? '').replace(/^#\s+/, '').trim()
  const url = lineas.slice(1, 6).find((l) => l.startsWith('url: '))
  const m = url ? /\/en\/academia\/([^/\s]+\/[^/\s]+\/[^/\s]+)\s*$/.exec(url) : null
  const leccion: LeccionEn = { title: titulo }
  const bloques: Partial<Record<keyof LeccionEn, string[]>> = {}
  let actual: keyof LeccionEn | null = null
  let enCodigo = false
  for (const linea of lineas.slice(1)) {
    if (/^```/.test(linea)) enCodigo = !enCodigo
    const h = !enCodigo ? /^##\s+(.+?)\s*$/.exec(linea) : null
    const sec = h ? SECCIONES[h[1].toLowerCase()] : undefined
    if (sec) {
      actual = sec
      bloques[sec] = []
      continue
    }
    if (actual) bloques[actual]!.push(linea)
  }
  for (const [k, v] of Object.entries(bloques) as [keyof LeccionEn, string[]][]) {
    const cuerpo = v.join('\n').trim()
    if (!cuerpo) continue
    if (LISTAS.has(k)) {
      ;(leccion as Record<string, unknown>)[k] = cuerpo
        .split('\n')
        .filter((l) => /^\s*[-*]\s+/.test(l))
        .map((l) => l.replace(/^\s*[-*]\s+/, '').trim())
    } else {
      ;(leccion as Record<string, unknown>)[k] = cuerpo
    }
  }
  return { clave: m ? m[1] : null, leccion }
}

/** legacy_key (rama/módulo/id) → lección en inglés. */
export const indiceBibliotecaEn = cache((): Map<string, LeccionEn> => {
  const mapa = new Map<string, LeccionEn>()
  for (const f of archivos(RAIZ)) {
    const { clave, leccion } = parsearLeccionEn(readFileSync(f, 'utf8'))
    if (clave) mapa.set(clave, leccion)
  }
  return mapa
})

export function leccionEn(rama: string, moduleId: string, lessonId: string): LeccionEn | null {
  return indiceBibliotecaEn().get(`${rama}/${moduleId}/${lessonId}`) ?? null
}
