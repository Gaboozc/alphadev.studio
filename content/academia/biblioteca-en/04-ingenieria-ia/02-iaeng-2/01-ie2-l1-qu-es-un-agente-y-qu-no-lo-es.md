# What an Agent Is and What It Isn't
area: AI Engineering | module: iaeng-2 — Agentic Engineering: Models That Act | lesson 1
id: ie2-l1 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-2/ie2-l1

## Content

## The useful definition

A language model only produces text. An **agent** is a model placed inside a loop, with tools it can call and a goal to pursue until it's done.

The practical difference:

```
Model:  question → answer
Agent:  goal → decide → act → observe the result → decide → ... → finish
```

The model is one piece of the agent, not the agent. The other pieces are the loop, the tools, memory and limits.

### What is NOT an agent

**A model call with a long prompt.** No matter how elaborate, with no loop or tools it's a single call.

**A fixed chain of steps.** If you wrote the order and it never changes, it's a workflow, not an agent. And many times **that's what you should build**: if you know the steps, writing them out is cheaper, faster and more predictable than letting a model decide them every time.

The question before building an agent: *does the order of steps depend on what gets found along the way?* If not, you don't need an agent.

### The loop, in its minimal form

```python
def agente(objetivo: str, herramientas: dict, max_pasos: int = 8) -> str:
  mensajes = [{"role": "user", "content": objetivo}]

  for _ in range(max_pasos):
      respuesta = modelo.responder(mensajes, herramientas=describir(herramientas))

      if not respuesta.llamadas_a_herramienta:
          return respuesta.texto            # finished

      for llamada in respuesta.llamadas_a_herramienta:
          resultado = ejecutar(herramientas, llamada)
          mensajes.append({"role": "tool", "name": llamada.nombre, "content": resultado})

  return "Could not complete the task within the allowed number of steps."
```

That `max_pasos` isn't optional. Without a cap, a stuck agent retries indefinitely and burns through your API budget in an afternoon.

### The four pieces

**The model.** Decides what to do next. More capable models make fewer reasoning errors, and in a loop errors compound.

**The tools.** What it can do: query a database, call an API, read a file, send a message. Without tools it can only talk.

**Memory.** What it remembers across steps and across conversations.

**Limits.** How many steps, how much spend, what it's allowed to do without asking. This piece is what separates a demo from something you can put in front of a client.

### Cost grows fast

On every turn of the loop, the entire history is sent again. A ten-step conversation doesn't cost ten calls: it costs far more, because each call drags along everything before it.

Two practical consequences follow: **measure spend per task from day one**, and **prune history** when it grows, summarizing old turns instead of carrying them all along.

### When an agent is worth it

**Yes:** the task requires exploring, the number of steps varies depending on what's found, you have to decide across multiple information sources.

**No:** the process is fixed, accuracy has to be total, or a regular script solves it. An agent introduces variability, and variability in production has a cost.

## Tasks
- Take three tasks from your work and decide for each whether it needs an agent or a fixed workflow
- Write the minimal agent loop with a single tool and a step cap
- Measure how many tokens a five-step task consumes and calculate its cost
- Force the agent to get stuck and verify the step cap stops it

## Tip

Most projects pitched as agents are better solved with a fixed-step workflow and one or two model calls inside. Before building the loop, write the steps on paper: if they don't change, you already have the cheaper, more reliable solution.
