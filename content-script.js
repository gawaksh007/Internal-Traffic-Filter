// If blocking is on, tag any GA4 event in the dataLayer
chrome.storage.sync.get("blockEnabled", ({ blockEnabled }) => {
  if (blockEnabled) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "internal_blocked" });
    // Optionally override gtag
    window.gtag = function() {};
  }
});