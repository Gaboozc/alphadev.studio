// ─── Types ────────────────────────────────────────────────────────────────────
// Designed to mirror a future Supabase schema — keep fields flat and serializable

export type LessonType = 'video' | 'audio' | 'reading' | 'practice'
export type ResourceType = 'course' | 'video' | 'article' | 'tool' | 'certification'
export type ModuleStatus = 'locked' | 'available' | 'completed'

export interface Lesson {
  id: string
  title: string
  type: LessonType
  embedUrl?: string   // YouTube URL, NotebookLM share link, or direct audio URL
  content?: string    // Notes or instructions shown below the embed
  completed: boolean  // Default state; runtime state lives in localStorage/DB
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
  lessons: Lesson[]
  resources: Resource[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────
// Edit this array to add/update modules, lessons, and resources.
// To add a lesson: push a new object into the module's `lessons` array.
// To embed a NotebookLM audio: set type: 'audio' and embedUrl to the share URL.
// To embed YouTube: set type: 'video' and embedUrl to the full YouTube URL.

export const MODULES: Module[] = [
  {
    id: 'modulo-1',
    number: 1,
    title: 'Fundamentos de marca y contenido orgánico',
    description:
      'Definí la identidad de AlphaDev Studios, entendé a tu audiencia y publicá contenido orgánico consistente en LinkedIn e Instagram.',
    duration: '2–3 semanas',
    status: 'available',
    lessons: [
      {
        id: 'm1-l1',
        title: 'Buyer persona: quién es tu cliente ideal',
        type: 'reading',
        content:
          'Definí al menos 2 buyer personas para AlphaDev Studios (founder tech-savvy y dueño de PyME LATAM). Respondé: ¿qué problema tienen?, ¿dónde los encontrás?, ¿qué lenguaje usan?',
        completed: false,
      },
      {
        id: 'm1-l2',
        title: 'Posicionamiento y propuesta de valor única',
        type: 'reading',
        content:
          'Completá el canvas: "Para [audiencia] que [problema], AlphaDev Studios es [categoría] que [beneficio único], a diferencia de [alternativa]."',
        completed: false,
      },
      {
        id: 'm1-l3',
        title: 'Curso Google Actívate: Marketing Digital',
        type: 'reading',
        embedUrl: undefined,
        content:
          'Inscribite en learndigital.withgoogle.com/activate — completá los primeros 3 módulos del curso de Marketing Digital.',
        completed: false,
      },
      {
        id: 'm1-l4',
        title: 'Audio overview — Módulo 1',
        type: 'audio',
        embedUrl: undefined, // Pegá aquí el link de NotebookLM cuando lo generes
        content: 'Resumen en audio del módulo. Generado con NotebookLM.',
        completed: false,
      },
      {
        id: 'm1-l5',
        title: 'Práctica: primeros 3 posts publicados',
        type: 'practice',
        content:
          'Publicá 1 post en LinkedIn y 2 en Instagram usando el buyer persona y posicionamiento definidos. Anotá las métricas iniciales (alcance, likes, comentarios).',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Google Actívate — Marketing Digital',
        url: 'https://learndigital.withgoogle.com/activate/course/digital-marketing',
        type: 'course',
      },
      {
        title: 'HubSpot: Buyer Persona Template',
        url: 'https://www.hubspot.com/make-my-persona',
        type: 'tool',
      },
      {
        title: 'Canva para contenido social',
        url: 'https://www.canva.com',
        type: 'tool',
      },
    ],
  },
  {
    id: 'modulo-2',
    number: 2,
    title: 'Meta Business Suite + Ads',
    description:
      'Configura Meta Business Suite correctamente, lanza tus primeras campañas en Facebook e Instagram Ads, y aprende a leer las métricas clave.',
    duration: '2–3 semanas',
    status: 'locked',
    lessons: [
      {
        id: 'm2-l1',
        title: 'Setup de Meta Business Suite',
        type: 'reading',
        content:
          'Configura Business Manager, conecta páginas e Instagram, verifica el dominio y configura el píxel de Meta.',
        completed: false,
      },
      {
        id: 'm2-l2',
        title: 'Estructura de campañas: objetivo → conjunto → anuncio',
        type: 'reading',
        content:
          'Entendé la jerarquía de campañas en Meta Ads. Placeholder: agregar video tutorial aquí.',
        completed: false,
      },
      {
        id: 'm2-l3',
        title: 'Curso Meta Blueprint — Introducción a la publicidad',
        type: 'reading',
        embedUrl: undefined,
        content: 'Completá el curso gratuito de Meta Blueprint sobre fundamentos de publicidad.',
        completed: false,
      },
      {
        id: 'm2-l4',
        title: 'Audio overview — Módulo 2',
        type: 'audio',
        embedUrl: undefined,
        content: 'Resumen en audio del módulo. Generado con NotebookLM.',
        completed: false,
      },
      {
        id: 'm2-l5',
        title: 'Práctica: primera campaña con $5 USD',
        type: 'practice',
        content:
          'Lanzá una campaña de tráfico o alcance con presupuesto mínimo. Objetivo: aprender la interfaz y ver los primeros datos reales.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Meta Blueprint — Cursos gratuitos',
        url: 'https://www.facebook.com/business/learn',
        type: 'course',
      },
      {
        title: 'Meta Ads Manager',
        url: 'https://www.facebook.com/adsmanager',
        type: 'tool',
      },
      {
        title: 'Guía del píxel de Meta',
        url: 'https://www.facebook.com/business/help/952192354843755',
        type: 'article',
      },
    ],
  },
  {
    id: 'modulo-3',
    number: 3,
    title: 'Google Ads + Google Business Profile',
    description:
      'Aparece cuando alguien busca lo que tú ofreces. Configura Google Business Profile y lanza campañas de búsqueda con Google Ads.',
    duration: '2–3 semanas',
    status: 'locked',
    lessons: [
      {
        id: 'm3-l1',
        title: 'Google Business Profile: setup completo',
        type: 'reading',
        content:
          'Reclamá y completá el perfil de AlphaDev Studios en Google Business. Fotos, descripción, categorías, horario, y link al sitio.',
        completed: false,
      },
      {
        id: 'm3-l2',
        title: 'Keyword research básico para Google Ads',
        type: 'reading',
        content:
          'Usá Google Keyword Planner para encontrar términos de búsqueda relevantes. Foco en intent transaccional ("contratar desarrollo web", "agencia nextjs").',
        completed: false,
      },
      {
        id: 'm3-l3',
        title: 'Estructura de campañas Search',
        type: 'video',
        embedUrl: undefined, // Agregar URL de YouTube tutorial
        content: 'Campaña → Grupo de anuncios → Keywords → Anuncios. Placeholder: agregar video.',
        completed: false,
      },
      {
        id: 'm3-l4',
        title: 'Audio overview — Módulo 3',
        type: 'audio',
        embedUrl: undefined,
        content: 'Resumen en audio del módulo. Generado con NotebookLM.',
        completed: false,
      },
      {
        id: 'm3-l5',
        title: 'Práctica: campaña Search activa',
        type: 'practice',
        content:
          'Lanzá una campaña de búsqueda con al menos 1 grupo de anuncios y 3 variantes de anuncio. Monitorear durante 7 días.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Google Skillshop — Google Ads',
        url: 'https://skillshop.withgoogle.com',
        type: 'course',
      },
      {
        title: 'Google Keyword Planner',
        url: 'https://ads.google.com/home/tools/keyword-planner/',
        type: 'tool',
      },
      {
        title: 'Google Business Profile',
        url: 'https://business.google.com',
        type: 'tool',
      },
    ],
  },
  {
    id: 'modulo-4',
    number: 4,
    title: 'TikTok + Medición y Reportes',
    description:
      'Explora TikTok como canal de adquisición y aprende a medir todo: UTMs, Google Analytics 4, y reportes semanales que guíen decisiones.',
    duration: '2–3 semanas',
    status: 'locked',
    lessons: [
      {
        id: 'm4-l1',
        title: 'TikTok for Business: setup y primeros videos',
        type: 'reading',
        content:
          'Creá cuenta Business en TikTok. Publicá 3 videos de contenido técnico/educativo. Foco: hooks en los primeros 3 segundos.',
        completed: false,
      },
      {
        id: 'm4-l2',
        title: 'UTMs: trackear todo el tráfico',
        type: 'reading',
        content:
          'Creá UTMs para cada canal (utm_source, utm_medium, utm_campaign). Usá el Campaign URL Builder de Google.',
        completed: false,
      },
      {
        id: 'm4-l3',
        title: 'Google Analytics 4 — métricas esenciales',
        type: 'video',
        embedUrl: undefined,
        content: 'Configura GA4 en alphadev.studio. Métricas clave: sesiones, tasa de conversión, fuente de tráfico.',
        completed: false,
      },
      {
        id: 'm4-l4',
        title: 'Audio overview — Módulo 4',
        type: 'audio',
        embedUrl: undefined,
        content: 'Resumen en audio del módulo. Generado con NotebookLM.',
        completed: false,
      },
      {
        id: 'm4-l5',
        title: 'Práctica: reporte semanal de marketing',
        type: 'practice',
        content:
          'Creá una plantilla de reporte semanal: tráfico por canal, leads generados, costo por lead (si hay ads), acciones de la próxima semana.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'TikTok for Business',
        url: 'https://www.tiktok.com/business',
        type: 'tool',
      },
      {
        title: 'Google Campaign URL Builder',
        url: 'https://ga-dev-tools.google/campaign-url-builder/',
        type: 'tool',
      },
      {
        title: 'Google Analytics 4',
        url: 'https://analytics.google.com',
        type: 'tool',
      },
      {
        title: 'Certificación Google Analytics',
        url: 'https://skillshop.withgoogle.com/collection/3243',
        type: 'certification',
      },
    ],
  },
]
