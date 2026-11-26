# Model Governance: Policies, Approval Workflows, and Audit Trails
area: AI Engineering | module: iaeng-responsable — Responsible AI and Governance | lesson 3
id: resp-l3 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-responsable/resp-l3

## Content

## Why "it works in my notebook" isn't governance

A two-person team can deploy a model with a Slack message as the only record of the decision. A twenty-person team, with multiple models in production touching customer data, can't — not from lack of trust in individual judgment, but because without a documented process, nobody (inside the team, an external auditor or a regulator) can reconstruct later why a specific model was approved, who approved it, and under what conditions.

### The three pieces of a minimum viable governance system

**Acceptable use policies.** A document (not necessarily long) defining: what kinds of decisions a model may make fully automatically, which ones require mandatory human review, and which ones are explicitly off-limits (for example: "no model makes the final rejection on a credit application alone — it always goes through human review before being communicated to the customer").

**Approval workflow.** A formal, non-verbal process before a new model (or a new version of an existing one) reaches production: what evaluations it had to pass (see the Evaluation and Observability module in this same area), who reviewed the results, and who gave final sign-off. In regulated teams this is often a committee; in small teams it can be as simple as a pull request with a mandatory checklist someone other than the author has to approve.

```
Pre-production approval checklist (minimal example):
[ ] Evaluation against the golden set — result documented
[ ] Subgroup bias audit — no unexplained disparity
[ ] Explainability available for high-impact decisions
[ ] Cost and rate limits configured
[ ] Approved by someone other than the change's author
```

**Audit trail.** An immutable record (or at least hard to alter after the fact) of: which model version made each decision, with what input, what output it produced, and when. It isn't the same as generic application logging — an AI system's audit trail needs enough context to answer, months later, "why did the system decide this for this user on this date?"

### The most common governance mistake: treating it as a one-time event

Approving a model once and never reviewing it again is, in practice, having no governance — only an initial approval. A model in production needs periodic review (every training-data version, every significant prompt change for LLMs, and at minimum on a regular schedule even if nothing explicitly changed, because the world the model observes does change).

### Governance isn't bureaucracy for bureaucracy's sake

The goal of all this isn't slowing the team down — it's making sure that when something goes wrong (and at sufficient scale, something eventually goes wrong), there's a record that lets you understand what happened, fix it, and prove — to a client, a regulator, your own company — that the system wasn't operating with zero controls.

## Tasks
- Write the minimum acceptable-use policy for an AI system you've built: which decisions it automates completely, which require human review, which it forbids
- Design the approval checklist you'd use before shipping a new version of that system to production
- Define the minimum information your audit trail would need to store to answer "why did the system decide this" six months later

## Tip

If your team is one or two people, a formal approval workflow can feel excessive — an audit trail doesn't. Storing input, output, model version and timestamp for every high-impact decision is cheap to set up now and practically impossible to reconstruct later if you never turned it on.
