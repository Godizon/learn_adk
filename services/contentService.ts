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
        lessons: []
      },
      {
        id: 'week-4',
        title: 'Week 4: RAG Implementation',
        description: 'Document processing, Embeddings, and Production RAG.',
        lessons: []
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