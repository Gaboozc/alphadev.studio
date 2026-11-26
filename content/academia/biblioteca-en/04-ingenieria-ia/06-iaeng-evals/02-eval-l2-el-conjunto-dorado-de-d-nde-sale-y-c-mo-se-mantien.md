# The Golden Set: Where It Comes From and How to Keep It Alive
area: AI Engineering | module: iaeng-evals — Evaluation and Observability | lesson 2
id: eval-l2 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-evals/eval-l2

## Content

## It isn't a list of questions you came up with

A **golden set** is the reviewed, versioned collection of cases — with their expected result — that any change is measured against. The word "golden" isn't decorative: it means someone reviewed it and trusts that the expected result is right, not that it was auto-generated and assumed good.

A solid golden set has **four blocks**, and a set with only one of them measures a very narrow slice of reality.

### 1. A representative sample of real traffic

Cases real people actually asked, not the ones you thought up sitting down to design the system. Real questions have typos, ambiguity and ways of asking for things you'd never anticipate writing test cases from scratch.

### 2. An adversarial library

Cases designed to break the system on purpose: prompt injection, out-of-scope questions, attempts to extract the system prompt. If the security module taught how to defend against this, this block verifies the defense still holds after every change.

### 3. Deliberate edge cases

The ones you worry about even if they've never happened: empty input, the hundred-page document, the user asking in a different language. You don't wait for them to happen in production to include them.

### 4. Replays of failures that already hit production

The most valuable block and the easiest to forget. Every real incident that reached a user becomes a permanent case in the set — it's what stops the same failure from returning unnoticed.

```json
{
  "id": "ev_047",
  "entrada": "What is the return policy for sale items?",
  "esperado": "30 days, as long as original packaging is kept",
  "categoria": "devoluciones",
  "origen": "produccion",
  "bloque": "regresion",
  "fecha_incidente": "2026-08-14"
}
```

The `origen` and `bloque` fields aren't ornament: without them, over time you can't tell whether your set is skewed toward easy cases invented in an afternoon, or whether it truly reflects what happens in production.

### Starting from nothing: the last ten failures

If you don't have a set yet, the most honest starting point isn't sitting down to imagine a hundred cases — it's taking **the last ten real failures you remember** and turning them into the first ten cases in the set. Grow from there, and it grows faster than it looks: every week of production supplies fresh material without you having to invent it.

### Minimum viable size

Between 30 and 100 cases is where a set starts being useful — fewer than that, and a single noisy case swings the overall number disproportionately. You don't have to start there: start with ten and grow with every real failure, following the habit from the previous lesson.

### Include cases that MUST fail

Out-of-scope questions where the right answer is for the system to **admit it doesn't know**. A system that always tries to answer something, even made up, fails in the exact case where it mattered most not to.

### Keeping it alive, not just creating it

A golden set that never changes goes stale in months: users ask different things, the product changes, categories that mattered stop existing and others appear. Review it on the same cadence you review any other part of the system — it isn't an artifact you write once and forget.

## Tasks
- Build a set of at least 30 cases with all four blocks represented
- Turn your last five real failures — or the ones you remember — into permanent cases in the set
- Add at least three adversarial cases testing a defense from the security module
- Include two cases where the right answer is "I don't know" and verify whether your system admits it

## Tip

If your evaluation set only has cases you thought up while thinking about the system, it's missing the most important block: the ones that came from actually using it. That block is what prevents the same incident from repeating without you knowing.
