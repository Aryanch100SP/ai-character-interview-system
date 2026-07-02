import os
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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
    return {"status": "Groq AI Engine is online."}

@app.post("/api/chat")
async def chat_with_character(payload: ChatRequest):
    # Pull the new Groq key from Render
    API_KEY = os.getenv("GROQ_API_KEY")
    if not API_KEY:
        print("CRITICAL API ERROR: GROQ_API_KEY is missing!")
        raise HTTPException(status_code=500, detail="Groq API Key missing on server")

    # Groq's official API endpoint
    url = "https://api.groq.com/openai/v1/chat/completions"

    system_instruction = (
        f"You are {payload.character_name}. "
        f"Your backstory is: {payload.backstory}. "
        f"Your personality traits are: {payload.personality_traits}. "
        "Never break character. Respond directly to the user as this character."
    )

    # Groq uses the industry-standard OpenAI payload format
    # Groq uses the industry-standard OpenAI payload format
    data = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": payload.message}
        ]
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(url, json=data, headers=headers)
        response_json = response.json()

        if response.status_code != 200:
            print(f"GROQ API REJECTED REQUEST: {response_json}")
            raise HTTPException(status_code=500, detail="Groq API rejected the request")

        # Extract Llama 3's response
        ai_text = response_json['choices'][0]['message']['content']
        return {"response": ai_text}

    except Exception as e:
        print(f"CRITICAL ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to parse AI response")