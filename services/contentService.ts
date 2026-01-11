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
                    'Use simple `if "text" in user_input:` logic for this simulation.',
                    'Check for "weather" first.',
                    'Check for "time" second.',
                    'The `else` block should return "Action: Chat".'
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
                markdown: `# 1. The Danger of Global Installations
When you install a library, it goes into a folder on your computer. If Project A needs \`requests==1.0\` and Project B needs \`requests==2.0\`, you have a conflict. This is **Dependency Hell**.

**The Solution:** A **[[Virtual_Environment]]**. It is a folder that pretends to be a full computer.

# 2. The Cloud Identity
Your code runs on your laptop, but the "Brain" (Gemini) runs in Google's data centers. How does Google know you are allowed to use it?

1.  **Service Account**: A digital passport for your robot.
2.  **JSON Key**: The password for that passport.
3.  **Environment Variable**: The safe place to hide that password.

We use the **[[Environment_Variable]]** \`GOOGLE_APPLICATION_CREDENTIALS\`.
`
              },
              {
                type: ContentType.CODE_PLAYGROUND,
                codeProject: {
                  id: 'env-setup-drill',
                  language: 'python',
                  description: 'Drill: Setup Script. Write a Python script that checks if we are inside a Virtual Environment. Hint: `sys.prefix` != `sys.base_prefix` implies a venv is active.',
                  initialCode: `import sys

def check_environment():
    # TODO: Check if sys.prefix is different from sys.base_prefix
    # Return "Secure Virtual Env" or "Risky Global Env"
    pass`,
                  hints: [
                    'Import `sys` is already done.',
                    'Compare `sys.prefix` (current python location) with `sys.base_prefix` (original python location).',
                    'If they are equal, you are NOT in a venv.'
                  ],
                  solutionCode: `import sys

def check_environment():
    if sys.prefix != sys.base_prefix:
        return "Secure Virtual Env"
    return "Risky Global Env"`
                }
              },
              {
                  type: ContentType.NOTEBOOK,
                  notebook: {
                      id: 'nb-env-secrets',
                      title: 'Managing Secrets',
                      cells: [
                          {
                              id: 'c1',
                              type: 'markdown',
                              content: '### Security Drill\nNever print your API keys. But for this drill, we will simulate loading a key from the environment variables.'
                          },
                          {
                              id: 'c2',
                              type: 'code',
                              content: `import os

# Simulating a user setting the variable in terminal
os.environ["MY_SECRET_KEY"] = "xy-123-fake-key"

# Your application code:
def connect_to_db():
    key = os.environ.get("MY_SECRET_KEY")
    if not key:
        raise ValueError("Key not found!")
    return f"Connected with {key[:2]}***"

print(connect_to_db())`
                          }
                      ]
                  }
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
                    'In `__init__`, use `self.history = []`.',
                    'In `chat`, use `self.history.append(message)`.',
                    'Use `len(self.history)` to get the count.'
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
                    'Use `super().__init__(name="...")`.',
                    'If you forget this, the agent will crash silently.'
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
                markdown: `# Giving the Agent Hands
By default, an LLM only knows text. It cannot do math perfectly, and it cannot check the weather.
We give it **[[Tool]]**s.

### How it works
1.  You write a Python function: \`def add(a: int, b: int)\`
2.  ADK reads the **[[Type_Hinting]]** and **Docstring**.
3.  ADK converts this to a **[[JSON_Schema]]**.
4.  The LLM reads the schema and says: *"Please call function 'add' with a=5, b=10"*
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
                    'Start with `@tool` on the line before `def`.',
                    'Definition: `def check_stock(product_id: str) -> int:`',
                    'Docstring: `"""Returns the quantity of product."""` inside the function.'
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
                    'Define the tool first: `@tool def multiply(a: int, b: int) -> int: return a * b`',
                    'In `__init__`, call `super().__init__(name="MathBot")`',
                    'Assign `self.tools = [multiply]` (list of functions)',
                    'Set `self.system_instruction = "You are a math tutor."`'
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
            { id: 'w2-d1', title: 'Agent Deep Dive', content: []},
            { id: 'w2-d4', title: 'Tool Development', content: []},
            { id: 'w2-d6', title: 'GCP Integration', content: []}
        ]
      }
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
  const key = term.toLowerCase().replace(/_/g, '').replace(/\[|\]/g, '');
  return encyclopediaData[key];
};