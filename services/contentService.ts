import { CoursePhase, ContentType, Lesson } from '../types';
import phase1Week1 from '../adk_week_modules/phase1Week1';

// --- Course Syllabus Data ---
export const adksyllabusData: CoursePhase[] = [
  {
    id: 'phase-1',
    title: 'Phase 1: ADK Fundamentals',
    weeks: [
      phase1Week1,
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
The [[Agent]] solves this by sending the *entire conversation history* back to the model with every new message.

### The Limit: Context Window
Every model has a [[Context_Window]]. If you exceed it (e.g., 8000 tokens), the model crashes or forgets the beginning.

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
            self.history.pop(0)`,
                  expectedOutput: "['Msg 2', 'Msg 3']"
                }
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 2. Advanced Prompting
The **System Instruction** is your Agent's DNA.

### Few-Shot Prompting
Instead of just telling the agent what to do, *show* it.
**Zero-Shot**: "Extract the sentiment."
**Few-Shot**: "Extract sentiment. Examples: 'I love this' -> POSITIVE. 'I hate this' -> NEGATIVE."
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
**Temperature**: Controls randomness (0.0 = Focused, 1.0 = Creative).
**Max Output Tokens**: Limits verbosity.
**Stop Sequences**: Tells the model when to stop generating (e.g., "User:").

### Architecture Patterns
**Zero-Shot Agent**: No history, just one-off tasks.
**Conversational Agent**: Maintains history (Stateful).
**ReAct Agent**: Loops through Thought -> Action -> Observation.`
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
    return f"Creative: {prompt}"`,
                  expectedOutput: 'Creative: Hello World\nHalted'
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
When you define a tool, ADK uses [[Pydantic]] to validate inputs.

### The Docstring
The [[Docstring]] is the most important part of a tool. It is the "Prompt" for that specific function.
**Bad**: \`"""Calculates stuff."""\`
**Good**: \`"""Calculates compound interest given principal P, rate R, and time T."""\`
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
        return "Error: Cannot divide by zero"`,
                  expectedOutput: 'Error: Cannot divide by zero'
                }
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 2. Complex Types & Schemas
Tools aren't limited to strings and numbers. You can use Lists and Dictionaries.

\`scores: list[int]\`: The LLM will send a JSON array \`[10, 20, 30]\`.
\`metadata: dict[str, str]\`: The LLM will send a JSON object \`{"key": "value"}\`.

**Warning:** Complex types require strict [[Type_Hinting]] so ADK can generate the correct [[JSON_Schema]].`
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
    return f"Average: {avg:.2f}"`,
                  expectedOutput: 'Average: 20.00'
                }
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 3. Built-in ADK Tools
You don't always have to build from scratch. ADK provides [[Built_in_Tools]].

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
    return f"{amount * rate:.2f}"`,
                  expectedOutput: '85.00'
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

print("Tools defined.")`,
                  expectedOutput: 'Tools defined.'
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

[[BigQuery]]: For structured data (SQL). "How many users signed up yesterday?"
[[Cloud_Storage]]: For unstructured data (Files). "Read the PDF in the bucket."
[[Firestore]]: For application state. "Save this user's preferences."
[[Vertex_AI_Search]]: For searching documents. "Find the policy on remote work."
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

print("Cloud tools defined.")`,
                  expectedOutput: 'Cloud tools defined.'
                }
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 2. External APIs & Tool Chaining
Agents live in the real world. They need to talk to external APIs (Slack, Jira, Weather APIs).

### API Integration
We use standard Python libraries like \`requests\` inside our tools.

### Tool Chaining
[[Tool_Chaining]] is when the output of Tool A becomes the input of Tool B.
*User*: "Email me the summary of the latest sales report."
*Step 1*: Call \`get_sales_report()\` -> Returns text.
*Step 2*: Call \`send_email(text)\`.
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
print(send_slack_alert(f"Price is {price}"))`,
                  expectedOutput: 'Sent: Price is 150'
                }
              },
              {
                type: ContentType.MARKDOWN,
                markdown: `# 3. Going Real: GCP Configuration
Up until now, we mocked our tools. Now, let's connect to the real [[GCP_Console]].

### Prerequisites
To run the code below on your local machine, you must:
1.  **Create a Project**: Go to console.cloud.google.com and create a new project.
2.  **Enable Billing**: Link a billing account (Free Tier is available).
3.  **Enable APIs**: Search for and enable:
    **BigQuery API**
    **Cloud Storage API**
4.  **Install Libraries**:
    \`\`\`bash
    pip install google-cloud-bigquery google-cloud-storage
    \`\`\`
5.  **Authenticate**:
    \`\`\`bash
    gcloud auth application-default login
    \`\`\`
    This creates the [[ADC]] file your code needs.
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
print(f"Agent loaded with {len(bot.tools)} tools.")`,
                  expectedOutput: 'Agent loaded with 5 tools.'
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
const syllabusData = adksyllabusData;
export const getLessonByProjectId = (projectId: string): Lesson | undefined => {
  for (const phase of syllabusData) {
    for (const week of phase.weeks) {
      for (const lesson of week.lessons) {
        if (lesson.content.some(c => c.codeProject?.id === projectId)) {
          return lesson;
        }
      }
    }
  }
  return undefined;
};

export const getNextLesson = (currentLessonId: string): Lesson | undefined => {
  let found = false;
  for (const phase of syllabusData) {
    for (const week of phase.weeks) {
      for (const lesson of week.lessons) {
        if (found) return lesson;
        if (lesson.id === currentLessonId) found = true;
      }
    }
  }
  return undefined;
};