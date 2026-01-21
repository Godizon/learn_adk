import { EncyclopediaEntry } from "@/types";

export const encyclopediaData: Record<string, EncyclopediaEntry> = {
  // --- Architecture Core ---
  // --- Python Basics (For Absolute Beginners) ---
  'variable': {
    id: 'variable',
    term: 'Variable',
    category: 'Python Basics',
    summary: 'A name attached to a piece of data.',
    adkContext: 'In ADK, you store your Agent in a variable (e.g., `my_agent = Agent()`). Think of it as a labeled box.',
    pythonInternals: '`x = 5`. `x` is the variable name, `5` is the value.',
    relatedTerms: ['Data Type', 'State']
  },
  'string': {
    id: 'string',
    term: 'String',
    category: 'Python Basics',
    summary: 'Text data, surrounded by quotes.',
    adkContext: 'Prompts, user messages, and tool outputs are almost always Strings.',
    pythonInternals: '`"Hello"` or `\'Hello\'`.',
    relatedTerms: ['Token', 'Text']
  },
  'integer': {
    id: 'integer',
    term: 'Integer',
    category: 'Python Basics',
    summary: 'A whole number (no decimal point).',
    adkContext: 'Used for counting tokens, setting limits (e.g., `max_output_tokens=100`), or indexing lists.',
    pythonInternals: '`x = 5` (int). `x = 5.0` (float).',
    relatedTerms: ['Float', 'Math']
  },
  'boolean': {
    id: 'boolean',
    term: 'Boolean',
    category: 'Python Basics',
    summary: 'True or False.',
    adkContext: 'Used for flags like `verbose=True` or `return_dict=False`.',
    pythonInternals: '`True` and `False` (Capitalized in Python!).',
    relatedTerms: ['Logic', 'If Statement']
  },
  'list': {
    id: 'list',
    term: 'List',
    category: 'Python Basics',
    summary: 'An ordered collection of items.',
    adkContext: 'Used for `history` (list of messages) or `tools` (list of functions).',
    pythonInternals: '`my_list = [1, 2, 3]`. Accessed by index: `my_list[0]` is 1.',
    relatedTerms: ['Array', 'Collection']
  },
  'dictionary': {
    id: 'dictionary',
    term: 'Dictionary',
    category: 'Python Basics',
    summary: 'A collection of Key-Value pairs.',
    adkContext: 'Used for configuration (`config={"temp": 0.5}`) and JSON objects.',
    pythonInternals: '`my_dict = {"key": "value"}`. Accessed by key: `my_dict["key"]`.',
    relatedTerms: ['JSON', 'Map']
  },
  'loop': {
    id: 'loop',
    term: 'Loop',
    category: 'Python Basics',
    summary: 'Repeating a block of code multiple times.',
    adkContext: 'Agents run in a loop: Perceive -> Act -> Observe -> Repeat.',
    pythonInternals: '`for item in list:` or `while True:`.',
    relatedTerms: ['Iteration', 'Recursion']
  },
  'if_statement': {
    id: 'if_statement',
    term: 'If Statement',
    category: 'Python Basics',
    summary: 'Making a decision in code.',
    adkContext: 'Used in Tools ("If price > 100, ask for approval") or Routers.',
    pythonInternals: '`if condition: do_something()`',
    relatedTerms: ['Logic', 'Boolean']
  },
  'function': {
    id: 'function',
    term: 'Function',
    category: 'Python Basics',
    summary: 'A reusable block of code that performs a specific task.',
    adkContext: 'Every [[Tool]] is a function. It takes input (arguments) and returns output.',
    pythonInternals: '`def my_func(arg): return arg * 2`',
    relatedTerms: ['Tool', 'Method']
  },
  'module': {
    id: 'module',
    term: 'Module',
    category: 'Python Basics',
    summary: 'A file containing Python code (functions, classes) that you can import.',
    adkContext: 'You import ADK components from modules: `from adk.core import Agent`.',
    pythonInternals: '`import math` or `from math import sqrt`.',
    relatedTerms: ['Import', 'Library']
  },
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
    adkContext: 'Agents use [[Tool]]s to prevent hallucination. Instead of guessing the weather, they look it up.',
    pythonInternals: 'Caused by the probabilistic nature of the model predicting the next token based on training data, not real-time facts.',
    relatedTerms: ['Grounding', 'Probabilistic']
  },
  'grounding': {
    id: 'grounding',
    term: 'Grounding',
    category: 'AI Reliability',
    summary: 'Anchoring model outputs to verifiable sources of information.',
    adkContext: 'Connecting an Agent to a database (like [[BigQuery]]) or a Search API grounds its responses in reality.',
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
    adkContext: 'Used for [[Ranking]]. It is slower than Vector Search (Bi-Encoder) but much more accurate because it sees the interaction between words in the query and document.',
    pythonInternals: '`score = model.predict([(query, doc)])`',
    relatedTerms: ['Ranking', 'Embeddings']
  },
  'bm25': {
    id: 'bm25',
    term: 'BM25',
    category: 'Search Algorithms',
    summary: 'Best Matching 25. A ranking function used by search engines to estimate the relevance of documents to a given search query.',
    adkContext: 'The standard algorithm for [[Hybrid_Search]] (Keyword part). It cares about exact word frequency, unlike Vectors.',
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
    category: 'Computer Science Fundamentals',
    summary: 'A user-defined blueprint or template that bundles data (attributes) and behavior (methods) into a single logical unit.',
    adkContext: 'In ADK, a Class is the container for your Agent\'s logic. It allows you to create multiple independent Agents from one set of instructions. If `CustomerSupportAgent` is the Class, then "Chat_Session_401" and "Chat_Session_402" are distinct **Objects** (Instances) running that class. They share the same code but have different memories (State).',
    pythonInternals: `
\`\`\`python
# The Class (The Character Sheet Template)
class RPGCharacter:
    # __init__ sets the initial State
    def __init__(self, name: str, job: str):
        self.name = name        # Attribute (Data)
        self.job = job          # Attribute (Data)
        self.health = 100       # Attribute (Data)

    # Methods define Behavior
    def take_damage(self, amount: int):
        self.health -= amount
        if self.health <= 0:
            print(f"{self.name} has fallen!")

# The Objects (The Actual Players)
hero_1 = RPGCharacter("Aragorn", "Ranger")
hero_2 = RPGCharacter("Gandalf", "Wizard")

# hero_1 and hero_2 are unique.
# Damaging hero_1 does NOT hurt hero_2.
hero_1.take_damage(50) 
print(hero_2.health) # Still 100
\`\`\`
`,
    history: 'The concept originated in **Simula 67** (1967), created by Ole-Johan Dahl and Kristen Nygaard to simulate real-world systems (like ships or queues). It was further popularized by **Smalltalk** (1970s), where "everything is an object," influencing C++, Java, and Python.',
    crossLanguage: `
| Language | Implementation Detail |
| :--- | :--- |
| **Java** | Strict. Everything must be inside a class. One public class per file. |
| **JavaScript** | Originally prototype-based. \`class\` keyword added in ES6 (2015) as "syntactic sugar" over prototypes. |
| **C** | Does not have classes. Uses \`struct\` for data, but behavior (functions) must be kept separate. |
`,
    analogy: 'Think of a Class as a **Cookie Cutter** and Objects as the **Cookies**. You only need one cutter (Class) to make infinite cookies (Objects). Each cookie is made of the same stuff, but one might have sprinkles (different State) and another might be burnt.',
    relatedTerms: ['Instance', 'Object-Oriented Programming (OOP)', 'Inheritance', 'Encapsulation']
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
    summary: 'A conventional name for the first argument of instance methods. It acts as a reference to the **current specific object** interacting with the code.',
    adkContext: 'In ADK, an Agent needs to remember things (like `history` or `api_key`). If you just write `history = []` inside a function, that list dies when the function ends. If you write `self.history = []`, it is saved to the Agent\'s permanent backpack. `self` ensures that Agent A doesn\'t accidentally read Agent B\'s memory.',
    pythonInternals: `
\`\`\`python
class Agent:
    def __init__(self, name):
        self.name = name  # Stored on the object (Permanent)

    def speak(self):
        # We must use 'self' to retrieve the name we stored earlier
        print(f"I am {self.name}") 

bot = Agent("Hal")
bot.speak() 
# Python translates this call behind the scenes to:
# Agent.speak(bot) -> 'self' becomes 'bot'
\`\`\`
**Crucial Note**: \`self\` is technically just a naming convention. You *could* name it \`banana\`, but you will be shunned by the Python community.`,
    history: 'Python adopted explicit `self` from **Modula-3**. While most languages hide this reference, Python\'s creator, Guido van Rossum, insisted on it because "Explicit is better than implicit" (The Zen of Python). It removes ambiguity about whether you are using a local variable or an instance variable.',
    crossLanguage: `
| Language | Syntax | Difference |
| :--- | :--- | :--- |
| **Java/C++** | \`this\` | Implicit. You don't declare it in arguments. You can often omit it (e.g., \`name\` implies \`this.name\`). |
| **JavaScript** | \`this\` | Context-dependent and notoriously confusing. Its value changes based on *how* a function is called. |
| **Python** | \`self\` | Explicit. You MUST declare it as the first argument, and you MUST use it to access attributes. |
`,
    analogy: 'Think of a Class as a fixed wall mirror. It has the ability to reflect, but it has no face of its own. When **You** stand in front of it, the reflection (Instance) is **Yourself** (`self`). If you step away and a **Cat** stands there, the reflection becomes the **Cat** (`self`). The mirror doesn\'t change, but who "self" is changes depending on who is currently standing in the frame.',
    relatedTerms: ['Class', 'Instance', 'Scope', 'This']
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
    category: 'Object-Oriented Programming',
    summary: 'A mechanism where a new class (Child/Subclass) derives attributes and behavior from an existing class (Parent/Superclass). It allows for code reuse and hierarchical organization.',
    adkContext: 'In ADK, you almost never write an Agent from scratch. You write `class MyAgent(BaseAgent):`. By inheriting from `BaseAgent`, your code automatically gets the ability to talk to Gemini, manage memory, and handle API errors. You only have to write the specific instructions for *your* agent, while the "parent" handles the boring plumbing.',
    pythonInternals: `
\`\`\`python
class Robot: # Parent
    def move(self):
        print("I am moving.")

class FlyingRobot(Robot): # Child
    # Inherits 'move' automatically
    
    # New method specific to Child
    def fly(self):
        print("I am flying!")

bot = FlyingRobot()
bot.move() # Works! (Inherited)
bot.fly()  # Works! (New)
\`\`\`
**Key Concept**: Python supports **Multiple Inheritance** (inheriting from more than one parent), though it is often discouraged due to complexity (The Diamond Problem).`,
    history: 'Introduced alongside Classes in **Simula 67**. It was designed to model taxonomic hierarchies (e.g., A "Lion" is a "Mammal" is an "Animal"). While revolutionary for code reuse, modern software engineering often prefers "Composition over Inheritance" to avoid rigid, deeply nested hierarchies that become hard to change.',
    crossLanguage: `
| Language | Syntax | details |
| :--- | :--- | :--- |
| **Java** | \`class B extends A\` | strictly Single Inheritance. A class can only have one parent to prevent conflict. |
| **C++** | \`class B : public A\` | Supports Multiple Inheritance, giving developers more power but more ways to shoot themselves in the foot. |
| **Go / Rust** | N/A | These modern languages **rejected** inheritance. They use "Composition" and "Traits/Interfaces" instead to share behavior. |
`,
    analogy: 'Think of it like **Genetics**. You (the Child Class) inherit your eye color (Attributes) and your ability to digest lactose (Methods) from your Parents. You don\'t have to "code" your own eyes; you got them for free. However, you can also learn to play the guitar (Extending functionality), which your parents couldn\'t do, or you might choose to dye your hair (Overriding an inherited attribute).',
    relatedTerms: ['Polymorphism', 'Super', 'Method Overriding', 'Base Class']
  },
  'temperature': {
    id: 'temperature',
    term: 'Temperature',
    category: 'AI Hyperparameters',
    summary: 'A setting that controls the "randomness" or "creativity" of the model\'s output.',
    adkContext: 'For Agents, you typically want a **low temperature** (0.0 to 0.2). This ensures the agent follows instructions strictly and generates valid JSON for tools. High temperature (0.7+) makes the agent creative but prone to hallucinations and format errors.',
    pythonInternals: `It is passed via the \`generation_config\` object.
\`\`\`python
from vertexai.generative_models import GenerationConfig

# Deterministic (Best for Tools/Logic)
config = GenerationConfig(temperature=0.0)

# Creative (Best for Brainstorming)
config = GenerationConfig(temperature=0.9)

response = model.generate_content(prompt, generation_config=config)
\`\`\`
Math: Logits are divided by Temperature before the Softmax layer.`,
    relatedTerms: ['Determinism', 'Probabilistic', 'Hallucination']
  },
  // --- Multi-Agent Systems ---
  'multi_agent_system': {
    id: 'multi_agent_system',
    term: 'Multi-Agent System',
    category: 'Architecture',
    summary: 'A system composed of multiple interacting intelligent agents.',
    adkContext: 'Instead of one "God Mode" agent, we use a Researcher, a Writer, and a Reviewer working together. This improves reliability and separation of concerns.',
    pythonInternals: 'Implemented by instantiating multiple `Agent` classes and defining a workflow to pass messages between them.',
    relatedTerms: ['Orchestration', 'Supervisor Pattern']
  },
  'orchestrator': {
    id: 'orchestrator',
    term: 'Orchestrator',
    category: 'Architecture',
    summary: 'A component (or agent) that manages the flow of tasks between other agents.',
    adkContext: 'The Orchestrator is the "Project Manager". It doesn\'t do the work; it assigns tasks to the "Workers" (Agents) and ensures data flows correctly.',
    pythonInternals: 'Can be a simple Python `if/else` router or a complex State Graph.',
    relatedTerms: ['Supervisor Pattern', 'Router']
  },
  'supervisor_pattern': {
    id: 'supervisor_pattern',
    term: 'Supervisor Pattern',
    category: 'Agent Patterns',
    summary: 'A centralized orchestration pattern where a "Supervisor" delegates tasks to workers and reviews their output.',
    adkContext: 'User -> Supervisor -> (Delegates to Researcher) -> Supervisor -> (Delegates to Writer) -> Supervisor -> User.',
    pythonInternals: 'The Supervisor is often an LLM itself, prompting: "Given the user request, who should act next: [Researcher, Writer, or FINISH]?"',
    relatedTerms: ['Multi-Agent System', 'Orchestration']
  },
  'human_in_the_loop': {
    id: 'human_in_the_loop',
    term: 'Human-in-the-Loop',
    category: 'Governance',
    summary: 'A design pattern where human interaction is required for critical decisions or approvals.',
    adkContext: 'Before an Agent sends an email or buys a stock, the workflow pauses. A human reviews the plan and clicks "Approve". Only then does the Agent proceed.',
    pythonInternals: 'Implemented using "Checkpoints" in the workflow state. `if state["status"] == "awaiting_approval": pause()`.',
    relatedTerms: ['Governance', 'Circuit Breaker']
  },
  'langgraph': {
    id: 'langgraph',
    term: 'LangGraph',
    category: 'Libraries',
    summary: 'A library for building stateful, multi-agent applications with LLMs.',
    adkContext: 'ADK uses concepts from LangGraph to define Workflows. It treats agents as nodes in a graph and edges as the transition logic.',
    pythonInternals: '`graph = StateGraph(State)` ... `graph.add_node("agent", agent_func)` ... `graph.compile()`',
    relatedTerms: ['Orchestration', 'State Management']
  },
  'state_management': {
    id: 'state_management',
    term: 'State Management',
    category: 'Architecture',
    summary: 'How agents share context and memory (the "Blackboard") in a workflow.',
    adkContext: 'In a multi-agent system, agents don\'t talk directly. They read/write to a shared State object. Agent A writes a draft to State; Agent B reads it from State.',
    pythonInternals: 'Usually a TypedDict or Pydantic model: `class State(TypedDict): messages: list`',
    relatedTerms: ['Multi-Agent System', 'Context Window']
  },
  'agent_handoff': {
    id: 'agent_handoff',
    term: 'Agent Handoff',
    category: 'Agent Patterns',
    summary: 'The process of transferring control from one agent to another.',
    adkContext: 'When the "triage" agent realizes the user wants technical help, it performs a "Handoff" to the "Support Engineer" agent, passing the conversation history.',
    pythonInternals: '`return "Delegate to: SupportAgent"`',
    relatedTerms: ['Router', 'Orchestration']
  },
  'circuit_breaker': {
    id: 'circuit_breaker',
    term: 'Circuit Breaker',
    category: 'Reliability',
    summary: 'A design pattern to stop execution when failure rates exceed a threshold.',
    adkContext: 'If the "Researcher" agent fails 3 times (e.g., API down), the Circuit Breaker trips and stops the workflow instead of burning money on infinite retries.',
    pythonInternals: '`if failures > 3: raise CircuitBreakerError("Too many failures")`',
    relatedTerms: ['Error Handling', 'Reliability']
  }
};

export const getEncyclopediaEntry = (term: string): EncyclopediaEntry | undefined => {
  // Simple normalization for lookup
  const key = term.toLowerCase().replace(/ /g, '_').replace(/\[|\]/g, '');
  return encyclopediaData[key];
};
