// Catálogo tipo universidad de la Academia (S0 → 3 carreras S1–S6 →
// optativas → Biblioteca), en español e inglés.
//
// Módulo PURO: sin fs, sin React, sin alias `@/`. Así lo pueden importar los
// tests de `node --test` y también los componentes. La lectura de archivos
// vive en `app/academia/_universidad/contenido.ts` (solo servidor).
//
// Fuente: content/academia/catalogo-academia.json (Prof. X, 25 nov 2026) y
// docs/academia/entrega-es-en/docs/reorganizacion-final.md §3.

export type Lang = 'es' | 'en'

export type ProgramaId = 'S0' | 'IS' | 'DP' | 'MK' | 'OPT'

export type EstadoCurso =
  | 'escrito_es_en'
  | 'en_preparacion_con_lecciones_legado'
  | 'en_preparacion_fuente_parcial'
  | 'en_preparacion_sin_fuente'

export interface Curso {
  code: string
  program: ProgramaId
  semester: string
  title_es: string
  title_en: string
  weeks: number
  hours_per_week: number
  hours: number
  units_es: string[]
  units_en: string[]
  sources: string
  prereq_recommended: string
  status: EstadoCurso
  slug: string
  route_es: string
  route_en: string
}

export type Decision = 'mantener' | 'reescribir' | 'fusionar' | 'retirar'

export interface LeccionLegado {
  legacy_key: string
  id: string
  rama: string
  modulo: string
  titulo: string
  decision: Decision
  destino: string
  curso_destino: string
  ruta_actual: string
  ruta_en: string
  idioma_disponible: string
  etiqueta_ui: string
}

export interface Catalogo {
  courses: Curso[]
  legacy_lessons: LeccionLegado[]
}

export interface Programa {
  id: ProgramaId
  slug: string
  es: string
  en: string
}

/** Orden de la portada: S0, las tres carreras, optativas. La Biblioteca va aparte. */
export const PROGRAMAS: Programa[] = [
  { id: 'S0', slug: 'semestre-0', es: 'Semestre 0 · Tronco común', en: 'Semester 0 · Shared Core' },
  { id: 'IS', slug: 'ingenieria-software-ia', es: 'Ingeniería de Software e IA', en: 'Software and AI Engineering' },
  { id: 'DP', slug: 'diseno-producto', es: 'Diseño de Producto', en: 'Product Design' },
  { id: 'MK', slug: 'marketing-digital', es: 'Marketing Digital y Crecimiento', en: 'Digital Marketing and Growth' },
  { id: 'OPT', slug: 'optativas', es: 'Optativas transversales', en: 'Cross-Program Electives' },
]

export const CARRERAS: ProgramaId[] = ['IS', 'DP', 'MK']

export function programaPorSlug(slug: string): Programa | undefined {
  return PROGRAMAS.find((p) => p.slug === slug)
}

export function programaPorId(id: ProgramaId): Programa {
  return PROGRAMAS.find((p) => p.id === id)!
}

// ─── Rutas ────────────────────────────────────────────────────────────────────
// Español sin prefijo, inglés con /en y los MISMOS slugs (spec §3.2).

export const ACADEMIA = '/academia'
export const PREFIJO_EN = '/en'

export function enIdioma(rutaEs: string, lang: Lang): string {
  return lang === 'en' ? `${PREFIJO_EN}${rutaEs}` : rutaEs
}

export function rutaPortada(lang: Lang): string {
  return enIdioma(ACADEMIA, lang)
}

export function rutaBiblioteca(lang: Lang): string {
  return enIdioma(`${ACADEMIA}/biblioteca`, lang)
}

export function rutaPrograma(p: Programa | ProgramaId, lang: Lang): string {
  const prog = typeof p === 'string' ? programaPorId(p) : p
  return enIdioma(`${ACADEMIA}/${prog.slug}`, lang)
}

export function rutaCurso(c: Pick<Curso, 'program' | 'slug'>, lang: Lang): string {
  return enIdioma(`${ACADEMIA}/${programaPorId(c.program).slug}/${c.slug}`, lang)
}

export function rutaUnidad(c: Pick<Curso, 'program' | 'slug'>, unidad: string, lang: Lang): string {
  return `${rutaCurso(c, lang)}/${unidad}`
}

/** La ruta de una lección de la Biblioteca. La española es la de siempre. */
export function rutaLeccionLegado(l: Pick<LeccionLegado, 'ruta_actual'>, lang: Lang): string {
  return enIdioma(l.ruta_actual, lang)
}

/**
 * La misma página en el otro idioma. Toda ruta bajo /academia existe en los
 * dos (lo que no está traducido se muestra en español con aviso), así que el
 * selector nunca lleva a un 404.
 */
