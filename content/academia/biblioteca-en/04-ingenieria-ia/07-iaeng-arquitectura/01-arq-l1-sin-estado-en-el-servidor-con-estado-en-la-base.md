# Stateless on the Server, Stateful in the Database
area: AI Engineering | module: iaeng-arquitectura — Architecture, Cost, and Scaling | lesson 1
id: arq-l1 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-arquitectura/arq-l1

## Content

## The bug that shows up on the second server

An agent with checkpoints works great with one server. State lives in SQLite, in a file, in memory — and since only one process talks to that database, there's never a conflict.

The problem arrives the day you need a second server, almost always because of traffic. If state lives on machine 1's disk and the request to resume a conversation lands on machine 2, the checkpoint **doesn't exist there**. The agent answers as if the conversation started from zero, or outright crashes.

This isn't a rare advanced-scaling edge case: it's the first thing that breaks the moment you go from "one server" to "more than one," and with a normal load balancer — which spreads requests without guaranteeing a user's requests always land on the same box — it happens in the first hour of real traffic.

### Stateless server, state in one shared place

The solution isn't avoiding state — an agent with memory needs it by design. It's pulling it off the server and putting it somewhere **every server can read equally**.

```
Before (breaks with 2+ servers):
  Server 1 → checkpoints.db (on its own disk)
  Server 2 → checkpoints.db (another file, empty)

After (works with any number of servers):
  Server 1 ┐
  Server 2 ├→ Shared Postgres (checkpoints for ALL threads)
  Server 3 ┘
```

With `PostgresSaver` instead of `SqliteSaver` — the same change you saw when talking about production in the LangGraph module — any server can handle any conversation, because state lives in none of them: it lives in the database they all share.

**Stateless on the server** means exactly this: you can shut down any instance and spin up another in its place without anyone noticing, because no instance keeps anything that isn't also in the shared database.

### What else tends to stay "stuck" to a server by mistake

**In-memory queues.** A Python `list` of pending jobs disappears if the process restarts, and a second server can't see it. That's the problem a real queue solves, in the async-processing module.

**Unshared session cache.** If you store "user X is authenticated" in an in-memory dictionary inside the process, a second server doesn't know it and asks them to log in again. Redis, or LangGraph's own checkpoint, solves this just like agent state.

**User-uploaded files.** If a file gets saved to the local disk of the server that handled that request, and the same user's next request hits another server, the file "vanished." It needs shared storage — S3, Supabase Storage — not one specific machine's disk.

The pattern behind all three is identical: **anything a server remembers only in its own memory or disk is a candidate to break the moment there's more than one.**

### How you test it, not just design it

Reasoning "this should work with multiple servers" isn't enough. You test it for real:

```bash
# Spin up two instances of your API on different ports
uvicorn main:app --port 8001 &
uvicorn main:app --port 8002 &

# Start a conversation against 8001
curl -X POST localhost:8001/agente -d '{"mensaje": "hola", "hilo": "t1"}'

# Continue it against 8002 — it MUST remember the context
curl -X POST localhost:8002/agente -d '{"mensaje": "what did I say earlier?", "hilo": "t1"}'
```

If the second call doesn't remember the first, something still lives in a single process's memory. Running this test before deploying with more than one server is cheaper than discovering it with real customers on a high-traffic Tuesday.

### Why this isn't premature

Designing statelessly from the first server doesn't cost more: it's the same line of code — `PostgresSaver` instead of `SqliteSaver` — and you already wrote it in the LangGraph module. What's expensive isn't designing it right from the start. What's expensive is migrating a system that already assumed, in a hundred different places in its code, that only one process exists.

## Tasks
- Identify in a project of yours what lives only in one specific process's memory or disk
- Switch your agent's checkpointer from SQLite to Postgres
- Spin up two instances of your API and repeat the test of continuing a conversation against the other instance
- List what other pieces of your system — cache, files, queues — are still stuck to a single server

## Tip

The question that catches this before it breaks in production: "if I shut down this server right now and booted a new one, would any user notice a difference?" If the answer is yes, something lives where it shouldn't.
