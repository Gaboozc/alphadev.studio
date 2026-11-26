# Orchestrator and Workers: When You Don't Know How Many Parts There Are
area: AI Engineering | module: iaeng-3 — Agentic Workflows and Multi-Agent Systems | lesson 3
id: ie3-l1c | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-3/ie3-l1c

## Content

## Decompose, don't route

A report on a new topic might need three sections or nine — you don't know until you read the topic. A code review touches a different number of files in every pull request. In neither case is there a fixed set of routes to pick from, which is exactly what a router needs in order to work.

The **orchestrator-worker-synthesizer** pattern solves this in three roles:

- **Orchestrator**: looks at the whole task and decides **how many** parts to split it into.
- **Workers**: each solves **one** part, knowing nothing about the others.
- **Synthesizer**: combines the results into a single coherent deliverable.

### Spawning workers at runtime

The technical problem is concrete: if you don't know how many workers are needed until the orchestrator runs, you can't wire that many nodes up front. LangGraph solves it with `Send`, which spawns one instance of a node per item in a list, in parallel:

```python
from langgraph.types import Send
from typing import Annotated, TypedDict
import operator

class EstadoInforme(TypedDict):
    tema: str
    secciones: list[str]
    borradores: Annotated[list[dict], operator.add]
    informe_final: str

def orquestador(estado: EstadoInforme) -> dict:
    secciones = modelo.invoke(
        f"Break this topic into 3 to 6 report sections: {estado['tema']}"
    )
    return {"secciones": parsear_lista(secciones.content)}

def repartir(estado: EstadoInforme) -> list[Send]:
    # One 'worker' instance per section, each with ITS OWN input.
    # The orchestrator didn't know how many there'd be until it ran one step earlier.
    return [Send("worker", {"seccion": s, "tema": estado["tema"]}) for s in estado["secciones"]]

def worker(datos: dict) -> dict:
    texto = modelo.invoke(f"Write the section '{datos['seccion']}' about {datos['tema']}")
    return {"borradores": [{"seccion": datos["seccion"], "texto": texto.content}]}
```

Two details that aren't optional:

**The reducer on `borradores`.** Multiple workers running in parallel write to the same state field. Without `Annotated[list[dict], operator.add]`, each write would overwrite previous ones and you'd end up with just one draft out of the six generated. The reducer is what safely turns "six simultaneous writes" into "a six-item list."

**`repartir` returns `list[Send]`, not a node name.** That's the structural difference from a normal conditional edge: instead of picking a single destination from fixed options, it spawns as many destinations as needed, each with input trimmed down to what that specific worker needs.

### The synthesizer

```python
def sintetizador(estado: EstadoInforme) -> dict:
    orden = {s: i for i, s in enumerate(estado["secciones"])}
    ordenados = sorted(estado["borradores"], key=lambda b: orden[b["seccion"]])
    return {"informe_final": "\n\n".join(b["texto"] for b in ordenados)}

grafo = StateGraph(EstadoInforme)
grafo.add_node("orquestador", orquestador)
grafo.add_node("worker", worker)
grafo.add_node("sintetizador", sintetizador)
grafo.add_conditional_edges("orquestador", repartir, ["worker"])
grafo.add_edge("worker", "sintetizador")
```

Notice that the synthesizer **explicitly reorders** by section before joining. Parallel workers don't finish in launch order — whichever got the shortest section may finish first. If the synthesizer simply concatenates `estado["borradores"]` as they arrived, the report would come out with sections scrambled differently on every run.

### Designing workers that don't get in each other's way

**One responsibility, and nothing more.** A worker writing a section shouldn't also decide final ordering or touch another worker's state.

**Scoped context.** The worker for the "Introduction" section doesn't need to see drafts of the other five sections — only the topic and its own section. Passing full state doesn't just waste tokens: it hands the model information that can leak into an output where it doesn't belong, or simply distract it.

**Replaceable.** If a worker can crash and be relaunched without carrying another's state, you can retry a single one without redoing the five that succeeded. A worker depending on a shared mutable variable — rather than receiving everything it needs as input — breaks that.

### The cost of this pattern

It's the most expensive workflow pattern: as many model calls as workers, plus the orchestrator, plus the synthesizer. It's justified when subtasks genuinely can't be predicted ahead of time. If in practice they're always the same three, you don't need an orchestrator: you need a fixed three-step chain, which is cheaper and more predictable.

## Tasks
- Build the full orchestrator-worker-synthesizer graph to split a topic into sections and draft them in parallel
- Remove the reducer from borradores on purpose and see how many items survive
- Trim each worker's input down to only what it needs and measure how many tokens you save vs. passing full state
- Argue with a case of your own whether orchestrator-worker makes sense or subtasks are actually always the same so a fixed chain is enough

## Tip

Before writing an orchestrator, ask yourself whether you truly don't know how many subtasks there'll be, or if they're always the same three and you're treating them as variable out of habit. An orchestrator for a fixed case is the most expensive way to solve a problem a router would have solved for free.
