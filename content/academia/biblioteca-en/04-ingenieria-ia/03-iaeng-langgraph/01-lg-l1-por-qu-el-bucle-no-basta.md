# Why the Loop Isn't Enough
area: AI Engineering | module: iaeng-langgraph — LangGraph: From Loop to Compiled Graph | lesson 1
id: lg-l1 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-langgraph/lg-l1

## Content

## What you already built

The agent from the previous module works. It has a tool registry, four stopping conditions, argument validation and traces. For many engagements that's enough and you don't need anything else.

This module isn't here to tell you it was wrong. It's here to show you where it stops scaling, and what a library does when that happens.

### The four ceilings

**State lives in local variables.** `mensajes`, `gasto`, `firmas`. If the process dies, they're lost. Saving them means serializing by hand after every step, in every place they can change, without missing one.

**Branches are nested `if`s.** With two paths it reads fine. With six — are there documents?, is confidence high enough?, is the user paying?, did the tool fail? — you have a function nobody wants to touch, and the diagram explaining it exists only in the author's head.

**Execution is a black box.** To know where it is you have to instrument each branch by hand. You already did that with traces, and it works because your loop is linear. As soon as it branches, maintaining that instrumentation becomes a separate job.

**Parallelizing means rewriting.** If two independent queries can run at once, your sequential loop has nowhere to put them without changing its shape.

### What LangGraph brings, and what it doesn't

What it does **not** bring: concepts. State, nodes, edges and compilation are what you already saw. If you skipped that lesson, this will look like a list of magic function calls.

What it **does** bring:

| Concept you already know | What LangGraph provides |
|---|---|
| Typed state | `StateGraph(Estado)` with per-field reducers |
| Node | `add_node(nombre, funcion)` |
| Fixed edge | `add_edge("a", "b")` |
| Conditional edge | `add_conditional_edges("a", decidir)` |
| Compilation | `.compile()` — validates the graph before running it |
| Checkpoint | `checkpointer=` — per-thread persistence, without writing it yourself |
| Partial results | `.stream()` — a generator that emits after each node |
| Interrupt | `interrupt_before=[...]` — pauses and returns control |

In short: **the tedious, easy-to-mess-up part**, tested and maintained by other people.

### When NOT to use it

A dependency is attack surface and an API to learn. Don't bring it in if:

- The agent has two or three steps and no branches.
- You don't need persistence or resuming after a failure.
- You're learning. Write the loop first; the library makes much more sense afterward.

The rule is the same as with any framework: **bring it in when the problem it solves already hurts**, not before.

### Pinning the version

LangGraph moves fast and has broken compatibility between minor versions. The examples in this module are for **1.2.x** and apply to that series:

```bash
pip install "langgraph==1.2.8" "langchain-anthropic==0.4.2"
```

With `==`, not `>=`. It's the same exact-versions rule from the virtual environments module, and here it matters more than anywhere else: an eight-month-old tutorial probably doesn't even compile anymore.

## Tasks
- List which of the four ceilings you've already hit with your own agent
- Install LangGraph with the pinned version and verify it imports
- Write in two lines what it would take to add persistence to your loop by hand
- Decide, for a real agent of yours, whether LangGraph adds value today or not yet

## Tip

If you can't explain what state, nodes, edges and compilation do without naming LangGraph, go back to the anatomy lesson before moving on. Learning the API without the concepts produces people who can copy examples and can't debug them.
