# Unit 1 — Quick Checks Key

**Auto-graded, no score.** Immediate feedback: if correct, show "Feedback if correct"; if wrong, show "Hint if wrong" and allow a retry.

| QC | Location in the guide | Type | Ans. | Feedback if correct | Hint if wrong |
|---|---|---|---|---|---|
| QC1 | Section 2, Tokens | T/F | **a** (True) | Correct. That's why the model struggles, for example, to count the letters in a word. | Go back to section 2 and notice how a long word gets split into several tokens. |
| QC2 | Section 3, How an answer is generated | MC | **c** (see text) | Exactly: it generates token by token, and each token depends on everything in front of it. | Reread section 3: the model doesn't look things up or plan; it predicts the continuation. |
| QC3 | Section 7, Hallucinations | MC | **a** (see text) | Right: a confident tone doesn't signal truth. Precise, uncommon facts are typical hallucination territory. | Review section 7: asking "are you sure?" just produces another plausible continuation. |
