# Unit 1 — Quiz

Key and explanations in `../claves/u1-clave-cuestionario.md`.
**Part A (multiple choice) (auto-graded)** · **Part B (short answer) (reviewed with a rubric)**

## Part A — Multiple choice (one correct answer)

1. What does a language model do at each step of generation?
   a) Retrieves an answer already saved for that same question.
   b) Plans the whole answer and then writes it out in one go.
   c) Calculates the probability of each next token and picks one.
   d) Searches the internet for the sentence most similar to your question.

2. In English, 750 words are approximately:
   a) 500 tokens  b) 750 tokens  c) 1,000 tokens  d) 3,000 tokens

3. Why might a model fail to count how many "r"s a word has?
   a) Because that word wasn't in its training data.
   b) Because the temperature is too high for counting.
   c) Because counting letters is outside its context window.
   d) Because it works with tokens, not individual letters.

4. What does the post-training phase mainly contribute?
   a) The model stops hallucinating completely.
   b) The model learns the language's grammar well.
   c) It follows instructions and answers helpfully.
   d) The model knows the most recent facts.

5. Lowering the temperature produces answers that are:
   a) more predictable  b) more original  c) more detailed  d) more up to date

6. The context window is:
   a) The maximum number of tokens the model considers at once.
   b) The date up to which the model has its training data.
   c) The maximum time a single conversation can last.
   d) The number of past conversations the model remembers.

7. According to *Lost in the Middle* (Liu et al.), in long contexts models make the worst use of information placed:
   a) in tables  b) at the end  c) at the beginning  d) in the middle

8. Which of these requests has the HIGHEST risk of hallucination?
   a) "Translate this paragraph from our website into Spanish."
   b) "Give me the exact reference for three studies on the topic."
   c) "Summarize this text I'm pasting in five bullet points."
   d) "Rewrite the attached email in a formal tone."

9. You asked for "no emojis" at the start, and 40 messages later emojis show up. The most accurate explanation is:
   a) The temperature rose on its own over the whole chat.
   b) The distant instruction lost weight against recent text.
   c) The model was updated to another version mid-chat.
   d) The model deliberately decided to disobey your instruction.

10. What's the best practice for using a fact the AI gave you in a report for a client?
    a) Verify it against a primary source before using it.
    b) Ask two models and use it if they agree.
    c) Ask the AI whether it's sure about the fact.
    d) Use it if the AI stated it with total confidence.

## Part B — Short answer (3–5 sentences each)

11. Explain in your own words why "likely" doesn't mean "true" for a language model.
12. Give two reasons it's better to start a new conversation instead of continuing a very long one.
13. A client asks you to use AI to analyze a database with their customers' names and phone numbers. What would you need to check first, and why?
