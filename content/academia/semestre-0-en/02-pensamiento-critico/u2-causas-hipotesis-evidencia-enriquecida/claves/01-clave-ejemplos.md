# Key · 01 Faded Worked Examples

The answers are **references**, not the only valid answer. Other alternatives are accepted if well reasoned. All figures are fictional.

## Example 2: reference S5 (Clay & Fire)
- **Defensible claim:** people who use the chat buy more, but 2 out of 3 conversations start **after** something has been added to the cart, so much of the difference is prior intent (reverse causation or selection). Comparing within each category, the gap shrinks (11% vs. 8% and 4% vs. 2.5%), although it doesn't disappear. The chat **might** help somewhat, but "triples conversion" hasn't been shown.
- **Level of evidence:** 3, behavioral data without random assignment.
- **Next test:** an A/B test. For 50% of visits, chosen at random, the chat opens automatically after 30 seconds on product pages; the other 50% see the normal button. Primary metric: conversion per visit. Guardrail metrics: bounce rate and time to add to cart, because an auto-opening chat can just be annoying.
- **Decision in the meantime:** don't auto-open it across the whole site.
- **Answer to the 🗨:** the 68% indicates that, in most cases, the chat accompanies a decision already made. Forcing it on every visit doesn't create that intent.

**Typical mistakes:**
- concluding "the chat is useless," which goes too far in the opposite direction;
- proposing to compare only people who used the chat in the A/B test.

## Example 3: S4 and S5 (Harbor Digital)

**S4.** Incidents per deployment:

| Quarter | Incidents / deployments | Rate |
|---|---|---|
| Jul–Sep | 13/120 | 0.108 |
| Oct–Dec | 14/125 | 0.112 |
| Jan–Mar | 20/130 | 0.154 |
| Apr–Jun | 14/104 | 0.135 |

- **Regression to the mean:** Jan–Mar was unusually high, with three launches in February. Compared with normal quarters (approx. 0.11), Apr–Jun (0.135) **isn't better**; it's worse.
- **Volume:** incidents fell partly because there were fewer deployments (104 vs. 130). The "−30%" (from 20 to 14) is a total, not a rate.
- **Confounding:** in projects without new tests, the rate went from 0.15 to 0.13, a small improvement. Hiring QA affects every project equally, so this comparison doesn't isolate it.
- **Measurement:** the tool changed, but with the same severity criteria, so there's no sign of bias, although it's worth confirming with a sample.

**S5.**
- **Defensible claim:** the −30% is mostly explained by starting from an anomalous quarter and by there being fewer deployments. There's no evidence that dropping Fridays reduced the incident rate.
- **Level of evidence:** 2–3, before/after without an adequate control.
- **Next test:** log the day of the week of every deployment and every incident for two quarters, and compare rates by day. Or, if there are several teams, alternate the rule across teams.
- The rule can be kept for **other** reasons, like team well-being and weekend availability, but this result shouldn't be attributed to it.

## Example 4: S3, S4 and S5 (Green Leaf)

**S3.**
- **Topic:** compare within regular posts.
- **Chance or viral posts:** compare medians and remove outliers.
- **Selection:** ask the team how they decided the format.
- **Measurement:** check the platform dashboard's definition of reach.

**S4.**
- The median (1,300 vs. 1,100) shows that most reels perform about the same as photos. The average is inflated by 2 viral posts.
- In regular posts: 1,250 vs. 1,150, with only 5 reels.
- Launches and discounts are concentrated in reels (10 of 15).

**S5.**
- **Defensible claim:** "twice the reach" comes from 2 viral posts and from reels being used for the best topics. With the topic held equal, the difference is small and uncertain.
- **Level of evidence:** 3, with a small sample.
- **Next test:** for 8 weeks, post the **same topic** in both formats, alternating the order. Or assign the format at random within each type of post. Compare the medians.
- **Decision:** don't switch to "reels only." Keep the mix and record each post's topic.

## Example 5: reference solution (optional videos)
- **S1:** *Watching the optional videos (A) causes a pass rate 30 points higher (B).* The proposal assumes that making them mandatory would carry the effect over to everyone.
- **S2:**
  - **Selection:** the most motivated students, or those with more time, watch more material.
  - **Reverse:** students who are doing well keep studying; those doing badly drop out and stop watching videos.
  - **Confounding:** available hours, prior knowledge, program.
  - **Measurement:** does "watching" a video mean opening it or finishing it? Do dropouts count as "didn't pass"?
  - **Chance:** depends on sample size.
- **S3 and S4: data to ask for and what would change my mind.**
  1. **Each group's entry-check score.** If video watchers already came in with higher scores, selection wins.
  2. **When the videos are watched vs. when students drop out.** If non-watchers drop out before the unit's videos even exist, reverse causation wins.
  3. **Pass rate by self-reported study hours.** If the gap disappears when hours are equal, the explanation is confounding.
  4. **Definition of "watching":** percentage of the video played.
- **S5:**
  - **Test:** randomly assign half of enrollees a prominent invitation to the videos, with a reminder, and the other half the current presentation. Analyze by assignment; the metric is passing.
  - **Decision in the meantime:** don't make them mandatory, because it would increase the workload with no demonstrated effect. Keep offering them as a pathway (consistent with `marco-pedagogico.md`, section 2).
- **Grading criterion for the course's levels 2 and 3:** the student should identify at least 3 alternatives, link each one to a piece of data that distinguishes it, and propose a randomized test analyzed by assignment.
