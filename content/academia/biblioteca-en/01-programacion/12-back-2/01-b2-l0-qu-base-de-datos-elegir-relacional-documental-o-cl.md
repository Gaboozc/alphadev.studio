# Which Database to Choose: Relational, Document, or Key-Value
area: Programming | module: back-2 — Relational Databases: Modeling, SQL, and ORM | lesson 1
id: b2-l0 | type: reading | difficulty: intermediate
url: https://www.alphadev.studio/en/academia/programacion/back-2/b2-l0

## Content

## Not all databases store things the same way

Before modeling tables, it helps to know why tables and not something else. There are three families you'll run into, and each is optimized for a different question.

### Relational

Postgres, MySQL, SQLite. Data lives in tables with fixed-type columns, and relationships between them are explicit.

What it gives you that no other family matches:

- **Enforced schema.** A `precio numeric` column can't receive `"cheap"`. The database rejects bad data even if your code tries to send it.
- **Referential integrity.** A foreign key prevents an order from existing for a customer that doesn't exist.
- **Transactions.** Multiple writes happen all-or-nothing. That's what keeps charging and recording the payment from stopping halfway.
- **JOIN.** You can query across tables without pulling the data into your application.

It's the default answer for almost everything you'll build: orders, users, billing, inventory. Data with a known shape and relationships that matter.

### Document

MongoDB, Firestore. Each record is a document — in practice, a JSON object — and not all of them have to share the same fields.

```json
{
  "id": "abc",
  "nombre": "Laptop",
  "specs": { "ram": "16GB", "pantalla": "14 pulgadas" },
  "etiquetas": ["oferta", "envío gratis"]
}
```

It fits when the shape genuinely varies — a catalog where each category has different attributes — or when you always read the entire document at once.

Its price: **integrity becomes your problem.** Nothing stops you from storing `precio: "mil"` in one document and `precio: 1000` in the next. What the relational database rejected, here you have to validate yourself at every write point, forever.

### Key-value

Redis. One key, one value, instant access. No queries, no relationships.

```
sesion:8f3a  →  {"user_id": 42}     expires in 30 min
carrito:99   →  [ ... ]
```

It's not where your core data lives: it's where things go that need to be blazingly fast and can be lost. Sessions, cache, counters, rate limits. It almost always accompanies a relational database; it doesn't replace it.

### How to choose

Three questions settle the decision:

1. **Does the data have relationships that matter?** If an order belongs to a customer and that can't break, you want relational.
2. **Is the shape stable?** If you know what fields exist, the schema is a help, not a hindrance.
3. **Do you need to query across things?** "Customers in Guadalajara who bought more than a thousand this month" is a trivial query in SQL and a headache in the others.

When in doubt, **relational**. It's the reversible option: you can always store JSON inside a Postgres `jsonb` column when one specific part needs flexibility, and keep the schema and transactions for everything else. The reverse doesn't work — recovering integrity on data that spent a year without it is an entire project.

And a rule of scale: **most projects never grow big enough for the choice to matter for performance.** It matters because of what the database prevents you from doing wrong.

## Tasks
- Write down which family you'd use for: sessions, a catalog with variable attributes, and billing
- Find a real case where a document database allowed corrupt data (or a relational one would have prevented it) and explain how
- List three pieces of data in your project and state, for each, whether its shape is stable or not
- Try a jsonb column in Postgres and compare it with storing the same thing in columns

## Tip

The deciding question: what happens if someone stores data in the wrong shape? If the answer is "the database rejects it," you sleep well. If it's "code validates it," you're only safe until someone writes through another path.
