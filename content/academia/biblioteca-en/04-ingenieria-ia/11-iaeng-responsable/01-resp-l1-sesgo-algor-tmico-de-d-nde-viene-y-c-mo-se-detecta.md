# Algorithmic Bias: Where It Comes From and How to Detect It
area: AI Engineering | module: iaeng-responsable — Responsible AI and Governance | lesson 1
id: resp-l1 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-responsable/resp-l1

## Content

## A model isn't biased by accident — it's biased by inheritance

A model trained on data reflecting historical inequality reproduces that inequality with the exact same confidence it uses for any other prediction — it can't tell a real pattern from a pattern the world should have stopped repeating long ago. The most cited case is still a resume-screening system that learned to penalize words associated with women, because the company's hiring history already penalized them before the model existed.

This isn't a problem exclusive to classic classification models. An LLM used to screen candidates, approve loans or prioritize support tickets inherits the exact same risk — the difference is its reasoning is less auditable at a glance.

### The three sources of bias worth distinguishing

**Training-data bias.** The dataset over- or under-represents certain groups, or encodes biased historical decisions (like the hiring example). It's the most common and the hardest to fix after the fact — fixing it almost always means going back to the data, not the model.

**Proxy bias.** The model doesn't directly use a protected attribute (race, gender, age), but uses a variable strongly correlated with it — a ZIP code that in practice segregates by socioeconomic status and race, for instance. Dropping the explicit protected variable doesn't remove the bias if the proxy stays in.

**Deployment bias.** The model performs fairly evenly in evaluation, yet the real context of use introduces bias — for example, a voice assistant trained mostly on accents from one region that performs worse on accents from another, disproportionately hurting those users in production even though benchmark metrics looked fine.

### How to detect it with a method, not an impression

The most direct technique is **subgroup demographic parity**: run evaluation separately for each relevant group (gender, age range, region, whatever applies to the case) and compare accuracy or favorable-output rate across groups.

```
Approval rate by group — application screening model:

Group A: 68% approval
Group B: 41% approval
Group C: 65% approval

→ Group B sitting 27 points below the average of the other two
  warrants investigation: did the training dataset represent
  this group well? Is a proxy variable leaking this gap?
```

A 2–3 point gap between groups can be normal statistical noise. A 20+ point gap sustained across multiple runs is a signal you can't treat as coincidence.

### Mitigation: what you can do once detected

There's no button that "fixes bias." Real interventions act at different stages: **rebalancing the training or fine-tuning dataset** to better represent underrepresented groups, **adjusting the decision threshold** per subgroup when disparity comes from different calibration (legally trickier to justify; needs counsel), or **adding a mandatory human review step** for decisions where the model showed the widest disparity, instead of automating 100% of the process.

The option that's never valid: measuring bias once, finding nothing severe, and never measuring it again. A model's behavior in production shifts over time (data drift), and disparity between groups can appear months after a deployment that started out even.

## Tasks
- Pick an AI system you know (yours or a public case) and identify which groups would be relevant for measuring parity
- Explain in your own words the difference between data bias and proxy bias, with an example of each
- Design the demographic parity table you'd use to audit that system: which groups, which metric, what gap threshold would trigger an investigation

## Tip

If your system makes decisions about people (hiring, credit, access to a service, support prioritization), the question "did we measure parity across groups?" should have an answer before the first deployment, not after the first complaint.
