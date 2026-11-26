# Why an HTTP Request Is No Place for a Slow Agent
area: AI Engineering | module: iaeng-async — Async Processing: Queues, Workers, and Cron | lesson 1
id: async-l1 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-async/async-l1

## Content

## The limit a normal endpoint doesn't have

An endpoint that queries one row and responds takes milliseconds. An agent making three model calls, two searches and one external tool call can take thirty or forty seconds — and meanwhile, the HTTP connection stays open, the user's browser waits, and many proxies and edge layers close the connection before it finishes.

The question deciding whether something belongs inside the request or outside it is always the same: **can the user wait for the result right there?** If the answer is no — because it takes too long, because it depends on a slow third party, or because it must repeat without anyone watching — the task leaves the request-response cycle and is **delegated** to something running on its own.

### The minimal pattern

```
User → API → enqueues the job → replies immediately ("processing")
                   ↓
                job queue
                   ↓
                 worker → runs the agent → saves the result
```

The API no longer runs the agent: **it enqueues a job description** and returns confirmation in milliseconds. A separate process — the *worker* — picks that description off the queue when it can, runs the full agent, and saves the result where the user can check it later.

### The five principles that make this reliable

"Putting it in the background" isn't enough. Five principles, and missing any one produces a system that works in the demo and fails under real traffic.

**Delegation.** Slow work goes to a worker; the API only enqueues and confirms. If the API ran the agent directly in a background thread inside the same process, a server restart — a deploy, a crash — takes the job down with it without a trace.

**Decoupling.** The producer (the API enqueuing) knows nothing about the consumer (the worker executing). They can scale separately, deploy separately, and if the worker is busy, jobs simply wait in the queue instead of being lost.

**Idempotency.** Running the same job twice produces the same result, without duplicating side effects. This isn't optional: queues guarantee **at-least-once delivery**, never exactly-once. A worker can process the same message twice if it crashes right after finishing and before acknowledging completion.

```python
# Without idempotency: two runs of the same job send two emails
def procesar(pedido_id: str):
    enviar_correo_confirmacion(pedido_id)

# With an idempotency key: the second run doesn't repeat the effect
def procesar(pedido_id: str):
    if ya_se_proceso(clave=f"confirmacion:{pedido_id}"):
        return
    enviar_correo_confirmacion(pedido_id)
    marcar_procesado(clave=f"confirmacion:{pedido_id}")
```

The **upsert** pattern — insert or update depending on whether it exists — does the same for database writes: running it twice leaves the row in the same state rather than creating a duplicate row.

**Observability.** Without being able to see a job's status, "it's taking a while" and "it got lost" look identical. Every job needs a queryable status: queued, processing, completed, failed.

**Durability.** If the worker crashes halfway through, the job must not vanish. A disk-backed queue — not an in-memory Python list — survives a restart.

### The most common mistake: an in-memory list

```python
# This is NOT a queue. It's the illusion of a queue.
trabajos_pendientes: list[dict] = []

def encolar(trabajo: dict):
    trabajos_pendientes.append(trabajo)
```

It works great in development, with a single process. It breaks the moment: the process restarts (the list disappears with it, with zero record of what was lost), or there's more than one server (each has its own list, and a job queued on server 1 is never seen by the worker running on server 2 — the same process-bound state problem you saw with agent checkpoints). A real queue — Redis, a Postgres table with `SELECT ... FOR UPDATE SKIP LOCKED`, or a managed service — solves both problems at once: it survives restarts and is visible from any server.

## Tasks
- Identify a task in your system that currently runs inside the HTTP request and should be delegated
- Design the idempotency key for a task of yours with side effects (sending something, charging something, writing something)
- Explain in your own words why "at-least-once delivery" forces processing to be idempotent
- Look through your code for any queue implemented as an in-memory list and document what would happen if the process restarted

## Tip

The question deciding whether something belongs in the HTTP request: "if the user closes the tab right now, should the work keep running anyway?" If the answer is yes, it no longer belongs in the request-response cycle.
