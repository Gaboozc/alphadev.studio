# Send: Dynamic Branching at Runtime
area: AI Engineering | module: iaeng-langgraph — LangGraph: From Loop to Compiled Graph | lesson 5
id: lg-l4b | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-langgraph/lg-l4b

## Content

## The limit of conditional edges

So far each conditional edge chooses **one** next node from several fixed candidates. But there's a different pattern that comes up often: you have a list — of documents, subtasks, items to process — and you want to launch **one node per item**, in parallel, without knowing in advance how many there are. That's what `Send` solves.

## The concrete problem

A research agent receives a question, breaks it into sub-questions, and wants to investigate each one separately before synthesizing. The number of sub-questions is decided by the model at runtime — it might be two, it might be seven. A regular conditional edge won't work: it picks one destination, not N destinations.

```python
from langgraph.types import Send
from langgraph.graph import StateGraph, START, END
from typing import TypedDict, Annotated
import operator

class Estado(TypedDict):
    pregunta: str
    subpreguntas: list[str]
    hallazgos: Annotated[list[str], operator.add]

def descomponer(estado: Estado) -> dict:
    subpreguntas = modelo.descomponer(estado["pregunta"])
    return {"subpreguntas": subpreguntas}

def repartir(estado: Estado) -> list[Send]:
    # One Send per sub-question: each launches the 'investigar' node
    # with ITS OWN local state, in parallel
    return [Send("investigar", {"subpregunta": sp}) for sp in estado["subpreguntas"]]

def investigar(estado: dict) -> dict:
    resultado = buscar(estado["subpregunta"])
    return {"hallazgos": [resultado]}  # accumulated via the operator.add reducer
```

The function returning `Send` objects doesn't go in a special conditional edge — it goes in `add_conditional_edges` just like the others, except instead of returning **a node name**, it returns **a list of `Send` instances**, each with the target node name and the slice of state that specific node will receive.

```python
grafo = StateGraph(Estado)
grafo.add_node("descomponer", descomponer)
grafo.add_node("investigar", investigar)

grafo.add_edge(START, "descomponer")
grafo.add_conditional_edges("descomponer", repartir, ["investigar"])
grafo.add_edge("investigar", END)
```

## Why the reducer isn't optional here

Each `Send` instance runs `investigar` on its **own copy** of state — they don't share the same mutable dictionary; each branch has its own. When they finish, LangGraph needs to know how to merge the N results back into a single state. That's the exact job of `Annotated[list, operator.add]` from the fundamentals lesson: without a reducer, the second branch to finish would overwrite the first branch's result instead of adding to it.

## When to use Send and when not to

If the number of branches is fixed and known when writing the graph (always exactly three validations, say), normal conditional edges or even hand-declared parallel nodes are enough and easier to read. `Send` wins when the number of branches depends on data that only exists at runtime — another node's output, the length of a list from the user. Forcing `Send` for a fixed fan-out of two or three cases is complexity that buys nothing.

## Tasks
- Identify a node of yours that currently processes a list with a for loop inside — it's a candidate for Send
- Rewrite it with a conditional edge returning a list of Send, one per item
- Add the operator.add reducer to the state field where branch results accumulate
- Check what happens if the list comes in empty: does your graph handle zero Sends without breaking?

## Tip

Send solves dynamic fan-out, not parallelism per se — every branch still runs inside the same LangGraph runtime. If you need true distributed parallelism across processes or machines, that lives in another layer (queues, workers), not here.
