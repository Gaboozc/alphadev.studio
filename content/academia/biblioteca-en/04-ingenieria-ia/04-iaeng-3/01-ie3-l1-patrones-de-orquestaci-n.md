# Orchestration Patterns
area: AI Engineering | module: iaeng-3 — Agentic Workflows and Multi-Agent Systems | lesson 1
id: ie3-l1 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-3/ie3-l1

## Content

## One giant agent doesn't scale

A single agent with fifteen tools and a two-page prompt chooses poorly, gets confused, and is impossible to debug. The solution is the same as in any system: split into pieces with one responsibility each.

### The patterns that cover almost everything

**Chaining.** The output of one step feeds the next, in fixed order.

```
extract data → analyze → draft report
```

It's the simplest and most underrated. If the process is known, this is the right choice.

**Routing.** A classifier decides which specialist gets each case.

```
query → classify → ┬→ billing agent
                   ├→ tech support agent
                   └→ sales agent
```

Each specialist has few tools and a short prompt. It works much better than one trying to do everything.

**Parallelization.** Several independent tasks at once, then merged. Three distinct analyses of the same document run in parallel and a final step combines them. Directly cuts latency.

**Orchestrator and workers.** One agent breaks the task into subtasks, hands them out, and assembles the result. It's the most flexible and most expensive pattern: use it when subtasks can't be known ahead of time.

**Evaluator-optimizer.** One agent produces, another critiques against explicit criteria, the first revises. Two or three rounds at most. Works well when there are clear quality criteria — copy that must follow a style guide — and poorly when quality is subjective.

### The design rule

**Start with the simplest thing that could work.** The complexity ladder is: single call, fixed chain, routing, agent with tools, orchestrator.

Step up only when the previous rung fails for a reason you can name. Every rung multiplies cost, latency and debugging difficulty.

### State graphs

When the flow has branches and cycles, writing it as an explicit graph makes it visible and debuggable. That's what LangGraph solves, and the idea is independent of the tool: nodes that do work, edges that decide where to go, and shared state.

```python
def enrutar(estado):
  if estado["tipo"] == "factura":
      return "agente_facturacion"
  if estado["confianza"] < 0.6:
      return "escalar_a_humano"
  return "agente_general"
```

What's valuable: **routing is your code, not a model decision.** You can read it, test it with normal unit tests, and reason about it. The more control logic lives in code and the less in the prompt, the more reliable the system.

### The human exit is part of the design

Every workflow needs an escalation branch: low confidence, too many attempts, out-of-scope case. Designing it from the start keeps the system from trying to brute-force what it can't handle.

## Tasks
- Diagram a real task from your work and identify which pattern fits it
- Implement routing with two specialists and verify each query reaches the right one
- Parallelize two independent subtasks and measure the latency reduction
- Add a human-escalation branch with its explicit condition

## Tip

Every time you move a decision out of the prompt and into code, the system gets more reliable and cheaper to debug. The model should decide what requires understanding language, not control flow.
