import { $, TABS, OS, LANG, CATEGORY_ALL } from './js/constants.js';
import { state } from './js/state.js';
import { tips, findRelatedTips } from './js/data.js';
import { I18N } from './js/i18n.js';
import { initCanvas, showToast, createParticleGroupAt } from './js/utils.js';
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
  openNoteModal, 
  openShortcutModal, 
  saveShortcut, 
  addStepInput,
  getRenderCallbacks,
  closeModal,
  openModal
} from './js/actions.js';

document.addEventListener('DOMContentLoaded', async () => {
  const data = await chrome.storage.local.get(['favs', 'os', 'dark', 'views', 'notes', 'lang', 'categoryOrder', 'userShortcuts']);

  const initialShortcuts = data.userShortcuts || [{
    id: 'example-1',
    name: '[예시] 네이버 메일 수신확인',
    url: 'https://www.naver.com',
    steps: ['메일', '보낸메일함', '수신확인']
  }];

  Object.assign(state, {
    favorites: data.favs || [],
    userShortcuts: initialShortcuts,
    currentOS: data.os || (navigator.platform.toUpperCase().indexOf('MAC') >= 0 ? OS.MAC : OS.WIN),
    isDark: data.dark || false,
    viewCounts: data.views || {},
    tipNotes: data.notes || {},
    currentLang: data.lang || LANG.KO,
    categoryOrder: data.categoryOrder || state.categoryOrder
  });

  applyTheme();
  applyLanguage();
  
  // Cache related tips
  tips.forEach(tip => state.relatedTipsCache.set(tip.id, findRelatedTips(tip.id)));

  buildCategoryNav((cat, btn) => handleCategoryClick(cat, btn));
  showDailyTip();
  renderTips("", getRenderCallbacks());
  setRandomPlaceholder();
  initCanvas();

  // Event Listeners
  $('#search').addEventListener('input', (e) => {
    clearTimeout(state.debounceTimer);
    state.debounceTimer = setTimeout(() => renderTips(e.target.value, getRenderCallbacks()), 300);
  });

  $('#dark-btn').addEventListener('click', () => {
    state.isDark = !state.isDark;
    applyTheme();
    chrome.storage.local.set({ dark: state.isDark });
  });

  $('#os-win').addEventListener('click', () => handleOSChange(OS.WIN));
  $('#os-mac').addEventListener('click', () => handleOSChange(OS.MAC));

  $('#lang-ko').addEventListener('click', () => handleLangChange(LANG.KO));
  $('#lang-en').addEventListener('click', () => handleLangChange(LANG.EN));

  $('#tab-all').addEventListener('click', () => { state.currentTab = TABS.ALL; switchTab(getRenderCallbacks()); });
  $('#tab-fav').addEventListener('click', () => { state.currentTab = TABS.FAV; switchTab(getRenderCallbacks()); });
  $('#tab-shortcuts').addEventListener('click', () => { state.currentTab = TABS.SHORTCUTS; switchTab(getRenderCallbacks()); });

  $('#stats-btn').addEventListener('click', openStatsModal);
  $('.stats-close').addEventListener('click', () => closeModal($('#stats-modal')));
  $('.note-close').addEventListener('click', () => closeModal($('#note-modal')));
  $('.shortcut-close').addEventListener('click', () => closeModal($('#shortcut-modal')));

  $('#add-shortcut-btn').addEventListener('click', () => openShortcutModal());
  $('#save-shortcut-btn').addEventListener('click', saveShortcut);
  $('#add-step-item-btn').addEventListener('click', () => addStepInput());

  $('.btn-save').addEventListener('click', saveNote);
  $('.btn-delete').addEventListener('click', deleteNote);

  $('#clear-btn').addEventListener('click', () => {
    $('#search').value = "";
    renderTips("", getRenderCallbacks());
  });

  $('#list').addEventListener('click', handleListClick);
});

async function handleListClick(e) {
  const callbacks = getRenderCallbacks();
  
  const copyableEl = e.target.closest('.shortcut.copyable');
  if (copyableEl) {
    e.stopPropagation();
    const text = copyableEl.dataset.copyText;
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(I18N[state.currentLang].copiedToast(text));
      });
    }
    return;
  }

  if (e.target.classList.contains('fav-btn')) {
    e.stopPropagation();
    const id = parseInt(e.target.dataset.id);
    const isAdding = !state.favorites.includes(id);
    if (isAdding) {
      const rect = e.target.getBoundingClientRect();
      createParticleGroupAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 'var(--accent-gold)');
    }
    callbacks.onFavClick(id, isAdding);
    return;
  }

  if (e.target.classList.contains('note-btn')) {
    e.stopPropagation();
    callbacks.onNoteClick(parseInt(e.target.dataset.id));
    return;
  }

  if (e.target.classList.contains('related-item')) {
    e.stopPropagation();
    const targetId = parseInt(e.target.dataset.id);
    let targetEl = $(`.tip-item[data-id="${targetId}"]`);
    if (!targetEl) {
      state.currentTab = TABS.ALL;
      state.currentCategory = CATEGORY_ALL;
      $('#search').value = '';
      switchTab(getRenderCallbacks());
      targetEl = $(`.tip-item[data-id="${targetId}"]`);
    }
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetEl.classList.add('highlight');
      setTimeout(() => targetEl.classList.remove('highlight'), 600);
    }
    return;
  }
  
  const tipItem = e.target.closest('.tip-item');
  if (tipItem && !e.target.closest('.fav-btn, .note-btn, .related-item, .go-btn')) {
    const id = parseInt(tipItem.dataset.id);
    if (!isNaN(id)) {
      state.viewCounts[id] = (state.viewCounts[id] || 0) + 1;
      chrome.storage.local.set({ views: state.viewCounts });
    }
  }
}

function openStatsModal() {
  const strings = I18N[state.currentLang];
  const sorted = Object.entries(state.viewCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  const body = $('#stats-body');
  if (sorted.length === 0) {
    body.innerHTML = `<div style="text-align:center; padding: 40px 0; color: var(--text-mute);">${strings.emptyStats}</div>`;
  } else {
    body.innerHTML = sorted.map(([id, count]) => {
      const tip = tips.find(t => t.id == id);
      if (!tip) return "";
      const title = state.currentLang === LANG.EN ? (tip.title_en || tip.title) : tip.title;
      return `
        <div class="stats-item">
          <span class="stats-tip-title">${title}</span>
          <span class="stats-count">${strings.views(count)}</span>
        </div>
      `;
    }).join("");
  }
  openModal($('#stats-modal'));
}