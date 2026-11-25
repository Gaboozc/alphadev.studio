# Unit 1 — Graded Exercises

Solutions are in `../claves/u1-soluciones-ejercicios.md`. Try each exercise before looking at them.
Tags: **[AUTO]** graded automatically (single answer) · **[HUMAN]** reviewed by a person against the reference solution.

## Level 1 — Understanding

**1.1 [AUTO]** An English text has 1,200 words. Using OpenAI's rule (100 tokens ≈ 75 words), approximately how many tokens does it have?

**1.2 [AUTO]** A Spanish text has 2,000 words. Using 1.5 tokens per word (Spanish tokenizes less efficiently than English), estimate its tokens.

**1.3 [AUTO]** Order these tasks from the one best done at low temperature to the one best done at high temperature: (a) generate 30 possible brand names; (b) extract the total amount from an invoice; (c) write three variations of a tagline; (d) classify emails as "complaint / question / other."

**1.4 [AUTO]** True or false:
a) The model looks things up in an internal database to answer.
b) If a chat app "remembers" an earlier conversation, it's because the app puts that information back into the context.
c) A model without web search knows about events after its cutoff date.
d) The model answering confidently means the answer is correct.

## Level 2 — Application

**2.1 [HUMAN]** Ask an AI assistant, with web search off, for "three books on productivity published in 2019, with their author and publisher." Verify each fact in a catalog (for example, the publisher's website or a library catalog). Submit a table: proposed fact, does it exist?, source you used to verify it.

**2.2 [HUMAN]** Enter the same prompt five times in new conversations: "Write a sentence describing the smell of rain." Copy the five answers. Explain in 80–120 words what you noticed and which concept from the unit explains it.

**2.3 [HUMAN]** You need to analyze 12 sets of meeting minutes of 2,500 words each. Your tool has a practical limit of 60,000 tokens per conversation. Work out whether they all fit together (using a cautious 1.5 tokens/word and a 3,000-token margin for instructions and the answer) and propose a strategy if they don't.

## Level 3 — Analysis

**3.1 [HUMAN]** Write a question with a false premise about your field (for example, about a feature that doesn't exist in a tool you use). Try it in an assistant. Did it correct the premise or accept it? Then rewrite the prompt to reduce the risk (use at least two techniques from section 7) and compare.

**3.2 [HUMAN]** A coworker says, "AI doesn't hallucinate anymore; that was the old models." Write a 150–200-word reply that explains, based on how generation works, why the risk still exists even if it has decreased, and what specific practice you recommend.
