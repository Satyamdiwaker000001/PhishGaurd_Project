from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import url_router, sms_router, vision_router, malware_router

app = FastAPI(
    title="PhishGuard AI Engine",
    description="Backend AI logic for phishing detection across multiple vectors",
    version="1.0.0"
)

# CORS Middleware for cross-service communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the NestJS backend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(url_router.router, prefix="/api/v1/url", tags=["URL Analysis"])
app.include_router(sms_router.router, prefix="/api/v1/sms", tags=["SMS/Email Analysis"])
app.include_router(vision_router.router, prefix="/api/v1/vision", tags=["OCR/Vision Analysis"])
app.include_router(malware_router.router, prefix="/api/v1/malware", tags=["APK Analysis"])

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "PhishGuard AI Engine",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
