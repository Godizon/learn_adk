import { Week, ContentType } from '../types';

export const phase1Week1: Week = {
  phaseid: 'phase-1',
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
This is [[Determinism]]. It is safe, predictable, and rigid.

### The New World: Probabilistic
In AI development, you write goals: **Here is context A, generate result B.**
This is [[Probabilistic]]. The system (the [[LLM]]) makes a prediction based on statistical likelihood.

**Key Insight:** An ADK [[Agent]] is a system designed to make a Probabilistic Engine (the LLM) behave in a Deterministic Way (Reliable Actions) using Tools and Memory.

# 2. The Cognitive Loop
Every agent follows a loop, often called the **Reasoning Loop**:
1.  **Perceive**: Read user input and history.
2.  **Think**: The LLM processes [[Token]]s to decide what to do.
3.  **Act**: The Agent calls a [[Tool]] (like searching a database).
4.  **Observe**: The Agent reads the tool's output.
`
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# 3. The Ghost in the Machine: System Instructions
Before an Agent enters the loop, it needs a persona. This is the **System Instruction** (a special type of [[Prompt Engineering]]).

**User Prompt**: "Book a flight to Paris."
**System Instruction**: "You are a helpful travel agent. Always ask for dates first."

In ADK, we define this in the [[Class]] \`__init__\`. It sets the baseline behavior for the [[Probabilistic]] engine.
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
print(tokenize("Hello Universe"))`,
            expectedOutput: '[1, 2, 3]\n[1, 0]'
          }
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# 4. Controlling the Chaos: Temperature
The [[LLM]] is probabilistic. It rolls dice to pick the next word.
We can control how "wild" these dice are using a parameter called [[Temperature]].

**Temperature = 0.0**: The model picks the most likely token every time. It becomes almost [[Determinism]]. Good for coding and data extraction.
**Temperature = 1.0**: The model takes risks. Good for creative writing.

**Note:** Even at Temperature 0, there is slight variance due to floating-point math in GPUs. It reduces randomness significantly, but does not strictly eliminate it.`
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
        return "Action: Chat"`,
            expectedOutput: 'Action: CheckWeather\nAction: Chat'
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
Project A needs \`google-cloud-aiplatform==1.0\`
Project B needs \`google-cloud-aiplatform==2.0\`

If you install these globally, they overwrite each other. This is **Dependency Hell**.

### The Solution: The Virtual Environment (venv)
A [[Virtual_Environment]] is a self-contained folder that contains a copy of the Python binary and a standalone \`site-packages\` folder.

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

When you **"activate"** a venv, you are telling your shell: "When I type \`python\`, look in \`my-project/venv/bin\` first, not \`/usr/bin\`."
`
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# Analogy: The Sterile Laboratory
Think of your global Python installation as the outside world. It's messy and full of conflicting bacteria (libraries).

A [[Virtual_Environment]] is like a sterile, sealed laboratory box.
- **Clean Room**: Nothing is inside except the specific tools (libraries) you explicitly install.
- **Isolation**: Work you do in Lab A (Project A) cannot contaminate Lab B (Project B).
- **Reproducibility**: If your experiment works in this lab, you can give someone else the exact same "lab in a box" (the venv + requirements.txt), and it will work for them, too.

**Pro-Tip:** Never, ever run \`sudo pip install\` or install packages to your system's Python (if you're on Linux/macOS). On Windows, this is just running \`pip install\` from a Command Prompt that is **not** in an activated venv. This is like spilling a test tube in the open air. It leads to contamination and unpredictable results.
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
    return "Warning: Global Env Detected"`,
            expectedOutput: 'Secure: Virtual Env Active',
            validationType: 'contains'
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

**Best Practice:** Always pin your versions. If you just say \`pydantic\`, a future update might break your code.

To install from a recipe:
\`\`\`bash
pip install -r requirements.txt
\`\`\`
`
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `### Common Pitfall: The Global \`pip\`
Your terminal might have multiple \`pip\` commands. If your virtual environment is not activated, running \`pip install\` will install packages into your system's global Python. This is the #1 cause of "Module Not Found" errors.

**How to check:**
- **In an activated venv:** running \`which pip\` (macOS/Linux) or \`where pip\` (Windows) should point to a path *inside your project's venv folder*.
- **If it points to a system path** like \`/usr/local/bin/pip\` or \`C:\\Python310\\Scripts\\pip.exe\`, your venv is NOT active. Stop and reactivate it.
`
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# 3. The Cloud Identity (Authentication)
Your code runs on your laptop, but the "Brain" (Gemini) runs in Google's data centers. How does Google know you are allowed to use it?

