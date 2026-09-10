import type { Module } from '../../../types'

// Modulo: Arquitectura, coste y escalado
export const MOD_PROD_ARQUITECTURA: Module = {
  id: 'iaeng-arquitectura',
  number: 4,
  title: 'Arquitectura, coste y escalado',
  description: 'Decisiones de infraestructura que un sistema con modelos exige y que un backend normal puede posponer: dónde vive la memoria de un agente, cómo lo escalas horizontalmente, y las trampas de coste que solo aparecen con tráfico real.',
  duration: '3 semanas',
  status: 'available',
  track: 'iaeng-produccion',
  audience: 'aprendizaje',
  lessons: [
    {
      id: 'arq-l1',
      title: 'Sin estado en el servidor, con estado en la base',
      type: 'reading',
      difficulty: 'profesional',
      content: `## El error que aparece al segundo servidor

Un agente con checkpoints funciona perfecto con un servidor. El estado vive en SQLite, en un archivo, en memoria — y como solo hay un proceso hablando con esa base, nunca hay conflicto.

El problema llega el día que necesitas un segundo servidor, casi siempre por tráfico. Si el estado vive en el disco de la máquina 1 y la petición de retomar una conversación llega a la máquina 2, el checkpoint **no existe ahí**. El agente responde como si la conversación empezara de cero, o directamente falla.

Esto no es un caso raro de escalado avanzado: es lo primero que rompe en cuanto sales de "un servidor" a "más de uno", y con un balanceador de carga normal —que reparte peticiones sin garantizar que las de un mismo usuario vayan siempre al mismo sitio— pasa en la primera hora de tráfico real.

### Servidor sin estado, estado en un sitio compartido

La solución no es evitar el estado — un agente con memoria lo necesita por diseño. Es sacarlo del servidor y ponerlo en algo que **todos los servidores puedan leer por igual**.

\`\`\`
Antes (rompe con 2+ servidores):
  Servidor 1 → checkpoints.db (en su propio disco)
  Servidor 2 → checkpoints.db (otro archivo, vacío)

Después (funciona con cualquier número de servidores):
  Servidor 1 ┐
  Servidor 2 ├→ Postgres compartido (checkpoints de TODOS los hilos)
  Servidor 3 ┘
\`\`\`

Con \`PostgresSaver\` en vez de \`SqliteSaver\` —el mismo cambio que ya viste al hablar de producción en el módulo de LangGraph— cualquier servidor puede atender cualquier conversación, porque el estado no vive en ninguno de ellos: vive en la base que todos comparten.

**Sin estado en el servidor** significa exactamente esto: puedes apagar cualquier instancia y encender otra en su lugar sin que nadie note la diferencia, porque ninguna instancia guarda nada que no esté también en la base compartida.

### Qué más suele quedarse "pegado" a un servidor por error

**Colas en memoria.** Un \`list\` de Python con tareas pendientes desaparece si el proceso se reinicia, y no lo ve un segundo servidor. Es el problema que resuelve una cola de verdad, en el módulo de procesamiento asíncrono.

**Caché de sesión sin compartir.** Si guardas "el usuario X está autenticado" en un diccionario en memoria del proceso, un segundo servidor no lo sabe y le vuelve a pedir el login. Redis, o el propio checkpoint de LangGraph, resuelven esto igual que el estado del agente.

**Archivos subidos por el usuario.** Si un archivo se guarda en el disco local del servidor que atendió esa petición, y la siguiente petición del mismo usuario cae en otro servidor, el archivo "desapareció". Necesita almacenamiento compartido — S3, Supabase Storage — no el disco de una máquina concreta.

El patrón detrás de los tres es idéntico: **cualquier cosa que un servidor recuerde solo en su propia memoria o disco es un candidato a romperse en cuanto haya más de uno.**

### Cómo se prueba, no solo se diseña

No es suficiente con razonar "esto debería funcionar con varios servidores". Se prueba de verdad:

\`\`\`bash
# Levanta dos instancias de tu API en puertos distintos
uvicorn main:app --port 8001 &
uvicorn main:app --port 8002 &

# Empieza una conversación contra la 8001
curl -X POST localhost:8001/agente -d '{"mensaje": "hola", "hilo": "t1"}'

# Continúala contra la 8002 — DEBE recordar el contexto
curl -X POST localhost:8002/agente -d '{"mensaje": "¿y qué dije antes?", "hilo": "t1"}'
\`\`\`

Si la segunda llamada no recuerda la primera, algo sigue viviendo en la memoria de un solo proceso. Esta prueba, hecha antes de desplegar con más de un servidor, es más barata que descubrirlo con clientes reales un martes con tráfico alto.

### Por qué esto no es prematuro

Diseñar sin estado desde el primer servidor no cuesta más: es la misma línea de código —\`PostgresSaver\` en vez de \`SqliteSaver\`— y ya la escribiste en el módulo anterior. Lo caro no es diseñarlo bien desde el principio. Lo caro es migrar un sistema que ya asumió, en cien sitios distintos de su código, que solo existe un proceso.`,
      tasks: [
        'Identifica en un proyecto tuyo qué vive solo en la memoria o el disco de un proceso concreto',
        'Cambia el checkpointer de tu agente de SQLite a Postgres',
        'Levanta dos instancias de tu API y repite la prueba de continuar una conversación contra la otra instancia',
        'Enumera qué otras piezas de tu sistema —caché, archivos, colas— siguen pegadas a un solo servidor',
      ],
      tip: 'La pregunta que detecta esto antes de que rompa en producción: "si apagara este servidor ahora mismo y encendiera uno nuevo, ¿algún usuario notaría la diferencia?". Si la respuesta es sí, algo vive donde no debería.',
      completed: false,
    },
    {
      id: 'arq-l2',
      title: 'Índices, N+1 y por qué la base es el cuello de botella real',
      type: 'reading',
      difficulty: 'profesional',
      content: `## El modelo no suele ser lo más lento

Es intuitivo pensar que en un sistema con IA lo lento es el modelo — al fin y al cabo, tarda segundos donde una consulta a base de datos tarda milisegundos. Y sin embargo, en sistemas reales con RAG o con agentes que consultan varias tablas, **la base de datos mal usada es tan o más lenta que el modelo**, porque un patrón de acceso descuidado multiplica esos milisegundos por cientos.

### El problema N+1

El patrón más común, y el más caro:

\`\`\`python
# Por cada documento recuperado por el RAG, una consulta aparte a su autor
documentos = buscar_documentos(consulta)          # 1 consulta
for doc in documentos:
    doc.autor = obtener_autor(doc.autor_id)        # N consultas más, una por doc
\`\`\`

Con 20 documentos recuperados, son 21 idas y vueltas a la base en vez de 2. Cada una tiene latencia de red, y esa latencia se suma en serie. La corrección es traer todo lo necesario en menos consultas:

\`\`\`python
documentos = buscar_documentos(consulta)
ids_autores = [d.autor_id for d in documentos]
autores = {a.id: a for a in obtener_autores(ids_autores)}   # 1 consulta con IN
for doc in documentos:
    doc.autor = autores[doc.autor_id]
\`\`\`

Dos consultas en vez de veintiuna. El ORM de tu módulo de bases de datos suele tener una forma de pedir esto directamente —carga anticipada de relaciones— que hace lo mismo sin escribirlo a mano.

### Índices en lo que de verdad filtras

Si tu sistema filtra sistemáticamente por \`usuario_id\`, por \`estado\` o por \`creado_el\`, esas columnas necesitan índice. Sin él, cada consulta recorre la tabla entera; con miles de filas no se nota, con millones sí, y para entonces migrar en caliente es más disruptivo que haberlo puesto desde el principio.

\`\`\`sql
CREATE INDEX idx_mensajes_usuario ON mensajes (usuario_id, creado_el DESC);
\`\`\`

Este índice compuesto sirve exactamente al patrón "los mensajes de este usuario, del más reciente al más viejo" — que es casi siempre cómo se consulta un historial de conversación.

### Paginar, no traer todo

Un endpoint que devuelve "todos los mensajes de esta conversación" funciona en desarrollo, con veinte mensajes de prueba. Con una conversación real de dos años y quince mil mensajes, esa misma consulta satura la memoria del servidor y tarda segundos en construir una respuesta que nadie va a leer entera.

\`\`\`python
@router.get("/conversaciones/{id}/mensajes")
def mensajes(id: int, cursor: str | None = None, limite: int = 50):
    return db.mensajes_paginados(id, cursor, limite)
\`\`\`

La paginación por cursor —no por número de página— es la que no se rompe cuando llegan mensajes nuevos entre una página y la siguiente.

### Pool de conexiones: el límite que nadie ve venir

Cada conexión a Postgres tiene un coste de memoria en el servidor de base de datos. Sin un **pool** que reutilice conexiones, cada petición abre una nueva, y con tráfico moderado agotas el límite de conexiones simultáneas que tu proveedor permite — un error que se manifiesta como "la base de datos rechaza conexiones" y que no tiene nada que ver con cuántos datos hay, sino con cuántas conexiones simultáneas se abrieron.

\`\`\`python
# SQLAlchemy: un pool con tamaño explícito, no "todas las que hagan falta"
engine = create_engine(url, pool_size=10, max_overflow=5)
\`\`\`

Con varios servidores del punto anterior, este límite se vuelve más importante, no menos: cada instancia mantiene su propio pool, así que el total de conexiones es (instancias × tamaño del pool), y hay que dimensionarlo contra el límite real que ofrece la base.

### Cuándo esto no importa todavía

Si tu sistema tiene cien usuarios y una tabla de mensajes con diez mil filas, nada de esto se nota. La regla de siempre: **mide antes de optimizar**. Un índice en una columna que nadie filtra es peso muerto; una paginación en un endpoint que nunca devuelve más de veinte filas es complejidad sin beneficio. Esto se aplica cuando el volumen real lo justifica, no como profilaxis general.`,
      tasks: [
        'Encuentra un bucle en tu código que haga una consulta por elemento y conviértelo en una sola consulta con IN',
        'Añade un índice a la columna por la que más filtras y compara el tiempo de consulta antes y después con EXPLAIN ANALYZE',
        'Convierte un endpoint que devuelve una lista completa a paginación por cursor',
        'Calcula cuántas conexiones simultáneas abre tu sistema con el número de servidores y el tamaño de pool que tienes hoy',
      ],
      tip: 'Antes de optimizar cualquier consulta, mide con EXPLAIN ANALYZE. La intuición sobre qué es lento en una base de datos falla con frecuencia sorprendente — la consulta que "obviamente" es el problema a veces tarda 2ms, y la que nadie sospechaba tarda 400.',
      completed: false,
    },
    {
      id: 'arq-l3',
      title: 'Escalar el modelo: colas, pools y cuándo self-host tiene sentido',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Los proveedores de modelos también tienen límites

Cada cuenta con un proveedor de modelos tiene un **límite de tasa**: peticiones por minuto, tokens por minuto, o ambos. Con tráfico bajo nunca lo notas. Con tráfico real, tu sistema puede empezar a recibir errores 429 del proveedor exactamente cuando más éxito está teniendo — el peor momento posible para que algo se rompa.

### La cola de espera frente al límite

La reacción instintiva —reintentar inmediatamente al recibir un 429— empeora el problema: multiplica las peticiones justo cuando el proveedor está diciendo que hay demasiadas.

\`\`\`python
import time
from anthropic import RateLimitError

def llamar_con_backoff(fn, intentos=5):
    for intento in range(intentos):
        try:
            return fn()
        except RateLimitError:
            espera = (2 ** intento) + random.uniform(0, 1)   # backoff exponencial + jitter
            time.sleep(espera)
    raise Exception("Límite de tasa persistente tras varios reintentos")
\`\`\`

El **jitter** —el término aleatorio sumado a la espera— no es decoración: sin él, si diez peticiones chocaron contra el límite al mismo tiempo, las diez reintentarán exactamente al mismo tiempo otra vez, y volverán a chocar. Con jitter, se dispersan.

Para volumen alto y sostenido, el backoff no basta por sí solo: hace falta una **cola real** —del módulo de procesamiento asíncrono— que limite cuántas peticiones salen hacia el proveedor por segundo, en vez de dejar que la demanda entera golpee el límite a la vez.

### Varios proveedores, o el mismo proveedor con fallback

Un sistema que depende de un único proveedor de modelos hereda sus caídas como propias. La defensa habitual es un **fallback**: si el modelo principal falla o tarda demasiado, la petición se reintenta contra un segundo proveedor o un segundo modelo.

\`\`\`python
def responder_con_fallback(prompt: str) -> str:
    try:
        return modelo_principal.invoke(prompt, timeout=10)
    except (TimeoutError, RateLimitError):
        return modelo_respaldo.invoke(prompt, timeout=15)
\`\`\`

El coste de mantener esto —dos integraciones en vez de una— se justifica cuando la disponibilidad del sistema importa más que la simplicidad de tener un solo proveedor. Para un prototipo, casi nunca. Para algo que un cliente paga por tener siempre disponible, con frecuencia sí.

### Cuándo self-hospedar un modelo tiene sentido

La pregunta no es "¿es más barato hospedar tu propio modelo?" — casi nunca lo es en volumen bajo o medio, porque el coste de la infraestructura (GPU dedicada, encendida las 24 horas) supera con facilidad lo que costaría pagar por token a un proveedor.

Tiene sentido cuando se cumple más de una de estas condiciones a la vez:

- **Volumen alto y constante**, no picos ocasionales — la GPU cuesta igual esté usándose o no.
- **Datos que no pueden salir de tu infraestructura** por contrato o regulación, y ningún proveedor cumple ese requisito.
- **Latencia crítica** que una llamada de red a un proveedor externo no puede garantizar.
- **Un modelo pequeño y especializado** —afinado para una tarea concreta— que un modelo genérico de propósito general no necesita ser: aquí el coste de hospedar un modelo de unos pocos miles de millones de parámetros es mucho menor que el de uno de frontera.

Para la inmensa mayoría de los sistemas que vas a construir, ninguna de estas se cumple, y pagar por token a un proveedor sigue siendo la decisión correcta. Traer infraestructura de modelos propia antes de que el volumen la justifique es el mismo error que montar Kubernetes para una API que recibe cien peticiones al día.

### Medir antes de decidir

La pregunta que responde todo esto con datos, no con intuición:

\`\`\`
coste mensual con proveedor  =  coste por token × tokens al mes
coste mensual self-hosted    =  coste de la GPU × horas al mes (encendida siempre)
\`\`\`

Haz ambos cálculos con tu volumen real, no con el que esperas tener en un año. La decisión de infraestructura se toma con el sistema que tienes, y se revisa cuando el volumen cambie de orden de magnitud — no antes.`,
      tasks: [
        'Implementa reintento con backoff exponencial y jitter contra un límite de tasa simulado',
        'Diseña un fallback a un segundo modelo y decide qué errores lo disparan y cuáles no',
        'Calcula el coste mensual de tu sistema con proveedor frente a una GPU dedicada, con tu volumen real',
        'Explica en qué condición concreta tu propio proyecto justificaría self-hospedar un modelo, si alguna',
      ],
      tip: 'El jitter en un backoff no es un detalle menor: sin él, un pico de tráfico que choca contra el límite de tasa se convierte en una oscilación sincronizada donde todo el mundo reintenta a la vez, una y otra vez. Es la diferencia entre absorber un pico y amplificarlo.',
      completed: false,
    },
    {
      id: 'arq-l4',
      title: 'Proyecto: preparar un sistema para más de un servidor',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: `Toma un sistema con agente que ya hayas construido en un módulo anterior y prepáralo para correr en más de una instancia sin que ningún usuario note la diferencia.

El caso: el cliente reporta que su sistema "a veces olvida la conversación a mitad de camino". El síntoma es justo el de un estado pegado a un servidor concreto detrás de un balanceador de carga que reparte peticiones sin garantizar afinidad de sesión.`,
      deliverables: [
        'Checkpointer migrado de almacenamiento local a uno compartido (Postgres u otro), verificado con dos instancias reales corriendo en paralelo',
        'Prueba reproducible: iniciar una conversación contra una instancia y continuarla contra otra, con el contexto intacto',
        'Auditoría de qué otras piezas del sistema —caché, colas, archivos— siguen pegadas a un solo proceso, documentada aunque no se corrijan todas',
        'Al menos un N+1 identificado y corregido en las consultas del sistema, con el número de consultas antes y después',
        'Un índice añadido a la columna que más se filtra, con EXPLAIN ANALYZE mostrando la mejora',
        'Backoff con jitter implementado contra los errores de límite de tasa del proveedor de modelos',
        'Cálculo documentado de cuántas conexiones a base de datos abre el sistema con el número de instancias y el tamaño de pool actuales',
      ],
      completed: false,
    },
    {
      id: 'arq-l5',
      title: 'Examen: arquitectura, coste y escalado',
      type: 'exam',
      difficulty: 'profesional',
      questions: [
        {
          q: 'Un agente con checkpoints en SQLite funciona bien con un servidor. Al añadir un segundo detrás de un balanceador de carga, algunas conversaciones "olvidan" el contexto. ¿Por qué?',
          options: [
            'SQLite tiene un límite de conversaciones simultáneas',
            'El checkpoint vive en el disco de un servidor concreto; si la siguiente petición del mismo hilo llega a otro servidor, ese checkpoint no existe ahí',
            'El balanceador de carga corrompe los mensajes en tránsito',
            'LangGraph no admite más de un servidor por diseño',
          ],
          correct: 1,
          explanation: 'Es el problema de estado pegado a un proceso. La solución no es evitar el estado sino compartirlo: un checkpointer sobre una base accesible desde cualquier instancia, como PostgresSaver, resuelve esto sin cambiar nada más del diseño del agente.',
        },
        {
          q: 'Tu RAG recupera 20 documentos y luego hace una consulta aparte para obtener el autor de cada uno. ¿Cómo se llama este patrón y cómo se corrige?',
          options: [
            'Es normal y no tiene coste relevante',
            'Problema N+1: 21 consultas en vez de 2. Se corrige trayendo todos los autores con una sola consulta usando IN sobre la lista de ids',
            'Se corrige aumentando el tamaño del pool de conexiones',
            'Se corrige añadiendo un índice en la tabla de autores',
          ],
          correct: 1,
          explanation: 'Un índice ayuda a que cada consulta individual sea rápida, pero no reduce el número de consultas. El problema real es la cantidad de idas y vueltas a la base, y eso se arregla trayendo los datos relacionados en un lote, no optimizando cada consulta por separado.',
        },
        {
          q: 'Tu sistema recibe errores 429 del proveedor de modelos bajo tráfico alto. Reintentas inmediatamente al fallar. ¿Qué falta y por qué reintentar de inmediato empeora las cosas?',
          options: [
            'Falta cambiar de proveedor; reintentar inmediato satura la red',
            'Falta backoff exponencial con jitter: reintentar de inmediato multiplica la presión justo cuando el proveedor ya está diciendo que hay demasiadas peticiones, y sin jitter varias peticiones que chocaron a la vez vuelven a chocar a la vez',
            'Falta aumentar el timeout de las peticiones',
            'No falta nada, reintentar inmediato es la práctica correcta',
          ],
          correct: 1,
          explanation: 'El backoff da tiempo a que el límite se libere; el jitter evita que varias peticiones sincronizadas repitan el mismo choque en el mismo instante. Sin ambos, un pico de tráfico se convierte en una oscilación que se amplifica sola.',
        },
        {
          q: '¿Cuándo tiene sentido self-hospedar un modelo en vez de pagar por token a un proveedor?',
          options: [
            'Siempre que el volumen de peticiones supere cien al día',
            'Cuando se combina volumen alto y constante, datos que no pueden salir de tu infraestructura, latencia crítica, o un modelo pequeño especializado — y se ha hecho el cálculo comparando ambos costes con el volumen real',
            'Nunca: pagar por token siempre es más barato sin excepción',
            'Solo cuando el equipo tiene experiencia previa con GPUs',
          ],
          correct: 1,
          explanation: 'Para la mayoría de los sistemas ninguna de esas condiciones se cumple con fuerza suficiente, y pagar por token sigue siendo lo correcto. Traer infraestructura de modelos propia sin que el volumen la justifique es sobre-ingeniería, igual que montar Kubernetes para cien peticiones diarias.',
        },
      ],
      completed: false,
    },
  ],
  resources: [
    {
      title: 'LangGraph — checkpointers de producción (Postgres)',
      url: 'https://langchain-ai.github.io/langgraph/reference/checkpoints/',
      type: 'documentation',
    },
    {
      title: 'Anthropic — límites de tasa y buenas prácticas',
      url: 'https://docs.claude.com/en/api/rate-limits',
      type: 'documentation',
    },
    {
      title: 'PostgreSQL — uso de EXPLAIN para analizar consultas',
      url: 'https://www.postgresql.org/docs/current/using-explain.html',
      type: 'documentation',
    },
    {
      title: 'AWS — arquitectura de aplicaciones sin estado',
      url: 'https://docs.aws.amazon.com/whitepapers/latest/serverless-architectures-lambda/statelessness.html',
      type: 'article',
    },
  ],
}
