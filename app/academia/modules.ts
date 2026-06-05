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
    status: 'available',
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
    status: 'available',
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
    status: 'available',
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
      {
        title: 'Awwwards — Inspiración de los mejores sitios del mundo',
        url: 'https://www.awwwards.com',
        type: 'tool',
      },
      {
        title: 'dark.design — Colección de dark UI inspiration',
        url: 'https://www.dark.design',
        type: 'tool',
      },
      {
        title: 'Godly — Curación de diseño web premium',
        url: 'https://godly.website',
        type: 'tool',
      },
      {
        title: 'Muzli — Chrome extension: design inspiration en cada tab',
        url: 'https://muz.li',
        type: 'tool',
      },
      {
        title: 'Saaspo — Sitios SaaS curados (pricing, dashboards, onboarding)',
        url: 'https://saaspo.com',
        type: 'tool',
      },
      {
        title: 'One Page Love — Mejores sitios de una sola página',
        url: 'https://onepagelove.com',
        type: 'tool',
      },
      {
        title: 'MaxiBestOf — Front-end creativo, WebGL y heroes experimentales',
        url: 'https://maxibestof.website',
        type: 'tool',
      },
      {
        title: 'Land Book — Galería ordenada por industria, color y estilo',
        url: 'https://land-book.com',
        type: 'tool',
      },
      {
        title: 'CSS Design Awards — Sitios premiados por UI/UX/innovación',
        url: 'https://cssdesignawards.com',
        type: 'tool',
      },
      {
        title: 'Mobbin — Pantallas reales de apps top, filtrables por flujo',
        url: 'https://mobbin.com',
        type: 'tool',
      },
      {
        title: 'Viewport UI — Grabaciones de interacciones y gestos reales',
        url: 'https://viewport-ui.design',
        type: 'tool',
      },
      {
        title: '60fps.design — Micro-interacciones curadas con foco en rendimiento',
        url: 'https://60fps.design',
        type: 'tool',
      },
    ],
  },

  {
    id: 'uiux-2',
    number: 2,
    track: 'uiux',
    title: 'Figma + FigJam — Diseño y colaboración profesional',
    description:
      'Dominá Figma desde interfaz básica hasta componentes, Auto Layout y handoff. Más FigJam para workshops, brainstorming y mapas de flujo colaborativos.',
    duration: '3–4 semanas',
    status: 'available',
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
        embedUrl: undefined,
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
        title: 'FigJam: brainstorming, flujos y workshops colaborativos',
        type: 'reading',
        content:
          'FigJam es la pizarra colaborativa de Figma — ideal para mapear user journeys, hacer brainstorming, diseñar flujos de información (user flows), y correr workshops remotos. Aprendé: sticky notes, conectores, votación con stamps, templates de retrospectiva y de user flow. Ejercicio: mapeá el user flow completo de la app que diseñaste en la práctica anterior: desde que el usuario abre la app hasta que completa la tarea principal.',
        completed: false,
      },
      {
        id: 'u2-l6',
        title: 'Práctica: diseñar 5 pantallas + su user flow en FigJam',
        type: 'practice',
        content:
          'Elegí una app simple (gestor de tareas, recetario, app de clima) y completá dos entregables en el mismo Figma workspace: (1) En FigJam: mapeá el user flow completo con conectores y notas de decisión. (2) En Figma Design: diseñá 5 pantallas usando Auto Layout, al menos 5 componentes reutilizables, y conectalas con un prototipo funcional. El flujo en FigJam debe guiar las decisiones del diseño en Figma.',
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
        title: 'FigJam — Introducción oficial',
        url: 'https://help.figma.com/hc/en-us/articles/1500004362321',
        type: 'article',
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
    id: 'uiux-7',
    number: 3,
    track: 'uiux',
    title: 'Motion en Figma — Smart Animate y Micro-interacciones',
    description:
      'El puente entre diseño estático y UI memorable. Aprendé a crear animaciones con propósito en Figma: timing, easing, before/after states, Smart Animate, y cómo exportar y presentar tus prototipos.',
    duration: '3–4 semanas',
    status: 'available',
    lessons: [
      {
        id: 'u7-l1',
        title: 'Mindset: animación con propósito vs animación decorativa',
        type: 'reading',
        content:
          'El error más común de los diseñadores que aprenden motion es animar todo lo que pueden. La regla es la contraria: animá solo lo que tiene un propósito. Propósitos válidos: guiar la atención, confirmar una acción, explicar un cambio de estado, dar feedback inmediato. Un solo hover bien ejecutado vale más que diez transiciones de pantalla que no aportan claridad. Diferencia clave: UI tradicional (estático, funcional) vs UI moderno (propósito + motion = percepción de premium). El motion es lo que AI no puede replicar — porque elegir qué se mueve, cuándo, y con qué intención requiere juicio humano de diseño.',
        completed: false,
      },
      {
        id: 'u7-l2',
        title: 'Visual style moderno: grid, layering y depth',
        type: 'practice',
        content:
          'Antes de animar, el diseño estático tiene que sentirse moderno. La animación sobre un diseño mediocre solo lo hace más notorio. Tres elementos que diferencian un diseño moderno de uno genérico: (1) Grid no convencional — los elementos no están en una cuadrícula predecible, hay superposición deliberada. (2) Layering — elementos que se solapan crean profundidad. (3) Tipografía de alto contraste — size jump dramático entre headline y body. Tarea: buscá 5 heroes en Awwwards, tomá screenshot y pegalos en un frame de Figma. Analizá por escrito: ¿qué tienen que tu diseño actual no tiene? Luego reproducí los 5 heroes desde cero.',
        completed: false,
      },
      {
        id: 'u7-l3',
        title: 'Timing y easing: las dos variables que lo deciden todo',
        type: 'reading',
        content:
          'La fórmula base de cualquier animación: Estado Antes → (tween con curva) → Estado Después. La herramienta calcula los frames intermedios según duration y easing. Lo que puede cambiar entre estados: posición, tamaño, rotación, opacidad, color, blur, radio, sombras, layout. DURACIONES RECOMENDADAS: micro-interacciones (hover, press, feedback) → 150–200ms. Cambio de estado (toggle, expand) → 200–300ms. Modal o transición de pantalla → 250–400ms. Flujos secuenciados con stagger → 800–1200ms total. Más de 500ms en una sola animación se siente lento. EASING POR USO: Ease Out para entradas (el elemento llega suave, se acomoda rápido). Ease In para salidas (arranca suave, termina rápido). Ease-In-Out para transiciones de pantalla completa. NUNCA Linear — se ve mecánico y sin vida. En Figma: en el panel de prototipado hacé click en el ícono de curva y ajustá los handles del Bezier custom. La curva que AyzZ usa el 90% del tiempo es un ease-out pronunciado: handle de entrada muy alto, handle de salida pegado al final. Referencia visual: easings.net.',
        completed: false,
      },
      {
        id: 'u7-l4',
        title: 'Smart Animate: estados Before → After',
        type: 'practice',
        content:
          'Smart Animate anima automáticamente las diferencias entre dos frames cuando los elementos tienen el mismo nombre de capa. WORKFLOW: (1) Diseñá el estado final (After) primero — es el estado en reposo, cómo se ve la UI cuando ya cargó. (2) Duplicá el frame → renombralo "Before". (3) En Before modificá las propiedades iniciales: headline → y +16–24px + opacity 0%. Subhead → +8–12px + opacity 0% (con delay). CTA → outline → filled, scale 0.98 → 1. Imagen → scale 0.96 → 1, blur 8px → 0. (4) En la pestaña Prototype, conectá Before → After con Smart Animate + tu easing. REGLA CRÍTICA: los nombres de capa en Before y After deben ser idénticos — Smart Animate los empareja por nombre. Si cambiás el nombre, no anima. ERRORES COMUNES: animar demasiadas cosas al mismo tiempo (máximo 4–5 elementos por frame), usar Linear (se ve mecánico), mover elementos más de 40px (se ve exagerado), no verificar el orden de lectura (headline primero, luego subhead, luego CTA). PRÁCTICA: abrí uno de los 5 tutoriales de esta sección, replicá la animación exacta, y luego hacé la misma animación con tu propio diseño.',
        completed: false,
      },
      {
        id: 'u7-l5',
        title: 'Animar secciones completas: ritmo y jerarquía de scroll',
        type: 'reading',
        content:
          'Una página entera animada debe tener ritmo, no caos. La fórmula por sección: (1) Definí la jerarquía — ¿qué elemento se ve primero? Ese aparece solo, los demás lo siguen. (2) Aplicá stagger — si hay varios elementos que aparecen juntos, cada uno tiene un delay de 40–60ms respecto al anterior. Nunca todos al mismo tiempo. (3) Usá un patrón consistente — si en el hero el texto viene desde abajo, que en las otras secciones también venga desde abajo. Consistencia = intencionalidad. (4) Limitá la concurrencia — máximo 3 elementos animándose simultáneamente. El resto espera o está quieto. En Figma: creá un frame "Before" y uno "After" por cada sección y conectalos con Smart Animate para simular el scroll.',
        completed: false,
      },
      {
        id: 'u7-l6',
        title: 'Práctica: grabar el prototipo y prepararlo para portfolio',
        type: 'practice',
        content:
          'HERRAMIENTAS: Figma (Present mode) + grabador de pantalla (OBS Studio / Outplayed / QuickTime en Mac) + CapCut para edición. PREPARACIÓN ANTES DE GRABAR: presentá el prototipo al 100% de zoom, cerrá apps pesadas (Teams, browsers con 20 tabs), definí la interacción exacta que vas a grabar (10–20 segundos máximo). CONFIGURACIÓN DE GRABACIÓN: resolución 1920×1080 (horizontal) o 1080×1920 (vertical para Reels), 60 fps obligatorio, formato MP4 H.264, bitrate 12–20 Mbps, ocultá el cursor si la animación es automática. EDICIÓN EN CAPCUT: importá el clip, recortá el inicio y el final (sin frames muertos), hacé crop ajustado para eliminar bordes de la pantalla, considerá hacer el video loopeable (el final se conecta suave con el inicio). EXPORT POR CANAL: Reels/TikTok → 1080×1920 vertical, 60fps. Portfolio/YouTube → 1920×1080, 60fps. Dribbble/Behance → 1600–1920px de ancho, 60fps. LOOP DE PUBLICACIÓN: diseñar → animar → grabar (10–20s) → editar en CapCut → postear al día siguiente. Repetí este ciclo con cada prototipo. Tu feed es tu prueba de habilidad en tiempo real.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Awwwards — Inspiración de los mejores sitios del mundo',
        url: 'https://www.awwwards.com',
        type: 'tool',
      },
      {
        title: 'dark.design — Colección de dark UI inspiration',
        url: 'https://www.dark.design',
        type: 'tool',
      },
      {
        title: 'Godly — Curación de diseño web premium',
        url: 'https://godly.website',
        type: 'tool',
      },
      {
        title: 'Muzli — Chrome extension: design inspiration en cada tab',
        url: 'https://muz.li',
        type: 'tool',
      },
      {
        title: 'easings.net — Referencia visual de curvas de easing',
        url: 'https://easings.net',
        type: 'article',
      },
      {
        title: 'Smart Animate en Figma — Documentación oficial',
        url: 'https://help.figma.com/hc/en-us/articles/360039818874',
        type: 'article',
      },
      {
        title: '@ayzz.thedesigner — Highlight "Motion Tutorials" en Instagram',
        url: 'https://www.instagram.com/ayzz.thedesigner',
        type: 'video',
      },
      {
        title: 'Tutorial: Button Hover Animation (AyzZ)',
        url: 'https://www.instagram.com/reel/DCy4ysoAa6c/',
        type: 'video',
      },
      {
        title: 'Tutorial: Simple Hero Animation (AyzZ)',
        url: 'https://www.instagram.com/reel/DBJVFtNtUEu/',
        type: 'video',
      },
      {
        title: 'Tutorial: Card Hover Animation (AyzZ)',
        url: 'https://www.instagram.com/reel/DFscYaVNhSr/',
        type: 'video',
      },
      {
        title: 'Tutorial: Cursor Follow Animation (AyzZ)',
        url: 'https://www.instagram.com/reel/DJDwnVfiwNh/',
        type: 'video',
      },
      {
        title: 'Tutorial: Product Swipe Animation (AyzZ)',
        url: 'https://www.instagram.com/reel/DKZjv5Pii6J/',
        type: 'video',
      },
      {
        title: 'Tutorial: Scroll Animation in Figma (AyzZ)',
        url: 'https://www.instagram.com/reel/DM-WQhbNeQX/',
        type: 'video',
      },
      {
        title: 'Saaspo — Sitios SaaS curados (pricing, dashboards, onboarding)',
        url: 'https://saaspo.com',
        type: 'tool',
      },
      {
        title: 'One Page Love — Mejores sitios de una sola página',
        url: 'https://onepagelove.com',
        type: 'tool',
      },
      {
        title: 'MaxiBestOf — Front-end creativo, WebGL y heroes experimentales',
        url: 'https://maxibestof.website',
        type: 'tool',
      },
      {
        title: 'Land Book — Galería ordenada por industria, color y estilo',
        url: 'https://land-book.com',
        type: 'tool',
      },
      {
        title: 'CSS Design Awards — Sitios premiados por UI/UX/innovación',
        url: 'https://cssdesignawards.com',
        type: 'tool',
      },
      {
        title: 'Mobbin — Pantallas reales de apps top, filtrables por flujo',
        url: 'https://mobbin.com',
        type: 'tool',
      },
      {
        title: 'Viewport UI — Grabaciones de interacciones y gestos reales',
        url: 'https://viewport-ui.design',
        type: 'tool',
      },
      {
        title: '60fps.design — Micro-interacciones curadas con foco en rendimiento',
        url: 'https://60fps.design',
        type: 'tool',
      },
    ],
  },

  {
    id: 'uiux-5',
    number: 4,
    track: 'uiux',
    title: 'No-Code Design: Webflow y Framer',
    description:
      'Pasá de diseño a sitio publicado sin escribir código. Webflow para webs complejas con CMS, Framer para landing pages con animaciones avanzadas y conexión directa con Figma.',
    duration: '3–4 semanas',
    status: 'available',
    lessons: [
      {
        id: 'u5-l1',
        title: '¿Cuándo usar Webflow, Framer o código? El mapa de decisión',
        type: 'reading',
        content:
          'No todas las herramientas sirven para todo. El criterio es: **Webflow** → webs de marketing con CMS, múltiples páginas, blogs, ecommerce básico. Requiere aprender su lógica visual (box model, clases CSS visuales). **Framer** → landing pages de alto impacto, portfolios, sites con animaciones complejas. Importa de Figma. Genera React. **Código (Next.js)** → cuando necesitás control total, lógica de negocio, backend propio, escala. Ejercicio: para 3 proyectos reales que tengas en mente, decidí cuál herramienta usarías y por qué.',
        completed: false,
      },
      {
        id: 'u5-l2',
        title: 'Webflow: fundamentos de diseño visual con clases',
        type: 'video',
        embedUrl: undefined,
        content:
          'Creá una cuenta en webflow.com (plan gratis disponible). El concepto clave de Webflow es que sus clases CSS son visuales: lo que arrastrás y configurás en el panel es CSS real. Aprendé: el Navigator (árbol de elementos), el Style Panel (box model, flexbox, grid), clases vs IDs, y el modo responsive. Seguí el curso oficial "Webflow University — Webflow 101 Crash Course" antes de tocar cualquier template.',
        completed: false,
      },
      {
        id: 'u5-l3',
        title: 'Webflow CMS e Interactions',
        type: 'reading',
        content:
          'Dos superpoderes de Webflow: **CMS** → creás una colección (ej: "Blog Posts") con campos, y Webflow genera automáticamente las páginas dinámicas. Ideal para portafolios o sitios con contenido que se actualiza. **Interactions** → animaciones on-scroll, on-hover, on-click sin código. Podés recrear casi cualquier efecto de Linear.app o Stripe con Webflow Interactions. Ejercicio: construí una página de portfolio con 3 case studies usando el CMS.',
        completed: false,
      },
      {
        id: 'u5-l4',
        title: 'Framer: de Figma a sitio publicado con animaciones premium',
        type: 'reading',
        content:
          'Framer tiene la curva de aprendizaje más baja si ya sabés Figma — porque su interfaz es casi idéntica. Puntos clave: **Import desde Figma** → copiás frames de Figma y los pegás en Framer (funciona bien para estructura, menos para variables/componentes complejos). **Breakpoints** → responsive sin código. **Scroll animations** → parallax, fade-in-up, sticky elements, todo visual. **Code overrides** → cuando necesitás lógica, podés conectar componentes React. **Publicación** → con dominio propio en 1 click. Ejercicio: publicá una landing page de AlphaDev Studios (o proyecto propio) usando Framer en menos de 2 horas.',
        completed: false,
      },
      {
        id: 'u5-l5',
        title: 'Publicación, dominio y SEO básico en Webflow/Framer',
        type: 'reading',
        content:
          'Antes de publicar cualquier sitio: configura el título, meta description, OG image y alt text de imágenes. En Webflow: SEO settings por página, sitemap automático, Google Search Console. En Framer: SEO panel por página, robots.txt, analytics integrado. Para el dominio: ambas herramientas permiten conectar un dominio externo o comprar uno dentro de la plataforma. Costo típico: $14–19 USD/año por dominio + plan pago de la herramienta si querés dominio propio.',
        completed: false,
      },
      {
        id: 'u5-l6',
        title: 'Práctica: publicar una landing page real con Framer o Webflow',
        type: 'practice',
        content:
          'Elegí una de las dos herramientas y publicá una landing page completa: header con headline, 3 secciones de contenido, CTA final, footer. Requisitos mínimos: (1) responsive en mobile, (2) al menos 1 animación on-scroll, (3) publicada con URL accesible (el subdominio gratuito de Framer/Webflow sirve para la práctica). Opcionalmente: conectá tu propio dominio. Guardá el link de la página publicada.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Webflow University — Webflow 101 Crash Course',
        url: 'https://university.webflow.com/courses/webflow-101-crash-course',
        type: 'course',
      },
      {
        title: 'Webflow — Editor visual no-code',
        url: 'https://webflow.com',
        type: 'tool',
      },
      {
        title: 'Framer — De diseño a sitio publicado',
        url: 'https://www.framer.com',
        type: 'tool',
      },
      {
        title: 'Framer Academy — Tutoriales oficiales',
        url: 'https://www.framer.com/academy',
        type: 'course',
      },
      {
        title: 'Webflow CMS — Documentación oficial',
        url: 'https://university.webflow.com/courses/webflow-cms-basics',
        type: 'article',
      },
      {
        title: 'Webflow Interactions — Animaciones sin código',
        url: 'https://university.webflow.com/courses/interactions-and-animations-course',
        type: 'course',
      },
      {
        title: 'Framer Templates — Punto de partida gratuito',
        url: 'https://www.framer.com/templates/',
        type: 'tool',
      },
    ],
  },

  {
    id: 'uiux-6',
    number: 5,
    track: 'uiux',
    title: 'After Effects — Motion Design para UI',
    description:
      'Creá micro-animaciones, transiciones y motion graphics para interfaces digitales. Aprendé a exportar animaciones como Lottie para usarlas en Framer, Webflow o cualquier app.',
    duration: '3–4 semanas',
    status: 'available',
    lessons: [
      {
        id: 'u6-l1',
        title: 'After Effects para diseñadores UI: qué necesitás y qué no',
        type: 'reading',
        content:
          'After Effects es el estándar de la industria para motion design. Como diseñador UI no necesitás aprender todo — el foco es: animaciones de interfaz (micro-interacciones, loading states, transiciones entre pantallas), motion graphics para redes sociales, y exportación a Lottie para web/mobile. Lo que NO necesitás dominar: compositing de video, VFX, 3D complejo. Descargá After Effects desde Adobe Creative Cloud (tiene trial de 7 días gratuitos). Familiarizate con la interfaz: Project panel, Composition panel, Timeline, y los paneles de efectos.',
        completed: false,
      },
      {
        id: 'u6-l2',
        title: 'Conceptos clave: keyframes, easing y el gráfico de velocidad',
        type: 'reading',
        content:
          'El 80% de After Effects se reduce a entender keyframes y easing. Keyframes marcan el inicio y el fin de una animación — AE interpola los valores intermedios. El error más común de principiantes es usar easing lineal, que se ve mecánico. Aprendé: Easy Ease (F9), el Graph Editor para controlar aceleración/deceleración, y las curvas de Bezier. Referencia de easing: easings.net. Ejercicio: animá un rectángulo moviéndose de izquierda a derecha con easing profesional (entrada rápida, salida suave o viceversa).',
        completed: false,
      },
      {
        id: 'u6-l3',
        title: 'Micro-animaciones de UI: botones, loaders, iconos',
        type: 'practice',
        content:
          'Las micro-animaciones son el diferencial entre una UI buena y una memorable. Diseñá y animá estos 3 elementos: (1) Un botón con estado default → hover → click → success (con checkmark que aparece). (2) Un loader circular estilo iOS con rotación y trim path. (3) Un ícono que transforma de hamburguesa a X (menú mobile). Usá Shape Layers para todo — son más livianas que imágenes y se exportan mejor a Lottie.',
        completed: false,
      },
      {
        id: 'u6-l4',
        title: 'Lottie + Bodymovin: exportar animaciones para web y mobile',
        type: 'reading',
        content:
          'Lottie es el formato que convierte animaciones de After Effects en JSON liviano reproducible en web, iOS y Android. El flujo: (1) Instalá el plugin gratuito Bodymovin en After Effects (via ZXP Installer). (2) Diseñá tu animación usando solo Shape Layers, Solids y Text (sin effectos complejos ni plugins de terceros — no exportan bien). (3) File → Export → Bodymovin → generá el archivo .json. (4) En Framer: insertá un componente Lottie y pegá el JSON. En Webflow: usá el widget de Lottie. En código: la librería lottie-web o lottie-react. Ejercicio: exportá el loader del ejercicio anterior como Lottie y embedilo en el proyecto de Framer del módulo anterior.',
        completed: false,
      },
      {
        id: 'u6-l5',
        title: 'Transiciones de pantalla y storytelling en motion',
        type: 'reading',
        content:
          'Las transiciones entre pantallas guían la atención del usuario y refuerzan la jerarquía de navegación. Principios: (1) Las cosas que aparecen deben venir de algún lado lógico (modal → desde abajo, detalle → desde la derecha). (2) Duración: 200–350ms para transiciones de UI, más largo se siente lento. (3) Coordinación: cuando varios elementos se animan juntos, aplicá un stagger (retraso escalonado de 30–50ms entre elementos). Ejercicio: animá una transición entre dos pantallas del prototipo que diseñaste en Figma, con stagger en los elementos del contenido.',
        completed: false,
      },
      {
        id: 'u6-l6',
        title: 'Práctica: kit de animaciones UI listo para usar',
        type: 'practice',
        content:
          'Creá un kit de 5 animaciones reutilizables en After Effects y exportalas como Lottie: (1) Loading spinner, (2) Checkmark de éxito, (3) Error shake, (4) Transición de entrada de card (fade + slide up), (5) Ícono animado (cualquiera). Subí los archivos .json a una carpeta en Drive. Este kit es un asset real que podés usar en cualquier proyecto de Framer, Webflow o con código.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Adobe After Effects — Creative Cloud',
        url: 'https://www.adobe.com/products/aftereffects.html',
        type: 'tool',
      },
      {
        title: 'LottieFiles — Librería de animaciones Lottie gratuitas',
        url: 'https://lottiefiles.com',
        type: 'tool',
      },
      {
        title: 'Bodymovin — Plugin para exportar a Lottie',
        url: 'https://aescripts.com/bodymovin/',
        type: 'tool',
      },
      {
        title: 'Motion Design School — Cursos de AE para UI',
        url: 'https://motiondesign.school',
        type: 'course',
      },
      {
        title: 'easings.net — Referencia visual de curvas de easing',
        url: 'https://easings.net',
        type: 'article',
      },
      {
        title: 'School of Motion — Principios de animación',
        url: 'https://www.schoolofmotion.com/blog/12-principles-of-animation',
        type: 'article',
      },
    ],
  },

  {
    id: 'uiux-4',
    number: 6,
    track: 'uiux',
    title: 'Design Systems y Portfolio Profesional',
    description:
      'Construí un design system reutilizable en Figma y creá un portfolio UI/UX que demuestre tu trabajo. El diferencial que convierte proyectos en oportunidades.',
    duration: '3–4 semanas',
    status: 'available',
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

  {
    id: 'uiux-8',
    number: 7,
    track: 'uiux',
    title: 'Bonus: Rive, Spline y Unicorn Studio',
    description:
      'Las herramientas que separan el top 1% de diseñadores del resto. No necesitás dominar todas — elegí una y explorala a fondo. Rive para iconos interactivos, Spline para 3D en web, Unicorn Studio para efectos WebGL.',
    duration: '2–3 semanas',
    status: 'available',
    lessons: [
      {
        id: 'u8-l1',
        title: 'Rive: iconos e ilustraciones interactivas con state machines',
        type: 'reading',
        content:
          'Rive es la herramienta más potente para crear animaciones vectoriales interactivas listas para producción. Su diferencial sobre Lottie/After Effects: las state machines. Una state machine define cómo un elemento transiciona entre estados (idle → hover → pressed → success) basada en eventos del usuario — sin código adicional en muchos casos. Casos de uso perfectos: iconos de navegación animados (hamburguesa → X), botones con estados de carga, ilustraciones interactivas en onboarding, mascots que reaccionan al usuario. Los archivos de Rive son extremadamente livianos (KB, no MB) y corren a 60fps nativamente en web. Creá una cuenta gratuita en rive.app y seguí el curso oficial "Rive 101".',
        completed: false,
      },
      {
        id: 'u8-l2',
        title: 'Spline: 3D para web sin código',
        type: 'reading',
        content:
          'Spline te permite crear objetos 3D, escenas y animaciones que se embeben directamente en cualquier sitio web — incluyendo Framer y Webflow. Lo que lo hace útil para diseñadores UI: no requiere conocimiento de Three.js ni WebGL. Casos de uso: hero con objeto 3D interactivo (el usuario lo puede rotar con el mouse), íconos 3D animados, fondos con profundidad. Casos donde NO usar Spline: sitios que priorizan performance extrema (Spline añade peso de carga). Flujo de integración: diseñás en spline.design → exportás como código embebible o iframe → lo insertás en Framer/Webflow. Limitaciones a saber: la versión gratuita muestra el logo de Spline en el embed.',
        completed: false,
      },
      {
        id: 'u8-l3',
        title: 'Unicorn Studio: efectos WebGL y scroll-driven sin código',
        type: 'reading',
        content:
          'Unicorn Studio genera efectos visuales WebGL — shaders, fluidos, gradientes animados, noise effects — que se activan con el scroll o el mouse. Es lo que usás cuando querés que el background de una sección "viva" o que el hero tenga un efecto de fluido premium sin contratar a un developer especializado en WebGL. Casos de uso: fondos de hero con gradiente fluido animado, secciones "wow" de landing pages premium, efectos de partículas suaves. La integración es igual a Spline: un snippet de código o iframe que pegás en Framer/Webflow. Referencia para ver qué puede hacer: explorá la galería de templates en unicornstudio.io.',
        completed: false,
      },
      {
        id: 'u8-l4',
        title: 'La estrategia correcta: elegí una y dominala',
        type: 'reading',
        content:
          'El error más común con herramientas avanzadas es coleccionarlas sin dominar ninguna. La recomendación del roadmap de AyzZ es directa: elegí UNA de estas herramientas y explorá todo lo que puede hacer. Si ya dominás After Effects → Lottie, Rive es el siguiente paso natural (ambas son vectoriales, ambas exportan para web/mobile). Si tu foco es webs premium con 3D, Spline. Si hacés landing pages de alto impacto y querés backgrounds que impresionen, Unicorn Studio. Dominar una sola de estas herramientas ya te pone en el top percentil de diseñadores UI — la mayoría no sabe que existen.',
        completed: false,
      },
      {
        id: 'u8-l5',
        title: 'Práctica: integrar una animación avanzada en un proyecto real',
        type: 'practice',
        content:
          'Elegí la herramienta que más te llamó la atención (Rive, Spline o Unicorn Studio) y creá un asset que puedas integrar en la landing page que publicaste en el módulo de Webflow/Framer: (A) Rive: un ícono animado con al menos 2 estados (idle + hover). (B) Spline: un objeto 3D simple (esfera, cubo abstracto) con auto-rotate. (C) Unicorn Studio: un background animado para el hero. Integralá en Framer o Webflow y republicá el sitio. Guardá el link actualizado — esto eleva el nivel del portfolio considerablemente.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Rive — Animaciones interactivas con state machines',
        url: 'https://rive.app',
        type: 'tool',
      },
      {
        title: 'Rive Community — Ejemplos y templates gratuitos',
        url: 'https://rive.app/community',
        type: 'tool',
      },
      {
        title: 'Spline — 3D design tool para web',
        url: 'https://spline.design',
        type: 'tool',
      },
      {
        title: 'Unicorn Studio — Efectos WebGL sin código',
        url: 'https://unicornstudio.io',
        type: 'tool',
      },
      {
        title: 'Rive 101 — Curso oficial de introducción',
        url: 'https://rive.app/learn-rive',
        type: 'course',
      },
    ],
  },
]
