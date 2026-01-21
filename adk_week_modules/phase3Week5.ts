import { Week, ContentType } from '../types';

export const phase3Week5: Week = {
  phaseid: 'phase-3',
  id: 'week-5',
  title: 'Week 5: Multi-Agent Systems',
  description: 'Master the art of orchestrating multiple agents to solve complex problems using Supervisor patterns and LangGraph.',
  lessons: [
    {
      id: 'day-1-3',
      title: 'Day 1-3: Multi-Agent Architecture',
      duration: '3 Days',
      content: [
        {
          type: ContentType.MARKDOWN,
          markdown: `# 1. Two Heads Are Better Than One
Single Agents are powerful, but they have limits.
- **Complexity**: A single prompt trying to do Research, Coding, and Poetry simultaneously gets confused.
- **Context**: One agent cannot hold the entire internet in its context window.
- **Specialization**: "Jack of all trades, master of none."

### The Multi-Agent Solution
Instead of one super-agent, we build a **Team**.
1.  **Researcher**: Finds facts.
2.  **Analyst**: Checks facts.
3.  **Writer**: Writes the report.

This is a [[Multi_Agent_System]].
`
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# 2. The Supervisor Pattern
How do you stop 3 agents from arguing? You need a boss.

### The Supervisor
The [[Supervisor]] is a specialized Agent (or simple Router) whose only job is to:
1.  Read the user request.
2.  Decide *which* worker agent needs to act next.
3.  Pass the baton.

**Analogy**: You (User) talk to the Project Manager (Supervisor). The PM talks to the Developers (Workers). You don't micromanage the devs.
`
        },
        {
          type: ContentType.NOTEBOOK,
          notebook: {
            id: 'nb-supervisor-sim',
            title: 'Simulating a Supervisor',
            cells: [
              {
                id: 'c1',
                type: 'markdown',
                content: '### The Router Logic\nSee how a simple Supervisor decides who works next based on the last message.'
              },
              {
                id: 'c2',
                type: 'code',
                content: `def supervisor(last_message):
    if "research" in last_message.lower():
        return "Delegate to: Researcher"
    elif "code" in last_message.lower():
        return "Delegate to: Coder"
    else:
        return "Delegate to: Human (Ask for clarity)"

print(supervisor("I need you to research the history of AI."))
print(supervisor("Now write python code for it."))`
              }
            ]
          }
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# 3. Introduction to LangGraph
Building multi-agent loops with raw Python \`while\` loops gets messy fast.
We use [[LangGraph]] to define workflows as graphs.

### Nodes and Edges
- **Nodes**: The Agents (Workers).
- **Edges**: The relationships (If A finishes, go to B).
- **State**: The shared memory (The Project Folder) passed between nodes.

\`\`\`text
[Supervisor] --decides--> [Researcher]
       ^                       |
       |_______________________|
\`\`\`
`
        },
        {
          type: ContentType.CODE_PLAYGROUND,
          codeProject: {
            id: 'simple-router-drill',
            language: 'python',
            description: 'Assignment: Build a `Router` function. It takes a `query` (str) and a list of `skills` (list[str]). It should return the skill that matches the query best. If "image" is in query, return "artist". If "data" is in query, return "analyst". Default to "assistant".',
            initialCode: `def route_request(query: str, skills: list[str]) -> str:
    # TODO: excessive logic? No, keep it simple.
    # Check for keywords and return the matching skill name.
    pass

workers = ["artist", "analyst", "assistant"]
print(route_request("Draw a cat", workers))
print(route_request("Analyze this data", workers))
print(route_request("Hello", workers))`,
            hints: [
              { text: 'Use `if "image" in query.lower()` or "draw".', relearnLessonId: 'day-1-3' },
              { text: 'Return one of the strings from the `skills` list.', relearnLessonId: 'day-1-3' }
            ],
            solutionCode: `def route_request(query: str, skills: list[str]) -> str:
    q = query.lower()
    if "draw" in q or "image" in q:
        return "artist"
    if "data" in q or "analyze" in q:
        return "analyst"
    return "assistant"`,
            expectedOutput: 'artist\nanalyst\nassistant'
          }
        }
      ]
    },
    {
      id: 'day-4-5',
      title: 'Day 4-5: Workflows & Orchestration',
      duration: '2 Days',
      content: [
        {
          type: ContentType.MARKDOWN,
          markdown: `# 1. Workflows vs Agents
- **Agent**: Autonomous. "Figure it out."
- **Workflow**: Prescribed. "Step 1 -> Step 2 -> Step 3."

Most enterprise apps need **Workflows**. You don't want the agent skipping the "Approval" step just because it "felt like it."

### State Sharing
In a workflow, agents pass a **State** object (usually a Dictionary or Pydantic model) like a baton in a relay race.
`
        },
        {
          type: ContentType.NOTEBOOK,
          notebook: {
            id: 'nb-state-passing',
            title: 'Passing State',
            cells: [
              {
                id: 'c1',
                type: 'markdown',
                content: '### The Shared Blackboard\nAgents don\'t talk directly. They write to a shared State.'
              },
              {
                id: 'c2',
                type: 'code',
                content: `state = {"draft": "", "critique": ""}

def writer(s):
    s["draft"] = "Once upon a time..."
    return s

def editor(s):
    if len(s["draft"]) > 10:
        s["critique"] = "Good start."
    else:
        s["critique"] = "Too short."
    return s

# The Flow
state = writer(state)
state = editor(state)
print(state)`
              }
            ]
          }
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# 2. Parallel vs Sequential
- **Sequential**: A -> B -> C. (Safety first).
- **Parallel**: A splits into B and C, then matches at D. (Speed first).

**Map-Reduce**: A specialized parallel pattern where you "Map" a task to 10 workers (e.g., summarize 10 pages) and "Reduce" their answers into one summary.
`
        },
        {
          type: ContentType.CODE_PLAYGROUND,
          codeProject: {
            id: 'parallel-sim',
            language: 'python',
            description: 'Assignment: Simulate Map-Reduce. 1. `map_task` takes a list of numbers and returns a list of their squares. 2. `reduce_task` takes the list of squares and sums them up.',
            initialCode: `def map_task(numbers):
    # TODO: Return list of squares
    pass

def reduce_task(squares):
    # TODO: Return sum
    pass

data = [1, 2, 3]
mapped = map_task(data)
result = reduce_task(mapped)
print(result) # Should be 1 + 4 + 9 = 14`,
            hints: [
              { text: 'List comprehension: `[x*x for x in numbers]`', relearnLessonId: 'day-4-5' },
              { text: 'Use `sum(squares)`', relearnLessonId: 'day-4-5' }
            ],
            solutionCode: `def map_task(numbers):
    return [x*x for x in numbers]

def reduce_task(squares):
    return sum(squares)`,
            expectedOutput: '14'
          }
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# 3. Error Handling and Recovery
What if the "Writer" crashes?
In a robust system, the Supervisor should detect the error and:
1.  **Retry**: "Try again, Writer."
2.  **Fallback**: "Writer is dead. Caller Analyst instead."
3.  **Circuit Breaker**: "System is unstable. Stop everything and alert Human."
`
        }
      ]
    },
    {
      id: 'day-6-7',
      title: 'Day 6-7: Advanced Orchestration Patterns',
      duration: '2 Days',
      content: [
        {
          type: ContentType.MARKDOWN,
          markdown: `# 1. Human-in-the-Loop (HITL)
AI is not perfect. For high-stakes actions (buying stocks, sending emails), you need a human approval.

**Pattern**:
1.  Agent calculates plan: "Draft email to CEO."
2.  Agent pauses: "Waiting for approval..."
3.  Human clicks "Approve" (or edits the draft).
4.  Agent resumes: "Sending email."
`
        },
        {
          type: ContentType.CODE_PLAYGROUND,
          codeProject: {
            id: 'hitl-simulation',
            language: 'python',
            description: 'Assignment: Write an `execute_sensitive_action` function. It should print checking for approval. If global variable `APPROVED` is True, perform action. Else, print "Action Blocked".',
            initialCode: `APPROVED = False

def execute_sensitive_action(action):
    # TODO: specific logic
    pass

# output should change if we toggle APPROVED
print("--- Test 1 ---")
execute_sensitive_action("Delete Database")
`,
            hints: [
              { text: 'Check the global `APPROVED` variable.', relearnLessonId: 'day-6-7' }
            ],
            solutionCode: `APPROVED = False

def execute_sensitive_action(action):
    if APPROVED:
        print(f"Executing: {action}")
    else:
        print("Action Blocked: Approval Required")`,
            expectedOutput: '--- Test 1 ---\nAction Blocked: Approval Required'
          }
        },
        {
          type: ContentType.MARKDOWN,
          markdown: `# Hands-on Project: The Editorial Team
Build a 3-agent system using the concepts learned.

**Roles**:
1.  **Researcher**: Given a topic, returns 3 bullet points (Simulate this).
2.  **Blogger**: Takes bullet points, writes a short paragraph.
3.  **Editor**: Checks if the paragraph has > 20 words. If not, sends it back to Blogger (Loop!).

**Architecture**:
\`\`\`text
Start -> Researcher -> Blogger -> Editor --(Good)--> End
                                     |
                                   (Bad)
                                     |
                                     V
                                  Blogger
\`\`\`
`
        },
        {
          type: ContentType.CODE_PLAYGROUND,
          codeProject: {
            id: 'editorial-team-loop',
            language: 'python',
            description: 'Capstone: Implement the Editorial loop. `researcher(topic)` returns bullets. `blogger(bullets)` returns text. `editor(text)` returns "Approved" or "Rejected". Write a loop that keeps calling `blogger` until `editor` approves.',
            initialCode: `import random

def researcher(topic):
    return f"Facts about {topic}"

def blogger(facts):
    # Simulates writing. Sometimes short, sometimes long.
    if random.random() < 0.5:
        return "Short post."
    return "This is a much longer post that satisfies the requirement."

def editor(text):
    if len(text.split()) > 5:
        return "Approved"
    return "Rejected"

# Orchestration
topic = "AI"
facts = researcher(topic)
print(f"Research: {facts}")

# TODO: Write a while loop.
# Keep asking blogger for text until editor says "Approved"
# Print "Editor accepted: <text>" when done.
`,
            hints: [
              { text: 'Use `while True:`', relearnLessonId: 'day-6-7' },
              { text: 'Inside loop: `draft = blogger(facts)`', relearnLessonId: 'day-6-7' },
              { text: 'Check `if editor(draft) == "Approved": break`', relearnLessonId: 'day-6-7' }
            ],
            solutionCode: `import random

def researcher(topic):
    return f"Facts about {topic}"

def blogger(facts):
    if random.random() < 0.5:
        return "Short post."
    return "This is a much longer post that satisfies the requirement."

def editor(text):
    if len(text.split()) > 5:
        return "Approved"
    return "Rejected"

topic = "AI"
facts = researcher(topic)
print(f"Research: {facts}")

while True:
    draft = blogger(facts)
    status = editor(draft)
    print(f"Draft: {draft} -> Status: {status}")
    if status == "Approved":
        print(f"Editor accepted: {draft}")
        break`,
            expectedOutput: 'Editor accepted: This is a much longer post that satisfies the requirement.',
            validationType: 'contains'
          }
        }
      ]
    }
  ]
};

export default phase3Week5;