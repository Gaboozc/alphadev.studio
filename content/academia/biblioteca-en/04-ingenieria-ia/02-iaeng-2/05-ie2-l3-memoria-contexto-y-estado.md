# Memory, Context, and State
area: AI Engineering | module: iaeng-2 — Agentic Engineering: Models That Act | lesson 5
id: ie2-l3 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-2/ie2-l3

## Content

## Three distinct memories

**Working.** The current conversation history. Lives in the message list and disappears when it ends.

**Long-term.** What must be remembered across sessions: user preferences, learned facts, decisions made. Lives in a database.

**Knowledge.** The documents it can consult. That's RAG from the previous module.

Mixing them up produces the two classic mistakes: saving the entire conversation forever — expensive and useless — or saving nothing so the agent forgets on every session what it was already told.

### Context is finite and expensive

Every turn of the loop resends everything. A long conversation becomes slow and costly, and the model starts losing sight of what was at the beginning.

Three strategies, from simplest to most involved:

**Sliding window.** Keep the last N messages. Simple, and it loses the initial context, which is usually the task's goal.

**Progressive summary.** When history grows, summarize the old part into one message and keep going. Keeps the essentials at low cost.

```python
def podar(mensajes, limite=20):
  if len(mensajes) <= limite:
      return mensajes
  viejos, recientes = mensajes[:-10], mensajes[-10:]
  resumen = modelo.responder([
      {"role": "user", "content": "Summarize in 5 lines what matters from this conversation: " + texto(viejos)}
  ])
  return [{"role": "system", "content": "Prior summary: " + resumen.texto}] + recientes
```

**External memory.** Store important facts in a database and retrieve them when needed, instead of dragging them along every time.

### What to store as long-term memory

Not the whole conversation: **the facts**.

```
Bad:  "User said: hi, I want to know if you have laptops... [500 lines]"
Good: {"usuario": "u_42", "hecho": "prefers brief answers", "fecha": "2026-09-03"}
    {"usuario": "u_42", "hecho": "works in healthcare", "fecha": "2026-09-03"}
```

Short facts, dated, retrievable per user. The date matters because facts expire: a preference from a year ago might not hold today.

### Order inside the prompt matters

Models pay more attention to the beginning and the end of the context than to the middle. A critical fact buried in the middle of a long context can be ignored.

Recommended structure:

```
1. System instructions and goal           (top)
2. Relevant long-term memory
3. Retrieved documents
4. Recent history
5. Current request                        (bottom, the last thing it reads)
```

### State vs. memory

They aren't the same. **Memory** is what the agent remembers; **state** is where in the process it stands: which steps it finished, what's left, what failed.

State shouldn't live only in the message history. Store it separately, structured:

```python
{
"tarea_id": "t_881",
"objetivo": "Prepare monthly report for client X",
"pasos_hechos": ["download metrics", "calculate variances"],
"pendiente": ["draft summary", "generate PDF"],
"intentos_fallidos": {"generate PDF": 2}
}
```

With this you can resume an interrupted task, audit what happened and catch loops. Without it, if the process crashes halfway through, you start from scratch.

## Tasks
- Implement progressive summarization and measure how many tokens it saves in a long conversation
- Design the long-term memory schema: which facts you store and how you retrieve them
- Reorder your prompt according to the recommended structure and compare results
- Store task state separately and verify you can resume after an interruption

## Tip

Store facts, not transcripts. A memory that grows with every conversation ends up so huge that retrieving what's relevant is just as hard as the original problem, and on top of that it costs money on every call.
