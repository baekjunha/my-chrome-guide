/**
 * My Chrome Handbook - Live Automation Engine (v3.2.0)
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

      const title = complete ? "🎉 매크로 완료!" : (isLogin ? "🔐 로그인 대기 중" : (isAI ? "🤖 AI 상호작용 중" : `실행 중 (${current}/${total})`));
      const subTitle = customMsg || (complete ? "모든 단계가 성공적으로 완료되었습니다." : `타겟: ${targetName} ${retry > 0 ? `(재시도 ${retry})` : ''}`);

      badge.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px; font-weight:800; font-size:14px;">
          ${isAI ? `<span style="font-size:18px;">🤖</span>` : (isLogin ? `<span style="font-size:18px;">🔐</span>` : (complete ? '✅' : '🚀'))} <span>${title}</span>
        </div>
        <div style="font-size:12px; opacity:0.9; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${subTitle}</div>
        <div style="width:100%; height:4px; background:rgba(255,255,255,0.2); border-radius:10px; overflow:hidden; margin-top:4px;">
          <div style="width:${percent}%; height:100%; background:white; transition: width 0.3s ease;"></div>
        </div>
      `;
    }

    function removeStatusBadge() {
      const badge = document.getElementById('macro-status-badge');
      if (badge) badge.remove();
      removeSpotlight();
    }

    let cachedTask = null; // [최적화] 상태 캐싱을 통한 스토리지 접근 최소화

    async function runEngine() {
      if (isProcessing) return;
      try {
        // [최적화] 캐시에서 작업을 가져오고 없으면 스토리지 로드
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
        
        // steps와 currentStepIndex를 명시적으로 let 선언하여 'Assignment to constant' 방지
        let steps = cachedTask.steps;
        let currentStepIndex = cachedTask.currentStepIndex || 0;

        if (currentStepIndex >= steps.length) {
          if (window === window.top) updateStatusBadge(steps.length, steps.length, "Complete", 0, true, "모든 단계가 성공적으로 완료되었습니다.");
          stopObserver();
          setTimeout(async () => {
            cachedTask = null; 
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

        const target = (stepType === 'click') ? findAndClick(stepTarget) : findAndInput(stepTarget, stepValue);

        if (target) {
          isProcessing = true;
          retryCount = 0;
          
          // 성공 시 인덱스 증가 및 스토리지 업데이트
          currentStepIndex++;
          cachedTask = { ...cachedTask, currentStepIndex };
          await chrome.storage.local.set({ activeShortcutTask: cachedTask });
          
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
              await chrome.storage.local.set({ activeShortcutTask: cachedTask });
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
              if (window === window.top) updateStatusBadge(currentStepIndex + 1, steps.length, "Login Required", 0, false, "로그인이 필요해 보입니다. 로그인 후 계속됩니다...");
              setTimeout(() => runEngine(), 2000); 
              return;
            }

            // AI 복구 로직
            if (retryCount === 5 && typeof MacroAI !== 'undefined' && typeof MacroAI.repairTarget === 'function') {
              if (window === window.top) updateStatusBadge(currentStepIndex + 1, steps.length, stepTarget, 0, false, "AI가 대체 요소를 찾고 있습니다...");
              const contextMap = captureContextMap();
              const recovered = await MacroAI.repairTarget({ target: stepTarget, type: stepType }, contextMap);
              
              if (recovered && recovered.index !== undefined) {
                const items = document.querySelectorAll('a, button, [role="button"], input, textarea, [contenteditable="true"], .btn, .button');
                const targetEl = items[recovered.index];
                if (targetEl) {
                  console.log("[Shortcut] AI Recovered:", recovered.text);
                  if (stepType === 'click') targetEl.click();
                  else if (stepType === 'input' && stepValue) {
                    targetEl.value = stepValue;
                    targetEl.dispatchEvent(new Event('input', { bubbles: true }));
                  }
                  currentStepIndex++;
                  cachedTask = { ...cachedTask, currentStepIndex }; 
                  await chrome.storage.local.set({ activeShortcutTask: cachedTask });
                  retryCount = 0;
                  setTimeout(() => runEngine(), 500);
                  return;
                }
              }
            }

            if (retryCount === 8 || retryCount === 15) {
              expandHiddenMenus();
            }
            setTimeout(() => runEngine(), 500);
          } else {
            if (window === window.top) updateStatusBadge(currentStepIndex + 1, steps.length, stepTarget, 0, false, "요소를 찾을 수 없습니다.");
            stopObserver();
            cachedTask = null;
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


    function captureContextMap() {
      const interactive = document.querySelectorAll('a, button, [role="button"], input, textarea, [contenteditable="true"], .btn, .button');
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
      
      const isVisible = (el) => {
        const style = window.getComputedStyle(el);
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length) && 
               style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      };

      if (type === 'click') {
        const clickable = document.querySelectorAll('a, button, [role="button"], [tabindex], input[type="button"], input[type="submit"], .btn, .button');
        return Array.from(clickable).some(el => {
          const elText = (el.innerText || el.value || "").trim().toLowerCase();
          const elAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.id || el.name || "").trim().toLowerCase();
          return (elText.includes(lowerText) || elAttr.includes(lowerText)) && isVisible(el);
        });
      } else {
        const inputs = document.querySelectorAll('input, textarea, [contenteditable="true"]');
        return Array.from(inputs).some(el => {
          const placeholder = (el.getAttribute('placeholder') || "").toLowerCase();
          const labelAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.id || el.name || "").toLowerCase();
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

      const clickableElements = document.querySelectorAll('a, button, [role="button"], [tabindex], input[type="button"], input[type="submit"], .btn, .button');
      
      // 1. 우선순위 탐색 (정확히 일치)
      let target = Array.from(clickableElements).find(el => {
        const elText = (el.innerText || el.value || "").trim().toLowerCase();
        const elAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.id || el.name || "").trim().toLowerCase();
        return (elText === lowerText || elAttr === lowerText) && isVisible(el);
      });

      // 2. 차선책 탐색 (부분 일치)
      if (!target) {
        target = Array.from(clickableElements).find(el => {
          const elText = (el.innerText || el.value || "").trim().toLowerCase();
          const elAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.id || el.name || "").trim().toLowerCase();
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
            window.location.href = currentHref;
            return true;
          }
        }
        target.click();
        return true;
      }
      return false;
    }

    function findAndInput(text, value) {
      if (!text) return false;
      const lowerText = text.toLowerCase().trim();
      
      const isVisible = (el) => {
        const style = window.getComputedStyle(el);
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length) && 
               style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      };

      const inputs = document.querySelectorAll('input, textarea, [contenteditable="true"]');
      
      // 1. 정확히 일치 (Placeholder, Label, Name, ID)
      let target = Array.from(inputs).find(el => {
        const placeholder = (el.getAttribute('placeholder') || "").toLowerCase();
        const labelAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.id || el.name || "").toLowerCase();
        return (placeholder === lowerText || labelAttr === lowerText) && isVisible(el);
      });

      // 2. 부분 일치
      if (!target) {
        target = Array.from(inputs).find(el => {
          const placeholder = (el.getAttribute('placeholder') || "").toLowerCase();
          const labelAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.id || el.name || "").toLowerCase();
          return (placeholder.includes(lowerText) || labelAttr.includes(lowerText)) && isVisible(el);
        });
      }

      if (target) {
        try { 
          target.scrollIntoView({ behavior: 'auto', block: 'center' }); 
          target.focus();
          if (target.contentEditable === 'true') target.innerText = value;
          else target.value = value;
          target.dispatchEvent(new Event('input', { bubbles: true }));
          target.dispatchEvent(new Event('change', { bubbles: true }));
          // [UX 개선] 엔터 키 효과를 위해 폼 제출 시도
          try { if (target.form) target.form.dispatchEvent(new Event('submit', { bubbles: true })); } catch (e) {}
          return true;
        } catch (e) {
          console.error("[Shortcut] Input Error:", e);
        }
      }
      return false;
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
