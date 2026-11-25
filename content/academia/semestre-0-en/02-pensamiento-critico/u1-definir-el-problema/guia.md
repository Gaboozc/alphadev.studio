# Unit 1 — Defining the Problem Well

**Weeks 1–2 · 12 hours**

**Guiding question:** What problem am I really solving, and how will I know I've solved it?

**Time per part [INFERENCE; method in `rework/profx/formatos-leccion.md` section 0.1]:** Guide approx. 20 min (about 1,580 words at 120 wpm + 5 min of quick checks) · Exercises approx. 3 h 15 min (3 level-1 × 10 min, 3 level-2 × 25 min, 2 level-3 × 45 min) · Quiz approx. 30 min · Reflection approx. 1 h 30 min. **Effective total approx. 5 h 35 min** of the 12 h planned in the syllabus. The remaining approx. 6 h 25 min is independent study: rereading, note-taking, reference reading and review.

> **Why start here.** Most efforts that fail don't fail because of a bad solution; they fail because they solved the wrong problem. A team that spends two weeks redesigning a page because "sales dropped," and then discovers the real issue was a broken payment gateway, didn't have a design problem: it had a definition problem. This unit teaches you not to jump to the solution.

## Learning objectives

- Tell apart symptom, problem, cause and solution.
- Write a complete, testable problem statement.
- Ask the questions that clarify an ambiguous request.
- Break a problem into manageable parts with no gaps and no overlaps.
- Apply Pólya's four-step method to work problems.

---

## 1. Four words people mix up: symptom, problem, cause, solution

Consider this message from a client to an agency: *"We need a TikTok campaign because sales dropped."*

That one sentence mixes three things:

- **Symptom:** "sales dropped." It's what you observe. It's real, but it explains nothing.
- **Proposed solution:** "a TikTok campaign." It's an answer someone has already chosen.
- **The real problem and its cause:** missing. Did traffic drop? Did conversion drop? Did prices go up? Did a competitor show up? Did something break technically?

Working definitions for this course:

| Term | Definition | Example |
|---|---|---|
| **Symptom** | An observable sign that something isn't going as expected | "October sales are 25% lower than September's" |
| **Problem** | A gap between the current situation and the desired one, in something that matters | "The site's conversion rate fell from 2.1% to 1.4%, and we need to get back to at least 2%" |
| **Cause** | What produces the gap | "The checkout form has failed on Safari since the October 3 update" |
| **Solution** | An action that removes or reduces the cause | "Fix the form's compatibility and test it on the main browsers" |

**The premature-solution trap.** When someone brings you a solution ("we need an app," "we have to redesign the logo," "let's hire someone else"), the professional question isn't "how do we build it?" but "what problem would that solve, and how do we know that's the problem?" It isn't distrust: it's your job. Often the proposed solution is right; other times it only treats a symptom.

## 2. The problem statement

A good statement turns a vague complaint into something you can work on. Use this structure:

1. **Current situation (with data):** what is happening, measured.
2. **Desired situation (with data):** what should be happening.
3. **Impact:** why it matters (money, time, customers, risk).
4. **Scope:** what is in and what is out.
5. **Constraints:** budget, deadlines, technology, regulations.
6. **Success criterion:** how we'll know it's solved.

### Worked example 1 — From complaint to statement

*Original complaint:* "The website is painfully slow, customers are complaining."

*Step 1 — Measure the current situation.* A performance-measurement tool shows the product page takes about 6 seconds to display its main content on mobile; on desktop, 2 seconds.
*Step 2 — Desired situation.* The team agrees on a target: under 2.5 seconds on mobile.
*Step 3 — Impact.* 70% of traffic is mobile; the mobile bounce rate is twice the desktop rate.
*Step 4 — Scope.* Product and category pages only; the blog is out of scope.
*Step 5 — Constraints.* Two weeks, without switching e-commerce platforms.
*Step 6 — Success criterion.* Main-content load time < 2.5 s on mobile at the 75th percentile of real visits, measured over 14 days.

*Final statement:* "Product and category pages take about 6 s to display their main content on mobile (70% of our traffic), against a target of < 2.5 s. This coincides with a mobile bounce rate twice the desktop rate. Within two weeks and without changing platforms, we want to bring that time below 2.5 s for 75% of real visits for 14 consecutive days."

Notice what it does *not* say: it names neither the cause nor the solution. That comes later (Unit 2).

## 3. Questions that clarify a request

Before writing the statement, you almost always need to ask. These questions work for nearly any request:

