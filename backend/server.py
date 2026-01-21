"""
Server backend for the Learn ADK application.

This module provides a FastAPI server that handles code execution requests
and serves the React frontend.
"""

import contextlib
import io
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# --- Mock ADK Framework Setup has been removed to use real ADK ---
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
    """Payload model for code execution requests."""

    code: str


@app.post("/execute")
def execute_code(payload: CodePayload):
    """Execute the provided Python code and capture output."""
    # Capture stdout and stderr
    stdout_capture = io.StringIO()
    stderr_capture = io.StringIO()

    try:
        with contextlib.redirect_stdout(stdout_capture), contextlib.redirect_stderr(
            stderr_capture
        ):
            # WARNING: exec() is dangerous in production.
            # For a local learning tool, this is acceptable.
            exec(payload.code, {"__name__": "__main__"})  # pylint: disable=exec-used

        output = stdout_capture.getvalue()
        errors = stderr_capture.getvalue()

        return {
            "output": (
                output + errors
                if output or errors
                else ">> Code executed successfully (No output)."
            )
        }

    except Exception as e:  # pylint: disable=broad-except
        return {"output": f">> Error: {str(e)}"}


# Serve React App (Production only)
# This mounts the 'dist' folder (built by Vite) to the root URL
dist_path = os.path.join(os.path.dirname(__file__), "../dist")
if os.path.exists(dist_path):
    app.mount("/", StaticFiles(directory=dist_path, html=True), name="static")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
