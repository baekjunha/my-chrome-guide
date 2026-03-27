import { $, $$, OS, LANG, TABS, CATEGORY_ALL } from './constants.js';
import { store } from './store.js';
import { tips } from './data.js';
import { I18N } from './i18n.js';
import { ICONS } from './icons.js';
import { showToast, createFloatingText } from './utils.js';
import { 
  renderTips, 
  applyLanguage, 
  buildCategoryNav, 
  showDailyTip, 
  setRandomPlaceholder, 
  switchTab, 
  applyTheme 
} from './ui.js';

/**
 * OS 변경 핸들러
 */
export async function handleOSChange(os) {
  if (store.state.currentOS === os) return;
  await store.update({ currentOS: os });
  applyLanguage();
  const listEl = $('#list');
  if (listEl) listEl.innerHTML = "";
  renderTips($('#search').value, getRenderCallbacks());
  showDailyTip();
}

/**
 * 언어 변경 핸들러
 */
export async function handleLangChange(lang) {
  if (store.state.currentLang === lang) return;
  await store.update({ currentLang: lang });
  applyLanguage();
  buildCategoryNav((cat, btn) => handleCategoryClick(cat, btn));
  showDailyTip();
  setRandomPlaceholder();
  const listEl = $('#list');
  if (listEl) listEl.innerHTML = "";
  renderTips($('#search').value, getRenderCallbacks());
}

/**
 * 카테고리 클릭 핸들러
 */
export function handleCategoryClick(cat, btn) {
  // 카테고리 필터링 적용
  store.update({ currentCategory: cat }, false);
  
  // UI 업데이트: 모든 카테고리 버튼의 active 제거 후 클릭된 버튼만 추가
  $('#cat-nav button.active')?.classList.remove('active');
  if (btn) btn.classList.add('active');

  // 카테고리를 선택하면 자동으로 상단 탭을 '전체 팁(ALL)'으로 전환 (보관함/매크로 탭 방지)
  if (store.state.currentTab !== TABS.ALL) {
    store.update({ currentTab: TABS.ALL }, false);
    switchTab(getRenderCallbacks());
  } else {
    renderTips($('#search').value, getRenderCallbacks());
  }
}

/**
 * 메모 저장
 */
export async function saveNote() {
  const note = $('#note-input').value.trim();
  const id = store.state.currentNoteId;
  if (!id) return;

  const tipNotes = { ...store.state.tipNotes };
  if (note) tipNotes[id] = note;
  else delete tipNotes[id];

  await store.update({ tipNotes });
  showToast(I18N[store.state.currentLang].noteSave);
  closeModal($('#note-modal'));
  renderTips($('#search').value, getRenderCallbacks());
}

/**
 * 메모 삭제
 */
export async function deleteNote() {
  const id = store.state.currentNoteId;
  if (!id) return;
  
  if (confirm(I18N[store.state.currentLang].confirmDeleteNote)) {
    const tipNotes = { ...store.state.tipNotes };
    delete tipNotes[id];
    await store.update({ tipNotes });
    showToast(I18N[store.state.currentLang].noteDelete);
    closeModal($('#note-modal'));
    renderTips($('#search').value, getRenderCallbacks());
  }
}

/**
 * 매크로 실행
 */
export function runShortcut(sc) {
  const strings = I18N[store.state.currentLang];
  
  const task = {
    id: sc.id,
    steps: sc.steps,
    currentStepIndex: 0,
    startTime: Date.now()
  };
  
  chrome.storage.local.set({ activeShortcutTask: task }, () => {
    const macroUrl = sc.url.includes('#') ? `${sc.url}-macro-active` : `${sc.url}#macro-active`;
    
    // 매크로 실행은 가장 높은 관여도(10점) 부여
    if (sc.id && !isNaN(sc.id)) recordEngagement(parseInt(sc.id), 10);

    // 1. 완전히 새로운 창(New Window)을 생성하여 실행합니다.
    chrome.windows.create({ 
      url: macroUrl, 
      state: 'maximized',
      focused: true
    });
    
    showToast(strings.runningMacro);
  });
}

/**
 * 관여도 점수 기록 (통계용)
 * @param {number} id - 팁 ID
 * @param {number} score - 가중치 (1: 조회, 3: 가이드 확인, 5: 즐겨찾기, 10: 실행)
 */
export async function recordEngagement(id, score = 1) {
  if (!id || isNaN(id)) return;
  
  const newViews = { ...store.state.viewCounts };
  const currentScore = Number(newViews[id] || 0);
  newViews[id] = currentScore + score;
  
  await store.update({ viewCounts: newViews });
}

/**
 * 리스트 클릭 통합 핸들러 (이벤트 위임용)
 */
