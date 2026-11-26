# The OWASP Top 10: What Holds Everything Else Up
area: AI Engineering | module: iaeng-4 — AI Application Security | lesson 5
id: ie4-l3c | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-4/ie4-l3c

## Content

## It isn't one expert's opinion

The OWASP Top 10 isn't a list of things that sound scary. It's built from data across hundreds of thousands of real applications, and its uncomfortable message is that the most common way to break an app is also the most boring: someone reached something that never belonged to them, almost always by changing a number in a URL.

Everything earlier in this module covers threats that **didn't exist before models**. This catalog covers the ones that existed before and that an AI system doesn't eliminate — the back end serving your agent, the admin panel, the API your tools call underneath are still ordinary software with the same old bugs.

### Broken access control

The most common of the ten, and the simplest to explain: the app **trusts that the user won't ask for something that isn't theirs**, instead of checking.

```python
# Bad: anyone with a session can view anyone's order
@router.get("/pedidos/{pedido_id}")
def ver_pedido(pedido_id: int, usuario: Usuario = Depends(usuario_actual)):
    return db.pedido(pedido_id)

# Good: verify the order belongs to the requester
@router.get("/pedidos/{pedido_id}")
def ver_pedido(pedido_id: int, usuario: Usuario = Depends(usuario_actual)):
    pedido = db.pedido(pedido_id)
    if pedido.usuario_id != usuario.id:
        raise HTTPException(403)
    return pedido
```

This is an **IDOR** — insecure direct object reference — and it's the exact same bug you saw with an agent's `thread_id`: if an identifier is accepted without checking against the session, anyone who guesses or enumerates it accesses someone else's data. In an agentic system, this extends to **every tool**: a tool looking up an order needs the same check as the equivalent REST endpoint, because for security purposes a tool **is** an endpoint.

### Security misconfiguration

Defaults nobody changed: an admin panel reachable without its own password, error messages showing a full stack trace in production, sample services left running. The defense is treating configuration **as code**: versioned, reviewed, and with a known state in every environment, not tweaked by hand on the server and forgotten.

### Supply chain failures

Your project probably already follows this rule without calling it that: **lockfile always committed**, exact versions instead of ranges, auditing before installing a new dependency. That's supply chain security, and it applies equally to an npm package and to a model downloaded from a public repository — same question: where did this come from, and what guarantees it's what it claims to be?

### Cryptographic failures

The classic mistake: storing passwords with a fast hash — built for speed, not brute-force resistance — instead of one built for passwords (bcrypt, argon2). And the simplest one of all: sending sensitive data over HTTP instead of HTTPS, where anyone on the same network reads it in plain text.

### Injection

SQL, system commands, XSS: untrusted input interpreted as code. The timeless defense — **parameterized queries**, never concatenating strings into SQL, escaping before inserting into HTML. If you already read the cost-abuse lesson, this is the same problem applied to model output: untrusted content reaching a query or a terminal is injection, whether it comes from a form or from a language model.

### Insecure design

A design flaw exists **before a single line of code is written** — it isn't a bug, it's an architectural choice that never considered the malicious case. **Threat modeling** is the practice of asking, before building, "what happens if someone using this wants to do harm?" For an agentic system, the specific question is the one you already saw in the agents module: *if an attacker completely controlled what the model decides, what's the worst they could do with the tools it has?*

### Authentication failures

Account enumeration (an error message revealing whether an email exists), no attempt limits, missing MFA on sensitive accounts. The rule you already applied in the site's auth module: **one single error message for bad credentials**, so the form can't be used to probe which emails are registered.

### Logging and alerting failures

Without logs, a successful attack gets discovered by a customer, not by you. Log what matters — failed login attempts, permission changes, authorization errors — and **never** plaintext sensitive data inside the log itself: a logs table with passwords or card numbers is a second database to protect, and almost never gets the same attention as the first.

### Mishandling exceptional conditions

An error must **fail closed (deny by default)**, not let traffic through. A bug in a permission check that, through a misplaced `try/except`, ends up allowing access instead of blocking it is a **fail-open**, and it's one of the hardest bugs to spot in code review because the normal path works fine. And the error message must never reveal more than the user needs: "invalid credentials" yes; the full exception trace with table names, no.

### Auditing your own work

The Top 10 isn't a list to read once. It's a list to check **periodically** against any system you maintain, with the same discipline you use to run evaluation from the evals and observability module: not because something changed, but because the entire system can degrade without anyone touching a thing.

## Tasks
- Find an endpoint in your API that takes an id and checks it exists, but not that it belongs to the requester
- Review your production error messages and verify none exposes a full stack trace
- Apply threat modeling to one tool in your agent: what's the worst it would do under total control
- Audit your logs and confirm no sensitive data is stored in plain text

## Tip

Most of these categories aren't exotic: they're the absence of a check someone took for granted. Before calling a system secure, ask for every endpoint and every tool: "what happens if someone requests this without having a right to it?" — and verify the answer is "they're denied," not "it works anyway."
