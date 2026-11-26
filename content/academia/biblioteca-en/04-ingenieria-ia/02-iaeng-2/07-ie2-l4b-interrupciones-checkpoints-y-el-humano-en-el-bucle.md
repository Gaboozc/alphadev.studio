# Interrupts, Checkpoints, and Human-in-the-Loop
area: AI Engineering | module: iaeng-2 — Agentic Engineering: Models That Act | lesson 7
id: ie2-l4b | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-2/ie2-l4b

## Content

## Three problems with one shared solution

All three show up the moment an agent leaves the demo:

1. The task takes forty seconds and the user stares at a frozen screen wondering if it's working.
2. The agent is about to do something irreversible and someone has to approve it first.
3. The process failed on step seven of nine and there's no way to resume without starting over.

All three are solved with the same thing: **being able to pause the agent at a specific point, save where it was, and continue from there.**

### The checkpoint

A *checkpoint* is a snapshot of state after each node, saved with a conversation identifier. If state is already in a typed object — like in the anatomy lesson — saving it is almost free:

```python
import json, sqlite3

def guardar(hilo_id: str, paso: int, estado: dict) -> None:
    db.execute(
        "INSERT INTO checkpoints (hilo_id, paso, estado, creado_el) VALUES (?, ?, ?, now())",
        (hilo_id, paso, json.dumps(estado)),
    )

def ultimo(hilo_id: str) -> dict | None:
    fila = db.query_one(
        "SELECT estado FROM checkpoints WHERE hilo_id = ? ORDER BY paso DESC LIMIT 1",
        (hilo_id,),
    )
    return json.loads(fila["estado"]) if fila else None
```

With that, resuming means reading the last one and keeping going. **The thread identifier is the key to the design**: you don't save "the agent's state," you save the state *of this conversation*. Two users at the same time don't step on each other, and yesterday's conversation can continue today.

Saving the entire state at every step sounds wasteful and isn't: an agent's state is kilobytes, and being able to answer "what did the agent know right before it messed up?" is worth far more than that space.

### The interrupt

An interrupt is a node that, instead of returning state, **returns control**. The loop stops and the process exits cleanly: it doesn't sit waiting in memory for someone to answer.

```python
class Interrupcion(Exception):
    def __init__(self, motivo: str, propuesta: dict, hilo_id: str):
        self.motivo, self.propuesta, self.hilo_id = motivo, propuesta, hilo_id

def ejecutar_herramienta(h, args, estado):
    if h.sensible and not estado.get("aprobado", {}).get(h.nombre):
        guardar(estado["hilo_id"], estado["paso"], estado)
        raise Interrupcion(
            motivo=f"'{h.nombre}' requires approval",
            propuesta={"herramienta": h.nombre, "argumentos": args.model_dump()},
            hilo_id=estado["hilo_id"],
        )
    return h.funcion(args)
```

Whoever calls the agent decides what to do with it:

```python
try:
    respuesta = agente.ejecutar(objetivo, hilo_id=hilo)
except Interrupcion as i:
    # Already saved; the API responds 202 and returns the proposal.
    return {"estado": "requiere_aprobacion", "propuesta": i.propuesta, "hilo": i.hilo_id}
```

When the person approves, it resumes from the checkpoint with the authorization marked. **It doesn't re-run everything**: it continues. That matters because restarting from the beginning also means repeating side effects that already happened.

### The difference from asking for confirmation in the prompt

A common mistake is "solving" it with instructions: *"ask before deleting anything."* That isn't a control; it's a request. The model follows it almost always — and "almost always" isn't a property you can sell a client.

The interrupt sits in the code that runs the tool. **No prompt can dodge it** because the model never reaches that line.

### Partial results

The third use of the same mechanism: if there's a point after each node where control returns, you can **emit** what's already known instead of waiting until the end.

```python
def ejecutar_con_avance(objetivo: str, hilo_id: str):
    for nodo, estado in recorrer(objetivo, hilo_id):
        guardar(hilo_id, estado["paso"], estado)
        yield {"nodo": nodo, "avance": estado["pasos"], "parcial": estado.get("respuesta")}
```

A generator. The consumer decides whether to stream it over SSE to the browser, write it to a log, or ignore it. The difference for someone waiting is huge: "Checking inventory… Reviewing orders…" versus forty seconds of nothing. The transport mechanics belong to the real-time module; what's needed here is for the agent to **have something to emit**.

### The debt you pay if you don't do this from the start

Adding checkpoints to an agent that keeps its state in local variables means rewriting it. That's why it pays to decide when the agent is forty lines, not four hundred: state in one object, thread identifier in every call.

## Tasks
- Add a thread identifier to your agent and save state after each step
- Kill the process mid-task and resume it from the last checkpoint
- Turn a sensitive tool into an interrupt that returns the proposal instead of running it
- Turn your loop into a generator that emits progress and verify it in the console

## Tip

The test that human approval is implemented properly: remove the system-prompt instruction asking to confirm. If the agent still can't execute the sensitive action, the control is in code. If it suddenly executes it, you never had a control.
