# Privacy: GDPR, Training Data, and the Right to Be Forgotten
area: AI Engineering | module: iaeng-responsable — Responsible AI and Governance | lesson 4
id: resp-l4 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-responsable/resp-l4

## Content

## The problem LLMs added to privacy

Before LLMs, "deleting a user's data" meant deleting rows from a database — technically straightforward. A model trained (or fine-tuned) on that data raises a different problem: the user's information may have been encoded into the model's weights in a way that can't be "deleted" with a DELETE — the knowledge is spread across millions of parameters, not stored in an identifiable record.

### What GDPR requires, in the terms that matter for an AI system

**Right to erasure / right to be forgotten (Art. 17).** A user can ask to have their personal data deleted. For data living only in a database, that's straightforward. For data used to train or fine-tune a model, the honest answer today is: technically there is no reliable method to selectively "unlearn" without retraining — real-world practice is documenting the limitation, minimizing personally identifiable data in training by design, and providing deletion in any retrieval system (RAG, vector databases) where complete removal is technically viable.

**Data minimization (Art. 5).** Collect and process only what is strictly necessary for the stated purpose. In practice for an LLM system: don't send the model (your own or a third party's) more user context than the specific task needs — an assistant answering billing questions doesn't need to see the same user's medical history if both systems share a back end.

**Legal basis for processing (Art. 6).** You need an explicit legal justification to process personal data — consent, contract performance, legitimate interest, among others. Sending a user's data to a third-party LLM provider's API (OpenAI, Anthropic, Google) is, in GDPR terms, a data transfer that requires that legal basis and, generally, a Data Processing Agreement (DPA) with that provider.

### Training data: the memorization risk

Large LLMs can, in documented cases, memorize and literally reproduce fragments of their training data — including personal information if it appeared un-anonymized in the corpus. For fine-tuning on company-owned data, that means: **anonymize or pseudonymize personally identifiable information before training on it**, and explicitly test whether the resulting model can reproduce sensitive data when prompted to extract it (an attack known as `membership inference`).

### What IS completely viable today: RAG with real deletion

If your system uses RAG (document retrieval, not fine-tuning) to give the model context, deleting a user's data from the vector database IS a real, complete deletion — the model never "learned" that data; it only looked it up at answer time. That makes RAG architecture significantly more manageable than fine-tuning on personal data when it comes to right-to-erasure compliance.

```
Fine-tuning on personal data → right to erasure hard to guarantee
RAG with personal data in the vector DB → right to erasure = delete the record
```

In practice, that difference is an architectural argument: if your use case can be solved with RAG instead of fine-tuning on personal data, that choice cuts your privacy risk surface dramatically.

## Tasks
- For an AI system you use or have built, identify whether it processes personal data and under what legal basis (if you don't know, that's a sign the analysis is missing)
- If the system uses RAG, describe how you'd implement deleting a specific user's data from the vector database
- Explain in your own words why "deleting a user's data from a fine-tuned model" is a technically different problem from deleting it from a relational database

## Tip

Before sending customer data to an external LLM provider's API, check whether that provider offers a Data Processing Agreement (DPA) and has a policy against using your data to train its own models — most serious providers explicitly offer this for API customers, though it isn't automatic on every plan.
