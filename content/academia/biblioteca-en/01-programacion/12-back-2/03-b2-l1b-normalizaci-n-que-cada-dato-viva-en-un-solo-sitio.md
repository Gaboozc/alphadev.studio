# Normalization: So Every Piece of Data Lives in One Place
area: Programming | module: back-2 — Relational Databases: Modeling, SQL, and ORM | lesson 3
id: b2-l1b | type: reading | difficulty: intermediate
url: https://www.alphadev.studio/en/academia/programacion/back-2/b2-l1b

## Content

## The problem with repeating data

Look at this table, which is how any rushed model ends up:

```
pedidos
id | cliente        | email            | ciudad    | producto | precio
1  | Ana Martínez   | ana@correo.mx    | Guadalajara | Laptop | 1200
2  | Ana Martínez   | ana@correo.mx    | Guadalajara | Mouse  | 25
3  | Luis Ortega    | luis@correo.mx   | Monterrey   | Laptop | 1200
```

It works. And it brings three problems you don't see until they bite:

- **Update anomaly.** Ana changes her email. You have to touch all of her rows, and if one gets missed, the database holds two truths at the same time.
- **Insertion anomaly.** A new customer who hasn't bought yet doesn't fit: there's nowhere to put them without inventing a fake order.
- **Deletion anomaly.** You delete Luis's only order and his contact info vanishes with it.

**Normalizing** means splitting data across tables so that each fact is stored only once.

### The three forms people use

**First normal form (1NF): one value per cell.**

```
bad:  telefonos = "55-1234, 55-5678"
good: a telefonos table with one row per number
```

Storing lists in a text field forces you to split strings just to search, and there's no way to enforce a constraint on something inside it.

**Second normal form (2NF): nothing depending on only part of the key.**

In a table with composite key `(pedido_id, producto_id)`, the product's name depends only on `producto_id`. It doesn't belong there: it goes in `productos`.

**Third normal form (3NF): nothing depending on anything other than the key.**

In `pedidos`, the city depends on the customer, not the order. It goes in `clientes`.

With all three applied:

```
clientes            productos           pedidos              lineas_pedido
id | nombre | email id | nombre | precio  id | cliente_id | fecha  pedido_id | producto_id | cantidad
```

Now Ana's email is in one place. Changing it is a single write, and it can't end up half done.

### When it makes sense to denormalize on purpose

Normalizing has a price: answering "the customer name for this order" takes a JOIN. With many tables and heavy traffic, you feel that.

Duplicating on purpose is legitimate when there's a reason, and the two good reasons are:

- **Historical data.** The line item's price is **copied** at the time of purchase. If the product price goes up tomorrow, yesterday's order still has to say what was charged. Here it isn't duplication: they're two distinct facts that happen to match today.
- **A counter read a thousand times and updated rarely** — like the comment count on an article. Storing it means keeping it in sync, and sometimes it pays off.

What isn't valid is duplicating because you didn't think through the model. The practical rule: **normalize first, and denormalize only when you measure that it's needed and can explain why.**

## Tasks
- Take a wide table with repeated data and split it down to third normal form
- Point out in your model which field causes an update anomaly and fix it
- Explain in two sentences why an order line item's price should be copied
- Find a text field in one of your projects that stores a comma-separated list

## Tip

The quick test: if a piece of data appears twice in the database and changing one without the other leaves the database lying, you're missing a table. The exception is historical data, where the copy is the whole point.
