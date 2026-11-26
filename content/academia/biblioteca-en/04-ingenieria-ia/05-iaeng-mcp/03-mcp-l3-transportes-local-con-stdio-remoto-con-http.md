# Transports: Local with stdio, Remote with HTTP
area: AI Engineering | module: iaeng-mcp — External Tools and MCP | lesson 3
id: mcp-l3 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-mcp/mcp-l3

## Content

## Where the server lives changes the transport, not the protocol

The JSON-RPC messages from the first lesson are always the same. What changes depending on where the server runs is **how they travel**.

### stdio: the server is a local process

The host launches the server as a subprocess and talks to it over standard input and output — the same channels a terminal program uses to read and write text.

```json
{
  "mcpServers": {
    "inventario": {
      "command": "python",
      "args": ["-m", "servidor_inventario"]
    }
  }
}
```

The host starts that process, and JSON-RPC messages flow back and forth over `stdin`/`stdout`. It's the default transport for tools running **on the same machine** as the host: a server wrapping local files, a development database, a script of yours.

Its security advantage isn't accidental: **it opens no network port.** The server isn't reachable from outside that machine because it isn't listening anywhere; only the process that launched it can talk to it. For sensitive tools that don't need to be remote, this is preferable to exposing them over HTTP even when HTTP is technically possible.

### HTTP: the server is remote or shared

When the server lives on another machine — a deployed service of your own, or an external provider like Zapier — the transport is HTTP. The current standard is **Streamable HTTP**: a single HTTP connection where responses can arrive streamed when needed, with session management via an identifier the client resends on every request.

```
POST /mcp
Mcp-Session-Id: 8f3a2c91
Content-Type: application/json

{"jsonrpc": "2.0", "id": 4, "method": "tools/call", "params": {...}}
```

It replaced an earlier transport based on Server-Sent Events with two separate connections, which proved more complicated than necessary to operate in production — an example of protocols learning from their first versions too.

Here everything you already know about securing a network service applies: HTTPS, authentication on every request, and everything you'll see in this module's security lesson. A remote MCP server is, first and foremost, **a web service** — it inherits every risk of any web service, plus the protocol's own.

### Choosing one

| | stdio | HTTP |
|---|---|---|
| Where it runs | Same machine as the host | Remote or shared across multiple clients |
| Network surface | None | Same as any HTTP service |
| Typical case | Local tools, development, sensitive machine data | Production services, third-party integrations |
| Who can call it | Only the process that launched it | Anyone with the URL and credentials |

The deciding question: **does this server need to be reachable by more than one client, from more than one machine?** If not, stdio is simpler and safer by design. If yes, HTTP — and then all the rigor of exposing a network service becomes mandatory, not optional.

## Tasks
- Configure an MCP server of your own with stdio and verify it opens no port
- Explain in two sentences why stdio is preferable for a sensitive tool that doesn't need to be remote
- Design the setup for an HTTP server with authentication and note what's needed to expose it safely
- Decide, for three hypothetical servers, which transport you'd use and why

## Tip

If your MCP server doesn't need anyone outside your own machine to call it, don't put it on HTTP "in case it scales." Every open port is a security decision, not a deployment detail.
