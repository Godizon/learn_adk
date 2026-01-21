import { Week, ContentType } from '../types';

export const phase3Week6: Week = {
    phaseid: 'phase-3',
    id: 'week-6',
    title: 'Week 6: Enterprise Integration',
    description: 'Learn how to connect Agents to enterprise data (BigQuery, SQL), External APIs, and secure them with IAM and Governance controls.',
    lessons: [
        {
            id: 'day-1-2',
            title: 'Day 1-2: Data Integration Patterns',
            duration: '2 Days',
            content: [
                {
                    type: ContentType.MARKDOWN,
                    markdown: `# 1. Talking to Data
Enterprises live on data. Agents need to read this data to be useful.
- **Structured Data**: SQL Databases (BigQuery, Postgres).
- **Unstructured Data**: PDFs, Emails (Vector Stores).

### The Text-to-SQL Pattern
Instead of writing SQL queries manually, the Agent writes them.
User: "How many users signed up last week?"
Agent: "SELECT count(*) FROM users WHERE signup_date > '2023-10-24'"

**Risk**: [[SQL_Injection]]. Never let an Agent execute SQL without validation or Read-Only permissions.
`
                },
                {
                    type: ContentType.NOTEBOOK,
                    notebook: {
                        id: 'nb-sql-gen',
                        title: 'SQL Generation with Validation',
                        cells: [
                            {
                                id: 'c1',
                                type: 'markdown',
                                content: '### Generating SQL Safe-ish-ly\nWe use the LLM to generate SQL, but we validate it before running.'
                            },
                            {
                                id: 'c2',
                                type: 'code',
                                content: `def generate_sql(question, schema):
    # Simulating LLM generation
    if "users" in question:
        return "SELECT * FROM users"
    return "SELECT 1"

def validate_sql(sql):
    forbidden = ["DROP", "DELETE", "UPDATE", "INSERT"]
    if any(word in sql.upper() for word in forbidden):
        return False, "Error: Read-Only Access Allowed"
    return True, "Safe"

# Test
query = "DROP TABLE users"
is_safe, msg = validate_sql(query)
print(f"Query: {query} -> {msg}")`
                            }
                        ]
                    }
                },
                {
                    type: ContentType.MARKDOWN,
                    markdown: `# 2. Batch vs. Streaming
- **Batch Processing**: Agent runs once a night. "Read all 50 sales reports and summarize."
- **Streaming**: Agent reacts to events. "New Jira Ticket created -> Agent analyzes it immediately."

### ETL Pipelines
**Extract, Transform, Load**. Agents are great at the **Transform** step.
Raw Data (JSON) -> Agent (Standardizes format) -> Clean Database.
`
                },
                {
                    type: ContentType.CODE_PLAYGROUND,
                    codeProject: {
                        id: 'simple-etl',
                        language: 'python',
                        description: 'Assignment: Write an `etl_process(raw_data)` function. It takes a list of strings "Name,Age". It should return a list of dictionaries `{"name": str, "age": int}`. If a row is malformed, skip it.',
                        initialCode: `def etl_process(raw_data: list[str]) -> list[dict]:
    # TODO: Loop through, split by comma, create dict
    # TODO: Handle errors nicely (try/except or if checks)
    pass

data = ["Alice,30", "Bob,25", "BadRow", "Charlie,40"]
print(etl_process(data))`,
                        hints: [
                            { text: 'Use `row.split(",")`', relearnLessonId: 'day-1-2' },
                            { text: 'Check `if len(parts) == 2:`', relearnLessonId: 'day-1-2' }
                        ],
                        solutionCode: `def etl_process(raw_data: list[str]) -> list[dict]:
    cleaned = []
    for row in raw_data:
        parts = row.split(",")
        if len(parts) == 2:
            try:
                cleaned.append({"name": parts[0], "age": int(parts[1])})
            except ValueError:
                continue # Skip if age is not an int
    return cleaned`,
                        expectedOutput: "[{'name': 'Alice', 'age': 30}, {'name': 'Bob', 'age': 25}, {'name': 'Charlie', 'age': 40}]"
                    }
                }
            ]
        },
        {
            id: 'day-3-4',
            title: 'Day 3-4: External System Integration',
            duration: '2 Days',
            content: [
                {
                    type: ContentType.MARKDOWN,
                    markdown: `# 1. The Keys to the Castle: Authentication
External APIs (Stripe, Slack, Salesforce) require logins.
- **API Keys**: Simple string. \`?api_key=123\`.
- **Bearer Tokens (JWT)**: \`Authorization: Bearer <token>\`.
- **OAuth 2.0**: The fancy "Login with Google" flow. Agents usually use a **Refresh Token** to stay logged in without a browser.

### Security Note
NEVER hardcode keys in your code. Use \`os.environ\` or [[Secret_Manager]].
`
                },
                {
                    type: ContentType.NOTEBOOK,
                    notebook: {
                        id: 'nb-mock-api-auth',
                        title: 'Simulating Auth Headers',
                        cells: [
                            {
                                id: 'c1',
                                type: 'markdown',
                                content: '### Constructing Requests\nSee how we add headers to a request using `requests` library (mocked).'
                            },
                            {
                                id: 'c2',
                                type: 'code',
                                content: `headers = {
    "Authorization": "Bearer my-secret-token",
    "Content-Type": "application/json"
}
print(f"Sending Request with headers: {headers}")
# requests.get("https://api.com", headers=headers)`
                            }
                        ]
                    }
                },
                {
                    type: ContentType.MARKDOWN,
                    markdown: `# 2. Be Polite: Rate Limiting
APIs will ban you if you spam them.
- **Rate Limit**: "100 requests per minute."
- **429 Too Many Requests**: The error you get when blocked.
- **Exponential Backoff**: The strategy to fix it. Wait 1s, then 2s, then 4s, then 8s...
`
                },
                {
                    type: ContentType.CODE_PLAYGROUND,
                    codeProject: {
                        id: 'retry-logic',
                        language: 'python',
                        description: 'Assignment: Write `call_api_with_retry`. It calls `flaky_api()`. If it returns "429", wait and retry up to 3 times. If success, return data.',
                        initialCode: `import time

# Mock API (Don't change)
attempts = 0
def flaky_api():
    global attempts
    attempts += 1
    if attempts < 3:
        return "429"
    return "Success"

def call_api_with_retry():
    # TODO: Loop 3 times.
    # TODO: If "429", print "Retrying..." and continue
    # TODO: If "Success", return "Success"
    pass

print(call_api_with_retry())`,
                        hints: [
                            { text: 'Use `for i in range(3):`', relearnLessonId: 'day-3-4' },
                            { text: 'Reset `global attempts` if testing multiple times locally.', relearnLessonId: 'day-3-4' }
                        ],
                        solutionCode: `import time

attempts = 0
def flaky_api():
    global attempts
    attempts += 1
    if attempts < 3:
        return "429"
    return "Success"

def call_api_with_retry():
    for i in range(5):
        status = flaky_api()
        if status == "429":
            print(f"Got 429, retrying (Attempt {i+1})...")
            # time.sleep(1) # In real life
            continue
        return status
    return "Failed"`,
                        expectedOutput: 'Got 429, retrying (Attempt 1)...\nGot 429, retrying (Attempt 2)...\nSuccess',
                        validationType: 'contains'
                    }
                }
            ]
        },
        {
            id: 'day-5-7',
            title: 'Day 5-7: Security & Governance',
            duration: '3 Days',
            content: [
                {
                    type: ContentType.MARKDOWN,
                    markdown: `# 1. Who are you? (Identity & Access)
In GCP, we use [[IAM]] (Identity and Access Management).
- **Service Account**: The identity your Agent uses.
- **Principle of Least Privilege**: Give the Agent only what it needs. If it only reads BigQuery, do NOT give it Admin access.

# 2. Privacy & PII
**PII**: Personally Identifiable Information (Emails, Phone Numbers, SSNs).
LLMs should generally NOT see sensitive PII unless necessary.
**Data Masking**: Replacing "aadwa@gmail.com" with "[EMAIL]" or "User-123" before sending to LLM.
`
                },
                {
                    type: ContentType.NOTEBOOK,
                    notebook: {
                        id: 'nb-pii-redaction',
                        title: 'Simple PII Redactor',
                        cells: [
                            {
                                id: 'c1',
                                type: 'markdown',
                                content: '### Regex for Privacy\nUsing Regular Expressions to hide emails.'
                            },
                            {
                                id: 'c2',
                                type: 'code',
                                content: `import re

def redact_email(text):
    email_pattern = r'[\\w\\.-]+@[\\w\\.-]+'
    return re.sub(email_pattern, '[EMAIL_REDACTED]', text)

text = "Contact me at bob@example.com for details."
print(redact_email(text))`
                            }
                        ]
                    }
                },
                {
                    type: ContentType.MARKDOWN,
                    markdown: `# 3. Audit Logging
Every action an Agent takes (Data read, Email sent) must be logged.
"Who did what, when?"
This is crucial for **Compliance** (GDPR, HIPAA).
`
                },
                {
                    type: ContentType.CODE_PLAYGROUND,
                    codeProject: {
                        id: 'audit-logger',
                        language: 'python',
                        description: 'Assignment: Create a "SecureAgent" class. It has a method `log_action(action)`. 1. Store action in a list with a timestamp. 2. `run_tool(tool_name)` should call `log_action`.',
                        initialCode: `import datetime

class SecureAgent:
    def __init__(self):
        self.logs = []

    def log_action(self, action):
        # TODO: Append {"time": str(datetime.datetime.now()), "action": action} to self.logs
        pass

    def run_tool(self, tool_name):
        # TODO: Log "Ran tool: " + tool_name
        # TODO: Return "Tool Executed"
        pass

agent = SecureAgent()
agent.run_tool("BigQuery")
print(agent.logs)`,
                        hints: [
                            { text: 'Use `datetime.datetime.now()` for timestamp.', relearnLessonId: 'day-5-7' },
                            { text: 'Simply append the dict to the list.', relearnLessonId: 'day-5-7' }
                        ],
                        solutionCode: `import datetime

class SecureAgent:
    def __init__(self):
        self.logs = []

    def log_action(self, action):
        entry = {"time": str(datetime.datetime.now()), "action": action}
        self.logs.append(entry)

    def run_tool(self, tool_name):
        self.log_action(f"Ran tool: {tool_name}")
        return "Tool Executed"`,
                        expectedOutput: 'Ran tool: BigQuery',
                        validationType: 'contains'
                    }
                },
                {
                    type: ContentType.MARKDOWN,
                    markdown: `# Hands-on Project: The Fortress
Build an "Enterprise Data Analyst" agent that adheres to strict security.

**Requirements**:
1.  **Auth**: Simulates logging in with an API Key.
2.  **Permissions**: Can only access "Sales" data, not "HR" data.
3.  **Logging**: Logs every query to an audit log.
4.  **PII**: Redacts names from the output.

**Architecture**:
User -> Auth Check -> Permission Check -> Query -> Redaction -> Output
`
                },
                {
                    type: ContentType.CODE_PLAYGROUND,
                    codeProject: {
                        id: 'capstone-week-6',
                        language: 'python',
                        description: 'Capstone: Implement `EnterpriseAgent.query_data(dataset)`. Check `self.api_key`. Check `dataset` is "Sales". Log the access. Return "Data for [DATASET]".',
                        initialCode: `class EnterpriseAgent:
    def __init__(self, key):
        self.api_key = key
        self.logs = []

    def query_data(self, dataset):
        # 1. Auth Check (key must be "secret123")
        # 2. Perm Check (dataset must be "Sales")
        # 3. Log it
        # 4. Return Data
        pass

agent = EnterpriseAgent("secret123")
print(agent.query_data("Sales"))
print(agent.query_data("HR"))
print(EnterpriseAgent("wrong").query_data("Sales"))`,
                        hints: [
                            { text: '`if self.api_key != "secret123": return "Auth Failed"`', relearnLessonId: 'day-5-7' },
                            { text: '`if dataset != "Sales": return "Access Denied"`', relearnLessonId: 'day-5-7' }
                        ],
                        solutionCode: `class EnterpriseAgent:
    def __init__(self, key):
        self.api_key = key
        self.logs = []

    def query_data(self, dataset):
        if self.api_key != "secret123":
            self.logs.append("Auth Failure")
            return "Auth Failed"
        
        if dataset != "Sales":
            self.logs.append(f"Access Denied: {dataset}")
            return "Access Denied"
            
        self.logs.append(f"Access Granted: {dataset}")
        return f"Data for {dataset}"`,
                        expectedOutput: 'Data for Sales\nAccess Denied\nAuth Failed',
                        validationType: 'contains'
                    }
                }
            ]
        }
    ]
};

export default phase3Week6;
