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
  content?: string    // Teaching body — supports ## headers, **bold**, - lists, double newline = paragraph
  tasks?: string[]    // Actionable checklist items shown under "Tareas"
  tip?: string        // Professional insight shown in highlighted box
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

  // ─── Marketing Portfolio Projects ────────────────────────────────────────────
  {
    id: 'marketing-portfolio',
    number: 5,
    track: 'marketing',
    title: 'Proyectos de Portafolio — Marketing Digital',
    description:
      'Proyectos guiados de básico a avanzado para construir un portafolio de marketing con resultados reales. Cada proyecto produce un entregable que podés mostrar a clientes y empleadores.',
    duration: '8–12 semanas',
    status: 'available',
    lessons: [
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
    ],
    resources: [
      {
        title: 'Google PageSpeed Insights — Auditá la velocidad de cualquier sitio',
        url: 'https://pagespeed.web.dev',
        type: 'tool',
      },
      {
        title: 'Meta Pixel Helper — Extensión para verificar el píxel de Meta',
        url: 'https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc',
        type: 'tool',
      },
      {
        title: 'Canva — Creación de creativos para redes sociales',
        url: 'https://canva.com',
        type: 'tool',
      },
      {
        title: 'Calendly — Agenda de reuniones para el BOFU del funnel',
        url: 'https://calendly.com',
        type: 'tool',
      },
      {
        title: 'Notion — Plantillas para calendarios de contenido y reportes',
        url: 'https://notion.so/templates',
        type: 'tool',
      },
    ],
  },

  // ─── UI/UX Portfolio Projects ─────────────────────────────────────────────────
  {
    id: 'uiux-portfolio',
    number: 9,
    track: 'uiux',
    title: 'Proyectos de Portafolio — UI/UX & Diseño',
    description:
      'Proyectos guiados de básico a avanzado para construir un portafolio de diseño sólido. Cada proyecto produce un entregable publicable en Behance, Dribbble o Notion.',
    duration: '8–14 semanas',
    status: 'available',
    lessons: [
      {
        id: 'up-l1',
        title: 'Proyecto 1 — Básico: Redesign de app mobile en 3 pantallas',
        type: 'practice',
        content:
          '## El brief\n\nElegí una app mobile con mala UX — puede ser una app de banco, de transporte, de supermercado, o cualquier app que uses y que te frustre. Rediseñá 3 pantallas clave en Figma identificando el problema de UX, proponiendo una solución y documentando el proceso.\n\nEste tipo de proyecto (unsolicited redesign) es el punto de entrada estándar al portafolio de diseño. Muchos diseñadores consiguieron su primer trabajo con exactamente esto.\n\n## Por qué funciona para el portafolio\n\nNo necesitás un cliente. No necesitás permiso. El redesign de una app real muestra cómo pensás, cómo identificás problemas y cómo los resolvés — las tres cosas que un empleador o cliente quiere saber antes de contratarte.\n\n## El proceso paso a paso\n\n**Paso 1 — Elegí la app y el problema**\nDescargá la app y usala durante 15 minutos con ojos críticos. Anotá:\n- ¿Dónde te perdiste o confundiste?\n- ¿Qué tarea tardó más de lo necesario?\n- ¿Qué información esperabas y no apareció?\nElegí el flujo con el problema más claro para rediseñar.\n\n**Paso 2 — Documentá el before (capturas del original)**\nTomá screenshots de las 3 pantallas que vas a rediseñar. Importalas a Figma en un frame de "Before". Anotá con flechas y texto cuáles son los problemas de UX en cada pantalla.\n\n**Paso 3 — Investigación rápida**\nAntes de diseñar, buscá:\n- Las reseñas de la app en la App Store / Google Play — ¿qué quejas son recurrentes? Eso valida que el problema es real.\n- Cómo resuelven el mismo problema apps de referencia en tu sector\n\n**Paso 4 — Wireframes en baja fidelidad**\nDibujá a mano o en FigJam los 3 flujos alternativos. No tenés que saber cómo se va a ver — solo cómo va a funcionar. Tomá foto de los bocetos y pegala en Figma.\n\n**Paso 5 — UI final en alta fidelidad**\nDiseñá las 3 pantallas con:\n- Colores del sistema de la app original (o una paleta nueva si el rediseño incluye rebrand)\n- Tipografía consistente con SF Pro (iOS) o Roboto/Google Sans (Android)\n- Componentes nativos de la plataforma elegida (botones, inputs, navigation bars)\n- Auto Layout para que las pantallas sean adaptables\n\n**Paso 6 — Documentá el after con anotaciones**\nEn cada pantalla del "After" explicá con textos cortos qué cambiaste y por qué. El "por qué" es el valor del caso de estudio.',
        tasks: [
          'Elegí la app y documentá el problema con screenshots anotados antes de diseñar nada',
          'Investigá las reseñas en la App Store — encontrá al menos 3 quejas recurrentes que validen el problema',
          'Dibujá los wireframes en papel o FigJam antes de pasar a alta fidelidad',
          'Diseñá las 3 pantallas finales en Figma con Auto Layout y componentes reutilizables',
          'Creá una página de caso de estudio en Figma: Before / Problem / Solution / After',
          'Exportá el caso y publicalo en Behance o Dribbble con el proceso documentado',
        ],
        tip: 'El redesign más efectivo no es el más bonito — es el que resuelve un problema real documentado con evidencia. Si tus cambios de diseño no están justificados con un problema de UX claro, son solo preferencias estéticas. La diferencia entre un diseñador junior y uno senior está en saber justificar cada decisión con evidencia.',
        completed: false,
      },
      {
        id: 'up-l2',
        title: 'Proyecto 2 — Básico: Landing page completa en Figma',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá una landing page completa en Figma para un producto o servicio real o ficticio — puede ser AlphaDev Studios, un producto que se te ocurra, o un negocio de alguien que conozcas. El diseño debe incluir versión desktop (1440px) y mobile (390px), y estar listo para ser entregado a un desarrollador o implementado en Framer/Webflow.\n\n## Por qué este proyecto\n\nLas landing pages son el trabajo más pedido en UI/UX freelance. Si podés demostrar que diseñás una landing completa, responsiva y lista para producción, tenés la habilidad que más demanda tiene en el mercado.\n\n## El proceso paso a paso\n\n**Paso 1 — Define el producto y el objetivo**\n¿Qué vende esta landing? ¿A quién? ¿Cuál es el único CTA que debe hacer el usuario?\nRegla: una landing, un objetivo. Sin nav links que salgan de la página.\n\n**Paso 2 — Estructura las secciones (arquitectura de contenido)**\nEstructura recomendada para una landing de servicio/SaaS:\n1. Hero: headline potente + subheadline + CTA primario + imagen/mockup\n2. Logos o social proof: "Empresas que confían en nosotros" (o alternativa)\n3. Propuesta de valor: 3 beneficios principales (icono + título + descripción)\n4. Cómo funciona: 3–4 pasos del proceso o flujo\n5. Testimonios: 2–3 reales o ficticios con nombre, foto y empresa\n6. CTA final: repite la oferta, más urgencia, formulario simple\n\n**Paso 3 — Tipografía y paleta**\nElegí antes de diseñar:\n- 1 fuente de heading (serif o display) + 1 fuente de body (sans-serif)\n- Paleta de 4 colores: fondo / texto / acento / neutro\nHerramienta rápida: coolors.co para paleta, Google Fonts para tipografía\n\n**Paso 4 — Desktop first, luego mobile**\nDiseñá el desktop completo primero (frame 1440px). Cuando esté aprobado, adaptá cada sección a mobile (frame 390px). Auto Layout hace esto 5 veces más rápido si lo usaste desde el inicio.\n\n**Paso 5 — Prototipo con scroll**\nConectá los frames en Figma con un prototipo de tipo "Scroll" para que se pueda navegar la landing como si fuera real. Esto impacta al presentarlo al cliente.\n\n**Paso 6 — Entregable para desarrollador**\nExportá los assets (iconos, imágenes), documentá los estilos (colores hex, tipografías y tamaños) y organizá el archivo Figma con capas nombradas correctamente. Un desarrollador debe poder trabajar con el archivo sin preguntarte nada.',
        tasks: [
          'Definí el producto, el usuario objetivo y el único CTA antes de abrir Figma',
          'Armá el wireframe de las secciones en FigJam o en papel — 6 secciones mínimo',
          'Elegí tipografía y paleta de colores y creá los estilos en Figma antes de diseñar',
          'Completá el diseño desktop (1440px) con todas las secciones',
          'Adaptá el diseño a mobile (390px) usando Auto Layout correctamente',
          'Creá el prototipo con scroll y compartilo con el link de View Only de Figma',
          'Publicá el proyecto en Behance con capturas del proceso y el resultado final',
        ],
        tip: 'El error más común en landing pages es el headline genérico. "Soluciones digitales para tu negocio" no convierte. El headline debe responder en 5 palabras: ¿qué obtengo, para quién y en qué tiempo? Ej: "Tu app lista en 6 semanas, garantizado." Antes de diseñar cualquier pixel, chequeá que el headline sea específico.',
        completed: false,
      },
      {
        id: 'up-l3',
        title: 'Proyecto 3 — Intermedio: App mobile completa (8 pantallas)',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá una app mobile completa — de 0 a UI de alta fidelidad — en 8 pantallas mínimas. La app puede ser de cualquier categoría: finanzas personales, fitness, delivery, productividad, salud mental. El proceso incluye research, wireframes, sistema de componentes y UI final.\n\nEste es el proyecto central del portafolio de cualquier diseñador mobile.\n\n## El proceso completo\n\n**Fase 1 — Research y definición (1 semana)**\n\nElegí la categoría de la app y definí:\n- ¿Quién es el usuario? (persona ficticia pero realista: nombre, edad, contexto, pain points)\n- ¿Cuál es el problema central que resuelve la app?\n- ¿Cómo lo resuelven las 3 apps más populares del espacio? (benchmark)\n\nHerramienta: FigJam para el moodboard y el user flow inicial.\n\n**Fase 2 — User Flow**\nMapeá el flujo principal del usuario: desde que abre la app hasta que completa la acción más importante. Mínimo 8 nodos. Usá FigJam con formas simples: rectángulo = pantalla, rombo = decisión, flecha = acción.\n\n**Fase 3 — Wireframes (baja fidelidad)**\nDibujá cada pantalla del user flow en baja fidelidad — sin colores, sin imágenes reales, solo estructura. El objetivo es decidir qué elementos van en cada pantalla antes de decidir cómo se ven.\n\nPantallas mínimas a diseñar:\n1. Onboarding / Bienvenida\n2. Registro / Login\n3. Home / Dashboard principal\n4. Pantalla de lista o exploración\n5. Pantalla de detalle de ítem\n6. Pantalla de acción principal (agregar, crear, pagar, etc.)\n7. Perfil o configuración\n8. Estado vacío o de error\n\n**Fase 4 — Sistema de diseño básico**\nAntes de hacer el UI final, creá en Figma:\n- Color styles: primario, secundario, fondo, texto, error, éxito\n- Text styles: Display, H1, H2, Body, Caption, Label\n- Componentes base: Button (Primary/Secondary/Disabled), Input, Card, Tab Bar, Header\n\n**Fase 5 — UI final (alta fidelidad)**\nAplicá el sistema de diseño a todos los wireframes. Cada pantalla debe:\n- Usar componentes del sistema, no elementos sueltos\n- Tener estados: normal, hover, active, disabled donde corresponda\n- Ser Auto Layout para que el contenido sea flexible\n\n**Fase 6 — Prototipo interactivo**\nConectá las pantallas en Figma con transiciones reales (Smart Animate donde aplique). El prototipo debe simular el flujo completo del usuario sin saltos visuales.\n\n**Fase 7 — Documentación del caso de estudio**\nUna página de Figma o Notion con: el problema, la persona, el user flow, wireframes vs UI final, decisiones de diseño clave, prototipo en video (grabá una pantalla navigating).',
        tasks: [
          'Definí la categoría, el usuario y el problema central antes de abrir Figma',
          'Mapeá el user flow completo en FigJam con mínimo 8 nodos',
          'Dibujá todos los wireframes en baja fidelidad (en papel o Figma) antes de pasar a color',
          'Creá el sistema de diseño con color styles, text styles y componentes base antes del UI',
          'Diseñá las 8 pantallas en alta fidelidad usando exclusivamente componentes del sistema',
          'Construí el prototipo interactivo completo con Smart Animate',
          'Publicá el caso de estudio en Behance con el proceso completo — research, wireframes, UI final',
        ],
        tip: 'El estado vacío (empty state) es la pantalla más olvidada y la más importante. Es lo que un usuario nuevo ve la primera vez que abre la app, antes de tener datos. Un estado vacío bien diseñado orienta al usuario, explica qué hacer y hace que la app no parezca rota. Los diseñadores que piensan en los estados edge impresionan a los hiring managers.',
        completed: false,
      },
      {
        id: 'up-l4',
        title: 'Proyecto 4 — Intermedio: Dashboard de datos',
        type: 'practice',
        content:
          '## El brief\n\nDiseñá un dashboard de analytics o gestión de datos para un negocio real o ficticio — puede ser un panel de marketing, un dashboard de ventas, un sistema de administración de reservas, o métricas de una app SaaS. El diseño debe incluir versión desktop con datos reales (o realistas) en gráficos y tablas.\n\nLos dashboards son uno de los tipos de proyecto más evaluados en entrevistas de trabajo para diseñadores de producto y B2B SaaS.\n\n## Por qué el dashboard\n\nDiseñar un dashboard obliga a dominar jerarquía visual de datos, lectura en F-pattern, sistema de componentes avanzado y diseño responsivo para pantallas anchas — competencias que pocos diseñadores practican explícitamente.\n\n## El proceso paso a paso\n\n**Paso 1 — Define el negocio y las métricas clave**\nElegí un tipo de negocio y definí las 4–6 métricas más importantes que un manager querría ver a primera vista. Ej para marketing: tráfico, conversiones, costo por lead, ROI por canal.\n\n**Paso 2 — Arquitectura de la información**\nOrganizá las métricas por jerarquía:\n- Nivel 1 (tarjetas KPI): los 4 números más importantes visibles sin scroll\n- Nivel 2 (gráficos): tendencias en el tiempo y comparaciones\n- Nivel 3 (tablas): detalle granular para análisis profundo\n\n**Paso 3 — Estructura de la interfaz**\n- Sidebar de navegación (izquierda, fija)\n- Header con filtros de fecha, búsqueda y perfil del usuario\n- Área principal con la grilla de contenido\n\n**Paso 4 — Diseñá el sistema de datos**\nCreá en Figma los componentes de datos reutilizables:\n- KPI Card: número grande, label, trend indicator (↑ o ↓ con color verde/rojo)\n- Line Chart: eje X con fechas, eje Y con valores, línea de datos, tooltip en hover\n- Bar Chart: barras verticales u horizontales\n- Data Table: header ordenable, filas alternadas, paginación\n- Status Badge: estados (Activo, Pausado, Completado) con color semántico\n\n**Paso 5 — Diseñá los estados**\nCada componente de datos necesita estados:\n- Loading: skeleton loader (no spinner — skeleton es mejor UX)\n- Empty: sin datos para el período seleccionado\n- Error: falló la carga — con mensaje y botón de reintentar\n- Filled: con datos reales\n\n**Paso 6 — Dark mode (bonus)**\nSi llegaste hasta acá y querés el bonus de portafolio: implementá dark mode. En Figma, usá Variables (no Color Styles) para definir semantic tokens: `color/surface/primary`, `color/text/default`, etc. Esto te permite cambiar de light a dark con un click.',
        tasks: [
          'Definí el negocio, las 4–6 métricas clave y la jerarquía de información antes de diseñar',
          'Creá la estructura base: sidebar + header + área principal con grilla',
          'Diseñá los 5 tipos de componentes de datos como componentes de Figma con variantes',
          'Completá los estados loading, empty y error para cada componente de datos',
          'Diseñá el dashboard completo con datos realistas (inventalos consistentemente)',
          'Añadí el dark mode con Figma Variables como bonus',
          'Publicá el proyecto con un video de prototipo que muestre los estados e interacciones',
        ],
        tip: 'El error más común en dashboards es mostrar demasiada información en el nivel 1. Un manager que abre el dashboard tiene 30 segundos para entender el estado del negocio. Si necesita leer más de 4 números para saberlo, el dashboard falló en su función principal. Menos métricas en el primer nivel = mejor diseño, no diseño incompleto.',
        completed: false,
      },
      {
        id: 'up-l5',
        title: 'Proyecto 5 — Avanzado: Mini design system documentado',
        type: 'practice',
        content:
          '## El brief\n\nConstruí un mini design system completo en Figma: foundations (colores, tipografía, espaciado), componentes de UI (mínimo 12), documentación de uso y tokens exportables. Este proyecto demuestra que podés trabajar a nivel de sistema, no solo de pantalla — la habilidad más valorada en equipos de producto maduros.\n\n## Por qué el design system es el proyecto más avanzado del portafolio\n\nCualquier diseñador puede diseñar una pantalla bonita. Pocos pueden diseñar un sistema que escala. Un design system en el portafolio dice: "Puedo trabajar con un equipo de ingenieros, puedo pensar en componentes y variantes, y puedo documentar para que otros usen mi trabajo sin preguntarme."\n\n## La estructura del design system\n\n**Capa 1 — Foundations (primitivos)**\n\n- **Color primitives**: todos los colores de la paleta con su hex y nombre (blue-500, gray-100, etc.)\n- **Semantic tokens**: colores con propósito (color/surface/primary, color/text/default, color/border/error) que mapean a los primitivos\n- **Tipografía**: escala tipográfica completa (Display XL, H1, H2, H3, Body LG, Body SM, Caption, Label)\n- **Espaciado**: escala de spacing (4, 8, 12, 16, 24, 32, 48, 64px)\n- **Iconos**: set de 20–30 iconos SVG consistentes (podés usar Phosphor Icons o Hero Icons como base)\n- **Radios de borde**: escala de border radius (4, 8, 12, 16, 24, round)\n\n**Capa 2 — Componentes (mínimo 12)**\n\nCada componente debe tener: variantes de estado (Default / Hover / Active / Disabled / Focus) y variantes de tipo donde aplique.\n\nComponentes obligatorios:\n1. Button (Primary / Secondary / Ghost / Destructive)\n2. Input (Default / Error / Disabled / With icon)\n3. Checkbox y Toggle\n4. Badge / Status indicator\n5. Card (base)\n6. Modal / Dialog\n7. Toast / Notification\n8. Avatar\n9. Dropdown / Select\n10. Tab Navigation\n11. Progress Bar / Skeleton Loader\n12. Empty State\n\n**Capa 3 — Documentación en Figma**\n\nPor cada componente, creá una página de documentación con:\n- Cuándo usar vs cuándo no usar\n- Todas las variantes visibles\n- Ejemplo en contexto (el componente dentro de una pantalla real)\n- Especificaciones de espaciado y tipografía anotadas\n\n**Capa 4 — Tokens exportables (avanzado)**\n\nUsá Figma Variables para crear los tokens. Nombralos siguiendo la convención: `namespace/category/attribute`. Exportalos con el plugin "Tokens Studio for Figma" como JSON — eso hace que los tokens sean directamente consumibles por el equipo de desarrollo.\n\n## El entregable final\n\nArchivo Figma público con acceso de View Only + README de 1 página explicando el sistema + link compartible para el portafolio.',
        tasks: [
          'Definí las foundations completas: colores primitivos + tokens semánticos + escala tipográfica',
          'Creá el sistema de espaciado y radio de borde como Variables de Figma',
          'Diseñá los 12 componentes obligatorios con todas sus variantes y estados',
          'Documentá cada componente con la página de "Cuándo usar / no usar" y ejemplos en contexto',
          'Implementá dark mode usando Variables y semantic tokens',
          'Exportá los tokens como JSON con Tokens Studio for Figma',
          'Publicá el archivo con acceso View Only y añadilo al portafolio con una descripción de las decisiones de sistema',
        ],
        tip: 'La trampa del design system es el perfeccionismo — querer tener todo perfecto antes de publicar nada. El sistema más valioso para el portafolio no es el más completo — es el más coherente. 12 componentes con naming consistente, tokens correctos y documentación real valen más que 50 componentes inconsistentes. Publicalo cuando esté usado y probado, no cuando esté "terminado" (los systems nunca terminan).',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Figma Community — UI kits y design systems de referencia',
        url: 'https://www.figma.com/community',
        type: 'tool',
      },
      {
        title: 'Phosphor Icons — Set de iconos gratuito y consistente',
        url: 'https://phosphoricons.com',
        type: 'tool',
      },
      {
        title: 'Tokens Studio for Figma — Exportar design tokens a código',
        url: 'https://tokens.studio',
        type: 'tool',
      },
      {
        title: 'Mobbin — Screenshots reales de apps para referencia y benchmark',
        url: 'https://mobbin.com',
        type: 'tool',
      },
      {
        title: 'Coolors — Generador de paletas de color',
        url: 'https://coolors.co',
        type: 'tool',
      },
      {
        title: 'Behance — Plataforma para publicar el portafolio',
        url: 'https://behance.net',
        type: 'tool',
      },
      {
        title: 'Laws of UX — Principios de UX con ejemplos visuales',
        url: 'https://lawsofux.com',
        type: 'article',
      },
    ],
  },
]
