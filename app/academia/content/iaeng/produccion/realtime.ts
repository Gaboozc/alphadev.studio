import type { Module } from '../../../types'

// Modulo: Tiempo real
export const MOD_PROD_REALTIME: Module = {
  id: 'iaeng-realtime',
  number: 3,
  title: 'Tiempo real: streaming de respuestas y notificaciones',
  description: 'La UX por defecto de cualquier producto con modelos: texto que aparece mientras se genera, y avisos que llegan sin que el usuario tenga que refrescar. SSE, sus trampas de producción, y cómo reconectar sin perder ni duplicar nada.',
  duration: '2 semanas',
  status: 'available',
  track: 'iaeng-produccion',
  audience: 'aprendizaje',
  lessons: [
    {
      id: 'realtime-l1',
      title: 'SSE contra WebSocket: por qué el streaming de un modelo es de un solo sentido',
      type: 'reading',
      difficulty: 'profesional',
      content: `## El tráfico es asimétrico

Un chat con un modelo tiene una forma muy concreta: el usuario manda un mensaje, el servidor responde con un flujo de texto que va apareciendo palabra por palabra. Después de enviar, el cliente **no manda nada más** hasta la siguiente pregunta — no hay una conversación bidireccional constante mientras el modelo genera.

Esa asimetría es la que decide el protocolo. **Server-Sent Events (SSE)** es un canal unidireccional del servidor al cliente sobre HTTP normal: el servidor empuja eventos, el cliente los recibe, y punto. **WebSocket** es bidireccional de verdad: cualquiera de los dos lados manda datos en cualquier momento, con su propio protocolo de conexión y cierre.

### Por qué SSE es lo que ya usan los proveedores

Cuando llamas a la API de un modelo con streaming activado, la respuesta que recibes **ya es SSE** — es el formato nativo de OpenAI, de Anthropic, de prácticamente cualquier proveedor. Adoptarlo en tu propio backend hacia el navegador no es una elección arbitraria: es continuar el mismo protocolo que ya estás recibiendo, en vez de traducirlo a otra cosa a mitad de camino.

\`\`\`
data: {"delta": "Claro"}

data: {"delta": ", puedo"}

data: {"delta": " ayudarte"}

data: [DONE]
\`\`\`

Cada línea \`data:\` es un evento. El cliente los procesa en orden, según van llegando — de eso trata la próxima lección.

### Lo que WebSocket añade y aquí no hace falta

WebSocket resuelve un problema que un chat de modelo no tiene: comunicación en ambas direcciones **simultánea**, útil cuando el cliente necesita mandar datos mientras el servidor sigue enviando — un juego en tiempo real, edición colaborativa de un documento. Para eso, el coste extra de WebSocket —su propio protocolo de conexión (*handshake*), sus frames, su cierre— se justifica.

Para "el servidor genera texto y el cliente lo muestra", ese coste no compra nada. Y hay una ventaja operativa concreta de quedarte en SSE: **es HTTP normal**. Escala horizontalmente con servidores sin estado como cualquier otro endpoint, no necesita *sticky sessions* ni un balanceador especial que entienda WebSocket, y cualquier proxy o CDN que ya sepa manejar HTTP lo maneja sin configuración adicional.

### Cuándo SÍ conviene WebSocket

Si el usuario puede **interrumpir** al modelo a mitad de generación con un mensaje nuevo — no solo cerrar la conexión, sino mandar algo mientras el flujo sigue activo — ahí sí hace falta bidireccional de verdad. SSE solo permite que el cliente cierre el flujo, no que mande datos nuevos por el mismo canal mientras sigue abierto.

Para el resto — que es la inmensa mayoría de lo que vas a construir con modelos — la pregunta que decide es simple: **¿el cliente necesita mandar algo mientras el servidor todavía está enviando?** Si no, SSE. Si sí, WebSocket, con toda la complejidad adicional que trae.`,
      tasks: [
        'Inspecciona con las herramientas de red del navegador la respuesta en streaming de una API de modelo y confirma que es SSE',
        'Explica con un ejemplo propio un caso donde SÍ necesitarías WebSocket para un producto con modelos',
        'Compara qué cambia en el balanceo de carga entre un endpoint SSE y uno WebSocket',
        'Argumenta en dos frases por qué SSE escala mejor horizontalmente para el caso de un chat',
      ],
      tip: 'Si tu instinto es reachar por WebSocket porque "es tiempo real", pregúntate primero si el cliente necesita mandar algo mientras el servidor sigue enviando. Casi siempre la respuesta es no, y SSE resuelve lo mismo con mucha menos complejidad operativa.',
      completed: false,
    },
    {
      id: 'realtime-l2',
      title: 'Un endpoint SSE de verdad, con las trampas de producción',
      type: 'reading',
      difficulty: 'profesional',
      content: `## El endpoint mínimo

\`\`\`python
from fastapi.responses import StreamingResponse

@router.get("/chat/stream")
async def stream_chat(pregunta: str):
    async def generador():
        async for fragmento in modelo.stream(pregunta):
            yield f"data: {json.dumps({'delta': fragmento.texto})}\\n\\n"
        yield "data: [DONE]\\n\\n"

    return StreamingResponse(generador(), media_type="text/event-stream")
\`\`\`

Cada \`yield\` empuja un evento al cliente en cuanto está listo, sin esperar a que termine todo el flujo. \`text/event-stream\` es el tipo de contenido que le dice al navegador —y a cualquier proxy en medio— que esto es SSE y debe tratarse como tal.

Esto funciona perfecto en local. En producción, tres cosas lo rompen si no se anticipan.

### Trampa 1: el buffering de proxies

Nginx, y muchos balanceadores de carga, **acumulan la respuesta antes de enviarla** por defecto — exactamente lo contrario de lo que quieres en streaming. El resultado: el cliente no ve nada durante varios segundos y luego recibe todo de golpe, como si no hubiera streaming en absoluto.

\`\`\`nginx
location /chat/stream {
    proxy_buffering off;
    proxy_cache off;
}
\`\`\`

Y desde el propio backend, un header adicional para el mismo problema en otros proxies intermedios:

\`\`\`python
return StreamingResponse(
    generador(),
    media_type="text/event-stream",
    headers={"X-Accel-Buffering": "no"},
)
\`\`\`

Sin esto, puedes tener el código de streaming perfectamente correcto y aun así ver que no funciona en producción — porque el problema no está en tu código, está en una capa de infraestructura entre tu servidor y el navegador.

### Trampa 2: timeouts por silencio

Muchas CDNs y balanceadores cierran una conexión si no ve tráfico durante un tiempo — Cloudflare, por ejemplo, corta a los 100 segundos de silencio, y lo hace insertando **una página de error HTML directamente dentro de tu flujo de eventos**. Si el modelo tarda en empezar a generar, o hay una pausa larga entre fragmentos, la conexión se corta antes de que llegue nada útil.

La solución es un **heartbeat**: un evento vacío o de mantenimiento cada 15-30 segundos, que no dice nada al usuario pero mantiene la conexión activa desde el punto de vista de cualquier intermediario que vigile el silencio.

\`\`\`python
async def generador():
    ultimo_heartbeat = time.monotonic()
    async for fragmento in modelo.stream(pregunta):
        if time.monotonic() - ultimo_heartbeat > 20:
            yield ": heartbeat\\n\\n"   # una línea que empieza con ':' es un comentario SSE, se ignora
            ultimo_heartbeat = time.monotonic()
        yield f"data: {json.dumps({'delta': fragmento.texto})}\\n\\n"
    yield "data: [DONE]\\n\\n"
\`\`\`

La línea \`: heartbeat\` empieza con dos puntos, que en la especificación SSE marca un comentario — el cliente lo ignora por completo, pero cuenta como tráfico para cualquier intermediario que esté vigilando silencio.

### Trampa 3: nombrar los eventos

El ejemplo de arriba manda todo como el evento por defecto (\`data:\` sin nombre). Cuando el cliente necesita distinguir tipos de mensaje —un fragmento de texto frente a una notificación de que terminó, frente a un error— los **eventos nombrados** evitan que el cliente tenga que inspeccionar el contenido para adivinar de qué se trata:

\`\`\`python
yield f"event: fragmento\\ndata: {json.dumps({'delta': fragmento.texto})}\\n\\n"
# ...
yield f"event: completado\\ndata: {json.dumps({'tokens_totales': total})}\\n\\n"
\`\`\`

En el cliente, cada nombre de evento tiene su propio manejador — el próximo tema de la lección siguiente, junto con cómo consumir esto sin usar la API \`EventSource\` del navegador, que tiene una limitación que la hace incómoda para producción: no permite mandar headers personalizados, lo que complica la autenticación.`,
      tasks: [
        'Implementa el endpoint de streaming completo y verifica en las herramientas de red que los fragmentos llegan progresivamente, no de golpe',
        'Configura proxy_buffering off en tu proxy o el header X-Accel-Buffering y comprueba la diferencia',
        'Añade heartbeats cada 20 segundos y provoca una pausa artificial en el modelo para verlos aparecer en la red',
        'Nombra al menos dos tipos de evento distintos (fragmento, completado) y verifica que el navegador los recibe con su nombre',
      ],
      tip: 'Si el streaming funciona perfecto en tu máquina local y llega todo de golpe en producción, sospecha primero del buffering de un proxy antes de tocar tu código de aplicación. Es la causa más común y la más fácil de pasar por alto porque no está en ningún archivo que tú escribiste.',
      completed: false,
    },
    {
      id: 'realtime-l3',
      title: 'Reconexión sin perder eventos y sin duplicarlos',
      type: 'reading',
      difficulty: 'profesional',
      content: `## El problema que aparece solo al perder la conexión

Streaming funcionando es fácil de demostrar. Lo difícil es lo que pasa cuando la conexión se corta a mitad —el wifi del usuario titubea, un proxy cierra por timeout— y tiene que reconectar. Ahí hay dos formas de fallar, y son opuestas: **perder** eventos que ocurrieron durante la desconexión, o **duplicar** eventos que ya se habían recibido antes de que se cortara.

### Por qué EventSource no basta para esto

La API nativa del navegador, \`EventSource\`, reconecta automáticamente — pero no permite mandar headers personalizados, lo que hace difícil autenticar la conexión con un token propio en vez de depender de cookies. Por eso, para un caso de producción con autenticación real, se consume con \`fetch\` y un \`ReadableStream\`, leyendo el cuerpo de la respuesta manualmente:

\`\`\`javascript
async function conectar(url, token) {
  const respuesta = await fetch(url, {
    headers: { Authorization: \`Bearer \${token}\` },  // EventSource no permite esto
  })
  const lector = respuesta.body.getReader()
  const decodificador = new TextDecoder()
  let buffer = ''

  while (true) {
    const { value, done } = await lector.read()
    if (done) break
    buffer += decodificador.decode(value, { stream: true })
    const eventos = buffer.split('\\n\\n')
    buffer = eventos.pop()  // el último fragmento puede estar incompleto
    for (const evento of eventos) {
      procesarEvento(evento)
    }
  }
}
\`\`\`

Es más código que \`new EventSource(url)\`, y a cambio da control total sobre headers y sobre qué pasa cuando la conexión se corta — que es justo lo que hace falta para resolver bien la reconexión.

### Backoff progresivo, no reintento inmediato

Igual que con los límites de tasa de un proveedor de modelos: reconectar inmediatamente tras un corte, sin espera, puede convertirse en un bucle que golpea al servidor una y otra vez si el corte se debe a que el servidor está sobrecargado.

\`\`\`javascript
async function conectarConReintento(url, token, intento = 0) {
  try {
    await conectar(url, token)
  } catch {
    const espera = Math.min(1000 * 2 ** intento, 30000) + Math.random() * 1000
    await new Promise((r) => setTimeout(r, espera))
    conectarConReintento(url, token, intento + 1)
  }
}
\`\`\`

El mismo backoff exponencial con jitter del módulo de arquitectura, aplicado aquí a la reconexión del cliente en vez de a una llamada al proveedor del modelo.

### El problema real: no perder, y no duplicar

Reconectar es fácil. El requisito difícil —el que de verdad distingue una implementación cuidada de una improvisada— es que la reconexión **no pierda** eventos ocurridos durante el corte, y **no duplique** los que ya llegaron antes de cortarse. Hay dos estrategias, y cualquiera de las dos es válida siempre que la elijas a propósito y la documentes:

**Last-Event-ID y repetición corta en el servidor.** Cada evento SSE puede llevar un identificador. El cliente recuerda el último que procesó, y al reconectar lo manda de vuelta; el servidor guarda un historial corto y solo reenvía lo posterior a ese identificador.

\`\`\`
id: 42
event: notificacion
data: {"ticket": "T-881", "mensaje": "Nuevo ticket asignado"}
\`\`\`

\`\`\`javascript
// Al reconectar, se manda el último id visto
headers: { 'Last-Event-ID': ultimoIdProcesado }
\`\`\`

**Recargar el estado completo, y usar SSE solo para lo que viene después.** Al reconectar, el cliente pide la lista actual completa por un endpoint normal —no por SSE— y a partir de ahí solo escucha eventos nuevos por streaming. Es más simple de implementar que mantener un historial de reenvío en el servidor, a cambio de una petición extra en cada reconexión.

Cualquiera de las dos resuelve el problema. Lo que no vale es no elegir ninguna: sin una estrategia explícita, una desconexión de tres segundos en mitad de una ráfaga de notificaciones puede perder justo las que importaban.

### Deduplicar en el cliente, como último cinturón de seguridad

Incluso con una buena estrategia de reconexión, conviene que el cliente sea capaz de ignorar un evento que ya procesó, identificándolo por su id:

\`\`\`javascript
const vistos = new Set()

function procesarEvento(evento) {
  if (vistos.has(evento.id)) return  // ya se procesó, se ignora
  vistos.add(evento.id)
  actualizarUI(evento)
}
\`\`\`

Esta comprobación es barata y cubre el caso límite donde, por la naturaleza de "al menos una entrega" de cualquier sistema distribuido, un mismo evento llega dos veces pese a la estrategia de reconexión. Es la misma idempotencia del módulo de procesamiento asíncrono, aplicada del lado del cliente.`,
      tasks: [
        'Implementa el consumo con fetch y ReadableStream en vez de EventSource, y añade un header de autenticación',
        'Añade reconexión con backoff progresivo y jitter, y provócala cortando la conexión a mano',
        'Elige una estrategia contra pérdida de eventos —Last-Event-ID o recarga completa— e impleméntala',
        'Añade deduplicación en el cliente por id de evento y demuestra que un evento repetido no se procesa dos veces',
      ],
      tip: 'Antes de dar por resuelta la reconexión, pruébala de verdad: corta la conexión a mitad de una ráfaga de eventos —no antes de que empiece ni después de que termine— y comprueba que al reconectar no falta ninguno y no se repite ninguno. Es la única forma de saber si la estrategia elegida funciona o solo parece funcionar.',
      completed: false,
    },
    {
      id: 'realtime-l4',
      title: 'Proyecto: notificaciones en tiempo real sin duplicados',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: `Vas a construir un canal de notificaciones en tiempo real para avisar a un panel —el backoffice de un sistema con agentes— cuando algo relevante termina: un trabajo en segundo plano se completó, un agente escaló un caso a un humano, un análisis largo terminó de procesarse.

Este proyecto es **solo la capa de comunicación**: no incluye llamadas a modelos ni lógica de agentes. Se conecta con lo que ya construiste en módulos anteriores —el sistema de colas del módulo de procesamiento asíncrono es una fuente natural de eventos para notificar.`,
      deliverables: [
        'Endpoint SSE con eventos nombrados y payload estructurado, no texto libre sin forma',
        'Headers correctos para evitar buffering de proxy, y heartbeats para sobrevivir a periodos de silencio',
        'Consumo en el cliente con fetch y ReadableStream, no con EventSource, con un header de autenticación real',
        'Reconexión con backoff progresivo y jitter tras una desconexión',
        'Una estrategia explícita y documentada contra pérdida de eventos durante la desconexión: Last-Event-ID con repetición corta, o recarga completa al reconectar',
        'Deduplicación en el cliente por identificador de evento, de forma que un evento repetido nunca se procese dos veces',
        'Prueba reproducible: cortar la conexión a mitad de una ráfaga de eventos y verificar que ninguno se pierde ni se duplica al reconectar',
      ],
      completed: false,
    },
    {
      id: 'realtime-l5',
      title: 'Examen: tiempo real',
      type: 'exam',
      difficulty: 'profesional',
      questions: [
        {
          q: '¿Por qué SSE es el protocolo natural para el streaming de respuesta de un modelo, y no WebSocket?',
          options: [
            'Porque SSE es más rápido en todos los casos',
            'Porque el tráfico es unidireccional del servidor al cliente —el usuario no manda nada mientras el modelo genera— y es además el formato nativo en el que ya llega la respuesta de los proveedores',
            'Porque WebSocket no funciona con HTTPS',
            'Porque los navegadores no soportan WebSocket para IA',
          ],
          correct: 1,
          explanation: 'La asimetría del tráfico es lo que decide el protocolo. WebSocket añade bidireccionalidad real que un chat de modelo no necesita, a cambio de un protocolo de conexión más complejo y peor escalado horizontal sin estado.',
        },
        {
          q: 'Tu endpoint de streaming funciona perfecto en local, pero en producción el cliente no ve nada hasta que la respuesta completa termina de golpe. ¿Cuál es la causa más probable?',
          options: [
            'El modelo cambió de proveedor',
            'Buffering de un proxy o balanceador intermedio, que acumula la respuesta antes de enviarla en vez de transmitirla progresivamente',
            'El cliente no soporta streaming',
            'Un error de sintaxis en el formato SSE',
          ],
          correct: 1,
          explanation: 'Es la trampa de producción más común en streaming: el código de la aplicación puede estar perfecto y el problema estar en una capa de infraestructura —proxy_buffering en Nginx, por ejemplo— que nadie pensó en desactivar para esta ruta.',
        },
        {
          q: 'Una CDN corta la conexión SSE tras cierto tiempo sin tráfico visible, insertando una página de error dentro del flujo. ¿Qué lo evita?',
          options: [
            'Aumentar el timeout del lado del cliente',
            'Enviar heartbeats periódicos —líneas de comentario SSE que el cliente ignora— para que la conexión siga mostrando actividad',
            'Cambiar a WebSocket',
            'Reducir el tamaño de cada fragmento enviado',
          ],
          correct: 1,
          explanation: 'Muchas CDNs cortan por silencio, no por duración total. Un heartbeat periódico —una línea que empieza con ":" y el cliente descarta— mantiene la conexión activa desde la perspectiva de cualquier intermediario que vigile inactividad.',
        },
        {
          q: '¿Por qué se prefiere fetch con ReadableStream sobre EventSource para consumir SSE en un caso de producción con autenticación propia?',
          options: [
            'EventSource está obsoleto y los navegadores lo van a eliminar',
            'EventSource no permite mandar headers personalizados, lo que complica autenticar con un token propio en vez de depender solo de cookies',
            'ReadableStream es más rápido procesando texto',
            'EventSource no admite eventos nombrados',
          ],
          correct: 1,
          explanation: 'La limitación real de EventSource es la imposibilidad de fijar headers en la petición inicial. Para autenticación basada en tokens en el header Authorization, hace falta fetch con lectura manual del stream.',
        },
        {
          q: 'Una desconexión ocurre a mitad de una ráfaga de notificaciones. Al reconectar, ¿qué garantiza que ninguna se pierda?',
          options: [
            'Nada lo garantiza automáticamente: hace falta una estrategia explícita, como Last-Event-ID con repetición corta en el servidor, o recargar el estado completo al reconectar',
            'SSE garantiza entrega ordenada y sin pérdidas por diseño del protocolo',
            'Basta con que el cliente tenga backoff con jitter',
            'Usar WebSocket en vez de SSE resuelve esto automáticamente',
          ],
          correct: 1,
          explanation: 'SSE por sí solo no promete nada sobre lo ocurrido durante una desconexión. Sin una estrategia deliberada —recordar el último id visto y pedir solo lo posterior, o recargar todo al reconectar— los eventos de ese intervalo simplemente se pierden.',
        },
      ],
      completed: false,
    },
  ],
  resources: [
    {
      title: 'MDN — Server-Sent Events (uso de EventSource y del formato)',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events',
      type: 'documentation',
    },
    {
      title: 'WHATWG — especificación del formato de eventos SSE',
      url: 'https://html.spec.whatwg.org/multipage/server-sent-events.html',
      type: 'documentation',
    },
    {
      title: 'FastAPI — StreamingResponse',
      url: 'https://fastapi.tiangolo.com/advanced/custom-response/#streamingresponse',
      type: 'documentation',
    },
  ],
}
