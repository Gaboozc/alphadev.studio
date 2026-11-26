# Project: Bias Audit with Remediation Report
area: AI Engineering | module: iaeng-responsable — Responsible AI and Governance | lesson 5
id: resp-l5 | type: project | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-responsable/resp-l5

## Project brief

You're going to audit an AI model or system (your own, from an earlier module, or a public model with a sample dataset) for algorithmic bias, following the demographic-parity method from this module's first lesson — and produce the report you'd deliver to a client or your own team before approving that system for production.

The standard for this project: it isn't an academic exercise in computing a metric — it's the real deliverable that separates someone who knows algorithmic bias exists from someone who knows how to audit and document it so another person can act on the finding.

## Tasks
- Run the complete audit on a real system or a public sample dataset (several are built specifically to practice bias detection, such as COMPAS or Adult Income)
- Write the executive summary first, then the full technical report — if you can't explain the finding on one page without jargon, you don't understand it well enough yet
- Share the report with someone who didn't see the process and verify the remediation recommendation is clear without you explaining it in person

## Deliverables
- Definition of the relevant subgroups for the audited system, with justification for why those and not others
- Measurement of demographic parity (accuracy or favorable-output rate) per subgroup, with real numbers from the run
- If significant disparity was found: analysis of whether the likely cause is data bias, proxy bias or deployment bias — with evidence, not just hypotheses
- At least one explainability analysis (SHAP or LIME) on 2–3 individual cases where the model produced an unfavorable outcome for the worst-performing group
- Concrete remediation plan: what would be done (data rebalancing, mandatory human review, threshold adjustment) and why that option over others
- One-page executive summary, written for a non-technical reader, explaining the finding and the recommendation

## Rubric
- Subgroup choices are justified, not arbitrary
- Parity numbers are real (from an actual run), not estimated
- The remediation plan is specific and actionable, not generic ("improve the dataset")
- The executive summary is understandable with no prior technical knowledge

## Tip

The most common mistake on this project is reporting the disparity and stopping there. An audit report without a remediation plan is a diagnosis without treatment — useful, but incomplete. The part worth the most (and hardest to write well) is the concrete recommendation for what to do with what you found.
