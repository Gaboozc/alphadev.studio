# Unit 3 — Advanced Techniques and Context Management

**Weeks 5–6 · 12 hours · Replaces:** ia1-l2, ia1-l2b, the *few-shot* tip from ia1-l1b, and the prompt library from prodai-1-1

**Guiding question:** When should you show examples, ask for reasoning or split the task, and how do you keep a long conversation useful?

**Estimated time:** Guide approx. 25 min (about 2,000 words at 120 wpm + 5 min of quick checks) · Exercises approx. 3 h 15 min (3 level-1 × 10 min, 3 level-2 × 25 min, 2 level-3 × 45 min) · Quiz approx. 30 min · Reflection approx. 1 h 30 min. **Active time approx. 5 h 40 min** of the 12 h planned in the syllabus. The remaining approx. 6 h 20 min is independent study: rereading, notes, reference readings and review.

> **Core idea.** The anatomy from Unit 2 handles most cases. This unit covers the rest: how to show instead of describe (examples), how to get the model to reason before concluding, how to split a big task into pieces, how to ask for output another tool can read, and how to manage the context of a conversation. It closes with the tool that pays off most in the long run: a personal library of tested prompts.

## Unit objectives

- Design prompts with examples (*few-shot*) and choose good examples.
- Ask for step-by-step reasoning when it helps, and know when it isn't needed.
- Break a complex task into a chain of prompts.
- Use delimiters and structured formats (lists, tables, JSON).
- Decide when to continue a conversation and when to start a new one, and how to hand over the context.
- Build and maintain a library of reusable prompts.

---

## 1. Examples inside the prompt (*few-shot*)

### What it is

Instead of (or in addition to) describing what you want, you show one or more examples of input and output. People talk about *zero-shot* (no examples), *one-shot* (one) and *few-shot* (several). Large models' ability to learn a task from a few examples in the prompt itself was widely documented in the paper by Brown and colleagues, *Language Models are Few-Shot Learners* (NeurIPS 2020).

### Why it works

Because of what you saw in U1: the model continues patterns. A description ("friendly but professional tone") allows many interpretations; a concrete example locks in the pattern: length, structure, vocabulary, rhythm. That's why the original material called it "the most powerful modifier"; it's a useful exaggeration: it's often the one that improves quality most, especially when what you're after is a *style* or a *format* that's hard to describe.

### Worked example 1 — Classifying customer messages

Without examples:
> Classify this message as COMPLAINT, QUESTION or ORDER: "Do you ship to Chicago?"

It works for obvious cases, but with ambiguous ones the model may answer with sentences ("This message looks like a question because…") or invent categories. With examples:

```
Classify each message as COMPLAINT, QUESTION or ORDER. Answer with the label only.

Message: "My order arrived broken."
Label: COMPLAINT

Message: "Do you have the medium in blue?"
Label: QUESTION

Message: "I'd like two bags of the Chiapas coffee, please."
Label: ORDER

Message: "I ordered a week ago and it still hasn't arrived. Any update?"
Label:
```

The examples teach three things at once: the valid categories, the exact answer format and how to handle a case similar to the hard ones.

### How to choose good examples

1. **Representative:** they cover the real cases, including the hard ones.
2. **Varied:** if every example has the same length or starts the same way, the model will copy that even if you don't want it to.
3. **Balanced:** if 4 out of 5 examples are COMPLAINT, the model will lean toward answering COMPLAINT.
4. **Correct:** an example with a mistake teaches the mistake.
5. **Clearly separated** from the instructions and from the case to solve (see section 4).

**Risk to watch for:** the model may copy the example too closely (same phrases, same structure). If that happens, add variety or say explicitly, "imitate the tone, not the phrasing."

## 2. Step-by-step reasoning

### What it is

Asking the model to write out its reasoning before the conclusion. Wei and colleagues (*Chain-of-Thought Prompting Elicits Reasoning in Large Language Models*, NeurIPS 2022) showed that including intermediate reasoning steps improves performance on arithmetic, commonsense and logic problems, especially in large models.

### Why it works

Again, because of token-by-token generation: if the model writes the conclusion first, the later "steps" only justify it. If it writes the steps first, those steps become part of the text that shapes the conclusion.

### An important current nuance

Many current models include a "reasoning" mode that thinks internally before answering. With those, asking it to "think step by step" adds less to accuracy because they already do it. Even so, it's still useful to ask it to **show** the assumptions, the data it used and the alternatives it ruled out, because that lets you **review** the reasoning, which is what really protects you.

### Worked example 2 — A pricing decision

