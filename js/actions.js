import { $, OS, LANG, TABS, CATEGORY_ALL } from './constants.js';
import { state } from './state.js';
import { I18N } from './i18n.js';
import { showToast } from './utils.js';
import { renderTips, applyLanguage, buildCategoryNav, showDailyTip, setRandomPlaceholder, switchTab, applyTheme, addDragDropHandlers, handleSearchClick } from './ui.js';

export { handleSearchClick };

export function handleOSChange(os) {
  if (state.currentOS === os) return;
  state.currentOS = os;
  chrome.storage.local.set({ os });
  $('#os-win').classList.toggle('active', os === OS.WIN);
  $('#os-mac').classList.toggle('active', os === OS.MAC);
  renderTips($('#search').value, getRenderCallbacks());
  showDailyTip();
}

export function handleLangChange(lang) {
  if (state.currentLang === lang) return;
  state.currentLang = lang;
  chrome.storage.local.set({ lang });
  applyLanguage();
  buildCategoryNav((cat, btn) => handleCategoryClick(cat, btn));
  showDailyTip();
  setRandomPlaceholder();
  renderTips($('#search').value, getRenderCallbacks());
}

export function handleCategoryClick(cat, btn) {
  state.currentCategory = cat;
  $('#cat-nav button.active')?.classList.remove('active');
  btn.classList.add('active');
  renderTips($('#search').value, getRenderCallbacks());
}

export function saveNote() {
  const note = $('#note-input').value.trim();
  const id = state.currentNoteId;
  if (!id) return;

  if (note) state.tipNotes[id] = note;
  else delete state.tipNotes[id];

  chrome.storage.local.set({ tipNotes: state.tipNotes }, () => {
    showToast(I18N[state.currentLang].noteSave);
    closeModal($('#note-modal'));
    renderTips($('#search').value, getRenderCallbacks());
  });
}

export function deleteNote() {
  const id = state.currentNoteId;
  if (!id) return;
  
  if (confirm(I18N[state.currentLang].confirmDeleteNote)) {
    delete state.tipNotes[id];
    chrome.storage.local.set({ tipNotes: state.tipNotes }, () => {
      showToast(I18N[state.currentLang].noteDelete);
      closeModal($('#note-modal'));
      renderTips($('#search').value, getRenderCallbacks());
    });
  }
}

export function runShortcut(sc) {
  const task = {
    id: sc.id,
    steps: sc.steps,
    currentStepIndex: 0,
    startTime: Date.now()
  };
  chrome.storage.local.set({ activeShortcutTask: task }, () => {
    chrome.tabs.create({ url: sc.url });
    showToast(state.currentLang === LANG.KO ? '지름길 실행 중...' : 'Running shortcut...');
  });
}

export function saveShortcut() {
  const name = $('#sc-name').value.trim();
  const url = $('#sc-url').value.trim();
  const stepInputs = document.querySelectorAll('.sc-step-input');
  const steps = Array.from(stepInputs).map(i => i.value.trim()).filter(v => v !== "");

  if (!name || !url) {
    showToast(state.currentLang === LANG.KO ? '이름과 URL을 입력해주세요.' : 'Please enter name and URL.');
    return;
  }

  if (state.editingShortcutId) {
    const index = state.userShortcuts.findIndex(s => s.id === state.editingShortcutId);
    if (index !== -1) state.userShortcuts[index] = { ...state.userShortcuts[index], name, url, steps };
  } else {
    state.userShortcuts.push({ id: Date.now(), name, url, steps });
  }

  chrome.storage.local.set({ userShortcuts: state.userShortcuts }, () => {
    closeShortcutModal();
    renderTips($('#search').value, getRenderCallbacks());
  });
}

export function openNoteModal(id) {
  state.currentNoteId = id;
  $('#note-input').value = state.tipNotes[id] || "";
  openModal($('#note-modal'));
}

export function openShortcutModal(sc = null) {
  const container = $('#sc-steps-container');
  container.innerHTML = '';
  if (sc) {
    state.editingShortcutId = sc.id;
    $('#shortcut-modal-title').textContent = state.currentLang === LANG.KO ? '🚀 지름길 수정하기' : '🚀 Edit Shortcut';
    $('#sc-name').value = sc.name;
    $('#sc-url').value = sc.url;
    sc.steps.forEach(s => addStepInput(s));
  } else {
    state.editingShortcutId = null;
    $('#shortcut-modal-title').textContent = state.currentLang === LANG.KO ? '🚀 자동 지름길 설계하기' : '🚀 Create Journey';
    $('#sc-name').value = '';
    $('#sc-url').value = '';
    addStepInput();
  }
  openModal($('#shortcut-modal'));
}

export function addStepInput(value = "") {
  const container = $('#sc-steps-container');
  const stepDiv = document.createElement('div');
  stepDiv.className = 'step-item';
  stepDiv.style.display = 'flex';
  stepDiv.style.alignItems = 'center';
  stepDiv.style.gap = '8px';
  stepDiv.style.marginBottom = '8px';
  stepDiv.innerHTML = `
    <span style="font-size: 11px; font-weight: 800; color: var(--accent); min-width: 45px;">${container.children.length + 1}단계</span>
    <input type="text" class="sc-step-input" placeholder="버튼 글자" value="${value}" style="flex: 1; padding: 8px 12px; font-size: 12px; border-radius: 10px; border: 1px solid var(--border); background: var(--input-bg); color: var(--text);">
    <button class="remove-step-btn" style="background: none; border: none; cursor: pointer; font-size: 14px; padding: 0 5px; color: var(--text-mute);">✕</button>
  `;
  stepDiv.querySelector('.remove-step-btn').onclick = () => { stepDiv.remove(); reorderSteps(); };
  container.appendChild(stepDiv);
}

function reorderSteps() {
  Array.from($('#sc-steps-container').children).forEach((c, i) => {
    c.querySelector('span').textContent = `${i + 1}단계`;
  });
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
  state.editingShortcutId = null;
}

export function getRenderCallbacks() {
  return {
    onFavClick: async (id, isAdding) => {
      if (isAdding) state.favorites.push(id);
      else state.favorites = state.favorites.filter(f => f !== id);
      await chrome.storage.local.set({ favs: state.favorites });
      renderTips($('#search').value, getRenderCallbacks());
    },
    onNoteClick: (id) => openNoteModal(id),
    onShortcutRun: (sc) => runShortcut(sc),
    onEditShortcut: (sc) => openShortcutModal(sc),
    onDeleteShortcut: async (sc) => {
      if (confirm(I18N[state.currentLang].confirmDeleteShortcut)) {
        state.userShortcuts = state.userShortcuts.filter(s => s.id !== sc.id);
        await chrome.storage.local.set({ userShortcuts: state.userShortcuts });
        renderTips($('#search').value, getRenderCallbacks());
      }
    }
  };
}