export async function handleListClick(e) {
  const callbacks = getRenderCallbacks();
  const target = e.target;
  
  // 1. 가이드 펼치기 토글
  const guideHeader = target.closest('.step-guide-header');
  if (guideHeader) {
    e.preventDefault();
    e.stopPropagation();
    const guideEl = guideHeader.closest('.step-guide');
    const isExpanding = !guideEl.classList.contains('expanded');
    guideEl.classList.toggle('expanded');
    
    // 가이드를 펼칠 때만 점수(3점) 부여
    if (isExpanding) {
      const tipItem = target.closest('.tip-item');
      if (tipItem) recordEngagement(parseInt(tipItem.dataset.id), 3);
    }
    return;
  }

  // 3. 즐겨찾기 버튼
  const favBtn = target.closest('.fav-btn');
  if (favBtn) {
    e.stopPropagation();
    const id = parseInt(favBtn.dataset.id);
    const isAdding = !store.state.favorites.includes(id);
    // 즐겨찾기 추가 시 점수(5점) 부여
    if (isAdding) recordEngagement(id, 5);
    callbacks.onFavClick(id, isAdding);
    return;
  }

  // 4. 메모 버튼
  const noteBtn = target.closest('.note-btn');
  if (noteBtn) {
    e.stopPropagation();
    const id = parseInt(noteBtn.dataset.id);
    // 메모 버튼 클릭 시 점수(2점) 부여
    recordEngagement(id, 2);
    callbacks.onNoteClick(id, noteBtn); // [수정] 클릭된 버튼 엘리먼트 전달
    return;
  }

  // 5. 관련 팁 클릭
  const relatedItem = target.closest('.related-item');
  if (relatedItem) {
    e.stopPropagation();
    handleRelatedItemClick(parseInt(relatedItem.dataset.id));
    return;
  }

  // 6. 설정/링크 이동 버튼 (직접 조작)
  const goBtn = target.closest('.go-btn');
  if (goBtn) {
    const tipItem = target.closest('.tip-item');
    if (tipItem) recordEngagement(parseInt(tipItem.dataset.id), 10); // 실행 점수 10점
    return;
  }
  
  // 7. 조회수 증가 (팁 아이템 본체 단순 클릭 시 - 1점)
  const tipItem = target.closest('.tip-item');
  const isActionElement = target.closest('.fav-btn, .note-btn, .go-btn, .step-guide-header');
  
  if (tipItem && !isActionElement) {
    recordEngagement(parseInt(tipItem.dataset.id), 1);
  }
}

/**
 * 관련 팁 클릭 핸들러
 */
export function handleRelatedItemClick(targetId) {
  const targetEl = $(`.tip-item[data-id="${targetId}"]`);
  
  if (!targetEl) {
    // 팁이 현재 화면에 없으면 브라우저 상태 초기화 (전체보기)
    store.update({ 
      currentTab: TABS.ALL, 
      currentCategory: CATEGORY_ALL 
    }, false);
    $('#search').value = '';
    switchTab(getRenderCallbacks());

    // 필터 초기화 후 렌더링이 완료될 시간을 벌기 위해 requestAnimationFrame 사용
    requestAnimationFrame(() => {
      const targetElAfter = $(`.tip-item[data-id="${targetId}"]`);
      if (targetElAfter) {
        targetElAfter.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetElAfter.classList.add('highlight');
        setTimeout(() => targetElAfter.classList.remove('highlight'), 600);
      }
    });
  } else {
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    targetEl.classList.add('highlight');
    setTimeout(() => targetEl.classList.remove('highlight'), 600);
  }

  // 관련 팁으로 이동한 경우도 관심으로 간주 (1점)
  recordEngagement(targetId, 1);
}

/**
 * 통계 모달 열기
 */
export function openStatsModal(e) {
  if (e) e.stopPropagation(); // 탭 전환 등 다른 클릭 이벤트 방지
  
  const lang = store.state.currentLang || LANG.KO;
  const strings = I18N[lang];
  
  // 조회수가 아닌 'Engagement Score' 기준으로 정렬
  const views = store.state.viewCounts || {};
  
  const sorted = Object.entries(views)
    .filter(([_, score]) => Number(score) > 0)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, 10);
  
  const body = $('#stats-list');
  if (!body) return;

  if (sorted.length === 0) {
    body.innerHTML = `<div style="text-align:center; padding: 40px 0; color: var(--text-mute);">${strings.emptyStats || "기록된 데이터가 없습니다."}</div>`;
  } else {
    body.innerHTML = sorted.map(([id, score], index) => {
      const tip = tips.find(t => String(t.id) === String(id));
      if (!tip) return "";
      const title = lang === LANG.EN ? (tip.title_en || tip.title) : tip.title;
      const catDisplayName = (I18N[lang].categories && I18N[lang].categories[tip.category]) || tip.category;
      
      return `
        <div class="stats-item">
          <span class="stats-rank">${index + 1}</span>
          <div class="stats-info">
            <div class="stats-title">${title}</div>
            <div class="stats-category">${catDisplayName}</div>
          </div>
          <span class="stats-views">${strings.views(score)}</span>
        </div>
      `;
    }).join("");
  }
  openModal($('#stats-modal'));
}

