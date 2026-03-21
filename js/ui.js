import { $, TABS, CATEGORY_ALL, LANG } from './constants.js';
import { state } from './state.js';
import { I18N } from './i18n.js';
import { tips, findRelatedTips } from './data.js';

export function applyTheme() {
  document.body.classList.toggle('dark', state.isDark);
  $('#dark-btn').textContent = state.isDark ? '☀️' : '🌙';

  const accentColor = state.isDark ? '#669df6' : '#4285f4';
  const dailyTo = state.isDark ? '#34a853' : '#0f9d58';

  document.documentElement.style.setProperty('--accent', accentColor);
  document.documentElement.style.setProperty('--daily-from', accentColor);
  document.documentElement.style.setProperty('--daily-to', dailyTo);
}

export function applyLanguage() {
  const lang = state.currentLang;
  const strings = I18N[lang];

  $('#lang-ko').classList.toggle('active', lang === LANG.KO);
  $('#lang-en').classList.toggle('active', lang === LANG.EN);

  $('#daily-label').textContent = strings.dailyLabel;
  $('#tab-all').textContent = strings.allTips;
  $('#tab-fav').textContent = strings.myLibrary;
  $('#tab-shortcuts').textContent = strings.myShortcuts;
  $('#stats-btn').title = strings.statsBtnTitle;
  $('#dark-btn').title = strings.darkMode;
  $('#daily-title').textContent = strings.loading;
  $('#clear-btn').title = strings.clearSearchTitle;

  $('#stats-modal h3').textContent = strings.statsModalTitle;
  $('#note-input').placeholder = strings.noteInputPlaceholder;
  $('.btn-delete').textContent = strings.noteDelete;
  $('.btn-save').textContent = strings.noteSave;
}

export function buildCategoryNav(onCategoryClick) {
  const nav = $('#cat-nav');
  nav.innerHTML = "";
  const lang = state.currentLang;
  const categoryStrings = I18N[lang].categories;

  state.categoryOrder.forEach(catKey => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = categoryStrings[catKey] || catKey;
    btn.dataset.cat = catKey;
    btn.draggable = true;
    
    if (catKey === state.currentCategory) btn.classList.add('active');

    btn.onclick = () => onCategoryClick(catKey, btn);
    nav.appendChild(btn);
  });

  addDragDropHandlers(nav, (src, dest) => {
    state.categoryOrder.splice(state.categoryOrder.indexOf(src), 1);
    state.categoryOrder.splice(state.categoryOrder.indexOf(dest), 0, src);
    chrome.storage.local.set({ categoryOrder: state.categoryOrder });
    buildCategoryNav(onCategoryClick);
  });
}

export function showDailyTip() {
  const contentEl = $('#daily-content');
  const titleEl = $('#daily-title');
  const shortcutEl = $('#daily-shortcut');

  contentEl.classList.add('fade-out');
  contentEl.classList.remove('fade-in');

  setTimeout(() => {
    const now = new Date();
    const lang = state.currentLang;
    const titleKey = lang === LANG.EN ? 'title_en' : 'title';

    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const pool = tips.filter(tip => tip.category !== '이스터에그');
    const t = pool[dayOfYear % pool.length];
    titleEl.innerText = t[titleKey] || t.title;

    const shortcutObj = (lang === LANG.EN && t.shortcut_en) ? t.shortcut_en : t.shortcut;
    shortcutEl.innerText = (shortcutObj && shortcutObj[state.currentOS]) || "";
    contentEl.classList.remove('fade-out');
    contentEl.classList.add('fade-in');
  }, 300);
}