- **What exactly did you observe, when and where?** (turns impressions into facts)
- **Since when has it been happening? What changed at that point?** (a clue to causes)
- **Who does it affect, and who not?** (narrows it down)
- **What would "solved" look like for you?** (success criterion)
- **What has already been tried, and what happened?** (avoids repeating it)
- **What can't we change?** (constraints)
- **What happens if we do nothing?** (real impact; sometimes the answer is "not much," and that's information too)

A useful technique is the **contrast question**: "Where does the problem *not* happen?" If the form fails on Safari but not on Chrome, or a campaign underperforms in one city but not in another, the difference between the two cases is a huge clue.

## 4. Breaking it down: splitting without gaps

A big problem is unmanageable; split into pieces, each piece can be investigated. The key is splitting it well.

### The issue tree

Put the problem at the top and split it into branches that, together, explain it. For example, for "online store revenue fell 25%":

```
Revenue = Traffic × Conversion rate × Average order value
├── Traffic
│   ├── Organic (search engines)
│   ├── Paid (ads)
│   ├── Social media
│   └── Direct / email
├── Conversion rate
│   ├── Technical issues (errors, slowness)
│   ├── Offer (price, shipping, stock)
│   └── Trust (reviews, policies)
└── Average order value
    ├── Product mix
    └── Discounts
```

This breakdown has one virtue: it's a **mathematical identity** (revenue = traffic × conversion × average order value). If traffic and order value didn't change, the problem *has to* be in conversion. One data point rules out two thirds of the tree.

### MECE: mutually exclusive, collectively exhaustive

A breakdown is good when its parts:
- **Don't overlap** (mutually exclusive): each case falls into exactly one branch.
- **Leave no gaps** (collectively exhaustive): every case falls into some branch.

This principle was popularized in management consulting (it's associated with Barbara Minto and her *Pyramid Principle*). A **poor** breakdown of traffic: "Google, Instagram, ads." They overlap (Google has ads, and so does Instagram) and channels are missing (email, direct). Better: "organic search, paid (any platform), organic social, email, direct, referral."

### Worked example 2 — Breaking down "the team delivers late"

*Step 1.* Define the variable: "late deliveries in the last 3 months: 7 of 12."
*Step 2.* Find a natural split of the process: a project goes through *brief → estimate → production → client review → revisions → delivery*.
*Step 3.* For each late delivery, note at which stage the time was lost. Result: 5 of 7 ran late at "client review → revisions" (unplanned rounds of changes).
*Step 4.* Redefine the problem: "Revision rounds after client review exceed the estimate in 5 of every 7 late projects." Far more investigable than "we deliver late."

## 5. Pólya's method applied to work

In *How to Solve It* (1945), the mathematician George Pólya proposed four steps for solving problems. Designed for mathematics, they work surprisingly well in any field:

1. **Understand the problem.** What are you looking for? What data do you have? What conditions? Can you restate it in your own words or draw it? → What you did in sections 2–4.
2. **Devise a plan.** Have you seen a similar problem? Can you solve a simpler version or one part? Can you work backward from the result?
3. **Carry out the plan.** Step by step, checking each one.
4. **Look back.** Does the result make sense? Can you check it another way? What did you learn that will help with the next problem?

Step 4 is the one most often skipped at work ("done, next"), and it's the one that turns experience into learning. In this course you'll practice it through the reflections.

### Pólya's heuristics that work in digital work

- **Analogous problem:** "Did another client have a similar drop in conversion? What was it?"
- **Special case:** "Does it happen with just one product? With just one browser?"
- **Working backward:** "To launch on March 1, what has to be ready by February 15? And before that?"
- **Dropping a condition:** "If there were no budget limit, what would we do? Which part of that can we actually do?"

---

## Common mistakes

| Mistake | Example | Fix |
|---|---|---|
| Confusing symptom with problem | "The problem is that sales dropped" | Measure and locate the gap |
| Accepting the client's solution | "Let's do the TikTok campaign" | Ask what problem it solves |
| Statement without data | "The site is slow" | Measured current and desired situations |
| Overlapping breakdown | "Google, Instagram, ads" | Check MECE |
| Skipping step 4 | Closing the case without reviewing | Check and extract lessons learned |

## Summary

Defining a problem well means separating symptom, problem, cause and solution; expressing it with data, impact, scope, constraints and a success criterion; asking the questions that turn impressions into facts; and splitting it into parts that neither overlap nor leave gaps. Pólya offers a simple cycle (understand, plan, carry out, look back) that structures the whole course.

---

<!--
TRANSLATION NOTES (internal, not for students) · Prof. X · Nov 25, 2026
Source: semestre-0/02-pensamiento-critico/u1-definir-el-problema/guia.md (1,718 words ES).
Status: AI-assisted draft by Prof. X, reviewed by Prof. X. NOT yet reviewed by a native English editor or subject-matter reviewer (required before publishing).
Localization decisions:
- Number formats: decimal comma -> decimal point (2,1 % -> 2.1%); "≥ 2 %" -> "at least 2%"; thousands separator -> comma.
- "≈" -> "approx." (validated UI rule also applies to English).
- "§2–4" -> "sections 2–4" (no section symbol, per validated rule).
- Word count in the timing line: the English body is ~1,580 words vs 1,609 in Spanish (about 2% shorter); timing kept at 20 min [INFERENCE].
- "Ticket promedio" -> "average order value" (standard US e-commerce term, not "average ticket").
- "Árbol de problema" -> "issue tree" (consulting term used by Minto/McKinsey literature).
- "Pasarela de pago" -> "payment gateway".
- "Encargo" -> "request" (agency context; "brief" kept for the process stage).
- Tuteo -> direct second person "you", informal register, contractions allowed.
- Examples (TikTok, Safari, e-commerce) are culture-neutral; no currency appears, so no localization of amounts needed.
- Facts to re-verify in English sources (from plan-revision.md checklist): Pólya, How to Solve It (1945); Minto, The Pyramid Principle / MECE attribution.
-->
