# Failures, Retries, and Limits
area: AI Engineering | module: iaeng-2 — Agentic Engineering: Models That Act | lesson 6
id: ie2-l4 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-2/ie2-l4

## Content

## An agent fails in new ways

The failures you already know are still there — network, timeouts, invalid data — and new ones show up on top of them:

**It gets stuck in a loop.** It calls the same tool with the same arguments over and over. The step cap cuts it off, but catching the repetition and breaking it is better:

```python
firma = (llamada.nombre, json.dumps(llamada.args, sort_keys=True))
if firma in vistas:
  mensajes.append({"role": "tool", "content":
      "You already tried this and got the same result. Try a different approach or report that you cannot continue."})
else:
  vistas.add(firma)
```

**It invents arguments.** It calls the tool with an id that doesn't exist. Solved by validating and returning an error telling it how to get a valid one.

**It declares itself done without finishing.** It replies "done, I generated the report" without having generated it. The only reliable defense is **verifying the result in code**, not taking its word for it:

```python
if not Path(ruta_informe).exists():
  mensajes.append({"role": "tool", "content":
      "The file does not exist. The task is not complete."})
```

**It hallucinates on an intermediate step.** It treats a number it didn't look up as fact and builds the rest on top. Mitigated by forcing it to cite which call each number came from.

### Retries with judgment

Not every failure is retried the same way:

```python
# transient (network, rate limit) → retry with exponential backoff
# permanent (invalid arguments, permission denied) → DO NOT retry, report
```

```python
import time

def con_reintentos(fn, intentos=3):
  for i in range(intentos):
      try:
          return fn()
      except (TimeoutError, RateLimitError):
          if i == intentos - 1:
              raise
          time.sleep(2 ** i)          # 1s, 2s, 4s
      except ValidationError:
          raise                        # no point retrying
```

### The three mandatory limits

**Steps.** The loop always ends, with or without success.

**Spend.** Track tokens and cut off when exceeding a per-task cap. Without this, a looping agent can burn hundreds of dollars before anyone notices.

```python
if gasto_acumulado > LIMITE_POR_TAREA:
  return "Task stopped: exceeded assigned budget."
```

**Time.** A duration cap per task, so nothing stays hung indefinitely.

### Log everything

An agent without logs is impossible to debug: you can't reproduce the decision it made because it wasn't deterministic.

Save, for every step: the prompt sent, the response, the tool called with its arguments, the result, tokens and time.

With that you can answer the questions that matter: why it did what it did, which step went sideways, how much it cost and where the bottleneck is.

### The general principle

**An agent is an unreliable component inside a system that has to be reliable.** The system around it — validation, limits, result verification, human confirmation, logging — is what makes it usable in production. That surrounding infrastructure is most of the work, and it's what separates a demo from a product.

## Tasks
- Implement repeated-call detection and verify it breaks the loop
- Separate transient errors from permanent ones and apply retries only to the former
- Add a per-task spend limit and trigger it
- Verify in code the result the agent claims and confirm you catch a false claim

## Tip

Never trust the agent when it says it did something. If it claims it created a file, check that it exists. If it says it sent an email, check the status at the provider. Verifying in code is the only thing that turns an agent into something you can build on.
