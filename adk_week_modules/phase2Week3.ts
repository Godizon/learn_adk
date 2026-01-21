import { Week, ContentType } from '../types';

export const phase2Week3: Week = 
{
        phaseid: 'phase-2',
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
By defining tools with \`async def\`, we allow the Agent to handle [[Parallel_Execution]].

**Sync**: Call Tool A (Wait 2s) -> Call Tool B (Wait 2s) = 4s Total.
**Async**: Call Tool A & B together = 2s Total.
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

asyncio.run(main())`,
                  expectedOutput: 'Data 1',
                  validationType: 'contains'
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

asyncio.run(main())`,
                  expectedOutput: 'Total Time: 1.',
                  validationType: 'contains'
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

We can use a **Decorator** to add [[Caching]] to any tool.
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
print(expensive_search("A"))`,
                  expectedOutput: 'Calculating...\nResult for A\nResult for A'
                }
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 4. Dynamic Routing & Versioning
Tools evolve. You might have \`SearchTool_v1\` and \`SearchTool_v2\`.
Instead of hardcoding, we can use [[Tool_Routing]].

### Deprecation Pattern
1.  Keep the old tool but mark it deprecated in the [[Docstring]].
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
print(master_search("Python 3"))`,
                  expectedOutput: 'Legacy Results for old:Python 2\nModern AI Results for Python 3'
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

print(legacy_tool())`,
                  expectedOutput: 'WARNING: Deprecated, use new_tool\nLegacy Data'
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
**What**: The conversation history sent with every request.
**Limit**: Restricted by the [[Context_Window]] (e.g., 8k - 1M tokens).
**Cost**: Expensive (you pay for history every time).

### Long-Term Memory (Vector Store)
**What**: A database of facts, documents, and past conversations.
**Limit**: Infinite.
**Mechanism**: [[RAG]] (Retrieval Augmented Generation). The Agent searches the database for relevant info and injects *only that info* into the Short-Term Memory.
`
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 2. Vector Search & Embeddings
How does an Agent find "relevant" info? It uses [[Embeddings]].
An embedding is a list of numbers representing meaning.

"Dog": \`[0.9, 0.1]\`
"Puppy": \`[0.8, 0.2]\`
"Car": \`[0.1, 0.9]\`

We use [[Cosine_Similarity]] to find vectors that point in the same direction.
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

print(f"Closest to query: {find_closest([0.8, 0.2], DATABASE)}")`,
                  expectedOutput: 'Closest to query: doc1'
                }
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 3. Production: Vertex AI Vector Search
In production, you don't loop through a dictionary. You use a scalable engine like [[Vertex_AI_Search]].

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
print(endpoint.find_neighbors([0.9, 0.1]))`,
                  expectedOutput: "['id_1', 'id_2']"
                }
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 4. Retrieval Strategies: Hybrid Search
Vectors are great for concepts ("Dog" matches "Puppy").
But they are bad at exact matches (Part # "X-99").

[[Hybrid_Search]] combines:
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
print(hybrid_score(0.5, 1.0))`,
                  expectedOutput: '0.63\n0.65'
                }
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 5. Session Management with Firestore
Users expect the Agent to remember them when they come back next week.
We use [[Firestore]] to store the conversation history (Session State).

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
print(load_session("unknown"))`,
                  expectedOutput: "['Hello', 'Hi there']\n[]"
                }
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 6. User Preferences
Beyond history, we store **User Preferences**.
"Talk like a pirate"
"Be concise"
"Use Metric system"

These are stored in [[Firestore]] alongside the session but injected into the **System Instruction**.
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
print(get_system_prompt({"concise": False}))`,
                  expectedOutput: 'You are a concise assistant.\nYou are a helpful assistant.'
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
print(prune_history(chat))`,
                  expectedOutput: "['System', '...', 'Msg4', 'Msg5', 'Msg6']"
                }
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 8. Summarization Strategy
Instead of deleting old messages, we **Summarize** them.
We ask the LLM: "**Summarize the conversation so far.**"
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
print(summarize_history(chat))`,
                  expectedOutput: 'Summary of 3 messages'
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
      }

export default phase2Week3;