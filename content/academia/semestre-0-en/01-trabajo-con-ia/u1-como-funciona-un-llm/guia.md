# Unit 1 — How a Language Model Works

**Weeks 1–2 · 12 hours · Replaces:** ia1-l1 (conceptual part)

**Guiding question:** What does a language model really do when it "answers," and why does it sometimes make things up?

**Time per part [INFERENCE; method in `rework/profx/formatos-leccion.md`, section 0.1]:** Guide approx. 30 min (about 2,800 words at 120 wpm + 5 min of quick checks) · Exercises approx. 3 h 25 min (4 level-1 × 10 min, 3 level-2 × 25 min, 2 level-3 × 45 min) · Quiz approx. 30 min · Reflection approx. 1 h 30 min. **Active time approx. 5 h 55 min** of the 12 h planned in the syllabus. The remaining approx. 6 h 05 min is independent study: rereading, notes, reference readings and review.

> **What this unit is for.** Almost every mistake people make with AI comes from a wrong idea of what AI *is*. If you think it's a search engine, you'll ask it for facts and believe whatever it says. If you think it's a person, you'll get frustrated when it "forgets" something. If you understand that it's a system that predicts text, you'll know what to ask for, how to ask and when to be skeptical. The rest of the course builds on this unit.

## Unit objectives

By the end, you'll be able to:

- Explain what a token is and estimate how many tokens a text has.
- Describe, without unnecessary jargon, how a model generates an answer word by word.
- Tell apart the training phases (pretraining and post-training) and what each one contributes.
- Explain what temperature controls and why the same prompt gives different answers.
- Define the context window and its practical consequences.
- Explain why models "hallucinate" and what to do about it.

---

## 1. An honest starting point: what a language model is *not*

Before saying what it is, let's rule out three widespread ideas.

**It's not a search engine.** When you type into Google, the system looks for documents that exist and shows you links. A language model, in its basic form, doesn't look anything up: it generates new text based on what it learned during training. Some current assistants combine the model with web search (you'll see them cite sources), but that's an add-on tool, not how the model itself works. If the search tool isn't on, the model answers "from memory," and that memory can be incomplete, out of date or wrong.

**It's not a database.** There's no internal table where "the capital of France is Paris" is stored. What there is, is billions of numbers (called *parameters*) that, together, make the word "Paris" extremely likely after the phrase "the capital of France is." It looks like the same thing, but it isn't: for facts that are very common in the training data, the probability is so concentrated that the model almost never gets it wrong; for rare facts (a small company's phone number, the exact date of a local event) the probability is spread out and the model can produce something plausible but false.

**It's not a person.** The model has no intentions, doesn't know it's talking to you and doesn't "remember" earlier conversations unless the product you're using saves that information and feeds it back in. Its text sounds human because it learned from text written by humans.

## 2. Tokens: the pieces the model works with

A model doesn't read letters or whole words: it reads **tokens**. A token is a chunk of text that can be a whole word ("house"), part of a word ("un," "config"), a punctuation mark or a space with a word attached.

Why chunks and not words? Because that way the model can handle any word, even one it's never seen, by combining known pieces. "Unconfigurable" may not show up often in the training text, but "un," "config" and "urable" do.

**Rule of thumb.** OpenAI documents that, in English, a token is on average about 4 characters, or roughly three-quarters of a word: 100 tokens ≈ 75 words. So for English, estimate about 1.3 tokens per word. Other languages, such as Spanish, usually come out worse (more tokens per word, often 1.3–1.6), because model vocabularies were built with a lot of English text. If you need an exact number, use the provider's token counter (OpenAI publishes one at `platform.openai.com/tokenizer`).

**Why should you care?** For three practical reasons:

1. **Limits are measured in tokens.** How much text you can paste into a conversation and how much the model can write in one answer are expressed in tokens.
2. **Cost is measured in tokens.** If you ever use AI through an API (paying per use), you'll be charged for input and output tokens.
3. **It explains strange errors.** Models often fail at counting the letters in a word or reversing text letter by letter, because they don't "see" letters: they see tokens.

### Worked example 1 — Estimating tokens

*Problem:* you have a 3,000-word report in English and want to know whether it fits comfortably in a conversation with a practical limit of 32,000 tokens, leaving room for your instructions and the answer.

*Step 1.* Estimate the report's tokens: 3,000 words × 1.33 tokens/word ≈ 4,000 tokens.
*Step 2.* Add your instructions (say 300 words ≈ 400 tokens) and the expected answer (1,000 words ≈ 1,330 tokens).
*Step 3.* Total ≈ 5,730 tokens, well below 32,000.
*Conclusion:* it fits with room to spare. If instead of one report you had twenty, the total (approx. 80,000 tokens) wouldn't fit anymore, and you'd need to work in parts or summarize first.

