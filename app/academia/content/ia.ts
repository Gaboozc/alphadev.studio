import type { Module } from '../types'

// Rama: Inteligencia Artificial — 7 módulos.
// Cada módulo declara su `track`; la rama se deriva del track en ramas.ts.
export const MODULES_IA: Module[] = [
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
