import { Week, ContentType } from '../types';

export const phase2Week4: Week = {
  phaseid: 'phase-2',
  id: 'week-4',
  title: 'Week 4: RAG Implementation',
  description: 'Document processing, Embeddings, and Production RAG.',
  lessons: [
    {
      id: 'w4-d1-3',
      title: 'Day 1-3: Document Processing Pipeline',
      duration: '3 Days',
      content: [
        {
          type: ContentType.MARKDOWN,
          markdown: `# 1. The RAG Pipeline
Retrieval Augmented Generation ([[RAG]]) starts with data.
Before an Agent can search your documents, they must go through a pipeline:

1.  [[Ingestion]]: Read files (PDF, HTML, TXT).
2.  [[Chunking]]: Split text into small pieces.
3.  [[Embeddings]]: Convert text to vectors.
4.  **Indexing**: Store vectors in a [[Vector_Store]].
`
        },
        {
          type: ContentType.CODE_PLAYGROUND,
          codeProject: {
            id: 'preprocessing-drill',
            language: 'python',
            description: 'Assignment: Clean the text. 1) Replace newlines with spaces. 2) Strip leading/trailing whitespace. 3) Convert to lowercase.',
            initialCode: `def clean_text(text):
    # TODO: text.replace...
    # TODO: text.strip...
    # TODO: text.lower...
    return text

raw = "  Title: RAG \\n is cool  "
print(f"'{clean_text(raw)}'")`,
            hints: [
              { text: 'Chain the methods: `text.replace(...).strip().lower()`', relearnLessonId: 'w4-d1-3' }
            ],
            solutionCode: `def clean_text(text):
    return text.replace("\\n", " ").strip().lower()

raw = "  Title: RAG \\n is cool  "
print(f"'{clean_text(raw)}'")`,
            expectedOutput: "'title: rag   is cool'"
          }
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# 2. Chunking Strategies
Why chunk?
1.  **Context Limits**: You can't fit a whole book in a prompt.
2.  **Semantic Precision**: A whole book has "mixed" meaning. A paragraph has specific meaning.

**Strategies:**
**Fixed Size**: Split every 500 characters. (Fast, but breaks sentences).
**Recursive**: Split by \`\\n\\n\`, then \`\\n\`, then \` \`. (Preserves semantic structure).
`
        },
        {
          type: ContentType.CODE_PLAYGROUND,
          codeProject: {
            id: 'chunking-drill',
            language: 'python',
            description: 'Assignment: Implement `recursive_chunk(text, max_size)`. 1) Split by double newline (paragraphs). 2) If a chunk is too big, split by single newline. 3) Return list of chunks.',
            initialCode: `def recursive_chunk(text, max_size):
    chunks = []
    # TODO: Split by paragraphs (\\n\\n)
    # TODO: Check size of each paragraph
    # TODO: If good, add to chunks. If bad, split further by \\n.
    pass

text = "Para 1.\\n\\nPara 2 is very long... " * 10
print(recursive_chunk(text, 50))`,
            hints: [
              { text: 'Start with `paragraphs = text.split("\\n\\n")`', relearnLessonId: 'w4-d1-3' },
              { text: 'Loop through paragraphs. If `len(p) > max_size`, split by `\\n`.', relearnLessonId: 'w4-d1-3' }
            ],
            solutionCode: `def recursive_chunk(text, max_size):
    chunks = []
    paragraphs = text.split("\\n\\n")
    for p in paragraphs:
        if len(p) <= max_size:
            chunks.append(p)
        else:
            lines = p.split("\\n")
            for line in lines:
                chunks.append(line[:max_size]) # Simple truncate for drill
    return chunks

text = "Para 1.\\n\\nPara 2 is very long and might need splitting."
print(recursive_chunk(text, 20))`,
            expectedOutput: "['Para 1.', 'Para 2 is very long ', 'and might need splitt', 'ing.']"
          }
        },
        {
          type: ContentType.CODE_PLAYGROUND,
          codeProject: {
            id: 'chunking-overlap-drill',
            language: 'python',
            description: 'Drill: Overlapping Chunks. When splitting text, we often want overlap so context isn\'t lost at the cut. Implement `chunk_with_overlap(text, size, overlap)`.',
            initialCode: `def chunk_with_overlap(text, size, overlap):
    chunks = []
    # TODO: Loop from 0 to len(text) with step = (size - overlap)
    # TODO: Slice text[i : i + size]
    return chunks

text = "abcdefghijklmnop"
print(chunk_with_overlap(text, 5, 2))`,
            hints: [
              { text: 'Use `range(0, len(text), size - overlap)`', relearnLessonId: 'w4-d1-3' },
              { text: 'Append `text[i : i + size]` to chunks.', relearnLessonId: 'w4-d1-3' }
            ],
            solutionCode: `def chunk_with_overlap(text, size, overlap):
    chunks = []
    step = size - overlap
    for i in range(0, len(text), step):
        chunks.append(text[i : i + size])
    return chunks

text = "abcdefghijklmnop"
print(chunk_with_overlap(text, 5, 2))`,
            expectedOutput: "['abcde', 'defgh', 'ghijk', 'jklmn', 'mnop']"
          }
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# 3. Metadata Extraction
Searching for "Contract" is hard. Searching for "Contract" where \`year=2024\` is easy.
We extract [[Metadata]] during ingestion.

**Source**: Filename, URL.
**Content**: Author, Date, Title.
`
        },
        {
          type: ContentType.CODE_PLAYGROUND,
          codeProject: {
            id: 'metadata-drill',
            language: 'python',
            description: 'Assignment: Extract metadata from a header. Text: "Title: Report\\nDate: 2024-01-01\\n\\nContent...". Return dict `{"title": "Report", "date": "2024-01-01"}`.',
            initialCode: `def extract_metadata(text):
    meta = {}
    # TODO: Parse lines
    # TODO: Look for "Title:" and "Date:"
    return meta

doc = "Title: Q3 Report\\nDate: 2023-10-01\\n\\nSales were up..."
print(extract_metadata(doc))`,
            hints: [
              { text: 'Split text by lines.', relearnLessonId: 'w4-d1-3' },
              { text: 'Use `line.startswith("Title:")`', relearnLessonId: 'w4-d1-3' }
            ],
            solutionCode: `def extract_metadata(text):
    meta = {}
    lines = text.split("\\n")
    for line in lines:
        if line.startswith("Title:"):
            meta["title"] = line.split(":", 1)[1].strip()
        elif line.startswith("Date:"):
            meta["date"] = line.split(":", 1)[1].strip()
    return meta

doc = "Title: Q3 Report\\nDate: 2023-10-01\\n\\nSales were up..."
print(extract_metadata(doc))`,
            expectedOutput: "{'title': 'Q3 Report', 'date': '2023-10-01'}"
          }
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# 4. Embedding & Indexing with Vertex AI
Once chunked, we send text to [[Vertex_AI]] to get [[Embeddings]].
Then we upload them to **Vertex AI Vector Search**.

\`\`\`python
from vertexai.language_models import TextEmbeddingModel
model = TextEmbeddingModel.from_pretrained("text-embedding-004")
vectors = model.get_embeddings(["Chunk 1", "Chunk 2"])
\`\`\`
`
        },
        {
          type: ContentType.NOTEBOOK,
          notebook: {
            id: 'nb-embedding-vis',
            title: 'Visualizing Embeddings',
            cells: [
              {
                id: 'c1',
                type: 'markdown',
                content: '### What does an embedding look like?\nIt is just a list of floating point numbers. The length (dimensions) depends on the model (e.g., 768 for Gemini).'
              },
              {
                id: 'c2',
                type: 'code',
                content: `import random

def mock_embedding(text):
    # Simulate a 5-dimensional embedding
    return [round(random.uniform(-1, 1), 4) for _ in range(5)]

print(f"Embedding for 'Hello': {mock_embedding('Hello')}")
print(f"Embedding for 'World': {mock_embedding('World')}")`
              }
            ]
          }
        },
        {
          type: ContentType.CODE_PLAYGROUND,
          codeProject: {
            id: 'embedding-gen-drill',
            language: 'python',
            description: 'Assignment: Implement `batch_embed(texts)`. It should return a list of embeddings (mocked as lists of 3 floats).',
            initialCode: `def batch_embed(texts):
    embeddings = []
    # TODO: Loop through texts
    # TODO: Create a mock list [0.1, 0.2, 0.3] for each
    # TODO: Append to embeddings
    return embeddings

print(batch_embed(["A", "B"]))`,
            hints: [
              { text: 'Use a simple for loop.', relearnLessonId: 'w4-d1-3' },
              { text: 'Append `[0.1, 0.2, 0.3]` to the list.', relearnLessonId: 'w4-d1-3' }
            ],
            solutionCode: `def batch_embed(texts):
    embeddings = []
    for t in texts:
        embeddings.append([0.1, 0.2, 0.3])
    return embeddings

print(batch_embed(["A", "B"]))`,
            expectedOutput: '[[0.1, 0.2, 0.3], [0.1, 0.2, 0.3]]'
          }
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# 5. Index Creation & Management
Vectors are useless if you can't search them fast. We use [[Indexing]].
In Vertex AI, you create an Index Endpoint and deploy the Index to it.
`
        },
        {
          type: ContentType.CODE_PLAYGROUND,
          codeProject: {
            id: 'index-creation-drill',
            language: 'python',
            description: 'Assignment: Mock Index Creation. Define `create_index(name, dimensions)`. Return dict `{"name": name, "dims": dimensions, "status": "CREATING"}`.',
            initialCode: `def create_index(name, dimensions):
    # TODO: Return the config dictionary
    pass

print(create_index("my-rag-index", 768))`,
            hints: [
              { text: 'Return a dictionary `{...}`', relearnLessonId: 'w4-d1-3' },
              { text: 'Ensure keys match instructions.', relearnLessonId: 'w4-d1-3' }
            ],
            solutionCode: `def create_index(name, dimensions):
    return {
        "name": name,
        "dims": dimensions,
        "status": "CREATING"
    }

print(create_index("my-rag-index", 768))`,
            expectedOutput: "{'name': 'my-rag-index', 'dims': 768, 'status': 'CREATING'}"
          }
        }
      ]
    },
    {
      id: 'w4-d4-5',
      title: 'Day 4-5: Retrieval Strategies',
      duration: '2 Days',
      content: [
        {
          type: ContentType.MARKDOWN,
          markdown: `# 1. Beyond Simple Search
Retrieving the right document is the hardest part of RAG.
Simple vector search often fails on specific terms (e.g., part numbers, acronyms).

**Strategies:**
1.  [[Hybrid_Search]]: Combine Vectors (Meaning) + Keywords (Precision).
2.  [[Query_Expansion]]: Rewrite the user's query to find what they *meant*, not just what they *said*.
3.  [[Ranking]]: Re-sort the top results using a smarter model.
`
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# 2. Hybrid Search Implementation
We combine scores from two systems.
**Vector DB**: Returns \`doc_id\` with \`cosine_similarity\`.
**Keyword DB**: Returns \`doc_id\` with \`BM25_score\`.

We normalize these scores and add them up (Weighted Sum).
`
        },
        {
          type: ContentType.CODE_PLAYGROUND,
          codeProject: {
            id: 'hybrid-merge-drill',
            language: 'python',
            description: 'Assignment: Implement `merge_results`. Given `vec_scores` (dict) and `key_scores` (dict), return a dict of `doc_id: final_score`. Use `0.7 * vec + 0.3 * key`.',
            initialCode: `def merge_results(vec_scores, key_scores):
    final_scores = {}
    # TODO: Iterate through all unique doc_ids
    # TODO: Get vec_score (default 0) and key_score (default 0)
    # TODO: Calculate weighted sum
    return final_scores

v_scores = {"doc1": 0.9, "doc2": 0.5}
k_scores = {"doc2": 0.8, "doc3": 0.6}
print(merge_results(v_scores, k_scores))`,
            hints: [
              { text: 'Get all unique keys: `set(vec_scores.keys()) | set(key_scores.keys())`', relearnLessonId: 'w4-d4-5' },
              { text: 'Use `.get(id, 0.0)` to handle missing scores.', relearnLessonId: 'w4-d4-5' }
            ],
            solutionCode: `def merge_results(vec_scores, key_scores):
    final_scores = {}
    all_ids = set(vec_scores.keys()) | set(key_scores.keys())
    
    for doc_id in all_ids:
        v = vec_scores.get(doc_id, 0.0)
        k = key_scores.get(doc_id, 0.0)
        final_scores[doc_id] = (0.7 * v) + (0.3 * k)
        
    return final_scores

v_scores = {"doc1": 0.9, "doc2": 0.5}
k_scores = {"doc2": 0.8, "doc3": 0.6}
print(merge_results(v_scores, k_scores))`,
            expectedOutput: "{'doc1': 0.63, 'doc2': 0.59, 'doc3': 0.18}"
          }
        },
        {
          type: ContentType.CODE_PLAYGROUND,
          codeProject: {
            id: 'keyword-scoring-drill',
            language: 'python',
            description: 'Drill: Keyword Scoring. Before using complex libraries, understand the logic. Implement `keyword_score(query, doc)`. Count how many words from `query` appear in `doc`.',
            initialCode: `def keyword_score(query, doc):
    score = 0
    # TODO: Split query and doc into words (lower case)
    # TODO: For each word in query, check if it exists in doc words
    # TODO: Increment score
    return score

print(keyword_score("apple pie", "I love apple pie"))
print(keyword_score("banana", "I love apple pie"))`,
            hints: [
              { text: 'Use `text.lower().split()`', relearnLessonId: 'w4-d4-5' },
              { text: 'Iterate: `for word in query_words:`', relearnLessonId: 'w4-d4-5' }
            ],
            solutionCode: `def keyword_score(query, doc):
    score = 0
    q_words = query.lower().split()
    d_words = doc.lower().split()
    for w in q_words:
        if w in d_words:
            score += 1
    return score

print(keyword_score("apple pie", "I love apple pie"))
print(keyword_score("banana", "I love apple pie"))`,
            expectedOutput: '2\n0'
          }
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# 3. Query Expansion
Users write bad queries.
*User*: "connection error"
*Docs*: "SocketTimeoutException", "404 Not Found", "DNS Failure"

We use the LLM to **Expand** the query into multiple variations before searching.
`
        },
        {
          type: ContentType.CODE_PLAYGROUND,
          codeProject: {
            id: 'query-expansion-drill',
            language: 'python',
            description: 'Assignment: Mock a query expander. If query is "error", return ["error", "bug", "failure"]. If "slow", return ["slow", "latency", "lag"]. Else return [query].',
            initialCode: `def expand_query(query):
    # TODO: Check keywords
    # TODO: Return list of synonyms
    pass

print(expand_query("I have an error"))
print(expand_query("It is too slow"))`,
            hints: [
              { text: 'Check `if "error" in query:`', relearnLessonId: 'w4-d4-5' },
              { text: 'Return the list of strings.', relearnLessonId: 'w4-d4-5' }
            ],
            solutionCode: `def expand_query(query):
    if "error" in query:
        return ["error", "bug", "failure"]
    elif "slow" in query:
        return ["slow", "latency", "lag"]
    return [query]

print(expand_query("I have an error"))
print(expand_query("It is too slow"))`,
            expectedOutput: "['error', 'bug', 'failure']\n['slow', 'latency', 'lag']"
          }
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# 4. Reranking & Context Optimization
After retrieval, we might have 50 documents. We can't fit them all in the [[Context_Window]].
We use a **Reranker** ([[Cross_Encoder]]) to score them accurately and pick the top 5.

**Context Optimization:**
**Ranking**: Sort by relevance.
**Selection**: Take top N.
**Compression**: Summarize or remove irrelevant parts of the selected docs.
`
        },
        {
          type: ContentType.NOTEBOOK,
          notebook: {
            id: 'nb-reranking',
            title: 'Vector vs Cross-Encoder',
            cells: [
              {
                id: 'c1',
                type: 'markdown',
                content: '### Why Rerank?\nVector search is fast but misses nuance. Cross-Encoders are slow but smart. See how the ranking changes.'
              },
              {
                id: 'c2',
                type: 'code',
                content: `docs = [
    {"id": 1, "text": "Apple fruit", "vec_score": 0.9},
    {"id": 2, "text": "Apple iPhone", "vec_score": 0.88}
]
query = "tasty snack"

# Vector search might put them close because "Apple" is in both.
# A Cross-Encoder sees "tasty snack" + "Apple iPhone" and gives a low score.

def mock_rerank(query, docs):
    for d in docs:
        if "fruit" in d["text"]:
            d["rerank_score"] = 0.99
        else:
            d["rerank_score"] = 0.1
    return sorted(docs, key=lambda x: x["rerank_score"], reverse=True)

print(mock_rerank(query, docs))`
              }
            ]
          }
        },
        {
          type: ContentType.CODE_PLAYGROUND,
          codeProject: {
            id: 'context-packing-drill',
            language: 'python',
            description: 'Assignment: Context Optimization. Given a list of ranked docs (dicts with "text" and "tokens"), select the top N docs that fit within `max_tokens`. Return the list of selected texts.',
            initialCode: `def pack_context(ranked_docs, max_tokens):
    selected_texts = []
    current_tokens = 0
    
    # TODO: Loop through docs
    # TODO: If current_tokens + doc['tokens'] <= max_tokens:
    # TODO: Add doc['text'] to list, update count
    
    return selected_texts

docs = [
    {"text": "Doc A", "tokens": 50},
    {"text": "Doc B", "tokens": 30},
    {"text": "Doc C", "tokens": 40}
]
print(pack_context(docs, 85))`,
            hints: [
              { text: 'Loop through `ranked_docs` in order.', relearnLessonId: 'w4-d4-5' },
              { text: 'Keep a running total of tokens.', relearnLessonId: 'w4-d4-5' },
              { text: 'Stop or skip if the limit is reached.', relearnLessonId: 'w4-d4-5' }
            ],
            solutionCode: `def pack_context(ranked_docs, max_tokens):
    selected_texts = []
    current_tokens = 0
    
    for doc in ranked_docs:
        if current_tokens + doc['tokens'] <= max_tokens:
            selected_texts.append(doc['text'])
            current_tokens += doc['tokens']
            
    return selected_texts

docs = [
    {"text": "Doc A", "tokens": 50},
    {"text": "Doc B", "tokens": 30},
    {"text": "Doc C", "tokens": 40}
]
print(pack_context(docs, 85))`,
            expectedOutput: "['Doc A', 'Doc B']"
          }
        }
      ]
    },
    {
      id: 'w4-d6-7',
      title: 'Day 6-7: Production RAG System',
      duration: '2 Days',
      content: [
        {
          type: ContentType.MARKDOWN,
          markdown: `# 1. The Final Architecture
You have built the pieces. Now we assemble the **Production RAG Agent**.

### Components
1.  **Brain**: Gemini Pro (via Vertex AI).
2.  **Short-Term Memory**: Firestore (Session History).
3.  **Long-Term Memory**: Vector Search (Knowledge Base).
4.  **Ears**: Hybrid Search (Keyword + Semantic).

### The Flow
1.  **User**: "How do I reset my password?"
2.  **Agent**:
    *Step A*: Check History (Context).
    *Step B*: Search Knowledge Base (Retrieval).
    *Step C*: Rerank results.
    *Step D*: Generate Answer using retrieved facts.
    *Step E*: Save interaction to History.
`
        },
        {
          type: ContentType.CODE_PLAYGROUND,
          codeProject: {
            id: 'citation-check-drill',
            language: 'python',
            description: 'Drill: Citation Verification. To prevent hallucinations, we check if the answer references the source. Implement `check_citation(answer, source_id)`. Return True if `source_id` is in `answer`.',
            initialCode: `def check_citation(answer, source_id):
    # TODO: Check if source_id string is inside answer string
    pass

print(check_citation("The sky is blue [Doc1]", "[Doc1]"))
print(check_citation("The sky is blue", "[Doc1]"))`,
            hints: [
              { text: 'Use `if source_id in answer:`', relearnLessonId: 'w4-d6-7' }
            ],
            solutionCode: `def check_citation(answer, source_id):
    return source_id in answer

print(check_citation("The sky is blue [Doc1]", "[Doc1]"))
print(check_citation("The sky is blue", "[Doc1]"))`,
            expectedOutput: 'True\nFalse'
          }
        },
        {
          type: ContentType.CODE_PLAYGROUND,
          codeProject: {
            id: 'capstone-rag-agent',
            language: 'python',
            description: 'Capstone: Build `KnowledgeAgent`. 1) Implement `retrieve(query)` (return "Fact: Reset via settings"). 2) Implement `chat(user_input)`. It should retrieve facts, append to history, and return "Answer based on [Fact]".',
            initialCode: `class KnowledgeAgent:
    def __init__(self):
        self.history = []
    
    def retrieve(self, query):
        # TODO: Return a mock fact string
        pass

    def chat(self, user_input):
        # 1. Retrieve relevant info
        # 2. Add to history
        # 3. Return formatted answer
        pass

bot = KnowledgeAgent()
print(bot.chat("I forgot my password"))`,
            hints: [
              { text: 'In `retrieve`, just return "Fact: Go to Settings -> Security".', relearnLessonId: 'w4-d4-5' },
              { text: 'In `chat`, call `context = self.retrieve(user_input)`.', relearnLessonId: 'w4-d6-7' },
              { text: 'Return f"Answer based on {context}"', relearnLessonId: 'w4-d6-7' }
            ],
            solutionCode: `class KnowledgeAgent:
    def __init__(self):
        self.history = []
    
    def retrieve(self, query):
        return "Fact: Go to Settings -> Security"

    def chat(self, user_input):
        context = self.retrieve(user_input)
        self.history.append(user_input)
        return f"Answer based on {context}"

bot = KnowledgeAgent()
print(bot.chat("I forgot my password"))`,
            expectedOutput: 'Answer based on Fact: Go to Settings -> Security'
          }
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# 2. Evaluation
How do you know your RAG is good?
We test with **Golden Queries**.

**Faithfulness**: Did the answer come from the docs?
**Relevance**: Did it answer the user's question?
**Recall**: Did it find the right document?
`
        },
        {
          type: ContentType.QUIZ,
          quiz: {
            id: 'quiz-week-4',
            title: 'Week 4 Certification Quiz',
            questions: [
              {
                id: 'q1',
                question: 'What is the primary purpose of Chunking?',
                options: ['To save storage space', 'To fit text into the Context Window and improve semantic precision', 'To encrypt the data', 'To make the text readable by humans'],
                correctOptionIndex: 1,
                explanation: 'LLMs have token limits. Chunking ensures we only send relevant parts, not the whole library.',
                hint: { text: 'Think about "Context Limits".', relearnLessonId: 'w4-d1-3' },
                optionExplanations: [
                  { text: 'Chunking often increases storage overhead due to metadata.', relearnLessonId: 'w4-d1-3' },
                  { text: 'Correct. It creates bite-sized pieces for the LLM.', relearnLessonId: 'w4-d1-3' },
                  { text: 'Chunking is not encryption.', relearnLessonId: 'w4-d1-3' },
                  { text: 'It often breaks sentences, making it harder for humans to read out of context.', relearnLessonId: 'w4-d1-3' }
                ]
              },
              {
                id: 'q2',
                question: 'What does Hybrid Search combine?',
                options: ['Images and Text', 'Vectors (Semantic) and Keywords (BM25)', 'SQL and NoSQL', 'Python and Java'],
                correctOptionIndex: 1,
                explanation: 'It balances the broad understanding of vectors with the precision of keyword matching.',
                hint: { text: 'Meaning vs Exact Match.', relearnLessonId: 'w4-d4-5' },
                optionExplanations: [
                  { text: 'That is Multi-modal search.', relearnLessonId: 'w4-d4-5' },
                  { text: 'Correct. Best of both worlds.', relearnLessonId: 'w4-d4-5' },
                  { text: 'Those are database types.', relearnLessonId: 'w4-d4-5' },
                  { text: 'Those are programming languages.', relearnLessonId: 'w4-d4-5' }
                ]
              },
              {
                id: 'q3',
                question: 'Why do we need Reranking?',
                options: ['To sort results alphabetically', 'To select the most relevant documents from a larger retrieved set', 'To translate documents', 'To compress documents'],
                correctOptionIndex: 1,
                explanation: 'Vector search is fast but approximate. A Reranker (Cross-Encoder) is slow but accurate, so we use it on the top N results.',
                hint: { text: 'Quality over Quantity.', relearnLessonId: 'w4-d4-5' },
                optionExplanations: [
                  { text: 'Alphabetical sorting is rarely useful for relevance.', relearnLessonId: 'w4-d4-5' },
                  { text: 'Correct. It refines the selection for the LLM context.', relearnLessonId: 'w4-d4-5' },
                  { text: 'Translation is a different task.', relearnLessonId: 'w4-d4-5' },
                  { text: 'Compression is summarization.', relearnLessonId: 'w4-d4-5' }
                ]
              },
              {
                id: 'q4',
                question: 'What does "Faithfulness" measure in RAG?',
                options: ['If the answer is polite', 'If the answer comes solely from the retrieved context', 'If the answer is grammatically correct', 'If the answer matches the user\'s opinion'],
                correctOptionIndex: 1,
                explanation: 'Faithfulness ensures the model is not hallucinating info outside the provided documents.',
                hint: { text: 'Is it faithful to the source material?', relearnLessonId: 'w4-d6-7' },
                optionExplanations: [
                  { text: 'Politeness is style, not faithfulness.', relearnLessonId: 'w4-d6-7' },
                  { text: 'Correct. It checks for hallucinations.', relearnLessonId: 'w4-d6-7' },
                  { text: 'Grammar is fluency.', relearnLessonId: 'w4-d6-7' },
                  { text: 'That would be "alignment" or "sycophancy".', relearnLessonId: 'w4-d6-7' }
                ]
              }
            ]
          }
        }
      ]
    }
  ]
}

export default phase2Week4;