# Cost, Latency, and Detecting When the System Degrades on Its Own
area: AI Engineering | module: iaeng-evals — Evaluation and Observability | lesson 5
id: eval-l5 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-evals/eval-l5

## Content

## The math you have to do before promising anything

```
cost per task × tasks per day × 30 = monthly cost
```

A $0.04 task sounds trivial. At 500 a day that's $600 a month. If the client pays a flat $400 fee, the system loses money every month it succeeds — the more it gets used, the worse a business it is. You do this math **before** locking in the price, not after discovering the bill.

### Cutting cost without cutting quality

**Model per task.** Classifying a message's intent is done well by a small model; drafting the final report might need a more capable one. Routing by difficulty — the router pattern from the agentic-workflows lesson, applied to "which model to call" — is the optimization that saves the most for the least effort.

**Prompt caching.** When the same long context repeats across calls — system instructions, fixed documents — providers cache it at a much lower cost. In an agent resending full history on every turn of the loop, this changes the order of magnitude of the bill, not just a percentage.

**Prune context.** Summarize old turns instead of dragging everything along — the technique from the fundamentals memory lesson, motivated here by cost as well.

**Fewer turns of the loop.** Every step is a full call. Better-described tools reduce the steps needed to finish a task, and that cuts cost more than almost any other one-off tweak.

**Don't call the model.** The most effective optimization of all: response caching for repeated questions, code rules for trivial cases, validations before invoking anything.

### Latency: what gets felt, not just what gets measured

A five-step workflow with a large model on each step is easily thirty seconds, and that feels broken even if it's technically working.

**Stream the response** as soon as it starts generating, instead of waiting for the whole thing. **Show progress** — "Checking inventory…" — doesn't cut actual wait time, but completely changes how it feels. **Answer easy things fast**: if a code rule handles the case, do it instantly and save the slow path for what actually needs it.

### Watch the percentile, not the average

```
average latency: 3.2s
p95 latency:     41s
```

A 3-second average is compatible with one in twenty users waiting 41. That 5% is the one that bounces and complains, and the average hides it completely. The **95th percentile** makes the worst typical experience visible, which is what actually determines whether the system feels reliable.

### A system can degrade without anyone touching anything

The provider updates the model behind the same version string you call. Users start asking different questions than the system was designed to answer. Indexed documents go stale. None of these three requires a change from you, and all three degrade the system just the same.

That's why the evaluation from previous lessons runs **periodically**, not only when you deploy something new. A sustained drop in success rate between weekly runs, with nobody having changed code, is the drift signal — and you only catch it if you're measuring continuously, not only reactively.

### Alerts that actually warn you of something

```
daily cost > budget             → alert
failure rate > threshold        → alert
p95 latency > threshold         → alert
human escalations rising        → check what changed upstream
```

Each of these four signals, seen alone, can be noise. Seen together and continuously, they're the difference between finding out the system degraded from an angry customer, or from your own dashboard an hour after it started.

## Tasks
- Calculate your system's monthly cost at the volume a client would expect, and compare it with what you'd charge
- Enable prompt caching for your agent's fixed context and measure the difference on the bill
- Record latency for twenty real runs and compute the 95th percentile, not just the average
- Define all four alerts from this lesson for a system of yours with concrete thresholds, even if you don't wire them up yet

## Tip

Run your evaluation set once a week even when you haven't changed anything, not just when you deploy. A system can degrade on its own — the provider updates the model, users ask different things — and the only way to notice before a customer does is continuous measurement.
