# Project: Multi-Agent System
area: AI Engineering | module: iaeng-3 — Agentic Workflows and Multi-Agent Systems | lesson 7
id: ie3-l4 | type: project | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-3/ie3-l4

## Project brief

You're going to build a system that routes inquiries to specialized agents, with at least one part solved by parallel decomposition and with inter-agent communication that doesn't rely on them understanding each other by luck. It's the difference between an agent that impresses in a demo and one a client can put in front of their users.

The scenario: a company receives inquiries of different types — billing, tech support, sales info — and wants to handle automatically whatever it can and escalate the rest with enough context that a person doesn't start from scratch.

This project relies on the evaluation from the evaluation and observability module later in the area to verify that it works — don't repeat that work here; build it once there and apply it to this system.

## Tasks
- Design the graph on paper before coding it, marking where code decides and where the model decides
- Implement routing and measure its accuracy separately before connecting the specialists
- Build the orchestrator-worker case and test what happens if you remove the reducer

## Deliverables
- Classifier with typed output (Literal) that routes each inquiry to the right specialist, with a low-confidence escalation branch
- At least two specialized agents, each with its own tools and short prompt
- One case inside the system solved with orchestrator-worker: splitting into a number of parts not known in advance, parallel workers with Send, and a synthesizer that reorders
- Handoffs between agents using a typed schema (Pydantic), never loose natural-language instructions
- Scoped context: each agent and each worker documents what decision it makes and why it only receives those fields, not the full state
- Explicit state graph where control flow sits in code and not in the prompt

## Rubric
- Routing can be tested with ordinary unit tests because it's code, not a model decision
- Each specialist has fewer than five tools and a prompt that fits on one screen
- The shared field across parallel workers uses a reducer; removing the reducer and re-running demonstrably loses results
- The synthesizer explicitly reorders before joining — it doesn't assume workers return in launch order
- No handoff between agents is an unstructured free-text string

## Discussion questions
- What information should an escalated case carry so the person doesn't have to start from zero?
- If the classifier picks the wrong specialist, should the system be able to self-correct or escalate?

## Tip

Design the entire graph on paper before writing a line: boxes for nodes, arrows for edges, and explicitly mark which are conditional and which are fixed. It's much cheaper to spot a bad cycle on a diagram than to debug it once written.
