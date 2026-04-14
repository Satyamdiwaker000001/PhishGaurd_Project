from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import numpy as np
import urllib.parse as urlparse
from core.xai_generator import xai_generator
from core.model_loader import model_loader

router = APIRouter()

# High-trust global domains to prevent false positives
TRUSTED_DOMAINS = {
    "google.com", "google.co.in", "youtube.com", "gmail.com",
    "microsoft.com", "apple.com", "github.com", "linkedin.com",
    "amazon.com", "facebook.com", "instagram.com", "twitter.com",
    "netflix.com", "openai.com", "stackoverflow.com"
}

class URLPayload(BaseModel):
    url: str

class AnalysisResult(BaseModel):
    url: str
    is_phishing: bool
    confidence: float
    threat_level: str
    is_whitelisted: bool = False
    reasons: list[str] = []

def get_root_domain(url: str):
    try:
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
        parsed_url = urlparse.urlparse(url)
        domain = parsed_url.netloc.lower()
        if domain.startswith('www.'):
            domain = domain[4:]
        return domain
    except:
        return ""

def preprocess_url(url: str, char_index: dict, max_len: int = 150):
    # character-level tokenization matching the training logic
    sequence = [char_index.get(char, char_index.get('<OOV>', 0)) for char in url]
    
    # Padding/Truncating
    if len(sequence) > max_len:
        sequence = sequence[:max_len]
    else:
        sequence = sequence + [0] * (max_len - len(sequence))
    
    return np.array([sequence])

@router.post("/analyze", response_model=AnalysisResult)
async def analyze_url(payload: URLPayload):
    # 1. Check Static Whitelist
    root_domain = get_root_domain(payload.url)
    if root_domain in TRUSTED_DOMAINS:
        return AnalysisResult(
            url=payload.url,
            is_phishing=False,
            confidence=1.0,
            threat_level="Low",
            is_whitelisted=True,
            reasons=["This is a globally trusted domain."]
        )

    # 2. Proceed with Model Inference
    model = model_loader.get_url_model()
    char_index = model_loader.get_char_index()
    
    if model is None:
        raise HTTPException(status_code=500, detail="URL Analysis model not loaded")

    processed_url = preprocess_url(payload.url, char_index)
    
    # Model Inference
    prediction = model.predict(processed_url)[0][0]
    is_phishing = bool(prediction > 0.5)
    confidence = float(prediction if is_phishing else 1 - prediction)
    
    # Determine threat level
    if is_phishing:
        threat_level = "High" if confidence > 0.8 else "Medium"
    else:
        threat_level = "Low"

    # 3. Generate XAI Reasons
    reasons = xai_generator.generate_reasons(payload.url, is_phishing)

    return AnalysisResult(
        url=payload.url,
        is_phishing=is_phishing,
        confidence=round(confidence, 4),
        threat_level=threat_level,
        is_whitelisted=False,
        reasons=reasons
    )
