# The Router Pattern: A Classifier in Charge
area: AI Engineering | module: iaeng-3 — Agentic Workflows and Multi-Agent Systems | lesson 2
id: ie3-l1b | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-3/ie3-l1b

## Content

## Routing isn't orchestrating

The two patterns get confused because both start with "an agent decides what to do with this." The difference is how closed the set of options is:

**Routing** means choosing **one** from a handful of paths **known in advance**: billing, support, or sales. The number of destinations doesn't change between runs.

**Orchestrating** means breaking a task into a **number of parts not known until you see the specific case**: a report might need three sections or nine, depending on the topic. That's what you'll see in the next lesson.

Confusing them leads to building a full orchestrator for a problem that was a choice among three buttons — much more expensive and harder to debug than necessary.

### The classifier node

A router has one node whose sole job is deciding the category, with a **typed** output so it can't invent a fourth option:

```python
from typing import Literal
from pydantic import BaseModel

class Categoria(BaseModel):
    categoria: Literal["facturacion", "soporte_tecnico", "ventas"]
    confianza: float

def clasificar(estado: Estado) -> dict:
    resultado = modelo.with_structured_output(Categoria).invoke(
        f"Classify this customer inquiry:\n\n{estado['pregunta']}"
    )
    return {"categoria": resultado.categoria, "confianza": resultado.confianza}
```

`Literal["facturacion", "soporte_tecnico", "ventas"]` isn't decorative annotation: **it constrains the output space at the type level.** The model can't return `"facturacion_urgente"` even if it wants to; `with_structured_output` validation would reject it before it ever reaches your code. It's the same idea as asking for a boolean instead of free-text "yes" or "no" — the more that can be validated mechanically, the fewer edge cases you have to handle by hand.

### The routing function

Separate from the classifier, and **pure Python**:

```python
def enrutar(estado: Estado) -> str:
    if estado["confianza"] < 0.6:
        return "escalar_a_humano"
    return estado["categoria"]

grafo.add_conditional_edges(
    "clasificar",
    enrutar,
    {
        "facturacion": "agente_facturacion",
        "soporte_tecnico": "agente_soporte",
        "ventas": "agente_ventas",
        "escalar_a_humano": "escalar_a_humano",
    },
)
```

The final dictionary in `add_conditional_edges` isn't optional even though LangGraph accepts it without one: it's what lets **compilation** catch whether `enrutar` can return a value not mapped to any node. Without that map, that bug would only show up in production the first time it happened.

Notice that the decision to escalate on low confidence lives in `enrutar`, not in the classifier's prompt. Same rule as always: **control logic is code**, even when the signal feeding it — confidence — comes from a model.

### Real-world routing cases

**Support ticket triage.** This lesson's case: classify by topic and send to the specialist.

**Content moderation.** A cheap classifier marks obviously acceptable content and lets it through; only borderline cases reach a costlier review — human or a stronger model. Here the router doesn't pick a specialist; it picks **how much scrutiny** to apply.

**Model selection by cost.** Routing simple questions to a cheap model and complex ones to an expensive one is literally the same pattern applied to "which model to call" instead of "which agent to call." It's one of the cost optimizations in a later lesson, and now you know it's a router.

### When a router falls short

If you need the system to decide **how many** pieces of work to generate — not just which of three paths to take — a router fails by design: its output is one category from a fixed set, not a variable-length list. That's the exact problem solved by the orchestrator-worker pattern in the next lesson.

## Tasks
- Build a classifier with typed output via Literal and compile the graph to confirm it rejects an unmapped edge
- Add the low-confidence escalation branch as a routing-function decision, not a prompt rule
- Design a moderation router that decides "pass" or "review" instead of choosing a specialist
- Explain in two sentences why a router doesn't work for "generating a variable number of report sections"

## Tip

If you catch yourself telling the model "choose between A, B, or C" inside the prompt instead of using a Literal type, you're validating by convention rather than by contract. The model can drift from a convention; it can't drift from a type the SDK itself enforces.
