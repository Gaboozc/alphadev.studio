import type { Module } from '../types'

// Rama: Contenido & SEO — 18 módulos.
// Cada módulo declara su `track`; la rama se deriva del track en ramas.ts.
export const MODULES_CONTENIDO: Module[] = [
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
> **[A]** Agenda una llamada de 30 minutos esta semana.

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
  {
    id: 'geo-1',
    number: 73,
    title: 'GEO: Optimización para la búsqueda generativa',
    description: 'ChatGPT, Perplexity y Google AI Overviews están redefiniendo cómo la gente encuentra información. Aprende qué es GEO, cómo difiere del SEO y por qué es la habilidad de búsqueda más importante de los próximos años.',
    duration: '2 semanas',
    status: 'available',
    track: 'geo',
    lessons: [
      {
        id: 'geo-1-1',
        title: 'Qué es GEO y cómo cambió la búsqueda',
        type: 'reading',
        content: '## La búsqueda ya no es lo que era\n\nDurante 25 años, Google dominó con un modelo simple: el usuario escribe una consulta, el algoritmo devuelve una lista de links ordenados por relevancia. El SEO tradicional era la ciencia de aparecer en esa lista.\n\nEn 2023-2024, ese modelo se rompió. Las AI Overviews de Google, los chats de Perplexity, la búsqueda integrada de ChatGPT y los assistants de Bing y Claude cambiaron radicalmente qué significa "aparecer en búsqueda".\n\n## La diferencia fundamental\n\n**SEO tradicional**: optimizás tu contenido para que Google lo posicione en la página de resultados (SERP). El usuario hace clic en tu link.\n\n**GEO (Generative Engine Optimization)**: optimizás tu contenido y tu presencia digital para que los modelos de IA te citen, te mencionen o usen tu información cuando responden preguntas relacionadas con tu industria. El usuario puede o no hacer clic — a veces la respuesta de la IA es suficiente, pero la mención construye autoridad.\n\n## Por qué importa ahora\n\nSegún datos de 2024, el 40% de las búsquedas de Google en EEUU ahora incluyen AI Overviews. Perplexity creció de 0 a 100M de usuarios en 18 meses. ChatGPT con búsqueda web se usa para consultas que antes irían a Google.\n\nEl tráfico orgánico tradicional está bajando — no porque los sitios hagan peor SEO, sino porque la IA responde directamente y reduce los clics. Esto se llama "zero-click search" llevado al extremo.\n\n## Cómo funciona la IA cuando busca\n\nCuando Perplexity o ChatGPT responden una pregunta, hacen básicamente esto:\n1. Detectan si necesitan información actualizada o de fuentes externas\n2. Buscan en la web (o en su base de conocimiento si el tema es estable)\n3. Evalúan las fuentes por credibilidad, autoridad y relevancia\n4. Sintetizan la información en una respuesta coherente\n5. Citan las fuentes que usaron\n\nGEO es la práctica de aparecer en los pasos 2, 3 y 5 de ese proceso.',
        tasks: [
          'Buscá en Perplexity, ChatGPT y Google AI Overviews la misma consulta relacionada con tu industria. Analizá: ¿qué fuentes cita cada uno? ¿aparece algún competidor tuyo? ¿aparecés vos?',
          'Identificá 5 preguntas que tus clientes hacen frecuentemente y que ahora responde la IA directamente. ¿Qué sitios están siendo citados en esas respuestas?',
        ],
        tip: 'GEO no reemplaza al SEO — lo complementa. Un sitio con buen SEO técnico tiene mejor base para GEO, porque la IA usa los mismos signals de autoridad (backlinks, E-E-A-T, velocidad) que Google.',
        completed: false,
      },
      {
        id: 'geo-1-2',
        title: 'Los motores generativos: Perplexity, ChatGPT Search, Google AI Overviews',
        type: 'reading',
        content: '## Los 3 players principales\n\n**Google AI Overviews (SGE)**\nEl más importante por volumen. Aparece en la parte superior de los resultados de Google para queries informacionales y de "cómo hacer X". Usa las fuentes que Google ya tiene indexadas y con autoridad. La ventaja: si ya tenés buen SEO, es más fácil aparecer en AI Overviews. La desventaja: reduce el CTR de los links que aparecen debajo.\n\n**Perplexity AI**\nEl que más cita fuentes explícitamente. Cada respuesta incluye referencias numeradas que el usuario puede verificar. Favorece: contenido técnico detallado, fuentes especializadas, publicaciones recientes. Tiene el mayor potencial de tráfico referido de los tres porque los usuarios hacen clic en las fuentes.\n\n**ChatGPT con búsqueda**\nMás conservador en citar, pero el de mayor base de usuarios (>100M activos). Usa Bing como motor de búsqueda subyacente. Favorece: contenido con autoridad establecida, marcas conocidas, Wikipedia-style structured content.\n\n## Cómo decide la IA qué citar\n\nNo hay una lista publicada de criterios, pero los patrones observados muestran:\n\n1. **Autoridad del dominio**: sitios con muchos backlinks de calidad y DA alto\n2. **E-E-A-T**: Experience, Expertise, Authoritativeness, Trustworthiness — señales de que el autor y el sitio son expertos reales\n3. **Claridad del contenido**: respuestas directas, sin relleno, que responden la pregunta en el primer párrafo\n4. **Structured data / Schema**: ayuda a los modelos a entender de qué trata el contenido\n5. **Frescura**: contenido reciente para topics que cambian (noticias, precios, tendencias)\n6. **Menciones de marca**: si otros sitios mencionan tu marca como autoridad en un tema, la IA lo toma como señal positiva',
        tasks: [
          'Crea una hoja de análisis: para cada motor generativo (Perplexity, ChatGPT, Google AI), lista las 3 características que más favorecen que una fuente sea citada',
          'Buscá 5 competidores en tu nicho y verificá si aparecen en respuestas de IA. ¿Qué tienen en común los que sí aparecen?',
        ],
        tip: 'Perplexity es el mejor laboratorio para GEO porque muestra exactamente qué citó y por qué. Usalo para testear si tu contenido es "citable" antes de publicarlo.',
        completed: false,
      },
      {
        id: 'geo-1-p1',
        title: 'Proyecto: Auditoría de presencia en IA',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Auditá la presencia actual de una marca (tuya o de un cliente) en los principales motores generativos. Identificá en qué consultas aparece, en cuáles no, y qué competidores dominan esas respuestas.',
        deliverables: [
          'Lista de 20 queries relevantes para la marca',
          'Tabla de resultados: qué dice cada motor (Perplexity, ChatGPT, Google AI) para cada query',
          'Análisis de competidores citados en esas respuestas',
          'Brecha identificada: dónde debería aparecer la marca y no aparece',
        ],
        rubrica: [
          'Queries representativas del negocio real',
          'Análisis comparativo entre los 3 motores',
          'Identificación clara de oportunidades de mejora',
        ],
        completed: false,
      },
    ],
    resources: [
      { title: 'Perplexity AI', url: 'https://perplexity.ai', type: 'tool' },
      { title: 'Google Search Generative Experience', url: 'https://labs.google', type: 'article' },
    ],
  },
  {
    id: 'geo-2',
    number: 74,
    title: 'Estrategia de contenido para ser citado por la IA',
    description: 'No todo el contenido es igual para los motores generativos. Aprende qué formatos, estructuras y tipos de información hacen que un LLM te cite en lugar de a tu competencia.',
    duration: '2 semanas',
    status: 'available',
    track: 'geo',
    lessons: [
      {
        id: 'geo-2-1',
        title: 'El contenido que la IA prefiere citar',
        type: 'reading',
        content: '## Por qué la IA no cita igual a todos\n\nLos modelos generativos no son neutrales en qué fuentes prefieren. Optimizan para dar la mejor respuesta posible a su usuario, y eso significa favorecer contenido que sea: claro, verificable, específico y autorizado.\n\n## Los 6 tipos de contenido con mayor tasa de citación\n\n**1. Definiciones y explicaciones claras**\nCuando alguien pregunta "¿qué es X?", la IA busca definiciones directas. Si tu artículo empieza con "X es...", tiene más probabilidad de ser citado que uno que demora 3 párrafos en llegar al punto.\n\n**2. Estadísticas y datos con fuente**\nLas IAs aman citar números concretos. "El 73% de los usuarios abandona un sitio si tarda más de 3 segundos" es citable. "Muchos usuarios se van si el sitio es lento" no lo es. Siempre incluye fecha y fuente de tus datos.\n\n**3. Listas estructuradas (como esta)**\nLas listas son fáciles de procesar para los LLMs. Pasos numerados, pros/contras, comparativas — estos formatos facilitan que la IA extraiga y cite información específica.\n\n**4. Respuestas directas a preguntas específicas**\nEstructura tu contenido en formato Q&A o FAQ. "¿Cuánto cuesta X?" → respuesta directa en el primer párrafo. No hagas al modelo buscar la respuesta en un mar de texto.\n\n**5. Casos de estudio con resultados concretos**\n"Implementamos X y el resultado fue Y" es altamente citable porque es específico, real y verificable.\n\n**6. Guías paso a paso**\nCuando el usuario pregunta "cómo hacer X", la IA quiere extraer los pasos. Si tu contenido tiene H2/H3 claros como "Paso 1: ...", "Paso 2: ...", es mucho más probable que seas citado.\n\n## Lo que reduce la probabilidad de ser citado\n- Texto de marketing ("¡Somos líderes del mercado!")\n- Contenido sin datos específicos\n- Artículos sin estructura clara (un bloque de texto)\n- Contenido que no responde una pregunta concreta\n- Actualización de hace 5 años sobre un topic cambiante',
        tasks: [
          'Revisá tus 5 páginas más importantes. ¿Cuántas tienen definiciones claras en el primer párrafo? ¿Cuántas tienen datos con fuente? ¿Cuántas usan estructura de lista o pasos? Puntuales del 0 al 3.',
          'Reescribe el primer párrafo de tu página de servicios principal para que responda directamente "¿qué hace [tu marca]?" en las primeras 2 líneas.',
        ],
        tip: 'El "snippet de IA" funciona igual que el featured snippet de Google: una respuesta directa, concisa y en formato de lista o definición tiene 3x más probabilidad de aparecer que un párrafo genérico.',
        completed: false,
      },
      {
        id: 'geo-2-2',
        title: 'Construir autoridad de marca para la IA: menciones, entities y E-E-A-T',
        type: 'reading',
        content: '## Las IAs leen la web entera, no solo tu sitio\n\nUno de los insights más importantes de GEO: los modelos de lenguaje aprenden sobre tu marca no solo desde tu propio sitio web, sino desde TODAS las menciones de tu marca en internet. Reseñas, artículos de terceros, menciones en foros, entrevistas, directorio de negocios — todo eso construye (o destruye) tu "entity" en la mente del modelo.\n\n## El concepto de Entity\n\nEn el mundo de la IA y el knowledge graph, una "entity" es una persona, lugar, organización o concepto con identidad propia y verificable. Google, ChatGPT y otros modelos tienen "conocimiento" sobre entities conocidas.\n\nSi tu marca es una entity establecida, la IA puede mencionar tu marca incluso sin buscar en la web en tiempo real. Si no lo eres, dependés 100% de que la IA encuentre tu sitio en el momento de la búsqueda.\n\n## Cómo construir tu entity\n\n**1. Consistencia de información**\nNombre, descripción, industria, fundadores, servicios — deben ser idénticos en tu sitio, LinkedIn, Google Business, Crunchbase, Wikipedia (si aplica), y cualquier directorio relevante.\n\n**2. Menciones en medios confiables**\nUna mención en un medio reconocido (aunque sea una cita o un listado) vale mucho más que 10 backlinks de sitios desconocidos. Los modelos de IA fueron entrenados con grandes cantidades de contenido periodístico.\n\n**3. E-E-A-T para IA**\nExperience + Expertise + Authoritativeness + Trustworthiness. Las IAs, al igual que Google, favorecen contenido firmado por autores reales con credenciales verificables. Tener un About page detallado, perfiles de LinkedIn de los autores, y credenciales mencionadas explícitamente ayuda.\n\n**4. Structured data (Schema.org)**\nEtiqueta tu contenido con schema markup: Organization, Person, Article, FAQ, HowTo. Esto ayuda tanto a Google como a los modelos de IA a entender de qué trata tu contenido.',
        tasks: [
          'Auditá la consistencia de tu marca: verificá que nombre, descripción e industria sean idénticos en tu sitio, LinkedIn, Google Business y directorios relevantes de tu sector',
          'Crea o actualiza tu página About con: nombre completo del founder, experiencia relevante, credenciales, y por qué son expertos en lo que ofrecen. Esto alimenta el E-E-A-T.',
          'Implementá schema markup de Organization en tu homepage si aún no lo tenés',
        ],
        tip: 'Wikipedia es la fuente más citada por los LLMs. Si tu marca o industria tiene relevancia suficiente para una entrada de Wikipedia, es una de las mejores inversiones de GEO que podés hacer.',
        completed: false,
      },
      {
        id: 'geo-2-p1',
        title: 'Proyecto: Optimización GEO de una página existente',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Tomá una página existente de tu sitio (o de un cliente) y reescribila aplicando todos los principios GEO: definición clara, datos con fuente, estructura de listas/pasos, schema markup, y E-E-A-T. Documentá los cambios y justificá cada decisión.',
        deliverables: [
          'URL de la página original',
          'Versión reescrita con cambios marcados y justificados',
          'Schema markup añadido (código JSON-LD)',
          'Análisis: qué preguntas responde ahora la página que antes no respondía',
        ],
        rubrica: [
          'Respuesta directa a una pregunta en el primer párrafo',
          'Al menos 2 datos estadísticos con fuente citada',
          'Estructura de H2/H3 clara y descriptiva',
          'Schema markup correctamente implementado',
        ],
        completed: false,
      },
    ],
    resources: [
      { title: 'Schema.org', url: 'https://schema.org', type: 'documentation' },
    ],
  },
  {
    id: 'geo-3',
    number: 75,
    title: 'Medir y escalar: GEO en la práctica',
    description: 'A diferencia del SEO donde medís rankings, en GEO medís menciones, presencia en respuestas y share of voice en la IA. Aprende a medir lo que importa y a escalar tu estrategia.',
    duration: '2 semanas',
    status: 'available',
    track: 'geo',
    lessons: [
      {
        id: 'geo-3-1',
        title: 'Métricas GEO: cómo medir lo que los rankings no miden',
        type: 'reading',
        content: '## El problema de medir GEO\n\nEl SEO tiene métricas claras: posición en SERP, tráfico orgánico, CTR. GEO es más complejo porque no hay un "ranking de IA" público ni una herramienta oficial que diga "tu marca aparece en el 30% de las respuestas sobre X tema".\n\n## Las métricas que SÍ podemos medir\n\n**1. AI Mention Rate (AMR)**\nDe forma manual o con herramientas: ¿en qué porcentaje de consultas relevantes aparece tu marca o sitio citado? Proceso: lista de 50 queries relevantes → verificar en 3 motores → calcular % de aparición.\n\n**2. Share of Voice en IA**\nDe las veces que la IA cita a alguien sobre tu tema, ¿qué % sos vos vs competidores? Este es el KPI más estratégico de GEO.\n\n**3. Branded search en AI**\nCuántas personas buscan directamente "[tu marca]" en ChatGPT o Perplexity. Esto lo podés aproximar con Google Trends y branded search en GA4.\n\n**4. Tráfico referido desde Perplexity**\nPerplexity sí aparece como referrer en Google Analytics. Es el único motor generativo que genera tráfico medible de forma directa. Seguile el crecimiento mes a mes.\n\n**5. Ranking en AI Overview de Google**\nGoogle Search Console no muestra directamente cuándo aparecés en AI Overviews, pero hay herramientas de terceros (como Semrush, Ahrefs) que están incorporando este tracking.\n\n## Herramientas actuales para GEO (2024-2025)\n- **Perplexity Analytics** (para creators): si publicás en Perplexity Spaces, tenés métricas de citación\n- **Semrush AI Visibility**: tracking de presencia en AI Overview\n- **Search Atlas**: especializado en GEO metrics\n- **Manual tracking**: el método más confiable por ahora — lista de queries + revisión semanal',
        tasks: [
          'Construí tu "GEO scorecard": 30 queries relevantes para tu negocio. Verifica en qué porcentaje aparece tu marca en Perplexity, ChatGPT y Google AI. Esto es tu baseline.',
          'Configurá en GA4 un segmento para tráfico referido desde perplexity.ai. Si no tenés tráfico, lo que medís en el futuro viene desde 0 — documéntalo como baseline.',
        ],
        tip: 'Medí tu GEO score una vez al mes usando el mismo set de queries. Los cambios de mes a mes, combinados con los cambios de contenido que hiciste, te dicen qué funciona.',
        completed: false,
      },
      {
        id: 'geo-3-2',
        title: 'Plan de contenido GEO: publicación, frecuencia y formatos',
        type: 'practice',
        content: '## GEO necesita contenido diferente al de SEO\n\nEl contenido SEO tradicional apunta a keywords con volumen de búsqueda. El contenido GEO apunta a preguntas que las personas hacen a la IA — y esas preguntas son más conversacionales, más específicas, y a veces tienen volumen de búsqueda bajo pero altísima intención.\n\n## El stack de contenido GEO\n\n**Cornerstone pieces (1 por mes)**\nGuías definitivas sobre los temas clave de tu negocio. Formato: 2000-4000 palabras, con definiciones, datos, estructura de H2/H3, FAQ al final. Son las piezas que la IA cita como referencia principal.\n\n**Data-driven posts (2 por mes)**\nEstudios propios, encuestas, análisis de datos que tenés acceso único. "Analizamos 500 campañas de email y encontramos que..." es oro para GEO porque es contenido que SOLO vos podés producir.\n\n**FAQ pages (ongoing)**\nPáginas dedicadas a responder preguntas específicas de tu industria en formato Q&A. La IA ama el formato FAQ porque ya viene estructurado como "pregunta → respuesta directa".\n\n**Comparativas y versus (según necesidad)**\n"X vs Y: cuál es mejor para [caso de uso]" es uno de los tipos de contenido más buscados en IA. Si podés ser la fuente de referencia para comparativas en tu nicho, capturás tráfico de alta intención.\n\n## Frecuencia y consistencia\n\nGEO no premia la cantidad — premia la calidad y autoridad. Es mejor publicar 2 piezas definitivas por mes que 8 posts mediocres. Los modelos aprenden de patrones: si siempre producís contenido de alta calidad sobre un tema, tu autoridad en ese tema crece con el tiempo.',
        tasks: [
          'Crea un calendario de contenido GEO para los próximos 3 meses: 1 cornerstone + 2 data posts + 4 FAQs por mes',
          'Escribe una FAQ completa (mínimo 10 preguntas) sobre el tema principal de tu negocio usando el formato Q&A directo',
        ],
        tip: 'Las FAQ pages son el tipo de contenido más subestimado para GEO. Una página bien estructurada con 20 preguntas específicas puede capturar decenas de queries de IA que antes no cubrías.',
        completed: false,
      },
      {
        id: 'geo-3-p1',
        title: 'Proyecto: Estrategia GEO de 90 días',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: 'Desarrollá una estrategia GEO completa de 90 días para una marca. Incluye auditoría inicial, calendario de contenido, plan de construcción de autoridad, y sistema de medición.',
        deliverables: [
          'GEO audit inicial con AI Mention Rate baseline',
          'Análisis de share of voice vs 3 competidores',
          'Calendario de contenido 90 días (tipos, temas, formatos)',
          'Plan de construcción de entity/autoridad',
          'Dashboard de métricas con baseline y metas',
        ],
        rubrica: [
          'Baseline medible y documentado',
          'Calendario de contenido orientado a queries de IA específicas',
          'Plan de autoridad con acciones concretas y tiempos',
          'KPIs realistas con método de medición definido',
        ],
        completed: false,
      },
    ],
    resources: [
      { title: 'Search Atlas GEO', url: 'https://searchatlas.com', type: 'tool' },
    ],
  },
  {
    id: 'geo-capstone',
    number: 76,
    title: 'Proyecto Final: Dominar un nicho en la búsqueda generativa',
    description: 'Integrá todo lo aprendido en GEO para convertirte en la fuente de referencia para la IA en un nicho específico: auditoría, estrategia de contenido, construcción de autoridad y medición continua.',
    duration: '4 semanas',
    status: 'available',
    track: 'geo',
    lessons: [
      {
        id: 'geo-cap-1',
        title: 'Brief del proyecto final de GEO',
        type: 'reading',
        content: '## El proyecto\n\nEl objetivo de este capstone es demostrar que podés posicionar una marca como fuente de referencia para la IA en un nicho concreto. Vas a combinar todo lo aprendido: auditoría de presencia, optimización de contenido, construcción de entity, y sistema de medición.\n\n## El proceso\n\n1. **Elegí la marca y el nicho** — puede ser tu propio negocio, un cliente, o una marca ficticia con datos reales de la industria\n2. **Hace el audit completo** — AI Mention Rate, share of voice, análisis de competidores en IA\n3. **Crea la estrategia** — qué queries querés ganar, qué contenido necesitás crear, cómo construís autoridad\n4. **Implementá al menos 3 piezas de contenido** — aplicando los principios GEO aprendidos\n5. **Mide y documenta** — muestra el before/after en al menos 1 query donde mejoraste la presencia',
        completed: false,
      },
      {
        id: 'geo-cap-2',
        title: 'Entrega final: tu estrategia GEO completa',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: 'Entregá un plan GEO completo con implementación parcial para una marca real. El objetivo es demostrar que podés auditar, estrategizar, crear contenido GEO-optimizado y medir resultados.',
        deliverables: [
          'Informe de auditoría GEO (baseline documentado)',
          'Estrategia de 6 meses con objetivos de AI Mention Rate',
          'Mínimo 3 piezas de contenido publicadas y optimizadas para GEO',
          'Schema markup implementado en al menos 2 páginas',
          'Dashboard de métricas con primer mes de datos reales',
        ],
        rubrica: [
          'Auditoría con datos reales y metodología clara',
          'Estrategia conectada directamente a las gaps identificadas',
          'Contenido que aplica los principios GEO (estructura, datos, E-E-A-T)',
          'Medición real, aunque sea de solo 1-2 queries mejoradas',
        ],
        completed: false,
      },
    ],
    resources: [],
  },
]
