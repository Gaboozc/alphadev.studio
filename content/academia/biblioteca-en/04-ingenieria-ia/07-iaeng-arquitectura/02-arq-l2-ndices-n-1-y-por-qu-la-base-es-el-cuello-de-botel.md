# Indexes, N+1, and Why the Database Is the Real Bottleneck
area: AI Engineering | module: iaeng-arquitectura — Architecture, Cost, and Scaling | lesson 2
id: arq-l2 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-arquitectura/arq-l2

## Content

## The model usually isn't the slowest part

It's intuitive to assume that in an AI system the slow part is the model — after all, it takes seconds where a database query takes milliseconds. Yet in real systems with RAG or agents querying several tables, **a misused database is just as slow as or slower than the model**, because a careless access pattern multiplies those milliseconds by hundreds.

### The N+1 problem

The most common pattern, and the costliest:

```python
# For every document retrieved by RAG, a separate query for its author
documentos = buscar_documentos(consulta)          # 1 query
for doc in documentos:
    doc.autor = obtener_autor(doc.autor_id)        # N more queries, one per doc
```

With 20 retrieved documents, that's 21 round-trips to the database instead of 2. Each has network latency, and that latency adds up serially. The fix is fetching everything needed in fewer queries:

```python
documentos = buscar_documentos(consulta)
ids_autores = [d.autor_id for d in documentos]
autores = {a.id: a for a in obtener_autores(ids_autores)}   # 1 query with IN
for doc in documentos:
    doc.autor = autores[doc.autor_id]
```

Two queries instead of twenty-one. Your ORM from the databases module usually has a way to ask for this directly — eager loading of relationships — that does the same thing without writing it by hand.

### Indexes on what you actually filter by

If your system routinely filters by `usuario_id`, `estado`, or `creado_el`, those columns need an index. Without it, every query scans the whole table; with thousands of rows you don't notice, with millions you do, and by then migrating live is more disruptive than putting it in from the start.

```sql
CREATE INDEX idx_mensajes_usuario ON mensajes (usuario_id, creado_el DESC);
```

This composite index serves the exact pattern "this user's messages, newest to oldest" — which is almost always how a conversation history is queried.

### Paginate, don't fetch everything

An endpoint that returns "all messages in this conversation" works in development, with twenty test messages. With a real two-year conversation and fifteen thousand messages, that same query saturates server memory and takes seconds building a response nobody is going to read in full.

```python
@router.get("/conversaciones/{id}/mensajes")
def mensajes(id: int, cursor: str | None = None, limite: int = 50):
    return db.mensajes_paginados(id, cursor, limite)
```

Cursor pagination — not page-number pagination — is the kind that doesn't break when new messages arrive between one page and the next.

### Connection pool: the limit nobody sees coming

Every Postgres connection carries a memory cost on the database server. Without a **pool** reusing connections, every request opens a new one, and under moderate traffic you exhaust the simultaneous-connection limit your provider allows — an error showing up as "the database refuses connections" that has nothing to do with how much data exists, only with how many concurrent connections were opened.

```python
# SQLAlchemy: a pool with an explicit size, not "as many as needed"
engine = create_engine(url, pool_size=10, max_overflow=5)
```

With multiple servers from the previous lesson, this limit becomes more important, not less: each instance keeps its own pool, so total connections equal (instances × pool size), and you have to size it against the real limit the database offers.

### When this doesn't matter yet

If your system has a hundred users and a messages table with ten thousand rows, none of this is noticeable. Same rule as ever: **measure before optimizing.** An index on a column nobody filters by is dead weight; pagination on an endpoint that never returns more than twenty rows is complexity with zero benefit. Apply this when real volume justifies it, not as blanket prophylaxis.

## Tasks
- Find a loop in your code that runs one query per item and turn it into a single IN query
- Add an index to the column you filter by most and compare query time before and after with EXPLAIN ANALYZE
- Convert an endpoint returning a full list to cursor pagination
- Calculate how many simultaneous connections your system opens given your server count and current pool size

## Tip

Before optimizing any query, measure with EXPLAIN ANALYZE. Intuition about what's slow in a database is wrong surprisingly often — the query that's "obviously" the problem sometimes takes 2ms, and the one nobody suspected takes 400.
