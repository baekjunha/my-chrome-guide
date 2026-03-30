import { $, $$, TABS, OS, LANG } from './js/constants.js';
import { store } from './js/store.js';
import { initCanvas, showToast } from './js/utils.js';
import { 
  applyTheme, 
  applyLanguage, 
  buildCategoryNav, 
  showDailyTip, 
  renderTips,
  setRandomPlaceholder,
  switchTab,
  renderSkeletons
} from './js/ui.js';
import { 
  handleOSChange, 
  handleLangChange, 
  handleCategoryClick, 
  saveNote, 
  deleteNote, 
  openShortcutModal, 
  startRecording,
  getRenderCallbacks,
  closeModal,
  handleListClick,
  handleListKeydown
} from './js/actions.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. 초기 로딩 시 무거운 그래픽 연산 중단 클래스 추가
  document.body.classList.add('loading-phase');

  // 2. 데이터 로드 및 전처리 (관련 팁 캐싱 포함)
  await store.load();

  try {
    // 3. 즉시 반영 UI 렌더링
    applyTheme();
    applyLanguage();
    
    // 4. 무거운 작업들은 프레임을 나누어 실행 (버퍼링 방지)
    requestAnimationFrame(() => {
      buildCategoryNav((cat, btn) => handleCategoryClick(cat, btn));
      showDailyTip();
      setRandomPlaceholder();
      
      // [UX 확장] 초기 로딩 시 스켈레톤 노출
      renderSkeletons(3);
      
      // 팁 리스트 렌더링을 팝업 애니메이션 완료 후로 미룸 (약 200ms)
      setTimeout(() => {
        renderTips("", getRenderCallbacks());
        initCanvas();
        checkOnboarding();
        
        // [UX 개선] 검색창 자동 포커스
        const searchInput = $('#search');
        if (searchInput) searchInput.focus();
        
        requestAnimationFrame(() => {
          document.body.classList.remove('loading-phase');
        });
      }, 200);
    });
  } catch (err) {
    console.error("Initialization failed:", err);
  }

  // 5. 이벤트 리스너 통합 등록
  initEventListeners();
});

/**
 * 신규 사용자 온보딩 경험 (UX) 제어 함수
 */
function checkOnboarding() {
  if (!store.state.hasSeenOnboarding) {
    const modal = $('#onboarding-modal');
    if (modal) {
      modal.style.display = 'flex';
      // CSS 트랜지션을 위한 미세 딜레이
      setTimeout(() => modal.classList.add('show'), 10);
      
      const startBtn = $('#start-onboarding-btn');
      if (startBtn) {
        startBtn.addEventListener('click', () => {
          modal.classList.remove('show');
          setTimeout(() => modal.style.display = 'none', 300);
          
          store.update({ hasSeenOnboarding: true });
          
          // 매크로 탭으로 자동 이동시켜 경험 유도
          const shortcutTab = $('#tab-shortcuts');
          if (shortcutTab) shortcutTab.click();
        }, { once: true });
      }
    }
  }
}

/**
 * 모든 전역 이벤트 리스너 초기화
 */
