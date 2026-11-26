# Scaling the Model: Queues, Pools, and When Self-Hosting Makes Sense
area: AI Engineering | module: iaeng-arquitectura — Architecture, Cost, and Scaling | lesson 3
id: arq-l3 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-arquitectura/arq-l3

## Content

## Model providers have limits too

Every account with a model provider has a **rate limit**: requests per minute, tokens per minute, or both. At low traffic you never notice. At real traffic, your system can start getting 429 errors from the provider right when it's having the most success — the worst possible time for something to break.

### The waiting line at the limit

The instinctive reaction — retrying immediately when getting a 429 — makes the problem worse: it multiplies requests right when the provider is saying there are too many.

```python
import time
from anthropic import RateLimitError

def llamar_con_backoff(fn, intentos=5):
    for intento in range(intentos):
        try:
            return fn()
        except RateLimitError:
            espera = (2 ** intento) + random.uniform(0, 1)   # exponential backoff + jitter
            time.sleep(espera)
    raise Exception("Persistent rate limit after multiple retries")
```

**Jitter** — the random term added to the wait — isn't ornament: without it, if ten requests hit the limit at the same time, all ten will retry at the exact same time again, and collide again. With jitter, they spread out.

For high, sustained volume, backoff isn't enough on its own: you need a **real queue** — from the async-processing module — that caps how many requests go out to the provider per second, instead of letting total demand slam into the limit all at once.

### Multiple providers, or the same provider with a fallback

A system depending on a single model provider inherits its outages as its own. The usual defense is a **fallback**: if the primary model fails or takes too long, the request is retried against a second provider or a second model.

```python
def responder_con_fallback(prompt: str) -> str:
    try:
        return modelo_principal.invoke(prompt, timeout=10)
    except (TimeoutError, RateLimitError):
        return modelo_respaldo.invoke(prompt, timeout=15)
```

The cost of maintaining this — two integrations instead of one — is justified when system availability matters more than the simplicity of one provider. For a prototype, almost never. For something a client pays to keep always available, often yes.

### When self-hosting a model makes sense

The question isn't "is it cheaper to host your own model?" — at low or medium volume it almost never is, because infrastructure cost (a dedicated GPU, running 24 hours a day) easily exceeds what paying a provider per token would cost.

It makes sense when more than one of these holds at once:

- **High, steady volume**, not occasional spikes — the GPU costs the same whether it's busy or idle.
- **Data that cannot leave your infrastructure** by contract or regulation, and no provider meets that requirement.
- **Critical latency** that a network call to an external provider can't guarantee.
- **A small, specialized model** — fine-tuned for a specific task — that a general-purpose frontier model doesn't need to be: here the cost of hosting a model of a few billion parameters is much lower than a frontier one.

For the vast majority of systems you'll build, none of these holds, and paying a provider per token is still the right call. Bringing in your own model infrastructure before volume justifies it is the same mistake as setting up Kubernetes for an API getting a hundred requests a day.

### Measure before deciding

The math that settles all this with data, not intuition:

```
monthly cost with provider  =  cost per token × tokens per month
monthly cost self-hosted    =  GPU cost × hours per month (always on)
```

Run both numbers with your real volume, not what you hope to have in a year. Infrastructure decisions are made for the system you have, and revisited when volume shifts by an order of magnitude — not before.

## Tasks
- Implement retry with exponential backoff and jitter against a simulated rate limit
- Design a fallback to a second model and decide which errors trigger it and which don't
- Calculate your system's monthly cost with a provider vs. a dedicated GPU, using your real volume
- Explain under what concrete condition your own project would justify self-hosting a model, if any

## Tip

Jitter in a backoff isn't a minor detail: without it, a traffic spike hitting the rate limit turns into a synchronized oscillation where everyone retries together, over and over. It's the difference between absorbing a spike and amplifying it.
