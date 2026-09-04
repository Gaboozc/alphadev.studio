// ─── Types ────────────────────────────────────────────────────────────────────
// Designed to mirror a future Supabase schema — keep fields flat and serializable

export type LessonType = 'video' | 'audio' | 'reading' | 'practice' | 'exam' | 'project'
export type ResourceType = 'course' | 'video' | 'article' | 'tool' | 'certification' | 'documentation'
export type ModuleStatus = 'locked' | 'available' | 'completed'
export type Track = 'marketing' | 'uiux' | 'web' | 'ia' | 'branding' | 'copy' | 'seo' | 'geo' | 'data' | 'ads' | 'email' | 'video' | 'community' | 'prodai' | 'ventas' | 'fundamentos' | 'backend' | 'iaeng'
export type RetoStatus = 'proximo' | 'activo' | 'completado'
export type PathLevel = 'principiante' | 'intermedio' | 'avanzado'

// Para quién es el módulo. Define qué ve cada usuario según sus permisos:
//   'aprendizaje'  — catálogo de cursos (contenido vendible)
//   'capacitacion' — formación interna del equipo y colaboradores
//   'ambos'        — visible para las dos audiencias
// Si el módulo no lo declara, se asume 'aprendizaje' (ver audienceOf en ramas.ts).
export type Audience = 'aprendizaje' | 'capacitacion' | 'ambos'

export interface Question {
  q: string
  options: string[]     // exactly 4 options
  correct: number       // 0-indexed correct answer
  explanation: string   // shown after answering
}

export interface Lesson {
  id: string
  title: string
  type: LessonType
  embedUrl?: string       // YouTube URL, NotebookLM share link, or direct audio URL
  content?: string        // Teaching body — supports ## headers, **bold**, - lists, double newline = paragraph
  tasks?: string[]        // Actionable checklist items shown under "Tareas"
  tip?: string            // Professional insight shown in highlighted box
  questions?: Question[]  // exam type — knowledge check questions
  deliverables?: string[] // project type — what the student must submit
  projectBrief?: string   // project type — full project description and context
  rubrica?: string[]      // project type — grading criteria
  discussionPrompts?: string[]
  scheduledDays?: string
  difficulty?: 'básico' | 'intermedio' | 'profesional'
  completed: boolean      // Default state; runtime state lives in localStorage/DB
}

export interface Resource {
  title: string
  url: string
  type: ResourceType
}

export interface Module {
  id: string          // slug used in URL: /academia/[id]
  number: number
  title: string
  description: string
  duration: string    // e.g. "2–3 semanas"
  status: ModuleStatus
  track: Track
  audience?: Audience  // ausente = 'aprendizaje'
  lessons: Lesson[]
  resources: Resource[]
}

export interface LearningPath {
  id: string
  title: string
  subtitle: string
  description: string
  level: PathLevel
  duration: string
  tracks: Track[]
  moduleIds: string[]   // ordered module IDs that compose this path
  forWho: string
  outcome: string
}

export interface Reto {
  id: string
  title: string
  tagline: string
  description: string
  tracks: Track[]
  duration: string
  deliverable: string
  requirements: string[]
  howToSubmit: string[]
  prizes: string[]
  status: RetoStatus
  startDate?: string
  endDate?: string
}
