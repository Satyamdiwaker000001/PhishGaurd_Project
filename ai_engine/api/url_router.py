from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import numpy as np
import urllib.parse as urlparse
from core.xai_generator import xai_generator
from core.model_loader import model_loader

router = APIRouter()

# High-trust global domains to prevent false positives
TRUSTED_DOMAINS = {
    "google.com", "google.co.in", "youtube.com", "gmail.com", "google.co.uk",
    "microsoft.com", "apple.com", "github.com", "linkedin.com", "outlook.com",
    "amazon.com", "facebook.com", "instagram.com", "twitter.com", "x.com",
    "netflix.com", "openai.com", "stackoverflow.com", "bitbucket.org",
    "microsoftonline.com", "live.com", "bing.com", "icloud.com", "dropbox.com",
    "stripe.com", "paypal.com", "cloudflare.com", "digitalocean.com", "heroku.com",
    "aws.amazon.com", "azure.microsoft.com", "bit.ly", "t.co", "instagr.am",
    "reddit.com", "wikipedia.org", "medium.com", "discord.com", "zoom.us",
    "spotify.com", "adobe.com", "salesforce.com", "slack.com", "trello.com"
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
        # Standardize URL
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
        parsed_url = urlparse.urlparse(url)
        netloc = parsed_url.netloc.lower()
        
        # Remove port
        if ':' in netloc:
            netloc = netloc.split(':')[0]
            
        # Handle IP addresses (don't treat as domains)
        if all(c.isdigit() or c == '.' for c in netloc):
            return netloc

        parts = netloc.split('.')
        if len(parts) >= 3:
            # Check for common multi-part TLDs (e.g. .co.uk, .gov.in)
            if parts[-2] in ["co", "gov", "org", "edu", "com", "net", "res"]:
                 return ".".join(parts[-3:])
            return ".".join(parts[-2:])
        return netloc
    except:
        return ""

@router.post("/analyze", response_model=AnalysisResult)
async def analyze_url(payload: URLPayload):
    # 1. Reputation Check (Whitelist)
    root_domain = get_root_domain(payload.url)
    
    # Check if the root domain or any parent domain is whitelisted
    for trusted in TRUSTED_DOMAINS:
        if root_domain == trusted or root_domain.endswith("." + trusted):
            return AnalysisResult(
                url=payload.url,
                is_phishing=False,
                confidence=1.0,
                threat_level="Low",
                is_whitelisted=True,
                reasons=["Verified reputable domain (Reputation Bypass active)."]
            )

    # 2. Proceed with Model Inference
    model = model_loader.get_url_model()
    
    if model is None:
        raise HTTPException(status_code=500, detail="URL Analysis model not loaded")

    try:
        prediction_probs = model.predict_proba([payload.url])[0]
        # Only mark as phishing if confidence is high (> 0.8)
        # This prevents "uncertain" blocks that lead to false positives
        model_prediction = int(model.predict([payload.url])[0])
        confidence = float(prediction_probs[1] if model_prediction == 1 else prediction_probs[0])
        
        # Security Guard: Require High Confidence OR specific heuristic match to block
        is_phishing = bool(model_prediction == 1 and confidence > 0.8)
    except Exception as e:
        print(f"Inference error: {e}")
        raise HTTPException(status_code=500, detail="Error during model inference")

    # Determine threat level
    if is_phishing:
        threat_level = "High" if confidence > 0.9 else "Medium"
    else:
        # If model flagged it but confidence was low, we mark as Low threat but maybe suggest caution
        threat_level = "Low"

    # 3. Generate XAI Reasons with contextual sensitivity
    reasons = xai_generator.generate_reasons(payload.url, is_phishing)

    return AnalysisResult(
        url=payload.url,
        is_phishing=is_phishing,
        confidence=round(confidence, 4),
        threat_level=threat_level,
        is_whitelisted=False,
        reasons=reasons
    )
