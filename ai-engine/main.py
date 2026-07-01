from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
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

# Configure the Gemini API securely using the environment variable from Render
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

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
        if not GEMINI_API_KEY:
            raise HTTPException(status_code=500, detail="Gemini API Key is missing on the server.")

        # Construct the system instruction using the character's database profile
        system_instruction = (
            f"You are {payload.character_name}. "
            f"Your backstory is: {payload.backstory}. "
            f"Your personality traits are: {payload.personality_traits}. "
            "Never break character. Respond directly to the user as this character."
        )

        # Initialize the lightning-fast Gemini 1.5 Flash model with the character persona
        # Initialize the updated Gemini 1.5 Flash model
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=system_instruction
        )

        # Send the user's message to the model and get the response
        response = model.generate_content(payload.message)
        
        return {"response": response.text}

    except Exception as e:
        print(f"Server Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate AI response.")