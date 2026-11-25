# Unit 2 — Root Causes, Hypotheses and Evidence

**Weeks 3–4 · 12 hours**

**Guiding question:** Why is the problem happening, and what evidence separates the cause from a mere coincidence?

**Time per part [INFERENCE; method in `rework/profx/formatos-leccion.md` section 0.1]:** Guide approx. 20 min (about 1,500 words at 120 wpm + 5 min of quick checks) · Exercises approx. 3 h 15 min (3 level-1 × 10 min, 3 level-2 × 25 min, 2 level-3 × 45 min) · Quiz approx. 30 min · Reflection approx. 1 h 30 min. **Effective total approx. 5 h 35 min** of the 12 h planned in the syllabus. The remaining approx. 6 h 25 min is independent study: rereading, note-taking, reference reading and review.

> **Core idea.** Once the problem is well defined (Unit 1), the question is *why it's happening*. The temptation is to settle for the first explanation that sounds right. This unit teaches you to generate several explanations, frame them as hypotheses that can be disproved, look for the root cause rather than the surface one, and tell what truly causes something apart from what merely coincides with it.

## Learning objectives

- Write testable hypotheses and design the test that could disprove them.
- Apply the five whys and the Ishikawa diagram.
- Distinguish correlation from causation and identify confounding variables.
- Design simple checks (comparisons, A/B tests, controlled reproduction).
- Evaluate the quality of the available evidence.

---

## 1. From hunch to hypothesis

A **hypothesis** is a provisional explanation that could turn out to be false. What sets it apart from an opinion is that you can say **what you'd observe if it were false**.

- "The campaign isn't working because the audience doesn't connect with the brand." → What would you observe if it were false? Hard to say. That's a belief, not a hypothesis.
- "The campaign is underperforming because since day 12 the ads have been shown mostly to people over 55, who convert less." → If it were false, the age distribution wouldn't have changed on day 12, or conversion by age would be similar. **Testable.**

### Rules for good hypotheses

1. **Specific:** it names the mechanism and, if possible, the timing.
2. **Falsifiable:** there's a data point that would contradict it.
3. **Several at once:** generate at least three hypotheses before investigating any of them. If you only have one, you'll look for supporting evidence and miss the alternatives (you'll meet this bias in Unit 4).
4. **Prioritized:** start with the one that's most likely *and* cheapest to test.

### Worked example 1 — Generating and prioritizing hypotheses

*Problem (Unit 1):* "The site's conversion rate has fallen from 2.1% to 1.4% since October 3."

| # | Hypothesis | What would disprove it | Cost to test | Estimated likelihood |
|---|---|---|---|---|
| H1 | A technical error in checkout since the October 3 update | Checkout error-free on every browser | Low (check logs and test) | High (the date matches) |
| H2 | Shipping costs went up | Costs unchanged | Low | Medium |
| H3 | Traffic quality changed (more low-intent visits) | Same conversion by channel | Medium | Medium |
| H4 | A competitor launched an aggressive offer | No change in the competition | Medium | Low |

Start with H1 and H2: likely and cheap.

## 2. Five whys: going down from the symptom to the root

The **five whys** technique is attributed to Sakichi Toyoda, founder of Toyota Industries, and was popularized by Taiichi Ohno as part of the Toyota Production System. It consists of asking "why?" repeatedly until you reach a cause you can act on in a lasting way. "Five" is a guideline: sometimes three are enough, sometimes you need seven.

### Worked example 2 — A site goes down

1. **Why did the client's site go down on Friday?** Because the server ran out of disk space.
2. **Why did it run out of space?** Because the log files grew without limit.
3. **Why did they grow without limit?** Because log rotation wasn't configured on the new server.
4. **Why wasn't it configured?** Because the server was set up by hand and that step wasn't on any checklist.
5. **Why was it set up by hand without a checklist?** Because there's no documented procedure for creating servers.

*Root cause:* no documented procedure. *Lasting action:* a checklist (or automation) for creating servers that includes log rotation. Freeing up space fixes this Friday; the procedure prevents the next one.

### Mistakes when using the five whys

- **Stopping at a person:** "Why wasn't it configured? Because Sam forgot." People forget; the useful question is why the system allowed a slip to cause an outage.
- **A single chain:** real problems usually have several causes. If a step has two answers, open two branches.
- **Making up answers:** every "because" must be backed by evidence, not assumption.

## 3. The Ishikawa diagram: seeing every possible cause

