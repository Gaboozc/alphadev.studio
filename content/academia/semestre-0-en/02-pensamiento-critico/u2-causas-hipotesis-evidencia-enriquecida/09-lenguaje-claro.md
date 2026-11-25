# 09 · Plain-Language Version and Accessibility Supports

**Id:** `s0-c2-u2-claro` · **Format:** plain-language summary, glossary, alt text and read-aloud guide · **Time:** approx. 10 min [INFERENCE] · **Assessment:** ungraded.

**Who it's for:**
- Anyone who wants the big picture before reading the guide, or a quick review afterward.
- It's especially useful if English isn't your first language, if you have dyslexia or eye strain, or if you use a screen reader.

**What it is and isn't:** it follows the idea of plain language: that you can **find** what you need, **understand** it and **use** it [VERIFIED: ISO 24495-1:2023 definition, https://www.iso.org/standard/78907.html]. It doesn't replace the guide for assessment; it's a way in.

---

## 1. The unit in plain language

**What is this unit about?**
How to find out **why** a problem happens. And how to tell whether something is really the cause or just a coincidence.

**Idea 1. Write down several possible explanations.**
- An explanation you can test is called a **hypothesis**.
- A good hypothesis says what data would make it false.
- Write at least three before you investigate.
- Start with the most likely one that's easiest to check.

**Idea 2. Ask "why?" several times.**
- This technique is called the **five whys**.
- It helps you reach the root cause.
- Don't stop at "it was someone's fault." Ask what went wrong in the way people work.

**Idea 3. Sort the possible causes into groups.**
- The **Ishikawa diagram** is shaped like a fish skeleton.
- The groups are: people, processes, tools, data, and customer or environment.
- The diagram doesn't give you the answer; it gives you ideas to check.

**Idea 4. Two things happening together doesn't mean one causes the other.**
- When A and B happen together, it may be because:
  - A causes B;
  - B causes A;
  - something else causes both;
  - the groups were different from the start;
  - it's chance;
  - the way of measuring changed.
- To get closer to the truth:
  - figure out how the cause would work;
  - check that the cause happened **first**;
  - compare with a similar group;
  - if you can, run a test that splits people at random.

**Idea 5. Not all evidence is worth the same.**
- From strongest to weakest:
  1. a test that splits people at random;
  2. a comparison with another group;
  3. usage data;
  4. surveys;
  5. one-off comments.
- One-off comments are good for getting ideas, not for proving them.

**The most important thing, in one sentence:**
Before you say "this caused that," write down other explanations and look for the data that tells them apart.

## 2. Glossary

| Word | What it means | Example |
|---|---|---|
| Hypothesis | An explanation that could turn out to be false | "Sales dropped because checkout fails on phones" |
| Falsifiable | Can be shown to be false with data | If checkout works on phones, the hypothesis falls |
| Root cause | The underlying cause, which you can act on for good | "There's no step-by-step checklist for setting up servers" |
| Correlation | Two things that go up or down together | More posts and more sales in December |
| Causation | One thing produces the other | The payment error prevents purchases |
| Reverse causation | You thought A causes B, but B causes A | People who are already going to buy open the chat |
| Confounding variable | A third thing that causes both | The holiday season |
| Selection | The groups were already different before comparing | The most enthusiastic users turn on notifications |
| A/B test | Splitting people at random between two versions and comparing | Half see the new button and half see the old one |
| Sample | The group of cases you look at | 50 orders checked |
| Evidence | What supports or contradicts an idea | Data, tests, logs |

## 3. Alt text for the diagrams in the original guide

**Ishikawa diagram in the guide's "Worked example 3"** (in the guide it's drawn with text characters):

> A fishbone-shaped diagram. On the right, the effect: "Bugs at delivery." Five bones meet the central line:
> - **People:** no dedicated QA; end-of-project rush.
> - **Processes:** testing at the end; no checklist.
> - **Tools:** no automated tests; mismatched environments.
> - **Data:** content arrives late.
> - **Client or environment:** scope changes in the final week.

**Unit concept map:** its full text description is in `05-mapa-conceptual.md`, section 3.

## 4. Read-aloud guide (screen reader or text-to-speech)

Notes for content producers and screen-reader users [INFERENCE: good writing practice; the specific implementation is up to the designer]:
- **Tables:** every table in this unit has headers in the first row. In the case data tables, read row by row: "Week 1: app orders, 300; app complaints, 5…".
- **Percentages and figures:** written as numerals with the % sign ("1.5%"), so the screen reader says them in full.
- **Symbols:**
  - "≥" is read "at least";
  - "×" is read "times";
  - "→" is read "so" or "therefore";
  - the emoji 🗨 and ⏸ mark "question for you" and "pause."
- **Audio:** the podcast (`04-guion-podcast.md`) has its full transcript in the same file [VERIFIED: required by WCAG 2.2 SC 1.2.1, https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html].
- **Future videos:** if recorded, they'll have synchronized captions [VERIFIED: WCAG 2.2 SC 1.2.2, https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html] and a transcript.

## 5. Accommodations anyone can request [INFERENCE: proposed academic policy; Gabe approves it]
- Extra time on the quiz and the checkpoint, if there's a stated need.
- Submitting the reflection as audio instead of in writing, with the same rubric (see `10-formas-de-demostrar-dominio.md`).
- Doing the role-play in its individual version.
