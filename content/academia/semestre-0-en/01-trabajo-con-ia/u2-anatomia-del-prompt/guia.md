# Unit 2 — Anatomy of a Professional Prompt

**Weeks 3–4 · 12 hours · Replaces:** ia1-l1 (the sections "the model reads your prompt…" and "the problem with generic prompts"), ia1-l1b, prodai-1-1 (prompt anatomy and uses)

**Guiding question:** What does a prompt need to say so the AI doesn't have to guess what you need?

**Estimated time:** Guide approx. 25 min (about 2,200 words at 120 wpm + 5 min of quick checks) · Exercises approx. 3 h 15 min (3 level-1 × 10 min, 3 level-2 × 25 min, 2 level-3 × 45 min) · Quiz approx. 30 min · Reflection approx. 1 h 30 min. **Active time approx. 5 h 40 min** of the 12 h planned in the syllabus. The remaining approx. 6 h 20 min is independent study: rereading, notes, reference readings and review.

> **Core idea.** In Unit 1 you saw that the model continues the text you give it and that, faced with vague text, it picks "average" continuations. A professional prompt is simply a starting text that leaves very little room for the average: it says who's speaking, to whom, what's needed, within which limits and in what form. This unit gives you a structure to do that every time, and a method to improve a prompt when the result isn't convincing.

## Unit objectives

- Identify and write the seven components of a professional prompt.
- Explain what each component contributes, in terms of how the model works.
- Apply a controlled iteration method (one change at a time) and document results.
- Evaluate an answer with explicit criteria before accepting it.

---

## 1. Why a short prompt usually gives a mediocre result

Compare two requests:

> **A.** "Write some copy for my software company's website."

> **B.** "You're a copywriter who specializes in B2B software companies. Write the main copy (headline and subheadline) for the homepage of Stockly, an app that lets restaurants track their inventory from their phone. Audience: restaurant owners aged 35 to 55, non-technical, tired of keeping inventory on paper. Goal of the page: get them to request a free demo. Tone: friendly and direct. Limits: headline of 8 words max and subheadline of 15 words max; no jargon; talk about the outcome (time saved and less waste), not the technology. Give me 5 options in the format `Headline | Subheadline`."

With A, the model has to guess almost everything: which company, which product, for whom, how long, what tone. Faced with that much uncertainty, the most likely continuation is generic copy ("Innovative solutions for your business"), because that's what shows up most in this kind of text. With B, every sentence rules out options and concentrates the probability on what you need.

That doesn't mean long prompts are better because they're long. A confusing 300-word prompt is worse than a clear 60-word one. The length comes from **including the necessary information**, not from padding.

## 2. The seven components

This structure unifies the versions that appeared in two lessons of the original material (one with five elements and one with six). Not every prompt needs all seven, but running through them keeps you from forgetting what matters.

### 2.1 Role — who's "speaking"

You say what perspective it should answer from: "You're the editor of a business magazine," "Act as a high school math teacher."

**What it really contributes.** The role steers vocabulary, level of detail, tone and what the answer prioritizes, because it activates the patterns of texts written from that perspective. **What it doesn't do** is give the model knowledge it doesn't have: "You're a lawyer with 20 years of experience" doesn't turn a legal answer into reliable advice. The original material claimed that "the model adopts the role's knowledge"; it's more accurate to say it adopts the *style and approach*.

**Good practice:** a specific role that's useful for the task ("a contract reviewer looking for ambiguous clauses") beats a grandiose one ("the world's top expert").

### 2.2 Context — the situation

What the model needs to know so it doesn't have to guess: who you are, what the project is, what's already been done, what real-world constraints exist. "I work at a small agency; the client is a neighborhood bakery that opened a year ago and sells mostly through Instagram messages."

**Typical mistake:** assuming the model knows things only you know ("the usual client," "like last time").

### 2.3 Task — what needs to be produced

A concrete verb and a clear deliverable: "Write," "Classify," "Summarize in," "Compare," "Find errors in." Avoid vague verbs like "help me with" or "look at this."

