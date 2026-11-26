# Your First Graph, Line by Line
area: AI Engineering | module: iaeng-langgraph — LangGraph: From Loop to Compiled Graph | lesson 2
id: lg-l2 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-langgraph/lg-l2

## Content

## The complete minimal graph

A support agent: receives a question, searches the docs, and answers. With one branch: if it finds nothing, it says so instead of inventing.

### 1. State

```python
from typing import TypedDict, Annotated
import operator

class Estado(TypedDict):
    pregunta: str
    documentos: list[str]
    respuesta: str
    pasos: Annotated[list[str], operator.add]
```

`Annotated[list[str], operator.add]` is the **reducer**. Without it, every node writing `pasos` overwrites the previous value; with it, LangGraph concatenates. It's the answer to "what do I do when two nodes write the same field?", and it has to be answered field by field.

Fields without a reducer overwrite. For `respuesta`, that's exactly what you want.

### 2. Nodes

Normal functions. They receive state, return **only what they change**:

```python
def recuperar(estado: Estado) -> dict:
    docs = buscador.buscar(estado["pregunta"], k=5)
    return {"documentos": docs, "pasos": ["recuperar"]}

def responder(estado: Estado) -> dict:
    contexto = "\n\n".join(estado["documentos"])
    texto = modelo.invoke(
        f"Answer using only this context.\n\n{contexto}\n\nQuestion: {estado['pregunta']}"
    ).content
    return {"respuesta": texto, "pasos": ["responder"]}

def sin_resultados(estado: Estado) -> dict:
    return {
        "respuesta": "I found no information about that in the documentation.",
        "pasos": ["sin_resultados"],
    }
```

None of them knows a graph exists. They can be tested by calling them with a dictionary, without spinning anything up — the exact same reason you separated *services* from *routers* in the back end.

### 3. Wiring

```python
from langgraph.graph import StateGraph, START, END

grafo = StateGraph(Estado)

grafo.add_node("recuperar", recuperar)
grafo.add_node("responder", responder)
grafo.add_node("sin_resultados", sin_resultados)

grafo.add_edge(START, "recuperar")

def hay_documentos(estado: Estado) -> str:
    return "responder" if estado["documentos"] else "sin_resultados"

grafo.add_conditional_edges("recuperar", hay_documentos, ["responder", "sin_resultados"])

grafo.add_edge("responder", END)
grafo.add_edge("sin_resultados", END)
```

`START` and `END` are special nodes: where it enters and where it exits. The destination list in `add_conditional_edges` is optional, but it's worth including: it lets compilation validate that the routing function can't return a name that doesn't exist.

And notice what `hay_documentos` is: **Python**. An `if` on state. There's no model call to decide something you decide by looking at a list.

### 4. Compile and run

```python
app = grafo.compile()

resultado = app.invoke({"pregunta": "what is the return policy?"})
print(resultado["respuesta"])
print(resultado["pasos"])   # ['recuperar', 'responder']
```

`compile()` walks the graph and fails if there are unreachable nodes, edges to nonexistent nodes or dead ends. **That error arrives at startup**, not halfway through a conversation with a customer.

And `pasos` tells you the actual path taken without adding a single `print`.

### Seeing it

```python
print(app.get_graph().draw_mermaid())
```

It outputs a Mermaid diagram of the graph. Paste it into project docs: it's the only version of the diagram that **can't go out of date**, because it's generated from the running code.

### The beginner mistake

Returning the full state from a node:

```python
# Bad: overwrites whatever other nodes wrote
def recuperar(estado: Estado) -> dict:
    estado["documentos"] = buscar(...)
    return estado

# Good: only the slice that changes
def recuperar(estado: Estado) -> dict:
    return {"documentos": buscar(...)}
```

Under sequential execution the first looks like it works. The moment two nodes run in parallel, it starts dropping data intermittently — the worst kind of bug, because it doesn't reproduce cleanly.

## Tasks
- Build the complete graph and verify that pasos reflects the actual path
- Break an edge on purpose, pointing to a nonexistent node, and watch it fail at compile time
- Generate the Mermaid diagram and paste it into the project README
- Add a field to state that needs a reducer and test what happens without it

## Tip

Test each node as a plain function before wiring it: pass it a dictionary and check what it returns. If you need the whole graph to know whether a node works, the node is doing too much.
