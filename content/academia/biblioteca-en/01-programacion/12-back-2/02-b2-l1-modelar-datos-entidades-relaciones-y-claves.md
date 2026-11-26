# Modeling Data: Entities, Relationships, and Keys
area: Programming | module: back-2 — Relational Databases: Modeling, SQL, and ORM | lesson 2
id: b2-l1 | type: reading | difficulty: intermediate
url: https://www.alphadev.studio/en/academia/programacion/back-2/b2-l1

## Content

## You pay for the design up front, or suffer for it later

A bad data model doesn't show in the first month. It shows when there are ten thousand rows, three features built on top, and changing a table means migrating everything. **It's the most expensive decision in a project to reverse**, more than the framework or the language.

### Entities and attributes

An entity is a real-world thing you store information about: a product, a customer, an order. It becomes a table; each attribute becomes a column; each instance becomes a row.

```
productos
├── id          primary key
├── nombre
├── precio
├── stock
└── creado_en
```

### Keys

**Primary key**: uniquely identifies a row. Use an `id` with no business meaning — an auto-incrementing integer or a UUID — not an email or product code. Business data changes; identifiers shouldn't.

**Foreign key**: points to the primary key of another table. It's what creates the relationship and what prevents references to rows that don't exist.

### The three types of relationship

**One-to-many.** The most common. A supplier has many products; each product has one supplier. The foreign key goes on the "many" side:

```
proveedores               productos
├── id  ←──────────────── ├── proveedor_id
└── nombre                ├── nombre
                          └── precio
```

**Many-to-many.** A product can be in many orders, and an order can have many products. It needs a **join table**, and that table usually carries its own data:

```
pedidos      pedido_items              productos
├── id  ←─── ├── pedido_id   ────→ ─── ├── id
└── fecha    ├── producto_id           └── nombre
             ├── cantidad
             └── precio_unitario
```

Notice `precio_unitario`: it stores the price **at the time of purchase**. If you only pointed to the product, raising the price tomorrow would change the total of every historical order. This is the kind of detail that separates a thought-out model from an improvised one.

**One-to-one.** Rare. It usually means the two tables should be one, unless you're separating for security or because one part is rarely queried.

### Normalize: don't repeat data

If the supplier's name is written in every row of products, the day it changes you have to update a thousand rows and some will stay stale. The practical rule: **every piece of data lives in one place**, and everything else references it.

The exception is historical data, like the price in the example above: there you do want a frozen copy.

### Column types

Choosing well prevents silent bugs:

```sql
id            bigserial / uuid
short text    varchar(255)
long text     text
money         numeric(10,2)      -- never float
integers      integer / bigint
yes/no        boolean
date and time timestamptz        -- with time zone
structured    jsonb
```

**Never use `float` for money.** `0.1 + 0.2` isn't `0.3` in floating point, and those lost cents show up as totals that don't balance. `numeric` is exact.

**Use `timestamptz`, not `timestamp`.** Without a time zone, an order placed at 11:00 p.m. in Mexico shows up with a different date for a customer in Spain.

### Constraints: let the database defend the rules

```sql
CREATE TABLE productos (
  id          bigserial PRIMARY KEY,
  nombre      varchar(120) NOT NULL,
  precio      numeric(10,2) NOT NULL CHECK (precio > 0),
  stock       integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  proveedor_id bigint REFERENCES proveedores(id) ON DELETE RESTRICT,
  creado_en   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (nombre, proveedor_id)
);
```

Every constraint is a rule that **can't be bypassed from anywhere**: not from a bug in your code, not from a stray script, not from someone editing the database by hand. It's the last line of defense, and the only one that doesn't depend on nobody forgetting.

`ON DELETE RESTRICT` blocks deleting a supplier that still has products. The alternatives are `CASCADE` (deletes the products too, dangerous) and `SET NULL`.

## Tasks
- Model a real business on paper with at least four entities and their relationships
- Identify the many-to-many relationship and define what own data its join table carries
- Write the CREATE TABLE for two of those tables with NOT NULL, CHECK and a foreign key
- Spot one piece of data that should be frozen because it's historical and explain why referencing it isn't enough

## Tip

Before writing a line of SQL, draw the tables and the arrows between them on paper. Ten minutes there save weeks later: changing a model with production data is one of the most expensive things you can do in a project.
