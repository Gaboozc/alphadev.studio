// ─── Types ────────────────────────────────────────────────────────────────────
// Designed to mirror a future Supabase schema — keep fields flat and serializable

export type LessonType = 'video' | 'audio' | 'reading' | 'practice'
export type ResourceType = 'course' | 'video' | 'article' | 'tool' | 'certification' | 'documentation'
export type ModuleStatus = 'locked' | 'available' | 'completed'
export type Track = 'marketing' | 'uiux' | 'web' | 'ia' | 'branding' | 'copy'

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
    ],
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
    ],
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
    ],
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
    ],
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

]
