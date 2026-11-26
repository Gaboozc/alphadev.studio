# SSE vs. WebSocket: Why Model Streaming Is One-Way
area: AI Engineering | module: iaeng-realtime — Real Time: Streaming Responses and Notifications | lesson 1
id: realtime-l1 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-realtime/realtime-l1

## Content

## Traffic is asymmetric

Chatting with a model has a very specific shape: the user sends a message, the server replies with a stream of text appearing word by word. After sending, the client **sends nothing else** until the next question — there isn't a constant two-way conversation while the model generates.

That asymmetry decides the protocol. **Server-Sent Events (SSE)** is a one-way channel from server to client over plain HTTP: the server pushes events, the client receives them, period. **WebSocket** is truly bidirectional: either side can send data at any moment, with its own connection and closing protocol.

### Why SSE is what providers already use

When you call a model API with streaming turned on, the response you get back **is already SSE** — it's the native format of OpenAI, Anthropic, practically every provider. Adopting it from your own back end to the browser isn't an arbitrary choice: it's continuing the same protocol you're already receiving, instead of translating it to something else halfway.

```
data: {"delta": "Sure"}

data: {"delta": ", I can"}

data: {"delta": " help you"}

data: [DONE]
```

Each `data:` line is an event. The client processes them in order as they arrive — that's what the next lesson covers.

### What WebSocket adds that isn't needed here

WebSocket solves a problem a model chat doesn't have: **simultaneous** two-way communication, useful when the client needs to send data while the server keeps sending — a real-time game, collaborative document editing. For that, WebSocket's extra cost — its own connection handshake, frames, teardown — is justified.

For "the server generates text and the client displays it," that cost buys nothing. And there's a concrete operational advantage to staying on SSE: **it's plain HTTP**. It scales horizontally with stateless servers like any other endpoint, doesn't need *sticky sessions* or a special load balancer that understands WebSocket, and any proxy or CDN that already handles HTTP handles it with zero extra setup.

### When WebSocket DOES make sense

If the user can **interrupt** the model mid-generation with a new message — not just close the connection, but send something while the stream is still active — then you really do need bidirectional. SSE only lets the client close the stream, not send new data over the same channel while it's open.

For everything else — which is the vast majority of what you'll build with models — the deciding question is simple: **does the client need to send anything while the server is still sending?** If not, SSE. If yes, WebSocket, with all the extra complexity it brings.

## Tasks
- Inspect a model API's streaming response with browser network tools and confirm it's SSE
- Explain with an example of your own a case where you WOULD need WebSocket for a model-powered product
- Compare what changes in load balancing between an SSE endpoint and a WebSocket endpoint
- Argue in two sentences why SSE scales horizontally better for chat

## Tip

If your instinct is to reach for WebSocket because "it's real time," ask first whether the client needs to send anything while the server is still sending. Almost always the answer is no, and SSE solves the same problem with far less operational complexity.
