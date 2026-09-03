import type { Module } from '../types'

// Rama: Diseño — 14 módulos.
// Cada módulo declara su `track`; la rama se deriva del track en ramas.ts.
export const MODULES_DISENO: Module[] = [
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
]
