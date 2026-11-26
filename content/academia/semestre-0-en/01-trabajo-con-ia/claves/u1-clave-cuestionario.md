# Unit 1 — Quiz Key

| # | Answer | Explanation |
|---|---|---|
| 1 | **c** | The model calculates probabilities for the next token and picks one; it doesn't search (d), retrieve saved answers (a) or plan the whole answer (b). |
| 2 | **c** | 100 tokens ≈ 75 words, so 750 words ≈ 1,000 tokens. |
| 3 | **d** | The model sees chunks (tokens), not individual letters; that's why counting characters is hard for it. |
| 4 | **c** | Post-training turns the "text continuer" into an assistant that follows instructions. It doesn't add recent facts (d) or eliminate hallucinations (a); grammar comes from pretraining (b). |
| 5 | **a** | Low temperature = the most likely tokens are almost always chosen = more predictable answers. |
| 6 | **a** | It's the limit on tokens considered at the same time. The date of the data is the cutoff date (b). |
| 7 | **d** | The study found a U-shaped curve: better at the beginning and end, worse in the middle. |
| 8 | **b** | Exact references are uncommon, precise facts, typical hallucination territory. In a, c and d the model works on text you give it. |
| 9 | **b** | Recent context weighs more in the probabilities; the model doesn't "decide" to disobey. |
| 10 | **a** | Only a primary source verifies. Asking "are you sure?" (c) generates another plausible continuation; two models can agree on the same error (b). |

## Part B — Grading criteria (2 points each)

**11.** 2 pts if it explains that the model picks continuations that sound right based on its training data and doesn't check for truth, and mentions that with rare facts the probability is spread out and plausible but false answers appear. 1 pt if it only says "it can be wrong" without a mechanism.

**12.** 2 pts with two valid reasons: initial instructions lose weight; the window can be exceeded and the app drops or summarizes content; accumulated context carries errors or drift; starting with a clean summary focuses attention. 1 pt with only one reason.

**13.** 2 pts if it mentions: the service's/plan's data policy (storage, use for training), the client's authorization and applicable data protection law, and the option of anonymizing before pasting. 1 pt if it mentions only one of those points.
