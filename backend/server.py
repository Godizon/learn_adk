from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sys
import io
import contextlib
import os
from types import ModuleType

# --- Real AI Integration (Optional) ---
try:
    import vertexai
    from vertexai.generative_models import GenerativeModel
    HAS_VERTEX = True
except ImportError:
    HAS_VERTEX = False

# --- Mock ADK Framework Setup (for Learning Environment) ---
# This allows "from adk.core import Agent" to work in the exec() scope
# without needing a real package installed.

adk_mod = ModuleType("adk")
sys.modules["adk"] = adk_mod

adk_core = ModuleType("adk.core")
class MockAgent:
    def __init__(self, name="Agent", tools=None):
        self.name = name
        self.tools = tools or []
        self.history = []
        self.system_instruction = None

    def chat(self, message):
        self.history.append({"role": "user", "content": message})
        
        if HAS_VERTEX:
            try:
                # Attempt to use real credentials if available
                try:
                    vertexai.init()
                except Exception:
                    pass # Assume configured or let it fail gracefully

                model = GenerativeModel("gemini-1.5-pro")
                
                # Build context
                context = ""
                if self.system_instruction:
                    context += f"System: {self.system_instruction}\n"
                for msg in self.history:
                    context += f"{msg['role']}: {msg['content']}\n"
                
                response = model.generate_content(context)
                reply = response.text
                self.history.append({"role": "model", "content": reply})
                return reply
            except Exception as e:
                # Fallback if auth fails or API error
                print(f"Warning: Real AI call failed ({e}). Using mock.")
        
        # Mock behavior
        reply = f"[{self.name}] Mock Response: {message}"
        self.history.append({"role": "model", "content": reply})
        return reply

adk_core.Agent = MockAgent
sys.modules["adk.core"] = adk_core

adk_tools = ModuleType("adk.tools")
def mock_tool(func):
    return func
adk_tools.tool = mock_tool
sys.modules["adk.tools"] = adk_tools
# -----------------------------------------------------------

app = FastAPI()

# Allow React app to make requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodePayload(BaseModel):
    code: str

@app.post("/execute")
def execute_code(payload: CodePayload):
    # Capture stdout and stderr
    stdout_capture = io.StringIO()
    stderr_capture = io.StringIO()

    try:
        with contextlib.redirect_stdout(stdout_capture), contextlib.redirect_stderr(stderr_capture):
            # WARNING: exec() is dangerous in production. 
            # For a local learning tool, this is acceptable.
            exec(payload.code, {})
        
        output = stdout_capture.getvalue()
        errors = stderr_capture.getvalue()
        
        return {"output": output + errors if output or errors else ">> Code executed successfully (No output)."}
        
    except Exception as e:
        return {"output": f">> Error: {str(e)}"}

# Serve React App (Production only)
# This mounts the 'dist' folder (built by Vite) to the root URL
dist_path = os.path.join(os.path.dirname(__file__), "../dist")
if os.path.exists(dist_path):
    app.mount("/", StaticFiles(directory=dist_path, html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)