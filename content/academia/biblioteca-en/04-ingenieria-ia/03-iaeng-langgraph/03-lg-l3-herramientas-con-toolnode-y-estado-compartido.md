# Tools with ToolNode and Shared State
area: AI Engineering | module: iaeng-langgraph — LangGraph: From Loop to Compiled Graph | lesson 3
id: lg-l3 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-langgraph/lg-l3

## Content

## What you save yourself

In your hand-written loop, tool dispatch looked like this: read the calls from the response, look each one up in the registry, validate arguments, execute, format the result as a message, and push it back into history. Correct, and about forty lines you have to maintain.

**ToolNode** is that node, already written.

```python
from langchain_core.tools import tool
from langgraph.prebuilt import ToolNode
from langgraph.graph import StateGraph, MessagesState, START, END

@tool
def buscar_pedido(pedido_id: str) -> dict:
    """Looks up an order by its identifier. Returns status, date, and total.
    Use it for any question about a specific order.
    Not for searching products: use buscar_producto for that."""
    return repositorio.pedido(pedido_id)

@tool
def buscar_producto(consulta: str) -> list[dict]:
    """Searches products by name or category. Returns up to 10 with id, price, and stock."""
    return repositorio.productos(consulta, limite=10)

herramientas = [buscar_pedido, buscar_producto]
modelo_con_tools = modelo.bind_tools(herramientas)
```

The `@tool` decorator builds the schema from **the typed signature and the docstring**. This has a consequence worth understanding: the docstring is no longer documentation for teammates — it's **the prompt that decides when the tool gets used**. Everything you learned about descriptions — what it does, what it doesn't do, where to go instead — goes right there.

### The graph with a tool loop

```python
def llamar_modelo(estado: MessagesState) -> dict:
    return {"messages": [modelo_con_tools.invoke(estado["messages"])]}

def hay_llamadas(estado: MessagesState) -> str:
    ultimo = estado["messages"][-1]
    return "herramientas" if getattr(ultimo, "tool_calls", None) else END

grafo = StateGraph(MessagesState)
grafo.add_node("modelo", llamar_modelo)
grafo.add_node("herramientas", ToolNode(herramientas))

grafo.add_edge(START, "modelo")
grafo.add_conditional_edges("modelo", hay_llamadas, ["herramientas", END])
grafo.add_edge("herramientas", "modelo")   # <- the cycle

app = grafo.compile()
```

That last edge, from `herramientas` back to `modelo`, **is the agentic loop**. Your entire `while` reduced to one line saying "after running tools, ask the model again."

`MessagesState` is a predefined state with a single `messages` field and the concatenation reducer already wired up. For a conversational agent it's usually enough; if you need more fields, define your own and include it.

### Tools that read state

Sometimes a tool needs something that doesn't come in the model's arguments: who the user is, their plan, the thread id. **Don't ask the model for it** — it can invent it, and trusting an authorization value proposed by the model is a security hole, not a design detail.

Read it from state:

```python
from langgraph.prebuilt import ToolRuntime

@tool
def estimar_envio(codigo_postal: str, runtime: ToolRuntime) -> dict:
    """Estimates shipping cost and delivery window for the given ZIP code."""
    plan = runtime.state.get("plan_usuario", "basico")   # from state, not from the model
    tarifa = TARIFAS[plan]
    return {"coste": tarifa.calcular(codigo_postal), "dias": tarifa.dias}
```

The model provides the ZIP code, which is conversation info. The plan comes from state, which your code put there at startup. **Whatever decides permissions or prices never travels through the model.**

### Tools that write to state

For the reverse path — a tool that changes graph state, not just returning data — you use `Command`:

```python
from langgraph.types import Command

@tool
def marcar_resuelto(ticket_id: str) -> Command:
    """Marks the ticket as resolved and closes the conversation."""
    repositorio.cerrar(ticket_id)
    return Command(update={"ticket_cerrado": True, "pasos": ["marcar_resuelto"]})
```

Use it carefully. A tool that also mutates state is harder to reason about, and if several do it at once you're back to the problem of writes overwriting each other. The practical rule: **most tools return data; only a few should write state.**

### Scoped context

Each tool should see **the smallest slice of state it needs**. Not because it's elegant, but for two concrete reasons: less context means fewer tokens per turn, and a tool that can only read the user's plan can't leak the full conversation history if someone manages to call it maliciously.

## Tasks
- Convert three tools of yours to @tool and check the schema generated from the docstrings
- Build the graph with ToolNode and the back-edge, and watch the cycle in steps
- Pass an authorization field through state with ToolRuntime instead of through model arguments
- Look through your agent for any tool receiving data from the model that ought to come from state

## Tip

With @tool, the docstring stops being documentation and becomes code: it's what the model reads to decide. Review it with the same care you'd give an if statement.