> I need to decide the price for a 4-session photography workshop. Before recommending a price, reason in this order and show me:
> 1. Which costs I need to cover (I give them below).
> 2. What comparable alternatives charge (I give them below; don't make up others).
> 3. What assumptions you're making and which one is most uncertain.
> 4. Your recommendation as a range, and which piece of data would change it.
> Data: room rental $120 per session; materials $15 per student; capacity 10 people; two similar workshops in the city charge $280 and $350 for 4 sessions.

Notice three things: you define the order of reasoning; the data is provided (not requested); and it's required to make assumptions and uncertainty explicit.

### When it ISN'T needed

For simple tasks (rewriting, translating, formatting), asking for reasoning just makes the answer longer.

## 3. Decomposition: prompt chains

### What it is

Splitting a big task into steps and solving them in successive prompts, reviewing each output before moving on to the next.

### Why it works

Each prompt has a single, clear goal; you can verify the intermediate results; and if something goes wrong, you know which step it was.

### Worked example 3 — A blog post

Instead of "write a 1,500-word article on how to choose a health insurance plan":

1. **Prompt 1:** "List the 10 questions a 30-year-old asks most when choosing their first health insurance plan." → You review and pick 6.
2. **Prompt 2:** "Using these 6 questions, propose an article outline with section titles and 2–3 ideas per section." → You adjust the order.
3. **Prompt 3:** "Write section 1 following this outline. Use only the data I give you below [you paste the verified data]." → You repeat for each section.
4. **Prompt 4:** "Review the whole article: point out repetition, logical gaps and sentences longer than 25 words." → You edit.

Each intermediate output is a human checkpoint. The result is better and, above all, **easier to fix**.

## 4. Delimiters and structured output

### Delimiters

When you paste material (a text, an email, data), separate it clearly from your instructions so the model doesn't confuse one with the other. Common options: triple quotes, XML-style tags, headings.

```
Summarize the following email in 3 bullets and propose a reply of 80 words max.

<email>
Hi, I'm writing because the October invoice has a double charge...
</email>
```

This also reduces a risk: if the pasted text contains sentences that look like instructions ("ignore the above and…"), delimiters help the model treat them as content. It isn't full protection, but it helps.

### Structured output

If the answer is going into a spreadsheet or another tool, ask for an exact structure:

```
From each review, extract: product, rating (1-5) and main complaint (8 words max).
Answer ONLY with valid JSON, a list of objects with the keys "product", "rating", "complaint".
If a piece of data doesn't appear, use null. Don't make up values.
```

Advantages: you can automatically check that the answer has the requested format, and you instantly catch it when the model "fills in" data that wasn't there (hence the explicit `null`).

## 5. Template prompts by type of task

The original material offered short templates by task; here they are, expanded and corrected:

- **Code:** specify the language and version, the style (for example, "TypeScript in strict mode, no `any`"), the expected error handling, and ask it to explain its assumptions. Never run generated code without reading it; check that the functions and libraries it uses exist (they're a common case of hallucination).
- **Analysis:** "Analyze from at least two perspectives; at the end, give your conclusion with a confidence level (high/medium/low) and what additional information would change it."
- **Editing:** "Edit this to be more direct. Keep the tone and content; don't add new ideas. At the end, list the 3 main changes and why." Asking for the list of changes lets you check that it didn't alter the meaning.
- **Summary:** define for whom and what for: "Summarize for a director who'll decide whether to approve the budget: 5 bullets, the last one stating the decision being asked of her."

## 6. Managing the context of a conversation

### Continue or start over

| Continue the conversation when… | Start a new one when… |
|---|---|
| The accumulated context is valuable (a document you're editing in parts, an analysis in progress) | The conversation has drifted, or there are accumulated errors or contradictory instructions |
| The initial instructions are still being followed | The model is ignoring instructions from the beginning |
| The conversation is relatively short | It's very long or you've changed topics |

### Handing over the context: the handoff summary

Before closing a long conversation, ask:

> "Summarize this conversation so I can pick it up in a new chat: goal, decisions made, key data, what's left to do and the style instructions we agreed on. 200 words max."

Review that summary (it may leave out something important), fix it and use it to start the new conversation.

### Where to put what matters

Remember *Lost in the Middle* (U1): in long prompts with a lot of pasted material, put the instructions at the beginning and repeat the critical ones at the end ("Remember: answer only based on the document, in table format").

## 7. Your prompt library

A well-built, tested prompt is an asset: it saves you time every time you reuse it and keeps your quality consistent. Both original lessons agreed on this; here's the complete procedure.

### What to save for each prompt

| Field | Example |
|---|---|
| Name | "Customer win-back email" |
| When to use it | Customers inactive for more than 3 months |
| Prompt with variables | "...The store is {{store}}... coupon {{coupon}}..." |
| Example of good output | Paste an approved output |
| Quality criteria | ≤ 120 words, correct coupon, no made-up data |
| Tested with | Tool and date (models change) |
| Notes | "At high temperature it makes up testimonials: keep the constraint" |

### Maintenance

- **Version it:** when you improve a prompt, keep the previous version and note what changed.
- **Retest** after model changes: a prompt that used to work may behave differently.
- **Prune:** if you haven't used it in three months, archive it.

You can keep it in any tool (a document, a spreadsheet, Notion). What matters is the structure, not the tool.

---

## Common mistakes

| Mistake | Fix |
|---|---|
| All the examples are alike | Vary length, case and structure |
| Asking for reasoning on everything | Only for tasks with several steps or decisions |
| One mega-instruction for a complex task | A chain of prompts with intermediate review |
| Pasting material without delimiters | Use tags or triple quotes |
| Asking for JSON without saying what to do with missing data | Specify `null` and "don't make things up" |
| Staying in a degraded conversation | Handoff summary + new chat |
| A library with no criteria or dates | Save criteria, an example and the test date |

## Summary

Showing examples locks in the pattern you're after; asking for reasoning before the conclusion improves complex decisions and makes them reviewable; breaking big tasks down creates checkpoints; delimiting and structuring make verification easier. Context has to be managed: continue while it's helping, and if it degrades, summarize and start over. Save everything that works in a library, with criteria and a date.
