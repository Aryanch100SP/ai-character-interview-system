from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    character_name: str
    backstory: str
    personality_traits: str
    message: str

@app.get("/")
def read_root():
    return {"status": "Gemini AI Engine is online and ready for prompts."}

@app.post("/api/chat")
async def chat_with_character(payload: ChatRequest):
    try:
        API_KEY = os.getenv("GEMINI_API_KEY")
        if not API_KEY:
            print("CRITICAL API ERROR: GEMINI_API_KEY environment variable is missing!")
            raise HTTPException(status_code=500, detail="API Key missing on server")

        client = genai.Client(api_key=API_KEY)

        system_instruction = (
            f"You are {payload.character_name}. "
            f"Your backstory is: {payload.backstory}. "
            f"Your personality traits are: {payload.personality_traits}. "
            "Never break character. Respond directly to the user as this character."
        )

        config = types.GenerateContentConfig(system_instruction=system_instruction)

        # FAULT-TOLERANT FALLBACK LOOP
        try:
            # Attempt 1: The standard modern model
            print("Trying gemini-1.5-flash...")
            response = client.models.generate_content(
                model='gemini-1.5-flash', 
                contents=payload.message,
                config=config
            )
        except Exception as e:
            print(f"1.5-flash failed ({e}). Falling back to universal model...")
            # Attempt 2: The universal legacy model (Always available)
            response = client.models.generate_content(
                model='gemini-1.0-pro', 
                contents=payload.message,
                config=config
            )
        
        return {"response": response.text}

    except Exception as e:
        print(f"CRITICAL API ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate AI response.")