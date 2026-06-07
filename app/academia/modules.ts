// ─── Types ────────────────────────────────────────────────────────────────────
// Designed to mirror a future Supabase schema — keep fields flat and serializable

export type LessonType = 'video' | 'audio' | 'reading' | 'practice' | 'exam' | 'project'
export type ResourceType = 'course' | 'video' | 'article' | 'tool' | 'certification' | 'documentation'
export type ModuleStatus = 'locked' | 'available' | 'completed'
export type Track = 'marketing' | 'uiux' | 'web' | 'ia' | 'branding' | 'copy' | 'seo' | 'data' | 'ads' | 'email' | 'video' | 'community' | 'prodai' | 'ventas'
export type RetoStatus = 'proximo' | 'activo' | 'completado'
export type PathLevel = 'principiante' | 'intermedio' | 'avanzado'

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
          '## Qué es un buyer persona\n\nUn **buyer persona** es una representación semi-ficticia de tu cliente ideal basada en datos reales. No es un segmento demográfico genérico como "hombres de 25–35 años" — es un perfil específico con nombre, trabajo, frustraciones concretas y hábitos de consumo.\n\nPara AlphaDev Studios, definir esto es la base de todo: sin saber a quién le hablás, no podés elegir canales, tono ni qué problemas resolver en el copy.\n\n## Los dos perfiles clave\n\n**Founder tech-savvy (70%)**: 28–40 años, maneja una startup o producto digital, sabe lo que quiere técnicamente. Su frustración: developers que tardan meses. Paga en USD. Está en Twitter/X, LinkedIn y comunidades indie hacker.\n\n**Dueño de PyME LATAM (30%)**: negocio físico o de servicios que quiere digitalizarse. No domina el vocabulario técnico. Confía en recomendaciones. Está en Instagram y grupos de WhatsApp.\n\n## Las cuatro preguntas que hay que responder\n\n- ¿Qué problema tienen antes de contratarte?\n- ¿Qué buscan en Google cuando están listos para contratar?\n- ¿Qué los hace desconfiar de una agencia?\n- ¿Qué resultado les cambia el negocio si lo lográs?\n\nSin estas respuestas, todo el marketing que hagas es a ciegas.',
        tasks: [
          'Escribí en un doc las respuestas a las 4 preguntas de arriba para el perfil Founder tech-savvy',
          'Repetí el ejercicio para el perfil PyME LATAM — buscá grupos o foros donde hablen de sus problemas reales',
          'Completá el formulario de HubSpot Make My Persona con al menos uno de los dos perfiles',
          'Redactá 3 razones concretas por las que cada perfil elegiría AlphaDev sobre una agencia genérica',
        ],
        tip: 'Los mejores buyer personas usan el lenguaje real de los clientes. Buscá en Twitter/X "frustrated with my web agency" o similares — ese lenguaje exacto es el copy que debería estar en tu landing page.',
        completed: false,
      },
      {
        id: 'm1-l1b',
        title: 'Mini-práctica: completá tu buyer persona en 30 minutos',
        type: 'practice',
        content:
          '## El ejercicio\n\nUsá los conceptos de la lectura anterior para crear un buyer persona completo usando HubSpot Make My Persona (hubspot.com/make-my-persona) o manualmente en Notion.\n\n## Los campos obligatorios\n\n- Nombre ficticio (ej: "Founder Federico" o "Dueña Diana")\n- Cargo y sector del negocio\n- Rango de edad y canales de contenido\n- Sus 3 frustraciones principales con proveedores de tecnología\n- El resultado concreto que busca al contratar\n- Por qué elegiría AlphaDev sobre una agencia genérica\n\n## Cómo hacerlo en 30 minutos\n\n**10 min**: buscá en Twitter/X "frustrated web agency" o "my developer is slow" — copiá frases literales de usuarios reales. Ese lenguaje exacto es el copy de tus anuncios.\n\n**10 min**: completá los campos con lo que encontraste más lo que ya sabés de tu audiencia.\n\n**10 min**: revisá. Preguntate: ¿alguien que lee esto entiende exactamente a quién le hablamos?',
        tasks: [
          'Buscá en Twitter/X "frustrated web agency" — copiá 3 frases literales de usuarios reales',
          'Completá el formulario de HubSpot Make My Persona o creá el perfil manualmente en Notion',
          'Asegurate de incluir: nombre ficticio, cargo, frustraciones, resultado buscado, razón para elegir AlphaDev',
          'Guardá el buyer persona donde puedas consultarlo — lo vas a referenciar en todos los módulos siguientes',
        ],
        tip: 'El buyer persona no es un ejercicio único — es un documento vivo. A medida que hagas campañas reales, aprendés cosas de tu audiencia que mejoran el perfil. Actualizalo cada 60 días con lo que los datos te enseñen.',
        completed: false,
      },
      {
        id: 'm1-l2',
        title: 'Posicionamiento y propuesta de valor única',
        type: 'reading',
        content:
          '## Por qué el posicionamiento lo define todo\n\nEl posicionamiento decide cómo querés que te perciban en la mente de tu cliente ideal. Sin posicionamiento claro, sos "otra agencia digital" y competís solo por precio.\n\nAlphaDev Studios tiene que responder una pregunta: ¿para quién somos la única opción obvia?\n\n## El canvas de posicionamiento\n\nLa fórmula:\n\n**"Para [audiencia específica] que [problema concreto], AlphaDev Studios es [categoría] que [beneficio diferencial], a diferencia de [alternativa que ya usan]."**\n\nEjemplo real: "Para founders de SaaS LATAM que necesitan pasar de MVP a producto con IA integrada, AlphaDev Studios es el equipo técnico que entrega en semanas — a diferencia de agencias que tardan meses y no entienden el stack moderno."\n\n## Tipos de diferenciación válida\n\n- **Técnica**: "Usamos el mismo stack que Linear, Vercel y Stripe"\n- **Proceso**: "MVP funcional en 3 semanas, no en 3 meses"\n- **Postura**: "Trabajamos con founders, no con comités"\n\nLas tres son válidas, pero solo funciona la que podés demostrar con ejemplos concretos. Elegí una y sé consistente.',
        tasks: [
          'Completá el canvas de posicionamiento con los datos reales de AlphaDev Studios',
          'Escribí 3 versiones del canvas — una para cada tipo de diferenciación (técnica, proceso, postura)',
          'Buscá 2 competidores directos en Google y anotá cómo se posicionan — ¿dónde hay espacio sin ocupar?',
          'Redactá el primer párrafo del "About" de AlphaDev usando el canvas como base',
        ],
        tip: 'El canvas de posicionamiento no es copy final — es claridad interna. Una vez que podés decirlo en una oración, todo lo demás (anuncios, pitch, bio) sale solo. Revisitalo cada vez que agregués un servicio nuevo.',
        completed: false,
      },
      {
        id: 'm1-l2b',
        title: 'Mini-práctica: redactá tu UVP en una oración',
        type: 'practice',
        content:
          '## La única tarea\n\nUsando el canvas de posicionamiento de la lectura anterior, redactá la Propuesta de Valor Única (UVP) de AlphaDev Studios en una sola oración de máximo 20 palabras.\n\n## La fórmula\n\n**"[Resultado concreto] para [audiencia específica] en [tiempo diferencial], sin [fricción que la competencia genera]."**\n\nEjemplo: "Productos digitales con IA integrada para founders LATAM, listos en semanas, sin el overhead de una agencia tradicional."\n\n## Las tres versiones que necesitás\n\n- **Bio de Instagram**: máximo 80 caracteres\n- **Headline del sitio web**: máximo 8 palabras\n- **Pitch verbal**: lo que decís cuando alguien pregunta "¿a qué te dedicás?" — máximo 15 segundos\n\n## Cómo saber si funcionó\n\nLeele la UVP del sitio a alguien fuera del mundo tech. Si puede repetir en sus propias palabras qué hace AlphaDev, la UVP es clara. Si titubea, simplificá.',
        tasks: [
          'Redactá la UVP usando la fórmula — primera versión sin editar, después refiná',
          'Adaptala a los 3 contextos: bio de Instagram (80 chars), headline del sitio (8 palabras), pitch verbal (15 seg)',
          'Leele la versión del sitio a una persona no-tech y verificá que pueda repetirla',
          'Actualizá la bio de Instagram de AlphaDev con la nueva UVP',
        ],
        tip: 'La UVP perfecta no existe al primer intento. Escribí 5 versiones distintas y elegí la más específica — no la más creativa. "Apps con IA en 3 semanas" convierte mejor que "Tecnología que transforma tu visión en realidad".',
        completed: false,
      },
      {
        id: 'm1-l3',
        title: 'Curso Google Actívate: Marketing Digital',
        type: 'reading',
        embedUrl: undefined,
        content:
          '## Por qué empezar con Google Actívate\n\nGoogle Actívate es la plataforma de cursos gratuitos de Google. Su certificación en Marketing Digital es reconocida globalmente y te da el lenguaje base sin el cual las herramientas más avanzadas no tienen sentido.\n\nEl curso cubre: búsqueda, contenido orgánico, redes sociales, analytics, email y publicidad. No es avanzado — pero establece una base sin la que los módulos 2, 3 y 4 de esta academia quedarían incompletos.\n\n## Cómo encarar el curso\n\nNo lo hagas en modo pasivo. Por cada módulo que completás, aplicá un concepto a AlphaDev Studios antes de seguir. Si el módulo habla de contenido orgánico, publicá algo ese mismo día. Si habla de SEO básico, revisá el meta título del sitio.\n\nCompletá los **primeros 3 módulos** como mínimo antes de avanzar en esta academia: Introducción, Búsqueda y Redes Sociales.\n\n## El examen final\n\n- 40 preguntas, 75% mínimo para aprobar\n- Se puede repetir las veces que necesites\n- El certificado PDF va directo a tu perfil de LinkedIn\n- Tiempo estimado total: 40 horas divididas en semanas',
        tasks: [
          'Inscribite en learndigital.withgoogle.com/activate y creá tu perfil',
          'Completá los módulos 1 (Introducción), 2 (Búsqueda) y 3 (Redes Sociales) antes de avanzar en esta academia',
          'Por cada módulo completado, anotá 1 concepto que podés aplicar a AlphaDev esta semana y aplicalo',
          'Planificá cuándo vas a completar los módulos restantes (ej: 2 por semana)',
        ],
        tip: 'El certificado tiene valor, pero el hábito de aplicar cada concepto inmediatamente vale más. Los cursos que se hacen en un sprint de 3 días sin práctica generan 10% de la retención que generan los que se hacen con aplicación real semanal.',
        completed: false,
      },
      {
        id: 'm1-l5',
        title: 'Práctica: primeros 3 posts publicados',
        type: 'practice',
        content:
          '## El objetivo real de esta práctica\n\nPublicar no es el fin — aprender del mercado es el fin. Estos primeros 3 posts te dan datos reales sobre qué resuena con tu audiencia antes de invertir un solo peso en publicidad.\n\n## Los 3 posts a publicar\n\n**Post 1 — LinkedIn**: Contá una decisión técnica que tomaste y por qué. No vendas — enseñá. Ej: "Por qué elegimos Next.js sobre WordPress para todos nuestros proyectos." Formato: hook en la primera línea, 3–5 puntos, cierre con pregunta que invite a comentar.\n\n**Post 2 — Instagram (Carrusel)**: "3 señales de que tu agencia digital te está fallando." Basate en los pain points del perfil PyME LATAM que definiste. Diseñalo con tu paleta de colores.\n\n**Post 3 — Instagram (Reels o imagen)**: Mostrá algo del proceso — una pantalla de código, un wireframe, el resultado de un deploy. El "behind the scenes" genera confianza sin vender.\n\n## Métricas a registrar\n\nDespués de 48 horas de cada publicación, anotá: alcance, impresiones, likes, comentarios y guardados.',
        tasks: [
          'Redactá los 3 posts ANTES de publicar — editá al menos una vez, no publiques el primer borrador',
          'Publicá el post de LinkedIn en horario pico (martes–jueves, 9–11am o 5–7pm)',
          'Publicá los 2 posts de Instagram con al menos 1 día de diferencia entre ellos',
          'A las 48hs de cada post, registrá las métricas en una tabla simple y comparalos',
          'Escribí en 3 líneas qué aprendiste sobre tu audiencia con esta práctica',
        ],
        tip: 'El error más común del primer post es hablar de vos en vez del cliente. "Somos una agencia especializada en..." no le importa a nadie. "3 razones por las que tu sitio web está perdiendo clientes hoy..." lo quiere leer todo el mundo. El foco siempre en el problema del lector.',
        completed: false,
      },
      {
        id: 'mp-l1',
        title: 'Proyecto 1 — Básico: Calendario de contenido de 30 días',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá y ejecutá un calendario de contenido de 30 días para AlphaDev Studios (o un negocio real). Al terminar tendrás: un sistema de planificación reutilizable, al menos 12 publicaciones en vivo y datos reales de rendimiento.\n\n## El entregable final\n\nNotion o Google Sheets con el calendario completo + screenshots de las publicaciones + reporte de métricas de las 4 semanas. Esto va directo al portafolio.\n\n## El proceso paso a paso\n\n**Semana 0 — Setup**\n- Definí los 3 pilares de contenido (ej: resultados de clientes, educación técnica, behind-the-scenes)\n- Elegí los 2 canales prioritarios: LinkedIn + Instagram o TikTok + Instagram\n- Creá la plantilla del calendario: columnas = fecha / canal / pilar / formato / texto / status\n\n**Semana 1 — Posicionamiento**\n- Post 1 (LinkedIn): Contá una decisión técnica con resultado real\n- Post 2 (Instagram Carrusel): "3 señales de que tu sitio web necesita actualización"\n- Post 3 (Instagram): Behind the scenes de un proceso o herramienta\n\n**Semana 2 — Confianza**\n- Post 4 (LinkedIn): Un aprendizaje real de la semana — honesto, no perfecto\n- Post 5 (Instagram Reels): Proceso de trabajo en 60 segundos\n- Post 6 (Instagram): Resultado de un proyecto con contexto del problema\n\n**Semana 3 — Conversión suave**\n- Post 7 (LinkedIn): Caso de estudio simplificado (problema → solución → resultado)\n- Post 8 (Instagram Carrusel): "Qué incluir en el brief de un proyecto digital"\n- Post 9 (Instagram): Dato de la industria con tu opinión personal\n\n**Semana 4 — Comunidad**\n- Post 10 (LinkedIn): Pregunta abierta a tu red sobre algo real\n- Post 11 (Instagram): Hito o retrospectiva del mes\n- Post 12 (Instagram): Anuncio de algo nuevo o próximo\n\n## El reporte de cierre\n\nAl terminar las 4 semanas, armá un reporte de 1 página con: alcance total por canal, engagement rate promedio, el post con mejor rendimiento, 3 aprendizajes y 3 decisiones para el siguiente mes.',
        tasks: [
          'Creá la plantilla del calendario en Notion o Google Sheets con las 4 semanas planificadas',
          'Publicá las semanas 1 y 2 antes de avanzar al siguiente proyecto',
          'Al finalizar las 4 semanas, completá el reporte de métricas con datos reales',
          'Guardá screenshots de todos los posts publicados para el portafolio',
          'Publicá el reporte de resultados en LinkedIn como post de cierre — ese post también es portafolio',
        ],
        tip: 'El calendario es el 20% del trabajo — la ejecución consistente es el 80%. Si fijás un día y hora fijo por semana para crear contenido, la consistencia se vuelve sistema en lugar de decisión. Los clientes pagan por la consistencia, no por el talento creativo esporádico.',
        completed: false,
      },
      {
        id: 'mp-l2',
        title: 'Proyecto 2 — Básico: Auditoría de presencia digital',
        type: 'practice',
        content:
          '## El brief\n\nElegí un negocio real — AlphaDev Studios, un familiar con negocio, un amigo o un cliente potencial — y hacé una auditoría completa de su presencia digital. El resultado es un reporte PDF o Notion que demuestra tu capacidad de análisis estratégico. Este tipo de entregable es exactamente lo que los clientes pagan en consultoría.\n\n## Por qué este proyecto importa\n\nLa auditoría de presencia digital es el primer servicio que muchas agencias ofrecen — muchas veces gratis como lead magnet. Aprender a hacerla bien abre la puerta a proyectos más grandes y remunerados.\n\n## El proceso paso a paso\n\n**Paso 1 — Elegí el negocio**\nSi es un negocio ajeno, pedí permiso. Explicá que es un proyecto de formación y que les entregás los resultados gratis. Casi todos aceptan.\n\n**Paso 2 — Auditá el sitio web**\n- Velocidad: corré el sitio en PageSpeed Insights — anotá score mobile y desktop\n- SEO básico: ¿tiene meta title, meta description, H1 claro en la home?\n- Claridad de mensaje: ¿el valor del negocio se entiende en 5 segundos?\n- CTA: ¿hay un call to action claro y visible sin hacer scroll?\n- Mobile: ¿se ve correctamente en pantalla de teléfono?\n\n**Paso 3 — Auditá las redes sociales**\nPara cada canal activo, anotá:\n- Fecha del último post y frecuencia promedio\n- Tipo de contenido dominante (video / imagen / texto)\n- Engagement rate estimado (likes + comentarios / seguidores × 100)\n- Completitud del perfil: bio, foto, links, highlights\n\n**Paso 4 — Auditá la búsqueda local (si aplica)**\n- ¿Tiene Google Business Profile verificado?\n- ¿Tiene reseñas? ¿Responde a ellas?\n- ¿Las fotos están actualizadas?\n- ¿El horario y datos de contacto son correctos?\n\n**Paso 5 — Armá el reporte**\n1. Resumen ejecutivo (3 líneas: qué encontraste en general)\n2. Sitio web: puntos fuertes + oportunidades de mejora\n3. Redes sociales: análisis por canal\n4. Búsqueda local (si aplica)\n5. Recomendaciones prioritarias: 5 acciones ordenadas por impacto\n6. Quick wins: qué pueden hacer esta semana sin costo ni diseñador',
        tasks: [
          'Elegí el negocio a auditar y pedí permiso si es un tercero',
          'Completá el análisis del sitio web con PageSpeed Insights y revisión manual punto por punto',
          'Auditá al menos 2 canales de redes sociales con métricas reales registradas',
          'Armá el reporte completo con las 5 recomendaciones priorizadas por impacto',
          'Entregá el reporte al negocio y pedí feedback — esa conversación es el aprendizaje más valioso',
          'Publicá un resumen anonimizado del proyecto en LinkedIn (con permiso)',
        ],
        tip: 'Las mejores auditorías no son las que encuentran más problemas — son las que priorizan mejor. Un cliente no puede implementar 20 cambios a la vez. Los 3 quick wins que pueden hacer en 48 horas sin contratar a nadie son lo que genera confianza inmediata y convierte una auditoría gratis en un contrato de implementación.',
        completed: false,
      },
          {
        id: 'modulo-1-proj-basico',
        title: 'Proyecto Básico: Analiza y mejora un post real',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Elige un post de Instagram o LinkedIn (tuyo o de una marca pública). Analízalo y crea una versión mejorada aplicando lo aprendido.',
        deliverables: [
          'Screenshot del post original con anotaciones: qué funciona y qué no funciona (hook, copy, CTA, formato)',
          'Versión mejorada del mismo post: nuevo copy con hook reescrito y CTA claro',
          'Explicación de 150 palabras justificando cada cambio realizado',
        ],
        tip: 'No busques el post perfecto para analizar. El más imperfecto que tengas es el más valioso para aprender.',
        completed: false,
      },
      {
        id: 'modulo-1-proj-inter',
        title: 'Proyecto Intermedio: Brief de campaña trimestral',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Eres el estratega de marketing de un negocio. El dueño te pide el brief de la próxima campaña trimestral. Redacta el documento completo.',
        deliverables: [
          'Objetivo SMART de la campaña (específico, medible, alcanzable, relevante, en tiempo)',
          'Buyer persona: 1 perfil detallado con nombre, situación, dolores, aspiraciones y canales de consumo',
          'Propuesta de valor diferenciada vs. 2 competidores identificados',
          'Canales seleccionados con justificación de por qué cada uno',
          'KPIs y cómo los medirás',
          'Calendario de 4 semanas con hitos semanales',
        ],
        tip: 'Un brief claro evita el 80% de las fricciones en la ejecución. Si no puedes escribir el objetivo en una sola oración, no está claro todavía.',
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
          '## Por qué usar Business Manager y no tu perfil personal\n\nMeta Business Manager separa tu actividad publicitaria de tu cuenta personal. Sin él, no podés tener múltiples páginas, dar acceso a terceros de forma segura, ni medir conversiones correctamente. Es el paso cero antes de cualquier campaña.\n\n## El checklist de configuración inicial\n\nSeguí este orden exacto para evitar problemas frecuentes:\n\n- **Crear Business Manager** en business.facebook.com con email de empresa (no personal)\n- **Agregar tu Página de Facebook** — si no tenés, creá una antes de continuar\n- **Conectar cuenta de Instagram** — desde Configuración > Cuentas de Instagram\n- **Verificar el dominio** — Configuración > Brand Safety > Dominios. Pegás una meta tag en el `<head>` del sitio o subís un archivo TXT. Obligatorio para el píxel.\n- **Crear e instalar el Píxel de Meta** — Events Manager > Conectar fuente de datos > Web. Instalá el código base en todas las páginas. Verificá que dispara con el Event Testing Tool.\n- **Crear una cuenta publicitaria** — Configuración > Cuentas publicitarias > Agregar. Elegí la moneda y el país correctamente (no se puede cambiar después).\n\n## Errores comunes a evitar\n\nNo mezcles el Business Manager personal con el de AlphaDev. No uses la tarjeta de crédito personal directamente — agregala a la cuenta publicitaria de Business. Y no publiques anuncios antes de verificar que el píxel dispara correctamente.',
        tasks: [
          'Creá o verificá que tenés un Business Manager activo en business.facebook.com',
          'Conectá tu página de Facebook e Instagram al Business Manager',
          'Verificá el dominio de alphadev.studio siguiendo los pasos del checklist',
          'Instalá el píxel de Meta en el sitio y confirmá que dispara con el Event Testing Tool',
          'Creá la cuenta publicitaria con la moneda correcta (USD recomendado para clientes internacionales)',
        ],
        tip: 'El píxel es la inversión más importante antes de pagar un solo dólar en anuncios. Sin píxel instalado y funcionando, Meta no puede optimizar para conversiones reales — solo para clics. Verificalo siempre con la extensión Meta Pixel Helper de Chrome antes de lanzar cualquier campaña.',
        completed: false,
      },
      {
        id: 'm2-l1b',
        title: 'Mini-práctica: verificá que el Píxel está activo',
        type: 'practice',
        content:
          '## El objetivo\n\nSin el Píxel instalado y verificado, Meta no puede optimizar para conversiones reales — solo para clics. Esta práctica confirma que el setup funciona antes de gastar un peso en anuncios.\n\n## El proceso de verificación (15 minutos)\n\n**Paso 1**: Instalá la extensión **Meta Pixel Helper** en Chrome (Chrome Web Store, gratis).\n\n**Paso 2**: Visitá alphadev.studio. La extensión muestra un ícono verde con el ID del píxel si está correcto. Rojo o naranja = problema de instalación.\n\n**Paso 3**: En Meta Events Manager, usá el **Event Testing Tool** — pegá la URL del sitio y verificá que el evento "PageView" dispara al cargar.\n\n**Paso 4**: Completá el formulario de contacto del sitio. Verificá en Events Manager que se registra el evento de conversión correspondiente.\n\n## Qué hacer si falla\n\nError más común: el código base del Píxel está solo en la home, no en todas las páginas. Verificá que está en el `<head>` global del layout de Next.js.',
        tasks: [
          'Instalá Meta Pixel Helper en Chrome y visitá alphadev.studio — verificá que aparece verde con el ID correcto',
          'Usá el Event Testing Tool en Events Manager para confirmar que PageView dispara',
          'Completá el formulario de contacto del sitio y verificá que genera un evento en Events Manager',
          'Documentá el ID del Píxel y el nombre de la cuenta publicitaria en un doc de referencia',
        ],
        tip: 'Verificá el Píxel antes de CADA campaña, no solo al instalarlo. Las actualizaciones del sitio web a veces rompen el código del Píxel sin que te des cuenta. 5 minutos de verificación antes de lanzar te ahorran horas de debugging cuando la campaña lleva 3 días sin datos.',
        completed: false,
      },
      {
        id: 'm2-l2',
        title: 'Estructura de campañas: objetivo → conjunto → anuncio',
        type: 'reading',
        content:
          '## La jerarquía de tres niveles\n\nCada campaña en Meta Ads tiene exactamente tres niveles. Confundirlos es el error más costoso que puede cometer un anunciante:\n\n**Nivel 1 — Campaña**: define el **objetivo**. ¿Qué querés que haga Meta? Opciones principales: Reconocimiento (más personas te ven), Tráfico (clics al sitio), Leads (formulario integrado), Ventas (conversiones). El objetivo le dice al algoritmo qué optimizar.\n\n**Nivel 2 — Conjunto de anuncios**: define la **audiencia**, el **presupuesto**, el **calendario** y el **placement** (dónde aparece). Acá elegís a quién le mostrás el anuncio y cuánto gastás por día o por período.\n\n**Nivel 3 — Anuncio**: el **creativo**. La imagen o video, el copy, el titular, el CTA y la URL de destino.\n\n## Regla de oro: un objetivo por campaña\n\nNo mezcles objetivos. Una campaña de tráfico y una de conversiones tienen métricas distintas, audiencias distintas y lógicas de optimización distintas. Separarlas te permite saber qué funciona y qué no.\n\n## Presupuesto: dónde y cómo asignarlo\n\n- **CBO (Campaign Budget Optimization)**: asignás el presupuesto a nivel de campaña y Meta distribuye entre conjuntos automáticamente. Recomendado cuando tenés más de 3 conjuntos corriendo.\n- **ABO (Ad Set Budget Optimization)**: asignás por conjunto. Más control, más trabajo. Recomendado al principio para entender cómo funciona cada audiencia.',
        tasks: [
          'Creá una campaña de prueba en modo borrador con objetivo Tráfico — sin publicar todavía',
          'Configurá 1 conjunto de anuncios con una audiencia basada en intereses del buyer persona Founder',
          'Creá 2 variantes del mismo anuncio cambiando solo el titular — esto es un A/B test básico',
          'Anotá en un doc qué métricas medirías para saber si la campaña está funcionando (CTR, CPC, ROAS)',
        ],
        tip: 'El algoritmo de Meta necesita datos para optimizar. Con menos de $5 USD/día tardará semanas en salir de la fase de aprendizaje. Si tu presupuesto es muy bajo, es mejor 1 conjunto con $5/día que 3 conjuntos con $1.50/día cada uno.',
        completed: false,
      },
      {
        id: 'm2-l2b',
        title: 'Mini-práctica: mapeá tu primera campaña en papel',
        type: 'practice',
        content:
          '## Antes de tocar Meta Ads\n\nEl error más caro es entrar a Ads Manager sin saber exactamente qué vas a crear. Esta práctica te obliga a planificar en papel o Notion antes de abrir la plataforma.\n\n## El mapa a completar\n\n```\nCampaña\n  Objetivo: [Tráfico / Leads / Ventas]\n  Nombre: "AlphaDev — [objetivo] — [mes-año]"\n\n  Conjunto 1: Audiencia Founders Tech-Savvy\n    Intereses: startups, product management, SaaS\n    Edades: 25–40\n    Presupuesto: $X/día\n    Placement: Feed Instagram + Facebook\n\n    Anuncio 1A\n      Hook (primera línea): "..."\n      Imagen/video: [descripción del creativo]\n      CTA: [Saber más / Contactar]\n      URL: alphadev.studio?utm_source=meta&utm_medium=cpc&utm_campaign=...\n\n    Anuncio 1B (variante A/B)\n      Hook diferente al 1A\n      Mismo destino, diferente ángulo\n```\n\n## Por qué hacerlo antes de la plataforma\n\nMeta Ads Manager está diseñado para que vayas creando sobre la marcha — eso lleva a decisiones impulsivas. El plan en papel fuerza decisiones deliberadas y te permite revisar la coherencia antes de gastar.',
        tasks: [
          'Completá el mapa de campaña en Notion o papel con la estructura completa',
          'Definí la audiencia con al menos 5 intereses específicos para el perfil Founder',
          'Escribí 2 variantes del hook del anuncio — elegí la más específica para el 1A',
          'Definí la URL con UTMs completos antes de crear la campaña en Meta',
        ],
        tip: 'Los nombres de campañas y conjuntos importan más de lo que parece. Cuando tengas 20 campañas corriendo, "Campaña 1" es inútil. La convención recomendada: "[Marca] — [objetivo] — [audiencia] — [mes-año]". Adoptala desde el primer día.',
        completed: false,
      },
      {
        id: 'm2-l3',
        title: 'Curso Meta Blueprint — Introducción a la publicidad',
        type: 'reading',
        embedUrl: undefined,
        content:
          '## Qué es Meta Blueprint\n\n**Meta Blueprint** es la plataforma oficial de formación de Meta. Tiene cursos gratuitos y certificaciones pagas. Para esta etapa, el foco está en los cursos gratuitos que cubren los fundamentos de la publicidad en Facebook e Instagram.\n\n## Cursos prioritarios\n\nAntes de lanzar tu primera campaña con dinero real, completá estos dos cursos en la plataforma:\n\n- **"Introducción a la publicidad en Facebook"** — estructura de campañas, tipos de objetivos, conceptos de audiencia\n- **"Cómo llegar a las personas adecuadas"** — targeting por intereses, comportamientos, audiencias personalizadas y Lookalike\n\nAmbos son en video con quizzes integrados. El tiempo estimado es de 2–4 horas cada uno.\n\n## Las certificaciones pagas (opcional)\n\nMeta Blueprint tiene certificaciones oficiales que cuestan entre $150–$200 USD. Son reconocidas en el mercado y vale la pena considerarlas si vas a ofrecer servicios de Meta Ads a clientes. Las principales:\n\n- **Meta Certified Digital Marketing Associate** — nivel entrada\n- **Meta Certified Media Planning Professional** — nivel intermedio\n\nNo son necesarias para operar tus propias campañas, pero sí generan credibilidad con clientes.',
        tasks: [
          'Creá una cuenta en meta.com/business/learn si no tenés una',
          'Completá el curso "Introducción a la publicidad en Facebook" antes de continuar',
          'Completá el curso "Cómo llegar a las personas adecuadas" para entender el targeting',
          'Anotá 5 conceptos nuevos que aprendiste y cómo los aplicarías a AlphaDev Studios',
        ],
        tip: 'Meta Blueprint actualiza sus cursos cuando cambia el algoritmo o la plataforma. Si ves una fecha de actualización anterior a 2024 en algún curso, verificá la información con la documentación oficial de Meta for Business — el mundo de Meta Ads cambia rápido.',
        completed: false,
      },
      {
        id: 'm2-l5',
        title: 'Práctica: primera campaña con $5 USD',
        type: 'practice',
        content:
          '## El objetivo: aprender la interfaz con dinero real\n\n$5 USD en Meta Ads no van a generar leads ni ventas — eso no es el objetivo. El objetivo es completar todo el flujo una vez: crear una campaña, configurar audiencia, subir el creativo, publicarla, y ver los primeros datos reales en el panel de anuncios.\n\n## El setup recomendado para esta práctica\n\n**Objetivo**: Tráfico (el más simple para empezar)\n\n**Presupuesto**: $5 USD por día, mínimo 3 días\n\n**Audiencia**: Intereses relacionados con el perfil Founder tech-savvy que definiste en el módulo anterior. Tamaño de audiencia estimado recomendado: 500K–2M personas.\n\n**Creativo**: usá el Post 1 de LinkedIn que publicaste adaptado a formato 1080×1080 o 1080×1350. Copy corto: hook en la primera línea, 2–3 líneas de desarrollo, CTA claro.\n\n**URL de destino**: alphadev.studio (con UTM params: utm_source=meta, utm_medium=paid, utm_campaign=test-m2)\n\n## Qué mirar en los primeros datos\n\nDespués de 24–48 horas: **CPM** (costo por mil impresiones — indica qué tan competitiva es tu audiencia), **CTR** (click-through rate — indica qué tan relevante es tu creativo), **CPC** (costo por clic). Un CTR > 1% en frío es buena señal.',
        tasks: [
          'Configurá la campaña en modo borrador siguiendo el setup recomendado arriba',
          'Revisá todo antes de publicar: píxel activo, UTMs en la URL, presupuesto correcto',
          'Publicá la campaña y anotá la hora y fecha de inicio',
          'A las 48 horas, registrá CPM, CTR y CPC en una tabla',
          'Escribí en 3 líneas qué aprendiste sobre la interfaz y qué harías diferente en la próxima campaña',
        ],
        tip: 'No optimices la campaña en las primeras 24 horas. El algoritmo de Meta necesita tiempo para aprender. Si ves números "malos" el primer día y la parás, nunca sabrás si habría mejorado. Dejala correr al menos 48 horas antes de hacer cualquier cambio.',
        completed: false,
      },
      {
        id: 'mp-l3',
        title: 'Proyecto 3 — Intermedio: Campaña de Meta Ads documentada',
        type: 'practice',
        content:
          '## El brief\n\nLanzá una campaña de Meta Ads real de principio a fin: brief → estrategia → creativos → setup → publicación → optimización → reporte final. El resultado es un caso documentado que muestra que sabés gestionar presupuesto publicitario real.\n\n## El entregable\n\nDocumentación completa: brief del cliente (o tuyo), creativos en imagen, capturas del panel de Meta Ads, reporte final con métricas y aprendizajes. Mínimo 7–10 días de campaña activa.\n\n## El proceso paso a paso\n\n**Fase 1 — Brief y estrategia**\n- Definí el objetivo de negocio: ¿tráfico, leads, ventas?\n- Definí el objetivo de Meta: Tráfico, Interacción o Leads\n- Definí la audiencia: demografía, intereses, comportamientos — tamaño objetivo 500K–2M\n- Definí el presupuesto: mínimo $15–25 USD totales para tener datos significativos\n\n**Fase 2 — Creación de creativos**\n- Creativo 1 (imagen estática 1080×1080): Hook visual fuerte + texto corto + CTA\n- Creativo 2 (variante): Mismo mensaje, diferente formato o composición\n- Herramientas: Canva, Figma o Adobe Express\n- El texto del anuncio: Hook (primera línea que detiene el scroll) + 2-3 líneas de desarrollo + CTA claro\n\n**Fase 3 — Setup de campaña**\n- Campaña > Conjunto de anuncios > Anuncio\n- Verificá que el píxel está activo antes de publicar\n- Configurá UTMs: utm_source=facebook, utm_medium=cpc, utm_campaign=nombre-campaña\n- Revisá todo en modo borrador antes de publicar\n\n**Fase 4 — Optimización durante la campaña**\n- Revisá los datos después de 48 horas: CTR > 1% es señal positiva\n- Si el CTR es < 0.5%, pausá el creativo con menor rendimiento y probá una variante\n- Revisá la frecuencia: si > 3, la audiencia está saturada — expandí o pausá\n\n**Fase 5 — Reporte final**\n- Inversión total, impresiones, alcance, clics, CTR, CPC, CPM\n- ¿Se logró el objetivo? ¿Por qué sí o por qué no?\n- 3 aprendizajes concretos para la próxima campaña',
        tasks: [
          'Definí el brief completo: objetivo, audiencia, presupuesto y duración antes de tocar Meta',
          'Creá al menos 2 variantes del creativo para poder hacer A/B testing',
          'Configurá el píxel y los UTMs antes de publicar — verificá con Meta Pixel Helper',
          'Dejá la campaña correr mínimo 7 días sin cambiar nada en los primeros 3 (el algoritmo necesita aprendizaje)',
          'Armá el reporte final con capturas del panel y análisis de qué funcionó y qué no',
          'Publicá el caso documentado en LinkedIn como post de portafolio',
        ],
        tip: 'El error más caro en Meta Ads es optimizar demasiado rápido. Los primeros 2–3 días son la fase de aprendizaje del algoritmo — si cambiás el presupuesto, la audiencia o los creativos en ese período, reiniciás el aprendizaje y perdés datos. Dejá correr, mirá, anotá, y actuá recién en el día 4.',
        completed: false,
      },
      {
        id: 'mp-l6',
        title: 'Proyecto 6 — Básico: Secuencia de email de bienvenida (5 emails)',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá y escribí una secuencia de 5 emails de bienvenida para un producto o servicio real o ficticio. La secuencia arranca cuando alguien se suscribe o se registra y tiene como objetivo convertir al suscriptor en cliente activo durante los primeros 7 días.\n\n## Por qué el email marketing importa\n\nEl email tiene un ROI promedio de $36 por cada $1 invertido — el canal de mayor retorno del marketing digital. Una secuencia de bienvenida bien escrita convierte entre 3x y 5x más que un email único de confirmación.\n\n## La estructura de los 5 emails\n\n**Email 1 — Bienvenida (día 0, inmediato)**: Agradecimiento por registrarse + lo que van a recibir + una acción simple para completar ahora. Asunto: específico y cálido, no genérico.\n\n**Email 2 — El valor (día 1)**: Entregá el primer valor sin pedir nada. Un tip accionable, un recurso útil, o un aprendizaje concreto relacionado con el problema que tu producto resuelve.\n\n**Email 3 — La historia (día 3)**: Contá por qué existe el producto. El origen, el problema que viste, por qué lo resolviste de esta manera. La historia genera conexión emocional.\n\n**Email 4 — La prueba social (día 5)**: Testimonio real o caso de uso concreto. Un número concreto vale más que un adjetivo.\n\n**Email 5 — La oferta (día 7)**: El CTA principal. Puede ser una prueba gratuita, un descuento de bienvenida, una llamada o una compra directa.\n\n## Las reglas del copy de email\n\n- Asunto: máximo 50 caracteres, sin signos de exclamación, específico y curioso\n- Preview text: los 80 caracteres que aparecen en el inbox antes de abrir — completalos siempre\n- Primer línea: debe hacer que el lector quiera leer la segunda\n- Longitud: 150–300 palabras por email\n- Un solo CTA por email — nunca dos opciones\n\n## El entregable\n\n5 emails escritos en Notion + secuencia automática configurada en Mailchimp, MailerLite o Beehiiv + métricas de apertura y clics después de 14 días.',
        tasks: [
          'Escribí los 5 asuntos de email antes de escribir el cuerpo — si el asunto no engancha, el email no se lee',
          'Redactá los 5 emails completos con preview text, cuerpo y CTA en cada uno',
          'Configurá la secuencia automática en Mailchimp, MailerLite o Beehiiv',
          'Suscribite vos mismo con un email de prueba y verificá que todo se ve bien en mobile',
          'Después de 14 días, documentá las tasas de apertura y clics de cada email en el portafolio',
        ],
        tip: 'El asunto del email es el 50% del resultado. Un email perfecto con asunto aburrido tiene 15% de apertura. El mismo email con asunto curioso y específico puede llegar al 45%. Antes de escribir el cuerpo, escribí 5 variantes del asunto y elegí la más específica — no la más creativa.',
        completed: false,
      },
          {
        id: 'modulo-2-proj-basico',
        title: 'Proyecto Básico: 5 piezas de contenido para Instagram',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Produce 5 piezas de contenido listas para publicar en Instagram para un negocio real o ficticio. Mezcla al menos 2 formatos.',
        deliverables: [
          '2 posts de feed: imagen + caption completo con hashtags y CTA',
          '2 Stories: con al menos 1 elemento interactivo (encuesta, pregunta o quiz)',
          '1 Reel: hook escrito + guión de 60 segundos dividido por escenas',
          'Calendar: qué día y a qué hora publicar cada pieza y por qué ese horario',
        ],
        tip: 'Escribe el copy antes de diseñar la imagen. El copy manda la imagen, no al revés.',
        completed: false,
      },
      {
        id: 'modulo-2-proj-pro',
        title: 'Proyecto Profesional: Estrategia de contenidos de 90 días',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: 'Diseña la estrategia de contenidos de 90 días para un cliente. Debe ser ejecutable por otra persona sin explicaciones adicionales.',
        deliverables: [
          'Análisis de punto de partida: métricas actuales + benchmark vs. 3 competidores',
          'Arquitectura de contenidos: 4-5 pilares temáticos con descripción y ejemplos',
          'Regla de mezcla: distribución entre educacional, entretenimiento, inspiracional y promocional',
          'Calendar de 90 días: mínimo 3 publicaciones por semana con tema, formato, plataforma y hook',
          'Plan de producción: tiempo estimado por pieza y flujo de aprobación',
          'Dashboard de KPIs: qué mides semanalmente, qué mensualmente y cómo ajustas',
        ],
        rubrica: [
          'La estrategia se conecta con el objetivo de negocio declarado, no solo con métricas de vanidad',
          'Los pilares tienen diversidad real — no son variaciones del mismo tema',
          'Los tiempos de producción son realistas para 1-2 personas',
          'El dashboard conecta métricas de contenido con resultados de negocio',
        ],
        tip: 'Una estrategia al 70% ejecutada supera a una estrategia perfecta abandonada. Diseña para la capacidad real del equipo.',
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
          '## Por qué Google Business Profile es prioridad\n\nGoogle Business Profile (GBP) es gratis y aparece cuando alguien busca tu marca o categoría en Google Maps o en la búsqueda orgánica. Para AlphaDev Studios — que opera remote y puede tener clientes en cualquier ciudad — es la tarjeta de presentación digital más visible que existe sin pagar publicidad.\n\n## El checklist de setup completo\n\n- **Reclamar el perfil** en business.google.com — buscá si AlphaDev Studios ya tiene un perfil automático creado por Google. Si existe, reclamalo. Si no, crealo desde cero.\n- **Categoría principal**: "Empresa de desarrollo de software" o "Agencia de marketing digital" según el foco que querás proyectar\n- **Descripción**: 750 caracteres. Incluí las keywords más relevantes de forma natural (ej: "desarrollo web con Next.js", "apps con inteligencia artificial")\n- **Fotos**: mínimo 5 fotos profesionales — logo, captura del sitio, capturas de proyectos. Los perfiles con fotos generan 35% más clics.\n- **Horario y datos de contacto**: completalos aunque sea remote. La consistencia entre GBP y el sitio web es factor de SEO local.\n- **Posts de GBP**: podés publicar actualizaciones, novedades o casos de estudio. Actualizarlo cada 2 semanas mejora el posicionamiento.\n\n## Verificación del perfil\n\nGoogle pide verificar el perfil antes de que sea completamente público. Las opciones son por correo postal, teléfono o video. El proceso tarda entre 1 día y 2 semanas según el método.',
        tasks: [
          'Buscá en Google si ya existe un perfil de AlphaDev Studios y reclamalo o creá uno nuevo',
          'Completá el 100% de los campos: descripción, categoría, horario, URL del sitio, teléfono',
          'Subí al menos 5 fotos: logo, captura del sitio, capturas de proyectos o trabajo',
          'Publicá el primer post de GBP con una novedad o caso de estudio de AlphaDev',
          'Iniciá el proceso de verificación del perfil',
        ],
        tip: 'La descripción del GBP es indexada por Google. Escribila como si fuera el meta description de una página: clara, orientada al cliente, con las keywords por las que querés que te encuentren — pero escrita para humanos, no para robots.',
        completed: false,
      },
      {
        id: 'm3-l1b',
        title: 'Mini-práctica: auditá y optimizá tu GBP en 30 minutos',
        type: 'practice',
        content:
          '## El score de completitud de GBP\n\nLos perfiles de Google Business Profile al 100% reciben hasta 7x más clics que los incompletos, según datos de Google. Esta práctica asegura que AlphaDev está al máximo antes de cualquier campaña.\n\n## La auditoría de 10 puntos\n\n1. **Nombre del negocio**: exactamente igual al nombre real — sin keyword stuffing\n2. **Categoría principal**: "Empresa de desarrollo de software"\n3. **Descripción**: 750 caracteres usados con keywords naturales del servicio\n4. **URL del sitio**: apunta a alphadev.studio\n5. **Teléfono**: número activo\n6. **Horario**: completado aunque sea "Bajo cita previa"\n7. **Fotos**: mínimo 5 (logo + captura del sitio + capturas de proyectos)\n8. **Posts**: al menos 1 publicación activa de los últimos 7 días\n9. **Preguntas y respuestas**: respondé las existentes o creá las FAQs vos mismo\n10. **Verificación**: ¿el perfil tiene la tilde verde?\n\nCompletá los que falten y publicá un post nuevo si no hay uno reciente.',
        tasks: [
          'Completá la auditoría de 10 puntos y anotá cuáles están al 100% y cuáles faltan',
          'Reescribí o mejorá la descripción usando los 750 caracteres disponibles con keywords naturales',
          'Subí al menos 3 fotos nuevas si no tenés las 5 mínimas requeridas',
          'Publicá un post en GBP con una novedad, caso de uso o tip relacionado con tu servicio',
        ],
        tip: 'La descripción del GBP es el único texto que escribís directamente para Google. Escribila como una mini landing page: el problema que resolvés, para quién, y por qué AlphaDev. Incluí términos como "Next.js", "IA integrada", "aplicaciones web" de forma natural.',
        completed: false,
      },
      {
        id: 'm3-l2',
        title: 'Keyword research básico para Google Ads',
        type: 'reading',
        content:
          '## Por qué el keyword research define todo lo demás\n\nEn Google Ads pagás por aparecer cuando alguien busca algo específico. Si elegís las keywords equivocadas, pagás por clics de personas que nunca iban a contratar. Si elegís las correctas, cada clic es un potencial cliente calificado.\n\n## Tipos de intent de búsqueda\n\n- **Informacional** ("qué es next.js", "cómo funciona un MVP") → bajo valor comercial, no invertir aquí\n- **Navegacional** ("alphadev studios" o nombre de competidor) → útil para branding o conquista de marca\n- **Transaccional** ("contratar agencia desarrollo web", "precio app móvil con IA") → máximo valor, acá va el presupuesto\n\n## Herramientas y proceso\n\n**Google Keyword Planner**: accedés desde Google Ads aunque no tengas campañas activas. Ingresás términos semilla ("desarrollo web", "agencia nextjs", "app con inteligencia artificial") y te muestra volumen de búsquedas, competencia y costo por clic estimado.\n\n**Google Search Console**: si el sitio ya tiene tráfico orgánico, mostrá por qué keywords ya apareció en resultados — esas son candidatas naturales para anuncios.\n\n## El criterio para elegir keywords\n\nPara AlphaDev Studios buscá combinaciones de: servicio ("desarrollo", "diseño", "app") + tecnología ("nextjs", "react", "IA") + geografía si aplica + intent ("contratar", "precio", "agencia"). Empezá con 10–15 keywords de cola larga y expansión gradual.',
        tasks: [
          'Ingresá al Keyword Planner en Google Ads y buscá con 5 términos semilla relacionados a AlphaDev',
          'Armá una lista de 15 keywords transaccionales con su volumen de búsqueda mensual y CPC estimado',
          'Clasificalas en 3 grupos temáticos (ej: "desarrollo web", "apps con IA", "agencia LATAM")',
          'Descartá las keywords con intent informacional o con CPC demasiado alto para tu presupuesto inicial',
        ],
        tip: 'El match type importa tanto como la keyword en sí. Empezá siempre con Phrase Match (entre comillas) o Exact Match (entre corchetes) — nunca Broad Match al principio. Broad Match gasta el presupuesto en búsquedas irrelevantes hasta que el algoritmo aprende, y ese aprendizaje cuesta dinero real.',
        completed: false,
      },
      {
        id: 'm3-l2b',
        title: 'Mini-práctica: tu lista definitiva de 30 keywords',
        type: 'practice',
        content:
          '## El entregable\n\nUna hoja de cálculo con 30 keywords clasificadas y priorizadas para usar en campañas de Google Ads y como guía para contenido orgánico.\n\n## La estructura de la hoja\n\nColumnas: Keyword | Volumen mensual | CPC estimado | Competencia | Intención | Grupo | Prioridad\n\n## Los 3 grupos para AlphaDev Studios\n\n**Grupo 1 — Desarrollo web** (10 keywords):\nCombinaciones de "agencia desarrollo web", "contratar desarrollador nextjs", "empresa software LATAM"...\n\n**Grupo 2 — Apps con IA** (10 keywords):\n"aplicación con inteligencia artificial", "desarrollo app con IA", "agencia software IA LATAM"...\n\n**Grupo 3 — Diseño UI/UX** (10 keywords):\n"diseñador UX LATAM", "agencia diseño web", "diseño de producto digital"...\n\n## El criterio de prioridad\n\n- **ALTA**: intención transaccional + CPC razonable + competencia media\n- **MEDIA**: transaccional + CPC alto o competencia alta\n- **BAJA**: informacional — para contenido orgánico, no para ads',
        tasks: [
          'Creá la hoja en Google Sheets con las 7 columnas definidas',
          'Buscá en Google Keyword Planner con los 3 grupos temáticos y completá las 30 keywords',
          'Clasificá cada keyword por intención: transaccional / informacional / navegacional',
          'Marcá las 10 de mayor prioridad para usar primero en campañas de Google Ads',
        ],
        tip: 'Las keywords de cola larga ("contratar agencia desarrollo web nextjs México") tienen menos volumen que las genéricas ("agencia web") pero convierten 3–5x mejor. Al principio, preferí cola larga con presupuesto bajo sobre keywords genéricas con presupuesto alto.',
        completed: false,
      },
      {
        id: 'm3-l3',
        title: 'Estructura de campañas Search',
        type: 'reading',
        content:
          '## La jerarquía de Google Ads\n\nAl igual que Meta, Google Ads tiene tres niveles — pero con lógica distinta:\n\n**Campaña**: define el **objetivo** (tráfico, leads, ventas), el **presupuesto diario** y la **estrategia de puja** (CPC manual, CPA objetivo, Maximizar conversiones).\n\n**Grupo de anuncios**: agrupa keywords relacionadas semánticamente. Cada grupo debe tener un tema claro — por ejemplo, un grupo para "desarrollo web con Next.js" y otro para "apps con IA". Mezclar temas distintos en un grupo reduce el Quality Score.\n\n**Anuncio**: el **Responsive Search Ad (RSA)** es el formato estándar. Cargás hasta 15 titulares y 4 descripciones — Google los combina automáticamente y aprende qué combinaciones funcionan mejor.\n\n## Quality Score: la métrica que define el costo real\n\nEl Quality Score (1–10) es la evaluación de Google de qué tan relevante es tu anuncio. Afecta directamente cuánto pagás por clic: un QS de 8/10 puede costar la mitad que uno de 4/10 por la misma posición.\n\nLos tres factores del QS:\n- **CTR esperado**: basado en el historial de clicks de tu anuncio\n- **Relevancia del anuncio**: qué tan bien tu titular y descripción coinciden con la keyword\n- **Experiencia en la landing page**: velocidad, relevancia y UX de la página de destino\n\n## Regla de oro\n\n1 grupo de anuncios = 1 tema de keywords = 1 mensaje de anuncio = 1 landing page específica. La consistencia entre los cuatro niveles maximiza el Quality Score.',
        tasks: [
          'Diseñá en papel la estructura de tu primera campaña: 1 campaña, 2–3 grupos, 10 keywords por grupo',
          'Creá el primer RSA con al menos 10 titulares y 4 descripciones — asegurate de incluir la keyword principal en al menos 3 titulares',
          'Identificá cuál será la landing page de destino y verificá que el mensaje sea consistente con el anuncio',
          'Revisá los tips de Google para mejorar el Quality Score antes de publicar',
        ],
        tip: 'Nunca dirijas tráfico de Google Ads a la home page. Cada grupo de anuncios debe tener una landing page específica que repita exactamente las mismas palabras del anuncio. La consistencia entre keyword → anuncio → landing es lo que convierte clics en leads.',
        completed: false,
      },
      {
        id: 'm3-l5',
        title: 'Práctica: campaña Search activa',
        type: 'practice',
        content:
          '## El objetivo: tráfico real con intención de compra\n\nEsta práctica cierra el módulo con una campaña de búsqueda real. El objetivo no es gastar mucho — es ejecutar correctamente el proceso completo y obtener datos de búsquedas reales para aprender.\n\n## Setup recomendado\n\n**Presupuesto**: $5–10 USD por día por 7 días\n\n**Estrategia de puja**: CPC Manual para tener control total (no dejes que Google decida el bid en tu primera campaña)\n\n**Estructura**: 1 campaña > 2 grupos de anuncios > 5–7 keywords por grupo (Phrase Match o Exact Match) > 1 RSA por grupo con al menos 8 titulares\n\n**Keywords sugeridas para el grupo 1 (desarrollo web)**:\n- "contratar agencia de desarrollo web"\n- "desarrollo web con next.js"\n- "agencia desarrollo web LATAM"\n\n**Landing page**: la home de alphadev.studio con UTMs: `utm_source=google&utm_medium=cpc&utm_campaign=search-m3`\n\n## Métricas a monitorear durante 7 días\n\nDiariamente: clics, impresiones, CTR, CPC promedio. Al finalizar: Quality Score por keyword, términos de búsqueda reales que activaron los anuncios (en el reporte de "Términos de búsqueda"), costo total y leads generados si aplica.',
        tasks: [
          'Creá la campaña con el setup recomendado y configurá el conversion tracking antes de publicar',
          'Publicá la campaña y verificá que el píxel de Google dispara correctamente en la landing page',
          'Revisá el reporte de Términos de Búsqueda al día 3 y agregá negativos para búsquedas irrelevantes',
          'Al día 7, descargá el reporte completo y anotá las 3 keywords con mejor CTR y las 3 con peor rendimiento',
          'Redactá un párrafo sobre qué aprendiste y qué cambiarías en la próxima campaña',
        ],
        tip: 'El reporte de Términos de Búsqueda es el más valioso de Google Ads. Mostrá exactamente qué escribió la gente antes de hacer clic en tu anuncio. Las búsquedas irrelevantes que encontrés ahí se agregan como **negative keywords** — esto reduce el desperdicio de presupuesto y mejora el CTR, que a su vez mejora el Quality Score.',
        completed: false,
      },
      {
        id: 'mp-l7',
        title: 'Proyecto 7 — Intermedio: Campaña de Google Ads documentada',
        type: 'practice',
        content:
          '## El brief\n\nLanzá y documentá una campaña de Google Search Ads completa: desde el keyword research hasta el reporte final con optimizaciones. El entregable es un caso que demuestra que sabés operar Google Ads con metodología — lo que piden las agencias y clientes B2B.\n\n## El proceso paso a paso\n\n**Fase 1 — Keyword research (1–2 días)**\nAbrí el Keyword Planner de Google Ads y buscá keywords del negocio. Clasificalas por intención: informacional, navegacional o transaccional. Priorizá las transaccionales ("contratar", "precio", "comprar") — menos volumen, mayor conversión. Documentá en una hoja: keyword / volumen / competencia / CPC estimado.\n\n**Fase 2 — Estructura de la campaña**\n1 campaña > 2–3 grupos por tema semántico > 5–7 keywords por grupo (Phrase o Exact Match). Cada grupo = un mensaje = una landing page específica. Configurá keywords negativas desde el inicio.\n\n**Fase 3 — Creación de anuncios RSA**\nCargá al menos 10 titulares y 4 descripciones por grupo. Incluí la keyword principal en al menos 3 titulares. Titulares benefit-focused: "Más clientes en 30 días", no "Agencia de marketing digital".\n\n**Fase 4 — Setup técnico**\nConversion tracking configurado y verificado antes de activar. UTMs en la URL final. Presupuesto: $15–30 USD totales, 7–10 días.\n\n**Fase 5 — Optimización y reporte**\nDía 3: revisá términos de búsqueda reales y agregá negativos. Día 7: revisá Quality Score — si < 5/10, reescribí el anuncio o mejorá la landing. Reporte final: inversión, clics, CTR, CPC, conversiones, costo por conversión.',
        tasks: [
          'Completá el keyword research con al menos 30 keywords clasificadas por intención en una hoja',
          'Diseñá la estructura completa (campaña, grupos, keywords, negativos) antes de tocar la plataforma',
          'Configurá el conversion tracking y verificá que dispara correctamente antes de publicar',
          'Lanzá la campaña y revisá el informe de términos de búsqueda al día 3',
          'Armá el reporte final con métricas reales + análisis del Quality Score por keyword',
          'Publicá el caso documentado en LinkedIn con el keyword research y los resultados',
        ],
        tip: 'Un Quality Score bajo es el problema más común e ignorado en Google Ads. Un QS de 4/10 puede costarte el doble por clic que uno de 8/10 en la misma posición. La solución casi siempre es la misma: el titular no contiene la keyword exacta o la landing no repite las palabras del anuncio. Consistencia entre keyword → titular → landing = QS alto.',
        completed: false,
      },
      {
        id: 'mp-l4',
        title: 'Proyecto 4 — Intermedio: Funnel de conversión completo',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá y ejecutá un funnel de conversión completo de 3 etapas para AlphaDev Studios (o un cliente real): conciencia orgánica → consideración con retargeting → conversión con landing dedicada. Al terminar tendrás documentado el sistema de marketing más completo de tu portafolio.\n\n## Las 3 etapas del funnel\n\n**Etapa 1 — Conciencia (TOFU)**\nContenido orgánico que llega a personas que no te conocen todavía:\n- 2 posts de LinkedIn educativos que se puedan compartir\n- 1 Reel de Instagram que explique un problema que tu audiencia tiene\n- Objetivo: generar impresiones y visitas al perfil, no ventas\n\n**Etapa 2 — Consideración (MOFU)**\nAnuncio de retargeting dirigido a quienes interactuaron con el contenido orgánico:\n- Audiencia: personas que visitaron tu perfil de Instagram o interactuaron con tus posts en los últimos 30 días\n- Formato: carrusel o video que muestre un resultado concreto (caso, testimonio, proceso)\n- CTA: "Agendá una llamada gratis de 15 minutos"\n- Presupuesto: $5–10 USD, 5–7 días\n\n**Etapa 3 — Conversión (BOFU)**\nLanding page específica para la campaña de retargeting:\n- Una sola página, sin navbar ni links externos que distraigan\n- Headline: el resultado que prometés (no tu nombre de empresa)\n- Propuesta de valor en 3 bullets\n- Formulario de contacto o link de Calendly\n- UTMs configurados para rastrear qué parte del funnel convirtió\n\n## La medición del funnel\n\nConfiguración de GA4:\n- Evento: visita a la landing page\n- Evento de conversión: envío del formulario o clic en Calendly\n- Reporte: Embudo de conversión en GA4 mostrando tasa de cada etapa\n\n## El entregable\n\nDocumento (Notion o PDF) con: diseño del funnel en diagrama, capturas de cada etapa en vivo, métricas de cada etapa y análisis del costo de adquisición total.',
        tasks: [
          'Diseñá el funnel en diagrama antes de ejecutar — visualizá los 3 niveles con las métricas objetivo',
          'Publicá los 3 contenidos orgánicos de la etapa 1 y esperá al menos 7 días antes de activar el retargeting',
          'Construí la landing page de conversión con un solo CTA y sin distracciones',
          'Configurá los eventos de conversión en GA4 antes de lanzar la campaña de retargeting',
          'Documentá las tasas de conversión de cada etapa del funnel al finalizar',
          'Armá el caso de estudio completo con el diagrama del funnel y los resultados reales',
        ],
        tip: 'El funnel más efectivo no es el más complejo — es el más medido. Un funnel de 3 pasos con tracking perfecto en cada etapa es infinitamente más valioso que uno de 7 pasos sin datos. Si no podés medir una etapa, eliminala del funnel hasta que puedas.',
        completed: false,
      },
          {
        id: 'modulo-3-proj-inter',
        title: 'Proyecto Intermedio: Auditoría de redes sociales',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Audita las redes sociales de una marca (la tuya, un cliente, o pública) y entrega el reporte con recomendaciones priorizadas.',
        deliverables: [
          'Inventario de cuentas: todas las plataformas con métricas actuales de cada una',
          'Análisis de contenido: tipo, frecuencia, engagement rate promedio, top 3 posts con explicación de por qué funcionaron',
          'Benchmark vs. 2 competidores en las mismas métricas',
          'Diagnóstico: 3 fortalezas y 3 áreas de mejora con evidencia específica',
          '5 recomendaciones priorizadas por impacto con tiempo estimado de implementación',
        ],
        tip: 'Una auditoría buena no son números, son insights accionables. Cada dato debe llevar a una recomendación específica.',
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
          '## Por qué TikTok para AlphaDev Studios\n\nTikTok tiene la mayor tasa de alcance orgánico de todas las plataformas en 2025–2026. A diferencia de Instagram o LinkedIn, una cuenta nueva puede alcanzar miles de personas sin seguidores previos si el contenido conecta. Para AlphaDev, es el canal de awareness más eficiente en términos de costo.\n\n## Setup de cuenta Business\n\nCreá una cuenta TikTok for Business en business.tiktok.com. Esto te da acceso a analytics, TikTok Ads Manager y el Creative Center. Completá el perfil con bio clara, link al sitio y foto de perfil consistente con la identidad de AlphaDev.\n\n## La fórmula del hook en los primeros 3 segundos\n\nEn TikTok, si los primeros 3 segundos no enganchan, el usuario pasa al siguiente video y el algoritmo reduce tu alcance. Las fórmulas de hook que mejor funcionan para contenido técnico:\n\n- **Pregunta provocadora**: "¿Por qué tu agencia tarde 6 meses en lo que nosotros hacemos en 3 semanas?"\n- **Afirmación contracultural**: "El stack más caro NO es el que necesitás para tu MVP"\n- **Visual impactante**: pantalla de código o diseño que se completa en tiempo real\n\n## Tipos de contenido que funcionan para una tech agency\n\n- **"Day in the life"** de founder técnico\n- **Proceso de trabajo** (de wireframe a deploy en 60 segundos)\n- **Mitos y errores comunes** sobre desarrollo de software\n- **Resultados reales** (métricas de un proyecto antes/después)',
        tasks: [
          'Creá o convertí tu cuenta TikTok a Business en business.tiktok.com',
          'Completá el perfil: bio con propuesta de valor, link a alphadev.studio, foto profesional',
          'Escribí los scripts de 3 videos — 60 segundos máximo cada uno — con un hook diferente en cada uno',
          'Grabá y publicá el primer video. No esperes que sea perfecto — el primer video siempre es malo y está bien así',
          'Revisá las métricas del primer video a las 48hs: views, completion rate, follows generados',
        ],
        tip: 'En TikTok, la completion rate (porcentaje de personas que ven el video completo) es más importante que los likes. Un video con 500 views y 70% de completion rate le muestra al algoritmo que el contenido es valioso. Uno con 5.000 views y 10% de completion rate lo penaliza.',
        completed: false,
      },
      {
        id: 'm4-l1b',
        title: 'Mini-práctica: publicá tu primer video de TikTok',
        type: 'practice',
        content:
          '## La única forma de aprender TikTok es publicar\n\nLeer sobre TikTok no enseña TikTok. El algoritmo, el timing del hook, el ritmo de edición — todo eso se aprende grabando y publicando. Este primer video no tiene que ser perfecto. Tiene que existir.\n\n## El brief del primer video\n\n**Duración**: 30–45 segundos\n\n**Hook (primeros 3 segundos)**: una afirmación contraintuitiva. Ej: "El mayor error que cometen los founders al contratar un desarrollador no es el precio" → pausa → el video explica cuál es.\n\n**Cuerpo**: 3 puntos cortos, uno por cada 10 segundos.\n\n**Cierre**: una pregunta o CTA simple ("¿Te pasó esto? Comentalo abajo").\n\n## La producción mínima viable\n\n- Grabá en vertical (1080×1920px)\n- Buena luz natural de frente\n- Audio claro: cuarto sin eco o auriculares con micrófono\n- Subtítulos: TikTok los genera automáticamente, verificá que sean correctos\n- Sin logo de watermark de otra red (TikTok penaliza el reposteo directo de Reels)',
        tasks: [
          'Escribí el script completo (hook + 3 puntos + cierre) antes de grabar — no improvises',
          'Grabá en vertical, con buena luz y audio claro',
          'Editá con TikTok o CapCut — verificá que los subtítulos automáticos sean correctos',
          'Publicá a las 6–9pm hora local y anotá la hora exacta de publicación',
          'A las 48hs registrá: views, completion rate, followers ganados, comentarios',
        ],
        tip: 'El primer video siempre es el peor. No lo borrés — dejalo publicado. Cada video que publicás enseña cosas que los tutoriales no pueden: cómo suena tu voz en cámara, cómo edita el Creator de TikTok, cuánto dura 30 segundos en realidad. El aprendizaje real empieza al publicar, no al practicar.',
        completed: false,
      },
      {
        id: 'm4-l2',
        title: 'UTMs: trackear todo el tráfico',
        type: 'reading',
        content:
          '## Por qué los UTMs son el paso más ignorado del marketing\n\nSin UTMs, cuando alguien llega a tu sitio desde un anuncio, GA4 lo registra como "Direct" o "Unknown". Eso hace imposible saber qué canal generó ese tráfico — y por lo tanto, qué merece más presupuesto.\n\n**UTMs** (Urchin Tracking Modules) son parámetros que agregás al final de tus URLs para que GA4 identifique exactamente de dónde vino cada visitante.\n\n## Los 5 parámetros\n\n- `utm_source`: el canal (google, meta, tiktok, instagram, linkedin, newsletter)\n- `utm_medium`: el tipo (cpc, organic, email, social, referral)\n- `utm_campaign`: el nombre de la campaña (ej: "lanzamiento-julio", "meta-ads-founders")\n- `utm_content`: la variante del creativo (ej: "video-hook-1", "imagen-azul")\n- `utm_term`: la keyword (solo para Google Ads)\n\n## Nomenclatura consistente: la clave\n\nEl error más común es no ser consistente: "Meta" un día, "meta" otro, "facebook" el tercero. GA4 lo trata como 3 fuentes distintas. Define una nomenclatura fija y documentala:\n\n- Fuentes en minúscula: `google`, `meta`, `tiktok`\n- Campaigns con guiones: `test-m2`, `founders-q3-2026`\n- Nunca espacios — usá guiones\n\n## Cómo generarlos\n\nUsá el **Campaign URL Builder** de Google (ga-dev-tools.google/campaign-url-builder/). Generá la URL, acortala con Bitly si es larga, y usala en tus anuncios y posts.',
        tasks: [
          'Creá una tabla de nomenclatura para todos tus canales (fuentes, medios, convención de nombres de campaña)',
          'Generá UTMs para los posts de Instagram y LinkedIn que publicaste en el Módulo 1 — aunque ya estén publicados, aprendé el proceso',
          'Generá UTMs para cada campaña activa de Meta Ads y Google Ads con el Campaign URL Builder',
          'Verificá en GA4 que los UTMs están llegando correctamente (Adquisición > Fuente/Medio)',
        ],
        tip: 'Guardá todos tus UTMs en una hoja de cálculo con la URL original, la URL con UTM, la fecha de creación y el canal. Cuando tengas 20 campañas activas, no vas a recordar cuál URL corresponde a qué anuncio. El UTM sheet es el registro histórico de todo tu marketing.',
        completed: false,
      },
      {
        id: 'm4-l2b',
        title: 'Mini-práctica: generá UTMs para todos tus canales activos',
        type: 'practice',
        content:
          '## El resultado esperado\n\nUna hoja con todos los UTMs de tus canales activos listos para usar. Nunca más publicarás un link sin UTM — y GA4 dejará de mostrarte tráfico como "Direct" o "Unknown".\n\n## El proceso (20 minutos)\n\n**Paso 1**: Creá una hoja en Google Sheets con 5 columnas: Canal | Campaña | URL original | URL con UTM | Link acortado.\n\n**Paso 2**: Para cada canal activo, generá la URL con el Campaign URL Builder de Google (ga-dev-tools.google/campaign-url-builder/).\n\nEjemplos para AlphaDev Studios:\n- Bio de Instagram: `utm_source=instagram&utm_medium=social&utm_campaign=organic-bio`\n- Posts de LinkedIn: `utm_source=linkedin&utm_medium=social&utm_campaign=organic-post`\n- Meta Ads: `utm_source=facebook&utm_medium=cpc&utm_campaign=test-m2`\n- Firma de email: `utm_source=email&utm_medium=signature&utm_campaign=email-sig`\n\n**Paso 3**: Acortá las URLs largas con Bitly. Guardá el link corto en la hoja.\n\n**Paso 4**: Actualizá todos los links activos. Empezá por la bio de Instagram y LinkedIn.',
        tasks: [
          'Creá la hoja de UTMs en Google Sheets con las 5 columnas',
          'Generá UTMs para al menos 4 canales: Instagram bio, LinkedIn bio, Meta Ads activas, firma de email',
          'Actualizá los links de la bio de Instagram y LinkedIn con los UTMs nuevos',
          'En 48hs verificá en GA4 (Adquisición > Fuente/Medio) que el tráfico llega con los parámetros correctos',
        ],
        tip: 'El UTM más valioso y más olvidado es el de la firma de email. Cada email que mandás es una oportunidad de trackear si ese contacto visitó el sitio después. Con UTM en la firma, sabés cuánto tráfico generan tus conversaciones directas — que suele ser más de lo que se cree.',
        completed: false,
      },
      {
        id: 'm4-l3',
        title: 'Google Analytics 4 — métricas esenciales',
        type: 'reading',
        content:
          '## Configurar GA4 en alphadev.studio\n\nSi GA4 no está instalado todavía: creá una propiedad en analytics.google.com, copiá el measurement ID (G-XXXXXXXXXX) y agregalo al código del sitio. En Next.js, la forma más limpia es agregarlo en el componente root layout con el script de gtag.js.\n\n## Las métricas que importan (y las que no)\n\n**Métricas de tráfico** (entendé el volumen):\n- **Usuarios**: personas únicas que visitaron el sitio\n- **Sesiones**: visitas totales (una persona puede generar varias sesiones)\n- **Fuente/Medio**: de dónde vienen (google/organic, meta/cpc, direct)\n\n**Métricas de engagement** (entendé la calidad):\n- **Engaged sessions**: sesiones de más de 10 segundos o con evento de conversión — la métrica que reemplazó al Bounce Rate\n- **Engagement rate**: % de sesiones que son engaged. > 60% es bueno para un sitio B2B\n- **Average engagement time**: tiempo promedio en el sitio\n\n**Métricas de conversión** (el objetivo final):\n- **Conversiones**: eventos que definís como valiosos (envío de formulario, clic en WhatsApp, descarga)\n- **Conversion rate**: % de sesiones que generaron una conversión\n\n## Los reportes que revisás semanalmente\n\n- **Adquisición > Fuente/Medio**: de dónde viene el tráfico\n- **Engagement > Páginas y pantallas**: qué páginas generan más engagement\n- **Conversiones**: cuántos leads generó cada canal',
        tasks: [
          'Verificá que GA4 está instalado correctamente en alphadev.studio (usá el debugger de Chrome o GA4 DebugView)',
          'Configurá al menos 1 evento de conversión: el envío del formulario de contacto',
          'Revisá el reporte de Fuente/Medio y anotá cuáles son los 3 canales con más tráfico',
          'Identificá cuál es la página con mayor engagement y cuál tiene más abandono — ¿qué te dice eso?',
        ],
        tip: 'No te obsesionés con los números en los primeros 30 días. Con poco tráfico, las métricas son estadísticamente irrelevantes. El objetivo de las primeras semanas es asegurarte de que el tracking está bien configurado — que todos los eventos disparan, que los UTMs llegan correctamente, que las conversiones se registran. Los datos correctos valen más que muchos datos incorrectos.',
        completed: false,
      },
      {
        id: 'm4-l5',
        title: 'Práctica: reporte semanal de marketing',
        type: 'practice',
        content:
          '## El objetivo: un sistema de reporting sostenible\n\nUn reporte semanal no es un informe burocrático — es la herramienta que te dice si el marketing está funcionando o no, y dónde enfocar la próxima semana. Si tardás más de 20 minutos en armarlo, es demasiado complejo. Si tardás menos de 5, probablemente no estás mirando lo suficiente.\n\n## La estructura del reporte semanal\n\n**Sección 1 — Tráfico**: sesiones totales vs. semana anterior, tráfico por canal (organic, paid, social, direct)\n\n**Sección 2 — Contenido orgánico**: posts publicados por canal, alcance total, engagement rate promedio, el post con mejor rendimiento\n\n**Sección 3 — Paid media** (si hay campañas activas): gasto total, impresiones, clics, CTR, CPC, leads generados, costo por lead\n\n**Sección 4 — Conversiones**: total de leads de la semana, fuente de cada lead\n\n**Sección 5 — Próxima semana**: 3 acciones concretas basadas en los datos del reporte\n\n## La herramienta: Google Sheets o Notion\n\nCreá una plantilla que puedas completar en 15 minutos cada lunes. La consistencia en el formato semana a semana te permite ver tendencias. Agrega una columna de "notas" para contexto cualitativo (publicamos algo viral, hubo un feriado, etc.).',
        tasks: [
          'Creá la plantilla del reporte semanal en Google Sheets o Notion con las 5 secciones del modelo',
          'Completá el primer reporte con los datos de la semana actual usando GA4, Meta Ads y Google Ads',
          'Identificá los 3 números que más te preocupan y los 3 que más te alegran — ¿qué acción genera cada uno?',
          'Programá un recordatorio recurrente cada lunes a las 9am para completar el reporte',
          'Compartí la plantilla con alguien de confianza para accountability — aunque sea un amigo que sepa de negocios',
        ],
        tip: 'El error más común del reporte semanal es mirar demasiadas métricas. Elegí 5–7 métricas que reflejen el estado real del negocio y seguí solo esas. Más métricas no significa más claridad — a veces significa exactamente lo contrario.',
        completed: false,
      },
      {
        id: 'mp-l8',
        title: 'Proyecto 8 — Intermedio: Estrategia de contenido en TikTok (8 videos)',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá y ejecutá una estrategia de contenido en TikTok: 8 videos publicados en 4 semanas, con investigación de tendencias, análisis de rendimiento y documentación del proceso. Tener datos reales de TikTok en el portafolio diferencia a un marketer porque pocos dominan el video corto con intención estratégica.\n\n## El proceso paso a paso\n\n**Fase 1 — Setup y research (semana 1)**\nCompletá el perfil: foto, bio de 80 caracteres, link. Investigá 10 cuentas del nicho que estén creciendo y anotá qué formatos usan. Identificá los 5 audios/trends más usados en tu categoría con la búsqueda de TikTok.\n\n**Fase 2 — Los formatos que funcionan en cuentas B2B**\n- "El error más común que cometen los founders en X" — educación + posicionamiento\n- "3 herramientas que uso todos los días para Y" — valor concreto\n- "Lo que nadie te dice sobre Z" — curiosidad + controversia suave\n- Behind the scenes del trabajo real — autenticidad\n- Respuesta a comentario (stitch) — comunidad\n\n**Fase 3 — El hook: los primeros 3 segundos**\nEs lo único que importa para que el algoritmo amplificque. Formatos probados: pregunta directa ("¿Sabías que el 80% de los founders hace esto mal?"), afirmación contraintuitiva ("Publicar todos los días es un error"), resultado visible antes de explicar el proceso.\n\n**Fase 4 — Producción y publicación**\nGrabá en vertical, buena luz, audio claro. Duración ideal: 30–45 segundos para cuentas nuevas. Subtítulos siempre — 80% de TikTok se ve sin sonido. Publicá a las 6–9pm hora local.\n\n**Fase 5 — Análisis de los 8 videos**\nDocumentá: vistas, tiempo promedio de visualización (el más importante), tasa de completado, comentarios. Identificá cuál funcionó mejor y por qué.',
        tasks: [
          'Completá el perfil de TikTok e investigá 10 cuentas del nicho antes de grabar',
          'Planificá los 8 videos en un calendario: semana, formato, hook, duración estimada',
          'Grabá y publicá los 8 videos en 4 semanas — mínimo 2 por semana',
          'Documentá las métricas de cada video desde TikTok Analytics, especialmente el tiempo de visualización promedio',
          'Identificá el video con mejor rendimiento y analizá el motivo — ¿el hook? ¿el formato? ¿la duración?',
          'Armá el reporte de los 8 videos como caso de estudio y publicalo en LinkedIn',
        ],
        tip: 'La métrica que más importa en TikTok no son los likes — es el "Average Watch Time". Si el 50% o más de quienes empezaron el video lo terminaron, el algoritmo lo amplifica. Si el watch time es bajo, el video es descartado. Optimizá para que las personas terminen el video, no para que den like.',
        completed: false,
      },
      {
        id: 'mp-l5',
        title: 'Proyecto 5 — Avanzado: Caso de estudio de marketing documentado',
        type: 'practice',
        content:
          '## El brief\n\nDocumentá un proyecto de marketing real — uno que ya ejecutaste en los proyectos anteriores o con un cliente — como un caso de estudio profesional publicable. Este es el entregable más poderoso del portafolio: demuestra pensamiento estratégico, ejecución y resultados reales en un solo documento.\n\n## Por qué el caso de estudio importa más que cualquier otra pieza de portafolio\n\nUn cliente no contrata a alguien que dice saber hacer marketing. Contrata a alguien que puede mostrar que ya lo hizo, qué pasó y qué aprendió. El caso de estudio es esa prueba.\n\n## La estructura del caso de estudio\n\n**1. El contexto (1 párrafo)**\n¿Quién es el negocio? ¿Qué ofrecía? ¿En qué momento llegaste vos? Sin revelar información confidencial si es un cliente real.\n\n**2. El desafío (1–2 párrafos)**\n¿Cuál era el problema concreto? ¿Qué no estaba funcionando? ¿Cuál era el objetivo medible a alcanzar?\n\n**3. La estrategia (el corazón del caso)**\n¿Qué decidiste hacer y por qué? Explicá el razonamiento detrás de las decisiones — por qué elegiste Meta Ads y no Google, por qué ese tipo de contenido y no otro, por qué ese presupuesto. El "por qué" es lo que distingue a un estratega de un ejecutor.\n\n**4. La ejecución (con evidencias)**\nMuestra capturas, creativos, copies, pantallas del panel de anuncios. No describas — mostrá.\n\n**5. Los resultados (con números reales)**\nMétricas concretas: alcance, clics, leads generados, costo por lead, ROI si podés calcularlo. Si los números no fueron espectaculares, igual incluilos — la honestidad genera más confianza que los resultados inflados.\n\n**6. Los aprendizajes (diferenciador profesional)**\nQué harías diferente. Qué funcionó mejor de lo esperado. Qué subestimaste. Esta sección separa a los profesionales reflexivos de los que solo ejecutan.\n\n## El formato de publicación\n\n- Notion público con URL compartible (para LinkedIn y propuestas)\n- PDF descargable de máximo 6 páginas (para enviar por email a prospectos)\n- Versión resumida para LinkedIn (5 imágenes tipo carrusel con los highlights)\n- Opcional: Behance para visibilidad en la comunidad creativa',
        tasks: [
          'Elegí el proyecto de los anteriores que tuvo mejores resultados medibles — ese es el que más impacta',
          'Redactá las 6 secciones del caso de estudio — primera versión sin editar, todo lo que recordás',
          'Conseguí todas las evidencias visuales: capturas, creativos, reportes, datos del panel',
          'Editá el texto para que un cliente sin conocimiento técnico pueda entenderlo completamente',
          'Publicalo en Notion con URL pública y generá el PDF de 6 páginas',
          'Publicá el carrusel de 5 imágenes en LinkedIn mencionando los resultados principales en el copy',
        ],
        tip: 'El error más común al escribir un caso de estudio es enfocarse en las actividades en lugar de en las decisiones. A los clientes no les importa que "hiciste 12 posts" — les importa por qué elegiste ese approach y qué resultado produjo. Cada sección del caso debe responder la pregunta "¿y qué?" después de describir lo que hiciste.',
        completed: false,
      },
      {
        id: 'mp-l9',
        title: 'Proyecto 9 — Avanzado: Plan de marketing 360° para cliente real',
        type: 'practice',
        content:
          '## El brief\n\nCreá un plan de marketing digital 360° completo para un negocio real. El plan cubre todos los canales, define objetivos medibles, propone una estrategia de 90 días y estima el presupuesto necesario. Este entregable es equivalente a lo que una agencia cobra $2,000–5,000 USD por producir.\n\n## Las 7 secciones del plan\n\n**1. Diagnóstico actual**\nResumen de la presencia digital actual: sitio web, redes, email, paid media. Métricas de tráfico, engagement y conversiones. Fortalezas y debilidades.\n\n**2. Objetivos SMART**\nMínimo 3 objetivos para los próximos 90 días: Específico, Medible, Alcanzable, Relevante, con Tiempo definido. Ej: "Generar 20 leads calificados por mes desde Meta Ads para el mes 3".\n\n**3. Audiencia objetivo**\n2 buyer personas detallados: demografía, psicografía, pain points, canales que usa. Segmento primario (70%) y secundario (30%).\n\n**4. Estrategia por canal**\nPara cada canal activo: objetivo dentro del funnel (awareness / consideración / conversión), tipo de contenido y frecuencia, KPIs específicos, presupuesto mensual si es paid. Canales: orgánico en redes, Google Ads, Meta Ads, email, SEO básico.\n\n**5. Calendario de ejecución de 90 días**\nTimeline visual: qué se lanza en el mes 1, qué en el 2, qué en el 3. Con dependencias explicitadas.\n\n**6. Presupuesto total estimado**\nDesglose mensual por canal. Separar presupuesto de medios (plataformas) vs costo de producción.\n\n**7. Sistema de medición**\nQué se reporta, con qué frecuencia y quién toma las decisiones. Plantilla del reporte semanal incluida en el documento.',
        tasks: [
          'Completá el diagnóstico del negocio elegido con todas las métricas actuales disponibles',
          'Definí 3 objetivos SMART para 90 días — ambiciosos pero alcanzables con los recursos disponibles',
          'Escribí los 2 buyer personas con nivel de detalle completo',
          'Desarrollá la estrategia por canal con presupuesto estimado para cada uno',
          'Creá el calendario de 90 días en Notion o Google Sheets con hitos semanales',
          'Presentá el plan al equipo o cliente y documentá el feedback como parte del caso de estudio',
        ],
        tip: 'El error más común en los planes de marketing es el exceso de canales. Un plan que cubre 6 canales con profundidad media no funciona — es demasiado para ejecutar bien con recursos limitados. 2–3 canales priorizados con estrategia detallada generan más resultados y son más creíbles ante un cliente que un plan exhaustivo que nadie ejecuta.',
        completed: false,
      },
      {
        id: 'mp-l10',
        title: 'Proyecto 10 — Avanzado: Sistema de reporting de marketing integrado',
        type: 'practice',
        content:
          '## El brief\n\nConstruit un sistema de reporting de marketing que consolide todos los canales en un único dashboard semanal — con datos reales de GA4, Meta Ads, Google Ads y redes sociales. El objetivo: cualquier founder o cliente entiende el estado de su marketing en menos de 5 minutos por semana.\n\n## Los 4 componentes del sistema\n\n**Componente 1 — Dashboard semanal (Notion o Google Sheets)**\n- Sección 1: KPIs de la semana (4–6 números con flechas de tendencia vs semana anterior)\n- Sección 2: Tráfico por canal (tabla: canal / sesiones / variación % / leads generados)\n- Sección 3: Performance de paid media (inversión / clics / CTR / costo por lead por plataforma)\n- Sección 4: Contenido orgánico (posts publicados / alcance / engagement rate / mejor post)\n- Sección 5: Próxima semana — 3 acciones prioritarias con responsable y fecha\n\n**Componente 2 — Conexión con fuentes de datos**\nGA4: exportá el reporte de Adquisición o conectá con Looker Studio (gratuito). Meta Ads: exportá el resumen de rendimiento por campaña. Google Ads: reporte de keywords. Redes orgánicas: exportar desde cada plataforma o scheduling tool con analytics.\n\n**Componente 3 — Looker Studio (opcional avanzado)**\nLooker Studio se conecta nativo con GA4 y Google Ads. Permite el dashboard actualizado automáticamente sin exportar manualmente. Si lo implementás, documentá los pasos de conexión en el portafolio.\n\n**Componente 4 — El ritual semanal**\nDía y hora fijo: lunes 9am, máximo 20 minutos para completarlo. Nunca borrar datos anteriores — el histórico es el valor del sistema. Si es para un cliente, definir qué parte completa cada uno.',
        tasks: [
          'Creá la plantilla del dashboard en Notion o Google Sheets con las 5 secciones definidas',
          'Conectá al menos 2 fuentes de datos reales (GA4 + Meta Ads o Google Ads)',
          'Completá 4 semanas consecutivas de reporte con datos reales — la consistencia es el entregable',
          'Implementá Looker Studio con conexión automática a GA4 como bonus del proyecto',
          'Grabá un Loom de 5 minutos explicando el sistema como si fuese para un cliente nuevo',
          'Publicá el case study del sistema en LinkedIn con el video Loom incluido',
        ],
        tip: 'El mejor dashboard de marketing es el que se completa todos los lunes sin excepción. Un dashboard perfecto que se abandona en la semana 3 vale cero. Al diseñar el sistema, preguntate: ¿puedo completar esto en 15 minutos cada lunes? Si la respuesta es no, simplificá hasta que sí. La sostenibilidad del ritual importa más que la profundidad del análisis.',
        completed: false,
      },

      {
        id: 'marketing-exam',
        title: 'Examen final: Marketing Digital',
        type: 'exam',
        questions: [
          {
            q: '¿Qué métrica mide el costo de adquirir un nuevo cliente incluyendo todos los canales de marketing?',
            options: [
              'CPM (Costo por Mil impresiones)',
              'CPC (Costo por Click)',
              'CAC (Costo de Adquisición de Cliente)',
              'CTR (Click-Through Rate)',
            ],
            correct: 2,
            explanation: 'El CAC incluye TODOS los gastos de marketing y ventas divididos entre el número de nuevos clientes en un período. Es la métrica clave para evaluar la eficiencia del marketing.',
          },
          {
            q: 'En el algoritmo de Instagram en 2026, ¿qué señal tiene mayor peso para el alcance orgánico de un Reel?',
            options: [
              'La cantidad de hashtags usados',
              'El engagement (likes, comentarios, shares) en las primeras 1-2 horas',
              'La frecuencia de publicación semanal',
              'El número total de seguidores de la cuenta',
            ],
            correct: 1,
            explanation: 'El algoritmo de Instagram prioriza el contenido según las señales de engagement inmediatas. Un Reel con alto engagement en las primeras horas recibe distribución amplificada. Los hashtags tienen impacto mínimo desde 2023.',
          },
          {
            q: '¿Cuál es la diferencia principal entre alcance (reach) e impresiones (impressions)?',
            options: [
              'Son sinónimos — miden exactamente lo mismo',
              'El alcance cuenta personas únicas; las impresiones cuentan veces que se mostró el contenido',
              'Las impresiones cuentan personas únicas; el alcance cuenta el total de visualizaciones',
              'El alcance es solo para Instagram; las impresiones son para Facebook',
            ],
            correct: 1,
            explanation: 'Reach = personas únicas que vieron tu contenido. Impressions = total de veces que se mostró, contando varias veces a la misma persona. Una persona puede generar múltiples impresiones pero solo un reach.',
          },
          {
            q: 'Para una campaña de Meta Ads con objetivo de conversiones, ¿cuánto tiempo mínimo deberías dejar correr el ad antes de evaluarlo?',
            options: [
              '24 horas — suficiente para ver si funciona',
              '3 días — tiempo estándar de la industria',
              '7-14 días — hasta completar la fase de aprendizaje del algoritmo',
              '30 días — necesitas un mes completo de datos',
            ],
            correct: 2,
            explanation: 'Meta necesita 50 eventos de optimización para salir de la "fase de aprendizaje". Evaluar antes genera decisiones basadas en datos estadísticamente insuficientes. La fase típicamente tarda 7-14 días con presupuesto adecuado.',
          },
          {
            q: '¿Qué es una Lookalike Audience en Meta Ads?',
            options: [
              'Una audiencia basada en intereses similares definidos manualmente',
              'Una audiencia de personas que ya visitaron tu sitio web',
              'Una audiencia que el algoritmo crea parecida a tus mejores clientes actuales',
              'Una audiencia de seguidores de tu competencia',
            ],
            correct: 2,
            explanation: 'Las Lookalike Audiences usan Machine Learning para encontrar personas con características similares a tu audiencia fuente (clientes, leads, visitantes). Son más eficientes que el targeting por intereses para conversiones.',
          },
          {
            q: '¿En qué momento del embudo de marketing tiene más sentido usar contenido educativo vs contenido de venta directa?',
            options: [
              'Contenido educativo siempre — nunca vendes directamente',
              'Venta directa siempre — el contenido educativo no convierte',
              'Educativo en audiencias frías (TOFU), venta directa en audiencias calientes (BOFU)',
              'Depende solo del presupuesto disponible',
            ],
            correct: 2,
            explanation: 'TOFU (Top of Funnel) = no te conocen → educa, genera confianza. MOFU (Middle) = están evaluando → prueba social, comparativas. BOFU (Bottom) = listos para comprar → oferta directa, urgencia. Saltarse etapas reduce drásticamente las conversiones.',
          },
          {
            q: '¿Qué significa que una campaña tenga un ROAS de 3?',
            options: [
              'Gasté $3 en ads y generé $1 en ventas',
              'Gasté $1 en ads y generé $3 en ventas',
              'El 3% de los clicks se convirtieron en ventas',
              'La campaña tuvo 3 veces más alcance que el objetivo',
            ],
            correct: 1,
            explanation: 'ROAS = Revenue / Ad Spend. Un ROAS de 3 significa que por cada $1 invertido en publicidad se generaron $3 en ventas. Un ROAS de 1 significa break-even. Para ser rentable necesitas que el ROAS supere tus márgenes + costos operativos.',
          },
          {
            q: 'Un cliente tiene 10,000 seguidores en Instagram pero sus posts reciben 50 likes en promedio. ¿Cuál es su engagement rate y qué indica?',
            options: [
              '0.5% — muy bajo, el contenido no resuena con la audiencia',
              '5% — excelente, está por encima del promedio de la industria',
              '50% — excelente, la mayoría de seguidores interactúa',
              '0.05% — catastrófico, la cuenta probablemente tiene bots',
            ],
            correct: 0,
            explanation: 'ER = (50 likes / 10,000 seguidores) × 100 = 0.5%. El promedio de Instagram está entre 1-3%. Un ER de 0.5% indica que el contenido no conecta con la audiencia, puede haber seguidores comprados, o el nicho tiene engagement naturalmente bajo.',
          },
        ],
        completed: false,
      },
    
    {
      id: 'modulo-4-p1',
      title: 'Proyecto: Estrategia de growth hacking',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: 'Diseña una estrategia de growth completa para un producto digital existente. Identifica el loop viral central, propón 3 experimentos de growth con hipótesis, métricas y criterios de éxito/fracaso. Presenta el plan como si fuera para inversores.',
      deliverables: [
        'Análisis del loop viral actual del producto',
        '3 experimentos en formato RICE (Reach, Impact, Confidence, Effort)',
        'Roadmap de implementación por sprint de 2 semanas',
        'Dashboard de métricas con metas a 90 días',
      ],
      rubrica: [
        'Loop viral correctamente identificado y documentado',
        'Experimentos con hipótesis falsificables',
        'Priorización RICE justificada',
        'Presentación de nivel inversor',
      ],
      completed: false,
    },],
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
          '## Dos disciplinas, un mismo objetivo\n\n**UX (User Experience)** es cómo se *siente* usar un producto. ¿El usuario logra su objetivo sin frustrarse? ¿El flujo tiene sentido? ¿La información aparece en el momento correcto? UX es arquitectura invisible.\n\n**UI (User Interface)** es cómo se *ve* ese producto. Los colores, la tipografía, el espaciado, los componentes visuales, la jerarquía. UI es la superficie que el usuario toca.\n\nUn producto puede tener UI hermosa y UX pésima (Instagram en sus primeros años tenía onboarding confuso). Puede tener UX excelente con UI básica (Craigslist sigue siendo usable a pesar de su diseño). El top 1% tiene ambos.\n\n## Por qué un diseñador moderno trabaja los dos\n\nLas empresas ya no contratan un "UX researcher" separado de un "UI designer" a menos que sean muy grandes. En el mercado actual — especialmente en LATAM y para startups — el rol es **Product Designer**: alguien que puede investigar al usuario, definir el flujo y diseñar la interfaz. Eso es lo que construye este track.\n\n## La pregunta filtro\n\nAntes de diseñar cualquier pantalla, hacete estas dos preguntas:\n- **UX**: ¿qué está intentando hacer el usuario en este momento?\n- **UI**: ¿qué elemento visual necesita ver primero para lograrlo?\n\nLa respuesta al UX define qué ponés. La respuesta al UI define cómo lo ponés.',
        tasks: [
          'Leé el artículo de Nielsen Norman Group "UX vs UI" (hay link en los recursos del módulo)',
          'Abrí la app que más usás en el día y anotá: 1 decisión de UX acertada, 1 decisión de UI acertada, 1 cosa que cambiarías',
          'En un párrafo, describí cuál es el problema de UX más importante que existe en el sitio de AlphaDev Studios hoy',
          'Buscá 3 ofertas de trabajo de "Product Designer" en LinkedIn y anotá qué habilidades piden en común',
        ],
        tip: 'La confusión entre UX y UI persiste porque la mayoría de los diseñadores solo hace UI (lo visible) sin pensar en UX (lo funcional). Si entendés la diferencia desde el día uno y la aplicás, ya tenés una ventaja real sobre el 80% de los diseñadores que aprenden solo las herramientas.',
        completed: false,
      },
      {
        id: 'u1-l1b',
        title: 'Mini-práctica: auditoría UX rápida de 3 apps que usás',
        type: 'practice',
        content:
          '## El objetivo\n\nDesarrollar el ojo crítico de diseño con práctica deliberada. No "esto se ve bien/mal" sino "esto funciona/no funciona porque..." con un principio específico.\n\n## El proceso (30 minutos)\n\nElegí 3 apps habituales — una de productividad, una de consumo (Spotify, Netflix) y una de servicio (banco, delivery).\n\nPara cada app, hacé este análisis en 10 minutos:\n\n**UX (funcionalidad):**\n- ¿El flujo principal tiene más de 4 pasos? ¿Se podría simplificar?\n- ¿Hay alguna pantalla donde no sabés qué hacer o qué pasó?\n- ¿El feedback de acciones es claro? (¿sabés cuándo algo se guardó o envió?)\n\n**UI (visual):**\n- ¿Hay jerarquía visual clara? ¿El ojo sabe dónde ir primero?\n- ¿El contraste es suficiente para leer cómodamente?\n- ¿Los botones principales son fáciles de encontrar?\n\n**Balance:**\n- ¿Qué tiene mejor esta app: UX o UI? ¿O las dos?\n- Si solo pudieras mejorar UNA cosa, ¿qué sería?',
        tasks: [
          'Elegí 3 apps de categorías distintas — incluí una que no te convenza del todo',
          'Para cada app, respondé las 7 preguntas por escrito — no solo en la cabeza',
          'Tomá screenshots de las pantallas que analizás para tener evidencia visual',
          'Guardá el análisis en Notion — es el inicio de tu repositorio de referencias de diseño',
        ],
        tip: 'Las mejores apps para analizar son las que usás sin pensar — Spotify, WhatsApp, Instagram. Cuando algo funciona tan bien que es invisible, es diseño excelente. Preguntate: ¿por qué no tengo que pensar cuando lo uso? La respuesta es el aprendizaje.',
        completed: false,
      },
      {
        id: 'u1-l2',
        title: 'Principios visuales: jerarquía, contraste, alineación, proximidad',
        type: 'reading',
        content:
          '## Los 4 principios que explican el 80% del diseño\n\nAntes de aprender herramientas, estos principios son el marco mental que te permite mirar cualquier diseño y entender por qué funciona o por qué no.\n\n**Jerarquía visual**: los elementos más importantes son los más grandes, más pesados o más contrastados. El ojo del usuario recorre la pantalla en el orden que vos definís con la jerarquía. Si todo tiene el mismo peso visual, nada es importante.\n\n**Contraste**: la diferencia entre elementos crea énfasis. Contraste de tamaño (headline enorme vs. body pequeño), de color (dorado sobre crema), de peso tipográfico (bold vs. regular). Sin contraste, hay ruido visual.\n\n**Alineación**: los elementos alineados se perciben como organizados y confiables. Una sola línea de alineación guía el ojo. Elementos desalineados generan incomodidad visual aunque el usuario no pueda identificar por qué.\n\n**Proximidad**: los elementos cercanos se perciben como relacionados. Un label y su input van juntos. Un título y su párrafo van juntos. Separar cosas relacionadas — o juntar cosas no relacionadas — rompe la comprensión del usuario.\n\n## Por qué importan antes que Figma\n\nFigma es una herramienta. Los principios son el razonamiento detrás de las decisiones que tomás con esa herramienta. Un diseñador que conoce los principios puede crear un diseño decente en cualquier herramienta. Uno que solo conoce la herramienta crea lo mismo en todas.',
        tasks: [
          'Abrí Figma (o papel y lápiz) y rediseñá un elemento simple — un botón, una card, un formulario — aplicando los 4 principios conscientemente',
          'Buscá 3 capturas de pantalla de apps que uses y anotá cómo aplica cada principio (o cómo lo viola)',
          'Tomá la home de alphadev.studio y analizá: ¿la jerarquía visual es clara? ¿Qué es lo primero que ve el usuario?',
          'Creá un frame en Figma con el texto "Diseño antes y después" — versión sin principios vs. versión con principios aplicados',
        ],
        tip: 'El principio más ignorado es la proximidad. Muchos diseñadores ajustan colores y tipografías durante horas pero dejan labels flotando lejos de sus inputs o títulos separados de su contenido. Revisá siempre el espaciado entre elementos relacionados — es el ajuste más rápido que más impacto tiene.',
        completed: false,
      },
      {
        id: 'u1-l2b',
        title: 'Mini-práctica: identificá principios visuales en diseños reales',
        type: 'practice',
        content:
          '## El ejercicio\n\nVer los 4 principios aplicados en diseños reales — poder señalar exactamente dónde está cada uno — es lo que convierte la teoría en criterio de diseño.\n\n## Parte 1 — Búsqueda (15 minutos)\n\nBuscá en Google Images "SaaS landing page 2025" o "mobile app UI 2025". Elegí 3 capturas de diseños que te parezcan de calidad.\n\n## Parte 2 — Análisis (15 minutos)\n\nPara cada diseño, anotá:\n\n- **Jerarquía**: ¿cuál es el elemento más importante? ¿El ojo lo ve primero? ¿Por qué?\n- **Contraste**: ¿qué pares de elementos contrastan más? ¿Tamaño, color o peso tipográfico?\n- **Alineación**: dibujá mentalmente las líneas de alineación — ¿cuántas líneas guían el diseño?\n- **Proximidad**: ¿qué elementos están agrupados? ¿El agrupamiento refleja la relación de contenido?\n\n## Parte 3 — Aplicación (10 minutos)\n\nElegí uno de los 4 principios y pensá cómo aplicarlo a una sección del sitio de AlphaDev Studios. ¿Hay algo con poco contraste? ¿Algo desalineado? ¿Labels flotando lejos de sus inputs?',
        tasks: [
          'Buscá 3 capturas de pantalla de diseños UI que te parezcan de calidad',
          'Analizá cada diseño identificando dónde aparece cada uno de los 4 principios',
          'Anotá al menos 1 violación de principio en alguno de los 3 diseños elegidos',
          'Identificá 1 elemento del sitio de AlphaDev Studios donde aplicar un principio mejoraría el diseño',
        ],
        tip: 'Al principio buscás aplicaciones perfectas de los principios. Con el tiempo, el ojo aprende a ver violaciones — y eso es más valioso. Saber exactamente por qué algo se siente incómodo visualmente te convierte en el diseñador que puede articular cambios específicos, no solo decir "algo no me convence".',
        completed: false,
      },
      {
        id: 'u1-l3',
        title: 'Google UX Design Certificate — Módulo 1',
        type: 'reading',
        content:
          '## El certificado más accesible para empezar en UX\n\nEl **Google UX Design Certificate** en Coursera es el punto de entrada recomendado para diseñadores que empiezan desde cero. Lo creó Google con instructores de sus propios equipos de producto y cubre el proceso completo: research, wireframes, prototipado y testing.\n\nTiene **opción gratuita**: en Coursera, hacé click en "Audit" en lugar de "Enroll" para acceder a los videos y materiales sin pagar. No obtenés el certificado, pero tenés todo el contenido.\n\n## Qué cubre el Curso 1 ("Foundations of UX Design")\n\n- Qué hace un UX designer en el día a día\n- El proceso de design thinking (empatizar, definir, idear, prototipar, evaluar)\n- Conceptos clave: user-centered design, accessibility, equity-focused design\n- Herramientas del oficio: Figma, FigJam, Adobe XD (el curso usa Figma)\n\nDuración estimada: **21 horas** — idealmente completado en 2–3 semanas a un ritmo de 1–2 horas por día.\n\n## Cómo encarar el curso\n\nNo lo hagas en modo pasivo. Los cuestionarios al final de cada sección son obligatorios para avanzar — tomátelos en serio. Los ejercicios prácticos (especialmente los de Figma) son los más valiosos: hacelos todos aunque no sean requeridos para completar el módulo.',
        tasks: [
          'Inscribite en el Google UX Design Certificate en Coursera (modo Audit para empezar gratis)',
          'Completá la Semana 1 del Curso 1: "Introducing User Experience Design"',
          'Completá la Semana 2: "Thinking Like a UX Designer"',
          'Anotá en tu Notion o doc 5 conceptos nuevos que aprendiste y cómo los aplicarías a un proyecto real',
          'Completá el primer ejercicio práctico de Figma del curso',
        ],
        tip: 'El certificado de Google UX Design se puede agregar a LinkedIn como certificación. Aunque no garantiza trabajo por sí solo, le dice a quien te busca que tenés un framework metodológico — no sos solo alguien que sabe usar Figma. La metodología más el portfolio es la combinación que abre puertas.',
        completed: false,
      },
      {
        id: 'u1-l4',
        title: 'Laws of UX: las leyes que todo diseñador debe conocer',
        type: 'reading',
        content:
          '## Por qué las leyes de UX importan\n\nLas **Laws of UX** (lawsofux.com) son principios psicológicos aplicados al diseño de interfaces. No son arbitrarias — están basadas en décadas de investigación en ciencias cognitivas. Conocerlas te permite tomar decisiones de diseño con fundamento, no con intuición.\n\n## Las 5 leyes prioritarias para empezar\n\n**Ley de Fitts**: el tiempo para llegar a un objetivo depende de su tamaño y distancia. → Los botones de acción principal deben ser grandes y estar en lugares predecibles (esquina inferior derecha en mobile, centro o arriba en desktop).\n\n**Ley de Hick**: más opciones = más tiempo para decidir. → Los menús con 7+ ítems, los formularios con 15 campos, los onboardings con 10 pasos paralizan al usuario. Simplificá siempre.\n\n**Efecto Von Restorff**: lo que es diferente al entorno se recuerda. → El botón CTA que contrasta con todo lo demás es el que más clicks recibe. La diferenciación visual es una decisión estratégica.\n\n**Efecto de la Usabilidad Estética**: las personas perciben los diseños más atractivos como más usables, aunque no lo sean. → Un diseño bonito genera más confianza y tolerancia a los errores del usuario.\n\n**Ley de Jakob**: los usuarios esperan que tu producto funcione como los productos que ya conocen. → No reinventés la rueda en los patrones de navegación. La creatividad va en el contenido y los detalles, no en que el menú esté donde nadie lo espera.',
        tasks: [
          'Leé las 5 leyes prioritarias en lawsofux.com — cada una tiene ejemplos visuales, no te saltes esa parte',
          'Para cada ley, encontrá 1 app que la aplique bien y 1 que la viole — anotalas con capturas de pantalla',
          'Identificá cuáles de estas leyes aplican o se violan en el sitio actual de alphadev.studio',
          'Leé 3 leyes adicionales de tu elección en lawsofux.com y resumilas en una línea cada una',
        ],
        tip: 'La Ley de Jakob es la más poderosa y la más contraintuitiva para diseñadores creativos. Queremos ser originales, pero los usuarios quieren lo familiar. La solución es ser original en el estilo visual y el contenido, pero convencional en la estructura de navegación y los patrones de interacción.',
        completed: false,
      },
      {
        id: 'u1-l5',
        title: 'Práctica: auditoría UX de una pantalla',
        type: 'practice',
        content:
          '## Qué es una auditoría UX\n\nUna auditoría UX es un análisis estructurado de una interfaz existente para identificar problemas de usabilidad, jerarquía visual y flujo de usuario. Es la práctica más directa para desarrollar el "ojo crítico" que distingue a los buenos diseñadores.\n\nA diferencia de opinar ("esto se ve mal"), una auditoría conecta cada observación con un principio o ley: "el botón principal tiene poco contraste con el fondo → viola la Ley de Von Restorff → probablemente tenga menos clicks de los esperados."\n\n## El proceso de una auditoría de una pantalla\n\n**Paso 1 — Elegí la pantalla**: login, onboarding, checkout, home, o cualquier pantalla de una app que uses frecuentemente. Evitá elegir pantallas demasiado simples — que tenga al menos 5–8 elementos.\n\n**Paso 2 — Mapeá la jerarquía visual**: ¿qué elemento ves primero? ¿Segundo? ¿Sigue un orden lógico para el objetivo del usuario?\n\n**Paso 3 — Evaluá cada principio**: revisá jerarquía, contraste, alineación y proximidad. ¿Cuáles se aplican bien? ¿Cuáles se violan?\n\n**Paso 4 — Aplicá las leyes de UX**: ¿hay demasiadas opciones (Ley de Hick)? ¿El CTA destaca suficiente (Von Restorff)? ¿El flujo es predecible (Ley de Jakob)?\n\n**Paso 5 — Propuestas de mejora**: por cada problema encontrado, describí qué cambiarías y por qué.',
        tasks: [
          'Elegí una pantalla de una app conocida (login, onboarding, checkout) para auditar',
          'Tomá screenshot de la pantalla y analizá la jerarquía visual — anotá el orden en que tu ojo recorre los elementos',
          'Identificá al menos 3 problemas concretos con referencia al principio o ley que violan',
          'Proponeé una mejora específica para cada problema identificado',
          'Guardá el análisis completo en Notion o un doc — es el primer ítem de tu proceso como diseñador',
        ],
        tip: 'Las mejores auditorías se hacen con tiempo y sin prisa. Dale 30 minutos mínimo a una sola pantalla — no 5 minutos a 6 pantallas. La profundidad de análisis es lo que desarrolla el ojo crítico. Hacer auditorías rápidas y superficiales durante semanas te da menos que hacer una profunda por semana.',
        completed: false,
      },
      {
        id: 'up-m1',
        title: '[Mobile] Proyecto 1 — Básico: Rediseño de flujo de onboarding (4 pantallas)',
        type: 'practice',
        content:
          '## El brief\n\nElegí una app mobile con un flujo de onboarding confuso o poco efectivo y rediseñalo por completo en 4 pantallas. El onboarding es el primer contacto del usuario con el producto — si falla, el usuario abandona antes de descubrir el valor real. Este redesign demuestra pensamiento de producto, no solo habilidad visual.\n\n## Las 4 pantallas a diseñar\n\n1. **Bienvenida / Splash**: primera impresión de la app, comunicá el valor en una frase\n2. **Propuesta de valor**: 3 beneficios clave en slides o scroll (con ilustración o screenshot del producto)\n3. **Registro / Cuenta**: formulario de creación — mínima fricción, máxima claridad\n4. **Personalización inicial**: una pregunta que adapta la experiencia al usuario\n\n## El proceso paso a paso\n\n**Paso 1 — Elegí la app y documentá el problema**\nCompletá el onboarding real de la app elegida. Anotá en qué momento te confundiste, qué pasos son innecesarios y qué información falta. Buscá las reseñas en App Store — las quejas de onboarding aparecen en los 1 y 2 estrellas.\n\n**Paso 2 — Screenshots del before + anotaciones**\nImportá las capturas a Figma en una página "Before". Marcá con texto y flechas los problemas de UX específicos de cada pantalla.\n\n**Paso 3 — Benchmarking**\nBuscá 3 apps del mismo espacio con onboardings efectivos. En Mobbin.com podés filtrar por "Onboarding" y categoría.\n\n**Paso 4 — Wireframes de las 4 pantallas**\nDibujá la estructura antes de pensar en colores. Decisión clave: ¿slides con puntos de navegación o scroll vertical?\n\n**Paso 5 — UI final**\nDiseñá las 4 pantallas en Figma a 390×844px (iOS) o 360×800px (Android).\n\n**Paso 6 — Caso de estudio en Figma**\nUna página con: Before / Problemas detectados / Decisiones de diseño / After.',
        tasks: [
          'Completá el onboarding real de la app elegida y anotá cada punto de fricción antes de abrir Figma',
          'Buscá en las reseñas de App Store — identificá al menos 3 quejas de onboarding para validar el problema',
          'Hacé el benchmarking de 3 apps con buen onboarding en Mobbin.com',
          'Wireframeá las 4 pantallas antes de pasar a alta fidelidad',
          'Diseñá las 4 pantallas en UI final con el sistema visual de la app',
          'Publicá el caso Before/After en Behance con las anotaciones de problemas y decisiones',
        ],
        tip: 'El error más común en redesigns de onboarding es agregar más pantallas creyendo que más información ayuda. Cada pantalla adicional reduce la tasa de completado en 10–15%. El mejor onboarding es el más corto que logra que el usuario vea el valor del producto lo antes posible.',
        completed: false,
      },
      {
        id: 'up-d1',
        title: '[Desktop] Proyecto 6 — Básico: Landing page de producto SaaS (1440px)',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá una landing page de alta conversión para un producto SaaS. La página debe comunicar el valor del producto en los primeros 5 segundos y guiar al usuario hacia un único CTA: registro gratuito, demo, o contacto.\n\n## Las 6 secciones a diseñar\n\n1. **Hero**: headline de máximo 8 palabras (¿qué hago y para quién?), subheadline, CTA visible sin scroll, screenshot del producto\n2. **Social proof**: logos de empresas que lo usan, o métricas clave ("2,000+ equipos", "4.9/5 en G2")\n3. **Propuesta de valor — 3 columnas**: icono + título + descripción de 2 líneas\n4. **Cómo funciona**: 3–4 pasos con número, título y descripción\n5. **Testimonios**: 2–3 cards con foto, nombre, empresa, texto (máximo 3 líneas)\n6. **CTA final + Footer**: repite la oferta, formulario simple (solo email) o botón directo\n\n## Principios de conversión a aplicar\n\n- Una landing, un objetivo: el header NO tiene links que lleven a otras páginas\n- El CTA primario se repite: en el hero, al final de cada sección y en el footer\n- El headline específico convierte mejor: "Gestión de proyectos para equipos de desarrollo" > "La plataforma todo en uno"\n- La imagen del producto muestra el producto real, no un mockup abstracto\n\n## El proceso\n\n1. Escribí el copy ANTES de abrir Figma — el headline es la decisión más importante\n2. Armá el wireframe de 6 secciones en FigJam\n3. Definí tipografía y paleta (para SaaS: sans-serif en todo, 1 color de acento fuerte)\n4. Diseñá sección por sección, de arriba hacia abajo\n5. Revisá la jerarquía visual: ¿el ojo va al CTA después del hero?',
        tasks: [
          'Escribí el headline y el copy de cada sección ANTES de diseñar — el diseño sirve al texto',
          'Armá el wireframe de 6 secciones en FigJam antes de pasar a color',
          'Elegí tipografía y paleta y creá los styles en Figma antes de diseñar',
          'Diseñá la landing en frame de 1440px con contenido a max-width de 1200px',
          'Revisá que el CTA principal aparezca al menos 3 veces (hero + mitad + final)',
          'Publicá en Behance con el proceso: copy → wireframe → diseño final',
        ],
        tip: 'El test más rápido para saber si tu landing convierte: mostrásela a alguien que no conoce el producto durante 5 segundos y preguntale qué hace. Si no puede responderlo, el headline falló. No importa cuán bonita se vea — si el mensaje no es claro en 5 segundos, el visitante se va.',
        completed: false,
      },
          {
        id: 'uiux-1-proj-basico',
        title: 'Proyecto Básico: Rediseño de un elemento UI',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Elige un elemento de UI que consideres mal diseñado en cualquier app o sitio web. Analízalo y rediseñalo en Figma.',
        deliverables: [
          'Screenshot del elemento original con anotaciones: qué principio de diseño viola y por qué es problemático',
          'Rediseño en Figma: el elemento mejorado aplicando jerarquía visual, color y tipografía',
          'Comparativa before/after con explicación de cada decisión de diseño',
        ],
        tip: 'El mejor elemento para rediseñar es uno que te haya frustrado personalmente. La frustración propia es el mejor brief.',
        completed: false,
      },
      {
        id: 'uiux-1-proj-inter',
        title: 'Proyecto Intermedio: Análisis heurístico completo',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Aplica las 10 heurísticas de Nielsen a una app real. Identifica al menos 8 problemas de usabilidad y propón soluciones para los 3 más críticos.',
        deliverables: [
          'Lista de 10 hallazgos: uno por heurística, con screenshot y descripción del problema',
          'Severity rating para cada hallazgo: 1 (cosmético), 2 (menor), 3 (mayor), 4 (catastrófico)',
          'Rediseño en Figma de los 3 problemas con mayor severidad',
          'Recomendaciones priorizadas por impacto vs. esfuerzo',
        ],
        tip: 'La consistencia del criterio importa tanto como encontrar los problemas. Define el estándar de evaluación antes de auditar.',
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
          '## El entorno de trabajo de Figma\n\nFigma corre en el browser y en app de escritorio. Creá una cuenta en figma.com — el plan gratuito permite hasta 3 proyectos y es más que suficiente para aprender.\n\nAntes de diseñar cualquier cosa, necesitás entender cómo está organizado el espacio de trabajo:\n\n- **Canvas**: el área infinita donde diseñás. Todo existe acá.\n- **Panel izquierdo**: capas y páginas del archivo. Acá organizás los elementos.\n- **Panel derecho**: propiedades del elemento seleccionado — tamaño, color, tipografía, efectos.\n- **Toolbar superior**: herramientas de selección, frame, forma, texto, etc.\n\n## Frames vs Grupos\n\nEsta distinción es crítica y confunde a todos al principio:\n\n**Frame**: el contenedor inteligente de Figma. Tiene un tamaño definido, puede tener constrains, Auto Layout y clip content. Los frames son equivalentes a los `<div>` en HTML. Cada pantalla de una app es un frame.\n\n**Grupo**: un contenedor simple que agrupa elementos sin propiedades propias. Su tamaño cambia automáticamente con el contenido. Usá grupos para agrupar elementos que siempre se mueven juntos.\n\n## Nomenclatura de capas: la disciplina que diferencia\n\nUn archivo de Figma con capas llamadas "Frame 147", "Rectangle 23" y "Group 8" es inútil para trabajar en equipo o para vos mismo en 2 semanas. La convención profesional: `ComponentName/State` o `Screen/Section/Element`. Ej: `Button/Primary`, `Navbar/Desktop`, `Card/Blog/Default`.',
        tasks: [
          'Creá una cuenta en figma.com y completá el tour interactivo oficial de la interfaz',
          'Reproducí desde cero una pantalla simple de una app que uses — sin templates, solo observando y recreando',
          'Renombrá todas las capas de tu diseño con una nomenclatura consistente (no "Frame 1", no "Rectangle 3")',
          'Explorá el panel derecho: experimentá con fill, stroke, corner radius, effects (sombra, blur)',
        ],
        tip: 'La mayoría de los diseñadores principiantes pasan meses usando Grupos cuando deberían usar Frames. La regla simple: si querés que el contenedor tenga un tamaño fijo, tenga clip content o vaya a usar Auto Layout → usá Frame. Para todo lo demás → Grupo.',
        completed: false,
      },
      {
        id: 'u2-l1b',
        title: 'Mini-práctica: reproducí una pantalla real en Figma',
        type: 'practice',
        content:
          '## El mejor ejercicio para dominar Figma\n\nReproducir un diseño existente — sin copiar, solo observando — es el equivalente a transcribir una canción en música. Aprendés más en 1 hora de reproducción deliberada que en 5 horas de tutoriales.\n\n## La pantalla a elegir (de menor a mayor complejidad)\n\n- **Opción A**: Una pantalla de login de una app conocida (Apple, Airbnb, Spotify)\n- **Opción B**: La home de una app mobile simple (calculadora, notas, reloj)\n- **Opción C**: Una card de producto de un e-commerce real\n\n## Las reglas del ejercicio\n\n1. Tomá screenshot de alta resolución de la pantalla original\n2. Ponela en un frame aparte en Figma como referencia\n3. Creá un nuevo frame del mismo tamaño\n4. Reproducí el diseño SIN mover ni copiar elementos del original\n5. Ponelos uno al lado del otro y comparalos\n6. Anotá las 3 diferencias principales que notás\n\n## Lo que vas a descubrir\n\nEspaciados que no se ven a simple vista. Tamaños de texto exactos. La diferencia entre una sombra sutil y ninguna sombra. La construcción interna de las capas.',
        tasks: [
          'Elegí la pantalla y tomá screenshot de alta resolución',
          'Creá el frame del mismo tamaño en Figma y reproducí el diseño elemento por elemento',
          'Renombrá TODAS las capas con nombres descriptivos — cero "Frame 1" o "Rectangle 3"',
          'Ponela junto al original y anotá las 3 diferencias principales que notás entre ambas',
        ],
        tip: 'No te frustres si no queda perfecta — eso es parte del ejercicio. Las diferencias entre tu reproducción y el original son exactamente los conceptos que todavía tenés que dominar. "El padding era 16px, no 12px" o "la sombra usa 15% de opacidad, no 40%" son lecciones específicas que los tutoriales nunca cubren con esa precisión.',
        completed: false,
      },
      {
        id: 'u2-l2',
        title: 'Auto Layout: el superpoder de Figma',
        type: 'reading',
        content:
          '## Qué es Auto Layout y por qué cambia todo\n\n**Auto Layout** es el sistema de layout de Figma equivalente a **flexbox en CSS**. Cuando aplicás Auto Layout a un frame, los elementos hijos se organizan automáticamente según las reglas que definís — y el frame se adapta cuando el contenido cambia.\n\nSin Auto Layout: si el texto de un botón crece, tenés que ajustar el botón manualmente. Con Auto Layout: el botón crece solo.\n\n## Los conceptos clave\n\n**Dirección**: Horizontal (elementos en fila) o Vertical (elementos en columna). Equivalente a `flex-direction: row` o `column`.\n\n**Spacing**: el espacio entre elementos hijos. Equivalente a `gap` en CSS.\n\n**Padding**: el espacio entre el borde del frame y sus hijos. Igual que `padding` en CSS.\n\n**Hug vs Fixed vs Fill**: cómo se comporta el tamaño del elemento.\n- **Hug**: el frame abraza a sus hijos (se achica y agranda con el contenido)\n- **Fixed**: tamaño fijo que no cambia\n- **Fill**: ocupa todo el espacio disponible del padre\n\n## Por qué es indispensable en diseño profesional\n\nCuando diseñás con Auto Layout desde el principio, tus componentes son responsivos por naturaleza. Un botón diseñado con Auto Layout funciona igual con "Guardar" que con "Guardar cambios del perfil de usuario" — sin ajustes manuales.',
        tasks: [
          'Aplicá Auto Layout a un botón: frame horizontal, padding 12px vertical y 24px horizontal, spacing entre ícono y texto',
          'Creá una card de blog con Auto Layout vertical: imagen + título + descripción + CTA — que el alto se adapte al texto',
          'Diseñá una navbar horizontal con Auto Layout: logo a la izquierda + links en el centro (Fill) + CTA a la derecha',
          'Experimentá cambiando el texto de los componentes y verificá que el layout se adapta automáticamente',
        ],
        tip: 'La clave para dominar Auto Layout rápido: abrí cualquier componente de un UI kit gratuito de Figma Community y desarmalo — mirá cómo está construido. Los UI kits profesionales usan Auto Layout en todos los componentes. Aprender mirando y desmontando lo que otros construyeron es el atajo más rápido.',
        completed: false,
      },
      {
        id: 'u2-l3',
        title: 'Componentes y variantes: reutilización profesional',
        type: 'reading',
        content:
          '## Por qué los componentes son el núcleo del diseño escalable\n\nUn **componente** en Figma es equivalente a un componente de React: lo diseñás una vez y lo usás en cualquier pantalla. Cuando modificás el componente maestro, todas las instancias se actualizan automáticamente.\n\nSin componentes, cambiar el color de un botón en 30 pantallas = 30 cambios manuales. Con componentes = 1 cambio.\n\n## La jerarquía: Maestro → Instancias\n\n**Componente maestro** (ícono de rombo sólido): el original. Se edita directamente para afectar a todas las instancias.\n\n**Instancia** (ícono de rombo hueco): copia del maestro. Hereda los cambios del maestro pero puede tener **overrides** locales (cambiar el texto, el ícono, el color de un estado específico sin romper la herencia).\n\n## Variantes: múltiples estados en un solo componente\n\nLas **variantes** agrupan múltiples versiones de un componente dentro de un mismo set. Por ejemplo, un botón puede tener:\n\n- **Tipo**: Primary / Secondary / Ghost\n- **Tamaño**: Large / Medium / Small\n- **Estado**: Default / Hover / Pressed / Disabled / Loading\n\nEso son 3 × 3 × 5 = 45 variantes en un solo componente. En el panel derecho, el diseñador puede cambiar cualquier combinación en segundos.\n\n## Cuándo crear un componente\n\nRegla simple: si usás el mismo elemento más de 2 veces, hacelo componente. Si tiene múltiples estados, usá variantes.',
        tasks: [
          'Creá un componente de botón primario con Auto Layout y conviertilo en componente (Cmd/Ctrl+Alt+K)',
          'Agrega variantes: Tipo (Primary, Secondary), Estado (Default, Disabled) — mínimo 4 variantes',
          'Creá un componente de Input field con variantes de estado: Default, Focus, Error, Filled',
          'Usá 3 instancias del botón en una pantalla y verificá que cambiar el maestro afecta a todas',
        ],
        tip: 'Los componentes más valiosos no son los más complejos — son los que más repetís. Antes de crear un sistema de componentes completo, identificá los 5 elementos que aparecen en más pantallas (botón, input, card, navbar, modal) y hacé esos primero. El 80% del valor viene de ese 20%.',
        completed: false,
      },
      {
        id: 'u2-l3b',
        title: 'Mini-práctica: el componente Button con 4 variantes',
        type: 'practice',
        content:
          '## El componente más enseñado, el más mal construido\n\nUn botón construido correctamente con Auto Layout, variantes y estados bien definidos demuestra más dominio de Figma que 10 pantallas con estilos inconsistentes.\n\n## El objetivo: Button con 4 variantes\n\n**Tipo**: Primary / Secondary\n**Estado**: Default / Disabled\n\nCombinado = 4 variantes.\n\n## Los requisitos técnicos\n\n- **Auto Layout** horizontal: padding 12px vertical, 24px horizontal\n- **Texto**: Inter 600, 14px — color overrideable por variante\n- **Primary**: fondo #9A7235, texto blanco\n- **Secondary**: fondo transparente, borde 1px #9A7235, texto #9A7235\n- **Disabled**: opacity 40% en ambos tipos — sin cambiar el color base\n- **Corner radius**: 6px en todos\n\n## Después de construirlo\n\nUsá 3 instancias del botón en un frame de prueba. Cambiá el texto de cada una — verificá que el ancho se adapta automáticamente. Cambiá el tipo a Secondary desde el panel de variantes. Eso es un componente bien construido.',
        tasks: [
          'Creá el componente Button desde cero con Auto Layout — sin templates ni UI kits',
          'Configurá las 4 variantes: Primary/Secondary × Default/Disabled',
          'Usá 3 instancias en un frame y verificá que el text override funciona en cada una',
          'Cambiá el color de fondo del Primary en el maestro — verificá que las 3 instancias se actualizan',
        ],
        tip: 'El estado Disabled se hace mejor con opacity reducida que cambiando el color. Así el Disabled es siempre consistente con el estado Default — y si cambiás el color primario del brand, el Disabled sigue siendo correcto automáticamente sin ajustes manuales.',
        completed: false,
      },
      {
        id: 'u2-l4',
        title: 'Prototipado: conectar pantallas y simular flujos',
        type: 'reading',
        content:
          '## Del diseño estático al prototipo interactivo\n\nUn prototipo en Figma te permite simular cómo funciona un producto sin escribir una sola línea de código. Es la herramienta más poderosa para validar decisiones de diseño antes de invertir en desarrollo.\n\n## La pestaña Prototype\n\nEn el panel derecho, la pestaña "Prototype" es donde configurás las interacciones. Para conectar dos frames:\n1. Seleccioná el elemento que dispara la acción (un botón, una card, un ícono)\n2. Arrastrá el conector azul que aparece al hover hacia el frame de destino\n3. Configurá el trigger (On Click, On Hover, After Delay) y la animación de transición\n\n## Tipos de interacciones más usadas\n\n**Navigate to**: navegar a otro frame. Para transiciones entre pantallas.\n\n**Open overlay**: mostrar un frame encima del actual, como un modal o un bottom sheet. El frame de origen sigue visible detrás.\n\n**Smart Animate**: anima automáticamente las diferencias entre dos frames si los elementos tienen el mismo nombre de capa. El efecto más premium de Figma.\n\n**Scroll to**: hacer scroll hasta un elemento específico dentro del mismo frame.\n\n## Cuándo usar Smart Animate\n\nSmart Animate detecta elementos con el mismo nombre en el frame origen y destino, y anima la diferencia (posición, tamaño, opacidad). Para que funcione, los nombres de las capas deben ser idénticos. Es la base del Módulo de Motion que viene después.',
        tasks: [
          'Creá 4 frames de un flujo de onboarding simple: welcome → sign up → verificar email → dashboard',
          'Conectalos con transiciones Navigate to usando el trigger On Click en cada botón CTA',
          'Agregá un modal de confirmación usando Open Overlay en alguno de los pasos',
          'Probá el prototipo en modo Present (Cmd/Ctrl+Enter) — anotá qué no funciona como esperabas',
          'Compartí el link del prototipo con alguien y mirá cómo lo usa sin explicarle nada — ¿hay algo confuso?',
        ],
        tip: 'El valor del prototipo no está en lo perfecto que se ve — está en lo rápido que identifica problemas. Un prototipo hecho en 2 horas que revela que el flujo de registro confunde a los usuarios vale más que 2 semanas de diseño perfecto que nunca se testeó. Prototipar rápido y testear temprano es la práctica que más ahorra tiempo en el largo plazo.',
        completed: false,
      },
      {
        id: 'u2-l4b',
        title: 'Mini-práctica: prototipá un flujo de 3 pantallas',
        type: 'practice',
        content:
          '## El objetivo: un prototipo funcional en 45 minutos\n\nUn flujo de 3 pantallas con transiciones conectadas. Simple pero completo: el usuario puede navegar de A a B a C y volver, sin que el prototipo se rompa.\n\n## Las opciones de flujo\n\n- **Opción A**: Lista de tareas → Detalle de tarea → Confirmación de completado\n- **Opción B**: Búsqueda → Resultados → Detalle de resultado\n- **Opción C**: Home de una app → Formulario → Pantalla de confirmación\n\n## Los requisitos\n\n- Cada pantalla tiene al menos 1 elemento interactivo (botón, card, link)\n- Conectá los 3 frames con al menos 2 tipos de transición distintos: Navigate To + Open Overlay\n- El usuario puede volver atrás desde cualquier pantalla\n- Al menos 1 transición usa Smart Animate (las capas deben tener el mismo nombre en los dos frames)\n\n## Cómo verificarlo\n\nAbrí el modo Present (Ctrl+Enter). Navegá el flujo completo sin mirar el editor. Si en algún momento te quedaste atascado — ese es un problema de UX que el prototipo reveló. Anotalo.',
        tasks: [
          'Elegí el flujo y diseñá las 3 pantallas priorizando la funcionalidad sobre el estilo visual',
          'Conectalos con Navigate To y configurá los triggers correctos en cada botón',
          'Agregá al menos 1 Open Overlay (modal o confirmación) en el flujo',
          'Configurá 1 transición con Smart Animate y verificá que los nombres de capa coinciden',
          'Mostráselo a alguien sin explicarle qué hacer — anotá si puede completar el flujo solo',
        ],
        tip: 'La prueba más honesta de un prototipo: dáselo a alguien sin participación en el diseño y observá sin intervenir. Cada vez que dude o presione en el lugar equivocado es un problema de diseño, no de la persona. 5 minutos de observación silenciosa valen más que horas de revisión interna.',
        completed: false,
      },
      {
        id: 'u2-l5',
        title: 'FigJam: brainstorming, flujos y workshops colaborativos',
        type: 'reading',
        content:
          '## Qué es FigJam y para qué usarlo\n\n**FigJam** es la pizarra colaborativa de Figma — un espacio infinito donde equipos trabajan en tiempo real. No es para diseño visual (eso es Figma Design) sino para pensar, explorar y alinear antes de diseñar.\n\nCasos de uso principales:\n\n- **User flows**: mapear el camino que sigue el usuario desde que abre la app hasta que completa su objetivo\n- **Brainstorming**: generar ideas sin filtro antes de converger en una solución\n- **Workshops remotos**: retrospectivas de equipo, priorización de features, kick-offs de proyecto\n- **Site maps**: la estructura de navegación de un sitio o app antes de diseñar las pantallas\n\n## Los elementos clave de FigJam\n\n**Sticky notes**: el elemento más usado. En FigJam son interactivas — las podés mover, agrupar por color, votar con stamps.\n\n**Conectores**: flechas que muestran el flujo o la relación entre elementos. En user flows, cada conector es una acción o decisión del usuario.\n\n**Stamps de votación**: en workshops, cada participante vota visualmente las ideas con emojis. Democratiza las decisiones.\n\n**Templates**: FigJam tiene decenas de templates para user flows, retrospectivas, customer journey maps, brainstorming — usalos como punto de partida.\n\n## El flujo correcto: FigJam ANTES de Figma\n\nSiempre mapeá el user flow en FigJam antes de diseñar las pantallas en Figma. Las decisiones que tomás en el flujo (qué pantallas existen, qué acciones llevan a dónde) determinan cuántas pantallas vas a diseñar y por qué.',
        tasks: [
          'Abrí FigJam y creá un user flow de la pantalla que auditaste en el módulo anterior — de la home al resultado final',
          'Usá conectores para mostrar cada acción del usuario y sticky notes para anotar decisiones de diseño',
          'Explorá al menos 3 templates de FigJam y anotá cuándo usarías cada uno',
          'Invitá a alguien a colaborar en tu FigJam en tiempo real y co-editá un flujo juntos',
        ],
        tip: 'El user flow en FigJam no necesita ser perfecto desde el principio — tiene que ser entendible. Si alguien que no estuvo en la reunión puede seguir el flujo sin que se lo expliques, está bien. Si necesita explicación para entenderlo, simplificá.',
        completed: false,
      },
      {
        id: 'u2-l6',
        title: 'Práctica: diseñar 5 pantallas + su user flow en FigJam',
        type: 'practice',
        content:
          '## El entregable completo de este módulo\n\nEsta práctica integra todo lo aprendido en las 5 lecciones anteriores en un proyecto cohesivo: un user flow en FigJam que guía un diseño de 5 pantallas en Figma.\n\n## El proyecto\n\nElegí una app simple para diseñar (gestor de tareas, recetario, app de clima, tracker de hábitos — cualquiera que te sea familiar como usuario). La simplicidad es intencional: el objetivo es ejecutar bien los conceptos, no crear un producto complejo.\n\n## Entregable 1 — FigJam: User Flow\n\nAntes de abrir Figma Design, abrí FigJam y mapeá el flujo completo:\n- ¿Cuántas pantallas hay en el flujo principal?\n- ¿Qué acción lleva de una pantalla a la siguiente?\n- ¿Hay puntos de error o pantallas alternativas?\n- ¿Cuál es el happy path (el flujo ideal sin errores)?\n\n## Entregable 2 — Figma Design: 5 pantallas\n\nUsando el user flow como guía, diseñá las 5 pantallas del happy path:\n\n- **Auto Layout** en todos los frames y componentes\n- **Mínimo 5 componentes reutilizables** (botón, input, card, navbar, footer)\n- **Variantes en al menos 1 componente** (botón con estados Default/Disabled como mínimo)\n- **Prototype funcional** que conecte las 5 pantallas siguiendo el user flow\n\n## Criterio de calidad\n\nAntes de dar el proyecto por terminado: ¿podría alguien que no participó en el diseño entender el flujo y navegar el prototipo sin explicación? Si la respuesta es sí, está listo.',
        tasks: [
          'Mapeá el user flow completo en FigJam con conectores y sticky notes antes de abrir Figma Design',
          'Diseñá las 5 pantallas en Figma usando Auto Layout desde el primer elemento',
          'Creá al menos 5 componentes reutilizables y usá instancias en las pantallas',
          'Conectá todas las pantallas con un prototipo funcional usando las transiciones aprendidas',
          'Probá el prototipo con alguien externo sin explicarle nada — anotá qué no entiende o dónde se pierde',
        ],
        tip: 'Si al diseñar la pantalla 3 te das cuenta de que algo del user flow no tenía sentido, volvé a FigJam y actualizalo. El flujo y el diseño evolucionan juntos — no son dos etapas separadas que se hacen en secuencia perfecta. La iteración entre FigJam y Figma Design es el proceso real de diseño.',
        completed: false,
      },
      {
        id: 'up-m2',
        title: '[Mobile] Proyecto 2 — Básico: App de seguimiento de hábitos (6 pantallas)',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá desde cero una app de seguimiento de hábitos — uno de los proyectos más pedidos porque combina simplicidad de interfaz con complejidad de comportamiento. El desafío: hacer que registrar un hábito sea tan simple que se convierta en un hábito en sí mismo.\n\n## Las 6 pantallas a diseñar\n\n1. **Home — Vista de hoy**: lista de hábitos del día, estado de completado, racha actual, progreso\n2. **Agregar hábito**: nombre, icono o emoji, frecuencia, hora de recordatorio\n3. **Detalle de hábito**: historial del mes en calendario de puntos, racha, estadísticas\n4. **Estadísticas**: progreso semanal/mensual en gráfico de barras, mejor racha global\n5. **Perfil / Configuración**: nombre, avatar, notificaciones, tema claro/oscuro\n6. **Estado vacío**: pantalla cuando no hay hábitos creados — orientar, motivar, call to action\n\n## El proceso paso a paso\n\n**Fase 1 — Definí al usuario y el principio de diseño**\nEl usuario: profesional ocupado (25–35 años) que quiere 2–3 hábitos consistentes. Principio: "una acción, un tap" — registrar un hábito completado debe ser un solo tap en la home.\n\n**Fase 2 — User flow**\nMapeá en FigJam: crear hábito → ver en home → marcar completado → ver estadísticas.\n\n**Fase 3 — Sistema visual**\nElegí la dirección: minimalista monochrome (como Streaks) o colorido y gamificado (como Habitica). Define la paleta antes de diseñar. Regla: un color por hábito para diferenciación visual rápida.\n\n**Fase 4 — UI final + componentes**\nDiseñá la Home primero. Creá el componente "Habit Row" con variantes: completado / pendiente / saltado. Después aplicalo en el resto de pantallas.\n\n**Fase 5 — Prototipo**\nConectá las 6 pantallas con Smart Animate — especialmente el tap de "marcar completado" con feedback visual.',
        tasks: [
          'Definí el usuario, el principio de diseño y el sistema visual antes de abrir Figma',
          'Mapeá el user flow en FigJam — create habit → home → mark complete → stats',
          'Diseñá el componente "Habit Row" con variantes antes de construir la Home',
          'Diseñá las 6 pantallas incluyendo el estado vacío con call to action claro',
          'Construí el prototipo con Smart Animate para el gesto de completar hábito',
          'Publicá en Dribbble con el componente Habit Row + en Behance con el proceso completo',
        ],
        tip: 'La pantalla de estadísticas es donde muchos diseñadores se pierden en datos innecesarios. El usuario de una app de hábitos no necesita un analytics dashboard — necesita sentirse bien con su progreso. Priorizá el streak y el porcentaje de éxito sobre métricas complejas. La motivación emocional convierte en retención.',
        completed: false,
      },
      {
        id: 'up-m3',
        title: '[Mobile] Proyecto 3 — Intermedio: App de finanzas personales (9 pantallas)',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá una app de finanzas personales completa — uno de los espacios más competitivos en UX mobile. El reto: hacer que datos financieros complejos sean claros, accionables y no generen ansiedad. El diseño debe equilibrar densidad de información con claridad visual.\n\n## Las 9 pantallas a diseñar\n\n1. **Dashboard principal**: balance total, gastos del mes vs presupuesto, últimas transacciones, accesos directos\n2. **Lista de transacciones**: filtros por fecha/categoría, búsqueda, ítem con categoría + monto + fecha\n3. **Detalle de transacción**: monto, categoría con icono, comercio, fecha/hora, nota, editar/eliminar\n4. **Agregar transacción**: teclado numérico prominente, categoría con scroll horizontal, cuenta, nota\n5. **Vista de presupuestos**: barra de progreso por categoría, alerta si se superó el límite\n6. **Detalle de presupuesto**: historial del mes, comparación con mes anterior, transacciones de la categoría\n7. **Metas de ahorro**: tarjetas con progreso (ej: "Vacaciones — 65% completado"), contribución sugerida\n8. **Perfil y configuración**: cuentas vinculadas, notificaciones, moneda, privacidad\n9. **Alerta / Notificación**: modal de alerta (ej: "Superaste el 90% de tu presupuesto de comida")\n\n## El proceso paso a paso\n\n**Fase 1 — Arquitectura de la información**\nBuscá los onboardings de Fintual, Mint, YNAB para entender qué información priorizan. Definí qué ve el usuario primero al abrir la app.\n\n**Fase 2 — Sistema de color semántico**\nEl más importante del proyecto: verde = positivo/ingreso, rojo = alerta/límite superado, gris = transacción normal. NO uses rojo para todos los gastos — los gastos son normales, no errores.\n\n**Fase 3 — Componentes críticos**\nDiseñá primero: Transaction Row (el más repetido), Budget Progress Bar (estados: normal/warning/exceeded), Amount Display (con colores semánticos).\n\n**Fase 4 — Pantallas en orden de complejidad**\nComenzá por agregar transacción (más funcional), luego lista, luego dashboard. Terminá con resumen y configuración.',
        tasks: [
          'Investigá 3 apps de finanzas (Mint, Fintual, YNAB) y mapeá sus arquitecturas de información',
          'Definí el sistema de color semántico completo antes de diseñar',
          'Diseñá los 3 componentes críticos (Transaction Row, Budget Bar, Amount) antes de ensamblar pantallas',
          'Diseñá las 9 pantallas comenzando por la más funcional (agregar transacción)',
          'Agregá los estados de error y vacío para la lista de transacciones y el dashboard',
          'Conectá las 9 pantallas en prototipo completo y publicá el caso en Behance',
        ],
        tip: 'El diseño de finanzas tiene una trampa: usar rojo para gastos. Los gastos son normales — no son errores. Usar rojo para toda transacción de egreso crea ansiedad innecesaria. Usá rojo solo para alertas (presupuesto superado). El color rojo debe significar "necesitás actuar", no "gastaste dinero".',
        completed: false,
      },
      {
        id: 'up-d2',
        title: '[Desktop] Proyecto 7 — Básico: Portfolio personal editorial (4 páginas, 1440px)',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá un portfolio personal para vos mismo (o un personaje ficticio) como diseñador o desarrollador. En 10 segundos el visitante debe saber quién sos, qué hacés y querer ver tu trabajo. La dirección estética es editorial y tipográfica — menos es más.\n\n## Las 4 páginas a diseñar\n\n1. **Home**: hero con nombre + rol + frase de posicionamiento, grid de proyectos seleccionados (4–6), sección breve de skills, CTA para contacto\n2. **Proyecto — Detalle**: hero del proyecto (screenshot grande), context (cliente/rol/año), el problema, el proceso con imágenes, el resultado final\n3. **About**: foto o ilustración personalizada, bio en 3 párrafos (quién sos / qué hacés / qué te diferencia), experiencia, herramientas, qué buscás actualmente\n4. **Contact**: email + formulario simple, links a LinkedIn/GitHub/Dribbble, ubicación\n\n## La dirección de diseño\n\nEditorial minimalista: máximo espacio negativo, 2 fuentes (1 serif para nombre/headlines, 1 sans-serif para cuerpo), paleta de 3 colores (fondo/texto/acento), fotos del trabajo en blanco y negro o con overlay.\n\nReferencias: portafolios de Paco Coursey, Marc Edwards, Luro, o cualquier diseñador que trabaje en Linear, Vercel o Stripe.\n\n## El proceso\n\n1. Elegí los 4 proyectos que van al portfolio — la curaduría importa más que la cantidad\n2. Escribí la bio y el posicionamiento antes de abrir Figma\n3. Definí el par de fuentes y la paleta de 3 colores como estilos\n4. Diseñá la Home — es la que define el tono de todo\n5. Diseñá el detalle de proyecto y duplicalo para el resto',
        tasks: [
          'Elegí los 4–6 proyectos que van al portfolio — la curaduría define el posicionamiento',
          'Escribí la bio y el texto de posicionamiento antes de abrir Figma',
          'Definí el par de fuentes y la paleta de 3 colores como estilos de Figma',
          'Diseñá la Home completa en 1440px — es la que define el tono de todo el sitio',
          'Diseñá la página de Proyecto Detalle y aplicala a 2 proyectos diferentes',
          'Conectá las 4 páginas en prototipo con navegación completa y publicá en Behance',
        ],
        tip: 'El error más dañino en un portfolio es mostrar todo lo que hiciste. Un portfolio de 4 proyectos excelentes convierte mejor que uno de 12 mediocres. Los clientes y empleadores no buscan cantidad — buscan evidencia de que podés resolver problemas específicos. Cuanto más específico es tu portfolio, más fácil es para el cliente ideal contactarte.',
        completed: false,
      },
          {
        id: 'uiux-2-proj-basico',
        title: 'Proyecto Básico: Wireframes de una app de 5 pantallas',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Diseña los wireframes de baja fidelidad de una app simple en Figma. Solo estructura y flujo, sin color ni tipografía final.',
        deliverables: [
          '5 pantallas en baja fidelidad: home, pantalla principal de contenido, detalle, formulario y confirmación',
          'Flujo de usuario con arrows conectando las pantallas',
          'Notas de diseño en cada pantalla: qué hace cada elemento y por qué está ahí',
        ],
        tip: 'Los wireframes de baja fidelidad son deliberadamente simples. Si los estás haciendo bonitos, estás en el paso equivocado.',
        completed: false,
      },
      {
        id: 'uiux-2-proj-inter',
        title: 'Proyecto Intermedio: UI Kit + prototipo de alta fidelidad',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Diseña 8 pantallas de alta fidelidad de una app usando un UI Kit que creas tú mismo.',
        deliverables: [
          'UI Kit en Figma: paleta de color, escala tipográfica y mínimo 8 componentes (botones, inputs, cards, nav)',
          '8 pantallas en alta fidelidad usando el UI Kit definido',
          'Prototipo interactivo con los flujos principales conectados',
          'Link de Figma con "View only" habilitado',
        ],
        tip: 'Define el UI Kit antes de diseñar ninguna pantalla. Hacerlo al revés siempre genera inconsistencias.',
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
          '## La regla más importante antes de animar cualquier cosa\n\nEl error más común de los diseñadores que aprenden motion es animar todo lo que pueden. La regla es la contraria: **animá solo lo que tiene un propósito claro**.\n\nPropósitos válidos para una animación:\n- Guiar la atención hacia el elemento más importante\n- Confirmar que una acción del usuario fue recibida (feedback)\n- Explicar un cambio de estado (open/close, loading/loaded)\n- Dar sensación de jerarquía y orden de aparición\n\nSi una animación no cumple ninguno de estos propósitos, no va. Un hover bien ejecutado vale más que diez transiciones que no aportan claridad.\n\n## UI tradicional vs UI con motion intencional\n\n**UI tradicional**: estático, funcional, no da señales visuales de respuesta. El usuario interactúa pero no recibe confirmación visual inmediata.\n\n**UI moderno**: cada interacción tiene una respuesta visual. El sistema se siente vivo, responsivo, premium. La percepción de calidad aumenta aunque la funcionalidad sea idéntica.\n\n## Por qué el motion es un diferencial real\n\nLas herramientas de IA pueden generar UI estática en segundos. No pueden (todavía) decidir qué se mueve, cuándo, con qué curva, con qué delay, y con qué propósito. Ese juicio de diseño es el diferencial del diseñador humano en 2025–2026.',
        tasks: [
          'Abrí 3 apps distintas que uses y observá: ¿qué elementos se animan? ¿El motion tiene propósito o es decorativo?',
          'Identificá 2 animaciones con propósito claro y 2 que sean puramente decorativas — anotalas con capturas',
          'Revisá el sitio de alphadev.studio: ¿qué interacciones deberían tener feedback visual que hoy no tienen?',
          'Escribí en un párrafo tu criterio personal para decidir cuándo animar y cuándo no',
        ],
        tip: 'Antes de animar algo, hacete esta pregunta: "Si saco esta animación, ¿el usuario entiende menos o se confunde?" Si la respuesta es no, la animación es decorativa y probablemente debería reducirse o eliminarse. Si la respuesta es sí, es una animación con propósito.',
        completed: false,
      },
      {
        id: 'u7-l2',
        title: 'Visual style moderno: grid, layering y depth',
        type: 'practice',
        content:
          '## Por qué la base estática importa antes del motion\n\nLa animación sobre un diseño mediocre solo lo hace más notorio. Antes de agregar cualquier movimiento, el diseño estático tiene que sentirse moderno, intencionado y de alta calidad.\n\nTres elementos que diferencian un diseño moderno de uno genérico:\n\n## Grid no convencional\n\nLos diseños amateur colocan todos los elementos en una cuadrícula simétrica y predecible. Los diseños modernos tienen superposición deliberada: el headline invade la zona de la imagen, un elemento flota fuera del grid, hay asimetría controlada. Esto crea tensión visual positiva que hace que el ojo explore la pantalla.\n\n## Layering (profundidad)\n\nElementos que se solapan crean la sensación de que la interfaz tiene capas — profundidad. Una imagen que sobresale del card, un texto que se superpone a una foto, un elemento que "rompe" el contenedor. Cuando después animás con Smart Animate, el layering hace que la animación se vea cinematográfica.\n\n## Tipografía de alto contraste\n\nEl jump de tamaño entre el headline y el body text es lo que más diferencia un diseño premium de uno genérico. Si el headline es 16px y el body es 14px, no hay jerarquía. Si el headline es 64px y el body es 16px, hay impacto.\n\n## La tarea de referencia\n\nBuscá 5 heroes de sitios premiados en Awwwards.com. Tomá screenshot de cada uno y pegalo en un frame de Figma. Por cada uno, anotá: qué hace con el grid, cómo usa el layering, qué contraste tipográfico tiene. Luego reproducí los 5 heroes desde cero.',
        tasks: [
          'Buscá 5 heroes en Awwwards.com — elegí variedad (dark, light, tipográfico, con imágenes, con 3D)',
          'Pegá los screenshots en un frame de Figma y analizá por escrito el grid, layering y contraste tipográfico de cada uno',
          'Reproducí 2 de los 5 heroes desde cero en Figma — sin copiar, solo observar y recrear',
          'Aplicá al menos 1 elemento de layering y 1 de tipografía de alto contraste a un diseño tuyo existente',
        ],
        tip: 'Reproducir heroes ajenos es el ejercicio más valioso que existe para mejorar el ojo de diseño. No es plagiar — es el mismo proceso que hace un músico que transcribe canciones de otros para aprender técnica. Lo que aprendés reproduciendo un hero de Awwwards en 2 horas equivale a semanas de teoría.',
        completed: false,
      },
      {
        id: 'u7-l3',
        title: 'Timing y easing: las dos variables que lo deciden todo',
        type: 'reading',
        content:
          '## La fórmula base de toda animación\n\n**Estado Antes → (tween con curva y duración) → Estado Después**\n\nLa herramienta calcula los frames intermedios automáticamente. Lo que puede cambiar entre estados: posición, tamaño, rotación, opacidad, color, blur, border radius, sombras y layout.\n\n## Duraciones recomendadas\n\n- **Micro-interacciones** (hover, press, feedback de botón): 150–200ms\n- **Cambio de estado** (toggle, expand, collapse): 200–300ms\n- **Modal o panel lateral**: 250–400ms\n- **Transición de pantalla completa**: 300–500ms\n- **Flujos con stagger**: 800–1200ms total (con delays escalonados)\n\nMás de 500ms en una sola animación se siente lento. Más de 1200ms en un flujo completo fatiga al usuario.\n\n## Easing por tipo de animación\n\n- **Ease Out** (rápido al principio, suave al final): para **entradas** — el elemento llega rápido y se acomoda suave. Se siente natural.\n- **Ease In** (suave al principio, rápido al final): para **salidas** — arranca suave y termina rápido. El elemento desaparece con intención.\n- **Ease In-Out**: para transiciones de pantalla completa. Equilibrio entre entrada y salida.\n- **NUNCA Linear**: se ve mecánico, robótico, sin vida. Linear solo existe para objetos mecánicos reales.\n\n## Cómo configurar el easing en Figma\n\nEn la conexión del prototipo, hacé click en el ícono de curva. Seleccioná "Custom" y ajustá los handles del Bezier. La curva de AyzZ para el 90% de las animaciones: handle de entrada muy alto (ease out pronunciado), handle de salida pegado al final. Referencia visual: **easings.net**.',
        tasks: [
          'Creá una animación simple en Figma (un rectángulo moviéndose) con duración Linear y luego con Ease Out — notá la diferencia',
          'Reproducí el timing recomendado para 3 tipos distintos: hover de botón (150ms), modal (300ms), transición de pantalla (400ms)',
          'Configurá un Bezier custom en Figma siguiendo la curva de ease-out pronunciado — comparala con las curvas predefinidas',
          'Abrí easings.net y hacé click en al menos 8 curvas distintas para internalizar cómo se siente cada una',
        ],
        tip: 'El easing es la diferencia entre una animación que se siente digital y una que se siente física. Los objetos en el mundo real nunca se mueven en Linear — siempre aceleran y desaceleran. Cuando agregas easing correcto, el usuario siente que la UI obedece a la física, lo cual genera confianza instintiva en el producto.',
        completed: false,
      },
      {
        id: 'u7-l4',
        title: 'Smart Animate: estados Before → After',
        type: 'practice',
        content:
          '## Cómo funciona Smart Animate\n\n**Smart Animate** detecta elementos con el mismo nombre de capa en dos frames conectados y anima automáticamente las diferencias (posición, tamaño, opacidad, rotación, blur). Es el feature más poderoso de Figma para motion.\n\n**Regla crítica**: los nombres de capa en el frame Before y en el frame After deben ser **exactamente idénticos**. Si un layer se llama "Headline" en After y "headline" en Before, Smart Animate no lo empareja.\n\n## El workflow correcto\n\n1. Diseñá el **estado After primero** — el estado final en reposo, cómo se ve la UI cuando ya cargó completamente\n2. Duplicá el frame → renombralo "Before"\n3. En el frame Before, modificá las propiedades iniciales de cada elemento:\n   - **Headline** → `y +16–24px` + `opacity 0%`\n   - **Subhead** → `y +8–12px` + `opacity 0%` (con delay mayor)\n   - **CTA** → `scale 0.98` + `opacity 0%` → en After va a `scale 1` + `opacity 100%`\n   - **Imagen/Ilustración** → `scale 0.96` + `blur 8px` → en After: `scale 1` + `blur 0`\n4. En la pestaña Prototype, conectá Before → After con **Smart Animate** + tu easing custom\n\n## Errores comunes a evitar\n\n- Animar más de 4–5 elementos simultáneamente (el ojo no puede seguirlos)\n- Mover elementos más de 40px (se siente exagerado)\n- Usar Linear en el easing (regla de oro del módulo anterior)\n- Olvidar verificar que el orden de lectura se respeta: headline → subhead → CTA',
        tasks: [
          'Abrí uno de los tutoriales de AyzZ en los recursos del módulo y replicá la animación exacta paso a paso',
          'Aplicá el workflow Before → After a un hero que diseñaste: configurá los estados iniciales con los valores recomendados',
          'Conectá Before → After con Smart Animate y tu easing custom — reproducilo en Present mode',
          'Verificá que el orden de aparición de los elementos sigue la jerarquía de lectura (headline primero, CTA último)',
          'Hacé la misma animación con tu propio diseño — no copies la estructura del tutorial, aplicá los principios',
        ],
        tip: 'Diseñar el After primero es contraintuitivo pero crítico. Cuando diseñás el Before primero, tendés a animar lo que es fácil de mover, no lo que tiene propósito. Cuando empezás con el After — el diseño ya terminado y funcional — y luego definís desde dónde va a aparecer cada elemento, las decisiones de motion son mucho más deliberadas.',
        completed: false,
      },
      {
        id: 'u7-l5',
        title: 'Animar secciones completas: ritmo y jerarquía de scroll',
        type: 'reading',
        content:
          '## El problema de animar páginas completas\n\nCuando una página entera tiene animaciones, el riesgo es el caos visual: todo se mueve al mismo tiempo, en la misma dirección, con el mismo timing. El resultado es ruido — nada llama la atención porque todo compite.\n\nLa solución es **ritmo y jerarquía**: las animaciones de una página deben verse coordinadas, no simultáneas.\n\n## La fórmula por sección\n\n**1. Definí la jerarquía**: ¿qué elemento de la sección es más importante? Ese aparece primero y solo. Los demás lo siguen.\n\n**2. Aplicá stagger**: cuando hay varios elementos que aparecen juntos (por ejemplo, 3 cards en una fila), cada uno tiene un delay de **40–60ms** respecto al anterior. Nunca los tres al mismo tiempo.\n\n**3. Usá un patrón consistente**: si en el hero el texto aparece desde abajo, que en todas las secciones el texto también aparezca desde abajo. La consistencia crea la sensación de intencionalidad. El usuario no lo nota conscientemente, pero siente que el sitio está diseñado.\n\n**4. Limitá la concurrencia**: máximo 3 elementos animándose simultáneamente en cualquier momento. El resto espera o está quieto.\n\n## En Figma\n\nCreá un frame "Before" y uno "After" por cada sección. Conectalos con Smart Animate para simular el comportamiento on-scroll. Cuando vayas a producción, estos estados se implementan con intersection observers en código o con las herramientas de scroll animation de Webflow/Framer.',
        tasks: [
          'Elegí una landing page de referencia en Awwwards y analizá el ritmo de sus animaciones de scroll — ¿hay stagger? ¿Patrón consistente?',
          'Diseñá 2 secciones distintas de una landing (hero + features) y creá los estados Before/After para cada una',
          'Aplicá stagger manualmente: definí el delay de cada elemento (elemento 1: 0ms, elemento 2: 50ms, elemento 3: 100ms)',
          'Conectá las secciones en un flujo de prototipo y reproduci el resultado completo en Present mode',
        ],
        tip: 'El stagger de 40–60ms entre elementos es imperceptible como delay individual pero crea una sensación clara de que los elementos "saben" que los demás están ahí. Si el stagger es menor a 30ms, el ojo no distingue el orden. Si es mayor a 100ms, el flujo se siente lento. El rango 40–60ms es el sweet spot universal.',
        completed: false,
      },
      {
        id: 'u7-l6',
        title: 'Práctica: grabar el prototipo y prepararlo para portfolio',
        type: 'practice',
        content:
          '## El loop de publicación del diseñador moderno\n\nDiseñar → animar → grabar → editar → publicar. Este ciclo, repetido semana a semana, construye un portfolio en movimiento que demuestra habilidad en tiempo real. No necesitás proyectos terminados — necesitás prototipos de 10–20 segundos que muestren una interacción específica.\n\n## Setup de grabación\n\n**Herramientas**: Figma en Present mode + grabador de pantalla (OBS Studio en Windows/Linux, QuickTime en Mac, o Outplayed)\n\n**Preparación**: presentá el prototipo al 100% de zoom, cerrá apps pesadas, definí exactamente qué interacción vas a grabar antes de apretar record.\n\n**Configuración**:\n- Resolución: 1920×1080 (horizontal) o 1080×1920 (vertical para Reels)\n- FPS: **60 obligatorio** — las animaciones grabadas a 30fps pierden suavidad\n- Formato: MP4 H.264\n- Bitrate: 12–20 Mbps\n- Cursor: ocultalo si la animación es automática\n\n## Edición\n\nImportá el clip en un editor de video (CapCut, DaVinci Resolve, Premiere). Recortá los frames muertos al inicio y al final. Hacé crop ajustado para eliminar bordes del browser. Considerá hacer el video **loopeable**: que el último frame conecte suave con el primero.\n\n## Export por canal\n\n- **Reels/TikTok**: 1080×1920 vertical, 60fps\n- **Portfolio/YouTube**: 1920×1080, 60fps\n- **Dribbble/Behance**: 1600–1920px de ancho, 60fps',
        tasks: [
          'Grabá el prototipo animado que construiste en este módulo — mínimo una interacción de 10 segundos',
          'Editá el clip: recortá frames muertos, ajustá crop, verificá que el video esté suave al 60fps',
          'Exportá en formato horizontal (1920×1080) para portfolio y vertical (1080×1920) para Reels',
          'Publicá el clip en al menos una plataforma (Dribbble, Instagram, LinkedIn o TikTok)',
          'Posteá de nuevo la semana siguiente con una nueva interacción — establecé el ritmo de publicación',
        ],
        tip: 'Tu feed de diseño es tu portfolio en tiempo real. Un diseñador que publica semanalmente prototipos animados — aunque sean simples — demuestra más habilidad activa que uno que tiene un Behance con 3 case studies de hace 2 años. La cadencia importa tanto como la calidad individual de cada post.',
        completed: false,
      },
      {
        id: 'up-m5',
        title: '[Mobile] Proyecto 5 — Avanzado: App de bienestar con micro-animaciones (13 pantallas)',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá una app de bienestar (meditación, respiración, journal) con la capa de motion design documentada en Figma. Este es el proyecto más avanzado del track mobile porque combina UI completa + experiencia sensorial (calma visual, ritmo, espacio) + documentación de animaciones.\n\n## Las 13 pantallas a diseñar\n\n1. Splash / Loading — animación de la marca\n2. Onboarding 1 — propuesta de valor principal\n3. Onboarding 2 — beneficios con ilustración\n4. Onboarding 3 — personalización (¿cuántos minutos por día?)\n5. Home — saludo, sesión recomendada, accesos directos\n6. Meditación — Setup: selector de duración y ambiente sonoro\n7. Meditación — Activa: timer circular con animación de respiración, botón pausa\n8. Meditación — Completada: celebración suave, logro, calificar sesión\n9. Respiración: ejercicio box breathing con círculo animado (inhalar/sostener/exhalar)\n10. Journal — Nueva entrada: campo de texto, fecha, estado de ánimo, guardar\n11. Journal — Historial: lista de entradas con fecha, preview, estado de ánimo\n12. Estadísticas: racha, minutos totales, entradas de journal, mejor semana\n13. Perfil: foto, nombre, notificaciones, suscripción\n\n## Cómo documentar las animaciones en Figma\n\n**Smart Animate para transiciones**: capas con el mismo nombre entre frames para interpolación automática.\n\n**Página "Animation Specs"**: documento separado con cada animación: elemento, propiedad que cambia (opacity/scale/position), duración en ms, easing curve, descripción para el desarrollador.\n\n**Animaciones clave**:\n- Respiración: el círculo escala de 60px a 120px en 4 segundos con ease in-out\n- Celebración al completar: partículas suaves, 1.5s\n- Transiciones entre tabs: slide + fade\n- Onboarding: slide horizontal con parallax',
        tasks: [
          'Diseñá las 13 pantallas en UI final antes de trabajar en las animaciones',
          'Creá el prototipo con Smart Animate para las transiciones principales',
          'Diseñá la pantalla de meditación activa con el círculo de respiración animado',
          'Creá la página "Animation Specs" documentando cada animación con duración, easing y descripción',
          'Grabá un screen recording del prototipo mostrando las animaciones en acción',
          'Publicá el caso en Behance con pantallas, video del prototipo y la página de specs de animación',
        ],
        tip: 'En apps de bienestar, las animaciones no son decorativas — son funcionales. Una animación de respiración demasiado rápida genera ansiedad en lugar de calma. Testeá los timings en tu propio teléfono, no solo en el prototipo de Figma. 4 segundos para inhalar + 4 segundos para exhalar es el mínimo para generar efecto fisiológico real.',
        completed: false,
      },
    
    {
      id: 'uiux-7-p1',
      title: 'Proyecto: Moodboard de referencia visual',
      type: 'project',
      difficulty: 'básico',
      projectBrief: 'Crea un moodboard de 20-25 referencias visuales para un proyecto de diseño de tu elección. Organízalo por categorías (color, tipografía, composición, componentes). Explica en una frase por qué incluiste cada referencia.',
      deliverables: [
        'Moodboard en Figma, Milanote o similar',
        'Mínimo 20 imágenes organizadas por categoría',
        'Frase de justificación para cada imagen',
        'Paleta de colores extraída del moodboard',
      ],
      rubrica: [
        'Coherencia visual entre las referencias',
        'Categorización clara y lógica',
        'Extracción correcta de la paleta de colores',
      ],
      completed: false,
    },],
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
          '## El error de usar siempre la misma herramienta\n\nCada herramienta tiene un caso de uso óptimo. Usar Webflow para todo es tan ineficiente como usar código para todo. El diseñador moderno elige la herramienta correcta según el proyecto.\n\n## El mapa de decisión\n\n**Webflow** → Sitios de marketing con múltiples páginas, blogs con CMS, portfolios con colecciones de proyectos, sitios corporativos que un cliente va a actualizar solo. Requiere aprender su sistema de clases CSS visual — curva de aprendizaje de 1–2 semanas para diseñadores.\n\n**Framer** → Landing pages de alto impacto, portfolios personales, sitios con animaciones complejas y conexión directa con Figma. Genera React internamente. Menor curva de aprendizaje si ya sabés Figma. Menos flexible que Webflow para CMS complejo.\n\n**Código (Next.js)** → Cuando necesitás control total: lógica de negocio, autenticación, base de datos propia, escala real, integraciones de API. Es lo que construye AlphaDev Studios para clientes. La herramienta de máxima flexibilidad con máxima responsabilidad técnica.\n\n## Las preguntas para decidir\n\n- ¿El cliente va a actualizar el contenido solo? → Webflow (CMS visual)\n- ¿Necesitás animaciones premium en poco tiempo? → Framer\n- ¿Hay lógica de negocio, autenticación o BD? → Código\n- ¿Es un sitio estático de presentación? → Framer o Webflow (cualquiera)\n- ¿El presupuesto es muy limitado y necesitás ir rápido? → Framer',
        tasks: [
          'Listá 3 proyectos reales o hipotéticos y decidí qué herramienta usarías para cada uno y por qué',
          'Creá una cuenta gratuita en webflow.com y otra en framer.com — exploralas por 30 minutos cada una',
          'Buscá 3 sitios hechos en Webflow y 3 en Framer en sus galerías oficiales — ¿podés notar la diferencia de estilo?',
          'Elegí cuál vas a usar para la práctica final de este módulo (Webflow o Framer) y justificá la elección',
        ],
        tip: 'Framer tiene la curva de aprendizaje más corta si ya venís de Figma — la interfaz es casi idéntica. Si tenés 2 semanas para aprender y publicar algo, empezá con Framer. Webflow tiene más potencia a largo plazo pero necesita más tiempo de inversión inicial para dominarlo correctamente.',
        completed: false,
      },
      {
        id: 'u5-l2',
        title: 'Webflow: fundamentos de diseño visual con clases',
        type: 'reading',
        content:
          '## El concepto central de Webflow\n\nWebflow es CSS visual. Cada ajuste que hacés en el Style Panel genera CSS real en el background. Si entendés box model, flexbox y grid, aprender Webflow es mapear esos conceptos a una interfaz visual.\n\nSi no los entendés todavía, Webflow te va a enseñar CSS aunque no lo parezca.\n\n## La interfaz de Webflow\n\n**Navigator (panel izquierdo)**: el árbol de elementos de la página — equivalente al inspector de Chrome o las capas de Figma. Acá ves la estructura HTML de tu diseño.\n\n**Style Panel (panel derecho)**: las propiedades CSS del elemento seleccionado — layout (flexbox/grid), spacing (margin/padding), typography, borders, effects.\n\n**Canvas central**: el diseño en tiempo real, responsive y visual.\n\n## Clases: la lógica más importante de Webflow\n\nEn Webflow, los estilos se aplican mediante **clases CSS** (como en código). Un elemento puede tener una clase base + clases modificadoras. Esta lógica es poderosa pero requiere disciplina:\n\n- Nunca estilices el elemento "All H2s" directamente — creá clases específicas\n- Nomenclatura consistente: `Heading-Hero`, `Card-Blog`, `Button-Primary`\n- Evitá los estilos inline (el panel los llama "custom") — siempre usá clases\n\n## El punto de partida obligatorio\n\nAntes de tocar cualquier template, completá el **Webflow 101 Crash Course** en Webflow University. Es gratuito, tarda ~2 horas y cubre todo lo que necesitás para entender la lógica de la herramienta.',
        tasks: [
          'Completá el Webflow 101 Crash Course en university.webflow.com (link en recursos del módulo)',
          'Creá un proyecto vacío y construí una navbar simple con Webflow — logo a la izquierda, links en el centro, botón a la derecha',
          'Aplicá el sistema de clases correctamente: no uses estilos inline, usá clases con nombres claros',
          'Explorá el modo responsive: verificá que tu navbar se vea correctamente en tablet y mobile',
        ],
        tip: 'El error más común al empezar con Webflow es editar el elemento "Heading 2" o "Paragraph" en lugar de crear clases propias. Cuando hacés eso, estás cambiando el estilo de TODOS los heading 2 del sitio. Siempre seleccioná el elemento y dale un nombre de clase antes de aplicar cualquier estilo.',
        completed: false,
      },
      {
        id: 'u5-l2b',
        title: 'Mini-práctica: construí una navbar en Webflow',
        type: 'practice',
        content:
          '## El primer componente real en Webflow\n\nUna navbar parece simple pero hacerla bien en Webflow requiere entender el sistema de clases, el elemento Navbar nativo y el comportamiento responsive. Es el ejercicio más completo para aprender la lógica de la herramienta en poco tiempo.\n\n## La navbar a construir\n\n**Desktop**: logo a la izquierda + 3–4 links + botón CTA\n**Mobile**: logo + hamburger icon que abre un menú vertical\n\n## El proceso paso a paso\n\n1. Creá un proyecto nuevo en Webflow\n2. Insertá el elemento **Navbar** nativo (no un Div manual — el Navbar maneja el hamburger automáticamente en mobile)\n3. Reemplazá "Brand" por el logo de AlphaDev (imagen o texto con la fuente correcta)\n4. Actualizá los links con nombres y URLs reales\n5. Agregá el botón CTA y estilalo con clases propias\n6. Aplicá TODOS los estilos mediante clases — cero estilos custom/inline\n\n## La verificación responsive\n\nCambiá al breakpoint Mobile Small en el editor de Webflow. El hamburger debe funcionar y los links mostrarse en vertical sin configuración adicional.',
        tasks: [
          'Insertá el Navbar element y reemplazá el Brand por el logo de AlphaDev',
          'Actualizá los 3–4 links del menú con nombres y URLs reales de AlphaDev Studios',
          'Agregá y estilá el botón CTA usando una clase nombrada (ej: "nav-cta")',
          'Verificá en el Style Panel que no hay estilos custom/inline — todo debe estar en clases',
          'Revisá en Mobile Small que el hamburger funciona y los links se apilan correctamente',
        ],
        tip: 'El error más común en Webflow: crear Divs manuales para la navbar en lugar de usar el elemento Navbar nativo. El Navbar nativo ya tiene el comportamiento del hamburger integrado y funciona en mobile sin código adicional. Siempre preferí los elementos semánticos de Webflow sobre estructuras de Divs manuales.',
        completed: false,
      },
      {
        id: 'u5-l3',
        title: 'Webflow CMS e Interactions',
        type: 'reading',
        content:
          '## Los dos superpoderes de Webflow\n\nDespués de dominar el diseño básico, estos dos features son los que hacen que Webflow sea irreemplazable para ciertos proyectos.\n\n## Webflow CMS\n\nEl CMS de Webflow te permite crear **colecciones de contenido** con campos personalizados. Por ejemplo:\n\n- Colección "Proyectos" con campos: título, imagen, descripción, URL, tecnologías usadas\n- Colección "Blog Posts" con campos: título, categoría, fecha, contenido rich text, autor\n\nWebflow genera automáticamente:\n1. Una página de lista (ej: /proyectos) que muestra todas las entradas\n2. Una página de detalle (ej: /proyectos/nombre-del-proyecto) por cada entrada\n\nEl cliente puede agregar o editar contenido desde el Editor de Webflow sin tocar el diseño.\n\n## Webflow Interactions\n\nWebflow Interactions permite crear animaciones sin código:\n\n- **On Scroll**: fade-in-up, parallax, sticky elements al hacer scroll\n- **On Hover**: hover effects en cards, botones, imágenes\n- **On Click**: dropdowns, accordions, tabs\n- **Page load**: animación de entrada de la página\n\nEs posible recrear casi cualquier efecto de Linear.app o Stripe con Webflow Interactions bien configuradas. La curva de aprendizaje es más empinada que el diseño básico — pero el resultado compite con código personalizado.',
        tasks: [
          'Creá una colección CMS simple en Webflow: "Proyectos" con los campos título, descripción, imagen y tecnologías',
          'Diseñá la página de lista y la página de detalle usando elementos conectados al CMS',
          'Configurá al menos 1 Interaction on-scroll: un fade-in-up para las cards de la página de lista',
          'Aggregá 3 entradas de ejemplo en el CMS y verificá que el diseño se adapta a cada una',
        ],
        tip: 'El CMS de Webflow es el argumento de venta más fuerte para clientes que necesitan actualizar contenido solos. En lugar de cobrar por "hacer un sitio web", podés cobrar por "un sistema que el cliente puede mantener sin depender de vos". Eso cambia completamente la propuesta de valor — y el precio que podés cobrar.',
        completed: false,
      },
      {
        id: 'u5-l4',
        title: 'Framer: de Figma a sitio publicado con animaciones premium',
        type: 'reading',
        content:
          '## Por qué Framer es el paso natural después de Figma\n\nSi ya dominás Figma, Framer tiene la curva de aprendizaje más baja de todos los constructores web — su interfaz es casi idéntica: frames, capas, Auto Layout, componentes. La diferencia es que lo que diseñás en Framer se publica como un sitio real.\n\n## Los features clave de Framer\n\n**Import desde Figma**: copiás frames de Figma y los pegás en Framer. Funciona bien para estructura y estilos básicos. Las variables y componentes complejos de Figma requieren ajuste manual.\n\n**Breakpoints**: el sistema responsive de Framer es visual — diseñás cómo se ve en Desktop, Tablet y Mobile sin escribir media queries.\n\n**Scroll animations**: parallax, fade-in-up, sticky elements, zoom on scroll — todo configurado visualmente con el panel de animaciones de scroll. Sin código.\n\n**Code overrides**: cuando necesitás lógica personalizada, Framer permite conectar componentes React a cualquier elemento del diseño. El puente entre no-code y código real.\n\n**Publicación**: dominio propio con 1 click. El subdominio de Framer (tusite.framer.app) es gratuito — suficiente para portfolio y pruebas.\n\n## El límite de Framer\n\nFramer no tiene CMS robusto como Webflow. Para sitios con mucho contenido dinámico o e-commerce complejo, Webflow o código son mejores opciones. Framer brilla en landing pages, portfolios y sitios de presentación con animaciones premium.',
        tasks: [
          'Importá un frame de Figma a Framer y verificá qué elementos se trasladan bien y cuáles necesitan ajuste',
          'Configurá los breakpoints responsive: ajustá el diseño para que funcione en Desktop (1440px) y Mobile (390px)',
          'Aplicá al menos 2 scroll animations: 1 fade-in-up en una sección y 1 efecto parallax en una imagen',
          'Publicá el sitio con el subdominio gratuito de Framer y guardá el link',
        ],
        tip: 'Framer es la herramienta más rápida para pasar de "tengo el diseño en Figma" a "tengo un sitio publicado". Para una landing page de presentación, podés ir de Figma a Framer publicado en 2–3 horas si el diseño está limpio. Esta velocidad es un argumento de venta real para clientes que necesitan algo rápido y con calidad premium.',
        completed: false,
      },
      {
        id: 'u5-l4b',
        title: 'Mini-práctica: publicá tu primera landing en Framer',
        type: 'practice',
        content:
          '## De cero a publicado en 2 horas\n\nFramer tiene la relación más directa entre esfuerzo y resultado visible. Esta práctica termina con una URL pública que podés mostrar hoy.\n\n## El brief: 3 secciones para AlphaDev Studios\n\n**Sección 1 — Hero**: Headline + subheadline + botón CTA + imagen o elemento visual\n**Sección 2 — Features**: 3 beneficios con icono + título + descripción de 2 líneas\n**Sección 3 — CTA final**: Headline de cierre + botón\n\n## El proceso\n\n1. Creá un proyecto nuevo en Framer (o usá un template como base para aprender más rápido)\n2. Diseñá cada sección con el layout de Framer (similar a Figma pero con publicación directa)\n3. Agregá al menos 1 scroll animation en la Sección 2 (fade-in-up en los 3 features)\n4. Configurá el título de la página y la meta description en Settings > SEO\n5. Publicá con el subdominio gratuito (.framer.app) y guardá la URL\n\n## El criterio de completado\n\nAlguien puede visitar la URL, entender de qué trata el negocio en 5 segundos, y hacer click en el CTA sin ayuda.',
        tasks: [
          'Diseñá las 3 secciones con contenido real — cero Lorem Ipsum',
          'Configurá al menos 1 scroll animation en la sección de features',
          'Configurá título de página y meta description antes de publicar',
          'Publicá con el subdominio gratuito y guardá la URL',
          'Abrí la URL en tu celular y verificá que se ve correctamente en mobile',
        ],
        tip: 'Si la landing no se ve bien en mobile, el problema casi siempre es el mismo: elementos con ancho fijo en px en lugar de Fill o porcentaje. Para que algo ocupe todo el ancho en mobile, el width debe estar en Fill. Revisá todos los contenedores principales si algo se corta o desborda.',
        completed: false,
      },
      {
        id: 'u5-l5',
        title: 'Publicación, dominio y SEO básico en Webflow/Framer',
        type: 'reading',
        content:
          '## El checklist pre-publicación\n\nAntes de hacer público cualquier sitio, completá este checklist:\n\n**Contenido**:\n- Título de página (aparece en la pestaña del browser y en Google): 50–60 caracteres\n- Meta description (aparece en los resultados de Google): 150–160 caracteres con keywords principales\n- OG Image (la imagen que aparece al compartir en redes): 1200×630px, menos de 500KB\n- Alt text en todas las imágenes (accesibilidad + SEO)\n\n**Técnico**:\n- Sitemap XML: Webflow lo genera automáticamente. En Framer está en Configuración > SEO.\n- Robots.txt: que el sitio sea indexable (no tenga `noindex`)\n- Google Search Console: conectalo al dominio para monitorear el posicionamiento orgánico\n\n## Dominio propio\n\nAmbas herramientas permiten conectar un dominio externo o comprar uno internamente:\n- Dominio en Namecheap/Vercel: $14–19 USD/año\n- Plan mínimo pago de Webflow o Framer para dominio propio: ~$15–25 USD/mes\n\n## Webflow vs Framer: SEO\n\n**Webflow**: control total de SEO por página, sitemap automático, redireccionamientos 301, integración con Google Search Console y Analytics nativa.\n\n**Framer**: SEO panel por página, robots.txt configurable, analytics integrado de Framer. Menos granular que Webflow pero suficiente para la mayoría de los casos.',
        tasks: [
          'Completá el checklist de SEO pre-publicación para el sitio que armaste en la lección anterior',
          'Escribí un título de página y meta description optimizados para alphadev.studio (o el sitio del proyecto)',
          'Generá o subí una OG Image de 1200×630px y configurala en Webflow o Framer',
          'Conectá el sitio a Google Search Console después de publicar',
        ],
        tip: 'La meta description no mejora el ranking directamente, pero mejora el CTR en los resultados de Google — que sí mejora el ranking. Escribila como un anuncio de 2 líneas: qué hacés, para quién, qué beneficio obtenés. Evitá listas de servicios — usá una oración que haga que el usuario quiera hacer click.',
        completed: false,
      },
      {
        id: 'u5-l5b',
        title: 'Mini-práctica: configurá el SEO básico del sitio publicado',
        type: 'practice',
        content:
          '## El checklist en 30 minutos\n\nEl SEO básico no requiere ser experto — requiere completar un checklist antes de publicar. Esta práctica aplica el checklist a la landing del módulo anterior.\n\n## Los 5 puntos obligatorios\n\n**1. Título de página** (Settings > SEO > Title):\n- Máximo 60 caracteres\n- Formato: "Keyword principal — Nombre de marca"\n- Ej: "Desarrollo web con IA — AlphaDev Studios"\n\n**2. Meta description** (Settings > SEO > Description):\n- 150–160 caracteres\n- Una oración: valor + quién lo ofrece + keyword natural\n\n**3. OG Image** (imagen que aparece al compartir en redes):\n- 1200×630px\n- Incluí nombre o logo en la imagen\n\n**4. Alt text en imágenes**:\n- Toda imagen debe tenerlo — no "imagen1.jpg"\n- Descriptivo: "Dashboard de AlphaDev Studios mostrando métricas de cliente"\n\n**5. Google Search Console**:\n- Creá una propiedad y verificala con el método HTML tag\n- Enviá el sitemap (Framer y Webflow lo generan automáticamente)',
        tasks: [
          'Configurá el título de página y meta description en Framer o Webflow',
          'Asignaste una OG Image de 1200×630px al sitio',
          'Verificá que todas las imágenes tienen alt text descriptivo',
          'Creá la propiedad en Google Search Console y verificala',
        ],
        tip: 'La meta description no mejora el ranking directamente, pero mejora el CTR — que sí mejora el ranking. Escribila como un anuncio de 2 líneas: qué hacés, para quién, qué beneficio obtenés. Evitá listas de servicios — usá una oración que haga que el usuario quiera hacer click.',
        completed: false,
      },
      {
        id: 'u5-l6',
        title: 'Práctica: publicar una landing page real con Framer o Webflow',
        type: 'practice',
        content:
          '## El entregable: un sitio publicado y accesible\n\nEsta práctica cierra el módulo con algo concreto: una landing page real con URL pública. No un prototipo de Figma — un sitio que cualquier persona puede visitar hoy.\n\n## Los requisitos mínimos\n\nElegí Framer o Webflow y publicá una landing page con:\n\n- **Header**: headline principal + subheadline + CTA\n- **3 secciones de contenido**: features, servicios, o propuesta de valor\n- **CTA final**: llamada a la acción antes del footer\n- **Footer**: links básicos + datos de contacto\n\n**Requisitos técnicos**:\n- Responsive en mobile (probalo en Chrome DevTools al menos)\n- Al menos 1 animación on-scroll\n- Título de página y meta description configurados\n- URL pública (el subdominio gratuito de Framer/Webflow está bien para esta práctica)\n\n## Qué usar como contenido\n\nUsa AlphaDev Studios como cliente ficticio, o un proyecto tuyo. El contenido puede ser placeholder si no está definido todavía — lo importante es el proceso técnico de construcción y publicación.\n\n## Bonus\n\nConectá el formulario de contacto a Notion, Airtable o email usando Framer Forms o Webflow Forms. Verificá que una entrada de formulario de prueba llega correctamente antes de publicar.',
        tasks: [
          'Construí la estructura completa: header, 3 secciones, CTA final, footer — en Framer o Webflow',
          'Verificá el diseño en mobile antes de publicar — ajustá lo que se rompa',
          'Publicá el sitio y guardá el link accesible',
          'Completá el checklist de SEO: título, meta description, OG image',
          'Compartí el link con alguien y pedile que te diga qué no entiende de la primera pantalla — anotá el feedback',
        ],
        tip: 'El subdominio gratuito de Framer (.framer.app) o de Webflow (.webflow.io) es suficiente para agregar al portfolio. Cuando muestres el trabajo, lo que importa es que se pueda visitar en vivo — no que tenga el dominio definitivo. Un sitio publicado dice más que un mockup de Figma.',
        completed: false,
      },
      {
        id: 'up-r1',
        title: '[Responsive] Proyecto 11 — Básico: Sitio de restaurante o cafetería (8 pantallas)',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá el sitio web de un restaurante o cafetería en desktop (1440px) y mobile (390px). El brief es claro, el contenido es concreto y las restricciones son conocidas. Ideal para demostrar que sabés adaptar diseños entre breakpoints manteniendo la identidad visual.\n\n## Las 4 páginas × 2 breakpoints = 8 pantallas\n\n**Home**\n- Desktop: hero full-screen con foto de ambiente + nombre/tagline/CTA, platos destacados en grid de 3, sobre nosotros (texto + foto), botón al menú\n- Mobile: hero compacto, platos en scroll horizontal (cards), sobre nosotros apilado\n\n**Menú**\n- Desktop: sidebar con categorías fijas + platos en 2 columnas con foto/nombre/descripción/precio\n- Mobile: tabs horizontales de categorías + lista vertical de platos\n\n**Reservas**\n- Desktop: formulario (fecha/hora/personas/nombre/email/notas) en 2 columnas, info del restaurant al lado\n- Mobile: formulario de una columna a pantalla completa\n\n**Contacto**\n- Desktop: mapa embebido grande + datos de contacto en panel lateral + redes sociales\n- Mobile: mapa compacto arriba, datos apilados abajo\n\n## El proceso responsivo\n\n1. Diseñá las 4 páginas desktop completas\n2. Definí cómo cambia cada sección en mobile: ¿qué se apila? ¿qué desaparece? ¿qué se convierte en scroll horizontal?\n3. Diseñá las 4 páginas mobile con Auto Layout para adaptación estructural\n4. Conectá ambas versiones en prototipos separados',
        tasks: [
          'Elegí el restaurante y definí la identidad visual: paleta, tipografía, estilo de fotografía',
          'Diseñá las 4 páginas desktop completas antes de pasar a mobile',
          'Armá un mapa de adaptación responsiva: para cada sección, cómo cambia en mobile',
          'Diseñá las 4 páginas mobile usando Auto Layout para adaptación estructural',
          'Creá dos prototipos: desktop (scroll) y mobile (navegación en hamburger menu)',
          'Publicá las 8 pantallas en Behance con desktop y mobile lado a lado',
        ],
        tip: 'El menú es el componente más difícil de hacer responsivo en sitios de restaurante. En desktop caben 2–3 columnas de platos. En mobile, una lista vertical funciona mejor que intentar mantener el grid. Responsivo no significa "más chico" — significa "diferente y optimizado para cada pantalla".',
        completed: false,
      },
      {
        id: 'up-r3',
        title: '[Responsive] Proyecto 13 — Intermedio: E-commerce completo (10 pantallas)',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá un e-commerce completo desde el home hasta la confirmación de compra — en desktop (1440px) y mobile (390px). El e-commerce es el tipo de proyecto más pedido en entrevistas de diseño de producto porque combina exploración, decisión de compra y checkout, cada uno con sus propios desafíos de UX.\n\n## Las 5 páginas × 2 breakpoints = 10 pantallas\n\n**Home**\n- Desktop: hero con oferta + CTA, 3 categorías en grid, productos destacados en grid de 4, banner de propuesta de valor\n- Mobile: hero simplificado, categorías en scroll horizontal, grid de 2\n\n**Listado de productos (PLP)**\n- Desktop: sidebar de filtros fija + grid de 3 columnas + sort en header + paginación\n- Mobile: filtros como bottom sheet, grid de 2 columnas, sort como modal\n\n**Detalle de producto (PDP)**\n- Desktop: galería (izquierda, scroll vertical) + info (derecha sticky): nombre/precio/rating/selectores/agregar al carrito/descripción/reviews\n- Mobile: galería swipeable en carrusel, todo apilado, botón "Agregar" fijo al fondo\n\n**Carrito**\n- Desktop: lista de productos (2/3 pantalla) + order summary sticky (1/3)\n- Mobile: lista full-width + order summary expandible\n\n**Checkout (3 pasos: Envío → Pago → Revisión)**\n- Desktop: stepper visible + formulario izquierda + order summary derecha\n- Mobile: un paso por pantalla, nav prev/next al fondo\n\n## Reglas de checkout\n\nMínimos campos requeridos. Errores de validación inline — no esperar al submit. Progress indicator siempre visible. Opción "Continuar como invitado" antes de pedir registro.',
        tasks: [
          'Mapeá el flujo de 5 páginas en FigJam e identificá puntos de fricción en el checkout',
          'Diseñá la Product Detail Page primero — es la más compleja y la que más impacta la conversión',
          'Diseñá el checkout con los 3 pasos en desktop priorizando mínima fricción',
          'Adaptá todas las páginas a mobile con filtros como bottom sheet y PDP con galería swipeable',
          'Diseñá el botón "Agregar al carrito" en mobile como elemento fixed al fondo',
          'Publicá el caso mostrando el flujo PDP → Carrito → Checkout en ambos breakpoints',
        ],
        tip: 'El campo de código de descuento en el checkout es psicológicamente peligroso. Al verlo, muchos usuarios salen a buscar un cupón en Google y nunca vuelven. La solución: escondé el campo detrás de un link "¿Tenés un código?" que se expande solo si el usuario lo toca. Así existe para quienes lo tienen, pero no distrae a quienes no.',
        completed: false,
      },
      {
        id: 'up-r4',
        title: '[Responsive] Proyecto 14 — Intermedio: Sitio de agencia o consultora (10 pantallas)',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá el sitio web de una agencia digital o consultora en desktop (1440px) y mobile (390px). Este es el tipo de sitio más relevante para tu propio portafolio — podés usarlo como pieza dual: proyecto de portafolio y propuesta real para AlphaDev Studios.\n\n## Las 5 páginas × 2 breakpoints = 10 pantallas\n\n**Home**\n- Desktop: hero con headline de propuesta de valor específica + CTA + logos de clientes, 3 servicios en cards, 2 case studies en highlight, testimonio, proceso en 3 pasos, CTA final\n- Mobile: mismo contenido apilado, hero compacto, servicios en cards full-width\n\n**Servicios**\n- Desktop: grid de 6 servicios con icono + nombre + descripción\n- Mobile: lista vertical con borde separador\n\n**Portafolio + Detalle de case study**\n- Desktop: grid de 4–6 case studies con foto/cliente/categoría/resultado clave\n- Detalle: contexto del cliente, el desafío, el approach, el resultado con números, testimonial\n- Mobile: lista vertical de proyectos, detalle en pantalla completa\n\n**Proceso**\n- Desktop: timeline horizontal de 5 fases con icono/nombre/descripción/duración\n- Mobile: timeline vertical con las mismas fases\n\n**Contacto**\n- Desktop: formulario en panel izquierdo + contacto directo (email/WhatsApp/Calendly) en panel derecho\n- Mobile: formulario full-width, contacto directo al fondo\n\n## Trust signals obligatorios\n\nLogos de clientes, resultados específicos con números ("Redujimos el costo por lead en 40%"), nombre y foto real del fundador, proceso transparente.',
        tasks: [
          'Elegí o inventá 3 case studies con resultados numéricos específicos antes de diseñar',
          'Diseñá la Home desktop completa con todos los trust signals incorporados',
          'Diseñá el detalle de case study — es la página más persuasiva del sitio',
          'Diseñá el proceso como timeline horizontal en desktop y vertical en mobile',
          'Adaptá las 5 páginas a mobile con los cambios de layout estructurales',
          'Publicá el caso en Behance presentándolo como propuesta real de diseño',
        ],
        tip: 'La sección de proceso es el elemento más ignorado y el más poderoso en sitios de agencias. Cuando un cliente ve los 5 pasos de cómo trabajás, deja de preguntarse cómo sería trabajar con ellos y empieza a pensar cuándo empezamos. La transparencia de proceso elimina la incertidumbre que es la principal barrera para contratar una agencia desconocida.',
        completed: false,
      },
          {
        id: 'uiux-5-proj-pro',
        title: 'Proyecto Profesional: Design System completo',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: 'Crea un design system completo para una marca digital. Debe ser suficientemente robusto para que otro diseñador construya interfaces nuevas sin preguntar nada.',
        deliverables: [
          'Tokens de diseño: color (brand + semantic + component), tipografía, espaciado y radius',
          'Componentes atómicos: botones (todos los estados), inputs, badges, avatars',
          'Componentes moleculares: cards (3 variantes), navigation (desktop + mobile), modals',
          'Documentación: cuándo usar cada componente, variantes y ejemplos correcto/incorrecto',
          'Handoff para devs: naming convention y guía de implementación',
        ],
        rubrica: [
          'Los tokens tienen nivel semántico (no solo hex codes)',
          'Los componentes tienen al menos 3 estados documentados',
          'La documentación permite usar el sistema sin consultar al diseñador',
          'El naming es consistente y predecible en todo el sistema',
        ],
        tip: 'Un design system que no se usa es solo un archivo bonito. Valídalo construyendo una pantalla real antes de declararlo terminado.',
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
          '## El estándar de la industria para motion design\n\n**After Effects** es la herramienta de referencia para motion graphics y animación en la industria. No necesitás dominarla completamente — como diseñador UI, el foco está en un subconjunto específico de funcionalidades.\n\n## Qué SÍ necesitás aprender\n\n- **Animaciones de interfaz**: micro-interacciones, loading states, feedback visual, transiciones entre pantallas\n- **Motion graphics para redes**: animaciones de 5–15 segundos para Instagram Reels, TikTok o LinkedIn\n- **Exportación a Lottie**: convertir tus animaciones en JSON para usarlas en web y mobile sin código pesado\n\n## Qué NO necesitás dominar (todavía)\n\n- Compositing de video con footage real\n- VFX y efectos especiales\n- 3D complejo (Cinema 4D, Element 3D)\n- Rotoscoping y tracking de movimiento\n\n## La interfaz de After Effects\n\n**Project Panel** (izquierda): donde importás assets (imágenes, videos, archivos de Figma, audio)\n\n**Composition Panel** (centro): el preview en tiempo real de tu animación\n\n**Timeline** (abajo): el eje temporal donde colocás keyframes y manejás las capas\n\n**Panels de herramientas** (derecha): efectos, controles de capa, herramientas de render\n\n## Cómo acceder\n\nDescargá After Effects desde Adobe Creative Cloud. Tiene un **trial gratuito de 7 días**. Después cuesta ~$55 USD/mes solo o viene incluido en el plan completo de Creative Cloud a ~$60 USD/mes.',
        tasks: [
          'Descargá After Effects e instalalo desde Adobe Creative Cloud (trial gratuito disponible)',
          'Explorá la interfaz: identificá el Project Panel, el Composition Panel y el Timeline',
          'Creá tu primera composición: File > New > New Composition, 1080×1080px, 30fps, 5 segundos',
          'Importá un elemento simple (un PNG de Figma) y colocalo en la composición',
        ],
        tip: 'No necesitás comprar Adobe Creative Cloud completo para aprender AE. El trial de 7 días alcanza para hacer las prácticas de este módulo. Cuando termines el trial y quieras seguir, buscá el plan "Single App" de After Effects — es más barato que el paquete completo.',
        completed: false,
      },
      {
        id: 'u6-l2',
        title: 'Conceptos clave: keyframes, easing y el gráfico de velocidad',
        type: 'reading',
        content:
          '## Los keyframes: el fundamento de toda animación\n\nUn **keyframe** marca el valor de una propiedad en un momento específico del tiempo. After Effects interpola automáticamente los valores entre dos keyframes — eso es la animación.\n\nPropiedades animables de cualquier capa:\n- **Position**: dónde está el elemento en el espacio\n- **Scale**: qué tan grande o pequeño\n- **Rotation**: ángulo de rotación\n- **Opacity**: transparencia\n- **Anchor Point**: el punto desde donde se escala y rota\n\nPara crear un keyframe: seleccioná la propiedad en el Timeline, presioná el reloj (stopwatch) para activarla, mové el cursor de tiempo y cambiá el valor.\n\n## Easing en After Effects\n\nIgual que en Figma, el easing Linear se ve mecánico. En AE:\n\n**Easy Ease (F9)**: aplica easing suave en ambas direcciones — buen punto de partida para casi todo.\n\n**Easy Ease In / Easy Ease Out**: easing solo en la entrada o en la salida.\n\n**Graph Editor**: el nivel avanzado. Muestra la curva de velocidad como un gráfico Bezier editable. Acá podés crear easings totalmente personalizados — el mismo concepto que el Bezier de Figma, pero con más precisión.\n\n## La regla del gráfico de velocidad\n\nPara una animación natural: la velocidad al principio debe ser alta (el elemento arranca rápido) y la velocidad al final debe ser baja (llega suave). Esto es un Ease Out. Para una salida natural: velocidad baja al principio, alta al final (Ease In).',
        tasks: [
          'Animá un rectángulo moviéndose de izquierda a derecha: primero con Linear, luego con Easy Ease — notá la diferencia',
          'Abrí el Graph Editor y ajustá manualmente los handles para crear un ease-out pronunciado',
          'Animá 3 propiedades simultáneamente en el mismo elemento: posición, escala y opacidad',
          'Exportá la animación como video con Media Encoder (MP4, 1080px, H.264)',
        ],
        tip: 'El Graph Editor es la herramienta que separa el motion design amateur del profesional. La mayoría de los principiantes lo evita porque parece complejo. Dedicale 30 minutos específicamente al Graph Editor — sin intentar hacer nada más — y vas a entender el 80% de lo que necesitás saber en esa única sesión.',
        completed: false,
      },
      {
        id: 'u6-l3',
        title: 'Micro-animaciones de UI: botones, loaders, iconos',
        type: 'practice',
        content:
          '## Por qué las micro-animaciones son el diferencial de UI\n\nLas micro-animaciones son respuestas visuales a las acciones del usuario — botones que responden al click, loaders que indican progreso, íconos que confirman una acción completada. Son pequeñas pero crean la diferencia entre una interfaz que se siente construida y una que se siente viva.\n\n## Las 3 animaciones de esta práctica\n\n**Animación 1 — Botón con estados**: Default → Hover (scale 1.02, color cambio) → Click (scale 0.98, depressed) → Success (checkmark aparece, color verde). Usá Shape Layers para el checkmark — se anima con Trim Path.\n\n**Animación 2 — Loader circular**: Un círculo con rotación infinita y Trim Path animado (el arco que crece y achica). Es el loader estilo iOS/Android. Propiedades: Start y End del Trim Path animados con offsets de tiempo.\n\n**Animación 3 — Ícono hamburguesa → X**: Tres líneas horizontales que se transforman en una X. La línea del medio desaparece (opacity 0), las otras dos rotan 45° en direcciones opuestas desde el centro.\n\n## Por qué usar Shape Layers\n\nLas **Shape Layers** son vectoriales, livianas y se exportan perfectamente a Lottie. Evitá usar imágenes PNG o PSD para elements que van a animarse — las Shape Layers son la opción correcta para UI motion.',
        tasks: [
          'Animá el botón con sus 4 estados (Default → Hover → Click → Success) usando Shape Layers y Trim Path',
          'Creá el loader circular: círculo con Trim Path animado + rotación infinita',
          'Animá el ícono hamburguesa → X con rotación de líneas y desaparición de la línea central',
          'Revisá que todas las animaciones usen easing correcto (no Linear en ninguna)',
          'Exportá las 3 animaciones como videos MP4 para tener un preview limpio',
        ],
        tip: 'El Trim Path es el feature de After Effects más útil para diseñadores UI. Te permite animar cualquier path vectorial como si se estuviera dibujando. Un checkmark que se dibuja solo al completar una acción, un círculo de progreso que crece, líneas que aparecen — todo se hace con Trim Path. Dedicale tiempo a entenderlo bien.',
        completed: false,
      },
      {
        id: 'u6-l4',
        title: 'Lottie + Bodymovin: exportar animaciones para web y mobile',
        type: 'reading',
        content:
          '## Qué es Lottie\n\n**Lottie** es un formato de animación basado en JSON desarrollado por Airbnb. Convierte animaciones de After Effects en archivos JSON livianos que se reproducen a 60fps nativamente en web (usando lottie-web), iOS y Android.\n\nUn archivo Lottie de una animación de 3 segundos pesa típicamente 10–50KB — vs un GIF equivalente que puede pesar 500KB–2MB. Esa diferencia de peso es crítica para performance web.\n\n## El flujo de exportación\n\n**Paso 1**: Instalá el plugin **Bodymovin** en After Effects\n- Descargalo como ZXP desde aescripts.com/bodymovin/\n- Instalalo con el ZXP Installer (gratuito)\n- En AE: Window > Extensions > Bodymovin\n\n**Paso 2**: Diseñá la animación usando solo elementos compatibles:\n- Shape Layers ✅\n- Solids con efectos básicos ✅\n- Text layers ✅ (con restricciones)\n- Plugins de terceros ❌ (no exportan)\n- Efectos complejos de AE (blur, glow, etc.) ❌ (o exportan mal)\n\n**Paso 3**: Exportá con Bodymovin → genera el archivo `.json`\n\n## Dónde usarlo\n\n- **Framer**: componente Lottie nativo — pegás el JSON directamente\n- **Webflow**: widget de Lottie en el panel de componentes\n- **React**: librería `lottie-react` o `@lottiefiles/react-lottie-player`\n- **HTML puro**: librería `lottie-web` con 3 líneas de JS',
        tasks: [
          'Instalá Bodymovin en After Effects y verificá que aparece en Window > Extensions',
          'Exportá el loader circular de la lección anterior como Lottie .json',
          'Verificá la animación en lottiefiles.com (podés subir el .json y previsualizarlo)',
          'Embedí el .json de Lottie en el proyecto de Framer que publicaste en el módulo anterior',
          'Exportá también el botón con estados y el ícono hamburguesa → X como Lottie',
        ],
        tip: 'Antes de exportar a Lottie, previsualizá la animación en LottieFiles.com para verificar que se ve correctamente. Algunos efectos de AE no se exportan bien — es mejor descubrirlo antes de que el desarrollador te diga que la animación no funciona en producción.',
        completed: false,
      },
      {
        id: 'u6-l5',
        title: 'Transiciones de pantalla y storytelling en motion',
        type: 'reading',
        content:
          '## Las transiciones como lenguaje de navegación\n\nLas transiciones entre pantallas no son decorativas — son orientación espacial para el usuario. Dicen: "esto que apareció vino de aquí" y "esto que desapareció fue para allá". Sin ese lenguaje, la interfaz se siente desorientante aunque funcione correctamente.\n\n## Los principios de transiciones bien hechas\n\n**Dirección con significado**: los elementos deben aparecer de un lugar lógico:\n- Modal o panel → desde abajo\n- Detalle de ítem → desde la derecha\n- Volver atrás → desde la izquierda\n- Overlay (notificación) → desde arriba\n\n**Duración ajustada**: 200–350ms para transiciones de UI. Más largo se siente lento y distrae. Más corto se siente abrupto y confuso.\n\n**Stagger en el contenido**: cuando una pantalla aparece con múltiples elementos, no todos aparecen al mismo tiempo. El primer elemento entra, los demás lo siguen con un delay de 30–50ms cada uno. El resultado es que la pantalla se "arma" frente al usuario.\n\n## El continuity cut\n\nEn motion design avanzado, el elemento de transición puede ser el mismo elemento de la pantalla anterior — por ejemplo, la imagen de una card que se expande para convertirse en el hero de la pantalla de detalle. Es la transición más sofisticada y la que más justifica usar After Effects en lugar de Figma.',
        tasks: [
          'Tomá 2 pantallas del prototipo que diseñaste en Figma e importalas en AE como PNG',
          'Animá la transición entre ellas: la pantalla 1 sale hacia la izquierda mientras la pantalla 2 entra desde la derecha',
          'Aplicá stagger en los elementos de la pantalla 2 (titulos, imágenes, botones aparecen en secuencia)',
          'Exportá la transición como MP4 y evaluá si se siente natural o abrupta',
        ],
        tip: 'La regla más importante de las transiciones: si el usuario tiene que pensar en la transición, la transición está mal. Una buena transición es tan fluida que el usuario no la nota conscientemente — pero la siente. Cuando alguien dice "la app se siente premium" muchas veces está describiendo transiciones bien hechas sin saberlo.',
        completed: false,
      },
      {
        id: 'u6-l6',
        title: 'Práctica: kit de animaciones UI listo para usar',
        type: 'practice',
        content:
          '## El entregable: un asset reutilizable para proyectos reales\n\nEsta práctica produce algo concreto que podés reusar en cualquier proyecto futuro: un kit de 5 animaciones Lottie listas para producción.\n\nNo es un ejercicio de práctica descartable — es un activo real. Cuando trabajés en un proyecto de Framer, Webflow o Next.js, tendrás estas animaciones disponibles sin necesidad de rehacerlas.\n\n## Las 5 animaciones del kit\n\n**1. Loading spinner**: círculo con Trim Path y rotación infinita. El estándar para cualquier estado de carga.\n\n**2. Checkmark de éxito**: un checkmark que se dibuja solo (Trim Path), con un círculo de fondo que aparece. Para confirmaciones, formularios enviados, pagos completados.\n\n**3. Error shake**: un elemento que sacude horizontalmente — la misma animación que usás cuando una contraseña es incorrecta. Opcional: agregar un ícono de error que aparece.\n\n**4. Card fade + slide up**: una card que entra desde abajo con fade. Es la animación de entrada más usada en listas y grillas. Loop de 1 vez.\n\n**5. Ícono animado**: cualquier ícono de tu elección que tenga un estado animado — like (corazón que pulsa), share, bookmark, etc.\n\n## Entrega\n\nExportá los 5 archivos como `.json` de Lottie. Guardá todos en una carpeta en Google Drive o Notion con el nombre "UI Animation Kit". Agregá el link al kit en tu portfolio.',
        tasks: [
          'Creá los 5 archivos de animación en After Effects usando solo Shape Layers',
          'Exportalos todos como Lottie .json usando Bodymovin',
          'Verificalos en lottiefiles.com — asegurate de que se ven correctamente y son loopeable donde corresponde',
          'Subí los archivos a una carpeta compartible en Drive y guardá el link',
          'Embedí al menos 2 de las animaciones en el proyecto de Framer o Webflow publicado',
        ],
        tip: 'Un kit de animaciones Lottie es algo que pocos diseñadores tienen y que los developers aprecian enormemente. Cuando trabajés con un equipo de desarrollo, entregar animaciones listas en formato Lottie en lugar de videos o GIFs marca la diferencia — los developers pueden integrarlas directamente sin rehacer el trabajo.',
        completed: false,
      },
      {
        id: 'up-m4',
        title: '[Mobile] Proyecto 4 — Intermedio: App de delivery de comida (11 pantallas)',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá el flujo completo de una app de delivery — desde explorar restaurantes hasta confirmar el pedido. Este proyecto es uno de los más complejos en UX mobile porque combina exploración, búsqueda, selección, carrito y checkout en un flujo donde cada pantalla de fricción se traduce en abandono.\n\n## Las 11 pantallas a diseñar\n\n1. **Home / Exploración**: banner de oferta, categorías, restaurantes destacados, búsqueda\n2. **Listado de restaurantes**: filtros (precio, rating, distancia, tiempo), tarjeta con foto/nombre/rating/tiempo\n3. **Detalle de restaurante**: portada, info, categorías como tabs, lista de platos con foto y precio\n4. **Detalle de plato**: foto grande, nombre, descripción, precio, personalizaciones, contador, botón agregar\n5. **Carrito**: ítems con foto/nombre/precio, contador editable, subtotal/delivery fee/total, notas, checkout\n6. **Dirección de entrega**: mapa con pin, dirección guardada o nueva, instrucciones al repartidor\n7. **Método de pago**: tarjetas guardadas, nueva tarjeta, efectivo, promo code\n8. **Confirmación del pedido**: resumen completo, estimación de tiempo, botón confirmar\n9. **Seguimiento del pedido**: mapa en tiempo real con pin del repartidor, timeline de estados\n10. **Pedido entregado / Calificación**: confirmación, rating del restaurante y repartidor, propina\n11. **Historial de pedidos**: lista de pedidos anteriores, botón "repetir pedido"\n\n## El foco del proyecto\n\nEl checkout (pantallas 5–8) es donde más apps pierden usuarios. Diseñalo primero. Objetivo: confirmar un pedido en máximo 4 taps desde el carrito. El carrito debe ser siempre accesible (floating button o badge en tab bar). El detalle de plato necesita foto grande (40%+ de la pantalla) y botón de agregar como elemento más prominente.',
        tasks: [
          'Mapeá el flujo de 11 pantallas en FigJam — identificá puntos de fricción en el checkout',
          'Diseñá el flujo de checkout (pantallas 5–8) primero — es donde más abandono ocurre',
          'Creá los componentes reutilizables: Restaurant Card, Menu Item, Cart Item',
          'Diseñá las 11 pantallas con el carrito siempre visible en la interfaz',
          'Construí el prototipo del flujo principal: home → restaurante → plato → carrito → checkout → tracking',
          'Publicá el prototipo en Behance y grabá un screen recording del flujo completo',
        ],
        tip: 'El detalle de plato es la pantalla más importante del flujo — es donde se toma la decisión de compra. La foto del plato debe ocupar al menos el 40% de la pantalla, el precio debe ser visible sin scroll y el botón de agregar al carrito debe ser el elemento más prominente. Si el usuario tiene que buscar el precio o el botón, la pantalla falló.',
        completed: false,
      },
      {
        id: 'up-r2',
        title: '[Responsive] Proyecto 12 — Básico: Blog editorial (8 pantallas)',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá un blog editorial completo en desktop (1440px) y mobile (390px) con foco en legibilidad y descubrimiento de contenido. Diseñar un blog bien requiere dominar tipografía, ritmo visual y jerarquía de información. Referencia: Medium, Substack, The Pudding.\n\n## Las 4 páginas × 2 breakpoints = 8 pantallas\n\n**Home**\n- Desktop: artículo destacado en hero con imagen grande, grid de artículos en 3 columnas (foto/categoría/título/autor/fecha), newsletter subscribe al fondo\n- Mobile: artículo destacado en card full-width, lista uno debajo del otro\n\n**Artículo**\n- Desktop: header (título/autor con avatar/fecha/tiempo de lectura/compartir), cuerpo con tipografía optimizada (máx 680px de ancho, line-height 1.7), imágenes full-width, pull quotes, artículos relacionados en grid de 3\n- Mobile: mismo contenido, tipografía 18px, imágenes full-width, related articles en scroll horizontal\n\n**Página de autor**\n- Desktop: foto grande, bio, artículos publicados en grid de 3\n- Mobile: foto compacta, bio, artículos en lista vertical\n\n**Categoría**\n- Desktop: título + descripción, artículos en grid, filtro por fecha\n- Mobile: grid de 1 columna, filtro como tabs horizontales\n\n## El principio central: legibilidad\n\n- Ancho óptimo de línea: 60–75 caracteres (640–680px en desktop)\n- Line-height para body: mínimo 1.65\n- Font size body: 17–18px desktop, 16px mobile\n- Contraste: negro sobre blanco — sin grises claros para texto de cuerpo',
        tasks: [
          'Elegí el tema del blog y definí el par tipográfico (serif títulos, sans-serif cuerpo)',
          'Diseñá las 4 páginas desktop con especial atención a la página de artículo',
          'Verificá que el ancho del cuerpo del artículo sea máximo 680px y line-height mínimo 1.65',
          'Diseñá las 4 páginas mobile — font size de body mínimo 16px',
          'Creá un prototipo de la home → artículo → autor para ambos breakpoints',
          'Publicá en Behance con el artículo desktop y mobile como pieza central del caso',
        ],
        tip: 'El error más frecuente en blogs es el uso de grises claros para el texto del cuerpo. "Parece moderno" pero el contraste bajo fatiga la vista. Para texto sobre fondo blanco usá mínimo #4B4B4B. Las regulaciones WCAG requieren ratio de contraste mínimo 4.5:1 para texto normal. La tipografía elegante de bajo contraste es accesible solo en el Figma preview, no en la pantalla real.',
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
          '## El problema que resuelve un Design System\n\nSin un design system, cada pantalla nueva que diseñás empieza desde cero — o peor, empieza copiando de una pantalla anterior con pequeñas inconsistencias que se acumulan. A los 20 pantallas, el producto tiene 4 variantes de botón, 6 tamaños de texto distintos y un gradiente diferente en cada sección.\n\nUn **Design System** es la solución: una fuente única de verdad con todos los componentes, estilos y guías de uso que garantizan consistencia visual en toda la aplicación, independientemente de quién diseñe o cuándo.\n\n## Los tres layers de un Design System\n\n**1. Fundations (base)**: los tokens de diseño — colores, tipografías, espaciados, radios, sombras. Las decisiones más fundamentales que todo lo demás hereda.\n\n**2. Components**: los elementos UI reutilizables — botones, inputs, cards, modales, navbars. Construidos con las foundations.\n\n**3. Patterns**: cómo se combinan los componentes para resolver problemas específicos — formularios de login, onboarding de 5 pasos, filtros de búsqueda.\n\n## Los sistemas de referencia\n\n- **Material Design 3** (Google): el más completo y documentado. Ideal para estudiar la estructura.\n- **Apple Human Interface Guidelines**: el estándar para iOS. Orientado al comportamiento tanto como al diseño.\n- **Carbon** (IBM): enfocado en productos enterprise y dashboards complejos.\n- **Base Web** (Uber): código + design system al mismo nivel de documentación.',
        tasks: [
          'Explorá Material Design 3 en m3.material.io durante 30 minutos — prestá atención a cómo documenta cada componente',
          'Compará Material Design y Apple HIG: ¿qué tienen en común en su estructura? ¿En qué difieren?',
          'Identificá qué componentes necesitaría el design system de AlphaDev Studios — hacé una lista de 10',
          'Buscá en Figma Community un design system gratuito y descargalo para analizar cómo está construido',
        ],
        tip: 'No necesitás construir un design system completo para tu primer proyecto — necesitás entender cómo funciona uno. La diferencia entre un diseñador que sabe hacer UI y uno que sabe hacer diseño a escala está en si puede responder "¿cómo funciona el sistema de colores?" y "¿cómo evolucionamos el componente de botón sin romper las 50 pantallas que lo usan?"',
        completed: false,
      },
      {
        id: 'u4-l1b',
        title: 'Mini-práctica: analiza el design system de un producto real',
        type: 'practice',
        content:
          '## El ejercicio más revelador para entender design systems\n\nAntes de construir el tuyo, necesitás ver cómo funciona uno en producción. Esta práctica te da ese contexto en 30 minutos.\n\n## El sistema a explorar: Material Design 3\n\nAbrí m3.material.io y navegá con estructura — no leas todo. El objetivo es entender cómo está organizado y qué decisiones tomaron.\n\n## Las preguntas a responder\n\n**Sobre la estructura**:\n- ¿Cómo están organizados los tokens? ¿Hay primitivos y semánticos separados?\n- ¿Cuál es la diferencia entre tokens de "source" y "key colors"?\n- ¿Cómo nombran los componentes? ¿Hay una convención clara?\n\n**Sobre los componentes**:\n- Abrí el componente "Button" — ¿cuántas variantes tiene? ¿Cuántos estados?\n- Abrí el componente "Card" — ¿cómo documenta cuándo usar cada variante?\n- ¿Qué información incluye la documentación además de la visual?\n\n**Para AlphaDev Studios**:\n- ¿Qué de Material Design 3 adaptarías a la identidad de AlphaDev?\n- ¿Qué descartarías? ¿Por qué?',
        tasks: [
          'Explorá Material Design 3 (m3.material.io) durante 30 minutos con las preguntas como guía',
          'Respondé las preguntas por escrito — no en la cabeza',
          'Descargá el kit de Material Design 3 de Figma Community y analizá cómo está construido internamente',
          'Listá los 5 componentes que más necesitaría el design system de AlphaDev Studios',
        ],
        tip: 'El valor de estudiar Material Design 3 no es copiarlo — es entender el nivel de profundidad que requiere un design system real. Cuando ves que un solo componente (Button) tiene 5 variantes × 5 estados = 25 combinaciones documentadas, entendés por qué los design systems tardan meses en construirse bien.',
        completed: false,
      },
      {
        id: 'u4-l2',
        title: 'Variables y tokens de diseño en Figma',
        type: 'reading',
        content:
          '## Qué son los design tokens\n\nLos **design tokens** son la capa de abstracción entre los valores de diseño y el código. En lugar de usar `#9A7235` directamente en cada componente, usás el token `color/brand/gold`. Cuando el color de la marca cambia, actualizás el token una sola vez y todos los componentes se actualizan.\n\nEn código, los tokens se implementan como variables CSS, variables de Sass o como archivos JSON que comparten los equipos de diseño y desarrollo. En Figma, se implementan como **Variables**.\n\n## Tipos de tokens\n\n**Primitivos (valores base)**: los colores, tipografías y espaciados en su forma más básica.\n- `color/neutral/100` = `#FAFAF7`\n- `color/gold/base` = `#9A7235`\n- `spacing/4` = `16px`\n\n**Semánticos (significado funcional)**: tokens que usan los primitivos pero con un nombre de propósito.\n- `color/background/default` → usa `color/neutral/100`\n- `color/accent/primary` → usa `color/gold/base`\n- `spacing/section/padding` → usa `spacing/4`\n\n## Por qué importa la distinción\n\nSi un componente usa `color/gold/base` directamente y el gold cambia de tono, tenés que buscarlo en todo el archivo. Si usa `color/accent/primary`, actualizás el token semántico y todo el sistema se adapta.\n\n## En Figma: cómo crear Variables\n\nPanel derecho > Variables > Create variable. Creá una colección (ej: "Colors"), definí los primitivos primero, luego los semánticos que referencian a los primitivos. Conectalos a componentes mediante el panel de color de cada capa.',
        tasks: [
          'Creá una colección de Variables en Figma con los colores de AlphaDev Studios (todos los tokens del CLAUDE.md)',
          'Dividí los tokens en dos grupos: Primitivos (el valor real) y Semánticos (el propósito)',
          'Conectá los variables a los componentes que creaste en el Módulo 2 — el botón primario debe usar los tokens, no valores hardcodeados',
          'Cambiá el valor de un token primitivo y verificá que todos los componentes conectados se actualizan',
        ],
        tip: 'La nomenclatura de tokens es una decisión de largo plazo que no se puede cambiar fácilmente después. Antes de crear el primer token, definí la convención completa: `categoria/subcategoria/nombre`. Un equipo que usa `btn-primary-bg` y otro que usa `color/button/primary/background` van a tener problemas para compartir tokens. La consistencia desde el día uno evita deuda técnica de diseño.',
        completed: false,
      },
      {
        id: 'u4-l2b',
        title: 'Mini-práctica: creá los primeros tokens de AlphaDev en Figma',
        type: 'practice',
        content:
          '## El primer paso real de un design system\n\nLos tokens de diseño son la base de toda consistencia visual. Esta práctica crea los tokens de color de AlphaDev Studios en Figma usando Variables.\n\n## Los tokens a crear\n\n**Colección "Colors — Primitives"**:\n- `gold/base` → #9A7235\n- `gold/light` → #C9A465\n- `gold/dark` → #7A5828\n- `neutral/bg` → #FAFAF7\n- `neutral/bg-alt` → #F2EEE7\n- `neutral/text` → #1A1512\n- `neutral/text-muted` → #6B5F52\n\n**Colección "Colors — Semantic"**:\n- `background/default` → alias de neutral/bg\n- `background/alternate` → alias de neutral/bg-alt\n- `text/primary` → alias de neutral/text\n- `text/secondary` → alias de neutral/text-muted\n- `accent/primary` → alias de gold/base\n- `accent/hover` → alias de gold/dark\n\n## Cómo crear Variables en Figma\n\nPanel derecho > Variables (icono de rombo) > Create new variable. Creá una colección por cada grupo. Para los semánticos, usá "Link to variable" al asignar el valor para que apunten a los primitivos.',
        tasks: [
          'Creá la colección "Colors — Primitives" con los 7 tokens de color de AlphaDev',
          'Creá la colección "Colors — Semantic" con los 6 tokens semánticos apuntando a los primitivos',
          'Aplicá los tokens semánticos al componente Button que construiste en la lección anterior',
          'Cambiá el valor de gold/base por otro color — verificá que el botón primario se actualiza automáticamente',
        ],
        tip: 'La prueba de fuego de un token semántico: si cambiás el valor del primitivo al que apunta, ¿todos los componentes que usan el semántico se actualizan solos? Si sí, el sistema está bien construido. Si tenés que buscar instancias manualmente, hay un problema de arquitectura.',
        completed: false,
      },
      {
        id: 'u4-l3',
        title: 'Cómo armar un portfolio UI/UX que consiga trabajo',
        type: 'reading',
        content:
          '## El error más común del portfolio de diseño\n\nMostrar solo el resultado final. Un portfolio de UI/UX que muestra únicamente pantallas hermosas no demuestra nada sobre tu proceso de pensamiento — y el proceso es lo que diferencia a un diseñador de alguien que sabe usar Figma.\n\nLo que los reclutadores y clientes realmente quieren ver: **¿podés resolver un problema de diseño complejo de forma metodológica?**\n\n## La estructura ideal de un case study\n\n**1. Contexto y problema**: ¿qué producto es?, ¿para quién?, ¿qué problema de UX existía? Esta sección debe conectar emocionalmente — el lector tiene que sentir que el problema era real.\n\n**2. Research y hallazgos**: ¿qué aprendiste antes de diseñar? Entrevistas, encuestas, análisis de competidores, datos de analytics. Aunque sea básico, mostrá que tuviste un proceso.\n\n**3. Exploración y wireframes**: los primeros bocetos, las ideas descartadas, los prototipos de baja fidelidad. Esto muestra pensamiento iterativo — la marca de un buen diseñador.\n\n**4. Solución final**: las pantallas definitivas con explicación de las decisiones de diseño más importantes. ¿Por qué ese layout? ¿Por qué ese color? ¿Por qué ese flujo?\n\n**5. Resultado y aprendizaje**: métricas si las hay, feedback de usuarios, qué cambiarías si lo hicieras de nuevo.\n\n## Plataformas para el portfolio\n\n- **Dribbble**: para shots individuales, visibilidad en la comunidad de diseño\n- **Behance**: para case studies largos y proceso detallado\n- **Framer o Webflow**: para un portfolio personalizado con control total (lo que tenés que hacer después de este módulo)',
        tasks: [
          'Elegí un proyecto que hayas hecho (del módulo 2 o cualquiera anterior) y planificá la estructura del case study',
          'Escribí el borrador de la sección "Contexto y problema" — al menos 3 párrafos explicando por qué el problema importaba',
          'Armá un PDF o Notion doc con las 5 secciones del case study, aunque algunas estén en borrador',
          'Subí una versión a Behance como draft — no necesita estar perfecto para publicarse',
        ],
        tip: 'La mejor táctica para tener case studies cuando sos junior es hacer proyectos no solicitados (unsolicited redesigns): elegís una app con mala UX, la rediseñás, documentás el proceso y lo publicás. No importa que nadie te lo encargó — lo que importa es que muestra cómo pensás. Muchos diseñadores consiguieron su primer trabajo con un redesign de una app famosa.',
        completed: false,
      },
      {
        id: 'u4-l5',
        title: 'Práctica: documentar un proyecto como case study',
        type: 'practice',
        content:
          '## El primer ítem del portfolio\n\nEsta práctica produce el resultado más importante del módulo: el primer case study documentado de tu portfolio. Un diseñador sin portfolio público no existe para los clientes. Este es el paso que cambia eso.\n\n## El proyecto a documentar\n\nUsá el proyecto de 5 pantallas del Módulo 2 de este track — o cualquier proyecto que hayas hecho con más proceso documentado. Si no tenés ninguno todavía, hacé un redesign de una pantalla de una app conocida (login, onboarding, o checkout) y documentá cada decisión.\n\n## La estructura a seguir\n\n**Portada**: nombre del proyecto, plataforma (iOS/Web/Android), tu rol, el año.\n\n**El problema**: 2–3 párrafos. ¿Qué no funcionaba y para quién? ¿Por qué era importante resolverlo?\n\n**El proceso**: capturas de wireframes, user flows, exploración de opciones. No ocultes las iteraciones — los borradores son la prueba de que pensaste.\n\n**La solución**: las pantallas finales con anotaciones que explican las decisiones de diseño. Cada pantalla debe tener una razón — explicá por qué, no solo qué.\n\n**El resultado**: feedback de usuarios si lo tenés. Si no, describí qué mejorarías con más tiempo.\n\n## La publicación\n\nPublicá en Behance o en un Notion doc compartible. El objetivo es que tenga una URL pública que puedas compartir en LinkedIn, en tu email de presentación, y en la bio de Instagram o Dribbble.',
        tasks: [
          'Elegí el proyecto a documentar y completá la estructura de las 5 secciones del case study',
          'Escribí la sección de "El problema" — mínimo 2 párrafos con contexto real',
          'Armá la galería de imágenes: screenshots del proceso (FigJam, wireframes) + pantallas finales',
          'Publicá el case study en Behance o Notion y obtené la URL pública',
          'Compartí el link en LinkedIn con una descripción breve del proyecto — este es el primer post de tu portfolio público',
        ],
        tip: 'La longitud del case study no es lo que importa — la claridad sí. Un case study de 4 secciones bien escritas y con decisiones de diseño explicadas claramente vale más que uno de 15 páginas lleno de pantallas sin contexto. Si alguien entiende el problema y la solución en 3 minutos de lectura, el case study está bien hecho.',
        completed: false,
      },
      {
        id: 'up-d4',
        title: '[Desktop] Proyecto 9 — Intermedio: Panel de administración back-office (1440px)',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá un panel de administración para un negocio. El desafío: diseñar para eficiencia máxima, no para impacto visual. El usuario trabaja en este panel 8 horas al día y necesita hacer tareas repetitivas rápido. Pocos diseñadores saben hacerlo bien — eso lo hace valioso en el portafolio.\n\n## Las 4 secciones a diseñar\n\n**1. Gestión de usuarios**\n- Tabla: checkbox de selección masiva, avatar + nombre + email, rol (badge), estado (activo/inactivo), fecha, acciones\n- Filtros: por rol, por estado, búsqueda por email\n- Acciones masivas: cambiar rol, exportar, suspender\n- Modal de edición: nombre, email, rol (dropdown), permisos\n\n**2. Gestión de órdenes**\n- Tabla: ID, cliente, fecha, estado (badge con color), monto, acciones\n- Filtro por status: Pendiente / Procesando / Enviado / Entregado / Cancelado\n- Detalle en panel lateral (drawer) sin salir de la tabla\n- Bulk actions: marcar como enviado, exportar CSV\n\n**3. Inventario o catálogo**\n- Vista grid/lista toggle\n- Tarjeta de producto: foto, nombre, SKU, stock, precio, estado\n- Formulario de producto: tabs (Info / Imágenes / Pricing / Inventario)\n\n**4. Configuración**\n- Tabs: Perfil / Equipo / Facturación / Integraciones / Notificaciones\n- Zona de peligro: "Eliminar cuenta" con modal de confirmación en rojo\n\n## Principios de back-office\n\n- Densidad > espacio: las tablas pueden tener padding mínimo si muestran más datos\n- Acciones destructivas siempre con confirmación y color rojo\n- Consistencia absoluta en los patrones — el usuario aprende una vez y aplica siempre',
        tasks: [
          'Diseñá el componente de tabla con todas sus variantes antes de armar las secciones',
          'Diseñá la sección de usuarios con filtros, bulk actions y modal de edición',
          'Diseñá la sección de órdenes con el drawer de detalle lateral',
          'Diseñá el inventario con toggle grid/lista y formulario de producto con tabs',
          'Diseñá la configuración incluyendo la zona de peligro con modal de confirmación',
          'Publicá el caso enfatizando los patrones de eficiencia y las decisiones de UX',
        ],
        tip: 'El error más costoso en back-office es el exceso de confirmaciones. Si el usuario confirma cada acción con un modal, pierde el ritmo de trabajo. Reservá las confirmaciones para acciones irreversibles (eliminar, cancelar). La regla: ¿se puede deshacer? Entonces no necesita confirmación.',
        completed: false,
      },
      {
        id: 'up-d5',
        title: '[Desktop] Proyecto 10 — Avanzado: Design system completo con documentación',
        type: 'practice',
        content:
          '## El brief\n\nConstruit un design system completo en Figma: foundations, componentes (20+), dark mode, tokens exportables y documentación por componente. Este proyecto demuestra que podés trabajar a nivel de sistema — la habilidad que más diferencia a un diseñador de $3,000/mes de uno de $8,000/mes.\n\n## Capa 1 — Foundations\n\n- **Color primitives**: escala de 5 tones por color (blue-100 a blue-900) + grises + neutros\n- **Semantic tokens**: colores con propósito (surface/primary, text/default, border/error, feedback/success)\n- **Escala tipográfica**: Display XL / Display / H1 / H2 / H3 / Body LG / Body SM / Caption / Label / Code\n- **Espaciado**: múltiplos de 4 — 4/8/12/16/24/32/40/48/64/80/96px\n- **Border radius**: 0/2/4/8/12/16/24/round\n- **Sombras**: elevación 0 (flat) / 1 (card) / 2 (dropdown) / 3 (modal) / 4 (toast)\n- **Iconos**: 30+ SVG organizados por categoría\n\n## Capa 2 — Componentes (mínimo 20)\n\nCon variantes de tipo y estados (default/hover/active/disabled/focus):\nButton (4 tipos) · Input (5 variantes) · Textarea · Select · Checkbox · Radio · Toggle · Badge · Avatar (3 tamaños) · Card · Modal · Toast · Tooltip · Tabs · Progress Bar · Skeleton · Empty State · Alert · Tag · Pagination\n\n## Capa 3 — Documentación por componente\n\nPor cada componente: cuándo usar / cuándo NO usar, todas las variantes, ejemplo en contexto, especificaciones anotadas, notas para el desarrollador.\n\n## Capa 4 — Dark mode con Figma Variables\n\nPrimitivos → tokens semánticos → aplicación en componentes. Un componente bien construido cambia de light a dark con un click sin ajustes manuales.\n\n## Capa 5 — Tokens exportables\n\nPlugin "Tokens Studio for Figma" para exportar como JSON — directamente consumible por desarrollo.',
        tasks: [
          'Definí todas las foundations como Variables de Figma antes de crear los componentes',
          'Diseñá los 20 componentes con todas sus variantes y estados',
          'Creá la documentación completa de al menos 5 componentes con uso, variantes y specs',
          'Implementá dark mode completo — verificá que todos los componentes cambien correctamente',
          'Exportá los tokens como JSON con Tokens Studio y compartí el archivo en el portafolio',
          'Grabá un Loom de 10 minutos recorriendo el design system: foundations → componentes → dark mode → tokens',
          'Publicá el archivo con View Only público como el proyecto más técnico del portafolio',
        ],
        tip: 'El naming de los tokens es lo más importante y lo más ignorado. "primary-blue" es primitivo, no semántico. "color/button/background/default" es semántico — describe el propósito, no el color. Cuando el equipo cambia el azul por verde, solo hay que cambiar el valor del token semántico, no tocar cada componente. La arquitectura de tokens determina si el sistema escala o colapsa.',
        completed: false,
      },
    
    {
      id: 'uiux-4-p1',
      title: 'Proyecto: Design System en Figma',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: 'Construye un design system completo en Figma para una aplicación web. Debe incluir tokens de diseño, componentes atómicos hasta organismos, y documentación de uso para cada componente.',
      deliverables: [
        'Archivo Figma compartido con el design system',
        'Mínimo 20 componentes organizados en Atomic Design',
        'Tokens de color, tipografía y spacing documentados',
        'Página de documentación con guía de uso',
        'Demo de una pantalla completa construida con el sistema',
      ],
      rubrica: [
        'Coherencia visual entre todos los componentes',
        'Nomenclatura y organización profesional',
        'Componentes con variantes y estados',
        'Documentación suficiente para otro diseñador',
      ],
      completed: false,
    },],
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
          '## Rive: el paso siguiente natural después de Lottie\n\n**Rive** es la herramienta de animación vectorial interactiva más avanzada disponible para diseñadores. Su diferencial crítico sobre Lottie y After Effects: las **state machines**.\n\n## State machines: la revolución de Rive\n\nUna state machine define cómo un elemento transiciona entre estados basada en eventos del usuario — sin que el developer tenga que escribir lógica de animación en código.\n\nEjemplo: un botón de "Me gusta" con una state machine:\n- **Estado inicial (Idle)**: corazón vacío\n- **Trigger: hover** → transición a "Hovered": corazón pulsa levemente\n- **Trigger: click** → transición a "Liked": corazón se llena con una animación de bounce\n- **Trigger: click de nuevo** → transición a "Unliked": corazón vuelve a vacío\n\nTodo esto sin una sola línea de JavaScript de animación. El developer solo escucha el evento y cambia el estado — Rive maneja todas las transiciones.\n\n## Casos de uso ideales\n\n- Íconos de navegación animados (hamburguesa → X)\n- Botones con estado de carga (spinner integrado)\n- Ilustraciones en onboarding que responden al swipe\n- Mascots o personajes que reaccionan al cursor\n- Micro-interacciones de feedback (éxito, error, loading)\n\n## Performance\n\nLos archivos Rive son extremadamente livianos: una animación compleja con múltiples estados pesa típicamente 10–100KB. Corren nativamente a 60fps en web, iOS y Android sin degradación de rendimiento.',
        tasks: [
          'Creá una cuenta gratuita en rive.app y explorá la interfaz durante 30 minutos',
          'Completá el primer tutorial oficial "Rive 101" en rive.app/learn-rive',
          'Explorá la galería de la comunidad en rive.app/community — descargá 2 archivos y analizá cómo están construidas las state machines',
          'Creá un ícono simple con 2 estados (idle y hover) usando una state machine básica',
        ],
        tip: 'La curva de aprendizaje de Rive es más alta que Lottie, pero el resultado es cualitativamente superior. Un ícono hecho en Rive con una state machine interactiva no puede reemplazarse con ninguna animación de AE/Lottie — porque responde a eventos en tiempo real. Esa interactividad es el diferencial que justifica la inversión de tiempo en aprenderlo.',
        completed: false,
      },
      {
        id: 'u8-l1b',
        title: 'Mini-práctica: crea tu primera state machine en Rive',
        type: 'practice',
        content:
          '## El objetivo\n\nUna animación con 2 estados (Idle → Hover) para un ícono simple. No tiene que ser compleja — tiene que demostrar que entendiste la lógica de las state machines.\n\n## El ícono a animar (elegí uno)\n\n- **Opción A**: Estrella que pulsa al hacer hover (scale 1 → 1.2 con bounce)\n- **Opción B**: Corazón que se llena al hacer click (empty → filled)\n- **Opción C**: Bookmark que se activa (outline → filled con cambio de color)\n\n## El proceso en Rive\n\n1. Creá una cuenta en rive.app y abrí un nuevo archivo\n2. Dibujá el ícono con las herramientas vectoriales de Rive (o importá un SVG desde Figma)\n3. En la pestaña Animate, creá la animación del estado Idle (si hay movimiento en reposo)\n4. Creá la animación del estado Hover (el cambio al interactuar)\n5. En la pestaña **State Machine**, conectá los estados:\n   - Idle → Hover: trigger "Mouse Enter"\n   - Hover → Idle: trigger "Mouse Leave"\n6. Previsualizá en modo Preview — mové el mouse sobre el ícono\n\n## El resultado esperado\n\nEl ícono responde al hover con una animación suave y vuelve al idle cuando el mouse sale.',
        tasks: [
          'Creá el archivo en Rive y dibujá o importá el ícono elegido',
          'Creá las animaciones de los estados Idle y Hover por separado',
          'Configurá la State Machine con los triggers Mouse Enter y Mouse Leave',
          'Previsualizá la interacción y ajustá el timing si se siente abrupto',
          'Exportá el archivo .riv y guardalo como primera pieza de tu kit de animaciones',
        ],
        tip: 'El primer ícono en Rive siempre lleva más tiempo de lo esperado — hay que aprender la interfaz mientras se diseña. No te preocupés por el tiempo del primero. El segundo va a tardar la mitad. La curva de Rive es empinada pero corta.',
        completed: false,
      },
      {
        id: 'u8-l2',
        title: 'Spline: 3D para web sin código',
        type: 'reading',
        content:
          '## Qué es Spline y qué lo hace único\n\n**Spline** es un editor 3D que genera escenas y animaciones que se embeben directamente en sitios web — sin Three.js, sin WebGL manual, sin conocimiento de 3D avanzado. Es el puente entre el diseño visual y el 3D en web que antes solo existía para developers especializados.\n\n## Casos de uso ideales\n\n- Hero con objeto 3D interactivo (el usuario puede rotar con el mouse)\n- Íconos 3D animados que acompañan features de un producto\n- Fondos con profundidad y movimiento de parallax 3D\n- Visualizaciones de producto (mockups 3D de apps o dispositivos)\n\n## El flujo de trabajo\n\n1. Diseñás la escena en **spline.design** — interfaz visual similar a Figma pero en 3D\n2. Configurás la animación (auto-rotate, scroll-driven, mouse-tracking)\n3. Exportás como código embebible (snippet HTML), React component, o iframe\n4. Lo insertás en Framer (componente de código), Webflow (embed), o Next.js\n\n## Las limitaciones a conocer\n\n**Performance**: Spline agrega peso de carga significativo. En una landing page de alto impacto puede valer el tradeoff. En un sitio que prioriza Core Web Vitals y velocidad extrema, puede no ser la mejor opción.\n\n**Versión gratuita**: muestra el logo de Spline en el embed. El plan pago lo elimina (~$14 USD/mes).\n\n**Compatibilidad**: funciona en todos los browsers modernos pero no en versiones antiguas de Safari o IE.',
        tasks: [
          'Creá una cuenta en spline.design y explorá la interfaz durante 30 minutos',
          'Seguí el tutorial oficial de introducción de Spline (30–60 minutos)',
          'Creá una escena simple: una esfera o cubo 3D con materiales y una animación de auto-rotate',
          'Exportá la escena como HTML embebible y copiá el código',
          'Pegá el código en un proyecto de Framer o en un archivo HTML simple y verificá que funciona',
        ],
        tip: 'Antes de comprometerte con Spline en un proyecto real, medí el impacto en performance. Abrí Chrome DevTools > Network tab y cargá la página con el embed de Spline. Si el script de Spline pesa más de 500KB adicionales y el cliente o proyecto tiene requisitos de velocidad, considerá alternativas como una imagen estática con un video de fondo que simule el 3D.',
        completed: false,
      },
      {
        id: 'u8-l2b',
        title: 'Mini-práctica: diseñá un objeto 3D en Spline',
        type: 'practice',
        content:
          '## El resultado esperado\n\nUna escena 3D con al menos 1 objeto, materiales aplicados y animación básica (auto-rotate o mouse-follow), lista para embeber.\n\n## El objeto a crear (elegí por nivel de comodidad)\n\n- **Opción A — Esfera**: lo más simple. Material glossy o gradient + auto-rotate.\n- **Opción B — Cubo redondeado**: corner radius grande. Dos materiales en caras distintas.\n- **Opción C — Logo 3D**: extrusión del logo o iniciales de AlphaDev en 3D.\n\n## El proceso en Spline\n\n1. Creá cuenta en spline.design y abrí un proyecto vacío (Empty Scene)\n2. Insertá la forma base desde el menú Add\n3. Aplicá un material desde el panel de Material (metal, glass, gradient)\n4. Ajustá la iluminación: probá directional light y ambient light\n5. En el panel de Animaciones, configurá "Spin" en el eje Y para auto-rotate\n6. Desde Share > Export, copiá el snippet HTML\n\n## La verificación\n\nPegá el snippet en un archivo HTML simple y abrilo en Chrome. El objeto debe verse y rotar. Revisá el peso del script de Spline en DevTools Network — ¿es aceptable para el proyecto?',
        tasks: [
          'Creá la escena con el objeto y los materiales seleccionados',
          'Configurá la animación de auto-rotate o mouse-tracking en el panel de Animaciones',
          'Ajustá la iluminación para que el objeto se vea tridimensional, no plano',
          'Exportá el snippet HTML y verificá que funciona en un archivo HTML local en Chrome',
          'Anotá el peso del script de Spline — ¿es viable para un proyecto real con requisitos de velocidad?',
        ],
        tip: 'La iluminación hace que un objeto 3D se vea premium o genérico. Un cubo gris sin luz parece un placeholder. El mismo cubo con directional light desde arriba-derecha y ambient light suave parece un render de Apple. Experimentá con las luces antes de finalizar los materiales.',
        completed: false,
      },
      {
        id: 'u8-l3',
        title: 'Unicorn Studio: efectos WebGL y scroll-driven sin código',
        type: 'reading',
        content:
          '## Qué es Unicorn Studio\n\n**Unicorn Studio** genera efectos visuales WebGL — shaders, gradientes fluidos, noise effects, partículas — que se activan y deforman con el scroll o el movimiento del mouse. Es la herramienta para crear backgrounds que "viven" sin contratar a un specialist en WebGL.\n\n## Por qué es relevante para diseñadores UI\n\nHasta hace poco, un background de gradiente fluido animado como el de Linear.app o Stripe era exclusividad de developers que sabían GLSL (el lenguaje de shaders de WebGL). Unicorn Studio democratiza eso: en 20–30 minutos podés tener un efecto equivalente sin escribir una línea de código.\n\n## Casos de uso\n\n- **Hero backgrounds** con gradiente fluido animado\n- **Secciones "wow"** en landing pages premium — el momento donde el visitante se detiene\n- **Efectos de partículas** sutiles como fondo de una sección de features\n- **Transiciones de scroll** donde el fondo evoluciona mientras el usuario hace scroll\n\n## La integración\n\nIgual que Spline: un snippet de HTML o iframe que pegás en Framer, Webflow, o cualquier página. El efecto carga desde los servidores de Unicorn Studio.\n\n## El tradeoff\n\nLos efectos WebGL tienen un costo de performance — especialmente en mobile con GPU limitada. Unicorn Studio tiene controles de fallback para mobile (mostrar una imagen estática cuando el efecto sería demasiado pesado). Usálo siempre con esta consideración.',
        tasks: [
          'Explorá la galería de templates en unicornstudio.io — identificá 3 efectos que te gustarían usar en un proyecto real',
          'Creá una cuenta gratuita y explorá el editor de Unicorn Studio durante 30 minutos',
          'Configurá un efecto de gradiente fluido o noise para un hero — ajustá colores para que coincidan con la paleta de AlphaDev',
          'Exportá el snippet y pegalo en un documento HTML simple — verificá que el efecto se ve correctamente',
        ],
        tip: 'Unicorn Studio se vende solo cuando se muestra. Cuando presentes un proyecto a un cliente con un hero animado de Unicorn Studio en lugar de un fondo estático, la primera reacción es "¿cómo lo hicieron?" Ese momento de sorpresa es lo que justifica el aprendizaje de la herramienta — y muchas veces es lo que cierra un contrato.',
        completed: false,
      },
      {
        id: 'u8-l3b',
        title: 'Mini-práctica: creá un efecto WebGL para el hero de AlphaDev',
        type: 'practice',
        content:
          '## El objetivo\n\nUn background animado con los colores de AlphaDev (#FAFAF7 crema + #9A7235 dorado) listo para embeber en el hero del sitio. El efecto debe ser sutil — refuerza la atmósfera sin competir con el headline.\n\n## El proceso en Unicorn Studio\n\n1. Registrate en unicornstudio.io y abrí el editor\n2. Explorá la galería de templates — buscá algo basado en gradientes o noise (no partículas, más pesadas)\n3. Abrí un template como base y modificalo\n4. Ajustá los colores a la paleta de AlphaDev:\n   - Color 1: #FAFAF7 (crema base)\n   - Color 2: #F2EEE7 (crema alternativa)\n   - Color 3: #9A7235 (dorado) — con opacidad muy baja (15–25%) para que sea sutil\n5. Ajustá la velocidad: para un hero elegante, usá speed 0.2–0.4 (no hiperactivo)\n6. Exportá el snippet y embedilo en el proyecto de Framer del módulo anterior\n\n## La regla de oro\n\nSi el efecto llama más la atención que el headline, está demasiado agresivo. El background debe decirle "este sitio es especial" antes de que lean una palabra — sin pedirles que lo miren específicamente.',
        tasks: [
          'Explorá al menos 3 templates de Unicorn Studio antes de elegir uno',
          'Ajustá los colores a la paleta de AlphaDev con el dorado en opacidad muy baja',
          'Configurá la velocidad del efecto para que sea lento y elegante',
          'Exportá el snippet y embedilo en el proyecto de Framer publicado',
          'Verificá en mobile que el efecto tiene un fallback o se ve aceptable en GPU limitada',
        ],
        tip: 'El dorado (#9A7235) en el fondo debe usarse con opacidad 15–25% máximo. Si el dorado del fondo compite con el dorado de los botones CTA, el fondo gana y los CTAs se pierden. El objetivo: que el usuario sienta el fondo como "lujo sutil" sin poder señalarlo específicamente.',
        completed: false,
      },
      {
        id: 'u8-l4',
        title: 'La estrategia correcta: elegí una y dominala',
        type: 'reading',
        content:
          '## El error más común con herramientas avanzadas\n\nColeccionarlas sin dominar ninguna. Muchos diseñadores ven demos de Rive, Spline y Unicorn Studio, los instalan todos, hacen el tutorial de introducción de cada uno y luego no usan ninguno en un proyecto real. La familiaridad superficial con muchas herramientas no construye valor.\n\n## La recomendación directa\n\nElegí **UNA** de estas herramientas y explorá todo lo que puede hacer. Usala en al menos 3 proyectos reales antes de considerar aprender otra.\n\n## El árbol de decisión\n\n**Si ya dominás After Effects + Lottie** → Rive es el siguiente paso natural. Ambas trabajan con animaciones vectoriales para web/mobile. Rive agrega la interactividad con state machines que Lottie no tiene.\n\n**Si tu foco es webs y landing pages premium** → Spline o Unicorn Studio. Si querés objetos 3D interactivos → Spline. Si querés fondos que "viven" → Unicorn Studio.\n\n**Si recién empezás** → Rive primero. Es la herramienta con más aplicaciones universales (web, iOS, Android) y la que más demanda tiene en el mercado actualmente.\n\n## Por qué cualquiera de estas te separa del 99%\n\nLa mayoría de los diseñadores UI no sabe que estas herramientas existen. Dominar una sola ya te pone en un percentil muy pequeño del mercado. El criterio para mostrarla en portfolio: un proyecto real publicado con la herramienta integrada — no un demo de práctica.',
        tasks: [
          'Decidí cuál de las tres herramientas vas a priorizar y escribí en 3 líneas por qué esa específicamente',
          'Comprometete con un proyecto real donde la usarás — no un ejercicio de práctica, sino algo que vas a publicar',
          'Buscá en LinkedIn o Twitter a 3 diseñadores que usen la herramienta que elegiste — seguílos y analizá su trabajo',
          'Definí cuántas horas por semana vas a dedicar a esta herramienta durante el próximo mes',
        ],
        tip: 'La forma de dominar una herramienta avanzada no es hacer sus tutoriales — es usarla para resolver un problema real con deadline. El deadline y el cliente (aunque sea vos mismo) fuerzan el aprendizaje de las partes que los tutoriales no cubren. "Tengo que publicar esto el viernes" enseña más que 10 tutoriales sin presión.',
        completed: false,
      },
      {
        id: 'u8-l5',
        title: 'Práctica: integrar una animación avanzada en un proyecto real',
        type: 'practice',
        content:
          '## El objetivo: elevar el nivel del portfolio con una herramienta del top 1%\n\nEsta práctica toma el sitio que publicaste en el módulo de Webflow/Framer y lo eleva un nivel significativo: agrega una animación avanzada con la herramienta que elegiste. Un sitio con un Rive interactivo, un objeto Spline o un background de Unicorn Studio en producción ya está en otro nivel de portfolio.\n\n## Las opciones según tu herramienta elegida\n\n**Opción A — Rive**: creá un ícono animado con al menos 2 estados (idle + hover). El caso ideal: el ícono del CTA principal de la landing page (una flecha que se mueve, un botón de play que pulsa, un menú hamburguesa que se transforma). Integración en Framer: componente de código con el runtime de Rive.\n\n**Opción B — Spline**: creá un objeto 3D simple con auto-rotate — una esfera abstracta, un cubo con materiales, o el logo de tu proyecto en 3D. Colocálo en el hero como elemento visual complementario (no reemplazo del headline). Integración en Framer/Webflow: snippet de código en un embed.\n\n**Opción C — Unicorn Studio**: creá un background animado para el hero — gradiente fluido o noise effect con los colores de la paleta del sitio. El efecto va detrás del headline, no encima. Integración en Framer/Webflow: snippet de código en un embed.\n\n## El entregable\n\nEl sitio republicado con la animación avanzada integrada + un screenshot o grabación del resultado para el portfolio.',
        tasks: [
          'Creá el asset en la herramienta elegida (Rive, Spline o Unicorn Studio)',
          'Integrálo en el sitio publicado de Framer o Webflow del módulo anterior',
          'Verificá que funciona correctamente en mobile — hacé ajustes si es necesario',
          'Republicá el sitio con la URL accesible',
          'Grabá un video de 10–15 segundos mostrando la animación integrada en el sitio y publicalo en redes',
        ],
        tip: 'Cuando presentes este proyecto en tu portfolio, incluí siempre una nota de qué herramienta usaste y por qué la elegiste para ese caso específico. La decisión de herramienta es parte del proceso de diseño — mostrarla demuestra pensamiento estratégico, no solo habilidad técnica.',
        completed: false,
      },
      {
        id: 'up-d3',
        title: '[Desktop] Proyecto 8 — Intermedio: Dashboard de analytics para startup (1440px)',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá un dashboard de analytics completo para una startup SaaS — el tipo de interfaz más evaluada en entrevistas de diseño de producto B2B. El dashboard debe mostrar el estado del negocio en 30 segundos para un manager sin formación técnica.\n\n## La estructura de la interfaz\n\n- **Sidebar** (izquierda, fija, 240px): logo, links de sección, avatar de usuario al fondo\n- **Header** (top, fijo): título de sección, filtro de período (7/30/90 días), exportar, notificaciones\n- **Área de contenido**: grilla de 12 columnas\n\n## Componentes de datos a diseñar\n\nCada componente con 4 estados: loading skeleton / empty / error / filled:\n- **KPI Card ×4**: número grande, label, trend indicator (flecha + % vs período anterior, verde/rojo)\n- **Line Chart**: eje X fechas, eje Y valores, línea de datos, tooltip en punto activo, leyenda\n- **Bar Chart**: horizontal o vertical con colores por categoría\n- **Data Table**: columnas con header ordenable, filas con hover, paginación, checkbox de selección\n- **Status Badge**: active (verde) / paused (amarillo) / error (rojo) / inactive (gris)\n\n## Layout de la página principal\n\n4 KPI Cards en fila + Line Chart (tráfico en el tiempo) + Bar Chart (conversiones por canal) + Data Table (lista de campañas o usuarios)\n\n## El proceso\n\n1. Definí las 4 métricas más importantes del negocio elegido\n2. Diseñá los componentes individuales con todos sus estados\n3. Armá el layout completo con datos realistas inventados consistentemente\n4. Diseñá páginas secundarias: User Management y Settings\n5. Bonus: dark mode con Variables de Figma',
        tasks: [
          'Definí el negocio, las 4 KPIs clave y la arquitectura del layout antes de diseñar',
          'Diseñá todos los componentes de datos con sus 4 estados como Componentes de Figma con variantes',
          'Armá el dashboard completo con datos realistas consistentes entre sí',
          'Diseñá páginas secundarias: User Management y Settings',
          'Implementá dark mode con Figma Variables como bonus',
          'Publicá el caso con video de prototipo mostrando estados e interacciones del filtro de fecha',
        ],
        tip: 'El estado de skeleton loading es más importante que el estado filled para la percepción de velocidad. Los skeleton loaders (rectángulos grises donde irán los datos) hacen que la interfaz se perciba hasta 2x más rápida que un spinner. Diseñá el skeleton de cada componente antes del estado con datos — también garantiza que el layout no se rompa cuando lleguen los datos.',
        completed: false,
      },
      {
        id: 'up-r5',
        title: '[Responsive] Proyecto 15 — Avanzado: SaaS marketing site + app web (15 pantallas)',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá un proyecto SaaS completo en 3 breakpoints: desktop (1440px), tablet (768px) y mobile (390px). El proyecto incluye el sitio de marketing Y el dashboard de la aplicación — mostrando que podés diseñar tanto la experiencia pre-venta como la post-venta.\n\n## Las 5 secciones × 3 breakpoints = 15 pantallas\n\n**1. Landing page principal** (3 breakpoints)\nHero + features overview + testimonios + pricing preview + CTA final. Desktop: imagen del producto a la derecha del hero. Tablet: imagen debajo del texto. Mobile: imagen comprimida o eliminada en favor del texto.\n\n**2. Página de features** (3 breakpoints)\n3 características principales con screenshot del producto, descripción y bullets. Desktop: alternar imagen izquierda/derecha. Mobile: imagen arriba, texto abajo en todos los casos.\n\n**3. Página de pricing** (3 breakpoints)\n3 planes (Starter/Pro/Enterprise) con tabla comparativa. Desktop: 3 columnas con Pro destacado. Tablet: mismo layout compacto. Mobile: 1 plan visible con scroll horizontal entre planes.\n\n**4. App dashboard — Home** (3 breakpoints)\nDesktop: sidebar + header + KPIs + gráfico + tabla. Tablet: sidebar colapsada en iconos + contenido. Mobile: bottom navigation + pantalla en 1 columna.\n\n**5. App — Settings** (3 breakpoints)\nDesktop: sidebar de secciones + panel de contenido. Tablet: tabs horizontales. Mobile: acordeón de secciones.\n\n## El desafío avanzado: design tokens responsivos\n\nUsá Figma Variables para tokens que cambian por breakpoint:\n- sp-page-margin: 24px mobile / 48px tablet / 96px desktop\n- h1-size: 32px mobile / 40px tablet / 56px desktop\n\nUn componente bien construido con Variables se adapta sin duplicarse.',
        tasks: [
          'Definí el producto SaaS, su propuesta de valor y las 3 características principales antes de diseñar',
          'Configurá las Variables de Figma con tokens responsivos antes de diseñar pantallas',
          'Diseñá las 5 secciones en desktop como referencia canónica',
          'Adaptá a tablet — el reto es el intermedio, no el mobile',
          'Adaptá a mobile con especial atención al pricing y al dashboard',
          'Creá 3 prototipos separados (desktop/tablet/mobile) que muestren la navegación completa',
          'Publicá el caso en Behance mostrando las 3 versiones de cada página side by side',
        ],
        tip: 'El tablet es el breakpoint más olvidado y el más difícil. Es tentador diseñar solo desktop y mobile, pero el 12–15% del tráfico llega desde tablet. La clave: no hacer "desktop achicado" ni "mobile agrandado". El tablet muchas veces se usa horizontalmente, con touch pero con más pantalla — diseñá específicamente para ese contexto.',
        completed: false,
      },

      {
        id: 'uiux-exam',
        title: 'Examen final: UI/UX Design',
        type: 'exam',
        questions: [
          {
            q: '¿Cuál es la diferencia entre UX (User Experience) y UI (User Interface)?',
            options: [
              'Son sinónimos — ambos se refieren al diseño visual de una app',
              'UX es el diseño visual; UI es la investigación de usuarios',
              'UX es cómo se siente usar el producto (funcional, emocional); UI es cómo se ve (visual, estético)',
              'UX es solo para apps móviles; UI es para web',
            ],
            correct: 2,
            explanation: 'UX abarca todo el proceso de diseño centrado en el usuario: research, arquitectura de información, flujos, usabilidad. UI es la capa visual: colores, tipografía, componentes, animaciones. Un producto puede tener buena UI con mala UX (se ve bien pero es confuso de usar).',
          },
          {
            q: 'En Figma, ¿qué son los Auto Layout y para qué sirven?',
            options: [
              'Una función para organizar capas automáticamente en el panel de layers',
              'Un sistema que permite que los frames se adapten automáticamente al contenido, como Flexbox en CSS',
              'Una herramienta para crear animaciones automáticas entre frames',
              'Un plugin para importar componentes de otras bibliotecas',
            ],
            correct: 1,
            explanation: 'Auto Layout convierte un frame en un contenedor flexible similar a Flexbox/Grid de CSS. Permite que el diseño se adapte cuando el contenido cambia: texto más largo, más elementos, o diferentes pantallas. Es fundamental para diseñar componentes reutilizables y responsive.',
          },
          {
            q: '¿Qué es la Ley de Fitts y cómo se aplica en UX design?',
            options: [
              'Los usuarios leen de izquierda a derecha — el CTA debe estar a la derecha',
              'El tiempo para alcanzar un objetivo depende de su tamaño y distancia — los elementos importantes deben ser grandes y accesibles',
              'Los usuarios recuerdan mejor los primeros y últimos elementos de una lista',
              'Las personas necesitan 7±2 elementos para tomar una decisión',
            ],
            correct: 1,
            explanation: 'La Ley de Fitts establece que el tiempo para llegar a un objetivo es función de su distancia y tamaño. Aplicado en UX: CTAs grandes y en zonas fácilmente alcanzables (thumbzone en mobile), menús en bordes de pantalla donde el cursor puede "chocar" sin moverse con precisión.',
          },
          {
            q: '¿Cuál es el propósito de un wireframe de baja fidelidad en el proceso de diseño?',
            options: [
              'Mostrar el diseño final al cliente para aprobación',
              'Definir la arquitectura de información y flujos sin perder tiempo en detalles visuales',
              'Crear el código HTML/CSS básico antes del diseño visual',
              'Documentar los componentes de la Design Library',
            ],
            correct: 1,
            explanation: 'Los wireframes de baja fidelidad (cajas, líneas, texto placeholder) sirven para validar la estructura y los flujos rápidamente, antes de invertir tiempo en el diseño visual. Permiten iterar 10 veces en el tiempo que tomaría una iteración en alta fidelidad.',
          },
          {
            q: '¿Qué es un Design System y qué ventaja principal ofrece?',
            options: [
              'Un plugin de Figma que genera código automáticamente',
              'Una colección de componentes, tokens y guías que garantizan consistencia a escala en un producto',
              'Un método de gestión de proyectos para equipos de diseño',
              'Una herramienta para hacer handoff de diseño a developers',
            ],
            correct: 1,
            explanation: 'Un Design System es la fuente de verdad visual del producto: tokens (colores, tipografía, espaciado), componentes reutilizables y guías de uso. Su ventaja principal es la consistencia a escala: todos los productos de la empresa se sienten como uno, y el equipo no reinventa el botón en cada pantalla.',
          },
          {
            q: 'En un user interview, ¿cuál es la práctica correcta?',
            options: [
              'Presentar el producto y preguntar qué le gusta al usuario para validar el diseño',
              'Hacer preguntas cerradas (sí/no) para obtener datos cuantitativos claros',
              'Hacer preguntas abiertas sobre comportamientos pasados, sin mencionar el producto ni soluciones',
              'Mostrar la competencia primero para calibrar las expectativas del usuario',
            ],
            correct: 2,
            explanation: 'Las entrevistas efectivas exploran comportamientos reales pasados ("cuéntame la última vez que..."), no opiniones sobre hipotéticos. Preguntar "¿usarías este producto?" da respuestas sesgadas. Preguntar "¿cómo resuelves este problema hoy?" da insights accionables.',
          },
          {
            q: '¿Cuál es el ratio de contraste mínimo WCAG AA para texto normal sobre fondo?',
            options: [
              '2:1 — cualquier combinación legible visualmente',
              '3:1 — para texto grande únicamente',
              '4.5:1 — para texto normal en cualquier tamaño',
              '7:1 — el estándar más estricto para todos los casos',
            ],
            correct: 2,
            explanation: 'WCAG 2.1 nivel AA requiere mínimo 4.5:1 para texto normal (<18px regular o <14px bold) y 3:1 para texto grande. El nivel AAA es 7:1. Cumplir estos estándares es obligatorio para aplicaciones gubernamentales y recomendado para cualquier producto digital inclusivo.',
          },
          {
            q: '¿Qué es el "thumb zone" y por qué importa en diseño mobile?',
            options: [
              'La zona de la pantalla que carga más rápido en dispositivos móviles',
              'El área de la pantalla que el pulgar alcanza cómodamente en una mano — donde deben estar los CTAs principales',
              'La zona de notch en teléfonos modernos donde no se puede colocar contenido',
              'El tamaño mínimo de elementos táctiles recomendado por Apple (44x44px)',
            ],
            correct: 1,
            explanation: 'El thumb zone es el área que alcanza el pulgar cómodamente sin reposicionar el teléfono. En un smartphone moderno, la parte inferior central es la más accesible. Los CTAs principales, navegación y acciones frecuentes deben estar en esa zona. La parte superior es la zona de "muerte" para elementos críticos.',
          },
        ],
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


  // ─── Track: Desarrollo Web ───────────────────────────────────────────────────

  {
    id: 'web-1',
    number: 12,
    title: 'Fundamentos Web: HTML & CSS',
    description: 'Construye la base sólida de todo desarrollo web moderno: estructura semántica, estilos, layouts y responsive design.',
    duration: '3 semanas',
    status: 'available',
    track: 'web',
    lessons: [
      {
        id: 'w1-l1',
        title: 'HTML semántico: estructura que importa',
        type: 'reading',
        content: `## HTML semántico

HTML semántico no es solo usar las etiquetas correctas — es comunicar la *intención* del contenido tanto a navegadores como a motores de búsqueda y lectores de pantalla.

### Por qué importa

- **SEO**: Google lee el HTML. Un \`<h1>\` correcto vale más que 10 palabras clave.
- **Accesibilidad**: Lectores de pantalla dependen de la semántica para navegar.
- **Mantenimiento**: HTML semántico es más fácil de leer y modificar.

### Las etiquetas que más usarás

\`\`\`html
<header>   — cabecera de página o sección
<nav>      — navegación principal
<main>     — contenido principal (único por página)
<section>  — sección temática con heading propio
<article>  — contenido independiente (post, card)
<aside>    — contenido relacionado pero secundario
<footer>   — pie de página o sección
\`\`\`

### Estructura base de cualquier página

\`\`\`html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi página</title>
</head>
<body>
  <header>
    <nav>...</nav>
  </header>
  <main>
    <section>
      <h1>Título principal</h1>
      <p>Contenido...</p>
    </section>
  </main>
  <footer>...</footer>
</body>
</html>
\`\`\`

### Jerarquía de headings

Usa **un solo \`<h1>\`** por página. Los headings crean un outline lógico:

\`\`\`
h1 — Título de la página
  h2 — Sección principal
    h3 — Subsección
      h4 — Sub-subsección (úsala con cuidado)
\`\`\`

### Tip: formularios semánticos

\`\`\`html
<form>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>
  <button type="submit">Enviar</button>
</form>
\`\`\`

El \`label\` con \`for\` conectado al \`id\` del input mejora accesibilidad y UX (click en label activa el input).`,
        completed: false,
      },
      {
        id: 'w1-l1b',
        title: 'Mini-práctica: Escribe el HTML de tu página "Sobre mí"',
        type: 'practice',
        tasks: [
          'Crea un archivo index.html con estructura semántica completa (header, main, footer)',
          'Incluye nav con 3 links (aunque sean #), main con h1 + 2 secciones, footer con tu nombre',
          'Valida el HTML en validator.w3.org — cero errores antes de continuar',
          'Agrega una sección <article> con una mini-bio de 3 párrafos',
        ],
        tip: 'No uses <div> para nada que tenga una etiqueta semántica equivalente. Si dudas, pregúntate: ¿esta etiqueta describe QUÉ es el contenido?',
        completed: false,
      },
      {
        id: 'w1-l2',
        title: 'CSS moderno: Flexbox, Grid y el box model',
        type: 'reading',
        content: `## CSS moderno

CSS en 2025 es más poderoso que nunca. Dominar el box model, Flexbox y Grid te da el 90% de lo que necesitas para cualquier layout.

### El Box Model

Todo elemento HTML es una caja:

\`\`\`
┌─────────────────────────┐
│         margin          │
│  ┌───────────────────┐  │
│  │      border       │  │
│  │  ┌─────────────┐  │  │
│  │  │   padding   │  │  │
│  │  │  ┌───────┐  │  │  │
│  │  │  │content│  │  │  │
│  │  │  └───────┘  │  │  │
│  │  └─────────────┘  │  │
│  └───────────────────┘  │
└─────────────────────────┘
\`\`\`

**Regla de oro**: usa siempre \`box-sizing: border-box\`:

\`\`\`css
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`

Esto hace que padding y border se incluyan en el width, no se sumen.

### Flexbox — para layouts de una dimensión

\`\`\`css
.container {
  display: flex;
  justify-content: space-between; /* eje principal (horizontal) */
  align-items: center;            /* eje cruzado (vertical) */
  gap: 1rem;
}
\`\`\`

Casos de uso ideales: navbars, cards en fila, centrar un elemento.

### Grid — para layouts de dos dimensiones

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* Layout complejo */
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
}
\`\`\`

### Responsive con CSS moderno

\`\`\`css
/* Fluid grid sin media queries */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

/* Fluid typography */
.heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* Media queries cuando sí son necesarias */
@media (max-width: 768px) {
  .nav-links { display: none; }
}
\`\`\`

### Custom Properties (variables CSS)

\`\`\`css
:root {
  --color-primary: #9A7235;
  --spacing-md: 1rem;
  --radius: 0.5rem;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius);
}
\`\`\`

Variables CSS son la base de cualquier design system.`,
        completed: false,
      },
      {
        id: 'w1-l2b',
        title: 'Mini-práctica: Dale estilos a tu página "Sobre mí"',
        type: 'practice',
        tasks: [
          'Define custom properties en :root para colores, tipografía y espaciado',
          'Usa Flexbox para el navbar (logo a la izquierda, links a la derecha)',
          'Usa Grid para una sección de skills o proyectos (3 columnas en desktop, 1 en mobile)',
          'Implementa al menos 1 media query para adaptar el layout en pantallas pequeñas',
          'Prueba en Chrome DevTools en mobile view — debe verse bien en 375px de ancho',
        ],
        tip: 'Empieza con mobile-first: escribe los estilos base para mobile y usa media queries con min-width para desktop. Es más fácil agregar complejidad que quitarla.',
        completed: false,
      },
      {
        id: 'w1-l3',
        title: 'Tipografía web, colores y accesibilidad visual',
        type: 'reading',
        content: `## Tipografía web y accesibilidad visual

El 95% de la información en la web es texto. Dominar tipografía es dominar diseño web.

### Cargar fuentes correctamente

\`\`\`html
<!-- Google Fonts — en el <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
\`\`\`

\`\`\`css
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
\`\`\`

### Escala tipográfica

Una escala consistente crea armonía visual:

\`\`\`css
:root {
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
}
\`\`\`

### Contraste de color (WCAG)

Para que el texto sea legible y accesible:

- **Normal text**: ratio mínimo 4.5:1
- **Large text** (18px+ o 14px+ bold): ratio mínimo 3:1
- **UI components**: ratio mínimo 3:1

Herramienta gratuita: **coolors.co/contrast-checker**

\`\`\`css
/* ✅ Buen contraste */
color: #1A1512;
background: #FAFAF7;

/* ❌ Mal contraste */
color: #999999;
background: #FFFFFF;
\`\`\`

### Line-height y letter-spacing

\`\`\`css
body {
  line-height: 1.65; /* Cómodo para lectura de párrafos */
}

h1, h2 {
  line-height: 1.2;  /* Headings más apretados */
  letter-spacing: -0.02em; /* Tracking negativo en display */
}

.caption {
  letter-spacing: 0.05em; /* Tracking positivo en texto pequeño */
  text-transform: uppercase;
}
\`\`\`

### Measure (longitud de línea)

La longitud ideal de una línea de texto es **60-75 caracteres**:

\`\`\`css
.content {
  max-width: 65ch; /* ch = ancho del carácter '0' */
}
\`\`\``,
        completed: false,
      },
      {
        id: 'w1-l3b',
        title: 'Mini-práctica: Refinamiento tipográfico y paleta de colores',
        type: 'practice',
        tasks: [
          'Integra Google Fonts a tu proyecto (elige 1-2 fuentes complementarias)',
          'Define una escala tipográfica con custom properties y aplícala consistentemente',
          'Verifica el contraste de todos tus colores de texto en coolors.co/contrast-checker',
          'Limita el ancho de tus párrafos a max 65ch para legibilidad óptima',
          'Documenta tu paleta de colores en un comentario CSS con los hex codes y sus usos',
        ],
        tip: 'Empareja una fuente serif (Playfair Display, Lora) con una sans-serif (Inter, Plus Jakarta Sans) para dar jerarquía visual sin necesitar muchos tamaños distintos.',
        completed: false,
      },
          {
        id: 'web-1-proj-basico',
        title: 'Proyecto Básico: Landing page con HTML y CSS',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Construye una landing page completa con HTML, CSS y mínimo JavaScript. Responsiva y publicada en internet.',
        deliverables: [
          'Landing page con hero, 3 secciones de contenido y footer',
          'Responsive: bien en mobile (375px), tablet (768px) y desktop (1280px)',
          'URL pública en Vercel, Netlify o GitHub Pages',
          'Screenshot de Lighthouse con Performance > 85',
        ],
        tip: 'Empieza por el mobile layout. Escalar a desktop es más fácil que reducir.',
        completed: false,
      },
      {
        id: 'web-1-proj-inter',
        title: 'Proyecto Intermedio: Landing page con Next.js + Tailwind',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Construye una landing page con el stack moderno: Next.js App Router + TypeScript + Tailwind CSS + formulario funcional.',
        deliverables: [
          'Proyecto Next.js con TypeScript strict y estructura App Router correcta',
          'Cero \'any\' — todo tipado correctamente',
          'Formulario de contacto con validación cliente y servidor (Zod)',
          'Animaciones de entrada en CSS puro (no librerías)',
          'Deploy en Vercel con URL pública',
          'Lighthouse Performance > 90 en mobile',
        ],
        tip: 'Si tardas más de 5 minutos decidiendo Server vs Client Component, aplica la regla: si necesita estado, eventos o hooks del browser → Client. Todo lo demás → Server.',
        completed: false,
      },
],
    resources: [
      {
        title: 'MDN Web Docs — HTML Reference',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        type: 'documentation',
      },
      {
        title: 'CSS Tricks — A Complete Guide to Flexbox',
        url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox',
        type: 'article',
      },
      {
        title: 'CSS Tricks — A Complete Guide to Grid',
        url: 'https://css-tricks.com/snippets/css/complete-guide-grid',
        type: 'article',
      },
      {
        title: 'Google Fonts',
        url: 'https://fonts.google.com',
        type: 'tool',
      },
    ],
  },

  {
    id: 'web-2',
    number: 13,
    title: 'JavaScript Moderno (ES2024)',
    description: 'De las bases de JS a async/await, fetch y manipulación del DOM — el lenguaje que da vida a cualquier interfaz web.',
    duration: '4 semanas',
    status: 'available',
    track: 'web',
    lessons: [
      {
        id: 'w2-l1',
        title: 'Variables, funciones y el flujo de JavaScript',
        type: 'reading',
        content: `## JavaScript moderno: las bases

JavaScript es el único lenguaje que corre nativamente en el navegador. Entenderlo bien es no-negociable para cualquier desarrollador web.

### Variables

\`\`\`javascript
// const — valor que no cambia (úsala por default)
const nombre = 'Gabriel';
const API_URL = 'https://api.ejemplo.com';

// let — valor que puede cambiar
let contador = 0;
contador = contador + 1;

// var — NO usar (scope confuso, problemático)
\`\`\`

### Tipos de datos

\`\`\`javascript
const texto = 'Hola mundo';          // string
const numero = 42;                    // number
const decimal = 3.14;                 // number (no hay int separado)
const activo = true;                  // boolean
const vacio = null;                   // null (ausencia intencional)
const indefinido = undefined;         // undefined
const objeto = { nombre: 'Gabriel' }; // object
const lista = [1, 2, 3];             // array (también es object)
\`\`\`

### Funciones

\`\`\`javascript
// Declaración clásica
function saludar(nombre) {
  return \`Hola, \${nombre}!\`;
}

// Arrow function (moderna, más concisa)
const saludar = (nombre) => \`Hola, \${nombre}!\`;

// Con múltiples líneas
const calcular = (a, b) => {
  const resultado = a + b;
  return resultado;
};

// Parámetros por default
const conectar = (host = 'localhost', puerto = 3000) => {
  return \`\${host}:\${puerto}\`;
};
\`\`\`

### Destructuring (muy usado en React)

\`\`\`javascript
// Objetos
const usuario = { nombre: 'Gabriel', email: 'g@mail.com', rol: 'admin' };
const { nombre, email } = usuario;

// Con renombrado
const { nombre: nombreUsuario } = usuario;

// Arrays
const colores = ['rojo', 'verde', 'azul'];
const [primero, segundo] = colores;

// En parámetros de función
const mostrarUsuario = ({ nombre, rol }) => {
  console.log(\`\${nombre} — \${rol}\`);
};
\`\`\`

### Spread y Rest

\`\`\`javascript
// Spread: expandir
const extras = { admin: false };
const usuarioCompleto = { ...usuario, ...extras };

// Rest: agrupar el resto
const [cabeza, ...cola] = [1, 2, 3, 4, 5];
// cabeza = 1, cola = [2, 3, 4, 5]
\`\`\`

### Array methods esenciales

\`\`\`javascript
const productos = [
  { nombre: 'Laptop', precio: 1200 },
  { nombre: 'Mouse', precio: 25 },
  { nombre: 'Teclado', precio: 80 },
];

// map — transforma cada elemento
const nombres = productos.map(p => p.nombre);
// ['Laptop', 'Mouse', 'Teclado']

// filter — filtra según condición
const caros = productos.filter(p => p.precio > 50);

// find — primer elemento que cumple
const laptop = productos.find(p => p.nombre === 'Laptop');

// reduce — acumula en un valor
const total = productos.reduce((acc, p) => acc + p.precio, 0);
// 1305
\`\`\``,
        completed: false,
      },
      {
        id: 'w2-l1b',
        title: 'Mini-práctica: Manipula datos con JS puro',
        type: 'practice',
        tasks: [
          'Crea un array de 5 objetos "proyecto" con propiedades: titulo, tecnologia, año, destacado (boolean)',
          'Usa .filter() para obtener solo los proyectos destacados',
          'Usa .map() para crear un array de strings con formato "titulo — tecnologia (año)"',
          'Usa .find() para encontrar el proyecto más reciente',
          'Usa .reduce() para contar cuántos proyectos hay por tecnología (resultado: objeto)',
          'Consola todos los resultados con console.log descriptivos',
        ],
        tip: 'Encadena métodos cuando tenga sentido: productos.filter(...).map(...). Pero si la cadena supera 3 métodos, considera variables intermedias para legibilidad.',
        completed: false,
      },
      {
        id: 'w2-l2',
        title: 'DOM: hacer que la página responda al usuario',
        type: 'reading',
        content: `## Manipulación del DOM

El DOM (Document Object Model) es la representación en JavaScript de tu HTML. Manipularlo es cómo haces que las páginas sean interactivas.

### Seleccionar elementos

\`\`\`javascript
// querySelector — el más versátil (CSS selectors)
const titulo = document.querySelector('h1');
const boton = document.querySelector('.btn-primary');
const form = document.querySelector('#contact-form');

// querySelectorAll — todos los que coincidan (NodeList)
const cards = document.querySelectorAll('.card');
cards.forEach(card => console.log(card));

// getElementById — específico para IDs (más rápido)
const nav = document.getElementById('navbar');
\`\`\`

### Modificar elementos

\`\`\`javascript
// Contenido
titulo.textContent = 'Nuevo título'; // solo texto, seguro
titulo.innerHTML = '<span>Título</span>'; // HTML (cuidado con XSS)

// Estilos
boton.style.backgroundColor = '#9A7235';
boton.style.display = 'none'; // ocultar

// Clases
elemento.classList.add('activo');
elemento.classList.remove('oculto');
elemento.classList.toggle('expandido');
elemento.classList.contains('activo'); // → boolean

// Atributos
input.setAttribute('disabled', true);
input.getAttribute('placeholder');
imagen.src = 'nueva-foto.jpg';
\`\`\`

### Eventos

\`\`\`javascript
// Click
boton.addEventListener('click', (event) => {
  event.preventDefault(); // evita comportamiento default (útil en forms)
  console.log('Botón clickeado');
});

// Input en tiempo real
const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', (e) => {
  console.log(e.target.value);
});

// Submit de formulario
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const datos = new FormData(e.target);
  const email = datos.get('email');
  console.log(email);
});

// Múltiples elementos (event delegation)
document.querySelector('.lista').addEventListener('click', (e) => {
  if (e.target.matches('.item')) {
    e.target.classList.toggle('completado');
  }
});
\`\`\`

### Crear y remover elementos

\`\`\`javascript
// Crear
const card = document.createElement('div');
card.className = 'card';
card.textContent = 'Nueva card';

// Agregar al DOM
const contenedor = document.querySelector('.grid');
contenedor.appendChild(card);

// O con insertAdjacentHTML (más eficiente para HTML complejo)
contenedor.insertAdjacentHTML('beforeend', \`
  <div class="card">
    <h3>Título</h3>
    <p>Descripción</p>
  </div>
\`);

// Remover
card.remove();
\`\`\``,
        completed: false,
      },
      {
        id: 'w2-l2b',
        title: 'Mini-práctica: Lista de proyectos interactiva',
        type: 'practice',
        tasks: [
          'Crea una lista de 5 proyectos en JS (array de objetos) y renderízalos dinámicamente al DOM con insertAdjacentHTML',
          'Agrega un input de búsqueda que filtre proyectos en tiempo real (evento "input")',
          'Agrega un botón "Destacar" en cada card que toggle una clase CSS "destacado"',
          'Agrega un contador que muestre cuántos proyectos están destacados',
          'Implementa un botón "Agregar proyecto" que solicite nombre con prompt() y lo agregue a la lista',
        ],
        tip: 'Para actualizar la lista al filtrar, limpia el contenedor con innerHTML = "" y renderiza de nuevo con el array filtrado. Es menos eficiente que técnicas virtuales, pero correcto para aprender.',
        completed: false,
      },
      {
        id: 'w2-l3',
        title: 'Async JS: Fetch, Promises y async/await',
        type: 'reading',
        content: `## JavaScript asíncrono

El código asíncrono te permite hacer requests HTTP, leer archivos y esperar operaciones lentas sin bloquear la interfaz.

### El problema del código sincrónico

\`\`\`javascript
// ❌ Esto bloquearía el navegador:
const datos = fetchDatos(); // imaginemos que tarda 2 segundos
mostrar(datos); // mientras espera, nada funciona
\`\`\`

### Promises

Una Promise representa un valor futuro — puede estar pendiente, resuelta o rechazada.

\`\`\`javascript
const promesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('Éxito');
    } else {
      reject(new Error('Falló'));
    }
  }, 1000);
});

promesa
  .then(resultado => console.log(resultado))
  .catch(error => console.error(error));
\`\`\`

### async/await — la forma moderna

\`\`\`javascript
// async convierte la función en asíncrona
const obtenerUsuario = async (id) => {
  try {
    // await "pausa" hasta que la Promise se resuelva
    const respuesta = await fetch(\`https://api.ejemplo.com/users/\${id}\`);

    if (!respuesta.ok) {
      throw new Error(\`Error HTTP: \${respuesta.status}\`);
    }

    const usuario = await respuesta.json();
    return usuario;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    throw error; // re-throw para que el caller pueda manejarlo
  }
};

// Usar la función async
const mostrarUsuario = async () => {
  const usuario = await obtenerUsuario(1);
  document.querySelector('.nombre').textContent = usuario.name;
};

mostrarUsuario();
\`\`\`

### Fetch API

\`\`\`javascript
// GET
const response = await fetch('https://jsonplaceholder.typicode.com/posts');
const posts = await response.json();

// POST
const response = await fetch('https://api.ejemplo.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${token}\`,
  },
  body: JSON.stringify({
    title: 'Mi post',
    body: 'Contenido...',
    userId: 1,
  }),
});
const nuevoPost = await response.json();
\`\`\`

### Promise.all — paralelo

\`\`\`javascript
// ❌ Secuencial (lento: 3 segundos total)
const usuarios = await obtenerUsuarios();
const posts = await obtenerPosts();
const comentarios = await obtenerComentarios();

// ✅ Paralelo (rápido: máximo 1 segundo)
const [usuarios, posts, comentarios] = await Promise.all([
  obtenerUsuarios(),
  obtenerPosts(),
  obtenerComentarios(),
]);
\`\`\``,
        completed: false,
      },
      {
        id: 'w2-l3b',
        title: 'Mini-práctica: Conecta tu app con una API real',
        type: 'practice',
        tasks: [
          'Usa la API pública JSONPlaceholder (jsonplaceholder.typicode.com) para obtener 10 posts',
          'Renderiza los posts en el DOM con título y cuerpo, mostrando un loading state mientras carga',
          'Agrega manejo de errores: si el fetch falla, muestra un mensaje de error al usuario',
          'Implementa un botón "Recargar" que vuelva a hacer el fetch',
          'Bonus: agrega un input que filtre posts por contenido del título en tiempo real',
        ],
        tip: 'Siempre muestra feedback al usuario: un spinner mientras carga, un mensaje si hay error, y el contenido cuando llega. Nunca dejes la interfaz en silencio mientras espera.',
        completed: false,
      },
          {
        id: 'web-2-proj-inter',
        title: 'Proyecto Intermedio: Componente React reutilizable',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Diseña e implementa un componente React completamente tipado y reutilizable que funcione en 3 contextos diferentes.',
        deliverables: [
          'Componente React con TypeScript: interfaz Props completa y documentada',
          'Al menos 3 variantes (size, variant o state)',
          'Demo page mostrando todas las variantes',
          'README: cómo usarlo, qué props acepta y ejemplos de código',
        ],
        tip: 'Un componente bien diseñado tiene una sola responsabilidad. Si el nombre tiene un "y" en el medio, probablemente son dos componentes.',
        completed: false,
      },
      {
        id: 'web-2-proj-pro',
        title: 'Proyecto Profesional: App full-stack con autenticación',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: 'Construye una aplicación web completa con Next.js, autenticación de usuarios y persistencia de datos.',
        deliverables: [
          'Next.js App Router con TypeScript strict — cero \'any\'',
          'Autenticación completa: registro, login, sesión (NextAuth.js o Supabase Auth)',
          'Al menos 3 páginas protegidas que requieran login',
          'Base de datos con mínimo 2 tablas relacionadas (Supabase o similar)',
          'API routes tipadas con validación Zod',
          'Deploy en Vercel con .env configurado',
          'README con instrucciones de setup desde cero',
        ],
        rubrica: [
          'Las rutas protegidas son inaccesibles sin auth (no solo hidden en UI)',
          'La validación ocurre en cliente y en servidor',
          'Las variables sensibles están en .env y no committeadas',
          'La app funciona siguiendo solo el README',
        ],
        tip: 'Dibuja el esquema de base de datos antes de codear. Un schema mal pensado al inicio cuesta 10x reescribir al final.',
        completed: false,
      },
],
    resources: [
      {
        title: 'javascript.info — The Modern JavaScript Tutorial',
        url: 'https://javascript.info',
        type: 'course',
      },
      {
        title: 'JSONPlaceholder — Free Fake REST API',
        url: 'https://jsonplaceholder.typicode.com',
        type: 'tool',
      },
      {
        title: 'MDN — Fetch API',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
        type: 'documentation',
      },
    ],
  },

  {
    id: 'web-3',
    number: 14,
    title: 'React y Next.js App Router',
    description: 'Construye interfaces modernas con componentes reutilizables, estado reactivo y el poder del App Router de Next.js.',
    duration: '5 semanas',
    status: 'available',
    track: 'web',
    lessons: [
      {
        id: 'w3-l1',
        title: 'React: componentes, props y estado',
        type: 'reading',
        content: `## React: el pensamiento en componentes

React es una librería para construir interfaces como árbol de componentes reutilizables. Cada componente es una función que recibe datos (props) y retorna JSX.

### Tu primer componente

\`\`\`tsx
// Un componente es una función que retorna JSX
const Saludo = () => {
  return <h1>Hola desde React</h1>;
};

// Con props (propiedades — datos que recibe el componente)
interface CardProps {
  titulo: string;
  descripcion: string;
  destacado?: boolean; // opcional
}

const Card = ({ titulo, descripcion, destacado = false }: CardProps) => {
  return (
    <div className={\`card \${destacado ? 'card--destacada' : ''}\`}>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </div>
  );
};
\`\`\`

### useState — estado local del componente

\`\`\`tsx
import { useState } from 'react';

const Contador = () => {
  // [valor, función para actualizarlo]
  const [count, setCount] = useState(0);
  const [nombre, setNombre] = useState('');

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>

      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre"
      />
      <p>Hola, {nombre || 'visitante'}</p>
    </div>
  );
};
\`\`\`

### Renderizado de listas

\`\`\`tsx
interface Proyecto {
  id: number;
  titulo: string;
  tecnologia: string;
}

const proyectos: Proyecto[] = [
  { id: 1, titulo: 'Portfolio', tecnologia: 'Next.js' },
  { id: 2, titulo: 'E-commerce', tecnologia: 'React' },
];

const ListaProyectos = () => {
  return (
    <ul>
      {proyectos.map((proyecto) => (
        // key es obligatorio — ayuda a React a identificar elementos
        <li key={proyecto.id}>
          {proyecto.titulo} — {proyecto.tecnologia}
        </li>
      ))}
    </ul>
  );
};
\`\`\`

### useEffect — efectos secundarios

\`\`\`tsx
import { useState, useEffect } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Se ejecuta después de que el componente se monta
    const fetchPosts = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      setPosts(data.slice(0, 10));
      setLoading(false);
    };

    fetchPosts();
  }, []); // [] = solo al montar, sin dependencias

  if (loading) return <p>Cargando...</p>;

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
\`\`\``,
        completed: false,
      },
      {
        id: 'w3-l1b',
        title: 'Mini-práctica: Tu primera app React con estado',
        type: 'practice',
        tasks: [
          'Crea un componente TodoList con useState para manejar una lista de tareas',
          'Implementa agregar tarea (input + botón), marcar como completada (checkbox) y eliminar (botón x)',
          'Agrega un contador que muestre "X de Y tareas completadas"',
          'Filtra la lista para mostrar: todas / pendientes / completadas',
          'Extrae los componentes en archivos separados: TodoList, TodoItem, TodoFilter',
        ],
        tip: 'Cuando el estado se vuelve complejo (múltiples valores relacionados), considera useReducer. Para este ejercicio useState está perfecto — no sobre-ingenierices.',
        completed: false,
      },
      {
        id: 'w3-l2',
        title: 'Next.js App Router: rutas, layouts y Server Components',
        type: 'reading',
        content: `## Next.js App Router

Next.js con App Router es el estándar de la industria para React en producción. La convención de archivos define las rutas automáticamente.

### Estructura de carpetas

\`\`\`
app/
├── layout.tsx          → Layout raíz (siempre presente)
├── page.tsx            → Ruta: /
├── about/
│   └── page.tsx        → Ruta: /about
├── blog/
│   ├── page.tsx        → Ruta: /blog
│   └── [slug]/
│       └── page.tsx    → Ruta: /blog/:slug (dinámica)
└── api/
    └── contact/
        └── route.ts    → Ruta API: /api/contact
\`\`\`

### layout.tsx — el contenedor persistente

\`\`\`tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi sitio',
  description: 'Descripción para SEO',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <nav>Mi navbar</nav>
        {children}  {/* Aquí se renderiza la página activa */}
        <footer>Mi footer</footer>
      </body>
    </html>
  );
}
\`\`\`

### Server Components vs Client Components

**Por default, todos los componentes en App Router son Server Components.**

\`\`\`tsx
// Server Component (sin 'use client')
// ✅ Puede hacer fetch directamente
// ✅ Accede a datos del servidor (DB, variables de entorno)
// ❌ No puede usar useState, useEffect, event handlers
const Pagina = async () => {
  const posts = await fetch('https://api.ejemplo.com/posts').then(r => r.json());

  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
};

// Client Component
'use client'; // Necesario cuando usas hooks o eventos

import { useState } from 'react';

const Boton = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <button onClick={() => setClicked(true)}>
      {clicked ? 'Clickeado!' : 'Click me'}
    </button>
  );
};
\`\`\`

### Rutas dinámicas y params

\`\`\`tsx
// app/blog/[slug]/page.tsx
interface Props {
  params: { slug: string };
}

const BlogPost = async ({ params }: Props) => {
  const post = await fetchPost(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
};

export default BlogPost;
\`\`\`

### API Routes

\`\`\`typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, mensaje } = body;

  // Validar, guardar en DB, enviar email...

  return NextResponse.json({ success: true });
}
\`\`\``,
        completed: false,
      },
      {
        id: 'w3-l2b',
        title: 'Mini-práctica: Portfolio con Next.js App Router',
        type: 'practice',
        tasks: [
          'Crea un proyecto Next.js nuevo con create-next-app (TypeScript + Tailwind + App Router)',
          'Implementa layout.tsx con navbar y footer que persistan en todas las páginas',
          'Crea app/page.tsx (home) con hero section y lista de proyectos hardcodeada',
          'Crea app/proyectos/[id]/page.tsx para el detalle de cada proyecto',
          'Agrega metadata (title, description) a cada página — verifica en el <title> del HTML',
          'Despliega en Vercel con "vercel" CLI o conectando el repo en vercel.com',
        ],
        tip: 'Cuando veas que un componente necesita estado o eventos, conviértelo en Client Component con "use client". Mantén Server Components para todo lo que pueda ser estático o necesite datos del servidor.',
        completed: false,
      },
      {
        id: 'w3-l3',
        title: 'TypeScript en React: tipos, interfaces y generics',
        type: 'reading',
        content: `## TypeScript en React

TypeScript añade tipos estáticos a JavaScript, catching errores en desarrollo antes de que lleguen a producción. En Next.js es el estándar — aprenderlo bien te ahorra horas de debugging.

### Tipos básicos

\`\`\`typescript
// Primitivos
const nombre: string = 'Gabriel';
const edad: number = 28;
const activo: boolean = true;

// Arrays
const tecnologias: string[] = ['React', 'Next.js', 'TypeScript'];
const precios: number[] = [100, 200, 300];

// Funciones
const saludar = (nombre: string): string => {
  return \`Hola, \${nombre}\`;
};

// Void — función que no retorna valor
const log = (mensaje: string): void => {
  console.log(mensaje);
};
\`\`\`

### Interfaces y Types

\`\`\`typescript
// Interface — para describir la forma de un objeto
interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  url?: string; // opcional
  destacado: boolean;
}

// Type — más versátil, puede ser unión, intersección, etc.
type Estado = 'activo' | 'inactivo' | 'pendiente';
type ID = string | number;

// Combinar tipos
type ProyectoConEstado = Proyecto & {
  estado: Estado;
  fechaCreacion: Date;
};
\`\`\`

### TypeScript en componentes React

\`\`\`tsx
// Props con interface
interface CardProps {
  proyecto: Proyecto;
  onSeleccionar: (id: number) => void;
  className?: string;
}

const Card = ({ proyecto, onSeleccionar, className }: CardProps) => {
  return (
    <div
      className={className}
      onClick={() => onSeleccionar(proyecto.id)}
    >
      <h3>{proyecto.titulo}</h3>
    </div>
  );
};

// useState con tipo explícito
const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);
const [tecnologias, setTecnologias] = useState<string[]>([]);

// Eventos
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
\`\`\`

### Generics — tipos reutilizables

\`\`\`typescript
// Una función que funciona con cualquier tipo
const primero = <T>(array: T[]): T | undefined => {
  return array[0];
};

const primerNombre = primero(['Gabriel', 'Ana', 'Luis']); // tipo: string
const primerNumero = primero([1, 2, 3]); // tipo: number

// Hook genérico para fetch
const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  // ...
  return { data, loading };
};

const { data: usuarios } = useFetch<Usuario[]>('/api/users');
\`\`\``,
        completed: false,
      },
      {
        id: 'w3-l3b',
        title: 'Mini-práctica: Tipea toda tu app de portfolio',
        type: 'practice',
        tasks: [
          'Define interfaces TypeScript para todos los datos de tu app (Proyecto, Habilidad, etc.)',
          'Elimina todos los any del código — usa unknown + narrowing donde sea necesario',
          'Tipa todos los props de componentes con interfaces explícitas',
          'Tipa todos los event handlers (React.MouseEvent, React.ChangeEvent, etc.)',
          'Ejecuta npx tsc --noEmit — debe pasar sin errores antes de continuar',
        ],
        tip: 'Si TypeScript te da un error que no entiendes, pégalo en Claude con el contexto del código. Generalmente hay una solución simple que el error no comunica bien.',
        completed: false,
      },
          {
        id: 'web-3-proj-basico',
        title: 'Proyecto Básico: API REST con 3 endpoints',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Construye una API REST mínima con 3 endpoints usando las API Routes de Next.js.',
        deliverables: [
          'Mínimo 3 API routes: GET (listar), POST (crear), GET by ID',
          'Validación de entrada con Zod en el endpoint POST',
          'Respuestas de error correctas: 400, 404 y 500 con mensajes útiles',
          'Prueba de cada endpoint en Thunder Client o Postman (screenshots)',
        ],
        tip: 'Una API que devuelve errores genéricos es imposible de debuggear. Los mensajes de error deben ser útiles para quien los consume.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Next.js Docs — App Router',
        url: 'https://nextjs.org/docs/app',
        type: 'documentation',
      },
      {
        title: 'React Docs — Learn React',
        url: 'https://react.dev/learn',
        type: 'documentation',
      },
      {
        title: 'TypeScript — The Basics',
        url: 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html',
        type: 'documentation',
      },
    ],
  },

  {
    id: 'web-4',
    number: 15,
    title: 'Backend con Supabase y Deploy en Vercel',
    description: 'Conecta tu app a una base de datos real con Supabase, implementa autenticación y despliega en producción en Vercel.',
    duration: '4 semanas',
    status: 'available',
    track: 'web',
    lessons: [
      {
        id: 'w4-l1',
        title: 'Supabase: base de datos, Auth y Storage en minutos',
        type: 'reading',
        content: `## Supabase: el backend para founders

Supabase es una alternativa open-source a Firebase. Te da Postgres, autenticación, storage de archivos y API en tiempo real — todo listo para usar sin configurar servidores.

### Por qué Supabase

- **Postgres real**: no un NoSQL simplificado — queries complejas, joins, índices
- **Auth incluida**: email/password, magic links, OAuth (Google, GitHub) sin configurar nada
- **API automática**: genera una REST API y cliente TypeScript de tu esquema de DB
- **Dashboard visual**: crea tablas, ve datos, ejecuta SQL en el browser
- **Free tier generoso**: 500MB de DB, 1GB storage, 50,000 MAU

### Setup inicial

\`\`\`bash
# Instalar cliente Supabase
npm install @supabase/supabase-js

# Variables de entorno en .env.local
NEXT_PUBLIC_SUPABASE_URL=https://tuproyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
\`\`\`

\`\`\`typescript
// lib/supabase.ts — cliente singleton
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
\`\`\`

### CRUD básico

\`\`\`typescript
// SELECT — obtener datos
const { data: proyectos, error } = await supabase
  .from('proyectos')
  .select('*')
  .order('created_at', { ascending: false });

// SELECT con filtros
const { data: destacados } = await supabase
  .from('proyectos')
  .select('id, titulo, url')
  .eq('destacado', true)
  .limit(6);

// INSERT
const { data, error } = await supabase
  .from('proyectos')
  .insert({
    titulo: 'Mi proyecto',
    descripcion: 'Descripción...',
    destacado: false,
  })
  .select()
  .single();

// UPDATE
const { error } = await supabase
  .from('proyectos')
  .update({ destacado: true })
  .eq('id', proyectoId);

// DELETE
const { error } = await supabase
  .from('proyectos')
  .delete()
  .eq('id', proyectoId);
\`\`\`

### Autenticación

\`\`\`typescript
// Registro
const { data, error } = await supabase.auth.signUp({
  email: 'usuario@email.com',
  password: 'contraseña-segura',
});

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'usuario@email.com',
  password: 'contraseña-segura',
});

// Sesión actual
const { data: { user } } = await supabase.auth.getUser();

// Logout
await supabase.auth.signOut();

// OAuth con Google
const { error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
});
\`\`\`

### Row Level Security (RLS)

RLS es el sistema de permisos de Supabase. Cada fila en la DB puede tener reglas de quién puede leerla/modificarla.

\`\`\`sql
-- Solo el dueño puede ver sus proyectos
CREATE POLICY "Usuarios ven sus proyectos"
ON proyectos FOR SELECT
USING (auth.uid() = user_id);

-- Solo el dueño puede insertar
CREATE POLICY "Usuarios insertan sus proyectos"
ON proyectos FOR INSERT
WITH CHECK (auth.uid() = user_id);
\`\`\``,
        completed: false,
      },
      {
        id: 'w4-l1b',
        title: 'Mini-práctica: Conecta tu portfolio a Supabase',
        type: 'practice',
        tasks: [
          'Crea un proyecto en supabase.com y una tabla "proyectos" con: id, titulo, descripcion, tecnologias (text[]), url, destacado, created_at',
          'Instala @supabase/supabase-js y crea el cliente en lib/supabase.ts',
          'Reemplaza los datos hardcodeados de tu portfolio por un fetch a Supabase en el Server Component',
          'Habilita RLS en la tabla y crea una política SELECT pública (para que cualquiera pueda leer)',
          'Agrega 3-5 proyectos reales desde el Dashboard de Supabase y verifica que aparecen en tu app',
        ],
        tip: 'Nunca uses la service_role key en el frontend — solo la anon key. La service_role bypasea RLS y daría acceso total a tu base de datos a cualquiera que inspeccione el código.',
        completed: false,
      },
      {
        id: 'w4-l2',
        title: 'Deploy en Vercel: de localhost a producción',
        type: 'reading',
        content: `## Deploy en Vercel

Vercel es la plataforma de deployment para Next.js — creada por el mismo equipo. Deploy en segundos, CDN global, previews automáticos por branch.

### Vercel CLI

\`\`\`bash
# Instalar globalmente
npm install -g vercel

# Login
vercel login

# Deploy desde tu carpeta del proyecto
vercel

# Deploy a producción
vercel --prod
\`\`\`

### Variables de entorno en Vercel

Las variables de .env.local NO se suben a git. Debes configurarlas en Vercel:

\`\`\`bash
# Via CLI
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# O desde el dashboard: vercel.com → Project → Settings → Environment Variables
\`\`\`

### Conectar repositorio de GitHub

1. Ir a vercel.com → "Add New Project"
2. Conectar tu GitHub y seleccionar el repositorio
3. Configurar variables de entorno
4. Click "Deploy"

Ahora **cada push a main despliega automáticamente**. Cada PR crea un preview URL.

### vercel.json — configuración avanzada

\`\`\`json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
\`\`\`

### Optimización antes de deploy

\`\`\`bash
# Build local para detectar errores antes de subir
npm run build

# Check:
# ✅ Sin errores de TypeScript
# ✅ Sin errores de build
# ✅ Bundle sizes razonables (Vercel los muestra)
# ✅ Variables de entorno configuradas en Vercel
\`\`\`

### Dominios custom

\`\`\`bash
# Agregar dominio desde CLI
vercel domains add midominio.com

# O desde el dashboard: Project → Settings → Domains
\`\`\`

Vercel maneja certificados SSL automáticamente. Tu sitio tiene HTTPS desde el primer deploy.

### Analytics y Web Vitals

En Vercel Pro (o con @vercel/analytics en el free tier):

\`\`\`tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
\`\`\``,
        completed: false,
      },
      {
        id: 'w4-l2b',
        title: 'Mini-práctica: Tu portfolio en producción',
        type: 'practice',
        tasks: [
          'Ejecuta npm run build localmente — debe pasar sin errores antes de continuar',
          'Configura las variables de entorno de Supabase en vercel.com (no en el CLI)',
          'Conecta tu repositorio de GitHub a Vercel y despliega',
          'Verifica que los proyectos de Supabase cargan correctamente en la URL de producción',
          'Agrega @vercel/analytics al proyecto y verifica que aparece en el dashboard de Vercel',
          'Prueba el sitio en mobile desde tu celular real — no solo DevTools',
        ],
        tip: 'Si el build funciona en local pero falla en Vercel, el problema casi siempre son las variables de entorno. Verifica que están configuradas para el entorno correcto (Production, Preview, Development).',
        completed: false,
      },

      {
        id: 'web-exam',
        title: 'Examen final: Desarrollo Web',
        type: 'exam',
        questions: [
          {
            q: '¿Cuál es la diferencia entre un Server Component y un Client Component en Next.js App Router?',
            options: [
              'Los Server Components son más lentos porque se renderizan en el servidor',
              'Los Server Components se renderizan en el servidor (sin JS en el cliente, pueden acceder a datos directamente); los Client Components se renderizan en el browser y pueden usar useState/eventos',
              'Los Client Components son los que usan TypeScript; los Server Components usan JavaScript puro',
              'No hay diferencia real, es solo una convención de nombres',
            ],
            correct: 1,
            explanation: 'Server Components corren en el servidor: acceden a DB/APIs directamente, no envían JS al cliente, no pueden usar hooks ni event handlers. Client Components (marcados con "use client") corren en el browser: pueden usar useState, useEffect, onClick, etc. Por defecto en App Router, todos son Server Components.',
          },
          {
            q: '¿Qué hace el hook useState en React y cuándo se vuelve a renderizar el componente?',
            options: [
              'useState guarda datos en localStorage; el componente se re-renderiza al recargar la página',
              'useState guarda estado local del componente; el componente se re-renderiza cada vez que el estado cambia',
              'useState conecta el componente a la base de datos; se re-renderiza cuando cambian los datos externos',
              'useState es para variables globales; se re-renderiza cuando cualquier componente de la app cambia',
            ],
            correct: 1,
            explanation: 'useState retorna [valor, setter]. Cuando llamas al setter, React re-renderiza el componente con el nuevo valor. El estado es local al componente — no se comparte automáticamente con otros componentes. Para estado global, necesitas Context API, Zustand u otra solución.',
          },
          {
            q: '¿Qué hace el operador spread (...) en este código: const nuevo = { ...usuario, rol: "admin" }?',
            options: [
              'Elimina todas las propiedades de usuario y solo deja rol: "admin"',
              'Crea un nuevo objeto con todas las propiedades de usuario, y agrega/sobreescribe rol con "admin"',
              'Combina usuario con otro objeto llamado admin',
              'Genera un error porque no se puede usar spread con objetos',
            ],
            correct: 1,
            explanation: 'El spread operator (...) copia todas las propiedades enumerables del objeto original al nuevo objeto. Si ya existe la propiedad, se sobreescribe con el valor nuevo. Es el patrón estándar para crear copias inmutables de objetos con modificaciones en React y TypeScript.',
          },
          {
            q: '¿Cuál es la diferencia entre async/await y .then()/.catch() en JavaScript?',
            options: [
              'async/await es más rápido en ejecución porque no usa Promises',
              'async/await es sintaxis más legible que produce el mismo comportamiento asíncrono que .then()/.catch()',
              '.then() es moderno; async/await es la versión legacy',
              'async/await solo funciona en Node.js; .then() funciona en el browser',
            ],
            correct: 1,
            explanation: 'async/await es "syntactic sugar" sobre Promises — internamente hace lo mismo que .then()/.catch() pero con código que se lee de forma secuencial (más fácil de entender y debuggear). Ambos son válidos; async/await es el estándar moderno preferido.',
          },
          {
            q: '¿Qué significa TypeScript strict mode y cuál es su beneficio principal?',
            options: [
              'Hace que el código TypeScript sea más estricto en el formato (indentación, comillas)',
              'Activa verificaciones adicionales como strictNullChecks y noImplicitAny, detectando más errores en tiempo de compilación',
              'Impide usar JavaScript puro dentro de archivos TypeScript',
              'Hace que el build sea más lento para garantizar mayor calidad',
            ],
            correct: 1,
            explanation: 'strict mode activa varias flags: strictNullChecks (null/undefined no son asignables a otros tipos), noImplicitAny (no puedes dejar variables sin tipo implícito), strictFunctionTypes, y más. El beneficio: errores que antes llegarían a producción se detectan en desarrollo.',
          },
          {
            q: '¿Cuándo deberías usar CSS Grid en lugar de Flexbox?',
            options: [
              'Grid para layouts de una dimensión (fila O columna); Flexbox para dos dimensiones',
              'Flexbox para layouts de una dimensión; Grid para layouts de dos dimensiones (filas Y columnas)',
              'Grid es obsoleto — siempre usa Flexbox',
              'Flexbox es para mobile; Grid es solo para desktop',
            ],
            correct: 1,
            explanation: 'Flexbox es ideal para layouts en una dirección (nav, cards en fila, centrar un elemento). Grid brilla en layouts bidimensionales (el layout completo de la página, galería de fotos, dashboard). En la práctica se complementan: Grid para la macro-estructura, Flexbox para componentes internos.',
          },
          {
            q: '¿Qué hace este código de Supabase: .eq("destacado", true).limit(6)?',
            options: [
              'Elimina 6 registros donde destacado sea true',
              'Selecciona todos los registros y filtra los primeros 6 en el frontend',
              'Filtra filas donde destacado = true en la base de datos y retorna máximo 6 resultados',
              'Actualiza 6 registros para que destacado sea true',
            ],
            correct: 2,
            explanation: '.eq() aplica un filtro WHERE en la query SQL (WHERE destacado = true). .limit(6) limita el resultado a 6 filas. Todo esto se ejecuta en el servidor de Supabase/Postgres — no en el cliente. Es equivalente a: SELECT * FROM tabla WHERE destacado = true LIMIT 6.',
          },
          {
            q: '¿Qué problema resuelve box-sizing: border-box y por qué es el estándar actual?',
            options: [
              'Hace que todos los elementos tengan el mismo tamaño sin importar su contenido',
              'Incluye padding y border en el width declarado, evitando que los elementos se hagan más grandes de lo esperado',
              'Elimina los márgenes entre elementos para un layout más limpio',
              'Hace que el box model use unidades relativas (rem) en lugar de píxeles',
            ],
            correct: 1,
            explanation: 'Sin border-box, un div de width:300px con padding:20px termina midiendo 340px (300 + 20×2). Con border-box, el padding se incluye dentro del width declarado: el div sigue midiendo 300px. Es el comportamiento más intuitivo y se aplica universalmente con *, *::before, *::after { box-sizing: border-box }.',
          },
        ],
        completed: false,
      },
    
    {
      id: 'web-4-p1',
      title: 'Proyecto: App full-stack con autenticación',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: 'Construye una aplicación web full-stack con Next.js + Supabase que incluya autenticación, CRUD completo de recursos, y deploy en producción. Elige el dominio: gestor de tareas, blog, o directorio de recursos.',
      deliverables: [
        'Repositorio público en GitHub',
        'URL en producción (Vercel u otro)',
        'Autenticación funcional (email o OAuth)',
        'CRUD completo con validación',
        'README con instrucciones de setup',
      ],
      rubrica: [
        'Autenticación segura, sin exponer claves',
        'UI responsive y funcional',
        'Código organizado por componentes/módulos',
        'Deploy estable en producción',
      ],
      completed: false,
    },],
    resources: [
      {
        title: 'Supabase Docs — Getting Started',
        url: 'https://supabase.com/docs/guides/getting-started',
        type: 'documentation',
      },
      {
        title: 'Vercel Docs — Deploying Next.js',
        url: 'https://vercel.com/docs/frameworks/nextjs',
        type: 'documentation',
      },
      {
        title: 'Supabase + Next.js — Tutorial oficial',
        url: 'https://supabase.com/docs/guides/getting-started/quickstarts/nextjs',
        type: 'course',
      },
    ],
  },

  // ─── Track: Branding e Identidad Visual ──────────────────────────────────────

  {
    id: 'branding-1',
    number: 16,
    title: 'Estrategia de Marca: el porqué antes del cómo',
    description: 'Aprende a definir el posicionamiento, propósito y personalidad de una marca antes de diseñar un solo pixel.',
    duration: '3 semanas',
    status: 'available',
    track: 'branding',
    lessons: [
      {
        id: 'b1-l1',
        title: 'Qué es una marca y por qué no es un logo',
        type: 'reading',
        content: `## La marca no es el logo

El error más común: confundir la identidad visual con la marca. El logo es la punta del iceberg. La marca es todo lo que hay debajo.

### La definición correcta

**Una marca es la percepción que tiene una persona sobre un producto, servicio o empresa.**

No es lo que tú dices que eres. Es lo que ellos *sienten* que eres.

Jeff Bezos lo dijo mejor: *"Tu marca es lo que la gente dice de ti cuando no estás en la habitación."*

### Los tres niveles de una marca

**1. Identidad de marca** (lo que TÚ controlas)
- Propósito, valores, misión
- Voz y tono de comunicación
- Identidad visual (logo, colores, tipografía)
- Experiencia del producto o servicio

**2. Imagen de marca** (lo que el MERCADO percibe)
- Posicionamiento mental en la cabeza del cliente
- Asociaciones emocionales
- Reputación construida con el tiempo

**3. Capital de marca** (el VALOR que genera)
- Cuánto más pagas por Apple que por un genérico con las mismas specs
- La razón por la que un cliente elige tu agencia sobre otra más barata

### El error de empezar por el logo

Muchas empresas contratan a un diseñador en la primera semana. El resultado: un logo bonito que no comunica nada de lo que la empresa realmente es.

El proceso correcto es estrategia primero:
1. ¿Para quién existimos? (audiencia)
2. ¿Qué problema resolvemos? (propósito)
3. ¿Por qué nos elegirían a nosotros? (diferenciación)
4. ¿Cómo queremos que nos perciban? (posicionamiento)
5. ¿Cuál es nuestra personalidad? (tono)
6. **Solo entonces**: ¿cómo se ve todo eso visualmente?

### Marcas que lo hacen bien

**Apple**: Creatividad, rebeldía, diseño. El logo es una manzana mordida. No dice nada de computadoras. Pero la marca dice todo.

**Nike**: Rendimiento, aspiración, superación. "Just Do It" no menciona tenis. La marca es una filosofía.

**AlphaDev Studios**: Tecnología deseable, software con IA adentro, premium sin ser inalcanzable. La identidad visual (crema + dorado + serif) debe *sentirse* como eso.`,
        completed: false,
      },
      {
        id: 'b1-l1b',
        title: 'Mini-práctica: Auditoría de marca de un competidor',
        type: 'practice',
        tasks: [
          'Elige una agencia digital o estudio de diseño que admires (o que compita con AlphaDev)',
          'Responde por escrito: ¿Cuál es su propósito aparente? ¿A quién le hablan? ¿Qué emoción genera?',
          'Identifica: ¿su identidad visual (logo, colores, tipografía) refleja ese propósito?',
          'Señala 2 cosas que hacen muy bien y 1 cosa que podrías hacer mejor',
          'Escribe en 2 oraciones cómo se diferencia de AlphaDev Studios',
        ],
        tip: 'No busques competidores que se vean "iguales" a AlphaDev. Busca los que más admiras aunque sean diferentes — aprenderás más de los mejores que de los similares.',
        completed: false,
      },
      {
        id: 'b1-l2',
        title: 'Posicionamiento y propuesta de valor única',
        type: 'reading',
        content: `## Posicionamiento: la posición que ocupas en la mente del cliente

El posicionamiento no es lo que haces con tu producto. Es lo que haces con la mente de tu prospecto.

### La fórmula del posicionamiento

**Para [audiencia] que [problema/necesidad], [nombre de marca] es la [categoría] que [beneficio único] porque [razón creíble].**

Ejemplo para AlphaDev Studios:
> Para founders de startups que necesitan software en producción rápido, AlphaDev Studios es la agencia técnica que entrega en semanas (no meses) porque integra IA desde el día uno y trabaja con stack moderno sin overhead corporativo.

### Diferenciación: los 4 ejes

No puedes ser el mejor en todo. Elige tu eje de diferenciación:

**1. Liderazgo de precio** — el más barato. (No recomendado para agencias premium)

**2. Liderazgo de producto** — el mejor técnicamente. AlphaDev compite aquí.
- Stack moderno, IA integrada, delivery rápido

**3. Intimidad con el cliente** — el que más conoce y cuida al cliente.
- Startups early-stage, trato directo con el founder, sin intermediarios

**4. Operacional** — el más eficiente y confiable.
- Módulos reutilizables, procesos probados, cero sorpresas

### El mapa de posicionamiento

Dibuja dos ejes relevantes para tu industria. Por ejemplo:
- Eje X: velocidad (lento → rápido)
- Eje Y: precio (económico → premium)

Ubica a tus competidores y busca el espacio vacío. Ahí está tu oportunidad.

### Por qué el nicho gana

La trampa: "queremos servir a todos los negocios que necesiten un sitio web".

La realidad: cuando intentas hablarle a todos, no le hablas a nadie.

AlphaDev Studios le habla a **founders que pagan en USD, construyen productos digitales, y valoran velocidad sobre precio**. Ese nicho específico permite:
- Mensajes que resuenen (hablas su idioma)
- Precios premium (son el cliente correcto)
- Referidos de calidad (se conocen entre ellos)`,
        completed: false,
      },
      {
        id: 'b1-l2b',
        title: 'Mini-práctica: Define el posicionamiento de una marca',
        type: 'practice',
        tasks: [
          'Elige un negocio real o ficticio que quieras brandear (puede ser tu agencia, un cliente pasado, o un concepto)',
          'Escribe la fórmula de posicionamiento completa: "Para [audiencia] que [problema]..."',
          'Dibuja (en papel o Figma) un mapa de posicionamiento con 2 ejes relevantes e identifica dónde está la oportunidad',
          'Lista 3 competidores directos y explica en 1 oración por qué tu marca es diferente',
          'Define el nicho primario: demografía + psicografía + pain point específico',
        ],
        tip: 'Si tu posicionamiento aplica a cualquier negocio de tu categoría, no es un posicionamiento — es una descripción genérica. Sé específico hasta que suene casi excluyente.',
        completed: false,
      },
      {
        id: 'b1-l3',
        title: 'Personalidad de marca y arquetipos',
        type: 'reading',
        content: `## Personalidad de marca: la humanización del negocio

Las marcas con personalidad clara generan relaciones emocionales. Las marcas sin personalidad son commodities.

### Los 12 arquetipos de marca (Jung aplicado al branding)

Carl Jung identificó 12 arquetipos universales que las personas reconocen instintivamente. Las marcas los usan para crear conexión emocional:

| Arquetipo | Deseo central | Marcas ejemplo |
|-----------|---------------|----------------|
| **El Héroe** | Dominar el mundo | Nike, FedEx |
| **El Forajido** | Romper las reglas | Harley-Davidson, Red Bull |
| **El Mago** | Hacer realidad los sueños | Apple, Disney |
| **El Sabio** | Conocer la verdad | Google, TED |
| **El Explorador** | Vivir aventuras auténticas | Jeep, GoPro |
| **El Inocente** | Ser feliz | Coca-Cola, Dove |
| **El Gobernante** | Control y poder | Rolex, Mercedes |
| **El Cuidador** | Proteger y servir | Johnson & Johnson |
| **El Creador** | Crear algo nuevo | LEGO, Adobe |
| **El Bufón** | Pasarlo bien | M&Ms, Dollar Shave Club |
| **El Amante** | Intimidad y conexión | Victoria's Secret |
| **El Hombre Corriente** | Pertenecer | IKEA, Target |

### AlphaDev Studios: mezcla de arquetipos

- **Primario: El Mago** — convertimos ideas complejas en software funcional en semanas, como por arte de magia
- **Secundario: El Creador** — construimos desde cero, código limpio, diseño propio, nada de templates

### Rasgos de personalidad de marca

Define 4-6 adjetivos que describan cómo *hablaría* tu marca si fuera una persona:

AlphaDev Studios:
- **Confiada** (no arrogante) — sabe lo que hace, lo demuestra
- **Directa** — no da vueltas, dice qué construye y cuánto tarda
- **Técnica pero accesible** — un founder no-técnico entiende todo
- **Sofisticada** — premium sin ser fría

### Cómo usar los rasgos en la práctica

Cada pieza de comunicación pasa por el filtro:
1. ¿Esto suena confiado o inseguro?
2. ¿Esto es directo o ambiguo?
3. ¿Esto es técnico pero accesible?
4. ¿Esto se siente premium?

Si falla alguno, reescribir.`,
        completed: false,
      },
      {
        id: 'b1-l3b',
        title: 'Mini-práctica: Define la personalidad de tu marca',
        type: 'practice',
        tasks: [
          'Identifica el arquetipo primario y secundario de la marca que estás desarrollando',
          'Define 5 rasgos de personalidad (adjetivos) que la describan — no genéricos como "profesional"',
          'Escribe 3 versiones de un mismo mensaje (la propuesta de valor) en diferentes tonos: formal, conversacional, atrevido',
          'Elige la versión que más se alinea con la personalidad definida y explica por qué',
          'Escribe una guía de "Hablamos así / No hablamos así" con 5 ejemplos de cada uno',
        ],
        tip: 'El tono no es solo "formal vs informal". Es la suma de: vocabulario elegido, longitud de oraciones, uso del humor, nivel de tecnicismo, grado de calidez. Puedes ser informal Y sofisticado a la vez.',
        completed: false,
      },
          {
        id: 'branding-1-proj-basico',
        title: 'Proyecto Básico: Moodboard y brief de marca',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Crea el moodboard visual y el brief estratégico de una marca nueva.',
        deliverables: [
          'Brief de marca (1 página): nombre, industria, propuesta de valor, público, 5 adjetivos de personalidad y posicionamiento vs. 2 competidores',
          'Moodboard en Figma: 15-20 referencias visuales con anotaciones sobre qué es relevante de cada imagen',
          '2-3 opciones de paleta de color exploratoria con justificación',
        ],
        tip: 'El moodboard no es un Pinterest bonito — es una herramienta de alineación. Cada imagen debe tener una razón específica de estar ahí.',
        completed: false,
      },
      {
        id: 'branding-1-proj-inter',
        title: 'Proyecto Intermedio: Naming y propuesta de valor',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Genera 10 opciones de nombre para la marca del brief anterior, evalúalos y desarrolla la propuesta de valor del ganador.',
        deliverables: [
          '10 opciones de nombre con categoría (descriptivo, abstracto, compuesto, neologismo) y disponibilidad de dominio verificada',
          'Matriz de evaluación: memorabilidad, pronunciabilidad, originalidad, disponibilidad y fit con la marca (1-5 cada uno)',
          'Nombre ganador con justificación de 200 palabras',
          'Propuesta de valor: tagline, mensajes clave por audiencia y tono de voz en 3 ejemplos de copy',
        ],
        tip: 'Verifica la disponibilidad del dominio y la marca registrada antes de enamorarte de un nombre.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Marty Neumeier — The Brand Gap (PDF)',
        url: 'https://www.amazon.com/Brand-Gap-Distance-Business-Strategy/dp/0321348109',
        type: 'article',
      },
      {
        title: 'Brand Archetypes — Guide completa',
        url: 'https://www.columnfivemedia.com/brand-archetypes',
        type: 'article',
      },
      {
        title: 'Positioning: The Battle for Your Mind — Al Ries & Jack Trout',
        url: 'https://www.amazon.com/Positioning-Battle-Your-Mind-Anniversary/dp/0071373586',
        type: 'article',
      },
    ],
  },

  {
    id: 'branding-2',
    number: 17,
    title: 'Sistema de Identidad Visual',
    description: 'Crea el sistema visual completo: logo, paleta de colores, tipografía, iconografía y los principios que los gobiernan.',
    duration: '4 semanas',
    status: 'available',
    track: 'branding',
    lessons: [
      {
        id: 'b2-l1',
        title: 'Logo: diseño, variantes y lo que jamás se debe hacer',
        type: 'reading',
        content: `## El logo: símbolo, no decoración

Un logo efectivo no es el más bonito — es el más funcional. Debe trabajar en cualquier tamaño, sobre cualquier fondo, en cualquier contexto.

### Tipos de logos

**1. Wordmark** — solo el nombre tipografiado (Google, FedEx, Coca-Cola)
- Ventaja: refuerza el nombre de la marca
- Mejor cuando: el nombre es corto y memorable

**2. Lettermark** — iniciales (IBM, HBO, NASA)
- Ventaja: muy compacto, fácil de recordar
- Mejor cuando: el nombre es largo

**3. Pictograma** — solo símbolo (Apple , Twitter/X, Nike ✓)
- Ventaja: reconocible globalmente
- Requiere: mucho tiempo de exposición para funcionar sin el nombre

**4. Logo combinado** — símbolo + wordmark (Adidas, Mastercard)
- El más versátil para marcas nuevas

**5. Emblem** — texto dentro del símbolo (Starbucks, Harley-Davidson)
- Funciona en contextos específicos, difícil de usar a pequeña escala

### Principios de un buen logo

**Simple** — funciona a 16px (favicon) y a 10 metros (cartel)
**Memorable** — reconocible después de 1 segundo de exposición
**Versátil** — funciona en blanco/negro, invertido, en color
**Atemporal** — evita trends de diseño que envejecerán mal
**Apropiado** — comunica lo que la marca es

### Variantes del sistema de logo

Un sistema de logo completo incluye:
- **Versión primaria** (color completo, horizontal)
- **Versión compacta** (solo símbolo o initials)
- **Versión negativa** (blanco sobre fondo oscuro)
- **Versión monocromática** (un solo color)
- **Clear space** (espacio mínimo alrededor del logo)
- **Tamaño mínimo** (en px para digital, en mm para impresión)

### Errores clásicos (zona de no hacer)

\`\`\`
❌ Deformar proporciones del logo
❌ Usar colores no autorizados
❌ Agregar efectos (sombras, degradados no aprobados)
❌ Colocar sobre fondos que no tengan suficiente contraste
❌ Usar la versión equivocada en el contexto equivocado
❌ Modificar la tipografía del wordmark
\`\`\``,
        completed: false,
      },
      {
        id: 'b2-l1b',
        title: 'Mini-práctica: Diseña el sistema de logo en Figma',
        type: 'practice',
        tasks: [
          'En Figma, crea un frame "Logo System" para la marca que estás desarrollando',
          'Diseña o importa el logo primario y crea las 4 variantes: color, monocromático, negativo, compacto',
          'Define el clear space con una guía visual (normalmente = la altura de la "x" del wordmark)',
          'Crea ejemplos de uso correcto e incorrecto (✅ y ❌) en un frame de "Do\'s and Don\'ts"',
          'Exporta todas las variantes en SVG y PNG (2x) y organízalos en carpetas por formato',
        ],
        tip: 'Prueba tu logo en escala real: ponlo en un mock de tarjeta de presentación, en una foto de laptop, y en 32x32 como favicon. Si en alguno no funciona, el logo necesita ajustes.',
        completed: false,
      },
      {
        id: 'b2-l2',
        title: 'Paleta de colores: psicología, combinaciones y reglas de uso',
        type: 'reading',
        content: `## Paleta de colores: el lenguaje emocional de la marca

Los colores comunican antes de que el usuario lea una palabra. No es magia — es psicología y convención cultural.

### Psicología del color (contexto occidental)

| Color | Asociaciones | Marcas |
|-------|-------------|--------|
| Azul | Confianza, tecnología, calma | Facebook, IBM, PayPal |
| Rojo | Urgencia, energía, pasión | Coca-Cola, Netflix, YouTube |
| Verde | Naturaleza, salud, crecimiento | Spotify, WhatsApp, Starbucks |
| Negro | Lujo, sofisticación, poder | Chanel, Apple, Nike |
| Blanco | Limpieza, minimalismo, pureza | Apple, Tesla, Zara |
| Dorado | Premium, éxito, exclusividad | Rolex, MasterCard, AlphaDev |
| Crema/Beige | Calidez, artesanal, elegante | Louis Vuitton, editorial luxury |

### Estructura de una paleta profesional

Una paleta bien construida tiene 4 niveles:

**Primarios** (1-2 colores) — los más usados, definen la marca
**Secundarios** (2-3 colores) — complementan, para variedad
**Neutros** (3-5 colores) — fondos, textos, separadores
**Semánticos** — éxito (verde), error (rojo), advertencia (amarillo)

### Herramientas para crear paletas

- **Coolors.co** — generador aleatorio, bloquea los que te gustan
- **Paletton.com** — basado en teoría del color (complementarios, triádicos)
- **Adobe Color** — extrae paleta de una imagen de referencia
- **Realtime Colors** — preview en tiempo real en un sitio web

### Regla 60-30-10

- **60%** — color dominante (fondo principal)
- **30%** — color secundario (headers, secciones)
- **10%** — color de acento (CTAs, links, detalles importantes)

Para AlphaDev:
- 60%: crema \`#FAFAF7\`
- 30%: crema oscura \`#F2EEE7\`
- 10%: dorado \`#9A7235\`

### Documentación de la paleta

Cada color debe documentarse con:
- Nombre (propio, no "Color 1")
- Hex (#9A7235)
- RGB (154, 114, 53)
- HSL para CSS (38°, 49%, 41%)
- Uso específico ("Solo CTAs, links y acentos puntuales — NO fondos grandes")`,
        completed: false,
      },
      {
        id: 'b2-l2b',
        title: 'Mini-práctica: Construye y documenta tu paleta completa',
        type: 'practice',
        tasks: [
          'Crea la paleta completa de tu marca: 2 primarios, 2-3 secundarios, 4 neutros, 3 semánticos',
          'Documenta cada color en un frame de Figma: nombre propio, hex, uso específico',
          'Verifica el contraste de todas las combinaciones texto/fondo en contrast-ratio.com',
          'Aplica la regla 60-30-10 a un mockup de una sola página (puede ser simple)',
          'Exporta la paleta como variables CSS (:root con custom properties)',
        ],
        tip: 'Dale nombres descriptivos a tus colores, no técnicos. "Dorado Premium" es mejor que "#9A7235" y "Crema Base" mejor que "Background Primary". Los nombres ayudan a todo el equipo a recordar cuándo usar cada uno.',
        completed: false,
      },
      {
        id: 'b2-l3',
        title: 'Tipografía de marca: jerarquía, pares y uso sistemático',
        type: 'reading',
        content: `## Tipografía de marca

La tipografía es responsable de hasta el 95% de la comunicación en diseño web. Elegir bien es la diferencia entre una marca que se lee profesional y una que se lee genérica.

### Categorías tipográficas y su personalidad

**Serif** (con remates — Times, Playfair, Garamond)
→ Autoridad, tradición, editorial, lujo, confianza
→ Usada por: New York Times, Vogue, muchas consultoras premium

**Sans-serif** (sin remates — Inter, Helvetica, Futura)
→ Modernidad, claridad, tecnología, accesibilidad
→ Usada por: Google, Apple, Airbnb, startups tech

**Display / Script** (decorativas, caligráficas)
→ Creatividad, personalidad, artesanal
→ Solo para headlines, NUNCA para body text

**Monospace** (código — JetBrains Mono, Fira Code)
→ Técnica, código, terminal, precisión
→ Usada en contextos técnicos o como acento de personalidad tech

### Combinación de tipografías

La regla de oro: **máximo 2-3 tipografías por sistema**

**Combinación clásica** (AlphaDev Studios):
- Display/Headline: Playfair Display (serif, elegante)
- Body/UI: Inter (sans-serif, neutro y legible)

**Combinación tech moderna**:
- Headline: Plus Jakarta Sans Bold
- Body: Inter Regular

**Combinación editorial**:
- Headline: Fraunces o Cormorant Garamond
- Body: Libre Franklin

### La escala tipográfica

Usa una escala matemática consistente. La escala "Mayor Third" (1.25x):

\`\`\`
xs:    12px
sm:    14px
base:  16px   ← punto de partida
lg:    20px   (16 × 1.25)
xl:    25px
2xl:   31px
3xl:   39px
4xl:   49px
\`\`\`

O usa clamp() para tipografía fluida:
\`\`\`css
h1 { font-size: clamp(2rem, 5vw, 4rem); }
\`\`\`

### Documentación tipográfica

Para cada nivel de la jerarquía documenta:
- Familia, peso, tamaño
- Line-height, letter-spacing
- Color y uso
- Ejemplo de texto real`,
        completed: false,
      },
      {
        id: 'b2-l3b',
        title: 'Mini-práctica: Sistema tipográfico completo en Figma',
        type: 'practice',
        tasks: [
          'Define el par tipográfico de tu marca (máximo 2 familias) con justificación escrita',
          'Crea un frame de Figma con la escala tipográfica completa: Display, H1, H2, H3, Body, Caption, Label',
          'Para cada nivel: muestra el texto en contexto real (no solo "Heading Level 1")',
          'Define text styles en Figma (Design → Text styles) para todos los niveles',
          'Exporta los text styles como variables CSS para usar en código',
        ],
        tip: 'Diseña la tipografía con texto real de tu marca, no Lorem Ipsum. "Construimos software con IA dentro" te dirá más sobre cómo funciona el heading que "Lorem ipsum dolor sit amet".',
        completed: false,
      },
          {
        id: 'branding-2-proj-pro',
        title: 'Proyecto Profesional: Brandbook completo',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: 'Diseña el sistema de identidad visual completo para la marca que has desarrollado. El entregable es el brandbook que entregarías a un cliente real.',
        deliverables: [
          'Logo: versión principal, compacta, monocromática y sobre fondo oscuro',
          'Sistema de color: paleta completa con nombre, hex/RGB/CMYK y guía de uso',
          'Sistema tipográfico: fuente(s), escala completa y combinaciones permitidas',
          'Elementos gráficos: patterns o iconografía complementaria',
          'Mínimo 4 aplicaciones de marca en mockups reales',
          'Guía de uso: lo que NO hacer (zona de exclusión, colores prohibidos, tipografías no permitidas)',
          'Archivo: Figma o PDF de mínimo 20 páginas organizado y navegable',
        ],
        rubrica: [
          'El logo funciona en todos los tamaños y contextos',
          'La paleta cumple WCAG AA de contraste',
          'Las aplicaciones son coherentes entre sí',
          'La guía permite aplicar la identidad sin consultar al diseñador',
        ],
        tip: 'El brandbook más valioso es el más claro, no el más bello. Un cliente que aplica la identidad sin llamarte es el objetivo.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Google Fonts — Herramienta de emparejamiento',
        url: 'https://fonts.google.com/knowledge/choosing_type/pairing_typefaces',
        type: 'article',
      },
      {
        title: 'Realtime Colors — Preview de paletas en vivo',
        url: 'https://www.realtimecolors.com',
        type: 'tool',
      },
      {
        title: 'Type Scale — Generador de escalas tipográficas',
        url: 'https://typescale.com',
        type: 'tool',
      },
    ],
  },

  {
    id: 'branding-3',
    number: 18,
    title: 'Brand Guidelines y Aplicaciones de Marca',
    description: 'Consolida todo el sistema en un Brand Book profesional y aplica la identidad a touchpoints reales: web, social, documentos.',
    duration: '3 semanas',
    status: 'available',
    track: 'branding',
    lessons: [
      {
        id: 'b3-l1',
        title: 'Brand Voice: tono, mensajes clave y guía de comunicación',
        type: 'reading',
        content: `## Brand Voice: la voz de la marca

La identidad visual se ve. La brand voice se escucha. Ambas deben contar la misma historia.

### Voz vs Tono

**Voz** — constante, es la personalidad de la marca
→ AlphaDev siempre es: confiada, directa, técnica pero accesible

**Tono** — variable, cambia según el contexto
→ AlphaDev en una propuesta: formal y precisa
→ AlphaDev en Instagram: más cercana y directa
→ AlphaDev en un error 404: puede tener humor

### Los 4 ejes del tono (Nielsen Norman Group)

1. **Formal ↔ Casual**
2. **Serio ↔ Divertido**
3. **Deferente ↔ Irreverente**
4. **Entusiasta ↔ Melancólico**

Define dónde está tu marca en cada eje. Esto guía toda la comunicación.

### Mensajes clave (Key Messages)

Son las ideas que tu marca debe comunicar en TODA pieza de contenido, sin importar el formato:

Para AlphaDev Studios:
1. **Velocidad sin comprometer calidad** — "en semanas, no meses"
2. **IA integrada desde el día uno** — no como add-on, como fundamento
3. **Stack moderno** — Next.js, Supabase, TypeScript — sin legacy
4. **Founder a founder** — trato directo, sin capas de management

Cada blog post, cada email, cada propuesta debe reforzar al menos uno de estos mensajes.

### Guía de estilo editorial

**Palabras SÍ**:
- En producción, semanas, stack moderno, integrado, modular, founders, startup, entregamos, construimos

**Palabras NO**:
- Soluciones innovadoras, transformación digital, sinergia, equipo dedicado, a medida

**Reglas de escritura**:
- Oraciones cortas. Un punto, una idea.
- Voz activa: "Construimos software" no "El software es construido por nosotros"
- Datos concretos: "3 semanas" no "entrega rápida"
- Sin jerga interna que el cliente no entienda

### Copy para diferentes canales

**Web/Landing page**: persuasivo, orientado al beneficio, claridad máxima
**Email**: personal, directo, una sola acción por email
**Social (LinkedIn)**: autoridad, insight, no autopromoción pura
**Social (Instagram)**: más visual, proceso, behind-the-scenes
**Propuestas**: técnica + comercial, beneficios claros, timeline definido`,
        completed: false,
      },
      {
        id: 'b3-l1b',
        title: 'Mini-práctica: Escribe la guía de voz de tu marca',
        type: 'practice',
        tasks: [
          'Define los 4 ejes de tono de tu marca (marca con X en cada eje) con 1 oración de justificación',
          'Escribe 5 mensajes clave que la marca debe comunicar siempre — concretos, no genéricos',
          'Crea una tabla "Hablamos así / No hablamos así" con 10 ejemplos de cada columna',
          'Reescribe un texto existente de tu marca (o de un competidor) aplicando la guía de voz definida',
          'Escribe la misma propuesta de valor en 3 formatos: tweet (280 chars), email (150 palabras), home headline (8 palabras)',
        ],
        tip: 'El test del tono: si pones el texto junto a comunicaciones de 5 competidores y no puedes identificar cuál es el tuyo, el tono no es lo suficientemente distintivo. Apunta a que sea inconfundiblemente tuyo.',
        completed: false,
      },
      {
        id: 'b3-l2',
        title: 'El Brand Book: cómo documentar el sistema completo',
        type: 'reading',
        content: `## El Brand Book o Brand Guidelines

Un Brand Book es el manual de instrucciones de una marca. Garantiza que cualquier persona — diseñador, redactor, socio — pueda producir comunicaciones coherentes sin preguntar cada vez.

### Por qué existe

Sin Brand Book:
- Cada pieza de comunicación se ve diferente
- Los freelancers usan el logo mal
- Los colores varían entre el sitio web y los posts
- La voz cambia según quién escriba

Con Brand Book:
- Consistencia en todos los touchpoints
- Onboarding de nuevos colaboradores en horas, no semanas
- La marca se mantiene coherente al escalar

### Estructura de un Brand Book profesional

**Sección 1: Fundamentos de marca**
- Historia y propósito
- Misión, visión, valores
- Propuesta de valor y diferenciación
- Audiencia objetivo

**Sección 2: Identidad visual**
- Sistema de logo (uso correcto e incorrecto)
- Paleta de colores (todos los valores, usos, restricciones)
- Tipografía (familias, escala, espaciado)
- Iconografía (estilo, tamaños, uso)
- Fotografía/Ilustración (estilo visual, qué sí, qué no)
- Patrones y texturas (si aplica)

**Sección 3: Brand Voice**
- Personalidad y arquetipos
- Tono de voz por canal
- Mensajes clave
- Vocabulario permitido y prohibido
- Ejemplos de copy

**Sección 4: Aplicaciones**
- Tarjeta de presentación
- Membrete / documentos
- Firma de email
- Perfil de redes sociales
- Templates de presentación

### Herramientas para crear Brand Books

- **Figma** — el estándar actual. Permite links directos a componentes vivos.
- **Notion** — para la parte editorial (voz, mensajes, estrategia)
- **Zeroheight** — conecta Figma con documentación web interactiva
- **Canva** — opción accesible para marcas más pequeñas

### El Brand Book vivo vs el PDF estático

El PDF se desactualiza. El Brand Book vivo en Figma o Zeroheight se actualiza cuando cambia la marca y todos ven la versión más reciente.

Para AlphaDev Studios: Figma + Notion es la combinación ideal.`,
        completed: false,
      },
      {
        id: 'b3-l2b',
        title: 'Mini-práctica: Crea el Brand Book de tu marca en Figma',
        type: 'practice',
        tasks: [
          'Crea un documento Figma "Brand Book" con todas las secciones: Fundamentos, Visual, Voice, Aplicaciones',
          'Incluye al menos: sistema de logo completo, paleta documentada, escala tipográfica, guía de voz',
          'Agrega mockups de al menos 2 aplicaciones reales: perfil de Instagram + un post, tarjeta de presentación',
          'Crea 3 slides de una presentación usando el sistema visual completo',
          'Comparte el archivo con permisos de "view" y verifica que se ve correctamente en el link',
        ],
        tip: 'Un Brand Book de 20 páginas bien ejecutado vale más que uno de 80 páginas lleno de relleno. Incluye solo lo que alguien necesitaría para crear una pieza de comunicación coherente. Si no es necesario para ese propósito, no está.',
        completed: false,
      },

      {
        id: 'branding-exam',
        title: 'Examen final: Branding e Identidad Visual',
        type: 'exam',
        questions: [
          {
            q: '¿Cuál es la diferencia entre la "identidad de marca" y la "imagen de marca"?',
            options: [
              'Son sinónimos — ambos se refieren al logo y los colores',
              'Identidad es lo que tú controlas (propósito, visual, voz); imagen es lo que el mercado percibe de ti',
              'Identidad es el documento PDF; imagen es la versión digital',
              'La imagen es más importante porque es lo que los clientes ven primero',
            ],
            correct: 1,
            explanation: 'Identidad = lo que defines y controlas: tu logo, paleta, voz, valores, cómo te presentas. Imagen = la percepción que se forma en la mente del mercado, resultado de todas las experiencias con la marca. Una brecha grande entre ambas indica inconsistencia o promesas no cumplidas.',
          },
          {
            q: 'Un logo debe funcionar en escala "favicon" (32x32px). ¿Cuál de estas opciones lo dificulta?',
            options: [
              'Usar un wordmark (solo texto con la tipografía de la marca)',
              'Usar colores muy contrastados entre el símbolo y el fondo',
              'Incluir múltiples detalles finos, gradientes complejos o texto muy pequeño',
              'Usar formas geométricas simples como base',
            ],
            correct: 2,
            explanation: 'A 32x32px, los detalles finos desaparecen o se vuelven ruido. El logo a escala pequeña debe ser versión simplificada (solo el símbolo, sin wordmark). Por eso los sistemas de logo modernos siempre incluyen una versión "compacta" para usos pequeños. La simplicidad no es limitación sino requerimiento técnico.',
          },
          {
            q: '¿Qué establece la regla 60-30-10 en diseño y branding?',
            options: [
              '60% del presupuesto en digital, 30% en impreso, 10% en eventos',
              '60% color dominante (fondos), 30% color secundario, 10% color de acento (CTAs, detalles)',
              '60 caracteres máximo en headlines, 30 en subtítulos, 10 en labels',
              '60% contenido educativo, 30% entretenimiento, 10% promocional',
            ],
            correct: 1,
            explanation: 'La regla 60-30-10 es una guía de proporción de color para crear balance visual. El 60% es el color dominante (crema en AlphaDev), el 30% es secundario (crema oscura), y el 10% es el acento que llama la atención (dorado). Usar el acento en más del 15% destruye su efectividad.',
          },
          {
            q: '¿Cuál de los siguientes es el arquetipo "El Mago" y qué marcas lo representan?',
            options: [
              'Confianza y tradición — IBM, Morgan Stanley',
              'Transformar lo complejo en magia, hacer realidad los sueños — Apple, Disney, Dyson',
              'Aventura y exploración — Jeep, Red Bull',
              'Rebeldía y ruptura del status quo — Harley-Davidson, Virgin',
            ],
            correct: 1,
            explanation: 'El Mago transforma, convierte ideas en realidad, hace lo difícil parecer simple. Apple convirtió la computación en algo intuitivo y deseable. Disney convierte historias en mundos. AlphaDev Studios tiene un componente de Mago: convertimos una idea de startup en software funcional "como por arte de magia" en semanas.',
          },
          {
            q: '¿Por qué los nombres de colores descriptivos ("Dorado Premium") son superiores a los técnicos ("#9A7235") en un Brand Book?',
            options: [
              'No son superiores — los valores hex son más precisos y universales',
              'Los nombres descriptivos comunican el uso y la intención, facilitando que todo el equipo use correctamente cada color sin memorizar códigos',
              'Los nombres son mejores solo para presentaciones al cliente, no para uso técnico',
              'Los códigos hex cambian entre pantallas; los nombres son consistentes',
            ],
            correct: 1,
            explanation: 'Un diseñador o redactor recuerda "Dorado Premium = solo CTAs y acentos" mucho mejor que "#9A7235 = no usar en fondos". Los nombres descriptivos convierten un sistema de color en un vocabulario compartido. Los valores técnicos deben existir también — pero los nombres son la interfaz humana del sistema.',
          },
          {
            q: '¿Cuál es el propósito del "clear space" en las guías de logo?',
            options: [
              'Definir el fondo de color que debe usarse detrás del logo siempre',
              'Establecer el espacio mínimo vacío alrededor del logo para preservar su legibilidad e impacto',
              'Indicar cuándo se puede usar el logo en fondos transparentes',
              'Definir el tamaño mínimo del logo para impresión',
            ],
            correct: 1,
            explanation: 'El clear space (zona de respeto) es el área mínima que debe quedar libre alrededor del logo, sin ningún otro elemento. Protege la integridad visual del logo y garantiza que sea reconocible. Se mide normalmente usando algún elemento del propio logo como referencia (altura de la "x", ancho del símbolo, etc.).',
          },
          {
            q: '¿Qué diferencia el "tono de voz" de la "voz de marca"?',
            options: [
              'Son lo mismo — ambos se refieren a cómo escribe la marca',
              'La voz es constante (la personalidad de la marca); el tono varía según el contexto y canal',
              'El tono es formal; la voz es casual',
              'La voz de marca es para redes sociales; el tono para documentos corporativos',
            ],
            correct: 1,
            explanation: 'AlphaDev siempre es confiada y directa (voz = constante). Pero en una propuesta será más formal (tono), en Instagram más cercana (tono), y ante un error puede usar humor con cuidado (tono). La voz es el carácter; el tono es la expresión de ese carácter adaptada al contexto.',
          },
          {
            q: '¿Cuándo es apropiado usar tipografía Display/Script en una pieza de comunicación?',
            options: [
              'Siempre — las fuentes decorativas hacen que todo sea más interesante',
              'Solo en headlines y displays grandes — nunca en body text o texto pequeño',
              'Solo en logotipos — nunca en piezas de comunicación regular',
              'Cuando el cliente lo pide explícitamente en el brief',
            ],
            correct: 1,
            explanation: 'Las tipografías Display y Script están diseñadas para usarse grandes, donde cada carácter es legible individualmente. A tamaños pequeños (body text), pierden legibilidad y se convierten en ruido visual. La regla: Display para impacto en grandes tamaños; sans-serif o serif para texto corrido en cualquier tamaño.',
          },
        ],
        completed: false,
      },
    
    {
      id: 'branding-3-p1',
      title: 'Proyecto: Manual de identidad básico',
      type: 'project',
      difficulty: 'intermedio',
      projectBrief: 'Crea un mini manual de identidad (brand guidelines) de 8-10 páginas para una marca real o ficticia. Documenta logo, paleta, tipografía, tono de voz y ejemplos de uso correcto e incorrecto.',
      deliverables: [
        'PDF de 8-10 páginas en Figma o Canva',
        'Sección de logo con variantes y espacio de respeto',
        'Paleta de colores con códigos HEX/RGB',
        'Tipografía principal y secundaria con jerarquía',
        '2 ejemplos de aplicación correcta e incorrecta',
      ],
      rubrica: [
        'Coherencia visual entre todas las secciones',
        'Completitud del sistema de identidad',
        'Calidad de presentación del documento',
      ],
      completed: false,
    },],
    resources: [
      {
        title: 'Figma — Brand Identity Kit template',
        url: 'https://www.figma.com/community/file/805195278314519508',
        type: 'tool',
      },
      {
        title: 'Zeroheight — Brand guidelines vivos',
        url: 'https://zeroheight.com',
        type: 'tool',
      },
      {
        title: 'Examples of great brand guidelines',
        url: 'https://www.logolounge.com/articles/30-amazing-examples-of-brand-guidelines',
        type: 'article',
      },
    ],
  },

  // ─── Track: Copywriting ───────────────────────────────────────────────────────

  {
    id: 'copy-1',
    number: 19,
    title: 'Fundamentos del Copywriting',
    description: 'Entiende la psicología detrás del copy persuasivo, los frameworks clásicos y cómo escribir para convertir.',
    duration: '3 semanas',
    status: 'available',
    track: 'copy',
    lessons: [
      {
        id: 'c1-l1',
        title: 'Qué es el copywriting y por qué el copy vende más que el diseño',
        type: 'reading',
        content: `## Copywriting: el arte de vender con palabras

El copywriting no es redacción creativa. No es periodismo. No es contenido.

**Copywriting es escritura con un objetivo específico: lograr que el lector tome una acción.**

Esa acción puede ser: comprar, suscribirse, agendar una llamada, descargar, compartir.

### La diferencia que importa

**Redacción**: comunica información
**Copywriting**: provoca acción

Un buen copy no describe el producto. Habla del *resultado* que el cliente va a obtener.

❌ "Ofrecemos desarrollo web con tecnologías modernas"
✅ "Tu startup en producción en 3 semanas — o te devolvemos el dinero"

### Por qué el copy vende más que el diseño

Dato contraintuitivo: **una página fea con buen copy vende más que una página bonita con copy mediocre.**

¿Por qué? Porque el diseño llama la atención, pero las palabras generan confianza y crean el deseo.

El diseño sirve para que el copy sea leído. El copy sirve para que el lector actúe.

### Los tres trabajos del copy

**1. Capturar atención** — en un mundo saturado, tienes 3 segundos
**2. Mantener el interés** — una vez que leyeron el headline, deben querer seguir
**3. Provocar acción** — el lector debe saber exactamente qué hacer y querer hacerlo

### El principio fundamental: el lector solo piensa en sí mismo

A nadie le importa tu empresa, tu proceso, o tus certificaciones.

Solo les importa: **¿qué hay aquí para mí?**

Cada oración de tu copy debe responder esa pregunta. Si una oración no ayuda al lector a entender el beneficio para ellos, se corta.

### Features vs Benefits

| Feature (característica) | Benefit (beneficio) |
|--------------------------|---------------------|
| "Stack moderno: Next.js + Supabase" | "Tu app carga en 0.8 segundos y tus usuarios no se van" |
| "Diseño mobile-first" | "Tus clientes compran desde el celular sin frustración" |
| "Código con TypeScript strict" | "Menos bugs en producción, menos noches de pánico" |`,
        completed: false,
      },
      {
        id: 'c1-l1b',
        title: 'Mini-práctica: Transforma features en benefits',
        type: 'practice',
        tasks: [
          'Lista 10 características (features) de un producto o servicio que conozcas bien',
          'Para cada feature, escribe el benefit real usando la fórmula: "[Feature] significa que tú [outcome concreto]"',
          'Elige los 3 benefits más poderosos y escríbelos como bullets cortos (máximo 12 palabras cada uno)',
          'Reescribe la sección "Por qué elegirnos" de un sitio que conozcas, cambiando features por benefits',
          'Compara ambas versiones: ¿cuál te da más ganas de comprar?',
        ],
        tip: 'Para encontrar el benefit real de un feature, pregúntate "¿y eso qué significa para el cliente?" hasta llegar a una emoción o resultado concreto. Generalmente necesitas 2-3 iteraciones del "¿y eso qué?" para llegar al beneficio real.',
        completed: false,
      },
      {
        id: 'c1-l2',
        title: 'Psicología de la persuasión: los principios que mueven decisiones',
        type: 'reading',
        content: `## Los principios de persuasión de Cialdini

Robert Cialdini identificó 7 principios que influencian las decisiones humanas. El buen copy usa varios de estos principios en cada pieza.

### 1. Reciprocidad

Las personas sienten la obligación de devolver favores.

En copy: da valor genuino primero (contenido gratuito, guía, demo) y las personas se sentirán más inclinadas a comprar.

*"Descarga gratis nuestra guía de 47 páginas sobre branding — sin registro"*

### 2. Compromiso y Consistencia

Las personas actúan de manera consistente con sus compromisos previos.

En copy: pequeños pasos que llevan a compromisos mayores. Lograr que digan "sí" pequeño antes del "sí" grande.

*"¿Quieres que tu startup esté en producción en menos de un mes? → Entonces te va a interesar esto..."*

### 3. Prueba Social

Las personas miran lo que hacen los demás para decidir.

En copy: testimonios, casos de estudio, números de usuarios, menciones en medios.

*"127 founders ya lanzaron con AlphaDev. El 94% volvió para un segundo proyecto."*

### 4. Autoridad

Las personas siguen a los expertos.

En copy: credenciales, menciones en prensa, clientes conocidos, años de experiencia, publicaciones.

*"Construido por el mismo equipo detrás de [cliente conocido]"*

### 5. Simpatía / Agrado

Compramos de personas que nos caen bien.

En copy: humaniza la marca, muestra el equipo, comparte valores, usa humor apropiado.

### 6. Escasez

Las personas valoran más lo que es limitado.

En copy: plazas limitadas, tiempo limitado, stocks bajos. Debe ser REAL — la escasez falsa destruye confianza.

*"Solo aceptamos 3 nuevos proyectos por mes para mantener la calidad."*

### 7. Unidad

Las personas siguen a quienes perciben como parte de su grupo.

En copy: "Somos founders, hablamos el idioma de los founders."

### La advertencia ética

Estos principios funcionan tanto para persuadir como para manipular. La diferencia: **el copy ético usa estos principios para conectar al cliente correcto con la solución correcta**. El copy manipulador los usa para venderle a cualquiera, tenga o no el problema que resuelves.`,
        completed: false,
      },
      {
        id: 'c1-l2b',
        title: 'Mini-práctica: Identifica principios de persuasión en webs reales',
        type: 'practice',
        tasks: [
          'Visita 3 landing pages de productos o servicios que uses (Notion, Linear, Vercel, o cualquier SaaS)',
          'Para cada página, identifica qué principios de Cialdini usa y dónde exactamente',
          'Anota el copy textual de cada ejemplo encontrado',
          'Diseña una sección "Social Proof" para tu marca o proyecto usando al menos 3 principios',
          'Escribe un párrafo de cierre para una propuesta usando escasez legítima y prueba social',
        ],
        tip: 'La prueba social más poderosa no son los testimonios genéricos ("¡Excelente servicio!") — son los específicos con resultados concretos. "Pasamos de 0 a 1,200 usuarios en 6 semanas después de lanzar con AlphaDev" es 10x más persuasivo.',
        completed: false,
      },
      {
        id: 'c1-l3',
        title: 'Frameworks de copy: AIDA, PAS, FAB y cuándo usar cada uno',
        type: 'reading',
        content: `## Frameworks de copywriting

Los frameworks son estructuras probadas que guían la escritura persuasiva. No son fórmulas rígidas — son puntos de partida.

### AIDA — el clásico

**A — Atención**: captura la atención con un headline o apertura poderosa
**I — Interés**: mantén el interés hablando del problema o necesidad
**D — Deseo**: crea deseo mostrando los beneficios y la transformación
**A — Acción**: llama a una acción específica y clara

Ejemplo:
> **[A]** Tu startup necesita 6 meses y $50k para salir al mercado. Hay otra forma.
> **[I]** La mayoría de founders pierde en desarrollo lo que debería estar invirtiendo en crecer.
> **[D]** AlphaDev entrega en 3 semanas lo que una agencia tradicional tarda 4 meses. Stack moderno, IA integrada, sin sorpresas.
> **[A]** Agenda una llamada gratuita de 30 minutos esta semana.

**Cuándo usar AIDA**: landing pages largas, emails de ventas, anuncios.

### PAS — directo al dolor

**P — Problem**: identifica el problema que tiene el lector
**A — Agitate**: amplifica el dolor, haz que sienta la urgencia de resolverlo
**S — Solution**: presenta tu solución como el alivio

Ejemplo:
> **[P]** Tu producto está listo pero el sitio web tarda meses en salir.
> **[A]** Cada semana que pasa sin lanzar es revenue perdido, usuarios que no conocen tu solución, competidores que avanzan.
> **[S]** AlphaDev te saca al mercado en 3 semanas. Con el stack que tu startup necesita para escalar.

**Cuándo usar PAS**: problemas urgentes y dolorosos. Alta efectividad en B2B.

### FAB — para audiencias técnicas o racionales

**F — Feature**: la característica del producto
**A — Advantage**: la ventaja frente a alternativas
**B — Benefit**: el beneficio real para el cliente

**Cuándo usar FAB**: comparaciones de producto, fichas técnicas, copy para audiencias que quieren datos antes de decidir.

### BAB — aspiracional

**B — Before**: el estado actual, el problema
**A — After**: cómo se ve la vida/negocio después de tu solución
**B — Bridge**: cómo llegas del before al after (tu producto/servicio)

**Cuándo usar BAB**: testimonios, casos de estudio, copy emocional.

### La regla práctica

No uses solo un framework. La mejor copy a menudo combina:
- PAS en el hero (dolor → urgencia → solución)
- FAB en los features/benefits
- AIDA en el CTA final`,
        completed: false,
      },
      {
        id: 'c1-l3b',
        title: 'Mini-práctica: Escribe copy con cada framework',
        type: 'practice',
        tasks: [
          'Elige un producto o servicio (tuyo o de un cliente) y escribe un copy AIDA completo (4 párrafos)',
          'Escribe el mismo pitch usando PAS — ¿qué cambia en el énfasis?',
          'Escribe un párrafo BAB para un testimonio ficticio o real de ese mismo producto',
          'Combina los tres: usa PAS en las primeras 2-3 oraciones, FAB en los bullets, BAB en el CTA',
          'Lee en voz alta los 4 versiones — ¿cuál suena más natural y persuasiva?',
        ],
        tip: 'Leer el copy en voz alta es el test definitivo. Si tropieza o suena raro al leerlo, lo leerá igual de raro el cliente. Si fluye bien hablado, fluirá bien escrito.',
        completed: false,
      },
          {
        id: 'copy-1-proj-basico',
        title: 'Proyecto Básico: Reescribe la propuesta de valor',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Elige un negocio con propuesta de valor genérica. Reescríbela con 3 versiones diferentes.',
        deliverables: [
          'La propuesta original con análisis: qué está mal (genérico, vago, orientado al proceso en lugar al resultado)',
          '3 versiones reescritas con enfoque diferente cada una',
          'La versión elegida con justificación de por qué funciona mejor',
          'Headline y subheadline de landing page basados en esa propuesta de valor',
        ],
        tip: 'Una propuesta de valor que tu competidor puede copiar sin cambiar nada no es una propuesta de valor.',
        completed: false,
      },
      {
        id: 'copy-1-proj-inter',
        title: 'Proyecto Intermedio: Email de ventas completo',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Escribe un email de ventas para prospectos que conocen la marca pero no han comprado.',
        deliverables: [
          '3 variantes de asunto + preview text para A/B testing',
          'Email completo: apertura que conecta, cuerpo con problema-agitación-solución, social proof y CTA claro',
          'Screenshot del email renderizado en mobile (375px)',
          'Análisis: qué elementos de persuasión usaste y por qué los elegiste para esta audiencia',
        ],
        tip: 'El email más efectivo no intenta convencer — resuena con alguien que ya está convencido a medias. Escribe para el 70%, no para el 0%.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Influence — Robert Cialdini (libro)',
        url: 'https://www.amazon.com/Influence-Psychology-Persuasion-Robert-Cialdini/dp/006124189X',
        type: 'article',
      },
      {
        title: 'Copyhackers — Blog de copywriting avanzado',
        url: 'https://copyhackers.com',
        type: 'article',
      },
      {
        title: 'Swipe File — Ejemplos de copy que convierte',
        url: 'https://swipefile.com',
        type: 'tool',
      },
    ],
  },

  {
    id: 'copy-2',
    number: 20,
    title: 'Copy para Web y Landing Pages',
    description: 'Aprende a escribir headlines que detienen el scroll, copy de landing pages que convierten y CTAs que la gente quiere clickear.',
    duration: '3 semanas',
    status: 'available',
    track: 'copy',
    lessons: [
      {
        id: 'c2-l1',
        title: 'Headlines: la línea que decide si leen o rebotan',
        type: 'reading',
        content: `## Headlines: el 80/20 del copywriting

El 80% del éxito de una pieza de copy depende del headline. Si el headline no engancha, el resto no se lee.

David Ogilvy: *"En promedio, 5 veces más personas leen el headline que el cuerpo del texto."*

### Tipos de headline que funcionan

**1. Beneficio directo**
→ El lector entiende inmediatamente qué gana
→ "Lanza tu startup en 3 semanas, no en 6 meses"

**2. Curiosidad**
→ Crea una pregunta en la mente que solo se responde leyendo
→ "El error que comete el 90% de founders al contratar un desarrollador"

**3. Específico**
→ Los números y detalles crean credibilidad
→ "Cómo pasamos de idea a producción en 19 días (y lo que aprendimos)"

**4. Pregunta directa**
→ El lector se identifica o quiere saber la respuesta
→ "¿Tu producto está listo pero el sitio web no?"

**5. Promesa + timeframe**
→ Claro, medible, creíble
→ "Tu MVP en producción este mes"

**6. Contra-intuitivo**
→ Rompe expectativas y genera curiosidad
→ "Por qué tu landing page bonita está matando tus conversiones"

### La fórmula del headline poderoso

**[Resultado específico] + [Para quién] + [Timeframe o mecanismo]**

Ejemplos:
- "Software en producción en 3 semanas para startups que no tienen tiempo que perder"
- "Un design system completo en 4 días para founders que quieren escalar"

### Subheadlines: el apoyo inmediato

El subheadline expande el headline y conecta con el body:

\`\`\`
HEADLINE: Tu startup en producción en 3 semanas.
SUBHEADLINE: Construimos el software que tu idea necesita —
             con Next.js, IA integrada y sin sorpresas en el precio.
\`\`\`

### El método de los 25 headlines

Antes de elegir un headline, escribe 25 opciones. No 5, no 10 — 25. Las primeras 10 son obvias. Las últimas 5 son donde está el oro.`,
        completed: false,
      },
      {
        id: 'c2-l1b',
        title: 'Mini-práctica: 25 headlines para tu marca o proyecto',
        type: 'practice',
        tasks: [
          'Elige un producto, servicio o proyecto real que quieras promocionar',
          'Escribe 25 headlines sin detenerte a evaluar — cantidad primero, calidad después',
          'Clasifica cada uno en la categoría que usa (beneficio directo, curiosidad, específico, etc.)',
          'Elige los 3 mejores y escribe el subheadline correspondiente para cada uno',
          'Prueba tu top headline con 3 personas de tu audiencia objetivo — ¿entienden de qué trata?',
        ],
        tip: 'Si el headline necesita más de 5 segundos para entenderse, es demasiado complejo. El mejor headline es el que tu cliente objetivo puede leer, entender, y saber si es para ellos — en una sola mirada.',
        completed: false,
      },
      {
        id: 'c2-l2',
        title: 'Estructura de una landing page que convierte',
        type: 'reading',
        content: `## Anatomía de una landing page efectiva

Una landing page tiene un solo objetivo: convertir al visitante en lead o cliente. Cada elemento existe para apoyar ese objetivo.

### La estructura estándar (arriba → abajo)

**1. Hero Section** (lo primero que ven)
- Headline: el beneficio principal, claro y específico
- Subheadline: expande el headline, añade contexto
- CTA primario: una acción, texto específico (no "Enviar")
- Social proof inmediato: "Usado por 500+ startups" o logos

**2. Problem Statement** (el dolor)
- El problema que tienen antes de tu solución
- Usa su lenguaje, no el tuyo
- Haz que digan "exactamente eso me pasa"

**3. Solution/Features** (tu respuesta)
- 3-6 beneficios clave (no características)
- Iconos o visuals que simplifiquen
- Cada punto en máximo 2 líneas

**4. Social Proof** (evidencia)
- Testimonios con foto, nombre y empresa
- Resultados específicos y verificables
- Logos de clientes conocidos (si aplica)

**5. How it Works** (el proceso)
- 3-5 pasos simples
- Reduce la percepción de fricción
- "Fácil de empezar" no basta — muestra cómo

**6. Objeciones anticipadas** (FAQ o sección de confianza)
- Las dudas más comunes respondidas
- Garantías, políticas, aclaraciones

**7. CTA Final** (la decisión)
- Repetir el CTA principal
- Puede agregar urgencia legítima
- Texto que resuene con el deseo: "Quiero mi MVP en 3 semanas"

### Principios de conversion rate optimization (CRO)

**Un objetivo**: una landing page, un CTA. No links de salida, no menús con múltiples destinos.

**Above the fold**: el CTA debe ser visible sin hacer scroll.

**Fricción mínima**: cada campo de formulario reduce conversiones. Pide solo lo esencial.

**Prueba siempre**: versión A vs versión B. Los datos ganan a las opiniones.`,
        completed: false,
      },
      {
        id: 'c2-l2b',
        title: 'Mini-práctica: Escribe el copy completo de una landing page',
        type: 'practice',
        tasks: [
          'Elige un servicio real o ficticio y escribe el copy completo de la landing page (no el diseño — solo el texto)',
          'Incluye: headline + subheadline, problem statement (2-3 oraciones), 5 benefits como bullets, 2 testimonios ficticios con resultados específicos, how it works en 3 pasos, 4 FAQ con respuestas, CTA final',
          'Revisa: ¿cada sección responde "¿qué hay aquí para mí?" desde el punto de vista del lector?',
          'Cuenta las palabras en primera persona (yo, mi, nosotros) vs segunda persona (tú, tu, usted). El ratio debe ser 1:3 a favor del "tú"',
          'Lee el copy completo en voz alta — ¿fluye naturalmente? ¿Hay oraciones que tropiezan?',
        ],
        tip: 'El copy de landing page no se escribe de arriba a abajo. Empieza por los testimonios (qué dicen los clientes felices), luego el FAQ (qué objeciones tienen), y termina con el hero. Conocer las objeciones y los outcomes antes de escribir el headline lo hace 3x más efectivo.',
        completed: false,
      },
    
    {
      id: 'copy-2-p1',
      title: 'Proyecto: Headlines para landing page',
      type: 'project',
      difficulty: 'básico',
      projectBrief: 'Escribe 10 variantes de headline para un producto real o ficticio. Aplica las fórmulas PAS, AIDA y beneficio directo. Al final elige la mejor y justifica por qué.',
      deliverables: [
        '10 headlines escritos',
        'Etiqueta de fórmula usada en cada uno',
        'Selección de la mejor con justificación de 3 líneas',
      ],
      rubrica: [
        'Uso correcto de al menos 2 fórmulas',
        'Claridad y especificidad del beneficio',
        'Variedad de enfoques entre los 10',
      ],
      completed: false,
    },],
    resources: [
      {
        title: 'Unbounce — The Landing Page Course',
        url: 'https://unbounce.com/landing-page-articles/the-landing-page-course',
        type: 'course',
      },
      {
        title: 'Headline Analyzer — CoSchedule',
        url: 'https://coschedule.com/headline-analyzer',
        type: 'tool',
      },
      {
        title: 'Conversion.ai Swipe File',
        url: 'https://swipefile.com',
        type: 'tool',
      },
    ],
  },

  {
    id: 'copy-3',
    number: 21,
    title: 'Copy para Ads y Email Marketing',
    description: 'Escribe anuncios que detienen el scroll en Meta y Google, y secuencias de email que nutren y convierten sin molestar.',
    duration: '3 semanas',
    status: 'available',
    track: 'copy',
    lessons: [
      {
        id: 'c3-l1',
        title: 'Copy para Meta Ads: hooks, body y CTA que funcionan',
        type: 'reading',
        content: `## Copy para Meta Ads (Facebook e Instagram)

Meta Ads compiten por la atención en un feed infinito. El copy tiene que ganar esa batalla en el primer segundo.

### La anatomía de un Meta Ad

**Hook** (primera línea / primeras 3 palabras):
- Es lo único que el usuario ve antes de "ver más"
- Debe detener el scroll y generar curiosidad o reconocimiento de problema

**Body** (el cuerpo):
- Expande el hook
- Presenta el problema, la solución, los beneficios
- 50-150 palabras para conversión directa
- Puede ser más largo para audiencias más frías (más educación necesaria)

**Headline** (debajo de la imagen):
- Texto en negrita que acompaña la imagen
- Muchas veces el beneficio principal o la oferta

**CTA** (Call to Action):
- Botón que elige Meta: "Más información", "Comprar", "Registrarse", "Contactar"
- Elige el que más reduce fricción para tu objetivo

### Hooks que funcionan en Meta

**Pregunta directa**:
→ "¿Todavía pagando $3,000/mes por una agencia que tarda 4 meses en entregar?"

**Declaración inesperada**:
→ "Tu landing page bonita está perdiendo clientes."

**Número específico**:
→ "19 días. De idea a producto en producción."

**"Si tú..." (identificación)**:
→ "Si tienes una idea de startup y no sabes cómo hacerla real, esto es para ti."

**Social proof como hook**:
→ "127 founders ya lanzaron con nosotros. Así lo hicimos."

### Formatos de copy según objetivo

**Awareness** (audiencia fría):
- Copy más educativo
- Cuenta la historia del problema
- CTA: "Más información" o "Saber más"

**Consideración** (audiencia tibia):
- Copy orientado a beneficios
- Testimonios y prueba social
- CTA: "Ver demo" o "Agendar llamada"

**Conversión** (audiencia caliente o retargeting):
- Copy directo, la oferta clara
- Urgencia o incentivo
- CTA: "Comprar" o "Registrarse"

### Testing de copy

Siempre probar simultáneamente:
- 3 hooks diferentes con el mismo body
- O el mismo hook con 3 bodies diferentes
- Deja correr 3-5 días antes de concluir ganador`,
        completed: false,
      },
      {
        id: 'c3-l1b',
        title: 'Mini-práctica: Crea 3 variantes de Meta Ad',
        type: 'practice',
        tasks: [
          'Elige el servicio de AlphaDev Studios (o de un cliente) y define la audiencia objetivo',
          'Escribe 3 hooks completamente diferentes para el mismo ad (pregunta, declaración, número)',
          'Para el hook más fuerte, escribe el body completo: problema → solución → beneficios → CTA',
          'Adapta el ad para awareness (copy educativo) y para retargeting (copy directo con oferta)',
          'Estima el presupuesto mínimo viable para testear las 3 versiones ($5-10/día por variante)',
        ],
        tip: 'En Meta Ads, la imagen/video detiene el scroll — el copy convierte. Si el visual no es bueno, el mejor copy del mundo no salvará el ad. Ambos deben trabajar juntos.',
        completed: false,
      },
      {
        id: 'c3-l2',
        title: 'Email marketing: secuencias que nutren sin molestar',
        type: 'reading',
        content: `## Email marketing: el canal de mayor ROI

El email tiene un ROI promedio de $36 por cada $1 invertido (Litmus, 2024). Ningún otro canal se acerca. Y sin embargo, la mayoría de empresas lo usa mal.

### Los tipos de email que debes dominar

**1. Email de bienvenida** (se abre el 50-80% de las veces)
- El más leído de todos — maximiza su valor
- Entrega el valor prometido inmediatamente
- Establece expectativas (qué recibirán y cuándo)
- Humaniza: quién eres y por qué te importa

**2. Email de nurturing** (educación/valor)
- Un solo insight útil por email
- Sin venta directa — construye confianza
- Frecuencia: 1-2 por semana para newsletters, menos para cold

**3. Email de venta**
- Solo cuando hay relación previa
- La oferta clara desde el principio (no enterrada al final)
- Un solo CTA

**4. Email de seguimiento (follow-up)**
- El 80% de las ventas ocurren entre el 5to y 12vo contacto
- Varía el ángulo en cada follow-up (no reenvíes el mismo email)

### Estructura del email que se lee

**Subject line** (50% del trabajo):
- Corto: 30-40 caracteres en mobile
- Curioso o directo — elige uno
- Evita spam triggers: "GRATIS", "URGENTE", "!!!!"

**Preview text** (la segunda línea que ves en la bandeja):
- Complementa el subject, no lo repite
- Agrega contexto o curiosidad adicional

**Apertura** (las primeras 2 líneas):
- Conecta directo con el lector
- No empieces con "Mi nombre es..." o "Espero que estés bien"
- Empieza con el punto

**Body**:
- Una idea central por email
- Párrafos cortos (2-4 líneas máximo)
- Links descriptivos, no "click aquí"

**CTA**:
- Uno solo, claro, específico
- Dice exactamente qué pasa al hacer click

### La secuencia de bienvenida (5 emails)

\`\`\`
Email 1 (día 0): Bienvenida + entrega el lead magnet prometido
Email 2 (día 2): Historia: por qué existes, qué problema resuelves
Email 3 (día 4): El problema más grande de tu audiencia (sin vender)
Email 4 (día 7): Caso de estudio / prueba social
Email 5 (día 10): La oferta (primera venta directa)
\`\`\``,
        completed: false,
      },
      {
        id: 'c3-l2b',
        title: 'Mini-práctica: Escribe una secuencia de 5 emails',
        type: 'practice',
        tasks: [
          'Define el lead magnet (recurso gratuito) que usarías para conseguir emails en tu negocio',
          'Escribe los 5 emails de la secuencia de bienvenida completa: asunto, preview text y body de cada uno',
          'Verifica que cada email tiene un solo CTA y una sola idea central',
          'Para el email de venta (email 5), usa el framework PAS: problema → agitación → solución',
          'Prueba los subject lines en subjectline.email — apunta a score >70',
        ],
        tip: 'El email más importante de la secuencia no es el de venta — es el de bienvenida. Si ese email establece confianza y entrega valor inmediato, los siguientes se abren con alta probabilidad. Si defrauda, todos los demás van a spam.',
        completed: false,
      },
          {
        id: 'copy-3-proj-pro',
        title: 'Proyecto Profesional: Landing page de alta conversión',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: 'Escribe el copy completo de una landing page para un producto o servicio de ticket medio-alto ($200+). Todos los bloques, de hero a footer.',
        deliverables: [
          'Hero: headline principal, subheadline y CTA primario + secundario',
          'Bloque de problema: pain point en lenguaje del cliente (sus palabras, no las tuyas)',
          'Bloque de solución: beneficios orientados a resultados, no a features',
          '3 testimoniales con nombre, contexto y resultado específico medible',
          'Bloque de objeciones: las 3 dudas más comunes respondidas con empatía',
          'CTA final: urgencia o garantía + repetición del CTA',
          'Meta description y OG title para SEO y redes',
        ],
        rubrica: [
          'Cada bloque tiene un objetivo claro en el proceso de conversión',
          'El lenguaje es del cliente, no del vendedor — sin jerga interna',
          'Los testimoniales tienen resultados específicos y medibles',
          'La objeción de precio está respondida aunque no haya precio visible',
          'El tono es coherente de principio a fin',
        ],
        tip: 'Antes de escribir una sola palabra, escribe qué piensa el prospecto justo antes de llegar a la landing. Ese pensamiento es tu headline.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Really Good Emails — Librería de emails ejemplo',
        url: 'https://reallygoodemails.com',
        type: 'tool',
      },
      {
        title: 'Meta Ads Library — Ejemplos de ads reales',
        url: 'https://www.facebook.com/ads/library',
        type: 'tool',
      },
      {
        title: 'Email Subject Line Tester',
        url: 'https://www.subjectline.com',
        type: 'tool',
      },
    ],
  },

  {
    id: 'copy-4',
    number: 22,
    title: 'Propuestas, Pitches y Copy de Cierre',
    description: 'Aprende a escribir propuestas que ganan proyectos, pitches que convencen y follow-ups que convierten sin presionar.',
    duration: '2 semanas',
    status: 'available',
    track: 'copy',
    lessons: [
      {
        id: 'c4-l1',
        title: 'Propuestas comerciales que ganan proyectos',
        type: 'reading',
        content: `## La propuesta que cierra

Una propuesta no es un documento técnico. Es el último copy de ventas antes de la decisión de compra.

El cliente ya sabe qué hace tu empresa. La propuesta le dice: *por qué nosotros, por qué ahora, y exactamente qué va a obtener.*

### El error más común

La mayoría de propuestas empiezan con:
*"Estimado [nombre], somos [empresa], fundada en [año], y nos especializamos en..."*

El cliente no compra tu historia. Compra su resultado.

**Empieza con ellos, no contigo.**

### Estructura de una propuesta ganadora

**1. El problema (en sus palabras)**
Muestra que entendiste su situación específica. No genérico. Menciona lo que dijeron en la llamada.

*"Mencionaste que tu producto está listo pero necesitas salir al mercado antes del Q3 para capturar la ola de funding que se abre en ese período..."*

**2. La solución propuesta**
Específica, no genérica. Qué harás exactamente, en qué orden.

**3. Lo que incluye (y lo que no)**
Claridad total. El scope definido protege a ambas partes.

**4. El timeline**
Milestones claros. Fechas específicas, no "aproximadamente 4-6 semanas".

**5. La inversión**
El precio claro, con opciones si aplica. Sin sorpresas.

**6. Por qué nosotros**
Prueba social relevante para este proyecto específico. No tu portafolio genérico — el caso más parecido a lo que necesitan.

**7. Próximos pasos**
Una acción específica: "Para confirmar, firma este documento y enviamos el contrato en 24 horas."

### El copy dentro de la propuesta

- Usa el lenguaje del cliente (el que usaron en la llamada)
- Beneficios > características también aquí
- Párrafos cortos — se lee en diagonal, como toda propuesta
- Negritas estratégicas en los puntos más importantes
- Un resumen ejecutivo al inicio (una página) para quienes no lean todo

### Precio: cómo presentarlo

Nunca digas solo el precio. Ancla con el valor:

*"La inversión para este proyecto es $4,500. Para contexto: el costo de contratar un desarrollador freelance para el mismo scope está entre $8,000 y $12,000, con tiempos 3x más largos."*`,
        completed: false,
      },
      {
        id: 'c4-l1b',
        title: 'Mini-práctica: Escribe una propuesta completa',
        type: 'practice',
        tasks: [
          'Elige un proyecto real o ficticio (diseño de sitio web, app, branding, campaña) y un cliente hipotético',
          'Escribe la propuesta completa usando la estructura de 7 secciones',
          'La sección "El problema" debe sonar como si hubieras escuchado al cliente — usa lenguaje concreto y específico',
          'Presenta el precio con ancla de valor (comparación con alternativa)',
          'Termina con un "próximo paso" que requiera una sola acción simple del cliente',
        ],
        tip: 'La propuesta gana o pierde en las primeras 30 segundos de lectura. Si el resumen ejecutivo (primera página) no convence, el resto no se lee. Escribe esa primera página al último, cuando ya tienes claridad total del documento.',
        completed: false,
      },
      {
        id: 'c4-l2',
        title: 'Follow-ups que convierten sin presionar',
        type: 'reading',
        content: `## El arte del follow-up

El 80% de las ventas ocurren después del quinto contacto. El 44% de los vendedores abandona después del primero.

Hacer follow-up no es presionar. Es persistencia con valor.

### Los principios del follow-up que funciona

**1. Siempre agrega valor**
No envíes "Solo quería ver cómo van". Envía algo útil: un artículo relevante, un insight, una pregunta que los haga pensar.

**2. Varía el ángulo, no el mensaje**
Cada follow-up ataca desde un ángulo diferente:
- Email 1: Propuesta enviada
- Follow-up 1 (día 3): Case study relacionado
- Follow-up 2 (día 7): Responde una objeción común proactivamente
- Follow-up 3 (día 14): Cambio en el alcance o la oferta
- Follow-up 4 (día 21): El "breakup email"

**3. El breakup email**
El más efectivo por su honestidad:

*"Hola [nombre], entiendo que tienes muchas prioridades y no es el momento correcto. Si en algún momento el proyecto vuelve a la agenda, estaré aquí. ¿Puedo marcar este como cerrado por ahora?"*

Paradójicamente, este email a menudo genera respuestas de clientes que estaban ocupados y no habían podido responder.

### La cadencia de follow-up

\`\`\`
Propuesta enviada → Día 3 → Día 7 → Día 14 → Día 21 (breakup)
\`\`\`

No más de 5 contactos sin respuesta. Después, respeto y pausa.

### Por qué los clientes no responden

- No es el momento adecuado (prioridades cambiaron)
- Se perdió el email entre otros
- Necesitan aprobación interna
- Tienen dudas pero no saben cómo preguntar

El follow-up con valor resuelve todos estos casos sin presión.

### Templates de follow-up

**Follow-up de valor** (día 3):
*"Hola [nombre], vi este artículo sobre [tema relevante para su proyecto] y pensé en ti. [Link + 1-2 oraciones de por qué es relevante]. ¿Avanzamos con la propuesta?"*

**Follow-up de objeción** (día 7):
*"Hola [nombre], una pregunta común que recibo antes de aprobar un proyecto es [objeción]. Por si te ayuda: [respuesta concisa]. ¿Eso despeja dudas?"*`,
        completed: false,
      },
      {
        id: 'c4-l2b',
        title: 'Mini-práctica: Cadencia de follow-up completa',
        type: 'practice',
        tasks: [
          'Para la propuesta que escribiste en la práctica anterior, diseña la cadencia de follow-up completa (4 emails)',
          'Cada email debe tener ángulo diferente: valor, objeción, cambio de oferta, breakup',
          'Escribe el subject line de cada email (debe generar apertura sin sonar desesperado)',
          'El breakup email debe ser honesto, breve y dejar la puerta abierta elegantemente',
          'Revisa: ¿en algún follow-up estás pidiendo sin dar valor primero? Si sí, reescríbelo',
        ],
        tip: 'El mejor follow-up del mundo no puede rescatar una propuesta sin valor. Si tu tasa de cierre es baja, el problema probablemente no es el follow-up — es la propuesta inicial o la calificación del prospecto. Arregla primero lo que pasa antes del follow-up.',
        completed: false,
      },

      {
        id: 'copy-exam',
        title: 'Examen final: Copywriting',
        type: 'exam',
        questions: [
          {
            q: 'Un cliente dice: "Nuestro software usa machine learning de última generación con arquitectura microservicios." ¿Cómo lo conviertes en copy efectivo?',
            options: [
              'Mantienes el lenguaje técnico — la audiencia técnica lo apreciará',
              'Lo traduces al beneficio: "Detecta fraudes 10x más rápido que los sistemas tradicionales — sin falsos positivos"',
              'Simplificas a: "Tecnología avanzada para tu negocio"',
              'Usas el copy tal cual pero lo pones en bullets para que sea más fácil de leer',
            ],
            correct: 1,
            explanation: 'La feature (ML + microservicios) no importa. El beneficio concreto (10x más rápido, sin falsos positivos) sí importa. El copy efectivo siempre traduce características técnicas a resultados específicos y medibles que el cliente puede visualizar en su propia situación.',
          },
          {
            q: '¿Cuál es el principal error al escribir el hero copy de una landing page?',
            options: [
              'Usar demasiadas palabras en el headline',
              'Empezar hablando de la empresa ("Somos X, fundados en Y...") en lugar de hablar del problema o beneficio del cliente',
              'No incluir el precio en el hero',
              'Usar emojis que no sean profesionales',
            ],
            correct: 1,
            explanation: 'El visitante llega con una pregunta: "¿Esto es para mí? ¿Resuelve mi problema?" Si el hero habla de tu empresa, has desperdiciado los 3 segundos más valiosos. El héroe de una LP debe responder inmediatamente: este es tu problema, esta es la solución, esto es lo que conseguirás. Tú eres el secundario; el cliente es el héroe.',
          },
          {
            q: 'Usando el framework PAS, ¿en qué orden correcto presentas la información?',
            options: [
              'Promesa → Acción → Solución',
              'Problema → Agitar (amplificar el dolor) → Solución',
              'Producto → Audiencia → Servicio',
              'Pain → Awareness → Sell',
            ],
            correct: 1,
            explanation: 'PAS: Problema (identificar el dolor del lector), Agitate (amplificar la urgencia de resolverlo — consecuencias de no actuar), Solución (presentar tu oferta como el alivio específico). Es especialmente efectivo en copy B2B donde los dolores son reales y urgentes. La "agitación" no es manipulación — es ayudar al lector a entender por qué necesita resolver el problema ahora.',
          },
          {
            q: '¿Qué diferencia a un testimonio efectivo de uno genérico?',
            options: [
              'El efectivo tiene foto y nombre completo; el genérico es anónimo',
              'El efectivo tiene resultados específicos y medibles ("pasé de 0 a 1,200 usuarios en 6 semanas"); el genérico es vago ("excelente servicio, muy recomendado")',
              'El efectivo está escrito en tercera persona; el genérico en primera',
              'El efectivo es de una empresa grande; el genérico es de un individuo',
            ],
            correct: 1,
            explanation: 'Los testimonios genéricos no reducen la fricción porque no dan información accionable. Los específicos ("pasé de $3k a $18k/mes en 4 meses") permiten al prospecto visualizar su propio resultado. El cerebro convierte datos concretos en evidencia de posibilidad propia. Más datos específicos = más confianza = más conversión.',
          },
          {
            q: 'En email marketing, ¿qué elemento del email tiene mayor impacto en la tasa de apertura?',
            options: [
              'El diseño HTML del email',
              'La hora de envío',
              'El subject line — es la única información visible antes de abrir el email',
              'La longitud del email',
            ],
            correct: 2,
            explanation: 'El subject line es el titular del email — 50% del trabajo. El destinatario ve: remitente + subject line + preview text. Si el subject no genera suficiente curiosidad o valor percibido, el email no se abre. El mejor copy del cuerpo del email vale cero si el subject line falla.',
          },
          {
            q: '¿Cuál es el propósito del "breakup email" en una cadencia de follow-up?',
            options: [
              'Comunicar que terminas la relación comercial y no volverás a contactar',
              'Un email honesto que dice que cierras la comunicación a menos que haya interés, lo que paradójicamente genera respuestas de prospectos que estaban ocupados',
              'Un email agresivo para presionar la decisión con urgencia artificial',
              'El último email de una secuencia de nurturing con un descuento final',
            ],
            correct: 1,
            explanation: 'El breakup email ("entiendo que no es el momento, ¿puedo marcar esto como cerrado?") funciona porque es honesto y da control al prospecto. Muchos prospectos callados no están desinteresados — solo ocupados o postergando. El breakup los saca de la inercia. La tasa de respuesta de estos emails suele ser la más alta de toda la cadencia.',
          },
          {
            q: '¿Cuándo es apropiado usar escasez en el copy según los principios éticos de Cialdini?',
            options: [
              'Siempre — la escasez siempre aumenta las conversiones',
              'Solo cuando la escasez es real y verificable — plazas limitadas reales, stock real, fechas reales',
              'Nunca — la escasez es manipulación',
              'Solo para productos físicos, no para servicios',
            ],
            correct: 1,
            explanation: 'Escasez falsa ("¡Solo quedan 2 unidades!" cuando hay stock infinito) destruye confianza cuando el cliente la descubre — y siempre la descubre. Escasez real (AlphaDev acepta 3 proyectos/mes para mantener calidad) es honesta y persuasiva. La diferencia entre persuasión y manipulación es si el principio refleja la realidad.',
          },
          {
            q: '¿Cuál es la regla del ratio de primera/segunda persona en copy efectivo?',
            options: [
              '1:1 — equilibrio entre hablar de la empresa y del cliente',
              'Más primera persona — el cliente confía más cuando la empresa habla de sí misma',
              'Más segunda persona (tú/tu) que primera (yo/nosotros) — el copy habla del cliente, no de la empresa',
              'Evitar ambas — el copy neutro es más profesional',
            ],
            correct: 2,
            explanation: 'El ratio recomendado es aproximadamente 1:3 a favor del "tú". Si cuentas las veces que tu copy dice "yo/nosotros/nuestra empresa" vs "tú/tu negocio/tus clientes", más "yo" = copy egocéntrico que no convierte. El cliente solo piensa en sí mismo — tu copy también debe.',
          },
        ],
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Better Proposals — Templates profesionales',
        url: 'https://betterproposals.io',
        type: 'tool',
      },
      {
        title: 'Proposify — Software de propuestas',
        url: 'https://www.proposify.com',
        type: 'tool',
      },
      {
        title: 'The Follow-Up Formula — Blog post',
        url: 'https://www.yesware.com/blog/follow-up-email',
        type: 'article',
      },
    ],
  },

  // ─── Track: IA en el Workflow ─────────────────────────────────────────────────

  {
    id: 'ia-1',
    number: 23,
    title: 'Prompting Efectivo: habla el idioma de la IA',
    description: 'Aprende a comunicarte con modelos de lenguaje de manera que obtengas resultados de calidad profesional, no respuestas genéricas.',
    duration: '2 semanas',
    status: 'available',
    track: 'ia',
    lessons: [
      {
        id: 'ia1-l1',
        title: 'Cómo funcionan los LLMs y por qué el prompt importa tanto',
        type: 'reading',
        content: `## Cómo funciona un LLM (y por qué debes saberlo)

Antes de aprender a escribir buenos prompts, entender cómo funciona el modelo te da una ventaja enorme.

### Qué es un LLM

Un Large Language Model (LLM) es un modelo estadístico entrenado en cantidades masivas de texto. Aprende patrones de qué palabras suelen aparecer juntas en contextos específicos.

**No piensa**. Predice la siguiente secuencia de tokens más probable dado el contexto del prompt.

Esto explica:
- Por qué el contexto importa tanto — el modelo predice en base a todo lo que hay antes
- Por qué alucinan — generan texto probable aunque no sea verdadero
- Por qué el mismo prompt puede dar resultados distintos — hay aleatoriedad controlada (temperatura)

### El modelo lee tu prompt como instrucción + contexto + ejemplo

Un prompt es en esencia:
1. **Quién eres** (rol/sistema)
2. **Qué quieres** (tarea)
3. **Cómo lo quieres** (formato, restricciones)
4. **Para qué** (contexto del uso final)
5. **Ejemplos** (opcionales pero muy poderosos)

Cuanto más de esto incluyas, mejor el resultado.

### El problema del prompt genérico

\`\`\`
❌ "Escribe copy para mi empresa de software"
✅ "Eres un copywriter especializado en B2B SaaS.
    Escribe el hero copy para la landing page de AlphaDev Studios,
    una agencia que construye software con IA integrada para startups.
    Audiencia: founders en etapa pre-Serie A que hablan inglés o español.
    Tono: confiado, directo, técnico pero accesible.
    Incluye: headline (máx 10 palabras), subheadline (máx 20 palabras), 3 bullets de beneficios.
    No uses: 'soluciones innovadoras', 'transformación digital', ni cualquier frase genérica de agencia."
\`\`\`

La diferencia no es magia — es contexto, restricciones y especificidad.

### Modelos disponibles en 2026 y para qué usar cada uno

| Modelo | Mejor para |
|--------|-----------|
| Claude Opus 4.8 | Razonamiento complejo, análisis, código de alta complejidad |
| Claude Sonnet 4.6 | Uso diario: redacción, código, análisis moderado |
| GPT-4o | Integración con herramientas de OpenAI, imágenes |
| Gemini 2.5 Pro | Contexto muy largo (1M tokens), tareas multimodal |
| Llama 3.3 (local) | Privacidad, sin costo por token, offline |`,
        completed: false,
      },
      {
        id: 'ia1-l1b',
        title: 'Mini-práctica: Itera un prompt hasta obtener calidad profesional',
        type: 'practice',
        tasks: [
          'Elige una tarea real que necesites completar (email, copy, análisis, código)',
          'Escribe el prompt más simple posible y documenta el resultado',
          'Agrega rol, contexto y tono — documenta el nuevo resultado',
          'Agrega restricciones específicas (qué NO hacer) — documenta',
          'Agrega un ejemplo de lo que quieres (few-shot) — documenta el resultado final',
          'Compara las 4 versiones: ¿cuánto mejoró la calidad con cada adición?',
        ],
        tip: 'Los ejemplos (few-shot prompting) son el modificador más poderoso de todos. Si tienes un ejemplo de un output que te gusta, incluirlo en el prompt casi siempre produce resultados similares o mejores.',
        completed: false,
      },
      {
        id: 'ia1-l2',
        title: 'Técnicas avanzadas: Chain of Thought, roles y context windows',
        type: 'reading',
        content: `## Técnicas de prompting que marcan la diferencia

### Chain of Thought (CoT) — razonamiento paso a paso

Los LLMs resuelven problemas complejos mejor cuando se les pide pensar en voz alta.

\`\`\`
❌ "¿Cuál es la mejor estrategia de precios para mi SaaS?"

✅ "Voy a pedirte que analices la estrategia de precios para mi SaaS.
    Antes de dar una recomendación, razona paso a paso:
    1. Qué tipo de negocio es y qué métricas importan
    2. Qué estrategias de pricing existen para este tipo
    3. Qué datos necesitaría para decidir bien
    4. Cuál es tu recomendación y por qué
    Solo entonces dame la respuesta final."
\`\`\`

### Role prompting — convierte al modelo en el experto

\`\`\`
"Eres un senior growth hacker con 10 años de experiencia en startups B2B SaaS,
especializado en growth orgánico y product-led growth. Has trabajado con empresas
que pasaron de $0 a $1M ARR. Hablas directo, das ejemplos específicos, no usas
jerga sin definirla. Con eso en mente, [tu pregunta aquí]."
\`\`\`

El modelo adopta el conocimiento y el estilo del rol. Cuanto más específico el rol, mejor.

### Context window — la memoria del modelo

El context window es la cantidad de tokens que el modelo puede "ver" al mismo tiempo:
- Claude 3.5 Sonnet: 200K tokens (~150,000 palabras)
- Gemini 2.5 Pro: 1M tokens

**Implicaciones prácticas**:
- Para proyectos largos, el modelo puede ver todo el código de una vez
- La información al principio y al final del prompt se retiene mejor que la del medio
- No necesitas resumir conversaciones anteriores en modelos modernos

### Prompts para diferentes tareas

**Para código**:
*"Escribe en TypeScript, strict mode, sin any. Incluye los tipos necesarios. Si necesitas hacer algo que podría causar errores en runtime, manéjalo explícitamente. Agrega JSDoc solo si la función es no-obvia."*

**Para análisis**:
*"Analiza esto desde múltiples ángulos. Al final, dame tu evaluación con nivel de confianza (alta/media/baja) y qué información adicional cambiaría tu conclusión."*

**Para edición de copy**:
*"Edita este texto para que sea más directo y persuasivo. Mantén el tono [X]. No agregues nada — solo mejora lo que hay. Explica brevemente los cambios principales que hiciste."*

### Iterar en conversación vs nuevo prompt

**Conversación**: cuando el contexto acumulado es valioso (código en progreso, análisis iterativo)
**Nuevo prompt**: cuando la conversación anterior se desvió o el contexto es ruido`,
        completed: false,
      },
      {
        id: 'ia1-l2b',
        title: 'Mini-práctica: Construye un prompt system para tu flujo de trabajo',
        type: 'practice',
        tasks: [
          'Identifica las 5 tareas que más haces y podrías delegar a IA (emails, análisis, código, copy, etc.)',
          'Para cada una, escribe un prompt reutilizable con rol, contexto, restricciones y formato de output',
          'Guárdalos en un documento "Prompt Library" en Notion o similar',
          'Prueba cada prompt con una tarea real y ajusta según el resultado',
          'Agrega un ejemplo (few-shot) al menos a 2 de los 5 prompts — compara el resultado antes/después',
        ],
        tip: 'Una prompt library personal es uno de los activos más valiosos que puedes construir. Los mejores prompts no son los más complejos — son los más claros. Un prompt reutilizable bien escrito vale meses de iteraciones.',
        completed: false,
      },
          {
        id: 'ia-1-proj-basico',
        title: 'Proyecto Básico: Mapa de IA para tu agencia',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Mapea cómo la IA puede (y no puede) aplicarse en cada área de tu agencia o práctica freelance.',
        deliverables: [
          'Mapa visual en FigJam o Miro: servicios que ofreces + en cuáles la IA puede ayudar y en cuáles no',
          'Para cada área con IA: herramienta específica y porcentaje de trabajo automatizable',
          'Para cada área sin IA: por qué no aplica',
          'Conclusión de 150 palabras: cómo cambia tu propuesta de valor integrando estas herramientas',
        ],
        tip: 'El mapa más honesto incluye los casos donde la IA NO ayuda. Sobrestimarla lleva a promesas incumplibles con clientes.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Anthropic — Prompt Engineering Guide',
        url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
        type: 'documentation',
      },
      {
        title: 'OpenAI Prompt Engineering Guide',
        url: 'https://platform.openai.com/docs/guides/prompt-engineering',
        type: 'documentation',
      },
      {
        title: 'PromptBase — Marketplace de prompts',
        url: 'https://promptbase.com',
        type: 'tool',
      },
    ],
  },

  {
    id: 'ia-2',
    number: 24,
    title: 'IA para Diseño, Código y Contenido',
    description: 'Integra herramientas de IA en tu flujo de trabajo de diseño (imágenes, UI), desarrollo (Copilot, Claude Code) y creación de contenido.',
    duration: '3 semanas',
    status: 'available',
    track: 'ia',
    lessons: [
      {
        id: 'ia2-l1',
        title: 'IA para generación de imágenes: workflows reales',
        type: 'reading',
        content: `## IA para generación de imágenes en producción

Las herramientas de generación de imágenes con IA pasaron de curiosidad a parte esencial del workflow creativo. Saber usarlas bien separa al profesional del amateur.

### Herramientas principales en 2026

**Midjourney** — el estándar de calidad para imágenes creativas
- Calidad fotorrealista y artística superior
- Curva de aprendizaje moderada
- Ideal: branding, marketing, ilustraciones

**DALL-E 3 (vía ChatGPT o API)** — más controlable y literal
- Sigue instrucciones más precisas
- Mejor para composiciones específicas
- Ideal: mockups, infografías, ilustraciones técnicas

**Stable Diffusion (local)** — open source, sin costo por imagen
- Requiere hardware (GPU) o servicios como RunDiffusion
- Máxima personalización y control
- Ideal: producción en volumen, fine-tuning para marca específica

**Gemini (Imagen 3)** — integrado en el ecosistema Google
- Buen equilibrio entre calidad y control
- Excelente para iteración conversacional
- Ideal: contenido editorial, assets de marketing

### Workflow profesional con IA generativa

\`\`\`
1. Brief visual claro (colores, estilo, composición, mood)
2. Prompt detallado en inglés (mejor que español en todos los modelos)
3. Generación inicial → evaluar → iterar en la misma conversación
4. Refinar la variante más cercana (no empezar de cero)
5. Post-producción en Figma o Photopea si es necesario
6. Optimizar: WebP/AVIF, < 500KB para web
\`\`\`

### Anatomía de un prompt de imagen efectivo

\`\`\`
[Estilo dominante], [sujeto/composición], [materiales/texturas],
[iluminación], [fondo], [mood], [restricciones], [aspect ratio]

Ejemplo:
"Premium 3D render, minimalist floating geometric shapes in obsidian
and translucent glass materials, volumetric blue light (#0080ff) from below,
deep slate gradient background (#0f172a), cinematic and sophisticated,
no text, no humans, 16:9"
\`\`\`

### Límites éticos y legales

- **No generar**: caras de personas reales, obras protegidas por copyright, contenido engañoso
- **Transparencia**: si usas IA en trabajo para clientes, comunícalo
- **Derecho de autor**: varía por jurisdicción — en 2026 el debate legal sigue abierto
- **Regla práctica**: usa IA para crear assets originales, no para reproducir estilos de artistas específicos sin permiso

### IA para UI: desde Figma

- **Figma AI** — genera variantes de diseño, auto-layout, descripción de componentes
- **Galileo AI** — genera UI completa desde descripción textual
- **Uizard** — prototipado rápido con IA desde sketches o prompts`,
        completed: false,
      },
      {
        id: 'ia2-l1b',
        title: 'Mini-práctica: Genera assets visuales para un proyecto real',
        type: 'practice',
        tasks: [
          'Elige un proyecto (sitio web, app, campaña) que necesite assets visuales',
          'Escribe un brief visual: estilo, paleta de colores, mood, qué NO quieres',
          'Genera 3 variantes de hero image con Gemini o DALL-E usando la estructura de prompt aprendida',
          'Itera en la mejor variante hasta obtener algo usable (mínimo 3 iteraciones)',
          'Optimiza el resultado final: convierte a WebP, verifica que pesa menos de 500KB',
        ],
        tip: 'El 80% del valor en generación de imágenes está en el brief visual, no en el prompt técnico. Si sabes exactamente qué quieres (referencia, paleta, composición), el prompt casi se escribe solo. Si no tienes claro el brief, ningún prompt te salvará.',
        completed: false,
      },
      {
        id: 'ia2-l2',
        title: 'Claude Code y GitHub Copilot: IA que escribe código',
        type: 'reading',
        content: `## IA para desarrollo: el workflow que multiplica velocidad

Las herramientas de IA para código no reemplazan al desarrollador — multiplican su velocidad. Un buen developer con IA produce entre 3x y 10x más que sin ella.

### Claude Code — el asistente de código más potente

Claude Code (el CLI de Anthropic) opera directamente en tu codebase:

\`\`\`bash
# Instalar
npm install -g @anthropic-ai/claude-code

# Usar en tu proyecto
cd mi-proyecto
claude
\`\`\`

Lo que puede hacer:
- Leer, editar y crear archivos en todo el proyecto
- Ejecutar comandos (build, test, lint)
- Hacer refactoring de múltiples archivos
- Debuggear errores con contexto completo del código
- Escribir tests

**Casos de uso reales en AlphaDev**:
- "Refactoriza este componente para usar Server Component en lugar de Client"
- "Agrega TypeScript strict types a toda la carpeta /components"
- "Implementa la API route para este formulario de contacto"
- "Encuentra todos los console.log y reemplázalos con un logger apropiado"

### GitHub Copilot — autocompletado inteligente

Se integra en VS Code, JetBrains, etc:

- **Autocompletado**: sugiere código línea por línea o función completa
- **Copilot Chat**: pregunta sobre el código, pide explicaciones, genera tests
- **Copilot Edits**: edita múltiples archivos con una sola instrucción

**Para maximizar Copilot**:
1. Escribe comentarios descriptivos antes de la función — Copilot los usa como prompt
2. Nombra bien las variables — Copilot infiere la intención del nombre
3. Tener tests escritos mejora las sugerencias de implementación

### El workflow ideal: Claude Code + Copilot

\`\`\`
Arquitectura y refactoring grande → Claude Code (contexto completo del proyecto)
Escritura de código línea a línea → Copilot (autocompletado en tiempo real)
Debugging complejo → Claude Code (puede leer logs, ejecutar, iterar)
Tests unitarios → Copilot Chat (genera tests para función seleccionada)
\`\`\`

### Lo que la IA NO puede hacer bien (aún)

- Tomar decisiones de arquitectura sin contexto de negocio
- Saber qué es "correcto" para tu caso específico
- Reemplazar la revisión crítica del código
- Garantizar que el código es seguro (siempre revisar el output)`,
        completed: false,
      },
      {
        id: 'ia2-l2b',
        title: 'Mini-práctica: Completa una feature usando IA como pair programmer',
        type: 'practice',
        tasks: [
          'Elige una feature real de un proyecto (formulario, componente, API route)',
          'Usa Claude Code o Copilot Chat para implementarla desde cero — documenta cada prompt que enviaste',
          'Revisa el código generado línea por línea: ¿hay errores? ¿vulnerabilidades? ¿tipos incorrectos?',
          'Pídele a la IA que escriba los tests para el código que generó',
          'Reflexiona: ¿cuánto tiempo te tomó vs sin IA? ¿Qué partes mejoraste manualmente?',
        ],
        tip: 'Trata a la IA como un junior developer muy rápido: necesita instrucciones claras, revisión de su trabajo, y correcciones cuando se equivoca. El error es asumir que el código generado está correcto sin leerlo.',
        completed: false,
      },
          {
        id: 'ia-2-proj-basico',
        title: 'Proyecto Básico: Biblioteca de prompts de agencia',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Construye una biblioteca de prompts optimizados para los servicios de tu agencia. Será un activo que usarás continuamente.',
        deliverables: [
          'Mínimo 15 prompts organizados por categoría de servicio',
          'Cada prompt tiene: nombre, cuándo usarlo, el prompt completo y un ejemplo de output esperado',
          'Al menos 3 categorías: copy/redacción, estrategia y análisis/research',
          'Documento en Notion o Google Docs con formato claro y buscable',
        ],
        tip: 'El mejor prompt es el que puedes usar mañana sin modificaciones. Si siempre tienes que adaptarlo mucho, no está suficientemente parametrizado.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Claude Code — Documentación oficial',
        url: 'https://docs.anthropic.com/en/docs/claude-code',
        type: 'documentation',
      },
      {
        title: 'GitHub Copilot — Getting Started',
        url: 'https://docs.github.com/en/copilot/getting-started-with-github-copilot',
        type: 'documentation',
      },
      {
        title: 'Midjourney — Prompt Guide',
        url: 'https://docs.midjourney.com/docs/prompts',
        type: 'documentation',
      },
    ],
  },

  {
    id: 'ia-3',
    number: 25,
    title: 'Automatizaciones con n8n y Make',
    description: 'Construye flujos de trabajo automatizados que conectan apps, procesan datos y ahorran horas de trabajo repetitivo cada semana.',
    duration: '4 semanas',
    status: 'available',
    track: 'ia',
    lessons: [
      {
        id: 'ia3-l1',
        title: 'Automatizaciones: qué es, cuándo automatizar y cuándo no',
        type: 'reading',
        content: `## Automatizaciones: el principio correcto

Antes de automatizar cualquier cosa, hay una pregunta que debes hacerte:

> *"¿Cuánto tiempo pierdo en esto cada mes, y es consistente?"*

Si la respuesta es "más de 2 horas al mes y siempre sigue el mismo patrón" → automatiza.
Si la respuesta es "varía mucho según el caso" → probablemente no vale la pena.

### Qué es la automatización no-code

Herramientas como n8n y Make te permiten conectar aplicaciones y crear flujos de trabajo sin escribir código:

- Cuando pasa X (trigger) → hacer Y (action)
- Cuando llega un form → guardarlo en Notion + enviar email + notificar en Slack

### n8n vs Make vs Zapier

| | n8n | Make | Zapier |
|---|---|---|---|
| **Precio** | Free (self-hosted) o ~$20/mes cloud | Free hasta 1,000 ops/mes | Free hasta 100 tasks/mes |
| **Complejidad** | Alta (más poderoso) | Media | Baja |
| **Ideal para** | Flujos complejos, privacidad | Automatizaciones medianas | Flujos simples |
| **Curva de aprendizaje** | Alta | Media | Baja |

**Para AlphaDev Studios**: n8n es la herramienta ideal — más poderosa, open-source, y puede correr en tu propio servidor (privacidad total).

### Casos de uso reales para una agencia

**Lead management**:
→ Form de contacto llega → se crea registro en CRM → se envía email de confirmación → se crea tarea en Notion → notificación a Slack

**Onboarding de clientes**:
→ Contrato firmado en DocuSign → crear workspace en Notion → invitar al cliente → crear proyecto en Linear → enviar email de bienvenida

**Reportes automáticos**:
→ Cada viernes → obtener métricas de Google Analytics → formatear → enviar resumen por email

**Social media**:
→ Nuevo post en blog → crear variantes para Instagram, LinkedIn, Twitter → programar en Buffer

### Cuándo NO automatizar

- Cuando el proceso cambia frecuentemente
- Cuando requiere juicio humano en cada caso
- Cuando el costo de mantenimiento > el tiempo ahorrado
- Cuando un error podría tener consecuencias graves`,
        completed: false,
      },
      {
        id: 'ia3-l1b',
        title: 'Mini-práctica: Mapea los procesos automatizables de tu negocio',
        type: 'practice',
        tasks: [
          'Lista todos los procesos manuales repetitivos que haces en una semana típica',
          'Para cada uno, estima: frecuencia (veces/mes), tiempo (minutos), variabilidad (alta/baja)',
          'Calcula el tiempo mensual total perdido en cada proceso',
          'Prioriza los 3 más impactantes (alto tiempo × baja variabilidad)',
          'Para cada uno, dibuja el flujo: trigger → pasos → resultado final. ¿Cuáles apps conectarías?',
        ],
        tip: 'El mapa de procesos es más valioso que la automatización misma. A veces al mapear descubres que el proceso no debería existir en absoluto, o que hay una herramienta que ya lo hace sin necesidad de n8n.',
        completed: false,
      },
      {
        id: 'ia3-l2',
        title: 'Construir tu primer flujo en n8n: paso a paso',
        type: 'reading',
        content: `## n8n: tu primer workflow real

n8n es una herramienta de automatización visual donde conectas "nodos" (bloques de acción) para crear flujos.

### Conceptos base de n8n

**Nodos**: bloques individuales con una función específica
- **Trigger nodes**: inician el flujo (webhook, schedule, email recibido)
- **Action nodes**: ejecutan acciones (enviar email, crear fila en DB, llamar API)
- **Logic nodes**: condiciones, loops, merge de datos

**Workflow**: la secuencia de nodos conectados

**Credentials**: las claves API de tus apps (se guardan de forma segura en n8n)

**Executions**: cada vez que el workflow corre — puedes ver el historial

### Setup inicial

**Opción 1 — n8n Cloud** (más fácil):
1. Crear cuenta en n8n.io
2. Crear nuevo workflow
3. Conectar apps con sus credenciales

**Opción 2 — Self-hosted** (más barato):
\`\`\`bash
# Con Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
\`\`\`

### Flujo ejemplo: Form → Notion → Email

**Trigger**: Webhook (recibe el form)
\`\`\`
Paso 1: Webhook node — URL única que recibe el POST del formulario
Paso 2: Set node — formatea los datos (nombre, email, mensaje)
Paso 3: Notion node — crea una página en tu database de leads
Paso 4: Gmail/Resend node — envía email de confirmación al lead
Paso 5: Slack node — notificación a tu canal #nuevos-leads
\`\`\`

### Debugging en n8n

Cada nodo muestra el input y output de cada ejecución. Cuando algo falla:
1. Click en la ejecución fallida en "Executions"
2. Identifica el nodo que falló (ícono rojo)
3. Ve el error message y el input que recibió
4. Ajusta el nodo y re-ejecuta

### Manejo de errores

n8n tiene nodos de Error Trigger que capturan fallos:
\`\`\`
Error Trigger → Slack node (notificación de fallo) + guardar error en DB
\`\`\`

Siempre agrega manejo de errores en workflows de producción.`,
        completed: false,
      },
      {
        id: 'ia3-l2b',
        title: 'Mini-práctica: Construye tu primer workflow real en n8n',
        type: 'practice',
        tasks: [
          'Crea una cuenta en n8n.io (cloud trial gratuito) o instálalo con Docker localmente',
          'Implementa el flujo: Typeform/Tally form → Google Sheets (guardar lead) → Gmail (email de confirmación)',
          'Prueba el flujo enviando un form real y verifica que todos los pasos funcionen',
          'Agrega un nodo de condición: si el email ya existe en la sheet, no crear duplicado',
          'Agrega un Error Trigger que te notifique por email si el workflow falla',
        ],
        tip: 'Empieza siempre con el workflow más simple posible (2-3 nodos) y hazlo funcionar antes de agregar complejidad. Agregar un nodo a la vez hace el debugging mucho más fácil.',
        completed: false,
      },
          {
        id: 'ia-3-proj-inter',
        title: 'Proyecto Intermedio: Workflow automatizado real',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Identifica un proceso repetitivo en tu trabajo y automatízalo completamente. El workflow debe funcionar de forma autónoma sin intervención manual.',
        deliverables: [
          'Descripción del proceso antes: pasos, tiempo que tomaba, errores comunes',
          'Workflow en n8n, Zapier o Make: diagrama del flujo e instrucciones de configuración',
          'Video demo de 2 minutos mostrando el workflow en acción (Loom)',
          'Métricas: tiempo ahorrado por semana y otros beneficios medibles',
        ],
        tip: 'Automatiza primero el proceso más aburrido que haces. Si lo odias hacerlo manualmente, la motivación de terminarlo es mayor.',
        completed: false,
      },
],
    resources: [
      {
        title: 'n8n Docs — Getting Started',
        url: 'https://docs.n8n.io/getting-started/quickstart',
        type: 'documentation',
      },
      {
        title: 'Make (Integromat) — Academy',
        url: 'https://academy.make.com',
        type: 'course',
      },
      {
        title: 'n8n Community — Workflows compartidos',
        url: 'https://community.n8n.io',
        type: 'tool',
      },
    ],
  },

  {
    id: 'ia-4',
    number: 26,
    title: 'Agentes IA: el siguiente nivel de automatización',
    description: 'Entiende qué son los agentes IA, cómo construir flujos agénticos con n8n + LLMs, y los casos de uso reales en una agencia.',
    duration: '3 semanas',
    status: 'available',
    track: 'ia',
    lessons: [
      {
        id: 'ia4-l1',
        title: 'Qué son los agentes IA y cómo piensan',
        type: 'reading',
        content: `## Agentes IA: autonomía con propósito

Un agente IA no es un chatbot. Es un sistema que puede **razonar, planificar y tomar acciones** para lograr un objetivo, usando herramientas.

### La diferencia fundamental

**LLM clásico** (ChatGPT, Claude):
- Tú haces una pregunta → el modelo responde → fin
- El modelo no puede actuar en el mundo real

**Agente IA**:
- Tú defines un objetivo → el agente planifica → usa herramientas → observa resultados → repite hasta lograr el objetivo

### El loop agéntico

\`\`\`
Objetivo → Razonar → Planificar acción → Ejecutar acción → Observar resultado
          ↑_________________________________________|
                    (si el objetivo no se logró)
\`\`\`

### Herramientas que puede usar un agente

- **Web search**: buscar información actualizada
- **Code execution**: correr código Python/JS
- **File operations**: leer/escribir archivos
- **API calls**: consultar servicios externos
- **Browser control**: navegar y hacer acciones en sitios web

### Ejemplos de agentes reales

**Agente de research**:
*Objetivo: "Encuentra los 5 principales competidores de [startup], analiza sus precios y estrategia de marketing"*
→ Busca en web → lee páginas → extrae precios → compila análisis → genera reporte

**Agente de onboarding**:
*Objetivo: "Onboarding completo para el nuevo cliente XYZ"*
→ Crea workspace en Notion → configura repositorio en GitHub → envía emails → crea tickets iniciales

**Agente de código**:
*Claude Code haciendo refactoring de una feature completa*
→ Lee el código → planifica cambios → edita archivos → corre tests → corrige errores → commit

### Por qué los agentes no son perfectos (todavía)

- **Alucinaciones**: pueden tomar acciones basadas en información incorrecta
- **Loops**: pueden quedarse atrapados si el objetivo es ambiguo
- **Costo**: muchas llamadas al LLM = más tokens = más $$$
- **Confianza**: las acciones con consecuencias graves necesitan supervisión humana

### Principio de supervisión humana

Para tareas de alto impacto (enviar emails, publicar en producción, gastar dinero), el agente debe:
1. Planificar y mostrar el plan al humano
2. Esperar aprobación
3. Ejecutar
4. Reportar resultado`,
        completed: false,
      },
      {
        id: 'ia4-l1b',
        title: 'Mini-práctica: Diseña un agente para tu agencia',
        type: 'practice',
        tasks: [
          'Identifica un proceso de tu agencia que podría beneficiarse de un agente (research, onboarding, reporting)',
          'Escribe la especificación del agente: objetivo, herramientas necesarias, outputs esperados',
          'Dibuja el loop agéntico: qué observa en cada iteración y cuándo sabe que terminó',
          'Identifica los puntos donde necesita supervisión humana (decisiones de alto impacto)',
          'Estima el costo en tokens por ejecución — ¿es viable económicamente?',
        ],
        tip: 'Los mejores casos para agentes son tareas que: (1) requieren múltiples pasos, (2) necesitan información de múltiples fuentes, (3) tienen criterios de éxito claros, y (4) los errores son recuperables. Empieza siempre con el caso más controlado.',
        completed: false,
      },
      {
        id: 'ia4-l2',
        title: 'Construir un agente con n8n + Claude: caso práctico',
        type: 'reading',
        content: `## Agente de research con n8n + Claude

Vamos a construir un agente real: dado el nombre de una empresa, investiga automáticamente y genera un brief de prospecto para la agencia.

### El workflow completo

\`\`\`
Input: nombre de empresa
→ Google Search (sitio web oficial)
→ Scraping del sitio (descripción, servicios, tecnología)
→ LinkedIn Search (tamaño de empresa, industria)
→ Claude: analizar toda la información y generar brief
→ Output: documento en Notion con el brief estructurado
\`\`\`

### Nodos de n8n necesarios

**1. Manual Trigger** (o Webhook para versión automatizada)
- Input: \`{ "empresa": "NombreEmpresa" }\`

**2. HTTP Request → SerpAPI o Serper.dev**
\`\`\`json
{
  "q": "{{ $json.empresa }} site oficial",
  "num": 3
}
\`\`\`

**3. HTTP Request → Jina.ai Reader** (scraping limpio)
\`\`\`
GET https://r.jina.ai/{url-del-sitio}
\`\`\`

**4. Anthropic Claude node** (n8n tiene nodo nativo)
\`\`\`
Analiza esta información sobre la empresa {nombre}:
{contenido del sitio}

Genera un brief de prospecto con:
- Descripción del negocio (2-3 oraciones)
- Tecnologías que usan (si es visible)
- Posibles pain points que AlphaDev podría resolver
- Tamaño estimado y etapa (startup/scaleup/empresa)
- Recomendación: ¿es buen fit para AlphaDev? ¿Por qué?
\`\`\`

**5. Notion node**
- Crear página en database "Prospectos"
- Guardar el brief generado

### Hacerlo más inteligente: memoria y contexto

Para que el agente recuerde prospectos anteriores y no duplique trabajo:

\`\`\`
Antes de investigar → consultar Notion si ya existe el prospecto
Si existe → actualizar en lugar de crear nuevo
Si no existe → crear nuevo
\`\`\`

### Costos estimados

- SerpAPI: $50/mes para 5,000 búsquedas
- Claude API: ~$0.01 por research completo (Sonnet)
- Jina.ai Reader: free tier disponible
- **Total por prospecto**: ~$0.02-0.05

Para una agencia que prospecta 50 empresas/mes: ~$2.50/mes en APIs.

### Escalar el agente

Una vez que funciona para un caso, escala:
1. Input masivo: una lista de 100 empresas en Google Sheets
2. Loop en n8n: procesar cada empresa
3. Enrichment adicional: Clearbit, Apollo.io para datos de contacto
4. Priorización automática: Claude rankea los mejores prospectos`,
        completed: false,
      },
      {
        id: 'ia4-l2b',
        title: 'Mini-práctica: Construye el agente de research en n8n',
        type: 'practice',
        tasks: [
          'Crea el workflow en n8n con los nodos: Trigger → HTTP Request (búsqueda) → Claude → Notion',
          'Prueba con 3 empresas reales — verifica que el brief generado es útil y preciso',
          'Agrega la lógica de "no duplicar": verificar en Notion antes de crear',
          'Optimiza el prompt de Claude hasta que el brief sea consistentemente bueno',
          'Documenta el workflow: qué hace cada nodo, qué credenciales necesita, cómo usarlo',
        ],
        tip: 'Cuando el agente falla, el problema suele estar en los datos intermedios, no en Claude. Revisa el output de cada nodo antes de Claude para verificar que está recibiendo buena información. Basura entra, basura sale.',
        completed: false,
      },

      {
        id: 'ia-exam',
        title: 'Examen final: IA en el Workflow',
        type: 'exam',
        questions: [
          {
            q: '¿Qué es el "context window" de un modelo de lenguaje y por qué importa?',
            options: [
              'La ventana de la interfaz de usuario donde escribes el prompt',
              'La cantidad máxima de tokens que el modelo puede procesar en una sola interacción (input + output)',
              'El tiempo máximo que tarda el modelo en generar una respuesta',
              'El número máximo de conversaciones que puedes tener por mes',
            ],
            correct: 1,
            explanation: 'El context window es la "memoria de trabajo" del modelo — todo lo que puede ver simultáneamente. Claude 3.5 Sonnet tiene 200K tokens (~150,000 palabras). Si el input supera el context window, el modelo pierde información del inicio. Para proyectos grandes de código, un context window amplio es crucial.',
          },
          {
            q: '¿Qué es el "few-shot prompting" y por qué mejora los resultados?',
            options: [
              'Enviar prompts muy cortos para ahorrar tokens',
              'Incluir ejemplos del output deseado dentro del prompt para que el modelo imite el formato y estilo',
              'Dividir un prompt complejo en múltiples prompts pequeños',
              'Usar el modelo con temperatura baja (few shots = menos aleatoriedad)',
            ],
            correct: 1,
            explanation: 'Few-shot prompting incluye 1-5 ejemplos de input→output en el prompt. El modelo aprende el patrón deseado de esos ejemplos y lo replica. Es el modificador de calidad más poderoso disponible: un prompt con un buen ejemplo produce resultados significativamente más consistentes que el mismo prompt sin ejemplo.',
          },
          {
            q: '¿Cuál es la diferencia fundamental entre un LLM clásico y un agente IA?',
            options: [
              'Los agentes son más inteligentes — tienen mayor capacidad de razonamiento',
              'Un LLM responde a un input y termina; un agente puede razonar, usar herramientas, observar resultados e iterar hasta lograr un objetivo',
              'Los agentes funcionan solo offline; los LLMs requieren conexión a internet',
              'Un agente es simplemente un LLM con una personalidad definida (system prompt)',
            ],
            correct: 1,
            explanation: 'Un LLM es input → output, fin. Un agente implementa un loop: objetivo → razonar → ejecutar acción (buscar, escribir código, llamar API) → observar resultado → repetir. Esta capacidad de actuar iterativamente en el mundo real es lo que los hace cualitativamente diferentes de un chatbot.',
          },
          {
            q: 'En n8n, ¿cuál es la diferencia entre un "Trigger node" y un "Action node"?',
            options: [
              'Los Trigger nodes son más caros en el plan de pago',
              'Trigger nodes inician el workflow cuando ocurre un evento; Action nodes ejecutan operaciones dentro del workflow',
              'Trigger nodes solo funcionan con webhooks; Action nodes con APIs',
              'No hay diferencia funcional, es solo una categorización visual',
            ],
            correct: 1,
            explanation: 'Trigger nodes son el "cuándo": webhook recibido, horario programado, email llegado, nuevo registro en DB. Action nodes son el "qué": enviar email, crear fila en Supabase, llamar a Claude, publicar en Slack. Sin Trigger no hay workflow; sin Actions el workflow no hace nada útil.',
          },
          {
            q: '¿Qué es la "temperatura" en los modelos de IA y cómo afecta el output?',
            options: [
              'El uso de CPU del servidor — temperatura alta significa más carga computacional',
              'Un parámetro que controla la aleatoriedad: temperatura 0 = determinista/predecible, temperatura 1 = más creativo/variado',
              'La velocidad de generación de tokens — temperatura alta genera más rápido',
              'El nivel de censura del modelo — temperatura alta = menos restricciones',
            ],
            correct: 1,
            explanation: 'Temperatura controla cuánta aleatoriedad hay en la selección de tokens. Temp 0 = siempre elige el token más probable (muy consistente, ideal para código, datos). Temp 0.7-1 = más variación y creatividad (ideal para copy, brainstorming). La mayoría de casos de producción usan 0-0.3.',
          },
          {
            q: '¿Cuándo deberías usar Claude Code en lugar de GitHub Copilot?',
            options: [
              'Claude Code solo para proyectos Python; Copilot para JavaScript',
              'Claude Code para tareas que requieren contexto completo del proyecto (refactoring, bugs complejos, múltiples archivos); Copilot para autocompletado línea por línea mientras escribes',
              'Son idénticos — solo difieren en precio',
              'Copilot para código; Claude Code solo para documentación',
            ],
            correct: 1,
            explanation: 'Claude Code lee y entiende el proyecto completo, puede editar múltiples archivos, ejecutar comandos, ver errores y corregir — ideal para tareas de alto nivel. Copilot es un autocompletado inteligente en tiempo real dentro del editor. Se complementan: Claude Code para arquitectura/refactoring, Copilot para escritura rápida de código.',
          },
          {
            q: '¿Qué significa que un agente IA sea "alucinando" y cómo mitigarlo?',
            options: [
              'El agente se vuelve lento por sobrecarga — se mitiga reiniciando la sesión',
              'El modelo genera información falsa presentada con total confianza — se mitiga con RAG, validación de outputs y supervisión humana en decisiones críticas',
              'El agente entra en un loop infinito — se mitiga con límites de iteraciones',
              'El agente ignora parte del prompt — se mitiga siendo más específico',
            ],
            correct: 1,
            explanation: 'Los LLMs generan el token más probable, no el más verdadero. Esto causa que inventen hechos, URLs, nombres o datos con aparente seguridad. Mitigaciones: RAG (darle la información como contexto en lugar de pedirle que la "recuerde"), validar outputs críticos, no usar LLMs para datos factuales sin grounding, supervisión humana en acciones irreversibles.',
          },
          {
            q: '¿Cuál es el riesgo principal de incluir la service_role key de Supabase en código frontend?',
            options: [
              'El build fallará porque esa key solo funciona en el servidor',
              'La key expuesta en el browser permite a cualquiera bypassear todas las políticas RLS y tener acceso total a la base de datos',
              'Supabase bloqueará la key automáticamente si detecta uso desde el browser',
              'Solo causa un warning en la consola del browser',
            ],
            correct: 1,
            explanation: 'La service_role key bypasea completamente el Row Level Security — cualquiera que la vea en el código fuente puede leer, modificar o eliminar cualquier dato de tu base de datos. La anon key es la única que va al frontend. La service_role va solo a rutas API del servidor o funciones edge, nunca en código cliente.',
          },
        ],
        completed: false,
      },
    
    {
      id: 'ia-4-p1',
      title: 'Proyecto: Pipeline RAG en producción',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: 'Implementa un sistema RAG (Retrieval-Augmented Generation) que responda preguntas sobre un conjunto de documentos propios. Usa embeddings, vector store y un LLM. El sistema debe estar disponible vía API o interfaz web.',
      deliverables: [
        'Código del pipeline completo en GitHub',
        'Mínimo 20 documentos indexados',
        'API o interfaz para hacer preguntas',
        'Evaluación de calidad: 10 preguntas con respuestas esperadas',
        'README con arquitectura explicada',
      ],
      rubrica: [
        'Retrieval relevante en >80% de consultas de prueba',
        'Respuestas grounded (no alucinaciones evidentes)',
        'Sistema disponible para demostración',
        'Arquitectura documentada con diagrama',
      ],
      completed: false,
    },],
    resources: [
      {
        title: 'n8n — AI Agents documentation',
        url: 'https://docs.n8n.io/advanced-ai/intro-tutorial',
        type: 'documentation',
      },
      {
        title: 'Jina.ai Reader — Scraping para LLMs',
        url: 'https://jina.ai/reader',
        type: 'tool',
      },
      {
        title: 'Anthropic — Building Agents guide',
        url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/build-an-agent',
        type: 'documentation',
      },
    ],
  },

  // ─── Track: SEO y Posicionamiento Orgánico ───────────────────────────────────

  {
    id: 'seo-1',
    number: 27,
    title: 'Keyword Research: encontrar las palabras que importan',
    description: 'Aprende a identificar qué busca tu audiencia, cómo priorizar oportunidades y construir la arquitectura de contenido que Google premia.',
    duration: '2 semanas',
    status: 'available',
    track: 'seo',
    lessons: [
      {
        id: 's1-l1',
        title: 'Cómo funciona Google y por qué el SEO no es trampa',
        type: 'reading',
        content: `## SEO: el canal con mejor ROI a largo plazo

El SEO (Search Engine Optimization) es el proceso de hacer que tu sitio web aparezca en los primeros resultados de búsqueda para las palabras clave relevantes de tu negocio.

No es trampa. No es magia. Es entender cómo funciona Google y darle exactamente lo que busca: **el resultado más útil y confiable para cada búsqueda**.

### Cómo funciona Google (versión que importa para SEO)

**1. Crawling** — Googlebot visita páginas web a través de links y las descarga
**2. Indexing** — Google procesa y guarda las páginas en su índice (base de datos gigante)
**3. Ranking** — Cuando alguien busca, Google ordena las páginas relevantes según ~200 factores

### Los 3 pilares del SEO

**Técnico** — ¿puede Google rastrear e indexar tu sitio sin problemas?
- Velocidad, mobile-friendly, HTTPS, sitemap, robots.txt

**Contenido** — ¿tu sitio responde mejor que otros lo que la gente busca?
- Relevancia, profundidad, originalidad, actualización

**Autoridad** — ¿otros sitios confiables enlazan al tuyo?
- Backlinks, menciones, reputación de dominio

### Por qué SEO vs otros canales

| Canal | Costo | Tiempo | Duración |
|-------|-------|--------|----------|
| Google Ads | Alto por click | Inmediato | Solo mientras pagas |
| Meta Ads | Medio | Rápido | Solo mientras pagas |
| **SEO orgánico** | Bajo (tiempo) | 3-12 meses | Indefinido |
| Email | Bajo | Medio | Indefinido |

El SEO es el canal que más demora en arrancar y más dura una vez que funciona.

### Search Intent: la clave que la mayoría ignora

Cada búsqueda tiene una *intención*. Google clasifica las búsquedas en 4 tipos:

**Informacional** — "cómo hacer SEO" → quieren aprender
**Navegacional** — "AlphaDev Studios" → quieren ir a un sitio específico
**Comercial** — "mejor agencia digital LATAM" → están evaluando opciones
**Transaccional** — "contratar agencia Next.js" → listos para comprar

El SEO efectivo crea contenido que coincide con la intención correcta en cada etapa.`,
        completed: false,
      },
      {
        id: 's1-l1b',
        title: 'Mini-práctica: Mapea el search intent de tu negocio',
        type: 'practice',
        tasks: [
          'Lista 20 búsquedas que tus clientes potenciales podrían hacer (mezcla de informacional, comercial y transaccional)',
          'Clasifica cada búsqueda en los 4 tipos de intent (informacional / navegacional / comercial / transaccional)',
          'Para las 5 búsquedas transaccionales, busca en Google incógnito y anota quién aparece primero',
          'Elige 3 búsquedas donde creas que podrías competir y explica por qué',
          'Instala la extensión Ahrefs SEO Toolbar (gratuita) y observa los métricas de las páginas que rankean',
        ],
        tip: 'La mayoría de empresas pequeñas intenta rankear para términos transaccionales de alto volumen y alta competencia. El SEO efectivo empieza por las búsquedas informacionales de nicho — donde hay menos competencia y puedes establecer autoridad antes de pelear por las keywords comerciales.',
        completed: false,
      },
      {
        id: 's1-l2',
        title: 'Keyword research: volumen, dificultad y oportunidad real',
        type: 'reading',
        content: `## Keyword Research: encontrar palabras que puedas ganar

El keyword research no es buscar las palabras con más volumen. Es encontrar las palabras donde el volumen justifica el esfuerzo y tienes posibilidad real de rankear.

### Las métricas que importan

**Search Volume (SV)** — búsquedas mensuales promedio
- Alto no siempre es mejor: más volumen = más competencia
- Un keyword de 100 búsquedas/mes muy relevante vale más que uno de 10,000 irrelevante

**Keyword Difficulty (KD)** — qué tan difícil es rankear (0-100)
- KD 0-20: fácil, ideal para sitios nuevos
- KD 20-50: moderado, necesitas autoridad de dominio media
- KD 50+: difícil, solo sitios establecidos con muchos backlinks

**CPC (Cost Per Click)** — lo que los anunciantes pagan por ese click
- Alto CPC = intención comercial alta = valor para el negocio

**Domain Rating / Domain Authority** — autoridad de tu dominio (0-100)
- Tu DR determina contra quién puedes competir

### Herramientas gratuitas vs de pago

**Gratuitas**:
- **Google Search Console** — las keywords que ya te traen tráfico (INDISPENSABLE)
- **Google Keyword Planner** — volúmenes aproximados (necesita cuenta Google Ads)
- **Ubersuggest** (versión free) — keyword ideas básicas
- **Answer The Public** — preguntas que hace la gente

**De pago (valen la pena)**:
- **Ahrefs** — el estándar de la industria, ~$99/mes
- **Semrush** — similar a Ahrefs, más enfocado en marketing
- **Mangools KWFinder** — más económico, bueno para starters (~$29/mes)

### El proceso de keyword research en 5 pasos

\`\`\`
1. Seed keywords → las palabras base de tu negocio
   "agencia digital", "desarrollo web", "landing page"

2. Expand → usa herramientas para encontrar variaciones
   "agencia digital startup", "contratar agencia desarrollo web"

3. Filter → aplica filtros de volumen y dificultad
   Elimina KD >50 si tu DR es bajo

4. Classify → agrupa por intent y tema
   Informacional / Comercial / Transaccional

5. Prioritize → elige las 10-20 oportunidades más viables
   Balance entre volumen, dificultad y relevancia
\`\`\`

### Long-tail vs short-tail

**Short-tail** (1-2 palabras): "agencia digital"
- Alto volumen, alta competencia, intent genérico

**Long-tail** (3+ palabras): "agencia desarrollo web para startups México"
- Bajo volumen, baja competencia, intent específico → más fácil de convertir

**Estrategia ganadora para sitios nuevos**: empieza con long-tail de baja competencia, construye autoridad, luego ataca short-tail.`,
        completed: false,
      },
      {
        id: 's1-l2b',
        title: 'Mini-práctica: Construye tu keyword map inicial',
        type: 'practice',
        tasks: [
          'Crea una spreadsheet con columnas: Keyword, Volumen mensual, KD, Intent, Prioridad (1-3)',
          'Genera 50 keywords usando Google Autocomplete (tipea tu keyword base y anota las sugerencias)',
          'Filtra a 20 keywords viables para tu nivel de autoridad actual',
          'Agrúpalas en 5-7 "clusters" temáticos (cada cluster = una página o sección del sitio)',
          'Marca con ⭐ las 5 keywords que atacarías primero y justifica cada elección',
        ],
        tip: 'El truco del keyword research no es encontrar la keyword perfecta — es encontrar keywords que otras empresas similares a ti están ganando. Si alguien con tu mismo nivel de autoridad rankea en top 10, tú también puedes.',
        completed: false,
      },
          {
        id: 'seo-1-proj-basico',
        title: 'Proyecto Básico: Keyword research para un nicho',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Haz un keyword research completo para un nicho de tu elección con herramientas gratuitas. Objetivo: 30 keywords accionables.',
        deliverables: [
          '30 keywords en clusters temáticos (mínimo 4 clusters)',
          'Para cada keyword: volumen aproximado, dificultad (alta/media/baja) e intent (informacional, comercial, transaccional, navegacional)',
          'Top 10 priorizadas con justificación',
          'Mapa de contenidos: qué página cubriría cada cluster',
        ],
        tip: 'Las mejores keywords para un sitio nuevo no son las de mayor volumen — son las de menor dificultad con suficiente volumen.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Ahrefs — Free SEO Tools',
        url: 'https://ahrefs.com/free-seo-tools',
        type: 'tool',
      },
      {
        title: 'Google Search Console',
        url: 'https://search.google.com/search-console',
        type: 'tool',
      },
      {
        title: 'Ahrefs Blog — Beginner\'s Guide to SEO',
        url: 'https://ahrefs.com/blog/learn-seo',
        type: 'course',
      },
    ],
  },

  {
    id: 'seo-2',
    number: 28,
    title: 'SEO Técnico: la base que Google necesita ver',
    description: 'Core Web Vitals, indexación, schema markup, sitemap y todo lo que hace que Google pueda rastrear y premiar tu sitio.',
    duration: '3 semanas',
    status: 'available',
    track: 'seo',
    lessons: [
      {
        id: 's2-l1',
        title: 'Core Web Vitals y performance SEO',
        type: 'reading',
        content: `## SEO Técnico: la infraestructura que Google evalúa

Google usa señales técnicas como factor de ranking. Un sitio lento, con errores de crawl o sin HTTPS pierde posiciones frente a sitios técnicamente sanos.

### Core Web Vitals (CWV)

Google mide 3 métricas de experiencia del usuario en tiempo real:

**LCP — Largest Contentful Paint** (velocidad de carga percibida)
- Mide: cuánto tarda en cargar el elemento más grande visible
- Target: < 2.5 segundos
- Solución si falla: optimizar imágenes (WebP, lazy loading), CDN, servidor más rápido

**INP — Interaction to Next Paint** (responsividad)
- Mide: cuánto tarda la página en responder a una interacción del usuario
- Target: < 200ms
- Solución si falla: reducir JavaScript bloqueante, optimizar event handlers

**CLS — Cumulative Layout Shift** (estabilidad visual)
- Mide: cuánto se mueven los elementos mientras carga la página
- Target: < 0.1
- Solución si falla: definir dimensiones explícitas en imágenes y videos

### Cómo medir CWV

**PageSpeed Insights** (gratuito):
\`\`\`
https://pagespeed.web.dev/
\`\`\`
Analiza una URL y da puntuación + recomendaciones específicas.

**Google Search Console → Core Web Vitals**:
- Muestra el estado de todas las páginas de tu sitio
- Diferencia entre mobile y desktop
- Alertas cuando páginas bajan de "bueno" a "necesita mejora"

### HTTPS y seguridad

HTTPS es factor de ranking confirmado desde 2014. Todo sitio moderno debe tenerlo.

Vercel lo configura automáticamente. Si usas otro hosting:
\`\`\`bash
# Let's Encrypt gratis con Certbot
sudo certbot --nginx -d tudominio.com
\`\`\`

### Robots.txt y crawl budget

\`\`\`txt
# /robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Sitemap: https://tudominio.com/sitemap.xml
\`\`\`

**Reglas**:
- Bloquea lo que NO debe indexarse (admin, APIs, páginas de login)
- No bloquees CSS/JS — Google los necesita para renderizar
- Verifica en GSC que Googlebot puede acceder a lo que necesitas

### Indexación y canonicales

\`\`\`html
<!-- En el <head> de cada página -->
<link rel="canonical" href="https://tudominio.com/pagina-correcta" />
\`\`\`

El canonical le dice a Google cuál es la versión "oficial" de una URL — evita contenido duplicado cuando hay parámetros URL o múltiples rutas al mismo contenido.`,
        completed: false,
      },
      {
        id: 's2-l1b',
        title: 'Mini-práctica: Auditoría técnica de tu sitio',
        type: 'practice',
        tasks: [
          'Corre tu sitio en pagespeed.web.dev — anota los scores mobile y desktop por separado',
          'Identifica los 3 problemas más críticos que reporta y busca la solución específica para cada uno',
          'Verifica en Google Search Console que tu sitemap está configurado y no hay errores de crawl',
          'Revisa que todas tus páginas tienen canonical tag correcto (inspecciona el HTML)',
          'Corre un crawl gratuito con Screaming Frog (hasta 500 URLs) — identifica 404s, redirects y páginas sin meta description',
        ],
        tip: 'En Next.js, el LCP más fácil de mejorar es priorizar la imagen del hero: agrega priority={true} al componente <Image> del hero. Esto pre-carga la imagen antes del renderizado y generalmente mejora el LCP en 0.5-1 segundo.',
        completed: false,
      },
      {
        id: 's2-l2',
        title: 'Schema markup, Open Graph y metadatos SEO',
        type: 'reading',
        content: `## Metadatos SEO: cómo Google muestra tu sitio

Los metadatos le dicen a Google y redes sociales cómo presentar tu contenido. Bien implementados mejoran el CTR (click-through rate) sin mejorar el ranking — pero más clicks sí mejoran el ranking a largo plazo.

### Meta tags esenciales

\`\`\`typescript
// Next.js — app/page.tsx o cualquier layout/page
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AlphaDev Studios — Software con IA para Startups',
  description: 'Construimos tu MVP en 3 semanas con Next.js, Supabase e IA integrada. Para founders que no tienen tiempo que perder.',
  keywords: ['agencia desarrollo web', 'MVP startup', 'Next.js'],
  robots: 'index, follow',
  canonical: 'https://alphadev.studio',
};
\`\`\`

**Reglas para title y description**:
- Title: 50-60 caracteres. Keyword principal al inicio.
- Description: 140-160 caracteres. Persuasivo, no solo descriptivo.
- Cada página necesita title y description únicos.

### Open Graph (para redes sociales)

\`\`\`typescript
export const metadata: Metadata = {
  openGraph: {
    title: 'AlphaDev Studios',
    description: 'Software con IA para startups. En producción en 3 semanas.',
    url: 'https://alphadev.studio',
    siteName: 'AlphaDev Studios',
    images: [
      {
        url: 'https://alphadev.studio/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AlphaDev Studios',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlphaDev Studios',
    description: 'Software con IA para startups.',
    images: ['https://alphadev.studio/og-image.png'],
  },
};
\`\`\`

### Schema Markup / JSON-LD

Schema.org es un vocabulario estándar que le dice a Google exactamente qué tipo de contenido eres. Puede generar "rich results" (resultados enriquecidos) en Google.

\`\`\`tsx
// app/layout.tsx — Schema para organización
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AlphaDev Studios',
  url: 'https://alphadev.studio',
  description: 'Agencia de desarrollo web con IA para startups',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-407-686-7561',
    contactType: 'sales',
  },
  sameAs: [
    'https://instagram.com/alphadev.studio',
  ],
};

// En el JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
\`\`\`

### Sitemap.xml en Next.js

\`\`\`typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://alphadev.studio',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://alphadev.studio/servicios',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
\`\`\``,
        completed: false,
      },
      {
        id: 's2-l2b',
        title: 'Mini-práctica: Implementa metadatos SEO completos',
        type: 'practice',
        tasks: [
          'Audita todas las páginas de tu sitio — anota cuáles no tienen title/description únicos',
          'Implementa metadata en Next.js para cada página (title, description, og:image, twitter:card)',
          'Agrega Schema JSON-LD de tipo Organization o LocalBusiness según corresponda',
          'Genera el sitemap.xml con Next.js y verifica que está en https://tudominio.com/sitemap.xml',
          'Valida el schema en schema.dev/tools/validate y el OG en opengraph.xyz',
        ],
        tip: 'La og:image es lo más visible cuando alguien comparte tu link en Slack, Twitter o WhatsApp. Una imagen de 1200x630px bien diseñada con tu logo y tagline puede doblar el CTR de un link compartido vs no tener og:image.',
        completed: false,
      },
          {
        id: 'seo-2-proj-inter',
        title: 'Proyecto Intermedio: Auditoría técnica de SEO',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Audita el SEO técnico de un sitio web real. Identifica los problemas y prioriza las acciones.',
        deliverables: [
          'Core Web Vitals: screenshot de PageSpeed en mobile y desktop con interpretación de cada métrica',
          'Estructura: sitemap.xml, robots.txt, canonicals y meta tags de las 5 páginas principales',
          'Links: broken links encontrados + análisis de internal linking',
          'Reporte de problemas priorizado por impacto × facilidad de implementación',
          'Plan de acción: los 5 fixes más importantes con instrucciones específicas',
        ],
        tip: 'Ordenar los problemas por prioridad es tan importante como encontrarlos. El cliente no puede arreglar todo a la vez.',
        completed: false,
      },
],
    resources: [
      {
        title: 'PageSpeed Insights',
        url: 'https://pagespeed.web.dev',
        type: 'tool',
      },
      {
        title: 'Schema.org — Structured Data Validator',
        url: 'https://schema.dev/tools/validate',
        type: 'tool',
      },
      {
        title: 'Screaming Frog SEO Spider (gratis hasta 500 URLs)',
        url: 'https://www.screamingfrog.co.uk/seo-spider',
        type: 'tool',
      },
    ],
  },

  {
    id: 'seo-3',
    number: 29,
    title: 'Content SEO: crear contenido que rankea',
    description: 'Cómo escribir y estructurar contenido que Google premia: on-page SEO, estructura de posts, clusters de contenido y actualización.',
    duration: '3 semanas',
    status: 'available',
    track: 'seo',
    lessons: [
      {
        id: 's3-l1',
        title: 'On-page SEO: optimizar cada página',
        type: 'reading',
        content: `## On-page SEO: señales dentro de tu control

El on-page SEO son todos los factores de ranking que controlas directamente dentro de tu propio sitio.

### La anatomía de una página SEO-optimizada

**URL**:
\`\`\`
✅ /agencia-desarrollo-web-startups
❌ /page?id=47&category=services
❌ /servicios-de-desarrollo-web-para-startups-en-mexico-2024
\`\`\`
Corta, descriptiva, keyword incluida, sin caracteres especiales.

**Title Tag** (el más importante):
\`\`\`html
<title>Agencia Desarrollo Web para Startups | AlphaDev Studios</title>
\`\`\`
- Keyword principal al inicio
- 50-60 caracteres
- Único por página
- Incluye la marca al final

**H1** (uno por página):
\`\`\`html
<h1>Desarrollo Web para Startups con IA integrada</h1>
\`\`\`
- Similar al title, puede variar ligeramente
- Debe contener la keyword principal
- Solo uno por página

**H2/H3** (estructura del contenido):
- Cada H2 cubre un sub-tema relevante
- Incluyen variaciones de la keyword naturalmente
- Ayudan a Google a entender la estructura del artículo

**Primer párrafo**:
- La keyword principal aparece en las primeras 100 palabras
- Establece de qué trata la página inmediatamente

### Densidad de keyword y LSI

La keyword debe aparecer de forma natural en:
- Title, H1, primer párrafo
- URL
- Alt text de imágenes relevantes
- Algunos H2/H3
- Conclusión

**Evitar keyword stuffing** (repetición forzada) — Google lo penaliza.

**LSI keywords** (Latent Semantic Indexing): palabras relacionadas que Google espera ver:
- Si hablas de "agencia SEO" → espera ver: ranking, posicionamiento, keywords, Google, contenido
- Usar sinónimos y términos relacionados naturalmente mejora la relevancia temática

### Longitud del contenido

No hay número mágico, pero hay correlaciones:
- Top 3 resultados en Google promedian 1,500-2,500 palabras para queries informacionales
- Landing pages de servicios pueden funcionar con 800-1,200 palabras bien escritas
- Más palabras ≠ mejor: 500 palabras perfectas > 3,000 rellenas

La regla: **cubre el tema mejor que cualquier otro resultado en esa SERP específica**.

### Imágenes optimizadas

\`\`\`html
<img
  src="equipo-alphadev-studios.webp"
  alt="Equipo de AlphaDev Studios trabajando en proyecto Next.js"
  width="800"
  height="600"
  loading="lazy"
/>
\`\`\`
- **Alt text**: descriptivo + keyword natural si aplica
- **Nombre de archivo**: descriptivo, con guiones
- **Formato**: WebP o AVIF
- **Dimensiones explícitas**: evita CLS`,
        completed: false,
      },
      {
        id: 's3-l1b',
        title: 'Mini-práctica: Optimiza una página existente',
        type: 'practice',
        tasks: [
          'Elige una página de tu sitio que ya tenga algo de tráfico (o que quieras que tenga) y define su keyword principal',
          'Audita: ¿aparece la keyword en title, H1, primer párrafo, URL y al menos un H2?',
          'Revisa todas las imágenes de la página: ¿tienen alt text descriptivo? ¿están en WebP?',
          'Usa la extensión "Detailed SEO Extension" para ver el outline de headings — ¿la estructura tiene sentido?',
          'Reescribe el title y meta description para maximizar el CTR desde los resultados de búsqueda',
        ],
        tip: 'Antes de crear contenido nuevo, optimiza el contenido que ya tienes. Una página que rankea en posición 8 y pasa a posición 3 puede triplicar el tráfico sin crear nada nuevo. El SEO de lo existente siempre tiene mejor ROI que crear desde cero.',
        completed: false,
      },
      {
        id: 's3-l2',
        title: 'Content clusters: la arquitectura que multiplica autoridad',
        type: 'reading',
        content: `## Topic Clusters: el modelo de contenido que Google premia en 2025

Google evalúa la **autoridad temática** de un sitio: ¿cubre este sitio un tema en profundidad, o solo tiene una página superficial?

Los topic clusters responden a esto sistemáticamente.

### La estructura hub-and-spoke

\`\`\`
Pillar Page (hub)
"Guía completa de SEO para startups"
│
├── Cluster: "Keyword research para startups"
├── Cluster: "SEO técnico en Next.js"
├── Cluster: "Cómo escribir meta descriptions"
├── Cluster: "Link building para sitios nuevos"
└── Cluster: "Cómo medir el ROI del SEO"
\`\`\`

**Pillar page**: cubre el tema principal de forma amplia (3,000-5,000 palabras)
**Cluster pages**: cubren sub-temas en profundidad (1,000-2,000 palabras cada una)
**Internal linking**: cada cluster enlaza a la pillar y la pillar enlaza a cada cluster

### Por qué funciona

1. Google ve que el sitio cubre el tema **exhaustivamente**
2. El interlinking distribuye "autoridad" entre páginas relacionadas
3. Cuando una página cluster gana backlinks, también beneficia a la pillar
4. Cubre múltiples intenciones de búsqueda dentro del mismo tema

### Cómo planificar un cluster

\`\`\`
1. Elige el tema central de tu negocio
   Ejemplo: "desarrollo web para startups"

2. Mapea las preguntas que tiene tu audiencia sobre ese tema
   - ¿Cuánto cuesta desarrollar una startup?
   - ¿Next.js o React para una startup?
   - ¿Cuándo contratar un desarrollador vs una agencia?
   - ¿Cómo medir el ROI del desarrollo web?

3. Cada pregunta = un artículo del cluster
   Con su propio keyword, título optimizado, contenido profundo

4. Crea la pillar que enlaza a todos
   Y actualiza cada cluster para que enlace a la pillar
\`\`\`

### Internal linking estratégico

- Cada artículo nuevo debe enlazar a 3-5 artículos existentes relevantes
- Usa anchor text descriptivo (no "click aquí")
- La pillar page tiene el mayor número de internal links entrantes
- Nunca dejes "huérfanas" páginas sin links que apunten a ellas`,
        completed: false,
      },
      {
        id: 's3-l2b',
        title: 'Mini-práctica: Diseña el primer topic cluster de tu sitio',
        type: 'practice',
        tasks: [
          'Elige el tema central más relevante para tu negocio (ejemplo: "agencia digital para startups")',
          'Crea el mapa del cluster: 1 pillar page + 5-8 cluster pages con sus keywords individuales',
          'Escribe el outline completo (H1, H2, H3) de la pillar page',
          'Escribe el artículo completo de una cluster page (mínimo 1,000 palabras, SEO-optimizado)',
          'Implementa el internal linking: el artículo enlaza a la pillar y a 2 clusters relacionados',
        ],
        tip: 'El error más común con clusters es crear todos los artículos y no publicar la pillar page. La pillar es lo que ancla todo el cluster — sin ella, los artículos individuales rankean solos sin el boost de autoridad del sistema.',
        completed: false,
      },
    
    {
      id: 'seo-3-p1',
      title: 'Proyecto: Auditoría técnica básica',
      type: 'project',
      difficulty: 'básico',
      projectBrief: 'Usa Google Search Console y PageSpeed Insights para auditar un sitio web real o de práctica. Identifica los 5 problemas más críticos y propón soluciones.',
      deliverables: [
        'Captura de Core Web Vitals del sitio',
        'Lista de 5 problemas encontrados',
        'Propuesta de solución para cada problema',
      ],
      rubrica: [
        'Problemas correctamente identificados',
        'Soluciones técnicamente viables',
        'Priorización correcta por impacto',
      ],
      completed: false,
    },],
    resources: [
      {
        title: 'HubSpot — Topic Clusters Model',
        url: 'https://blog.hubspot.com/marketing/topic-clusters-seo',
        type: 'article',
      },
      {
        title: 'Ahrefs — On-Page SEO Guide',
        url: 'https://ahrefs.com/blog/on-page-seo',
        type: 'article',
      },
      {
        title: 'Surfer SEO — Content optimization (prueba gratuita)',
        url: 'https://surferseo.com',
        type: 'tool',
      },
    ],
  },

  {
    id: 'seo-4',
    number: 30,
    title: 'Link Building y Autoridad de Dominio',
    description: 'Construye autoridad con backlinks de calidad: estrategias éticas, outreach efectivo y cómo medir el impacto.',
    duration: '2 semanas',
    status: 'available',
    track: 'seo',
    lessons: [
      {
        id: 's4-l1',
        title: 'Por qué los backlinks siguen siendo el factor más poderoso',
        type: 'reading',
        content: `## Backlinks: el voto de confianza que Google más valúa

Un backlink es cuando otro sitio web enlaza al tuyo. Google los interpreta como votos de confianza: si sitios confiables enlazan a ti, probablemente tú también eres confiable.

### No todos los backlinks son iguales

**Factores que determinan el valor de un backlink**:

1. **Autoridad del dominio que enlaza** — un link de nytimes.com vale 1,000x más que uno de un blog sin tráfico
2. **Relevancia temática** — un link de una agencia de marketing vale más que uno de un blog de recetas
3. **Texto de anchor** — el texto clickeable del link (debe ser descriptivo, no "click aquí")
4. **Posición en la página** — links en el cuerpo del artículo valen más que los del footer
5. **Follow vs nofollow** — "nofollow" le dice a Google que no pase autoridad (menos valioso pero útil)

### Links que dañan (spam y penalizaciones)

Google puede **penalizar** sitios con links artificiales:
- Comprar backlinks en bulk
- Redes de links privadas (PBNs)
- Links de directorios spam
- Intercambios masivos de links

**Regla de oro**: si el link está ahí porque alguien eligió enlazarte porque tu contenido es bueno, es un buen link.

### Domain Rating / Domain Authority

Herramientas como Ahrefs (DR) y Moz (DA) calculan la autoridad de un dominio en escala 0-100:

- DR 0-20: sitio nuevo, baja autoridad
- DR 20-40: autoridad moderada, puede competir en nichos
- DR 40-60: buena autoridad, competitivo
- DR 60+: autoridad alta, compite por cualquier keyword

El DR de AlphaDev Studios hoy es probablemente bajo (sitio nuevo). **Eso es normal** — el SEO es un juego largo.

### Cómo ver los backlinks de cualquier sitio

\`\`\`
Ahrefs Site Explorer → pegar URL → Backlinks
\`\`\`

Esto te muestra:
- Quién enlaza a la competencia (oportunidades para ti)
- Qué contenido de la competencia genera más links (para hacer algo mejor)
- Tu propio perfil de links (para identificar problemas)`,
        completed: false,
      },
      {
        id: 's4-l1b',
        title: 'Mini-práctica: Analiza el perfil de links de la competencia',
        type: 'practice',
        tasks: [
          'Elige 2 competidores directos y analiza sus backlinks con Ahrefs (versión de prueba) o con la versión gratuita de Ubersuggest',
          'Identifica los 5 backlinks más valiosos de cada competidor: ¿quién enlaza? ¿por qué contenido?',
          'Busca los sitios que enlazan a múltiples competidores — esos son los que más interesa conseguir',
          'Identifica qué tipo de contenido de la competencia genera más backlinks (guías, herramientas, estudios)',
          'Lista 5 oportunidades concretas de link building que podrías replicar',
        ],
        tip: 'El link gap analysis (ver qué sitios enlazan a tu competencia pero no a ti) es la forma más eficiente de encontrar oportunidades. Si un sitio ya enlazó a un competidor con contenido similar al tuyo, tienes alta probabilidad de conseguir el mismo link.',
        completed: false,
      },
      {
        id: 's4-l2',
        title: 'Estrategias de link building éticas que funcionan',
        type: 'reading',
        content: `## Link Building: estrategias que funcionan en 2025

El link building no es spam. Es crear algo tan bueno que otros quieran compartirlo, y a veces también es pedir directamente ese link con una propuesta de valor clara.

### 1. Digital PR — el método más escalable

Crea contenido con datos originales, estudios o perspectivas únicas que periodistas y bloggers quieran citar.

**Tipos de contenido que generan links de forma natural**:
- Estudios con datos originales ("Analizamos 100 proyectos de startups: esto encontramos")
- Herramientas gratuitas (calculadoras, generadores, templates)
- Guías definitivas sobre un tema de nicho
- Infografías con datos complejos simplificados

**Para AlphaDev**: un estudio sobre "cuánto tarda y cuesta lanzar un MVP en LATAM" con datos reales podría generar links de medios de tecnología y startups.

### 2. Guest posting — escribir para otros sitios

Escribes un artículo de valor para otro blog/publicación, y a cambio incluyen 1-2 links hacia tu sitio.

\`\`\`
Proceso:
1. Lista 20 blogs/publicaciones que leen tus clientes ideales
2. Verifica que tienen buen DR (>30) y audiencia real
3. Propón un tema específico que aporte valor a su audiencia
4. Escribe el mejor artículo que hayas escrito
5. Negocia el link dentro del artículo (no solo en el bio)
\`\`\`

### 3. Link Reclamation — los más fáciles de conseguir

Busca menciones de tu marca/sitio en la web que no tengan link:

\`\`\`
Google: "AlphaDev Studios" -site:alphadev.studio
\`\`\`

Si alguien ya menciona tu marca sin enlazarte, un email cordial pidiéndolo convierte en el 40-60% de los casos.

### 4. Resource link building

Muchos sitios tienen páginas de "recursos recomendados". Si tienes una herramienta o guía útil, puedes pedir que te incluyan.

### 5. HARO / Connectively — ser la fuente de expertos

HARO (Help A Reporter Out) conecta periodistas con expertos. Cuando un periodista busca una fuente sobre desarrollo web o startups, tú respondes y puedes conseguir un link en medios de alta autoridad.

### Outreach: el email que sí recibe respuesta

\`\`\`
Asunto: Recurso para tu artículo sobre [tema específico]

Hola [nombre],

Vi tu artículo "[título]" sobre [tema]. Muy buen punto el de [algo específico].

Justo publicamos [tu contenido] que cubre [aspecto complementario] con datos de [fuente].

Creo que añadiría valor a tu artículo si lo incluyes como recurso adicional.

[tu nombre]
\`\`\`

Personalizado. Específico. Corto. Propuesta de valor clara.`,
        completed: false,
      },
      {
        id: 's4-l2b',
        title: 'Mini-práctica: Primera campaña de link building',
        type: 'practice',
        tasks: [
          'Crea una pieza de contenido linkeable: una guía profunda, un template, o una herramienta simple',
          'Lista 10 sitios relevantes con DR>30 donde ese contenido añadiría valor',
          'Escribe el email de outreach personalizado para 5 de esos sitios — personaliza cada uno',
          'Busca menciones sin link de tu marca con Google y envía emails de link reclamation',
          'Registra todo en una spreadsheet: sitio, DR, fecha de envío, respuesta, resultado',
        ],
        tip: 'El outreach funciona con volumen Y personalización. 100 emails personalizados > 1,000 emails de plantilla. La tasa de respuesta promedio es 5-10%, así que necesitas volumen para ver resultados. Pero nunca sacrifiques personalización por volumen.',
        completed: false,
      },
          {
        id: 'seo-4-proj-pro',
        title: 'Proyecto Profesional: Plan de contenidos SEO de 6 meses',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: 'Diseña la estrategia de contenidos SEO de 6 meses para un sitio web. Ejecutable por el equipo del cliente.',
        deliverables: [
          'Análisis de situación: posicionamiento actual, top 5 competidores orgánicos y oportunidades de gap content',
          'Keyword strategy: 5 pillar topics con clusters de 8-10 keywords cada uno',
          'Calendar: 24 artículos con título, keyword principal, intent, palabras estimadas y fecha',
          'Brief tipo: template para que el redactor produzca cada artículo (H2s, puntos a cubrir)',
          'Link building: 3 tácticas accionables para los primeros 6 meses',
          'Dashboard: métricas mensuales y hitos esperados al mes 3 y 6',
        ],
        rubrica: [
          'El keyword research está validado con herramientas reales',
          'Los artículos tienen search intent coherente con el funnel del cliente',
          'El plan de link building es realista para el presupuesto disponible',
          'Los hitos son específicos y medibles, no vagos',
        ],
        tip: 'Un plan de 6 meses ejecutado al 60% es mejor que uno de 12 meses abandonado a la mitad. Diseña para la capacidad real.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Ahrefs — Link Building Guide',
        url: 'https://ahrefs.com/blog/link-building',
        type: 'article',
      },
      {
        title: 'Connectively (ex-HARO)',
        url: 'https://www.connectively.us',
        type: 'tool',
      },
      {
        title: 'Hunter.io — Find email addresses',
        url: 'https://hunter.io',
        type: 'tool',
      },
    ],
  },

  {
    id: 'seo-5',
    number: 31,
    title: 'SEO para Agencias: Auditorías, Reportes y Resultados',
    description: 'Cómo hacer auditorías SEO para clientes, crear reportes que demuestran valor y escalar un servicio de SEO rentable.',
    duration: '2 semanas',
    status: 'available',
    track: 'seo',
    lessons: [
      {
        id: 's5-l1',
        title: 'Cómo hacer una auditoría SEO completa',
        type: 'reading',
        content: `## La auditoría SEO: diagnóstico antes del tratamiento

Una auditoría SEO identifica todos los problemas que están impidiendo que un sitio rankee. Es el primer entregable de cualquier proyecto SEO y establece el baseline para medir el progreso.

### Las 5 áreas de una auditoría completa

**1. Técnico**
- ¿Está indexado? (site:dominio.com en Google)
- Core Web Vitals (PageSpeed Insights)
- Errores de crawl (Google Search Console)
- Sitemap y robots.txt correctos
- HTTPS y redireccionamientos
- URLs duplicadas y canonicales

**2. On-Page**
- Titles y meta descriptions únicos en todas las páginas
- Estructura de headings (H1 único, jerarquía correcta)
- Keyword targeting por página
- Internal linking y huérfanas
- Calidad y originalidad del contenido

**3. Contenido**
- ¿El contenido responde el search intent?
- ¿Hay thin content (páginas con <300 palabras)?
- ¿Hay contenido duplicado (interno o externo)?
- ¿Está el contenido actualizado?

**4. Autoridad / Off-page**
- Domain Rating actual (Ahrefs)
- Perfil de backlinks: cantidad, calidad, diversidad
- Links spam o tóxicos (pueden penalizar)
- Menciones sin link

**5. Competencia**
- ¿Quiénes rankean para tus keywords objetivo?
- Gap de autoridad (tu DR vs su DR)
- Gap de contenido (qué tienen ellos que tú no)

### Herramientas para la auditoría

\`\`\`
Crawl técnico:       Screaming Frog (free <500 URLs) o Sitebulb
On-page:             Ahrefs Site Audit o Semrush Site Audit
Backlinks:           Ahrefs o Majestic
Performance:         PageSpeed Insights + GSC
\`\`\`

### El reporte de auditoría para clientes

Estructura recomendada:
1. **Executive Summary** — 1 página, findings críticos, oportunidades top
2. **Puntuación actual** — score técnico, contenido, autoridad
3. **Issues críticos** — los que más impactan, con evidencia y solución
4. **Issues moderados** — segunda prioridad
5. **Quick wins** — cambios de bajo esfuerzo y alto impacto
6. **Roadmap propuesto** — prioridades por mes/trimestre
7. **Proyección de resultados** — expectativas realistas`,
        completed: false,
      },
      {
        id: 's5-l1b',
        title: 'Mini-práctica: Auditoría SEO completa de un sitio real',
        type: 'practice',
        tasks: [
          'Elige un sitio (tuyo o de un cliente/conocido) y completa el checklist de las 5 áreas',
          'Documenta cada hallazgo con: problema encontrado, impacto estimado (alto/medio/bajo), solución recomendada',
          'Prioriza los issues en: críticos (arreglar esta semana), importantes (este mes), mejoras (este trimestre)',
          'Crea el reporte en Notion o Google Slides usando la estructura de 7 secciones',
          'Presenta el reporte a alguien (colega, mentor, o grábate) — practica explicar los issues en términos de negocio, no técnicos',
        ],
        tip: 'El error más común en reportes de auditoría para clientes: hablar en términos técnicos (301 redirects, canonical tags, crawl budget) sin traducirlos a impacto de negocio. Cada issue debe tener: "esto está pasando → por eso pierdes X → si lo arreglas, conseguirás Y".',
        completed: false,
      },
      {
        id: 's5-l2',
        title: 'Reportes mensuales SEO y cómo demostrar ROI',
        type: 'reading',
        content: `## Reportes SEO: demostrar valor mes a mes

El SEO tarda meses en dar resultados. Durante ese tiempo, el cliente puede dudar. Un buen reporte mensual mantiene la confianza y demuestra el progreso aunque el tráfico aún no sea el objetivo final.

### Qué medir en un reporte mensual SEO

**Tráfico orgánico** (Google Search Console o GA4):
- Sesiones orgánicas vs mes anterior y vs mismo mes año anterior
- Páginas con más crecimiento de tráfico
- Nuevas keywords donde aparece el sitio

**Rankings** (Ahrefs o Semrush Rank Tracker):
- Posición de las keywords objetivo
- Cambios semana a semana
- Nuevas keywords en top 10, top 3

**Autoridad** (Ahrefs):
- Domain Rating: cambio mensual
- Nuevos backlinks adquiridos
- Backlinks perdidos (para investigar)

**Conversiones orgánicas** (GA4):
- Leads/ventas provenientes de búsqueda orgánica
- Páginas de SEO con mejor conversión

### Estructura del reporte mensual

\`\`\`
1. KPIs del mes (tráfico, rankings, DR)
2. Comparativa vs mes anterior
3. Acciones realizadas este mes (qué hicimos)
4. Resultados de esas acciones
5. Plan del próximo mes
6. Proyección acumulada
\`\`\`

### Cómo calcular ROI del SEO

\`\`\`
Tráfico orgánico mensual: 1,000 visitas
Tasa de conversión a lead: 2% = 20 leads/mes
Tasa de cierre: 10% = 2 clientes/mes
Ticket promedio: $3,000
Revenue atribuible al SEO: $6,000/mes

Costo del servicio SEO: $800/mes
ROI: ($6,000 - $800) / $800 = 650%
\`\`\`

### Pricing de servicios SEO

**SEO básico** ($300-800/mes):
- Optimización on-page
- 2-4 artículos de blog
- Reporte mensual

**SEO intermedio** ($800-2,000/mes):
- Todo lo anterior
- Link building (5-10 links/mes)
- Auditoría y correcciones técnicas continuas

**SEO avanzado** ($2,000-5,000+/mes):
- Estrategia completa de contenido
- Outreach agresivo de links
- Reporting avanzado con atribución`,
        completed: false,
      },
      {
        id: 's5-l2b',
        title: 'Mini-práctica: Crea tu template de reporte mensual SEO',
        type: 'practice',
        tasks: [
          'Crea un template de reporte mensual en Notion o Google Slides con las 6 secciones definidas',
          'Conecta Google Search Console a Looker Studio y crea un dashboard básico de tráfico orgánico',
          'Configura el Rank Tracker de Ahrefs (o alternativa) con 10 keywords objetivo',
          'Escribe el reporte de un mes ficticio o real — practica traducir cada métrica a impacto de negocio',
          'Define tu pricing para un servicio SEO básico, intermedio y avanzado con justificación de cada nivel',
        ],
        tip: 'En los primeros 3 meses de un proyecto SEO, los resultados de tráfico serán mínimos. Reporta progreso de procesos: páginas optimizadas, artículos publicados, links conseguidos. Estos son los leading indicators que predicen el tráfico futuro — y mantienen al cliente informado y en calma.',
        completed: false,
      },

      {
        id: 'seo-exam',
        title: 'Examen final: SEO y Posicionamiento Orgánico',
        type: 'exam',
        questions: [
          {
            q: '¿Qué es el "search intent" y por qué es más importante que el volumen de búsqueda?',
            options: [
              'Es la velocidad con la que un usuario completa una búsqueda — más rápido = mejor SEO',
              'Es la intención detrás de la búsqueda (informar, navegar, comparar, comprar) — si tu contenido no coincide con esa intención, no rankeará aunque tenga backlinks',
              'Es el número de veces que un usuario busca un término en un mes',
              'Es el idioma en que se realiza la búsqueda',
            ],
            correct: 1,
            explanation: 'Google prioriza la satisfacción del usuario sobre todo. Si alguien busca "cómo hacer SEO" (informacional) y tu página es una landing de servicios (transaccional), no rankearás — el intent no coincide. Google detecta si los usuarios rebotan rápido (señal de que tu contenido no responde la intención) y baja tu posición.',
          },
          {
            q: '¿Cuál de estos factores es el MÁS determinante para rankear en Google en 2026?',
            options: [
              'Publicar contenido nuevo todos los días',
              'Tener exactamente la keyword en el title, H1, primer párrafo y URL',
              'La combinación de autoridad de dominio (backlinks de calidad) + contenido que mejor responde el intent',
              'Usar las keywords exactas con la densidad correcta (2-3% del texto)',
            ],
            correct: 2,
            explanation: 'Ningún factor solo gana. Google usa ~200 señales, pero las más determinantes son: (1) autoridad/confianza del dominio, construida principalmente con backlinks de calidad, y (2) relevancia del contenido para satisfacer el intent específico. La keyword density es un mito del SEO de 2010 — el SEO moderno se enfoca en profundidad temática y satisfacción del usuario.',
          },
          {
            q: '¿Qué son los Core Web Vitals y cuál es la métrica que mide la estabilidad visual?',
            options: [
              'Son métricas de contenido; CLS (Cumulative Layout Shift) mide la estabilidad',
              'Son métricas de experiencia de usuario; CLS (Cumulative Layout Shift) mide cuánto se mueven los elementos durante la carga',
              'Son métricas de backlinks; el LCP mide la estabilidad del perfil de links',
              'Son las métricas principales de Google Search Console',
            ],
            correct: 1,
            explanation: 'Core Web Vitals son 3 métricas de UX que Google usa como factor de ranking: LCP (velocidad de carga percibida), INP (responsividad a interacciones), CLS (estabilidad visual — cuánto se mueven los elementos mientras carga). CLS > 0.1 es "necesita mejora". La solución más común: definir width y height explícitos en imágenes y videos.',
          },
          {
            q: 'Tienes un sitio con DR 15 (bajo). ¿Cuál es la estrategia de keywords más inteligente?',
            options: [
              'Atacar keywords de alto volumen (50k+/mes) para capturar el máximo tráfico posible',
              'Atacar long-tail keywords de baja dificultad (KD 0-20) para ganar autoridad, luego escalar a keywords más competitivas',
              'Crear contenido sin optimizar para keywords y dejar que Google lo clasifique solo',
              'Comprar backlinks para subir el DR rápidamente y poder atacar keywords difíciles',
            ],
            correct: 1,
            explanation: 'Con DR bajo, un sitio nuevo no puede competir contra dominios de DR 50+ en keywords de alta competencia. La estrategia correcta: long-tail de KD bajo, ganar posiciones, acumular backlinks orgánicos y autoridad, luego escalar. Saltarse este proceso solo lleva a publicar contenido que nunca rankea.',
          },
          {
            q: '¿Qué es un "topic cluster" y qué ventaja tiene sobre crear artículos individuales sin relación?',
            options: [
              'Un topic cluster es un conjunto de keywords similares — no tiene ventaja particular',
              'Una pillar page + artículos de cluster interconectados que demuestran autoridad temática profunda a Google, distribuyendo la autoridad entre sí y compitiendo mejor para todo el tema',
              'Un cluster es simplemente usar más categorías en tu blog para organización interna',
              'Un topic cluster es lo mismo que un sitemap — organiza las URLs para Google',
            ],
            correct: 1,
            explanation: 'Los clusters funcionan porque Google evalúa la profundidad temática de un sitio. Un sitio que cubre exhaustivamente un tema (10 artículos interconectados sobre SEO técnico) tiene más autoridad temática que 10 sitios con 1 artículo cada uno. El interlinking distribuye Page Rank internamente y refuerza la relevancia de todo el cluster.',
          },
          {
            q: '¿Cuál es el problema con comprar backlinks masivamente?',
            options: [
              'Es caro pero efectivo si se hace bien',
              'Google puede detectar patrones no naturales (muchos links de baja calidad repentinamente) y aplicar penalizaciones manuales o algorítmicas que derrumban el ranking',
              'Los backlinks comprados no transfieren autoridad, así que simplemente no ayudan',
              'Solo es problema en algunos nichos competitivos',
            ],
            correct: 1,
            explanation: 'Google tiene algoritmos específicos (Penguin) para detectar link schemes. Un perfil con muchos links de directorios spam, textos de anchor exactos repetidos o redes privadas (PBNs) puede recibir penalización manual (un humano de Google la aplica) o algorítmica. Recuperarse de una penalización puede tomar meses o ser permanente.',
          },
          {
            q: '¿Qué información te da Google Search Console que NO te da Google Analytics?',
            options: [
              'El tráfico de redes sociales y email',
              'Las keywords exactas por las que aparece tu sitio en Google, el CTR de cada una, y las impresiones totales',
              'El comportamiento de los usuarios dentro del sitio (tiempo en página, scroll)',
              'Las conversiones y el revenue generado',
            ],
            correct: 1,
            explanation: 'GSC es la fuente de datos de búsqueda orgánica: qué keywords te generan impressions, cuáles te dan clicks, cuál es tu CTR y posición promedio para cada query. GA4 no tiene esta data (Google ocultó las keywords en 2013). Para SEO, GSC es indispensable — sin él estás literalmente ciego sobre qué está funcionando.',
          },
          {
            q: 'Un artículo tiene 500 impresiones, 10 clicks y está en posición 6 promedio. ¿Cuál es el quick win de SEO más efectivo?',
            options: [
              'Conseguir 50 nuevos backlinks para subir la posición',
              'Reescribir todo el artículo desde cero con más palabras',
              'Optimizar el title tag y meta description para mejorar el CTR — un pequeño aumento en CTR puede generar muchos más clicks sin cambiar la posición',
              'Agregar el artículo al sitemap y esperar que Google lo reindexe',
            ],
            correct: 2,
            explanation: 'CTR = 10/500 = 2%. El promedio de CTR en posición 6 debería ser ~4-6%. Con 500 impresiones, subir el CTR de 2% a 5% triplica los clicks (de 10 a 25) sin hacer nada diferente al ranking. Optimizar title y description para que sean más persuasivos y relevantes es el quick win más eficiente en SEO — bajo esfuerzo, impacto inmediato.',
          },
        ],
        completed: false,
      },
    
    {
      id: 'seo-5-p1',
      title: 'Proyecto: Estrategia SEO de 6 meses',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: 'Desarrolla una estrategia SEO completa de 6 meses para un sitio web real. Incluye keyword research exhaustivo, plan de contenidos, estrategia de link building y proyección de tráfico con supuestos documentados.',
      deliverables: [
        'Keyword research con mínimo 50 keywords priorizadas',
        'Mapa de contenidos por mes (6 meses)',
        'Plan de link building con 10 oportunidades identificadas',
        'Proyección de tráfico con modelo de supuestos',
        'KPIs y metodología de reporting mensual',
      ],
      rubrica: [
        'Keyword research con datos reales (Search Volume, KD)',
        'Contenidos orientados a intent de búsqueda',
        'Link building viable y no manipulador',
        'Proyección con supuestos realistas y documentados',
      ],
      completed: false,
    },],
    resources: [
      {
        title: 'Google Search Console — Documentación',
        url: 'https://support.google.com/webmasters',
        type: 'documentation',
      },
      {
        title: 'Looker Studio (Google Data Studio)',
        url: 'https://lookerstudio.google.com',
        type: 'tool',
      },
      {
        title: 'Ahrefs — SEO for Agencies',
        url: 'https://ahrefs.com/blog/seo-agency',
        type: 'article',
      },
    ],
  },

  // ─── Track: Analytics y Datos ────────────────────────────────────────────────

  {
    id: 'data-1',
    number: 32,
    title: 'GA4 y Setup de Analytics',
    description: 'Configura Google Analytics 4 correctamente, entiende el modelo de datos por eventos y mide lo que realmente importa para tu negocio.',
    duration: '2 semanas',
    status: 'available',
    track: 'data',
    lessons: [
      {
        id: 'd1-l1',
        title: 'GA4: el modelo de datos que cambió todo',
        type: 'reading',
        content: `## Google Analytics 4: pensar en eventos, no en sesiones

GA4 (lanzado en 2023 como reemplazo de Universal Analytics) cambió fundamentalmente cómo se mide el comportamiento web. Entender su modelo de datos es la base de todo lo demás.

### El modelo de datos de GA4: todo son eventos

En Universal Analytics (el antiguo), cada interacción tenía un tipo fijo: pageview, event, transaction.

En GA4, **todo es un evento**. Cada interacción es un evento con parámetros:

\`\`\`
Evento: page_view
Parámetros:
  page_title: "Home — AlphaDev Studios"
  page_location: "https://alphadev.studio"
  page_referrer: "https://google.com"

Evento: scroll
Parámetros:
  percent_scrolled: 90

Evento: click
Parámetros:
  link_url: "https://alphadev.studio/contacto"
  link_text: "Agenda una llamada"
\`\`\`

### Eventos automáticos vs personalizados

**Automáticos** (sin configuración):
- page_view, scroll, click (links externos), file_download, session_start, user_engagement

**Enhanced measurement** (activar en configuración):
- Scroll depth, outbound clicks, site search, video engagement, form interactions

**Eventos personalizados** (los más valiosos):
- Cualquier interacción específica de tu negocio
- "form_submit", "demo_requested", "pricing_viewed"

### Estructura de GA4

\`\`\`
Cuenta de Google Analytics
└── Propiedad de GA4 (por sitio/app)
    ├── Flujos de datos (web, iOS, Android)
    ├── Eventos
    ├── Conversiones (eventos marcados como importantes)
    └── Informes
\`\`\`

### Setup en Next.js

\`\`\`typescript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
\`\`\`

\`\`\`typescript
// Para eventos personalizados
import { sendGAEvent } from '@next/third-parties/google';

const handleFormSubmit = () => {
  sendGAEvent('event', 'form_submit', {
    form_name: 'contact_startup',
    value: 1,
  });
};
\`\`\`

### La diferencia entre métricas y dimensiones

**Métrica**: valor numérico medible (sesiones, usuarios, conversiones, duración)
**Dimensión**: atributo que describe los datos (país, dispositivo, fuente, página)

En GA4 siempre combinas dimensión + métrica:
- "Sesiones" (métrica) + "País" (dimensión) = sesiones por país
- "Conversiones" (métrica) + "Fuente" (dimensión) = conversiones por canal`,
        completed: false,
      },
      {
        id: 'd1-l1b',
        title: 'Mini-práctica: Configura GA4 en tu proyecto',
        type: 'practice',
        tasks: [
          'Crea una propiedad GA4 en analytics.google.com para tu sitio (o uno de prueba)',
          'Instala el snippet en Next.js con @next/third-parties/google y verifica que recibe datos en tiempo real',
          'Activa todos los eventos de Enhanced Measurement (scroll, outbound clicks, file downloads)',
          'Configura al menos 2 conversiones: una para el submit del formulario de contacto y otra para un click en el CTA principal',
          'Verifica en el informe "Tiempo real" de GA4 que los eventos llegan correctamente al navegar el sitio',
        ],
        tip: 'El error más costoso de analytics: instalar GA4 y no marcar ninguna conversión. Sin conversiones configuradas, GA4 te muestra tráfico pero no te dice si ese tráfico sirve de algo. Configurar las conversiones es el paso que convierte GA4 de "herramienta de vanidad" a "herramienta de negocio".',
        completed: false,
      },
      {
        id: 'd1-l2',
        title: 'Google Tag Manager: el sistema nervioso de tus mediciones',
        type: 'reading',
        content: `## Google Tag Manager: control total sin tocar el código

GTM (Google Tag Manager) es un sistema que te permite instalar y gestionar scripts de tracking (GA4, Meta Pixel, hotjar, etc.) sin modificar el código del sitio cada vez.

### Por qué usar GTM

**Sin GTM**:
- Cada herramienta de analytics → un snippet hardcodeado en el HTML
- Agregar un nuevo evento → modificar el código → deploy → esperar al developer
- Si un script falla → todo el sitio se puede afectar

**Con GTM**:
- Un solo snippet en el HTML → GTM gestiona todos los demás
- Agregar eventos → configurar en la UI de GTM → publicar → inmediato
- Testing de tags sin deployar

### Conceptos base de GTM

**Tag**: el script que se ejecuta (GA4 Event, Meta Pixel, etc.)
**Trigger**: cuándo se ejecuta el tag (page view, click en botón, scroll)
**Variable**: dato que se captura (texto del botón, URL, valor)

### Configurar GA4 con GTM

\`\`\`
1. Crear cuenta en tagmanager.google.com
2. Instalar el snippet de GTM en Next.js (en el <head> y <body>)
3. Crear Tag: "Google Analytics: GA4 Configuration" con tu Measurement ID
4. Trigger: "All Pages"
5. Preview → verificar → Publish
\`\`\`

### Rastrear eventos con GTM sin código

**Click en CTA (sin tocar el código)**:
\`\`\`
Tag: GA4 Event
  Event name: cta_click
  Parameters:
    button_text: {{Click Text}}
    page_url: {{Page URL}}

Trigger: Click - All Elements
  Condition: Click Text contains "Agenda" OR "Contacto"
\`\`\`

### GTM en Next.js (App Router)

\`\`\`typescript
// components/GoogleTagManager.tsx
'use client';

import { useEffect } from 'react';

export const GTM_ID = 'GTM-XXXXXXX';

export default function GoogleTagManager() {
  useEffect(() => {
    // Push route changes to dataLayer
    window.dataLayer = window.dataLayer || [];
  }, []);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: \`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','\${GTM_ID}');
          \`,
        }}
      />
    </>
  );
}
\`\`\``,
        completed: false,
      },
      {
        id: 'd1-l2b',
        title: 'Mini-práctica: Configura GTM con GA4 y 3 eventos personalizados',
        type: 'practice',
        tasks: [
          'Crea una cuenta en GTM y migra el snippet de GA4 para que pase por GTM (no directo)',
          'Configura el Tag de GA4 Configuration con tu Measurement ID y un trigger de All Pages',
          'Crea un Tag para el evento "form_submit" con Trigger en el submit del formulario de contacto',
          'Crea un Tag para "cta_click" que capture clics en los botones principales',
          'Usa GTM Preview para verificar que los 3 tags se disparan correctamente antes de publicar',
        ],
        tip: 'Siempre usa GTM Preview antes de publicar. Una vez publicado, los tags se ejecutan para todos los usuarios reales. Un error en un tag puede contaminar datos históricos que no se pueden recuperar.',
        completed: false,
      },
          {
        id: 'data-1-proj-basico',
        title: 'Proyecto Básico: Dashboard en Looker Studio',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Crea un dashboard básico en Looker Studio conectado a una fuente de datos real.',
        deliverables: [
          'Dashboard en Looker Studio con mínimo 6 visualizaciones (mezcla de tablas, gráficas y scorecards)',
          'Conectado a una fuente de datos real (Google Analytics, Google Sheets o GA4)',
          'Filtro de fechas funcional',
          'Link compartible del dashboard con permisos de "view"',
          'Guía de 1 página: cómo leer el dashboard y qué decisión permite tomar cada visualización',
        ],
        tip: 'Cada visualización debe responder una pregunta específica de negocio. Si no sabes qué decisión permite tomar, no debería estar en el dashboard.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Google Analytics 4 — Documentación oficial',
        url: 'https://support.google.com/analytics/answer/10089681',
        type: 'documentation',
      },
      {
        title: 'Google Tag Manager — Guía de inicio',
        url: 'https://support.google.com/tagmanager/answer/6103696',
        type: 'documentation',
      },
      {
        title: 'MeasureSchool — GA4 Tutorial completo (YouTube)',
        url: 'https://www.youtube.com/@MeasureSchool',
        type: 'video',
      },
    ],
  },

  {
    id: 'data-2',
    number: 33,
    title: 'Embudos, Conversión y Comportamiento de Usuario',
    description: 'Entiende cómo se mueven los usuarios por tu sitio, dónde se pierden y qué mejoras tienen mayor impacto en la conversión.',
    duration: '3 semanas',
    status: 'available',
    track: 'data',
    lessons: [
      {
        id: 'd2-l1',
        title: 'Embudos de conversión: dónde se pierde el dinero',
        type: 'reading',
        content: `## Embudos: el mapa del journey del usuario

Un embudo de conversión es la secuencia de pasos que sigue un usuario desde que llega a tu sitio hasta que completa la acción objetivo (lead, compra, registro).

### Por qué los embudos son críticos

La mayoría de los sitios tiene una tasa de conversión del 1-3%. Eso significa que el 97-99% de los visitantes se van sin hacer nada.

Los embudos te muestran **exactamente dónde** se van y por qué — para que puedas arreglarlo.

### Tipos de embudos

**Embudo de adquisición** (cómo llegan):
\`\`\`
Búsqueda orgánica → Página de blog → Solicitud de info
Anuncio de Meta → Landing page → Form de contacto
\`\`\`

**Embudo de conversión** (cómo convierten):
\`\`\`
Home → Servicios → Contacto → Form enviado
\`\`\`

**Embudo de activación** (para SaaS/apps):
\`\`\`
Registro → Completar perfil → Primera acción de valor → Upgrade
\`\`\`

### Crear embudos en GA4

\`\`\`
GA4 → Explorar → Exploración de embudo

Pasos del embudo:
1. Evento: page_view, Page path = /
2. Evento: page_view, Page path = /servicios
3. Evento: page_view, Page path = /contacto
4. Evento: form_submit
\`\`\`

GA4 mostrará cuántos usuarios pasan de cada paso al siguiente, y cuántos abandonan en cada etapa.

### Métricas clave de conversión

**Tasa de conversión**: % de visitantes que completan el objetivo
\`\`\`
Conversiones / Sesiones × 100
Ejemplo: 20 leads / 1,000 sesiones = 2%
\`\`\`

**Tasa de abandono por paso**: % que sale en cada etapa del embudo

**Valor por visita**: revenue promedio que genera cada visitante
\`\`\`
Revenue / Sesiones
Ejemplo: $10,000 / 5,000 sesiones = $2/visita
\`\`\`

### Herramientas complementarias para entender comportamiento

**Hotjar / Microsoft Clarity** (gratuito):
- **Heatmaps**: dónde hacen click los usuarios
- **Scroll maps**: hasta dónde leen
- **Session recordings**: grabaciones de sesiones reales

**Microsoft Clarity es completamente gratuito** y tiene las mismas funcionalidades que Hotjar básico.

### Cómo interpretar un heatmap

- **Zona caliente** (rojo/naranja): mucho engagement
- **Zona fría** (azul/gris): poco engagement
- **Clicks en elementos no clickeables**: frustración del usuario (bug UX)
- **Scroll profundo**: el contenido es interesante
- **Poco scroll**: el contenido no engancha o el CTA debe estar más arriba`,
        completed: false,
      },
      {
        id: 'd2-l1b',
        title: 'Mini-práctica: Configura un embudo y analiza el comportamiento',
        type: 'practice',
        tasks: [
          'Crea un embudo de conversión en GA4 Explorar para el flujo principal de tu sitio (home → servicios → contacto → form enviado)',
          'Instala Microsoft Clarity en tu sitio (gratuito) y deja recolectar datos por al menos 48 horas',
          'Analiza las grabaciones de sesión en Clarity: ¿los usuarios encuentran lo que buscan? ¿Hay confusión visible?',
          'Revisa el heatmap de tu página principal: ¿los clicks son donde quieres que estén?',
          'Identifica el punto de mayor abandono en tu embudo y propón 3 hipótesis de por qué los usuarios se van ahí',
        ],
        tip: 'Las grabaciones de sesión son la herramienta de diagnóstico más poderosa que existe. Ver a un usuario real navegar tu sitio durante 2 minutos te da más insights que 100 horas de análisis de datos. Empieza siempre por las grabaciones antes de sacar conclusiones de las métricas.',
        completed: false,
      },
      {
        id: 'd2-l2',
        title: 'Segmentación de audiencias y análisis de cohortes',
        type: 'reading',
        content: `## Segmentación: el análisis granular que cambia decisiones

Los promedios mienten. "2% de conversión" puede esconder que el tráfico orgánico convierte al 5% y el de redes sociales al 0.3%. La segmentación revela esas diferencias.

### Segmentos básicos en GA4

**Por canal de adquisición**:
- Organic Search, Direct, Referral, Paid Social, Organic Social, Email

**Por dispositivo**:
- Mobile, Desktop, Tablet

**Por geografía**:
- País, ciudad, región

**Por comportamiento**:
- Usuarios que visitaron X página
- Usuarios que completaron Y conversión
- Usuarios de su primera visita vs usuarios recurrentes

### Cómo crear segmentos en GA4

\`\`\`
GA4 → Explorar → Nueva exploración
→ + Segmento → Segmento de usuario/sesión/evento
→ Definir condiciones
\`\`\`

Ejemplo de segmento valioso:
*Usuarios que visitaron /servicios pero no enviaron el formulario*
→ Son prospectos que no convirtieron → oportunidad de retargeting

### Análisis de cohortes

Una cohorte es un grupo de usuarios que realizaron la misma acción en el mismo período.

El análisis de cohortes responde: **¿los usuarios que llegaron en enero siguen activos en febrero?**

Para agencias y SaaS:
- Cohorte de clientes por mes de adquisición
- ¿Cuántos siguen siendo clientes 3, 6, 12 meses después?
- ¿En qué mes se pierden más clientes?

### Atribución: a qué canal darle el crédito

El modelo de atribución define qué canal recibe el crédito de una conversión:

**Last click** (default): todo el crédito al último canal antes de la conversión
**First click**: todo el crédito al primer canal (el que generó la visita inicial)
**Data-driven** (GA4 default): Machine Learning distribuye el crédito según comportamiento real

Para la mayoría de pequeñas empresas, last-click es suficiente. Para estrategias multicanal, data-driven da más precisión.

### Audiences para remarketing

GA4 puede crear audiencias para exportar a Google Ads:

\`\`\`
GA4 → Admin → Audiences → New audience

Ejemplo:
"Visitaron /servicios en los últimos 30 días
 Y NO completaron form_submit"

→ Esta audiencia se exporta a Google Ads para mostrarles retargeting
\`\`\``,
        completed: false,
      },
      {
        id: 'd2-l2b',
        title: 'Mini-práctica: Segmenta y encuentra el canal que más convierte',
        type: 'practice',
        tasks: [
          'En GA4 Explorar, crea un análisis comparando la tasa de conversión por canal (organic, direct, referral, social)',
          'Crea un segmento de "usuarios que visitaron /servicios o /portafolio pero no convirtieron"',
          'Analiza el comportamiento por dispositivo: ¿hay diferencia significativa entre mobile y desktop?',
          'Exporta el segmento de no-convertidos como Audience en GA4 (aunque no tengas Google Ads, practica la configuración)',
          'Escribe un párrafo de conclusiones: ¿qué canal priorizarías con ese presupuesto? ¿Por qué?',
        ],
        tip: 'El análisis de segmentos más valioso para una agencia no es el de tráfico — es el de conversiones. Si puedes responder "¿cuál es mi canal con mayor costo por lead?" y "¿cuál es mi canal con mejor tasa de conversión a cliente?", puedes tomar decisiones de presupuesto que multiplican el ROI.',
        completed: false,
      },
          {
        id: 'data-2-proj-inter',
        title: 'Proyecto Intermedio: Análisis de Google Analytics de un sitio real',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Analiza los datos de GA4 de un sitio web real durante los últimos 3 meses. Entrega un reporte con insights accionables.',
        deliverables: [
          'Análisis de tráfico: fuentes, medios, canales y evolución en el período',
          'Análisis de comportamiento: páginas más visitadas, tasa de rebote, tiempo en página y flujo de usuarios',
          'Análisis de conversiones: embudo de conversión con los drop-offs identificados',
          '5 insights específicos con evidencia de los datos',
          '5 recomendaciones priorizadas por impacto potencial',
        ],
        tip: 'Un insight sin recomendación es una observación. Una recomendación sin datos es una opinión. Necesitas ambas cosas juntas.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Microsoft Clarity — Heatmaps y grabaciones gratuitas',
        url: 'https://clarity.microsoft.com',
        type: 'tool',
      },
      {
        title: 'GA4 — Exploración de embudo',
        url: 'https://support.google.com/analytics/answer/9327974',
        type: 'documentation',
      },
      {
        title: 'Analytics Mania — GA4 Tutorial avanzado',
        url: 'https://www.analyticsmania.com/google-analytics-4',
        type: 'course',
      },
    ],
  },

  {
    id: 'data-3',
    number: 34,
    title: 'Dashboards con Looker Studio',
    description: 'Construye dashboards profesionales en Looker Studio que conectan GA4, Search Console y más — para uso interno y para clientes.',
    duration: '2 semanas',
    status: 'available',
    track: 'data',
    lessons: [
      {
        id: 'd3-l1',
        title: 'Looker Studio: de datos crudos a visualizaciones accionables',
        type: 'reading',
        content: `## Looker Studio: el BI tool gratuito de Google

Looker Studio (anteriormente Google Data Studio) es una herramienta de Business Intelligence gratuita que conecta múltiples fuentes de datos y crea dashboards visuales e interactivos.

### Por qué Looker Studio para agencias

- **Gratuito** — cero costo para el nivel de uso de una agencia
- **Conectores nativos** con GA4, Google Ads, Google Sheets, Search Console, YouTube
- **Compartible** — el cliente puede ver el dashboard en tiempo real sin acceso a GA4
- **Automatizado** — se actualiza solo, sin exportar Excel cada mes

### Estructura de Looker Studio

\`\`\`
Informe (Report)
├── Páginas (como diapositivas)
│   ├── Gráficas, tablas, tarjetas de métricas
│   └── Filtros y controles de fecha
└── Fuentes de datos conectadas
    ├── GA4
    ├── Search Console
    └── Google Sheets
\`\`\`

### Conectar GA4 a Looker Studio

\`\`\`
1. lookerstudio.google.com → Crear → Informe
2. Agregar datos → Google Analytics → seleccionar propiedad GA4
3. El informe ahora tiene acceso a todas las métricas y dimensiones de GA4
\`\`\`

### Componentes principales

**Tarjeta de puntuación** (Scorecard):
- Muestra un único número con comparativa
- Ideal para: sesiones, usuarios, conversiones, tasa de conversión

**Gráfica de series temporales**:
- Tendencia en el tiempo
- Ideal para: sesiones por día/semana, evolución de conversiones

**Tabla**:
- Datos detallados con dimensión + métricas
- Ideal para: top páginas, top keywords, top países

**Gráfica de barras / dona**:
- Distribución entre categorías
- Ideal para: tráfico por canal, conversiones por dispositivo

### Controles interactivos

Los filtros hacen que el dashboard sea dinámico:

\`\`\`
Control de período: permite al cliente cambiar el rango de fechas
Control de lista: filtrar por país, dispositivo, canal
\`\`\`

Con estos controles, el cliente puede explorar los datos sin saber GA4.

### El truco del período de comparación

Agrega siempre un Scorecard con la comparativa vs período anterior:

\`\`\`
Sesiones: 5,230 ▲ +23% vs mes anterior
Conversiones: 47 ▲ +8% vs mes anterior
\`\`\`

Esto responde la pregunta que siempre hace el cliente: "¿estamos mejorando?"`,
        completed: false,
      },
      {
        id: 'd3-l1b',
        title: 'Mini-práctica: Construye tu primer dashboard de marketing',
        type: 'practice',
        tasks: [
          'Crea un informe en Looker Studio conectado a tu propiedad GA4',
          'Página 1 (Overview): tarjetas de sesiones, usuarios, conversiones y tasa de conversión con comparativa vs mes anterior',
          'Página 2 (Tráfico): gráfica de sesiones por día + tabla de fuentes de tráfico con métricas',
          'Página 3 (Contenido): tabla de páginas más visitadas + bounce rate + tiempo en página',
          'Agrega un control de período en todas las páginas y comparte el link con permisos de "Viewer"',
        ],
        tip: 'El mejor dashboard para un cliente no es el más completo — es el que responde sus 3 preguntas más importantes. Antes de diseñarlo, pregúntale: "¿qué 3 números necesitas ver cada semana para saber si el proyecto va bien?" Y pon esos 3 números en la primera página, grandes y claros.',
        completed: false,
      },
      {
        id: 'd3-l2',
        title: 'Dashboard de SEO: conectar Search Console y GA4',
        type: 'reading',
        content: `## Dashboard SEO en Looker Studio

Un dashboard de SEO profesional combina datos de Google Search Console (rankings, impressions, CTR) con GA4 (tráfico, conversiones) para tener la imagen completa.

### Conectar Search Console

\`\`\`
Looker Studio → Agregar datos → Google Search Console
→ Seleccionar propiedad → Tabla: Site Impression
\`\`\`

GSC en Looker Studio da acceso a:
- **Clicks**: cuántos clics desde búsqueda
- **Impressions**: cuántas veces apareció en resultados
- **CTR**: click-through rate (clicks/impressions)
- **Position**: posición promedio en Google

### Dimensiones clave de GSC

- **Query**: las keywords por las que aparece
- **Page**: qué páginas del sitio reciben el tráfico
- **Country**: desde qué países llegan las búsquedas
- **Device**: mobile vs desktop vs tablet

### Dashboard SEO completo en 4 páginas

**Página 1 — Overview SEO**:
\`\`\`
Scorecards: Total Clicks | Total Impressions | CTR promedio | Posición promedio
Gráfica: Clicks por semana (últimos 3 meses)
\`\`\`

**Página 2 — Keywords**:
\`\`\`
Tabla: Query | Clicks | Impressions | CTR | Position
Ordenado por Clicks descendente
Filtro: posición 1-10 (las que rankean)
\`\`\`

**Página 3 — Páginas**:
\`\`\`
Tabla: Página | Clicks | Impressions | CTR | Position
¿Cuáles páginas traen más tráfico orgánico?
\`\`\`

**Página 4 — Oportunidades**:
\`\`\`
Keywords con muchas impressions pero CTR bajo
→ Oportunidad de mejorar title/description para subir CTR sin cambiar el ranking
\`\`\`

### Fórmulas personalizadas en Looker Studio

\`\`\`
// Clicks potenciales (si mejoras el CTR al promedio de tu industria)
ROUND(Impressions × 0.05) - Clicks

// Ratio de visibilidad
Impressions / SUM(Impressions)
\`\`\`

### Automatizar el reporte mensual

Con el dashboard de Looker Studio ya no necesitas preparar reportes manualmente:

1. El cliente tiene acceso permanente al dashboard en tiempo real
2. Cada mes, solo necesitas el análisis: "qué mejoró, qué empeoró, qué haremos"
3. El dashboard son los datos; el email mensual es el insight sobre esos datos`,
        completed: false,
      },
      {
        id: 'd3-l2b',
        title: 'Mini-práctica: Dashboard SEO con GSC + GA4 combinado',
        type: 'practice',
        tasks: [
          'Agrega Google Search Console como segunda fuente de datos a tu informe de Looker Studio',
          'Crea las 4 páginas del dashboard SEO completo definidas en la lectura',
          'En la página de Keywords, agrega un filtro de CTR < 3% y Position entre 5-20 — estas son oportunidades de optimización',
          'Combina en una vista: clicks orgánicos de GSC vs conversiones orgánicas de GA4 para el mismo período',
          'Configura la entrega automática del reporte mensual por email (Looker Studio → compartir → programar)',
        ],
        tip: 'La página más valiosa del dashboard SEO para un cliente no es la de rankings — es la de oportunidades. Keywords que aparecen pero no convierten clicks son dinero en la mesa. Mostrarle eso al cliente hace que entiendan el valor de optimizar el copy de los resultados de búsqueda.',
        completed: false,
      },
          {
        id: 'data-3-proj-pro',
        title: 'Proyecto Profesional: Sistema de medición para una campaña',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: 'Diseña e implementa el sistema de medición completo para una campaña digital multi-canal.',
        deliverables: [
          'Framework de medición: objetivo de negocio → KPIs → métricas → fuentes de datos para cada canal',
          'Setup de GA4: eventos configurados (mínimo 5 custom events relevantes para la campaña), Goals definidos',
          'Atribución: modelo de atribución elegido con justificación de por qué ese modelo y no otro para este caso específico',
          'Dashboard de campaña en Looker Studio: todos los canales en un solo lugar, comparativa vs. períodos anteriores',
          'Plan de reporting: cadencia, formato y audiencia de cada reporte (operativo semanal vs. ejecutivo mensual)',
          'Protocolo de QA: cómo verificas que el tracking está capturando datos correctamente',
        ],
        rubrica: [
          'Los KPIs se conectan directamente con el objetivo de negocio, no son métricas de vanidad',
          'El setup de GA4 está implementado y verificado (no solo diseñado)',
          'La atribución elegida refleja el journey real del cliente de ese negocio',
          'El dashboard es interpretable por alguien que no configuró el sistema',
          'El protocolo de QA puede detectar problemas de tracking en menos de 30 minutos',
        ],
        tip: 'El error más caro en medición es descubrir que el tracking estaba roto después de que terminó la campaña. Implementa el QA desde el día 1.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Looker Studio — Guía oficial',
        url: 'https://support.google.com/looker-studio',
        type: 'documentation',
      },
      {
        title: 'Looker Studio Gallery — Templates gratuitos',
        url: 'https://lookerstudio.google.com/gallery',
        type: 'tool',
      },
      {
        title: 'Supermetrics — Conectores adicionales para Looker Studio',
        url: 'https://supermetrics.com',
        type: 'tool',
      },
    ],
  },

  {
    id: 'data-4',
    number: 35,
    title: 'A/B Testing y Experimentación',
    description: 'Aprende a diseñar experimentos válidos, interpretar resultados con rigor estadístico y crear una cultura de mejora continua basada en datos.',
    duration: '2 semanas',
    status: 'available',
    track: 'data',
    lessons: [
      {
        id: 'd4-l1',
        title: 'A/B testing: la ciencia de mejorar sin adivinar',
        type: 'reading',
        content: `## A/B Testing: decisiones basadas en evidencia

El A/B testing (también llamado split testing) es el proceso de mostrar dos versiones diferentes de algo (una página, un headline, un botón) a grupos de usuarios distintos, y medir cuál produce mejores resultados.

### Por qué A/B testing y no intuición

La intuición falla constantemente en UX y marketing. Casos famosos:

- Obama 2008: cambiar el CTA de "Sign Up" a "Learn More" aumentó registros en 40%
- Microsoft Bing: un cambio en el formato de anuncios que ningún ejecutivo aprobó generó $100M+ adicionales en revenue
- Amazon: múltiples pruebas fallidas antes de encontrar el botón "Buy Now" correcto

El A/B testing reemplaza opiniones con evidencia.

### Estructura de un experimento válido

\`\`\`
Hipótesis: "Cambiar el CTA de 'Contáctanos' a 'Agenda tu llamada gratis'
            aumentará la tasa de clicks en el botón principal"

Control (A): versión original con "Contáctanos"
Variante (B): versión nueva con "Agenda tu llamada gratis"

Métrica primaria: CTR del botón CTA
Duración: hasta alcanzar significancia estadística
\`\`\`

### Significancia estadística: el concepto que no puedes ignorar

El resultado de un A/B test solo vale si es estadísticamente significativo.

**p-value < 0.05**: hay menos del 5% de probabilidad de que el resultado sea por azar. Esto es el estándar mínimo aceptado.

**Ejemplo**:
- Control: 100 visitas, 2 conversiones (2%)
- Variante: 100 visitas, 3 conversiones (3%)
- ¿Es la variante mejor? **No puedes saberlo con esos números** — puede ser ruido aleatorio

Necesitas más tráfico (generalmente 1,000-10,000 por variante) para confiar en el resultado.

**Herramienta**: abtestguide.com/calc — calcula el tamaño de muestra necesario antes de empezar.

### Qué probar (por impacto potencial)

**Alto impacto**:
- Headline del hero
- CTA principal (texto + color + posición)
- Oferta (precio, estructura, garantía)
- Layout completo de la página

**Medio impacto**:
- Imágenes y visuals
- Testimonios (cuál, en qué orden)
- Longitud del formulario

**Bajo impacto** (no priorizar):
- Color del texto
- Tamaño de fuente leve
- Iconos menores`,
        completed: false,
      },
      {
        id: 'd4-l1b',
        title: 'Mini-práctica: Diseña y documenta un experimento',
        type: 'practice',
        tasks: [
          'Identifica el elemento de tu sitio con mayor impacto potencial si lo cambias (headline, CTA, layout)',
          'Escribe la hipótesis completa: "Creo que cambiando X por Y, la métrica Z mejorará porque..."',
          'Usa abtestguide.com/calc para calcular el tamaño de muestra necesario con tu tráfico actual',
          'Define la duración mínima del experimento (nunca menos de 2 semanas para capturar variaciones semanales)',
          'Crea las dos versiones en Figma (aunque no puedas implementarlas hoy) — el diseño del experimento es el paso más crítico',
        ],
        tip: 'El error más común en A/B testing: terminar el experimento antes de tiempo porque "la variante ya va ganando". Los primeros días de un test son los más volátiles. Un test que parece ganador en día 3 puede ser perdedor en día 14. Respeta la duración mínima establecida antes de sacar conclusiones.',
        completed: false,
      },
      {
        id: 'd4-l2',
        title: 'Herramientas de A/B testing y cómo implementar experimentos',
        type: 'reading',
        content: `## Implementar A/B tests sin developer

### Google Optimize → reemplazado por Optimizely y otros

Google Optimize fue deprecado en 2023. Las alternativas actuales:

**VWO (Visual Website Optimizer)**:
- Editor visual para crear variantes sin código
- A/B, multivariante, personalización
- Desde ~$200/mes

**Optimizely**:
- El estándar enterprise
- Muy poderoso, muy caro
- Para empresas con alto tráfico

**Convert**:
- Buena alternativa de precio medio (~$99/mes)
- Integración con GA4

**Opción low-cost (recomendada para empezar)**:
- **Vercel Edge Config + middleware** — sirve diferentes versiones según cookies
- **GrowthBook** (open source) — plataforma completa de experimentation gratis

### A/B testing con Next.js y Vercel

\`\`\`typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const variant = Math.random() < 0.5 ? 'a' : 'b';

  const response = NextResponse.next();
  response.cookies.set('ab_variant', variant, { maxAge: 60 * 60 * 24 * 7 });

  return response;
}

// En el componente:
import { cookies } from 'next/headers';

const variant = cookies().get('ab_variant')?.value ?? 'a';

return variant === 'b'
  ? <HeroVariantB />
  : <HeroVariantA />;
\`\`\`

Este enfoque es gratuito, rápido (edge) y compatible con cualquier herramienta de analytics.

### Documentar y compartir resultados

Crea un "Experiment Log" en Notion con:
\`\`\`
Experimento: CTA text change
Hipótesis: "Agenda tu llamada" > "Contáctanos"
Start: 2026-06-01 | End: 2026-06-21
Tráfico: 2,400 visitas por variante
Resultado: Variante B +18% CTR (p=0.03 ✅ significativo)
Decisión: Implementar variante B permanentemente
Next: Testear color del botón
\`\`\`

Este log construye conocimiento acumulado sobre tu audiencia que se vuelve más valioso con el tiempo.

### Cultura de experimentación

Las empresas que más crecen no tienen "el mejor instinto" — tienen los mejores procesos de experimentación.

Amazon hace miles de A/B tests simultáneos. Netflix prueba hasta los thumbnails de cada show por audiencia.

Para una agencia: empieza con 1 experimento al mes. Con el tiempo, ese conocimiento acumulado es un activo competitivo real.`,
        completed: false,
      },
      {
        id: 'd4-l2b',
        title: 'Mini-práctica: Implementa tu primer A/B test real',
        type: 'practice',
        tasks: [
          'Implementa el middleware de Vercel para servir dos versiones de tu hero section (variante A y B)',
          'Asegúrate de que el evento de conversión se registra correctamente en GA4 para ambas variantes (con parámetro ab_variant)',
          'Configura un segmento en GA4 para cada variante y crea un dashboard de Looker Studio que compare las métricas',
          'Deja correr el experimento mínimo 2 semanas antes de analizar',
          'Documenta el experimento en tu Experiment Log con todos los campos definidos',
        ],
        tip: 'Solo prueba una variable a la vez. Si cambias el headline Y el color del botón Y la imagen simultáneamente, no sabrás qué causó el resultado. La pureza del experimento es lo que hace que el conocimiento sea acumulable y confiable.',
        completed: false,
      },
    
    {
      id: 'data-4-p1',
      title: 'Proyecto: Dashboard ejecutivo en Looker Studio',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: 'Construye un dashboard ejecutivo en Looker Studio (Google Data Studio) conectado a datos reales de GA4, Google Ads o un Google Sheet con datos de negocio. El dashboard debe contar una historia de negocio clara y permitir tomar decisiones.',
      deliverables: [
        'URL compartida del dashboard',
        'Mínimo 8 visualizaciones relevantes',
        'Texto de contexto/insight en cada sección',
        'Guía de lectura del dashboard (1 página)',
      ],
      rubrica: [
        'Datos conectados a fuente real o realista',
        'Narrativa de negocio coherente',
        'Diseño limpio, jerarquía visual clara',
        'Filtros que permiten exploración de datos',
      ],
      completed: false,
    },],
    resources: [
      {
        title: 'GrowthBook — Open source experimentation platform',
        url: 'https://www.growthbook.io',
        type: 'tool',
      },
      {
        title: 'A/B Test Sample Size Calculator',
        url: 'https://abtestguide.com/calc',
        type: 'tool',
      },
      {
        title: 'Optimizely — A/B testing guide',
        url: 'https://www.optimizely.com/optimization-glossary/ab-testing',
        type: 'article',
      },
    ],
  },

  {
    id: 'data-5',
    number: 36,
    title: 'KPIs y Reportes para Clientes',
    description: 'Define los KPIs correctos para cada tipo de negocio, construye reportes que el cliente entiende y presenta datos que justifican la inversión.',
    duration: '2 semanas',
    status: 'available',
    track: 'data',
    lessons: [
      {
        id: 'd5-l1',
        title: 'KPIs: medir lo que mueve el negocio, no lo que es fácil medir',
        type: 'reading',
        content: `## KPIs: el arte de medir lo correcto

Un KPI (Key Performance Indicator) es una métrica que está directamente vinculada al éxito del negocio.

El error más común: reportar métricas de vanidad en lugar de KPIs reales.

### Métricas de vanidad vs KPIs reales

| Métrica de vanidad | KPI real |
|-------------------|----------|
| Pageviews | Leads generados |
| Seguidores en Instagram | Leads desde Instagram |
| Impresiones de ads | Costo por lead |
| "Tiempo en página" alto | Tasa de conversión |
| Número de posts publicados | Tráfico orgánico generado |

### El framework OKR para definir KPIs

**Objective**: qué queremos lograr (cualitativo)
**Key Results**: cómo sabremos que lo logramos (cuantitativo)

\`\`\`
Objective: Ser la agencia de referencia para startups LATAM

KR1: Conseguir 10 leads calificados por mes desde canales orgánicos
KR2: Tasa de cierre de propuestas ≥ 25%
KR3: NPS de clientes actuales ≥ 8/10
\`\`\`

### KPIs por tipo de negocio

**E-commerce**:
- Tasa de conversión (%)
- Valor promedio de orden (AOV)
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- ROAS (Return on Ad Spend)

**SaaS**:
- MRR (Monthly Recurring Revenue) y crecimiento
- Churn rate (% que cancela cada mes)
- CAC y LTV
- Activation rate (% que completa el onboarding)
- NPS

**Agencia de servicios** (AlphaDev):
- Leads calificados por mes
- Tasa de cierre de propuestas
- Revenue por cliente
- Tiempo de delivery por proyecto
- NPS de clientes

**Blog/contenido**:
- Tráfico orgánico (sesiones)
- Keywords en top 10
- Email subscribers
- Tasa de conversión a lead/subscriber

### North Star Metric: el único número que importa más

Cada negocio tiene una métrica que, si crece, todo lo demás crece con ella.

- Airbnb: noches reservadas
- Facebook: usuarios activos diarios (DAU)
- Spotify: tiempo total de escucha
- AlphaDev Studios: proyectos entregados satisfactoriamente

La North Star Metric alinea a todo el equipo (aunque seas uno solo) en lo que importa.`,
        completed: false,
      },
      {
        id: 'd5-l1b',
        title: 'Mini-práctica: Define los KPIs de tu negocio y de un cliente',
        type: 'practice',
        tasks: [
          'Define la North Star Metric de AlphaDev Studios (o tu propio negocio) y justifícala',
          'Crea el árbol de métricas: North Star → 3-5 KPIs que la impulsan → métricas operativas que mueven cada KPI',
          'Para un cliente hipotético (e-commerce de ropa), define 5 KPIs con sus targets mensuales',
          'Identifica qué herramientas usarías para medir cada KPI (GA4, Search Console, CRM, etc.)',
          'Escribe el dashboard de KPIs en formato de tabla: KPI | Target | Actual | Tendencia | Acción si está debajo',
        ],
        tip: 'El mejor KPI es el que el cliente puede calcular en su cabeza sin herramientas. "23 leads este mes vs 18 el mes pasado" es más poderoso que "la tasa de conversión del canal de adquisición orgánico aumentó 0.3 puntos porcentuales". Simplicidad primero.',
        completed: false,
      },
      {
        id: 'd5-l2',
        title: 'Reportes para clientes: datos que generan confianza y retención',
        type: 'reading',
        content: `## El reporte de cliente que renueva contratos

Un buen reporte no es una dump de datos. Es una narrativa que responde tres preguntas:
1. ¿Qué pasó este mes?
2. ¿Por qué pasó?
3. ¿Qué haremos al respecto?

### El problema con la mayoría de reportes de agencia

- 40 páginas de screenshots de GA4 que el cliente no entiende
- Métricas que van bien aunque el negocio no esté creciendo
- Ninguna narrativa de qué causó los cambios
- Ninguna conexión entre acciones realizadas y resultados obtenidos

El cliente paga por resultados, no por reportes.

### La estructura del reporte que retiene clientes

**Executive Summary** (½ página):
\`\`\`
Este mes: [logro principal]
Vs mes anterior: [comparativa en lenguaje de negocio]
Próximo mes: [1-3 prioridades]
\`\`\`

**KPIs del período** (1 página con visuales):
- Solo los 3-5 KPIs acordados al inicio del proyecto
- Con comparativa vs mes anterior y vs objetivo
- Verde/amarillo/rojo para estado rápido

**Lo que hicimos** (1-2 páginas):
- Acciones concretas realizadas
- Con el impacto esperado de cada una

**Resultados de acciones anteriores** (1 página):
- ¿Qué logramos con lo que hicimos el mes pasado?
- Aquí se conecta esfuerzo con resultado

**Hallazgos e insights** (1 página):
- Qué aprendimos que antes no sabíamos
- Qué oportunidad identificamos

**Plan del próximo mes** (1 página):
- Acciones concretas con responsable y fecha
- KPIs objetivo para el próximo período

### Cómo presentar datos difíciles

Si los KPIs van mal:
1. **Sé directo** — no enterres las malas noticias en el reporte
2. **Explica el "por qué"** — ¿es estacional, algorítmico, competitivo?
3. **Presenta el plan** — qué cambiará para el próximo mes

Un cliente que recibe malas noticias con honestidad y un plan claro confía más que uno que recibe solo buenas noticias.

### Cadencia de comunicación ideal

\`\`\`
Semanal: mensaje corto de 2-3 líneas con el highlight de la semana
Mensual: reporte completo con la estructura de 7 secciones
Trimestral: revisión estratégica de objetivos y ajuste de targets
\`\`\``,
        completed: false,
      },
      {
        id: 'd5-l2b',
        title: 'Mini-práctica: Crea tu template de reporte mensual de cliente',
        type: 'practice',
        tasks: [
          'Crea el template de reporte mensual en Notion (para la narrativa) + Looker Studio (para los datos)',
          'Escribe el reporte de un mes ficticio o real usando la estructura de 7 secciones — con datos inventados si es necesario',
          'Practica traducir cada métrica a lenguaje de negocio: "tráfico orgánico +23%" → "23% más personas buscando [servicio] llegaron al sitio"',
          'Grábate presentando el reporte en 5 minutos — practica explicar resultados con fluidez',
          'Define la cadencia de comunicación completa para un cliente: ¿qué recibirán semanalmente, mensualmente, trimestralmente?',
        ],
        tip: 'Los clientes no retienen a agencias por sus reportes — retienen a agencias que les hacen sentir que están en manos de alguien que entiende su negocio. Los reportes son evidencia de ese entendimiento. Si el reporte podría ser el de cualquier cliente tuyo, no es suficientemente personalizado.',
        completed: false,
      },

      {
        id: 'data-exam',
        title: 'Examen final: Analytics y Datos',
        type: 'exam',
        questions: [
          {
            q: '¿Cuál es la diferencia fundamental entre el modelo de datos de Universal Analytics (UA) y Google Analytics 4 (GA4)?',
            options: [
              'UA es gratuito; GA4 requiere suscripción para datos avanzados',
              'UA se basa en sesiones y pageviews; GA4 se basa en eventos — todo es un evento con parámetros',
              'UA es para web; GA4 es solo para apps móviles',
              'No hay diferencia real, GA4 solo tiene una interfaz diferente',
            ],
            correct: 1,
            explanation: 'Este cambio de paradigma es fundamental. En UA, la unidad era la sesión y los hits eran tipos fijos (pageview, event, transaction). En GA4, TODO es un evento (page_view es un evento, scroll es un evento, purchase es un evento) con parámetros que aportan contexto. Esto da más flexibilidad pero requiere más configuración inicial.',
          },
          {
            q: '¿Por qué es crítico configurar "conversiones" en GA4 y qué pasa si no lo haces?',
            options: [
              'Sin conversiones no puedes ver el tráfico del sitio',
              'Sin conversiones, GA4 muestra tráfico pero no si ese tráfico sirve de algo — pierdes la capacidad de medir el ROI de tus acciones de marketing',
              'Sin conversiones configuradas, Google puede penalizar el sitio en SEO',
              'Las conversiones son opcionales — solo son necesarias para e-commerce',
            ],
            correct: 1,
            explanation: 'Sin conversiones, GA4 es una herramienta de vanidad: sabes que tienes tráfico, pero no si ese tráfico se convierte en leads, ventas o cualquier acción de valor. Con conversiones configuradas, puedes atribuir revenue/leads a canales específicos y tomar decisiones de presupuesto basadas en datos reales.',
          },
          {
            q: '¿Cuál es la ventaja principal de usar Google Tag Manager en lugar de instalar scripts directamente en el HTML?',
            options: [
              'GTM hace que el sitio cargue más rápido porque reduce el número de scripts',
              'Permite gestionar todos los scripts de tracking desde una UI sin modificar el código cada vez — un solo snippet en el HTML gestiona todos los demás',
              'GTM garantiza que los eventos lleguen a GA4 sin pérdida de datos',
              'GTM es gratuito; instalar scripts directamente tiene costo',
            ],
            correct: 1,
            explanation: 'Con GTM, el desarrollo solo instala un snippet una vez. Después, agregar Meta Pixel, Hotjar, nuevos eventos de GA4 o cualquier script es configuración en la UI de GTM — sin deploy. Esto desacopla el tracking del código, permitiendo que el equipo de marketing opere independientemente del equipo de desarrollo.',
          },
          {
            q: 'En un embudo de conversión de GA4, la página /contacto tiene 80% de tasa de abandono. ¿Cuál es el primer paso correcto?',
            options: [
              'Rediseñar completamente la página de contacto inmediatamente',
              'Investigar el "por qué" antes de actuar: revisar grabaciones de sesión (Clarity/Hotjar) y heatmaps para entender dónde y por qué abandonan',
              'Reducir el número de campos del formulario a solo email',
              'Aumentar el presupuesto de ads para traer más tráfico que compense el abandono',
            ],
            correct: 1,
            explanation: 'El 80% de abandono es un síntoma, no un diagnóstico. Las causas posibles son muy distintas: formulario muy largo, error técnico, falta de confianza, precio inesperado, falta de claridad. Antes de actuar, las grabaciones de sesión revelan exactamente dónde se detienen los usuarios. Actuar sin diagnóstico lleva a "soluciones" que no resuelven el problema real.',
          },
          {
            q: '¿Qué significa que un A/B test tiene un p-value de 0.03?',
            options: [
              'La variante B ganó por un 3% de diferencia en la métrica principal',
              'Hay un 3% de probabilidad de que el resultado observado sea por azar — es estadísticamente significativo (p < 0.05)',
              'El test necesita 3% más de tráfico para ser concluyente',
              'La variante A (control) tiene 3% más de conversiones que la variante B',
            ],
            correct: 1,
            explanation: 'p-value = probabilidad de que el resultado se deba al azar. p=0.03 significa solo 3% de probabilidad de que sea ruido aleatorio (97% de confianza en que el resultado es real). El estándar aceptado es p < 0.05. Un resultado "ganador" con p=0.3 tiene 30% de probabilidad de ser un falso positivo — no es confiable.',
          },
          {
            q: 'Un cliente pregunta: "¿Qué canal me trae más tráfico?" ¿Cuál es la respuesta analíticamente correcta?',
            options: [
              'Darle el canal con más sesiones absolutas',
              'Explicar que "más tráfico" no es el KPI correcto; la pregunta real es qué canal trae tráfico de mayor calidad (tasa de conversión, costo por lead, LTV)',
              'Decirle que necesita más datos para responder',
              'El canal con más tráfico siempre es el más valioso',
            ],
            correct: 1,
            explanation: 'Tráfico sin calidad es vanidad. El canal que trae 10,000 visitas con 0.1% de conversión puede ser menos valioso que el canal con 500 visitas y 5% de conversión. El análisis correcto segmenta por canal Y por calidad (conversiones, revenue, tiempo en página). Esta distinción es lo que diferencia a un analista de datos de alguien que solo reporta números.',
          },
          {
            q: '¿Cuál es la diferencia entre métricas "leading indicators" y "lagging indicators" en analytics?',
            options: [
              'Leading son métricas de marketing; lagging son métricas de ventas',
              'Leading indicators predicen resultados futuros (artículos publicados, backlinks obtenidos); lagging indicators miden resultados pasados (tráfico, revenue)',
              'Leading son métricas en tiempo real; lagging son reportes mensuales',
              'No hay diferencia práctica — ambos miden el mismo desempeño en momentos distintos',
            ],
            correct: 1,
            explanation: 'Leading indicators son accionables pero no son el objetivo final: publicar 4 artículos/mes predice tráfico SEO en 3-6 meses. Lagging indicators son el resultado real: tráfico orgánico, conversiones, revenue. Reportar solo lagging crea reactividad. Reportar leading + lagging crea una historia de causa-efecto que el cliente entiende y en la que confía.',
          },
          {
            q: 'Looker Studio se conecta a GA4 y muestra "0 conversiones" aunque GA4 sí muestra conversiones. ¿Cuál es la causa más probable?',
            options: [
              'Looker Studio tarda 48 horas en sincronizar los datos de GA4',
              'Los eventos de conversión en GA4 están configurados como eventos normales — no marcados como conversiones en la sección de configuración',
              'Looker Studio no puede mostrar conversiones de GA4, solo de Google Ads',
              'Necesitas reconectar la fuente de datos cada semana',
            ],
            correct: 1,
            explanation: 'GA4 tiene dos conceptos: "events" (cualquier interacción) y "conversions" (eventos marcados como importantes en Admin → Events → toggle Conversion). Looker Studio usa el campo "Conversions" que solo cuenta los eventos marcados como conversión. Si un evento form_submit no está marcado como conversión en GA4, aparecerá en "Events" pero no en "Conversions" en Looker Studio.',
          },
        ],
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Google Looker Studio — Templates de reportes',
        url: 'https://lookerstudio.google.com/gallery',
        type: 'tool',
      },
      {
        title: 'Hotjar — KPI Dashboard Guide',
        url: 'https://www.hotjar.com/blog/marketing-kpis',
        type: 'article',
      },
      {
        title: 'Klipfolio — KPI templates por industria',
        url: 'https://www.klipfolio.com/resources/kpi-examples',
        type: 'tool',
      },
    ],
  },

  // ─── Capstone Projects ────────────────────────────────────────────────────────

  {
    id: 'marketing-capstone',
    number: 37,
    title: 'Proyecto Final: Campaña de 30 Días Real',
    description: 'Diseña y ejecuta una campaña de marketing digital completa para un negocio real. De la estrategia a los resultados documentados.',
    duration: '5 semanas',
    status: 'available',
    track: 'marketing',
    lessons: [
      {
        id: 'mkt-cap-1',
        title: 'Proyecto Capstone: Campaña Digital Completa',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: `## Tu primer proyecto de portafolio real

Este proyecto integra todo lo aprendido en el track de Marketing Digital. El resultado debe ser una pieza de portafolio que puedas mostrar a clientes potenciales.

### El brief

Elige UN negocio para trabajar durante este proyecto. Puede ser:
- Tu propia agencia o proyecto personal
- Un negocio de alguien que conozcas (con su permiso)
- Un negocio ficticio con brief detallado que tú mismo redactes

### Lo que construirás

Una campaña de marketing digital de 30 días, completamente documentada: estrategia, ejecución, resultados y aprendizajes. No importa el presupuesto ($0 es válido si es contenido orgánico) — importa la calidad del pensamiento estratégico y la documentación.

### Contexto de evaluación

Imagina que este documento es lo que le presentas a un cliente en la reunión de "kickoff" (inicio) y en la reunión de "reporting" (resultados). ¿Lo contrataría?`,
        deliverables: [
          'Documento de estrategia (4-6 páginas): audiencia objetivo detallada, propuesta de valor, canales seleccionados con justificación, KPIs y targets para 30 días',
          'Calendario de contenido: 30 días completos con tema, formato, canal, copy y visual para cada pieza (mínimo 15 piezas realmente creadas y publicadas/programadas)',
          'Campaña de paid ads: mínimo 1 campaña activa en Meta o Google con presupuesto de cualquier monto ($5 es válido) — capturas de configuración + resultados reales',
          'Reporte final (3-4 páginas): resultados reales vs objetivos, análisis de qué funcionó y qué no, hipótesis de por qué, recomendaciones para el mes siguiente',
          'Documento de aprendizajes: 5 cosas que aprendiste que no estaban en el curriculum, 3 errores que cometiste y cómo los corregiste',
        ],
        tip: 'El error más común en este capstone es elegir un negocio demasiado complejo o con un producto que no conoces bien. Elige algo donde tengas acceso real: tu propia agencia, el negocio de un familiar, o un concepto que tú mismo definiste. El acceso a información real produce trabajo real.',
        completed: false,
      },
      {
        id: 'mkt-cap-2',
        title: 'Checklist de entrega y criterios de evaluación',
        type: 'practice',
        tasks: [
          'Estrategia: ¿defines claramente a quién le hablas (demografía + psicografía + pain point específico)?',
          'Estrategia: ¿cada canal elegido tiene una justificación basada en dónde está tu audiencia?',
          'Contenido: ¿las 15+ piezas creadas tienen coherencia visual y de voz entre sí?',
          'Contenido: ¿el copy de cada pieza habla al problema del cliente, no solo del producto?',
          'Paid ads: ¿tienes captura de la configuración de la campaña (audiencia, presupuesto, creativo) y de los resultados reales?',
          'Reporte: ¿comparas resultados reales vs objetivos con un análisis honesto (incluyendo lo que no funcionó)?',
          'Presentación: ¿el documento se puede entender sin que tú lo expliques? ¿un cliente lo leería con interés?',
          'Formato: ¿todo está en un PDF o Notion limpio y compartible con link público?',
        ],
        tip: 'El reporte más valioso no es el que muestra solo los éxitos — es el que analiza los fracasos con honestidad. Un cliente sofisticado prefiere a alguien que entiende por qué algo falló antes que a alguien que solo muestra métricas buenas.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Meta Business Suite — Gestión de campañas',
        url: 'https://business.facebook.com',
        type: 'tool',
      },
      {
        title: 'Google Ads — Plataforma de anuncios',
        url: 'https://ads.google.com',
        type: 'tool',
      },
      {
        title: 'Canva — Creación de contenido visual',
        url: 'https://canva.com',
        type: 'tool',
      },
    ],
  },

  {
    id: 'uiux-capstone',
    number: 38,
    title: 'Proyecto Final: Diseño Completo de Producto',
    description: 'Diseña un producto digital de principio a fin: investigación de usuarios, arquitectura, wireframes, prototipo de alta fidelidad y entrega al equipo de desarrollo.',
    duration: '6 semanas',
    status: 'available',
    track: 'uiux',
    lessons: [
      {
        id: 'uiux-cap-1',
        title: 'Proyecto Capstone: De Investigación a Entrega',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: `## El proyecto que define tu portafolio de UX

Este capstone es el proyecto más completo que habrás hecho. Si lo ejecutas bien, será la primera pieza que muestres en cualquier entrevista o propuesta de trabajo.

### El brief

Diseña el flujo completo de UN producto digital. Puede ser:
- Una app móvil (iOS/Android)
- Una plataforma web SaaS
- El rediseño de un producto existente que tenga problemas reales de UX

El producto debe resolver un problema REAL que hayas investigado con usuarios reales.

### Ejemplos de proyectos anteriores

- App de gestión de finanzas personales para freelancers LATAM
- Plataforma de contratación de servicios creativos
- App de seguimiento de hábitos con accountability social
- Rediseño del proceso de onboarding de [app existente conocida]

### Lo que diferencia este capstone

El proceso importa tanto como el resultado. Debes documentar: qué investigaste, qué aprendiste, cómo tomaste decisiones de diseño. Un portfolio de UX que solo muestra pantallas bonitas no convence a nadie — el razonamiento detrás de cada decisión es lo que demuestra que eres un designer, no solo un artista.`,
        deliverables: [
          'Research report (Figma o Notion): mínimo 3 entrevistas a usuarios reales documentadas, análisis competitivo de 3-5 alternativas, user personas (2-3), jobs to be done',
          'Arquitectura de información: sitemap y user flow diagram del flujo principal',
          'Wireframes de baja fidelidad: todos los screens del flujo principal (mínimo 10 screens)',
          'Prototipo de alta fidelidad en Figma: versión desktop O mobile, interactivo (mínimo 15 screens conectados)',
          'Design system del proyecto: tokens de color, tipografía, componentes (button, input, card, nav) con sus variantes',
          'Developer handoff document: especificaciones de spacing, tipografía, colores en valores exactos, comportamiento de componentes, assets exportados',
          'Case study para portafolio (PDF + Figma): presenta el proceso completo en formato narrable — problema, proceso, decisiones, resultado',
        ],
        tip: 'La sección de research es lo que más diferencian los buenos diseñadores. Hablar con 3 usuarios reales durante 30 minutos cada uno te dará insights que 10 horas de inventar personas nunca te darán. Invierte ahí primero.',
        completed: false,
      },
      {
        id: 'uiux-cap-2',
        title: 'Checklist de entrega y criterios de evaluación',
        type: 'practice',
        tasks: [
          'Research: ¿las entrevistas son con usuarios reales del segmento objetivo (no amigos o familiares que no usan el tipo de producto)?',
          'Research: ¿documentas las citas textuales de los usuarios que fundamentan tus decisiones de diseño?',
          'IA: ¿el sitemap cubre todos los flujos que el usuario necesita completar (no solo el happy path)?',
          'Wireframes: ¿muestran la estructura y jerarquía sin distraer con color o detalle visual?',
          'Hi-Fi: ¿el prototipo pasa la prueba de contraste WCAG AA en todos los textos?',
          'Hi-Fi: ¿el diseño funciona en mobile (375px) sin scroll horizontal?',
          'Design System: ¿todos los componentes tienen estados (default, hover, focus, disabled, error)?',
          'Handoff: ¿un developer puede implementar el diseño sin preguntarte una sola cosa?',
          'Case study: ¿alguien que no conoce el proyecto puede entender el proceso y las decisiones solo leyéndolo?',
        ],
        tip: 'Comparte el prototipo interactivo con 3 personas que no saben nada del proyecto y pídeles que completen una tarea específica sin ayuda. Si se pierden o se confunden, tienes información de diseño más valiosa que cualquier critique.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Figma — Herramienta principal de diseño',
        url: 'https://figma.com',
        type: 'tool',
      },
      {
        title: 'Maze — User testing de prototipos',
        url: 'https://maze.co',
        type: 'tool',
      },
      {
        title: 'UXcel — Portfolio examples y critiques',
        url: 'https://uxcel.com',
        type: 'tool',
      },
    ],
  },

  {
    id: 'web-capstone',
    number: 39,
    title: 'Proyecto Final: SaaS MVP en Producción',
    description: 'Construye y despliega una aplicación full-stack real con Next.js, Supabase y TypeScript. De la idea al producto en producción.',
    duration: '6 semanas',
    status: 'available',
    track: 'web',
    lessons: [
      {
        id: 'web-cap-1',
        title: 'Proyecto Capstone: Tu Primer SaaS en Producción',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: `## De cero a producción: el proyecto que valida todo

Este capstone es la diferencia entre saber programar y ser un developer. Un proyecto en producción con usuarios reales vale más en tu portafolio que 100 tutoriales completados.

### El brief

Construye y despliega una aplicación web funcional con las tecnologías del track. Debe resolver un problema real (aunque pequeño).

### Criterios del proyecto

- **Funcional**: no un tutorial copiado — debe tener lógica propia
- **En producción**: URL pública en Vercel, accesible para cualquiera
- **Con datos reales**: Supabase como base de datos, no JSON hardcodeado
- **Con autenticación**: al menos email/password con Supabase Auth
- **Responsive**: funciona en mobile y desktop

### Ideas de proyectos (elige una o propón la tuya)

- **Task manager con equipos**: tareas, asignación a usuarios, estados, due dates
- **Link shortener con analytics**: crear links cortos, ver cuántos clicks recibió cada uno
- **Portfolio CMS**: panel donde puedes agregar/editar/eliminar proyectos que se muestran en una landing
- **Expense tracker**: registrar gastos por categoría, ver gráficas de resumen
- **Waitlist para tu idea de startup**: landing page + formulario + panel admin para ver los registros

### Stack requerido

Next.js 16+ App Router · TypeScript strict · Tailwind CSS · Supabase (Postgres + Auth) · Deployed en Vercel`,
        deliverables: [
          'Repositorio público en GitHub con código limpio (no commits de "fix" encadenados — squash o rebase si es necesario), README profesional con screenshots y link a producción',
          'URL en producción en Vercel funcional — cualquier persona puede registrarse y usarla',
          'Al menos 3 features implementadas: autenticación, CRUD de la entidad principal, y una feature diferenciadora',
          'TypeScript strict sin ningún "any" — npx tsc --noEmit debe pasar limpio',
          'Responsive design verificado en mobile (375px) y desktop',
          'Video demo de 3-5 minutos mostrando el flujo completo de usuario (loom.com o similar)',
          'Documento de arquitectura (Notion o README): diagrama del schema de la DB, decisiones técnicas tomadas y por qué',
        ],
        tip: 'El error más costoso en este capstone: elegir un proyecto demasiado ambicioso y nunca terminarlo. Un task manager simple y completamente funcional en producción vale infinitamente más que un "Netflix clone" sin terminar. Scope pequeño, calidad alta, enviado.',
        completed: false,
      },
      {
        id: 'web-cap-2',
        title: 'Checklist de entrega y criterios de evaluación',
        type: 'practice',
        tasks: [
          'Código: ¿npx tsc --noEmit pasa sin errores? ¿npm run build completa sin warnings?',
          'Código: ¿hay algún console.log de debugging en el código final? (debe estar limpio)',
          'Código: ¿los nombres de variables y funciones son descriptivos y en inglés?',
          'Auth: ¿el registro, login y logout funcionan correctamente? ¿las rutas protegidas redirigen si no hay sesión?',
          'DB: ¿Row Level Security está activado en Supabase? ¿los usuarios solo pueden ver/modificar sus propios datos?',
          'UI: ¿la app muestra estados de loading mientras carga datos? ¿muestra mensajes de error útiles si algo falla?',
          'Responsive: ¿funciona en iPhone SE (375px)? ¿los elementos no se salen de la pantalla?',
          'README: ¿incluye: descripción, screenshots, stack usado, instrucciones de setup local y link a producción?',
        ],
        tip: 'Antes de considerar el proyecto terminado, pídele a alguien que no lo conoce que lo use sin instrucciones. Si se pierden, confunden, o encuentran un bug, eso es trabajo que falta. Una app que "funciona cuando tú la usas" no es lo mismo que una app que funciona.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Supabase — Postgres + Auth + Storage',
        url: 'https://supabase.com',
        type: 'tool',
      },
      {
        title: 'Vercel — Deploy y hosting',
        url: 'https://vercel.com',
        type: 'tool',
      },
      {
        title: 'Loom — Grabar video demos',
        url: 'https://loom.com',
        type: 'tool',
      },
    ],
  },

  {
    id: 'ia-capstone',
    number: 40,
    title: 'Proyecto Final: Sistema de Automatización Inteligente',
    description: 'Diseña y construye un sistema de automatización con IA que resuelva un problema real de tu agencia o negocio — de la idea al workflow en producción.',
    duration: '4 semanas',
    status: 'available',
    track: 'ia',
    lessons: [
      {
        id: 'ia-cap-1',
        title: 'Proyecto Capstone: Automatización que Ahorra Tiempo Real',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: `## El sistema que te devuelve horas de trabajo cada semana

Este capstone no es un ejercicio académico — es una herramienta que deberías seguir usando después de terminarlo.

### El brief

Construye un sistema de automatización con IA que:
1. Resuelva un problema real de tiempo en tu flujo de trabajo o negocio
2. Corra de forma autónoma (sin intervención manual cada vez)
3. Integre al menos un modelo de lenguaje (Claude, GPT, o Gemini)
4. Tenga documentación suficiente para que otra persona pueda usarlo

### Ideas de proyectos

- **Research assistant**: dado el nombre de un prospecto → busca en web → extrae info relevante → genera brief en Notion
- **Content repurposing**: nuevo artículo de blog → genera 5 variantes para Twitter/LinkedIn/Instagram → los programa en Buffer
- **Lead qualification**: nuevo form submission → Claude analiza el perfil → lo clasifica como calificado/no calificado → notificación con análisis en Slack
- **Weekly report**: cada viernes → obtiene métricas de GA4 + GSC → Claude redacta el resumen → lo envía por email al equipo
- **Client onboarding**: nuevo cliente firmado → crea workspace en Notion + repositorio en GitHub + email de bienvenida + tarea en Linear

### Criterios de éxito

El sistema funciona sin que tú hagas nada manualmente, produce outputs de calidad consistente, y el tiempo que ahorra por semana > el tiempo que tardó en construirse.`,
        deliverables: [
          'Workflow funcional en n8n (o Make) exportado como JSON + screenshots de cada nodo configurado',
          'Integración demostrable con al menos 1 LLM: el prompt usado, los parámetros, y ejemplo de input/output real',
          'Demo video de 3-5 minutos mostrando el workflow corriendo en vivo con un caso real (no demo preparada con datos perfectos)',
          'Documentación técnica: diagrama del workflow, descripción de cada nodo, credenciales necesarias, cómo ejecutarlo manualmente si algo falla',
          'Análisis de impacto: tiempo ahorrado por semana, costo mensual en APIs, ROI calculado, limitaciones conocidas del sistema',
          'Plan de mejoras: qué agregarías con más tiempo, qué casos edge no maneja bien, cómo escalaría',
        ],
        tip: 'El 80% del valor de un sistema de automatización está en el prompt del LLM. Un workflow perfecto con un prompt mediocre produce outputs mediocres. Invierte la mayoría del tiempo en iterar el prompt hasta que el output sea consistentemente bueno — antes de preocuparte por los nodos del workflow.',
        completed: false,
      },
      {
        id: 'ia-cap-2',
        title: 'Checklist de entrega y criterios de evaluación',
        type: 'practice',
        tasks: [
          'Funcionalidad: ¿el workflow corre end-to-end sin intervención manual cuando ocurre el trigger?',
          'LLM: ¿el prompt incluye rol, contexto, restricciones y formato de output esperado?',
          'LLM: ¿probaste el prompt con al menos 10 inputs distintos? ¿el output es consistente en calidad?',
          'Error handling: ¿qué pasa si el LLM genera un output inesperado? ¿hay nodo de error que notifica?',
          'Costo: ¿calculaste el costo mensual en tokens si corre en producción a la frecuencia esperada?',
          'Demo: ¿el video muestra el workflow corriendo con un caso REAL (no preparado artificialmente)?',
          'Documentación: ¿alguien sin contexto puede configurar y usar el sistema solo con tu documentación?',
          'Impacto: ¿puedes medir concretamente cuánto tiempo ahorra por semana comparado con el proceso manual?',
        ],
        tip: 'Al evaluar tu propio proyecto, pregúntate: ¿lo usaré la próxima semana? Si la respuesta es no, probablemente el problema elegido no era lo suficientemente doloroso. Los mejores proyectos de este capstone son herramientas que el estudiante ya está usando en producción cuando los entrega.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'n8n — Automatización de workflows',
        url: 'https://n8n.io',
        type: 'tool',
      },
      {
        title: 'Anthropic API — Claude en producción',
        url: 'https://docs.anthropic.com/en/api',
        type: 'documentation',
      },
      {
        title: 'Jina.ai Reader — Web scraping para LLMs',
        url: 'https://jina.ai/reader',
        type: 'tool',
      },
    ],
  },

  {
    id: 'branding-capstone',
    number: 41,
    title: 'Proyecto Final: Identidad de Marca Completa',
    description: 'Crea la identidad de marca completa para un negocio real: estrategia, sistema visual, brand voice y todas las aplicaciones.',
    duration: '5 semanas',
    status: 'available',
    track: 'branding',
    lessons: [
      {
        id: 'branding-cap-1',
        title: 'Proyecto Capstone: Brand Identity de Cero',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: `## La marca que demuestra que sabes hacer branding

Este capstone produce el activo de portafolio más visible de todo el track. Una identidad de marca bien ejecutada habla por sí sola.

### El brief

Crea la identidad de marca completa para UN negocio. Puede ser:
- Un cliente real (el mejor escenario — tienes feedback real)
- Tu propia agencia o proyecto personal
- Un brief ficticio bien definido que tú mismo escribas

### Sobre el brief ficticio

Si no tienes un cliente real, escribe el brief como si fueras el cliente: nombre del negocio, industria, audiencia, competidores, personalidad deseada, presupuesto. Un brief bien escrito hace que el trabajo de diseño sea más real.

### Lo que no es aceptable

- Rediseñar una marca existente copiando lo que ya tiene
- Usar plantillas de Canva como base del sistema
- Entregar solo el logo sin el sistema completo

### Lo que sí es excepcional

Un brand book que un cliente real pueda darle a cualquier proveedor (imprenta, social media manager, developer) y obtener resultados coherentes sin necesitar explicaciones.`,
        deliverables: [
          'Documento de estrategia de marca (4-6 páginas): posicionamiento, audiencia, arquetipos, personalidad, mensajes clave, vocabulario permitido y prohibido',
          'Sistema de logo completo en Figma: versión primaria, compacta, monocromática y negativa — con zona de respeto, tamaño mínimo, y do\'s & don\'ts',
          'Paleta de colores documentada: nombre propio, hex, RGB, HSL, uso específico y restricciones para cada color',
          'Sistema tipográfico: par de fuentes con justificación, escala tipográfica completa con todos los niveles documentados',
          'Brand Book en Figma (mínimo 20 páginas): todas las secciones — estrategia, logo, colores, tipografía, iconografía, fotografía, aplicaciones',
          'Mínimo 5 aplicaciones de marca: perfil de Instagram (foto + portada), post template, tarjeta de presentación, firma de email, mockup de un elemento físico (bolsa, camiseta, letrero)',
          'Archivos exportados organizados: logos en SVG + PNG (todos los formatos y fondos), paleta como variables CSS, tipografías con instrucciones de uso',
        ],
        tip: 'Las mejores identidades de marca no son las más complejas — son las más coherentes. Cada elemento debe ser una expresión del mismo carácter. Prueba esto: muestra el brand book a alguien que no conoce la marca y pídele que describa la personalidad de la empresa. Si coincide con lo que definiste en la estrategia, el sistema funciona.',
        completed: false,
      },
      {
        id: 'branding-cap-2',
        title: 'Checklist de entrega y criterios de evaluación',
        type: 'practice',
        tasks: [
          'Estrategia: ¿el posicionamiento es específico (excluye a alguien) o genérico (válido para cualquier empresa del sector)?',
          'Logo: ¿funciona en las 4 variantes requeridas? ¿se lee en 16x16px (favicon)?',
          'Logo: ¿el archivo SVG es limpio (sin capas innecesarias, sin texto en paths mal nombrados)?',
          'Colores: ¿verificaste el contraste de todas las combinaciones texto/fondo con una herramienta?',
          'Tipografía: ¿el cuerpo del brand book (body text) usa la tipografía que definiste, no una genérica de Figma?',
          'Brand Book: ¿cada página tiene un propósito claro o hay páginas de relleno?',
          'Aplicaciones: ¿las 5 aplicaciones se sienten como parte del mismo universo de marca?',
          'Entrega: ¿el link de Figma tiene permisos de View correctos para que cualquiera pueda acceder?',
        ],
        tip: 'Imprime una de las aplicaciones (aunque sea en papel común) y pégala en una pared. Luego mira la pantalla del Figma al mismo tiempo. ¿Se sienten igual? El ojo calibrado para pantalla muchas veces comete errores que solo se detectan en impreso. Este test simple puede revelar problemas de contraste, escala o legibilidad que en pantalla no son visibles.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Figma — Diseño del brand book',
        url: 'https://figma.com',
        type: 'tool',
      },
      {
        title: 'Coolors — Generador y verificador de paletas',
        url: 'https://coolors.co',
        type: 'tool',
      },
      {
        title: 'Mockup World — Mockups gratuitos para aplicaciones',
        url: 'https://www.mockupworld.co',
        type: 'tool',
      },
    ],
  },

  {
    id: 'copy-capstone',
    number: 42,
    title: 'Proyecto Final: Campaña de Copy Integrada',
    description: 'Escribe la campaña de copy completa para un producto o servicio real: landing page, secuencia de emails, ads y propuesta comercial.',
    duration: '4 semanas',
    status: 'available',
    track: 'copy',
    lessons: [
      {
        id: 'copy-cap-1',
        title: 'Proyecto Capstone: Copy que Convierte',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: `## Cada pieza de copy es un argumento de venta

Este capstone produce un sistema completo de copy para un producto o servicio. No piezas sueltas — una campaña integrada donde cada pieza se alimenta de las otras.

### El brief

Elige UN producto o servicio para el que escribirás toda la campaña. Puede ser:
- AlphaDev Studios (usa la información del CLAUDE.md como brief)
- Un cliente real o pasado
- Un producto tuyo (curso, servicio freelance, SaaS)
- Un brief ficticio bien detallado

### La coherencia es el criterio más importante

La landing page, los emails y los ads deben verse como si vinieran del mismo cerebro. El mismo tono, los mismos beneficios clave, los mismos mensajes. Un prospecto que vio el ad, llegó a la landing y recibió el email debe sentir coherencia total, no confusión.

### Cómo medir si el copy es bueno

Antes de entregar, pasa cada pieza por estas preguntas:
1. ¿Habla de beneficios o de features?
2. ¿La ratio tú/yo es al menos 3:1?
3. ¿Un lector nuevo entiende la propuesta de valor en 5 segundos?
4. ¿Hay una sola acción pedida por pieza?
5. ¿Te daría vergüenza que un copywriter profesional lo leyera?`,
        deliverables: [
          'Landing page completa (documento de texto, no diseño): hero (headline + subheadline), problem statement, 5-6 benefits como bullets, 3 testimonios (reales o creados coherentemente), how it works en 3 pasos, 4 FAQ con respuestas, CTA final — cada sección claramente separada y etiquetada',
          'Secuencia de 5 emails: subject line + preview text + body completo de cada email, con el framework de bienvenida (día 0, 2, 4, 7, 10)',
          '3 variantes de Meta Ad: para cada variante — hook (primeras 3 líneas), body completo, headline de imagen, CTA button. Las 3 deben tener ángulos distintos (beneficio directo, dolor, prueba social)',
          'Template de propuesta comercial: las 7 secciones completas con copy real (no placeholders), listo para personalizar por cliente',
          'Cadencia de follow-up (4 emails): subject line + body para el follow-up de valor (día 3), objeción (día 7), cambio de oferta (día 14) y breakup (día 21)',
        ],
        tip: 'Lee todo el copy en voz alta antes de entregarlo. Grábate si es posible. El ear test detecta frases que "se leen bien" pero suenan artificiales cuando se dicen. El mejor copy fluye como conversación natural — si tropiezas al leerlo, el lector también.',
        completed: false,
      },
      {
        id: 'copy-cap-2',
        title: 'Checklist de entrega y criterios de evaluación',
        type: 'practice',
        tasks: [
          'Landing: ¿el headline comunica el beneficio principal en máximo 10 palabras sin frases genéricas?',
          'Landing: ¿hay alguna mención de "soluciones innovadoras", "transformación digital" o cualquier frase de relleno?',
          'Emails: ¿cada email tiene UN solo CTA? ¿el subject line es < 40 caracteres?',
          'Emails: ¿el email de bienvenida (día 0) entrega inmediatamente el valor prometido?',
          'Ads: ¿los 3 hooks son completamente distintos entre sí (no variaciones del mismo ángulo)?',
          'Ads: ¿el body de cada ad tiene < 150 palabras y es escaneable?',
          'Propuesta: ¿empieza hablando del problema del cliente (no de la empresa)?',
          'Ratio: ¿contaste las palabras en primera persona vs segunda? ¿es al menos 1:2 a favor del "tú"?',
          'Coherencia: ¿alguien que ve el ad, llega a la landing y recibe el email siente que viene de la misma marca con el mismo mensaje?',
        ],
        tip: 'Comparte el landing page copy con 3 personas que no conocen el producto y pídeles que te digan en 1 minuto: ¿de qué se trata? ¿para quién es? ¿qué tengo que hacer para obtenerlo? Si no pueden responder las 3, el copy necesita trabajo.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Hemingway App — Claridad del copy',
        url: 'https://hemingwayapp.com',
        type: 'tool',
      },
      {
        title: 'Really Good Emails — Referencia de emails',
        url: 'https://reallygoodemails.com',
        type: 'tool',
      },
      {
        title: 'Swipe File — Referencia de ads y landing pages',
        url: 'https://swipefile.com',
        type: 'tool',
      },
    ],
  },

  {
    id: 'seo-capstone',
    number: 43,
    title: 'Proyecto Final: SEO de Auditoría a Primeros Resultados',
    description: 'Ejecuta un proyecto SEO completo para un sitio real: auditoría, estrategia de keywords, producción de contenido optimizado y link building documentado.',
    duration: '8 semanas',
    status: 'available',
    track: 'seo',
    lessons: [
      {
        id: 'seo-cap-1',
        title: 'Proyecto Capstone: SEO Real con Resultados Reales',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: `## El proyecto que más tarda — y más vale

El SEO no produce resultados en semanas. Este capstone dura más que los otros por una razón: necesitas tiempo real para ver resultados reales.

### El brief

Ejecuta un proyecto SEO completo para un sitio web real. Debe ser:
- Tu propio sitio (el ideal — tienes acceso total)
- El sitio de AlphaDev Studios (con acceso a GSC y Analytics)
- El sitio de un conocido o cliente (con su permiso y acceso)

### Por qué necesita tiempo real

El algoritmo de Google tarda entre 2-8 semanas en indexar y rankear contenido nuevo. Este capstone se entrega con resultados de al menos 6-8 semanas de trabajo real — no resultados inventados.

### El estándar de calidad

Cada artículo que publiques debe ser el mejor resultado para esa keyword en términos de profundidad, utilidad y experiencia. No 800 palabras de relleno — contenido que realmente responde la pregunta mejor que cualquier competidor.`,
        deliverables: [
          'Auditoría SEO completa (5 secciones): técnico, on-page, contenido, autoridad y competencia — con cada issue documentado: problema, evidencia, solución implementada (o plan si no se pudo implementar)',
          'Keyword map con mínimo 50 keywords: organizadas en clusters temáticos, con volumen, KD, intent y prioridad documentados para cada una',
          'Mínimo 5 artículos publicados en el sitio: completamente optimizados (title, meta description, H1/H2/H3, internal linking, imágenes con alt text), con mínimo 1,000 palabras cada uno de contenido de calidad real',
          'Log de link building: mínimo 15 outreach emails enviados documentados (sitio contactado, DR del sitio, email enviado, respuesta), resultados de los que respondieron',
          'Reporte de progreso a 6-8 semanas: capturas de Google Search Console mostrando la evolución de clicks, impressions, posiciones y páginas indexadas desde el inicio del proyecto',
          'Looker Studio dashboard conectado a GSC + GA4 mostrando el tráfico orgánico y las conversiones del período',
        ],
        tip: 'La sección de auditoría es donde más aprenden los clientes y donde más valor percibes como consultor SEO. Una auditoría bien documentada que muestra exactamente qué problemas tienen y por qué importan cada uno justifica el precio del proyecto antes de que empieces a trabajar. Invierte tiempo en que sea excelente.',
        completed: false,
      },
      {
        id: 'seo-cap-2',
        title: 'Checklist de entrega y criterios de evaluación',
        type: 'practice',
        tasks: [
          'Auditoría: ¿cada issue tiene evidencia (screenshot, URL específica) y no solo descripción genérica?',
          'Auditoría: ¿traduciste cada problema técnico a impacto de negocio (no solo "falta el H1" sino "sin H1 Google no entiende de qué trata la página")?',
          'Keywords: ¿el keyword map distingue claramente intent informacional vs comercial vs transaccional?',
          'Keywords: ¿elegiste keywords donde tienes posibilidad real de rankear con tu DR actual (KD apropiado)?',
          'Artículos: ¿cada artículo tiene title tag único y meta description persuasiva < 160 caracteres?',
          'Artículos: ¿el primer párrafo de cada artículo menciona la keyword principal de forma natural?',
          'Artículos: ¿cada artículo enlaza internamente a otros 2-3 artículos relevantes del sitio?',
          'Link building: ¿los emails de outreach son personalizados (no plantilla idéntica para todos)?',
          'Resultados: ¿incluyes captura de GSC mostrando el período ANTES y DESPUÉS?',
        ],
        tip: 'Cuando Google tarde en mostrar resultados (lo cual es normal), documenta el proceso, no solo los resultados. Un cliente que ve la auditoría detallada, el log de outreach y los artículos publicados tiene evidencia de que el trabajo se está haciendo correctamente, aunque los rankings aún no hayan subido.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Google Search Console',
        url: 'https://search.google.com/search-console',
        type: 'tool',
      },
      {
        title: 'Screaming Frog — Crawl técnico',
        url: 'https://www.screamingfrog.co.uk/seo-spider',
        type: 'tool',
      },
      {
        title: 'Ahrefs — Research de keywords y backlinks',
        url: 'https://ahrefs.com',
        type: 'tool',
      },
    ],
  },

  {
    id: 'data-capstone',
    number: 44,
    title: 'Proyecto Final: Infraestructura de Analytics para un Cliente',
    description: 'Configura el setup completo de analytics para un negocio real: GA4, GTM, Looker Studio, A/B test y framework de KPIs — todo documentado y entregable.',
    duration: '4 semanas',
    status: 'available',
    track: 'data',
    lessons: [
      {
        id: 'data-cap-1',
        title: 'Proyecto Capstone: Analytics que Toma Decisiones',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: `## La infraestructura de datos que cualquier negocio necesita

El 90% de los negocios tiene Google Analytics instalado. Menos del 10% lo tiene configurado correctamente y lo usa para tomar decisiones. Este capstone produce el setup del 10%.

### El brief

Configura y documenta la infraestructura completa de analytics para UN negocio real. Puede ser:
- Tu propio sitio/proyecto
- El sitio de AlphaDev Studios
- El sitio de un cliente o conocido (con acceso a GA4, GTM y GSC)

### La diferencia entre "tener Analytics" y "tener Analytics bien"

- **Mal**: GA4 instalado con el snippet, sin events configurados, sin conversiones, sin Dashboard, informes default
- **Bien**: GA4 + GTM configurados, conversiones marcadas, eventos personalizados para el negocio, Dashboard en Looker Studio que responde preguntas de negocio, A/B test corriendo, KPIs definidos con reporte mensual

Este capstone produce el segundo escenario.`,
        deliverables: [
          'GA4 completamente configurado: mínimo 5 eventos personalizados relevantes para el negocio (no solo los automáticos), mínimo 2 conversiones marcadas, audiencias de remarketing configuradas',
          'GTM setup documentado: screenshot de todos los tags configurados, triggers y variables — con explicación del propósito de cada tag',
          'Looker Studio dashboard (mínimo 3 páginas): Overview de KPIs con comparativas, Fuentes de tráfico, Comportamiento de conversión — con controles de fecha interactivos',
          'Diseño de A/B test: hipótesis documentada, control vs variante descritos, métrica primaria y secundaria, tamaño de muestra necesario calculado, duración mínima — implementado si hay tráfico suficiente, documentado si no',
          'Framework de KPIs del negocio: North Star Metric + 5 KPIs con targets mensuales, árbol de métricas que muestra cómo cada KPI impacta la NSM',
          'Reporte mensual de ejemplo: usando datos reales del período de trabajo, con la estructura completa de 7 secciones — incluyendo traducciones de cada métrica a lenguaje de negocio',
        ],
        tip: 'El entregable más valorado de este capstone por clientes reales es el Dashboard de Looker Studio — porque lo pueden ver ellos solos, cuando quieran, sin pedirte un reporte. Diseña el dashboard para el CEO del negocio (que no sabe de analytics), no para ti. Si necesita explicación para entenderse, no está terminado.',
        completed: false,
      },
      {
        id: 'data-cap-2',
        title: 'Checklist de entrega y criterios de evaluación',
        type: 'practice',
        tasks: [
          'GA4: ¿los 5 eventos personalizados son específicos del negocio (no genéricos)? ¿se disparan correctamente al navegar el sitio?',
          'GA4: ¿las conversiones marcadas son acciones que realmente importan al negocio (no pageviews aleatorios)?',
          'GTM: ¿el Preview de GTM no muestra errores en ninguno de los tags?',
          'GTM: ¿está el manejo de errores configurado (qué pasa si un tag falla)?',
          'Looker Studio: ¿cada gráfica tiene título que explica qué muestra sin necesidad de leer los ejes?',
          'Looker Studio: ¿todos los scorecards tienen comparativa vs período anterior?',
          'KPIs: ¿los targets son alcanzables y basados en datos reales (no inventados)?',
          'KPIs: ¿el reporte mensual usa lenguaje de negocio, no jerga de analytics?',
          'Entrega: ¿el dashboard de Looker Studio tiene permisos de acceso para el cliente?',
        ],
        tip: 'Antes de entregar, simula ser el cliente: abre el dashboard con tu teléfono, sin instrucciones previas, y responde: ¿estamos creciendo? ¿qué canal trae más clientes? ¿dónde se nos van los usuarios? Si el dashboard no responde esas 3 preguntas en 30 segundos, rediseña.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Looker Studio — Dashboard builder',
        url: 'https://lookerstudio.google.com',
        type: 'tool',
      },
      {
        title: 'GrowthBook — A/B testing gratuito',
        url: 'https://www.growthbook.io',
        type: 'tool',
      },
      {
        title: 'Microsoft Clarity — Heatmaps + grabaciones',
        url: 'https://clarity.microsoft.com',
        type: 'tool',
      },
    ],
  },

  // ─── Track: Publicidad Pagada (Ads) ──────────────────────────────────────────
  {
    id: 'ads-1',
    number: 45,
    title: 'Fundamentos de publicidad digital',
    description: 'Entiende el ecosistema de paid media: plataformas, métricas clave y cómo pensar en campañas antes de gastar un solo peso.',
    duration: '2 semanas',
    status: 'available',
    track: 'ads',
    lessons: [
      {
        id: 'ads-1-1',
        title: 'El ecosistema de publicidad digital: cómo funciona el dinero',
        type: 'reading',
        content: '## Por qué paid media existe y cómo funciona\n\nCuando pagas publicidad en Meta o Google, no compras impresiones al azar — compras acceso a subasta. Cada vez que alguien carga una página o un feed, hay una subasta en milisegundos entre todos los anunciantes que quieren mostrarle algo a esa persona. El anuncio que gana la subasta se muestra. Eso es paid media.\n\n## Las dos grandes plataformas para agencias\n\n**Meta Ads (Facebook + Instagram)**: publicidad basada en audiencias. Defines QUIÉN ve tu anuncio (demografía, intereses, comportamientos, lookalikes). Ideal para awareness, engagement y conversión B2C.\n\n**Google Ads (Search + Display)**: publicidad basada en intención. Defines QUÉ BUSCAN las personas. Ideal para capturar demanda existente — cuando alguien ya está buscando lo que tu cliente vende.\n\n## Las métricas que debes dominar desde el día 1\n\n**CPM (Costo por Mil Impresiones)**: cuánto pagas para que tu anuncio se vea 1,000 veces. Mide eficiencia de distribución.\n\n**CPC (Costo por Clic)**: cuánto pagas cada vez que alguien hace clic. Mide eficiencia del creativo + audiencia.\n\n**CTR (Click-Through Rate)**: porcentaje de personas que ven el anuncio y hacen clic. CTR alto = anuncio relevante. CTR bajo = el mensaje o la audiencia están mal.\n\n**CPA (Costo por Adquisición)**: cuánto cuesta conseguir una conversión (lead, compra, registro). La métrica más importante para el cliente.\n\n**ROAS (Return on Ad Spend)**: ingresos generados ÷ dinero gastado en ads. ROAS de 3x = por cada $1 invertido, el cliente genera $3 en ventas. El norte de cualquier campaña de e-commerce.\n\n## La relación entre presupuesto y aprendizaje\n\nLos algoritmos de Meta y Google necesitan datos para optimizar. Si tu presupuesto diario es de $5, el algoritmo tardará semanas en aprender. La regla práctica: necesitas al menos 50 conversiones por semana para que el algoritmo salga de la fase de aprendizaje. Eso define el presupuesto mínimo viable para cada cliente.',
        tasks: [
          'Crea cuentas de práctica en Meta Business Manager y Google Ads (ambas son gratis para configurar)',
          'Para un negocio real o ficticio, define: ¿Meta Ads, Google Ads, o ambos? Justifica la decisión con base en si están capturando demanda o creando demanda',
          'Calcula el presupuesto mínimo mensual recomendado para ese negocio basándote en la regla de 50 conversiones/semana',
        ],
        tip: 'Antes de activar cualquier campaña de un cliente nuevo, instala el pixel de Meta y la etiqueta de Google antes de gastar un peso. Sin tracking correcto, los datos no sirven.',
        completed: false,
      },
      {
        id: 'ads-1-2',
        title: 'Estructura de campaña: cómo organizar tu dinero',
        type: 'reading',
        content: '## La jerarquía de una cuenta de ads\n\nTanto Meta como Google organizan las campañas en 3 niveles:\n\n**Campaña**: define el objetivo (tráfico, conversiones, reconocimiento) y el presupuesto total. Una campaña = un objetivo de negocio.\n\n**Conjunto de anuncios / Grupo de anuncios**: define la audiencia (Meta) o las palabras clave (Google), el presupuesto diario y la programación. Un conjunto = una audiencia o segmento.\n\n**Anuncio**: el creativo que ve el usuario — imagen, video, texto, CTA. Varios anuncios por conjunto te permiten testear qué funciona.\n\n## La estrategia de embudo para paid media\n\nNo todas las personas están listas para comprar en el mismo momento. Un error clásico: gastar todo el presupuesto en conversión para personas que nunca han oído del cliente.\n\n**Tope de embudo (ToFu)**: audiencias frías. Personas que no conocen la marca. Objetivo: awareness o tráfico. Creativos: educativos, storytelling, problema → solución.\n\n**Medio de embudo (MoFu)**: audiencias tibias. Personas que interactuaron con el contenido o visitaron el sitio. Objetivo: engagement o leads. Creativos: beneficios, comparaciones, testimoniales.\n\n**Fondo de embudo (BoFu)**: audiencias calientes. Visitantes del sitio, carritos abandonados, clientes previos. Objetivo: conversión. Creativos: oferta directa, urgencia, garantías.\n\n## Testing sistemático: la única forma de mejorar\n\nNunca cambies más de una variable a la vez. Si cambias la imagen Y el texto al mismo tiempo, no sabes cuál causó el cambio en resultados. Testea: una variable por experimento, mínimo 7 días por test, un ganador claro antes de testear otra cosa.',
        tasks: [
          'Dibuja el embudo ToFu/MoFu/BoFu para un negocio de e-commerce y define qué tipo de anuncio va en cada etapa',
          'Para una campaña ficticia con $1,000 de presupuesto mensual, distribuye el dinero entre los 3 niveles del embudo y justifica la distribución',
          'Diseña un plan de testing de 3 semanas para una campaña: qué variable testeas cada semana y cómo defines el ganador',
        ],
        tip: 'Una cuenta de ads bien estructurada tiene pocas campañas con propósito claro — no 20 campañas activas que compiten entre sí y encarecen el CPM.',
        completed: false,
      },
      {
        id: 'ads-1-3',
        title: 'Creativos que convierten: la diferencia real en paid media',
        type: 'practice',
        content: '## Por qué el creativo es la palanca más poderosa\n\nEl algoritmo de Meta puede encontrar a la audiencia correcta, pero no puede hacer que un anuncio malo sea bueno. En 2024-2025, con los algoritmos de Advantage+, el targeting se automatizó casi por completo. Lo que diferencia campañas exitosas de fracasadas es el creativo.\n\n## Los 3 segundos que importan\n\nEn un feed móvil, tienes 3 segundos para capturar atención antes de que el usuario haga scroll. El primer frame de tu video o la primera línea de tu texto define si alguien se detiene o no.\n\nFormatos de hook que funcionan:\n- Pregunta que identifica al target: "¿Eres dueño de restaurante en CDMX?"\n- Afirmación disruptiva: "La mayoría de sitios web pierden el 70% de su tráfico en la primera pantalla"\n- Beneficio inmediato: "Cómo conseguí 50 leads en 7 días con $200 en Meta Ads"\n- Mención directa del pain point: "Si tus anuncios de Meta no convierten, este video es para ti"\n\n## Formatos de creativo por objetivo\n\n**Video vertical (9:16)**: el formato de mayor alcance orgánico en Meta. Ideal para awareness. Duración: 15-30 segundos.\n\n**Imagen estática con texto**: mayor control de mensaje. Ideal para ofertas directas y retargeting.\n\n**Carrusel**: múltiples imágenes en un solo anuncio. Ideal para mostrar features, pasos de un proceso, o catálogo de productos.\n\n**UGC (User-Generated Content)**: video grabado con celular, estilo "testimonio real". El formato con mayor CTR en 2024-2025 porque se percibe como contenido orgánico, no publicidad.',
        tasks: [
          'Escribe 5 hooks diferentes para el mismo producto/servicio: 2 preguntas, 2 afirmaciones disruptivas, 1 beneficio inmediato',
          'Para un cliente de tu portafolio (real o ficticio), define los 3 formatos de creativo que usarías en cada etapa del embudo y por qué',
          'Encuentra 3 anuncios reales en Meta Ad Library (library.facebook.com) que consideres efectivos y analiza: qué hace bien el hook, el formato y el CTA',
        ],
        tip: 'La Biblioteca de Anuncios de Meta (Meta Ad Library) es pública y gratuita. Es la mejor fuente de inspiración y benchmarking para creativos. Revísala antes de cualquier campaña nueva.',
        completed: false,
      },
      {
        id: 'ads-1-exam',
        title: 'Examen: Fundamentos de Publicidad Digital',
        type: 'exam',
        content: 'Valida tus conocimientos de paid media antes de pasar a la ejecución en plataformas.',
        questions: [
          {
            q: '¿Cuál es la diferencia fundamental entre Meta Ads y Google Ads en términos de targeting?',
            options: [
              'Meta Ads es más barato; Google Ads es más caro',
              'Meta Ads se basa en audiencias (quién eres); Google Ads se basa en intención (qué buscas)',
              'Meta Ads solo funciona para B2C; Google Ads solo para B2B',
              'Meta Ads usa imágenes; Google Ads solo usa texto',
            ],
            correct: 1,
            explanation: 'La distinción más importante: Meta Ads te permite definir quién ve tu anuncio (intereses, demografía, comportamientos). Google Ads te permite capturar a personas en el momento exacto en que buscan algo. Ambos enfoques tienen su lugar dependiendo de si quieres crear demanda (Meta) o capturar demanda existente (Google).',
          },
          {
            q: '¿Qué significa ROAS de 4x?',
            options: [
              'El anuncio se mostró 4 veces por cada peso gastado',
              'El CTR del anuncio es 4 veces mayor al promedio del sector',
              'Por cada $1 invertido en ads, se generaron $4 en ventas',
              'El CPA es 4 veces menor que el valor promedio del cliente',
            ],
            correct: 2,
            explanation: 'ROAS = Ingresos / Gasto en ads. Un ROAS de 4x significa que por cada $1 gastado en publicidad, el negocio generó $4 en ventas. Es la métrica norte para campañas de e-commerce. Un ROAS mínimo rentable depende del margen del negocio — si el margen es del 30%, necesitas mínimo ROAS de 3.3x para no perder dinero.',
          },
          {
            q: '¿Por qué el creativo se considera la palanca más importante en Meta Ads en 2025?',
            options: [
              'Porque Meta ya no permite segmentación por intereses',
              'Porque los algoritmos de Advantage+ automatizan el targeting, dejando el creativo como principal diferenciador',
              'Porque los creativos de video son más baratos que las imágenes',
              'Porque el CTR afecta directamente el Quality Score de la cuenta',
            ],
            correct: 1,
            explanation: 'Con la evolución de Advantage+ y los algoritmos de targeting automático, Meta encuentra la audiencia correcta con muy poca guía manual. Esto hace que el creativo sea lo que más importa: el algoritmo puede encontrar a quién mostrarle el anuncio, pero no puede hacer que un mensaje malo sea bueno.',
          },
          {
            q: 'En la estructura de embudo (ToFu/MoFu/BoFu), ¿qué audiencia corresponde al BoFu y qué tipo de creativo funciona mejor?',
            options: [
              'Audiencias frías; creativos educativos y de awareness',
              'Audiencias por intereses; creativos de storytelling y problema/solución',
              'Visitantes del sitio y clientes previos; creativos de oferta directa con urgencia',
              'Seguidores de la cuenta; creativos de engagement con preguntas',
            ],
            correct: 2,
            explanation: 'BoFu (Bottom of Funnel) son las audiencias más calientes: personas que ya visitaron el sitio, abandonaron el carrito, o son clientes previos. Ya conocen la marca, así que no necesitan educación — necesitan el empujón final: una oferta directa, urgencia, garantía, o social proof específico.',
          },
          {
            q: '¿Cuántas conversiones semanales mínimas necesita el algoritmo de Meta para salir de la "fase de aprendizaje"?',
            options: [
              '10 conversiones por semana',
              '25 conversiones por semana',
              '50 conversiones por semana',
              '100 conversiones por semana',
            ],
            correct: 2,
            explanation: 'Meta recomienda al menos 50 eventos de conversión por semana por conjunto de anuncios para que el algoritmo salga de la fase de aprendizaje y pueda optimizar correctamente. Con menos datos, el algoritmo no tiene suficiente señal y el costo por resultado es más alto e impredecible.',
          },
        ],
        completed: false,
      },
          {
        id: 'ads-1-proj-basico',
        title: 'Proyecto Básico: Plan de ads para negocio local',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Diseña el plan de paid media para un negocio local con $300 USD de presupuesto mensual.',
        deliverables: [
          'Elección de plataforma (Meta Ads, Google Ads o ambas) con justificación',
          'Distribución del presupuesto: cuánto a qué canal y por qué',
          'Estructura de campaña: objetivo, 1-2 audiencias y tipo de creativo para cada etapa del embudo',
          '3 ideas de creativo (hook + formato + mensaje principal)',
          'KPIs esperados: CPM, CPC y CPA objetivo basados en benchmarks del sector',
        ],
        tip: 'Con $300/mes no puedes estar en todas partes. Elige el canal donde está la audiencia con mayor intención y conéntrate ahí.',
        completed: false,
      },

    {
      id: 'ads-1-p2',
      title: 'Proyecto: Estructura de campaña en Meta',
      type: 'project',
      difficulty: 'básico',
      projectBrief: 'Sin gastar dinero, crea en el Administrador de Anuncios de Meta una campaña completa con estructura real: campaña → conjunto de anuncios → anuncios. Usa el modo borrador.',
      deliverables: [
        'Captura de pantalla de la estructura completa',
        'Documento con objetivo elegido y justificación',
        'Copy del anuncio escrito (headline + descripción)',
      ],
      rubrica: [
        'Estructura de 3 niveles correcta',
        'Objetivo de campaña apropiado para el caso de negocio',
        'Copy coherente con el objetivo',
      ],
      completed: false,
    },],
    resources: [
      { title: 'Meta Ads Library — espionaje legal de creativos de competidores', url: 'https://www.facebook.com/ads/library', type: 'tool' },
      { title: 'Google Ads — plataforma oficial', url: 'https://ads.google.com', type: 'tool' },
      { title: 'Biblioteca de recursos de Meta for Business', url: 'https://www.facebook.com/business/learn', type: 'documentation' },
    ],
  },
  {
    id: 'ads-2',
    number: 46,
    title: 'Meta Ads: Facebook e Instagram',
    description: 'Configura, lanza y optimiza campañas reales en Meta Ads. Audiencias, creativos y optimización para resultados medibles.',
    duration: '3 semanas',
    status: 'available',
    track: 'ads',
    lessons: [
      {
        id: 'ads-2-1',
        title: 'Configuración del ecosistema Meta: Pixel, Business Manager y catálogos',
        type: 'practice',
        content: '## El setup que muchos saltean y luego lamentan\n\nAntes de gastar un peso en Meta Ads, debes configurar correctamente el backend. Una campaña bien ejecutada sobre un tracking malo produce datos que llevan a decisiones equivocadas.\n\n## Meta Business Manager\n\nEs el hub que centraliza todo: páginas de Facebook, cuentas publicitarias, píxeles, catálogos de productos y accesos del equipo. Cada cliente debe tener su propio Business Manager — no trabajes con la cuenta personal de ads del cliente ni con tu cuenta mezclada.\n\n## Meta Pixel (ahora Meta Pixel + Conversions API)\n\nEl Pixel es el código JavaScript que instalas en el sitio del cliente y que registra eventos: PageView, ViewContent, AddToCart, Purchase, Lead, etc. Sin Pixel, Meta no sabe qué hacen los usuarios después de hacer clic en el anuncio.\n\nEn 2024-2025, solo el Pixel no es suficiente porque iOS 14+ y los bloqueadores de ads impiden que el Pixel dispare en ~30-40% de eventos. La solución: Conversions API (CAPI) — envía los eventos desde el servidor, no desde el navegador. Configurar CAPI es ahora obligatorio para campañas serias.\n\n## Audiencias en Meta: los 3 tipos\n\n**Audiencias core (intereses y demografía)**: defines tú manualmente. Ej: mujeres 25-45, Ciudad de México, interés en skincare. Útil para testear hipótesis iniciales.\n\n**Audiencias personalizadas (Custom Audiences)**: basadas en datos propios — visitantes del sitio, lista de emails, video viewers, personas que interactuaron con tu cuenta. Son las más valiosas porque ya hay una relación.\n\n**Audiencias similares (Lookalike)**: Meta encuentra personas con perfil similar a una Custom Audience tuya. El 1% lookalike de tus compradores suele ser la audiencia de mayor conversión.',
        tasks: [
          'Configura un Business Manager de práctica y agrega una cuenta publicitaria de prueba',
          'Instala el Meta Pixel en un sitio de práctica (usa el Event Tester de Meta para verificar que dispara correctamente)',
          'Crea las 3 audiencias base para un cliente ficticio: Core (intereses), Custom (visitantes del sitio últimos 30 días) y Lookalike 1% de compradores',
        ],
        tip: 'Nunca trabajes directo en la cuenta personal de un cliente. Siempre pide acceso como Partner a través del Business Manager. Si el cliente cierra la relación, no pierdes acceso a las cuentas de otros clientes.',
        completed: false,
      },
      {
        id: 'ads-2-2',
        title: 'Lanzar y optimizar campañas: del borrador al resultado',
        type: 'practice',
        content: '## El flujo de lanzamiento de una campaña\n\n**1. Define el objetivo de negocio primero**: ¿qué quiere lograr el cliente? Más ventas, más leads, más awareness. El objetivo de Meta debe mapear directamente al objetivo de negocio.\n\n**2. Elige el objetivo de campaña correcto en Meta**: Ventas (Sales) → para e-commerce con píxel. Leads → para capturar datos de contacto. Tráfico → para llevar gente al sitio. Alcance → para maximizar impresiones únicas.\n\n**3. Configura el conjunto de anuncios**: audiencia, presupuesto, programación, placements. En 2025, usar Advantage+ Placements (Meta elige dónde mostrar) suele dar mejores resultados que seleccionar placements manualmente.\n\n**4. Crea los anuncios**: mínimo 3 variantes por conjunto para testing inicial.\n\n**5. Revisa y lanza**: usa el Inspector de anuncios para verificar que todo esté correcto antes de publicar.\n\n## Métricas de optimización\n\nPrimera semana: no toques nada. El algoritmo está aprendiendo. Revisar, pero no modificar.\n\nDespués de 7 días y 50+ conversiones: revisa qué conjuntos de anuncios tienen mejor CPA. Pausa los que están >2x el CPA objetivo. Escala presupuesto en los que están por debajo.\n\nEscalado: aumenta el presupuesto máximo 20-30% cada 3-4 días. Incrementos bruscos reinician el aprendizaje.\n\n## Señales de que una campaña está fallando (y qué hacer)\n\nCTR bajo (<0.5%): el creativo o el hook no captan atención. Cambia el creativo.\nCPC alto con CTR normal: la audiencia es cara o hay mucha competencia. Prueba otra audiencia.\nCTR alto pero CPA alto: el problema está en el sitio (landing page), no en el anuncio.',
        tasks: [
          'Lanza una campaña de prueba (puedes usar $1/día de presupuesto) con 3 variantes de creativo para el mismo conjunto de anuncios',
          'Después de 5 días, analiza el performance: CPM, CTR y CPC de cada variante. Identifica la ganadora y justifica por qué',
          'Escribe el diagnóstico para este escenario: CTR del 2%, CPC de $0.15, pero CPA de conversión de $120 cuando el objetivo es $30. ¿Dónde está el problema?',
        ],
        tip: 'Cuando el CTR es alto pero el CPA es desastroso, el problema no es el anuncio — es lo que pasa después del clic. Revisa la landing page: velocidad, mensaje consistente con el anuncio, y CTA claro.',
        completed: false,
      },
      {
        id: 'ads-2-3',
        title: 'Reporteo de Meta Ads para clientes: cómo presentar resultados',
        type: 'reading',
        content: '## La brecha entre los datos de Meta y lo que entiende el cliente\n\nMeta Ads Manager muestra 50+ métricas. El cliente no necesita ver 50 métricas — necesita entender si la inversión está funcionando o no. Tu trabajo como agencia es traducir datos técnicos en lenguaje de negocio.\n\n## Las 5 métricas que SÍ debe ver el cliente\n\n1. **Gasto**: cuánto se invirtió en el período\n2. **Resultados**: cuántas conversiones/leads/ventas se generaron\n3. **CPA/CPL**: cuánto costó cada resultado\n4. **ROAS**: retorno sobre inversión (si hay e-commerce)\n5. **Tendencia**: ¿está mejorando o empeorando vs. período anterior?\n\n## Estructura del reporte mensual\n\n**Executive Summary (1 párrafo)**: qué pasó este mes en lenguaje simple. "Generamos 87 leads a $18 promedio cada uno, 23% menos que el mes pasado gracias a la nueva variante de creativo de testimoniales."\n\n**Resultados vs. objetivo**: tabla simple con objetivo, resultado y variación porcentual.\n\n**Aprendizajes**: qué funcionó y por qué. Qué no funcionó y por qué.\n\n**Próximos pasos**: qué testearemos el mes que viene y por qué.\n\n## Herramientas de reporte\n\nLooker Studio (gratis, conecta directo a Meta Ads y Google Analytics) es el estándar de la industria para reportes de clientes. Crea un dashboard una vez y actualiza automáticamente cada mes.',
        tasks: [
          'Crea un template de reporte mensual de Meta Ads en Google Docs o Notion con las 5 métricas clave y las 4 secciones (executive summary, resultados vs objetivo, aprendizajes, próximos pasos)',
          'Conecta una cuenta de Meta Ads a Looker Studio y configura un dashboard básico con las métricas que mostrarías al cliente',
          'Para estos datos ficticios: gasto $1,200, leads 94, objetivo de leads 80, CPL $12.76, CPL objetivo $15 — escribe el executive summary de 3 líneas que enviarías al cliente',
        ],
        tip: 'Envía el reporte el mismo día del mes siempre (ej: el día 5 de cada mes). La consistencia construye confianza. Un cliente que sabe que el reporte llega el día 5 hace menos preguntas durante el mes.',
        completed: false,
      },
          {
        id: 'ads-2-proj-inter',
        title: 'Proyecto Intermedio: Set completo de creativos para Meta Ads',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Crea el set completo de creativos para una campaña de Meta Ads en los 3 niveles del embudo.',
        deliverables: [
          'ToFu (awareness): 2 hooks diferentes escritos + descripción del concepto visual + copy del anuncio',
          'MoFu (consideración): 1 carrusel de 4 slides con copy de cada slide y el CTA',
          'BoFu (conversión): 1 anuncio de oferta directa con urgencia legítima y garantía',
          'Para cada anuncio: asunto del hook, copy principal, CTA y audiencia objetivo',
          'Justificación de por qué cada creativo es adecuado para su etapa del embudo',
        ],
        tip: 'El creativo de BoFu debe asumir que el prospecto ya sabe quién eres. No te presentes de nuevo — presenta la razón de actuar ahora.',
        completed: false,
      },
],
    resources: [
      { title: 'Meta Blueprint — cursos oficiales de Meta Ads', url: 'https://www.facebook.com/business/learn/courses', type: 'course' },
      { title: 'Looker Studio — reportes de ads para clientes', url: 'https://lookerstudio.google.com', type: 'tool' },
    ],
  },
  {
    id: 'ads-3',
    number: 47,
    title: 'Google Ads: Search, Display y Performance Max',
    description: 'Domina Google Ads para capturar demanda existente. Keywords, estructura de campañas y optimización de Search y PMax.',
    duration: '2 semanas',
    status: 'available',
    track: 'ads',
    lessons: [
      {
        id: 'ads-3-1',
        title: 'Google Search Ads: capturar intención de compra',
        type: 'reading',
        content: '## La ventaja de Google Search: el usuario ya levantó la mano\n\nCuando alguien busca "agencia de diseño web Ciudad de México", ya tiene intención. No necesitas convencerlos de que tienen el problema — ya lo saben y están buscando solución. Ese es el poder único de Google Search.\n\n## Estructura de una campaña de Search\n\n**Nivel campaña**: define el presupuesto diario y la estrategia de puja (CPC manual, Maximizar conversiones, tCPA).\n\n**Nivel grupo de anuncios**: agrupa keywords relacionadas semánticamente. Regla de oro: una temática por grupo de anuncios. No mezcles "agencia de diseño web" con "precios de landing page" en el mismo grupo.\n\n**Nivel anuncio**: los Responsive Search Ads (RSA) de Google te piden 15 headlines y 4 descriptions. Google prueba combinaciones automáticamente. Mínimo 2 RSA por grupo de anuncios.\n\n## Tipos de concordancia de keywords\n\n**Concordancia amplia**: tu anuncio puede mostrarse para búsquedas relacionadas pero no exactas. Alta cobertura, menor relevancia. Más cara en términos de conversión.\n\n**Concordancia de frase**: tu anuncio se muestra cuando la búsqueda contiene tu frase en ese orden. Ej: "agencia de diseño" aparece para "mejor agencia de diseño web" pero no para "diseño agencia".\n\n**Concordancia exacta**: tu anuncio solo aparece para esa keyword o variantes muy cercanas. Máxima relevancia, menor volumen.\n\n## Quality Score: la métrica que baja tu costo\n\nGoogle asigna un Quality Score (1-10) basado en: relevancia del anuncio, CTR esperado y experiencia en la landing page. Un Quality Score alto baja tu CPC y mejora tu posición en la subasta. La clave: que el anuncio, la keyword y la landing page hablen del mismo tema.',
        tasks: [
          'Para un cliente ficticio (escoge un tipo de negocio), investiga 20 keywords con Google Keyword Planner. Agrúpalas en 3-4 grupos de anuncios temáticos',
          'Escribe un RSA completo (5 headlines + 2 descriptions) para el grupo de anuncios principal. Verifica que haya consistencia entre keyword, headline y lo que encontraría en la landing',
          'Identifica 10 keywords negativas que agregarías desde el inicio para evitar clics irrelevantes',
        ],
        tip: 'Las keywords negativas son tan importantes como las keywords objetivo. "Gratis", "tutoriales", "cómo hacer", "DIY" suelen ser negativas universales si vendes servicios profesionales.',
        completed: false,
      },
      {
        id: 'ads-3-2',
        title: 'Performance Max y Display: cobertura total del ecosistema Google',
        type: 'reading',
        content: '## Performance Max: la campaña que lo automatiza todo\n\nPerformance Max (PMax) es la campaña más reciente de Google y la que más presupuesto está consumiendo en 2024-2025. Aparece en todos los inventarios de Google: Search, Display, YouTube, Gmail, Maps y Shopping. El algoritmo decide dónde y cuándo mostrar tu anuncio.\n\nVentaja: máxima cobertura con una sola campaña.\nDesventaja: poca visibilidad sobre qué está funcionando. Los reportes son más limitados que Search.\n\n## Qué necesitas para PMax\n\n**Assets**: Google construye los anuncios con lo que le das. Proporciona: 5+ imágenes (varios formatos), 5+ logos, 3-5 videos (si los tienes), 5 headlines cortos, 5 headlines largos, 5 descriptions, y el signal de audiencia (tus mejores audiencias de cliente).\n\n**Señales de audiencia**: aunque PMax decide solo, puedes darle señales de por dónde empezar: custom audiences basadas en keywords, listas de remarketing, similar audiences. El algoritmo las toma como punto de partida, no como restricción.\n\n## Google Display: remarketing y awareness\n\nDisplay es la red de millones de sitios web donde aparecen los banners de Google. Su mejor uso: remarketing. Personas que visitaron el sitio ven tus banners mientras navegan por otros sitios. Funciona bien para recordarle al usuario que ya vio tu oferta.',
        tasks: [
          'Prepara el asset group completo para una campaña PMax ficticia: lista todos los assets que necesitas con sus especificaciones (dimensiones de imágenes, duración de videos, caracteres de texto)',
          'Diseña la estrategia de remarketing para Display: ¿qué audiencias crearía (visitantes del sitio últimos 7 días, 30 días, visitantes de página de precios) y qué mensaje diferente usaría para cada una?',
          'Compara Search vs. PMax para un cliente de servicios B2B: ¿cuándo usarías cada uno y por qué?',
        ],
        tip: 'Para clientes nuevos sin historial de conversiones, empieza con Search antes de PMax. PMax necesita datos de conversión para optimizar bien — sin historial, gasta el presupuesto en placements de Display poco rentables.',
        completed: false,
      },
    ],
    resources: [
      { title: 'Google Skillshop — certificaciones oficiales de Google Ads', url: 'https://skillshop.withgoogle.com', type: 'certification' },
      { title: 'Google Keyword Planner', url: 'https://ads.google.com/home/tools/keyword-planner', type: 'tool' },
    ],
  },
  {
    id: 'ads-capstone',
    number: 48,
    title: 'Proyecto: Campaña completa de Paid Media',
    description: 'Diseña y documenta una estrategia de paid media completa para un cliente real o ficticio, con Meta Ads y Google Ads.',
    duration: '2 semanas',
    status: 'available',
    track: 'ads',
    lessons: [
      {
        id: 'ads-capstone-1',
        title: 'Proyecto: Plan de Paid Media de 90 días',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: 'Eres la agencia de paid media de un negocio que quieres (puede ser ficticio). Tienen $3,000 USD de presupuesto mensual para invertir en paid media durante 3 meses. Tu entregable es el plan estratégico completo que presentarías al cliente antes de arrancar.',
        deliverables: [
          'Análisis inicial: definición del cliente ideal, competidores en ads (usa Meta Ad Library y Google), y 3 diferenciadores del negocio',
          'Distribución de presupuesto: cuánto va a Meta Ads, cuánto a Google Ads, cuánto a testing, y justificación',
          'Estrategia de Meta Ads: estructura de campaña (objetivos, conjuntos, audiencias), 3 conceptos de creativo para cada etapa del embudo (ToFu/MoFu/BoFu)',
          'Estrategia de Google Ads: 3-4 grupos de anuncios con keyword list de 10 keywords cada uno + 10 keywords negativas',
          'KPIs y objetivos: qué métricas medirás, cuáles son los benchmarks del sector y qué resultados esperas en los 3 meses',
          'Plan de optimización: qué revisarás semanalmente y qué decisiones tomarás si los resultados están por encima/debajo del objetivo',
          'Template del reporte mensual que enviarías al cliente',
        ],
        tasks: [
          'Arma el documento completo con todas las secciones y compártelo en #proyecto-ads con el link',
          'Presenta el plan en 5 minutos en la siguiente mentoría (o en un video grabado) como si fuera el pitch al cliente',
          'Comenta el plan de al menos 2 compañeros con feedback específico sobre la distribución de presupuesto y la estrategia de creativos',
        ],
        tip: 'El plan de paid media más valioso no es el más sofisticado — es el que el cliente puede entender y aprobar. Presenta con claridad, no con jerga técnica.',
        completed: false,
      },
    ],
    resources: [
      { title: 'Meta Ad Library — investiga qué anuncios corren tus competidores', url: 'https://www.facebook.com/ads/library', type: 'tool' },
    ],
  },

  // ─── Track: Email Marketing ───────────────────────────────────────────────────
  {
    id: 'email-1',
    number: 49,
    title: 'Fundamentos de email marketing',
    description: 'El canal con mejor ROI del marketing digital. Aprende a construir listas de calidad, segmentar y enviar emails que la gente abre.',
    duration: '2 semanas',
    status: 'available',
    track: 'email',
    lessons: [
      {
        id: 'email-1-1',
        title: 'Por qué el email sigue siendo el canal #1 de ROI',
        type: 'reading',
        content: '## El canal más subestimado del marketing digital\n\nMientras todos hablan de TikTok y Meta Ads, el email marketing sigue generando el ROI más alto de cualquier canal digital: $42 por cada $1 invertido según las últimas estadísticas del sector. En 2025, con la saturación de las redes sociales y el aumento de CPMs en paid media, el email está viviendo un renacimiento.\n\n## Por qué el email es diferente a las redes sociales\n\n**Propiedad de la audiencia**: tu lista de email es tuya. Instagram puede cambiar el algoritmo mañana y hundir tu alcance. La lista de emails no desaparece ni cambia las reglas.\n\n**Alta intención**: quien se suscribió a tu lista eligió recibirte. El nivel de atención es mucho mayor que en redes sociales donde el contenido compite con todo el feed.\n\n**Personalización real**: puedes segmentar y personalizar emails basándote en comportamiento, historial de compras, etapa del funnel y decenas de variables más.\n\n**Automatizable**: a diferencia de redes sociales que requieren presencia constante, el email funciona 24/7 con secuencias automatizadas.\n\n## Métricas clave de email marketing\n\n**Open Rate**: porcentaje de personas que abren el email. Benchmarks: 20-25% es bueno, 30%+ es excelente (varía por industria).\n\n**Click-Through Rate (CTR)**: porcentaje de personas que hacen clic en un enlace. 2-5% es normal; 10%+ indica email muy relevante.\n\n**Unsubscribe Rate**: si supera el 0.5% por email, hay un problema con la relevancia del contenido o la frecuencia de envío.\n\n**Deliverability**: el porcentaje de emails que llegan a la bandeja de entrada (no spam). Afectado por la reputación del dominio, la calidad de la lista y el contenido.\n\n## Las 3 cosas que matan una lista de email\n\n1. Comprar listas de emails (genera spam reports, destruye deliverability)\n2. Enviar a personas que no se suscribieron (ilegal en GDPR y CAN-SPAM)\n3. No limpiar la lista regularmente (los emails inválidos dañan la reputación del dominio)',
        tasks: [
          'Investiga el open rate promedio para la industria de tu cliente más reciente (o ficticio). ¿Está por encima o por debajo del benchmark de su sector?',
          'Revisa las últimas 10 newsletters que recibiste. Anota: qué te hizo abrir cada una (asunto + preview) y qué hizo que hacieras clic (o no) dentro',
          'Elige una herramienta de email marketing para tus clientes: Brevo (ex-Sendinblue), Mailchimp, Klaviyo o Resend. Justifica la elección según el tipo de cliente que atenderás',
        ],
        tip: 'El asunto del email decide si se abre o no. El contenido decide si se hace clic o no. Son dos problemas distintos que se optimizan por separado.',
        completed: false,
      },
      {
        id: 'email-1-2',
        title: 'Construir una lista de calidad: lead magnets y formularios',
        type: 'reading',
        content: '## Lista grande vs. lista buena\n\nUna lista de 500 personas que eligieron suscribirse porque quieren lo que ofreces vale más que 10,000 emails comprados o recolectados sin permiso claro. La calidad de la lista determina el deliverability, el open rate y el revenue generado.\n\n## Cómo crecer una lista de forma orgánica\n\n**Lead magnets**: algo de valor que das a cambio del email. Funciona mejor cuando es:\n- Específico (no \'newsletter\', sino \'Guía de 5 pasos para...\')\n- Inmediatamente útil (PDF descargable, checklist, mini-curso)\n- Directamente relacionado con el problema que resuelves\n\nEjemplos efectivos para agencias:\n- Checklist de auditoría SEO de 10 puntos\n- Template de propuesta para freelancers\n- Guía de precios para servicios de diseño\n- Calculadora de ROI de email marketing\n\n**Formularios de suscripción**: colócalos donde el tráfico ya existe. Las posiciones de mayor conversión: exit-intent popup (justo antes de que cierren la ventana), inline dentro del contenido relevante, y al final de artículos del blog.\n\n**Contenido que genera suscriptores**: los artículos que más se comparten y llegan a audiencias nuevas también son los que más suscriben. Escribe contenido tan bueno que la gente quiera saber cuándo publiques el próximo.\n\n## Segmentación desde el inicio\n\nNo esperes a tener 10,000 suscriptores para segmentar. Desde el primer día, etiqueta a los suscriptores según cómo llegaron (qué lead magnet descargaron, qué página visitaron, qué producto les interesa). Esta información vale oro para la personalización posterior.',
        tasks: [
          'Diseña 3 ideas de lead magnet para un negocio de tu elección: nombre, formato y por qué resuelve un problema específico del suscriptor objetivo',
          'Crea el formulario de suscripción para uno de los lead magnets usando Brevo, Mailchimp o la herramienta de tu elección',
          'Define 3 etiquetas/tags que aplicarías a los suscriptores desde el día 1 para segmentar la lista correctamente',
        ],
        tip: 'El mejor lead magnet no es el más elaborado — es el que resuelve la duda más urgente que tiene tu prospecto ideal en este momento.',
        completed: false,
      },
      {
        id: 'email-1-3',
        title: 'Anatomía de un email que convierte',
        type: 'practice',
        content: '## Los 5 elementos de un email efectivo\n\n**1. Asunto (Subject Line)**: el único trabajo del asunto es lograr que abran. Prueba formatos: pregunta directa, número concreto, curiosidad con gap, urgencia legítima, personalización con nombre.\n\n**2. Preview text**: las 40-100 caracteres que aparecen después del asunto en la bandeja de entrada. Tratalos como parte del asunto — muchas personas deciden abrir basándose en asunto + preview juntos.\n\n**3. Apertura**: los primeros dos renglones del email. Deben continuar la promesa del asunto, no empezar con "Hola, soy X y hoy quiero hablarte de...". Ve directo al valor.\n\n**4. Cuerpo**: el contenido principal. En emails de ventas o nurturing: una idea central por email. No trates de decir todo en un solo envío.\n\n**5. CTA (Call to Action)**: un solo CTA por email. Si hay múltiples links, el suscriptor no sabe en cuál hacer clic y no hace clic en ninguno.\n\n## Formatos de email según el objetivo\n\n**Email de valor puro**: enseña algo, no pide nada a cambio. Construye confianza.\n\n**Email de historia**: una narrativa personal que conecta emocionalmente antes de llevar a un punto o una oferta.\n\n**Email de producto/oferta**: directo, claro sobre el beneficio, urgencia legítima, CTA obvio.\n\n**Email de social proof**: testimoniales, casos de estudio, resultados de clientes. Para el suscriptor que está en MoFu.\n\n**Email de re-engagement**: para suscriptores inactivos. Pregunta directa: "¿Sigues queriendo recibir esto?"',
        tasks: [
          'Escribe un email de valor puro (200-300 palabras) para el negocio que elegiste: asunto, preview text y cuerpo con 1 CTA',
          'Crea 5 variantes de asunto para ese mismo email y califica cada una del 1-10 según tu criterio. Justifica la calificación más alta',
          'Rediseña este asunto débil: "Newsletter de [Nombre de empresa] — Enero 2025". Crea 3 versiones que aumentarían el open rate',
        ],
        tip: 'A/B testea el asunto del email siempre que puedas. Envía variante A al 25% de la lista, variante B al 25%, y la ganadora al 50% restante. En 4 semanas tendrás data real sobre qué funciona con tu audiencia.',
        completed: false,
      },
      {
        id: 'email-1-exam',
        title: 'Examen: Fundamentos de Email Marketing',
        type: 'exam',
        content: 'Valida tus conocimientos de email marketing antes de avanzar a automatización.',
        questions: [
          {
            q: '¿Cuál es el ROI promedio que genera el email marketing por cada dólar invertido?',
            options: ['$8 por cada $1', '$20 por cada $1', '$42 por cada $1', '$100 por cada $1'],
            correct: 2,
            explanation: 'El email marketing genera en promedio $42 por cada $1 invertido, el ROI más alto de cualquier canal digital. Esto lo hace especialmente valioso para agencias que quieren demostrar resultados medibles a sus clientes con presupuestos limitados.',
          },
          {
            q: '¿Qué es el "preview text" en un email y por qué importa?',
            options: [
              'El texto que aparece en el cuerpo del email antes del contenido principal',
              'Los 40-100 caracteres que se ven en la bandeja de entrada después del asunto',
              'El footer legal que incluye el enlace de desuscripción',
              'El texto alternativo de las imágenes del email',
            ],
            correct: 1,
            explanation: 'El preview text es el texto que aparece en la bandeja de entrada junto al asunto — lo que ve el usuario antes de abrir. Muchas personas deciden si abrir o no basándose en la combinación asunto + preview. Si no lo configuras, el cliente de email toma el primer texto del email, que suele ser el "Ver este email en el navegador" — inútil para motivar aperturas.',
          },
          {
            q: '¿Cuál es la razón principal por la que no debes comprar listas de emails?',
            options: [
              'Es muy caro y no vale la pena económicamente',
              'Los emails comprados suelen estar desactualizados',
              'Genera spam reports que destruyen la reputación del dominio y puede ser ilegal',
              'Las plataformas de email marketing no permiten importar listas compradas',
            ],
            correct: 2,
            explanation: 'Las listas compradas contienen personas que nunca consintieron recibir tus emails. Cuando los recibes sin haberlos pedido, los marcas como spam. Los spam reports destruyen la "reputación" del dominio y la IP del remitente, haciendo que incluso los emails a suscriptores legítimos lleguen a la carpeta de spam. Además, en la UE y muchos países es ilegal bajo GDPR y leyes similares.',
          },
          {
            q: '¿Cuántos CTAs debe tener un email de ventas o nurturing bien optimizado?',
            options: ['Ninguno — los links de texto son más efectivos', 'Uno solo, claro y destacado', 'Dos o tres para dar opciones', 'Tantos como sea posible para maximizar clics'],
            correct: 1,
            explanation: 'Un solo CTA por email. Cuando hay múltiples opciones de acción, el suscriptor experimenta parálisis de decisión y no hace clic en ninguno. La excepción es cuando el email tiene múltiples artículos (newsletter de contenido) — ahí cada sección puede tener su propio link.',
          },
          {
            q: 'Un unsubscribe rate de 2% en cada envío indica:',
            options: [
              'Performance excelente — muchas personas están leyendo el email',
              'Performance normal para la mayoría de industrias',
              'Un problema serio — la relevancia del contenido o la frecuencia están mal',
              'Que la lista tiene muchos emails inválidos',
            ],
            correct: 2,
            explanation: 'Un unsubscribe rate saludable es menor al 0.5% por envío. Al 2%, en 10 envíos habrás perdido el 20% de tu lista. Esto indica que el contenido no es relevante para los suscriptores, que la frecuencia es demasiado alta, o que hay una desalineación entre lo que prometiste al suscribir y lo que estás enviando.',
          },
        ],
        completed: false,
      },
          {
        id: 'email-1-proj-basico',
        title: 'Proyecto Básico: Secuencia de bienvenida de 3 emails',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Escribe la secuencia de bienvenida de 3 emails para un negocio de tu elección.',
        deliverables: [
          'Email 1 (inmediato): entrega el lead magnet + presentación + expectativas de qué recibirán',
          'Email 2 (día 2): historia de la marca o el founder que conecte emocionalmente',
          'Email 3 (día 5): CTA suave hacia el siguiente paso (contenido, producto o llamada)',
          'Para cada email: asunto, preview text y cuerpo completo',
        ],
        tip: 'El open rate de los primeros 3 emails determina si el algoritmo marca tu dominio como confiable. Hazlos tan buenos que la gente quiera responder.',
        completed: false,
      },

    {
      id: 'email-1-p2',
      title: 'Proyecto: Secuencia de bienvenida (3 emails)',
      type: 'project',
      difficulty: 'básico',
      projectBrief: 'Diseña una secuencia de 3 emails de bienvenida para un negocio real o ficticio. Email 1: bienvenida y entrega del lead magnet. Email 2: historia y valor. Email 3: primera oferta suave.',
      deliverables: [
        'Subject line + preview text de cada email',
        'Cuerpo completo de los 3 emails',
        'Diagrama del timing (día 0, día 2, día 5)',
      ],
      rubrica: [
        'Progresión lógica entre los 3 emails',
        'Tono consistente con la marca',
        'Subject lines bajo 50 caracteres',
      ],
      completed: false,
    },],
    resources: [
      { title: 'Brevo (ex-Sendinblue) — email marketing con plan gratuito generoso', url: 'https://www.brevo.com', type: 'tool' },
      { title: 'Really Good Emails — biblioteca de emails de inspiración', url: 'https://reallygoodemails.com', type: 'article' },
    ],
  },
  {
    id: 'email-2',
    number: 50,
    title: 'Automatización y funnels de email',
    description: 'Construye secuencias de email que trabajan 24/7: bienvenida, nurturing, recuperación de carritos y reactivación.',
    duration: '2 semanas',
    status: 'available',
    track: 'email',
    lessons: [
      {
        id: 'email-2-1',
        title: 'La secuencia de bienvenida: la más importante que construirás',
        type: 'reading',
        content: '## Por qué la bienvenida es tu email más valioso\n\nEl momento en que alguien se suscribe es cuando más atención e intención tiene hacia tu contenido. En las primeras 24-48 horas, tu open rate puede estar 3-5x por encima del promedio. No desperdiciar ese momento con un solo email genérico de "¡Gracias por suscribirte!" es uno de los errores más costosos en email marketing.\n\n## Estructura de una secuencia de bienvenida efectiva (5-7 emails)\n\n**Email 1 — Día 0: Entrega inmediata + presentación**\nEntrega lo que prometiste (lead magnet, descuento, acceso). Preséntate brevemente. Establece qué recibirán y con qué frecuencia. CTA: responde este email (mejora deliverability).\n\n**Email 2 — Día 1: Tu historia / la historia de la marca**\nConecta emocionalmente. ¿Por qué existes? ¿Qué problema personal resolviste? Las historias generan confianza más rápido que cualquier argumento lógico.\n\n**Email 3 — Día 3: El problema que resuelves**\nNombra el dolor específico que tiene tu suscriptor. Hazles sentir que los entiendes mejor de lo que ellos se entienden a sí mismos.\n\n**Email 4 — Día 5: Tu solución + social proof**\nIntroduce tu oferta principal. Un testimonial o caso de estudio concreto. No es un pitch agresivo — es mostrar que funciona.\n\n**Email 5 — Día 7: La oferta**\nCTA claro a la acción que quieres que tomen (compra, llamada, prueba gratuita). Urgencia legítima si aplica.\n\n## Automatización: cómo configurarlo\n\nTodas las plataformas modernas (Brevo, Mailchimp, Klaviyo) permiten crear flujos automáticos basados en trigger. El trigger más básico: cuando alguien se suscribe a la lista X, inicia la secuencia Y con los delays definidos.',
        tasks: [
          'Escribe los 5 asuntos de la secuencia de bienvenida para un negocio de tu elección. Cada asunto debe crear curiosidad sobre el email siguiente',
          'Configura un flujo de bienvenida básico de 3 emails (días 0, 2 y 5) en Brevo o Mailchimp con los delays correctos',
          'Suscríbete a 3 newsletters de referencia de tu industria y documenta cómo manejan su secuencia de bienvenida. ¿Qué funciona bien? ¿Qué harías diferente?',
        ],
        tip: 'El email más abierto de cualquier secuencia es el primero. Si no logras que también abran el segundo, tienes un problema de "qué prometiste vs. qué entregaste". Revisa la consistencia entre el lead magnet y el contenido de la secuencia.',
        completed: false,
      },
      {
        id: 'email-2-2',
        title: 'Flujos avanzados: carritos abandonados, reactivación y nurturing',
        type: 'practice',
        content: '## Los flujos que más revenue generan en e-commerce\n\n**Carrito abandonado**: el 70% de los carritos de compra se abandonan sin completar la compra. Un flujo de 3 emails puede recuperar entre el 5-15% de esas ventas perdidas. Estructura:\n- Email 1 (1 hora después): recordatorio amable con foto del producto\n- Email 2 (24 horas después): social proof + respuesta a objeciones comunes\n- Email 3 (72 horas después): urgencia o incentivo (descuento, envío gratis)\n\n**Browse abandonment**: cuando alguien ve un producto pero no lo agrega al carrito. Email automatizado 24 horas después con el producto que vio + recomendaciones relacionadas.\n\n**Post-compra**: el mejor momento para generar una segunda compra es justo después de la primera. Secuencia: confirmación de pedido → guía de uso del producto → solicitud de testimonial (7-14 días después) → oferta de producto complementario.\n\n## Flujos de reactivación\n\nLos suscriptores inactivos (no han abierto ningún email en 90+ días) dañan tu deliverability. Antes de limpiarlos, intenta una campaña de reactivación:\n\n- Email 1: "¿Sigues ahí?" — directo, sin adornos\n- Email 2 (3 días después): tu mejor contenido o una oferta exclusiva\n- Email 3 (3 días después): "Este es mi último email si no escucho de ti"\n\nQuienes no abren ninguno de los tres: eliminalos de la lista. Parece contraproducente pero mejora el deliverability y las métricas generales.\n\n## Nurturing B2B para agencias\n\nPara leads B2B que no están listos para comprar inmediatamente, el nurturing es crítico. Estructura mensual:\n- Semana 1: educación (tip accionable del sector)\n- Semana 2: caso de estudio de cliente\n- Semana 3: tendencia del sector con tu perspectiva\n- Semana 4: CTA suave (llamada gratuita, consultoría, recurso descargable)',
        tasks: [
          'Diseña el flujo de carrito abandonado de 3 emails: escribe el asunto, el primer párrafo y el CTA de cada uno',
          'Crea un flujo de reactivación de 3 emails para suscriptores inactivos de 90+ días. El tono debe ser honesto y directo, no desesperado',
          'Define la cadencia de nurturing mensual para los leads B2B de una agencia digital: 4 emails con tema, objetivo y CTA de cada uno',
        ],
        tip: 'En los flujos de recuperación (carrito abandonado, reactivación), la honestidad funciona mejor que la manipulación. "Notamos que dejaste algo en tu carrito" convierte mejor que crear urgencia falsa.',
        completed: false,
      },
          {
        id: 'email-2-proj-inter',
        title: 'Proyecto Intermedio: Lead magnet + landing page de suscripción',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Crea el lead magnet completo y la landing page de suscripción para construir una lista de emails.',
        deliverables: [
          'Lead magnet producido: PDF, checklist, template o mini-guía (mínimo 5 páginas de contenido real, no relleno)',
          'Landing page de suscripción publicada: headline, beneficios del lead magnet, formulario y prueba social',
          'Formulario conectado a la herramienta de email marketing (Brevo o Mailchimp)',
          'Email de entrega automático del lead magnet configurado y probado',
          'Link de la landing page publicada y screenshot del email de entrega recibido',
        ],
        tip: 'El lead magnet más efectivo no es el más largo — es el que resuelve una duda específica de forma tan completa que el suscriptor piensa "esto lo habría pagado".',
        completed: false,
      },
],
    resources: [
      { title: 'Klaviyo — la plataforma de referencia para e-commerce email', url: 'https://www.klaviyo.com', type: 'tool' },
      { title: 'Email on Acid — testing de renders en todos los clientes de email', url: 'https://www.emailonacid.com', type: 'tool' },
    ],
  },
  {
    id: 'email-capstone',
    number: 51,
    title: 'Proyecto: Sistema de email para un cliente',
    description: 'Diseña e implementa el sistema completo de email marketing para un negocio real o ficticio.',
    duration: '2 semanas',
    status: 'available',
    track: 'email',
    lessons: [
      {
        id: 'email-capstone-1',
        title: 'Proyecto: Sistema de email marketing completo',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: 'Diseña el sistema de email marketing completo para un negocio de tu elección (puede ser ficticio o un cliente real). El entregable es el sistema documentado + los flujos configurados en una herramienta real.',
        deliverables: [
          'Estrategia: objetivo principal del email marketing para este negocio, KPIs definidos con benchmarks, y herramienta elegida con justificación',
          'Lead magnet: descripción del lead magnet principal, mockup o descripción del formulario de suscripción',
          'Secuencia de bienvenida: 5 emails escritos con asunto, preview text, cuerpo y CTA de cada uno',
          'Al menos 1 flujo automatizado adicional (carrito abandonado, nurturing, reactivación) con los emails escritos',
          'Template de newsletter mensual: estructura y primer draft del email de valor del mes',
          'Plan de contenido: calendario de 3 meses con tema, tipo de email y objetivo de cada envío',
          'Setup técnico: prueba de que los flujos están configurados en la herramienta (screenshots o link de acceso)',
        ],
        tasks: [
          'Implementa el sistema en Brevo o Mailchimp y comparte screenshots del dashboard con los flujos activos',
          'Suscríbete tú mismo al lead magnet y documenta la experiencia del suscriptor nuevo (qué recibe, cuándo, cómo)',
          'Comparte el documento de estrategia en #proyecto-email y pide feedback específico sobre la secuencia de bienvenida',
        ],
        tip: 'El sistema de email más efectivo es el que realmente se usa. Empieza simple: un buen lead magnet + una secuencia de bienvenida de 5 emails. Complejidad después, consistencia primero.',
        completed: false,
      },
    ],
    resources: [],
  },

  // ─── Track: Video y Contenido Social ─────────────────────────────────────────
  {
    id: 'video-1',
    number: 52,
    title: 'Estrategia de video para redes sociales',
    description: 'El video es el formato dominante en todas las plataformas. Aprende a pensar estratégicamente antes de grabar el primer segundo.',
    duration: '2 semanas',
    status: 'available',
    track: 'video',
    lessons: [
      {
        id: 'video-1-1',
        title: 'El ecosistema de video en 2025: plataformas y formatos',
        type: 'reading',
        content: '## Por qué el video ganó\n\nEn 2025, el video representa más del 80% del tráfico de internet y es el formato con mayor alcance orgánico en todas las plataformas sociales. Los algoritmos de TikTok, Instagram, YouTube y LinkedIn priorizan video porque mantiene a los usuarios más tiempo en la plataforma. Para una agencia, dominar video no es opcional — es el servicio con mayor demanda.\n\n## Plataformas y sus particularidades\n\n**TikTok**: el algoritmo más poderoso para descubrimiento orgánico. Puede llevar a cero seguidores a millones de vistas en horas si el video conecta. Formato: vertical 9:16, 15-60 segundos idealmente. Audiencia más joven pero en expansión.\n\n**Instagram Reels**: el formato de mayor alcance orgánico en Instagram. El algoritmo lo prioriza sobre cualquier otro formato. Aparece en el tab de Explore, llegando a personas que no siguen la cuenta. Formato: vertical 9:16, hasta 90 segundos.\n\n**YouTube Shorts**: vertical 9:16, hasta 60 segundos. Integrado con el ecosistema de YouTube — un Short exitoso puede llevar tráfico al canal principal. Ideal para clientes con presencia en YouTube.\n\n**LinkedIn Video**: el formato que más alcance orgánico tiene en LinkedIn en 2024-2025. Horizontal o vertical funcionan. Los videos de "behind the scenes", opiniones profesionales y casos de estudio funcionan excepcionalmente bien en un contexto B2B.\n\n## La estrategia de repropósito (content repurposing)\n\nGrabar un video y publicarlo en una sola plataforma es desperdiciar el 80% del valor. La estrategia eficiente: graba una vez, edita y publica en múltiples plataformas adaptando el formato. Un video horizontal de 10 min para YouTube → recorta los mejores 60 segundos → Shorts/Reels/TikTok → extrae el audio → podcast → transcribe → artículo de blog.',
        tasks: [
          'Para un cliente de tu elección, define en qué 2-3 plataformas de video tiene más sentido estar presente y por qué (audiencia objetivo, tipo de contenido, recursos disponibles)',
          'Investiga las cuentas de 3 competidores de ese cliente en las plataformas elegidas. ¿Qué formatos usan? ¿Qué frecuencia? ¿Qué videos tienen más views?',
          'Diseña el flujo de repropósito para un video de 5 minutos: lista todas las piezas de contenido que puedes sacar de ese único video',
        ],
        tip: 'El error más común al empezar con video es intentar estar en todas las plataformas. Elige 1-2 plataformas donde está la audiencia objetivo y hazlas bien antes de expandirte.',
        completed: false,
      },
      {
        id: 'video-1-2',
        title: 'El hook: los 3 segundos que deciden todo',
        type: 'reading',
        content: '## Por qué los primeros 3 segundos son la métrica que más importa\n\nEn TikTok e Instagram Reels, el algoritmo mide el Completion Rate (porcentaje de personas que ven el video completo). Si en los primeros 3 segundos el usuario hace scroll, el algoritmo interpreta que el contenido no es bueno y reduce su distribución. Si se queda, el algoritmo lo distribuye más. Todo empieza con el hook.\n\n## Los 7 tipos de hook que detienen el scroll\n\n**1. Pregunta que identifica al target**: "¿Tienes un negocio en Instagram pero tus ventas no crecen?"\n\n**2. Afirmación controversial**: "El diseño de tu logo no importa" / "Los anuncios de Meta están muertos para negocios pequeños"\n\n**3. Revelación de número**: "Cómo conseguí 50 clientes en 30 días sin gastar en ads"\n\n**4. "Nadie te dice que..."**: "Nadie te dice que el 70% de los freelancers abandona en el primer año. Aquí está por qué"\n\n**5. Antes/Después visual**: mostrar el resultado final en el primer frame para crear curiosidad sobre el proceso\n\n**6. Promesa directa de aprendizaje**: "En los próximos 60 segundos te voy a enseñar..."\n\n**7. Elemento visual disruptivo**: algo inesperado en el primer frame que no tiene sentido sin contexto — el cerebro quiere resolver el puzzle\n\n## El texto on-screen como hook adicional\n\nEn muchas plataformas, los videos se reproducen sin sonido por defecto. El texto on-screen en el primer frame es tu segunda oportunidad de capturar atención. Debe complementar el hook hablado, no repetirlo.',
        tasks: [
          'Para los mismos 3 videos que estás analizando de la competencia: identifica el tipo de hook que usa cada uno y evalúa si es efectivo o no',
          'Escribe 5 hooks originales para el negocio del cliente usando al menos 3 tipos diferentes de los 7 listados',
          'Graba 2 variantes del mismo hook de 5 segundos y compara: ¿cuál detiene más el scroll? (pide feedback a 5 personas)',
        ],
        tip: 'El mejor hook no es el más creativo — es el más específico para tu audiencia objetivo. Un hook que identifica exactamente el problema de tu cliente ideal convierte mejor que uno genérico aunque sea más "llamativo".',
        completed: false,
      },
      {
        id: 'video-1-3',
        title: 'Producción básica: grabar bien con lo que tienes',
        type: 'practice',
        content: '## La trampa del equipo perfecto\n\nEl error más común de quien empieza con video: esperar a tener la cámara perfecta, el micrófono perfecto, el set perfecto. Los creadores con más tracción en TikTok e Instagram en 2024-2025 son los que publican consistentemente con equipo básico, no los que publican raramente con producción Hollywood.\n\n## Los 3 factores que sí importan en producción básica\n\n**1. Audio**: el mal audio destruye cualquier video, sin importar qué tan buena sea la imagen. Antes de comprar una cámara nueva, invierte en un micrófono. Un micrófono de solapa de $30-50 USD mejora el audio más que cualquier cámara de $1,000.\n\n**2. Iluminación**: la luz natural es gratis y es la mejor. Graba cerca de una ventana con luz natural difusa (no luz directa del sol — hace sombras duras). Si necesitas luz artificial, un ring light de $40-60 USD hace la diferencia.\n\n**3. Fondo y composición**: el fondo debe ser limpio y no distraer. La regla de los tercios: pon el sujeto en el tercio izquierdo o derecho del frame, no en el centro. La cámara a la altura de los ojos o ligeramente superior.\n\n## El setup mínimo viable para empezar\n\nTeléfono moderno (cualquier iPhone del 11 en adelante o Android flagship de los últimos 3 años) + micrófono de solapa + luz natural = videos profesionales. Sin más.\n\n## Guión vs. espontaneidad\n\nLa mayor diferencia entre creadores que suenan naturales y los que suenan robóticos no es el talento — es la preparación. Los mejores en cámara conocen tan bien lo que van a decir que no necesitan memorizarlo. Prepara bullet points, no un guión palabra por palabra. Practica en voz alta antes de grabar.',
        tasks: [
          'Con tu teléfono y la luz natural disponible ahora mismo, graba un video de 60 segundos sobre un tema que domines. Sin editar, sin filtros. Analiza: qué funciona del audio, la iluminación y la composición, y qué mejorar',
          'Define el setup de grabación que recomendarías a un cliente con $200 de presupuesto máximo: micrófono, soporte, iluminación (links reales de productos)',
          'Graba el mismo hook 5 veces seguidas. Nota cómo cada toma se siente más natural. Esta práctica se llama "calentamiento de cámara" — la primera toma rara vez es la mejor',
        ],
        tip: 'La consistencia supera a la perfección. Un video decente publicado hoy vale más que un video perfecto que nunca se publica porque "falta algo". Empieza con lo que tienes y mejora gradualmente.',
        completed: false,
      },
      {
        id: 'video-1-exam',
        title: 'Examen: Estrategia de Video',
        type: 'exam',
        content: 'Valida tu comprensión de estrategia de video antes de pasar a edición y distribución.',
        questions: [
          {
            q: '¿Qué métrica usa el algoritmo de TikTok e Instagram para decidir si distribuir más o menos un video?',
            options: ['Número de likes en las primeras 24 horas', 'Completion Rate — porcentaje de personas que ven el video completo', 'Número de comentarios generados', 'Cantidad de veces que se comparte'],
            correct: 1,
            explanation: 'El Completion Rate es la métrica más importante para los algoritmos de TikTok e Instagram Reels. Si la mayoría de personas ven el video completo, el algoritmo interpreta que es contenido de valor y lo distribuye más. Si la mayoría hace scroll en los primeros segundos, lo limita. Esto es por qué el hook es tan crítico.',
          },
          {
            q: '¿Cuál es el único factor de producción que puede destruir un video independientemente de la calidad visual?',
            options: ['Un fondo desordenado', 'Mala iluminación', 'Audio de mala calidad', 'Resolución baja del video'],
            correct: 2,
            explanation: 'El audio malo es intolerable para el espectador de una forma que la imagen de baja calidad no lo es. Las personas perdonan imagen pixelada pero no toleran audio con eco, ruido de fondo o voz apagada. La inversión en un buen micrófono tiene el mayor ROI en producción básica.',
          },
          {
            q: '¿Qué es el "content repurposing" y por qué es importante para una agencia?',
            options: [
              'Publicar el mismo video en múltiples plataformas sin modificar',
              'Grabar una pieza de contenido y editarla en múltiples formatos para diferentes plataformas',
              'Reutilizar videos de otros creadores con crédito',
              'Reciclar contenido antiguo que funcionó bien',
            ],
            correct: 1,
            explanation: 'Content repurposing es grabar una vez y crear múltiples piezas para distintas plataformas: un video largo → Shorts/Reels/TikTok + audio para podcast + transcripción para artículo. Para una agencia, esto multiplica el valor entregado al cliente sin multiplicar el tiempo de producción.',
          },
          {
            q: 'De los 7 tipos de hook, ¿cuál usa la psicología de "completar el puzzle" para retener la atención?',
            options: ['La pregunta que identifica al target', 'La revelación de número', 'El elemento visual disruptivo', 'La promesa directa de aprendizaje'],
            correct: 2,
            explanation: 'El elemento visual disruptivo muestra algo inesperado o fuera de contexto en el primer frame. El cerebro humano tiene un impulso natural de resolver la incoherencia — necesita entender por qué está viendo eso. Esta tensión cognitiva mantiene al espectador para descubrir el contexto.',
          },
          {
            q: '¿Por qué se recomienda preparar bullet points en lugar de un guión memorizado para hablar en cámara?',
            options: [
              'Porque los bullet points son más cortos y fáciles de memorizar',
              'Porque el guión memorizado suena robótico; los bullet points permiten hablar con naturalidad sin improvisar el contenido',
              'Porque las plataformas penalizan el contenido que se ve muy preparado',
              'Porque con bullet points el video puede ser más corto',
            ],
            correct: 1,
            explanation: 'Un guión memorizado palabra por palabra produce una performance que suena artificial — el cerebro humano detecta la diferencia entre alguien que habla y alguien que recita. Los bullet points te dan la estructura y los puntos clave que quieres comunicar, pero te dejan encontrar las palabras naturalmente en el momento, resultado en una energía más auténtica.',
          },
        ],
        completed: false,
      },
          {
        id: 'video-1-proj-basico',
        title: 'Proyecto Básico: 5 variantes de hook en video',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Graba 5 variantes del mismo hook de 5-8 segundos usando diferentes tipos. Compara y elige la más efectiva.',
        deliverables: [
          '5 videos de 5-8 segundos: cada uno usando un tipo de hook diferente (pregunta, afirmación controversial, número, "nadie te dice que", promesa de aprendizaje)',
          'Para cada variante: el guión escrito del hook',
          'Análisis propio: cuál crees que es más efectiva y por qué',
          'Feedback de 3 personas que vieron los 5 videos: cuál los detendría más en el scroll',
        ],
        tip: 'Graba cada variante 3 veces y queda con la mejor toma. La quinta grabación siempre es más natural que la primera.',
        completed: false,
      },

    {
      id: 'video-1-p2',
      title: 'Proyecto: Guión de video de 60 segundos',
      type: 'project',
      difficulty: 'básico',
      projectBrief: 'Escribe un guión completo para un video de 60 segundos explicando un producto o servicio. Incluye gancho, desarrollo y CTA. Opcionalmente graba el video.',
      deliverables: [
        'Guión estructurado (gancho / desarrollo / CTA)',
        'Duración estimada marcada por sección',
        'Descripción de visuales para cada parte',
      ],
      rubrica: [
        'Gancho en los primeros 5 segundos',
        'Mensaje central claro y único',
        'CTA específico y accionable',
      ],
      completed: false,
    },],
    resources: [
      { title: 'CapCut — edición de video móvil, la más usada en 2025', url: 'https://www.capcut.com', type: 'tool' },
      { title: 'TikTok Creative Center — tendencias y análisis de contenido viral', url: 'https://ads.tiktok.com/business/creativecenter', type: 'tool' },
    ],
  },
  {
    id: 'video-2',
    number: 53,
    title: 'Edición y distribución de video',
    description: 'Edita videos que enganchen de principio a fin y domina la distribución en múltiples plataformas.',
    duration: '2 semanas',
    status: 'available',
    track: 'video',
    lessons: [
      {
        id: 'video-2-1',
        title: 'Edición de video para redes sociales: ritmo, captions y b-roll',
        type: 'practice',
        content: '## El principio del ritmo en edición\n\nLa edición de video para redes sociales tiene una regla: no dejes que el espectador tenga tiempo de aburrirse. Cada corte, cada cambio de plano, cada texto on-screen resetea la atención. Los videos virales en TikTok e Instagram cortan cada 1-3 segundos. Los tutoriales más lentos pueden ir cada 5-8 segundos.\n\n## Los elementos de edición que más impacto tienen\n\n**Captions on-screen**: el 85% de los videos en redes sociales se ven sin sonido. Los captions automáticos (CapCut los genera en segundos) son imprescindibles. Los captions bien estilizados (con palabras clave resaltadas en color) aumentan el retention rate.\n\n**B-roll**: el footage secundario que ilustra lo que estás diciendo. Si hablas de un proceso, muestra el proceso. Si hablas de un resultado, muestra el resultado. El b-roll rompe la monotonía del "talking head" (alguien hablando a cámara) y hace el video más dinámico.\n\n**Música de fondo**: baja intensidad para no competir con la voz. El 20-30% del volumen de la voz. Las plataformas tienen bibliotecas de música libre de derechos. TikTok tiene su propia biblioteca; CapCut también.\n\n**Texto animado**: palabras clave que aparecen on-screen sincronizadas con lo que estás diciendo. Refuerza los puntos clave y mantiene enganchados a los que leen antes de escuchar.\n\n## Herramientas de edición por nivel\n\n**Principiante (móvil)**: CapCut — gratis, potente, genera captions automáticamente, tiene templates.\n\n**Intermedio (desktop)**: DaVinci Resolve (gratis) o Adobe Premiere.\n\n**Avanzado**: After Effects para motion graphics, Final Cut Pro para Mac.',
        tasks: [
          'Toma el video de 60 segundos que grabaste en la lección anterior y edítalo en CapCut: agrega captions automáticos, música de fondo (20% del volumen), y al menos 3 textos on-screen destacando puntos clave',
          'Graba 30 segundos de b-roll relacionado al tema de tu video (manos trabajando, pantalla de computadora, proceso, etc.) e intégralo en la edición',
          'Compara el video editado con el video original sin editar. ¿En cuál crees que el espectador se quedaría más tiempo? ¿Por qué?',
        ],
        tip: 'CapCut tiene una función de "auto-captions" que transcribe el audio en segundos. Pero siempre revisa el resultado — los nombres propios, términos técnicos y palabras en inglés suelen transcribirse mal.',
        completed: false,
      },
      {
        id: 'video-2-2',
        title: 'Calendario de contenido y consistencia de publicación',
        type: 'reading',
        content: '## Por qué la consistencia supera al contenido perfecto\n\nEl algoritmo de todas las plataformas favorece a las cuentas que publican consistentemente. No por ser más "justos" — sino porque la consistencia genera datos suficientes para que el algoritmo sepa a quién mostrar el contenido. Una cuenta que publica 5 veces por semana durante 3 meses tiene 60+ videos con datos de rendimiento. El algoritmo tiene material para optimizar.\n\n## Frecuencia recomendada por plataforma (para cuentas de clientes)\n\n**TikTok**: 1-2 videos diarios si el objetivo es crecimiento acelerado. Mínimo 3-5 por semana para mantener presencia.\n\n**Instagram Reels**: 3-5 por semana. Los Reels + Stories + posts estáticos forman una presencia completa.\n\n**YouTube Shorts**: 3-5 por semana. El canal principal de YouTube: 1-2 videos de formato largo por semana es suficiente.\n\n**LinkedIn**: 2-3 videos por semana para B2B. El algoritmo de LinkedIn premia la constancia con mayor alcance orgánico.\n\n## Cómo construir un sistema de contenido que escale\n\nEl error: grabar y publicar de manera reactiva (cuando hay tiempo o inspiración). El sistema correcto:\n\n**Batch recording**: graba 4-8 videos en una sola sesión. La primera toma siempre es de calentamiento — después de 3-4 videos, hablas con más naturalidad y energía.\n\n**Banco de ideas**: mantén una lista permanente de ideas de contenido (Notion, Notes, lo que uses). Cada vez que se te ocurra algo bueno — en la ducha, manejando, leyendo — anótalo inmediatamente.\n\n**Calendario editorial**: define con 2 semanas de anticipación qué se publica qué día. El equipo no improvisa, ejecuta el plan.',
        tasks: [
          'Crea un banco de 30 ideas de video para un cliente específico: 10 educativos, 10 de behind the scenes, 10 de opinión o tendencias',
          'Diseña el calendario editorial de video para 1 mes: qué tipo de video se publica qué día, en qué plataforma, con qué hook',
          'Graba 3 videos en una sola sesión de 2 horas usando batch recording. Documenta cómo se compara la energía del video 1 vs. el video 3',
        ],
        tip: 'El batch recording es la diferencia entre agencias que escalan y agencias que se ahogan. Si cada video requiere preparación individual de 2 horas + 1 hora de grabación, nunca podrás manejar más de 2-3 clientes de video. Con batch, 4 horas producen 8 videos.',
        completed: false,
      },
          {
        id: 'video-2-proj-inter',
        title: 'Proyecto Intermedio: Video tutorial editado de 60-90 segundos',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Produce un video tutorial completo: guión, grabación, edición con captions y b-roll, y publicación.',
        deliverables: [
          'Guión completo: hook (5 seg), desarrollo en 3 pasos (45 seg), conclusión y CTA (10 seg)',
          'Video grabado y editado en CapCut: captions automáticos revisados, música de fondo al 20%, al menos 3 textos on-screen de puntos clave',
          'B-roll integrado: mínimo 2 cortes de b-roll relacionado al tema',
          'Publicado en al menos 1 plataforma con el caption optimizado (hook en texto + hashtags)',
          'Link de la publicación y métricas de las primeras 24 horas',
        ],
        tip: 'Graba el b-roll el mismo día que el talking head. El lighting y el ambiente son más consistentes y la edición es más rápida.',
        completed: false,
      },
],
    resources: [
      { title: 'CapCut Web — edición profesional desde el navegador', url: 'https://www.capcut.com/create', type: 'tool' },
      { title: 'Epidemic Sound — biblioteca de música libre de derechos', url: 'https://www.epidemicsound.com', type: 'tool' },
    ],
  },
  {
    id: 'video-capstone',
    number: 54,
    title: 'Proyecto: Serie de video para una marca',
    description: 'Produce y publica una serie de 4 videos para una cuenta real, con estrategia, producción y distribución completa.',
    duration: '2 semanas',
    status: 'available',
    track: 'video',
    lessons: [
      {
        id: 'video-capstone-1',
        title: 'Proyecto: Serie de 4 videos para un cliente',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: 'Produce y publica una serie de 4 videos cortos (30-90 segundos) para una marca real o ficticia en al menos 2 plataformas. El proyecto incluye la estrategia, producción, edición y distribución.',
        deliverables: [
          'Estrategia de video: objetivo (awareness/educación/conversión), plataformas elegidas, audiencia objetivo y tono de la marca',
          'Bank de ideas: 20 ideas de contenido para el cliente, con hook, formato y plataforma de cada una',
          'Calendario editorial: 4 semanas de publicaciones con fechas, plataformas y hooks definidos',
          'Producción: 4 videos grabados, editados con captions y música, listos para publicar',
          'Distribución: los 4 videos publicados en las plataformas elegidas (o preparados para publicación si es un cliente ficticio)',
          'Análisis de resultados: reporte de los primeros 7 días con métricas de cada video (views, completion rate, engagement)',
        ],
        tasks: [
          'Publica los 4 videos y espera al menos 7 días para recopilar métricas reales',
          'Documenta el proceso de producción: fotos del setup, tiempo total por video, aprendizajes de cada grabación',
          'Comparte los videos en #proyecto-video con el link de las publicaciones y el análisis de métricas',
        ],
        tip: 'El primer video que publicas nunca es el mejor. El objetivo de este proyecto es completar el ciclo completo (estrategia → grabación → edición → publicación → análisis), no producir el video perfecto.',
        completed: false,
      },
    ],
    resources: [],
  },

  // ─── Track: Community Management ─────────────────────────────────────────────
  {
    id: 'community-1',
    number: 55,
    title: 'Community management: estrategia y operación',
    description: 'Gestiona redes sociales de clientes con sistema, no con intuición. Calendarios, engagement, reportes y manejo de crisis.',
    duration: '2 semanas',
    status: 'available',
    track: 'community',
    lessons: [
      {
        id: 'community-1-1',
        title: 'El rol real de un community manager en 2025',
        type: 'reading',
        content: '## Community manager no es quien publica en Instagram\n\nEl error más común de clientes y agencias nuevas: confundir community manager con "la persona que sube fotos". Un CM en 2025 es un estratega de comunicación digital que:\n\n- Define la voz y el tono de la marca en cada plataforma\n- Diseña la estrategia de contenidos alineada al objetivo de negocio\n- Construye relaciones reales con la audiencia (no solo publica)\n- Monitorea la conversación de la marca en internet\n- Maneja crisis de reputación antes de que escalen\n- Reporta métricas que se conectan a objetivos de negocio\n\n## Plataformas por tipo de negocio\n\n**Instagram**: negocios visuales (moda, restaurantes, diseño, lifestyle). Audiencia 18-45. Requiere alta producción de contenido visual.\n\n**Facebook**: negocios locales, audiencia 35+, grupos de comunidad, eventos. Menor alcance orgánico pero sigue siendo relevante para negocios de comunidad local.\n\n**LinkedIn**: B2B, servicios profesionales, personal branding de founders. La plataforma con mayor alcance orgánico para contenido profesional en 2025.\n\n**TikTok**: marcas que quieren llegar a audiencias jóvenes o que tienen contenido entretenido/educativo. El algoritmo más democrático — no necesitas seguidores para tener alcance.\n\n**X (Twitter)**: opinión, tecnología, política, startups. Funciona para marcas con perspectiva clara y personas dispuestas a opinar.\n\n## La pregunta filtro para cada cliente\n\nAntes de crear ninguna cuenta: ¿tu cliente ideal está en esta plataforma, tiene el hábito de consumir este tipo de contenido, y puedes producir consistentemente lo que esa plataforma requiere? Si las tres respuestas son sí, adelante. Si alguna es no, repiensa.',
        tasks: [
          'Para un cliente real o ficticio, define en cuáles 2 plataformas tiene presencia y por qué. Aplica la pregunta filtro de las 3 condiciones',
          'Investiga el tono de voz de 3 marcas que admiras en redes sociales. Documenta: cómo se expresan, qué evitan decir, cómo responden a comentarios',
          'Define el tono de voz de tu cliente: 5 adjetivos que SÍ describen cómo habla la marca y 3 que NO',
        ],
        tip: 'Hacer mal una plataforma daña más la marca que no estar. Antes de tomar un cliente de community management, asegúrate de que puedas ejecutar bien en las plataformas donde quieren estar — no las que te pidan estar si no puedes ejecutarlas con calidad.',
        completed: false,
      },
      {
        id: 'community-1-2',
        title: 'Calendario de contenido y creación en sistema',
        type: 'practice',
        content: '## El calendario no es un lujo — es la base de la operación\n\nSin calendario editorial, el contenido se produce reactivamente: cuando hay tiempo, cuando hay inspiración, cuando el cliente recuerda que necesita publicar. El resultado es inconsistencia, que destruye el alcance orgánico y la confianza del algoritmo.\n\n## Estructura del calendario editorial\n\nCada entrada del calendario debe tener:\n- **Fecha y hora de publicación**: específica, no "esta semana"\n- **Plataforma**: Instagram feed, Stories, Reels, LinkedIn, etc.\n- **Tipo de contenido**: carrusel, video, imagen, texto\n- **Tema**: sobre qué trata\n- **Copy principal**: el texto del post o el hook del video\n- **CTA**: qué acción quieres que tome la audiencia\n- **Assets necesarios**: qué fotos/videos/diseños se necesitan\n- **Estado**: en preparación / listo para revisar / aprobado / publicado\n\n## La regla 80/20 de contenido\n\nError clásico: publicar 100% contenido de venta. La audiencia deja de seguir. La regla general:\n- **80% contenido de valor**: educativo, entretenido, inspiracional, behind the scenes\n- **20% contenido de conversión**: producto, servicio, oferta, CTA directo\n\n## Herramientas de gestión y programación\n\n**Meta Business Suite**: gratis, programa posts en Facebook e Instagram, ve métricas básicas.\n\n**Buffer**: gestión multi-plataforma con análisis de mejores horarios. Plan gratuito generoso.\n\n**Later**: especializado en Instagram, vista de grilla para planear el feed visualmente.\n\n**Notion o Airtable**: para calendarios más complejos con múltiples clientes y aprobaciones del equipo.',
        tasks: [
          'Crea el calendario editorial de un mes para un cliente en Notion o Google Sheets: 3-5 posts por semana en 2 plataformas, con todos los campos de la estructura definida',
          'Produce 3 posts completos (copy + diseño o fotografía) de ese calendario y programa uno en Meta Business Suite o Buffer',
          'Define el proceso de aprobación: ¿cómo presenta el contenido al cliente para revisión? ¿Cuántos días de anticipación? ¿Cuántas rondas de revisión están incluidas en tu fee?',
        ],
        tip: 'El proceso de aprobación no documentado es el origen del 80% de los conflictos con clientes de community management. Define desde el contrato: cuántos días hábiles tiene el cliente para aprobar, qué pasa si no responde, y cuántas revisiones incluye tu fee.',
        completed: false,
      },
      {
        id: 'community-1-3',
        title: 'Engagement, crisis y métricas para clientes',
        type: 'reading',
        content: '## Engagement: construir comunidad, no solo acumular seguidores\n\nUn engagement rate bajo (muchos seguidores, pocos likes/comentarios/shares) es peor que pocos seguidores muy activos. El algoritmo interpreta el engagement bajo como señal de que el contenido no interesa, y reduce el alcance. Los benchmarks de engagement rate por sector varían, pero generalmente:\n\n- <1%: bajo. Algo está fallando en el contenido o la audiencia.\n- 1-3%: normal para cuentas medianas.\n- 3-6%: bueno. La audiencia está genuinamente interesada.\n- >6%: excelente. Comunidad muy comprometida.\n\n## Tácticas de engagement reales\n\n**Responder comentarios en las primeras horas**: el algoritmo mide el tiempo que tarda una cuenta en responder. Las cuentas que responden rápido reciben más distribución.\n\n**Hacer preguntas en el copy**: "¿Cuál de estas dos opciones prefieren?" genera más comentarios que cualquier declaración.\n\n**Stories interactivas**: encuestas, quizzes, preguntas abiertas. Las Stories con stickers interactivos tienen el mayor engagement rate de cualquier formato.\n\n**DMs proactivos**: cuando alguien menciona la marca o comenta algo significativo, un DM personalizado crea una conexión que ningún post puede lograr.\n\n## Manejo de crisis en redes sociales\n\nUna crisis en redes es cualquier situación que amenaza la reputación de la marca: comentario negativo viral, error del producto que se hace público, mala experiencia de cliente que se comparte.\n\nProtocolo de crisis:\n1. Detectar rápido (monitoreo de menciones con Google Alerts o Mention.com)\n2. Evaluar el nivel de riesgo (¿es un troll o un problema real?)\n3. Responder con rapidez y empatía (no defensividad)\n4. Llevar la conversación a privado (DM o email)\n5. Resolver el problema real, no solo gestionar la imagen\n\n## El reporte mensual para clientes de community\n\nNo reportes solo seguidores y likes. Reporta métricas que conectan con objetivos de negocio:\n- Alcance: cuántas personas nuevas llegaron a la marca\n- Engagement rate: calidad de la conversación\n- Clicks al sitio web: tráfico generado\n- Leads generados (si hay formularios en bio o stories)\n- Top contenido: qué funcionó mejor y por qué',
        tasks: [
          'Configura Google Alerts para el nombre de un cliente ficticio o real para monitorear menciones en internet',
          'Simula una crisis: escribe la respuesta pública y el DM privado para un comentario negativo que se está viralizando sobre el cliente',
          'Crea el template de reporte mensual de community management con las 5 métricas de negocio + análisis de top 3 posts y plan del mes siguiente',
        ],
        tip: 'En una crisis de redes sociales, el silencio es el peor error. Responde siempre, aunque sea para decir "estamos revisando la situación y te contactamos pronto". La velocidad de respuesta define si la crisis escala o se contiene.',
        completed: false,
      },
          {
        id: 'community-1-proj-basico',
        title: 'Proyecto Básico: Auditoría de redes de un competidor',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Analiza las redes sociales de un competidor directo de un negocio de tu elección. Extrae aprendizajes accionables.',
        deliverables: [
          'Inventario de plataformas: todas las cuentas del competidor con seguidores, frecuencia y engagement rate',
          'Análisis de contenido: los 5 posts con más engagement del último mes y por qué crees que funcionaron',
          'Análisis de tono y voz: cómo habla la marca, qué palabras usa, cómo responde comentarios',
          '5 aprendizajes para aplicar en la estrategia del cliente analizado',
        ],
        tip: 'Copiar al competidor es el error. Entender por qué funciona su contenido y adaptarlo con tu propia voz es la estrategia.',
        completed: false,
      },
      {
        id: 'community-1-proj-inter',
        title: 'Proyecto Intermedio: Template de reporte mensual de redes',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Diseña el template de reporte mensual de community management que enviarías a un cliente. Debe ser claro para alguien sin conocimiento de marketing.',
        deliverables: [
          'Executive summary de 3 líneas: qué pasó este mes en lenguaje simple',
          'Métricas del período: alcance, impresiones, engagement rate, nuevos seguidores y clicks al sitio',
          'Top 3 contenidos del mes: screenshot + métricas + por qué funcionó cada uno',
          'Aprendizajes: 2-3 insights sobre la audiencia o el contenido',
          'Plan del próximo mes: 3-5 iniciativas con objetivo de cada una',
          'Template en Notion, Google Slides o PDF con diseño limpio y profesional',
        ],
        tip: 'El reporte que el cliente entiende y valora es el que hace que renueve. Invierte el mismo tiempo en presentarlo bien que en recolectar los datos.',
        completed: false,
      },

    {
      id: 'community-1-p2',
      title: 'Proyecto: Plan de comunidad 30 días',
      type: 'project',
      difficulty: 'intermedio',
      projectBrief: 'Diseña un plan de activación de comunidad para los primeros 30 días de una comunidad nueva. Incluye calendario de contenido, mecanismos de engagement y métricas de éxito.',
      deliverables: [
        'Calendario de 30 días con al menos 3 posts por semana',
        'Plan de bienvenida para nuevos miembros',
        'Definición de 5 métricas de éxito con targets',
        'Protocolo para manejar conflictos o spam',
      ],
      rubrica: [
        'Variedad de tipos de contenido',
        'Mecanismos de engagement bidireccional',
        'Métricas SMART y realistas',
      ],
      completed: false,
    },],
    resources: [
      { title: 'Buffer — programación multi-plataforma con plan gratuito', url: 'https://buffer.com', type: 'tool' },
      { title: 'Meta Business Suite — gestión oficial de Facebook e Instagram', url: 'https://business.facebook.com', type: 'tool' },
    ],
  },
  {
    id: 'community-capstone',
    number: 56,
    title: 'Proyecto: Plan de redes para un cliente real',
    description: 'Diseña y ejecuta el sistema completo de community management para un cliente.',
    duration: '2 semanas',
    status: 'available',
    track: 'community',
    lessons: [
      {
        id: 'community-capstone-1',
        title: 'Proyecto: Sistema de community management completo',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: 'Diseña el sistema completo de community management para un cliente real o ficticio. El entregable incluye estrategia, calendario, contenido producido y sistema de reporte.',
        deliverables: [
          'Estrategia de marca en redes: plataformas seleccionadas con justificación, tono de voz documentado, regla 80/20 de contenido aplicada al cliente',
          'Calendario editorial de 1 mes completo: 4 semanas de contenido con todos los campos definidos',
          'Producción: 8 piezas de contenido listas para publicar (mix de formatos: imagen, carrusel, video corto)',
          'Proceso de aprobación documentado: flujo, plazos y herramienta de comunicación con el cliente',
          'Protocolo de crisis: 3 escenarios de crisis probables para el cliente con respuesta pública y privada redactadas',
          'Template de reporte mensual con las métricas definidas y la visualización que enviarías al cliente',
        ],
        tasks: [
          'Publica al menos 4 de las 8 piezas en cuentas reales (las propias u otras con permiso) para tener métricas reales',
          'Comparte el sistema completo en #proyecto-community con el link al calendario y 2 ejemplos de contenido producido',
          'Comenta el proyecto de al menos 2 compañeros con feedback sobre el tono de voz y la diversidad de formatos',
        ],
        tip: 'Un sistema de community management bien documentado es lo que diferencia a una agencia profesional de un freelancer. El cliente no compra publicaciones — compra el sistema que garantiza consistencia y resultados.',
        completed: false,
      },
    ],
    resources: [],
  },

  // ─── Track: Productividad con IA ──────────────────────────────────────────────
  {
    id: 'prodai-1',
    number: 57,
    title: 'ChatGPT, Claude y Gemini como herramientas de trabajo',
    description: 'Deja de usar la IA para tareas triviales. Aprende a integrarla en flujos de trabajo reales que multiplican tu productividad como agencia.',
    duration: '2 semanas',
    status: 'available',
    track: 'prodai',
    lessons: [
      {
        id: 'prodai-1-1',
        title: 'Prompts avanzados: la diferencia entre una respuesta mediocre y una excelente',
        type: 'practice',
        content: '## Por qué el prompt importa más que el modelo\n\nLa mayoría de las personas usa ChatGPT como si fuera Google: escribe una pregunta corta y espera una respuesta genérica. Los profesionales que sacan 10x más valor de la IA construyen prompts con contexto, rol, formato y restricciones.\n\n## La anatomía de un prompt profesional\n\n**1. Rol**: "Actúa como un copywriter especializado en SaaS B2B con 10 años de experiencia"\n\n**2. Contexto**: "Estoy trabajando con un cliente que ofrece software de gestión de inventario para restaurantes en México"\n\n**3. Tarea específica**: "Escribe el headline y subheadline para su landing page principal"\n\n**4. Audiencia**: "El target es dueño de restaurante, 35-55 años, sin formación técnica, frustrado con el control manual de inventario"\n\n**5. Restricciones**: "Máximo 8 palabras en el headline, 15 en el subheadline. Sin jerga técnica. Enfoque en el resultado (ahorro de tiempo), no en la tecnología"\n\n**6. Formato de salida**: "Dame 5 opciones en formato: Headline | Subheadline"\n\n## Los 5 usos de IA que más tiempo ahorran en una agencia\n\n**Primer borrador de copy**: brief → prompt → 5 opciones → elige y refina. Lo que antes tomaba 2 horas, ahora es 20 minutos.\n\n**Investigación de audiencia**: "¿Cuáles son las 10 objeciones más comunes de [tipo de cliente] cuando considera [tipo de servicio]?"\n\n**Revisión y feedback**: "Revisa este email de ventas como si fueras el CMO de una startup que recibe 50 propuestas por semana. ¿Qué te haría responder y qué te haría ignorarlo?"\n\n**Generación de ideas**: "Dame 20 ideas de contenido para una agencia de diseño en Instagram. La audiencia son founders de startups en LATAM"\n\n**Traducción de técnico a cliente**: "Traduce esta descripción técnica de un sistema de automatización a lenguaje que entienda un dueño de negocio sin background técnico"',
        tasks: [
          'Toma un prompt simple que usas normalmente ("escríbeme un caption de Instagram sobre X") y reescríbelo con los 6 elementos de la anatomía del prompt profesional. Compara la calidad de las dos respuestas',
          'Construye una biblioteca personal de prompts: 5 prompts que uses regularmente en tu trabajo, optimizados con la estructura completa',
          'Usa la IA para investigar la audiencia de un cliente: pídele las 10 objeciones más comunes y 10 preguntas frecuentes del cliente ideal. Evalúa qué tan preciso es el resultado',
        ],
        tip: 'Guarda los prompts que funcionan en un documento de Notion o Google Docs. Una biblioteca de prompts bien construida es un activo de la agencia — no empieces desde cero cada vez.',
        completed: false,
      },
      {
        id: 'prodai-1-2',
        title: 'Flujos de trabajo con IA: casos de uso reales para agencias',
        type: 'reading',
        content: '## El error: usar IA como asistente. El acierto: usarla como sistema\n\nLa diferencia entre alguien que "usa ChatGPT a veces" y una agencia que multiplica su output con IA está en si la IA está integrada en el flujo de trabajo como parte del sistema, no como herramienta de emergencia.\n\n## Flujos de trabajo con IA para los servicios de una agencia\n\n**Propuestas de servicios**:\n1. Cliente llena briefing\n2. Claude/ChatGPT analiza el briefing y genera: resumen del problema, objetivos clave, preguntas de clarificación, estructura de propuesta sugerida\n3. Humano refina y personaliza\n4. Claude redacta el primer borrador de la propuesta\n5. Humano edita y envía\nTiempo ahorrado: 60-70% del tiempo de redacción\n\n**Brief de diseño → conceptos de marca**:\n1. Cliente brief\n2. Claude genera: 3 conceptos de posicionamiento, keywords de personalidad de marca, paletas de color sugeridas por concepto, referencias de estilos\n3. Diseñador usa esto como punto de partida, no punto de llegada\n\n**SEO content en escala**:\n1. Keyword research → lista de artículos a escribir\n2. Para cada artículo: Claude genera outline detallado con H2s, H3s y puntos clave de cada sección\n3. Escritor expande el outline con experiencia real y voz de marca\n4. Claude revisa SEO: densidad de keywords, estructura, meta description\n\n**Reporting de clientes**:\n1. Exporta los datos de las plataformas (Meta Ads, Google Analytics, etc.)\n2. Pega los datos en Claude con el prompt: "Analiza estos resultados como si fueras el account manager. Identifica 3 insights principales, 2 áreas de mejora y 3 recomendaciones para el próximo mes"\n3. Refina y personaliza el análisis con contexto del cliente',
        tasks: [
          'Elige 1 de los 4 flujos de trabajo y documenta cómo lo implementarías para un cliente actual o ficticio: paso a paso, con los prompts específicos que usarías en cada etapa',
          'Ejecuta el flujo completo una vez: toma un proyecto real o simulado y pásalo por el proceso. Documenta cuánto tiempo tardaste vs. tu estimado sin IA',
          'Identifica 3 tareas en tu trabajo semanal que podrían automatizarse parcialmente con IA. Para cada una, escribe el prompt que usarías',
        ],
        tip: 'La IA no reemplaza el juicio — acelera la ejecución. Los mejores resultados llegan cuando usas IA para generar el primer borrador (rápido y amplio) y tu criterio profesional para editar y refinar (lento y preciso).',
        completed: false,
      },
      {
        id: 'prodai-1-3',
        title: 'Notion AI, Perplexity y herramientas de IA especializadas',
        type: 'reading',
        content: '## Más allá de ChatGPT: el ecosistema de IA de una agencia\n\n**Claude (Anthropic)**: el mejor para texto largo, análisis de documentos y razonamiento complejo. Puedes pegarle un contrato completo y pedirle que identifique riesgos. O un brief de 20 páginas y pedirle un resumen ejecutivo. Su ventana de contexto es mucho mayor que ChatGPT.\n\n**Perplexity AI**: la alternativa a Google para investigación. A diferencia de ChatGPT, cita fuentes verificables y hace búsquedas en tiempo real. Ideal para research de mercado, tendencias del sector, y datos actualizados.\n\n**Notion AI**: si ya usas Notion, la IA integrada convierte bases de datos en resúmenes, genera documentos desde templates, y resume reuniones. El valor está en que vive donde ya tienes el trabajo.\n\n**Otter.ai / Fireflies**: transcripción automática de reuniones con resumen y action items. Conecta con Zoom y Google Meet. Después de una call con cliente, tienes en 2 minutos: transcripción completa + resumen ejecutivo + lista de acción. Lo que antes tardaba 30 minutos de notas.\n\n**Midjourney / DALL-E**: generación de imágenes para moodboards, referencias de diseño, y assets de contenido. Para briefings de diseño, generar referencias visuales en minutos en lugar de buscar en Pinterest durante horas.\n\n**Runway / Kling AI**: generación y edición de video con IA. Para agencias de video, puede extender clips, cambiar fondos, o generar b-roll de alta calidad sin cámara.\n\n## Construir el stack de IA de tu agencia\n\nNo necesitas todas las herramientas desde el día 1. El stack mínimo para una agencia en 2025:\n- ChatGPT Pro o Claude Pro: $20/mes. El núcleo de todo.\n- Perplexity Pro: $20/mes. Para research verificado.\n- Otter.ai: $10-17/mes. Para reuniones con clientes.\n- Midjourney: $10/mes. Para referencias visuales y moodboards.',
        tasks: [
          'Configura Otter.ai o Fireflies en tu cuenta de Google Meet o Zoom. En tu próxima reunión (puede ser ficticia), prueba la transcripción automática y evalúa la calidad del resumen generado',
          'Usa Perplexity para investigar el mercado de un cliente: tendencias del sector, principales competidores y oportunidades. Compara la calidad vs. una búsqueda tradicional en Google',
          'Define el stack de IA de tu agencia: cuáles herramientas usarás, para qué uso específico cada una, y cuánto cuesta mensualmente',
        ],
        tip: 'El ROI de las suscripciones de IA se mide en tiempo ahorrado. Si Claude Pro a $20/mes te ahorra 5 horas de trabajo al mes y facturas $50/hora, tu ROI es 12.5x. Haz ese cálculo para cada herramienta antes de suscribirte.',
        completed: false,
      },
          {
        id: 'prodai-1-proj-basico',
        title: 'Proyecto Básico: Optimiza 3 prompts de tu trabajo diario',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Identifica 3 tareas que ya haces con IA y optimiza los prompts para obtener mejores resultados.',
        deliverables: [
          'Los 3 prompts originales que usabas (pueden ser simples o incompletos)',
          'Los 3 prompts optimizados con la estructura completa (rol, contexto, tarea, audiencia, restricciones, formato)',
          'Comparativa de outputs: copia el resultado del prompt original y del optimizado para cada caso',
          'Análisis: qué cambio en la estructura del prompt generó el mayor impacto en la calidad del resultado',
        ],
        tip: 'No intentes optimizar los 3 prompts a la vez. Optimiza uno, evalúa, y luego el siguiente.',
        completed: false,
      },
],
    resources: [
      { title: 'Claude — IA de Anthropic, mejor para texto y análisis largo', url: 'https://claude.ai', type: 'tool' },
      { title: 'Perplexity AI — búsqueda con IA y fuentes verificadas', url: 'https://www.perplexity.ai', type: 'tool' },
      { title: 'Otter.ai — transcripción automática de reuniones', url: 'https://otter.ai', type: 'tool' },
    ],
  },
  {
    id: 'prodai-2',
    number: 58,
    title: 'Automatización con n8n',
    description: 'Construye flujos de automatización sin código que conectan tus herramientas y eliminan trabajo manual repetitivo.',
    duration: '3 semanas',
    status: 'available',
    track: 'prodai',
    lessons: [
      {
        id: 'prodai-2-1',
        title: 'n8n: el sistema nervioso de tu agencia',
        type: 'reading',
        content: '## Por qué n8n y no Zapier\n\nn8n es la alternativa de código abierto a Zapier con ventajas clave para agencias: puede correr en tu propio servidor (sin límite de ejecuciones), tiene lógica condicional más poderosa, permite integrar código JavaScript cuando los nodos nativos no alcanzan, y tiene una interfaz visual más expresiva para flujos complejos.\n\nZapier sigue siendo válido para automatizaciones simples y equipos no técnicos. n8n es para quien quiere control total y escalar sin pagar por ejecución.\n\n## Conceptos fundamentales de n8n\n\n**Workflow**: el flujo completo de automatización. Puede tener desde 2 nodos hasta 50+.\n\n**Nodo**: cada paso del flujo. Puede ser un trigger, una acción, una transformación de datos, o lógica condicional.\n\n**Trigger**: el evento que dispara el workflow. Puede ser: tiempo (cada hora, cada lunes), webhook (cuando llega una petición HTTP), evento en una app (nuevo email, nuevo formulario, nuevo lead).\n\n**Credentials**: las conexiones autenticadas a tus apps. Configuras una vez, usas en todos los workflows.\n\n## Casos de uso de n8n para una agencia\n\n**Onboarding de clientes**: formulario de briefing → crea carpeta en Google Drive → crea proyecto en Linear/Notion → envía email de bienvenida con accesos → notifica al equipo en Slack.\n\n**Reporte automático de ads**: cada lunes a las 9am → extrae datos de Meta Ads API y Google Ads API → formatea en tablas → genera PDF → envía por email al cliente.\n\n**Gestión de leads**: formulario del sitio web → agrega a CRM → envía secuencia de nurturing en email → notifica al vendedor si el lead abre el email 3 veces.\n\n**Publicación de contenido**: aprueba post en Notion → webhook dispara n8n → publica en Instagram + LinkedIn + Twitter automáticamente.',
        tasks: [
          'Instala n8n en la nube (n8n.cloud tiene plan gratuito) o con Docker en tu máquina local. Configura las credenciales de Gmail y Google Sheets',
          'Construye tu primer workflow: cuando alguien llena un formulario de Google Forms → agrega la respuesta a una hoja de Google Sheets → envía un email de confirmación automático',
          'Identifica 3 procesos repetitivos en tu agencia o práctica actual que podrías automatizar con n8n. Para cada uno, dibuja el flujo: trigger → pasos → resultado',
        ],
        tip: 'El primer workflow de n8n siempre parece complicado. El segundo ya es fácil. Empieza con el más simple posible (formulario → email) y construye complejidad gradualmente.',
        completed: false,
      },
      {
        id: 'prodai-2-2',
        title: 'Workflows avanzados: IA + n8n + APIs',
        type: 'practice',
        content: '## Cuando n8n se conecta con IA, la automatización se vuelve inteligente\n\nn8n tiene nodos nativos para OpenAI, Anthropic (Claude), Google Gemini y otros modelos. Esto permite flujos donde la IA no solo ejecuta pasos mecánicos — toma decisiones, clasifica, resume y genera contenido en el medio del flujo.\n\n## Workflow de agencia con IA integrada\n\n**Lead scoring automático**:\n1. Nuevo lead desde formulario de contacto\n2. n8n pasa los datos del lead a Claude con el prompt: "Basado en estos datos, califica este lead del 1-10 según fit con una agencia digital de LATAM especializada en SaaS. Justifica brevemente"\n3. Si score > 7: notifica al equipo por Slack con prioridad alta\n4. Si score 4-7: agrega a secuencia de nurturing de email\n5. Si score < 4: solo registra en CRM sin acción\n\n**Resumen automático de reuniones**:\n1. Reunión termina en Zoom\n2. Otter.ai genera transcripción automáticamente\n3. n8n recibe el webhook de Otter con la transcripción\n4. Claude recibe la transcripción y genera: resumen ejecutivo, action items con responsable, y 3 puntos clave para el cliente\n5. El resumen se guarda en Notion en la página del cliente\n6. Se envía automáticamente por email al cliente\n\n**Monitoreo de menciones con respuesta asistida**:\n1. Google Alerts detecta mención de la marca del cliente\n2. n8n recibe el alert\n3. Claude clasifica si es positivo/negativo/neutral y sugiere una respuesta apropiada\n4. Notifica al CM con el contexto y la sugerencia de respuesta para revisión humana',
        tasks: [
          'Construye el workflow de resumen de reuniones: toma un archivo de texto como simulación de transcripción → Claude lo resume → el resumen se guarda en Google Docs',
          'Agrega un paso de clasificación de leads a tu formulario de contacto: cuando llega un nuevo envío, Claude lo clasifica y envía la notificación correcta según el score',
          'Documenta el workflow más complejo que construiste con diagrama visual (export desde n8n) y descripción de cada nodo',
        ],
        tip: 'n8n tiene una función de "error workflow" — un flujo separado que se activa cuando otro falla. Configura siempre un workflow de error para flujos críticos (como el onboarding de clientes). Un fallo silencioso es peor que un fallo visible.',
        completed: false,
      },
          {
        id: 'prodai-2-proj-inter',
        title: 'Proyecto Intermedio: Workflow n8n que conecta 3 herramientas',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Construye un workflow en n8n que conecte al menos 3 herramientas diferentes y resuelva un problema real de tu agencia.',
        deliverables: [
          'Descripción del problema que resuelve: qué proceso manual reemplaza',
          'Workflow funcional en n8n con mínimo 3 herramientas integradas',
          'Diagrama del flujo exportado desde n8n',
          'Video de demostración de 90 segundos mostrando el workflow activándose y completándose (Loom)',
          'Cálculo de tiempo ahorrado: cuántas veces por semana se ejecuta × tiempo manual que reemplaza',
        ],
        tip: 'El workflow más valioso no es el más sofisticado — es el que automatiza la tarea más repetitiva y aburrida que tienes.',
        completed: false,
      },

    {
      id: 'prodai-2-p2',
      title: 'Proyecto: Agente de automatización con n8n',
      type: 'project',
      difficulty: 'intermedio',
      projectBrief: 'Construye un workflow en n8n que tome una solicitud de usuario vía webhook, la procese con un modelo de IA para clasificarla y responda automáticamente con una acción diferente según la categoría.',
      deliverables: [
        'Workflow exportado en JSON',
        'Captura del workflow funcionando',
        'Video de 2 minutos mostrando el flujo end-to-end',
        'Documento explicando la lógica de clasificación',
      ],
      rubrica: [
        'Workflow funciona sin errores',
        'Clasificación correcta en al menos 3 categorías',
        'Manejo de errores implementado',
      ],
      completed: false,
    },],
    resources: [
      { title: 'n8n — plataforma de automatización open source', url: 'https://n8n.io', type: 'tool' },
      { title: 'n8n Templates — flujos preconfigurados para empezar rápido', url: 'https://n8n.io/workflows', type: 'tool' },
    ],
  },
  {
    id: 'prodai-capstone',
    number: 59,
    title: 'Proyecto: Sistema de productividad con IA para tu agencia',
    description: 'Integra IA y automatización en los flujos reales de tu práctica o agencia.',
    duration: '2 semanas',
    status: 'available',
    track: 'prodai',
    lessons: [
      {
        id: 'prodai-capstone-1',
        title: 'Proyecto: Stack de productividad completo',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: 'Diseña e implementa el sistema de productividad con IA de tu agencia o práctica freelance. El objetivo es que al terminar, al menos 3 procesos repetitivos en tu trabajo estén automatizados o acelerados con IA.',
        deliverables: [
          'Stack de IA documentado: herramientas elegidas, para qué uso específico, costo mensual y ROI estimado',
          'Biblioteca de prompts: mínimo 10 prompts optimizados para los casos de uso más frecuentes de tu agencia (propuestas, copy, research, reportes)',
          'Al menos 2 workflows de n8n funcionando: documentados con diagrama + descripción de cada nodo + video de demostración de 2 minutos mostrando el flujo en acción',
          'Caso de uso documentado: un proceso real que tardaba X tiempo y ahora, con IA + automatización, tarda Y. Incluye: descripción del proceso anterior, proceso nuevo, tiempo ahorrado y calidad comparativa',
          'Guía de onboarding de IA para un colaborador nuevo: cómo usarías estas herramientas si incorporaras a alguien al equipo mañana',
        ],
        tasks: [
          'Implementa los 2 workflows en n8n y graba un video de 2 minutos demostrando que funcionan',
          'Comparte el stack documentado en #proyecto-prodai y pide feedback sobre flujos que podrías mejorar o agregar',
          'Calcula el ahorro de tiempo real de los flujos implementados: horas por semana × tu tarifa horaria = valor del sistema',
        ],
        tip: 'Un sistema de IA que funciona para ti no necesariamente funciona para tu cliente. Separa: qué usas internamente para ser más eficiente (nunca lo ve el cliente) vs. qué le entregas al cliente como parte del servicio.',
        completed: false,
      },
    ],
    resources: [],
  },

  // ─── Track: Ventas y Funnels ──────────────────────────────────────────────────
  {
    id: 'ventas-1',
    number: 60,
    title: 'Ventas para servicios creativos y tech',
    description: 'Vender servicios de agencia es diferente a vender productos. Aprende el proceso completo: prospectar, calificar, presentar y cerrar sin perder tu precio.',
    duration: '2 semanas',
    status: 'available',
    track: 'ventas',
    lessons: [
      {
        id: 'ventas-1-1',
        title: 'El proceso de ventas consultivo para agencias',
        type: 'reading',
        content: '## Por qué el pitch de ventas no funciona para servicios de agencia\n\nCuando vendes un producto físico, el proceso es directo: presentas características, beneficios y precio. Cuando vendes servicios creativos o técnicos, el proceso debe ser diferente: primero entiendes el problema, luego propones la solución. El cliente que compra sin entender bien qué necesita es el cliente que termina insatisfecho, pide revisiones infinitas y daña tu reputación.\n\n## El proceso de ventas consultivo en 5 pasos\n\n**1. Prospección (crear el pipeline)**\nIdentificar prospectos que tienen el problema que resuelves, el presupuesto para pagarte y la autoridad para tomar la decisión. Fuentes: red personal, contenido en redes, referidos, outreach directo.\n\n**2. Discovery call (escuchar antes que hablar)**\nLa discovery no es una presentación de tu agencia — es una entrevista al prospecto. Preguntas clave:\n- ¿Cuál es el mayor desafío que tienes en [área relevante] ahora mismo?\n- ¿Qué has intentado antes? ¿Por qué no funcionó?\n- ¿Cuál sería el impacto de resolver este problema?\n- ¿Cuándo necesitas que esté resuelto?\n- ¿Tienes presupuesto definido para esto?\n\n**3. Propuesta personalizada (48-72 horas después)**\nBased on exactamente lo que escuchaste. No es un catálogo de servicios — es una solución específica al problema específico que describieron.\n\n**4. Presentación y negociación**\nPresenta el valor antes del precio. El precio nunca debería ser el primer número que escucha el cliente.\n\n**5. Cierre y follow-up**\nPedir explícitamente la decisión. Manejar objeciones. Follow-up sistemático.',
        tasks: [
          'Escribe el guión de tu discovery call: 8-10 preguntas que harías a un prospecto de los servicios que ofreces. Practica en voz alta hasta que suenen naturales',
          'Define el perfil de tu cliente ideal (ICP): industria, tamaño, etapa de negocio, problema específico, presupuesto aproximado, y señales de que ES un buen prospecto vs. señales de alerta',
          'Roleplay de discovery call: pide a alguien que juegue al cliente y practica tu proceso completo de 30 minutos. Graba o pide feedback',
        ],
        tip: 'La discovery call más efectiva tiene 80% de preguntas del vendedor y 20% de respuestas del vendedor. Si hablas más de lo que escuchas, estás haciendo pitch, no discovery.',
        completed: false,
      },
      {
        id: 'ventas-1-2',
        title: 'Manejo de objeciones: precio, tiempo y confianza',
        type: 'reading',
        content: '## Las 3 objeciones universales en ventas de servicios\n\nToda objeción en ventas de servicios profesionales es una variación de tres cosas:\n\n**1. "Es muy caro"** (objeción de precio)\nEn el 90% de los casos, no es que no tengan el dinero — es que no ven suficiente valor para justificar el precio. La respuesta no es bajar el precio; es aumentar el valor percibido o reducir el scope para ajustarlo al presupuesto.\n\nRespuesta efectiva: "Entiendo que el presupuesto es una consideración importante. ¿Qué resultado necesitas ver para que esta inversión se justifique sola?"\n\nLuego: calcular el ROI. Si tu servicio de $5,000 puede generar $20,000 en valor, el precio es una inversión, no un gasto.\n\n**2. "Ahora no es buen momento"** (objeción de timing)\nEsta objeción casi siempre significa una de dos cosas: no están convencidos del valor, o hay algo que les frena que no han dicho.\n\nRespuesta efectiva: "Entiendo. ¿Cuándo sería un buen momento? ¿Qué necesitaría pasar para que el timing sea correcto?"\n\n**3. "Necesito pensarlo / consultarlo"** (objeción de autoridad)\nSi alguien necesita consultarlo, hay otra persona que toma la decisión. La pregunta es: ¿por qué no están en esta llamada?\n\nRespuesta efectiva: "Por supuesto. ¿Tendría sentido incluir a esa persona en una próxima llamada para que tengamos toda la información disponible?"\n\n## Sostener el precio\n\nEl momento más difícil en ventas de servicios: cuando el cliente presiona el precio y tú tienes miedo de perder el negocio. Herramientas para sostener:\n- Silencio estratégico (después de dar el precio, callarse)\n- "¿Qué necesitaríamos cambiar en el scope para ajustar el presupuesto?" (cedes scope, no precio)\n- Mostrar el costo de NO resolver el problema',
        tasks: [
          'Escribe la respuesta completa a las 3 objeciones para tus servicios específicos: no las genéricas de arriba, adaptadas a tu contexto real',
          'Practica con roleplay: pide que alguien te diga "es muy caro" con tu precio real y ensaya la respuesta hasta que no sientas incomodidad al darla',
          'Calcula el ROI de tu servicio principal para un cliente típico: cuánto valor genera para el cliente vs. lo que cobras. Este número es tu argumento más poderoso',
        ],
        tip: 'La primera vez que alguien dices tu precio real en voz alta es incómoda. La décima vez es natural. La única forma de llegar a la décima es haberlo dicho nueve veces antes. Practica en voz alta, solo, hasta que el número no te produzca ansiedad.',
        completed: false,
      },
      {
        id: 'ventas-1-3',
        title: 'Funnels digitales para generar leads de forma predecible',
        type: 'reading',
        content: '## La diferencia entre conseguir clientes y tener un sistema de clientes\n\nConseguir un cliente es un evento. Un funnel de ventas es un sistema que genera prospectos de forma predecible. La diferencia entre una agencia que vive de referidos (irregular, sin control) y una que tiene un flujo constante de leads (predecible, escalable).\n\n## Los 4 componentes de un funnel de ventas digital\n\n**1. Tráfico**: la fuente que trae personas al funnel. Puede ser orgánico (SEO, contenido social, LinkedIn), pagado (Meta Ads, Google Ads), o referidos (programa de afiliados, partnerships).\n\n**2. Lead magnet + landing page**: la oferta gratuita de alto valor que intercambias por el email. Para servicios B2B: diagnóstico gratuito, checklist de auditoría, guía específica, plantilla. La landing page debe tener: headline que identifica el pain, beneficios del lead magnet, prueba social, y un formulario simple.\n\n**3. Nurturing (secuencia de emails + contenido)**: el proceso de construir confianza y demostrar expertise antes de hacer cualquier pitch. Puede durar días o semanas dependiendo del ticket del servicio.\n\n**4. Conversión**: el CTA final que invita a la acción. Para servicios de agencia: reserva una llamada de discovery, completa este diagnóstico gratuito, envía tu solicitud.\n\n## Herramientas para construir el funnel\n\n**Landing pages**: Framer, Webflow, o incluso una página de Next.js simple para agencias técnicas.\n\n**Email**: Brevo, Mailchimp, ConvertKit.\n\n**CRM y pipeline**: HubSpot Free, Notion, o Airtable para rastrear en qué etapa está cada prospecto.\n\n**Booking de llamadas**: Calendly (plan gratuito) para que los prospectos agenden la discovery call directamente sin ida y vuelta de emails.',
        tasks: [
          'Diseña el funnel de ventas completo para tu servicio principal: fuente de tráfico, lead magnet, secuencia de nurturing (3 emails) y CTA de conversión',
          'Crea la landing page del lead magnet en Framer o con el stack que uses (no tiene que ser perfecta — tiene que existir y funcionar)',
          'Configura Calendly para tu discovery call con: duración (30 min), preguntas de calificación (3 preguntas que te ayuden a preparar la llamada), y conexión a tu calendario',
        ],
        tip: 'El funnel más efectivo para una agencia nueva no es el más sofisticado — es el que te permite hablar con más prospectos calificados. Una landing page simple + Calendly + seguimiento manual al principio supera a un funnel automatizado complicado que nunca se lanza.',
        completed: false,
      },
          {
        id: 'ventas-1-proj-basico',
        title: 'Proyecto Básico: Guión de discovery call',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Escribe el guión completo de tu discovery call. Debe ser específico para los servicios que ofreces.',
        deliverables: [
          'Introducción: cómo abres la llamada y estableces el tono (2-3 líneas)',
          'Preguntas de discovery: 8-10 preguntas abiertas específicas para tu tipo de cliente',
          'Preguntas de calificación: las 3 preguntas que determinan si el prospecto es un buen fit',
          'Cierre de la discovery: cómo terminas la llamada y cuáles son los próximos pasos',
          'Roleplay documentado: practica el guión con alguien y anota qué funcionó y qué ajustar',
        ],
        tip: 'El guión de discovery no se memoriza — se internaliza. Practica en voz alta hasta que las preguntas salgan naturales.',
        completed: false,
      },
      {
        id: 'ventas-1-proj-inter',
        title: 'Proyecto Intermedio: Propuesta de servicios completa',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Redacta una propuesta de servicios completa para un cliente real o ficticio basándote en un brief de discovery.',
        deliverables: [
          'Contexto del cliente: el problema identificado en la discovery en las palabras del cliente',
          'Solución propuesta: qué harás exactamente, en qué orden y con qué entregables',
          'Proceso de trabajo: las fases del proyecto con fechas y gates de aprobación',
          'Inversión: el precio presentado como inversión con el ROI esperado si aplica',
          'Próximos pasos: qué tiene que hacer el cliente para arrancar',
          'Propuesta en formato visual (Notion, Google Docs o PDF) con diseño limpio y legible',
        ],
        tip: 'El precio en una propuesta nunca debería ser la primera cifra que el cliente lee. Presenta el valor primero, el precio último.',
        completed: false,
      },

    {
      id: 'ventas-1-p2',
      title: 'Proyecto: Script de llamada de ventas',
      type: 'project',
      difficulty: 'básico',
      projectBrief: 'Crea un script completo para una llamada de descubrimiento de 20 minutos. Incluye apertura, preguntas de descubrimiento, manejo de objeciones más comunes y cierre.',
      deliverables: [
        'Script estructurado por fases',
        'Mínimo 5 preguntas de descubrimiento',
        'Respuestas a 3 objeciones típicas',
        'Frase de cierre con siguiente paso claro',
      ],
      rubrica: [
        'Apertura natural, no de vendedor',
        'Preguntas abiertas que generan insight',
        'Manejo de objeciones sin presión',
      ],
      completed: false,
    },],
    resources: [
      { title: 'Calendly — agenda discovery calls sin ida y vuelta de emails', url: 'https://calendly.com', type: 'tool' },
      { title: 'HubSpot Free CRM — gestión de pipeline de ventas gratuito', url: 'https://www.hubspot.com/products/crm', type: 'tool' },
    ],
  },
  {
    id: 'ventas-capstone',
    number: 61,
    title: 'Proyecto: Funnel completo de ventas',
    description: 'Construye y lanza el sistema completo de generación de leads para tu agencia.',
    duration: '2 semanas',
    status: 'available',
    track: 'ventas',
    lessons: [
      {
        id: 'ventas-capstone-1',
        title: 'Proyecto: Sistema de ventas de agencia',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: 'Diseña e implementa el sistema completo de ventas para tu agencia: desde la generación de leads hasta el cierre. El entregable es un sistema funcional, no un plan en papel.',
        deliverables: [
          'ICP documentado: perfil del cliente ideal con todos los atributos: industria, tamaño, etapa, problema, presupuesto, señales positivas y de alerta',
          'Lead magnet + landing page: el lead magnet creado (PDF, checklist, template) y la landing page publicada en internet (URL real)',
          'Secuencia de nurturing: 5 emails escritos y configurados en la herramienta de email marketing',
          'Guión de discovery call: preguntas, flujo de la llamada, y respuestas a las 3 objeciones principales',
          'CRM configurado: pipeline con 5 etapas (prospecto → discovery → propuesta → negociación → cerrado) y al menos 3 prospectos reales registrados',
          'Calendly configurado: link de booking con preguntas de calificación y conectado al calendario real',
          'Métricas del primer mes: cuántos leads generó el funnel, cuántas discovery calls se realizaron, cuántas propuestas se enviaron',
        ],
        tasks: [
          'Lanza el funnel: landing page publicada, secuencia de email activa, Calendly funcional. Comparte el link en #proyecto-ventas',
          'Realiza al menos 1 discovery call real (con un prospecto real o un compañero en roleplay) y documenta cómo fue',
          'Comenta el sistema de al menos 2 compañeros con feedback sobre la landing page y la secuencia de nurturing',
        ],
        tip: 'El mejor funnel de ventas es el que realmente usas. Un sistema simple que ejecutas consistentemente supera a un sistema sofisticado que no arrancas nunca.',
        completed: false,
      },
    ],
    resources: [],
  },

  // ─── UI/UX additions: lo que Platzi tiene que nosotros no ────────────────────
  {
    id: 'uiux-9',
    number: 62,
    title: 'UX Writing: el copy que hace las interfaces funcionar',
    description: 'Las palabras de una interfaz no son decoración — son parte del diseño. Aprende a escribir microcopy, mensajes de error, onboarding y empty states que guían sin frustrar.',
    duration: '2 semanas',
    status: 'available',
    track: 'uiux',
    lessons: [
      {
        id: 'uiux-9-1',
        title: 'Qué es UX Writing y por qué define la experiencia tanto como el diseño',
        type: 'reading',
        content: '## Las palabras son parte del diseño\n\nEl diseño de una interfaz no termina en los colores, tipografía y layout. Termina cuando el usuario completa la tarea que vino a hacer. Y las palabras que guían ese proceso son tan críticas como cualquier elemento visual.\n\nUX Writing es la disciplina de diseñar el texto de las interfaces: botones, mensajes de error, labels de formularios, tooltips, empty states, onboarding y cualquier palabra que el usuario lee mientras usa el producto.\n\n## La diferencia entre copywriting y UX Writing\n\n**Copywriting** (marketing): el objetivo es persuadir, convertir, vender. Puede ser creativo, emocional, largo.\n\n**UX Writing** (interfaces): el objetivo es guiar, aclarar y reducir fricción. Debe ser claro, conciso, útil. Un buen UX Writer no se nota — la experiencia fluye sin que el usuario piense en las palabras.\n\n## Los principios del buen UX Writing\n\n**Claro**: el usuario no debería tener que interpretar. Si un mensaje de error dice "Error 403", el usuario no sabe qué hacer. Si dice "No tienes permiso para ver esta página — inicia sesión para continuar", sí.\n\n**Conciso**: cada palabra que no agrega valor, sobra. "Haz clic aquí para continuar con el proceso de registro" → "Registrarse"\n\n**Útil**: ¿qué necesita saber el usuario en este momento? Ni más ni menos.\n\n**Consistente**: mismos términos para las mismas acciones. Si en una pantalla dices "Guardar" y en otra "Salvar", el usuario duda si son lo mismo.\n\n**Humano**: las interfaces no deben sonar a robots. "Su solicitud ha sido procesada exitosamente" → "¡Listo! Tu pedido está confirmado"',
        tasks: [
          'Revisa 3 apps o sitios que usas frecuentemente. Encuentra 3 ejemplos de mal UX Writing (mensajes confusos, errores crípticos, botones ambiguos) y propón una versión mejorada',
          'Reescribe este mensaje de error usando los principios de UX Writing: "Error al procesar la solicitud. Código: ERR_INVALID_INPUT_002. Contacte al administrador del sistema"',
          'Compara el UX Writing de dos competidores directos en el mismo sector. ¿Cuál tiene mejor voz y tono? ¿Por qué?',
        ],
        tip: 'El test más simple de UX Writing: pídele a alguien que nunca ha visto la interfaz que haga una tarea sin instrucciones. Donde se confunde o pregunta "¿qué significa esto?", hay un problema de UX Writing.',
        completed: false,
      },
      {
        id: 'uiux-9-2',
        title: 'Microcopy en práctica: botones, errores, empty states y onboarding',
        type: 'practice',
        content: '## Los 5 tipos de microcopy que más impacto tienen\n\n**1. Botones y CTAs**\nEl texto del botón debe decir QUÉ PASA cuando haces clic, no qué acción realizas. "Enviar" → "Publicar mi artículo". "Siguiente" → "Ver los precios". "Confirmar" → "Reservar mi lugar".\n\n**2. Mensajes de error**\nLa fórmula del buen error message:\n- Qué pasó (sin tecnicismos)\n- Por qué pasó (si es relevante para el usuario)\n- Qué hacer ahora\nEjemplo: "No pudimos verificar tu email. Revisa que no haya typos — o prueba con una dirección diferente."\n\n**3. Empty states**\nCuando el usuario llega a una sección vacía (bandeja de entrada vacía, lista sin items), la mayoría de interfaces muestra solo "No hay nada aquí". Un buen empty state:\n- Explica por qué está vacío\n- Invita a la primera acción\n- Usa un tono positivo, no de error\nEjemplo: "Tu bandeja está limpia ✓" + "Aquí aparecerán los mensajes que recibas de tus clientes"\n\n**4. Onboarding y walkthroughs**\nLas instrucciones de onboarding deben responder: ¿qué puedo hacer aquí? ¿por qué me beneficia? ¿cuál es el primer paso obvio? Nunca asumas que el usuario entiende el valor desde el inicio.\n\n**5. Tooltips e información de ayuda**\nContexto justo cuando lo necesitas. Los tooltips no deben explicar la interfaz — deben agregar información que no cabe en el label. "Contraseña" no necesita tooltip. "Webhook URL" sí: "La URL a la que enviaremos las notificaciones cuando haya un evento".',
        tasks: [
          'Reescribe los 5 botones más confusos de una app que uses diariamente. Aplica la fórmula: el botón dice QUÉ PASA, no qué haces',
          'Diseña el empty state de un inbox de mensajes dentro de una app de gestión de proyectos: texto + icono o ilustración sugerida',
          'Escribe el onboarding en 3 pasos para un producto SaaS de tu elección: qué ve el usuario en el paso 1, 2 y 3 del wizard de configuración inicial',
        ],
        tip: 'Prueba siempre el microcopy con personas reales. Lo que parece obvio para quien diseñó el producto suele ser confuso para quien lo usa por primera vez. 5 minutos de usability testing revelan más que horas de deliberación interna.',
        completed: false,
      },
      {
        id: 'uiux-9-3',
        title: 'Voz y tono de marca en interfaces',
        type: 'reading',
        content: '## Voz vs. Tono\n\n**La voz** es constante — la personalidad de la marca expresada en palabras. Informal, directo, empático, técnico, cálido. No cambia.\n\n**El tono** varía según el contexto. La misma marca puede tener un tono celebratorio cuando el usuario completa algo ("¡Excelente! Tu perfil está completo") y un tono serio y claro cuando hay un problema de seguridad ("Detectamos actividad inusual en tu cuenta. Revisa tus dispositivos conectados").\n\n## Cómo definir la voz de una marca en una interfaz\n\n**Paso 1: Define 3-4 adjetivos de personalidad**\nEj: "Directo, experto, sin relleno, accesible". Estos adjetivos guían cada decisión de copy.\n\n**Paso 2: Define el antónimo de cada uno**\n"Directo" ≠ "Grosero". "Experto" ≠ "Condescendiente". Los antónimos te dicen dónde está la línea.\n\n**Paso 3: Crea ejemplos de voz en diferentes contextos**\nEscribe cómo sonaría la marca en: un mensaje de bienvenida, un error grave, una confirmación exitosa, y un tooltip técnico.\n\n**Paso 4: Construye el glosario de términos**\nQué palabras usamos y qué palabras nunca usamos. "Factura" o "invoice"? "Usuario" o "cliente"? "Eliminar" o "borrar"? La consistencia en terminología reduce la fricción cognitiva.\n\n## Content design para interfaces de alta complejidad\n\nEn productos con flujos complejos (onboarding de 10 pasos, configuración técnica, contratos y términos legales), el UX Writer trabaja junto al diseñador desde el wireframe, no al final. El copy no se agrega encima del diseño — es parte del diseño.',
        tasks: [
          'Define la voz de tu propia agencia o de un cliente: 4 adjetivos de personalidad + el antónimo de cada uno + 3 frases de ejemplo en diferentes contextos de interfaz',
          'Crea el glosario de términos para un producto SaaS: 10 términos con la definición de cuándo usar cada uno y por qué',
          'Reescribe la sección de "Términos y condiciones" de cualquier app que uses, traduciendo el lenguaje legal a lenguaje humano (para una cláusula importante)',
        ],
        tip: 'Las interfaces que suenan como robots suelen ser el resultado de copy escrito por abogados o desarrolladores. Un UX Writer que trabaja desde el wireframe previene el 80% de los problemas de microcopy antes de que lleguen a producción.',
        completed: false,
      },
    ],
    resources: [
      { title: 'UX Writing Hub — recursos y comunidad de UX Writing', url: 'https://uxwritinghub.com', type: 'article' },
      { title: 'Figma Content — plugin para gestionar copy en Figma', url: 'https://www.figma.com/community/plugin/731627216655469804', type: 'tool' },
    ],
  },
  {
    id: 'uiux-10',
    number: 63,
    title: 'UX Testing: validar con usuarios reales',
    description: 'El diseño que no se testea con usuarios es solo una hipótesis. Aprende las técnicas de research y testing que usan los mejores equipos de producto.',
    duration: '2 semanas',
    status: 'available',
    track: 'uiux',
    lessons: [
      {
        id: 'uiux-10-1',
        title: 'Métodos de UX Research: cuándo usar cada uno',
        type: 'reading',
        content: '## El mapa de métodos de UX Research\n\nExiste una enorme cantidad de métodos de investigación en UX. La clave no es conocerlos todos — es saber cuándo usar cuál según el stage del producto, el presupuesto y la pregunta que necesitas responder.\n\n## Los 4 métodos más usados en agencias\n\n**1. Entrevistas con usuarios (User Interviews)**\nCuándo usarlo: cuando necesitas entender el problema antes de diseñar la solución. Al inicio del proyecto, cuando hay conflicto sobre qué necesita el usuario.\nCómo: 30-60 minutos de conversación semi-estructurada con 5-8 usuarios representativos. Escucha, no guías. La meta es sorprenderte, no confirmar lo que ya piensas.\nOutput: insights cualitativos sobre comportamientos, frustraciones y objetivos reales.\n\n**2. Pruebas de usabilidad (Usability Testing)**\nCuándo usarlo: cuando tienes un prototipo o un producto ya construido y quieres saber si la gente puede usarlo.\nCómo: le pides al usuario que complete tareas específicas mientras observas (sin ayudar). Mides: ¿puede completar la tarea? ¿dónde se confunde? ¿cuánto tiempo tarda?\nOutput: problemas específicos del diseño con evidencia directa de usuarios.\n\n**3. Card Sorting**\nCuándo usarlo: cuando necesitas diseñar la arquitectura de información de un sitio o app (qué va en qué menú, cómo organizar las categorías).\nCómo: el usuario organiza tarjetas con conceptos en grupos que tienen sentido para él. Revela el modelo mental del usuario, que puede diferir completamente del modelo mental del equipo.\nOutput: arquitectura de información basada en cómo piensa el usuario, no en cómo piensa el equipo.\n\n**4. A/B Testing**\nCuándo usarlo: cuando tienes dos hipótesis concretas y suficiente tráfico para obtener resultados estadísticamente significativos.\nCómo: mostrar la variante A al 50% del tráfico y la variante B al otro 50%. Medir cuál genera más conversiones/clics/tiempo en página.\nOutput: evidencia cuantitativa de qué diseño funciona mejor.',
        tasks: [
          'Conduce una entrevista de usuario de 20 minutos con alguien de tu audiencia objetivo. Prepara 8 preguntas abiertas y documenta los insights más inesperados',
          'Diseña un plan de usability test para un prototipo tuyo o de un cliente: 5 tareas que el usuario debe completar, métricas que medirás y cómo reclutarás los participantes',
          'Hace un card sorting de 15-20 tarjetas con 3 personas y analiza los patrones: ¿dónde agruparon igual? ¿dónde difirieron? ¿qué implica eso para la arquitectura de información?',
        ],
        tip: 'El sesgo de confirmación es el enemigo del UX Research. Antes de cada sesión, escribe explícitamente qué esperas encontrar — luego activamente busca evidencia que contradiga esas expectativas. Eso es donde están los insights reales.',
        completed: false,
      },
      {
        id: 'uiux-10-2',
        title: 'Pruebas de usabilidad sin laboratorio: herramientas y técnicas',
        type: 'practice',
        content: '## Hacer UX Testing sin presupuesto de laboratorio\n\nLas grandes empresas tienen laboratorios de UX con espejos unidireccionales, grabaciones profesionales y paneles de usuarios pagados. Las agencias y startups no tienen eso — y no lo necesitan. Las pruebas de usabilidad más valiosas se pueden hacer con Zoom, un prototipo en Figma, y 5 personas.\n\n## La regla de los 5 usuarios\n\nJakob Nielsen demostró que con solo 5 usuarios en una prueba de usabilidad, encuentras el 85% de los problemas de usabilidad del diseño. No necesitas 100 personas. 5 bien seleccionados son suficientes para identificar los problemas críticos.\n\n## Herramientas para UX Testing remoto\n\n**Maze**: conecta con Figma y te permite crear tests remotos sin moderador. El usuario recibe un link, completa las tareas solo, y Maze registra: si completó la tarea, cuánto tardó, en qué hizo clic, y el heatmap de clics. Resultados cuantitativos automáticos.\n\n**UserTesting.com**: plataforma con panel de usuarios que puedes contratar. En 2 horas tienes videos de 5 usuarios completando tus tareas. Más caro pero más rápido.\n\n**Lookback.io**: para tests moderados en video. El investigador guía la sesión por Zoom mientras el software graba la pantalla, la cara y el audio.\n\n**Zoom + FigJam**: el setup más básico y gratuito. Pides al usuario que comparta pantalla en Zoom, le pides que complete tareas en el prototipo de Figma, observas y tomas notas en FigJam.\n\n## Cómo moderar sin contaminar los resultados\n\nError común: "¿Entendiste para qué sirve este botón?" (pregunta directiva). Correcto: "¿Qué harías ahora?" (pregunta abierta).\n\nLa regla de oro: no respondas ninguna pregunta del usuario durante el test. Si el usuario pregunta "¿Aquí debo hacer clic?", la respuesta es "¿Qué harías tú normalmente?".',
        tasks: [
          'Configura un test de usabilidad remoto en Maze con un prototipo de Figma (puede ser uno existente): 3 tareas, métricas de tiempo y completion rate',
          'Modera una sesión de usabilidad de 20 minutos por Zoom con un usuario real. Graba la sesión (con permiso) y documenta los 3 problemas de usabilidad más importantes que encontraste',
          'Analiza los resultados del test de Maze: qué tareas tuvieron menor completion rate y qué implica eso para rediseñar esos flujos',
        ],
        tip: 'Testa el prototipo, no al usuario. El objetivo no es descubrir si el usuario "entiende" — es descubrir qué partes del diseño confunden. La responsabilidad siempre está en el diseño, no en la inteligencia del usuario.',
        completed: false,
      },
    ],
    resources: [
      { title: 'Maze — plataforma de usability testing conectada a Figma', url: 'https://maze.co', type: 'tool' },
      { title: 'Nielsen Norman Group — recursos de UX Research de referencia', url: 'https://www.nngroup.com', type: 'article' },
    ],
  },

  // ─── IA additions: lo que Platzi tiene que nosotros no ───────────────────────
  {
    id: 'ia-5',
    number: 64,
    title: 'Agentes de IA: construir sistemas que razonan y actúan',
    description: 'Los agentes de IA son el siguiente nivel de automatización: no solo ejecutan tareas — razonan, toman decisiones y usan herramientas de forma autónoma. Aprende a construirlos.',
    duration: '3 semanas',
    status: 'available',
    track: 'ia',
    lessons: [
      {
        id: 'ia-5-1',
        title: 'Qué es un agente de IA y cómo se diferencia de un chatbot',
        type: 'reading',
        content: '## La diferencia fundamental\n\nUn chatbot responde preguntas. Un agente de IA razona, planifica, usa herramientas y ejecuta tareas de múltiples pasos para lograr un objetivo.\n\nEjemplo: le dices al chatbot "¿Cuánto cuesta un vuelo a Madrid?" y te da información. Le dices al agente "Búscame el vuelo más barato a Madrid para el 15 de julio, con menos de 1 escala, asiento de ventana, y reserva el que esté por debajo de $800" — y el agente busca, compara, verifica disponibilidad y hace la reserva.\n\n## Los componentes de un agente de IA\n\n**LLM (Large Language Model)**: el cerebro que razona, planifica y genera texto. GPT-4o, Claude, Gemini.\n\n**Herramientas (Tools/Functions)**: las acciones que el agente puede ejecutar. Buscar en internet, leer archivos, enviar emails, llamar APIs, acceder a bases de datos. El agente decide cuándo y cómo usar cada herramienta.\n\n**Memoria**: el contexto que el agente retiene. Short-term (conversación actual), long-term (base de datos persistente de información sobre el usuario o el proyecto).\n\n**Planning**: la capacidad de dividir un objetivo complejo en subtareas y ejecutarlas en orden.\n\n## Casos de uso de agentes en una agencia\n\n**Agente de research**: le dices "Analiza los últimos 3 meses de redes sociales de [competidor] y dame un informe de su estrategia de contenidos, sus posts con más engagement y los temas que más resuenan con su audiencia". El agente busca, recopila, analiza y genera el reporte.\n\n**Agente de SEO**: monitorea el ranking de keywords de un cliente, detecta caídas, identifica la causa probable y sugiere acciones correctivas automáticamente.\n\n**Agente de atención al cliente**: responde consultas de clientes en nombre de la marca, con acceso a la base de datos de productos, políticas y FAQ. Escala a humano solo cuando el caso lo requiere.',
        tasks: [
          'Diseña en papel (no código) la arquitectura de un agente de IA para uno de los casos de uso de tu agencia: qué herramientas necesita, qué decisiones toma solo y cuándo involucra a un humano',
          'Explora la documentación de Claude Tool Use o OpenAI Function Calling. Identifica los conceptos clave: cómo el modelo "llama" a una función y cómo procesa el resultado',
          'Encuentra 3 plataformas no-code para construir agentes (ej: Voiceflow, Botpress, n8n con AI nodes) y compara sus capacidades y casos de uso',
        ],
        tip: 'Un agente de IA mal diseñado toma decisiones erróneas con mucha confianza. El diseño de "guardrails" (limitaciones explícitas de lo que el agente puede y no puede hacer) es tan importante como el diseño del agente mismo.',
        completed: false,
      },
      {
        id: 'ia-5-2',
        title: 'Construir agentes con n8n + LLM: sin código, con lógica real',
        type: 'practice',
        content: '## Por qué n8n es la plataforma ideal para agentes no-code\n\nn8n tiene nodos de IA nativos que se pueden encadenar para crear flujos donde el LLM no solo genera texto — toma decisiones sobre qué herramienta usar, ejecuta esas herramientas, y procesa los resultados en un ciclo.\n\n## El patrón de agente más común en n8n\n\n**ReAct Loop (Reason + Act)**:\n1. El usuario envía un objetivo (ej: "Analiza el sitio web de este competidor")\n2. El LLM razona: ¿qué información necesito? → "Necesito el contenido del sitio, sus redes sociales y sus reviews"\n3. El LLM usa herramientas: llama al nodo de scraping, al nodo de búsqueda web, al nodo de extracción de datos\n4. El LLM analiza los resultados\n5. ¿Necesita más información? → vuelve al paso 2. ¿Tiene suficiente? → genera el output final\n\n## Construir un agente de research en n8n\n\n**Nodos necesarios**:\n- Trigger (webhook o chat UI)\n- AI Agent (n8n tiene nodo nativo de AI Agent)\n- Herramientas: Web Search (SerpApi o Tavily), HTTP Request (para APIs), Code (JavaScript para procesamiento de datos)\n- Output: envía el reporte por email o lo guarda en Notion\n\n## Memoria en agentes con n8n\n\nn8n permite conectar el agente a una base de datos vectorial (como Pinecone o Qdrant) para darle memoria persistente. Esto permite que el agente recuerde conversaciones anteriores, el contexto del cliente, y decisiones previas — convirtiéndolo en un asistente que mejora con cada interacción.',
        tasks: [
          'Construye un agente básico en n8n: el usuario envía una URL de sitio web → el agente extrae el contenido → Claude lo analiza → el agente responde con: 3 fortalezas, 3 debilidades y 3 oportunidades del sitio',
          'Agrega una herramienta de búsqueda web al agente (SerpApi o Tavily) para que pueda buscar información adicional sobre la empresa antes de hacer el análisis',
          'Documenta el workflow con diagrama y comparte en #ia-agentes con una descripción de qué hace cada nodo',
        ],
        tip: 'Empieza con agentes de un solo paso antes de intentar bucles de razonamiento complejo. "El usuario manda texto → Claude lo analiza → el agente responde" ya es un agente básico. La complejidad viene gradualmente.',
        completed: false,
      },
      {
        id: 'ia-5-3',
        title: 'Agentes de IA con código: LangChain y Claude Tool Use',
        type: 'reading',
        content: '## Cuándo no es suficiente el no-code\n\nn8n y herramientas similares son potentes para el 80% de los casos de uso. Pero hay situaciones que requieren código:\n- Lógica condicional muy compleja\n- Procesamiento de datos a escala\n- Integración con APIs que n8n no soporta nativamente\n- Agentes con memoria vectorial personalizada\n- Deployment de agentes como microservicios\n\n## Claude Tool Use (Function Calling)\n\nAnthropic tiene soporte nativo para herramientas (tools) — funciones que el modelo puede llamar cuando necesita información o acción externa. El flujo:\n\n1. Defines las herramientas disponibles (búsqueda web, base de datos, API de calendario, etc.) con una descripción y el schema de parámetros\n2. Le das al modelo un mensaje del usuario\n3. El modelo responde indicando qué herramienta usar y con qué parámetros\n4. Tu código ejecuta la herramienta y devuelve el resultado\n5. El modelo procesa el resultado y decide si necesita más herramientas o si ya tiene suficiente para responder\n\n## LangChain: el framework de agentes más popular\n\nLangChain es el framework de Python/JavaScript más usado para construir agentes de IA. Tiene abstracciones para: chains (secuencias de pasos), agents (razonamiento con herramientas), memory (persistencia de contexto), y RAG (retrieval-augmented generation para dar contexto al modelo desde una base de datos).\n\nNo es necesario entender LangChain a profundidad para ser efectivo — pero conocer su estructura te ayuda a entender el patrón de diseño de agentes y comunicarte con desarrolladores que lo usan.',
        tasks: [
          'Lee la documentación de Claude Tool Use y reproduce el ejemplo básico de la documentación: define 1 herramienta simple, envía un mensaje que requiera usarla, y procesa el tool_use response',
          'Explora LangChain Docs y construye el agente más básico del tutorial "Quickstart": un agente que puede buscar en DuckDuckGo para responder preguntas',
          'Compara: ¿cuándo usarías n8n vs. LangChain para construir el mismo agente? Define 3 criterios de decisión',
        ],
        tip: 'No necesitas aprender LangChain para construir agentes útiles. n8n con los nodos de AI Agent es suficiente para el 90% de casos de uso de una agencia. Aprende LangChain cuando los requisitos técnicos de un proyecto específico lo requieran.',
        completed: false,
      },
    ],
    resources: [
      { title: 'Anthropic Tool Use Documentation', url: 'https://docs.anthropic.com/claude/docs/tool-use', type: 'documentation' },
      { title: 'n8n AI Nodes — construye agentes sin código', url: 'https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent', type: 'documentation' },
      { title: 'LangChain — framework de agentes en Python/JS', url: 'https://python.langchain.com/docs/get_started/quickstart', type: 'documentation' },
    ],
  },
  {
    id: 'ia-6',
    number: 65,
    title: 'IA para creativos: imágenes, video y audio generativo',
    description: 'Integra generación de imágenes, video y audio con IA en los flujos creativos de la agencia. Midjourney, Stable Diffusion, Runway y más.',
    duration: '2 semanas',
    status: 'available',
    track: 'ia',
    lessons: [
      {
        id: 'ia-6-1',
        title: 'Generación de imágenes con IA: Midjourney, DALL-E y Stable Diffusion',
        type: 'practice',
        content: '## El estado del arte en generación de imágenes en 2025\n\nEn 2025, la generación de imágenes con IA pasó de ser un experimento a ser una herramienta de producción estándar en agencias y estudios de diseño. Las tres plataformas principales:\n\n**Midjourney**: la mejor calidad estética general. Interfaz en Discord. El modelo más popular entre diseñadores y creativos. Plan desde $10/mes.\n\n**DALL-E 3 (integrado en ChatGPT)**: el más accesible y con mejor seguimiento de instrucciones de texto. Ideal para conceptos que requieren descripción precisa o integración con texto.\n\n**Stable Diffusion (local/ComfyUI)**: open source, corre en tu máquina si tienes GPU. Máxima flexibilidad y control — puedes entrenar modelos personalizados con el estilo de una marca específica. Curva de aprendizaje más alta.\n\n**Ideogram**: especializado en generar imágenes con texto integrado (logos conceptuales, posters, thumbnails con texto legible). Resuelve el problema histórico de la IA con texto en imágenes.\n\n## Casos de uso en una agencia\n\n**Moodboards en minutos**: en lugar de buscar referencias en Pinterest por horas, generas 20 variaciones de concepto en 20 minutos. El cliente elige el estilo y el diseñador lo ejecuta.\n\n**Assets de contenido social**: thumbnails de YouTube, posts de Instagram, fondos para Reels. Producción masiva de assets visuales con consistencia de estilo.\n\n**Conceptos de brand identity**: explorar 10 direcciones visuales antes de elegir una para desarrollar. El proceso de exploración pasa de días a horas.\n\n**Mockups y visualizaciones**: mostrar al cliente cómo quedará el diseño en un contexto real (packaging en una tienda, señalética en un edificio, merch con la marca).',
        tasks: [
          'Genera 3 variaciones de moodboard para un cliente ficticio usando Midjourney o DALL-E: define el concepto visual y escribe el prompt completo (estilo, paleta, mood, composición, formato)',
          'Crea 5 thumbnails de YouTube para un canal del sector que elijas, todos con el mismo estilo visual coherente. Itera hasta lograr consistencia entre las 5 imágenes',
          'Compara el resultado de los mismos 3 prompts en Midjourney vs. DALL-E. Documenta: cuál sigue mejor las instrucciones, cuál tiene mejor calidad estética, cuál es más útil para tu flujo de trabajo',
        ],
        tip: 'La calidad de los resultados de generación de imágenes depende directamente de la calidad del prompt. Invierte 10 minutos en construir el prompt correcto antes de generar. Un prompt bien construido ahorra 30 minutos de iteraciones.',
        completed: false,
      },
      {
        id: 'ia-6-2',
        title: 'Video e IA: Runway, Kling y el futuro de la producción',
        type: 'reading',
        content: '## El video generativo en 2025: ya es viable para producción\n\nHace 2 años, el video generado con IA era inestable — personas con manos de 7 dedos, movimientos imposibles, coherencia visual inexistente. En 2025, modelos como Runway Gen-3, Kling AI y Sora producen video de calidad suficiente para casos de uso comerciales reales.\n\n## Herramientas de video con IA\n\n**Runway Gen-3**: el estándar de la industria para video generativo. Imagen-a-video (una imagen fija → video de 5-10 segundos), texto-a-video, y herramientas de edición como background removal, green screen, extend (alargar el video generativamente). Plan desde $15/mes.\n\n**Kling AI**: competidor chino de Runway. Produce movimientos más estables en algunos escenarios. Plan gratuito con créditos limitados.\n\n**HeyGen**: especializado en generación de videos con avatares de IA. Un humano graba un video una vez → HeyGen lo clona → puedes hacer el mismo video en 50 idiomas sin grabar nada más. Para agencias con clientes internacionales, es un servicio diferenciador.\n\n**Sora (OpenAI)**: el más espectacular en demos, con acceso limitado. Cuando sea ampliamente disponible, cambiará el estándar de calidad.\n\n## Casos de uso para agencias en 2025\n\n**B-roll sin cámara**: para marcas que no tienen footage propio, genera b-roll conceptual de alta calidad para usar en Reels, ads y presentaciones.\n\n**Personalización en escala**: HeyGen para videos de ventas personalizados por nombre y empresa. Imagina 100 videos de prospección, cada uno con el nombre y logo del prospecto, sin grabar 100 veces.\n\n**Explainers animados**: convertir un texto o storyboard en un video animado explicativo sin animador. Para servicios de SaaS o procesos complejos.\n\n**Extiende footage existente**: un cliente tiene un video de 5 segundos que necesita ser de 10. Runway puede extender el video generativamente con coherencia visual.',
        tasks: [
          'Crea un video de 5 segundos con Runway Gen-3 usando imagen-a-video: elige una imagen de alta calidad (puede ser generada con Midjourney) y genera el video. Experimenta con el prompt de movimiento',
          'Explora HeyGen y crea un video de avatar de 30 segundos: sube una foto o video de referencia y genera una versión del avatar hablando un texto que escribas',
          'Define 3 servicios de video con IA que podrías ofrecer como agencia con un precio estimado para cada uno (basándote en el tiempo de producción + costo de las herramientas)',
        ],
        tip: 'El video generativo con IA tiene artefactos visuales que el ojo humano detecta fácilmente (movimientos extraños en rostros, físicas imposibles). Para 2025, úsalo más para b-roll, fondos y conceptos abstractos que para videos con personas reales.',
        completed: false,
      },
    ],
    resources: [
      { title: 'Midjourney — generación de imágenes de alta calidad', url: 'https://www.midjourney.com', type: 'tool' },
      { title: 'Runway — video generativo para producción', url: 'https://runwayml.com', type: 'tool' },
      { title: 'Ideogram — imágenes con texto integrado', url: 'https://ideogram.ai', type: 'tool' },
    ],
  },

]


// ─── Learning Paths ───────────────────────────────────────────────────────────
// Curated sequences of modules for specific career goals.
// moduleIds must match existing MODULES ids in the recommended study order.

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'digital-creator',
    title: 'Digital Creator',
    subtitle: 'De cero a crear contenido profesional que vende',
    description: 'La ruta para quien quiere dominar el lado creativo del marketing digital: construyes la marca, escribes el copy, creas el contenido y lo posicionas en Google. Sin necesitar saber código.',
    level: 'principiante',
    duration: '6–8 meses',
    tracks: ['branding', 'copy', 'marketing', 'seo'],
    moduleIds: [
      'branding-1', 'branding-2', 'branding-3', 'branding-capstone',
      'copy-1', 'copy-2', 'copy-3', 'copy-4', 'copy-capstone',
      'modulo-1', 'modulo-2', 'modulo-3', 'modulo-4', 'marketing-capstone',
      'seo-1', 'seo-2', 'seo-3', 'seo-capstone',
    ],
    forWho: 'Emprendedores, freelancers creativos, community managers y cualquier persona que quiera vivir de crear contenido digital con propósito estratégico.',
    outcome: 'Al terminar puedes: crear sistemas de identidad visual completos, escribir copy que convierte para web y ads, gestionar campañas de marketing digital y posicionar contenido en Google.',
  },
  {
    id: 'full-stack-builder',
    title: 'Full-Stack Builder',
    subtitle: 'De la idea al producto en producción',
    description: 'La ruta técnica completa: aprendes a construir aplicaciones web modernas, a integrar IA en el workflow de desarrollo y a medir el impacto con analytics. El stack exacto que usa AlphaDev Studios.',
    level: 'principiante',
    duration: '7–9 meses',
    tracks: ['web', 'ia', 'data'],
    moduleIds: [
      'web-1', 'web-2', 'web-3', 'web-4', 'web-capstone',
      'ia-1', 'ia-2', 'ia-3', 'ia-4', 'ia-capstone',
      'data-1', 'data-2', 'data-3', 'data-4', 'data-5', 'data-capstone',
    ],
    forWho: 'Personas sin experiencia en programación que quieren convertirse en developers full-stack. También para developers con experiencia que quieren modernizar su stack e integrar IA.',
    outcome: 'Al terminar puedes: construir y desplegar aplicaciones SaaS con Next.js y Supabase, crear automatizaciones con IA, medir el comportamiento de usuarios con analytics y tomar decisiones basadas en datos.',
  },
  {
    id: 'ux-designer-pro',
    title: 'UX/UI Designer Pro',
    subtitle: 'Diseño de producto con estrategia de marca',
    description: 'La ruta para diseñadores que quieren ir más allá de la interfaz: integras el pensamiento de marca con el diseño de producto y el copy, produciendo experiencias completamente coherentes.',
    level: 'principiante',
    duration: '8–10 meses',
    tracks: ['uiux', 'branding', 'copy'],
    moduleIds: [
      'uiux-1', 'uiux-2', 'uiux-3', 'uiux-4', 'uiux-5',
      'uiux-6', 'uiux-7', 'uiux-8', 'uiux-capstone',
      'branding-1', 'branding-2', 'branding-3', 'branding-capstone',
      'copy-1', 'copy-2', 'copy-capstone',
    ],
    forWho: 'Diseñadores gráficos que quieren entrar al UX digital, estudiantes de diseño, y profesionales de otras áreas con sensibilidad visual que quieren especializarse en product design.',
    outcome: 'Al terminar puedes: diseñar productos digitales completos (research → prototipo → handoff), crear sistemas de identidad visual desde la estrategia y escribir el UX copy de cualquier interfaz.',
  },
  {
    id: 'performance-marketer',
    title: 'Performance Marketer',
    subtitle: 'Marketing que se mide y que escala',
    description: 'La ruta del marketer data-driven: aprendes a crear campañas que funcionan, a escribir copy que convierte, a posicionarte en Google y a medir todo con analytics profesional. Cada decisión respaldada por datos.',
    level: 'intermedio',
    duration: '7–9 meses',
    tracks: ['marketing', 'copy', 'seo', 'data'],
    moduleIds: [
      'modulo-1', 'modulo-2', 'modulo-3', 'modulo-4', 'marketing-capstone',
      'copy-1', 'copy-2', 'copy-3', 'copy-4', 'copy-capstone',
      'seo-1', 'seo-2', 'seo-3', 'seo-4', 'seo-5', 'seo-capstone',
      'data-1', 'data-2', 'data-3', 'data-4', 'data-5', 'data-capstone',
    ],
    forWho: 'Marketing managers, growth hackers, fundadores de negocios digitales y consultores de marketing que quieren sistematizar su trabajo y justificar sus resultados con datos.',
    outcome: 'Al terminar puedes: gestionar campañas de marketing digital end-to-end, escribir copy para todos los formatos, posicionar contenido en Google con estrategia de clusters y reportar resultados con dashboards profesionales.',
  },
  {
    id: 'agency-ready',
    title: 'Agency Ready',
    subtitle: 'Todo el conocimiento para operar una agencia digital',
    description: 'La ruta completa de AlphaDev Studios: todos los tracks en el orden óptimo para alguien que quiere trabajar en o crear una agencia digital completa. Del diseño al código, del copy al analytics.',
    level: 'avanzado',
    duration: '18–24 meses',
    tracks: ['branding', 'uiux', 'copy', 'marketing', 'web', 'seo', 'data', 'ia'],
    moduleIds: [
      'branding-1', 'branding-2', 'branding-3', 'branding-capstone',
      'uiux-1', 'uiux-2', 'uiux-3', 'uiux-4', 'uiux-5',
      'uiux-6', 'uiux-7', 'uiux-8', 'uiux-capstone',
      'copy-1', 'copy-2', 'copy-3', 'copy-4', 'copy-capstone',
      'modulo-1', 'modulo-2', 'modulo-3', 'modulo-4', 'marketing-capstone',
      'web-1', 'web-2', 'web-3', 'web-4', 'web-capstone',
      'seo-1', 'seo-2', 'seo-3', 'seo-4', 'seo-5', 'seo-capstone',
      'data-1', 'data-2', 'data-3', 'data-4', 'data-5', 'data-capstone',
      'ia-1', 'ia-2', 'ia-3', 'ia-4', 'ia-capstone',
    ],
    forWho: 'Personas ambiciosas que quieren una formación digital completa: desde el diseño y el copy hasta el código y los datos. Ideal para fundadores de agencias, directores creativos que quieren habilidades técnicas, o developers que quieren entender el negocio completo.',
    outcome: 'Al terminar tienes el conocimiento para: diseñar productos, crear sistemas de marca, escribir copy, gestionar campañas, desarrollar aplicaciones, posicionar en SEO, medir con analytics e integrar IA. El kit completo de una agencia digital moderna.',
  },
]

// ─── Retos ────────────────────────────────────────────────────────────────────
// Tiempo-boxed challenges where students build something real and the
// community votes on the best submissions.

export const RETOS: Reto[] = [
  {
    id: 'reto-landing-21',
    title: 'Reto: Lanza tu Landing Page en 21 Días',
    tagline: '21 días. Una landing page real. En producción.',
    description: 'Diseña, escribe y despliega una landing page completa para un producto o servicio real. En 21 días, de idea a URL en producción. Aplican todos los conocimientos de web, copy y branding — en un proyecto que queda en tu portafolio y puede conseguirte clientes.',
    tracks: ['web', 'copy', 'branding'],
    duration: '21 días',
    deliverable: 'URL pública en producción con landing page completa: diseño propio, copy optimizado y métricas de analytics configuradas.',
    requirements: [
      'La landing debe estar en producción en una URL real (Vercel, Netlify o dominio propio)',
      'Debe tener: hero con propuesta de valor clara, sección de beneficios, prueba social (aunque sea ficticia bien elaborada), CTA y formulario funcional',
      'El copy debe aplicar al menos 1 framework (AIDA, PAS o BAB) — mencionar cuál en la presentación',
      'Debe tener GA4 configurado con al menos 1 conversión (form submit o click en CTA)',
      'Mobile responsive verificado en 375px de ancho mínimo',
      'Presentar en 5 minutos máximo: el producto, las decisiones de diseño, el copy elegido y las métricas del primer día',
    ],
    howToSubmit: [
      'Publica la URL en el canal #reto-landing de la comunidad el día 21 a las 11:59pm',
      'Incluye: URL + 3 screenshots (mobile + desktop + hero close-up) + párrafo explicando las decisiones más importantes',
      'Comenta y da feedback a mínimo 3 submissions de otros participantes antes del día 23',
      'La votación de la comunidad abre el día 22 y cierra el día 25',
    ],
    prizes: [
      '1er lugar: Feature en el newsletter de AlphaDev Studios + mención en Instagram + 1 sesión de mentoring 1:1 de 60 minutos',
      '2do lugar: Mención en redes sociales + acceso anticipado al siguiente reto',
      '3er lugar: Mención en la comunidad + badge exclusivo de "Landing Launcher"',
      'Participación: Badge "21-Day Builder" para todos los que entreguen en tiempo',
    ],
    status: 'proximo',
  },
  {
    id: 'reto-contenido-30',
    title: 'Reto: 30 Días de Contenido',
    tagline: '30 días. 30 piezas. Un negocio que empieza a existir en redes.',
    description: 'Crea y publica 30 piezas de contenido en 30 días para un negocio real. Puede ser tu agencia, tu proyecto freelance, o el negocio de alguien que te dé permiso. El objetivo: construir presencia orgánica real con constancia y estrategia — no contenido al azar.',
    tracks: ['marketing', 'copy'],
    duration: '30 días',
    deliverable: 'Carpeta o Notion con las 30 piezas creadas (aunque no todas publicadas), el calendario de contenido, métricas de engagement del período y 3 aprendizajes documentados.',
    requirements: [
      'Mínimo 20 de las 30 piezas deben estar publicadas en redes reales (no simuladas)',
      'El contenido debe cubrir al menos 3 formatos distintos (reels, carruseles, posts estáticos, stories, artículos, etc.)',
      'Cada pieza debe tener copy escrito con intención — no solo imágenes con texto genérico',
      'Documentar el proceso: 1 post semanal en la comunidad del reto mostrando qué publicaste, qué funcionó y qué no',
      'Al final: reporte con métricas reales (alcance, engagement, follows ganados) y análisis honesto',
    ],
    howToSubmit: [
      'El día 30: publica el link a tu perfil + link a la carpeta/Notion con todas las piezas + el reporte',
      'Incluye el screenshot de las métricas del período desde la plataforma (Instagram Insights, LinkedIn Analytics, etc.)',
      'La votación premia al contenido más consistente Y de mayor calidad — no solo el de más likes',
    ],
    prizes: [
      '1er lugar: Feature como caso de estudio en el blog de AlphaDev Studios + 1 sesión de mentoring',
      '2do y 3er lugar: Mencion en redes + badge "Content Machine"',
      'Participación: Badge "30-Day Creator" + acceso al banco de templates de contenido de AlphaDev',
    ],
    status: 'proximo',
  },
  {
    id: 'reto-app-15',
    title: 'Reto: App en 15 Días',
    tagline: '15 días para pasar de idea a aplicación en producción.',
    description: 'Construye y despliega una aplicación web funcional en 15 días con Next.js, TypeScript y Supabase. No importa que sea pequeña — importa que esté en producción, funcione bien y tenga un caso de uso real. La velocidad de entrega es parte del reto.',
    tracks: ['web', 'ia'],
    duration: '15 días',
    deliverable: 'URL en producción en Vercel + repositorio público en GitHub + README con descripción, screenshots y video demo de 2 minutos.',
    requirements: [
      'La app debe estar en producción en Vercel con URL pública accesible para cualquiera',
      'Stack requerido: Next.js + TypeScript + Tailwind (Supabase es opcional pero valorado)',
      'Debe tener al menos 2 features funcionales (no solo una landing estática)',
      'TypeScript strict — tsc --noEmit debe pasar sin errores',
      'Repositorio público en GitHub con README profesional',
      'Video demo de 2 minutos mostrando el uso real de la app (no slides, no presentación — demo en vivo)',
    ],
    howToSubmit: [
      'El día 15: publica en #reto-app: URL de producción + GitHub repo + video demo',
      'Los primeros 3 en publicar reciben bonus de "Fast Launcher" en la votación',
      'La comunidad evalúa: funcionalidad, código limpio (revisando el GitHub) y utilidad del caso de uso',
    ],
    prizes: [
      '1er lugar: Feature en el portfolio de proyectos de AlphaDev Studios + mentoring técnico de 90 minutos',
      '2do lugar: Code review personalizado de 60 minutos + badge "App Builder"',
      '3er lugar: Badge + mención en la comunidad',
      'Bonus "Fast Launcher": badge especial para los primeros 3 en publicar el día 15',
    ],
    status: 'proximo',
  },
  {
    id: 'reto-automatiza-21',
    title: 'Reto: Automatiza tu Agencia en 21 Días',
    tagline: 'Un workflow de IA que te devuelve horas cada semana.',
    description: 'Construye un sistema de automatización con IA que resuelva un problema real de tu flujo de trabajo. En 21 días, de proceso manual a workflow que corre solo. Aplica lo aprendido en el track de IA: n8n, LLMs, y agentes.',
    tracks: ['ia'],
    duration: '21 días',
    deliverable: 'Workflow en n8n exportado como JSON + video demo de 3-5 minutos mostrándolo en funcionamiento + análisis de tiempo ahorrado.',
    requirements: [
      'El workflow debe correr de forma autónoma (trigger → acción → output) sin intervención manual',
      'Debe integrar al menos 1 LLM (Claude, GPT o Gemini) con un prompt bien diseñado',
      'Debe resolver un problema real — documentar cuánto tiempo tardaba el proceso manual vs ahora',
      'Demo en vivo en el video: mostrar el trigger real, el workflow corriendo y el output real generado',
      'Incluir el prompt principal usado con el LLM y al menos 3 ejemplos de inputs/outputs reales',
    ],
    howToSubmit: [
      'El día 21: publica en #reto-automatiza: video + JSON del workflow + análisis de impacto',
      'La votación evalúa: utilidad real del workflow, calidad del output del LLM y creatividad del caso de uso',
      'Bonus: si el workflow ya está en producción y tienes métricas de uso real, mencionarlo suma puntos',
    ],
    prizes: [
      '1er lugar: Feature en el blog de AlphaDev como caso de estudio + sesión de mentoring en automatizaciones',
      '2do y 3er lugar: Badge "Automation Architect" + mención en la newsletter',
      'Participación: Badge "21-Day Automator" + acceso a la biblioteca de workflows de la comunidad',
    ],
    status: 'proximo',
  },
  {
    id: 'reto-brand-10',
    title: 'Reto: Brand en 10 Días',
    tagline: '10 días para crear una identidad que se vea de millones.',
    description: 'Diseña el sistema de identidad visual completo para un negocio en 10 días. Logo, paleta, tipografía y 3 aplicaciones. La velocidad es parte del desafío — los mejores diseñadores no solo hacen buen trabajo, lo hacen rápido.',
    tracks: ['branding', 'uiux'],
    duration: '10 días',
    deliverable: 'Archivo de Figma con link público: sistema de logo (4 variantes), paleta documentada, escala tipográfica y 3 aplicaciones de marca.',
    requirements: [
      'Sistema de logo completo: versión primaria, compacta, monocromática y negativa',
      'Paleta documentada: mínimo 1 primario + 2 neutros + 1 acento, con nombre propio y valor hex de cada uno',
      'Escala tipográfica: mínimo 4 niveles (display/H1, H2/H3, body, caption) con familia y peso definidos',
      'Mínimo 3 aplicaciones: pueden ser perfil de Instagram, mockup de tarjeta, post template, packaging, etc.',
      'El Figma debe tener link de "View" público para que cualquiera pueda verlo',
      'Presentar en 3 minutos: el brief del cliente (ficticio está bien), las decisiones de diseño y el resultado',
    ],
    howToSubmit: [
      'El día 10: publica en #reto-brand: link de Figma + párrafo con el brief y las 3 decisiones de diseño más importantes',
      'La votación evalúa: coherencia del sistema, calidad de ejecución y si el resultado comunica lo que el brief pedía',
      'Feedback obligatorio: comenta en mínimo 2 submissions antes de que cierre la votación',
    ],
    prizes: [
      '1er lugar: Feature en Instagram de AlphaDev Studios + sesión de feedback 1:1 de diseño',
      '2do lugar: Mención + badge "Brand Sprinter"',
      '3er lugar: Badge + mención en la comunidad',
      'Participación: Badge "10-Day Brander" para todos los que entreguen en tiempo',
    ],
    status: 'proximo',
  },
]
