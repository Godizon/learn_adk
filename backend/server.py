from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sys
import io
import contextlib
import os
from types import ModuleType

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
async def execute_code(payload: CodePayload):
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