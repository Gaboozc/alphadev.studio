# A Real Queue: Producer, Worker, and Queryable Status
area: AI Engineering | module: iaeng-async — Async Processing: Queues, Workers, and Cron | lesson 2
id: async-l2 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-async/async-l2

## Content

## From the idea to something that runs

The previous lesson explained the principles. This one puts them in code, using **Redis Queue (RQ)** as the example — easy to reason about, and the pattern transfers directly to Celery or any other queue when volume justifies it.

### The producer: enqueue and respond

```python
from redis import Redis
from rq import Queue

conexion = Redis.from_url(REDIS_URL)
cola = Queue("agentes", connection=conexion)

@router.post("/tareas/analizar-documento")
def crear_tarea(documento_id: str):
    trabajo = cola.enqueue(ejecutar_agente_analisis, documento_id)
    return {"tarea_id": trabajo.id, "estado": "encolado"}
```

The API replies in milliseconds with an identifier. The agent hasn't run yet — the job was only described and placed in the queue.

### The worker: consume and execute

```python
# worker.py — SEPARATE process, run with: rq worker agentes
def ejecutar_agente_analisis(documento_id: str) -> dict:
    marcar_estado(documento_id, "procesando")
    try:
        resultado = agente.invoke({"documento_id": documento_id})
        marcar_estado(documento_id, "completado", resultado=resultado)
        return resultado
    except Exception as e:
        marcar_estado(documento_id, "fallido", error=str(e))
        raise
```

This file runs as its **own process**, separate from the API server — that's the decoupling from the previous lesson made explicit. You can have zero, one, or twenty workers running this same function, and scale them based on how many jobs pile up in the queue, without touching the API at all.

### Queryable status

```python
def marcar_estado(id: str, estado: str, **datos):
    db.execute(
        "UPDATE tareas SET estado = %s, datos = %s, actualizado_el = now() WHERE id = %s",
        (estado, json.dumps(datos), id),
    )

@router.get("/tareas/{tarea_id}")
def consultar_tarea(tarea_id: str):
    return db.tarea(tarea_id)  # {"estado": "procesando", ...}
```

The client that enqueued the job polls this endpoint — or receives a notification when it changes, which is the real-time module — to know where it stands. Without this table, "is it done yet?" has no answer except checking worker logs by hand.

### Retries with backoff, not immediate retries

A job can fail for a transient reason — the model provider had a spike, an external API timed out — and retrying immediately multiplies pressure right when the resource is already saturated, the exact same problem you saw with model provider rate limits.

```python
from rq import Retry

cola.enqueue(
    ejecutar_agente_analisis,
    documento_id,
    retry=Retry(max=3, interval=[10, 30, 90]),   # increasing backoff
)
```

Notice the intervals grow: 10 seconds, then 30, then 90. A one-second transient glitch resolves itself on the first retry; a persistent failure doesn't saturate the system retrying every second for an hour.

### What NOT to retry

Not all failures are transient. A document in a format the agent can't process is going to fail the exact same way on the second and third try — retrying it wastes worker time on something that will never work. Distinguish the error type before deciding whether to retry:

```python
def ejecutar_agente_analisis(documento_id: str) -> dict:
    try:
        return agente.invoke({"documento_id": documento_id})
    except (TimeoutError, RateLimitError):
        raise  # transient: RQ retries it per the policy
    except FormatoInvalidoError as e:
        marcar_estado(documento_id, "fallido_permanente", error=str(e))
        return None  # don't propagate: retrying this changes nothing
```

### When Celery instead of RQ

RQ is simpler to operate and reason about; Celery has more features — queues with different priorities, built-in scheduled tasks, better multi-language support — in exchange for more moving parts to manage. The decision is the same as with self-hosting a model: it's justified when volume or complexity genuinely requires it, not in advance. For most systems you'll build, starting with RQ and migrating if needed is cheaper than starting with Celery before you need it.

## Tasks
- Implement a queue with RQ: a producer that enqueues, a worker that processes, and a queryable status table
- Add retries with increasing backoff and trigger a transient failure to watch it work
- Distinguish in your code an error that should be retried from one that shouldn't, and handle them differently
- Spin up two workers at once and verify both pull jobs from the same queue without stepping on each other

## Tip

If your "queue" is a Python list inside the same process as the API, you don't have decoupling: you have a function that runs a little later in the exact same place where it can crash. The whole point of a queue is that it survives that process dying.
