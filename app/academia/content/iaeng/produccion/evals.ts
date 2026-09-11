import type { Module } from '../../../types'

// Modulo: Evaluacion y observabilidad
export const MOD_PROD_EVALS: Module = {
  id: 'iaeng-evals',
  number: 1,
  title: 'Evaluación y observabilidad',
  description: 'Sin medir, un sistema con modelos se gestiona por intuición. Conjuntos de evaluación que crecen con cada fallo real, un juez calibrado antes de confiar en él, y trazas con el estándar que usa el resto de tu backend.',
  duration: '4 semanas',
  status: 'available',
  track: 'iaeng-produccion',
  audience: 'aprendizaje',
  lessons: [
    {
      id: 'eval-l1',
      title: 'Por qué medir un sistema no determinista es distinto',
      type: 'reading',
      difficulty: 'profesional',
      content: `## El mismo código, dos resultados distintos

Un backend normal es determinista: la misma entrada produce la misma salida, y una prueba que pasó ayer sigue pasando hoy si no tocaste nada. Un sistema con modelos no tiene esa garantía — la misma pregunta puede dar respuestas ligeramente distintas en dos llamadas seguidas, y "funciona" deja de ser una afirmación binaria.

Eso no significa que no se pueda medir. Significa que la unidad de medida no es "pasa o falla" sobre un caso, sino una **tasa de éxito sobre un conjunto de casos**, revisada con la misma disciplina con la que revisas una suite de pruebas.

### La secuencia que produce sistemas rotos sin que nadie se entere

Cambias un prompt. Pruebas dos ejemplos a mano. Parecen mejor que antes. Lo despliegas. Una semana después, un caso que funcionaba perfectamente ya no funciona, y nadie lo nota hasta que un cliente se queja — porque nunca hubo una medición contra la que comparar "antes" y "después".

**Sin evaluación no hay ingeniería, hay intuición.** Y la intuición sobre sistemas no deterministas es sistemáticamente mala: dos ejemplos que salieron bien no dicen nada sobre los doscientos casos que no probaste.

### Qué se mide, en dos niveles

**Por etapa.** En un sistema con RAG y agente, un fallo puede estar en la recuperación, en la elección de herramienta, o en la redacción final. Medir solo el resultado final —"¿respondió bien?"— mezcla las tres causas en un solo número que no dice dónde intervenir.

\`\`\`
recuperación:  ¿trajo el documento correcto?           82%
herramientas:  ¿eligió la correcta?                    91%
respuesta:     ¿respondió bien con lo que tenía?        88%
extremo a extremo: ¿el usuario obtuvo lo que pedía?     71%
\`\`\`

Si la recuperación acierta el 82%, ningún ajuste al prompt de redacción va a arreglar ese 18% de casos donde el sistema nunca tuvo la información correcta delante. El desglose por etapa convierte un número abstracto en una tarea concreta.

**En cuatro dimensiones a la vez.** Calidad, coste, latencia y fiabilidad. Optimizar solo la calidad produce sistemas correctísimos que tardan cuarenta segundos y cuestan un dólar por consulta — technically correcto, inservible en producción.

### El hábito que hace crecer el sistema de medición solo

Cada fallo que aparece en producción se convierte en un caso nuevo del conjunto de evaluación. Es el mismo reflejo que escribir una prueba al corregir un bug: garantiza que ese fallo concreto no vuelva a colarse sin que te enteres, y con el tiempo el conjunto deja de ser hipotético y empieza a representar los fallos reales de tu sistema, no los que imaginaste al diseñarlo.

Esto es la base sobre la que se construyen las próximas lecciones: qué forma tiene ese conjunto, cómo se puntúa automáticamente, y cómo se convierte en trazas que explican por qué un caso concreto falló.`,
      tasks: [
        'Elige un sistema tuyo y define sus cuatro etapas medibles, aunque hoy no las midas todavía',
        'Explica con un ejemplo propio por qué un 71% global puede esconder una etapa al 40% y otra al 95%',
        'Revisa los últimos tres fallos reales de un sistema tuyo: ¿se convirtieron en casos de evaluación o se perdieron?',
        'Enumera las cuatro dimensiones —calidad, coste, latencia, fiabilidad— para un sistema tuyo, aunque sea con estimaciones aproximadas',
      ],
      tip: 'Si tu única forma de saber si un cambio mejoró el sistema es "probarlo con dos preguntas y ver qué tal se ve", no tienes evaluación: tienes una impresión. Las dos próximas lecciones son exactamente cómo convertir esa impresión en un número que se puede comparar entre versiones.',
      completed: false,
    },
    {
      id: 'eval-l2',
      title: 'El conjunto dorado: de dónde sale y cómo se mantiene vivo',
      type: 'reading',
      difficulty: 'profesional',
      content: `## No es una lista de preguntas que se te ocurrieron

Un **conjunto dorado** es la colección revisada y versionada de casos —con su resultado esperado— contra la que se mide cualquier cambio. La palabra "dorado" no es decorativa: implica que alguien lo revisó y confía en que el resultado esperado es correcto, no que se generó automáticamente y se dio por bueno.

Un conjunto dorado sólido tiene **cuatro bloques**, y un conjunto que solo tiene uno de ellos mide una parte muy estrecha de la realidad.

### 1. Una muestra representativa de tráfico real

Casos que de verdad preguntó gente, no los que a ti se te ocurrieron sentado a diseñar el sistema. Las preguntas reales tienen errores de tipeo, ambigüedad y formas de pedir las cosas que nunca anticiparías escribiendo casos de prueba desde cero.

### 2. Una biblioteca adversarial

Casos diseñados para romper el sistema a propósito: inyección de prompt, preguntas fuera de alcance, intentos de extraer el prompt del sistema. Si el módulo de seguridad enseñó a defenderse de esto, este bloque comprueba que la defensa sigue funcionando después de cada cambio.

### 3. Casos límite deliberados

Los que preocupan aunque nunca hayan ocurrido: la entrada vacía, el documento de cien páginas, el usuario que pregunta en un idioma distinto. No esperas a que pasen en producción para incluirlos.

### 4. Repeticiones de fallos que ya salieron a producción

El bloque más valioso y el más fácil de olvidar. Cada incidente real que llegó a un usuario se convierte en un caso permanente del conjunto — es lo que impide que el mismo fallo vuelva sin que nadie lo note.

\`\`\`json
{
  "id": "ev_047",
  "entrada": "¿Cuál es la política de devoluciones para productos en oferta?",
  "esperado": "30 días, siempre que conserve el empaque original",
  "categoria": "devoluciones",
  "origen": "produccion",
  "bloque": "regresion",
  "fecha_incidente": "2026-08-14"
}
\`\`\`

El campo \`origen\` y \`bloque\` no son adorno: sin ellos, con el tiempo no puedes saber si tu conjunto está sesgado hacia casos fáciles inventados en una tarde, o si de verdad refleja lo que pasa en producción.

### Empezar sin nada: los últimos diez fallos

Si no tienes conjunto todavía, el punto de partida más honesto no es sentarte a imaginar cien casos — es tomar **los últimos diez fallos reales que recuerdes** y convertirlos en los primeros diez casos del conjunto. Crece desde ahí, y crece más rápido de lo que parece: cada semana de producción aporta material nuevo sin que tengas que inventarlo.

### Tamaño mínimo viable

Entre 30 y 100 casos es donde un conjunto empieza a ser útil — menos que eso, un solo caso ruidoso cambia el resultado global de forma desproporcionada. No hace falta empezar ahí: empieza con diez y crece con cada fallo real, según el hábito de la lección anterior.

### Incluye casos que DEBEN fallar

Preguntas fuera de alcance donde la respuesta correcta es que el sistema **admita que no sabe**. Un sistema que siempre intenta responder algo, aunque sea inventado, falla exactamente en el caso donde más importaba que no lo hiciera.

### Mantenerlo vivo, no solo crearlo

Un conjunto dorado que no cambia se queda obsoleto en meses: los usuarios preguntan cosas distintas, el producto cambia, las categorías que importaban dejan de existir y aparecen otras. Revísalo con la misma cadencia con la que revisas cualquier otra parte del sistema — no es un artefacto que se escribe una vez y se olvida.`,
      tasks: [
        'Construye un conjunto de al menos 30 casos con los cuatro bloques representados',
        'Convierte tus últimos cinco fallos reales —o los que recuerdes— en casos permanentes del conjunto',
        'Añade al menos tres casos adversariales que prueben una defensa del módulo de seguridad',
        'Incluye dos casos donde la respuesta correcta sea "no lo sé" y verifica si tu sistema lo admite',
      ],
      tip: 'Si tu conjunto de evaluación solo tiene casos que se te ocurrieron pensando en el sistema, no tiene el bloque más importante: los que salieron de usarlo de verdad. Ese bloque es el que evita que el mismo incidente se repita sin que te enteres.',
      completed: false,
    },
    {
      id: 'eval-l3',
      title: 'Puntuar respuestas: determinista, con juez, o humana',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Tres formas de puntuar, y cuándo usar cada una

**Determinista**, siempre que se pueda. ¿Recuperó el documento correcto? ¿El JSON tiene la forma esperada? ¿El número coincide? Es la más fiable porque no depende de que otro modelo interprete nada — es código normal comparando un valor contra otro.

**Con un modelo como juez**, cuando la respuesta es texto libre y no hay una única forma correcta de decirlo. **Humana**, para lo que de verdad importa antes de un lanzamiento: no escala, pero revisar 20 casos a mano vale más que cualquier métrica automática cuando la decisión es grande.

### Un juez mal diseñado no mide nada

Pedirle a un modelo "puntúa esta respuesta del 1 al 10" produce números que no significan nada reproducible: un 7 de una ejecución no es comparable con un 7 de otra, y nadie puede explicar qué separa un 7 de un 8.

La alternativa es dar **criterios binarios y explícitos**, con salida estructurada:

\`\`\`python
from pydantic import BaseModel

class Veredicto(BaseModel):
    correcta: bool      # ¿dice lo mismo en lo esencial que la respuesta esperada?
    completa: bool       # ¿omite algo importante?
    inventada: bool       # ¿afirma algo que no está en la esperada?
    motivo: str

def juzgar(esperada: str, obtenida: str) -> Veredicto:
    return modelo_juez.with_structured_output(Veredicto).invoke(f"""
Compara la respuesta obtenida con la esperada.

ESPERADA: {esperada}
OBTENIDA: {obtenida}
""")
\`\`\`

Con criterios concretos, dos ejecuciones del mismo caso producen veredictos comparables, y cuando algo falla el campo \`motivo\` dice por qué sin que tengas que releer la respuesta completa.

### Calibrar el juez antes de confiar en él

Un juez automático es útil solo si sus veredictos se parecen a los que daría una persona revisando lo mismo. Eso se comprueba, no se asume:

1. Toma entre 20 y 30 casos y puntúalos **tú mismo**, a mano.
2. Puntúa los mismos casos con el juez automático.
3. Compara. Si el juez coincide con tu criterio en la gran mayoría de los casos, confía en él para el resto. Si discrepa en una fracción relevante, el problema está en los criterios del prompt del juez, no en tus casos — ajústalos y repite la calibración antes de usarlo en serio.

Saltarse este paso es la forma más común de terminar con una métrica que sube en el panel mientras la calidad real, la que percibe un usuario, se mantiene igual o empeora.

### Ejecutar en cada cambio, no de vez en cuando

La evaluación se ejecuta como un comando, igual que la suite de pruebas del módulo de testing:

\`\`\`bash
python -m evaluacion --conjunto casos.json --salida resultados.json
\`\`\`

Y se compara siempre contra la ejecución anterior, no contra un número absoluto aislado. Lo que importa es la dirección del cambio: si el resultado bajó respecto a antes de tu modificación, algo empeoró, aunque el número siga pareciendo "alto" en abstracto.

### La regla de oro del orden

Construir el conjunto de evaluación **antes** que el sistema, o al menos antes del siguiente cambio grande, cambia la naturaleza del trabajo: cada modificación se juzga por su efecto medido, no por la impresión que da al probar dos ejemplos a mano — que es exactamente el hábito que esta lección empezó señalando como el origen de los sistemas rotos sin que nadie se entere.`,
      tasks: [
        'Implementa puntuación determinista para todo lo que sea verificable en tu sistema',
        'Diseña un juez con criterios binarios explícitos y salida estructurada, no una puntuación numérica libre',
        'Calibra el juez contra 20 casos que puntúes tú mismo y documenta el grado de coincidencia',
        'Ejecuta la evaluación completa, cambia una sola cosa del sistema, y vuelve a ejecutarla comparando contra el resultado anterior',
      ],
      tip: 'Antes de confiar en un juez automático para decidir si un cambio fue bueno o malo, pregúntate si alguna vez comprobaste que sus veredictos coinciden con los tuyos. Si nunca lo calibraste, no sabes si estás midiendo calidad o midiendo el capricho de ese modelo concreto.',
      completed: false,
    },
    {
      id: 'eval-l4',
      title: 'Trazas con OpenTelemetry: el estándar y no un log propio',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Por qué no basta con un log de texto

Un log es una lista plana de líneas. Una traza es un **árbol de la ejecución**, con tiempos, entradas y salidas de cada paso, todos unidos por una raíz común. Sin ella, cuando un cliente reporta que algo salió mal, la respuesta es una conjetura; con ella, es lectura.

Hasta ahora podías construir esto a mano —una tabla propia con \`run_id\`, tipo de paso, entrada, salida y duración. Funciona, y para un sistema pequeño es razonable. El problema aparece cuando ese sistema con modelos convive con el resto de tu backend, que probablemente ya traza con un estándar: tener dos sistemas de trazas distintos, uno para "lo normal" y otro para "lo de IA", es exactamente el tipo de fragmentación que un estándar existe para evitar.

### Las convenciones semánticas de GenAI

OpenTelemetry —el estándar abierto de trazas y métricas que probablemente ya usa el resto de tu infraestructura— define un conjunto de atributos específicos para operaciones con modelos, bajo el prefijo \`gen_ai\`:

\`\`\`python
from opentelemetry import trace

tracer = trace.get_tracer("mi-agente")

with tracer.start_as_current_span("llamada_al_modelo") as span:
    span.set_attribute("gen_ai.system", "anthropic")
    span.set_attribute("gen_ai.request.model", "claude-sonnet-5")
    respuesta = modelo.invoke(prompt)
    span.set_attribute("gen_ai.usage.input_tokens", respuesta.uso.entrada)
    span.set_attribute("gen_ai.usage.output_tokens", respuesta.uso.salida)
\`\`\`

El valor de usar el nombre estándar en vez de uno propio (\`tokens_entrada\` vs \`gen_ai.usage.input_tokens\`) no es estético: significa que cualquier herramienta de observabilidad compatible con OpenTelemetry entiende tus trazas sin configuración adicional, y que las trazas de tu agente aparecen en el mismo panel que las del resto de tu backend en vez de vivir en un sistema aparte.

### Un detalle de diseño que conviene copiar

La especificación separa dos cosas que es tentador mezclar: los **atributos** de un span (nombre del modelo, conteo de tokens — datos estructurados y pequeños) y los **eventos** del span (el contenido real de prompts y respuestas — potencialmente largo y sensible).

\`\`\`python
# Los atributos son metadatos ligeros, siempre presentes
span.set_attribute("gen_ai.request.model", "claude-sonnet-5")

# El contenido va en un evento aparte, que se puede filtrar o
# desactivar en el recolector sin tocar una línea de código
span.add_event("gen_ai.content.prompt", {"contenido": prompt})
\`\`\`

La razón práctica: cuando alguien pregunte cuánto tiempo guardas el texto que escriben tus usuarios, poder responder "los eventos de contenido tienen su propia política de retención, separada de los atributos" es mucho mejor que tener que auditar cada span uno por uno.

### Cada paso de un agente, un span hijo

Para un agente con herramientas, cada llamada al modelo y cada ejecución de herramienta se traza como un span dentro del span de la ejecución completa:

\`\`\`
ejecución_agente  (span raíz)
├─ llamada_al_modelo        gen_ai.usage.input_tokens=1840
├─ herramienta:buscar_pedido
├─ llamada_al_modelo        gen_ai.usage.input_tokens=2010
└─ herramienta:buscar_pedido
\`\`\`

Con esto reconstruido, el diagnóstico de "el agente contestó cualquier cosa" deja de ser una conjetura: la traza muestra que la herramienta devolvió "no encontrado" dos veces y el modelo, sin más datos, se inventó una respuesta.

### Cuándo conviene una plataforma sobre esto

Guardar spans en tu propia base te lleva lejos, pero cuando quieras comparar ejecuciones entre versiones de un prompt, agrupar por usuario, o ver la evolución del coste en el tiempo, una plataforma como **Langfuse** o **LangSmith** ahorra construir ese panel a mano — y ambas hablan OpenTelemetry, así que adoptar el estándar desde el principio significa que cambiar de herramienta más adelante no exige reinstrumentar nada.

### Madurez de la especificación

Las convenciones de \`gen_ai\` siguen evolucionando — no son una API congelada desde hace años. Fijar la versión del SDK de instrumentación que usas, de la misma forma que fijas cualquier otra dependencia, evita que un cambio en la especificación reordene tus atributos sin que lo hayas decidido tú.`,
      tasks: [
        'Instrumenta una llamada a un modelo con los atributos gen_ai estándar en vez de nombres propios',
        'Separa el contenido de un prompt en un evento aparte de los atributos del span',
        'Reconstruye el árbol de spans de una ejecución completa de tu agente, con cada herramienta como span hijo',
        'Busca en tus trazas una ejecución con una herramienta que falló y explica qué hizo el modelo con ese fallo',
      ],
      tip: 'Adoptar gen_ai en vez de inventar tus propios nombres de campo parece trabajo extra el primer día y ahorra semanas más adelante: es la diferencia entre que tu próxima herramienta de observabilidad entienda tus trazas de inmediato o que tengas que traducirlas primero.',
      completed: false,
    },
    {
      id: 'eval-l5',
      title: 'Coste, latencia y detectar cuando el sistema empeora solo',
      type: 'reading',
      difficulty: 'profesional',
      content: `## El cálculo que hay que hacer antes de prometer nada

\`\`\`
coste por tarea × tareas al día × 30 = coste mensual
\`\`\`

Una tarea de 0,04 USD parece insignificante. Con 500 al día son 600 USD al mes. Si el cliente paga una cuota fija de 400, el sistema pierde dinero cada mes que tiene éxito — cuanto más se usa, peor negocio es. Este cálculo se hace **antes** de cerrar el precio, no después de descubrir la factura.

### Bajar el coste sin bajar la calidad

**Modelo por tarea.** Clasificar la intención de un mensaje lo hace bien un modelo pequeño; redactar el informe final quizá necesite uno más capaz. Enrutar por dificultad —el patrón router de la lección de flujos agénticos, aplicado a "qué modelo llamar"— es la optimización que más ahorra con menos esfuerzo.

**Caché de prompts.** Cuando el mismo contexto largo se repite entre llamadas —instrucciones del sistema, documentos fijos—, los proveedores lo cachean a un coste mucho menor. En un agente que reenvía el historial completo en cada vuelta del bucle, esto cambia el orden de magnitud de la factura, no solo un porcentaje.

**Podar el contexto.** Resumir lo viejo en vez de arrastrarlo entero — la técnica de la lección de memoria del módulo de fundamentos, motivada aquí también por el coste.

**Menos vueltas del bucle.** Cada paso es una llamada completa. Herramientas mejor descritas reducen los pasos necesarios para completar una tarea, y eso baja el coste más que casi cualquier otro ajuste puntual.

**No llamar al modelo.** La optimización más efectiva de todas: caché de respuestas para preguntas repetidas, reglas de código para los casos triviales, validaciones antes de invocar nada.

### Latencia: lo que se siente, no solo lo que se mide

Un flujo de cinco pasos con un modelo grande en cada uno son fácilmente treinta segundos, y eso se percibe como roto aunque técnicamente esté funcionando.

**Transmitir la respuesta** en cuanto empieza a generarse, en vez de esperar a tenerla completa. **Mostrar progreso** —"Consultando inventario…"— no reduce la espera real, pero cambia por completo cómo se percibe. **Responder rápido lo fácil**: si una regla de código resuelve el caso, hazlo al instante y reserva el camino lento para lo que de verdad lo necesita.

### Vigilar con el percentil, no con el promedio

\`\`\`
promedio de latencia: 3.2s
p95 de latencia:      41s
\`\`\`

Un promedio de 3 segundos es compatible con que uno de cada veinte usuarios espere 41. Ese 5% es el que abandona y el que se queja, y el promedio lo esconde por completo. El **percentil 95** hace visible la experiencia del peor caso habitual, que es la que de verdad determina si el sistema se percibe como fiable.

### Un sistema puede empeorar sin que nadie toque nada

El proveedor actualiza el modelo detrás de la misma versión que llamas. Los usuarios empiezan a preguntar cosas distintas de las que el sistema fue diseñado para responder. Los documentos indexados se quedan desactualizados. Ninguna de estas tres cosas requiere un cambio de tu parte, y las tres degradan el sistema igual.

Por eso la evaluación de las lecciones anteriores se ejecuta **de forma periódica**, no solo cuando despliegas algo nuevo. Un descenso sostenido en la tasa de éxito entre ejecuciones semanales, sin que nadie haya cambiado el código, es la señal de deriva — y solo se detecta si estás midiendo de forma continua, no solo reactiva.

### Alertas que de verdad avisan de algo

\`\`\`
coste diario > presupuesto            → avisar
tasa de fallo > umbral                → avisar
latencia p95 > umbral                 → avisar
escalados a humano en aumento         → revisar qué cambió río arriba
\`\`\`

Cada una de estas cuatro señales, vista sola, puede ser ruido. Vistas juntas y de forma continua, son la diferencia entre enterarte de que el sistema se degradó por un cliente enojado, o por tu propio panel una hora después de que empezara.`,
      tasks: [
        'Calcula el coste mensual de tu sistema al volumen que un cliente esperaría, y compáralo con lo que le cobrarías',
        'Activa caché de prompts para el contexto fijo de tu agente y mide la diferencia en la factura',
        'Registra la latencia de veinte ejecuciones reales y calcula el percentil 95, no solo el promedio',
        'Define las cuatro alertas de esta lección para un sistema tuyo con umbrales concretos, aunque no las conectes todavía',
      ],
      tip: 'Ejecuta tu conjunto de evaluación una vez a la semana aunque no hayas cambiado nada, no solo cuando despliegues. Un sistema puede degradarse solo —el proveedor cambia el modelo, los usuarios preguntan cosas distintas— y la única forma de notarlo antes que un cliente es medir de forma continua.',
      completed: false,
    },
    {
      id: 'eval-l6',
      title: 'Proyecto: instrumentar un sistema con evaluación continua',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: `Toma un sistema con modelos que ya hayas construido y móntale la capa completa de medición: un conjunto dorado real, un juez calibrado, trazas con el estándar de OpenTelemetry, y un panel que muestre las cuatro dimensiones.

El objetivo no es instrumentar por instrumentar: es dejar el sistema en un estado donde, si algo empeora la semana que viene, tú lo sepas antes que un cliente te escriba para decírtelo.`,
      deliverables: [
        'Conjunto dorado de al menos 30 casos con los cuatro bloques: tráfico real, adversarial, casos límite, regresiones de fallos ya ocurridos',
        'Al menos cinco casos donde la respuesta correcta sea admitir desconocimiento',
        'Puntuación determinista para todo lo verificable, y un juez con criterios binarios y salida estructurada para el resto',
        'El juez calibrado contra al menos 20 casos puntuados a mano, con el grado de coincidencia documentado',
        'Métricas desglosadas por etapa, no solo un resultado global extremo a extremo',
        'Trazas instrumentadas con atributos gen_ai estándar, con el contenido de prompts separado en eventos',
        'Cálculo de coste mensual al volumen esperado, y latencia medida con percentil 95, no solo promedio',
        'Un comando o script que ejecute la evaluación completa y compare contra la ejecución anterior',
      ],
      completed: false,
    },
    {
      id: 'eval-l7',
      title: 'Examen: evaluación y observabilidad',
      type: 'exam',
      difficulty: 'profesional',
      questions: [
        {
          q: 'Tu evaluación global da 71% de éxito. ¿Qué haces primero?',
          options: [
            'Cambiar a un modelo más capaz y volver a medir',
            'Desglosar por etapa —recuperación, herramientas, respuesta— para saber cuál está arrastrando el resultado global',
            'Ampliar el conjunto de evaluación a 300 casos',
            'Subir el límite de pasos del agente',
          ],
          correct: 1,
          explanation: 'Un 71% global no dice dónde está el problema. Si la recuperación acierta el 82%, ningún cambio de modelo arregla el 18% de casos donde el sistema nunca vio la información correcta. El desglose convierte un número en una tarea concreta.',
        },
        {
          q: '¿Cuál es el bloque de un conjunto dorado que más se olvida construir, y por qué es el más valioso?',
          options: [
            'Los casos adversariales, porque son los más difíciles de escribir',
            'Las repeticiones de fallos que ya salieron a producción: es lo que impide que un incidente real vuelva a colarse sin que nadie lo note',
            'La muestra de tráfico real, porque requiere acceso a datos de producción',
            'Los casos límite, porque rara vez ocurren en la práctica',
          ],
          correct: 1,
          explanation: 'Es el mismo hábito que escribir una prueba al corregir un bug. Sin este bloque, un conjunto puede parecer completo y aun así no proteger contra los fallos que de verdad ya afectaron a un usuario.',
        },
        {
          q: 'Le pides a un modelo juez que puntúe respuestas del 1 al 10. ¿Cuál es el problema de este diseño?',
          options: [
            'Ningún problema, es la forma estándar de evaluar con un modelo',
            'Un número libre no es reproducible ni comparable entre ejecuciones: no se sabe qué separa un 7 de un 8, ni si el juez aplicó el mismo criterio la segunda vez',
            'Los modelos no pueden generar números',
            'Debería pedirse del 1 al 100 para mayor precisión',
          ],
          correct: 1,
          explanation: 'Criterios binarios y explícitos con salida estructurada —correcta, completa, inventada— producen veredictos comparables entre ejecuciones y explican por qué falló un caso. Un número libre no ofrece ninguna de las dos cosas.',
        },
        {
          q: '¿Qué significa calibrar un juez automático antes de usarlo, y qué pasa si te lo saltas?',
          options: [
            'Ajustar la temperatura del modelo juez hasta que las respuestas sean consistentes',
            'Comparar sus veredictos contra los tuyos en 20-30 casos puntuados a mano; sin esto puedes terminar con una métrica que sube en el panel mientras la calidad real no mejora',
            'Entrenar un modelo propio para reemplazar al juez',
            'Ejecutar el juez dos veces sobre el mismo caso y promediar',
          ],
          correct: 1,
          explanation: 'Un juez sin calibrar puede estar midiendo su propio criterio arbitrario, no calidad real. La calibración es lo que da la confianza de que un aumento en la métrica corresponde a una mejora que una persona también percibiría.',
        },
        {
          q: '¿Por qué OpenTelemetry separa los atributos de un span (modelo, tokens) de sus eventos (contenido de prompts)?',
          options: [
            'Por límites técnicos de tamaño en los atributos',
            'Porque los eventos de contenido pueden filtrarse o descartarse en el recolector sin tocar el código, lo que facilita aplicar una política de retención distinta a datos potencialmente sensibles',
            'Porque los atributos no admiten texto largo',
            'No hay ninguna razón práctica, es una convención arbitraria',
          ],
          correct: 1,
          explanation: 'Separar metadatos ligeros (siempre presentes) del contenido real (potencialmente sensible y largo) permite gestionar la retención y privacidad del contenido de forma independiente, sin reescribir la instrumentación cada vez que cambia esa política.',
        },
        {
          q: 'Un sistema con modelos empeora su tasa de éxito de una semana a otra sin que nadie haya tocado el código. ¿Cómo es posible, y cómo se detecta?',
          options: [
            'No es posible sin un cambio de código; el resultado debe ser un error de medición',
            'El proveedor pudo actualizar el modelo detrás de la misma versión, o los usuarios cambiaron qué preguntan; se detecta ejecutando la evaluación de forma periódica, no solo al desplegar',
            'Solo se debe a que el conjunto de evaluación cambió',
            'Se detecta revisando los logs del servidor de aplicación',
          ],
          correct: 1,
          explanation: 'Es la deriva: el sistema puede degradarse por factores fuera de tu control. La única forma de notarlo antes que un cliente es ejecutar la evaluación con cadencia regular y comparar contra ejecuciones anteriores, no solo cuando hay un cambio propio que justifique medir.',
        },
      ],
      completed: false,
    },
  ],
  resources: [
    {
      title: 'OpenTelemetry — convenciones semánticas para IA generativa',
      url: 'https://opentelemetry.io/docs/specs/semconv/gen-ai/',
      type: 'documentation',
    },
    {
      title: 'Langfuse — evaluación y observabilidad de sistemas con modelos',
      url: 'https://langfuse.com/docs',
      type: 'documentation',
    },
    {
      title: 'Anthropic — caché de prompts',
      url: 'https://docs.claude.com/en/docs/build-with-claude/prompt-caching',
      type: 'documentation',
    },
    {
      title: 'LangSmith — evaluación de aplicaciones LLM',
      url: 'https://docs.smith.langchain.com/evaluation',
      type: 'documentation',
    },
  ],
}
