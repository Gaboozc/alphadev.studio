# Unit 4 — AI as a Working System: Workflows, Tools, Verification and Ethics

**Weeks 7–8 · 12 hours · Replaces:** prodai-1-2, prodai-1-3, ia-1-proj-basico (as an exercise)

**Guiding question:** How do you turn AI into a reliable, measurable and responsible working system, not an occasional shortcut?

**Estimated time:** Guide approx. 25 min (about 1,900 words at 120 wpm + 5 min of quick checks) · Exercises approx. 2 h 50 min (3 level-1 × 10 min, 2 level-2 × 25 min, 2 level-3 × 45 min) · Quiz approx. 30 min · Reflection approx. 1 h 30 min. **Active time approx. 5 h 15 min** of the 12 h planned in the syllabus. The remaining approx. 6 h 45 min is independent study: rereading, notes, reference readings and review.

> **Core idea.** Using AI "every now and then" to get out of a jam saves minutes. Building it into a designed workflow (with defined steps, tested prompts, human checkpoints and measurement) saves hours and, above all, produces consistent quality. This unit teaches you to design that workflow, choose tools by task, verify what goes into a deliverable, work out whether a tool is worth paying for, and work responsibly.

## Objectives

- Design an AI workflow with stages, owners and checkpoints.
- Choose tools by type of task, not by trend.
- Apply a verification protocol before delivering.
- Measure time saved and calculate a subscription's return correctly.
- Recognize obligations around privacy, authorship, transparency and bias.

---

## 1. From occasional assistant to system

The original material summed up the difference well: the mistake is using AI as an "emergency tool"; the right move is building it in as part of the system. What does "system" mean? Four things:

1. **Defined stages:** you know which steps the task has and which ones involve AI.
2. **Stable prompts:** each stage uses a prompt from your library (U3), not an improvised one.
3. **Human checkpoints:** you know where a person reviews, decides or approves.
4. **Measurement:** you record how long it takes and what quality comes out, so you can improve.

### The division of labor: AI brings breadth, people bring judgment

AI is fast at generating options, drafts and variations; people are better at deciding what works for *this* client, *this* context and *this* strategy, and at being accountable for the result. A good workflow gives AI the "fast and broad" work and the person the "slow and precise" work.

## 2. Four example workflows

These workflows come from the original material (digital agencies) and are presented here expanded, with their checkpoints. They work the same way in other settings: a consultancy, a law office, an in-house marketing team.

### 2.1 Services proposal

| Stage | Who | Detail | Checkpoint |
|---|---|---|---|
| 1. Brief | Client | Fills out a form with their problem and goals | — |
| 2. Analysis | AI | Summarizes the problem, goals, clarifying questions and a suggested structure | A person checks that the summary is faithful to the brief |
| 3. Clarification | Person | Calls or emails the client with the questions | Decides what's in scope |
| 4. Draft | AI | Writes it with the agreed structure and confirmed data | — |
| 5. Final edit | Person | Adjusts price, timelines, tone; verifies every fact | Approval before sending |

### 2.2 From design brief to brand concepts

AI proposes three positioning concepts, personality words and style references; the designer uses them as a **starting point, not a finish line**. Checkpoint: no concept goes to the client without the designer's development and judgment.

### 2.3 Search engine content (SEO)

1. Keyword research with dedicated tools (real data, not made up by AI).
2. AI proposes an outline for each article (headings and key points).
3. A person writes or rewrites with real experience and the brand's voice.
4. AI reviews structure, clarity and metadata.
5. A person verifies facts and publishes.
*Correction to the original material:* it suggested checking "keyword density"; that's a metric search engines themselves advise against chasing. Instead, check that the text answers the search intent well.

### 2.4 Monthly client report

1. Export data from the platforms.
2. Paste it in (with no personal data) with the prompt: "Analyze these results as the account manager. Identify 3 findings, 2 areas for improvement and 3 recommendations. Cite the specific number that supports each point."
3. The person checks every cited number against the source and adds the context AI doesn't know (budget changes, seasonality, client decisions).

### Worked example 1 — Designing a workflow from scratch

*Task:* a small language school answers about 60 email inquiries a week by hand, many of them repeats.

1. **Map the current task.** Read the email → identify the type → look up the information → write → send. Time measured over one week: 6 minutes per email ≈ 6 hours.
2. **Find where AI adds value.** Classify the type of inquiry (few-shot, U3) and draft a reply from a document of official answers.
3. **Define checkpoints.** A person reviews every draft before sending; inquiries about payments or complaints never get an automatic draft.
4. **Prepare the inputs.** An official document with prices, schedules and policies (AI answers *only* from it).
5. **Measure.** After two weeks: 2.5 minutes per email, approx. 2.5 hours. Savings: approx. 3.5 hours a week, with human review kept in place.

## 3. Choosing tools by type of task

Instead of a list of brands (which ages fast), think in **categories** and criteria.

