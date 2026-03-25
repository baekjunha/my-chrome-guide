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
  store.update({ currentCategory: cat }, false);
  $('#cat-nav button.active')?.classList.remove('active');
  btn.classList.add('active');
  renderTips($('#search').value, getRenderCallbacks());
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
    
    // 1. 완전히 새로운 창(New Window)을 생성하여 실행합니다.
    // 기존의 작은 창 영향에서 완전히 벗어날 수 있습니다.
    chrome.windows.create({ 
      url: macroUrl, 
      state: 'maximized', // 생성과 동시에 최대화
      focused: true       // 즉시 포커스
    });
    
    showToast(strings.runningMacro);
  });
}

/**
 * 조회수 기록 (통계용)
 */
export async function recordView(id) {
  if (!id || isNaN(id)) return;
  
  const newViews = { ...store.state.viewCounts };
  const currentCount = Number(newViews[id] || 0);
  newViews[id] = currentCount + 1;
  
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
    guideHeader.closest('.step-guide')?.classList.toggle('expanded');
    // 가이드를 보는 것도 관심이 있는 것이므로 조회수 기록
    const tipItem = target.closest('.tip-item');
    if (tipItem) recordView(parseInt(tipItem.dataset.id));
    return;
  }

  // 3. 즐겨찾기 버튼
  const favBtn = target.closest('.fav-btn');
  if (favBtn) {
    e.stopPropagation();
    const id = parseInt(favBtn.dataset.id);
    const isAdding = !store.state.favorites.includes(id);
    callbacks.onFavClick(id, isAdding);
    return;
  }

  // 4. 메모 버튼
  const noteBtn = target.closest('.note-btn');
  if (noteBtn) {
    e.stopPropagation();
    callbacks.onNoteClick(parseInt(noteBtn.dataset.id));
    return;
  }

  // 5. 관련 팁 클릭
  const relatedItem = target.closest('.related-item');
  if (relatedItem) {
    e.stopPropagation();
    handleRelatedItemClick(parseInt(relatedItem.dataset.id));
    return;
  }
  
  // 6. 조회수 증가 (팁 아이템 본체 클릭 시)
  const tipItem = target.closest('.tip-item');
  // 액션 버튼이 아닌 곳을 클릭했을 때만 기록 (중복 기록 방지)
  const isActionElement = target.closest('.fav-btn, .note-btn, .go-btn');
  
  if (tipItem && !isActionElement) {
    recordView(parseInt(tipItem.dataset.id));
  }
}

/**
 * 관련 팁 클릭 핸들러
 */
export function handleRelatedItemClick(targetId) {
  let targetEl = $(`.tip-item[data-id="${targetId}"]`);
  
  if (!targetEl) {
    store.update({ 
      currentTab: TABS.ALL, 
      currentCategory: CATEGORY_ALL 
    }, false);
    $('#search').value = '';
    switchTab(getRenderCallbacks());
    targetEl = $(`.tip-item[data-id="${targetId}"]`);
  }

  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    targetEl.classList.add('highlight');
    // 이동한 팁의 조회수도 기록
    recordView(targetId);
    setTimeout(() => targetEl.classList.remove('highlight'), 600);
  }
}

/**
 * 통계 모달 열기
 */
export function openStatsModal(e) {
  if (e) e.stopPropagation(); // 탭 전환 등 다른 클릭 이벤트 방지
  
  const lang = store.state.currentLang || LANG.KO;
  const strings = I18N[lang];
  
  // 조회수 데이터 안전하게 로드
  const views = store.state.viewCounts || {};
  
  const sorted = Object.entries(views)
    .filter(([_, count]) => Number(count) > 0)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, 10);
  
  const body = $('#stats-list');
  if (!body) return;

  if (sorted.length === 0) {
    body.innerHTML = `<div style="text-align:center; padding: 40px 0; color: var(--text-mute);">${strings.emptyStats || "기록된 데이터가 없습니다."}</div>`;
  } else {
    body.innerHTML = sorted.map(([id, count], index) => {
      const tip = tips.find(t => String(t.id) === String(id));
      if (!tip) return "";
      const isEnglish = lang === LANG.EN;
      const title = isEnglish ? (tip.title_en || tip.title) : tip.title;
      // 카테고리 매칭 (영문의 경우 한글 키로 검색)
      const catKey = tip.category;
      const catDisplayName = (I18N[lang].categories && I18N[lang].categories[catKey]) || catKey;
      
      return `
        <div class="stats-item">
          <span class="stats-rank">${index + 1}</span>
          <div class="stats-info">
            <div class="stats-title">${title}</div>
            <div class="stats-category">${catDisplayName}</div>
          </div>
          <span class="stats-views">${strings.views(count)}</span>
        </div>
      `;
    }).join("");
  }
  openModal($('#stats-modal'));
}

export function openNoteModal(id) {
  store.update({ currentNoteId: id }, false);
  $('#note-input').value = store.state.tipNotes[id] || "";
  openModal($('#note-modal'));
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
    onNoteClick: (id) => openNoteModal(id),
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
