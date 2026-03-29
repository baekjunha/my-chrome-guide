import { $, TABS, OS, LANG } from './js/constants.js';
import { store } from './js/store.js';
import { initCanvas } from './js/utils.js';
import { 
  applyTheme, 
  applyLanguage, 
  buildCategoryNav, 
  showDailyTip, 
  renderTips, 
  setRandomPlaceholder,
  switchTab 
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
  handleListClick
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
      
      // 팁 리스트 렌더링을 팝업 애니메이션 완료 후로 미룸 (약 200ms)
      setTimeout(() => {
        renderTips("", getRenderCallbacks());
        initCanvas();
        
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

  // 메모 관리
  $('#note-save-btn').addEventListener('click', saveNote);
  $('#note-delete-btn').addEventListener('click', deleteNote);

  // 리스트 클릭 통합 핸들러 (이벤트 위임)
  $('#list').addEventListener('click', handleListClick);
}
