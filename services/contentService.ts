import { CoursePhase, EncyclopediaEntry, ContentType } from '../types';

// --- Encyclopedia Data (The Knowledge Graph) ---
export const encyclopediaData: Record<string, EncyclopediaEntry> = {
  // --- Architecture Core ---
  'agent': {
    id: 'agent',
    term: 'Agent',
    category: 'ADK Core',
    summary: 'The reasoning engine of the application.',
    adkContext: 'In ADK, an Agent is a Python class wrapping an LLM with specific instructions and tool access. It is not just a prompt; it is a stateful entity that perceives, reasons, and acts.',
    pythonInternals: `Agents are typically implemented as subclasses of \`BaseAgent\`.
\`\`\`python
class MyAgent(BaseAgent):
    def run(self, input):
        # Internal loop of Thought -> Action -> Observation
\`\`\`
`,
    relatedTerms: ['Tools', 'Orchestration', 'State']
  },
  'orchestration': {
    id: 'orchestration',
    term: 'Orchestration',
    category: 'ADK Core',
    summary: 'The coordination of multiple agents or tasks to achieve a complex goal.',
    adkContext: 'Single agents are powerful, but complex workflows (like writing a book) require Orchestration. One agent outlines, another writes, a third edits. ADK provides patterns like "Supervisor" or "Router" to manage this.',
    pythonInternals: 'Often implemented as a state machine (using libraries like `langgraph`) where the output of Agent A becomes the input of Agent B.',
    relatedTerms: ['Agent', 'Workflow', 'State']
  },
  'determinism': {
    id: 'determinism',
    term: 'Determinism',
    category: 'Computer Science',
    summary: 'A property of a system where the same input always produces the exact same output.',
    adkContext: 'Traditional software is deterministic (`if x > 5`). AI Agents are **probabilistic**. They might answer differently each time. ADK helps manage this uncertainty using structured outputs and grounding.',
    pythonInternals: 'Standard Python functions are deterministic. Calls to `model.generate_content()` are non-deterministic unless `temperature` is set to 0 (and even then, some variance exists).',
    relatedTerms: ['Probabilistic', 'Temperature']
  },
  'probabilistic': {
    id: 'probabilistic',
    term: 'Probabilistic',
    category: 'Computer Science',
    summary: 'Systems based on probabilities, where outputs vary.',
    adkContext: 'LLMs predict the "most likely" next token. This allows creativity but introduces risk. ADK agents use "Grounding" to reduce hallucinations in probabilistic systems.',
    pythonInternals: 'Under the hood, the model outputs a probability distribution (logits) for the next token, and a sampler chooses one.',
    relatedTerms: ['Determinism', 'LLM']
  },
  'llm': {
    id: 'llm',
    term: 'LLM',
    category: 'AI Fundamentals',
    summary: 'Large Language Model. A neural network trained on vast text data to predict the next token.',
    adkContext: 'The "Engine" inside an Agent. ADK supports Gemini (Vertex AI). The Agent framework provides the "Chassis" (Memory, Tools) around this engine.',
    pythonInternals: 'Accessed via SDKs. `response = model.generate_content(prompt)` returns a `GenerationResponse` object.',
    relatedTerms: ['Token', 'Context Window']
  },
  'token': {
    id: 'token',
    term: 'Token',
    category: 'AI Fundamentals',
    summary: 'The basic unit of text for an LLM (roughly 4 characters).',
    adkContext: 'Billing and "Memory" are measured in tokens. If an agent has a "1 Million Token Context Window", it can "read" about 700,000 words at once.',
    pythonInternals: 'Strings are encoded into integers (Tokens) before being sent to the API.',
    relatedTerms: ['Context Window', 'Cost']
  },
  'tool': {
      id: 'tool',
      term: 'Tool',
      category: 'ADK Core',
      summary: 'Interfaces that allow Agents to interact with the outside world.',
      adkContext: 'Tools are Python functions decorated with specific metadata that describes their usage to the LLM. They bridge the probabilistic mind with the deterministic world.',
      pythonInternals: `Tools often use the \`@tool\` decorator.
\`\`\`python
@tool
def get_weather(city: str) -> str:
    """Returns weather data for a specific city."""
    return requests.get(f"api.weather.com/{city}")
\`\`\`
The **docstring** is CRITICAL: it is passed to the LLM so it knows *when* and *how* to use the tool.`,
      relatedTerms: ['Decorator', 'Function', 'JSON Schema']
  },
  'json_schema': {
      id: 'json_schema',
      term: 'JSON Schema',
      category: 'Data Structures',
      summary: 'A vocabulary that allows you to annotate and validate JSON documents.',
      adkContext: 'When you define a Python tool, ADK converts it into a JSON Schema. The LLM reads this schema to understand what arguments (inputs) the tool needs.',
      pythonInternals: 'Libraries like `pydantic` are often used to generate these schemas automatically from Python type hints.',
      relatedTerms: ['Tool', 'Type Hinting']
  },
  'type_hinting': {
      id: 'type_hinting',
      term: 'Type Hinting',
      category: 'Python Features',
      summary: 'Syntax to declare the expected type of variables.',
      adkContext: 'Mandatory for Tools. `def add(a: int, b: int) -> int`. Without hints, the LLM doesn\'t know if it should send a number `5` or a string `"5"`.',
      pythonInternals: 'Python ignores these at runtime (unless using a validator), but ADK uses introspection to read them for schema generation.',
      relatedTerms: ['Tool', 'JSON Schema']
  },
  'bigquery': {
      id: 'bigquery',
      term: 'BigQuery',
      category: 'GCP Services',
      summary: 'Google\'s fully managed, serverless data warehouse.',
      adkContext: 'A common use case for Agents is "Data Agents". You give the agent a tool to run SQL queries on BigQuery so it can answer questions like "What were sales last month?" by looking at real data.',
      pythonInternals: `Accessed via \`google-cloud-bigquery\`.
\`\`\`python
from google.cloud import bigquery
client = bigquery.Client()

# Run a query
query_job = client.query("SELECT * FROM my_dataset.my_table LIMIT 10")
results = query_job.result()  # Waits for job to complete

for row in results:
    print(row.name)
\`\`\`
`,
      relatedTerms: ['SQL', 'Tool', 'GCP']
  },
  'hallucination': {
      id: 'hallucination',
      term: 'Hallucination',
      category: 'AI Risks',
      summary: 'When an LLM generates factually incorrect information confidently.',
      adkContext: 'Agents use **[[Tool]]**s to prevent hallucination. Instead of guessing the weather, they look it up.',
      pythonInternals: 'Caused by the probabilistic nature of the model predicting the next token based on training data, not real-time facts.',
      relatedTerms: ['Grounding', 'Probabilistic']
  },
  'grounding': {
      id: 'grounding',
      term: 'Grounding',
      category: 'AI Reliability',
      summary: 'Anchoring model outputs to verifiable sources of information.',
      adkContext: 'Connecting an Agent to a database (like **[[BigQuery]]**) or a Search API grounds its responses in reality.',
      pythonInternals: 'Often implemented by injecting tool outputs back into the prompt context before the model generates the final answer.',
      relatedTerms: ['Hallucination', 'RAG']
  },
  'prompt_engineering': {
      id: 'prompt_engineering',
      term: 'Prompt Engineering',
      category: 'AI Fundamentals',
      summary: 'The art of crafting inputs (prompts) to guide the LLM to the desired output.',
      adkContext: 'While Agents use code, the "System Instruction" is still a prompt. Good engineering (like Few-Shot) improves Agent reliability.',
      pythonInternals: 'Prompts are just strings concatenated before tokenization.',
      relatedTerms: ['LLM', 'Context Window']
  },
  'context_window': {
      id: 'context_window',
      term: 'Context Window',
      category: 'AI Constraints',
      summary: 'The maximum amount of text (tokens) an LLM can process at once.',
      adkContext: 'If conversation history exceeds the window, the agent "forgets" the beginning. Strategies like "Sliding Window" or "Summarization" are used to manage this.',
      pythonInternals: 'Gemini 1.5 Pro has a 1M+ token window, reducing the need for complex memory management, but cost is still a factor.',
      relatedTerms: ['Token', 'LLM', 'Memory']
  },
  'pydantic': {
      id: 'pydantic',
      term: 'Pydantic',
      category: 'Python Libraries',
      summary: 'Data validation and settings management using Python type annotations.',
      adkContext: 'ADK uses Pydantic under the hood to validate Tool arguments. If the LLM sends a string for an integer field, Pydantic raises an error.',
      pythonInternals: `
\`\`\`python
from pydantic import BaseModel, Field

class User(BaseModel):
    id: int
    name: str = Field(description="The user's full name")

# Validation happens on instantiation
user = User(id=123, name="Alice")
print(user.model_dump_json())
\`\`\`
`,
      relatedTerms: ['Type Hinting', 'JSON Schema', 'Validation']
  },
  'docstring': {
      id: 'docstring',
      term: 'Docstring',
      category: 'Python Syntax',
      summary: 'A string literal specified in source code that is used, like a comment, to document a specific segment of code.',
      adkContext: 'For Tools, the docstring is NOT just for humans. It is sent to the LLM to explain *what* the tool does. Bad docstrings = Confused Agents.',
      pythonInternals: 'Accessed via `__doc__`.',
      relatedTerms: ['Tool', 'Prompt Engineering']
  },
  'cloud_storage': {
      id: 'cloud_storage',
      term: 'Cloud Storage',
      category: 'GCP Services',
      summary: 'Object storage for companies of all sizes. Store any amount of data.',
      adkContext: 'Agents use GCS to read/write files (PDFs, Images) that are too large for the context window.',
      pythonInternals: `Accessed via \`google-cloud-storage\`.
\`\`\`python
from google.cloud import storage
client = storage.Client()
bucket = client.bucket("my-bucket-name")
blob = bucket.blob("folder/file.txt")

# Write
blob.upload_from_string("Hello World")

# Read
content = blob.download_as_text()
\`\`\`
`,
      relatedTerms: ['GCP', 'Blob']
  },
  'firestore': {
      id: 'firestore',
      term: 'Firestore',
      category: 'GCP Services',
      summary: 'NoSQL document database built for automatic scaling.',
      adkContext: 'Used by Agents to persist long-term memory (Session History) so users can continue chats days later.',
      pythonInternals: `Accessed via \`google-cloud-firestore\`.
\`\`\`python
from google.cloud import firestore
db = firestore.Client()

# Write Data
doc_ref = db.collection("users").document("alovelace")
doc_ref.set({"first": "Ada", "born": 1815})

# Read Data
doc = doc_ref.get()
if doc.exists:
    print(doc.to_dict())
\`\`\`
`,
      relatedTerms: ['Database', 'State']
  },
  'vertex_ai_search': {
      id: 'vertex_ai_search',
      term: 'Vertex AI Search',
      category: 'GCP Services',
      summary: 'Google-quality search and discovery for your own data.',
      adkContext: 'Enables RAG (Retrieval Augmented Generation). The Agent searches your PDFs/Docs to answer questions.',
      pythonInternals: 'Previously "Gen App Builder".',
      relatedTerms: ['RAG', 'Grounding']
  },
  'built_in_tools': {
      id: 'built_in_tools',
      term: 'Built-in Tools',
      category: 'ADK Features',
      summary: 'Pre-made tools provided by the framework.',
      adkContext: 'ADK comes with tools like `CodeInterpreter` (run Python) and `GoogleSearch`. You don\'t need to write these from scratch.',
      pythonInternals: '`from adk.tools import GoogleSearchTool`',
      relatedTerms: ['Tool', 'Code Interpreter']
  },
  'validation_error': {
      id: 'validation_error',
      term: 'Validation Error',
      category: 'Error Handling',
      summary: 'Error raised when inputs do not match the expected schema.',
      adkContext: 'If a tool expects an `int` but gets "five", Pydantic raises a ValidationError. The Agent sees this error and usually tries to correct itself.',
      pythonInternals: '`pydantic.ValidationError`',
      relatedTerms: ['Pydantic', 'Type Hinting']
  },
  'tool_chaining': {
      id: 'tool_chaining',
      term: 'Tool Chaining',
      category: 'Agent Patterns',
      summary: 'The process where an Agent uses the output of one tool as the input for another.',
      adkContext: 'Example: Agent calls `search_google("weather in NY")` -> gets "Rainy" -> calls `recommend_outfit("Rainy")`.',
      pythonInternals: 'The LLM handles this naturally by generating multiple tool calls in sequence or loop iterations.',
      relatedTerms: ['Orchestration', 'Reasoning Loop']
  },
  'api_integration': {
      id: 'api_integration',
      term: 'API Integration',
      category: 'Connectivity',
      summary: 'Connecting an Agent to external services via HTTP requests.',
      adkContext: 'Agents are not limited to GCP. They can call Slack, Jira, or any REST API using standard Python libraries inside a Tool.',
      pythonInternals: `Standard library \`requests\` is used.
\`\`\`python
import requests

# GET
resp = requests.get("https://api.example.com/data")
data = resp.json()

# POST
resp = requests.post("https://api.example.com/update", json={"id": 1})
if resp.status_code == 200:
    print("Success")
\`\`\`
`,
      relatedTerms: ['REST', 'JSON']
  },
  'gcp_console': {
      id: 'gcp_console',
      term: 'GCP Console',
      category: 'GCP Tools',
      summary: 'The web-based interface for managing Google Cloud resources.',
      adkContext: 'You use the console to create projects, enable billing, and turn on APIs (like BigQuery) so your Agent can use them.',
      pythonInternals: 'N/A (Web UI)',
      relatedTerms: ['GCP', 'Project']
  },
  'api_enablement': {
      id: 'api_enablement',
      term: 'API Enablement',
      category: 'GCP Configuration',
      summary: 'The process of turning on specific services for your project.',
      adkContext: 'Even if you have credentials, your Agent cannot call BigQuery unless the "BigQuery API" is enabled in the Console.',
      pythonInternals: 'Errors usually look like "API has not been used in project..."',
      relatedTerms: ['GCP Console', 'Service Account']
  },
  'async_tools': {
      id: 'async_tools',
      term: 'Async Tools',
      category: 'Advanced Patterns',
      summary: 'Tools defined with `async def` to allow non-blocking execution.',
      adkContext: 'Critical for high-performance agents. Allows the agent to do other work (or run other tools) while waiting for a slow API.',
      pythonInternals: 'Uses Python\'s `asyncio` library. `async def my_tool(): await ...`',
      relatedTerms: ['Concurrency', 'Performance']
  },
  'caching': {
      id: 'caching',
      term: 'Caching',
      category: 'Optimization',
      summary: 'Storing the result of an expensive operation to reuse it later.',
      adkContext: 'If an agent asks "Get Stock Price" twice in 1 minute, caching prevents a second API call, saving money and time.',
      pythonInternals: 'Decorators like `@functools.lru_cache` or custom dictionaries.',
      relatedTerms: ['Optimization', 'Latency']
  },
  'parallel_execution': {
      id: 'parallel_execution',
      term: 'Parallel Execution',
      category: 'Advanced Patterns',
      summary: 'Running multiple tools simultaneously.',
      adkContext: 'If an agent needs Weather and Stock Price, it shouldn\'t wait for one to finish before starting the other. ADK handles this if tools are async.',
      pythonInternals: '`asyncio.gather()`',
      relatedTerms: ['Async Tools', 'Concurrency']
  },
  'tool_routing': {
      id: 'tool_routing',
      term: 'Tool Routing',
      category: 'Orchestration',
      summary: 'Logic that decides which tool (or version of a tool) to call.',
      adkContext: 'Useful for versioning ("Use SearchV2 for new queries, SearchV1 for legacy") or specialized routing ("Use MedicalSearch for health queries").',
      pythonInternals: 'Often implemented as a "Router Agent" or simple conditional logic.',
      relatedTerms: ['Orchestration', 'Versioning']
  },
  'deprecation': {
      id: 'deprecation',
      term: 'Deprecation',
      category: 'Software Lifecycle',
      summary: 'Marking a feature as obsolete to warn users it will be removed in the future.',
      adkContext: 'When upgrading Tools, you don\'t delete the old one immediately (which breaks Agents). You mark it deprecated so the Agent (or developer) knows to switch.',
      pythonInternals: '`warnings.warn("Use v2", DeprecationWarning)`',
      relatedTerms: ['Versioning', 'Tool Routing']
  },
  'latency': {
      id: 'latency',
      term: 'Latency',
      category: 'Performance',
      summary: 'The time delay between a request and a response.',
      adkContext: 'High latency in Tools makes the Agent feel slow. Async tools and Caching are the primary ways to reduce latency.',
      pythonInternals: 'Measured in milliseconds (ms).',
      relatedTerms: ['Caching', 'Async Tools']
  },
  'vector_store': {
      id: 'vector_store',
      term: 'Vector Store',
      category: 'AI Memory',
      summary: 'A database optimized for storing and searching vector embeddings.',
      adkContext: 'Used for Long-Term Memory. The Agent converts memories into vectors, stores them here, and retrieves relevant ones later using Semantic Search.',
      pythonInternals: 'Common options: Vertex AI Vector Search, Pinecone, ChromaDB.',
      relatedTerms: ['Embeddings', 'Semantic Search', 'RAG']
  },
  'embeddings': {
      id: 'embeddings',
      term: 'Embeddings',
      category: 'AI Fundamentals',
      summary: 'Numerical representations of text where similar meanings have similar numbers.',
      adkContext: 'To "remember" things, we turn text into lists of floating-point numbers (vectors). "Dog" and "Puppy" will have vectors that are mathematically close.',
      pythonInternals: '`model.get_embeddings("text")` returns `[0.1, -0.5, ...]`',
      relatedTerms: ['Vector Store', 'Cosine Similarity']
  },
  'semantic_search': {
      id: 'semantic_search',
      term: 'Semantic Search',
      category: 'AI Retrieval',
      summary: 'Searching data by meaning rather than keyword matching.',
      adkContext: 'Allows an Agent to find "How to fix a flat tire" even if the user asks "My car wheel is busted".',
      pythonInternals: 'Calculated using Cosine Similarity between the query vector and stored vectors.',
      relatedTerms: ['Embeddings', 'Vector Store']
  },
  'cosine_similarity': {
      id: 'cosine_similarity',
      term: 'Cosine Similarity',
      category: 'Math',
      summary: 'A metric used to measure how similar two vectors are.',
      adkContext: 'The core math behind Semantic Search. Returns a value between -1 (opposite) and 1 (identical).',
      pythonInternals: '`dot(A, B) / (norm(A) * norm(B))`',
      relatedTerms: ['Embeddings', 'Vector Store']
  },
  'ranking': {
      id: 'ranking',
      term: 'Ranking',
      category: 'Search',
      summary: 'The process of ordering search results by relevance.',
      adkContext: 'After retrieving 100 documents from a Vector Store, a "Reranker" model might re-sort them to find the top 5 most relevant ones for the LLM context.',
      pythonInternals: 'Often uses a Cross-Encoder model.',
      relatedTerms: ['Retrieval', 'Semantic Search']
  },
  'cross_encoder': {
      id: 'cross_encoder',
      term: 'Cross-Encoder',
      category: 'AI Models',
      summary: 'A model that processes two inputs (Query + Document) simultaneously to output a relevance score.',
      adkContext: 'Used for **[[Ranking]]**. It is slower than Vector Search (Bi-Encoder) but much more accurate because it sees the interaction between words in the query and document.',
      pythonInternals: '`score = model.predict([(query, doc)])`',
      relatedTerms: ['Ranking', 'Embeddings']
  },
  'bm25': {
      id: 'bm25',
      term: 'BM25',
      category: 'Search Algorithms',
      summary: 'Best Matching 25. A ranking function used by search engines to estimate the relevance of documents to a given search query.',
      adkContext: 'The standard algorithm for **[[Hybrid_Search]]** (Keyword part). It cares about exact word frequency, unlike Vectors.',
      pythonInternals: 'Available in libraries like `rank_bm25`.',
      relatedTerms: ['Hybrid Search', 'TF-IDF']
  },
  'hybrid_search': {
      id: 'hybrid_search',
      term: 'Hybrid Search',
      category: 'Search',
      summary: 'Combining Keyword Search (BM25) with Semantic Search (Vectors).',
      adkContext: 'Vectors are bad at exact matches (like part numbers "X-123"). Keywords are bad at concepts. Hybrid search gives the best of both.',
      pythonInternals: '`weighted_score = alpha * vector_score + (1 - alpha) * keyword_score`',
      relatedTerms: ['Vector Store', 'Elasticsearch']
  },
  'summarization': {
      id: 'summarization',
      term: 'Summarization',
      category: 'NLP Tasks',
      summary: 'Reducing text length while preserving key information.',
      adkContext: 'Used to compress Conversation History so it fits in the Context Window without losing the "gist" of what happened.',
      pythonInternals: '`model.generate_content("Summarize this: " + history)`',
      relatedTerms: ['Context Window', 'Pruning']
  },
  'rag': {
      id: 'rag',
      term: 'RAG',
      category: 'Architecture',
      summary: 'Retrieval Augmented Generation.',
      adkContext: 'The pattern of fetching data (Retrieval) and passing it to the LLM (Generation) to ground the response in facts.',
      pythonInternals: 'Retrieve -> Concat to Prompt -> Generate.',
      relatedTerms: ['Grounding', 'Vector Store']
  },
  'chunking': {
      id: 'chunking',
      term: 'Chunking',
      category: 'RAG Pipeline',
      summary: 'Splitting large documents into smaller, manageable pieces.',
      adkContext: 'LLMs have context limits. We cannot feed a whole book. We chunk it into paragraphs so we can retrieve only the relevant parts.',
      pythonInternals: 'Libraries like `langchain` provide `RecursiveCharacterTextSplitter`.',
      relatedTerms: ['Context Window', 'Embeddings']
  },
  'metadata': {
      id: 'metadata',
      term: 'Metadata',
      category: 'Data',
      summary: 'Data that provides information about other data.',
      adkContext: 'In RAG, we attach metadata (Author, Date) to chunks. This allows "Pre-filtering" (e.g., "Search only documents from 2024").',
      pythonInternals: 'Stored as a JSON object alongside the vector in the Vector Store.',
      relatedTerms: ['Vector Store', 'Filtering']
  },
  'ingestion': {
      id: 'ingestion',
      term: 'Ingestion',
      category: 'Data Pipeline',
      summary: 'The process of importing data for immediate use or storage.',
      adkContext: 'The first step of RAG. Reading PDFs, HTML, or Docx files and converting them into plain text.',
      pythonInternals: 'Libraries: `pypdf`, `beautifulsoup4`, `unstructured`.',
      relatedTerms: ['RAG', 'Preprocessing']
  },
  'corpus': {
      id: 'corpus',
      term: 'Corpus',
      category: 'NLP Data',
      summary: 'A collection of written texts.',
      adkContext: 'In RAG, your "Corpus" is the set of PDFs, Docs, and Wikis that you ingest into the Vector Store.',
      pythonInternals: 'Usually stored as a list of strings or documents before chunking.',
      relatedTerms: ['Ingestion', 'Dataset']
  },
  'preprocessing': {
      id: 'preprocessing',
      term: 'Preprocessing',
      category: 'Data Pipeline',
      summary: 'Cleaning and normalizing text before chunking.',
      adkContext: 'Removing HTML tags, fixing encoding errors, and normalizing whitespace ensures high-quality embeddings.',
      pythonInternals: '`text = text.replace("\\n", " ").strip()`',
      relatedTerms: ['Ingestion', 'Chunking']
  },
  'indexing': {
      id: 'indexing',
      term: 'Indexing',
      category: 'Vector Search',
      summary: 'Organizing vectors in a data structure for fast retrieval.',
      adkContext: 'Vertex AI Vector Search builds an index (like a tree) so it can find the nearest neighbor in milliseconds without checking every single vector.',
      pythonInternals: 'Algorithms like HNSW (Hierarchical Navigable Small World) or IVF (Inverted File Index).',
      relatedTerms: ['Vector Store', 'Latency']
  },
  'faithfulness': {
      id: 'faithfulness',
      term: 'Faithfulness',
      category: 'RAG Evaluation',
      summary: 'A metric measuring if the generated answer is derived solely from the retrieved context.',
      adkContext: 'Prevents hallucinations. If the context says "Sky is green" and Agent says "Sky is blue" (from training data), Faithfulness is low.',
      pythonInternals: 'Evaluated using LLM-as-a-Judge (asking another LLM to compare answer vs context).',
      relatedTerms: ['Hallucination', 'Grounding']
  },
  'relevance': {
      id: 'relevance',
      term: 'Relevance',
      category: 'RAG Evaluation',
      summary: 'A metric measuring if the generated answer actually addresses the user query.',
      adkContext: 'An answer can be faithful (factually correct based on docs) but irrelevant (doesn\'t answer the specific question).',
      pythonInternals: 'Evaluated using LLM-as-a-Judge.',
      relatedTerms: ['Precision', 'Recall']
  },
  'recall': {
      id: 'recall',
      term: 'Recall',
      category: 'Search Metrics',
      summary: 'The fraction of relevant documents that were successfully retrieved.',
      adkContext: 'If there are 10 docs about "Pricing" and your RAG retrieves 8 of them, Recall is 0.8.',
      pythonInternals: '`relevant_retrieved / total_relevant`',
      relatedTerms: ['Precision', 'Retrieval']
  },
  'precision': {
      id: 'precision',
      term: 'Precision',
      category: 'Search Metrics',
      summary: 'The fraction of retrieved documents that are actually relevant.',
      adkContext: 'If your RAG retrieves 10 docs and only 2 are about "Pricing", Precision is 0.2. Low precision confuses the LLM.',
      pythonInternals: '`relevant_retrieved / total_retrieved`',
      relatedTerms: ['Recall', 'Reranking']
  },
  'query_expansion': {
      id: 'query_expansion',
      term: 'Query Expansion',
      category: 'RAG Optimization',
      summary: 'Improving search results by generating synonyms or related questions from the original query.',
      adkContext: 'If a user asks "My car won\'t start", the Agent might expand this to "car battery dead", "ignition failure", etc., to find more relevant docs.',
      pythonInternals: '`model.generate_content("Generate 3 search queries for: " + user_query)`',
      relatedTerms: ['RAG', 'Semantic Search']
  },

  // --- Python & Environment Deep Dives ---
  'virtual_environment': {
      id: 'virtual_environment',
      term: 'Virtual Environment',
      category: 'Development Setup',
      summary: 'An isolated self-contained directory tree that contains a Python installation for a particular version of Python.',
      adkContext: 'ADK projects require specific versions of libraries (like `langchain`, `google-cloud-aiplatform`). Installing these globally can break your OS tools. ALWAYS use a venv.',
      pythonInternals: `When you activate a venv, it modifies your shell's \`PATH\` variable to point to the venv's \`bin\` folder.
\`\`\`bash
# What happens when you type 'python'
/usr/bin/python  # Global (BAD)
/my-project/venv/bin/python # Local (GOOD)
\`\`\`
`,
      history: 'Introduced to solve "Dependency Hell" where Project A needs Lib v1.0 and Project B needs Lib v2.0.',
      relatedTerms: ['PATH', 'pip', 'Dependency Hell']
  },
  'pip': {
      id: 'pip',
      term: 'pip',
      category: 'Python Ecosystem',
      summary: 'The package installer for Python.',
      adkContext: 'You will use `pip install google-cloud-aiplatform` to get the ADK SDKs.',
      pythonInternals: 'Fetches packages from PyPI (Python Package Index).',
      relatedTerms: ['Virtual Environment', 'Dependency']
  },
  'environment_variable': {
      id: 'environment_variable',
      term: 'Environment Variable',
      category: 'OS Concepts',
      summary: 'Dynamic named values that can affect the way running processes will behave on a computer.',
      adkContext: 'We use env vars to store **Secrets** (API Keys, Project IDs). NEVER hardcode secrets in your Python files. ADK looks for `GOOGLE_APPLICATION_CREDENTIALS`.',
      pythonInternals: `Accessed via \`os.environ\`.
\`\`\`python
import os
api_key = os.environ.get("API_KEY")
\`\`\`
`,
      relatedTerms: ['Service Account', 'Security']
  },
  'service_account': {
      id: 'service_account',
      term: 'Service Account',
      category: 'GCP Security',
      summary: 'A special type of Google account intended to represent a non-human user (like your Agent).',
      adkContext: 'Your agent needs permission to call Vertex AI. You don\'t use your Gmail password; you use a Service Account Key (JSON) or ADC.',
      pythonInternals: 'The SDK looks for credentials in this order: Code -> Env Var -> ADC -> Metadata Server.',
      relatedTerms: ['ADC', 'IAM', 'GCP']
  },
  'adc': {
      id: 'adc',
      term: 'ADC',
      category: 'GCP Security',
      summary: 'Application Default Credentials.',
      adkContext: 'The standard way to handle auth. Locally, you run `gcloud auth application-default login`. In the cloud, it happens automatically.',
      pythonInternals: '`google.auth.default()` is the function that magically finds your credentials.',
      relatedTerms: ['Service Account', 'CLI']
  },
  'cloud_run': {
      id: 'cloud_run',
      term: 'Cloud Run',
      category: 'GCP Compute',
      summary: 'A managed compute platform that lets you run containers directly on top of Google\'s scalable infrastructure.',
      adkContext: 'The standard way to deploy ADK agents. You package your Python code into a Docker container, and Cloud Run gives you a HTTPS URL (Webhook) for your agent.',
      pythonInternals: 'Requires a `Dockerfile` and a web server (like FastAPI or Flask) to listen for requests.',
      relatedTerms: ['Docker', 'Deploy', 'Webhook']
  },
  'cli': {
      id: 'cli',
      term: 'CLI',
      category: 'Computing Concepts',
      summary: 'Command Line Interface.',
      adkContext: 'You will use the ADK CLI (`adk init`, `adk deploy`) to manage your project lifecycle.',
      pythonInternals: 'Python CLI tools are often built using `argparse` or `click`.',
      relatedTerms: ['Terminal', 'Shell']
  },
  'sdk': {
      id: 'sdk',
      term: 'SDK',
      category: 'Computing Concepts',
      summary: 'Software Development Kit.',
      adkContext: 'The Vertex AI SDK allows your Python code to talk to Gemini models. Without the SDK, you would have to write raw HTTP requests.',
      pythonInternals: 'Wrappers around API endpoints, handling authentication and error retry logic automatically.',
      relatedTerms: ['API', 'Library']
  },
  'vertex_ai': {
      id: 'vertex_ai',
      term: 'Vertex AI',
      category: 'GCP Services',
      summary: 'Google Cloud\'s unified AI platform.',
      adkContext: 'ADK is the framework, but Vertex AI is the platform providing the models (Gemini), vector search, and evaluation tools.',
      pythonInternals: `
\`\`\`python
import vertexai
from vertexai.generative_models import GenerativeModel

vertexai.init(project="my-project", location="us-central1")
model = GenerativeModel("gemini-1.5-pro")

response = model.generate_content("Why is the sky blue?")
print(response.text)
\`\`\`
`,
      relatedTerms: ['Gemini', 'GCP', 'SDK']
  },

  // --- Python Syntax Deep Dives ---
  'class': {
      id: 'class',
      term: 'Class',
      category: 'Core Python',
      summary: 'A blueprint for creating objects.',
      adkContext: 'Every Agent you build is a **Class**. Understanding OOP is mandatory.',
      pythonInternals: `
\`\`\`python
class Dog:  # The Blueprint
    pass
my_dog = Dog() # The Object (Instance)
\`\`\`
`,
      relatedTerms: ['Instance', 'Method', 'Self']
  },
  'init': {
    id: 'init',
    term: '__init__',
    category: 'Python Internals',
    summary: 'The initialization method in Python classes.',
    adkContext: `In ADK, \`__init__\` is the bridge between your Blueprint (code) and the Live Agent. You must call \`super().__init__\` to wire up the ADK telemetry.`,
    pythonInternals: `Contrary to popular belief, \`__init__\` is NOT the constructor (that's \`__new__\`). It is the initializer.`,
    crossLanguage: `| Language | Syntax |
| :--- | :--- |
| **Java** | \`public Agent() { ... }\` |
| **JavaScript** | \`constructor() { ... }\` |`,
    history: `Origin: Simula 67 (1967).`,
    relatedTerms: ['self', 'super', 'inheritance']
  },
  'self': {
      id: 'self',
      term: 'self',
      category: 'Core Python',
      summary: 'A reference to the current instance of the class.',
      adkContext: 'In your agent methods, you use `self.memory` to access previous conversations. Without `self`, you are accessing global variables (bad).',
      pythonInternals: 'Python passes the object as the first argument to instance methods automatically.',
      relatedTerms: ['Class', 'Instance']
  },
  'decorator': {
      id: 'decorator',
      term: 'Decorator',
      category: 'Advanced Python',
      summary: 'A design pattern to add functionality to an object without modifying its structure.',
      adkContext: 'Used heavily in ADK for tools (`@tool`). It tells the framework "Register this function".',
      pythonInternals: `Syntactic sugar for passing a function into another function.`,
      relatedTerms: ['Wrapper', 'Higher-Order Function']
  },
  'inheritance': {
      id: 'inheritance',
      term: 'Inheritance',
      category: 'Core Python',
      summary: 'Basing a class upon another class.',
      adkContext: '`class MyAgent(BaseAgent):` means your agent gets all the "plumbing" of `BaseAgent` for free.',
      pythonInternals: 'Python supports multiple inheritance.',
      relatedTerms: ['Class', 'Super']
  }
};

