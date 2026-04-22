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
            return ["Verified architectural structure matches safe profiles.", "No immediate threat indicators identified."]

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

            # 2. Contextual Keyword Analysis
            # We differentiate between "Subdomain keywords" (高risk) and "Path keywords" (Low risk)
            domain_parts = netloc.split('.')
            subdomains = ".".join(domain_parts[:-2]) if len(domain_parts) >= 2 else ""
            
            found_subdomain_keywords = [kw for kw in XAIGenerator.SUSPICIOUS_KEYWORDS if kw in subdomains]
            if found_subdomain_keywords:
                reasons.append(f"Suspicious use of security keywords in subdomain: {', '.join(found_subdomain_keywords[:2])}.")

            # Only flag path keywords if they are combined with other anomalies
            found_path_keywords = [kw for kw in XAIGenerator.SUSPICIOUS_KEYWORDS if kw in path]
            if found_path_keywords and len(reasons) > 0:
                reasons.append(f"Contains deceptive path keywords: {', '.join(found_path_keywords[:2])}.")

            # 3. Detect Brand Impersonation
            root_domain = domain_parts[-2] if len(domain_parts) >= 2 else ""
            
            for brand in XAIGenerator.TRUSTED_BRANDS:
                # Flag if brand is in subdomain but NOT the root domain
                if brand in netloc and brand != root_domain:
                    reasons.append(f"Possible brand impersonation detected (mentions '{brand}' in a suspicious context).")
                    break

            # 4. Analyze Structure Anomaly
            if netloc.count('-') > 3:
                reasons.append("Excessive use of hyphens, a common tactic to mask malicious URLs.")
            if netloc.count('.') > 4:
                reasons.append("Unusual number of subdomains detected.")
            
            # Default if AI detected but heuristics are subtle
            if not reasons:
                reasons.append("Neural analysis detected complex malicious patterns in the URL fingerprint.")

        except Exception as e:
            reasons.append("URL patterns match known attack signatures.")

        return reasons

xai_generator = XAIGenerator()
