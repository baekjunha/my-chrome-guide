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
  if (listEl) listEl.textContent = "";
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
  if (listEl) listEl.textContent = "";
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
  const lang = store.state.currentLang;
  const strings = I18N[lang];
  
  // 내장 매크로의 경우 언어에 맞는 단계를 선택
  let steps = sc.steps;
  if (lang === LANG.EN && sc.steps_en) {
    steps = sc.steps_en;
  }

  // [고유 실행 ID 생성] 다중 창 동시 실행 시 상태 충돌 방지
  const executionId = Date.now();
  const taskKey = `macroTask_${executionId}`;

  const task = {
    id: sc.id,
    executionId: executionId,
    steps: steps,
    currentStepIndex: 0,
    startTime: Date.now()
  };
  
  // 전역 키가 아닌 고유 ID 키에 저장
  chrome.storage.local.set({ [taskKey]: task }, () => {
    // 해시 뒤에 고유 ID를 붙여 특정 창이 자신의 태스크를 식별하게 함
    const macroUrl = sc.url.includes('#') ? `${sc.url}-macro-active-${executionId}` : `${sc.url}#macro-active-${executionId}`;
    
    // 1. 완전히 새로운 창(New Window)을 생성하여 실행합니다.
    chrome.windows.create({ 
      url: macroUrl, 
      state: 'fullscreen',
      focused: true
    });
    
    showToast(strings.runningMacro);
  });
}

/**
 * 특정 매크로 1개를 개별적으로 추출하여 공유(다운로드)
 */