/**
 * 메모 모달 열기 (위치 동적 계산 추가)
 */
export function openNoteModal(id, triggerEl = null) {
  store.update({ currentNoteId: id }, false);
  $('#note-input').value = store.state.tipNotes[id] || "";
  
  const modal = $('#note-modal');
  const modalContent = modal.querySelector('.modal-content');

  // [최적화] 이전 스타일 초기화
  modal.style.alignItems = 'center';
  modalContent.style.marginTop = '0';

  if (triggerEl) {
    const rect = triggerEl.getBoundingClientRect();
    const popupHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const modalHeight = 260; // 모달 예상 높이

    // 뷰포트 기준 위치 + 스크롤 오프셋 → 페이지 절대 위치
    let top = rect.top + scrollTop - 20;

    // 화면 하단을 벗어나지 않도록 보정 (뷰포트 기준)
    const visibleBottom = scrollTop + popupHeight;
    if (top + modalHeight > visibleBottom - 20) {
      top = visibleBottom - modalHeight - 20;
    }
    if (top < scrollTop + 20) top = scrollTop + 20;

    modal.style.alignItems = 'flex-start';
    modalContent.style.marginTop = `${top}px`;
  }

  openModal(modal);
}

export function openShortcutModal(sc = null) {
  const isKo = store.state.currentLang === LANG.KO;
  const strings = I18N[store.state.currentLang];
  
  if ($('#record-btn-text')) {
    $('#record-btn-text').textContent = strings.startRecording;
  }

  // 보안 경고 추가
  $('#sc-security-warning')?.remove();
  const warningEl = document.createElement('div');
  warningEl.id = 'sc-security-warning';
  warningEl.style.cssText = 'color: #ef4444; font-size: 10px; padding: 0 20px 10px; font-weight: 700;';
  warningEl.textContent = strings.securityWarning;
  $('#shortcut-modal .modal-header').after(warningEl);

  if (sc) {
    store.update({ editingShortcutId: sc.id }, false);
    $('#shortcut-modal-title').textContent = isKo ? '매크로 수정하기' : 'Edit Macro';
    $('#sc-name').value = sc.name || '';
    $('#sc-url').value = sc.url || '';
  } else {
    store.update({ editingShortcutId: null }, false);
    $('#shortcut-modal-title').textContent = isKo ? '1클릭 매크로 설계' : 'Create 1-Click Macro';
    $('#sc-name').value = '';
    $('#sc-url').value = '';
  }
  openModal($('#shortcut-modal'));
}

export function openModal(modal) {
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
}

export function closeModal(modal) {
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
}

export function closeShortcutModal() {
  closeModal($('#shortcut-modal'));
  store.update({ editingShortcutId: null }, false);
}

export function startRecording() {
  const name = $('#sc-name').value.trim();
  const url = $('#sc-url').value.trim();
  const strings = I18N[store.state.currentLang];

  if (!url) {
    const msg = store.state.currentLang === LANG.KO ? '시작 URL을 입력해주세요.' : 'Please enter the start URL.';
    showToast(msg);
    return;
  }

  const recordingTask = {
    id: store.state.editingShortcutId, // Use existing ID if editing
    name: name || "Recorded Macro",
    url,
    steps: [],
    startTime: Date.now()
  };

  chrome.storage.local.set({ 
    recordingTask,
    isRecording: true 
  }, () => {
    const recordUrl = url.includes('#') ? `${url}-macro-record` : `${url}#macro-record`;
    
    chrome.windows.create({ 
      url: recordUrl, 
      state: 'maximized',
      focused: true
    });
    
    showToast(strings.recordingTitle);
    closeShortcutModal();
  });
}

/**
 * 렌더링 시 필요한 콜백 함수 셋 반환
 */
export function getRenderCallbacks() {
  return {
    onFavClick: async (id, isAdding) => {
      let favorites = [...store.state.favorites];
      if (isAdding) favorites.push(id);
      else favorites = favorites.filter(f => f !== id);
      await store.update({ favorites });
      renderTips($('#search').value, getRenderCallbacks());
    },
    onNoteClick: (id, el) => openNoteModal(id, el), // [수정] 트리거 엘리먼트 전달
    onShortcutRun: (sc) => runShortcut(sc),
    onEditShortcut: (sc) => openShortcutModal(sc),
    onDeleteShortcut: async (sc) => {
      if (confirm(I18N[store.state.currentLang].confirmDeleteShortcut)) {
        const userShortcuts = store.state.userShortcuts.filter(s => s.id !== sc.id);
        await store.update({ userShortcuts });
        renderTips($('#search').value, getRenderCallbacks());
      }
    }
  };
}
