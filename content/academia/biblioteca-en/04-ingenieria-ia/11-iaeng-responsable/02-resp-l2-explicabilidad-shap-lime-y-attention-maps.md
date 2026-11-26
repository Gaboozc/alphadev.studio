# Explainability: SHAP, LIME, and Attention Maps
area: AI Engineering | module: iaeng-responsable — Responsible AI and Governance | lesson 2
id: resp-l2 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-responsable/resp-l2

## Content

## The question a black-box model can't answer on its own

"Why did the model reject this application?" is a question a customer, a regulator or an affected user has a right to ask — and "because the model decided so" isn't an acceptable answer in most regulated contexts (credit, employment, healthcare) or in most serious business relationships. Explainability is the set of techniques that turn a black-box decision into a concrete, checkable explanation.

### SHAP: how much each variable contributed to this specific prediction

SHAP (SHapley Additive exPlanations) comes from game theory: it computes how much each input feature contributed to the final outcome by comparing the prediction with and without that feature, averaged across all possible combinations of the remaining features.

```python
import shap

explainer = shap.Explainer(modelo)
valores_shap = explainer(entrada_del_caso)

# For a rejected credit application:
# ingreso_mensual:      +0.31  (pushed toward approval)
# historial_pagos:      -0.52  (pushed toward rejection, the strongest factor)
# antiguedad_laboral:   +0.08  (pushed slightly toward approval)
# deuda_actual:         -0.19  (pushed toward rejection)
```

With that, the answer to "why was it rejected?" stops being "the model decided" and becomes "payment history was the deciding factor, carrying more weight than the rest combined" — an explanation a human analyst can validate, and an applicant can understand and in principle challenge with new information.

### LIME: approximating locally with a simple model

LIME (Local Interpretable Model-agnostic Explanations) takes a different approach: instead of explaining the full model, it generates small variations of ONE specific case, watches how the prediction moves, and fits a simple model (like linear regression) that approximates the complex model's behavior *only around that case*. It's lighter computationally than SHAP, though the approximation is, by design, only valid near the analyzed case — it doesn't generalize across the rest of the model's decision space.

### Attention maps: what the model looked at to answer

For transformer-based models (the architecture behind modern LLMs), attention weights reveal which parts of the input received more weight when generating each part of the output. In a text classification task, visualizing attention over input words shows which sentences the model leaned on to decide — useful for spotting, for example, whether the model is paying attention to a word that shouldn't matter (a proper name suggesting gender or ethnicity, instead of the actual content of the text).

### The limitation you have to state out loud

None of these three techniques explains the model "for real" in the sense of uncovering a causal mechanism — they're post-hoc approximations that help you reason about model behavior, not a literal window into its internal workings. Presenting a SHAP analysis as "this is exactly how the model thinks" is an over-promise that collapses under serious technical scrutiny. The honest way to present it: "this is the best available approximation of what influenced this decision, with today's tools."

## Tasks
- Run SHAP or LIME (both libraries' official docs have sample notebooks) on a simple classification model with a public dataset
- For one specific case, write the plain-language explanation you'd give the person affected by that decision, based on the SHAP values you got
- Explain how the guarantee SHAP gives differs from LIME's, and when you'd pick one over the other

## Tip

Explainability isn't just a compliance requirement — it's a debugging tool. If SHAP shows your churn model leans mainly on a variable that shouldn't matter (an internal ID, a system date), you probably have data leakage in your training pipeline, not a genuinely good model.
