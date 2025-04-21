┌──────────────┐       manifest.json (MV3)
│ Browser UI   │  ←──  service_worker.js
└─────┬────────┘            │
      │ declarative rules   ▼
┌─────▼────────┐  chrome.declarativeNetRequest  ┌─────────────┐
│ Network Req  │───────────────────────────────▶│ Analytics   │
│ Interceptor  │   (block/redirect/modify)      │ Endpoints   │
└──────────────┘                                  (GA4 etc.)
