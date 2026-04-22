from fastapi import APIRouter, UploadFile, File, HTTPException
from labs.vision_lab import vision_lab

router = APIRouter()

@router.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Only images are accepted.")
    
    try:
        contents = await file.read()
        result = vision_lab.analyze_image(contents)
        return result
    except Exception as e:
        print(f"Vision API Error: {e}")
        raise HTTPException(status_code=500, detail="Error processing image analysis")