function initEventListeners() {
  const callbacks = getRenderCallbacks();

  // 검색 입력 (디바운스 적용)
  $('#search').addEventListener('input', (e) => {
    clearTimeout(store.state.debounceTimer);
    const timer = setTimeout(() => renderTips(e.target.value, callbacks), 300);
    store.update({ debounceTimer: timer }, false);
  });

  $('#clear-btn').addEventListener('click', () => {
    $('#search').value = "";
    renderTips("", callbacks);
  });

  // 설정 토글 (테마, OS, 언어)
  $('#dark-btn').addEventListener('click', () => {
    store.update({ isDark: !store.state.isDark });
    applyTheme();
  });

  $('#os-win').addEventListener('click', () => handleOSChange(OS.WIN));
  $('#os-mac').addEventListener('click', () => handleOSChange(OS.MAC));
  $('#lang-ko').addEventListener('click', () => handleLangChange(LANG.KO));
  $('#lang-en').addEventListener('click', () => handleLangChange(LANG.EN));

  // 상단 탭 전환
  $('#tab-all').addEventListener('click', () => { 
    store.update({ currentTab: TABS.ALL }, false); 
    switchTab(callbacks); 
  });
  $('#tab-fav').addEventListener('click', () => { 
    store.update({ currentTab: TABS.FAV }, false); 
    switchTab(callbacks); 
  });
  $('#tab-shortcuts').addEventListener('click', () => { 
    store.update({ currentTab: TABS.SHORTCUTS }, false); 
    switchTab(callbacks); 
  });

  // 모달 관리
  $('.note-close').addEventListener('click', () => closeModal($('#note-modal')));
  $('.shortcut-close').addEventListener('click', () => closeModal($('#shortcut-modal')));

  // 매크로(지름길) 관리
  $('#add-shortcut-btn').addEventListener('click', () => openShortcutModal());
  $('#record-shortcut-btn').addEventListener('click', startRecording);

  // 매크로 백업/복구 기능 (Export / Import)
  const exportBtn = $('#macro-export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = JSON.stringify(store.state.userShortcuts, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "my_chrome_guide_macros.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(store.state.currentLang === LANG.KO ? '매크로가 안전하게 백업되었습니다.' : 'Macros exported successfully.');
    });
  }

  const importBtn = $('#macro-import-btn');
  const importFile = $('#macro-import-file');
  if (importBtn && importFile) {
    importBtn.addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const importedData = JSON.parse(event.target.result);
          if (!Array.isArray(importedData)) throw new Error("Invalid format: Not an array");
          
          const validMacros = importedData.filter(m => m.id && m.name && Array.isArray(m.steps));
          if (validMacros.length === 0) throw new Error("No valid macros found");

          const newShortcuts = [...store.state.userShortcuts];
          let addedCount = 0;
          
          validMacros.forEach(macro => {
             // 병합(Merge) 전략 적용: 기존 ID 겹침 방지
             let finalId = macro.id;
             while (newShortcuts.find(s => s.id === finalId)) {
               finalId = `${macro.id}-${Math.random().toString(36).substr(2, 5)}`;
             }
             newShortcuts.push({ ...macro, id: finalId });
             addedCount++;
          });
          
          await store.update({ userShortcuts: newShortcuts });
          
          // 현재 탭이 매크로 탭이면 리스트 재렌더링
          if (store.state.currentTab === TABS.SHORTCUTS) {
             renderTips("", callbacks);
          }
          
          showToast(store.state.currentLang === LANG.KO ? `${addedCount}개의 매크로를 성공적으로 불러왔습니다!` : `${addedCount} macros imported successfully!`);
        } catch (error) {
          console.error('[Import Error]', error);
          showToast(store.state.currentLang === LANG.KO ? '파일 형식이 올바르지 않습니다.' : 'Invalid file format.', true);
        }
        importFile.value = ''; 
      };
      reader.readAsText(file);
    });
  }

  // 메모 관리
  $('#note-save-btn').addEventListener('click', saveNote);
  $('#note-delete-btn').addEventListener('click', deleteNote);

  // 리스트 클릭 통합 핸들러 (이벤트 위임)
  $('#list').addEventListener('click', handleListClick);
  $('#list').addEventListener('keydown', handleListKeydown);

  // [UX 확장] 키보드 내비게이션 (ArrowUp, ArrowDown)
  window.addEventListener('keydown', (e) => {
    const active = document.activeElement;
    const isSearchFocused = active.id === 'search';
    const items = Array.from($$('.tip-item, .widget-card, .suggestion-chip, .nav button'));
    
    if (items.length === 0 && !isSearchFocused) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (isSearchFocused) {
        items[0]?.focus();
      } else {
        const idx = items.indexOf(active);
        if (idx < items.length - 1) items[idx + 1].focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = items.indexOf(active);
      if (idx === 0) {
        $('#search').focus();
      } else if (idx > 0) {
        items[idx - 1].focus();
      }
    }
    // Enter/Space는 요소 자체의 이벤트 리스너(handleListKeydown 등)에서 처리되도록 유도
  });
}
