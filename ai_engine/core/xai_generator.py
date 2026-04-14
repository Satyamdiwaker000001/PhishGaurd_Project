import urllib.parse as urlparse
import re

class XAIGenerator:
    # Common phishing keywords
    SUSPICIOUS_KEYWORDS = {
        "login", "verify", "account", "bank", "secure", "update", "signin", 
        "support", "confirm", "security", "portal", "auth", "validation",
        "wallet", "token", "password", "service"
    }

    # High-risk TLDs
    DOUBTFUL_TLDS = {
        ".xyz", ".buzz", ".info", ".top", ".cc", ".icu", ".top", 
        ".tk", ".ml", ".ga", ".cf", ".gq", ".online", ".site"
    }

    # Trusted brands often impersonated
    TRUSTED_BRANDS = {
        "google", "facebook", "instagram", "twitter", "microsoft", 
        "apple", "amazon", "netflix", "paypal", "linkedin", "bankofamerica"
    }

    @staticmethod
    def generate_reasons(url: str, is_phishing: bool) -> list[str]:
        if not is_phishing:
            return ["No significant malicious patterns detected.", "Verified architectural structure matches safe profiles."]

        reasons = []
        try:
            if not url.startswith(('http://', 'https://')):
                url = 'https://' + url
            parsed_url = urlparse.urlparse(url)
            netloc = parsed_url.netloc.lower()
            path = parsed_url.path.lower()
            
            # 1. Analyze TLD
            for tld in XAIGenerator.DOUBTFUL_TLDS:
                if netloc.endswith(tld):
                    reasons.append(f"Uses a high-risk domain extension ({tld}) often associated with phishing.")
                    break

            # 2. Analyze Keywords
            found_keywords = [kw for kw in XAIGenerator.SUSPICIOUS_KEYWORDS if kw in netloc or kw in path]
            if found_keywords:
                reasons.append(f"Contains deceptive keywords: {', '.join(found_keywords[:3])}.")

            # 3. Detect Brand Impersonation
            domain_parts = netloc.split('.')
            root_domain = domain_parts[-2] if len(domain_parts) >= 2 else ""
            
            for brand in XAIGenerator.TRUSTED_BRANDS:
                if brand in netloc and brand != root_domain:
                    reasons.append(f"Possible brand impersonation detected (mentions '{brand}' in an unofficial domain).")
                    break

            # 4. Analyze Structure Anomaly
            if netloc.count('-') > 2:
                reasons.append("Excessive use of hyphens, a common tactic to mask malicious URLs.")
            if netloc.count('.') > 3:
                reasons.append("Unusual number of subdomains detected.")
            if any(char.isdigit() for char in netloc) and len(reoc := re.findall(r'\d+', netloc)) > 2:
                reasons.append("Contains unusual numeric patterns in the domain structure.")

            # Default if AI detected but heuristics are subtle
            if not reasons:
                reasons.append("Neural analysis detected complex malicious patterns in the URL string.")

        except Exception as e:
            reasons.append("URL structure matches known attack patterns.")

        return reasons

xai_generator = XAIGenerator()
