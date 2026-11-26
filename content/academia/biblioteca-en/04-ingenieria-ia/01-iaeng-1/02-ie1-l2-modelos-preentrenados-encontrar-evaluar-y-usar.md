# Pretrained Models: Finding, Evaluating, and Using Them
area: AI Engineering | module: iaeng-1 — Models, Embeddings, and RAG | lesson 2
id: ie1-l2 | type: reading | difficulty: intermediate
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-1/ie1-l2

## Content

## You almost never train from scratch

Training a large model costs hundreds of thousands of dollars in compute. What you do in practice is take one that's already trained and use it as-is, or fine-tune it on your data.

**Hugging Face** is the central repository: hundreds of thousands of open models with their docs and examples.

### Using one in three lines

```python
from transformers import pipeline

clasificador = pipeline("sentiment-analysis",
                      model="nlptown/bert-base-multilingual-uncased-sentiment")

clasificador("El servicio fue excelente, volvería sin dudarlo")
# [{'label': '5 stars', 'score': 0.87}]
```

### How to pick one

Not by popularity. The criteria that matter:

**The task.** Text classification, summarization, translation, image recognition: each model does one thing. Filter by task first.

**The language.** A model trained only on English will do poorly on Spanish reviews. Look for multilingual ones or ones trained on your target language.

**The size.** A 7-billion-parameter model needs a beefy GPU. A small one runs on your laptop. Check the requirements before falling in love with one.

**The license.** This gets skipped far too often. Some models **don't allow commercial use**. If you're going to charge a client for a product that uses it, the license is a legal requirement, not a detail.

**The date and maintenance.** A model with no updates in three years probably has better alternatives.

### Evaluate on your data, not the author's

The metrics a model publishes were measured on its test data, which isn't yours. Before putting it in production:

1. Gather 50 to 100 real examples from your use case.
2. Label them by hand with the right answer.
3. Run the model and compare.

A hundred well-chosen examples tell you more about whether it works for your problem than any published benchmark table. And it's an afternoon's work.

### Fine-tuning: when it's worth it

Fine-tuning a pretrained model on your data makes sense when your domain is very specific — technical language, industry jargon — and a generic model falls short.

You need on the order of hundreds to thousands of labeled examples, and compute time. **Before fine-tuning, try two cheaper things**: a better prompt if it's a language model, or RAG to give it context. They solve most cases where people think they need fine-tuning.

### API models vs. self-hosted models

**Via API** (Claude, GPT, Gemini): no infrastructure, always up to date, pay per use. Data leaves your system, and sometimes that's a contractual problem.

**Self-hosted** (open models, on your server): total control, fixed cost, data never leaves. In exchange, you manage infrastructure and GPUs.

For almost everything an agency builds, the API is the right answer. Self-hosted models come in when there's a real privacy constraint or volume is so high that per-call cost shoots up.

## Tasks
- Search Hugging Face for three models for the same task and compare language, size and license
- Explicitly verify whether they allow commercial use and note each one's license
- Build a set of 50 real examples of your own, label them and evaluate your chosen model
- Calculate what it would cost to solve that task via API vs. hosting the model yourself

## Tip

Check the license before writing a single line of code. Discovering that the model you built a product on prohibits commercial use, with the client waiting, is a problem with no technical fix.
