# Embeddings and Semantic Search
area: AI Engineering | module: iaeng-1 — Models, Embeddings, and RAG | lesson 4
id: ie1-l4 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-1/ie1-l4

## Content

## Turning meaning into numbers

An **embedding** is the representation of a piece of text as a list of numbers that captures its meaning. Similar texts produce nearby vectors, even if they don't share a single word.

```
"how do I return a product?"     → [0.021, -0.44, 0.13, ...]
"I want to send back my order"   → [0.019, -0.41, 0.15, ...]   ← very close
"how much does shipping cost?"   → [0.55,  0.02, -0.31, ...]   ← far away
```

That's the difference from traditional search: searching "send back my order" by keywords won't find a document titled "return policy." Searching by meaning will.

### Generating them

```python
from sentence_transformers import SentenceTransformer

modelo = SentenceTransformer("intfloat/multilingual-e5-base")
vectores = modelo.encode(["how do I return a product?", "I want to send back my order"])
```

Or via API, if you prefer not to host anything. The important rule: **use the same model for indexing and for querying.** Vectors from different models aren't comparable, and the system will return nonsense results without throwing any error.

### Measuring closeness

```python
from sklearn.metrics.pairwise import cosine_similarity

similitud = cosine_similarity([vector_consulta], vectores_documentos)[0]
```

Cosine similarity runs from -1 to 1: the closer to 1, the closer the meaning. It's the standard measure because it ignores text length and looks only at the vector's direction.

### Vector databases

With a hundred documents you compare against all of them and you're done. With a hundred thousand you need a specialized index.

- **pgvector**: a Postgres extension. If you already use Supabase, this is the obvious answer: your vectors live alongside the rest of your data and you query everything with SQL.
- **Pinecone, Weaviate, Qdrant**: dedicated services. Faster at huge scale, one more piece of infrastructure.

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE documentos (
id        bigserial PRIMARY KEY,
contenido text NOT NULL,
embedding vector(768)
);

-- the three documents closest to a query
SELECT contenido, 1 - (embedding <=> :consulta) AS similitud
FROM documentos
ORDER BY embedding <=> :consulta
LIMIT 3;
```

The `<=>` operator computes cosine distance. To keep it fast at volume, you need an index:

```sql
CREATE INDEX ON documentos USING hnsw (embedding vector_cosine_ops);
```

### Chunking documents

You don't index an 80-page PDF as a single vector: the meaning gets diluted and the result is useless. You split it into chunks.

- **Size**: between 300 and 800 words usually works well. Too short loses context, too long dilutes.
- **Overlap**: having each chunk repeat the end of the previous one (around 50 words) avoids cutting an idea in half.
- **Respect structure**: splitting by sections or paragraphs yields better chunks than cutting blindly every N characters.
- **Store where each chunk came from**: document, page, section. Without that you can't cite the source, and citing the source is what makes the system trustworthy.

Chunking quality determines the quality of everything that follows. It's the least glamorous part and the one that changes results the most.

## Tasks
- Generate embeddings for ten sentences of your own and check which ones land close together
- Set up pgvector in Supabase and store vectors for a set of real documents
- Write the top-three similarity query and create the HNSW index
- Chunk a long document in two different ways and compare what results each returns

## Tip

When a semantic search system returns bad results, the problem is almost never the embedding model: it's the chunking. Before swapping models, look at the chunks you stored and check whether they make sense read on their own.
