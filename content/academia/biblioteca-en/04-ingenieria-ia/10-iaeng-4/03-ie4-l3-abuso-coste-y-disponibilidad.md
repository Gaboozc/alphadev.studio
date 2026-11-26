# Abuse, Cost, and Availability
area: AI Engineering | module: iaeng-4 — AI Application Security | lesson 3
id: ie4-l3 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-4/ie4-l3

## Content

## A vulnerability that arrives as an invoice

In a normal app, an attacker making tons of requests consumes your CPU. In one with models, **they consume your budget**, and they do it fast.

An unlimited public endpoint is an open invitation: every call costs you real money, and the person abusing it pays nothing.

### Cost defenses

**Per-user and per-IP rate limits.** Requests per minute and per day. That comes first.

**Per-request token limit.** Bound both input and output. With no input cap, someone pastes an entire book into the form.

```python
if contar_tokens(entrada) > MAX_ENTRADA:
  raise HTTPException(429, "Query is too long")
```

**Daily budget with a hard cutoff.** Not an alert: a cutoff. Once exceeded, the system stops calling the model and replies with a service-unavailable message.

**Auth before the model.** Make sure the session check runs before spending a single token. An unauthenticated AI endpoint open to the public is the most expensive configuration that exists.

**Caching.** Repeated questions shouldn't cost twice, always segmented by user.

### Denial of service by context

Beyond spend, there's an availability attack: deliberately expensive requests — huge contexts, tasks triggering many agent turns — that saturate your provider rate limits and knock legitimate users offline.

The defenses: input cap, agent step cap, max time per task, and a priority queue if volume warrants it.

### Knowledge poisoning

If your system indexes content others can write — an internal wiki, comments, uploaded docs — someone can intentionally plant false info so the assistant repeats it with the authority of the system.

Mitigate by controlling which sources enter the index, recording who uploaded each document, and always citing the source so the user can judge it.

### Output is attack surface too

What the model returns goes somewhere, and it can do damage there:

- **To a webpage**: if you insert it as unescaped HTML, it's cross-site scripting. Always escape; treat it like user input.
- **To a query**: if the model generates SQL and you run it raw, it's SQL injection with extra steps. Use parameters or validate against an allowlist of allowed operations.
- **To a terminal**: executing model-generated commands unrestricted is remote code execution with extra steps.

**Model output is untrusted content.** Validate it just like what a user types.

### The minimum checklist before exposing a system to the public

```
[ ] Authentication before any model call
[ ] Rate limit per user and per IP address
[ ] Input and output token caps
[ ] Daily budget that cuts off, not one that only alerts
[ ] External content delimited and marked as untrusted
[ ] Tools with the minimum privilege needed
[ ] Human confirmation for every irreversible action
[ ] Permission filter inside the query, not after
[ ] Cache segmented by user
[ ] Model output escaped before rendering
[ ] Logs free of plaintext personal data
[ ] Two-user test executed and passed
```

## Tasks
- Add request and token limits to your endpoint and verify them by exceeding them
- Implement a daily budget with a real cutoff and trigger it
- Render escaped model output and test a response containing HTML tags
- Walk through the entire checklist on a system of yours and note what's missing

## Tip

An AI endpoint without authentication or limits is the only vulnerability that arrives in your inbox from the provider as a bill. Put them in before exposing anything, even an internal demo: URLs get shared.
