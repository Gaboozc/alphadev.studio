# 03 · Spaced Review Flashcards

**Id:** `s0-c2-u2-tarjetas` · **Format:** retrieval flashcards with a spaced schedule · **Time:** 10–15 min per session × 5 sessions  · **Assessment:** auto-graded or self-assessment, no score · **Import file:** `03-tarjetas.csv` (columns `id, tipo, frente, reverso, etiquetas`, i.e. id, type, front, back, tags; the column names stay the same as in the Spanish edition so both files share one format. It can be imported into any flashcard app that accepts CSV).

## Why flashcards, and why spaced
- **Retrieving locks things in better than rereading.** A week later, people who tested themselves remembered 61% and people who reread remembered 40% (Roediger and Karpicke 2006, https://source.washu.edu/2006/03/repeated-testtaking-better-for-retention-than-repeated-studying-research-shows/).
- **Spacing improves retention.** The longer you want to remember something, the farther apart your reviews should be (Cepeda et al. 2006, https://pubmed.ncbi.nlm.nih.gov/16719566/).
- **Duolingo schedules reviews** with a model that estimates when you'll forget each item (Settles and Meeder 2016, https://aclanthology.org/P16-1174/).
- **Our fixed schedule** is a simple approximation .
- **Cards T28–T30 come from U1 on purpose:** mixing units is interleaved practice (Rohrer and Taylor 2007, http://uweb.cas.usf.edu/~drohrer/pdfs/Rohrer%26Taylor2007IS.pdf).

## How to use them (box system)
1. **Answer out loud or in writing before you flip the card.** Thinking "yeah, I know this one" doesn't count; that feeling is misleading (in Roediger and Karpicke, rereading increased confidence without improving recall at one week; same source).
2. **Grade yourself:**
   - **0** = didn't know it;
   - **1** = half knew it or was slow;
   - **2** = knew it well and fast.
3. **Move the card:**
   - with a 2, it moves up to the next box;
   - with a 1, it stays in its box;
   - with a 0, it goes back to box 1.
4. **Schedule by box** (a starting point, to be adjusted with pilot data):

| Box | Reviewed… |
|---|---|
| 1 | Every session |
| 2 | Every 2 sessions |
| 3 | Every 4 sessions |
| 4 | Only in the final review session (day 30) |

5. **Sessions:** day 1 (the day you finish the guide), 3, 7, 14 and 30. Write down the date of each.
6. **Predict before you start:** "How many of the 30 will I know?" When you finish, compare. If you miss far more than you predicted, review the guide section each missed card points to (metacognition).

## Log (copy it into your notebook)

| Session | Date | Prediction (/30) | Result (boxes 2–4 after the session) | What did I review? |
|---|---|---|---|---|
| Day 1 | | | | |
| Day 3 | | | | |
| Day 7 | | | | |
| Day 14 | | | | |
| Day 30 | | | | |

## The 30 cards

| Id | Type | Front | Back |
|---|---|---|---|
| T01 | definition | What distinguishes a hypothesis from an opinion? | You can say what you'd observe if it were false: it's falsifiable. |
| T02 | application | Make this falsifiable: "The campaign is failing because the audience doesn't connect with the brand." | E.g.: "Conversion has dropped since day 12 because the ads are shown mostly to people over 55, who convert less." It would be refuted if the age distribution hadn't changed. |
| T03 | rule | How many hypotheses should you generate before investigating, and why? | At least three; with only one, you look for supporting evidence and miss alternatives (confirmation bias, U4). |
| T04 | rule | Which hypothesis do you start investigating with? | The most likely one that's cheapest to check. |
| T05 | definition | What are the five whys for? | To get from the symptom down to a cause you can act on in a lasting way. |
| T06 | discrimination | Five whys that end in "because John forgot": what's wrong? | It stops at the person. The useful question is what the system allowed so that forgetting caused the problem. |
| T07 | rule | Is "five" a fixed number in the five whys? | No; it's a guideline: sometimes three is enough, sometimes you need seven. |
| T08 | rule | What do you do if a step in the five whys has two answers? | Open two branches: real problems usually have several causes. |
| T09 | definition | What is an Ishikawa diagram for? | To organize the possible causes of an effect into categories so you don't forget any; it generates hypotheses, it doesn't tell you which is the cause. |
| T10 | recall | Five Ishikawa categories for digital work. | People · Processes · Tools/technology · Data/information · Customer/environment. |
| T11 | definition | The four explanations when A and B appear together. | A causes B · B causes A (reverse) · C causes both (confounding) · chance. |
| T12 | discrimination | "Customers who use more features renew more." Most likely alternative explanation. | Reverse causation: those who already planned to renew explore more features. |
| T13 | discrimination | "Months with more posts have more sales." Alternative explanation. | Confounding: the season (e.g., December) drives more campaigns and more purchases. |
| T14 | definition | What is a confounding variable? | A third variable that influences both A and B and creates a correlation between them without one causing the other. |
| T15 | recall | Five ways to get closer to causation. | Plausible mechanism · time order · compare with a similar group without the cause · randomized controlled experiment · replicate. |
| T16 | definition | Why is random assignment key in an A/B test? | It spreads everything else evenly across groups (including what we don't measure), so the difference can be attributed to the change. |
| T17 | application | Sales +18% in November after a redesign; the previous November, sales rose 15%. Attributable effect? | Maybe about 3 points, with uncertainty: the season explains almost all of it. |
| T18 | recall | The guide's evidence hierarchy, strongest to weakest. | Randomized experiment · comparison with a similar group · behavioral data without comparison · self-reported data · anecdotes. |
| T19 | rule | What are anecdotes actually good for? | For generating hypotheses, not for confirming them. |
| T20 | recall | Four questions to evaluate a data point. | How many cases? · How was it measured (and did the measurement change)? · Compared with what? · Who produced it, and with what interest? |
| T21 | discrimination | "50% improvement with 6 visits." What's the problem? | The sample is too small: chance easily explains it. |
| T22 | discrimination | A survey went from an open question to a list with "Price" first, and "price" rose from 15% to 46%. What do you conclude? | Nothing comparable: the instrument changed (measurement). It doesn't prove price matters more. |
| T23 | definition | What is selection (self-selection) in a comparison? | The groups were already different before the comparison because people chose which group to be in. |
| T24 | application | Why analyze everyone assigned in a test, and not just those who "used" the change? | Because filtering by use reintroduces the self-selection that random assignment removed. |
| T25 | definition | What is regression to the mean? | After an extreme period, the next one tends to move back toward normal even if you do nothing; it can look like the effect of a change. |
| T26 | application | Incidents fell 30%, but there were also 20% fewer deployments. What do you calculate? | The rate: incidents per deployment, not the total. |
| T27 | discrimination | Reels: average reach 2,400, median 1,300; photos: 1,200 and 1,100. What does that tell you? | A few viral posts inflate the average; the typical post performs about the same. |
| T28 | U1 · interleaved | Symptom, problem, cause, solution: which one is "sales went down"? | Symptom: what's observable. The problem is stated with data, impact, scope, constraints and a success criterion. |
| T29 | U1 · interleaved | What does MECE mean? | Mutually exclusive and collectively exhaustive: branches that don't overlap and together cover everything. |
| T30 | U1 · interleaved | Pólya's first step for solving a problem. | Understand the problem (then: plan, carry out and look back). |

## Card types
- **Definition and recall:** remember or understand.
- **Rule:** when and how a technique is used.
- **Discrimination:** telling similar concepts apart (reverse causation, confounding or selection). They're the hardest and the ones that teach the most (consistent with Rohrer 2012 on interleaving to distinguish concepts: http://uweb.cas.usf.edu/%7Edrohrer/pdfs/Rohrer2012EPR.pdf).
- **Application:** new, short situations.

## For the author
- Set rules:
  - each card tests **a single idea**;
  - the back has at most about 35 words;
  - at least a third of the cards are discrimination or application;
  - at least 10% come from earlier units (that is a design rule).
