import { Week, ContentType } from '../types';

export const phase1Week2: Week = {
  phaseid: 'phase-1',
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
            self.history.pop(0)

agent = SlidingWindowAgent(max_history=2)
agent.add_message("Msg 1")
agent.add_message("Msg 2")
agent.add_message("Msg 3")
print(agent.history)`,
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
    return f"Creative: {prompt}"

conf = {"temperature": 0.7, "stop_sequence": "END"}
print(generate_response("Hello World", conf))
print(generate_response("Stop here END", conf))`,
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
        return "Error: Cannot divide by zero"

print(safe_divide(10, 0))`,
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
    return f"Average: {avg:.2f}"

print(analyze_scores([10, 20, 30]))`,
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
    return f"{amount * rate:.2f}"

print(convert_currency(100, "USD", "EUR"))`,
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

print(reverse_string("hello"))
print(get_weather("Paris"))
print(generate_uuid())`,
            expectedOutput: 'olleh\nRainy\n123-abc-456'
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
            ],
            solutionCode: `from adk.tools import tool
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

public_sql = """
    SELECT name 
    FROM \`bigquery-public-data.usa_names.usa_1910_2013\` 
    LIMIT 5
"""
print(query_bigquery_real(public_sql))`,
            expectedOutput: 'Success: Found',
            validationType: 'contains'
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
print(f"Agent loaded with {len(bot.tools)} tools.")
print(f"Test Query: {query_bigquery('SELECT *')}")`,
            expectedOutput: 'Agent loaded with 5 tools.\nTest Query: rows'
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
}

export default phase1Week2;