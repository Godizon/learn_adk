from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sys
import io
import contextlib

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