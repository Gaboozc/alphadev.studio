# 01 · Faded Worked Examples: "Does A Really Cause B?"

**Id:** `s0-c2-u2-ejemplos` · **Format:** faded worked example · **Level:** basic → intermediate · **Time:** approx. 40 min [INFERENCE] · **Assessment:** ungraded; solutions in `claves/01-clave-ejemplos.md`.

**Objectives (Anderson and Krathwohl process levels):**
- *Apply* a 5-step procedure to test a causal claim.
- *Analyze* which alternative explanation fits each piece of data.
- *Evaluate* how strong the conclusion is and what the next test should be.

**What it's for:** at work you'll often hear things like "ever since we did X, Y went up." This procedure lets you answer, in 10 minutes and with arguments, whether that proves anything.

**How this piece works** [VERIFIED: Renkl et al. 2002; Chi et al. 1994; see `marco-pedagogico.md` R32, R38]:
- You'll see the same procedure five times.
- In example 1 every step is worked out. In each following example, the **last** step that was still worked out is removed (backward fading), and in example 5 you do it all yourself.
- After each worked step there's a **self-explanation question** (🗨). Answer it in your own words before moving on. That question is the part that teaches the most, so don't skip it.

> **Every company and number in this piece is fictional**, designed for teaching.

---

## 0. Entry check (5 min, ungraded)

Answer without looking at the guide. If you get all 5 right, you can skip to examples 4 and 5.

1. "Cities with more ice cream shops have more drownings." What's the most likely explanation?
   - a) Ice cream causes drownings.
   - b) A third variable, heat, causes both.
   - c) It's chance.
2. What's the name for the explanation "B causes A" when someone claimed that A causes B?
3. True or false: with 10,000 users in the sample, a correlation can no longer be due to a confounding variable.
4. Order from strongest to weakest: a before/after comparison with no control group · an experiment with random assignment · one customer's testimonial.
5. What's the first thing a cause has to satisfy, in time, relative to the effect?

*Answers:* 1-b · 2 reverse causation · 3 false: sample size reduces chance, but not confounding · 4 random experiment > before/after > testimonial · 5 it has to happen before the effect.

---

## The 5-step procedure

| Step | Question you answer |
|---|---|
| **S1. State** | What exactly is being claimed? Write it as "A causes B," with the metric and the period. |
| **S2. Alternatives** | What else could produce the same pattern? Always check five: **reverse causation**, **confounding** (a third variable), **selection** (who ends up in each group), **chance** and **a change in measurement**. |
| **S3. Distinguishing data** | For each alternative: what data would I see if it were true, and what if it were false? |
| **S4. Test** | With the data available: which alternatives are ruled out, which are still alive and what's missing? |
| **S5. Conclude** | What can I claim, at what level of evidence (the hierarchy in the guide, section 5), and what's the cheapest next test that would settle it? |

---

## Example 1: fully worked

**Situation (fictional).** *Tally* is a personal finance app. The product team presents this data:

> "Of the 8,000 users who signed up in September, 62% of those who turned on notifications were still active at 30 days, versus 31% of those who didn't. Proposal: turn notifications on by default for everyone."

**S1. State.** *Turning on notifications (A) causes higher 30-day retention (B) among users who signed up in September.* The proposal also assumes that if A is forced, B will go up too.

> 🗨 *Why write down the proposal's assumption too, not just the data?*
> Because the data describes people who **chose** to turn them on. The proposal is about **forcing** everyone. Those are two different claims, and the second is stronger.

**S2. Alternatives.**

| Alternative | How it would produce the pattern |
|---|---|
| Reverse causation | Users who were already hooked are the ones who turn on notifications. |
| Confounding | Acquisition channel: people who arrive through a friend's referral may turn them on more **and** stay longer. |
| Selection | Turning them on is a choice: motivated people self-select into the "with notifications" group. |
| Chance | With 8,000 users and a 31-point difference it's unlikely, but noted. |
| Change in measurement | If "active" means "opened the app," tapping a notification counts as activity even if the user doesn't really use the app. |