If the task has several parts, list them. If they're very different from each other, consider splitting them into separate prompts (U3).

### 2.4 Audience — who the result is for

Explaining a concept to a CFO isn't the same as explaining it to a 15-year-old. Describing the audience (approximate age, knowledge level, what they care about, what they already know) changes the vocabulary, the examples and the depth.

### 2.5 Goal or purpose — what it's for

What should happen after someone reads the result? Should they request a demo, understand a risk, approve a budget? An explicit goal helps the model decide what to include and what to leave out.

### 2.6 Constraints — the limits

Length ("120 words max"), what to avoid ("no jargon," "don't make up data"), what's required ("mention the price"), style ("short sentences," "plain US English," "no British spellings").

**Two tips:**
- Prefer saying **what to do** over only what not to do. "Use sentences under 20 words" works better than "don't write long sentences."
- Specific bans do help when there are clichés you want to get rid of: "Don't use the phrases *innovative solutions* or *digital transformation*."

### 2.7 Output format — how to deliver it

List, table, JSON, number of options, headings, separator. "Give me 5 options in the format `Headline | Subheadline`," "Answer with a three-column table: risk, likelihood, mitigation."

Format isn't a cosmetic detail: it makes it easier to compare, copy into another tool and automatically check whether the answer meets the requirements.

### And an eighth, optional but powerful: examples

Showing one or more examples of the result you want is often what improves quality the most. You'll study it in depth in U3 (the *few-shot* technique). For now, just remember it exists.

### Working template

```
ROLE: You're [specific perspective].
CONTEXT: [situation, project, relevant background].
TASK: [verb + deliverable; if there are parts, list them].
AUDIENCE: [who'll read it, what they know, what they care about].
GOAL: [what should happen next].
CONSTRAINTS: [length, tone, required, banned].
FORMAT: [exact structure of the answer].
(EXAMPLES: [one or more examples of the desired result].)
```

You don't need to write the labels in capitals; you can write it as prose. But while you're learning, using them forces you not to forget anything.

## 3. Worked example 1 — Building a prompt step by step

*Need:* a small agency wants an email to win back customers who haven't bought anything in six months from an online plant shop.

**Step 0 — Initial prompt (the way almost everyone would write it):**
"Write an email for customers who haven't bought in a while."

**Step 1 — Role.** Who'd write this well? Someone who specializes in e-commerce email.
"You're an email marketing specialist for small online stores."

**Step 2 — Context.** What does it need to know?
"The store is Rootbound; it sells houseplants in Austin with home delivery. It has about 2,000 customers; 400 haven't bought anything in more than six months."

**Step 3 — Task.**
"Write a win-back email for those 400 customers."

**Step 4 — Audience.**
"They're people aged 25 to 45 who bought one or two plants; many bought them as gifts."

**Step 5 — Goal.**
"Get them to visit the store again and use a 15% coupon valid for 10 days."

**Step 6 — Constraints.**
"Warm tone, no pressure. Body of 120 words max. Mention the coupon COMEBACK15 and the deadline. Don't use more than one exclamation point. Don't make up testimonials."

**Step 7 — Format.**
"Deliver: 3 subject line options (45 characters max), one preview line and the body of the email."

**Final prompt (as prose):**

> You're an email marketing specialist for small online stores. The store is Rootbound; it sells houseplants in Austin with home delivery, and of its 2,000 customers, 400 haven't bought anything in more than six months. Write a win-back email for them. They're people aged 25 to 45 who bought one or two plants, often as gifts. The goal is to get them back to the store using the coupon COMEBACK15 (15% off, valid for 10 days). Warm tone with no pressure, a body of 120 words max, one exclamation point at most and no made-up testimonials. Deliver 3 subject line options (45 characters max), one preview line and the body.

Notice that each step answered a question the model would otherwise have answered at random.

## 4. Iterating with a method: one change at a time

The first prompt is rarely the final one. The difference between an amateur and a professional is **how** they improve it: the amateur changes five things at once and doesn't know which one worked; the professional changes one, looks at the result and takes notes.

