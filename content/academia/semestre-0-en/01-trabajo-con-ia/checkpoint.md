# Course Checkpoint — Working with AI

| Field | Value |
|---|---|
| Id | `s0-c1-checkpoint` |
| Format | Checkpoint / course exam (`formatos-leccion.md`, section 7) |
| When | Week 9 (before the project milestone). Requires completing all units |
| Estimated time | 60–75 min: Part A approx. 30 min (21 questions × 1.5 min) + Part B 30–45 min [INFERENCE] |
| Assessment | **[MIXED]**: Part A [AUTO] · Part B [HUMAN] with a rubric |
| What's served | 21 questions from a bank of 28: **3 per objective**, chosen at random, with options in random order. So no two attempts are the same |
| Passing | ≥ 70% weighted: Part A 60% + Part B 40% [INFERENCE]. Part A counts within the course's 20% for multiple choice and Part B within exercises (`formatos-leccion.md`, section 7) |
| Retakes | Up to 2, at least 24 h apart. A retake serves a different selection from the bank |
| Pilot 1 (without F5) | Part A can be graded in the browser as self-assessment. Part B remains self-assessment with the rubric until there are server-side submissions |
| Key | `claves/checkpoint-clave.md` (server only) |

## Coverage map (course objective → bank questions)

| Syllabus objective | Questions | Served |
|---|---|---|
| O1. Explain how a language model generates text and why it hallucinates and varies | CP-01, CP-02, CP-03, CP-04 | 3 |
| O2. Write prompts with the seven components | CP-05, CP-06, CP-07, CP-08 | 3 |
| O3. Apply improvement techniques and choose the right one | CP-09, CP-10, CP-11, CP-12 | 3 |
| O4. Manage the context of a conversation | CP-13, CP-14, CP-15, CP-16 | 3 |
| O5. Evaluate answers and verify facts | CP-17, CP-18, CP-19, CP-20 | 3 |
| O6. Design an AI workflow with human checkpoints, savings and costs | CP-21, CP-22, CP-23, CP-24 | 3 |
| O7. Recognize ethical, legal and privacy limits | CP-25, CP-26, CP-27, CP-28 | 3 |
| All (integration) | Applied case (Part B) | 1 |

## Part A — Multiple-choice bank [AUTO]

One correct answer per question.

**CP-01** (O1 · U1) You ask for the same text twice with the same prompt and get different versions. What's the most accurate explanation?

   a) The second answer included more recent information pulled from the internet.
   b) The model picks each token with some randomness, governed by temperature.
   c) The model learned from your first request and corrected the second.
   d) The service, as a rule, uses a different model for each request.

**CP-02** (O1 · U1) Why can a model confidently cite an article that doesn't exist?

   a) Because it generates the most plausible continuation without checking whether it's true.
   b) Because a high temperature forces it to make up every citation.
   c) Because post-training taught it to invent believable sources.
   d) Because it copies its references from an out-of-date database.

**CP-03** (O1 · U1) What is a token?

   a) A whole word, exactly as it appears in the dictionary.
   b) A complete sentence the model stores in its memory.
   c) A chunk of text: a word, part of a word or a punctuation mark.
   d) A flat fee charged for each request sent.

**CP-04** (O1 · U1) You paste a very long document with a key instruction in the middle, and the AI ignores it. What best explains the failure?

   a) Models only read the first paragraph of pasted material.
   b) The temperature dropped and the model stopped reading carefully.
   c) Whatever sits in the middle of a long text gets used less well.
   d) The document went past the model's cutoff date.

**CP-05** (O2 · U2) "Write a LinkedIn post about our new service." What is this prompt mainly missing?

   a) Only the tone; the task and the rest are already clear.
   b) Only the role; with an expert role, the rest can be inferred.
   c) Only examples; two sample posts would be enough.
   d) Context, audience, goal, constraints and format.

**CP-06** (O2 · U2) Which component answers the question "what will this result be used for?"

   a) Task.
   b) Format.
   c) Context.
   d) Goal.

