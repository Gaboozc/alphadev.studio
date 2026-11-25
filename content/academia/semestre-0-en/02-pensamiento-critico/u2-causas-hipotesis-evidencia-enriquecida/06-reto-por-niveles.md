# 06 · Leveled Challenge: "Pan de la Esquina's Incomplete Orders"

**Id:** `s0-c2-u2-reto` · **Format:** data challenge in 3 levels of increasing difficulty · **Time:** L1 approx. 30 min · L2 approx. 60 min · L3 approx. 90 min [INFERENCE] · **Assessment:** L1 [AUTO]; L2 and L3 [HUMAN], with the rubric at the end. Solutions in `claves/06-clave-reto.md`.

**How it works:** all three levels use the **same** case and move up from *apply* to *analyze* to *create*. You can stop at level 1 (recommended for everyone) or keep going. Levels 2 and 3 together are one of the ways to demonstrate mastery (`10-formas-de-demostrar-dominio.md`).

> **Fictional case.** The bakery, its people and its figures are invented for teaching.

---

## The situation

*Pan de la Esquina* ("the corner bakery") is a bakery in Querétaro, Mexico, that delivers through two channels: its **app** and **WhatsApp**. Sofía, the owner, is worried:

> "For the last three weeks, complaints about incomplete orders have tripled. Right at that time I hired Iván to pack on the afternoon shift, and we added 12 new products to the menu. I think Iván isn't paying attention. Should I move him to another job?"

**What changed at the start of week 4:**
1. Iván starts packing on the afternoon shift.
2. 12 new products are added to the menu, on both channels.
3. The app is updated: it now has a **one-tap button**, "My order arrived incomplete." Before, you had to write to support. Nothing changed on WhatsApp: complaints are still typed by hand.

### Table 1. Orders and "incomplete" complaints by channel

| Week | App orders | App complaints | WhatsApp orders | WhatsApp complaints |
|---|---|---|---|---|
| 1 | 300 | 5 | 300 | 4 |
| 2 | 310 | 5 | 290 | 5 |
| 3 | 305 | 4 | 295 | 4 |
| 4 | 320 | 16 | 300 | 4 |
| 5 | 330 | 17 | 290 | 5 |
| 6 | 325 | 16 | 295 | 4 |

### Table 2. App complaints in weeks 4–6, by packing shift

| Shift | Orders | Complaints |
|---|---|---|
| Morning (Rosa packs, as always) | 490 | 25 |
| Afternoon (Iván packs, since week 4) | 485 | 24 |

### Table 3. Week 6 audit
Sofía checked 50 random orders from each channel **before** they went out, without telling anyone.
- App: 2 of 50 incomplete.
- WhatsApp: 2 of 50 incomplete.

### Interview notes (for level 2)
- **Rosa (morning):** "What's missing most is drinks. Toño makes them at the counter and leaves them for last; if the driver's already waiting, sometimes the order goes out without the drink. It's always happened."
- **Iván (afternoon):** "Nobody explained an order to me. I pack what I see on the ticket."
- **Toño (counter):** "The drinks ticket comes to me separately. I don't know which order is about to go out."
- **Driver:** "I don't check; they hand me a sealed bag."
- **Sofía:** "In the app complaints, most say the drink was missing. The WhatsApp ones from before said that too, when they came in."

---

## Level 1 · Apply (single answer, [AUTO])

Round percentages to one decimal place.

1. **App complaint rate:** in weeks 1–3 and in weeks 4–6.
2. **WhatsApp complaint rate:** in weeks 1–3 and in weeks 4–6.
3. **Which of the three changes affected only one channel?**
   - a) Iván
   - b) the new menu
   - c) the one-tap button
4. **According to table 2, the complaint rate on Iván's shift is:**
   - a) clearly higher than on Rosa's shift
   - b) practically the same
   - c) clearly lower
5. **According to the audit, the percentage of incomplete orders in each channel is ___%.** Why should that figure be taken with caution? Choose:
   - a) because 50 orders is a small sample
   - b) because Sofía gave notice before auditing
   - c) because only the app was audited
6. **True or false:** if the WhatsApp channel has a 1.5% complaint rate and the audit finds 4% of orders incomplete, fewer people complain on WhatsApp than receive an incomplete order.

## Level 2 · Analyze ([HUMAN], 400–600 words plus tables)

1. **Hypotheses:** write at least 4, one for each change and at least one more, with what data would refute them. Use the data in the tables to say which are **ruled out**, which are **still alive** and which are **likely**.
2. **Did the button create the problem or make it visible?** Explain the difference and which data in the tables distinguishes them.
3. **Five whys:** starting from "drinks are missing from orders," down to a systemic cause, using only the interviews as evidence. Mark which "because" is supported, and by whom.
4. **Ishikawa:** with at least 2 causes in at least 4 categories.
5. **Answer Sofía** in one sentence: do you move Iván to another job? Why?

## Level 3 · Create ([HUMAN])

1. **Design a test** for the solution you propose (for example, a bag-closing checklist, or having the counter hand over the drink before the bag is sealed). Specify:
   - the unit of assignment (per order, per shift or per day?) and why;
   - the primary metric. *Careful:* do complaints work as a metric if the channels report differently?;
   - the duration and how many orders you'd audit;
   - what result would make you drop the solution.
2. **Fix the measurement:** propose how to make complaints from the two channels comparable from now on.
3. **Memo to Sofía**, 200–250 words, in the format from U4 of the Writing course (`03-escritura-profesional/u4-propuestas-y-correos/`): conclusion first, evidence, recommendation and next step.

---

## Rubric for levels 2 and 3 (4 criteria × 4 levels)

| Criterion | 4 | 3 | 2 | 1 |
|---|---|---|---|---|
| **Hypotheses and ruling out** | ≥ 4 falsifiable hypotheses; rules out each one with the right data from the tables | ≥ 4 hypotheses; rules out most with data | Hypotheses that are hard to falsify, or ruled out without data | A single explanation |
| **Measurement** | Explains that the button reveals a problem that already existed, and supports it with WhatsApp and the audit | Identifies the measurement change, but doesn't support it with both pieces of data | Mentions it in passing | Doesn't spot it |
| **Root cause** | Reaches a process cause, with every "because" supported; doesn't blame a person | Process cause with an unsupported step | Stops at a person or at "lack of attention" | No causal chain |
| **Test and memo** (L3) | Test with a justified unit of assignment, an audit metric and a drop criterion; clear memo with the conclusion first | Missing one element | The test uses complaints as the metric, or the memo has no conclusion | No test |

L2 is graded on the first 3 criteria (12 points) and L2 + L3 on all 4 (16 points). Passing is 60% [INFERENCE: the same threshold as the project].