export function shareShortcut(sc) {
  if (!sc) return;
  const lang = store.state.currentLang;
  
  // 단일 매크로도 불러오기 로직과 호환되도록 배열로 감싸서 추출
  const dataStr = JSON.stringify([sc], null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  // 파일명 안전하게 처리
  const safeName = (sc.name || 'macro').replace(/[^a-z0-9가-힣]/gi, '_');
  
  a.href = url;
  a.download = `${safeName}_macro.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast(lang === LANG.KO 
    ? `'${sc.name}' 매크로가 개별 추출되었습니다.` 
    : `'${sc.name}' macro exported individually.`);
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
    guideEl.classList.toggle('expanded');
    return;
  }

  // 2. 관련 팁 펼치기 토글
  const relatedHeader = target.closest('.related-tips-header');
  if (relatedHeader) {
    e.preventDefault();
    e.stopPropagation();
    const relatedEl = relatedHeader.closest('.related-tips');
    relatedEl.classList.toggle('expanded');
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
    const id = parseInt(noteBtn.dataset.id);
    callbacks.onNoteClick(id, noteBtn); // [수정] 클릭된 버튼 엘리먼트 전달
    return;
  }

  // 6. 관련 팁 클릭
  const relatedItem = target.closest('.related-item');
  if (relatedItem) {
    e.stopPropagation();
    handleRelatedItemClick(parseInt(relatedItem.dataset.id));
    return;
  }

  // 7. 조회수 증가 및 중앙 정렬 (팁 아이템 본체 단순 클릭 시)
  const tipItem = target.closest('.tip-item');
  const isActionElement = target.closest('.fav-btn, .note-btn, .go-btn, .step-guide-header, .related-tips-header');
  
  if (tipItem && !isActionElement) {
    tipItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/**
 * 리스트 키보드 통합 핸들러 (Enter/Space 지원)
 */
export async function handleListKeydown(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleListClick(e);
  }
}

/**
 * 관련 팁 클릭 핸들러
 */
export function handleRelatedItemClick(targetId) {
  let targetEl = $(`.tip-item[data-id="${targetId}"]`);
  
  if (!targetEl) {
    // 팁이 현재 화면에 없거나 필터링되어 있음 -> 상태 초기화 후 강제 렌더링
    store.update({ 
      currentTab: TABS.ALL, 
      currentCategory: CATEGORY_ALL 
    }, false);
    
    const searchInput = $('#search');
    if (searchInput) searchInput.value = '';
    
    // UI 업데이트 시 targetId를 전달하여 페이징 무시하고 렌더링
    renderTips("", getRenderCallbacks(), false, targetId);

    // 렌더링 완료 후 강조 표시
    setTimeout(() => {
      targetEl = $(`.tip-item[data-id="${targetId}"]`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetEl.classList.add('highlight-impact');
        setTimeout(() => targetEl.classList.remove('highlight-impact'), 1200);
      }
    }, 150);
  } else {
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    targetEl.classList.add('highlight-impact');
    setTimeout(() => targetEl.classList.remove('highlight-impact'), 1200);
  }
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

let currentEditingSteps = [];

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
    currentEditingSteps = sc.steps ? JSON.parse(JSON.stringify(sc.steps)) : [];
  } else {
    store.update({ editingShortcutId: null }, false);
    $('#shortcut-modal-title').textContent = isKo ? '1클릭 매크로 설계' : 'Create 1-Click Macro';
    $('#sc-name').value = '';
    $('#sc-url').value = '';
    currentEditingSteps = [];
  }
  
  renderStepsEditor();
  openModal($('#shortcut-modal'));
}

export function renderStepsEditor() {
  const container = $('#sc-steps-container');
  if (!container) return;
  container.textContent = '';
  
  if (currentEditingSteps.length === 0) {
    container.insertAdjacentHTML('beforeend', `<div style="font-size:12px; color:var(--text-sub); text-align:center; padding: 20px 0;">녹화된 스텝이 없습니다.<br>녹화를 시작하거나 수동으로 추가하세요.</div>`);
    return;
  }

  currentEditingSteps.forEach((step, index) => {
    // For string-based steps from older versions
    if (typeof step === 'string') {
      step = { type: 'click', target: step };
      currentEditingSteps[index] = step;
    }

    const stepEl = document.createElement('div');
    stepEl.style.cssText = 'background: var(--accent-bg); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 8px; position: relative;';
    
    const headerEl = document.createElement('div');
    headerEl.style.cssText = 'display: flex; justify-content: space-between; align-items: center;';
    headerEl.insertAdjacentHTML('beforeend', `
      <span style="font-size: 12px; font-weight: 800; color: var(--accent);">Step ${index + 1}</span>
      <button class="delete-step-btn" data-index="${index}" style="background: none; border: none; color: #ef4444; font-size: 14px; cursor: pointer;">✕</button>
    `);

    const typeRow = document.createElement('div');
    typeRow.style.cssText = 'display: flex; gap: 8px; align-items: center;';
    typeRow.insertAdjacentHTML('beforeend', `
      <select class="step-type-sel" data-index="${index}" style="padding: 6px; border-radius: 6px; border: 1px solid var(--border); font-size: 11px; background: var(--bg); color: var(--text-main);">
        <option value="click" ${step.type === 'click' ? 'selected' : ''}>Click</option>
        <option value="input" ${step.type === 'input' ? 'selected' : ''}>Input</option>
        <option value="enter" ${step.type === 'enter' ? 'selected' : ''}>Enter</option>
        <option value="wait" ${step.type === 'wait' ? 'selected' : ''}>Wait</option>
      </select>
      <input type="text" class="step-target-in" data-index="${index}" value="${step.target || ''}" placeholder="대상 요소 식별자" style="flex: 1; padding: 6px; border-radius: 6px; border: 1px solid var(--border); font-size: 11px; background: var(--bg); color: var(--text-main);">
    `);

    const valueRow = document.createElement('div');
    if (step.type === 'input' || step.type === 'enter' || step.type === 'wait') {
      valueRow.style.cssText = 'display: flex; gap: 8px; align-items: center;';
      valueRow.insertAdjacentHTML('beforeend', `
        <input type="text" class="step-value-in" data-index="${index}" value="${step.value || ''}" placeholder="${step.type === 'wait' ? '대기 시간 (ms)' : '입력할 값'}" style="flex: 1; padding: 6px; border-radius: 6px; border: 1px solid var(--border); font-size: 11px; background: var(--bg); color: var(--text-main);">
      `);
    }

    const tooltipRow = document.createElement('div');
    tooltipRow.style.cssText = 'display: flex; gap: 8px; align-items: center;';
    tooltipRow.insertAdjacentHTML('beforeend', `
      <input type="text" class="step-tooltip-in" data-index="${index}" value="${step.tooltip || ''}" placeholder="가이드 툴팁 텍스트 (옵션)" style="flex: 1; padding: 6px; border-radius: 6px; border: 1px dashed var(--accent); font-size: 11px; background: var(--bg); color: var(--text-main);">
    `);

    stepEl.appendChild(headerEl);
    stepEl.appendChild(typeRow);
    if (valueRow.hasChildNodes()) stepEl.appendChild(valueRow);
    stepEl.appendChild(tooltipRow);
    container.appendChild(stepEl);
  });

  // Bind events
  $$('.delete-step-btn', container).forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.index);
      currentEditingSteps.splice(idx, 1);
      renderStepsEditor();
    });
  });

  const updateStep = (e, field) => {
    const idx = parseInt(e.currentTarget.dataset.index);
    currentEditingSteps[idx][field] = e.currentTarget.value;
    if (field === 'type') renderStepsEditor();
  };

  $$('.step-type-sel', container).forEach(el => el.addEventListener('change', e => updateStep(e, 'type')));
  $$('.step-target-in', container).forEach(el => el.addEventListener('input', e => updateStep(e, 'target')));
  $$('.step-value-in', container).forEach(el => el.addEventListener('input', e => updateStep(e, 'value')));
  $$('.step-tooltip-in', container).forEach(el => el.addEventListener('input', e => updateStep(e, 'tooltip')));
}

export function addManualStep() {
  currentEditingSteps.push({ type: 'click', target: '', value: '', tooltip: '' });
  renderStepsEditor();
  
  // Scroll to bottom
  setTimeout(() => {
    const container = $('#sc-steps-container');
    if (container) container.scrollTop = container.scrollHeight;
  }, 50);
}

export async function saveShortcut() {
  const name = $('#sc-name').value.trim();
  const url = $('#sc-url').value.trim();
  
  if (!name || !url) {
    showToast('이름과 URL을 모두 입력해주세요.');
    return;
  }

  const isEditing = store.state.editingShortcutId !== null;
  const newId = isEditing ? store.state.editingShortcutId : Date.now();
  
  const sc = {
    id: newId,
    name,
    url,
    workspace: store.state.currentWorkspace,
    steps: currentEditingSteps
  };

  let shortcuts = [...store.state.userShortcuts];
  if (isEditing) {
    const idx = shortcuts.findIndex(s => s.id === newId);
    if (idx !== -1) shortcuts[idx] = sc;
    else shortcuts.push(sc);
  } else {
    shortcuts.push(sc);
  }

  await store.update({ userShortcuts: shortcuts });
  showToast('저장되었습니다.');
  closeShortcutModal();
  
  // Refresh UI
  renderTips($('#search').value, getRenderCallbacks());
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
    workspace: store.state.currentWorkspace,
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
      state: 'fullscreen',
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
    },
    onShareShortcut: (sc) => shareShortcut(sc)
  };
}
