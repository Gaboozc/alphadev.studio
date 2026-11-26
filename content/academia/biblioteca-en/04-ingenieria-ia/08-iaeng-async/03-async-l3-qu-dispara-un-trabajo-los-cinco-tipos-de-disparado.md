# What Triggers a Job: The Five Trigger Types
area: AI Engineering | module: iaeng-async — Async Processing: Queues, Workers, and Cron | lesson 3
id: async-l3 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-async/async-l3

## Content

## Not every job starts the same way

So far, a job was triggered by a user asking for something. That's only one of **five** types, and mixing them up leads to implementing the wrong mechanism — a cron job for something that should react to an event, or a poorly secured webhook for something that should be a scheduled task.

### 1. User-triggered

An explicit action enqueues the job and the API confirms right away:

```python
@router.post("/documentos/{id}/analizar")
def solicitar_analisis(id: str):
    cola.enqueue(analizar_documento, id)
    return {"estado": "encolado"}
```

It's the simplest case: someone is waiting for confirmation, and the job becomes visible via an id they can check later.

### 2. Machine or telemetry

A system condition — not a person — triggers the job: a usage threshold exceeded, a repeated error, an out-of-range metric.

```python
# In the telemetry pipeline from the evaluation module:
if tasa_de_error_ultima_hora > 0.05:
    cola.enqueue(alertar_equipo, motivo="tasa_de_error_alta")
```

This is the trigger that connects the evaluation module with async processing: drift caught by periodic evaluation can, instead of only updating a dashboard, directly trigger an alert job.

### 3. Cron: on a schedule

Runs at fixed intervals without anything external asking for it: every night, every hour, the first of the month. The next lesson is entirely about this type.

### 4. Third-party webhook

An external service notifies you that something happened, and that notification triggers the job — a payment confirmed, a document finished processing in another system, a form was submitted.

```python
@router.post("/webhooks/pago-confirmado")
def webhook_pago(payload: PagoConfirmado, firma: str = Header(...)):
    if not verificar_firma(payload, firma):
        raise HTTPException(401)  # never process a webhook without verifying its origin
    cola.enqueue(procesar_pago_confirmado, payload.pedido_id)
    return {"recibido": True}
```

Signature verification isn't optional: a webhook endpoint without it is a way for anyone to trigger your business logic with a forged request — the same authentication discipline as always, applied to a sender that isn't a logged-in person.

### 5. Chained

One job, upon finishing, triggers the next. That's what turns individual tasks into a multi-step flow:

```python
def procesar_documento(id: str):
    texto = extraer_texto(id)
    cola.enqueue(generar_resumen, id, texto)   # the next link

def generar_resumen(id: str, texto: str):
    resumen = agente.invoke({"texto": texto})
    cola.enqueue(notificar_usuario, id, resumen)
```

Each link stays idempotent and observable on its own — chaining doesn't exempt you from the five principles in the first lesson; it applies them at every step.

### The decision framework

Before implementing, three questions in order:

1. **Is a person waiting for immediate confirmation?** → user-triggered.
2. **Does it repeat at regular intervals regardless of any event?** → cron.
3. **Is it triggered by something that happened — inside the system, or outside it?** → machine/telemetry if internal, webhook if external, chained if it's the continuation of another job.

Choosing wrong isn't just aesthetic. A cron job for something that should react to an event wastes runs asking "did it happen yet?" in vain; a poorly verified webhook opens a door for anyone to trigger business logic with a forged request.

## Tasks
- Classify three background processes in your system according to the five trigger types
- Implement a webhook with signature verification and show that a request without a valid signature is rejected
- Design a chained job of at least two steps where each link is separately idempotent
- Explain a case where using cron instead of a telemetry trigger would be the wrong call, and why

## Tip

If you find yourself writing a cron job that wakes up every minute just to check "did anything happen yet?", the right trigger was almost certainly an event, not a schedule. Cron is for what genuinely happens on a schedule, not for faking reactivity by polling often.
