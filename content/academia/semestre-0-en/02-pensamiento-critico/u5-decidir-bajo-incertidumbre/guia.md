# Unit 5 — Deciding Under Uncertainty and Structured Methods

**Weeks 9–10 · 12 hours**

**Guiding question:** How do I decide well when I don't have all the information?

**Time per part [INFERENCE; method in `rework/profx/formatos-leccion.md` section 0.1]:** Guide approx. 20 min (about 1,600 words at 120 wpm + 5 min of quick checks) · Exercises approx. 2 h 40 min (4 level-1 × 10 min, 3 level-2 × 25 min, 1 level-3 × 45 min) · Quiz approx. 30 min · Reflection approx. 1 h 30 min. **Effective total approx. 5 h 00 min** of the 12 h planned in the syllabus. The remaining approx. 7 h 00 min is independent study: rereading, note-taking, reference reading and review.

> **Core idea.** At work you almost never decide with complete information. The question isn't "how do I eliminate uncertainty?" but "how do I decide well in spite of it?" This unit gives you tools to estimate probabilities, compare options, know how much to analyze based on how reversible the decision is, anticipate failures and learn from your decisions. At the end, it brings the whole course together into one problem-solving method.

## Learning objectives

- Express beliefs as probabilities and ranges.
- Calculate and interpret the expected value of simple options.
- Match the analysis effort to the decision's reversibility and impact.
- Apply a weighted decision matrix and a pre-mortem.
- Keep a decision log and distinguish decision quality from the outcome.
- Apply an integrated problem-solving method.

---

## 1. Thinking in probabilities

Saying "it'll definitely work" or "that won't happen" hides what you actually know. It's more useful to express your confidence as a percentage: "I think there's a 70% chance the client accepts."

Advantages:
- It forces you to think about what could go wrong (the other 30%).
- It lets the team compare opinions ("you say 70%, I say 40%: what do you know that I don't?").
- It lets you **calibrate**: if, out of everything you called at 70%, roughly 70% happens, you're well calibrated.

For quantities, use **ranges**: "the project will take between 4 and 7 weeks (with 80% confidence)" is more honest and useful than "6 weeks."

### Probability and base rate
Before estimating your particular case, start from the **base rate**: how often does this happen in general? If 3 out of every 10 proposals your agency sends are accepted, start at 30% and adjust based on what you know about the client (did they come to you? is there competition?). This counteracts representativeness and overconfidence (Unit 4).

## 2. Expected value

The **expected value (EV)** of an option is the sum of each possible outcome multiplied by its probability.

> EV = Σ (probability × value of the outcome)

### Worked example 1 — Should we write an elaborate proposal?

A request for proposals offers a $200,000 project. Preparing an elaborate proposal costs $15,000 (team hours), and you estimate a 20% chance of winning. A simple proposal costs $3,000, and you estimate 8%.

- Elaborate: EV = 0.20 × 200,000 − 15,000 = 40,000 − 15,000 = **$25,000**
- Simple: EV = 0.08 × 200,000 − 3,000 = 16,000 − 3,000 = **$13,000**
- Don't bid: EV = **$0**

