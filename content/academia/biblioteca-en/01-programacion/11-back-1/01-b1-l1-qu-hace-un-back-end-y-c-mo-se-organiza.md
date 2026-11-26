# What a Back End Does and How It's Organized
area: Programming | module: back-1 — Back End with Python and FastAPI | lesson 1
id: b1-l1 | type: reading | difficulty: intermediate
url: https://www.alphadev.studio/en/academia/programacion/back-1/b1-l1

## Content

## The division of responsibilities

The front end displays and collects. The back end decides, stores and protects. The line separating them isn't aesthetic: **everything that can't be trusted to the browser lives in the back end.**

Things that can only happen on the server:

- Saving to and querying the database.
- Checking permissions for real.
- Talking to services that require secret keys.
- Applying business rules the user must not be able to change.

If a price calculation happens only in the browser, anyone can alter it from the console. If it happens on the server, they can't.

### Why FastAPI

In the stack you already use, Next.js handles many APIs with its Route Handlers, and for a website that's often enough. FastAPI comes in when the back end needs the Python ecosystem: data processing, machine learning models, integration with AI libraries. It's the door the Python module opened.

Its three concrete strengths:

- **Fast to write.** An endpoint is five lines.
- **Built-in validation.** It uses Pydantic, so incoming data validates itself.
- **Automatic docs.** It generates an interactive interface from your code, without writing anything extra.

### The vocabulary

**Endpoint**: an address that responds to requests. `/productos`, `/usuarios/42`.

**HTTP method**: what you want to do.

```
GET     read, no side effects
POST    create something new
PUT     replace completely
PATCH   modify a part
DELETE  delete
```

**Status code**: how it turned out.

```
200  OK
201  created
400  the request is malformed
401  I don't know who you are
403  I know who you are and you can't
404  doesn't exist
422  data failed validation
500  the server broke
```

Returning the right code isn't a detail: it's what lets the client react without guessing. A 200 with an error message inside forces you to inspect every response body.

### The architectures you'll encounter

**Monolith.** Everything in one application. It's the right place to start, and right for the vast majority of projects. Simple to deploy, simple to debug.

**Separate services.** Each part of the system is an independent application. It solves problems for large teams and scale, and in exchange adds complexity everywhere: deployment, communication, error tracking.

The honest recommendation: **start with a monolith.** Splitting later, when the pain is real, is much easier than stitching together microservices that were never needed.

### REST in two minutes

The most widespread convention for naming endpoints: plural resources, hierarchy in the path, the method names the action.

```
GET    /productos           list
POST   /productos           create
GET    /productos/42        one
PATCH  /productos/42        modify
DELETE /productos/42        delete
GET    /productos/42/reseñas   that product's reviews
```

The classic mistake is putting the verb in the path: `/crearProducto`, `/borrarProducto`. The HTTP method already says the verb.

## Tasks
- Take a project of yours and list which operations should happen on the server and why
- Design on paper the REST endpoints for a real entity: list, create, read, update and delete
- Assign the right status code to six different situations in that API
- Explain in two sentences why a price calculation in the browser can't be trusted

## Tip

The question that brings order to any API design: what happens if someone calls this endpoint directly, with whatever data they want, bypassing your UI? Everything that doesn't survive that question is in the wrong place.
