# 08 · Role-Play: The Black Friday Post-Mortem

**Id:** `s0-c2-u2-rol` · **Format:** role-based simulation (group of 4–5) · **Time:** approx. 75 min [INFERENCE] · **Assessment:** [HUMAN], with the observation rubric in section 6. There's an **individual version** in section 7 for anyone who can't meet.

**Objectives:**
- *Apply* the five whys in a real conversation, under pressure and with conflicting accounts.
- *Evaluate* which claims have evidence.
- *Reach* a systemic cause without blaming a person.

**Why:**
- In higher education, simulation has a large effect on complex skills (g = 0.85 across 145 studies), and beginners benefit more when it's paired with examples [VERIFIED: Chernikova et al. 2020, https://journals.sagepub.com/doi/full/10.3102/0034654320933544]. That's why this role-play comes **after** the worked examples (01).
- At work, causes are almost always investigated in meetings, not alone [INFERENCE].

> **Fictional situation.** The agency, the client, the people and the figures are invented. (English edition: the Spanish version is set during Mexico's *Buen Fin* sale weekend; here it's Black Friday, with amounts in USD.)

---

## 1. The situation (everyone reads this)

- The agency **Node Creative** maintains the online store for **Bravo Footwear**.
- On Black Friday, between 8:05 and 9:40 p.m., **card payments failed** for most customers. Bravo Footwear estimates it lost about $9,000 in sales.
- On Monday, the client demands to "know who did it." Today is Tuesday, and there's a 40-minute post-mortem meeting.
- **Meeting rule: it's blameless.** We look for causes in the system, not people to punish.

## 2. Roles

Each person reads **only their own card**. What your card says under *What you know* you can share if someone asks you the right question. *Your starting position* is where you begin; you can change it if someone convinces you with evidence.

### Card 1 · Facilitator
- **Your mission:** run the meeting with the five whys down to a systemic cause, and leave with 2–3 lasting actions, each with an owner and a date.
- **Tools:**
  - Write each "because" somewhere everyone can see it.
  - After each answer, ask "how do we know?"
  - If someone blames a person, ask "what allowed that to cause the outage?"
  - If there are two answers, open two branches.
- **What you know:** nothing technical. Your value is in the questions.

### Card 2 · Development lead (Marco)
- **Your starting position:** "It was the payment gateway. Their API went down. It's not our fault."
- **What you know** (only if someone asks for evidence):
  - The gateway did **not** report any incidents that day. You checked their status page, but you haven't said so.
  - The logs show "invalid certificate" errors starting at 8:05 p.m.
  - The TLS certificate for the store's payments subdomain renewed "automatically," but that automation was set up on the old server and wasn't migrated when they switched servers in September.

### Card 3 · Account executive (Paula)
- **Your starting position:** "The client wants a name. If we don't give them someone to blame, we lose them. It was the intern who did the migration."
- **What you know:** on Friday at 7:00 p.m., the client asked to increase ad traffic by 300% at 8:00 p.m. Nobody told the technical team, but the traffic has **nothing** to do with the certificate error.
- **What you care about:** keeping the client. Concrete actions with dates convince you.

### Card 4 · Operations (Laura)
- **What you know:**
  - The "certificate expires in 7 days" warning went to a group email that **nobody has checked** since the former admin left.
  - The September migration used a checklist that did **not** include certificates.
  - It was fixed at 9:40 p.m., when a developer renewed the certificate by hand.
- **Your starting position:** you'd rather not say much, because the group email was, in theory, "yours." Answer honestly if asked, without accusing yourself.

### Card 5 · Observer (optional, recommended)
- You don't speak. You fill in the rubric in section 6 and write down exact quotes.
- At the end, you lead the debrief.

## 3. How it runs (40 min)

| Min | What happens |
|---|---|
| 0–5 | The facilitator presents the goal and the blameless rule. Each role gives their starting position in one sentence. |
| 5–30 | Five whys. The facilitator writes down the chain. Everyone else answers **in role**. |
| 30–38 | Actions: 2–3 lasting actions, each with an owner and a date. |
| 38–40 | The facilitator reads back the chain and the actions. Does everyone agree? |

## 4. Debrief (25 min, out of role)

Step out of character before you start ("I'm not Marco anymore"). Questions:
1. What root cause did you reach? How many whys did it take?
2. At what moment did someone change their position? What changed it: a piece of data, a question or pressure?
3. Was any "because" accepted without evidence? Who noticed?
4. What did you do with Paula's request for a name? What would you tell the client?
5. What information was spread across roles and only came out when someone asked the right question?
6. **For each person:** what would you do differently in a real meeting?

## 5. Reference chain (for the observer or instructor only, after the meeting)

1. Why did payments fail? → Because the payments subdomain's TLS certificate expired at 8:05 p.m. (Marco's logs).
2. Why did it expire? → Because automatic renewal wasn't set up on the new server (Marco).
3. Why wasn't it set up? → Because the migration checklist didn't include certificates (Laura).
4. Why did nobody find out earlier? → Because the expiration warning went to a group email nobody checks (Laura).
5. **Systemic cause:** there's no certificate inventory with an owner, no complete migration checklist, and alerts go to an inbox nobody owns.

**Branches that must be ruled out with evidence:**
- **The gateway:** it reported no incidents, and the errors are certificate errors.
- **The ad traffic:** the timing matches, but the error is a certificate error, not a load error. It's a good example of **coincidence in time**.
- **The intern:** that would be stopping at the person. The checklist they used didn't include certificates.

**Reference lasting actions:**
- a certificate inventory with an owner and alerts to a channel someone actually checks;
- add certificates to the migration checklist;
- an automated test payment every 15 minutes with an alert to the on-call team;
- tell the technical team about any planned ad spikes. It didn't cause this incident, but it's a real risk.

## 6. Observation rubric (filled in by the observer or instructor)

| Criterion | 3 | 2 | 1 |
|---|---|---|---|
| **Causal chain with evidence** | Every "because" has a source that was asked for out loud | Most do | Assumptions are accepted |
| **Blameless** | The meeting redirects every attempt to blame toward the system | Sometimes | Ends up pointing at a person |
| **Ruling out coincidences** | Rules out the gateway and the traffic with data | Rules out one | Accepts one as a cause |
| **Lasting actions** | 2–3 system actions, each with an owner and a date | Vague actions or no owner | Only "be more careful" |
| **Participation in role** (individual) | Defends their position and changes it in light of evidence | Stays in role but doesn't change, or changes for no reason | Breaks role or doesn't participate |

- The first 4 criteria are the group grade; the 5th is individual.
- Passing is ≥ 9/15 [INFERENCE].

## 7. Individual version (no group)

For anyone studying at a different pace or who can't meet with their group:
1. Read all five cards.
2. Write the meeting script: at least 12 lines of dialogue, with each role speaking as their card describes. The facilitator must ask the questions that uncover the hidden information.
3. Write the post-mortem summary: the causal chain with the source of each "because," the branches ruled out, the actions and a paragraph for the client.
4. **Optional:** you can practice with an AI assistant playing one of the roles. Paste in its card and ask it not to reveal what it knows unless you ask precisely. Disclose the use according to the course's AI policy. What you submit is **your** script and **your** summary.
5. **Assessment:** the same criteria 1–4. The 5th is replaced by "the script shows questions that uncover the evidence."