## 3. How an answer is generated: prediction, token by token

This is the heart of the unit. A language model does one thing, repeated many times:

> Given all the text in front of it (your message plus what it's written so far), it calculates, for every possible token in its vocabulary, how likely it is to come next. It picks one. It adds it to the text. It repeats.

Imagine the text is: *"Colombian coffee is famous for its"*. The model calculates something like this (made-up numbers for illustration):

| Next token | Probability |
|---|---|
| flavor | 0.41 |
| aroma | 0.22 |
| quality | 0.17 |
| acidity | 0.06 |
| … (thousands more options) | … |

It picks one (say "flavor"), adds it and recalculates with *"Colombian coffee is famous for its flavor"*. And so on, token by token, until the model generates a special "end" token or hits a limit.

**Consequences you need to internalize:**

- **The model doesn't plan the whole answer in advance** the way a person would with an outline. Each token depends on the ones before it. That's why asking it to reason step by step *before* giving the conclusion (you'll see this in U3) improves results: the written steps become part of the text that shapes the conclusion.
- **Everything you write shapes the answer.** Your prompt is the starting text the probabilities are calculated from. A vague prompt leaves many continuations equally likely, and the model picks the most "average" ones. A specific prompt concentrates the probability on the continuations you want. This is the underlying reason Unit 2 exists.
- **"Likely" isn't the same as "true."** The model produces what *sounds* like a good continuation based on the text it saw. Most of the time, what sounds right is right. Sometimes it isn't.

## 4. Where the "knowledge" comes from: training in two phases

### Phase 1: pretraining

The model is shown enormous amounts of text (web pages, books, code, articles) with a single goal: predict the next token. Every time it gets it wrong, its parameters are adjusted slightly to be less wrong. After trillions of tokens of practice, the model has absorbed grammar, styles, common facts, reasoning patterns, and also the errors and biases in those texts.

At the end of this phase, the model knows how to *continue* text, but not necessarily how to *follow* instructions. If you write "Write a poem about the sea," it might continue with "…is a common prompt in creative writing workshops," because that's also a likely continuation.

### Phase 2: post-training (instructions and preferences)

Next, the model is trained on example conversations where someone asks for something and someone else answers well, and on human ratings that say which of several answers is better. This phase turns a "text continuer" into an assistant that follows instructions, takes a helpful tone and declines certain requests.

### The cutoff date

Pretraining uses text up to a certain date (the model's **cutoff date**). The model doesn't know what happened after that, unless the product gives it web search or you paste in the information. That's why:

- Asking "what's the latest version of X?" without search turned on is risky: it'll give you the latest one it knew about.
- Prices, product names and software versions the model mentions from memory may be out of date. The same warning applies to study materials: this academy's original material included a table of "available models" that went out of date within months. That's why you won't find model tables in this course: always check the provider's official page.

## 5. Temperature: why the same prompt gives different answers

Go back to the coffee table. If the model always picked the most likely token ("flavor"), its answers would be very repetitive and often bland. So when it picks, it introduces some controlled randomness. The setting that controls how much randomness is called **temperature**:

- **Low temperature (close to 0):** it almost always picks the most likely token. More predictable, consistent answers. Useful for extracting data, classifying, answering in a fixed format.
- **High temperature:** gives less likely tokens more of a chance. More varied, "creative" answers, but also more likely to drift or be wrong. Useful for brainstorming.

In chat apps you usually don't control temperature directly; the provider picks a middle value. In APIs you can adjust it. What matters is the consequence: **an answer coming out well once doesn't guarantee it'll come out the same next time.** If a prompt is going to be used many times (in a workflow, for example), test it several times before you trust it.

## 6. The context window: the model's "working memory"

The **context window** is the maximum number of tokens the model can take into account at once: your instructions, the documents you pasted, every earlier message in the conversation and the answer it's writing.

Some key ideas:

- **The model has no memory between conversations** on its own. When it seems to "remember," it's because the app saves information (some have memory features) and includes it in the context again.
- **Windows have grown a lot.** Windows of hundreds of thousands of tokens are common today. For example, ChatGPT's pricing page listed in November 2026 a total window of 256,000 tokens on the Plus plan and 400,000 on Pro. But these numbers change often: check the current figure.
- **Fitting doesn't mean being used well.** A study by Liu and colleagues (*Lost in the Middle*, published in 2024 in the journal TACL) showed that, with long texts, models make better use of information placed at the beginning or end of the context than of information in the middle. Models have improved since then, but the practical advice still holds: put important instructions at the beginning or repeat them at the end, and don't bury the key fact in the middle of a huge document.
- **Long conversations degrade.** When a conversation gets very long, the first instructions compete with hundreds of later messages; and if the window is exceeded, the app has to drop or summarize older parts. So, contrary to what the original material claimed ("you don't need to summarize earlier conversations with modern models"), it **is** worth summarizing and starting a new conversation when the thread has gotten long or gone off track. You'll see this in detail in U3.

### Worked example 2 — Diagnosing a "memory lapse"

*Situation:* at the start of a conversation you asked, "always answer in a formal tone with no emojis." Forty messages later, the model is using emojis.

*Step-by-step diagnosis:*
1. Is the instruction still inside the window? Probably yes, but it's very far back, surrounded by a lot of later text.
2. Is there later text pushing the other way? If in recent messages you yourself wrote casually or pasted text with emojis, the most likely continuation looks like that.
3. *Fix:* repeat the instruction in the current message, or open a new conversation with a summary and the instruction at the top.

*Lesson:* the model didn't "decide to disobey"; the probability shifted because of the accumulated context.

## 7. Hallucinations: why the model makes things up and what to do

A **hallucination** is an answer that sounds confident and well formed but is false: a quote nobody said, a scientific paper that doesn't exist, a library function that never existed, a made-up number.

**Why it happens.** With what you already know, the explanation is straightforward: the model generates the most plausible continuation. If you ask "give me three studies that prove X" and it has no reliable information, the plausible continuation is… a list of three studies with authors, years and titles that *sound* academic. The model has no infallible internal mechanism that warns it when it doesn't know.

**When it's more likely:**
- Uncommon facts (little-known people or companies, local statistics, recent regulations).
- Exact details: numbers, dates, verbatim quotes, URLs, bibliographic references.
- Questions that presuppose something false ("why did Einstein win two Nobel Prizes?" invites it to justify something that didn't happen).
- When you ask it to fill in a format that requires data it doesn't have.

**What to do:**
1. **Verify every fact you're going to use** against a primary source (official documentation, the original document, the provider's page). This is the number one rule of the course.
2. **Give it the information instead of asking for it.** If you paste the document and ask it to answer *only* based on it, the risk drops a lot.
3. **Give it permission not to know.** Include in the prompt: "If you don't have enough information, say so explicitly instead of guessing."
4. **Ask it to distinguish** between what comes from the material you gave it and what's its own inference.
5. **Use tools with search and citations** when you need current data, and open the cited sources: they can be cited wrong too.

## 8. Limits to keep in mind starting today

- **Privacy.** What you type may be stored and, depending on the plan and settings, used to improve models. Never paste passwords, API keys, clients' personal data or confidential information without knowing which policy applies to your account. Business versions usually offer different guarantees than free ones: check the current policy.
- **Bias.** The model learned from human text, biases included. Be especially careful reviewing content about people, groups, health, money or decisions that affect others.
- **Responsibility.** If you use AI-generated text in your work, you're responsible for its accuracy, not the model.

---

## Common mistakes in this unit

| Mistake | Why it's a mistake | What to do |
|---|---|---|
| Using the chat as a search engine for exact facts | It generates plausible text; it doesn't consult sources (unless search is on) | Verify against a primary source or paste the source in |
| Believing it "knows" because it sounded confident | A confident tone has nothing to do with accuracy | Ask for sources and check them |
| Assuming a good answer will repeat | Generation involves randomness (temperature) | Test prompts you'll reuse several times |
| Endless conversations with instructions from the start | Distant instructions lose weight | Repeat instructions or start fresh with a summary |
| Pasting confidential information | It may be stored, depending on the service's policy | Anonymize, or use plans with adequate guarantees |

## Summary

A language model is a system that, based on all the text in front of it, predicts token by token the most plausible continuation. It learned that skill by reading huge amounts of text up to a cutoff date and was then fine-tuned to follow instructions. Temperature introduces variation; the context window limits how much it can consider at once, and not everything that fits gets used equally well. Because it optimizes for plausibility, not truth, it can hallucinate: your job is to give it context, give it permission not to know, and verify.

## Glossary

- **Token:** a chunk of text the model works with.
- **Parameters:** internal numbers adjusted during training.
- **Pretraining:** the phase in which the model learns to predict text.
- **Post-training:** the phase in which it learns to follow instructions and human preferences.
- **Cutoff date:** the time limit of the training data.
- **Temperature:** a setting that controls how much randomness goes into choosing the next token.
- **Context window:** the maximum number of tokens the model considers at once.
- **Hallucination:** a plausible but false answer.
