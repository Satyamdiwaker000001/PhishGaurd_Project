from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from labs.nlp_context_lab import nlp_lab

router = APIRouter()

class SMSPayload(BaseModel):
    message: str

@router.post("/analyze")
async def analyze_sms(payload: SMSPayload):
    if not payload.message:
        raise HTTPException(status_code=400, detail="Message content is required.")
    
    try:
        result = nlp_lab.analyze_text(payload.message)
        return result
    except Exception as e:
        print(f"NLP API Error: {e}")
        raise HTTPException(status_code=500, detail="Error processing text analysis")
