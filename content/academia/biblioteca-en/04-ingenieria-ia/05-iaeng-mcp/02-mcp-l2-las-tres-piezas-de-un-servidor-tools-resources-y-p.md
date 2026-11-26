# The Three Pieces of a Server: Tools, Resources, and Prompts
area: AI Engineering | module: iaeng-mcp — External Tools and MCP | lesson 2
id: mcp-l2 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-mcp/mcp-l2

## Content

## Not everything a server exposes is a tool

It's tempting to think of MCP as "a tool server" and nothing else. The protocol defines three distinct primitives, and mixing them up produces clunky designs: using a tool to expose read-only data when a mechanism was designed specifically for that.

### Tools: actions

What you already know: a function with a name, description and input schema that the model can choose to invoke.

```python
from mcp.server.fastmcp import FastMCP

servidor = FastMCP("inventario")

@servidor.tool()
def buscar_producto(consulta: str, solo_con_stock: bool = False) -> list[dict]:
    """Searches products by name or category. Returns up to 10 results
    with id, name, price, and stock. Use before answering any question
    about availability or price."""
    return repositorio.buscar(consulta, solo_con_stock)
```

The SDK generates the JSON schema from the typed signature and the docstring, just like `@tool` in LangGraph. The usual rule still governs: **the docstring is the tool's prompt**, not documentation for humans.

### Resources: read-only context

A *resource* is a piece of data the host can read and attach to context — not something the model "invokes" with arguments, but something that **gets read**, like opening a file.

```python
@servidor.resource("inventario://productos/{categoria}")
def productos_por_categoria(categoria: str) -> str:
    """List of products in a category, as JSON."""
    return json.dumps(repositorio.por_categoria(categoria))
```

The practical difference from a tool: a resource has no side effects and doesn't compete with other tools for the model's attention when deciding "what to do." The host decides when to attach it, often before the model asks for anything — the user picks a document and that document enters context as a resource, not as the result of a tool call.

Mixing them up in practice: exposing the full product catalog as a **tool** the model has to remember to call in every conversation, when it could be a **resource** the host attaches once on opening the session.

### Prompts: reusable templates

A server can also expose parameterized prompts, so the host — or the person using it — invokes them like a template instead of writing them from scratch every time:

```python
@servidor.prompt()
def resumen_de_pedido(pedido_id: str) -> str:
    """Template for requesting an executive summary of an order."""
    return f"Summarize the status of order {pedido_id}: items, total, estimated delivery date."
```

It's the least used of the three primitives in practice, but it solves a real problem: when the same well-crafted question repeats across users of a server, nobody has to reinvent it.

### Discovery

Any client can ask a server what it offers, with no prior setup:

```
tools/list      → catalog of tools, with their schemas
resources/list  → catalog of available resources
prompts/list    → catalog of templates
```

This is what makes custom integration unnecessary: a new client that speaks the protocol can use your server without you knowing it exists, because it asks what's available instead of you having to announce it.

## Tasks
- Write a minimal MCP server with FastMCP exposing one real tool of yours
- Add a read-only resource for a piece of data you currently expose as a tool, and explain why it fits better there
- Call tools/list against your server and verify the generated schema matches what you expected
- Identify one piece of data in a project of yours that should be a resource and is currently modeled as a tool

## Tip

The question that separates a tool from a resource: is this something the model decides to do, or something it simply needs to read for context? If the answer is "read," it's almost always a resource, not a tool.
