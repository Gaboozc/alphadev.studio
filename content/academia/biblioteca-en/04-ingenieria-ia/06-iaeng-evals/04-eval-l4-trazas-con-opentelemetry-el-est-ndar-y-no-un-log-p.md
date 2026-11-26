# Traces with OpenTelemetry: The Standard, Not a Custom Log
area: AI Engineering | module: iaeng-evals — Evaluation and Observability | lesson 4
id: eval-l4 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-evals/eval-l4

## Content

## Why a plain text log isn't enough

A log is a flat list of lines. A trace is an **execution tree**, with timing, inputs and outputs for each step, all tied to one common root. Without it, when a client reports something went wrong, the answer is guesswork; with it, it's reading.

Until now you could build this by hand — your own table with `run_id`, step type, input, output and duration. It works, and for a small system it's reasonable. The problem shows up when that model-powered system lives alongside the rest of your back end, which probably already traces with a standard: having two separate tracing systems, one for "normal stuff" and one for "AI stuff," is the exact kind of fragmentation a standard exists to prevent.

### The GenAI semantic conventions

OpenTelemetry — the open standard for traces and metrics that the rest of your infrastructure probably already uses — defines a set of attributes specifically for model operations, under the `gen_ai` prefix:

```python
from opentelemetry import trace

tracer = trace.get_tracer("mi-agente")

with tracer.start_as_current_span("llamada_al_modelo") as span:
    span.set_attribute("gen_ai.system", "anthropic")
    span.set_attribute("gen_ai.request.model", "claude-sonnet-5")
    respuesta = modelo.invoke(prompt)
    span.set_attribute("gen_ai.usage.input_tokens", respuesta.uso.entrada)
    span.set_attribute("gen_ai.usage.output_tokens", respuesta.uso.salida)
```

The value of using the standard name instead of your own (`tokens_entrada` vs. `gen_ai.usage.input_tokens`) isn't aesthetic: it means any OpenTelemetry-compatible observability tool understands your traces with zero extra setup, and your agent's traces show up on the same dashboard as the rest of your back end instead of living in a separate system.

### A design detail worth copying

The spec separates two things it's tempting to mix: span **attributes** (model name, token counts — small structured data) and span **events** (actual prompt and response content — potentially long and sensitive).

```python
# Attributes are lightweight metadata, always present
span.set_attribute("gen_ai.request.model", "claude-sonnet-5")

# Content goes in a separate event, which can be filtered or
# disabled at the collector without touching a line of code
span.add_event("gen_ai.content.prompt", {"contenido": prompt})
```

The practical reason: when someone asks how long you retain text written by your users, being able to answer "content events have their own retention policy, separate from attributes" is much better than having to audit every span one by one.

### Every agent step, a child span

For an agent with tools, each model call and each tool run is traced as a span inside the full run's span:

```
ejecución_agente  (root span)
├─ llamada_al_modelo        gen_ai.usage.input_tokens=1840
├─ herramienta:buscar_pedido
├─ llamada_al_modelo        gen_ai.usage.input_tokens=2010
└─ herramienta:buscar_pedido
```

Reconstructed like this, diagnosing "the agent answered nonsense" stops being guesswork: the trace shows the tool returned "not found" twice and the model, with no more data, made up an answer.

### When a platform on top makes sense

Saving spans to your own database gets you far, but when you want to compare runs across prompt versions, group by user, or watch cost evolve over time, a platform like **Langfuse** or **LangSmith** saves building that dashboard by hand — and both speak OpenTelemetry, so adopting the standard from day one means switching tools later requires zero re-instrumentation.

### Spec maturity

The `gen_ai` conventions are still evolving — they aren't an API frozen for years. Pinning the version of the instrumentation SDK you use, just like you pin any other dependency, prevents a spec change from reshuffling your attributes without your say-so.

## Tasks
- Instrument a model call with standard gen_ai attributes instead of custom names
- Separate prompt content into an event apart from span attributes
- Reconstruct the span tree of a complete run of your agent, with each tool as a child span
- Find a run in your traces where a tool failed and explain what the model did with that failure

## Tip

Adopting gen_ai instead of inventing your own field names looks like extra work on day one and saves weeks later: it's the difference between your next observability tool understanding your traces immediately or having to translate them first.
