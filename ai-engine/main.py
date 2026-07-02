from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types
import os

app = FastAPI()

# Allow the frontend to talk to this Python server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Securely grab the API key from Render's environment variables
API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=API_KEY)

# Define the exact data structure we expect to receive from the Node.js/React frontend
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
        # Construct the system instruction using the character's database profile
        system_instruction = (
            f"You are {payload.character_name}. "
            f"Your backstory is: {payload.backstory}. "
            f"Your personality traits are: {payload.personality_traits}. "
            "Never break character. Respond directly to the user as this character."
        )

        # Generate response using the new google-genai SDK format
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=payload.message,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
            )
        )
        
        return {"response": response.text}

    except Exception as e:
        print(f"Server Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate AI response.")