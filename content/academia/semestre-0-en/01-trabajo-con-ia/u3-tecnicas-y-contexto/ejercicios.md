# Unit 3 — Graded Exercises

Solutions in `../claves/u3-soluciones-ejercicios.md`.

## Level 1

**1.1 [AUTO]** Match each situation with the most suitable technique (few-shot, step by step, prompt chain, structured output):
a) You want 200 product descriptions to follow exactly the style of three you already like.
b) You need to move the data from 50 invoices into a spreadsheet.
c) You have to choose among three suppliers using criteria of cost, lead time and risk.
d) You have to produce a 20-page report with research, outline, drafting and review.

**1.2 [AUTO]** What's wrong with this set of examples for classifying sentiment? Example 1: "Loved it" → POSITIVE. Example 2: "Excellent service" → POSITIVE. Example 3: "Highly recommend" → POSITIVE. Example 4: "Arrived late" → NEGATIVE.
a) They're too short. b) They're skewed toward POSITIVE. c) They're missing JSON format. d) They have no role.

**1.3 [AUTO]** In a prompt with a long pasted document, where should the main instruction go? (choose the best) a) Only in the middle. b) At the beginning, and repeated at the end. c) Only at the end. d) It doesn't matter.

## Level 2

**2.1 [HUMAN]** Design a few-shot prompt with 4 examples that turns messy meeting notes into "action item – owner – date." Include at least one hard example (with no explicit date) and explain how it should be handled.

**2.2 [HUMAN]** Write an extraction prompt that returns JSON with the keys `name`, `email`, `company` and `interest` from contact form messages. Test it with 3 made-up messages, one of them missing the email. Submit the prompt, the messages and the outputs, and note whether the model respected the `null`.

**2.3 [HUMAN]** Take a complex task from your field and break it into a chain of 3–5 prompts. For each step, state: goal, input, expected output and what you check before continuing.

## Level 3

**3.1 [HUMAN]** Create your starter library with 5 reusable prompts (every field from the table in section 7). At least 2 must use examples. Test each one with a real task and document the result.

**3.2 [HUMAN]** Hold a long conversation (more than 25 messages) about a project. Ask for the handoff summary, correct it, open it in a new chat and continue the task. Explain in 150 words what was lost or gained in the handoff.