The elaborate one has the higher EV. *(For simplicity, we treat $200,000 as the benefit of winning; in a real case you'd use the margin, not the revenue.)*

### Limits of expected value
- **Probabilities are estimates:** run a sensitivity analysis. At what probability does the elaborate proposal stop being worth it? Keeping the simple one at $13,000, the elaborate one wins as long as p × 200,000 − 15,000 > 13,000, that is, p > 0.14 (14%). If you're not confident you'll reach 14%, reconsider.
- **Risk of ruin matters:** an option with a high EV but a 10% chance of bankrupting the company isn't acceptable. EV describes the average over many repetitions; if you can't afford the worst case, it isn't enough.
- **Not everything is measured in money:** reputation, learning, the client relationship. For that, use the weighted matrix (section 4).

## 3. Reversibility: how much to analyze

Not every decision deserves the same analysis. In his 2015 letter to shareholders, Jeff Bezos (Amazon) distinguished:

- **Type 1 decisions (one-way doors):** irreversible or nearly so, high impact. Signing a long contract, changing your core platform, letting someone go. They deserve slow, careful analysis.
- **Type 2 decisions (two-way doors):** reversible. Testing a new headline, changing a send time, trying a tool for a month. Best to decide fast, test and correct.

The common mistake is treating every decision as Type 1 (paralysis) or every one as Type 2 (recklessness).

| | Low impact | High impact |
|---|---|---|
| **Reversible** | Decide now | Decide fast, test with a pilot |
| **Irreversible** | Decide with a brief analysis | Full analysis: EV, matrix, pre-mortem, second opinion |

**Practical tip:** many Type 1 decisions can be turned into Type 2 with a pilot, a trial period or a short contract.

## 4. Weighted decision matrix

When several criteria matter to different degrees:

1. List the options.
2. Define the criteria **before** evaluating the options (to counter confirmation bias).
3. Give each criterion a weight (adding up to 100%).
4. Score each option on each criterion (e.g., 1–5).
5. Multiply and add.
6. **Review the result critically:** if it surprises or bothers you, ask which criterion you forgot or which weight is off. The matrix organizes your thinking; it doesn't decide for you.

### Worked example 2 — Choosing a project management tool

| Criterion | Weight | Tool A | Tool B | Tool C |
|---|---|---|---|---|
| Cost | 25% | 4 | 2 | 5 |
| Ease of use | 30% | 3 | 5 | 2 |
| Required integrations | 25% | 5 | 4 | 2 |
| Support in your team's language | 20% | 2 | 4 | 3 |
| **Total** | | **3.55** | **3.80** | **2.95** |

Calculation for A: 0.25·4 + 0.30·3 + 0.25·5 + 0.20·2 = 1 + 0.9 + 1.25 + 0.4 = **3.55**. B: 0.5 + 1.5 + 1 + 0.8 = **3.80**. C: 1.25 + 0.6 + 0.5 + 0.6 = **2.95**. Always do the calculation explicitly (or in a spreadsheet): totals "by eye" are often wrong.

B narrowly beats A: a small difference → it's worth running a sensitivity analysis (does the winner change if cost weighs 35%?) or piloting both.

## 5. Pre-mortem

Proposed by Gary Klein (*Harvard Business Review*, September 2007). Before carrying out an important decision:

1. Gather the team and say: "Imagine it's six months from now and the project **failed**. Each of you, on your own, write down why it failed."
2. Each person reads out their reasons; they're all listed.
3. The most likely or most serious ones are prioritized.
4. The plan is adjusted: mitigations, warning signs, kill criteria.

It works because it gives people permission to voice doubts (which in a normal planning meeting can look like a lack of commitment), and because imagining that failure has already happened makes it easier to find concrete causes.

### Worked example 3
*Decision:* launch a monthly website maintenance service.
*Pre-mortem reasons:* price miscalculated (more hours than expected); clients who don't see the value and cancel in month three; nobody responsible for selling it; dependence on a single technical person.
*Adjustments:* measure real hours in a 3-client pilot; a monthly report showing the work done; a designated sales owner; documented processes so someone else can cover.

## 6. Decision log: separating decision from outcome

A good decision can have a bad outcome (by chance), and a bad decision a good one. Judging decisions only by their outcomes (what Annie Duke calls *resulting* in *Thinking in Bets*, 2018) teaches the wrong lessons.

A **decision log** records, at the moment of deciding:
- Date, decision and alternatives considered.
- Information available and key assumptions.
- Probabilities or expectations ("I expect 20–30 clients in 3 months; 60% confidence").
- Review criteria and a date to review it.

When you review, you ask: was the information reasonable? did the assumptions hold? was the outcome due to the decision or to chance? what would I do differently with what I knew then?

## 7. Integrated problem-solving method

This is the method you'll apply in the final project. It brings together all five units:

1. **Define (Unit 1):** separate symptoms from the problem; write the statement (current situation, desired situation, gap, impact, scope, constraints); confirm it with the stakeholder.
2. **Break down (Unit 1):** issue tree, MECE.
3. **Diagnose (Unit 2):** several falsifiable hypotheses; prioritize them; look for evidence; five whys or Ishikawa for the root cause.
4. **Reason and evaluate (Units 3–4):** review your arguments and others'; watch your biases; verify sources and AI outputs.
5. **Generate options:** at least three, including "do nothing" as a baseline.
6. **Decide (Unit 5):** classify reversibility and impact; use EV or a matrix; run a pre-mortem if it matters.
7. **Act and measure:** a plan with owners, metrics, and success and kill criteria.
8. **Review:** decision log; learn.

Not every problem needs all eight steps in the same detail: section 3 tells you how much to invest.

---

## Common mistakes

| Mistake | Fix |
|---|---|
| "Definitely" / "impossible" | Probabilities and ranges |
| Ignoring the base rate | Start from the general frequency |
| Using EV while ignoring risk of ruin | Check the worst case |
| Analyzing every decision the same way | Classify by reversibility and impact |
| Defining criteria after seeing the options | Criteria and weights first |
| Judging decisions only by their outcome | Decision log |

## Summary

Deciding well under uncertainty means expressing beliefs as probabilities, starting from the base rate, comparing options by expected value without ignoring the risk of ruin, and matching the analysis to each decision's reversibility and impact. The weighted matrix organizes multiple criteria, the pre-mortem anticipates failures, and the decision log lets you learn by separating decision quality from luck. The integrated method brings the whole course together.
