# Reconnection Without Losing or Duplicating Events
area: AI Engineering | module: iaeng-realtime — Real Time: Streaming Responses and Notifications | lesson 3
id: realtime-l3 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-realtime/realtime-l3

## Content

## The problem that only shows up when the connection drops

Streaming while it works is easy to demo. The hard part is what happens when the connection drops mid-stream — the user's Wi-Fi flickers, a proxy closes on timeout — and it has to reconnect. There are two ways to fail, and they're opposites: **losing** events that happened during the disconnect, or **duplicating** events already received before the drop.

### Why EventSource isn't enough for this

The browser's native API, `EventSource`, reconnects automatically — but it doesn't allow sending custom headers, which makes it hard to authenticate the connection with your own token instead of relying on cookies. So for a production case with real auth, you consume it with `fetch` and a `ReadableStream`, reading the response body manually:

```javascript
async function conectar(url, token) {
  const respuesta = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },  // EventSource doesn't allow this
  })
  const lector = respuesta.body.getReader()
  const decodificador = new TextDecoder()
  let buffer = ''

  while (true) {
    const { value, done } = await lector.read()
    if (done) break
    buffer += decodificador.decode(value, { stream: true })
    const eventos = buffer.split('\n\n')
    buffer = eventos.pop()  // the last chunk may be incomplete
    for (const evento of eventos) {
      procesarEvento(evento)
    }
  }
}
```

It's more code than `new EventSource(url)`, and in return you get full control over headers and over what happens when the connection drops — which is exact what you need to handle reconnection properly.

### Progressive backoff, not immediate retry

Same as with a model provider's rate limits: reconnecting immediately after a drop, with no wait, can turn into a loop hammering the server over and over if the drop happened because the server is overloaded.

```javascript
async function conectarConReintento(url, token, intento = 0) {
  try {
    await conectar(url, token)
  } catch {
    const espera = Math.min(1000 * 2 ** intento, 30000) + Math.random() * 1000
    await new Promise((r) => setTimeout(r, espera))
    conectarConReintento(url, token, intento + 1)
  }
}
```

The same exponential backoff with jitter from the architecture module, applied here to client reconnection instead of a model-provider call.

### The real problem: don't lose, and don't duplicate

Reconnecting is easy. The hard requirement — the one that truly separates a careful implementation from an improvised one — is that reconnection **neither loses** events that happened during the outage **nor duplicates** events that already arrived before the cut. There are two strategies, and either is valid as long as you pick it on purpose and document it:

**Last-Event-ID and short replay on the server.** Every SSE event can carry an id. The client remembers the last one it processed and sends it back on reconnect; the server keeps a short history and only resends events after that id.

```
id: 42
event: notificacion
data: {"ticket": "T-881", "mensaje": "New ticket assigned"}
```

```javascript
// On reconnect, send the last seen id
headers: { 'Last-Event-ID': ultimoIdProcesado }
```

**Reload full state, and use SSE only for what comes next.** On reconnect, the client requests the complete current list from a normal endpoint — not over SSE — and from there listens only for new streaming events. It's simpler to implement than maintaining a replay history on the server, in exchange for one extra request on each reconnect.

Either one solves the problem. What isn't acceptable is choosing neither: without an explicit strategy, a three-second disconnect during a burst of notifications can drop the exact ones that mattered.

### Client-side deduplication, as a final seatbelt

Even with a solid reconnection strategy, it helps for the client to ignore an event it already processed, identified by its id:

```javascript
const vistos = new Set()

function procesarEvento(evento) {
  if (vistos.has(evento.id)) return  // already processed, ignore
  vistos.add(evento.id)
  actualizarUI(evento)
}
```

This check is cheap and covers the edge case where, due to the "at-least-once delivery" nature of any distributed system, the same event arrives twice despite the reconnection strategy. It's the same idempotency from the async-processing module, applied on the client side.

## Tasks
- Implement stream consumption with fetch and ReadableStream instead of EventSource, and add an auth header
- Add reconnection with progressive backoff and jitter, and trigger it by cutting the connection by hand
- Pick a strategy against event loss — Last-Event-ID or full reload — and implement it
- Add client-side deduplication by event id and show that a repeated event isn't processed twice

## Tip

Before calling reconnection solved, test it for real: cut the connection in the middle of a burst of events — not before it starts or after it finishes — and verify that on reconnect none are missing and none repeat. That's the only way to know whether your chosen strategy works or only looks like it works.
