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
    return {"status": "Gemini AI Engine is online (REST API Mode)."}

@app.post("/api/chat")
async def chat_with_character(payload: ChatRequest):
    API_KEY = os.getenv("GEMINI_API_KEY")
    if not API_KEY:
        print("CRITICAL API ERROR: GEMINI_API_KEY is missing!")
        raise HTTPException(status_code=500, detail="API Key missing on server")

    # The exact, verified Google REST API URL for the modern Flash model
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}"

    system_instruction = (
        f"You are {payload.character_name}. "
        f"Your backstory is: {payload.backstory}. "
        f"Your personality traits are: {payload.personality_traits}. "
        "Never break character. Respond directly to the user as this character."
    )

    data = {
        "system_instruction": {
            "parts": [{"text": system_instruction}]
        },
        "contents": [
            {"role": "user", "parts": [{"text": payload.message}]}
        ]
    }

    headers = {'Content-Type': 'application/json'}

    try:
        response = requests.post(url, json=data, headers=headers)
        response_json = response.json()

        if response.status_code != 200:
            print(f"GOOGLE API REJECTED REQUEST: {response_json}")
            raise HTTPException(status_code=500, detail="Google API rejected the request")

        ai_text = response_json['candidates'][0]['content']['parts'][0]['text']
        return {"response": ai_text}

    except Exception as e:
        print(f"CRITICAL ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to parse AI response")