export function mismaPaginaEn(pathname: string, destino: Lang): string {
  const sinPrefijo =
    pathname === PREFIJO_EN ? '/' : pathname.startsWith(`${PREFIJO_EN}/`) ? pathname.slice(PREFIJO_EN.length) : pathname
  return enIdioma(sinPrefijo, destino)
}

// ─── Cursos ───────────────────────────────────────────────────────────────────

export function cursosDePrograma(cat: Catalogo, id: ProgramaId): Curso[] {
  return cat.courses.filter((c) => c.program === id)
}

/** Semestres de una carrera, en orden (S1…S6, después lo que no siga el patrón). */
export function semestresDe(cursos: Curso[]): string[] {
  const set = Array.from(new Set(cursos.map((c) => c.semester)))
  return set.sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))
}

export function cursoPorSlug(cat: Catalogo, programa: ProgramaId, slug: string): Curso | undefined {
  return cat.courses.find((c) => c.program === programa && c.slug === slug)
}

export function cursoPorCodigo(cat: Catalogo, code: string): Curso | undefined {
  return cat.courses.find((c) => c.code === code)
}

export function tituloCurso(c: Curso, lang: Lang): string {
  return lang === 'en' ? c.title_en : c.title_es
}

export function unidadesCurso(c: Curso, lang: Lang): string[] {
  return lang === 'en' && c.units_en?.length ? c.units_en : c.units_es
}

export function tieneContenidoNuevo(c: Curso): boolean {
  return c.status === 'escrito_es_en'
}

/** Carpeta del curso bajo content/academia/semestre-0[-en]/ (p. ej. 01-trabajo-con-ia). */
export function carpetaCursoS0(c: Curso): string | null {
  const m = /^semestre-0\/([^/\s,]+)/.exec(c.sources)
  return m ? m[1] : null
}

/** Códigos de prerrequisito recomendados ('—' o vacío = ninguno). */
export function prerrequisitos(c: Curso): string[] {
  const v = (c.prereq_recommended ?? '').trim()
  if (!v || v === '—' || v === '-') return []
  return v.split(/[,;]/).map((s) => s.trim()).filter(Boolean)
}

/** Lecciones actuales que alimentan un curso (spec §1 regla 5). */
export function leccionesQueAlimentan(cat: Catalogo, code: string): LeccionLegado[] {
  return cat.legacy_lessons.filter((l) => l.curso_destino === code)
}

// ─── Textos de UI (spec §3.5, [INFERENCIA] de Prof. X; validar) ──────────────

export function etiquetaLegado(l: LeccionLegado, lang: Lang): string {
  if (lang === 'es') return l.etiqueta_ui
  switch (l.decision) {
    case 'mantener':
      return 'Library lesson'
    case 'reescribir':
      return 'Previous version · being rewritten'
    case 'fusionar':
      return `Previous version · merging into ${l.curso_destino || l.destino}`
    case 'retirar':
      return `Retired · replaced by ${l.destino}`
    default:
      return 'Library lesson'
  }
}

