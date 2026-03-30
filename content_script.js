/**
 * My Chrome Handbook - Live Automation Engine (v3.0)
 * Optimized for identifier-based single-tab execution (#macro-active).
 */
(function() {
  // 1. [식별자 기반 로직] 매크로 전용 탭이 아니면 실행 차단
  const isMacroActive = async () => {
    // URL 해시 확인
    if (window.location.hash.includes('macro-active')) return 'active';
    if (window.location.hash.includes('macro-record')) return 'record';
    
    try {
      if (window.top.location.hash.includes('macro-active')) return 'active';
      if (window.top.location.hash.includes('macro-record')) return 'record';
    } catch (e) {}

    // 해시가 없더라도 실행 중인 작업이 있는지 storage 확인
    const { activeShortcutTask, isRecording } = await chrome.storage.local.get(['activeShortcutTask', 'isRecording']);
    if (activeShortcutTask) return 'active';
    if (isRecording) return 'record';
    return null;
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
    `;
    document.head.appendChild(style);
  }

  // 비동기 체크를 위해 로직 변경
  isMacroActive().then(mode => {
    if (mode === 'active') initEngine();
    else if (mode === 'record') initRecorder();
  });

  function initRecorder() {
    let statusBadge = null;
    let recordedStepsCount = 0;

    function updateRecorderBadge() {
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
      
      if (statusBadge) statusBadge.remove();
      alert(chrome.i18n.getMessage('allStepsDone'));
      window.close();
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

    async function addStep(step) {
      const { recordingTask } = await chrome.storage.local.get('recordingTask');
      if (!recordingTask) return;
      
      recordingTask.steps.push(step);
      recordedStepsCount = recordingTask.steps.length;
      await chrome.storage.local.set({ recordingTask });
      updateRecorderBadge();
    }

    document.addEventListener('click', (e) => {
      if (e.target.id === 'stop-record-btn' || e.target.closest('#shortcut-recorder-badge')) return;
      
      const target = e.target.closest('a, button, [role="button"], input[type="button"], input[type="submit"]');
      if (target) {
        const identifier = extractIdentifier(target);
        highlightElement(target);
        addStep({ type: 'click', target: identifier, value: '' });
      }
    }, true);

    document.addEventListener('change', (e) => {
      const target = e.target;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
        const identifier = extractIdentifier(target);
        const value = target.value || target.innerText;
        highlightElement(target);
        addStep({ type: 'input', target: identifier, value: value });
      }
    }, true);

    updateRecorderBadge();
  }

  function initEngine() {
    let observer = null;
    let statusBadge = null;
    let isProcessing = false;
    let retryCount = 0;
    let retryTimer = null;

    let spotlightEl = null;

    function showSpotlight(el) {
      injectStyles();
      if (!spotlightEl) {
        spotlightEl = document.createElement('div');
        spotlightEl.className = 'macro-spotlight';
        document.body.appendChild(spotlightEl);
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
    }

    function removeSpotlight() {
      if (spotlightEl) {
        spotlightEl.classList.remove('show');
        setTimeout(() => {
          if (spotlightEl && spotlightEl.parentNode) spotlightEl.remove();
          spotlightEl = null;
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

    function updateStatusBadge(current, total, text, retryCount = 0, isError = false) {
      if (!statusBadge) {
        statusBadge = document.createElement('div');
        statusBadge.id = 'shortcut-status-badge';
        Object.assign(statusBadge.style, {
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
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
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          border: '1px solid rgba(255,255,255,0.25)',
          backdropFilter: 'blur(12px)'
        });
        document.body.appendChild(statusBadge);
        
        statusBadge.style.transform = 'translateY(100px) scale(0.8)';
        statusBadge.style.opacity = '0';
        requestAnimationFrame(() => {
          statusBadge.style.transform = 'translateY(0) scale(1)';
          statusBadge.style.opacity = '1';
        });
      }

      if (isError) {
        statusBadge.style.background = 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)';
        statusBadge.textContent = "";
        statusBadge.insertAdjacentHTML('beforeend', `
          <div style="background: rgba(255,255,255,0.25); padding: 4px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
            <svg xmlns="https://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <span style="font-size: 14px; font-weight: 800; letter-spacing: -0.02em;">
              ${chrome.i18n.getMessage('macroStopped')}
            </span>
            <span style="font-size: 11px; opacity: 0.9; font-weight: 500;">
              ${chrome.i18n.getMessage('buttonNotFound')}
            </span>
          </div>
        `);
        return;
      }

      const isDone = current > total;
      const displayCurrent = Math.min(current, total);
      const safeText = text || "";
      
      let subText = chrome.i18n.getMessage('stepInProgress', [safeText]);
      if (retryCount > 0) {
        subText = chrome.i18n.getMessage('waitingForButton', [retryCount.toString()]);
        statusBadge.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
      } else {
        statusBadge.style.background = 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)';
      }
      
      statusBadge.textContent = "";
      statusBadge.insertAdjacentHTML('beforeend', `
        <div style="background: rgba(255,255,255,0.25); padding: 6px 12px; border-radius: 12px; font-size: 14px; font-weight: 900; min-width: 45px; text-align: center;">
          ${displayCurrent}/${total}
        </div>
        <div style="display: flex; flex-direction: column; gap: 2px;">
          <span style="font-size: 14px; font-weight: 800; letter-spacing: -0.02em;">
            ${isDone ? chrome.i18n.getMessage('allStepsDone') : chrome.i18n.getMessage('macroActive')}
          </span>
          <span style="font-size: 11px; opacity: 0.9; font-weight: 500;">
            ${isDone ? chrome.i18n.getMessage('closingSoon') : subText}
          </span>
        </div>
      `);
    }

    function removeStatusBadge() {
      if (statusBadge) {
        statusBadge.style.opacity = '0';
        statusBadge.style.transform = 'translateY(20px) scale(0.9)';
        setTimeout(() => {
          if (statusBadge && statusBadge.parentNode) {
            statusBadge.remove();
            statusBadge = null;
          }
        }, 400);
      }
      removeSpotlight();
    }

    let cachedTask = null; // [최적화] 상태 캐싱을 통한 스토리지 접근 최소화

    async function runEngine() {
      if (isProcessing) return;
      try {
        // [최적화] 캐시된 작업이 있으면 우선 사용하고, 없으면 스토리지에서 로드
        if (!cachedTask) {
          const result = await chrome.storage.local.get('activeShortcutTask');
          cachedTask = result.activeShortcutTask;
        }

        if (!cachedTask) {
          removeStatusBadge();
          stopObserver();
          return;
        }

        startObserver();
        const { steps, currentStepIndex } = cachedTask;

        if (currentStepIndex >= steps.length) {
          if (window === window.top) updateStatusBadge(steps.length + 1, steps.length, "Complete");
          stopObserver();
          setTimeout(async () => {
            cachedTask = null; // [최적화] 캐시 초기화
            await chrome.storage.local.remove('activeShortcutTask');
            if (window === window.top) removeStatusBadge();
          }, 2500);
          return;
        }

        const step = steps[currentStepIndex];
        const stepType = typeof step === 'string' ? 'click' : step.type;
        const stepTarget = typeof step === 'string' ? step : step.target;
        const stepValue = typeof step === 'string' ? '' : step.value;

        if (window === window.top) updateStatusBadge(currentStepIndex + 1, steps.length, stepTarget, retryCount);

        const target = (stepType === 'click') ? findAndClick(stepTarget) : findAndFill(stepTarget, stepValue);

        if (target) {
          isProcessing = true;
          retryCount = 0;
          
          // [시각적 피드백] 스포트라이트 및 파동 애니메이션
          showSpotlight(target);
          if (stepType === 'click') {
            const rect = target.getBoundingClientRect();
            triggerRipple(rect.left + rect.width / 2, rect.top + rect.height / 2);
          }
          
          cachedTask = { ...cachedTask, currentStepIndex: currentStepIndex + 1 }; // [최적화] 캐시 즉시 업데이트
          await chrome.storage.local.set({ activeShortcutTask: cachedTask });
          
          setTimeout(() => { 
            isProcessing = false; 
            runEngine(); 
          }, 1800); 
        } else {
          // [Smart Skip] Check if the NEXT step is already available (to skip login/redundant steps)
          if (currentStepIndex + 1 < steps.length) {
            const nextStep = steps[currentStepIndex + 1];
            const nextTarget = typeof nextStep === 'string' ? nextStep : nextStep.target;
            const nextType = typeof nextStep === 'string' ? 'click' : nextStep.type;
            
            if (checkElementExists(nextTarget, nextType)) {
              cachedTask = { ...cachedTask, currentStepIndex: currentStepIndex + 1 }; // [최적화] 캐시 즉시 업데이트
              await chrome.storage.local.set({ activeShortcutTask: cachedTask });
              retryCount = 0;
              setTimeout(() => runEngine(), 500);
              return;
            }
          }

          if (retryCount < 20) {
            retryCount++;
            if (retryCount === 5 || retryCount === 12) expandHiddenMenus();
            setTimeout(() => runEngine(), 500);
          } else {
            if (window === window.top) updateStatusBadge(currentStepIndex + 1, steps.length, stepTarget, 0, true);
            stopObserver();
            cachedTask = null; // [최적화] 캐시 초기화
            await chrome.storage.local.remove('activeShortcutTask');
            if (window === window.top) setTimeout(removeStatusBadge, 4000);
          }
        }
      } catch (err) {
        console.error("[Shortcut] Engine Error:", err);
      } finally {
        isProcessing = false;
      }
    }

    function checkElementExists(text, type = 'click') {
      if (!text) return false;
      const lowerText = text.toLowerCase().trim();
      const isVisible = (el) => {
        const style = window.getComputedStyle(el);
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length) && 
               style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      };

      if (type === 'click') {
        const clickable = document.querySelectorAll('a, button, [role="button"], input[type="button"], input[type="submit"], .btn, .button');
        return Array.from(clickable).some(el => {
          const elText = (el.innerText || el.value || "").trim().toLowerCase();
          const elAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || "").trim().toLowerCase();
          return (elText.includes(lowerText) || elAttr.includes(lowerText)) && isVisible(el);
        });
      } else {
        const inputs = document.querySelectorAll('input, textarea, [contenteditable="true"]');
        return Array.from(inputs).some(el => {
          const placeholder = (el.getAttribute('placeholder') || "").toLowerCase();
          const labelAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.name || "").toLowerCase();
          return (placeholder.includes(lowerText) || labelAttr.includes(lowerText)) && el.type !== 'hidden' && isVisible(el);
        });
      }
    }

    function findAndClick(text) {
      if (!text) return null;
      const lowerText = text.toLowerCase().trim();
      const isVisible = (el) => {
        const style = window.getComputedStyle(el);
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length) && 
               style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      };

      const clickableElements = document.querySelectorAll('a, button, [role="button"], input[type="button"], input[type="submit"], .btn, .button');
      let target = Array.from(clickableElements).find(el => {
        const elText = (el.innerText || el.value || "").trim().toLowerCase();
        const elAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || "").trim().toLowerCase();
        return (elText === lowerText || elAttr === lowerText) && isVisible(el);
      });

      if (!target) {
        target = Array.from(clickableElements).find(el => {
          const elText = (el.innerText || el.value || "").trim().toLowerCase();
          const elAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || "").trim().toLowerCase();
          return (elText.includes(lowerText) || elAttr.includes(lowerText)) && isVisible(el) && (elText.length < lowerText.length + 30);
        });
      }

      if (target) {
        try { target.scrollIntoView({ behavior: 'auto', block: 'center' }); } catch (e) {}
        const link = target.tagName === 'A' ? target : target.closest('a');
        if (link) {
          if (link.target === '_blank') link.target = '_self';
          let currentHref = link.getAttribute('href'); 
          if (currentHref && !currentHref.startsWith('javascript') && !currentHref.startsWith('#')) {
            try {
              const url = new URL(currentHref, window.location.href);
              if (!url.hash.includes('macro-active')) {
                url.hash = url.hash ? `${url.hash}-macro-active` : 'macro-active';
                link.href = url.toString();
              }
            } catch (e) {
              if (!currentHref.includes('macro-active')) link.href = currentHref + (currentHref.includes('#') ? '-macro-active' : '#macro-active');
            }
          }
        }
        ['mousedown', 'mouseup', 'click'].forEach(evt => target.dispatchEvent(new MouseEvent(evt, { view: window, bubbles: true, cancelable: true, buttons: 1 })));
        if (typeof target.click === 'function') target.click();
        return target;
      }
      return null;
    }

    function findAndFill(targetText, value) {
      if (!targetText) return null;
      const lowerTarget = targetText.toLowerCase().trim();
      const inputs = document.querySelectorAll('input, textarea, [contenteditable="true"]');
      let target = Array.from(inputs).find(el => {
        const placeholder = (el.getAttribute('placeholder') || "").toLowerCase();
        const labelAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.name || "").toLowerCase();
        return (placeholder.includes(lowerTarget) || labelAttr.includes(lowerTarget)) && el.type !== 'hidden';
      });

      if (target) {
        try {
          target.scrollIntoView({ behavior: 'auto', block: 'center' });
          target.focus();
          if (target.contentEditable === 'true') target.innerText = value;
          else target.value = value;
          target.dispatchEvent(new Event('input', { bubbles: true }));
          target.dispatchEvent(new Event('change', { bubbles: true }));
        } catch (e) {}
        return target;
      }
      return null;
    }

    function expandHiddenMenus() {
      const menuPatterns = ['menu', 'navigation', 'more', '목록', '메뉴', '더보기', '.hamburger', '.menu-toggle'];
      for (const pattern of menuPatterns) {
        let menuBtn = document.querySelector(pattern.startsWith('.') ? pattern : `[aria-label*="${pattern}"], [title*="${pattern}"]`);
        if (!menuBtn) {
          menuBtn = Array.from(document.querySelectorAll('button, a')).find(el => (el.innerText || "").toLowerCase().includes(pattern));
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

    function startObserver() {
      if (observer) return;
      const throttledRunEngine = throttle(() => runEngine(), 500);
      observer = new MutationObserver(throttledRunEngine);
      observer.observe(document.body, { childList: true, subtree: true });
    }

    function stopObserver() {
      if (observer) { observer.disconnect(); observer = null; }
    }

    runEngine();
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes.activeShortcutTask) {
        cachedTask = changes.activeShortcutTask.newValue; // [최적화] 외부 변경 시 캐시 동기화
        runEngine();
      }
    });
  }
})();