> 🗨 *Reverse causation and selection look alike. How are they different here?*
> Reverse causation says engagement **causes** turning them on. Selection says the groups were already different before the comparison, whatever the cause. In practice, both are checked with similar data: behavior **before** turning them on.

**S3. Distinguishing data.**

| Alternative | If it were true, we'd see… | If it were false, we'd see… |
|---|---|---|
| Reverse / selection | Those who later turn them on were already more active on days 1–3, before turning them on | Similar activity on days 1–3 |
| Confounding by channel | The difference disappears when comparing **within** each channel | The difference holds within each channel |
| Measurement | With a stricter definition of "active" (logged ≥ 1 expense in week 4), the difference shrinks a lot | The difference holds |

> 🗨 *Why does "comparing within each channel" test for confounding?*
> Because if the channel caused both things, holding it fixed would leave nothing to explain.

**S4. Test** (data the analytics team provided).

- **Days 1–3:** those who later turned them on logged 5.1 expenses on average; those who didn't, 2.0. → **Reverse causation or selection are still alive.** The groups were different from the start.
- **By channel:**

  | Channel | With notifications | Without notifications |
  |---|---|---|
  | Referral | 70% | 45% |
  | Ads | 48% | 27% |

  The difference **holds within** each channel. → **The channel doesn't explain all of it**; confounding by channel is ruled out as a complete explanation.
- **With the strict definition of "active":** 44% versus 29%. → The gap drops from 31 to 15 points. **Part of it was a measurement effect.**

> 🗨 *If the gap drops from 31 to 15 points, does that mean notifications cause 15 points of retention?*
> No. Those 15 points still mix the possible real effect with the selection we saw on days 1–3.

**S5. Conclude.**
- **Defensible claim:** people who turn on notifications retain better, but they were already more active before turning them on, and part of the difference comes from how "active" is measured. **We don't know** how much notifications cause.
- **Level of evidence:** 3, behavioral data with no random comparison.
- **Next test:** an experiment. 50% of new users, chosen at random, see the prompt to turn on notifications on day 1; the other 50% don't. Primary metric: logged ≥ 1 expense in week 4. Everyone assigned is analyzed, whether or not they turned them on.
- **Decision in the meantime:** don't turn them on by default, because that carries a risk of annoyance and uninstalls that we haven't measured either.

> 🗨 *Why analyze everyone assigned, and not just the ones who turned them on?*
> Because comparing only those who turned them on would reintroduce the self-selection we're trying to eliminate.

---

## Example 2: S5 is missing

**Situation (fictional).** At the online store *Clay & Fire* (ceramics), the monthly report says:

> "Visitors who used chat bought on 9% of visits; those who didn't, on 3%. Chat triples conversion. Proposal: open the chat automatically on every page."

**S1.** *Using the chat (A) causes a per-visit conversion rate 3 times higher (B).* The proposal assumes that opening it automatically will produce the same effect.

**S2.**
- **Reverse:** people who've already decided to buy open the chat to ask about shipping or sizes.
- **Selection:** visitors with purchase intent use the chat more.
- **Confounding:** the product page. The chat is used mostly on expensive, custom pieces, which have a different purchase rate.
- **Chance:** depends on volume; there were 1,200 visits with chat.
- **Measurement:** does the automatic welcome message count as "using the chat"?

> 🗨 *Which alternative seems most likely here, and why?*

**S3.**
- **Reverse / selection:** look at when in the visit the chat gets opened. If it's usually opened **after** adding to cart, that supports reverse causation.
- **Confounding:** compare within the same product category.
- **Measurement:** check whether the automatic message counts as use.

**S4.**
- 68% of conversations started **after** something was added to the cart. → Reverse causation or selection are very plausible.
- **Within custom pieces:** 11% with chat and 8% without. **Within standard pieces:** 4% with chat and 2.5% without. → The gap shrinks a lot when comparing within each category, although it doesn't disappear.
- The automatic message does **not** count as use. → The measurement problem is ruled out.

