/**
 * My Chrome Handbook - Live Automation Engine
 * 페이지의 변화를 실시간으로 감지하여 연속적인 클릭을 수행합니다.
 */

(function() {
  let isProcessing = false;
  let observer = null;

  async function runEngine() {
    if (isProcessing) return;
    
    const { activeShortcutTask } = await chrome.storage.local.get('activeShortcutTask');
    
    // #5 작업이 없으면 관찰 중지 및 종료
    if (!activeShortcutTask) {
      stopObserver();
      return;
    }

    // 작업이 있는데 관찰 중이 아니면 시작
    startObserver();

    const { steps, currentStepIndex } = activeShortcutTask;

    // 1. 모든 단계 완료 여부 확인
    if (currentStepIndex >= steps.length) {
      console.log("🚀 [Shortcut] 모든 여정을 완료했습니다!");
      await chrome.storage.local.remove('activeShortcutTask');
      stopObserver();
      return;
    }

    const targetText = steps[currentStepIndex];
    
    // 2. 버튼 찾기 및 클릭
    const clicked = findAndClick(targetText);

    if (clicked) {
      isProcessing = true;
      console.log(`✅ [Shortcut] ${currentStepIndex + 1}단계 완료: "${targetText}"`);
      
      // 상태 업데이트
      await chrome.storage.local.set({
        activeShortcutTask: {
          ...activeShortcutTask,
          currentStepIndex: currentStepIndex + 1
        }
      });

      // 클릭 후 잠시 대기 (페이지 전환 시간)
      setTimeout(() => {
        isProcessing = false;
        runEngine(); // 다음 단계 즉시 시도
      }, 1000);
    }
  }

  function startObserver() {
    if (observer) return;
    observer = new MutationObserver(() => {
      runEngine();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    console.log("🤖 [Shortcut] 자동화 엔진 관찰 시작");
  }

  function stopObserver() {
    if (observer) {
      observer.disconnect();
      observer = null;
      console.log("🤖 [Shortcut] 자동화 엔진 관찰 중지");
    }
  }

  function findAndClick(text) {
    const elements = document.querySelectorAll('a, button, [role="button"], input[type="button"], .btn, span, div');
    
    const target = Array.from(elements).find(el => {
      const elText = (el.innerText || el.value || "").trim();
      const isVisible = !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
      return isVisible && elText.includes(text) && el.children.length < 5;
    });

    if (target) {
      const events = ['mousedown', 'mouseup', 'click'];
      events.forEach(evt => {
        target.dispatchEvent(new MouseEvent(evt, {
          view: window, bubbles: true, cancelable: true
        }));
      });
      if (typeof target.click === 'function') target.click();
      return true;
    }
    return false;
  }

  // ── 실행 루프 ──
  runEngine();

  // 3. 저장소 변경 감지 (단계 업데이트 대응)
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.activeShortcutTask) {
      if (changes.activeShortcutTask.newValue) {
        runEngine();
      } else {
        stopObserver();
      }
    }
  });

  console.log("🤖 [Shortcut] 자동화 엔진 로드됨");
})();