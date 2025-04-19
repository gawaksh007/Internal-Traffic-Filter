// Simple static list of property IDs or domains to block
const BLOCKED_URL = "https://www.google-analytics.com/g/collect";

// On install, set default “block” off
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ blockEnabled: false });
});

// Always ensure the rule matches the current toggle state
async function updateRule(enabled) {
  if (enabled) {
    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [{
        id: 1,
        priority: 1,
        action: { type: "block" },
        condition: { urlFilter: BLOCKED_URL, resourceTypes: ["xmlhttprequest"] }
      }],
      removeRuleIds: []
    });
  } else {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1]
    });
  }
}

// Listen for toggle changes from popup
chrome.storage.sync.onChanged.addListener(({ blockEnabled }) => {
  updateRule(blockEnabled.newValue);
});

// Initialize rule on startup
chrome.storage.sync.get("blockEnabled", ({ blockEnabled }) => {
  updateRule(blockEnabled);
});