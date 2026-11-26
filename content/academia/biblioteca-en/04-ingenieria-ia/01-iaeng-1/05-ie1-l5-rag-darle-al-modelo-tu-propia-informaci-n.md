# RAG: Giving the Model Your Own Information
area: AI Engineering | module: iaeng-1 — Models, Embeddings, and RAG | lesson 5
id: ie1-l5 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-1/ie1-l5

## Content

## The problem it solves

A language model knows what was on the internet up to its cutoff date. It doesn't know your client's prices, their internal policies, or what was discussed in the last meeting. Asking it produces an invented answer delivered with total confidence.

**RAG** (retrieval-augmented generation) solves this without retraining anything: it searches your documents for relevant fragments and passes them to the model along with the question.

### The flow

```
1. Preparation (once)
 documents → chunks → embeddings → vector database

2. On every query
 question → embedding → find the N closest chunks
          → build the prompt with those chunks
          → model answers using only that
          → cite the sources
```

### The prompt is where you win or lose

```python
prompt = f"""Answer the question using only the context below.
If the context does not contain the answer, say exactly:
"I cannot find that information in the available documents."
Do not use outside knowledge. Cite the source for every claim.

CONTEXT:
{contexto}

QUESTION: {pregunta}
"""
```

The two critical instructions are **"only the context"** and **giving it an explicit out for when it doesn't know**. Without the second one, the model fills the gap by inventing, which is the exact thing RAG was meant to prevent.

### Why RAG instead of fine-tuning

| | RAG | Fine-tuning |
|---|---|---|
| Updating information | Re-index, minutes | Retrain |
| Citing sources | Yes, natural | No |
| Up-front cost | Low | High |
| Teaching *knowledge* | Yes | So-so |
| Teaching *style or format* | So-so | Yes |

The rule: **RAG so it knows things, fine-tuning so it speaks a certain way.** Most agency projects are the first.

### Common failures and what they look like

**It retrieves irrelevant chunks.** The model answers poorly even though the information is in your documents. Almost always it's chunking, not the model.

**It confidently answers something false.** The instruction to admit when it doesn't know is missing, or you passed empty context and didn't check.

**It ignores the context and uses what it already knew.** The prompt isn't explicit enough, or the context sits so far down it gets lost in a wall of text.

**It runs out of space.** You pull twenty chunks and they don't fit. Pull fewer, better ones: five relevant chunks beat twenty mediocre ones.

### Reranking to improve results

Vector search is fast but imprecise. The pattern that improves results the most: retrieve 20 candidates by vector, then rerank them with a more accurate model, keeping the top 5.

**Hybrid search** also works very well: combining semantic search with keyword search. Semantic search finds "returns" when you ask "send back"; keyword search finds an exact product code, where semantic search fails.

### Evaluating

Without evaluation you don't know if a change helped or hurt. The bare minimum: a list of 30 to 50 real questions with their right answer and the document where it lives.

You measure two things separately:

- **Did it retrieve the right chunk?** If not, the problem is in search.
- **Did it answer well given the right chunk?** If not, the problem is in the prompt.

Separating them is what turns "it doesn't work well" into a concrete problem you can fix.

## Tasks
- Build a complete RAG pipeline over real documents: chunking, embeddings, search and answer
- Write the prompt with the admit-ignorance instruction and verify it follows it
- Prepare 30 evaluation questions with their answer and source document
- Measure separately whether it retrieves the right chunk and whether it answers well given it

## Tip

Always run the impossible-question test: ask something that isn't in any document. If it invents an answer instead of saying it doesn't know, the system isn't ready, no matter how well it answers everything else.
