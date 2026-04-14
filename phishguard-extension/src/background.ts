// PhishGuard Shield - Background Service Worker
const BACKEND_URL = 'http://localhost:3000/analysis/url';

// Simple in-memory cache for the session
const scanCache = new Map<string, { is_phishing: boolean, confidence: number, reasons?: string[] }>();

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  // Only scan top-level frame navigations
  if (details.frameId !== 0) return;

  const url = details.url;
  if (!url || url.startsWith('chrome://') || url.startsWith('about:') || url.startsWith('chrome-extension://')) return;

  // Check cache first
  if (scanCache.has(url)) {
    const cached = scanCache.get(url)!;
    if (cached.is_phishing) {
      handlePhishingDetected(details.tabId, url, cached.confidence, cached.reasons || []);
    }
    return;
  }

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    if (response.ok) {
      const result = await response.json();
      
      // Update cache
      scanCache.set(url, { is_phishing: result.is_phishing, confidence: result.confidence, reasons: result.reasons });

      if (result.is_phishing) {
        handlePhishingDetected(details.tabId, url, result.confidence, result.reasons || []);
      }
    }
  } catch (error) {
    console.error('[PhishGuard] Background Analysis Error:', error);
  }
});

function handlePhishingDetected(tabId: number, url: string, confidence: number, reasons: string[]) {
  console.warn(`[PhishGuard] PHISHING DETECTED: ${url} (${Math.round(confidence * 100)}% confidence)`);
  
  const reasonsParam = encodeURIComponent(reasons.join('|'));
  const warningUrl = chrome.runtime.getURL(`warning.html?url=${encodeURIComponent(url)}&confidence=${confidence}&reasons=${reasonsParam}`);
  chrome.tabs.update(tabId, { url: warningUrl });

  // Optional: Send a desktop notification
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: 'Phishing Threat Blocked!',
    message: `PhishGuard has blocked a malicious site: ${new URL(url).hostname}`,
    priority: 2
  });
}
