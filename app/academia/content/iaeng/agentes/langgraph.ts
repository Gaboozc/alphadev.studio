import type { Module } from '../../../types'

// Modulo: LangGraph — del bucle al grafo compilado
export const MOD_AGENTES_LANGGRAPH: Module = {
  id: 'iaeng-langgraph',
  number: 2,
  title: 'LangGraph: del bucle al grafo compilado',
  description: 'La librería que implementa lo que ya sabes: estado tipado, nodos, aristas condicionales, persistencia y ejecución paso a paso. Cada llamada de su API mapeada al concepto que ya tienes.',
  duration: '3 semanas',
  status: 'available',
  track: 'iaeng-agentes',
  audience: 'aprendizaje',
  lessons: [
    {
      id: 'lg-l1',
      title: 'Por qué el bucle no basta',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Lo que ya construiste

El agente del módulo anterior funciona. Tiene registro de herramientas, cuatro condiciones de parada, validación de argumentos y trazas. Para muchos encargos eso es suficiente y no hace falta nada más.

Este módulo no viene a decirte que estaba mal. Viene a enseñarte dónde deja de escalar, y qué hace una librería cuando eso pasa.

### Los cuatro techos

**El estado vive en variables locales.** \`mensajes\`, \`gasto\`, \`firmas\`. Si el proceso muere, se pierden. Guardarlos significa serializar a mano después de cada paso, en cada sitio donde puedan cambiar, sin olvidarse de ninguno.

**Las ramas son \`if\` anidados.** Con dos caminos se lee bien. Con seis —¿hay documentos?, ¿la confianza es suficiente?, ¿el usuario es de pago?, ¿la herramienta falló?— tienes una función que nadie quiere tocar, y el diagrama que la explica solo existe en la cabeza de quien la escribió.

**La ejecución es una caja negra.** Para saber por dónde va hay que instrumentar cada rama a mano. Ya lo hiciste con las trazas, y funciona porque tu bucle es lineal. En cuanto se ramifica, mantener esa instrumentación se vuelve trabajo aparte.

**Paralelizar es reescribir.** Si dos consultas independientes pueden hacerse a la vez, tu bucle secuencial no tiene dónde meterlas sin cambiar su forma.

### Lo que aporta LangGraph, y lo que no

Lo que **no** aporta: conceptos. Estado, nodos, aristas y compilación son los que ya viste. Si te saltaste esa lección, esta va a parecer una lista de llamadas a funciones mágicas.

Lo que **sí** aporta:

| Concepto que ya conoces | Lo que pone LangGraph |
|---|---|
| Estado tipado | \`StateGraph(Estado)\` con reductores por campo |
| Nodo | \`add_node(nombre, funcion)\` |
| Arista fija | \`add_edge("a", "b")\` |
| Arista condicional | \`add_conditional_edges("a", decidir)\` |
| Compilación | \`.compile()\` — valida el grafo antes de ejecutarlo |
| Punto de control | \`checkpointer=\` — persistencia por hilo, sin escribirla tú |
| Resultados parciales | \`.stream()\` — un generador que emite tras cada nodo |
| Interrupción | \`interrupt_before=[...]\` — para y devuelve el control |

Es decir: **la parte tediosa y fácil de hacer mal**, probada y mantenida por otra gente.

### Cuándo NO lo uses

Una dependencia es superficie de ataque y es una API que aprender. No la traigas si:

- El agente tiene dos o tres pasos y ninguna rama.
- No necesitas persistencia ni retomar tras un fallo.
- Estás aprendiendo. Escribe el bucle primero; la librería se entiende mucho mejor después.

La regla es la misma que con cualquier framework: **tráelo cuando el problema que resuelve ya te esté doliendo**, no antes.

### Fijar la versión

LangGraph se mueve rápido y ha roto compatibilidad entre versiones menores. Los ejemplos de este módulo son de la **1.2.x**, y valen para esa serie:

\`\`\`bash
pip install "langgraph==1.2.8" "langchain-anthropic==0.4.2"
\`\`\`

Con \`==\`, no con \`>=\`. Es la misma regla de versiones exactas del módulo de entornos virtuales, y aquí importa más que en otros sitios: un tutorial de hace ocho meses probablemente ya no compila.`,
      tasks: [
        'Enumera cuáles de los cuatro techos te ha tocado ya con tu propio agente',
        'Instala LangGraph con la versión fijada y comprueba que importa',
        'Escribe en dos líneas qué haría falta para añadir persistencia a tu bucle a mano',
        'Decide, para un agente tuyo real, si LangGraph le aporta algo hoy o todavía no',
      ],
      tip: 'Si no puedes explicar qué hacen estado, nodos, aristas y compilación sin nombrar LangGraph, vuelve a la lección de anatomía antes de seguir. Aprender la API sin los conceptos produce gente que sabe copiar ejemplos y no sabe depurarlos.',
      completed: false,
    },
    {
      id: 'lg-l2',
      title: 'Tu primer grafo, línea por línea',
      type: 'reading',
      difficulty: 'profesional',
      content: `## El grafo mínimo completo

Un agente de soporte: recibe una pregunta, busca en la documentación, y responde. Con una rama: si no encuentra nada, lo dice en vez de inventar.

### 1. El estado

\`\`\`python
from typing import TypedDict, Annotated
import operator

class Estado(TypedDict):
    pregunta: str
    documentos: list[str]
    respuesta: str
    pasos: Annotated[list[str], operator.add]
\`\`\`

\`Annotated[list[str], operator.add]\` es el **reductor**. Sin él, cada nodo que escriba \`pasos\` sobrescribe lo anterior; con él, LangGraph concatena. Es la respuesta a "¿qué hago cuando dos nodos escriben el mismo campo?", y hay que contestarla campo por campo.

Los campos sin reductor se sobrescriben. Para \`respuesta\` es justo lo que quieres.

### 2. Los nodos

Funciones normales. Reciben el estado, devuelven **solo lo que cambian**:

\`\`\`python
def recuperar(estado: Estado) -> dict:
    docs = buscador.buscar(estado["pregunta"], k=5)
    return {"documentos": docs, "pasos": ["recuperar"]}

def responder(estado: Estado) -> dict:
    contexto = "\\n\\n".join(estado["documentos"])
    texto = modelo.invoke(
        f"Responde usando solo este contexto.\\n\\n{contexto}\\n\\nPregunta: {estado['pregunta']}"
    ).content
    return {"respuesta": texto, "pasos": ["responder"]}

def sin_resultados(estado: Estado) -> dict:
    return {
        "respuesta": "No encontré información sobre eso en la documentación.",
        "pasos": ["sin_resultados"],
    }
\`\`\`

Ninguno sabe que existe un grafo. Se pueden probar llamándolos con un diccionario, sin levantar nada — que es exactamente el mismo argumento por el que separabas los *services* de los *routers* en el back-end.

### 3. El cableado

\`\`\`python
from langgraph.graph import StateGraph, START, END

grafo = StateGraph(Estado)

grafo.add_node("recuperar", recuperar)
grafo.add_node("responder", responder)
grafo.add_node("sin_resultados", sin_resultados)

grafo.add_edge(START, "recuperar")

def hay_documentos(estado: Estado) -> str:
    return "responder" if estado["documentos"] else "sin_resultados"

grafo.add_conditional_edges("recuperar", hay_documentos, ["responder", "sin_resultados"])

grafo.add_edge("responder", END)
grafo.add_edge("sin_resultados", END)
\`\`\`

\`START\` y \`END\` son nodos especiales: por dónde entra y por dónde sale. La lista de destinos en \`add_conditional_edges\` es opcional pero conviene ponerla: es lo que permite validar en la compilación que la función de decisión no puede devolver un nombre que no existe.

Y nota qué es \`hay_documentos\`: **Python**. Un \`if\` sobre el estado. No hay una llamada al modelo para decidir algo que se decide mirando una lista.

### 4. Compilar y ejecutar

\`\`\`python
app = grafo.compile()

resultado = app.invoke({"pregunta": "¿cuál es la política de devoluciones?"})
print(resultado["respuesta"])
print(resultado["pasos"])   # ['recuperar', 'responder']
\`\`\`

\`compile()\` recorre el grafo y falla si hay nodos inalcanzables, aristas hacia nodos inexistentes o caminos sin salida. **Ese error llega al arrancar**, no a mitad de una conversación con un cliente.

Y \`pasos\` te dice el recorrido real sin haber añadido un solo \`print\`.

### Verlo

\`\`\`python
print(app.get_graph().draw_mermaid())
\`\`\`

Escupe un diagrama Mermaid del grafo. Pégalo en la documentación del proyecto: es la única versión del diagrama que **no puede quedarse desactualizada**, porque se genera del código que se ejecuta.

### El error de principiante

Devolver el estado completo desde un nodo:

\`\`\`python
# Mal: pisa lo que hayan escrito otros nodos
def recuperar(estado: Estado) -> dict:
    estado["documentos"] = buscar(...)
    return estado

# Bien: solo el trozo que cambia
def recuperar(estado: Estado) -> dict:
    return {"documentos": buscar(...)}
\`\`\`

Con ejecución secuencial el primero parece funcionar. En cuanto haya dos nodos en paralelo, empieza a perder datos de forma intermitente — el peor tipo de fallo, porque no reproduce.`,
      tasks: [
        'Construye el grafo completo y comprueba que pasos refleja el recorrido real',
        'Rompe una arista a propósito, apuntando a un nodo inexistente, y observa que falla al compilar',
        'Genera el diagrama Mermaid y pégalo en el README del proyecto',
        'Añade un campo al estado que necesite reductor y comprueba qué pasa sin él',
      ],
      tip: 'Prueba cada nodo como una función normal antes de cablearlo: le pasas un diccionario y compruebas lo que devuelve. Si necesitas el grafo entero para saber si un nodo funciona, el nodo está haciendo demasiado.',
      completed: false,
    },
    {
      id: 'lg-l3',
      title: 'Herramientas con ToolNode y estado compartido',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Lo que te ahorras

En tu bucle a mano, el despacho de herramientas era esto: leer las llamadas de la respuesta, buscar cada una en el registro, validar argumentos, ejecutar, formatear el resultado como mensaje y volver a meterlo en el historial. Correcto, y unas cuarenta líneas que hay que mantener.

**ToolNode** es ese nodo, ya escrito.

\`\`\`python
from langchain_core.tools import tool
from langgraph.prebuilt import ToolNode
from langgraph.graph import StateGraph, MessagesState, START, END

@tool
def buscar_pedido(pedido_id: str) -> dict:
    """Busca un pedido por su identificador. Devuelve estado, fecha y total.
    Úsala para cualquier pregunta sobre un pedido concreto.
    No sirve para buscar productos: para eso usa buscar_producto."""
    return repositorio.pedido(pedido_id)

@tool
def buscar_producto(consulta: str) -> list[dict]:
    """Busca productos por nombre o categoría. Devuelve hasta 10 con id, precio y stock."""
    return repositorio.productos(consulta, limite=10)

herramientas = [buscar_pedido, buscar_producto]
modelo_con_tools = modelo.bind_tools(herramientas)
\`\`\`

El decorador \`@tool\` construye el esquema a partir de **la firma tipada y el docstring**. Esto tiene una consecuencia que conviene entender: el docstring ya no es documentación para tus compañeros, es **el prompt que decide cuándo se usa la herramienta**. Todo lo que aprendiste sobre descripciones —qué hace, qué no hace, a dónde ir en su lugar— se escribe ahí.

### El grafo con bucle de herramientas

\`\`\`python
def llamar_modelo(estado: MessagesState) -> dict:
    return {"messages": [modelo_con_tools.invoke(estado["messages"])]}

def hay_llamadas(estado: MessagesState) -> str:
    ultimo = estado["messages"][-1]
    return "herramientas" if getattr(ultimo, "tool_calls", None) else END

grafo = StateGraph(MessagesState)
grafo.add_node("modelo", llamar_modelo)
grafo.add_node("herramientas", ToolNode(herramientas))

grafo.add_edge(START, "modelo")
grafo.add_conditional_edges("modelo", hay_llamadas, ["herramientas", END])
grafo.add_edge("herramientas", "modelo")   # <- el ciclo

app = grafo.compile()
\`\`\`

Esa última arista, de \`herramientas\` de vuelta a \`modelo\`, **es el bucle agéntico**. Todo tu \`while\` reducido a una línea que dice "después de ejecutar herramientas, vuelve a preguntarle al modelo".

\`MessagesState\` es un estado predefinido con un solo campo \`messages\` y el reductor de concatenación ya puesto. Para un agente conversacional suele bastar; si necesitas más campos, defines el tuyo y lo incluyes.

### Herramientas que leen el estado

A veces una herramienta necesita algo que no viene en los argumentos del modelo: quién es el usuario, su plan, el identificador del hilo. **No se lo pidas al modelo** — puede inventarlo, y confiar en un dato de autorización que propone el modelo es un agujero de seguridad, no un detalle de diseño.

Se lee del estado:

\`\`\`python
from langgraph.prebuilt import ToolRuntime

@tool
def estimar_envio(codigo_postal: str, runtime: ToolRuntime) -> dict:
    """Estima coste y plazo de envío al código postal indicado."""
    plan = runtime.state.get("plan_usuario", "basico")   # del estado, no del modelo
    tarifa = TARIFAS[plan]
    return {"coste": tarifa.calcular(codigo_postal), "dias": tarifa.dias}
\`\`\`

El modelo aporta el código postal, que es información de la conversación. El plan sale del estado, que lo puso tu código al arrancar. **Lo que decide permisos o precios nunca viaja por el modelo.**

### Herramientas que escriben en el estado

Para el camino inverso —una herramienta que cambia el estado del grafo, no solo devuelve un dato— se usa \`Command\`:

\`\`\`python
from langgraph.types import Command

@tool
def marcar_resuelto(ticket_id: str) -> Command:
    """Marca el ticket como resuelto y cierra la conversación."""
    repositorio.cerrar(ticket_id)
    return Command(update={"ticket_cerrado": True, "pasos": ["marcar_resuelto"]})
\`\`\`

Úsalo con cuidado. Una herramienta que además modifica el estado es más difícil de razonar, y si varias lo hacen a la vez vuelves al problema de las escrituras que se pisan. La regla práctica: **la mayoría de las herramientas devuelven datos; solo unas pocas deberían escribir estado.**

### Contexto acotado

Cada herramienta debe ver **el trozo mínimo de estado que necesita**. No porque sea elegante, sino por dos razones concretas: menos contexto significa menos tokens en cada vuelta, y una herramienta que solo puede leer el plan del usuario no puede filtrar el historial completo de la conversación si alguien logra que la llame con malicia.`,
      tasks: [
        'Convierte tres herramientas tuyas a @tool y comprueba el esquema que genera de los docstrings',
        'Monta el grafo con ToolNode y la arista de vuelta, y observa el ciclo en los pasos',
        'Pasa un dato de autorización por el estado con ToolRuntime en vez de por los argumentos del modelo',
        'Busca en tu agente alguna herramienta que reciba del modelo un dato que debería salir del estado',
      ],
      tip: 'Con @tool, el docstring deja de ser documentación y pasa a ser código: es lo que el modelo lee para decidir. Revísalo con el mismo cuidado con el que revisarías un if.',
      completed: false,
    },
    {
      id: 'lg-l4',
      title: 'Persistencia, hilos y ejecución paso a paso',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Un argumento y ya tienes memoria

Todo el capítulo de puntos de control —guardar el estado, retomar tras un fallo, no mezclar conversaciones— es esto:

\`\`\`python
from langgraph.checkpoint.sqlite import SqliteSaver

memoria = SqliteSaver.from_conn_string("agente.db")
app = grafo.compile(checkpointer=memoria)
\`\`\`

A partir de ahí, cada invocación necesita saber **de qué conversación** habla:

\`\`\`python
config = {"configurable": {"thread_id": "cliente-8841"}}

app.invoke({"messages": [("user", "¿cuál es el estado de mi pedido?")]}, config)
app.invoke({"messages": [("user", "¿y el anterior?")]}, config)   # recuerda el primero
\`\`\`

El segundo mensaje no repite el contexto. LangGraph carga el estado guardado de ese \`thread_id\`, le añade el mensaje nuevo y sigue.

**El \`thread_id\` es el que separa a un usuario de otro.** Derívalo de algo que controle tu servidor —el id de sesión, el de conversación en tu base— y nunca de algo que llegue del cliente sin validar: quien pueda elegir el \`thread_id\` puede leer la conversación de otro.

Para producción, \`PostgresSaver\` en vez de SQLite. Misma interfaz.

### Ver el estado y volver atrás

\`\`\`python
estado = app.get_state(config)
print(estado.values["pasos"])
print(estado.next)               # qué nodo vendría ahora

# El historial completo de checkpoints, del más reciente al más antiguo
for foto in app.get_state_history(config):
    print(foto.config["configurable"]["checkpoint_id"], foto.values["pasos"])
\`\`\`

Y algo que sorprende la primera vez: puedes **reanudar desde un punto anterior** pasando el id de ese checkpoint. Sirve para depurar de verdad — cambias un prompt o una herramienta y repites solo desde el paso donde se torció, sin volver a ejecutar ni a pagar los seis anteriores.

### Interrupciones

\`\`\`python
app = grafo.compile(
    checkpointer=memoria,
    interrupt_before=["herramientas_sensibles"],
)

resultado = app.invoke(entrada, config)
estado = app.get_state(config)

if estado.next == ("herramientas_sensibles",):
    propuesta = estado.values["messages"][-1].tool_calls
    # ... aquí una persona aprueba o rechaza ...
    app.invoke(None, config)     # None = continúa desde donde quedó
\`\`\`

\`invoke(None, config)\` es el detalle que conviene retener: **no vuelve a empezar, continúa**. Los efectos ya causados no se repiten.

Y como en la lección de interrupciones: el control está en \`interrupt_before\`, en el código. No es una instrucción del prompt que el modelo pueda pasar por alto.

### Emitir avance

\`\`\`python
for evento in app.stream(entrada, config):
    for nodo, salida in evento.items():
        print(f"[{nodo}] {salida.get('pasos', '')}")
\`\`\`

\`.stream()\` devuelve un generador que emite tras cada nodo. Es lo que alimenta el "Consultando inventario… Revisando pedidos…" que ve el usuario en vez de una pantalla quieta.

Con \`stream_mode="messages"\` emite además **token a token** según el modelo los va produciendo, que es la otra mitad de la experiencia de un chat. Cómo llevar eso hasta el navegador es el módulo de tiempo real.

### Lo que sigue sin resolverte

La persistencia guarda el estado, no lo administra. Que la conversación crezca sin fin sigue siendo tu problema: el reductor de \`messages\` concatena, y a la vuelta cuarenta estás reenviando cuarenta turnos.

Podar sigue siendo tuyo — ventana deslizante, resumen progresivo o memoria externa, lo de la lección de memoria. La librería no decide qué es importante en tu dominio, y no debería.`,
      tasks: [
        'Añade un checkpointer y comprueba que una segunda llamada con el mismo thread_id recuerda la primera',
        'Recorre get_state_history y reanuda desde un checkpoint anterior tras cambiar un prompt',
        'Marca un nodo sensible con interrupt_before y reanuda con invoke(None, config)',
        'Consume .stream() e imprime el avance nodo a nodo; luego prueba stream_mode="messages"',
      ],
      tip: 'El thread_id decide quién ve qué. Si sale de un parámetro que manda el cliente sin comprobar contra la sesión, cualquiera puede leer la conversación de otro pidiendo un identificador distinto. Es el mismo fallo de control de acceso de siempre, con otro nombre.',
      completed: false,
    },
    {
      id: 'lg-l5',
      title: 'Proyecto: migrar tu agente a un grafo',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: `Toma el agente que construiste en el módulo anterior y llévalo a LangGraph, sin perder ninguno de los controles que ya tenía.

No es un ejercicio de traducción mecánica: la gracia está en que al pasarlo a nodos y aristas aparecen decisiones que en el bucle estaban escondidas dentro de un if.

El agente debe seguir resolviendo la misma tarea real que resolvía antes, con el mismo conjunto de herramientas, y responder a través de un endpoint de FastAPI.`,
      deliverables: [
        'Estado tipado con TypedDict, con reductor en cada campo que escriban dos nodos o más',
        'Nodos de una sola responsabilidad, cada uno probable llamándolo con un diccionario y sin levantar el grafo',
        'Al menos una arista condicional cuya decisión se tome en Python, no preguntándole al modelo',
        'ToolNode con las herramientas migradas a @tool, con docstrings que digan cuándo usarlas y cuándo no',
        'Un dato de autorización que llegue por el estado con ToolRuntime, nunca por los argumentos del modelo',
        'Checkpointer activo, con thread_id derivado de la sesión del servidor y no de un parámetro del cliente',
        'Una herramienta sensible detenida con interrupt_before y reanudada con invoke(None, config)',
        'Endpoint POST que devuelva la respuesta, o 202 con la propuesta cuando haya interrupción pendiente',
        'El diagrama Mermaid generado con draw_mermaid() en el README del proyecto',
        'Comparativa breve: qué líneas del bucle original desaparecieron y cuáles siguen siendo tuyas',
      ],
      completed: false,
    },
    {
      id: 'lg-l6',
      title: 'Examen: LangGraph',
      type: 'exam',
      difficulty: 'profesional',
      questions: [
        {
          q: 'Dos nodos de tu grafo escriben en el campo `pasos` del estado. Al ejecutar, solo aparece el del último. ¿Qué falta?',
          options: [
            'Devolver el estado completo desde cada nodo en vez de un diccionario parcial',
            'Un reductor en ese campo: sin Annotated[list[str], operator.add] cada escritura sobrescribe la anterior en vez de acumularse',
            'Ejecutar los nodos en secuencia en lugar de en paralelo',
            'Declarar el campo como opcional en el TypedDict',
          ],
          correct: 1,
          explanation: 'El comportamiento por defecto es sobrescribir, que es lo correcto para un campo como `respuesta`. Para los que acumulan hay que decirlo con un reductor. La opción de devolver el estado completo es justo el antipatrón: parece arreglarlo con ejecución secuencial y provoca pérdidas intermitentes en cuanto hay paralelismo.',
        },
        {
          q: '¿Qué gana concretamente tu agente al llamar a .compile() antes de ejecutar?',
          options: [
            'Se precompila el código Python de los nodos y la ejecución es más rápida',
            'Se valida la estructura del grafo —nodos inalcanzables, aristas a nodos inexistentes, caminos sin salida— así que un error de flujo aparece al arrancar y no a mitad de una conversación en producción',
            'Se cachean las respuestas del modelo para repetir consultas idénticas',
            'Se reduce el número de tokens enviados en cada llamada',
          ],
          correct: 1,
          explanation: 'Es el mismo argumento de tener tipos: mover el fallo de tiempo de ejecución a tiempo de construcción. Nada tiene que ver con velocidad ni con coste.',
        },
        {
          q: 'Una herramienta necesita saber el plan del usuario para calcular una tarifa. ¿Por dónde debe llegarle?',
          options: [
            'Como argumento de la herramienta, para que el modelo lo pase según el contexto de la conversación',
            'Desde el estado del grafo con ToolRuntime, porque un dato que decide precios o permisos no puede depender de que el modelo lo proponga correctamente',
            'Leyéndolo de una variable global del módulo',
            'Preguntándoselo al usuario en cada mensaje',
          ],
          correct: 1,
          explanation: 'Todo lo que llega por los argumentos lo propone el modelo, y el modelo puede equivocarse o ser manipulado por inyección de prompt. Los datos de autorización y precio los pone tu código en el estado antes de arrancar.',
        },
        {
          q: 'Tras una interrupción, una persona aprueba la acción. ¿Qué hace `app.invoke(None, config)`?',
          options: [
            'Reinicia la ejecución desde el principio con el estado limpio',
            'Continúa desde el checkpoint donde se detuvo, sin repetir los pasos ya ejecutados ni sus efectos',
            'Cancela la ejecución pendiente y descarta el estado guardado',
            'Ejecuta solo el nodo sensible de forma aislada',
          ],
          correct: 1,
          explanation: 'El None significa "no hay entrada nueva". Continuar en vez de reiniciar es lo que evita repetir efectos ya causados: si el agente ya envió un correo antes de la interrupción, reiniciar lo enviaría dos veces.',
        },
        {
          q: 'El thread_id de tu agente sale de un parámetro que manda el frontend. ¿Cuál es el problema?',
          options: [
            'Ninguno, es la forma habitual de identificar una conversación',
            'Que quien pueda elegir el thread_id puede pedir el de otra persona y leer su conversación: es un fallo de control de acceso, no un detalle de implementación',
            'Que el checkpointer no admite identificadores que vengan del cliente',
            'Que obliga a usar PostgresSaver en lugar de SqliteSaver',
          ],
          correct: 1,
          explanation: 'Es un IDOR clásico con otro nombre. El thread_id debe derivarse de la sesión verificada en el servidor, o comprobarse contra ella antes de usarlo.',
        },
        {
          q: 'Tu agente tiene tres pasos, ninguna rama y no necesita retomarse tras un fallo. ¿Conviene migrarlo a LangGraph?',
          options: [
            'Sí, siempre: el grafo es la forma correcta de construir cualquier agente',
            'No por ahora: una dependencia nueva es superficie de ataque y una API que aprender, y ninguno de los problemas que resuelve te está doliendo todavía',
            'Sí, porque sin LangGraph no se pueden usar herramientas',
            'No, porque LangGraph no admite agentes de menos de cinco nodos',
          ],
          correct: 1,
          explanation: 'La regla vale para cualquier framework: se trae cuando el problema que resuelve ya duele. Un agente lineal de tres pasos sin persistencia no gana nada y sí añade una dependencia que mantener.',
        },
      ],
      completed: false,
    },
  ],
  resources: [
    {
      title: 'LangGraph — documentación oficial',
      url: 'https://langchain-ai.github.io/langgraph/',
      type: 'documentation',
    },
    {
      title: 'LangGraph — persistencia y checkpointers',
      url: 'https://langchain-ai.github.io/langgraph/concepts/persistence/',
      type: 'documentation',
    },
    {
      title: 'LangGraph — humano en el bucle',
      url: 'https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/',
      type: 'documentation',
    },
    {
      title: 'Anthropic — Construir agentes eficaces',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
      type: 'article',
    },
  ],
}
