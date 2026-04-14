import pytest
from httpx import AsyncClient, ASGITransport
from main import app
from unittest.mock import patch, MagicMock

@pytest.mark.asyncio
async def test_root_endpoint():
    # Corrected AsyncClient initialization for modern httpx
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json()["service"] == "PhishGuard AI Engine"

@pytest.mark.asyncio
@patch("api.url_router.model_loader")
async def test_analyze_url_whitelisted(mock_loader):
    # Tests a high-trust domain that should bypass ML model
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/v1/url/analyze", json={"url": "google.com"})
    
    assert response.status_code == 200
    data = response.json()
    assert data["is_phishing"] == False
    assert data["is_whitelisted"] == True
    assert data["threat_level"] == "Low"

@pytest.mark.asyncio
@patch("api.url_router.model_loader")
async def test_analyze_url_malicious_mock(mock_loader):
    # Mock model to return a high phishing probability
    mock_model = MagicMock()
    mock_model.predict.return_value = [[0.95]] # 95% phishing
    mock_loader.get_url_model.return_value = mock_model
    mock_loader.get_char_index.return_value = {'<OOV>': 0}

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/v1/url/analyze", json={"url": "http://evil-malicious-site.com"})
    
    assert response.status_code == 200
    data = response.json()
    assert data["is_phishing"] == True
    assert data["confidence"] > 0.8
    assert data["threat_level"] == "High"

@pytest.mark.asyncio
@patch("api.url_router.model_loader")
async def test_analyze_url_safe_mock(mock_loader):
    # Mock model to return a low phishing probability
    mock_model = MagicMock()
    mock_model.predict.return_value = [[0.05]] # 5% phishing
    mock_loader.get_url_model.return_value = mock_model
    mock_loader.get_char_index.get.return_value = 0 # Dummy OOV
    
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/v1/url/analyze", json={"url": "http://safe-site.com"})
    
    assert response.status_code == 200
    data = response.json()
    assert data["is_phishing"] == False
    assert data["threat_level"] == "Low"
