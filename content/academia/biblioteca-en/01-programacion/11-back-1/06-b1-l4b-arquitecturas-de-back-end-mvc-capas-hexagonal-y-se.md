# Back-End Architectures: MVC, Layered, Hexagonal, and Serverless
area: Programming | module: back-1 — Back End with Python and FastAPI | lesson 6
id: b1-l4b | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/programacion/back-1/b1-l4b

## Content

## Why this matters

A four-endpoint back end works with any organization. The problem shows up six months later, when there are forty, three people touching them, and nobody remembers where the business rule lives.

An architecture is an answer to a very concrete question: **when a change arrives, how many files do you have to touch?** If the answer is "it depends," there is no architecture.

### MVC

The most widespread pattern. Three pieces:

- **Model** — the data and the rules governing it.
- **View** — how it's presented. In an API, serialization: your response models.
- **Controller** — receives the request, coordinates and returns.

A request's path is always the same: the controller receives `POST /pedidos`, validates input, asks the model to create the order, and returns what the view serializes.

Its limit: MVC tells you where input and output code goes, not where logic goes. By default it piles up in the controller, and you end up with three-hundred-line controllers.

### Layered

It's what you already built in the previous lesson, with its proper name:

```
presentation   →  routers. HTTP, status codes, input validation
business       →  services. The rules. Doesn't know HTTP exists
data access    →  repositories. Talking to the database
```

The rule that holds it together: **each layer only talks to the one below it.** A router never queries the database directly, even when in that specific case it would be shorter.

The real payoff is in testing: the service is tested with plain functions, without spinning up a server or database.

### Hexagonal (ports and adapters)

Goes one step further. Instead of stacked layers, it puts business logic in the center and everything else outside, communicating through interfaces.

```python
# The port: what the business needs, stated by the business
class RepositorioDePedidos(Protocol):
    def guardar(self, pedido: Pedido) -> None: ...
    def buscar(self, id: int) -> Pedido | None: ...

# An adapter: how it's fulfilled. Postgres today, something else tomorrow
class PedidosEnPostgres:
    def guardar(self, pedido: Pedido) -> None:
        ...

# The business depends on the port, not the adapter
class ServicioDePedidos:
    def __init__(self, repo: RepositorioDePedidos):
        self.repo = repo
```

What you buy: swapping Postgres for something else, or email sending for another provider, doesn't touch a single line of business logic. And in tests you pass a fake repository with no tricks.

What you pay: more files and more indirection. In a small CRUD app it's dead weight. It pays off when the logic is the complex part and the infrastructure is swappable.

### Serverless

Here you don't organize code: you organize **deployment**. Each endpoint is a function that the provider starts when a request arrives and shuts down when it finishes.

Pro: you don't manage servers, and if there's no traffic you don't pay.

Con: **cold starts** — the first request after a quiet period is slow — there is no in-memory state between calls, and database connections need an external pool because each function would open its own.

It's a good fit for uneven loads: webhooks, scheduled jobs, spiky APIs. Poor fit for steady traffic and persistent connections.

### Which one you pick

Almost always **layered**, which is what you already have. Move up to hexagonal when business logic is the valuable part and you want to be able to swap the infrastructure underneath. And remember serverless is a deployment decision: it combines with any of the others, it doesn't replace them.

## Tasks
- Trace a request through your API's three layers, naming the file for each step
- Find a router in your code that talks to the database without going through a service and fix it
- Convert a repository into a port with Protocol and write a fake adapter for tests
- Pick one of your endpoints and argue in three lines whether serverless fits it or not

## Tip

The question that reveals whether your architecture works: "if we change databases tomorrow, how many files get touched?" If the answer includes files with business rules, the layers are broken.
