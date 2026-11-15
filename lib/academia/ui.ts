// Lógica pura de la Academia v3: secciones h2, slugs, contadores, acentos.
// Sin React ni DOM.

import type { LessonType } from '@/app/academia/types'
import type { Rama } from '@/app/academia/ramas'

export type AcentoRama = 'a' | 'b' | 'c'

export type EstadoPieza = 'completada' | 'en_curso' | 'sin_empezar'

export type SeccionH2 = { title: string; slug: string }

/** Programación / IA Aplicada / Ingeniería de IA → a; Diseño → b; resto → c. */
export function acentoDeRama(rama: Rama): AcentoRama {
  if (rama === 'programacion' || rama === 'ia' || rama === 'iaeng') return 'a'
  if (rama === 'diseno') return 'b'
  return 'c'
}

export function slugSeccion(title: string): string {
  const base = title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return base.length > 0 ? base : 'seccion'
}

/** Extrae títulos `## ` del cuerpo (fuera de fences ```). */
export function extraerH2(content: string | undefined | null): SeccionH2[] {
  if (!content) return []
  const sinCode = content.replace(/```[\s\S]*?```/g, '')
  const titles: string[] = []
  for (const line of sinCode.split('\n')) {
    const m = /^##\s+(.+?)\s*$/.exec(line.trim())
    if (m) titles.push(m[1])
  }
  const used = new Map<string, number>()
  return titles.map((title) => {
    const base = slugSeccion(title)
    const n = used.get(base) ?? 0
    used.set(base, n + 1)
    return { title, slug: n === 0 ? base : `${base}-${n + 1}` }
  })
}

/** Con 0 o 1 h2 no hay barra de segmentos. */
export function debeMostrarSegmentos(secciones: SeccionH2[]): boolean {
  return secciones.length > 1
}

export function formatoContador(
  done: number,
  total: number,
  palabra: string,
): string | null {
  if (total <= 0) return null
  return `${done}/${total} ${palabra}`
}

export function formatoTiempoMin(min: number): string {
  return `${min} min aprox.`
}

export function estadoPieza(
  completada: boolean,
  enCurso: boolean,
): EstadoPieza {
  if (completada) return 'completada'
  if (enCurso) return 'en_curso'
  return 'sin_empezar'
}

export type TipoUi = {
  label: string
  /** Nombre Lucide en kebab-case, para documentación / tests. */
  icon: string
}

/** Mapeo de LessonType → etiqueta + icono Lucide (sin color). */
export function tipoDePieza(type: LessonType): TipoUi {
  switch (type) {
    case 'reading':
      return { label: 'Guía', icon: 'book-open' }
    case 'video':
      return { label: 'Video', icon: 'play' }
    case 'audio':
      return { label: 'Audio', icon: 'play' }
    case 'practice':
      return { label: 'Ejercicio', icon: 'pencil-line' }
    case 'exam':
      return { label: 'Cuestionario', icon: 'list-checks' }
    case 'project':
      return { label: 'Proyecto', icon: 'folder-kanban' }
  }
}

/** Contadores con palabra que aplican a una lección según sus datos. */
export function contadoresDeLeccion(lesson: {
  type: LessonType
  content?: string
  tasks?: string[]
  questions?: unknown[]
  deliverables?: string[]
}): { label: string; total: number }[] {
  const out: { label: string; total: number }[] = []
  const secciones = extraerH2(lesson.content).length
  if (secciones > 0) out.push({ label: 'secciones', total: secciones })
  const tasks = lesson.tasks?.length ?? 0
  if (tasks > 0) out.push({ label: 'comprobaciones rápidas', total: tasks })
  const qs = lesson.questions?.length ?? 0
  if (qs > 0) out.push({ label: 'preguntas', total: qs })
  const dels = lesson.deliverables?.length ?? 0
  if (dels > 0) out.push({ label: 'entrega', total: dels })
  return out
}

/** Primera lección incompleta (lógica Continuar F2); si todas hechas, la última. */
export function leccionContinuar(
  lessons: { id: string }[],
  isDone: (id: string) => boolean,
): string | null {
  if (lessons.length === 0) return null
  const primera = lessons.find((l) => !isDone(l.id))
  return (primera ?? lessons[lessons.length - 1]).id
}