### The iteration cycle

1. **Define what "good" means** before looking at the result (see section 5). Otherwise you'll judge by impression.
2. **Run** the prompt and save the answer.
3. **Diagnose** the main problem: missing information? Wrong tone? Format? Length?
4. **Change just one thing** that targets that problem.
5. **Run it again**, compare and note the result.
6. Repeat until it meets the criteria. If it doesn't improve after several rounds, rethink the task (it may need to be split).

### Quick diagnosis table

| Symptom in the answer | Component that's probably missing or failing |
|---|---|
| Generic copy that could fit any company | Context |
| Wrong tone (too formal, too salesy) | Role, audience or tone constraints |
| Too long or too short | Length constraints |
| Hard to use or compare | Output format |
| Includes irrelevant things | Unclear goal |
| Made-up data | Missing "don't make things up" + the data wasn't provided |
| Correct but without the "voice" you're after | Examples (U3) |

### Worked example 2 — A documented iteration

| Version | Change | Observed result |
|---|---|---|
| v1 | One-line initial prompt | A generic 250-word email, with three exclamation points and a made-up 20% discount |
| v2 | + context (store, customers, real coupon) | Now mentions COMEBACK15, but still long and salesy |
| v3 | + 120-word limit and no-pressure tone | Right length, better tone; subject lines of 60–70 characters |
| v4 | + format with a 45-character limit on subject lines | Meets all the criteria |

This table is exactly what's asked for in the exercises and the project: **evidence** of which change produced which effect.

## 5. Evaluating an answer before accepting it

"I like it" isn't a criterion. Before running the prompt, write three to five verifiable criteria. For the Rootbound email:

1. Does it mention the right coupon and the deadline? (yes/no)
2. Body ≤ 120 words? (countable)
3. Subject lines ≤ 45 characters? (countable)
4. Zero made-up data? (checkable against the brief)
5. Warm tone, no pressure? (human judgment; define what it means: no fake urgency, no all caps, no "last chance!")

Criteria 1–4 can be checked almost mechanically; 5 requires judgment. This distinction between what's **verifiable** and what needs **judgment** comes back throughout the semester (and in how this course is graded).

## 6. Professional uses where this structure pays off most

The original material listed five common uses at agencies. They're still good examples of where to apply the full anatomy:

1. **First draft.** From the brief to several options to choose from and refine. AI gives you breadth; you bring judgment.
2. **Audience research.** "What are the most common objections of [type of client] when considering [service]?" Useful for brainstorming; **not** as market data: validate it with real customers.
3. **Critical review.** "Review this sales email the way a marketing director who gets 50 pitches a week would read it: what would make her reply, and what would make her ignore it?"
4. **Idea generation.** "Give me 20 content ideas for…". Ask for quantity, then filter.
5. **Translating the technical into the understandable.** "Explain this technical description to a non-technical business owner in 100 words."

The time-savings figures in the original material ("from 2 hours to 20 minutes") were illustrative, not measured. In U4 you'll learn to measure your own savings.

---

## Common mistakes

| Mistake | Example | Fix |
|---|---|---|
| A grandiose role with no clear task | "You're the best marketer in the world, help me" | Specific role + verb + deliverable |
| Implicit context | "Do it like the one for the last client" | Paste or describe the example |
| Only negative constraints | "Don't make it long, don't be formal" | "100 words max, conversational tone" |
| Changing many things at once | Rewriting the whole prompt after each try | One change per iteration, documented |
| Evaluating by gut feeling | "I like this one better" | Criteria written before running it |
| Trusting that the role adds knowledge | "As a doctor, what should I take?" | The role changes style; it doesn't guarantee accuracy |

## Summary

A professional prompt reduces the model's uncertainty with seven components: role, context, task, audience, goal, constraints and format (plus examples when needed). You improve it by iterating one change at a time and documenting the effect, and you evaluate it with criteria written before running it, separating what's verifiable from what requires judgment.
