// Estructura de la Academia: Familia → Rama → Área (track) → Módulo → Lección.
//
// La rama se DERIVA del track (ver RAMA_OF_TRACK), así agregar un módulo no
// obliga a declarar la rama a mano ni a mantener dos fuentes de verdad.

// Este archivo NO importa el contenido de los módulos a propósito: es metadata
// liviana que puede viajar al cliente sin arrastrar los cursos completos.
// Las consultas que sí necesitan el contenido viven en `queries.ts`.

import type { IconName } from '@/components/Icon'
import type { Audience, Module, Track } from './types'

export type Rama = 'programacion' | 'diseno' | 'ia' | 'marketing' | 'contenido' | 'negocio'
export type Familia = 'construir' | 'crecer'

// ─── Familias ─────────────────────────────────────────────────────────────────
// Dos maneras de entrar: construir el producto, o hacerlo crecer.

export const FAMILIAS: { id: Familia; label: string; description: string }[] = [
  {
    id: 'construir',
    label: 'Construir',
    description: 'Todo lo que hace falta para diseñar y desarrollar el producto.',
  },
  {
    id: 'crecer',
    label: 'Crecer',
    description: 'Todo lo que hace falta para conseguir clientes y sostener el negocio.',
  },
]

// ─── Ramas ────────────────────────────────────────────────────────────────────

export interface RamaMeta {
  id: Rama
  slug: string        // segmento de URL: /academia/<slug>
  label: string
  familia: Familia
  icon: IconName
  description: string
  tracks: Track[]     // orden en que se muestran las áreas dentro de la rama
}

export const RAMAS: RamaMeta[] = [
  {
    id: 'programacion',
    slug: 'programacion',
    label: 'Programación',
    familia: 'construir',
    icon: 'code',
    description: 'Del primer comando en la terminal a un producto en producción, con pruebas y deploy propios.',
    // Fundamentos va primero: es el prerrequisito del resto de la rama.
    tracks: ['fundamentos', 'web', 'backend', 'prodai'],
  },
  {
    id: 'diseno',
    slug: 'diseno',
    label: 'Diseño',
    familia: 'construir',
    icon: 'palette',
    description: 'Interfaces, identidad de marca y sistemas de diseño que se sostienen solos.',
    tracks: ['uiux', 'branding'],
  },
  {
    id: 'ia',
    slug: 'inteligencia-artificial',
    label: 'Inteligencia Artificial',
    familia: 'construir',
    icon: 'sparkles',
    description: 'Prompting, agentes y automatizaciones que hacen el trabajo repetitivo por ti.',
    tracks: ['ia'],
  },
  {
    id: 'marketing',
    slug: 'marketing',
    label: 'Marketing',
    familia: 'crecer',
    icon: 'megaphone',
    description: 'Contenido orgánico, pauta paga, email y comunidad para conseguir clientes.',
    tracks: ['marketing', 'ads', 'email', 'community'],
  },
  {
    id: 'contenido',
    slug: 'contenido-seo',
    label: 'Contenido & SEO',
    familia: 'crecer',
    icon: 'penTool',
    description: 'Escribir para vender y para que te encuentren, en Google y en la IA.',
    tracks: ['copy', 'seo', 'geo', 'video'],
  },
  {
    id: 'negocio',
    slug: 'negocio-datos',
    label: 'Negocio & Datos',
    familia: 'crecer',
    icon: 'trendingUp',
    description: 'Cerrar ventas y medir lo que pasa después, para decidir con datos.',
    tracks: ['ventas', 'data'],
  },
]

// ─── Áreas de estudio (tracks) ────────────────────────────────────────────────
// Fuente única — antes esta tabla estaba duplicada en AcademiaContent y AcademiaNav.

export interface TrackMeta {
  id: Track
  label: string
  icon: IconName
  description: string
}