The **Ishikawa diagram** (or "fishbone" diagram), associated with the Japanese quality expert Kaoru Ishikawa, organizes the possible causes of an effect into categories. Manufacturing uses the "6 Ms" (machines, methods, materials, manpower, measurement, mother nature/environment). In digital work, categories like these work better:

- **People:** skills, workload, communication.
- **Processes:** steps, approvals, documentation.
- **Tools/technology:** software, servers, integrations.
- **Data/information:** quality, availability, measurement.
- **Client/environment:** client changes, market, season, external platforms.

### Worked example 3 — "Web projects are delivered with bugs"

```
People ───────────┐  Processes ────────┐  Tools ────────────┐
 no dedicated QA  │   testing at the end│   no automated     │
 end-of-project   │   no checklist      │   tests            │
 rush             │                     │   mismatched envs  │
                  ▼                     ▼                    ▼
 ──────────────────────────────────────────────────────► BUGS AT DELIVERY
                  ▲                     ▲
 Data ────────────┘  Client/environment ┘
  content arrives    scope changes in
  late               the final week
```

The diagram doesn't tell you which cause it is: it **generates organized hypotheses**. Then you test each one with data (for example, how many bugs showed up in content that arrived in the final week?).

## 4. Correlation is not causation

Two things that vary together (**correlation**) don't mean one causes the other (**causation**). When A and B show up together, there are four possible explanations:

1. **A causes B.**
2. **B causes A** (reverse causation). "Customers who use more app features renew more; let's get everyone to use more features." Maybe it's the other way around: people who already planned to renew explore more.
3. **A third variable C causes both** (a confounding variable). "The months with the most social posts are the months with the most sales." Maybe December causes both: more campaigns and more holiday shopping.
4. **Chance.** With enough data, coincidences always show up.

### How to get closer to causation

- **Plausible mechanism:** is there an explanation of *how* A would produce B?
- **Time order:** the cause has to happen before the effect.
- **Compare with a similar group without the cause:** what happened where A didn't occur?
- **Controlled experiment:** deliberately change A in one group and not in another, assigning at random, and compare B. That's the idea behind **A/B tests**.
- **Reproduce:** if you suspect a technical error, try to trigger it on purpose.

### Worked example 4 — "The new design increased sales"

A new design launched on November 1, and November sales rose 18%.
- *Mechanism?* Plausible (a clearer checkout process).
- *Confounding?* November includes the deals season (Black Friday and Cyber Monday). Sales the previous November also rose 15% over October.
- *Comparison:* the "extra" increase attributable to the design might be about 3 points, not 18, and even that is uncertain.
- *Better test design:* show the new design to half of the visits (assigned at random) and the old one to the other half over the same period.

## 5. Quality of evidence

Not all evidence is worth the same. A practical hierarchy for digital work (from strongest to weakest):

1. **Controlled experiment** with random assignment and a sufficient sample.
2. **Comparison with a similar group** without random assignment (before/after with a control group).
3. **Behavioral data** (analytics, logs) without comparison.
4. **Self-reported data** (surveys, interviews): useful for understanding *why*, unreliable for measuring *how much*.
5. **Anecdotes and opinions** ("a client told me…," "I think…").

Anecdotes aren't useless: they help you **generate** hypotheses. What they shouldn't do is **confirm** them.

### Questions for evaluating a data point

- How many cases are there? (A 50% improvement on 6 visits means nothing.)
- How was it measured? Did the way of measuring change during the period? (A change in analytics settings can create "drops" that don't exist.)
- Compared to what?
- Who produced it, and what's their interest?

---

## Common mistakes

| Mistake | Fix |
|---|---|
| Settling for the first explanation | Generate at least three hypotheses |
| Unfalsifiable hypotheses | Write down what data would contradict it |
| Five whys that end in "it was X's fault" | Ask what allowed the error |
| Mistaking timing coincidence for cause | Look for confounders, compare, experiment |
| Concluding from small samples | Ask for more data or state the uncertainty |
| Anecdotes as proof | Use them only to generate hypotheses |

## Summary

You look for causes with specific, falsifiable hypotheses, several at once, prioritized by likelihood and cost. The five whys take you from the symptom down to a cause you can act on for good; Ishikawa helps you not forget whole categories of causes. Correlation is not causation: look for a mechanism, time order, comparisons and, if you can, experiments. And judge evidence by its quality, not by how convincing it sounds.
