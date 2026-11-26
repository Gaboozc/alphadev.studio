# Why Measuring a Non-Deterministic System Is Different
area: AI Engineering | module: iaeng-evals — Evaluation and Observability | lesson 1
id: eval-l1 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-evals/eval-l1

## Content

## Same code, two different results

A normal back end is deterministic: the same input produces the same output, and a test that passed yesterday still passes today if you didn't touch anything. A system with models has no such guarantee — the same question can give slightly different answers on two back-to-back calls, and "it works" stops being a binary claim.

That doesn't mean it can't be measured. It means the unit of measurement isn't "pass or fail" on one case, but a **success rate across a set of cases**, reviewed with the same discipline you use on a test suite.

### The sequence that produces broken systems without anyone noticing

You tweak a prompt. You test two examples by hand. They look better than before. You deploy it. A week later, a case that worked fine no longer works, and nobody notices until a customer complains — because there was never a measurement to compare "before" and "after."

**Without evaluation there isn't engineering; there's guesswork.** And guesswork about non-deterministic systems is systematically wrong: two examples that went well say nothing about the two hundred cases you didn't test.

### What gets measured, at two levels

**By stage.** In a system with RAG and an agent, a failure can sit in retrieval, in tool choice, or in the final wording. Measuring only the final result — "did it answer well?" — mixes all three causes into one number that doesn't tell you where to intervene.

```
retrieval:   did it fetch the right document?         82%
tools:       did it pick the right one?               91%
answer:      did it answer well with what it had?     88%
end-to-end:  did the user get what they asked for?    71%
```

If retrieval hits 82%, no amount of tweaking the wording prompt will fix the 18% of cases where the system never had the right information in front of it. Breaking it down by stage turns an abstract number into a concrete task.

**Across four dimensions at once.** Quality, cost, latency and reliability. Optimizing only quality produces ultra-accurate systems that take forty seconds and cost a dollar per query — technically right, unusable in production.

### The habit that grows the measurement system on its own

Every failure that shows up in production becomes a new case in the evaluation set. It's the same reflex as writing a test when fixing a bug: it guarantees that specific failure can't sneak back in unnoticed, and over time the set stops being hypothetical and starts representing your system's real failures, not the ones you imagined while designing it.

This is the foundation the next lessons build on: what shape that set takes, how it's scored automatically, and how it turns into traces explaining why a specific case failed.

## Tasks
- Pick a system of yours and define its four measurable stages, even if you don't measure them yet
- Explain with an example of your own how a 71% overall rate can hide one stage at 40% and another at 95%
- Review the last three real failures of a system of yours: did they become eval cases or get lost?
- List all four dimensions — quality, cost, latency, reliability — for a system of yours, even with rough estimates

## Tip

If your only way to know whether a change improved the system is "try two questions and see how it looks," you don't have evaluation: you have an impression. The next two lessons are exactly how to turn that impression into a number you can compare across versions.