**CP-07** (O2 · U2) What's the best way to ask for an output format?

   a) "Make it visual and easy to read, with good presentation."
   b) "A table with the columns Option, Advantage and Risk; 5 rows max."
   c) "Organize it clearly and professionally, like a senior consultant."
   d) "Use whatever format seems best for the topic."

**CP-08** (O2 · U2) You changed the role, the tone and the format at the same time, and the result improved. What's the problem?

   a) Changing the role usually makes the final result worse.
   b) The model penalizes prompts that change too much.
   c) You don't know which change produced the improvement.
   d) None: changing several things at once is what's recommended.

**CP-09** (O3 · U3) You need to classify 200 comments into your company's own categories. Which technique fits best?

   a) Asking for a longer, more detailed answer.
   b) Raising the temperature to get more variety.
   c) Including several already-classified comments (*few-shot*).
   d) Giving the model the role of a customer service expert.

**CP-10** (O3 · U3) In which case DON'T you need to ask for step-by-step reasoning?

   a) When choosing among three suppliers with several criteria.
   b) When solving a calculation with several steps.
   c) When reviewing the assumptions behind a price estimate.
   d) When rephrasing a sentence in a more formal tone.

**CP-11** (O3 · U3) You generate an article in three steps: outline, draft by section and edit. What's the main advantage?

   a) It guarantees the model won't hallucinate.
   b) It always reduces the total number of tokens used.
   c) It creates checkpoints to review each step before moving on.
   d) It avoids having to write new instructions at each step.

**CP-12** (O3 · U3) You want the AI to analyze a client's email without confusing its sentences with your instructions. What do you do?

   a) Ask the model to guess which part is the instruction.
   b) Paste it at the end of the prompt with no markers.
   c) Write the client's email in all caps.
   d) Delimit the email with triple quotes or tags.

**CP-13** (O4 · U3) After 60 messages, the assistant ignores the style agreed at the start. What's the best action?

   a) Switch models and paste in all 60 messages.
   b) Repeat "follow the initial instructions" in every message without changing anything.
   c) Raise the temperature so the model reacts.
   d) Ask for a handoff summary, review it and start a new conversation with it.

**CP-14** (O4 · U3) In a long prompt with a lot of pasted material, where should the critical instructions go?

   a) At the beginning, and briefly repeated at the end.
   b) Only at the end, after all the material.
   c) Only in the middle, next to the material they refer to.
   d) It doesn't matter: the model pays equal attention to all the text.

**CP-15** (O4 · U3) What should a handoff summary include?

   a) The project name and the date of the conversation.
   b) Only the assistant's last message, copied as is, unedited.
   c) The whole conversation, so nothing gets lost.
   d) Goal, decisions, key data, to-dos and the agreed style.

**CP-16** (O4 · U3) When should you stay in the same conversation?

   a) When contradictory instructions have piled up.
   b) When the accumulated context helps and the rules are being followed.
   c) When the conversation has drifted from the original goal.
   d) When you've completely changed topic or task.

**CP-17** (O5 · U2) Which of these evaluation criteria can be verified without human judgment?

   a) "Each bullet has 15 words max."
   b) "The overall quality of the text is high."
   c) "The text is convincing for the client."
   d) "The tone sounds friendly and natural."

**CP-18** (O5 · U4) The AI gives you a market statistic that's perfect for your report. What do you do before using it?

   a) Ask the AI whether it's sure about the figure.
   b) Find the primary source and check that it says the same thing.
   c) Ask another model for the same figure and average them.
   d) Use it if it comes with decimals, an author and a publication year.

**CP-19** (O5 · U3) You get a snippet of AI-generated code. What do you check first?

   a) That the functions and libraries exist and work, by testing it.
   b) That it's as short as possible, even if it never gets tested.
   c) That it uses the trendy language or framework.
   d) That it has explanatory comments on every line.

**CP-20** (O5 · U3) Why note the date and model next to each prompt in your library?

   a) Because intellectual property law requires it.
   b) Because models change and the prompt may get different answers.
   c) Because including the date in the prompt improves the model's answer.
   d) Because that way each prompt can be billed to the client.

