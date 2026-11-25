# 04 · Podcast: "Ever Since We Did X, Y Went Up"

**Id:** `s0-c2-u2-podcast` · **Format:** two-voice audio · **Estimated length:** 10–12 min [INFERENCE: approx. 1,400 spoken words plus pauses; to be measured when recorded] · **Assessment:** ungraded; there are 3 retrieval questions at the end.

**What it's for:** it's an **alternative** to the reading guide, for listening on your commute, while you walk or if reading on a screen tires you. It also works as **review** after reading the guide. Listening and reading produce similar comprehension in adults [VERIFIED: Rogowsky et al. 2016, https://journals.sagepub.com/doi/full/10.1177/2158244016669550]. The podcast doesn't replace the exercises: it only covers the *understanding* part.

**Accessibility:** this script **is the transcript**. It's published alongside the audio, as WCAG 2.2, SC 1.2.1 requires for audio-only content [VERIFIED: https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html].

**Production notes** [INFERENCE]:
- Two voices: **MARA** (host, asks the student's questions) and **TOM** (instructor).
- Music only at the intro and outro; nothing in the background while they talk, so as not to add load.
- Pauses marked ⏸ are 5 seconds of silence, with a soft tone at the start.
- Record in segments that can be listened to separately.

> The companies and figures mentioned are **fictional**, except where a source is cited.

---

## Segment 1 · The most dangerous sentence in a meeting (approx. 3 min)

**MARA:** Welcome to the audio for unit 2 of Critical Thinking. I'm Mara.

**TOM:** And I'm Tom. Today we're talking about the most dangerous sentence you'll hear in a work meeting.

**MARA:** Which one?

**TOM:** "Ever since we did X, Y went up." For example: "ever since we turned on the chat, we sell three times as much." Or "ever since we stopped deploying on Fridays, we've had thirty percent fewer incidents."

**MARA:** But sometimes it's true, right?

**TOM:** Sometimes it is. The problem is that the sentence **sounds** just as convincing when it's true as when it's false. And people make expensive decisions based on it. This unit gives you a method to figure out which case you're looking at.

**MARA:** Let's start with the basics. What's a hypothesis?

**TOM:** A provisional explanation that **could turn out to be false**. That's the key. If I say "the campaign isn't working because the audience doesn't connect with the brand," what data would show me I'm wrong?

**MARA:** Hmm… None, really.

**TOM:** Exactly. That's a belief. On the other hand, "the campaign is underperforming because since day twelve the ads have been shown mostly to people over fifty-five, who convert less" can be refuted. You look at the age distribution. If it didn't change on day twelve, the hypothesis falls.

**MARA:** So a good hypothesis is specific and falsifiable.

**TOM:** And there are two more rules. First, generate **at least three** before you investigate. If you only have one, you'll fall in love with it and only look for evidence in its favor. Second, **prioritize** them: start with the most likely one that's cheapest to check.

⏸ **MARA:** Pause. Think about the last time someone explained a problem at your job or in your studies. Was it a falsifiable hypothesis or a belief?

---

## Segment 2 · Getting to the root: five whys and Ishikawa (approx. 3 min)

**MARA:** Say I already know why something happened. How do I know I've reached the root cause?

**TOM:** With a technique attributed to Sakichi Toyoda and popularized by Taiichi Ohno in the Toyota Production System: the **five whys**. You ask "why?" again and again, until you reach something you can act on in a lasting way.

**MARA:** Give me an example.

**TOM:** A client's site went down on a Friday. Why? Because the server ran out of disk space. Why? Because the logs grew without limit. Why? Because log rotation wasn't configured. Why? Because the server was set up by hand and that step wasn't on any checklist. Why? Because there's no documented procedure.

**MARA:** So the fix isn't deleting files.

**TOM:** Deleting files fixes **this** Friday. The procedure prevents **the next one**.

**MARA:** And what if at the fourth why the answer is "because John forgot"?

**TOM:** That's the most common trap: stopping at the person. People forget; you're not going to change that. The useful question is why the **system** allowed one slip to take the site down.

**MARA:** And the Ishikawa diagram?

**TOM:** It's a fishbone. At the head you put the effect, for example "projects are delivered with errors," and on the bones, categories of causes: people, processes, tools, data, and customer or environment. It forces you not to forget any category. And careful: the diagram **doesn't tell you what the cause is**. It gives you an organized list of hypotheses that you then have to check.

⏸ **MARA:** Pause. Without looking: what were the five Ishikawa categories for digital work?

---

## Segment 3 · Correlation isn't causation (approx. 4 min)

**MARA:** Now the hardest part. Two things go up together. Why doesn't that prove anything?

**TOM:** Because when A and B show up together there are at least four explanations. One: A causes B. Two: B causes A, which is called **reverse causation**. Three: a third thing causes both, which is called a **confounding variable**. And four: **chance**.

**MARA:** Give an example of reverse causation.

**TOM:** A fictional online store sees that visitors who use the chat buy three times as often. Does the chat make people buy? Could be. But when they look at **when** the chat gets opened, it turns out two out of three conversations start **after** something's been added to the cart. People who've already decided to buy ask about shipping. Buying causes the chat, not the other way around.

**MARA:** And confounding?

**TOM:** The months with the most social media posts are the months with the most sales. But December brings more campaigns **and** more holiday shopping. The season causes both.

**MARA:** The faded worked examples include two more: selection and measurement.

**TOM:** Right, we added them because they come up all the time at work. **Selection** is when the groups were already different before you compared them, because people chose which group to be in. The people who turn on an app's notifications are, from the start, the most enthusiastic. And **measurement** is when the way you measure changed. If the cancellation survey goes from an open question to a list with "price" first, of course "price" goes up. That's not new data: you changed the question.

**MARA:** OK. So how do I actually get closer to causation?

**TOM:** With five things. A plausible **mechanism**: how would A produce effect B? **Time order**: the cause comes first. **Comparing** with a similar group that didn't get the cause. An **experiment** with random assignment, which is the idea behind A/B tests. And **reproducing** the effect at will, if it's technical.

**MARA:** Why so much emphasis on randomness?

**TOM:** Because randomness spreads everything else evenly across the groups, even what you didn't measure. If there's a difference afterward, you can attribute it to the change. One important detail: when you analyze, you compare **everyone** assigned, whether or not they used the change. If you keep only the ones who used it, you sneak self-selection back in through the window.

⏸ **MARA:** Pause. "Stores with more employees sell more; let's hire at every store." What alternative comes to mind first?

---

## Segment 4 · Not all evidence weighs the same (approx. 2 min)

**MARA:** Last topic: the quality of evidence.

**TOM:** From strongest to weakest: an experiment with random assignment and a big enough sample; a comparison with a similar group; behavioral data without a comparison; self-reported data, like surveys and interviews; and last, anecdotes and opinions.

**MARA:** So anecdotes are useless?

**TOM:** They're incredibly useful for **generating** hypotheses. "Three customers told me the coffee arrives late" is an excellent lead. What they can't do is **confirm** the hypothesis.

**MARA:** And when someone hands you a number?

**TOM:** Four questions: how many cases are there? How was it measured, and did the way it's measured change? Compared with what? And who produced it, and what's their interest? A fifty percent improvement with six visits means nothing.

---

## Wrap-up (approx. 1 min)

**MARA:** Sum it up in thirty seconds.

**TOM:**
- When you hear "ever since we did X, Y went up," don't say yes or no. Write down the claim, list the alternatives (reverse causation, confounding, selection, chance and measurement) and ask what data distinguishes each one.
- Find the root cause with the five whys without stopping at a person, and use Ishikawa so you don't forget categories.
- Judge evidence by its quality, not by how convincing it sounds.

**MARA:** And now, without going back, three questions. Answer them out loud or write them down.

⏸ **1.** What makes an explanation a hypothesis and not an opinion?
⏸ **2.** Name four alternative explanations for a correlation.
⏸ **3.** Why do you analyze everyone assigned in an A/B test?

**MARA:** The answers are in the transcript, right below. See you in unit 3, where this sentence gets a fallacy name.

---

**Answers:**
1. You can say what data would refute it.
2. Reverse causation, confounding, selection, chance and a change in measurement (any four).
3. Because keeping only those who used the change reintroduces self-selection.

**Content check:** this script adds no new facts to the original guide. The attribution of the five whys and Ishikawa is the same as in `../u2-causas-hipotesis-evidencia/guia.md`, which is pending verification in `plan-revision.md`, section 6.2.
