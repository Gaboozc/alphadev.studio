# A Real SSE Endpoint, With the Production Traps
area: AI Engineering | module: iaeng-realtime — Real Time: Streaming Responses and Notifications | lesson 2
id: realtime-l2 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-realtime/realtime-l2

## Content

## The minimal endpoint

```python
from fastapi.responses import StreamingResponse

@router.get("/chat/stream")
async def stream_chat(pregunta: str):
    async def generador():
        async for fragmento in modelo.stream(pregunta):
            yield f"data: {json.dumps({'delta': fragmento.texto})}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(generador(), media_type="text/event-stream")
```

Each `yield` pushes an event to the client as soon as it's ready, without waiting for the entire stream to finish. `text/event-stream` is the content type that tells the browser — and any proxy in between — that this is SSE and must be treated as such.

This works great locally. In production, three things break it if you don't anticipate them.

### Trap 1: proxy buffering

Nginx, and many load balancers, **buffer the response before sending it** by default — the exact opposite of what you want for streaming. The result: the client sees nothing for several seconds and then gets everything in one chunk, as if there were no streaming at all.

```nginx
location /chat/stream {
    proxy_buffering off;
    proxy_cache off;
}
```

And from the back end itself, an extra header for the same problem on other intermediate proxies:

```python
return StreamingResponse(
    generador(),
    media_type="text/event-stream",
    headers={"X-Accel-Buffering": "no"},
)
```

Without this, you can have completely valid streaming code and still see it fail in production — because the problem isn't in your code, it's in an infrastructure layer between your server and the browser.

### Trap 2: silence timeouts

Many CDNs and load balancers close a connection if they see no traffic for a while — Cloudflare, for example, cuts off after 100 seconds of silence, and does so by inserting **an HTML error page straight into your event stream**. If the model takes a while to start generating, or there's a long pause between chunks, the connection drops before anything useful arrives.

The fix is a **heartbeat**: an empty or keepalive event every 15–30 seconds that shows nothing to the user, but keeps the connection alive from the perspective of any intermediary watching for silence.

```python
async def generador():
    ultimo_heartbeat = time.monotonic()
    async for fragmento in modelo.stream(pregunta):
        if time.monotonic() - ultimo_heartbeat > 20:
            yield ": heartbeat\n\n"   # a line starting with ':' is an SSE comment, ignored
            ultimo_heartbeat = time.monotonic()
        yield f"data: {json.dumps({'delta': fragmento.texto})}\n\n"
    yield "data: [DONE]\n\n"
```

The `: heartbeat` line starts with a colon, which in the SSE spec marks a comment — the client ignores it completely, while it still counts as traffic for any intermediary watching for silence.

### Trap 3: naming events

The example above sends everything as the default event (`data:` with no name). When the client needs to distinguish message types — a text chunk vs. a completion notice vs. an error — **named events** keep the client from having to inspect the payload to guess what it is:

```python
yield f"event: fragmento\ndata: {json.dumps({'delta': fragmento.texto})}\n\n"
# ...
yield f"event: completado\ndata: {json.dumps({'tokens_totales': total})}\n\n"
```

On the client, each event name gets its own handler — the topic of the next lesson, along with how to consume this without using the browser's `EventSource` API, which has a limitation that makes it awkward in production: it doesn't let you send custom headers, which complicates authentication.

## Tasks
- Implement the full streaming endpoint and verify in network tools that chunks arrive progressively, not all at once
- Configure proxy_buffering off in your proxy or the X-Accel-Buffering header and check the difference
- Add heartbeats every 20 seconds and force an artificial pause in the model to watch them show up on the network
- Name at least two distinct event types (fragmento, completado) and verify the browser receives them with their names

## Tip

If streaming works great on your local machine and arrives all at once in production, suspect proxy buffering first before touching your application code. It's the most common cause and the easiest to overlook because it isn't in any file you wrote.