export const UI = {
  es: {
    academia: 'Academia',
    eyebrow: 'AlphaDev Studios — Estudio privado',
    portadaIntro:
      'Empieza por el Semestre 0 y después elige una o varias carreras. Todo está abierto: entra donde quieras.',
    empiezaAqui: 'Empieza aquí',
    carreras: 'Carreras',
    carrerasIntro: 'Elige una o varias. Todas están abiertas.',
    optativas: 'Optativas transversales',
    biblioteca: 'Biblioteca',
    bibliotecaIntro:
      'Las lecciones actuales de la Academia, todas abiertas, cada una con su estado y el curso nuevo al que alimenta.',
    verBiblioteca: 'Ver la Biblioteca',
    semestre: (s: string) => (s === 'S0' ? 'Semestre 0' : `Semestre ${s.replace(/^S/, '')}`),
    horas: (h: number) => `${h} h`,
    semanas: (n: number, hpw: number) => `${n} semanas · ${hpw} h por semana`,
    cursos: (n: number) => `${n} cursos`,
    lecciones: (n: number) => `${n} lecciones`,
    enPreparacion: 'En preparación',
    disponible: 'Disponible',
    recomendamos: (c: string) => `Te recomendamos hacer antes: ${c}`,
    verSolucion: 'Ver solución',
    soloEs: 'Esta lección por ahora solo está en español',
    unidades: 'Unidades',
    leccionesActuales: 'Lecciones actuales que alimentan este curso',
    leccionesActualesIntro: 'Ya puedes abrirlas mientras se escribe el curso nuevo.',
    sinLecciones: 'Este curso se escribe desde cero; todavía no tiene lecciones que lo alimenten.',
    syllabus: 'Programa del curso',
    checkpoint: 'Checkpoint',
    proyectoFinal: 'Proyecto final',
    volverA: (x: string) => `Volver a ${x}`,
    todaLaAcademia: 'Toda la Academia',
    enEstaUnidad: 'En esta unidad',
    piezas: {
      guia: 'Guía',
      'comprobaciones-rapidas': 'Comprobaciones rápidas',
      ejercicios: 'Ejercicios',
      cuestionario: 'Cuestionario',
      reflexion: 'Reflexión',
    } as Record<string, string>,
    tarjetas: 'Tarjetas de repaso',
    frente: 'Pregunta',
    reverso: 'Respuesta',
    abrir: 'Abrir',
    rutasDeAprendizaje: 'Rutas de aprendizaje',
    ramasBiblioteca: 'Ramas de la Biblioteca',
  },
  en: {
    academia: 'Academy',
    eyebrow: 'AlphaDev Studios — Private study',
    portadaIntro:
      'Start with Semester 0, then pick one or more programs. Everything is open: go wherever you want.',
    empiezaAqui: 'Start here',
    carreras: 'Programs',
    carrerasIntro: 'Pick one or more. They are all open.',
    optativas: 'Cross-Program Electives',
    biblioteca: 'Library',
    bibliotecaIntro:
      'The current Academy lessons, all open, each with its status and the new course it feeds.',
    verBiblioteca: 'Open the Library',
    semestre: (s: string) => (s === 'S0' ? 'Semester 0' : `Semester ${s.replace(/^S/, '')}`),
    horas: (h: number) => `${h} h`,
    semanas: (n: number, hpw: number) => `${n} weeks · ${hpw} h per week`,
    cursos: (n: number) => `${n} courses`,
    lecciones: (n: number) => `${n} lessons`,
    enPreparacion: 'In preparation',
    disponible: 'Available',
    recomendamos: (c: string) => `We recommend taking first: ${c}`,
    verSolucion: 'Show solution',
    soloEs: 'This lesson is only available in Spanish for now',
    unidades: 'Units',
    leccionesActuales: 'Current lessons that feed this course',
    leccionesActualesIntro: 'You can open them now while the new course is being written.',
    sinLecciones: 'This course is being written from scratch; no current lessons feed it yet.',
    syllabus: 'Course syllabus',
    checkpoint: 'Checkpoint',
    proyectoFinal: 'Final project',
    volverA: (x: string) => `Back to ${x}`,
    todaLaAcademia: 'The whole Academy',
    enEstaUnidad: 'In this unit',
    piezas: {
      guia: 'Guide',
      'comprobaciones-rapidas': 'Quick checks',
      ejercicios: 'Exercises',
      cuestionario: 'Quiz',
      reflexion: 'Reflection',
    } as Record<string, string>,
    tarjetas: 'Review cards',
    frente: 'Question',
    reverso: 'Answer',
    abrir: 'Open',
    rutasDeAprendizaje: 'Learning paths',
    ramasBiblioteca: 'Library branches',
  },
} as const

export type UiCopy = (typeof UI)[Lang]

// ─── Piezas de una unidad de S0 ───────────────────────────────────────────────

/** Orden de las piezas estándar de una unidad. */
export const PIEZAS_UNIDAD = ['guia', 'comprobaciones-rapidas', 'ejercicios', 'cuestionario', 'reflexion'] as const

/**
 * El archivo de clave de una pieza, relativo a la carpeta del curso, o null.
 * Convención del paquete: claves/<u>-clave-comprobaciones.md,
 * claves/<u>-clave-cuestionario.md, claves/<u>-soluciones-ejercicios.md y
 * claves/checkpoint-clave.md.
 */
export function claveDePieza(unidadSlug: string, pieza: string): string | null {
  const u = /^(u\d+)/.exec(unidadSlug)?.[1]
  if (pieza === 'checkpoint') return 'claves/checkpoint-clave.md'
  if (!u) return null
  if (pieza === 'comprobaciones-rapidas') return `claves/${u}-clave-comprobaciones.md`
  if (pieza === 'cuestionario') return `claves/${u}-clave-cuestionario.md`
  if (pieza === 'ejercicios') return `claves/${u}-soluciones-ejercicios.md`
  return null
}

/** En una unidad enriquecida, la clave de `NN-algo.md` es `claves/NN-*.md`. */
export function claveEnriquecida(archivo: string, claves: string[]): string | null {
  const nn = /^(\d{2})-/.exec(archivo)?.[1]
  if (!nn) return null
  return claves.find((c) => c.startsWith(`${nn}-`)) ?? null
}

/** Parser CSV mínimo (comillas dobles, comas, saltos dentro de comillas). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let field = ''
  let row: string[] = []
  let inQ = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else inQ = false
      } else field += c
      continue
    }
    if (c === '"') inQ = true
    else if (c === ',') {
      row.push(field)
      field = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field)
      field = ''
      if (row.some((f) => f !== '')) rows.push(row)
      row = []
    } else field += c
  }
  row.push(field)
  if (row.some((f) => f !== '')) rows.push(row)
  return rows
}
