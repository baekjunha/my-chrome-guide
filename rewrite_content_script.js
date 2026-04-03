const fs = require('fs');

let content = fs.readFileSync('content_script.js', 'utf-8');

// 1. isMacroActive
content = content.replace(
  /const isMacroActive = async \(\) => \{[\s\S]*?return null;\n  \};/,
  `const isMacroActive = () => {
    return new Promise((resolve) => {
      let hash = "";
      try { hash = window.location.hash; } catch (e) {}

      if (!hash) {
        try {
          if (window.top !== window) hash = window.top.location.hash;
        } catch (e) {}
      }
      
      if (hash && typeof hash === 'string') {
        const activeMatch = hash.match(/#macro-active(?:-(\\d+))?/);
        const recordMatch = hash.match(/#macro-record/);

        if (activeMatch) {
          if (activeMatch[1]) currentExecutionId = activeMatch[1];
          try { chrome.runtime.sendMessage({ action: 'REGISTER_MACRO_TAB', mode: 'active', executionId: currentExecutionId }); } catch(e) {}
          resolve('active');
          return;
        }
        if (recordMatch) {
          try { chrome.runtime.sendMessage({ action: 'REGISTER_MACRO_TAB', mode: 'record' }); } catch(e) {}
          resolve('record');
          return;
        }
      }

      try {
        chrome.runtime.sendMessage({ action: 'CHECK_MACRO_TAB' }, (response) => {
          if (chrome.runtime.lastError) {
             resolve(null);
             return;
          }
          if (response && response.mode) {
             if (response.executionId) currentExecutionId = response.executionId;
             resolve(response.mode);
          } else {
             resolve(null);
          }
        });
      } catch (e) {
        resolve(null);
      }
    });
  };`
);

// 2. initRecorder badge
content = content.replace(
  /function updateRecorderBadge\(\) \{[\s\S]*?statusBadge = document.createElement\('div'\);/,
  `function updateRecorderBadge() {
      if (window !== window.top) return;
      if (!statusBadge) {
        statusBadge = document.createElement('div');`
);

// 3. stopRecording
content = content.replace(
  /await chrome.storage.local.remove\(\['recordingTask', 'isRecording'\]\);\s*if \(statusBadge\) statusBadge.remove\(\);/,
  `await chrome.storage.local.remove(['recordingTask', 'isRecording']);
      try { chrome.runtime.sendMessage({ action: 'UNREGISTER_MACRO_TAB' }); } catch(e) {}
      
      if (statusBadge) statusBadge.remove();`
);

// 4. addStep & sync
content = content.replace(
  /async function addStep\(step\) \{[\s\S]*?updateRecorderBadge\(\);\n      \}\n    \}\}\);\n/,
  `async function addStep(step) {
      const { recordingTask } = await chrome.storage.local.get('recordingTask');
      if (recordingTask) {
        if (!recordingTask.steps) recordingTask.steps = [];
        recordingTask.steps.push(step);
        await chrome.storage.local.set({ recordingTask });
        recordedStepsCount = recordingTask.steps.length;
        if (window === window.top) updateRecorderBadge();
      }
    }

    // 초기 단계 수 동기화
    chrome.storage.local.get('recordingTask').then(res => {
      if (res.recordingTask && res.recordingTask.steps) {
        recordedStepsCount = res.recordingTask.steps.length;
        if (window === window.top) updateRecorderBadge();
      }
    });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes.recordingTask && window === window.top) {
        if (changes.recordingTask.newValue) {
          recordedStepsCount = (changes.recordingTask.newValue.steps || []).length;
          updateRecorderBadge();
        }
      }
    });\n`
);

// 5. initEngine variables
content = content.replace(
  /let isProcessing = false;\n    let retryCount = 0;\n    let retryTimer = null;\n/,
  `let isProcessing = false;
    let retryCount = 0;
    let retryTimer = null;
    let lastProcessedIndex = -1;\n`
);

// 6. runEngine step check
content = content.replace(
  /let steps = cachedTask.steps;\n        let currentStepIndex = cachedTask.currentStepIndex \|\| 0;\n\n        \/\/ 💡 안전 코드 추가/,
  `let steps = cachedTask.steps;
        let currentStepIndex = cachedTask.currentStepIndex || 0;

        if (lastProcessedIndex !== currentStepIndex) {
          retryCount = 0;
          lastProcessedIndex = currentStepIndex;
        }

        // 💡 안전 코드 추가`
);

// 7. runEngine completion
content = content.replace(
  /if \(currentStepIndex >= steps.length\) \{[\s\S]*?return;\n        \}/,
  `if (currentStepIndex >= steps.length) {
          if (window === window.top) {
            updateStatusBadge(steps.length, steps.length, "Complete", 0, true, "모든 단계가 성공적으로 완료되었습니다.");
            setTimeout(async () => {
              const taskKey = currentExecutionId ? \`macroTask_\${currentExecutionId}\` : 'activeShortcutTask';
              cachedTask = null; 
              await chrome.storage.local.remove(taskKey);
              try { chrome.runtime.sendMessage({ action: 'UNREGISTER_MACRO_TAB' }); } catch(e) {}
              removeStatusBadge();
            }, 2500);
          }
          stopObserver();
          return;
        }`
);

// 8. runEngine failure
content = content.replace(
  /\} else \{\n            if \(window === window.top\) updateStatusBadge[\s\S]*?setTimeout\(removeStatusBadge, 4000\);\n          \}/,
  `} else {
            if (window === window.top) {
              updateStatusBadge(currentStepIndex + 1, steps.length, stepTarget, 0, false, "요소를 찾을 수 없습니다.");
              const taskKey = currentExecutionId ? \`macroTask_\${currentExecutionId}\` : 'activeShortcutTask';
              cachedTask = null;
              await chrome.storage.local.remove(taskKey);
              try { chrome.runtime.sendMessage({ action: 'UNREGISTER_MACRO_TAB' }); } catch(e) {}
              setTimeout(removeStatusBadge, 4000);
            }
            stopObserver();
          }`
);

// 9. findAndClick SPA fix
content = content.replace(
  /const link = target.tagName === 'A' \? target : target.closest\('a'\);\n        if \(link\) \{[\s\S]*?\}\n        target.click\(\);/,
  `const link = target.tagName === 'A' ? target : target.closest('a');
        if (link) {
          if (link.target === '_blank') link.target = '_self';
        }
        target.click();`
);

fs.writeFileSync('content_script.js', content);