export function renderTips(filter = "", { onFavClick, onNoteClick, onShortcutRun, onEditShortcut, onDeleteShortcut } = {}) {
  const listEl = $('#list');
  listEl.innerHTML = "";
  const strings = I18N[state.currentLang];

  if (state.currentTab === TABS.SHORTCUTS) {
    renderShortcuts(onShortcutRun, onEditShortcut, onDeleteShortcut);
    return;
  }

  let pool = state.currentTab === TABS.ALL ? tips : tips.filter(t => state.favorites.includes(t.id));
  if (state.currentCategory !== CATEGORY_ALL) {
    pool = pool.filter(t => t.category === state.currentCategory);
  }

  const lang = state.currentLang;
  const searchLow = filter.toLowerCase();

  const filtered = pool.filter(t => {
    const title = (lang === LANG.EN && t.title_en) ? t.title_en : t.title;
    const desc = (lang === LANG.EN && t.desc_en) ? t.desc_en : t.desc;
    const searchTags = (lang === LANG.EN && t.tags_en) ? t.tags_en : t.tags;
    return (
      title.toLowerCase().includes(searchLow) ||
      desc.toLowerCase().includes(searchLow) ||
      searchTags.some(tag => tag.toLowerCase().includes(searchLow))
    );
  });

  if (filtered.length === 0) {
    listEl.innerHTML = `<div class="empty-msg">${state.currentTab === TABS.FAV ? strings.emptyFav : strings.emptySearch}</div>`;
    return;
  }

  filtered.forEach(tip => {
    const isFav = state.favorites.includes(tip.id);
    const div = document.createElement('div');
    div.className = 'tip-item' + (tip.category === '이스터에그' ? ' actionable' : '');
    div.dataset.id = tip.id;

    const titleKey = lang === LANG.EN ? 'title_en' : 'title';
    const descKey = lang === LANG.EN ? 'desc_en' : 'desc';
    const shortcutObj = (lang === LANG.EN && tip.shortcut_en) ? tip.shortcut_en : tip.shortcut;
    const shortcutText = (shortcutObj && shortcutObj[state.currentOS]) || "";
    
    let shortcutHTML;
    const isSearchableEasterEgg = tip.category === '이스터에그' && (shortcutText.includes('검색') || shortcutText.includes('Search')) && !tip.link;

    if (isSearchableEasterEgg) {
      const match = shortcutText.match(/'([^']+)'/);
      const textToCopy = match ? match[1] : '';
      shortcutHTML = textToCopy 
        ? `<div class="shortcut copyable" title="${strings.copyShortcutTitle}" data-copy-text="${textToCopy}">${shortcutText}</div>`
        : `<div class="shortcut">${shortcutText}</div>`;
    } else {
      shortcutHTML = `<div class="shortcut">${shortcutText}</div>`;
    }

    div.innerHTML = `
      <div class="tip-category">${I18N[lang].categories[tip.category] || tip.category}</div>
      <div class="tip-title">${tip[titleKey] || tip.title}</div>
      <div class="tip-desc">${tip[descKey] || tip.desc}</div>
      ${shortcutHTML}
      <span class="fav-btn" data-id="${tip.id}">${isFav ? '⭐' : '☆'}</span>
      <button class="note-btn" data-id="${tip.id}" title="${strings.writeNoteTitle}">📝</button>
    `;

    createActionButtons(tip, div);

    const related = state.relatedTipsCache.get(tip.id) || [];
    if (related.length > 0) {
      const relatedSection = document.createElement('div');
      relatedSection.className = 'related-tips';
      relatedSection.innerHTML = `
        <div class="related-label">${strings.relatedTipsLabel}</div>
        <div class="related-list">
          ${related.map(r => `<span class="related-item" data-id="${r.id}">${r[titleKey] || r.title}</span>`).join('')}
        </div>
      `;
      div.appendChild(relatedSection);
    }
    listEl.appendChild(div);
  });
}

function renderShortcuts(onShortcutRun, onEditShortcut, onDeleteShortcut) {
  const listEl = $('#list');
  const strings = I18N[state.currentLang];
  
  if (state.userShortcuts.length === 0) {
    listEl.innerHTML = `<div class="empty-msg">${strings.emptyShortcuts}</div>`;
    return;
  }

  state.userShortcuts.forEach(sc => {
    const div = document.createElement('div');
    div.className = 'tip-item';
    div.innerHTML = `
      <div class="tip-category">USER SHORTCUT</div>
      <div class="tip-title">${sc.name}</div>
      <div class="tip-desc">${sc.url}</div>
      <div class="shortcut">${sc.steps.join(' → ')}</div>
      <div style="position: absolute; right: 18px; top: 18px; display: flex; gap: 10px;">
        <span class="edit-sc" data-id="${sc.id}" title="수정" style="cursor:pointer; font-size: 18px;">✏️</span>
        <span class="delete-sc" data-id="${sc.id}" title="삭제" style="cursor:pointer; font-size: 18px;">🗑️</span>
      </div>
      <button class="go-btn" style="margin-top: 14px; background: var(--accent);">${strings.runShortcut}</button>
    `;
    
    div.querySelector('.edit-sc').onclick = (e) => { e.stopPropagation(); onEditShortcut(sc); };
    div.querySelector('.delete-sc').onclick = (e) => { e.stopPropagation(); onDeleteShortcut(sc); };
    div.querySelector('.go-btn').onclick = () => onShortcutRun(sc);
    listEl.appendChild(div);
  });
}

