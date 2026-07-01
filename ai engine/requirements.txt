from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Allow the frontend to talk to this Python server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # We will lock this down to your Vercel URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "AI Engine is online and ready for prompts."}

# The endpoint we will use to generate character responses
@app.post("/api/chat")
async def chat_with_character(payload: dict):
    # We will connect the LLM API here!
    return {"response": f"[System: Received message for character. LLM integration pending.]"}