// --- Course Syllabus Data ---
export const syllabusData: CoursePhase[] = [
  {
    id: 'phase-1',
    title: 'Phase 1: ADK Fundamentals',
    weeks: [
      {
        id: 'week-1',
        title: 'Week 1: Core Concepts & Setup',
        description: 'Establish foundational understanding of ADK architecture, Python environments, and build your first cognitive engine.',
        lessons: [
          {
            id: 'day-1-2',
            title: 'Day 1-2: The Paradigm Shift',
            duration: '2 Days',
            content: [
              {
                type: ContentType.MARKDOWN,
                markdown: `# 1. From Deterministic to Probabilistic
Welcome to ADK. The first thing to unlearn is how software typically works.

### The Old World: Deterministic
In traditional coding, you write rules: **If A, then B.**
This is **[[Determinism]]**. It is safe, predictable, and rigid.

### The New World: Probabilistic
In AI development, you write goals: **Here is context A, generate result B.**
This is **[[Probabilistic]]**. The system (the **[[LLM]]**) makes a prediction based on statistical likelihood.

> **Key Insight:** An ADK **[[Agent]]** is a system designed to make a Probabilistic Engine (the LLM) behave in a Deterministic Way (Reliable Actions) using Tools and Memory.

# 2. The Cognitive Loop
Every agent follows a loop, often called the **Reasoning Loop**:
1.  **Perceive**: Read user input and history.
2.  **Think**: The LLM processes **[[Token]]**s to decide what to do.
3.  **Act**: The Agent calls a **[[Tool]]** (like searching a database).
4.  **Observe**: The Agent reads the tool's output.
`
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 3. The Ghost in the Machine: System Instructions
Before an Agent enters the loop, it needs a persona. This is the **System Instruction** (a special type of **[[Prompt Engineering]]**).

*   **User Prompt**: "Book a flight to Paris."
*   **System Instruction**: "You are a helpful travel agent. Always ask for dates first."

In ADK, we define this in the **[[Class]]** \`__init__\`. It sets the baseline behavior for the **[[Probabilistic]]** engine.
`
              },
              {
                  type: ContentType.NOTEBOOK,
                  notebook: {
                      id: 'nb-persona',
                      title: 'Deep Dive: Persona Injection',
                      cells: [
                          {
                              id: 'c1',
                              type: 'markdown',
                              content: '### Experiment: Changing the System Instruction\nSee how the same user input results in different outputs based on the "System Instruction" (Persona).'
                          },
                          {
                              id: 'c2',
                              type: 'code',
                              content: `def simulate_llm(system_instruction, user_input):
    # This simulates how Gemini reacts to system instructions
    if "pirate" in system_instruction.lower():
        return f"Arrr! I be hearin': {user_input}"
    elif "formal" in system_instruction.lower():
        return f"Acknowledged. You stated: {user_input}"
    else:
        return f"I heard: {user_input}"

print(simulate_llm("You are a pirate", "Hello"))
print(simulate_llm("You are a formal assistant", "Hello"))`
                          }
                      ]
                  }
              },
              {
                  type: ContentType.NOTEBOOK,
                  notebook: {
                      id: 'nb-paradigm',
                      title: 'Paradigm Shift: If/Else vs AI',
                      cells: [
                          {
                              id: 'c1',
                              type: 'markdown',
                              content: '### Experiment 1: The Rigid Router\nThis is traditional code. It looks for exact keyword matches. Try changing the input to "I want to return a product" (without the word "refund") and see it fail.'
                          },
                          {
                              id: 'c2',
                              type: 'code',
                              content: `def traditional_router(user_input):
    if "refund" in user_input.lower():
        return "Routing to Billing Dept..."
    elif "support" in user_input.lower():
        return "Routing to Tech Support..."
    else:
        return "Error: Unknown Intent"

print(traditional_router("I want a refund"))
print(traditional_router("I have a broken screen")) # Will fail`
                          },
                          {
                              id: 'c3',
                              type: 'markdown',
                              content: '### Experiment 2: The Semantic Router (Simulated)\nAn Agent understands *meaning*, not just keywords. Even though "broken screen" isn\'t in the code, the Agent knows it belongs to Support.'
                          },
                          {
                              id: 'c4',
                              type: 'code',
                              content: `def agent_router(user_input):
    # In a real app, this calls model.generate_content()
    # We are simulating the probabilistic logic here
    keywords_support = ["broken", "help", "screen", "support", "not working"]
    keywords_billing = ["refund", "money", "charge", "cost", "bill"]
    
    # Simple semantic overlap simulation
    input_words = user_input.lower().split()
    if any(w in input_words for w in keywords_billing):
        return "Routing to Billing Dept..."
    elif any(w in input_words for w in keywords_support):
        return "Routing to Tech Support..."
    return "Agent is thinking..."

print(agent_router("I have a broken screen"))`
                          }
                      ]
                  }
              },
              {
                type: ContentType.CODE_PLAYGROUND,
                codeProject: {
                  id: 'token-sim-1',
                  language: 'python',
                  description: 'Simulation: LLMs do not read words; they read numbers (Tokens). Write a simple tokenizer that maps words to IDs using the provided `VOCAB` dictionary. If a word is not found, use ID 0 (UNK).',
                  initialCode: `VOCAB = {"hello": 1, "world": 2, "adk": 3, "agent": 4}

def tokenize(text):
    tokens = []
    # TODO: Split text into words (lower case)
    # TODO: Look up each word in VOCAB
    # TODO: Append ID to tokens list
    return tokens

print(tokenize("Hello World ADK"))
print(tokenize("Hello Universe"))`,
                  hints: [
                    { text: 'Use `text.lower().split()` to get words.', relearnLessonId: 'day-1-2' },
                    { text: 'Use `VOCAB.get(word, 0)` to handle unknown words.', relearnLessonId: 'day-1-2' }
                  ],
                  solutionCode: `VOCAB = {"hello": 1, "world": 2, "adk": 3, "agent": 4}

def tokenize(text):
    tokens = []
    words = text.lower().split()
    for w in words:
        tokens.append(VOCAB.get(w, 0))
    return tokens

print(tokenize("Hello World ADK"))
print(tokenize("Hello Universe"))`
                }
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 4. Controlling the Chaos: Temperature
The **[[LLM]]** is probabilistic. It rolls dice to pick the next word.
We can control how "wild" these dice are using a parameter called **Temperature**.

*   **Temperature = 0.0**: The model picks the most likely token every time. It becomes almost **[[Determinism]]**. Good for coding and data extraction.
*   **Temperature = 1.0**: The model takes risks. Good for creative writing.

> **Note:** Even at Temperature 0, there is slight variance due to floating-point math in GPUs. It reduces randomness significantly, but does not strictly eliminate it.`
              },
              {
                type: ContentType.CODE_PLAYGROUND,
                codeProject: {
                  id: 'arch-quiz-1',
                  language: 'python',
                  description: 'Assignment: Write a Python function `perceive_and_decide(input)` that simulates an Agent decision. If the input contains "weather", return "Action: CheckWeather". If it contains "time", return "Action: CheckTime". Otherwise, return "Action: Chat".',
                  initialCode: `def perceive_and_decide(user_input):
    # TODO: Implement the logic
    pass

# Test cases
print(perceive_and_decide("What is the weather?"))
print(perceive_and_decide("Tell me a joke"))`,
                  hints: [
                    { text: 'Use simple `if "text" in user_input:` logic for this simulation.', relearnLessonId: 'day-1-2' },
                    { text: 'Check for "weather" first.', relearnLessonId: 'day-1-2' },
                    { text: 'Check for "time" second.', relearnLessonId: 'day-1-2' },
                    { text: 'The `else` block should return "Action: Chat".', relearnLessonId: 'day-1-2' }
                  ],
                  solutionCode: `def perceive_and_decide(user_input):
    if "weather" in user_input.lower():
        return "Action: CheckWeather"
    elif "time" in user_input.lower():
        return "Action: CheckTime"
    else:
        return "Action: Chat"`
                }
              }
            ]
          },
          {
            id: 'day-3-4',
            title: 'Day 3-4: The Workshop (Environment)',
            duration: '2 Days',
            content: [
              {
                type: ContentType.MARKDOWN,
                markdown: `# 1. The Foundation: Virtual Environments
Before writing AI code, we must build the laboratory.

### The Problem: "It works on my machine"
Python libraries change often.
*   Project A needs \`google-cloud-aiplatform==1.0\`
*   Project B needs \`google-cloud-aiplatform==2.0\`

If you install these globally, they overwrite each other. This is **Dependency Hell**.

### The Solution: The Virtual Environment (venv)
A **[[Virtual_Environment]]** is a self-contained folder that contains a copy of the Python binary and a standalone \`site-packages\` folder.

\`\`\`text
my-project/
├── venv/               <-- The Isolated Lab
│   ├── bin/            <-- Contains python executable
│   └── lib/
│       └── python3.10/
│           └── site-packages/  <-- Where pip installs go
├── main.py             <-- Your Code
└── requirements.txt    <-- The Recipe
\`\`\`

When you "activate" a venv, you are telling your shell: *"When I type \`python\`, look in \`my-project/venv/bin\` first, not \`/usr/bin\`."*
`
              },
              {
                type: ContentType.CODE_PLAYGROUND,
                codeProject: {
                  id: 'env-setup-drill',
                  language: 'python',
                  description: 'Drill: Verify your environment. Write a script that checks your Python version and ensures you are in a Virtual Environment (sys.prefix != sys.base_prefix).',
                  initialCode: `import sys
import os

def verify_setup():
    print(f"Python Executable: {sys.executable}")
    
    # TODO: Check if sys.prefix != sys.base_prefix
    # If true, return "Secure: Virtual Env Active"
    # If false, return "Warning: Global Env Detected"
    pass

print(verify_setup())`,
                  hints: [
                    { text: 'Use `sys.prefix` and `sys.base_prefix`.', relearnLessonId: 'day-3-4' },
                    { text: 'In a venv, `prefix` points to the local folder, `base_prefix` points to the system python.', relearnLessonId: 'day-3-4' },
                    { text: 'Return the string exactly as requested.', relearnLessonId: 'day-3-4' }
                  ],
                  solutionCode: `import sys

def verify_setup():
    print(f"Python Executable: {sys.executable}")
    
    if sys.prefix != sys.base_prefix:
        return "Secure: Virtual Env Active"
    return "Warning: Global Env Detected"`
                }
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 2. Dependency Management
Installing libraries manually (\`pip install X\`) is fine for testing, but bad for production.

### The Recipe: requirements.txt
This file lists every library your agent needs.
\`\`\`text
google-cloud-aiplatform==1.38.1
pydantic==2.5.3
python-dotenv==1.0.0
\`\`\`

> **Best Practice:** Always pin your versions. If you just say \`pydantic\`, a future update might break your code.

To install from a recipe:
\`\`\`bash
pip install -r requirements.txt
\`\`\`
`
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 3. The Cloud Identity (Authentication)
Your code runs on your laptop, but the "Brain" (Gemini) runs in Google's data centers. How does Google know you are allowed to use it?

### How do they trust you?
1.  **Service Account**: A digital passport for your robot.
2.  **[[ADC]] (Application Default Credentials)**: The magic protocol.
    *   Run \`gcloud auth application-default login\` in your terminal.
    *   This creates a JSON file on your hard drive.
    *   The ADK **[[SDK]]** automatically finds this file.

> **Security Rule:** NEVER commit JSON keys to GitHub. Always use ADC or Environment Variables.
`
              },
              {
                  type: ContentType.NOTEBOOK,
                  notebook: {
                      id: 'nb-env-secrets',
                      title: 'Managing Secrets & Config',
                      cells: [
                          {
                              id: 'c1',
                              type: 'markdown',
                              content: '### The `os.environ` Dictionary\nPython accesses environment variables through a dictionary-like object. This is how we read configuration without hardcoding it.'
                          },
                          {
                              id: 'c2',
                              type: 'code',
                              content: `import os

# 1. Simulate setting a variable (usually done by the OS or Docker)
os.environ["PROJECT_ID"] = "my-genai-project-123"
os.environ["REGION"] = "us-central1"

# 2. Accessing it safely
def get_config():
    # .get() returns None if key is missing, preventing crashes
    project = os.environ.get("PROJECT_ID")
    
    # accessing directly [key] crashes if missing - good for required vars
    try:
        region = os.environ["REGION"]
    except KeyError:
        return "Error: Missing REGION"
        
    return f"Configured for {project} in {region}"

print(get_config())`
                          },
                          {
                              id: 'c3',
                              type: 'markdown',
                              content: '### Why not hardcode?\nImagine you hardcode `PROJECT_ID = "dev-project"`. When you deploy to Production, you have to change the code. With Env Vars, you just change the environment configuration, not the code.'
                          }
                      ]
                  }
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 4. Project Structure
A professional ADK project follows a standard layout.

\`\`\`text
my-agent/
├── .env                # Secrets (GitIgnored!)
├── .gitignore          # Tells git to ignore venv/ and .env
├── main.py             # Entry point
├── requirements.txt    # Dependencies
├── src/
│   ├── agent.py        # The Agent Class
│   └── tools/          # Tool definitions
│       ├── __init__.py
│       └── search_tool.py
\`\`\`

Separating \`agent.py\` from \`tools\` keeps your code clean as the project grows.
`
              }
            ]
          },
          {
            id: 'day-5',
            title: 'Day 5: The Blueprint (Agent Basics)',
            duration: '1 Day',
            content: [
              {
                type: ContentType.MARKDOWN,
                markdown: `# Anatomy of an Agent
An Agent is an object that holds **State** (History) and **Configuration** (Model Name).

We build agents using **[[Class]]** syntax.
1.  **\`__init__\`**: The setup. Loads the model, creates memory.
2.  **\`run\`**: The loop. Takes input, adds to memory, talks to model.

### The "Self" Concept
You will see **[[self]]** everywhere. It represents "This specific robot's memory". If you have 50 robots, \`self\` ensures Robot #1 doesn't read Robot #2's memory.
`
              },
              {
                type: ContentType.CODE_PLAYGROUND,
                codeProject: {
                  id: 'agent-basics-1',
                  language: 'python',
                  description: 'Assignment: Create a "StatefulAgent" class. It should have a `history` list. The `chat` method should append the user input to `history` and return the size of the history.',
                  initialCode: `class StatefulAgent:
    def __init__(self):
        # TODO: Initialize an empty list called self.history
        pass

    def chat(self, message):
        # TODO: Append message to self.history
        # TODO: Return "I have remembered X messages"
        pass`,
                  hints: [
                    { text: 'In `__init__`, use `self.history = []`.', relearnLessonId: 'day-5' },
                    { text: 'In `chat`, use `self.history.append(message)`.', relearnLessonId: 'day-5' },
                    { text: 'Use `len(self.history)` to get the count.', relearnLessonId: 'day-5' }
                  ],
                  solutionCode: `class StatefulAgent:
    def __init__(self):
        self.history = []

    def chat(self, message):
        self.history.append(message)
        return f"I have remembered {len(self.history)} messages"`
                }
              },
              {
                type: ContentType.CODE_PLAYGROUND,
                codeProject: {
                  id: 'oop-self-drill',
                  language: 'python',
                  description: 'Drill: Understanding `self`. Create a class `Robot` that takes a `name` in `__init__`. Define `say_hello()` that prints "I am [name]". Create two robots with different names and call `say_hello` on both.',
                  initialCode: `class Robot:
    def __init__(self, name):
        # TODO: Store name in self
        pass

    def say_hello(self):
        # TODO: Print "I am {self.name}"
        pass

# TODO: Create r1 = Robot("R2D2")
# TODO: Create r2 = Robot("C3PO")
# TODO: Call say_hello() on both`,
                  hints: [
                    { text: '`self.name = name` inside `__init__`.', relearnLessonId: 'day-5' },
                    { text: '`print(f"I am {self.name}")` inside `say_hello`.', relearnLessonId: 'day-5' }
                  ],
                  solutionCode: `class Robot:
    def __init__(self, name):
        self.name = name

    def say_hello(self):
        print(f"I am {self.name}")

r1 = Robot("R2D2")
r2 = Robot("C3PO")

r1.say_hello()
r2.say_hello()`
                }
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `### Inheritance
Why write code from scratch? We use **[[Inheritance]]** to steal code from Google's \`BaseAgent\`.
`
              },
              {
                type: ContentType.CODE_PLAYGROUND,
                codeProject: {
                  id: 'agent-basics-2',
                  language: 'python',
                  description: 'Assignment: Implement `__init__` calling `super()`. This is CRITICAL for ADK.',
                  initialCode: `from adk.core import Agent

class MyBot(Agent):
    def __init__(self):
        # TODO: Initialize the parent "Agent" class with name="BotV1"
        pass`,
                  hints: [
                    { text: 'Use `super().__init__(name="...")`.', relearnLessonId: 'day-5' },
                    { text: 'If you forget this, the agent will crash silently.', relearnLessonId: 'day-5' }
                  ],
                  solutionCode: `from adk.core import Agent

class MyBot(Agent):
    def __init__(self):
        super().__init__(name="BotV1")`
                }
              }
            ]
          },
          {
            id: 'day-6',
            title: 'Day 6: Capability Injection (Tools)',
            duration: '1 Day',
            content: [
              {
                type: ContentType.MARKDOWN,
                markdown: `# 1. The Hallucination Problem
LLMs are dream machines. They are **[[Probabilistic]]**. If you ask them "What is the stock price of Google right now?", they will guess (**[[Hallucination]]**) a number because they don't have access to the internet.

### The Fix: Grounding
**[[Grounding]]** is the process of connecting the model to reality.
*   **Ungrounded**: "I think the price is $100." (Guess)
*   **Grounded**: "I used the 'StockTool' and it returned $175.50." (Fact)

We achieve Grounding by giving the Agent **[[Tool]]**s.
`
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 2. Giving the Agent Hands
By default, an LLM only knows text. It cannot do math perfectly, and it cannot check the weather.
We give it **[[Tool]]**s.

### How it works
1.  You write a Python function: \`def add(a: int, b: int)\`
2.  ADK reads the **[[Type_Hinting]]** and **Docstring**.
3.  ADK converts this to a **[[JSON_Schema]]**.
4.  The LLM reads the schema and says: *"Please call function 'add' with a=5, b=10"*

### Type Hints & Runtime
Python is a dynamic language. If you write \`a: int\`, Python doesn't care if you pass a string at runtime.
**However**, ADK cares. ADK uses these hints to build the **[[JSON_Schema]]**. If the schema says "Integer", the LLM will try to send an Integer.
`
              },
              {
                  type: ContentType.NOTEBOOK,
                  notebook: {
                      id: 'nb-tool-schema',
                      title: 'From Python to JSON Schema',
                      cells: [
                          {
                              id: 'c1',
                              type: 'markdown',
                              content: 'See how a Python function is translated into a language the Robot understands.'
                          },
                          {
                              id: 'c2',
                              type: 'code',
                              content: `def calculate_tax(price: float, rate: float) -> float:
    """Calculates sales tax given a price and a rate (0.0 to 1.0)."""
    return price * rate

# Simulated Schema Generator
schema = {
    "name": "calculate_tax",
    "description": "Calculates sales tax given a price and a rate (0.0 to 1.0).",
    "parameters": {
        "type": "object",
        "properties": {
            "price": {"type": "number"},
            "rate": {"type": "number"}
        },
        "required": ["price", "rate"]
    }
}
import json
print(json.dumps(schema, indent=2))`
                          }
                      ]
                  }
              },
              {
                type: ContentType.CODE_PLAYGROUND,
                codeProject: {
                  id: 'type-introspection',
                  language: 'python',
                  description: 'Drill: Python Introspection. Define a function `greet(name: str, age: int)`. Then print `greet.__annotations__` to see how ADK discovers your types.',
                  initialCode: `def greet(name: str, age: int):
    pass

# TODO: Print the __annotations__ attribute of the greet function
`,
                  hints: [
                    { text: 'Just `print(greet.__annotations__)`', relearnLessonId: 'day-6' }
                  ],
                  solutionCode: `def greet(name: str, age: int):
    pass

print(greet.__annotations__)`
                }
              },
              {
                type: ContentType.CODE_PLAYGROUND,
                codeProject: {
                  id: 'tool-def-1',
                  language: 'python',
                  description: 'Assignment: Define a tool function `check_stock` that takes a `product_id` (str) and returns an `int`. You MUST include type hints and a docstring.',
                  initialCode: `from adk.tools import tool

# TODO: Decorate with @tool
# TODO: Define function with type hints
# TODO: Add docstring
def check_stock...`,
                  hints: [
                    { text: 'Start with `@tool` on the line before `def`.', relearnLessonId: 'day-6' },
                    { text: 'Definition: `def check_stock(product_id: str) -> int:`', relearnLessonId: 'day-6' },
                    { text: 'Docstring: `"""Returns the quantity of product."""` inside the function.', relearnLessonId: 'day-6' }
                  ],
                  solutionCode: `from adk.tools import tool

@tool
def check_stock(product_id: str) -> int:
    """Returns the quantity of product."""
    return 42`
                }
              }
            ]
          },
          {
            id: 'day-7',
            title: 'Day 7: Week 1 Revision & Capstone',
            duration: '1 Day',
            content: [
              {
                type: ContentType.MARKDOWN,
                markdown: `# Week 1 Complete: Checkpoint
You have learned the foundation of Agentic AI.

### Revision Checklist
1.  **Architecture**: Do you understand **[[Determinism]]** vs **[[Probabilistic]]** systems? (Review Day 1-2)
2.  **Environment**: Can you verify you are in a **[[Virtual_Environment]]**? (Review Day 3-4)
3.  **Agents**: Can you create a **[[Class]]** that inherits from BaseAgent? (Review Day 5)
4.  **Tools**: Do you understand why **[[Type_Hinting]]** matters for **[[JSON_Schema]]**? (Review Day 6)

# Capstone Project: The Math Tutor
Your goal is to build a simple Agent that helps students with math.
It needs:
1.  An Identity ("You are a helpful Math Tutor").
2.  A Tool (A Calculator, because LLMs are bad at math).
`
              },
              {
                type: ContentType.CODE_PLAYGROUND,
                codeProject: {
                  id: 'capstone-week-1',
                  language: 'python',
                  description: 'Capstone: Build the `MathAgent`. 1) Define a tool `multiply`. 2) Initialize the agent with the tool and system instruction.',
                  initialCode: `from adk.core import Agent
from adk.tools import tool

# 1. Define the Tool
# TODO: @tool multiply(a: int, b: int) -> int

class MathAgent(Agent):
    def __init__(self):
        # 2. Init Parent
        # TODO: super().__init__...
        
        # 3. Register Tool
        # TODO: self.tools = [multiply]
        
        # 4. Set Instruction
        # TODO: self.system_instruction = "..."
        pass`,
                  hints: [
                    { text: 'Define the tool first: `@tool def multiply(a: int, b: int) -> int: return a * b`', relearnLessonId: 'day-6' },
                    { text: 'In `__init__`, call `super().__init__(name="MathBot")`', relearnLessonId: 'day-5' },
                    { text: 'Assign `self.tools = [multiply]` (list of functions)', relearnLessonId: 'day-6' },
                    { text: 'Set `self.system_instruction = "You are a math tutor."`', relearnLessonId: 'day-1-2' }
                  ],
                  solutionCode: `from adk.core import Agent
from adk.tools import tool

@tool
def multiply(a: int, b: int) -> int:
    """Multiplies two integers."""
    return a * b

class MathAgent(Agent):
    def __init__(self):
        super().__init__(name="MathBot")
        self.tools = [multiply]
        self.system_instruction = "You are a math tutor."`
                }
              },
              {
                type: ContentType.QUIZ,
                quiz: {
                    id: 'quiz-week-1',
                    title: 'Week 1 Certification Quiz',
                    questions: [
                        {
                            id: 'q1',
                            question: 'Which component is responsible for making an LLM behave deterministically?',
                            options: ['The Prompt', 'The Tool', 'The Agent Framework', 'The Temperature'],
                            correctOptionIndex: 2,
                            explanation: 'The Agent Framework (ADK) wraps the probabilistic LLM with deterministic code (Tools, Memory) to ensure reliability.',
                            hint: { text: 'Think about the "Chassis" vs the "Engine".', relearnLessonId: 'day-1-2' },
                            optionExplanations: [
                                { text: 'Prompts guide the model but cannot guarantee deterministic behavior on their own.', relearnLessonId: 'day-1-2' },
                                { text: 'Tools are deterministic functions, but they are just one part of the system.', relearnLessonId: 'day-6' },
                                { text: 'Correct. The Framework orchestrates the loop, memory, and tools to create reliable outcomes.', relearnLessonId: 'day-1-2' },
                                { text: 'Temperature reduces randomness but does not eliminate it entirely.', relearnLessonId: 'day-1-2' }
                            ]
                        },
                        {
                            id: 'q2',
                            question: 'Why must we use Type Hints in Tool definitions?',
                            options: ['To make Python faster', 'To generate JSON Schema for the LLM', 'To prevent runtime errors', 'It is optional'],
                            correctOptionIndex: 1,
                            explanation: 'ADK introspects the type hints to build the JSON Schema that tells the LLM how to call the function.',
                            hint: { text: 'The LLM needs to know if it should send a string or a number.', relearnLessonId: 'day-6' },
                            optionExplanations: [
                                { text: 'Python type hints are ignored by the interpreter at runtime and do not improve performance.', relearnLessonId: 'day-6' },
                                { text: 'Correct. The framework reads `a: int` and tells the LLM "Expect an integer".', relearnLessonId: 'day-6' },
                                { text: 'Type hints do not prevent runtime errors in Python unless you use a static type checker.', relearnLessonId: 'day-6' },
                                { text: 'In standard Python they are optional, but in ADK Tools they are mandatory.', relearnLessonId: 'day-6' }
                            ]
                        },
                        {
                            id: 'q3',
                            question: 'What is the correct way to initialize a subclass of Agent?',
                            options: ['def __init__(self): pass', 'super().__init__()', 'Agent.init()', 'self.init()'],
                            correctOptionIndex: 1,
                            explanation: 'You must call super().__init__() to ensure the base class sets up telemetry and memory.',
                            hint: { text: 'We need to call the parent class initializer.', relearnLessonId: 'day-5' },
                            optionExplanations: [
                                { text: 'This overrides the parent initialization without calling it, which will break the Agent.', relearnLessonId: 'day-5' },
                                { text: 'Correct. This ensures the `Agent` base class sets up memory and model connections.', relearnLessonId: 'day-5' },
                                { text: 'This is not valid Python syntax for inheritance.', relearnLessonId: 'day-5' },
                                { text: 'This method does not exist.', relearnLessonId: 'day-5' }
                            ]
                        }
                    ]
                }
              }
            ]
          }
        ]
      },
      // ... Week 2-5 placeholders would follow here ...
      {
        id: 'week-2',
        title: 'Week 2: Development Fundamentals',
        description: 'Deep dive into Agent architecture, Tools, and GCP Integration.',
        lessons: [
            { 
              id: 'w2-d1-3', 
              title: 'Day 1-3: Agent Architecture Deep Dive', 
              duration: '3 Days',
              content: [
                {
                  type: ContentType.MARKDOWN,
                  markdown: `# 1. The Memory Problem
LLMs are stateless. They don't remember what you said 5 seconds ago.
The **[[Agent]]** solves this by sending the *entire conversation history* back to the model with every new message.

### The Limit: Context Window
Every model has a **[[Context_Window]]**. If you exceed it (e.g., 8000 tokens), the model crashes or forgets the beginning.

**Strategies:**
1.  **FIFO (Sliding Window)**: Keep only the last N messages.
2.  **Summarization**: Ask the LLM to summarize old messages.
3.  **Vector Store**: Store memories in a database (Long Term Memory).
`
                },
                {
                  type: ContentType.NOTEBOOK,
                  notebook: {
                    id: 'nb-memory-list',
                    title: 'Python Lists as Memory',
                    cells: [
                      {
                        id: 'c1',
                        type: 'markdown',
                        content: '### Appending to History\nIn Python, we use lists to store history. Watch how the list grows.'
                      },
                      {
                        id: 'c2',
                        type: 'code',
                        content: `history = []
history.append("User: Hi")
history.append("Agent: Hello")
print(f"History Size: {len(history)}")
print(history)`
                      }
                    ]
                  }
                },
                {
                  type: ContentType.CODE_PLAYGROUND,
                  codeProject: {
                    id: 'sliding-window-memory',
                    language: 'python',
                    description: 'Assignment: Implement a `SlidingWindowAgent`. It should have a `max_history` limit. If history exceeds this limit, remove the oldest message (index 0).',
                    initialCode: `class SlidingWindowAgent:
    def __init__(self, max_history=3):
        self.history = []
        self.max_history = max_history

    def add_message(self, msg):
        # 1. Add message
        self.history.append(msg)
        
        # 2. Check limit
        # TODO: If len(history) > max_history, pop the first element
        pass

agent = SlidingWindowAgent(max_history=2)
agent.add_message("Msg 1")
agent.add_message("Msg 2")
agent.add_message("Msg 3")
print(agent.history)`,
                    hints: [
                      { text: 'Use `if len(self.history) > self.max_history:`', relearnLessonId: 'w2-d1-3' },
                      { text: 'Use `self.history.pop(0)` to remove the oldest item.', relearnLessonId: 'w2-d1-3' }
                    ],
                    solutionCode: `class SlidingWindowAgent:
    def __init__(self, max_history=3):
        self.history = []
        self.max_history = max_history

    def add_message(self, msg):
        self.history.append(msg)
        if len(self.history) > self.max_history:
            self.history.pop(0)`
                  }
                },
                {
                  type: ContentType.MARKDOWN,
                  markdown: `# 2. Advanced Prompting
The **System Instruction** is your Agent's DNA.

### Few-Shot Prompting
Instead of just telling the agent what to do, *show* it.
*   **Zero-Shot**: "Extract the sentiment."
*   **Few-Shot**: "Extract sentiment. Examples: 'I love this' -> POSITIVE. 'I hate this' -> NEGATIVE."
`
                },
                {
                  type: ContentType.NOTEBOOK,
                  notebook: {
                    id: 'nb-few-shot',
                    title: 'Zero-Shot vs Few-Shot',
                    cells: [
                      {
                        id: 'c1',
                        type: 'markdown',
                        content: '### The Power of Examples\nSee how providing examples changes the output format.'
                      },
                      {
                        id: 'c2',
                        type: 'code',
                        content: `def simulate_extraction(prompt, text):
    # Simulating LLM behavior
    if "Example:" in prompt:
        return "JSON: {'sentiment': 'positive', 'score': 0.9}"
    else:
        return "I think this text is generally positive."

text = "I love ADK!"
print("Zero Shot:", simulate_extraction("Analyze this:", text))
print("Few Shot:", simulate_extraction("Analyze this. Example: Output JSON.", text))`
                      }
                    ]
                  }
                },
                {
                  type: ContentType.MARKDOWN,
                  markdown: `# 3. Configuration & Architecture
Agents aren't just about prompts. You can tune the engine and structure the flow.

### Key Parameters
*   **Temperature**: Controls randomness (0.0 = Focused, 1.0 = Creative).
*   **Max Output Tokens**: Limits verbosity.
*   **Stop Sequences**: Tells the model when to stop generating (e.g., "User:").

### Architecture Patterns
*   **Zero-Shot Agent**: No history, just one-off tasks.
*   **Conversational Agent**: Maintains history (Stateful).
*   **ReAct Agent**: Loops through Thought -> Action -> Observation.`
                },
                {
                  type: ContentType.NOTEBOOK,
                  notebook: {
                    id: 'nb-temp-sim',
                    title: 'Simulating Temperature',
                    cells: [
                      {
                        id: 'c1',
                        type: 'markdown',
                        content: '### Randomness Control\nHigh temperature means more randomness. Low temperature means deterministic output.'
                      },
                      {
                        id: 'c2',
                        type: 'code',
                        content: `import random

def generate(temp):
    options = ["Hello", "Hi", "Greetings", "Yo"]
    if temp == 0:
        return options[0] # Always "Hello"
    return random.choice(options)

print(f"Temp 0: {generate(0)}")
print(f"Temp 1: {generate(1)}")`
                      }
                    ]
                  }
                },
                {
                  type: ContentType.CODE_PLAYGROUND,
                  codeProject: {
                    id: 'config-tuning',
                    language: 'python',
                    description: 'Assignment: Implement `generate_response(prompt, config)`. If `config["temperature"]` is 0, return "Precise: " + prompt. If > 0, return "Creative: " + prompt. If `config["stop_sequence"]` is found in prompt, return "Halted".',
                    initialCode: `def generate_response(prompt, config):
    # TODO: Check stop_sequence in prompt
    # TODO: Check temperature
    pass

conf = {"temperature": 0.7, "stop_sequence": "END"}
print(generate_response("Hello World", conf))
print(generate_response("Stop here END", conf))`,
                    hints: [
                      { text: 'Check `if config["stop_sequence"] in prompt:` first.', relearnLessonId: 'w2-d1-3' },
                      { text: 'Return "Halted" if stop sequence found.', relearnLessonId: 'w2-d1-3' },
                      { text: 'Check `if config["temperature"] == 0:`', relearnLessonId: 'w2-d1-3' }
                    ],
                    solutionCode: `def generate_response(prompt, config):
    if config.get("stop_sequence") and config["stop_sequence"] in prompt:
        return "Halted"
    
    if config.get("temperature", 0.5) == 0:
        return f"Precise: {prompt}"
    return f"Creative: {prompt}"`
                  }
                }
              ]
            },
            { 
              id: 'w2-d4-5', 
              title: 'Day 4-5: Advanced Tool Development', 
              duration: '2 Days',
              content: [
                {
                  type: ContentType.MARKDOWN,
                  markdown: `# 1. Tool Anatomy & Validation
When you define a tool, ADK uses **[[Pydantic]]** to validate inputs.

### The Docstring
The **[[Docstring]]** is the most important part of a tool. It is the "Prompt" for that specific function.
*   **Bad**: \`"""Calculates stuff."""\`
*   **Good**: \`"""Calculates compound interest given principal P, rate R, and time T."""\`
`
                },
                {
                  type: ContentType.NOTEBOOK,
                  notebook: {
                    id: 'nb-try-except',
                    title: 'Handling Errors Gracefully',
                    cells: [
                      {
                        id: 'c1',
                        type: 'markdown',
                        content: '### The Try/Except Block\nTools should not crash the Agent. We catch errors and return them as strings.'
                      },
                      {
                        id: 'c2',
                        type: 'code',
                        content: `def risky_math(x):
    try:
        return 10 / x
    except ZeroDivisionError:
        return "Error: Cannot divide by zero"

print(risky_math(2))
print(risky_math(0))`
                      }
                    ]
                  }
                },
                {
                  type: ContentType.CODE_PLAYGROUND,
                  codeProject: {
                    id: 'tool-error-handling',
                    language: 'python',
                    description: 'Tool 1 (Error Handling): Create a robust division tool. If the user divides by zero, DO NOT crash. Return a string "Error: Cannot divide by zero".',
                    initialCode: `from adk.tools import tool

@tool
def safe_divide(a: float, b: float) -> str:
    """Divides a by b safely."""
    # TODO: Wrap in try/except block
    # TODO: Return result as string, or error message
    pass`,
                    hints: [
                      { text: 'Use `try:` and `except ZeroDivisionError:`', relearnLessonId: 'w2-d4-5' },
                      { text: 'Return `str(a / b)` in the try block.', relearnLessonId: 'w2-d4-5' }
                    ],
                    solutionCode: `from adk.tools import tool

@tool
def safe_divide(a: float, b: float) -> str:
    """Divides a by b safely."""
    try:
        return str(a / b)
    except ZeroDivisionError:
        return "Error: Cannot divide by zero"`
                  }
                },
                {
                  type: ContentType.MARKDOWN,
                  markdown: `# 2. Complex Types & Schemas
Tools aren't limited to strings and numbers. You can use Lists and Dictionaries.

*   \`scores: list[int]\`: The LLM will send a JSON array \`[10, 20, 30]\`.
*   \`metadata: dict[str, str]\`: The LLM will send a JSON object \`{"key": "value"}\`.

> **Warning:** Complex types require strict **[[Type_Hinting]]** so ADK can generate the correct **[[JSON_Schema]]**.`
                },
                {
                  type: ContentType.NOTEBOOK,
                  notebook: {
                    id: 'nb-type-hints',
                    title: 'Complex Type Hints',
                    cells: [
                      {
                        id: 'c1',
                        type: 'markdown',
                        content: '### Typing Lists and Dicts\nADK needs to know what is inside the list.'
                      },
                      {
                        id: 'c2',
                        type: 'code',
                        content: `from typing import List, Dict

# Python 3.9+ syntax
scores: list[int] = [10, 20, 30]
user: dict[str, str] = {"name": "Alice"}

print(f"Scores: {scores}")
print(f"User: {user}")`
                      }
                    ]
                  }
                },
                {
                  type: ContentType.CODE_PLAYGROUND,
                  codeProject: {
                    id: 'tool-complex-types',
                    language: 'python',
                    description: 'Tool 2 (Complex Types): Create a tool `analyze_scores` that takes a list of integers. Return the average score as a string.',
                    initialCode: `from adk.tools import tool

# TODO: Import List from typing if using Python < 3.9, or use list[int]

@tool
def analyze_scores(scores: list[int]) -> str:
    """Calculates the average of a list of scores."""
    # TODO: Calculate average
    # TODO: Handle empty list case
    pass`,
                    hints: [
                      { text: 'Use `sum(scores) / len(scores)`', relearnLessonId: 'w2-d4-5' },
                      { text: 'Check `if not scores:` to avoid division by zero.', relearnLessonId: 'w2-d4-5' },
                      { text: 'Type hint must be `list[int]`', relearnLessonId: 'w2-d4-5' }
                    ],
                    solutionCode: `from adk.tools import tool

@tool
def analyze_scores(scores: list[int]) -> str:
    """Calculates the average of a list of scores."""
    if not scores:
        return "Average: 0"
    avg = sum(scores) / len(scores)
    return f"Average: {avg:.2f}"`
                  }
                },
                {
                  type: ContentType.MARKDOWN,
                  markdown: `# 3. Built-in ADK Tools
You don't always have to build from scratch. ADK provides **[[Built_in_Tools]]**.

1.  **CodeInterpreter**: Gives the agent a Python sandbox to run code (great for math/data).
2.  **GoogleSearch**: Connects the agent to the web.
3.  **VertexAISearch**: Connects the agent to your internal documents.

Usage pattern:
\`\`\`python
from adk.tools import CodeInterpreter
agent = Agent(tools=[CodeInterpreter()])
\`\`\`
`
                },
                {
                  type: ContentType.CODE_PLAYGROUND,
                  codeProject: {
                    id: 'tool-practice-currency',
                    language: 'python',
                    description: 'Tool 3 (Business Logic): Build a Currency Converter. Define `convert_currency(amount: float, from_curr: str, to_curr: str) -> str`. Use the provided dictionary.',
                    initialCode: `from adk.tools import tool

# Rates: USD->EUR: 0.85, EUR->USD: 1.18
RATES = {
    ("USD", "EUR"): 0.85,
    ("EUR", "USD"): 1.18
}

# TODO: @tool decorator
# TODO: Define function with type hints
# TODO: Handle conversion logic
def convert_currency...`,
                    hints: [
                      { text: 'Use `RATES.get((from_curr, to_curr))` to find the rate.', relearnLessonId: 'w2-d4-5' },
                      { text: 'Return a formatted string like f"{amount} {from_curr} = {result} {to_curr}"', relearnLessonId: 'w2-d4-5' },
                      { text: 'Don\'t forget the docstring!', relearnLessonId: 'w2-d4-5' }
                    ],
                    solutionCode: `from adk.tools import tool

RATES = {
    ("USD", "EUR"): 0.85,
    ("EUR", "USD"): 1.18
}

@tool
def convert_currency(amount: float, from_curr: str, to_curr: str) -> str:
    """Converts amount between currencies."""
    rate = RATES.get((from_curr, to_curr))
    if not rate:
        return "Error: Rate not found"
    return f"{amount * rate:.2f}"`
                  }
                },
                {
                  type: ContentType.MARKDOWN,
                  markdown: `# 4. The Toolsmith's Gauntlet
To certify as a Tool Developer, you must build a suite of tools in one go.

**Requirements:**
1.  **StringReverser**: Reverses a string.
2.  **WeatherMock**: Returns "Sunny" if city length is even, "Rainy" if odd.
3.  **UUIDGenerator**: Returns a fake UUID string "123-abc".
`
                },
                {
                  type: ContentType.CODE_PLAYGROUND,
                  codeProject: {
                    id: 'tool-gauntlet',
                    language: 'python',
                    description: 'Tool 4, 5 & 6 (The Gauntlet): Implement `reverse_string`, `get_weather`, and `generate_uuid`. All must be decorated with @tool and have docstrings.',
                    initialCode: `from adk.tools import tool

# Tool 4
# TODO: reverse_string(text: str) -> str

# Tool 5
# TODO: get_weather(city: str) -> str

# Tool 6
# TODO: generate_uuid() -> str

print("Tools defined.")`,
                    hints: [
                      { text: 'Reverse string: `return text[::-1]`', relearnLessonId: 'w2-d4-5' },
                      { text: 'Weather: `if len(city) % 2 == 0: return "Sunny"`', relearnLessonId: 'w2-d4-5' },
                      { text: 'UUID: Just return a static string for this mock.', relearnLessonId: 'w2-d4-5' }
                    ],
                    solutionCode: `from adk.tools import tool

@tool
def reverse_string(text: str) -> str:
    """Reverses the input text."""
    return text[::-1]

@tool
def get_weather(city: str) -> str:
    """Gets weather for a city."""
    if len(city) % 2 == 0:
        return "Sunny"
    return "Rainy"

@tool
def generate_uuid() -> str:
    """Generates a unique ID."""
    return "123-abc-456"

print("Tools defined.")`
                  }
                }
              ]
            },
            { 
              id: 'w2-d6-7', 
              title: 'Day 6-7: GCP Service Integration', 
              duration: '2 Days',
              content: [
                {
                  type: ContentType.MARKDOWN,
                  markdown: `# 1. The Cloud Toolbox
Real agents don't just calculate numbers; they manage data.

*   **[[BigQuery]]**: For structured data (SQL). "How many users signed up yesterday?"
*   **[[Cloud_Storage]]**: For unstructured data (Files). "Read the PDF in the bucket."
*   **[[Firestore]]**: For application state. "Save this user's preferences."
*   **[[Vertex_AI_Search]]**: For searching documents. "Find the policy on remote work."
`
                },
                {
                  type: ContentType.MARKDOWN,
                  markdown: `### Example: Mocking a Cloud Tool
Since we can't connect to real AWS/GCP in a simple test, we mock the behavior.

\`\`\`python
@tool
def read_s3_bucket(bucket_name: str) -> str:
    """Reads from S3 (Mocked)."""
    if bucket_name == "my-data":
        return "Content of file.txt"
    return "Error: Bucket not found"
\`\`\`
`
                },
                {
                  type: ContentType.CODE_PLAYGROUND,
                  codeProject: {
                    id: 'cloud-tools-drill',
                    language: 'python',
                    description: 'Drill: Implement two mock cloud tools. 1) `read_gcs(bucket: str, filename: str)` returning "File Content". 2) `add_firestore_doc(collection: str, data: str)` returning "Doc Added".',
                    initialCode: `from adk.tools import tool

# TODO: Define read_gcs
# TODO: Define add_firestore_doc

print("Cloud tools defined.")`,
                    hints: [
                      { text: 'Use @tool decorator for both.', relearnLessonId: 'day-6' },
                      { text: 'Mock the return values (no real GCP calls needed).', relearnLessonId: 'w2-d6-7' },
                      { text: 'Ensure type hints are used: `bucket: str`, etc.', relearnLessonId: 'day-6' }
                    ],
                    solutionCode: `from adk.tools import tool

@tool
def read_gcs(bucket: str, filename: str) -> str:
    """Reads a file from Google Cloud Storage."""
    return "File Content"

@tool
def add_firestore_doc(collection: str, data: str) -> str:
    """Adds a document to Firestore."""
    return "Doc Added"

print("Cloud tools defined.")`
                  }
                },
                {
                  type: ContentType.MARKDOWN,
                  markdown: `# 2. External APIs & Tool Chaining
Agents live in the real world. They need to talk to external APIs (Slack, Jira, Weather APIs).

### API Integration
We use standard Python libraries like \`requests\` inside our tools.

### Tool Chaining
**[[Tool_Chaining]]** is when the output of Tool A becomes the input of Tool B.
*   *User*: "Email me the summary of the latest sales report."
*   *Step 1*: Call \`get_sales_report()\` -> Returns text.
*   *Step 2*: Call \`send_email(text)\`.
`
                },
                {
                  type: ContentType.NOTEBOOK,
                  notebook: {
                    id: 'nb-chaining-concept',
                    title: 'Concept: Function Chaining',
                    cells: [
                      {
                        id: 'c1',
                        type: 'markdown',
                        content: '### Passing Outputs\nChaining is just passing the return value of one function into another.'
                      },
                      {
                        id: 'c2',
                        type: 'code',
                        content: `def get_name():
    return "Alice"

def greet(name):
    return f"Hello {name}"

# The Chain
name = get_name()
message = greet(name)
print(message)`
                      }
                    ]
                  }
                },
                {
                  type: ContentType.CODE_PLAYGROUND,
                  codeProject: {
                    id: 'api-chaining-drill',
                    language: 'python',
                    description: 'Drill: Create a "StockAlert" chain. 1) `get_stock_price(symbol)` returns 150. 2) `send_slack_alert(message)` prints the message. 3) Manually simulate the chain: Get price, then send alert with "Price is 150".',
                    initialCode: `from adk.tools import tool

# 1. Define Tools
@tool
def get_stock_price(symbol: str) -> int:
    """Gets stock price."""
    return 150

@tool
def send_slack_alert(message: str) -> str:
    """Sends alert."""
    return f"Sent: {message}"

# 2. Simulate Chain (The Agent usually does this)
price = get_stock_price("GOOG")
# TODO: Call send_slack_alert with the price info
`,
                    hints: [
                      { text: 'Create a string like f"Price is {price}"', relearnLessonId: 'w2-d6-7' },
                      { text: 'Pass that string to `send_slack_alert`', relearnLessonId: 'w2-d6-7' }
                    ],
                    solutionCode: `from adk.tools import tool

@tool
def get_stock_price(symbol: str) -> int:
    """Gets stock price."""
    return 150

@tool
def send_slack_alert(message: str) -> str:
    """Sends alert."""
    return f"Sent: {message}"

price = get_stock_price("GOOG")
print(send_slack_alert(f"Price is {price}"))`
                  }
                },
                {
                  type: ContentType.MARKDOWN,
                  markdown: `# 3. Going Real: GCP Configuration
Up until now, we mocked our tools. Now, let's connect to the real **[[GCP_Console]]**.

### Prerequisites
To run the code below on your local machine, you must:
1.  **Create a Project**: Go to console.cloud.google.com and create a new project.
2.  **Enable Billing**: Link a billing account (Free Tier is available).
3.  **Enable APIs**: Search for and enable:
    *   **BigQuery API**
    *   **Cloud Storage API**
4.  **Install Libraries**:
    \`\`\`bash
    pip install google-cloud-bigquery google-cloud-storage
    \`\`\`
5.  **Authenticate**:
    \`\`\`bash
    gcloud auth application-default login
    \`\`\`
    This creates the **[[ADC]]** file your code needs.
`
                },
                {
                  type: ContentType.CODE_PLAYGROUND,
                  codeProject: {
                    id: 'real-bq-tool',
                    language: 'python',
                    description: 'Real World: Implement a BigQuery tool using the actual GCP library. NOTE: This requires a real GCP project and local authentication.',
                    initialCode: `from adk.tools import tool
# Import the REAL library
from google.cloud import bigquery

@tool
def query_bigquery_real(sql: str) -> str:
    """Executes a real SQL query in BigQuery."""
    try:
        # Client automatically finds credentials via ADC
        client = bigquery.Client()
        
        # Run the query
        query_job = client.query(sql)
        results = query_job.result()
        
        return f"Success: Found {results.total_rows} rows."
    except Exception as e:
        return f"GCP Error: {e}"

# Test it (This will fail if you haven't run 'gcloud auth ...')
# We use a public dataset for testing
public_sql = """
    SELECT name 
    FROM \`bigquery-public-data.usa_names.usa_1910_2013\` 
    LIMIT 5
"""
print(query_bigquery_real(public_sql))`,
                    hints: [
                      { text: 'Ensure you ran `pip install google-cloud-bigquery` locally.', relearnLessonId: 'w2-d6-7' },
                      { text: 'Ensure you ran `gcloud auth application-default login`.', relearnLessonId: 'day-3-4' },
                      { text: 'The `bigquery.Client()` call fails if no credentials are found.', relearnLessonId: 'day-3-4' }
                    ]
                  }
                },
                {
                  type: ContentType.MARKDOWN,
                  markdown: `# 4. Grand Capstone: The Enterprise Agent
You have built tools. You have built agents. Now combine them.

**Goal**: Build an Agent with **5 Custom Tools** to handle a complex workflow.

**Requirements:**
1.  \`query_bigquery(sql)\`: Mock data access.
2.  \`read_gcs_file(filename)\`: Mock file reading.
3.  \`write_gcs_file(filename, content)\`: Mock file writing.
4.  \`search_knowledge_base(query)\`: Mock Vertex AI Search.
5.  \`send_email(to, subject, body)\`: Mock External API.
`
                },
                {
                  type: ContentType.CODE_PLAYGROUND,
                  codeProject: {
                    id: 'capstone-week-2-grand',
                    language: 'python',
                    description: 'Capstone: Define all 5 tools listed above. Then initialize an Agent with all of them. This simulates a full "Enterprise Data Agent".',
                    initialCode: `from adk.core import Agent
from adk.tools import tool

# TODO: Define all 5 tools with @tool and docstrings
# 1. query_bigquery
# 2. read_gcs_file
# 3. write_gcs_file
# 4. search_knowledge_base
# 5. send_email

class EnterpriseAgent(Agent):
    def __init__(self):
        super().__init__(name="EnterpriseBot")
        # TODO: Register all 5 tools
        pass

bot = EnterpriseAgent()
print(f"Agent loaded with {len(bot.tools)} tools.")`,
                    hints: [
                        { text: 'Just return mock strings for each tool.', relearnLessonId: 'day-6' },
                        { text: 'Ensure every function has a docstring.', relearnLessonId: 'w2-d4-5' },
                        { text: 'Add all functions to the `self.tools` list.', relearnLessonId: 'day-5' }
                    ],
                    solutionCode: `from adk.core import Agent
from adk.tools import tool

@tool
def query_bigquery(sql: str) -> str:
    """Runs SQL query."""
    return "rows"

@tool
def read_gcs_file(filename: str) -> str:
    """Reads file."""
    return "content"

@tool
def write_gcs_file(filename: str, content: str) -> str:
    """Writes file."""
    return "saved"

@tool
def search_knowledge_base(query: str) -> str:
    """Searches docs."""
    return "results"

@tool
def send_email(to: str, subject: str, body: str) -> str:
    """Sends email."""
    return "sent"

class EnterpriseAgent(Agent):
    def __init__(self):
        super().__init__(name="EnterpriseBot")
        self.tools = [query_bigquery, read_gcs_file, write_gcs_file, search_knowledge_base, send_email]

bot = EnterpriseAgent()
print(f"Agent loaded with {len(bot.tools)} tools.")`
                  }
                },
                {
                  type: ContentType.QUIZ,
                  quiz: {
                    id: 'quiz-week-2',
                    title: 'Week 2 Certification Quiz',
                    questions: [
                      {
                        id: 'q1',
                        question: 'What happens if an Agent conversation exceeds the Context Window?',
                        options: ['The Agent crashes', 'The oldest tokens are dropped (or an error occurs)', 'Google automatically bills you more', 'The Agent summarizes it automatically'],
                        correctOptionIndex: 1,
                        explanation: 'Without manual management (like sliding window), the model will reject the request or the beginning of the prompt is truncated.',
                        hint: { text: 'Think about the "Sliding Window" exercise.', relearnLessonId: 'w2-d1-3' },
                        optionExplanations: [
                          { text: 'It might crash if not handled, but usually the API returns a 400 error.', relearnLessonId: 'w2-d1-3' },
                          { text: 'Correct. The physical limit of the model input has been reached.', relearnLessonId: 'w2-d1-3' },
                          { text: 'You cannot pay to exceed the hard limit of a model architecture.', relearnLessonId: 'w2-d1-3' },
                          { text: 'Summarization is a strategy YOU must implement; it is not automatic.', relearnLessonId: 'w2-d1-3' }
                        ]
                      },
                      {
                        id: 'q2',
                        question: 'Why is the Docstring critical for Tools?',
                        options: ['It generates the documentation website', 'It tells the LLM when and how to use the tool', 'It is required by Python syntax', 'It makes the code readable for humans'],
                        correctOptionIndex: 1,
                        explanation: 'ADK sends the docstring to the LLM as part of the system prompt/schema.',
                        hint: { text: 'Who is the primary "reader" of a Tool definition?', relearnLessonId: 'w2-d4-5' },
                        optionExplanations: [
                          { text: 'While true for Sphinx/MkDocs, in ADK its primary purpose is functional.', relearnLessonId: 'w2-d4-5' },
                          { text: 'Correct. The LLM uses this description to decide which tool to call.', relearnLessonId: 'w2-d4-5' },
                          { text: 'Docstrings are optional in standard Python.', relearnLessonId: 'w2-d4-5' },
                          { text: 'This is a side benefit, not the main reason in ADK.', relearnLessonId: 'w2-d4-5' }
                        ]
                      },
                      {
                        id: 'q3',
                        question: 'What is Tool Chaining?',
                        options: ['Connecting tools to the internet', 'Using the output of one tool as input for another', 'Defining tools in a linked list', 'Running tools in parallel only'],
                        correctOptionIndex: 1,
                        explanation: 'Chaining allows complex workflows where data flows between tools via the Agent\'s reasoning.',
                        hint: { text: 'Think about "Get Price" -> "Send Alert".', relearnLessonId: 'w2-d6-7' },
                        optionExplanations: [
                          { text: 'That is just connectivity, not chaining.', relearnLessonId: 'w2-d6-7' },
                          { text: 'Correct. This enables multi-step reasoning.', relearnLessonId: 'w2-d6-7' },
                          { text: 'Data structures are not relevant here.', relearnLessonId: 'w2-d6-7' },
                          { text: 'Parallel execution is different from chaining (sequential).', relearnLessonId: 'w2-d6-7' }
                        ]
                      }
                    ]
                  }
                }
              ]
            }
        ]
      },
    ]
  },
  {
    id: 'phase-2',
    title: 'Phase 2: Core Components',
    weeks: [
      {
        id: 'week-3',
        title: 'Week 3: Advanced Tool Integration',
        description: 'Async tools, Caching, and Memory Systems.',
        lessons: [
            {
                id: 'w3-d1-3',
                title: 'Day 1-3: Complex Tool Patterns',
                duration: '3 Days',
                content: [
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 1. The Need for Speed: Async Tools
Agents often wait. They wait for APIs, databases, and file reads.
If your tools are synchronous (blocking), the Agent freezes while waiting.

### Asynchronous Execution
By defining tools with \`async def\`, we allow the Agent to handle **[[Parallel_Execution]]**.

*   **Sync**: Call Tool A (Wait 2s) -> Call Tool B (Wait 2s) = 4s Total.
*   **Async**: Call Tool A & B together = 2s Total.
`
                    },
                    {
                        type: ContentType.NOTEBOOK,
                        notebook: {
                            id: 'nb-async-concept',
                            title: 'Concept: Sync vs Async',
                            cells: [
                                {
                                    id: 'c1',
                                    type: 'markdown',
                                    content: '### Blocking vs Non-Blocking\nObserve the syntax difference. Synchronous functions block execution, while asynchronous functions allow defining tasks that can yield control.'
                                },
                                {
                                    id: 'c2',
                                    type: 'code',
                                    content: `import time
import asyncio

# Synchronous (Blocking)
def sync_greet():
    time.sleep(0.1)
    return "Hello Sync"

# Asynchronous (Non-Blocking)
async def async_greet():
    await asyncio.sleep(0.1)
    return "Hello Async"

print("Defined functions. Ready to run.")`
                                }
                            ]
                        }
                    },
                    {
                        type: ContentType.CODE_PLAYGROUND,
                        codeProject: {
                            id: 'async-tool-drill',
                            language: 'python',
                            description: 'Assignment: Create an async tool `slow_fetch(id: int)` that simulates a delay using `await asyncio.sleep(1)` and returns "Data {id}". Then run it.',
                            initialCode: `import asyncio
from adk.tools import tool
import time

# TODO: Define async tool 'slow_fetch'
# Hint: Use 'async def' and 'await asyncio.sleep(1)'

async def main():
    print(f"Start: {time.strftime('%X')}")
    # TODO: Call slow_fetch(1)
    # In real ADK, the agent handles the loop. Here we await manually.
    print(f"End: {time.strftime('%X')}")

asyncio.run(main())`,
                            hints: [
                                { text: 'Define with `async def slow_fetch(id: int) -> str:`', relearnLessonId: 'w3-d1-3' },
                                { text: 'Inside `main`, use `result = await slow_fetch(1)`', relearnLessonId: 'w3-d1-3' },
                                { text: 'Don\'t forget the `@tool` decorator.', relearnLessonId: 'day-6' }
                            ],
                            solutionCode: `import asyncio
from adk.tools import tool
import time

@tool
async def slow_fetch(id: int) -> str:
    """Fetches data asynchronously."""
    await asyncio.sleep(1)
    return f"Data {id}"

async def main():
    print(f"Start: {time.strftime('%X')}")
    print(await slow_fetch(1))
    print(f"End: {time.strftime('%X')}")

asyncio.run(main())`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 2. Parallel Execution
Defining a tool as \`async\` is only half the battle. You must call them in parallel to get speed benefits.

We use \`asyncio.gather()\` to run multiple tasks at the same time.
`
                    },
                    {
                        type: ContentType.NOTEBOOK,
                        notebook: {
                            id: 'nb-parallel-demo',
                            title: 'Visualizing Parallelism',
                            cells: [
                                {
                                    id: 'c1',
                                    type: 'markdown',
                                    content: '### The Gather Pattern\n`asyncio.gather` is the magic function that schedules multiple coroutines to run on the event loop simultaneously.'
                                },
                                {
                                    id: 'c2',
                                    type: 'code',
                                    content: `import asyncio

async def task(name, seconds):
    print(f"Task {name} starting...")
    await asyncio.sleep(seconds)
    print(f"Task {name} finished!")
    return name

# This is how you would run them:
# await asyncio.gather(
#     task("A", 1),
#     task("B", 1)
# )
print("Code structure for parallel execution.")`
                                }
                            ]
                        }
                    },
                    {
                        type: ContentType.CODE_PLAYGROUND,
                        codeProject: {
                            id: 'parallel-execution-drill',
                            language: 'python',
                            description: 'Assignment: Run `slow_tool` 3 times in parallel. 1) Define `slow_tool`. 2) In `main`, use `asyncio.gather(slow_tool(1), slow_tool(2), slow_tool(3))`.',
                            initialCode: `import asyncio
from adk.tools import tool
import time

@tool
async def slow_tool(id: int) -> str:
    await asyncio.sleep(1)
    return f"Done {id}"

async def main():
    start = time.time()
    
    # TODO: Replace this sequential code with asyncio.gather
    await slow_tool(1)
    await slow_tool(2)
    await slow_tool(3)
    
    print(f"Total Time: {time.time() - start:.2f}s")

asyncio.run(main())`,
                            hints: [
                                { text: 'Remove the individual await lines.', relearnLessonId: 'w3-d1-3' },
                                { text: 'Use `await asyncio.gather(slow_tool(1), slow_tool(2), slow_tool(3))`', relearnLessonId: 'w3-d1-3' }
                            ],
                            solutionCode: `import asyncio
from adk.tools import tool
import time

@tool
async def slow_tool(id: int) -> str:
    await asyncio.sleep(1)
    return f"Done {id}"

async def main():
    start = time.time()
    await asyncio.gather(slow_tool(1), slow_tool(2), slow_tool(3))
    print(f"Total Time: {time.time() - start:.2f}s")

asyncio.run(main())`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 3. Optimization: Caching
APIs cost money. Latency kills user experience.
If an Agent asks for the same data twice, it should not call the API twice.

### Caching Strategies
1.  **In-Memory**: A simple Python dictionary. Fast, but lost on restart.
2.  **Persistent**: Redis or Firestore. Survives restarts.

We can use a **Decorator** to add **[[Caching]]** to any tool.
`
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `### Example: The Decorator Pattern
Here is how a caching decorator looks in Python. You wrap the function so that it checks the cache before running.

\`\`\`python
def simple_cache(func):
    memory = {}
    def wrapper(arg):
        if arg in memory:
            return memory[arg]
        result = func(arg)
        memory[arg] = result
        return result
    return wrapper

@simple_cache
def heavy_compute(x):
    # ...
\`\`\`
`
                    },
                    {
                        type: ContentType.CODE_PLAYGROUND,
                        codeProject: {
                            id: 'caching-drill',
                            language: 'python',
                            description: 'Assignment: Implement a manual cache. 1) Check if `query` is in `CACHE`. 2) If yes, return it. 3) If no, "calculate" it, store in `CACHE`, and return it.',
                            initialCode: `from adk.tools import tool

CACHE = {}

@tool
def expensive_search(query: str) -> str:
    """Searches data (simulated expense)."""
    # TODO: Check CACHE
    # TODO: If miss, print "Calculating...", store, return
    pass

print(expensive_search("A")) # Should print Calculating
print(expensive_search("A")) # Should be instant`,
                            hints: [
                                { text: 'Use `if query in CACHE: return CACHE[query]`', relearnLessonId: 'w3-d1-3' },
                                { text: 'Store result: `CACHE[query] = "Result for " + query`', relearnLessonId: 'w3-d1-3' }
                            ],
                            solutionCode: `from adk.tools import tool

CACHE = {}

@tool
def expensive_search(query: str) -> str:
    """Searches data (simulated expense)."""
    if query in CACHE:
        return CACHE[query]
    
    print("Calculating...")
    result = f"Result for {query}"
    CACHE[query] = result
    return result

print(expensive_search("A"))
print(expensive_search("A"))`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 4. Dynamic Routing & Versioning
Tools evolve. You might have \`SearchTool_v1\` and \`SearchTool_v2\`.
Instead of hardcoding, we can use **[[Tool_Routing]]**.

### Deprecation Pattern
1.  Keep the old tool but mark it deprecated in the **[[Docstring]]**.
2.  Create a "Router Tool" that decides which version to call based on the user's request or flags.

**Optimization**: Routing prevents the LLM from seeing 100 tools. It only sees the Router, which then picks from the 100.
`
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `### Example: The Router Pattern
A router is just a switch statement that delegates to other tools.

\`\`\`python
def router_tool(query):
    if "refund" in query:
        return refund_tool(query)
    elif "technical" in query:
        return support_tool(query)
    else:
        return general_chat_tool(query)
\`\`\`
`
                    },
                    {
                        type: ContentType.CODE_PLAYGROUND,
                        codeProject: {
                            id: 'tool-routing-drill',
                            language: 'python',
                            description: 'Assignment: Implement `master_search`. If query starts with "old:", call `search_v1`. Otherwise, call `search_v2`.',
                            initialCode: `from adk.tools import tool

@tool
def search_v1(q: str) -> str:
    return f"Legacy Results for {q}"

@tool
def search_v2(q: str) -> str:
    return f"Modern AI Results for {q}"

@tool
def master_search(query: str) -> str:
    """Routes queries to the correct search tool."""
    # TODO: Check if query starts with "old:"
    # TODO: Call appropriate tool
    pass

print(master_search("old:Python 2"))
print(master_search("Python 3"))`,
                            hints: [
                                { text: 'Use `query.startswith("old:")`', relearnLessonId: 'w3-d1-3' },
                                { text: 'Return the result of the function call directly.', relearnLessonId: 'w3-d1-3' }
                            ],
                            solutionCode: `from adk.tools import tool

@tool
def search_v1(q: str) -> str:
    return f"Legacy Results for {q}"

@tool
def search_v2(q: str) -> str:
    return f"Modern AI Results for {q}"

@tool
def master_search(query: str) -> str:
    """Routes queries to the correct search tool."""
    if query.startswith("old:"):
        return search_v1(query)
    return search_v2(query)

print(master_search("old:Python 2"))
print(master_search("Python 3"))`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 5. Tool Deprecation
Software changes. Sometimes you need to remove a tool.
But if you delete it, existing Agents might crash.

**Pattern:**
1.  Mark the tool as "Deprecated" in the docstring.
2.  Log a warning when it is called.
3.  Route to the new tool if possible, or return the old result with a warning.
`
                    },
                    {
                        type: ContentType.CODE_PLAYGROUND,
                        codeProject: {
                            id: 'deprecation-drill',
                            language: 'python',
                            description: 'Assignment: Implement `legacy_tool`. It should print a warning "WARNING: Deprecated, use new_tool" but still return "Legacy Data".',
                            initialCode: `from adk.tools import tool

@tool
def legacy_tool() -> str:
    """Old tool. Use new_tool instead."""
    # TODO: Print warning
    # TODO: Return data
    pass

print(legacy_tool())`,
                            hints: [
                                { text: 'Just use `print("WARNING: ...")` for this drill.', relearnLessonId: 'w3-d1-3' },
                                { text: 'Return the string "Legacy Data".', relearnLessonId: 'w3-d1-3' }
                            ],
                            solutionCode: `from adk.tools import tool

@tool
def legacy_tool() -> str:
    """Old tool. Use new_tool instead."""
    print("WARNING: Deprecated, use new_tool")
    return "Legacy Data"

print(legacy_tool())`
                        }
                    }
                ]
            },
            {
                id: 'w3-d4-7',
                title: 'Day 4-7: Memory Systems',
                duration: '4 Days',
                content: [
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 1. The Two Brains: Short vs Long Term
Just like humans, Agents have two types of memory.

### Short-Term Memory (Context Window)
*   **What**: The conversation history sent with every request.
*   **Limit**: Restricted by the **[[Context_Window]]** (e.g., 8k - 1M tokens).
*   **Cost**: Expensive (you pay for history every time).

### Long-Term Memory (Vector Store)
*   **What**: A database of facts, documents, and past conversations.
*   **Limit**: Infinite.
*   **Mechanism**: **[[RAG]]** (Retrieval Augmented Generation). The Agent searches the database for relevant info and injects *only that info* into the Short-Term Memory.
`
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 2. Vector Search & Embeddings
How does an Agent find "relevant" info? It uses **[[Embeddings]]**.
An embedding is a list of numbers representing meaning.

*   "Dog": \`[0.9, 0.1]\`
*   "Puppy": \`[0.8, 0.2]\`
*   "Car": \`[0.1, 0.9]\`

We use **[[Cosine_Similarity]]** to find vectors that point in the same direction.
`
                    },
                    {
                        type: ContentType.NOTEBOOK,
                        notebook: {
                            id: 'nb-vector-math',
                            title: 'Understanding Vectors',
                            cells: [
                                {
                                    id: 'c1',
                                    type: 'markdown',
                                    content: '### Vectors are just Lists of Numbers\nIn AI, we represent meaning as coordinates in a multi-dimensional space.'
                                },
                                {
                                    id: 'c2',
                                    type: 'code',
                                    content: `vec_dog = [0.9, 0.1]  # High "Animal", Low "Machine"
vec_cat = [0.8, 0.2]  # High "Animal", Low "Machine"
vec_car = [0.1, 0.9]  # Low "Animal", High "Machine"

print(f"Dog Vector: {vec_dog}")
print(f"Car Vector: {vec_car}")`
                                }
                            ]
                        }
                    },
                    {
                        type: ContentType.CODE_PLAYGROUND,
                        codeProject: {
                            id: 'vector-search-logic',
                            language: 'python',
                            description: 'Assignment: Implement a simple vector search. Given a `query_vector` and a `database` of vectors, find the key with the highest cosine similarity.',
                            initialCode: `import math

# Mock Database of Embeddings
DATABASE = {
    "doc1": [0.9, 0.1], # Represents "Animals"
    "doc2": [0.1, 0.9], # Represents "Cars"
}

def cosine_similarity(v1, v2):
    dot_product = sum(a*b for a,b in zip(v1, v2))
    norm_a = math.sqrt(sum(a*a for a in v1))
    norm_b = math.sqrt(sum(b*b for b in v2))
    return dot_product / (norm_a * norm_b)

def find_closest(query_vector, db):
    best_key = None
    best_score = -1
    
    # TODO: Iterate through db
    # TODO: Calculate similarity
    # TODO: Update best_key if score is higher
    
    return best_key

# Query: [0.8, 0.2] (Close to "Animals")
print(f"Closest to query: {find_closest([0.8, 0.2], DATABASE)}")`,
                            hints: [
                                { text: 'Loop with `for key, vector in db.items():`', relearnLessonId: 'w3-d4-7' },
                                { text: 'Call `score = cosine_similarity(query_vector, vector)`', relearnLessonId: 'w3-d4-7' },
                                { text: 'Compare `score > best_score`', relearnLessonId: 'w3-d4-7' }
                            ],
                            solutionCode: `import math

DATABASE = {
    "doc1": [0.9, 0.1],
    "doc2": [0.1, 0.9],
}

def cosine_similarity(v1, v2):
    dot_product = sum(a*b for a,b in zip(v1, v2))
    norm_a = math.sqrt(sum(a*a for a in v1))
    norm_b = math.sqrt(sum(b*b for b in v2))
    return dot_product / (norm_a * norm_b)

def find_closest(query_vector, db):
    best_key = None
    best_score = -1
    for key, vector in db.items():
        score = cosine_similarity(query_vector, vector)
        if score > best_score:
            best_score = score
            best_key = key
    return best_key

print(f"Closest to query: {find_closest([0.8, 0.2], DATABASE)}")`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 3. Production: Vertex AI Vector Search
In production, you don't loop through a dictionary. You use a scalable engine like **[[Vertex_AI_Search]]**.

**Workflow:**
1.  **Upload**: Save vectors to a GCS Bucket.
2.  **Index**: Create an Index in Vertex AI.
3.  **Deploy**: Deploy the Index to an Endpoint.
4.  **Query**: Send a vector to the Endpoint to get nearest neighbors.
`
                    },
                    {
                        type: ContentType.CODE_PLAYGROUND,
                        codeProject: {
                            id: 'mock-vertex-search',
                            language: 'python',
                            description: 'Assignment: Mock a Vertex AI Vector Search client. Implement `find_neighbors(vector)`. If vector[0] > 0.5, return ["id_1", "id_2"]. Else return ["id_3"].',
                            initialCode: `class VectorSearchEndpoint:
    def find_neighbors(self, vector):
        # TODO: Check vector[0]
        # TODO: Return list of IDs
        pass

endpoint = VectorSearchEndpoint()
print(endpoint.find_neighbors([0.9, 0.1]))`,
                            hints: [
                                { text: 'Access the first element with `vector[0]`.', relearnLessonId: 'w3-d4-7' },
                                { text: 'Return the list of strings as requested.', relearnLessonId: 'w3-d4-7' }
                            ],
                            solutionCode: `class VectorSearchEndpoint:
    def find_neighbors(self, vector):
        if vector[0] > 0.5:
            return ["id_1", "id_2"]
        return ["id_3"]

endpoint = VectorSearchEndpoint()
print(endpoint.find_neighbors([0.9, 0.1]))`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 4. Retrieval Strategies: Hybrid Search
Vectors are great for concepts ("Dog" matches "Puppy").
But they are bad at exact matches (Part # "X-99").

**[[Hybrid_Search]]** combines:
1.  **Semantic Score** (Cosine Similarity)
2.  **Keyword Score** (Does the word exist?)

\`Final Score = (VectorScore * 0.7) + (KeywordScore * 0.3)\`
`
                    },
                    {
                        type: ContentType.CODE_PLAYGROUND,
                        codeProject: {
                            id: 'hybrid-search-drill',
                            language: 'python',
                            description: 'Assignment: Implement `hybrid_score`. Calculate weighted average of `vec_score` (0.7 weight) and `key_score` (0.3 weight).',
                            initialCode: `def hybrid_score(vec_score, key_score):
    # TODO: Return weighted sum
    pass

print(hybrid_score(0.9, 0.0)) # High vector, no keyword
print(hybrid_score(0.5, 1.0)) # Med vector, exact keyword`,
                            hints: [
                                { text: 'Multiply `vec_score` by 0.7', relearnLessonId: 'w3-d4-7' },
                                { text: 'Multiply `key_score` by 0.3', relearnLessonId: 'w3-d4-7' },
                                { text: 'Add them together.', relearnLessonId: 'w3-d4-7' }
                            ],
                            solutionCode: `def hybrid_score(vec_score, key_score):
    return (vec_score * 0.7) + (key_score * 0.3)

print(hybrid_score(0.9, 0.0))
print(hybrid_score(0.5, 1.0))`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 5. Session Management with Firestore
Users expect the Agent to remember them when they come back next week.
We use **[[Firestore]]** to store the conversation history (Session State).

**Pattern:**
1.  User sends message.
2.  Agent loads history from Firestore using \`session_id\`.
3.  Agent generates response.
4.  Agent saves new history to Firestore.
`
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `### Data Structure Example
In Firestore, a session document might look like this:

\`\`\`json
{
  "session_id": "user_123",
  "created_at": "2023-10-27T10:00:00Z",
  "history": [
    {"role": "user", "content": "Hi"},
    {"role": "agent", "content": "Hello! How can I help?"}
  ]
}
\`\`\`
`
                    },
                    {
                        type: ContentType.CODE_PLAYGROUND,
                        codeProject: {
                            id: 'firestore-session-drill',
                            language: 'python',
                            description: 'Assignment: Implement `load_session` and `save_session` using a mock dictionary `FIRESTORE_DB`.',
                            initialCode: `FIRESTORE_DB = {}

def save_session(session_id: str, history: list):
    # TODO: Save history to FIRESTORE_DB under session_id
    pass

def load_session(session_id: str) -> list:
    # TODO: Return history from FIRESTORE_DB
    # TODO: Return empty list if session_id not found
    pass

save_session("user123", ["Hello", "Hi there"])
print(load_session("user123"))
print(load_session("unknown"))`,
                            hints: [
                                { text: '`FIRESTORE_DB[session_id] = history`', relearnLessonId: 'w3-d4-7' },
                                { text: '`return FIRESTORE_DB.get(session_id, [])`', relearnLessonId: 'w3-d4-7' }
                            ],
                            solutionCode: `FIRESTORE_DB = {}

def save_session(session_id: str, history: list):
    FIRESTORE_DB[session_id] = history

def load_session(session_id: str) -> list:
    return FIRESTORE_DB.get(session_id, [])

save_session("user123", ["Hello", "Hi there"])
print(load_session("user123"))
print(load_session("unknown"))`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 6. User Preferences
Beyond history, we store **User Preferences**.
*   "Talk like a pirate"
*   "Be concise"
*   "Use Metric system"

These are stored in **[[Firestore]]** alongside the session but injected into the **System Instruction**.
`
                    },
                    {
                        type: ContentType.CODE_PLAYGROUND,
                        codeProject: {
                            id: 'user-prefs-drill',
                            language: 'python',
                            description: 'Assignment: Implement `get_system_prompt(user_prefs)`. If `user_prefs["concise"]` is True, return "You are a concise assistant." Else return "You are a helpful assistant."',
                            initialCode: `def get_system_prompt(user_prefs):
    # TODO: Check "concise" key
    # TODO: Return appropriate string
    pass

print(get_system_prompt({"concise": True}))
print(get_system_prompt({"concise": False}))`,
                            hints: [
                                { text: 'Use `if user_prefs.get("concise"):`', relearnLessonId: 'w3-d4-7' },
                                { text: 'Return the exact strings requested.', relearnLessonId: 'w3-d4-7' }
                            ],
                            solutionCode: `def get_system_prompt(user_prefs):
    if user_prefs.get("concise"):
        return "You are a concise assistant."
    return "You are a helpful assistant."

print(get_system_prompt({"concise": True}))
print(get_system_prompt({"concise": False}))`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 7. Context Pruning
Even with a 1M token window, sending 1000 messages costs money and adds latency.
We need **Pruning Strategies**.

**Strategy: Summarization + Tail**
Keep the System Instruction + Last 10 messages. Summarize the middle.
`
                    },
                    {
                        type: ContentType.NOTEBOOK,
                        notebook: {
                            id: 'nb-token-sim',
                            title: 'Simulating Context Limits',
                            cells: [
                                {
                                    id: 'c1',
                                    type: 'markdown',
                                    content: '### Token Estimation\nA rough rule of thumb: 1 Token ~= 4 Characters (or 0.75 words).'
                                },
                                {
                                    id: 'c2',
                                    type: 'code',
                                    content: `text = "The quick brown fox jumps over the lazy dog."
char_count = len(text)
word_count = len(text.split())
est_tokens = char_count / 4

print(f"Chars: {char_count}")
print(f"Words: {word_count}")
print(f"Est. Tokens: {est_tokens}")`
                                }
                            ]
                        }
                    },
                    {
                        type: ContentType.CODE_PLAYGROUND,
                        codeProject: {
                            id: 'context-pruning-drill',
                            language: 'python',
                            description: 'Assignment: Implement `prune_history`. If history > 5 messages, keep the first one (System Prompt) and the last 3. Replace the middle with "..." string.',
                            initialCode: `def prune_history(history):
    if len(history) <= 5:
        return history
    
    # TODO: Keep index 0
    # TODO: Keep last 3 (slice -3:)
    # TODO: Insert "..." in between
    pass

chat = ["System", "Msg1", "Msg2", "Msg3", "Msg4", "Msg5", "Msg6"]
print(prune_history(chat))`,
                            hints: [
                                { text: 'Use list slicing: `history[:1]` and `history[-3:]`', relearnLessonId: 'w3-d4-7' },
                                { text: 'Combine lists: `[head] + ["..."] + [tail]`', relearnLessonId: 'w3-d4-7' }
                            ],
                            solutionCode: `def prune_history(history):
    if len(history) <= 5:
        return history
    
    return [history[0]] + ["..."] + history[-3:]

chat = ["System", "Msg1", "Msg2", "Msg3", "Msg4", "Msg5", "Msg6"]
print(prune_history(chat))`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 8. Summarization Strategy
Instead of deleting old messages, we **Summarize** them.
We ask the LLM: *"Summarize the conversation so far."*
Then we replace the history with that summary.
`
                    },
                    {
                        type: ContentType.CODE_PLAYGROUND,
                        codeProject: {
                            id: 'summarization-drill',
                            language: 'python',
                            description: 'Assignment: Mock a summarizer. Define `summarize_history(history)`. Return a string "Summary of X messages" where X is len(history).',
                            initialCode: `def summarize_history(history):
    # TODO: Get length of history
    # TODO: Return "Summary of {len} messages"
    pass

chat = ["Msg1", "Msg2", "Msg3"]
print(summarize_history(chat))`,
                            hints: [
                                { text: 'Use `len(history)`', relearnLessonId: 'w3-d4-7' },
                                { text: 'Use an f-string.', relearnLessonId: 'w3-d4-7' }
                            ],
                            solutionCode: `def summarize_history(history):
    return f"Summary of {len(history)} messages"

chat = ["Msg1", "Msg2", "Msg3"]
print(summarize_history(chat))`
                        }
                    },
                    {
                        type: ContentType.QUIZ,
                        quiz: {
                            id: 'quiz-week-3',
                            title: 'Week 3 Certification Quiz',
                            questions: [
                                {
                                    id: 'q1',
                                    question: 'Why do we use Async Tools?',
                                    options: ['To make Python code look cooler', 'To allow the Agent to run multiple tools in parallel', 'To reduce the cost of the API call', 'To increase the accuracy of the tool'],
                                    correctOptionIndex: 1,
                                    explanation: 'Async allows the event loop to handle other tasks (like another tool call) while waiting for I/O.',
                                    hint: { text: 'Think about "Blocking" vs "Non-Blocking".', relearnLessonId: 'w3-d1-3' },
                                    optionExplanations: [
                                        { text: 'Code aesthetics are subjective, performance is objective.', relearnLessonId: 'w3-d1-3' },
                                        { text: 'Correct. It enables concurrency.', relearnLessonId: 'w3-d1-3' },
                                        { text: 'Async does not change the billing of the external API.', relearnLessonId: 'w3-d1-3' },
                                        { text: 'Execution speed does not affect accuracy.', relearnLessonId: 'w3-d1-3' }
                                    ]
                                },
                                {
                                    id: 'q2',
                                    question: 'What is an Embedding?',
                                    options: ['A way to compress files', 'A numerical representation of text meaning', 'A type of Python decorator', 'A database for images'],
                                    correctOptionIndex: 1,
                                    explanation: 'Embeddings convert text into vectors where similar meanings are mathematically close.',
                                    hint: { text: 'It turns "Dog" into `[0.1, 0.9]`.', relearnLessonId: 'w3-d4-7' },
                                    optionExplanations: [
                                        { text: 'While they are compact, their purpose is semantic search, not compression.', relearnLessonId: 'w3-d4-7' },
                                        { text: 'Correct. Vectors represent semantic meaning.', relearnLessonId: 'w3-d4-7' },
                                        { text: 'That is a language feature, not an AI concept.', relearnLessonId: 'w3-d4-7' },
                                        { text: 'Vector stores can hold image embeddings, but an embedding itself is just the vector.', relearnLessonId: 'w3-d4-7' }
                                    ]
                                },
                                {
                                    id: 'q3',
                                    question: 'Which memory type is infinite?',
                                    options: ['Short-Term (Context Window)', 'Long-Term (Vector Store)', 'RAM', 'GPU Memory'],
                                    correctOptionIndex: 1,
                                    explanation: 'Vector Stores can hold millions of documents, retrieved only when needed.',
                                    hint: { text: 'Which one uses a database?', relearnLessonId: 'w3-d4-7' },
                                    optionExplanations: [
                                        { text: 'Context Windows are limited (e.g., 1M tokens).', relearnLessonId: 'w3-d4-7' },
                                        { text: 'Correct. You can store terabytes of vectors.', relearnLessonId: 'w3-d4-7' },
                                        { text: 'RAM is hardware and very limited.', relearnLessonId: 'w3-d4-7' },
                                        { text: 'GPU memory is extremely expensive and limited.', relearnLessonId: 'w3-d4-7' }
                                    ]
                                }
                            ]
                        }
                    }
                ]
            }
        ]
      },
      {
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
Retrieval Augmented Generation (**[[RAG]]**) starts with data.
Before an Agent can search your documents, they must go through a pipeline:

1.  **[[Ingestion]]**: Read files (PDF, HTML, TXT).
2.  **[[Chunking]]**: Split text into small pieces.
3.  **[[Embeddings]]**: Convert text to vectors.
4.  **Indexing**: Store vectors in a **[[Vector_Store]]**.
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
print(f"'{clean_text(raw)}'")`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 2. Chunking Strategies
Why chunk?
1.  **Context Limits**: You can't fit a whole book in a prompt.
2.  **Semantic Precision**: A whole book has "mixed" meaning. A paragraph has specific meaning.

**Strategies:**
*   **Fixed Size**: Split every 500 characters. (Fast, but breaks sentences).
*   **Recursive**: Split by \`\\n\\n\`, then \`\\n\`, then \` \`. (Preserves semantic structure).
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
print(recursive_chunk(text, 20))`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 3. Metadata Extraction
Searching for "Contract" is hard. Searching for "Contract" where \`year=2024\` is easy.
We extract **[[Metadata]]** during ingestion.

*   **Source**: Filename, URL.
*   **Content**: Author, Date, Title.
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
print(extract_metadata(doc))`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 4. Embedding & Indexing with Vertex AI
Once chunked, we send text to **[[Vertex_AI]]** to get **[[Embeddings]]**.
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

print(batch_embed(["A", "B"]))`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 5. Index Creation & Management
Vectors are useless if you can't search them fast. We use **[[Indexing]]**.
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

print(create_index("my-rag-index", 768))`
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
1.  **[[Hybrid_Search]]**: Combine Vectors (Meaning) + Keywords (Precision).
2.  **[[Query_Expansion]]**: Rewrite the user's query to find what they *meant*, not just what they *said*.
3.  **[[Ranking]]**: Re-sort the top results using a smarter model.
`
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 2. Hybrid Search Implementation
We combine scores from two systems.
*   **Vector DB**: Returns \`doc_id\` with \`cosine_similarity\`.
*   **Keyword DB**: Returns \`doc_id\` with \`BM25_score\`.

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
print(merge_results(v_scores, k_scores))`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 3. Query Expansion
Users write bad queries.
*   *User*: "connection error"
*   *Docs*: "SocketTimeoutException", "404 Not Found", "DNS Failure"

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
print(expand_query("It is too slow"))`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 4. Reranking & Context Optimization
After retrieval, we might have 50 documents. We can't fit them all in the **[[Context_Window]]**.
We use a **Reranker** (**[[Cross_Encoder]]**) to score them accurately and pick the top 5.

**Context Optimization:**
*   **Ranking**: Sort by relevance.
*   **Selection**: Take top N.
*   **Compression**: Summarize or remove irrelevant parts of the selected docs.
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
print(pack_context(docs, 85))`
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
    *   *Step A*: Check History (Context).
    *   *Step B*: Search Knowledge Base (Retrieval).
    *   *Step C*: Rerank results.
    *   *Step D*: Generate Answer using retrieved facts.
    *   *Step E*: Save interaction to History.
`
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
print(bot.chat("I forgot my password"))`
                        }
                    },
                    {
                        type: ContentType.MARKDOWN,
                        markdown: `# 2. Evaluation
How do you know your RAG is good?
We test with **Golden Queries**.

*   **Faithfulness**: Did the answer come from the docs?
*   **Relevance**: Did it answer the user's question?
*   **Recall**: Did it find the right document?
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
    ]
  },
  {
      id: 'phase-3',
      title: 'Phase 3: Advanced Patterns',
      weeks: [
          {
              id: 'week-5',
              title: 'Week 5: Multi-Agent Systems',
              description: 'Orchestration, Supervisor patterns, and Workflows.',
              lessons: []
          }
      ]
  }
];

export const getEncyclopediaEntry = (term: string): EncyclopediaEntry | undefined => {
  // Simple normalization for lookup
  const key = term.toLowerCase().replace(/ /g, '_').replace(/\[|\]/g, '');
  return encyclopediaData[key];
};