**S5. Your turn.** Write the defensible claim, the level of evidence, the next test (with its metric and assignment) and the decision in the meantime.

> 🗨 *Before you write: what does the 68% tell you about the proposal to open the chat automatically?*

---

## Example 3: S4 and S5 are missing

**Situation (fictional).** The agency *Harbor Digital* says in its quarterly report:

> "Ever since we stopped deploying to production on Fridays in March, production incidents have dropped 30%."

**S1.** *Not deploying on Fridays (A) caused a 30% reduction in incidents (B), comparing the April–June quarter with January–March.*

**S2.**
- **Confounding:** in March a QA person was also hired, and in April automated tests went live on two projects.
- **Chance or regression to the mean:** January–March may have been an unusually bad quarter.
- **Measurement:** in April the incident-logging tool changed.
- **Volume:** if there were fewer deployments overall, there'd be fewer incidents even if each deployment were just as risky.
- **Reverse:** doesn't obviously apply; noted and ruled out.

**S3.**
- **Confounding:** compare the projects **without** new automated tests.
- **Regression:** look at earlier quarters; was January–March above normal?
- **Measurement:** did the criterion for what counts as an incident change?
- **Volume:** calculate incidents **per deployment**, not totals.

**Data available (for your S4):**

| Quarter | Deployments | Incidents | Notes |
|---|---|---|---|
| Jul–Sep (previous year) | 120 | 13 | — |
| Oct–Dec (previous year) | 125 | 14 | — |
| Jan–Mar | 130 | 20 | Three new projects launched in February |
| Apr–Jun | 104 | 14 | No Fridays; QA since March 15; automated tests on 2 of 6 projects; new tool since April 1, with the same severity criteria |

- In the 4 projects without new automated tests, incidents per deployment were 0.15 in Jan–Mar and 0.13 in Apr–Jun.

**S4 and S5. Your turn.**

> 🗨 *Hint: calculate incidents per deployment for each quarter before forming an opinion.*

---

## Example 4: only S1 and S2 worked out

**Situation (fictional).** The social media manager at *Green Leaf* (a plant nursery) says:

> "Reels get twice the reach of photos. We should post only reels."

**S1.** *Posting in reel format (A) causes twice the reach per post (B), based on the 40 posts from the last 3 months.*

**S2.**
- **Confounding by topic:** reels were used mostly for launches and discounts, which are more interesting.
- **Selection:** only the ideas the team considered strongest were made into reels.
- **Chance:** with 40 posts, a couple of viral ones move the average a lot.
- **Measurement:** is reach for reels and photos measured the same way in the dashboard?
- **Reverse:** doesn't apply.

**Data available:**
- 15 reels and 25 photos.
- **Average reach:** reels 2,400 and photos 1,200. **Median:** reels 1,300 and photos 1,100.
- 2 reels topped 9,000 reach; no photo topped 3,000.
- **Launch or discount posts:** 10 of the 15 reels and 3 of the 25 photos.
- **Only "regular" posts** (neither launch nor discount), average reach: reels 1,250 (5 posts) and photos 1,150 (22 posts).

**S3, S4 and S5. Your turn.**

> 🗨 *Hint: why do the average and the median tell such different stories?*

---

## Example 5: work it out entirely

**Situation (fictional).** An online academy's internal report says:

> "Students who watch the optional videos pass the course 85% of the time; those who don't, 55%. Let's make the videos mandatory."

Apply the 5 steps. For S4, decide **which data you'd ask for** (at least 3) and which result from each would change your mind, because here we're not giving you data. In S5, design the next test.

> 🗨 *When you finish: which step did you hesitate on most? Write it down; you'll use it in the unit reflection.*

---

## Wrap-up: connecting to what's next

In U3 you'll see that "ever since we did X, Y went up" has a fallacy name: *post hoc, ergo propter hoc*. In U4 you'll see why your brain accepts that sentence without objecting (confirmation bias). The 5-step procedure is the practical countermeasure to both.
