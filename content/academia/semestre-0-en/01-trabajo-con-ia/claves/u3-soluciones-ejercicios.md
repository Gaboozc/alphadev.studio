# Unit 3 — Exercise Solutions

**1.1** a) few-shot · b) structured output · c) step by step · d) prompt chain.
**1.2** **b** (3 positives against 1 negative: it skews toward POSITIVE).
**1.3** **b**.

**2.1 (reference)** Four varied examples (one with several action items, one with an implied owner, one with no date). Rule for the no-date case: write "no date" and don't make one up. Graded on variety, correctness of the examples, consistent format and the explicit rule for the hard case.

**2.2 (reference)** The prompt must ask for valid JSON, list the exact keys, specify `null` for missing data and "don't make things up." Expected result: the model respects `null` in most cases; if it doesn't, the student should propose an adjustment (e.g., adding an example with `null`).

**2.3 (reference)** Each step with a single goal, verifiable output and a review criterion. Penalize steps that mix goals or no review between steps.

**3.1 (reference)** Five complete entries; two with examples; evidence of real testing. Verifiable quality criteria in each entry.

**3.2 (reference)** Typically: the summary leaves out style nuances or minor decisions; you gain focus and better instruction-following. Graded on the honesty of the analysis and on correcting the summary before using it.
