# The N×M Integrations Problem
area: AI Engineering | module: iaeng-mcp — External Tools and MCP | lesson 1
id: mcp-l1 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-mcp/mcp-l1

## Content

## You already built a tool registry

In the fundamentals module you built a registry: each tool declares itself, with a name, description and schema, and a dispatcher that doesn't need to know how many there are. It works great — **inside your own agent**.

The problem shows up the moment you want to reuse those tools somewhere else. An agent running on an MCP server, another running in your editor, another on a colleague's phone: each framework has its own way of declaring a tool, and wiring your tools to each one means writing integration glue once per combination.

With **M** different agents or clients and **N** different tool sources, that's up to **M × N** hand-written integrations. Duplicated, fragile, and every API update breaks glue in several places at once.

### The idea behind MCP

**Model Context Protocol** (Anthropic, 2024) standardizes that glue: it defines a common protocol so any agent can talk to any tool source, with no custom integration code. The problem stops being M × N and becomes **M + N**: each client implements the protocol once, each server implements it once, and everyone understands each other.

It was adopted quickly by several vendors at once — Anthropic, then OpenAI and Google in their own agents during 2025 — precisely because it solves an integration problem nobody wanted to keep solving on their own.

### Three roles, not two

```
Host  →  MCP Client  →  MCP Server
(Claude Desktop,   (lives inside     (exposes tools,
 your agent, an     the host, speaks  data, or prompts:
 IDE)               the protocol)     your inventory, Gmail,
                                      a database)
```

**The host** is the application the user sees: an agent, an assistant, an IDE with built-in AI.

**The client** lives inside the host and speaks the protocol on its behalf — it discovers what each server offers and makes the calls.

**The server** is what exposes something: it can be yours, wrapping your own inventory or CRM, or a third party's — Zapier exposes hundreds of prebuilt integrations as an MCP server.

Notice what does NOT change: the model still decides when to use a tool the exact same way as in your agentic loop. MCP doesn't touch that part. What it standardizes is **how the tool is declared and called**, so that declaration works in any compatible host without rewriting it.

### Message transport

MCP uses **JSON-RPC 2.0** as its message format: requests with method, params and id; responses with result or error. It doesn't invent its own format — it reuses one that had already been running in distributed systems for twenty years.

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}
{"jsonrpc": "2.0", "id": 1, "result": {"tools": [{"name": "buscar_pedido", "...": "..."}]}}
```

Where those messages travel — a local process or a remote server — is the transports lesson. For now, what matters is that the **vocabulary** of the conversation is always the same, regardless of transport.

### What it doesn't solve

MCP doesn't decide which tool to use, doesn't validate that arguments make sense for your domain, and doesn't spare you from writing good descriptions. Everything you learned about designing tools — one responsibility each, descriptions that bound when to use them, validating what arrives — still applies identically inside an MCP server. The only new thing is the transport and discovery protocol.

## Tasks
- Explain in your own words the difference between solving M × N integrations and solving M + N
- Draw the host, client and server triangle for your own case: your agent talking to your inventory
- Hand-write the JSON-RPC message that would request a server's tool list
- List three things MCP does NOT solve that remain your responsibility when designing a tool

## Tip

If you already know how to design a tool for your own registry, you already know 80% of what it takes to expose it over MCP. What's new is the transport protocol, not the design judgment.
