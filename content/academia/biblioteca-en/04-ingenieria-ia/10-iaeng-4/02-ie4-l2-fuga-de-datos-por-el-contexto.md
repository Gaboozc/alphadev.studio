# Data Leakage Through Context
area: AI Engineering | module: iaeng-4 — AI Application Security | lesson 2
id: ie4-l2 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-4/ie4-l2

## Content

## Everything you put in the prompt leaves your servers

When you call a model API, the entire contents of the prompt leave your infrastructure. That includes whatever you dropped into context without thinking: document chunks, database rows, conversation history.

### The three common leaks

**Too much context.** You pull the entire document when a chunk was enough, or every column of a row when only the name was needed. Every extra piece of data is exposed surface with zero gain.

**Error messages that talk too much.** An error returning the full SQL query or server stack trace teaches an attacker how your system is built. Generic message to the user, details only in the log.

**Indiscriminate logs.** Saving the full prompt of every call for debugging means duplicating personal data in your tracing system, probably without the same care as in your database. Anonymize before logging, or log references instead of content.

### Cross-user leakage

The gravest and easiest mistake to make: one user's context ending up in another user's answer.

**Poorly segmented cache.** If you cache by question rather than by user, two people asking the same thing get the same answer, built from the first person's documents.

```python
# Bad
clave = hash(pregunta)

# Good
clave = hash((usuario_id, pregunta))
```

**Search without permission filtering.** Vector search returns the closest chunks, knowing nothing about who is allowed to see them. If you index every client's documents in the same table, a query can pull someone else's contract.

```sql
-- The permission filter goes inside the query, not after
SELECT contenido FROM documentos
WHERE cliente_id = :cliente_actual
ORDER BY embedding <=> :consulta
LIMIT 5;
```

Filtering **after** retrieval is too late: the data already left the database and can end up in a log or trace. And with Row Level Security enabled, the database blocks it even if code forgets.

**Shared history.** A conversation object reused across requests due to a global-state bug mixes contexts. It happens more in persistent-server environments than in stateless functions.

### Minimize before sending

**Anonymize.** Replace names, emails and phone numbers with identifiers before sending text, and swap them back when the answer comes back. The model almost never needs the real value to do its job.

**Trim.** Send the chunk, not the document.

**Keep out what must never leave.** Some fields simply don't go into context: passwords, tokens, card numbers, government IDs. Make that an explicit list in code, not a judgment call by whoever writes each query.

### What the provider does with the data

Verify it in writing, not from what you remember off a webpage: whether it's used for training, how long it's retained, which region it's processed in, and whether they offer a data processing agreement. On enterprise plans the answer is usually favorable, but it's a contractual fact and your client can ask for it.

### The minimum check before launching

Log in as two different users and ask each one for the other's information. If the system answers anything that user shouldn't see, it doesn't matter how well everything else works.

## Tasks
- Audit what data actually goes into your context and remove everything unnecessary
- Verify your cache is segmented by user, not just by question
- Move the permission filter inside the vector query and verify with two users
- Implement PII anonymization before sending to the model

## Tip

The two-user test is one of the highest-return tests there is: two accounts, fifteen minutes, and it catches the kind of failure that ruins a contract. Run it before every launch, not just the first time.
