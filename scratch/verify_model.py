import requests
import json

urls = [
    "http://google.com",
    "http://instagram-login-verify.xyz",
    "http://bankofamerica-secure-login.buzz",
    "http://mypersonalblog.com/about"
]

backend_url = "http://localhost:3000/analysis/url"

for url in urls:
    try:
        response = requests.post(backend_url, json={"url": url})
        print(f"URL: {url}")
        print(f"Result: {json.dumps(response.json(), indent=2)}")
        print("-" * 30)
    except Exception as e:
        print(f"Error testing {url}: {e}")