export const TRACK_META: Record<Track, TrackMeta> = {
  fundamentos: { id: 'fundamentos', label: 'Fundamentos del oficio', icon: 'terminal', description: 'Terminal, Git y GitHub, manejo de errores y testing. La base que el resto da por sabida.' },
  web: { id: 'web', label: 'Desarrollo Web', icon: 'code', description: 'HTML, CSS, React, Next.js, autenticación y deployment en producción.' },
  backend: { id: 'backend', label: 'Back-end y datos', icon: 'database', description: 'APIs con FastAPI, bases de datos relacionales y contenedores.' },
  prodai: { id: 'prodai', label: 'Producto IA', icon: 'box', description: 'Construir y lanzar productos digitales con IA integrada.' },
  uiux: { id: 'uiux', label: 'UI/UX', icon: 'palette', description: 'Figma, prototipos, UX Writing y testing de usabilidad.' },
  branding: { id: 'branding', label: 'Branding', icon: 'layers', description: 'Identidad de marca, naming y brand strategy.' },
  ia: { id: 'ia', label: 'Inteligencia Artificial', icon: 'sparkles', description: 'Prompting, agentes, RAG y automatización con IA.' },
  marketing: { id: 'marketing', label: 'Marketing', icon: 'megaphone', description: 'Estrategia, contenido orgánico, Meta Ads y medición.' },
  ads: { id: 'ads', label: 'Publicidad', icon: 'target', description: 'Meta Ads, Google Ads, TikTok Ads y remarketing.' },
  email: { id: 'email', label: 'Email Marketing', icon: 'mail', description: 'Listas, secuencias, automatizaciones y deliverability.' },
  community: { id: 'community', label: 'Community', icon: 'users', description: 'Gestión de comunidades, engagement y crecimiento orgánico.' },
  copy: { id: 'copy', label: 'Copywriting', icon: 'penTool', description: 'Persuasión, fórmulas, landing pages y emails que convierten.' },
  seo: { id: 'seo', label: 'SEO', icon: 'search', description: 'Keyword research, SEO técnico y link building.' },
  geo: { id: 'geo', label: 'GEO', icon: 'sparkles', description: 'Optimización para motores generativos: ChatGPT, Perplexity y Google AI.' },
  video: { id: 'video', label: 'Video', icon: 'play', description: 'Producción, edición, YouTube y contenido short-form.' },
  ventas: { id: 'ventas', label: 'Ventas', icon: 'trendingUp', description: 'CRM, pipeline, negociación y cierre de deals.' },
  data: { id: 'data', label: 'Data & Analytics', icon: 'barChart', description: 'GA4, Looker Studio, SQL y decisiones basadas en datos.' },
}

// ─── Derivaciones y helpers ───────────────────────────────────────────────────

export const RAMA_OF_TRACK: Record<Track, Rama> = RAMAS.reduce((acc, r) => {
  r.tracks.forEach((t) => { acc[t] = r.id })
  return acc
}, {} as Record<Track, Rama>)

export function ramaBySlug(slug: string): RamaMeta | undefined {
  return RAMAS.find((r) => r.slug === slug)
}

export function ramaOfModule(mod: Module): RamaMeta {
  return RAMAS.find((r) => r.id === RAMA_OF_TRACK[mod.track])!
}

export function audienceOf(mod: Module): Audience {
  return mod.audience ?? 'aprendizaje'
}

export function isCapstone(mod: Module): boolean {
  return mod.id.includes('capstone')
}

// Ordena los módulos de un área: por `number`, con el capstone siempre al final.
export function sortModules(mods: Module[]): Module[] {
  return [...mods].sort((a, b) => {
    const ac = isCapstone(a) ? 1 : 0
    const bc = isCapstone(b) ? 1 : 0
    if (ac !== bc) return ac - bc
    return a.number - b.number
  })
}

export function ramasOfFamilia(familia: Familia): RamaMeta[] {
  return RAMAS.filter((r) => r.familia === familia)
}

// Cuenta lecciones de una lista de módulos.
export function countLessons(mods: Module[]): number {
  return mods.reduce((acc, m) => acc + m.lessons.length, 0)
}

// ─── URLs ─────────────────────────────────────────────────────────────────────
// Estructura: /academia/<rama>/<módulo>/<lección>
// Siempre armá los links con estos helpers: si la estructura cambia, se cambia acá.

export function ramaHref(rama: Rama | RamaMeta): string {
  const slug = typeof rama === 'string' ? RAMAS.find((r) => r.id === rama)?.slug : rama.slug
  return `/academia/${slug ?? ''}`
}

export function moduleHref(mod: Module): string {
  return `${ramaHref(ramaOfModule(mod))}/${mod.id}`
}

export function lessonHref(mod: Module, lessonId: string): string {
  return `${moduleHref(mod)}/${lessonId}`
}
