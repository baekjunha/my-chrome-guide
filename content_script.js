/**
 * My Chrome Handbook - Live Automation Engine (v3.2.0)
 * Optimized for identifier-based single-tab execution (#macro-active).
 */
(function() {
  if (window.__macroInjected) return;
  window.__macroInjected = true;

  let currentExecutionId = null;

  // 1. [식별자 기반 로직] 매크로 전용 탭이 아니면 실행 차단
  const isMacroActive = () => {
    return new Promise((resolve) => {
      let hash = "";
      try { hash = window.location.hash; } catch (e) {}

      if (!hash) {
        try {
          if (window.top !== window) hash = window.top.location.hash;
        } catch (e) {}
      }
      
      if (hash && typeof hash === 'string') {
        const activeMatch = hash.match(/#macro-active(?:-(\d+))?/);
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
  };

  // [공용] 매크로 UI 스타일 주입 (initRecorder, initEngine 공통 사용)
  function injectStyles() {
    if (document.getElementById('macro-ui-styles')) return;
    const style = document.createElement('style');
    style.id = 'macro-ui-styles';
    style.textContent = `
      .macro-spotlight {
        position: fixed;
        pointer-events: none;
        z-index: 9999998;
        box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
        border-radius: 12px;
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        opacity: 0;
        border: 3px solid #3b82f6;
      }
      .macro-spotlight.show {
        opacity: 1;
      }
      .macro-ripple {
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(37, 99, 235, 0.5);
        border-radius: 50%;
        transform: scale(0);
        pointer-events: none;
        z-index: 9999999;
        animation: macro-ripple-anim 0.8s ease-out forwards;
      }
      @keyframes macro-ripple-anim {
        0% { transform: scale(0); opacity: 0.8; }
        100% { transform: scale(10); opacity: 0; }
      }
      .macro-status-badge {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: rgba(15, 23, 42, 0.9);
        backdrop-filter: blur(8px);
        color: white;
        padding: 12px 24px;
        border-radius: 100px;
        font-size: 14px;
        font-weight: 600;
        z-index: 9999999;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        border: 1.5px solid rgba(255, 255, 255, 0.15);
      }
      .macro-status-badge.show {
        transform: translateX(-50%) translateY(0);
      }
      .macro-tooltip {
        position: fixed;
        background: #2563eb;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
        z-index: 9999999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        max-width: 250px;
        word-break: keep-all;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
      }
      .macro-tooltip.show {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }

  // 비동기 체크를 위해 로직 변경
  isMacroActive().then(mode => {
    const start = () => {
      if (mode === 'active') initEngine();
      else if (mode === 'record') initRecorder();
    };
    
    if (document.body && document.head) {
      start();
    } else {
      document.addEventListener('DOMContentLoaded', start);
    }
  }).catch(err => {
    // 보안 에러 등 예상치 못한 에러가 최상단까지 올라오지 않도록 차단
    console.debug("[Shortcut] Activation skipped:", err);
  });

  function initRecorder() {
    let statusBadge = null;
    let recordedStepsCount = 0;

    function updateRecorderBadge() {
      if (window !== window.top) return;
      if (!statusBadge) {
        statusBadge = document.createElement('div');
        statusBadge.id = 'shortcut-recorder-badge';
        Object.assign(statusBadge.style, {
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
          color: 'white',
          padding: '14px 22px',
          borderRadius: '20px',
          zIndex: '9999999',
          fontSize: '14px',
          fontWeight: 'bold',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          border: '1px solid rgba(255,255,255,0.25)',
          backdropFilter: 'blur(12px)'
        });
        document.body.appendChild(statusBadge);
      }

      statusBadge.textContent = "";
      statusBadge.insertAdjacentHTML('beforeend', `
        <div style="background: rgba(255,255,255,0.25); padding: 6px 12px; border-radius: 12px; font-size: 14px; font-weight: 900;">
          REC
        </div>
        <div style="display: flex; flex-direction: column; gap: 2px;">
          <span style="font-size: 14px; font-weight: 800; letter-spacing: -0.02em;">
            ${chrome.i18n.getMessage('recordingTitle')} (${recordedStepsCount})
          </span>
          <span style="font-size: 11px; opacity: 0.9; font-weight: 500;">
            ${chrome.i18n.getMessage('recordingDesc')}
          </span>
        </div>
        <button id="stop-record-btn" style="background: white; color: #ef4444; border: none; padding: 6px 12px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-left: 10px;">
          ${chrome.i18n.getMessage('stopRecording')}
        </button>
      `);

      statusBadge.querySelector('#stop-record-btn').onclick = stopRecording;
    }

    async function stopRecording() {
      const { recordingTask, userShortcuts } = await chrome.storage.local.get(['recordingTask', 'userShortcuts']);
      if (recordingTask && recordingTask.steps.length > 0) {
        let shortcuts = userShortcuts || [];
        const isEditing = !!recordingTask.id;
        
        const newShortcut = {
          id: isEditing ? recordingTask.id : Date.now(),
          name: recordingTask.name || "Recorded Macro",
          url: recordingTask.url,
          workspace: recordingTask.workspace || 'personal',
          steps: recordingTask.steps
        };

        if (isEditing) {
          const index = shortcuts.findIndex(s => s.id === recordingTask.id);
          if (index !== -1) {
            shortcuts[index] = newShortcut;
          } else {
            shortcuts.push(newShortcut);
          }
        } else {
          shortcuts.push(newShortcut);
        }
        
        await chrome.storage.local.set({ userShortcuts: shortcuts });
      }
      await chrome.storage.local.remove(['recordingTask', 'isRecording']);
      try { chrome.runtime.sendMessage({ action: 'UNREGISTER_MACRO_TAB' }); } catch(e) {}
      
      if (statusBadge) statusBadge.remove();
      alert(chrome.i18n.getMessage('allStepsDone'));
      chrome.runtime.sendMessage({ action: 'CLOSE_TAB' });
    }

    function highlightElement(el) {
      const originalOutline = el.style.outline;
      const originalTransition = el.style.transition;
      el.style.transition = 'outline 0.2s ease';
      el.style.outline = '4px solid #2563eb'; // [브랜드 컬러] 블루로 변경
      el.style.outlineOffset = '2px';
      setTimeout(() => {
        el.style.outline = originalOutline;
        setTimeout(() => el.style.transition = originalTransition, 200);
      }, 500);
    }

    function extractIdentifier(el) {
      const text = (el.innerText || el.value || "").trim();
      if (text && text.length < 50) return text;

      const label = el.getAttribute('aria-label') || el.getAttribute('title') || el.getAttribute('alt');
      if (label) return label.trim();

      if (el.placeholder) return el.placeholder.trim();
      if (el.name) return el.name.trim();

      if (el.id && !el.id.includes('ember') && !el.id.startsWith(':')) return el.id;

      if (el.id) {
        const labelEl = document.querySelector(`label[for="${el.id}"]`);
        if (labelEl && labelEl.innerText.trim()) return labelEl.innerText.trim();
      }

      return "Button";
    }

    function extractMetadata(el) {
      if (!el) return {};
      return {
        tagName: el.tagName || '',
        id: el.id || '',
        className: typeof el.className === 'string' ? el.className : '',
        innerText: (el.innerText || '').trim().substring(0, 50),
        value: (el.value || '').trim().substring(0, 50),
        name: el.name || '',
        placeholder: el.getAttribute('placeholder') || '',
        ariaLabel: el.getAttribute('aria-label') || el.getAttribute('title') || ''
      };
    }

    async function addStep(step) {
      const { recordingTask } = await chrome.storage.local.get('recordingTask');
      if (recordingTask) {
        if (!recordingTask.steps) recordingTask.steps = [];
        recordingTask.steps.push(step);
        await chrome.storage.local.set({ recordingTask });
        recordedStepsCount = recordingTask.steps.length;
        updateRecorderBadge();
      }
    }

    // 초기 단계 수 동기화
    chrome.storage.local.get('recordingTask').then(res => {
      if (res.recordingTask && res.recordingTask.steps) {
        recordedStepsCount = res.recordingTask.steps.length;
        updateRecorderBadge();
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.id === 'stop-record-btn' || e.target.closest('#shortcut-recorder-badge')) return;
      
      const target = e.target.closest('a, button, [role="button"], input[type="button"], input[type="submit"]');
      if (target) {
        const identifier = extractIdentifier(target);
        highlightElement(target);
        addStep({ type: 'click', target: identifier, value: '', tooltip: '', meta: extractMetadata(target) });
      }
    }, true);

    document.addEventListener('change', (e) => {
      const target = e.target;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
        const identifier = extractIdentifier(target);
        const value = target.value || target.innerText;
        highlightElement(target);
        addStep({ type: 'input', target: identifier, value: value, tooltip: '', meta: extractMetadata(target) });
      }
    }, true);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const target = e.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
          const identifier = extractIdentifier(target);
          const value = target.value || target.innerText;
          highlightElement(target);
          addStep({ type: 'enter', target: identifier, value: value, tooltip: '', meta: extractMetadata(target) });
        }
      }
    }, true);

    updateRecorderBadge();
  }

  function initEngine() {
    let engineInterval = null;
    let statusBadge = null;
    let isProcessing = false;
    let retryCount = 0;
    let retryTimer = null;
    let lastProcessedIndex = -1;

    let spotlightEl = null;
    let tooltipEl = null;

    function showSpotlight(el, tooltipText = '') {
      injectStyles();
      if (!spotlightEl) {
        spotlightEl = document.createElement('div');
        spotlightEl.className = 'macro-spotlight';
        document.body.appendChild(spotlightEl);
      }
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'macro-tooltip';
        document.body.appendChild(tooltipEl);
      }

      const rect = el.getBoundingClientRect();
      const padding = 6;
      Object.assign(spotlightEl.style, {
        width: `${rect.width + padding * 2}px`,
        height: `${rect.height + padding * 2}px`,
        top: `${rect.top - padding}px`,
        left: `${rect.left - padding}px`
      });
      
      spotlightEl.classList.add('show');

      if (tooltipText) {
        tooltipEl.textContent = tooltipText;
        Object.assign(tooltipEl.style, {
          top: `${rect.bottom + padding + 10}px`,
          left: `${Math.max(10, rect.left)}px`
        });
        tooltipEl.classList.add('show');
      } else {
        tooltipEl.classList.remove('show');
      }
    }

    function removeSpotlight() {
      if (spotlightEl) {
        spotlightEl.classList.remove('show');
        setTimeout(() => {
          if (spotlightEl && spotlightEl.parentNode) spotlightEl.remove();
          spotlightEl = null;
        }, 500);
      }
      if (tooltipEl) {
        tooltipEl.classList.remove('show');
        setTimeout(() => {
          if (tooltipEl && tooltipEl.parentNode) tooltipEl.remove();
          tooltipEl = null;
        }, 500);
      }
    }

    function triggerRipple(x, y) {
      injectStyles();
      const ripple = document.createElement('div');
      ripple.className = 'macro-ripple';
      ripple.style.left = `${x - 10}px`;
      ripple.style.top = `${y - 10}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    }

    function updateStatusBadge(current, total, targetName, retry, complete = false, customMsg = "") {
      const existing = document.getElementById('macro-status-badge');
      if (!existing && complete) return;

      const lang = "ko"; 
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      
      const badge = existing || document.createElement('div');
      if (!existing) {
        badge.id = 'macro-status-badge';
        document.body.appendChild(badge);
      }

      const percent = Math.min((current / total) * 100, 100);
      const isAI = customMsg && customMsg.includes("AI");
      const isLogin = customMsg && customMsg.includes("로그인");
      
      let statusColor = "linear-gradient(135deg, #2563eb, #1e40af)"; // Default Blue
      if (isAI) statusColor = "linear-gradient(135deg, #7c3aed, #4f46e5)"; // AI Purple
      if (isLogin) statusColor = "linear-gradient(135deg, #f59e0b, #d97706)"; // Login Orange
      if (complete) statusColor = "linear-gradient(135deg, #10b981, #059669)"; // Complete Green

      badge.style.cssText = `
        position: fixed; bottom: 24px; right: 24px; z-index: 9999999;
        background: ${statusColor}; color: white;
        padding: 14px 22px; border-radius: 18px; font-family: 'Pretendard', sans-serif;
        box-shadow: 0 10px 30px rgba(0,0,0,0.25); display: flex; flex-direction: column; gap: 8px;
        min-width: 240px; border: 1px solid rgba(255,255,255,0.1);
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: badge-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      `;

      const title = complete ? chrome.i18n.getMessage('macroCompleteTitle') : (isLogin ? chrome.i18n.getMessage('macroLoginWaitTitle') : (isAI ? chrome.i18n.getMessage('macroAIWaitTitle') : `${chrome.i18n.getMessage('macroRunningTitle')} (${current}/${total})`));
      const subTitle = customMsg || (complete ? chrome.i18n.getMessage('macroCompleteDesc') : `${chrome.i18n.getMessage('macroTargetPrefix')}${targetName} ${retry > 0 ? `${chrome.i18n.getMessage('macroRetryPrefix')}${retry})` : ''}`);

      const svgBot = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>`;
      const svgLock = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
      const svgCheck = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><polyline points="20 6 9 17 4 12"/></svg>`;
      const svgRocket = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.71-2.13.71-2.13l-1.58-1.58s-1.29 0-2.13.71Z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/><path d="M9 12H4s.5-1 1-4c2 0 3 0 3 0"/><path d="M15 9s1 .5 4 1c0 2-2 3-2 3h-5"/></svg>`;

      badge.textContent = '';
      badge.insertAdjacentHTML('beforeend', `
        <div style="display:flex; align-items:center; gap:10px; font-weight:800; font-size:14px;">
          ${isAI ? svgBot : (isLogin ? svgLock : (complete ? svgCheck : svgRocket))} <span>${title}</span>
        </div>
        <div style="font-size:12px; opacity:0.9; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${subTitle}</div>
        <div style="width:100%; height:4px; background:rgba(255,255,255,0.2); border-radius:10px; overflow:hidden; margin-top:4px;">
          <div style="width:${percent}%; height:100%; background:white; transition: width 0.3s ease;"></div>
        </div>
      `);
    }

    function removeStatusBadge() {
      const badge = document.getElementById('macro-status-badge');
      if (badge) badge.remove();
      removeSpotlight();
    }

    let cachedTask = null; // [최적화] 상태 캐싱을 통한 스토리지 접근 최소화

    async function runEngine() {
      if (isProcessing) return;
      removeSpotlight(); // 이전 하이라이트 제거
      try {
        // [최적화] 캐시에서 작업을 가져오고 없으면 스토리지 로드
        if (!cachedTask) {
          const taskKey = currentExecutionId ? `macroTask_${currentExecutionId}` : 'activeShortcutTask';
          const result = await chrome.storage.local.get(taskKey);
          cachedTask = result[taskKey];
        }

        if (!cachedTask) {
          removeStatusBadge();
          stopObserver();
          return;
        }

        startObserver();
        
        // [Smart Auth Check] 로그인 페이지 감지 시 대기
        const isCurrentLoginPage = () => {
          const authPaths = ['login', 'signin', 'auth', 'accounts.google', 'id.naver', 'membership', 'session/new', 'signup'];
          const url = window.location.href.toLowerCase();
          return authPaths.some(p => url.includes(p)) && (document.body.innerText.toLowerCase().includes('로그인') || document.body.innerText.toLowerCase().includes('password'));
        };

        if (isCurrentLoginPage()) {
          const totalSteps = (cachedTask.steps && cachedTask.steps.length) || 0;
          if (window === window.top) updateStatusBadge(cachedTask.currentStepIndex || 0, totalSteps, "Auth Required", 0, false, chrome.i18n.getMessage('macroLoginWaitDesc'));
          return;
        }

        // steps와 currentStepIndex를 명시적으로 let 선언하여 'Assignment to constant' 방지
        let steps = cachedTask.steps;
        let currentStepIndex = cachedTask.currentStepIndex || 0;

        if (lastProcessedIndex !== currentStepIndex) {
          retryCount = 0;
          lastProcessedIndex = currentStepIndex;
        }

        // 💡 안전 코드 추가: steps가 없거나 배열이 아닌 경우 중단
        if (!Array.isArray(steps)) {
          console.error("[Shortcut] Invalid Macro Task: steps is not an array");
          removeStatusBadge();
          stopObserver();
          return;
        }

        if (currentStepIndex >= steps.length) {
          if (window === window.top) {
            try { chrome.runtime.sendMessage({ action: 'LOG_ANALYTICS', status: 'success', id: cachedTask.id }); } catch(e) {}
            updateStatusBadge(steps.length, steps.length, "Complete", 0, true, chrome.i18n.getMessage('macroCompleteDesc'));
            setTimeout(async () => {
              const taskKey = currentExecutionId ? `macroTask_${currentExecutionId}` : 'activeShortcutTask';
              cachedTask = null; 
              await chrome.storage.local.remove(taskKey);
              try { chrome.runtime.sendMessage({ action: 'UNREGISTER_MACRO_TAB' }); } catch(e) {}
              removeStatusBadge();
            }, 2500);
          }
          stopObserver();
          return;
        }

        const step = steps[currentStepIndex];
        const stepType = typeof step === 'string' ? 'click' : step.type;
        const stepTarget = typeof step === 'string' ? step : step.target;
        const stepValue = typeof step === 'string' ? '' : step.value;

        if (window === window.top) updateStatusBadge(currentStepIndex + 1, steps.length, stepTarget, retryCount);

        let target = null;
        if (stepType === 'wait') {
          // Explicit wait step (ms or element presence)
          const waitTime = parseInt(stepValue) || 1500;
          if (retryCount === 0) {
            console.debug(`[Shortcut] Waiting ${waitTime}ms...`);
            setTimeout(() => {
              isProcessing = false;
              retryCount = 0;
              currentStepIndex++;
              updateProgress(currentStepIndex);
            }, waitTime);
            return;
          }
        } else if (stepType === 'click') {
          target = findAndClick(stepTarget);
        } else if (stepType === 'input') {
          target = findAndInput(stepTarget, stepValue);
        } else if (stepType === 'enter') {
          target = findAndEnter(stepTarget, stepValue);
        }

        async function updateProgress(newIndex) {
          cachedTask = { ...cachedTask, currentStepIndex: newIndex };
          const taskKey = currentExecutionId ? `macroTask_${currentExecutionId}` : 'activeShortcutTask';
          await chrome.storage.local.set({ [taskKey]: cachedTask });
          setTimeout(() => runEngine(), 1000);
        }

        if (target) {
          isProcessing = true;
          retryCount = 0;
          
          // 성공 시 인덱스 증가 및 스토리지 업데이트
          currentStepIndex++;
          cachedTask = { ...cachedTask, currentStepIndex };
          const taskKey = currentExecutionId ? `macroTask_${currentExecutionId}` : 'activeShortcutTask';
          await chrome.storage.local.set({ [taskKey]: cachedTask });
          
          setTimeout(() => { 
            isProcessing = false; 
            runEngine(); 
          }, 4000); 
        } else {
          // [Smart Skip] 다음 단계가 이미 화면에 있는지 확인
          if (currentStepIndex + 1 < steps.length) {
            const nextStep = steps[currentStepIndex + 1];
            const nextTarget = typeof nextStep === 'string' ? nextStep : nextStep.target;
            const nextType = typeof nextStep === 'string' ? 'click' : nextStep.type;
            
            if (checkElementExists(nextTarget, nextType)) {
              currentStepIndex++;
              cachedTask = { ...cachedTask, currentStepIndex };
              const taskKey = currentExecutionId ? `macroTask_${currentExecutionId}` : 'activeShortcutTask';
              await chrome.storage.local.set({ [taskKey]: cachedTask });
              retryCount = 0;
              setTimeout(() => runEngine(), 500);
              return;
            }
          }

          if (retryCount < 20) {
            retryCount++;
            
            const isLoginPage = (url) => {
              const lower = url.toLowerCase();
              return lower.includes('login') || lower.includes('signin') || lower.includes('auth') || lower.includes('accounts.google.com');
            };

            if (retryCount === 5 && isLoginPage(window.location.href)) {
              if (window === window.top) updateStatusBadge(currentStepIndex + 1, steps.length, "Login Required", 0, false, chrome.i18n.getMessage('macroLoginWaitDesc'));
              setTimeout(() => runEngine(), 2000); 
              return;
            }

            // AI 복구 로직
            if (retryCount === 5 && typeof MacroAI !== 'undefined' && typeof MacroAI.repairTarget === 'function') {
              if (window === window.top) updateStatusBadge(currentStepIndex + 1, steps.length, stepTarget, 0, false, chrome.i18n.getMessage('macroAIWaitDesc'));
              const contextMap = captureContextMap();
              const recovered = await MacroAI.repairTarget(step, contextMap);
              
              if (recovered && recovered.index !== undefined) {
                const items = querySelectorAllDeep('a, button, [role="button"], input, textarea, [contenteditable="true"], .btn, .button');
                const targetEl = items[recovered.index];
                if (targetEl) {
                  console.debug("[Shortcut] AI Recovered:", recovered.text);
                  if (stepType === 'click') targetEl.click();
                  else if (stepType === 'input' && stepValue) {
                    targetEl.value = stepValue;
                    targetEl.dispatchEvent(new Event('input', { bubbles: true }));
                  }
                  currentStepIndex++;
                  cachedTask = { ...cachedTask, currentStepIndex };
                  const taskKey = currentExecutionId ? `macroTask_${currentExecutionId}` : 'activeShortcutTask';
                  await chrome.storage.local.set({ [taskKey]: cachedTask });
                  retryCount = 0;
                  setTimeout(() => runEngine(), 500);
                  return;
                }
              }
            }

            if (retryCount % 4 === 0) {
              if (autoDismissModals()) {
                 setTimeout(() => runEngine(), 1000);
                 return;
              }
            }
            if (retryCount === 8 || retryCount === 15) {
              expandHiddenMenus();
            }
            setTimeout(() => runEngine(), 500);
          } else {
            if (window === window.top) {
              try { chrome.runtime.sendMessage({ action: 'LOG_ANALYTICS', status: 'fail', id: cachedTask.id }); } catch(e) {}
              updateStatusBadge(currentStepIndex + 1, steps.length, stepTarget, 0, false, chrome.i18n.getMessage('macroTargetNotFound'));
              const taskKey = currentExecutionId ? `macroTask_${currentExecutionId}` : 'activeShortcutTask';
              cachedTask = null;
              await chrome.storage.local.remove(taskKey);
              try { chrome.runtime.sendMessage({ action: 'UNREGISTER_MACRO_TAB' }); } catch(e) {}
              setTimeout(removeStatusBadge, 4000);
            }
            stopObserver();
          }
        }
      } catch (err) {
        console.error("[Shortcut] Engine Error:", err);
      } finally {
        isProcessing = false;
      }
    }


    
    
    let cachedShadowRoots = new Set();
    let shadowObserver = null;

    function initShadowObserver() {
      if (shadowObserver) return;
      // Gather initial shadow roots
      findShadowRoots(document);
      
      shadowObserver = new MutationObserver(mutations => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === 1) { // Element
              findShadowRoots(node);
            }
          }
        }
      });
      shadowObserver.observe(document.documentElement, { childList: true, subtree: true });
    }

    function findShadowRoots(root) {
      if (root.shadowRoot) cachedShadowRoots.add(root.shadowRoot);
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
      let node;
      while ((node = walker.nextNode())) {
        if (node.shadowRoot) {
          cachedShadowRoots.add(node.shadowRoot);
        }
      }
    }

    function querySelectorAllDeep(selector, root = document) {
      const results = Array.from(root.querySelectorAll(selector));
      for (const shadow of cachedShadowRoots) {
        if (!shadow.host || !shadow.host.isConnected) {
          cachedShadowRoots.delete(shadow);
          continue;
        }
        if (root.contains(shadow.host)) { // Only query relevant shadow roots
           results.push(...Array.from(shadow.querySelectorAll(selector)));
        }
      }
      return results;
    }

    // Initialize the observer
    initShadowObserver();


    function autoDismissModals() {
      const dismissPatterns = ['닫기', '오늘하루보지않기', '오늘하루열지않기', '건너뛰기', '나중에', 'close', 'dismiss', 'skip', 'remindmelater', 'x', '아니오', 'no'];
      const clickable = querySelectorAllDeep('button, a, [role="button"], .close-btn, .btn-close');
      let dismissed = false;
      
      const isVisible = (el) => {
        const style = window.getComputedStyle(el);
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length) && 
               style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      };

      for (const el of clickable) {
        if (!el) continue;
        const text = (el.innerText || el.getAttribute('aria-label') || '').toLowerCase().replace(/\s+/g, '');
        if (dismissPatterns.some(p => text === p || text.includes(p))) {
           let isModalLike = false;
           let parent = el.parentElement;
           let depth = 0;
           while(parent && depth < 7) {
             const pStyle = window.getComputedStyle(parent);
             if (pStyle.position === 'fixed' || pStyle.position === 'absolute' || parseInt(pStyle.zIndex) > 100) {
               isModalLike = true;
               break;
             }
             parent = parent.parentElement;
             depth++;
           }
           
           // If z-index is high, we aggressively try to close it.
           if (isModalLike && isVisible(el)) {
             console.debug("[Shortcut] Auto-dismissing popup:", text);
             try { el.click(); dismissed = true; break; } catch(e) {}
           }
        }
      }
      return dismissed;
    }

    function captureContextMap() {
      const interactive = querySelectorAllDeep('a, button, [role="button"], input, textarea, [contenteditable="true"], .btn, .button');
      return Array.from(interactive).map((el, index) => {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const isVisible = rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
        
        if (!isVisible) return null;

        return {
          index: index,
          tagName: el.tagName,
          text: (el.innerText || el.value || "").trim().substring(0, 50),
          id: el.id,
          name: el.name,
          ariaLabel: el.getAttribute('aria-label') || el.getAttribute('title'),
          placeholder: el.getAttribute('placeholder'),
          type: el.type || (el.contentEditable === 'true' ? 'contenteditable' : 'element')
        };
      }).filter(Boolean);
    }

    function checkElementExists(text, type = 'click') {
      if (!text) return false;
      const lowerText = text.toLowerCase().trim();
      const strippedText = lowerText.replace(/\s+/g, '');

      const isVisible = (el) => {        const style = window.getComputedStyle(el);
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length) && 
               style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      };

      if (type === 'click') {
        const clickable = querySelectorAllDeep('a, button, [role="button"], [tabindex], input[type="button"], input[type="submit"], .btn, .button');
        return Array.from(clickable).some(el => {
          const elText = (el.innerText || el.value || "").trim().toLowerCase();
          const strippedElText = elText.replace(/\s+/g, '');
          const elAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.id || el.name || "").trim().toLowerCase();
          const strippedElAttr = elAttr.replace(/\s+/g, '');
          return (strippedElText.includes(strippedText) || strippedElAttr.includes(strippedText)) && isVisible(el);
        });
      } else {
        const inputs = querySelectorAllDeep('input, textarea, [contenteditable="true"]');
        return Array.from(inputs).some(el => {
          const placeholder = (el.getAttribute('placeholder') || "").toLowerCase();
          const strippedPlaceholder = placeholder.replace(/\s+/g, '');
          const labelAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.id || el.name || "").toLowerCase();
          const strippedLabelAttr = labelAttr.replace(/\s+/g, '');
          return (strippedPlaceholder.includes(strippedText) || strippedLabelAttr.includes(strippedText)) && el.type !== 'hidden' && isVisible(el);
        });
      }
    }

    function findAndClick(text, tooltip = '') {
      if (!text) return null;
      
      const isVisible = (el) => {
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length) && 
               style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      };

      let target = null;

      // [추가] 1순위: CSS 선택자로 먼저 검색 시도 (data.js 호환)
      try {
        const els = querySelectorAllDeep(text);
        target = Array.from(els).find(isVisible);
      } catch(e) {}

      // [추가] 2순위: 텍스트 및 속성 기반 탐색 (기존 로직)
      if (!target) {
        const lowerText = text.toLowerCase().trim();
      const strippedText = lowerText.replace(/\s+/g, '');
        const clickableElements = querySelectorAllDeep('a, button, [role="button"], [tabindex], input[type="button"], input[type="submit"], .btn, .button');
        
        target = Array.from(clickableElements).find(el => {
          const elText = (el.innerText || el.value || "").trim().toLowerCase();
          const strippedElText = elText.replace(/\s+/g, '');
          const elAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.id || el.name || "").trim().toLowerCase();
          const strippedElAttr = elAttr.replace(/\s+/g, '');
          return (strippedElText === strippedText || strippedElAttr === strippedText) && isVisible(el);
        });

        if (!target) {
          target = Array.from(clickableElements).find(el => {
            const elText = (el.innerText || el.value || "").trim().toLowerCase();
          const strippedElText = elText.replace(/\s+/g, '');
            const elAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.id || el.name || "").trim().toLowerCase();
          const strippedElAttr = elAttr.replace(/\s+/g, '');
            return (strippedElText.includes(strippedText) || strippedElAttr.includes(strippedText)) && isVisible(el) && (elText.length < lowerText.length + 30);
          });
        }
      }

      if (target) {
        showSpotlight(target, tooltip);
        const rect = target.getBoundingClientRect();
        triggerRipple(rect.left + rect.width / 2, rect.top + rect.height / 2);
        
        try { target.scrollIntoView({ behavior: 'auto', block: 'center' }); } catch (e) {}
        
        const link = target.tagName === 'A' ? target : target.closest('a');
        if (link) {
          if (link.target === '_blank') link.target = '_self';
        }
        target.click();
        return true;
      }
      return false;
    }

    function findAndInput(text, value) {
      if (!text) return false;
      
      const isVisible = (el) => {
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length) && 
               style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      };

      let target = null;

      // 💡 1순위: CSS 선택자 탐색
      try {
        const els = querySelectorAllDeep(text);
        target = Array.from(els).find(isVisible);
      } catch(e) {}

      // [추가] 2순위: 텍스트 및 Placeholder 탐색
      if (!target) {
        const lowerText = text.toLowerCase().trim();
      const strippedText = lowerText.replace(/\s+/g, '');
        const inputs = querySelectorAllDeep('input, textarea, [contenteditable="true"]');
        
        target = Array.from(inputs).find(el => {
          const placeholder = (el.getAttribute('placeholder') || "").toLowerCase();
          const strippedPlaceholder = placeholder.replace(/\s+/g, '');
          const labelAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.id || el.name || "").toLowerCase();
          const strippedLabelAttr = labelAttr.replace(/\s+/g, '');
          return (strippedPlaceholder === strippedText || strippedLabelAttr === strippedText) && isVisible(el);
        });

        if (!target) {
          target = Array.from(inputs).find(el => {
            const placeholder = (el.getAttribute('placeholder') || "").toLowerCase();
          const strippedPlaceholder = placeholder.replace(/\s+/g, '');
            const labelAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.id || el.name || "").toLowerCase();
          const strippedLabelAttr = labelAttr.replace(/\s+/g, '');
            return (strippedPlaceholder.includes(strippedText) || strippedLabelAttr.includes(strippedText)) && isVisible(el);
          });
        }
      }

      if (target) {
        showSpotlight(target);
        try { 
          target.scrollIntoView({ behavior: 'auto', block: 'center' }); 
          target.focus();
          if (target.contentEditable === 'true') target.innerText = value;
          else target.value = value;
          target.dispatchEvent(new Event('input', { bubbles: true }));
          target.dispatchEvent(new Event('change', { bubbles: true }));
          try { if (target.form) target.form.dispatchEvent(new Event('submit', { bubbles: true })); } catch (e) {}
          return true;
        } catch (e) {
          console.error("[Shortcut] Input Error:", e);
        }
      }
      return false;
    }

    function findAndEnter(text, value = '', tooltip = '') {
      if (!text) return false;
      const lowerText = text.toLowerCase().trim();
      const strippedText = lowerText.replace(/\s+/g, '');
      const isVisible = (el) => {
        const style = window.getComputedStyle(el);
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length) && 
               style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      };

      const inputs = querySelectorAllDeep('input, textarea, [contenteditable="true"], [tabindex="0"]');
      
      let target = Array.from(inputs).find(el => {
        const placeholder = (el.getAttribute('placeholder') || "").toLowerCase();
          const strippedPlaceholder = placeholder.replace(/\s+/g, '');
        const labelAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.id || el.name || "").toLowerCase();
          const strippedLabelAttr = labelAttr.replace(/\s+/g, '');
        const elText = (el.innerText || "").toLowerCase();
        const strippedElText = elText.replace(/\s+/g, '');
        return (strippedPlaceholder === strippedText || strippedLabelAttr === strippedText || strippedElText.includes(strippedText)) && isVisible(el);
      });

      if (target) {
        showSpotlight(target, tooltip);
        try { 
          target.scrollIntoView({ behavior: 'auto', block: 'center' }); 
          target.focus();
          
          // 입력값 설정 (input 단계가 누락되었을 경우를 대비)
          if (value !== undefined && value !== null && value !== '') {
            if (target.contentEditable === 'true') target.innerText = value;
            else target.value = value;
            target.dispatchEvent(new Event('input', { bubbles: true }));
          }

          // Enter 키 이벤트 시뮬레이션 (keydown -> keypress -> keyup)
          const enterEvent = (type) => new KeyboardEvent(type, {
            key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true
          });
          
          target.dispatchEvent(enterEvent('keydown'));
          target.dispatchEvent(enterEvent('keypress'));
          target.dispatchEvent(enterEvent('keyup'));

          // [UX 개선] 폼 제출 시도 (일반적인 웹사이트 호환성)
          try { 
            if (target.form) {
               target.form.dispatchEvent(new Event('submit', { bubbles: true }));
            } else {
               // 부모 요소 중 form을 찾아 제출 시도 (가장 가까운)
               const parentForm = target.closest('form');
               if (parentForm) parentForm.dispatchEvent(new Event('submit', { bubbles: true }));
            }
          } catch (e) {}
          
          return true;
        } catch (e) {
          console.error("[Shortcut] Enter Error:", e);
        }
      }
      return false;
    }

    function expandHiddenMenus() {
      const menuPatterns = ['menu', 'navigation', 'more', '목록', '메뉴', '더보기', '.hamburger', '.menu-toggle'];
      for (const pattern of menuPatterns) {
        let menuBtn = document.querySelector(pattern.startsWith('.') ? pattern : `[aria-label*="${pattern}"], [title*="${pattern}"]`);
        if (!menuBtn) {
          menuBtn = Array.from(querySelectorAllDeep('button, a')).find(el => (el.innerText || "").toLowerCase().includes(pattern));
        }
        if (menuBtn && typeof menuBtn.click === 'function') { menuBtn.click(); return true; }
      }
      return false;
    }

    function throttle(func, limit) {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      }
    }

    let engineMutationObserver = null;

    function startObserver() {
      if (engineMutationObserver) return;
      
      const throttledRunEngine = throttle(() => {
        if (!isProcessing) runEngine();
      }, 800);

      engineMutationObserver = new MutationObserver((mutations) => {
        throttledRunEngine();
      });

      engineMutationObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });

      if (!isProcessing) runEngine();
    }

    function stopObserver() {
      if (engineMutationObserver) {
        engineMutationObserver.disconnect();
        engineMutationObserver = null;
      }
    }

    runEngine();
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local') {
        const taskKey = currentExecutionId ? `macroTask_${currentExecutionId}` : 'activeShortcutTask';
        if (changes[taskKey]) {
          cachedTask = changes[taskKey].newValue; // [최적화] 외부 변경 시 캐시 동기화
          runEngine();
        }
      }
    });
    }
    })();
