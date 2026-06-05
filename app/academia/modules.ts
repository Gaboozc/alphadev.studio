// ─── Types ────────────────────────────────────────────────────────────────────
// Designed to mirror a future Supabase schema — keep fields flat and serializable

export type LessonType = 'video' | 'audio' | 'reading' | 'practice'
export type ResourceType = 'course' | 'video' | 'article' | 'tool' | 'certification'
export type ModuleStatus = 'locked' | 'available' | 'completed'
export type Track = 'marketing' | 'uiux'

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
  track: Track
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
    track: 'marketing',
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
    track: 'marketing',
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
    track: 'marketing',
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
    track: 'marketing',
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

  // ─── UI/UX & Diseño ───────────────────────────────────────────────────────

  {
    id: 'uiux-1',
    number: 1,
    track: 'uiux',
    title: 'Fundamentos de UI/UX Design',
    description:
      'Entendé la diferencia entre UX e UI, aprendé los principios visuales que rigen todo diseño digital y completá el primer módulo del Google UX Design Certificate.',
    duration: '2–3 semanas',
    status: 'available',
    lessons: [
      {
        id: 'u1-l1',
        title: '¿Qué es UX y qué es UI? La diferencia que importa',
        type: 'reading',
        content:
          'UX (User Experience) es cómo se siente usar un producto. UI (User Interface) es cómo se ve. Un buen diseñador trabaja ambos. Leé el artículo de Nielsen Norman Group sobre la diferencia, luego anotá: en tu producto ideal, ¿qué problema de UX resolverías primero?',
        completed: false,
      },
      {
        id: 'u1-l2',
        title: 'Principios visuales: jerarquía, contraste, alineación, proximidad',
        type: 'reading',
        content:
          'Estos 4 principios explican el 80% de por qué un diseño se ve profesional o amateur. Estudiá cada uno con ejemplos reales. Ejercicio: abrí cualquier app que uses y anotá dónde aplica (o viola) cada principio.',
        completed: false,
      },
      {
        id: 'u1-l3',
        title: 'Google UX Design Certificate — Módulo 1',
        type: 'reading',
        content:
          'Inscribite en el Google UX Design Certificate en Coursera (tiene opción gratuita con audit). Completá el Curso 1: "Foundations of User Experience (UX) Design". Son ~21 horas divididas en semanas.',
        completed: false,
      },
      {
        id: 'u1-l4',
        title: 'Laws of UX: las leyes que todo diseñador debe conocer',
        type: 'reading',
        content:
          'Visitá lawsofux.com y leé al menos estas 5 leyes: Ley de Fitts, Ley de Hick, Efecto Von Restorff, Principio de Pareto, Efecto de la Usabilidad Estética. Para cada una, pensá en un ejemplo de app que la use bien.',
        completed: false,
      },
      {
        id: 'u1-l5',
        title: 'Práctica: auditoría UX de una pantalla',
        type: 'practice',
        content:
          'Elegí una pantalla de cualquier app (login, onboarding, checkout) y hacé una auditoría escrita: ¿Qué principios aplica bien? ¿Qué viola? ¿Qué cambiarías y por qué? Guardá el análisis en Notion o un doc.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Google UX Design Certificate — Coursera',
        url: 'https://www.coursera.org/professional-certificates/google-ux-design',
        type: 'certification',
      },
      {
        title: 'Laws of UX',
        url: 'https://lawsofux.com',
        type: 'article',
      },
      {
        title: 'Nielsen Norman Group — UX vs UI',
        url: 'https://www.nngroup.com/articles/definition-user-experience/',
        type: 'article',
      },
      {
        title: 'Refactoring UI (libro de los creadores de Tailwind)',
        url: 'https://www.refactoringui.com',
        type: 'course',
      },
      {
        title: 'Figma Community — UI kits gratuitos',
        url: 'https://www.figma.com/community',
        type: 'tool',
      },
    ],
  },

  {
    id: 'uiux-2',
    number: 2,
    track: 'uiux',
    title: 'Figma — De cero a flujo de trabajo profesional',
    description:
      'Dominá Figma desde la interfaz básica hasta componentes, Auto Layout, prototipado y handoff para developers. La herramienta estándar de la industria.',
    duration: '3–4 semanas',
    status: 'locked',
    lessons: [
      {
        id: 'u2-l1',
        title: 'Figma 101: frames, capas, formas y texto',
        type: 'reading',
        content:
          'Creá una cuenta en figma.com (gratis para empezar). Completá el curso oficial "Figma Basics" en help.figma.com. Aprendé: frames vs grupos, capas y nomenclatura, formas básicas, texto con estilos. Ejercicio: reproducí cualquier pantalla simple desde cero.',
        completed: false,
      },
      {
        id: 'u2-l2',
        title: 'Auto Layout: el superpoder de Figma',
        type: 'video',
        embedUrl: undefined, // Agregar tutorial de Auto Layout en YouTube
        content:
          'Auto Layout te permite crear diseños que se adaptan automáticamente al contenido. Aprendé: dirección (horizontal/vertical), espaciado, padding, grow/fill. Es equivalente a flexbox en CSS. Practicá creando un botón y una card que se expandan con el contenido.',
        completed: false,
      },
      {
        id: 'u2-l3',
        title: 'Componentes y variantes: reutilización profesional',
        type: 'reading',
        content:
          'Los componentes son el equivalente de React components en diseño. Aprendé: crear componentes maestros, instancias, variantes (estados: default/hover/disabled). Ejercicio: creá un sistema de botones con 3 variantes y 3 estados cada uno.',
        completed: false,
      },
      {
        id: 'u2-l4',
        title: 'Prototipado: conectar pantallas y simular flujos',
        type: 'reading',
        content:
          'En la pestaña Prototype de Figma podés conectar frames y crear interacciones. Aprendé: navegación entre pantallas, transiciones, overlays (modales), smart animate. Ejercicio: prototipar un flujo de onboarding de 4 pantallas.',
        completed: false,
      },
      {
        id: 'u2-l5',
        title: 'Práctica: diseñar 5 pantallas de una app mobile',
        type: 'practice',
        content:
          'Elegí una app simple (gestor de tareas, recetario, app de clima) y diseñá 5 pantallas: home, listado, detalle, formulario, y una pantalla de éxito/error. Usá Auto Layout en todo, crea al menos 5 componentes reutilizables, y conectalas con un prototipo funcional.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Figma Learn — Tutoriales oficiales',
        url: 'https://help.figma.com/hc/en-us/categories/360002051613',
        type: 'course',
      },
      {
        title: 'Figma Community — Templates y UI kits',
        url: 'https://www.figma.com/community',
        type: 'tool',
      },
      {
        title: 'DesignCourse — Figma for Beginners (YouTube)',
        url: 'https://www.youtube.com/@DesignCourse',
        type: 'video',
      },
      {
        title: 'Figma Variables y Design Tokens (docs)',
        url: 'https://help.figma.com/hc/en-us/articles/15339657135383',
        type: 'article',
      },
      {
        title: 'Dev Mode: handoff para developers',
        url: 'https://help.figma.com/hc/en-us/articles/15023124644247',
        type: 'article',
      },
    ],
  },

  {
    id: 'uiux-3',
    number: 3,
    track: 'uiux',
    title: 'Creación de Videos y Contenido Visual',
    description:
      'Aprendé las herramientas esenciales para crear videos de calidad: desde edición rápida con CapCut para redes hasta producción semi-profesional con DaVinci Resolve.',
    duration: '2–3 semanas',
    status: 'locked',
    lessons: [
      {
        id: 'u3-l1',
        title: 'CapCut: edición rápida para redes sociales',
        type: 'reading',
        content:
          'CapCut es el estándar para crear contenido de TikTok, Reels e Instagram. Descargá la app (o usá la versión web en capcut.com). Aprendé: corte de clips, transiciones, texto animado, subtítulos automáticos, música y efectos de sonido. Ejercicio: editá un video de 30–60 segundos sobre cualquier tema.',
        completed: false,
      },
      {
        id: 'u3-l2',
        title: 'DaVinci Resolve: producción de video profesional gratis',
        type: 'video',
        embedUrl: undefined, // Agregar tutorial de DaVinci Resolve en YouTube
        content:
          'DaVinci Resolve es usado en Hollywood y es completamente gratuito. Descargalo en blackmagicdesign.com. Aprendé: timeline básica, cortes, color grading básico (LUTs), audio mixing. No necesitás dominar todo — con el 20% ganás el 80% del resultado.',
        completed: false,
      },
      {
        id: 'u3-l3',
        title: 'OBS Studio + Loom: grabación de pantalla y webcam',
        type: 'reading',
        content:
          'OBS Studio (obsproject.com) es gratuito y open source — ideal para grabaciones largas, streaming o tutoriales. Loom (loom.com) es la opción rápida para videos cortos de comunicación (perfect para handoff con clientes). Aprendé a configurar escenas en OBS y hacé tu primer video de screen recording.',
        completed: false,
      },
      {
        id: 'u3-l4',
        title: 'Canva Video + Adobe Express: diseño visual rápido',
        type: 'reading',
        content:
          'Para piezas visuales que no son video puro: banners, stories, presentaciones animadas. Canva (canva.com) es la herramienta más accesible. Adobe Express (adobe.com/express) tiene mejores assets. Aprendé a usar plantillas, personalizar brand kit, y exportar en formatos correctos para cada red.',
        completed: false,
      },
      {
        id: 'u3-l5',
        title: 'Práctica: crear un video de presentación de 60 segundos',
        type: 'practice',
        content:
          'Creá un video de 60 segundos presentando AlphaDev Studios o un proyecto personal. Requisitos: intro con texto animado, al menos 1 corte limpio, música de fondo, subtítulos. Podés usar CapCut o DaVinci Resolve. Subilo a una carpeta en Drive o directamente a una red social.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'CapCut — Editor de video online y app',
        url: 'https://www.capcut.com',
        type: 'tool',
      },
      {
        title: 'DaVinci Resolve — Descarga gratuita',
        url: 'https://www.blackmagicdesign.com/products/davinciresolve',
        type: 'tool',
      },
      {
        title: 'OBS Studio — Grabación y streaming gratis',
        url: 'https://obsproject.com',
        type: 'tool',
      },
      {
        title: 'Loom — Video mensajes rápidos',
        url: 'https://www.loom.com',
        type: 'tool',
      },
      {
        title: 'Canva — Diseño visual accesible',
        url: 'https://www.canva.com',
        type: 'tool',
      },
      {
        title: 'Descript — Edición de video por transcripción',
        url: 'https://www.descript.com',
        type: 'tool',
      },
    ],
  },

  {
    id: 'uiux-4',
    number: 4,
    track: 'uiux',
    title: 'Design Systems y Portfolio Profesional',
    description:
      'Construí un design system reutilizable en Figma y creá un portfolio UI/UX que demuestre tu trabajo. El diferencial que convierte proyectos en oportunidades.',
    duration: '3–4 semanas',
    status: 'locked',
    lessons: [
      {
        id: 'u4-l1',
        title: '¿Qué es un Design System y por qué importa?',
        type: 'reading',
        content:
          'Un Design System es una colección de componentes reutilizables + guías de uso que aseguran consistencia visual en toda la aplicación. Estudiá los más famosos: Material Design (Google), Apple Human Interface Guidelines, y Carbon (IBM). Anotá: ¿qué tienen en común en su estructura?',
        completed: false,
      },
      {
        id: 'u4-l2',
        title: 'Variables y tokens de diseño en Figma',
        type: 'reading',
        content:
          'Los design tokens son la capa de abstracción entre los valores de diseño y el código. En Figma se implementan como Variables. Aprendé: crear variables de color (primitivos → semánticos), variables de tipografía, spacing y cómo conectarlas a componentes. Esto es lo que alguien haría para AlphaDev Studios si necesitara un design system.',
        completed: false,
      },
      {
        id: 'u4-l3',
        title: 'Cómo armar un portfolio UI/UX que consiga trabajo',
        type: 'reading',
        content:
          'Un portfolio de diseño debe mostrar proceso, no solo resultado final. Estructura ideal por proyecto: 1) Contexto y problema, 2) Research, 3) Exploración/wireframes, 4) Solución final, 5) Resultado o aprendizaje. Plataformas: Dribbble (para visibilidad), Behance (para case studies largos), Notion o sitio propio (para control total).',
        completed: false,
      },
      {
        id: 'u4-l4',
        title: 'Audio overview — Track UI/UX',
        type: 'audio',
        embedUrl: undefined, // Generar con NotebookLM
        content: 'Resumen en audio del track completo de UI/UX. Generado con NotebookLM.',
        completed: false,
      },
      {
        id: 'u4-l5',
        title: 'Práctica: documentar un proyecto como case study',
        type: 'practice',
        content:
          'Tomá el proyecto de 5 pantallas del Módulo 2 (o cualquier proyecto que hayas hecho) y documentalo como un case study completo: problema, proceso, decisiones de diseño, resultado. Publicalo en Behance o Notion y guardá el link. Este es el primer proyecto de tu portfolio.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Material Design 3 — Sistema de diseño de Google',
        url: 'https://m3.material.io',
        type: 'article',
      },
      {
        title: 'Apple Human Interface Guidelines',
        url: 'https://developer.apple.com/design/human-interface-guidelines/',
        type: 'article',
      },
      {
        title: 'Dribbble — Portfolio y comunidad de diseñadores',
        url: 'https://dribbble.com',
        type: 'tool',
      },
      {
        title: 'Behance — Case studies y portfolio largo',
        url: 'https://www.behance.net',
        type: 'tool',
      },
      {
        title: 'Design Systems Handbook — InVision',
        url: 'https://www.designbetter.co/design-systems-handbook',
        type: 'course',
      },
      {
        title: 'Checklist Design — Best practices por componente',
        url: 'https://www.checklist.design',
        type: 'article',
      },
    ],
  },
]