function createActionButtons(tip, div) {
  const lang = state.currentLang;
  const shortcutObj = (lang === LANG.EN && tip.shortcut_en) ? tip.shortcut_en : tip.shortcut;
  const shortcutText = (shortcutObj && shortcutObj[state.currentOS]) || "";
  const strings = I18N[state.currentLang];
  
  const chromeUrlMatch = shortcutText && shortcutText.match(/chrome:\/\/[^\s]+/);
  if (chromeUrlMatch) {
    const url = chromeUrlMatch[0];
    const btn = document.createElement('button');
    btn.className = 'go-btn';
    btn.innerText = strings.goToAction;
    btn.onclick = (e) => { e.stopPropagation(); chrome.tabs.create({ url: url }); };
    div.appendChild(btn);
    return;
  }

  if (shortcutText && (shortcutText.includes('[키워드]') || shortcutText.includes('[keyword]'))) {
    const btn = document.createElement('button');
    btn.className = 'go-btn';
    btn.innerText = strings.goToSettings;
    btn.onclick = (e) => { e.stopPropagation(); chrome.tabs.create({ url: 'chrome://settings/searchEngines' }); };
    div.appendChild(btn);
    return;
  }

  if (tip.link) {
    const btn = document.createElement('button');
    btn.className = 'go-btn';
    btn.innerText = strings.goToAction;
    btn.onclick = (e) => { e.stopPropagation(); chrome.tabs.create({ url: tip.link }); };
    div.appendChild(btn);
  }
}

export function setRandomPlaceholder() {
  const placeholders = I18N[state.currentLang].searchPlaceholders;
  const randomText = placeholders[Math.floor(Math.random() * placeholders.length)];
  $('#search').placeholder = randomText;
}

export function switchTab(callbacks) {
  $('#tab-all').classList.toggle('active', state.currentTab === TABS.ALL);
  $('#tab-fav').classList.toggle('active', state.currentTab === TABS.FAV);
  $('#tab-shortcuts').classList.toggle('active', state.currentTab === TABS.SHORTCUTS);
  
  const isShortcuts = state.currentTab === TABS.SHORTCUTS;
  $('#cat-nav').style.display = isShortcuts ? 'none' : 'flex';
  $('#shortcut-controls').style.display = isShortcuts ? 'block' : 'none';
  $('.search-wrapper').style.display = isShortcuts ? 'none' : 'block';
  
  renderTips($('#search').value, callbacks);
}

export function handleSearchClick(e) {
  if (e.target.value === "") {
    setRandomPlaceholder();
  }
}

let draggedItem = null;
export function addDragDropHandlers(container, onDrop) {
  if (container.dataset.dragInit) return;
  container.dataset.dragInit = 'true';

  container.addEventListener('dragstart', e => {
    if (e.target.tagName === 'BUTTON') {
      draggedItem = e.target;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', e.target.dataset.cat);
      setTimeout(() => e.target.classList.add('dragging'), 0);
    }
  });

  container.addEventListener('dragend', e => {
    if (draggedItem) {
      draggedItem.classList.remove('dragging');
      draggedItem = null;
    }
    container.querySelectorAll('button').forEach(btn => btn.classList.remove('drag-over'));
  });

  container.addEventListener('dragover', e => {
    e.preventDefault();
    const target = e.target.closest('button');
    if (target && target !== draggedItem) {
      container.querySelectorAll('button').forEach(btn => btn.classList.remove('drag-over'));
      target.classList.add('drag-over');
    }
  });
  
  container.addEventListener('dragleave', e => {
    const target = e.target.closest('button');
    if (target) target.classList.remove('drag-over');
  });

  container.addEventListener('drop', async e => {
    e.preventDefault();
    const target = e.target.closest('button');
    if (target && draggedItem && target !== draggedItem) {
      onDrop(draggedItem.dataset.cat, target.dataset.cat);
    }
    container.querySelectorAll('button').forEach(btn => btn.classList.remove('drag-over'));
  });
}