| Need | Category | What to check before choosing |
|---|---|---|
| Writing, analyzing, summarizing | Conversational assistant (ChatGPT, Claude, Gemini or others) | Quality in your language, usage limits, data policy |
| Researching with current sources | Assistant with search and citations (e.g., Perplexity, or the assistants' search modes) | That it cites sources and you can open them |
| Transcribing and summarizing meetings | Transcription tools (e.g., Otter or Fireflies) | Participants' consent, language, where recordings are stored |
| Reference images | Image generators | Commercial usage rights under the current terms |
| AI inside your documents | Built-in AI features (in your editor or task manager) | Whether it accesses all your documents, and with what permissions |

**About prices:** they change often. As a reference verified in November 2026, Claude Pro cost $20 a month in the US according to Anthropic's help center, and ChatGPT Plus was around $20 a month according to published comparisons; higher tiers (for example, ChatGPT Pro) cost considerably more. The original material called the $20 plan "ChatGPT Pro," which is wrong. Before budgeting, always check the official pricing page.

**Minimum-stack rule:** don't sign up for tools "just in case." Start with one general assistant and add another only when a specific, frequent task justifies it (section 5).

## 4. Verification protocol before delivering

Everything that goes out to a client, a boss or the public goes through these questions:

1. **Facts:** is every number, date, name, quote and link checked against a primary source? Did I open the links?
2. **Fidelity:** if AI summarized or rewrote, does it keep the meaning of the original? (Compare at least the key points.)
3. **Scope:** does it answer exactly what was asked, with no promises you can't keep?
4. **Rights:** are there texts, images or code that may have usage restrictions?
5. **Bias and tone:** are there generalizations about people or groups? Is the tone right for the audience?
6. **Transparency:** does the recipient expect to know that AI was used? (See section 6.)

### Worked example 2 — Verifying a report

A generated draft says: "Organic traffic grew 34% in October thanks to the new content strategy."

- *Fact:* you open the analytics tool: growth was 31%. → you correct it.
- *Causation:* "thanks to" is a causal claim. October also had a paid campaign that may have had an effect. → you rephrase: "grew 31%; this coincides with the publication of 8 new articles and with the paid campaign, so we can't attribute it to a single cause." (The *Problem Solving and Critical Thinking* course goes deeper into this distinction.)

## 5. Measuring savings and calculating return

### Measure, don't assume

1. Measure how long the task takes you **without** AI (or use a recent log).
2. Measure how long it takes **with** the workflow, *including* review and verification.
3. Repeat several times: a single measurement is misleading.

### Calculating return correctly

The original material said: "If a $20 subscription saves you 5 hours a month and you bill $50 an hour, your ROI is 12.5x." That 12.5 is the **value / cost** ratio (250 / 20). **Return on investment** proper is calculated as (benefit − cost) / cost:

- Value of the time saved: 5 h × $50 = $250.
- ROI = (250 − 20) / 20 = **11.5**, that is, 1,150%.

The difference looks small, but mixing up the two metrics in a client report is a professional mistake. And two more warnings: time saved is only worth money if you spend it on billable or valuable work; and you have to subtract the time spent learning and verifying.

## 6. Ethics, privacy and responsibility

- **Third-party data:** don't paste in clients' or users' personal data without authorization and without knowing the service's data policy. Anonymize (replace names, emails, phone numbers) whenever you can.
- **Confidentiality:** contracts, strategies, proprietary code: check what your agreement with the client allows and what guarantees your plan offers.
- **Recordings:** to transcribe a meeting, tell the participants and get their consent.
- **Authorship and transparency:** agree with your client or employer on how AI use is disclosed. In academic and some professional settings, not disclosing it can be a violation.
- **Bias:** review especially carefully anything that affects people (candidate screening, credit, health, messages aimed at specific groups).
- **Final responsibility:** if you sign it or send it, it's yours. "The AI said so" isn't a defense.

### An honest map: where AI doesn't help

The original material's project also asked you to map "which areas AI doesn't apply to, and why." It's a good practice: overestimating AI leads to promising things you can't deliver. Common examples of where AI should **not** decide on its own: sensitive negotiations, diagnoses that require professional accountability, decisions about people, final fact-checking.

---

## Common mistakes

| Mistake | Fix |
|---|---|
| Automating without measuring the "before" | Measure one week without AI |
| Workflows with no human checkpoint | At least one review point before any delivery |
| Choosing tools by trend | Choose by frequent task and an explicit criterion |
| Quoting prices from memory | Check the current official page |
| Confusing value/cost with ROI | ROI = (benefit − cost) / cost |
| Claiming causation without evidence | Describe coincidences and possible factors |
| Pasting personal data | Anonymize, or use plans with adequate guarantees |

## Summary

An AI working system has stages, stable prompts, human checkpoints and measurement. Tools are chosen by task category, and prices are checked in official sources. Nothing goes out without passing the verification protocol. Savings are measured and return is calculated correctly. And responsibility for privacy, authorship, bias and accuracy stays with the person.
