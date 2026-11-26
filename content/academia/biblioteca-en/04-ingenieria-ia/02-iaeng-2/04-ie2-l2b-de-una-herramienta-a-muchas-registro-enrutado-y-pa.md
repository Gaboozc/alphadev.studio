# From One Tool to Many: Registry, Routing, and Stopping
area: AI Engineering | module: iaeng-2 — Agentic Engineering: Models That Act | lesson 4
id: ie2-l2b | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-2/ie2-l2b

## Content

## The path that actually works

Nobody writes a six-tool agent in one sitting. Anyone who tries spends an afternoon debugging a system where they don't know if the failure is in the model, the routing or the tool. You build incrementally, and leave each step working before climbing to the next.

**Step 1 — the fixed call.** No model deciding anything:

```python
resultado = buscar_producto(consulta="laptop")
respuesta = modelo.responder(f"With this data, reply to the customer: {resultado}")
```

Here you verify the tool returns what you think and the model knows how to use it. If this doesn't work, nothing after it will.

**Step 2 — one tool, the model decides whether to use it.** The loop appears.

**Step 3 — several tools.** Routing appears.

**Step 4 — harden it.** Failures, timeouts, caps.

### The registry pattern

With one tool, an `if` is enough. With six, that `if` turns into a ladder you have to touch every time you add one — and that's where bugs sneak in.

The **tool registry** flips the relationship: each tool declares itself, and the dispatcher doesn't know how many there are.

```python
from dataclasses import dataclass
from typing import Callable

@dataclass
class Herramienta:
    nombre: str
    descripcion: str
    esquema: type          # the Pydantic model for its arguments
    funcion: Callable
    sensible: bool = False # requires human confirmation

REGISTRO: dict[str, Herramienta] = {}

def registrar(h: Herramienta) -> None:
    REGISTRO[h.nombre] = h

# The dispatcher never grows, no matter how many tools you add.
def despachar(nombre: str, argumentos: dict) -> dict:
    h = REGISTRO.get(nombre)
    if h is None:
        return {"error": f"Tool '{nombre}' does not exist. Available: {list(REGISTRO)}"}
    try:
        args = h.esquema(**argumentos)
    except ValidationError as e:
        return {"error": f"Invalid arguments: {e.errors()}"}
    return h.funcion(args)
```

Notice the error in the first branch: when the model invents a tool name, the response tells it **which ones exist**. With that it corrects itself on the next step. Without that, it gets stuck until it burns through the cap.

And the catalog sent to the model is generated from the registry itself, so **it can never fall out of sync** with what the code actually runs:

```python
def catalogo() -> list[dict]:
    return [
        {"name": h.nombre, "description": h.descripcion,
         "input_schema": h.esquema.model_json_schema()}
        for h in REGISTRO.values()
    ]
```

### When the model picks wrong

With many tools, selection errors start: it calls the orders tool for an inventory question, or chains three when one was enough. Three fixes, in order of effectiveness:

**Descriptions that bound each other.** Each one says what it does, what it does **not** do, and where to go instead. It's the cheapest fix and pays off the most.

**Group.** If you have fourteen tools, they're almost always four families. One `consultar_inventario` tool with a `tipo` parameter can be clearer than six variants.

**Split.** When even grouping leaves more than ten, the answer is no longer a better tool: it's several specialized agents. That's the multi-agent module.

### Stopping conditions

A loop without a guaranteed exit is an incident waiting for a date. It needs **four**, not one:

```python
def agente(objetivo: str, max_pasos=8, max_gasto=0.50, max_segundos=120) -> str:
    mensajes = [{"role": "user", "content": objetivo}]
    gasto, inicio, firmas = 0.0, time.monotonic(), []

    for paso in range(max_pasos):
        if gasto > max_gasto:
            return f"Stopped: exceeded spend limit ({gasto:.2f} USD)."
        if time.monotonic() - inicio > max_segundos:
            return "Stopped: exceeded time limit."

        r = modelo.responder(mensajes, herramientas=catalogo())
        gasto += coste(r.uso)

        if not r.llamadas_a_herramienta:
            return r.texto                      # 1. finished on its own

        for llamada in r.llamadas_a_herramienta:
            firma = (llamada.nombre, json.dumps(llamada.argumentos, sort_keys=True))
            if firmas.count(firma) >= 2:        # 4. spinning in circles
                return "Stopped: repeated the same call three times without progress."
            firmas.append(firma)
            mensajes.append(resultado_de(despachar(llamada.nombre, llamada.argumentos)))

    return "Stopped: exhausted step limit."     # 2. step cap
```

The four exits: **finished**, **step cap**, **resource limit** (spend or time) and **loop detection**.

The fourth is the one almost everyone forgets and the one that fires most often in practice. A stuck agent doesn't crash with an exception: it repeats the exact same call with the exact same arguments, over and over, each time with a bigger history and therefore higher cost. Comparing the call signature catches it in three turns.

### And something that isn't optional

Each of those four exits returns **a distinct reason**. When someone asks in two weeks why the agent didn't reply, the difference between "ran out of steps" and "stopped on spend" is the difference between fixing it in five minutes or an afternoon.

## Tasks
- Refactor your agent's dispatcher to a registry and verify that adding a tool no longer touches it
- Generate the catalog you send to the model from the registry itself, so it can't drift out of sync
- Implement all four stopping conditions and return a distinct reason for each
- Intentionally trigger a loop with a tool that always fails and verify signature detection cuts it off

## Tip

Before calling an agent good, trigger all four endings on it: finishing normally, hitting the step cap, exceeding spend, and getting stuck repeating. Any ending you haven't seen happen locally you'll see for the first time in production.
