import type { Module } from '../../../types'

// Modulo: Flujos agenticos y sistemas multiagente
export const MOD_AGENTES_MULTIAGENTE: Module = {
  id: 'iaeng-3',
  number: 3,
  title: 'Flujos agénticos, evaluación y observabilidad',
  description: 'De un agente suelto a un sistema: enrutado, especialización, y cómo medir que funciona antes y después de ponerlo en producción.',
  duration: '3 semanas',
  status: 'available',
  track: 'iaeng-agentes',
  audience: 'aprendizaje',
  lessons: [
    {
      id: 'ie3-l1',
      title: 'Patrones de orquestación',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Un agente gigante no escala

Un solo agente con quince herramientas y un prompt de dos páginas elige mal, se confunde y es imposible de depurar. La solución es la misma que en cualquier sistema: dividir en piezas con una responsabilidad cada una.

### Los patrones que cubren casi todo

**Encadenamiento.** La salida de un paso alimenta al siguiente, en orden fijo.

\`\`\`
extraer datos → analizar → redactar informe
\`\`\`

Es el más simple y el más subestimado. Si el proceso es conocido, esto es lo correcto.

**Enrutado.** Un clasificador decide a qué especialista mandar cada caso.

\`\`\`
consulta → clasificar → ┬→ agente de facturación
                      ├→ agente de soporte técnico
                      └→ agente de ventas
\`\`\`

Cada especialista tiene pocas herramientas y un prompt corto. Funciona mucho mejor que uno que lo haga todo.

**Paralelización.** Varias tareas independientes a la vez, y luego se juntan. Tres análisis distintos del mismo documento se ejecutan en paralelo y un paso final los combina. Reduce la latencia de forma directa.

**Orquestador y trabajadores.** Un agente descompone la tarea en subtareas, las reparte y ensambla el resultado. Es el patrón más flexible y el más caro: úsalo cuando las subtareas no se pueden conocer de antemano.

**Evaluador y refinador.** Un agente produce, otro critica con criterios explícitos, el primero corrige. Dos o tres vueltas como mucho. Funciona bien cuando hay criterios claros de calidad —un texto que debe cumplir una guía de estilo— y mal cuando la calidad es subjetiva.

### La regla de diseño

**Empieza por lo más simple que pueda funcionar.** El orden de complejidad es: una llamada, cadena fija, enrutado, agente con herramientas, orquestador.

Sube un escalón solo cuando el anterior falle por una razón que puedas nombrar. Cada escalón multiplica el coste, la latencia y la dificultad de depuración.

### Grafos de estado

Cuando el flujo tiene ramas y ciclos, escribirlo como un grafo explícito lo hace visible y depurable. Es lo que resuelve LangGraph, y la idea es independiente de la herramienta: nodos que hacen algo, aristas que deciden a dónde ir, y un estado compartido.

\`\`\`python
def enrutar(estado):
  if estado["tipo"] == "factura":
      return "agente_facturacion"
  if estado["confianza"] < 0.6:
      return "escalar_a_humano"
  return "agente_general"
\`\`\`

Lo valioso: **el enrutado es código tuyo, no una decisión del modelo.** Puedes leerlo, probarlo con tests normales y razonar sobre él. Cuanto más de la lógica de control viva en código y menos en el prompt, más fiable es el sistema.

### La salida a un humano es parte del diseño

Todo flujo necesita una rama de escalamiento: baja confianza, demasiados intentos, caso fuera de alcance. Diseñarla desde el principio evita que el sistema intente resolver a la fuerza lo que no puede.`,
      tasks: [
        'Dibuja el flujo de una tarea real tuya identificando qué patrón le corresponde',
        'Implementa un enrutado con dos especialistas y comprueba que cada consulta llega al correcto',
        'Paraleliza dos subtareas independientes y mide la reducción de latencia',
        'Agrega una rama de escalamiento a humano con su condición explícita',
      ],
      tip: 'Cada vez que muevas una decisión del prompt al código, el sistema se vuelve más fiable y más barato de depurar. El modelo debería decidir lo que requiere entender lenguaje, no el flujo de control.',
      completed: false,
    },
    {
      id: 'ie3-l2',
      title: 'Evaluación: saber si funciona',
      type: 'reading',
      difficulty: 'profesional',
      content: `## El problema

Cambias el prompt, pruebas dos ejemplos, parece mejor y lo despliegas. Una semana después algo que antes funcionaba ya no. No lo sabes porque nunca lo mediste.

**Sin evaluación no hay ingeniería, hay intuición.** Y la intuición sobre sistemas no deterministas es especialmente mala.

### El conjunto de evaluación

Lo mínimo viable: entre 30 y 100 casos reales con su resultado esperado.

\`\`\`json
[
{
  "id": "ev_01",
  "entrada": "¿Cuál es la política de devoluciones para productos en oferta?",
  "esperado": "30 días, siempre que conserve el empaque original",
  "fuente": "politicas.pdf, sección 4.2",
  "categoria": "devoluciones"
}
]
\`\`\`

De dónde salen: consultas reales de usuarios, los casos que ya fallaron, y los casos límite que te preocupan. **Cada error que encuentres en producción se convierte en un caso de evaluación nuevo**, y así el conjunto mejora con el tiempo.

Incluye siempre casos que **deben** fallar: preguntas fuera de alcance donde la respuesta correcta es admitir desconocimiento.

### Cómo se puntúa

**Determinista**, cuando hay una respuesta verificable: ¿recuperó el documento correcto? ¿el JSON tiene la forma esperada? ¿el número coincide? Es lo más fiable; úsalo siempre que se pueda.

**Con un modelo como juez**, cuando la respuesta es texto libre. Otro modelo compara la respuesta con la esperada según criterios explícitos:

\`\`\`python
prompt_juez = f"""Compara la respuesta con la esperada y responde solo con JSON.

ESPERADA: {esperada}
OBTENIDA: {obtenida}

Evalúa:
- correcta: ¿dice lo mismo en lo esencial? (true/false)
- completa: ¿omite algo importante? (true/false)
- inventada: ¿afirma algo que no está en la esperada? (true/false)

Responde: {{"correcta": bool, "completa": bool, "inventada": bool, "motivo": "..."}}
"""
\`\`\`

Criterios concretos y salida estructurada. Pedirle "puntúa del 1 al 10" produce números que no significan nada.

**Con una persona**, para lo que de verdad importa. No escala, pero una revisión humana de 20 casos antes de un lanzamiento vale más que cualquier métrica automática.

### Mide las etapas por separado

En un sistema RAG con agente, un fallo puede estar en la recuperación, en la elección de herramienta o en la redacción final. Una métrica global solo dice que algo va mal.

\`\`\`
recuperación:  ¿trajo el documento correcto?          82%
herramientas:  ¿eligió la correcta?                   91%
respuesta:     ¿respondió bien teniendo lo necesario? 88%
extremo a extremo: ¿el usuario obtuvo lo que pedía?   71%
\`\`\`

Ese desglose te dice exactamente dónde invertir. La métrica global sola, no.

### Las cuatro dimensiones a vigilar

**Calidad** (¿acierta?), **coste** (¿cuánto por tarea?), **latencia** (¿cuánto tarda?) y **fiabilidad** (¿qué porcentaje termina sin error?).

Optimizar solo la calidad produce sistemas correctísimos que tardan cuarenta segundos y cuestan un dólar por consulta. Las cuatro se miran juntas.

### Ejecutar la evaluación en cada cambio

Que sea un comando, como las pruebas del módulo de testing:

\`\`\`bash
python -m evaluacion --conjunto casos.json --salida resultados.json
\`\`\`

Y compara siempre contra la ejecución anterior. Lo que importa no es el número absoluto sino si subió o bajó respecto a lo que había.`,
      tasks: [
        'Arma un conjunto de 30 casos reales incluyendo cinco que deban fallar',
        'Implementa puntuación determinista para lo verificable y un juez para el texto libre',
        'Mide por etapas y localiza cuál es la que más baja el resultado global',
        'Cambia una sola cosa, vuelve a medir y documenta si mejoró o empeoró',
      ],
      tip: 'Cada fallo que aparezca en producción debe terminar como un caso nuevo en tu conjunto de evaluación. Es el mismo hábito que escribir una prueba al arreglar un error: garantiza que ese fallo concreto no vuelva sin que te enteres.',
      completed: false,
    },
    {
      id: 'ie3-l3',
      title: 'Coste, latencia y observabilidad',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Lo que cuesta de verdad

El precio por token parece pequeño hasta que lo multiplicas. Haz el cálculo antes de prometer nada:

\`\`\`
coste por tarea × tareas al día × 30 = coste mensual
\`\`\`

Una tarea de 0,04 USD parece nada. Con 500 al día son 600 USD al mes. Si le cobras al cliente una cuota fija de 400, el proyecto pierde dinero cada mes que funciona bien.

### Reducir coste sin perder calidad

**Modelo por tarea.** No todo necesita el modelo más capaz. Clasificar la intención de un mensaje lo hace bien un modelo pequeño y barato; redactar el informe final quizá no. Enrutar por dificultad es la optimización que más ahorra.

**Caché de prompts.** Si el mismo contexto largo se repite entre llamadas —instrucciones del sistema, documentos fijos—, los proveedores permiten cachearlo y cobrarlo mucho más barato. En un agente que reenvía el historial, esto cambia el orden de magnitud de la factura.

**Podar el contexto.** Ya visto: resumir lo viejo en vez de arrastrarlo.

**Menos vueltas.** Cada paso del bucle es una llamada completa. Herramientas mejor descritas y prompts más claros reducen los pasos necesarios, y eso baja el coste más que cualquier otro ajuste.

**No llamar al modelo.** La optimización más efectiva. Caché de respuestas para preguntas repetidas, reglas para los casos triviales, validaciones en código antes de invocar nada.

### Latencia

Los modelos grandes tardan segundos. En un flujo de cinco pasos son medio minuto, y eso se siente como roto.

**Transmite la respuesta** en vez de esperar a tenerla completa: el usuario ve que algo pasa desde el primer momento.

**Paraleliza** lo independiente.

**Muestra el progreso.** "Consultando el inventario…", "Redactando el resumen…". No reduce la espera, pero cambia por completo cómo se percibe.

**Responde rápido lo fácil.** Si una regla resuelve el caso, respóndelo al instante y reserva el camino lento para lo que lo necesite.

### Observabilidad

Sin trazas, un sistema con modelos es una caja negra. Lo mínimo que hay que registrar por ejecución:

\`\`\`
id de la tarea y del usuario
prompt completo enviado, por llamada
respuesta completa recibida
herramientas invocadas, con argumentos y resultados
tokens de entrada y de salida
latencia por paso y total
coste calculado
resultado: éxito, fallo o escalado a humano
\`\`\`

Con eso respondes lo que un cliente pregunta cuando algo sale mal: **por qué el sistema hizo esto**. Sin eso, la respuesta es "no lo sé".

### Vigilar la deriva

Un sistema que funcionaba puede degradarse sin que cambies nada: el proveedor actualiza el modelo, los usuarios preguntan cosas distintas, los documentos se quedan viejos.

Por eso la evaluación se ejecuta **periódicamente**, no solo al desplegar. Un descenso sostenido en la tasa de éxito es la señal, y solo la ves si estás midiendo de forma continua.

### Alertas que valen la pena

\`\`\`
coste diario > presupuesto        → avisar
tasa de fallo > umbral            → avisar
latencia p95 > umbral             → avisar
escalados a humano subiendo       → revisar qué cambió
\`\`\`

Usa el percentil 95 y no el promedio: el promedio esconde que uno de cada veinte usuarios espera cuarenta segundos.`,
      tasks: [
        'Calcula el coste mensual de tu sistema al volumen que espera el cliente',
        'Enruta las tareas fáciles a un modelo más barato y mide cuánto ahorras',
        'Activa la caché de prompts para el contexto fijo y compara la factura',
        'Registra las trazas completas de veinte ejecuciones y calcula la latencia p95',
      ],
      tip: 'Haz el cálculo del coste mensual antes de cerrar el precio con el cliente, no después. Un proyecto de IA con cuota fija y coste variable sin tope es la forma más rápida de trabajar gratis o de perder dinero cuanto más éxito tenga.',
      completed: false,
    },
    {
      id: 'ie3-l4',
      title: 'Proyecto: sistema multiagente evaluado',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: `Vas a construir un sistema que enrute consultas a agentes especializados, con evaluación automática, control de coste y trazas completas. Es la diferencia entre un agente que impresiona en una demostración y uno que un cliente puede poner frente a sus usuarios.

El caso: una empresa recibe consultas de distintos tipos —facturación, soporte técnico, información comercial— y quiere atender automáticamente lo que se pueda y escalar el resto con contexto suficiente para que la persona no empiece de cero.`,
      deliverables: [
        'Clasificador que enrute cada consulta al especialista correcto, con una rama de escalamiento por baja confianza',
        'Al menos dos agentes especializados, cada uno con sus propias herramientas y su prompt corto',
        'Grafo de estado explícito donde el control de flujo esté en código y no en el prompt',
        'Conjunto de evaluación de 40 casos con métricas por etapa y extremo a extremo',
        'Registro de trazas: prompts, herramientas, tokens, latencia y coste por ejecución',
        'Panel o informe con las cuatro dimensiones: calidad, coste, latencia y fiabilidad',
        'Límite de gasto por tarea y por día, con corte automático',
      ],
      rubrica: [
        'El enrutado se puede probar con tests normales porque es código, no una decisión del modelo',
        'Cada especialista tiene menos de cinco herramientas y un prompt que cabe en una pantalla',
        'La evaluación distingue fallo de enrutado, de herramienta y de respuesta final',
        'El conjunto de evaluación incluye casos donde la respuesta correcta es escalar a un humano',
        'Existe el cálculo del coste mensual al volumen esperado, con su supuesto de tráfico escrito',
        'Las trazas permiten reconstruir cualquier ejecución concreta a partir de su identificador',
        'Al superar el límite de gasto, el sistema se detiene en vez de seguir facturando',
        'El informe documenta al menos un cambio hecho a partir de los resultados de la evaluación',
      ],
      tasks: [
        'Diseña el grafo en papel antes de programarlo, marcando dónde decide el código y dónde el modelo',
        'Construye el conjunto de evaluación antes que los agentes, para desarrollar contra una medida',
        'Implementa el enrutado y mide su acierto por separado antes de conectar los especialistas',
        'Instrumenta las trazas desde el primer día, no al final',
        'Ejecuta la evaluación completa, cambia una cosa y vuelve a ejecutarla',
      ],
      discussionPrompts: [
        '¿Qué información debería llevar un caso escalado para que la persona no tenga que empezar de cero?',
        'Si el clasificador se equivoca de especialista, ¿el sistema debería poder corregirse solo o escalar?',
      ],
      tip: 'Construye el conjunto de evaluación antes que el sistema. Suena al revés, pero desarrollar contra una medida cambia todo: cada cambio se juzga por su efecto y no por la impresión que da al probar dos ejemplos a mano.',
      completed: false,
    },
    {
      id: 'ie3-l5',
      title: 'Examen: orquestación y evaluación',
      type: 'exam',
      difficulty: 'profesional',
      questions: [
        {
          q: 'Tu agente único tiene quince herramientas y elige mal con frecuencia. ¿Cuál es la corrección estructural?',
          options: [
            'Alargar el prompt del sistema explicando mejor cada herramienta',
            'Enrutar a varios agentes especializados, cada uno con pocas herramientas y un prompt corto',
            'Cambiar a un modelo con ventana de contexto más grande',
            'Reducir la temperatura del modelo',
          ],
          correct: 1,
          explanation: 'Un prompt más largo empeora el problema: más texto que procesar y más opciones que confundir. Dividir por especialidad reduce el espacio de decisión de cada agente, y el enrutado previo es código que se puede probar y razonar.',
        },
        {
          q: '¿Por qué conviene que el control de flujo viva en código y no en el prompt?',
          options: [
            'Porque el código se ejecuta más rápido que el modelo',
            'Porque es determinista, se puede probar con tests normales y permite razonar sobre el sistema, mientras que una decisión del modelo varía entre ejecuciones',
            'Porque los modelos no saben tomar decisiones de enrutado',
            'Porque reduce el número de herramientas necesarias',
          ],
          correct: 1,
          explanation: 'Cada decisión que se mueve del prompt al código elimina una fuente de variabilidad. El modelo debería decidir lo que requiere entender lenguaje; el flujo de control es lógica y pertenece al código, donde se puede leer, probar y depurar.',
        },
        {
          q: 'Tu evaluación global da 71% de éxito. ¿Qué haces primero?',
          options: [
            'Cambiar a un modelo más capaz y volver a medir',
            'Desglosar por etapas —recuperación, elección de herramienta, respuesta— para saber cuál arrastra el resultado',
            'Ampliar el conjunto de evaluación a 200 casos',
            'Subir el límite de pasos del agente',
          ],
          correct: 1,
          explanation: 'Un 71% global no dice dónde está el problema. Si la recuperación acierta el 82%, ningún cambio de modelo va a arreglar el 18% de casos donde el sistema nunca vio la información correcta. El desglose por etapa convierte un número en una tarea concreta.',
        },
        {
          q: 'Al usar un modelo como juez de las respuestas, ¿qué produce evaluaciones más útiles?',
          options: [
            'Pedirle una puntuación del 1 al 10 sobre la calidad general',
            'Darle criterios concretos y pedir salida estructurada: correcta, completa, inventada, con el motivo',
            'Pedirle que escriba un párrafo valorando la respuesta',
            'Usar el mismo modelo que generó la respuesta, para que entienda el contexto',
          ],
          correct: 1,
          explanation: 'Una puntuación numérica global no es reproducible ni accionable: no sabes qué significa un 7 ni qué cambiar para llegar a 8. Criterios binarios y concretos, con salida estructurada, producen métricas comparables entre ejecuciones y señalan qué falló.',
        },
        {
          q: 'Un cliente paga una cuota mensual fija por tu sistema. ¿Qué cálculo hay que hacer antes de firmar?',
          options: [
            'El coste de desarrollo dividido entre los meses de contrato',
            'El coste por tarea multiplicado por el volumen esperado al mes: con cuota fija y coste variable sin tope, el proyecto pierde dinero cuanto más se use',
            'El coste de la infraestructura de alojamiento',
            'El precio de la competencia por un servicio parecido',
          ],
          correct: 1,
          explanation: 'El coste de un sistema con modelos es variable y proporcional al uso, mientras que la cuota es fija. Sin ese cálculo y sin un tope de gasto, el éxito del producto es exactamente lo que destruye su margen. Hay que hacerlo antes de fijar el precio, no después.',
        },
        {
          q: '¿Por qué se vigila la latencia con el percentil 95 y no con el promedio?',
          options: [
            'Porque el percentil 95 es más fácil de calcular',
            'Porque el promedio esconde la cola: uno de cada veinte usuarios puede estar esperando mucho más y el promedio no lo refleja',
            'Porque los proveedores facturan por percentil',
            'Porque el promedio solo aplica a sistemas deterministas',
          ],
          correct: 1,
          explanation: 'Un promedio de 3 segundos es compatible con que el 5% de los usuarios espere 40. Ese 5% es el que abandona y el que se queja. El p95 hace visible la experiencia del peor caso habitual, que es la que determina si el sistema se percibe como fiable.',
        },
      ],
      completed: false,
    },
  ],
  resources: [
    {
      title: 'LangGraph — grafos de estado para agentes',
      url: 'https://langchain-ai.github.io/langgraph/',
      type: 'documentation',
    },
    {
      title: 'Anthropic — Caché de prompts',
      url: 'https://docs.claude.com/en/docs/build-with-claude/prompt-caching',
      type: 'documentation',
    },
    {
      title: 'OpenTelemetry — trazas y métricas',
      url: 'https://opentelemetry.io/docs/',
      type: 'documentation',
    },
    {
      title: 'Langfuse — observabilidad y evaluación de sistemas con modelos',
      url: 'https://langfuse.com/docs',
      type: 'tool',
    },
  ],
}
