# Persistence, Threads, and Step-by-Step Execution
area: AI Engineering | module: iaeng-langgraph — LangGraph: From Loop to Compiled Graph | lesson 4
id: lg-l4 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-langgraph/lg-l4

## Content

## One argument and you have memory

The entire checkpoints chapter — saving state, resuming after failure, keeping conversations separate — is this:

```python
from langgraph.checkpoint.sqlite import SqliteSaver

memoria = SqliteSaver.from_conn_string("agente.db")
app = grafo.compile(checkpointer=memoria)
```

From there, every invocation needs to know **which conversation** it's talking about:

```python
config = {"configurable": {"thread_id": "cliente-8841"}}

app.invoke({"messages": [("user", "what is the status of my order?")]}, config)
app.invoke({"messages": [("user", "and the previous one?")]}, config)   # remembers the first
```

The second message doesn't repeat the context. LangGraph loads the saved state for that `thread_id`, appends the new message and keeps going.

**`thread_id` is what separates one user from another.** Derive it from something your server controls — the session id, the conversation id in your database — and never from something arriving unvalidated from the client: anyone who can choose the `thread_id` can read someone else's conversation.

For production, `PostgresSaver` instead of SQLite. Same interface.

### Inspecting state and going back

```python
estado = app.get_state(config)
print(estado.values["pasos"])
print(estado.next)               # which node comes next

# Full checkpoint history, newest to oldest
for foto in app.get_state_history(config):
    print(foto.config["configurable"]["checkpoint_id"], foto.values["pasos"])
```

And something surprising the first time: you can **resume from an earlier point** by passing that checkpoint's id. It's genuinely useful for debugging — you tweak a prompt or a tool and replay only from the step where things went off track, without re-running or paying for the six steps before it.

### Interrupts

```python
app = grafo.compile(
    checkpointer=memoria,
    interrupt_before=["herramientas_sensibles"],
)

resultado = app.invoke(entrada, config)
estado = app.get_state(config)

if estado.next == ("herramientas_sensibles",):
    propuesta = estado.values["messages"][-1].tool_calls
    # ... here a person approves or rejects ...
    app.invoke(None, config)     # None = continue from where it stopped
```

`invoke(None, config)` is the detail worth remembering: **it doesn't start over; it continues.** Side effects that already happened aren't repeated.

And just like the interrupts in the fundamentals module: the control sits in `interrupt_before`, in code. It isn't a prompt instruction the model might ignore.

### Streaming progress

```python
for evento in app.stream(entrada, config):
    for nodo, salida in evento.items():
        print(f"[{nodo}] {salida.get('pasos', '')}")
```

`.stream()` returns a generator that emits after each node. That's what feeds the "Checking inventory… Reviewing orders…" the user sees instead of a frozen screen.

With `stream_mode="messages"`, it also emits **token by token** as the model produces them, which is the other half of a chat experience. Getting that to the browser belongs to the real-time module.

### What it still doesn't solve for you

Persistence saves state; it doesn't manage it. Keeping the conversation from growing without end is still your problem: the `messages` reducer concatenates, and on turn forty you're resending forty turns.

Pruning is still yours — sliding window, progressive summary or external memory, from the memory lesson. The library doesn't decide what matters in your domain, and shouldn't.

## Tasks
- Add a checkpointer and verify that a second call with the same thread_id remembers the first
- Walk get_state_history and resume from an earlier checkpoint after changing a prompt
- Mark a sensitive node with interrupt_before and resume with invoke(None, config)
- Consume .stream() and print node-by-node progress; then try stream_mode="messages"

## Tip

thread_id decides who sees what. If it comes from a client-supplied parameter without checking against the session, anyone can read someone else's conversation by asking for a different id. It's the same old access-control bug under a different name.
