/**
 * My Chrome Handbook - Background Service Worker (v1.0)
 * Handles cross-context operations like tab management and complex state sync.
 */

const activeMacroTabs = {};
const injectedTabs = new Set(); // To prevent double injection

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'CLOSE_TAB') {
    if (sender.tab) {
      chrome.tabs.remove(sender.tab.id);
      delete activeMacroTabs[sender.tab.id];
      injectedTabs.delete(sender.tab.id);
    }
    sendResponse({ success: true });
  } else if (message.action === 'REGISTER_MACRO_TAB') {
    if (sender.tab) {
      activeMacroTabs[sender.tab.id] = { mode: message.mode, executionId: message.executionId };
    }
    sendResponse({ success: true });
  } else if (message.action === 'CHECK_MACRO_TAB') {
    if (sender.tab && activeMacroTabs[sender.tab.id]) {
      sendResponse(activeMacroTabs[sender.tab.id]);
    } else {
      sendResponse({ isActive: false });
    }
  } else if (message.action === 'UNREGISTER_MACRO_TAB') {
    if (sender.tab) {
      delete activeMacroTabs[sender.tab.id];
    }
    sendResponse({ success: true });
  }
  return true; // Enable async response
});

// Clean up when tabs are closed
chrome.tabs.onRemoved.addListener((tabId) => {
  if (activeMacroTabs[tabId]) {
    const executionId = activeMacroTabs[tabId].executionId;
    if (executionId) {
      chrome.storage.local.remove(`macroTask_${executionId}`);
    }
    delete activeMacroTabs[tabId];
  }
  injectedTabs.delete(tabId);
});

// Watch for navigations and inject script if it's a macro tab
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' || changeInfo.url) {
    let mode = null;
    let executionId = null;

    if (tab.url) {
      const activeMatch = tab.url.match(/#macro-active(?:-(\d+))?/);
      const recordMatch = tab.url.match(/#macro-record/);
      if (activeMatch) {
        mode = 'active';
        executionId = activeMatch[1] || null;
        activeMacroTabs[tabId] = { mode, executionId };
      } else if (recordMatch) {
        mode = 'record';
        activeMacroTabs[tabId] = { mode, executionId: null };
      }
    }

    if (activeMacroTabs[tabId]) {
      // Use chrome.scripting.executeScript to dynamically inject
      chrome.scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        files: ['js/ai-repair.js', 'content_script.js'],
        injectImmediately: true
      }).catch(err => {
        console.debug("[Background] Injection skipped or failed:", err.message);
      });
    }
  }
});

// Garbage Collector: Clean up orphaned macroTask_ keys on startup
chrome.runtime.onStartup.addListener(runGarbageCollector);
chrome.runtime.onInstalled.addListener(runGarbageCollector);

function runGarbageCollector() {
  chrome.storage.local.get(null, (items) => {
    const keysToRemove = Object.keys(items).filter(key => key.startsWith('macroTask_'));
    if (keysToRemove.length > 0) {
      console.debug(`[GarbageCollector] Cleaning up ${keysToRemove.length} orphaned macro tasks.`);
      chrome.storage.local.remove(keysToRemove);
    }
  });
}
