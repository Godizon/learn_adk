import { CoursePhase, EncyclopediaEntry, ContentType } from '../types';

// --- Encyclopedia Data (The Knowledge Graph) ---
export const encyclopediaData: Record<string, EncyclopediaEntry> = {
  'init': {
    id: 'init',
    term: '__init__',
    category: 'Python Internals',
    summary: 'The initialization method in Python classes, crucial for setting up Agent state.',
    adkContext: `In ADK, \`__init__\` is the bridge between your Blueprint (code) and the Live Agent. 
    
When you build a Custom Agent, you override \`__init__\` to inject dependencies like Model Name, API Keys, and Tools.
    
**Crucial Pattern:** You MUST call \`super().__init__(name="...")\`. If you fail to initialize the parent class, ADK telemetry and memory systems will not attach, causing silent failures during orchestration.`,
    pythonInternals: `Contrary to popular belief, \`__init__\` is NOT the constructor.
    
**The Two-Step Creation Process:**
1. **Creation (\`__new__\`)**: Allocates memory, returns object instance.
2. **Initialization (\`__init__\`)**: Populates that memory.

**Source Logic Visualization:**
\`\`\`python
# How Python internals work roughly
instance = Agent.__new__(Agent)
if isinstance(instance, Agent):
    Agent.__init__(instance, name="Bond")
\`\`\`
`,
    crossLanguage: `| Language | Syntax | Difference |
| :--- | :--- | :--- |
| **Java** | \`public Agent() { ... }\` | Name matches Class. No implicit self. |
| **JavaScript** | \`constructor() { ... }\` | Explicit keyword. Strict 'this' binding. |
| **Go** | \`func NewAgent() *Agent\` | No classes. Uses Factory Patterns. |`,
    history: `**Origin:** Simula 67 (1967), the first object-oriented language.
**Etymology:** The double underscore ("dunder") prevents user-defined method names from conflicting with system behaviors.`,
    relatedTerms: ['self', 'super', 'inheritance']
  },
  'agent': {
    id: 'agent',
    term: 'Agent',
    category: 'ADK Core',
    summary: 'The reasoning engine of the application.',
    adkContext: 'In ADK, an Agent is a Python class wrapping an LLM with specific instructions and tool access.',
    pythonInternals: 'Agents are implemented as diverse subclasses of `BaseAgent`, utilizing mixins for capabilities like Memory and ToolUse.',
    relatedTerms: ['Tools', 'Orchestration']
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
        description: 'Establish foundational understanding of ADK architecture and environment setup.',
        lessons: [
          {
            id: 'day-1-2',
            title: 'Day 1-2: Architecture',
            content: [
              {
                type: ContentType.MARKDOWN,
                markdown: `# 1. The ADK Philosophy
The Agent Development Kit (ADK) differs from traditional software. In traditional apps, you hard-code the logic path (A -> B -> C). In ADK, you define the goal, and the **[[Agent]]** determines the path.

# 2. The Four Pillars
To build any ADK app, you must understand these four components:

### A. Agents (The "Brain")
The reasoning engine. In ADK, an Agent is a Python class that wraps an LLM (like Vertex AI) with instructions.

### B. Tools (The "Hands")
Agents cannot touch the real world (databases, APIs) without Tools.

### C. Memory (The "Context")
State persistence. Without memory, every interaction is brand new.

### D. Orchestration (The "Manager")
How multiple agents coordinate to solve complex tasks.

# 3. Use Case Analysis
* **Traditional:** Rule-based (If "Refund" then show "Policy")
* **ADK:** Semantic understanding ("I'm upset about my bill" -> Agent checks sentiment, looks up bill, offers refund).`
              }
            ]
          },
          {
            id: 'day-3-4',
            title: 'Day 3-4: Environment Setup',
            content: [
              {
                type: ContentType.MARKDOWN,
                markdown: `# 1. The Local Environment
Before installing ADK, we must isolate our dependencies. We do this using **Virtual Environments**.

> **Critical Concept:** If you don't use a virtual environment, you risk breaking your system's Python installation ("Dependency Hell").`
              },
              {
                type: ContentType.CODE_PLAYGROUND,
                codeProject: {
                  id: 'setup-env',
                  language: 'python',
                  description: 'Practice setting up a virtual environment command (simulated).',
                  initialCode: '# Type the command to create a virtual environment named "adk_env"\n',
                  hints: [
                    'Use the python module `venv`',
                    'The syntax is `python -m venv <name>`'
                  ],
                  solutionCode: 'python -m venv adk_env'
                }
              }
            ]
          },
          {
            id: 'day-5-7',
            title: 'Day 5-7: First ADK Application',
            content: [
              {
                type: ContentType.MARKDOWN,
                markdown: `# Creating your first Agent
We will start by creating a class that initializes our agent. This is where the **[[init]]** method becomes vital.`
              },
              {
                type: ContentType.CODE_PLAYGROUND,
                codeProject: {
                  id: 'hello-world-agent',
                  language: 'python',
                  description: 'Implement the __init__ method for a basic specific agent.',
                  initialCode: `from adk.core import Agent

class GreeterBot(Agent):
    def __init__(self, name):
        # TODO: Initialize the parent class
        # TODO: Set a default system instruction
        pass`,
                  hints: [
                    'Don\'t forget `super().__init__(...)`',
                    'Pass the name to the super constructor'
                  ],
                  solutionCode: `from adk.core import Agent

class GreeterBot(Agent):
    def __init__(self, name):
        super().__init__(name=name)
        self.system_instruction = "You are a helpful assistant."`
                }
              }
            ]
          }
        ]
      },
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
