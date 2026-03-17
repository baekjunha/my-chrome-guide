/**
 * My Chrome Handbook - Live Automation Engine
 * 페이지의 변화를 실시간으로 감지하여 연속적인 클릭을 수행합니다.
 */

(function() {
  let isProcessing = false;

  async function runEngine() {
    if (isProcessing) return;
    
    const { activeShortcutTask } = await chrome.storage.local.get('activeShortcutTask');
    if (!activeShortcutTask) return;

    const { steps, currentStepIndex, startTime } = activeShortcutTask;

    // 1. 모든 단계 완료 여부 확인
    if (currentStepIndex >= steps.length) {
      console.log("🚀 [Shortcut] 모든 여정을 완료했습니다!");
      await chrome.storage.local.remove('activeShortcutTask');
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

  function findAndClick(text) {
    // 모든 클릭 가능 요소 뒤지기
    const elements = document.querySelectorAll('a, button, [role="button"], input[type="button"], .btn, span, div');
    
    // 가장 정확한 매칭을 찾기 위한 필터링
    const target = Array.from(elements).find(el => {
      const elText = (el.innerText || el.value || "").trim();
      const isVisible = !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
      // 텍스트가 포함되어 있고, 자식 요소가 너무 많지 않은(버튼 본체일 확률이 높은) 요소
      return isVisible && elText.includes(text) && el.children.length < 5;
    });

    if (target) {
      // 강제 클릭 이벤트 발생
      const events = ['mousedown', 'mouseup', 'click'];
      events.forEach(evt => {
        target.dispatchEvent(new MouseEvent(evt, {
          view: window,
          bubbles: true,
          cancelable: true
        }));
      });
      if (typeof target.click === 'function') target.click();
      return true;
    }
    return false;
  }

  // ── 실행 루프 ──

  // 1. 페이지 로드 시 시작
  runEngine();

  // 2. 화면 변화 감지 (SPA 대응)
  const observer = new MutationObserver(() => {
    runEngine();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // 3. 저장소 변경 감지 (단계 업데이트 대응)
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.activeShortcutTask) {
      runEngine();
    }
  });

  console.log("🤖 [Shortcut] 자동화 엔진이 이 페이지에서 작동 중입니다.");
})();