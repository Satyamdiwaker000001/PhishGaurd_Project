import re

class NLPContextLab:
    def __init__(self):
        # Patterns for common phishing tactics
        self.urgency_patterns = [
            r"immediately", r"urgent", r"action required", r"suspicious activity",
            r"suspended", r"locked", r"restricted", r"compromised", r"unauthorized"
        ]
        self.threat_patterns = [
            r"legal action", r"law enforcement", r"police", r"account closure",
            r"termination", r"block", r"penalty"
        ]
        self.sensitive_keywords = [
            "password", "ssn", "social security", "credit card", "bank account",
            "otp", "verification code", "pin", "cvv", "identity"
        ]
        self.call_to_action = [
            r"click here", r"visit link", r"link below", r"secure login", r"verify now"
        ]

    def analyze_text(self, text):
        text = text.lower()
        
        score = 0
        reasons = []

        # 1. Check for Urgency
        urgency_matches = [p for p in self.urgency_patterns if re.search(p, text)]
        if urgency_matches:
            score += 0.3
            reasons.append(f"High-urgency language detected: {', '.join(urgency_matches[:2])}.")

        # 2. Check for Threats
        threat_matches = [p for p in self.threat_patterns if re.search(p, text)]
        if threat_matches:
            score += 0.4
            reasons.append("Threatening or coercive language detected.")

        # 3. Check for Sensitive Data requests
        sensitive_matches = [kw for kw in self.sensitive_keywords if kw in text]
        if sensitive_matches:
            score += 0.4
            reasons.append(f"Request for sensitive information detected ({', '.join(sensitive_matches[:2])}).")

        # 4. Check for suspicious Call to Actions
        cta_matches = [p for p in self.call_to_action if re.search(p, text)]
        if cta_matches:
            score += 0.3
            reasons.append("Suspicious call-to-action detected.")

        # 5. Check for unusual URL patterns in text
        if re.search(r"http[s]?://", text):
            score += 0.2
            reasons.append("Contains embedded external links.")

        # Cap score and determine phishing status
        score = min(score, 1.0)
        is_phishing = score >= 0.5
        
        if not reasons:
            reasons.append("No common phishing language patterns detected.")

        return {
            "is_phishing": is_phishing,
            "confidence": round(score, 4),
            "threat_level": "High" if score > 0.7 else ("Medium" if is_phishing else "Low"),
            "reasons": reasons
        }

nlp_lab = NLPContextLab()
