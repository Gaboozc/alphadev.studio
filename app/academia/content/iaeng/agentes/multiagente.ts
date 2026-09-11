import type { Module } from '../../../types'

// Modulo: Flujos agenticos y sistemas multiagente
export const MOD_AGENTES_MULTIAGENTE: Module = {
  id: 'iaeng-3',
  number: 3,
  title: 'Flujos agénticos y sistemas multiagente',
  description: 'De un agente suelto a un sistema: enrutado con un clasificador tipado, descomposición en trabajadores paralelos con Send, y comunicación entre agentes que no depende de que se entiendan por casualidad.',
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
      id: 'ie3-l1b',
      title: 'El patrón Router: un clasificador que manda',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Enrutar no es orquestar

Los dos patrones se confunden porque ambos empiezan con "un agente decide qué hacer con esto". La diferencia está en qué tan cerrado es el conjunto de opciones:

**Enrutar** es elegir **uno** entre un puñado de caminos **conocidos de antemano**: facturación, soporte o ventas. El número de destinos no cambia entre ejecuciones.

**Orquestar** es descomponer una tarea en un **número de partes que no se sabe hasta ver el caso concreto**: un informe puede necesitar tres secciones o nueve, según el tema. Eso es lo que ves en la próxima lección.

Confundirlos lleva a construir un orquestador completo para un problema que era una elección entre tres botones — mucho más caro y mucho más difícil de depurar de lo necesario.

### El nodo clasificador

Un router tiene un nodo cuyo único trabajo es decidir la categoría, con una salida **tipada** para que no pueda inventar una cuarta opción:

\`\`\`python
from typing import Literal
from pydantic import BaseModel

class Categoria(BaseModel):
    categoria: Literal["facturacion", "soporte_tecnico", "ventas"]
    confianza: float

def clasificar(estado: Estado) -> dict:
    resultado = modelo.with_structured_output(Categoria).invoke(
        f"Clasifica esta consulta de cliente:\\n\\n{estado['pregunta']}"
    )
    return {"categoria": resultado.categoria, "confianza": resultado.confianza}
\`\`\`

\`Literal["facturacion", "soporte_tecnico", "ventas"]\` no es una anotación decorativa: **restringe el espacio de salida a nivel de tipo**. El modelo no puede devolver \`"facturacion_urgente"\` aunque quiera; la validación de \`with_structured_output\` lo rechazaría antes de que llegue a tu código. Es la misma idea que pedirle un booleano en vez de "sí" o "no" en texto libre — cuanto más se puede validar mecánicamente, menos casos raros hay que manejar a mano.

### La función de ruta

Separada del clasificador, y **Python puro**:

\`\`\`python
def enrutar(estado: Estado) -> str:
    if estado["confianza"] < 0.6:
        return "escalar_a_humano"
    return estado["categoria"]

grafo.add_conditional_edges(
    "clasificar",
    enrutar,
    {
        "facturacion": "agente_facturacion",
        "soporte_tecnico": "agente_soporte",
        "ventas": "agente_ventas",
        "escalar_a_humano": "escalar_a_humano",
    },
)
\`\`\`

El diccionario final en \`add_conditional_edges\` no es opcional aunque LangGraph lo acepte sin él: es lo que permite que la **compilación** detecte si \`enrutar\` puede devolver un valor que no está mapeado a ningún nodo. Sin ese mapa, ese error solo aparecería en producción, la primera vez que ocurriera.

Fíjate en que la decisión de escalar por baja confianza vive en \`enrutar\`, no en el prompt del clasificador. Es la misma regla de siempre: **la lógica de control es código**, aunque la señal que la alimenta —la confianza— venga de un modelo.

### Casos reales de enrutado

**Triaje de tickets de soporte.** El caso de esta lección: clasificar por tema y mandar al especialista.

**Moderación de contenido.** Un clasificador barato marca el contenido obviamente aceptable y lo deja pasar; solo lo dudoso llega a una revisión más cara —humana o con un modelo mejor—. El router aquí no elige un especialista, elige **cuánto escrutinio** aplicar.

**Selección de modelo por coste.** Enrutar preguntas simples a un modelo barato y las complejas a uno caro es, literalmente, el mismo patrón aplicado a la decisión de "qué modelo llamar" en vez de "qué agente llamar". Es una de las optimizaciones de coste de la lección siguiente, y ahora ya sabes que es un router.

### Cuándo el router se queda corto

Si necesitas que el sistema decida **cuántas** piezas de trabajo generar —no solo cuál de tres caminos tomar—, un router no te sirve por diseño: su salida es una categoría de un conjunto fijo, no una lista de tamaño variable. Ese es exactamente el problema que resuelve el patrón orquestador-trabajador de la siguiente lección.`,
      tasks: [
        'Construye un clasificador con salida tipada mediante Literal y compila el grafo para comprobar que rechaza una arista sin destino',
        'Añade la rama de escalamiento por baja confianza como una decisión de la función de ruta, no del prompt',
        'Diseña un router de moderación que decida "dejar pasar" o "revisar" en vez de elegir un especialista',
        'Explica en dos frases por qué un router no sirve para "generar un número variable de secciones de un informe"',
      ],
      tip: 'Si te encuentras describiéndole al modelo "elige entre A, B o C" dentro del prompt en lugar de usar un tipo Literal, estás validando por convención en vez de por contrato. El modelo puede desviarse de una convención; no puede desviarse de un tipo que el propio SDK verifica.',
      completed: false,
    },
    {
      id: 'ie3-l1c',
      title: 'Orquestador y trabajadores: cuando no sabes cuántas partes hay',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Descomponer, no enrutar

Un informe sobre un tema nuevo puede necesitar tres secciones o nueve — no lo sabes hasta leer el tema. Una revisión de código toca un número de archivos distinto en cada pull request. En ningún caso hay un conjunto fijo de rutas entre las que elegir, que es justo lo que un router necesita para funcionar.

El patrón **orquestador-trabajador-sintetizador** resuelve esto en tres papeles:

- **Orquestador**: mira la tarea completa y decide en **cuántas** partes dividirla.
- **Trabajadores**: cada uno resuelve **una** parte, sin saber nada de las demás.
- **Sintetizador**: junta los resultados en un único entregable coherente.

### Generar trabajadores en tiempo real

El problema técnico es concreto: si no sabes cuántos trabajadores hacen falta hasta que el orquestador se ejecuta, no puedes cablear esa cantidad de nodos de antemano. LangGraph lo resuelve con \`Send\`, que crea una instancia de un nodo por cada elemento de una lista, en paralelo:

\`\`\`python
from langgraph.types import Send
from typing import Annotated, TypedDict
import operator

class EstadoInforme(TypedDict):
    tema: str
    secciones: list[str]
    borradores: Annotated[list[dict], operator.add]
    informe_final: str

def orquestador(estado: EstadoInforme) -> dict:
    secciones = modelo.invoke(
        f"Divide este tema en 3 a 6 secciones de un informe: {estado['tema']}"
    )
    return {"secciones": parsear_lista(secciones.content)}

def repartir(estado: EstadoInforme) -> list[Send]:
    # Una instancia de 'worker' por sección, cada una con SU PROPIO input.
    # El orquestador no sabía cuántas iban a ser hasta ejecutarse un paso antes.
    return [Send("worker", {"seccion": s, "tema": estado["tema"]}) for s in estado["secciones"]]

def worker(datos: dict) -> dict:
    texto = modelo.invoke(f"Escribe la sección '{datos['seccion']}' sobre {datos['tema']}")
    return {"borradores": [{"seccion": datos["seccion"], "texto": texto.content}]}
\`\`\`

Dos detalles que no son opcionales:

**El reductor en \`borradores\`.** Varios trabajadores corriendo en paralelo escriben en el mismo campo del estado. Sin \`Annotated[list[dict], operator.add]\`, cada escritura pisaría a las anteriores y te quedarías con un solo borrador de los seis que se generaron. El reductor es lo que convierte "seis escrituras simultáneas" en "una lista de seis elementos" de forma segura.

**\`repartir\` devuelve \`list[Send]\`, no un nombre de nodo.** Es la diferencia estructural con una arista condicional normal: en vez de elegir un único destino entre opciones fijas, genera tantos destinos como haga falta, cada uno con el input recortado a lo que ese trabajador concreto necesita.

### El sintetizador

\`\`\`python
def sintetizador(estado: EstadoInforme) -> dict:
    orden = {s: i for i, s in enumerate(estado["secciones"])}
    ordenados = sorted(estado["borradores"], key=lambda b: orden[b["seccion"]])
    return {"informe_final": "\\n\\n".join(b["texto"] for b in ordenados)}

grafo = StateGraph(EstadoInforme)
grafo.add_node("orquestador", orquestador)
grafo.add_node("worker", worker)
grafo.add_node("sintetizador", sintetizador)
grafo.add_conditional_edges("orquestador", repartir, ["worker"])
grafo.add_edge("worker", "sintetizador")
\`\`\`

Fíjate en que el sintetizador **reordena explícitamente** por sección antes de unir. Los trabajadores en paralelo no terminan en el orden en que se lanzaron — el que le tocó la sección más corta puede acabar primero. Si el sintetizador simplemente concatenara \`estado["borradores"]\` tal cual llegan, el informe saldría con las secciones desordenadas de forma distinta en cada ejecución.

### Diseñar trabajadores que no se estorben

**Una responsabilidad, y nada más.** Un trabajador que escribe una sección no debería también decidir el orden final ni tocar el estado de otro trabajador.

**Contexto acotado.** El trabajador de la sección "Introducción" no necesita ver los borradores de las otras cinco secciones — solo el tema y su propia sección. Pasarle el estado completo no solo gasta tokens de más: le da al modelo información que puede filtrarse a un resultado que no le correspondía, o que simplemente lo distrae.

**Reemplazables.** Si un trabajador puede caerse y relanzarse sin arrastrar estado de otro, puedes reintentar uno solo sin repetir los cinco que sí salieron bien. Un trabajador que depende de una variable compartida y mutable —en vez de recibir todo lo que necesita como input— rompe eso.

### El coste de este patrón

Es el más caro de los patrones de flujo: tantas llamadas al modelo como trabajadores, más la del orquestador, más la del sintetizador. Se justifica cuando las subtareas de verdad no se pueden predecir de antemano. Si en la práctica siempre son las mismas tres, no necesitas un orquestador: necesitas una cadena fija de tres pasos, que es más barata y más predecible.`,
      tasks: [
        'Construye el grafo orquestador-trabajador-sintetizador completo para dividir un tema en secciones y redactarlas en paralelo',
        'Quita el reductor de borradores a propósito y comprueba cuántos elementos sobreviven',
        'Reduce el input de cada worker a solo lo que necesita y mide cuántos tokens ahorras frente a pasarle el estado completo',
        'Argumenta con un caso propio si conviene orquestador-trabajador o si en realidad las subtareas son siempre las mismas y basta una cadena fija',
      ],
      tip: 'Antes de escribir un orquestador, pregúntate si de verdad no sabes cuántas subtareas va a haber, o si siempre son las mismas tres y las estás tratando como variables por costumbre. Un orquestador para un caso fijo es la forma más cara de resolver un problema que un router habría resuelto gratis.',
      completed: false,
    },
    {
      id: 'ie3-l1d',
      title: 'Comunicación entre agentes: mensajes o pizarra compartida',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Los agentes rara vez son el problema

Cuando un sistema multiagente falla, la sospecha habitual recae en "el agente equivocado" o "el prompt mal escrito". Casi siempre el fallo real está en **cómo se pasan información entre sí** — que es la parte que menos se diseña a propósito.

Hay dos modelos, y conviene saber cuál estás usando en cada punto del sistema.

### Paso de mensajes

La salida completa de un agente se convierte en la entrada del siguiente. Es lo que ya viste en el encadenamiento: lineal, fácil de razonar, y cada paso ve exactamente lo que el anterior decidió mandarle.

\`\`\`python
salida_a = agente_a.invoke(entrada)
salida_b = agente_b.invoke(salida_a)   # A decide qué le llega a B
\`\`\`

Su límite: si tres agentes necesitan el mismo dato de contexto, cada uno tiene que recibirlo por la cadena, y un cambio en lo que necesita el tercero obliga a tocar lo que produce el primero.

### Pizarra compartida

Todos los agentes leen y escriben sobre el mismo estado central. Es el patrón que ya vienes usando desde la lección de anatomía, con estado tipado en \`TypedDict\`:

\`\`\`python
class Pizarra(TypedDict):
    ticket: dict
    hallazgos_tecnico: str | None
    hallazgos_facturacion: str | None
    resumen_final: str | None
\`\`\`

Cada agente lee lo que necesita y escribe su propio campo. Nadie tiene que pasarle nada a nadie explícitamente: está todo en el mismo sitio.

El riesgo que trae es el que ya conoces de cualquier estado compartido: **escrituras no coordinadas**. Si dos agentes pueden escribir el mismo campo sin pasar por un reductor o por el orquestador, uno pisa al otro en silencio. La regla práctica: **las escrituras a la pizarra las controla el orquestador**, no cada agente por su cuenta a discreción.

### Por qué el formato del mensaje importa

Este mensaje entre agentes es un antipatrón, aunque parezca inofensivo:

\`\`\`
"El agente de facturación dice que el cliente ya pagó, revisa con soporte técnico
si el problema sigue siendo válido o si era solo por el estado del pago."
\`\`\`

Es lenguaje natural interpretando lenguaje natural. El agente que lo recibe tiene que **volver a inferir** qué se le está pidiendo exactamente, y esa reinterpretación es donde se cuela la ambigüedad — el mismo problema, en el fondo, que evitar prompts vagos en las herramientas.

La alternativa es un **traspaso estructurado**:

\`\`\`python
class Traspaso(BaseModel):
    de_agente: str
    para_agente: str
    hallazgo: str
    accion_sugerida: Literal["cerrar_ticket", "escalar", "pedir_mas_info"]
    confianza: float
    version: int = 1
\`\`\`

Con esto, el agente receptor no interpreta: **lee campos**. Y \`version\` no es adorno — cuando cambias la forma de este esquema seis meses después, necesitas poder distinguir traspasos viejos de nuevos sin que el sistema se rompa en silencio.

### Contexto acotado, otra vez

Ya lo viste en los trabajadores paralelos: cada agente debe recibir **solo lo que necesita para decidir su siguiente paso**, no la pizarra entera.

El método práctico es simple de aplicar aunque el nombre suene grande: para cada agente, pregúntate primero **qué decisión tiene que tomar**, y después decide qué campos de la pizarra le hacen falta para tomarla. No al revés — no le pases todo "por si acaso".

\`\`\`python
def contexto_para_soporte_tecnico(pizarra: Pizarra) -> dict:
    # El agente de soporte decide si el problema técnico sigue abierto.
    # No necesita ver los hallazgos de facturación para decidir eso.
    return {"ticket": pizarra["ticket"], "hallazgos_tecnico": pizarra["hallazgos_tecnico"]}
\`\`\`

Menos campos significa menos tokens por llamada —y por tanto menos coste, de la próxima lección— y también menos ruido del que un modelo pueda distraerse o, en el peor caso, filtrar hacia una respuesta que no le correspondía dar.

### Cuál usas dónde

**Paso de mensajes** cuando el flujo es lineal y cada paso solo necesita lo inmediatamente anterior: es más simple y no necesita coordinar escrituras.

**Pizarra compartida** cuando varios agentes necesitan converger sobre el mismo caso desde ángulos distintos —como el triaje de un ticket entre soporte y facturación— y necesitan ver hallazgos de los demás.

Los dos son compatibles en el mismo sistema: una pizarra central para el caso, y traspasos estructurados puntuales entre dos agentes que necesitan coordinarse en un paso concreto.`,
      tasks: [
        'Identifica en un sistema tuyo si la comunicación entre pasos es paso de mensajes, pizarra compartida, o una mezcla sin decidir',
        'Convierte un traspaso en lenguaje natural entre dos agentes a un esquema tipado con Pydantic',
        'Aplica el método de contexto acotado a un agente: escribe primero qué decisión toma, después qué campos necesita',
        'Provoca a propósito una escritura no coordinada sobre la pizarra y observa qué agente pierde su resultado',
      ],
      tip: 'Cuando un sistema multiagente da resultados inconsistentes entre ejecuciones, antes de tocar los prompts revisa qué le está llegando a cada agente. Casi siempre el modelo está respondiendo razonablemente a una entrada ambigua o incompleta, no fallando sin motivo.',
      completed: false,
    },
    {
      id: 'ie3-l4',
      title: 'Proyecto: sistema multiagente',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: `Vas a construir un sistema que enrute consultas a agentes especializados, con al menos una parte resuelta por descomposición paralela y con comunicación entre agentes que no dependa de que se entiendan por casualidad. Es la diferencia entre un agente que impresiona en una demostración y uno que un cliente puede poner frente a sus usuarios.

El caso: una empresa recibe consultas de distintos tipos —facturación, soporte técnico, información comercial— y quiere atender automáticamente lo que se pueda y escalar el resto con contexto suficiente para que la persona no empiece de cero.

Este proyecto se apoya en la evaluación del módulo de evaluación y observabilidad, más adelante en la rama, para comprobar que funciona — no repitas aquí ese trabajo, constrúyelo una vez allí y aplícalo a este sistema.`,
      deliverables: [
        'Clasificador con salida tipada (Literal) que enrute cada consulta al especialista correcto, con una rama de escalamiento por baja confianza',
        'Al menos dos agentes especializados, cada uno con sus propias herramientas y su prompt corto',
        'Un caso dentro del sistema resuelto con orquestador-trabajador: descomposición en un número de partes que no se conoce de antemano, workers en paralelo con Send y un sintetizador que reordena',
        'Traspasos entre agentes con un esquema tipado (Pydantic), nunca instrucciones sueltas en lenguaje natural',
        'Contexto acotado: cada agente y cada worker documentan qué decisión toman y por qué solo reciben esos campos, no el estado completo',
        'Grafo de estado explícito donde el control de flujo esté en código y no en el prompt',
      ],
      rubrica: [
        'El enrutado se puede probar con tests normales porque es código, no una decisión del modelo',
        'Cada especialista tiene menos de cinco herramientas y un prompt que cabe en una pantalla',
        'El campo compartido entre workers paralelos usa un reductor; quitar el reductor y volver a correr pierde resultados de forma demostrable',
        'El sintetizador reordena explícitamente antes de unir — no asume que los workers vuelven en el orden en que se lanzaron',
        'Ningún traspaso entre agentes es una cadena de texto libre sin estructura',
      ],
      tasks: [
        'Diseña el grafo en papel antes de programarlo, marcando dónde decide el código y dónde el modelo',
        'Implementa el enrutado y mide su acierto por separado antes de conectar los especialistas',
        'Construye el caso de orquestador-trabajador y comprueba qué pasa si quitas el reductor',
      ],
      discussionPrompts: [
        '¿Qué información debería llevar un caso escalado para que la persona no tenga que empezar de cero?',
        'Si el clasificador se equivoca de especialista, ¿el sistema debería poder corregirse solo o escalar?',
      ],
      tip: 'Diseña el grafo completo en papel antes de escribir una línea: cuadros para los nodos, flechas para las aristas, y marca explícitamente cuáles son condicionales y cuáles fijas. Es mucho más barato encontrar un ciclo mal pensado en un diagrama que depurarlo ya escrito.',
      completed: false,
    },
    {
      id: 'ie3-l5',
      title: 'Examen: flujos agénticos y multiagente',
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
          q: 'Necesitas dividir un informe en secciones, pero no sabes cuántas hasta ver el tema. ¿Router u orquestador-trabajador?',
          options: [
            'Router, clasificando el tema en una de varias categorías fijas de informe',
            'Orquestador-trabajador: un router elige entre un conjunto fijo de caminos conocidos, y aquí el número de partes varía según el caso, que es justo lo que Send permite generar en tiempo real',
            'Ninguno: esto se resuelve con una única llamada al modelo',
            'Encadenamiento, generando las secciones una tras otra en un bucle for',
          ],
          correct: 1,
          explanation: 'La pregunta que distingue los dos patrones es si el conjunto de destinos es fijo (router) o si el número de subtareas depende del caso concreto (orquestador-trabajador). Un bucle for secuencial resolvería el problema pero perdería el paralelismo, que es gran parte del valor del patrón.',
        },
        {
          q: 'Tres workers en paralelo escriben en el mismo campo `borradores` del estado. Al terminar, solo queda uno de los tres resultados. ¿Qué falta?',
          options: [
            'Ejecutar los workers en secuencia en vez de en paralelo',
            'Un reductor en ese campo (Annotated[list, operator.add]): sin él, cada escritura sobrescribe la anterior en vez de acumularse en una lista',
            'Aumentar el número máximo de workers permitidos',
            'Usar Send en vez de add_conditional_edges normal',
          ],
          correct: 1,
          explanation: 'Es el mismo problema que un reductor resuelve en cualquier estado compartido: sin él, escrituras concurrentes al mismo campo se pisan entre sí. Con tres workers y sin reductor, gana el último en escribir y los otros dos desaparecen en silencio.',
        },
        {
          q: 'Un agente de facturación le pasa a otro de soporte: "el cliente ya pagó, revisa si el problema sigue siendo válido". ¿Cuál es el problema de este traspaso?',
          options: [
            'Ninguno, es una instrucción clara',
            'Es lenguaje natural interpretando lenguaje natural: el agente receptor tiene que reinferir qué se le pide, y ahí se cuela la ambigüedad que un esquema tipado con campos concretos evitaría',
            'Debería mandarse por un canal HTTP en vez de dentro del estado',
            'Falta traducirlo a otro idioma',
          ],
          correct: 1,
          explanation: 'Un traspaso estructurado —de_agente, hallazgo, accion_sugerida como Literal, versión— hace que el receptor lea campos en vez de interpretar prosa. Es la misma lógica que preferir un tipo Literal a que el modelo escriba libremente el nombre de una categoría.',
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
      title: 'LangGraph — API de Send para grafos map-reduce',
      url: 'https://langchain-ai.github.io/langgraph/how-tos/graph-api/#map-reduce-and-the-send-api',
      type: 'documentation',
    },
  ],
}
