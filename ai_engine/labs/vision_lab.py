import easyocr
import io

class VisionLab:
    def __init__(self, languages=['en']):
        # Initialize reader (this will download models on first run)
        # Set verbose=False to avoid Unicode errors with progress bars in some terminals
        self.reader = easyocr.Reader(languages, gpu=False, verbose=False)
        self.suspicious_keywords = [
            "login", "signin", "verify", "account", "security", 
            "password", "update", "bank", "confirm", "portal",
            "auth", "validation", "wallet", "token"
        ]

    def analyze_image(self, image_bytes):
        try:
            # Performs OCR on the image
            results = self.reader.readtext(image_bytes)
            
            # Extract all text
            extracted_text = " ".join([res[1] for res in results]).lower()
            
            # Check for suspicious keywords
            detected_keywords = [kw for kw in self.suspicious_keywords if kw in extracted_text]
            
            is_phishing = len(detected_keywords) >= 2
            confidence = len(detected_keywords) / 5.0 # Simple heuristic
            confidence = min(confidence, 0.95) if is_phishing else 1.0 - confidence
            
            reasons = []
            if detected_keywords:
                reasons.append(f"Suspicious keywords detected in image: {', '.join(detected_keywords[:3])}")
            if is_phishing:
                reasons.append("Visual layout contains multiple phishing indicators.")
            else:
                reasons.append("No significant phishing text patterns detected in image.")

            return {
                "is_phishing": is_phishing,
                "confidence": round(confidence, 4),
                "threat_level": "High" if is_phishing and confidence > 0.7 else ("Medium" if is_phishing else "Low"),
                "extracted_text": extracted_text,
                "reasons": reasons
            }
        except Exception as e:
            print(f"Vision analysis error: {e}")
            return {
                "is_phishing": False,
                "confidence": 0.0,
                "threat_level": "Unknown",
                "extracted_text": "",
                "reasons": ["Vision analysis failed to process input."]
            }

vision_lab = VisionLab()