**CP-21** (O6 · U4) In an AI proposal workflow, which stage must always stay in a person's hands?

   a) The first draft of the proposal's overall structure.
   b) Final approval of price, timelines and client data.
   c) Brainstorming possible titles and angles.
   d) Formatting and layout of the final document.

**CP-22** (O6 · U4) A $30-a-month subscription saves you 3 h and your hour is worth $40. What's the ROI?

   a) 25%
   b) 90%
   c) 300%
   d) 400%

**CP-23** (O6 · U4) How should time saved with AI be measured?

   a) Total time with AI, review included, against time without AI.
   b) The time of the first trial you ran.
   c) The time the assistant itself estimates.
   d) Only the time the model takes to generate the final text.

**CP-24** (O6 · U4) You design a workflow for a client's monthly report. What makes it a system rather than occasional use?

   a) Automating the sending so nothing needs reviewing.
   b) Stages, stable prompts, human checkpoints and measurement.
   c) Applying AI to every one of the team's tasks without exception.
   d) Using the most expensive tool on the market.

**CP-25** (O7 · U4) A client asks you to use AI to summarize 40 internal interviews that include employees' names. What do you do first?

   a) Check what your agreement with the client allows and anonymize the personal data.
   b) Summarize only the ones with less personal data, without telling anyone.
   c) Ask the AI to forget the names when it's done.
   d) Upload them as is: the tool is paid and therefore private.

**CP-26** (O7 · U4) A report with a false AI-generated figure reaches the client. Who's accountable?

   a) Whoever signed or sent the report.
   b) The client, for not checking the figure.
   c) The AI tool's provider.
   d) Nobody: it was a tool error.

**CP-27** (O7 · Syllabus) In this course, when do you have to disclose AI use?

   a) Never, if the final result is good quality.
   b) Only if the AI wrote more than half the submitted text.
   c) Whenever it helped you write the reflection or the analysis.
   d) Only if the instructor explicitly asks.

**CP-28** (O7 · U4) You ask for "an image of an expert programmer" and it always produces young men. What does this illustrate?

   a) That the prompt was too long and got ignored.
   b) That the model accurately reflects the world's real population of programmers.
   c) That the temperature is too low to vary.
   d) That the model reproduces biases in its data and you have to correct for them explicitly.

## Part B — Applied case: an agency's monthly report [fictional case] [HUMAN]

A three-person agency manages social media for 5 clients. Each month it takes about 4 hours per client to prepare the report (metrics, interpretation and recommendations). It wants to use AI to cut that time without losing quality or putting client data at risk.

**What you need to submit** (350–500 words plus the prompt, 30–40 min):

1. Design the workflow in 4–6 stages. Mark who does each one (AI or person) and where the human checkpoint is.
2. Write the complete prompt for one stage with the seven components, and label each one.
3. Describe how you'd verify two specific figures in the report before sending it.
4. Identify one privacy or accountability risk and its control.
5. Explain how you'd measure whether the workflow really saves time.

**AI policy:** you may use AI to generate ideas, not to write the analysis. If you used it, say so in one line at the end.

### Rubric (12 points; visible from the start)

| Criterion | Excellent (3) | Proficient (2) | Developing (1) | Insufficient (0) |
|---|---|---|---|---|
| Workflow and human checkpoint | Clear stages, a justified AI/person split and human checkpoints at the risk points | Clear stages, human checkpoint poorly justified | Vague stages or no explicit human checkpoint | Missing |
| Prompt | All seven components present, specific and labeled | One or two components missing or vague | Three or more missing | Missing |
| Verification and measurement | Two verifications against a primary source and a measurement of total time, review included | Incomplete verification or measurement | A generic mention ("I'd check the data") | Missing |
| Ethics and privacy | A specific risk with a workable control (permission, anonymization, owner) | A risk identified with a vague control | A generic mention | Missing |

Part B passes with ≥ 7/12 [INFERENCE].
