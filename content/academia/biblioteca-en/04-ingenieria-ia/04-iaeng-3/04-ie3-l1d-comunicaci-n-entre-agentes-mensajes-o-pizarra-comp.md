# Agent Communication: Messages or Shared Blackboard
area: AI Engineering | module: iaeng-3 — Agentic Workflows and Multi-Agent Systems | lesson 4
id: ie3-l1d | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-3/ie3-l1d

## Content

## The agents are rarely the problem

When a multi-agent system fails, suspicion usually falls on "the wrong agent" or "a badly written prompt." Almost always the real failure is in **how they pass information to each other** — the part least designed on purpose.

There are two models, and it pays to know which one you're using at each point in the system.

### Message passing

One agent's complete output becomes the next agent's input. It's what you already saw in chaining: linear, easy to reason about, and each step sees exactly what the previous one chose to send it.

```python
salida_a = agente_a.invoke(entrada)
salida_b = agente_b.invoke(salida_a)   # A decides what reaches B
```

Its limit: if three agents need the same piece of context, each one has to receive it down the chain, and a change in what the third agent needs forces you to touch what the first one produces.

### Shared blackboard

Every agent reads from and writes to the same central state. It's the pattern you've been using since the anatomy lesson, with typed state in `TypedDict`:

```python
class Pizarra(TypedDict):
    ticket: dict
    hallazgos_tecnico: str | None
    hallazgos_facturacion: str | None
    resumen_final: str | None
```

Each agent reads what it needs and writes its own field. Nobody has to explicitly pass anything to anyone: everything is in the same place.

The risk it brings is the one you already know from any shared state: **uncoordinated writes**. If two agents can write to the same field without going through a reducer or the orchestrator, one silently overwrites the other. The practical rule: **writes to the blackboard are controlled by the orchestrator**, not each agent at its own discretion.

### Why message format matters

This message between agents is an antipattern, even if it looks harmless:

```
"The billing agent says the customer already paid; check with tech support
whether the issue is still valid or was only due to payment status."
```

That's natural language interpreting natural language. The receiving agent has to **re-infer** what exactly it's being asked to do, and that reinterpretation is where ambiguity creeps in — fundamentally the same problem as avoiding vague tool prompts.

The alternative is a **structured handoff**:

```python
class Traspaso(BaseModel):
    de_agente: str
    para_agente: str
    hallazgo: str
    accion_sugerida: Literal["cerrar_ticket", "escalar", "pedir_mas_info"]
    confianza: float
    version: int = 1
```

With this, the receiving agent doesn't interpret: **it reads fields**. And `version` isn't decoration — when you change this schema's shape six months later, you need to tell old handoffs from new ones without the system breaking silently.

### Scoped context, again

You saw it with parallel workers: each agent should receive **only what it needs to decide its next step**, not the whole blackboard.

The practical method is simple to apply even if the name sounds grand: for each agent, ask first **what decision it has to make**, and only then decide which blackboard fields it needs to make it. Not the other way around — don't pass everything "just in case."

```python
def contexto_para_soporte_tecnico(pizarra: Pizarra) -> dict:
    # The support agent decides whether the technical issue is still open.
    # It doesn't need to see billing findings to decide that.
    return {"ticket": pizarra["ticket"], "hallazgos_tecnico": pizarra["hallazgos_tecnico"]}
```

Fewer fields means fewer tokens per call — and therefore lower cost, from a later lesson — and also less noise for a model to get distracted by or, worst case, leak into an answer it wasn't supposed to give.

### Which to use where

**Message passing** when the flow is linear and each step only needs the immediately preceding one: simpler and needs no write coordination.

**Shared blackboard** when multiple agents need to converge on the same case from different angles — like triaging a ticket between support and billing — and need to see each other's findings.

Both work together in the same system: one central blackboard for the case, and targeted structured handoffs between two agents that need to coordinate at a specific step.

## Tasks
- Check a system of yours to see whether inter-step communication is message passing, shared blackboard, or an undecided mix
- Convert a natural-language handoff between two agents into a Pydantic-typed schema
- Apply the scoped-context method to an agent: write down first what decision it makes, then which fields it needs
- Intentionally trigger an uncoordinated write to the blackboard and watch which agent loses its result

## Tip

When a multi-agent system gives inconsistent results across runs, before touching the prompts check what's reaching each agent. Almost always the model is responding reasonably to an ambiguous or incomplete input, not failing for no reason.
