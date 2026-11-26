# Project: Assistant Over Real Documents
area: AI Engineering | module: iaeng-1 — Models, Embeddings, and RAG | lesson 6
id: ie1-l6 | type: project | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-1/ie1-l6

## Project brief

You're going to build an assistant that answers questions over a real body of documents and cites its sources. It's the AI product companies ask for most and the most sellable one in this entire module.

Pick real documents: a client's operations manual, your own sales proposals, product docs, a business's policies. Make sure there's enough material for search to matter — at least 50 pages — and that you know the content well enough to judge whether it answers accurately.

The requirement that defines the project: **when the answer isn't in the documents, it has to say so.** An assistant that makes things up is worse than having no assistant, because people believe it.

## Tasks
- Choose the document set and define how you'll chunk it before writing code
- Build the ingestion pipeline and manually inspect twenty chunks: do they make sense on their own?
- Write the evaluation set BEFORE tuning the system, so you have something to measure against
- Measure, change one thing, measure again, and document whether it improved or got worse
- Intentionally test out-of-scope and ambiguous questions

## Deliverables
- Ingestion pipeline that chunks documents while saving their origin: file, page and section
- Vectors stored in pgvector on Supabase, with an HNSW index
- FastAPI endpoint that receives a question and returns an answer plus cited sources
- Minimal UI where you can ask questions and see the sources for each answer
- Evaluation set of at least 30 questions with expected answer and source document
- Report with results: retrieval accuracy and answer accuracy, measured separately

## Rubric
- Given a question with no answer in the documents, it replies that it can't find it instead of inventing
- Every answer cites the document and section it came from, and the citation is verifiable
- Chunking respects document structure and chunks make sense when read alone
- The same embedding model is used for indexing and for querying
- Evaluation separates retrieval failure from generation failure
- The report explains at least one change made based on what the evaluation revealed
- Re-indexing after updating a document is a single command, not a manual process

## Discussion questions
- What should happen if two documents contradict each other? Answer with one, with both, or warn about the contradiction?
- If the client updates a document every week, how do you re-index without taking the assistant offline?

## Tip

Write the evaluation set before you start tuning. Without it, every change gets judged by trying two questions by hand and walking away with the impression it improved. With it, you know whether it truly improved and where.