### How do they trust you?
1.  **Service Account**: A digital passport for your robot.
2.  [[ADC]] (Application Default Credentials)**: The magic protocol.
    Run \`gcloud auth application-default login\` in your terminal.
    This creates a JSON file on your hard drive.
    The ADK [[SDK]] automatically finds this file.

**Security Rule:** NEVER commit JSON keys to GitHub. Always use ADC or Environment Variables.
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
# We use a specific key to avoid overwriting your real GCP config if present
os.environ["APP_PROJECT_ID"] = "my-genai-project-123"
os.environ["APP_REGION"] = "us-central1"

# 2. Accessing it safely
def get_config():
    # .get() returns None if key is missing, preventing crashes
    project = os.environ.get("APP_PROJECT_ID")
    
    # accessing directly [key] crashes if missing - good for required vars
    try:
        region = os.environ["APP_REGION"]
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

We build agents using [[Class]] syntax.
1.  **\`__init__\`**: The setup. Loads the model, creates memory.
2.  **\`run\`**: The loop. Takes input, adds to memory, talks to model.

### The "Self" Concept
You will see [[self]] everywhere. It represents "This specific robot's memory". If you have 50 robots, \`self\` ensures Robot #1 doesn't read Robot #2's memory.
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
        pass

# --- Driver Code (Do not edit below) ---
# This tests your agent!
my_agent = StatefulAgent()
print(my_agent.chat("Hello AI"))
print(my_agent.chat("My name is Human"))`,
            hints: [
              { text: 'In `__init__`, use `self.history = []`.', relearnLessonId: 'day-5' },
              { text: 'In `chat`, use `self.history.append(message)`.', relearnLessonId: 'day-5' },
              { text: 'Use an f-string or string concatenation to return the count: f"I have remembered {len(self.history)} messages"', relearnLessonId: 'day-5' }
            ],
            solutionCode: `class StatefulAgent:
    def __init__(self):
        self.history = []

    def chat(self, message):
        self.history.append(message)
        return f"I have remembered {len(self.history)} messages"

my_agent = StatefulAgent()
print(my_agent.chat("Hello AI"))
print(my_agent.chat("My name is Human"))`,
            expectedOutput: 'I have remembered 1 messages\nI have remembered 2 messages'
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
r2.say_hello()`,
            expectedOutput: 'I am R2D2\nI am C3PO'
          }
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `### Inheritance
Why write code from scratch? We use [[Inheritance]] to steal code from Google's \`BaseAgent\`.
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
        super().__init__(name="BotV1")`,
            expectedOutput: 'BotV1'
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
LLMs are dream machines. They are [[Probabilistic]]. If you ask them "What is the stock price of Google right now?", they will guess ([[Hallucination]]) a number because they don't have access to the internet.

### The Fix: Grounding
[[Grounding]] is the process of connecting the model to reality.
**Ungrounded**: "I think the price is $100." (Guess)
**Grounded**: "I used the 'StockTool' and it returned $175.50." (Fact)

We achieve Grounding by giving the Agent [[Tool]]s.
`
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# 2. Giving the Agent Hands
By default, an LLM only knows text. It cannot do math perfectly, and it cannot check the weather.
We give it [[Tool]]s.

### How it works
1.  You write a Python function: \`def add(a: int, b: int)\`
2.  ADK reads the [[Type_Hinting]] and **Docstring**.
3.  ADK converts this to a [[JSON_Schema]].
4.  The LLM reads the schema and says: "**Please call function 'add' with a=5, b=10**"

### Type Hints & Runtime
Python is a dynamic language. If you write \`a: int\`, Python doesn't care if you pass a string at runtime.
**However**, ADK cares. ADK uses these hints to build the [[JSON_Schema]]. If the schema says "Integer", the LLM will try to send an Integer.
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

print(greet.__annotations__)`,
            expectedOutput: "{'name': <class 'str'>, 'age': <class 'int'>}"
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
    return 42`,
            expectedOutput: '42'
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
1.  **Architecture**: Do you understand [[Determinism]] vs [[Probabilistic]] systems? (Review Day 1-2)
2.  **Environment**: Can you verify you are in a [[Virtual_Environment]]? (Review Day 3-4)
3.  **Agents**: Can you create a [[Class]] that inherits from BaseAgent? (Review Day 5)
4.  **Tools**: Do you understand why [[Type_Hinting]] matters for [[JSON_Schema]]? (Review Day 6)

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
        self.system_instruction = "You are a math tutor."`,
            expectedOutput: 'You are a math tutor.\n6'
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
}

export default phase1Week1;