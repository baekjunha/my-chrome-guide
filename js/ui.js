import { $, $$, TABS, CATEGORY_ALL, LANG, OS } from './constants.js';
import { store } from './store.js';
import { I18N } from './i18n.js';
import { tips } from './data.js';
import { ICONS } from './icons.js';

export function applyTheme() {
  const body = document.body;
  if (!body) return;
  body.classList.toggle('dark', store.state.isDark);
  const darkBtn = $('#dark-btn');
  if (darkBtn) {
    darkBtn.innerHTML = store.state.isDark ? ICONS.sun : ICONS.moon;
  }
}

export function applyLanguage() {
  const lang = store.state.currentLang;
  const strings = I18N[lang];
  if (!strings) return;

  // OS 및 언어 토글 활성 상태
  $('#os-win')?.classList.toggle('active', store.state.currentOS === 'win');
  $('#os-mac')?.classList.toggle('active', store.state.currentOS === 'mac');
  $('#lang-ko')?.classList.toggle('active', lang === LANG.KO);
  $('#lang-en')?.classList.toggle('active', lang === LANG.EN);

  // 헤더 및 내비게이션 아이콘
  if ($('#header-logo')) $('#header-logo').innerHTML = ICONS.logo;
  
  const dailyLabel = $('#daily-label');
  if (dailyLabel) dailyLabel.innerHTML = `<span class="svg-icon">${ICONS.sparkles}</span>${strings.dailyLabel}`;

  if ($('#tab-all')) $('#tab-all').textContent = strings.allTips;
  
  const tabFav = $('#tab-fav');
  if (tabFav) tabFav.innerHTML = `<span class="svg-icon" style="margin-right: 4px;">${ICONS.star}</span>${strings.myLibrary}`;
  
  const tabShortcuts = $('#tab-shortcuts');
  if (tabShortcuts) tabShortcuts.innerHTML = `<span class="svg-icon">${ICONS.rocket}</span>${strings.myShortcuts}`;
  
  const statsBtn = $('#stats-btn');
  if (statsBtn) {
    statsBtn.title = strings.statsBtnTitle;
    statsBtn.setAttribute('aria-label', strings.statsBtnTitle);
    statsBtn.innerHTML = ICONS.stats;
  }
  
  const darkBtn = $('#dark-btn');
  if (darkBtn) {
    darkBtn.title = strings.darkMode;
    darkBtn.setAttribute('aria-label', strings.darkMode);
  }
  if ($('#daily-title')) $('#daily-title').textContent = strings.loading;
  
  const clearBtn = $('#clear-btn');
  if (clearBtn) {
    clearBtn.title = strings.clearSearchTitle;
    clearBtn.setAttribute('aria-label', strings.clearSearchTitle);
    clearBtn.innerHTML = ICONS.close;
  }

  // 모달 닫기 버튼들 일괄 적용
  $$('.modal-close').forEach(el => el.innerHTML = ICONS.close);

  // 새 매크로 만들기 버튼 아이콘
  const addShortcutBtn = $('#add-shortcut-btn');
  if (addShortcutBtn) {
    addShortcutBtn.innerHTML = `<span>${strings.addShortcut || '🔴 매크로 녹화하기'}</span>`;
    addShortcutBtn.style.background = 'var(--accent)';
    addShortcutBtn.style.color = 'white';
    addShortcutBtn.style.border = 'none';
  }

  // 모달 정보 및 아이콘
  $$('#stats-icon').forEach(el => el.innerHTML = ICONS.stats);
  if ($('#stats-modal-title')) $('#stats-modal-title').textContent = strings.statsModalTitle;
  
  $$('.sc-tag-icon').forEach(el => el.innerHTML = ICONS.tag);
  $$('.sc-globe-icon').forEach(el => el.innerHTML = ICONS.globe);
  $$('.sc-bot-icon').forEach(el => el.innerHTML = ICONS.bot);
  $$('.sc-rocket-icon').forEach(el => el.innerHTML = ICONS.rocket);
  $$('.sc-lightbulb-icon').forEach(el => el.innerHTML = ICONS.lightbulb);
  $$('.sc-pencil-icon').forEach(el => el.innerHTML = ICONS.pencil);

  if ($('#note-input')) $('#note-input').placeholder = strings.noteInputPlaceholder;
  if ($('#note-delete-btn')) $('#note-delete-btn').textContent = strings.noteDelete;
  if ($('#note-save-btn')) $('#note-save-btn').textContent = strings.noteSave;
}

export function buildCategoryNav(onCategoryClick) {
  const nav = $('#cat-nav');
  nav.innerHTML = "";
  const lang = store.state.currentLang;
  const categoryStrings = I18N[lang].categories;

  store.state.categoryOrder.forEach(catKey => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = categoryStrings[catKey] || catKey;
    btn.dataset.cat = catKey;
    btn.draggable = true;

    if (catKey === store.state.currentCategory) btn.classList.add('active');
    
    btn.addEventListener('click', () => onCategoryClick(catKey, btn));
    nav.appendChild(btn);
  });

  addDragDropHandlers(nav, (from, to) => {
    const newOrder = [...store.state.categoryOrder];
    const fromIdx = newOrder.indexOf(from);
    const toIdx = newOrder.indexOf(to);
    newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, from);
    store.update({ categoryOrder: newOrder });
    buildCategoryNav(onCategoryClick);
  });
}

export function showDailyTip() {
  const contentEl = $('#daily-content');
  const titleEl = $('#daily-title');
  const shortcutEl = $('#daily-shortcut');

  if (!contentEl) return;

  contentEl.classList.add('fade-out');
  contentEl.classList.remove('fade-in');

  setTimeout(() => {
    const now = new Date();
    const lang = store.state.currentLang;
    const titleKey = lang === LANG.EN ? 'title_en' : 'title';

    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const pool = tips.filter(tip => tip.category !== '이스터에그');
    if (pool.length === 0) return;

    const t = pool[dayOfYear % pool.length];
    titleEl.innerText = t[titleKey] || t.title || "";

    const shortcutObj = (lang === LANG.EN && t.shortcut_en) ? t.shortcut_en : t.shortcut;
    const shortcutText = (shortcutObj && shortcutObj[store.state.currentOS]) || "";
    shortcutEl.innerText = shortcutText;

    contentEl.classList.remove('fade-out');
    contentEl.classList.add('fade-in');
  }, 300);
}

export function renderTips(filter = "", { onFavClick, onNoteClick, onShortcutRun, onEditShortcut, onDeleteShortcut } = {}) {
  const listEl = $('#list');
  if (!listEl) return;
  listEl.innerHTML = "";
  
  const strings = I18N[store.state.currentLang];
  const lang = store.state.currentLang;
  const currentOS = store.state.currentOS;
  const searchLow = filter.toLowerCase().trim();

  if (store.state.currentTab === TABS.SHORTCUTS) {
    renderShortcuts(onShortcutRun, onEditShortcut, onDeleteShortcut);
    return;
  }

  const fragment = document.createDocumentFragment();
  let visibleCount = 0;

  tips.forEach(tip => {
    const matchesTab = store.state.currentTab === TABS.ALL || store.state.favorites.includes(tip.id);
    const matchesCat = store.state.currentCategory === CATEGORY_ALL || tip.category === store.state.currentCategory;
    
    const titleKO = (tip.title || "").toLowerCase();
    const titleEN = (tip.title_en || "").toLowerCase();
    const descKO = (tip.desc || "").toLowerCase();
    const descEN = (tip.desc_en || "").toLowerCase();
    const tagsKO = (tip.tags || []).join(',').toLowerCase();
    const tagsEN = (tip.tags_en || []).join(',').toLowerCase();
    
    // 공백 없는 버전으로도 검색 가능하게 (예: "새 탭" -> "새탭")
    const searchLowNoSpace = searchLow.replace(/\s/g, "");
    const titleKONoSpace = titleKO.replace(/\s/g, "");
    const titleENNoSpace = titleEN.replace(/\s/g, "");

    const matchesSearch = !searchLow || 
      titleKO.includes(searchLow) || titleEN.includes(searchLow) ||
      titleKONoSpace.includes(searchLowNoSpace) || titleENNoSpace.includes(searchLowNoSpace) ||
      descKO.includes(searchLow) || descEN.includes(searchLow) ||
      tagsKO.includes(searchLow) || tagsEN.includes(searchLow);

    const title = (lang === LANG.EN && tip.title_en) ? tip.title_en : (tip.title || "");
    let desc = (lang === LANG.EN && tip.desc_en) ? tip.desc_en : (tip.desc || "");
    
    if (currentOS === OS.MAC) {
      desc = desc.replace(/Ctrl/g, 'Cmd').replace(/Win/g, 'Cmd').replace(/Alt/g, 'Option');
    } else {
      desc = desc.replace(/Cmd/g, 'Ctrl').replace(/Option/g, 'Alt');
    }

    if (matchesTab && matchesCat && matchesSearch) {
      visibleCount++;
      const isFav = store.state.favorites.includes(tip.id);
      const div = document.createElement('div');
      div.className = 'tip-item' + (tip.category === '이스터에그' ? ' actionable' : '');
      div.dataset.id = tip.id;
      div.dataset.category = tip.category;

      const shortcutObj = (lang === LANG.EN && tip.shortcut_en) ? tip.shortcut_en : tip.shortcut;
      let shortcutText = "";
      if (typeof shortcutObj === 'string') {
        shortcutText = shortcutObj;
      } else if (shortcutObj && typeof shortcutObj === 'object') {
        shortcutText = shortcutObj[currentOS] || shortcutObj['win'] || "";
      }

      let shortcutHTML = `<div class="shortcut">${shortcutText}</div>`;


      div.innerHTML = `
        <div class="tip-category">${I18N[lang].categories[tip.category] || tip.category}</div>
        <div class="tip-title">${title}</div>
        <div class="tip-desc">${desc}</div>
        ${shortcutHTML}
        <span class="fav-btn" data-id="${tip.id}" aria-label="즐겨찾기">
          <span class="svg-icon">${isFav ? ICONS.star : ICONS.starOutline}</span>
        </span>
        <button class="note-btn" data-id="${tip.id}" title="${strings.writeNoteTitle}" aria-label="${strings.writeNoteTitle}">
          <span class="svg-icon">${ICONS.note}</span>
        </button>
      `;

      createActionButtons(tip, div);

      // 단계별 가이드 생성
      let rawSteps = lang === LANG.KO ? tip.steps : (tip.steps_en || tip.steps);
      let steps = [];
      if (rawSteps) {
        if (Array.isArray(rawSteps)) steps = rawSteps;
        else if (typeof rawSteps === 'object') steps = rawSteps[currentOS] || rawSteps['win'] || [];
      }

      if (steps && steps.length > 0) {
        const stepGuide = document.createElement('div');
        stepGuide.className = 'step-guide';
        stepGuide.innerHTML = `
          <div class="step-guide-header">
            <div class="step-guide-title">
              <span class="svg-icon">${ICONS.globe}</span>
              <span>${lang === LANG.KO ? '단계별 스텝 가이드' : 'Step-by-Step Guide'}</span>
            </div>
            <div class="step-toggle-icon">${ICONS.chevron}</div>
          </div>
          <div class="step-content">
            ${steps.map((step, idx) => {
              let p = step;
              if (currentOS === OS.MAC) {
                p = p.replace(/Ctrl/g, 'Cmd').replace(/Win/g, 'Cmd').replace(/Alt/g, 'Option').replace(/우클릭/g, '이중 손가락 클릭(Control+클릭)');
              } else p = p.replace(/Cmd/g, 'Ctrl').replace(/Option/g, 'Alt');
              return `<div class="step-row"><div class="step-number">${idx+1}</div><div class="step-text">${p}</div></div>`;
            }).join('')}
          </div>
        `;
        div.appendChild(stepGuide);
      }

      // 관련 팁 (캐시 사용)
      const related = store.state.relatedTipsCache.get(tip.id);
      if (related && related.length > 0) {
        const relDiv = document.createElement('div');
        relDiv.className = 'related-tips';
        relDiv.innerHTML = `<div class="related-label"><span class="svg-icon">${ICONS.link}</span>${strings.relatedTipsLabel}</div>`;
        const relList = document.createElement('div');
        relList.className = 'related-list';
        related.forEach(rt => {
          const rtTitle = (lang === LANG.EN && rt.title_en) ? rt.title_en : rt.title;
          const rtBtn = document.createElement('span');
          rtBtn.className = 'related-item';
          rtBtn.dataset.id = rt.id;
          rtBtn.textContent = rtTitle;
          relList.appendChild(rtBtn);
        });
        relDiv.appendChild(relList);
        div.appendChild(relDiv);
      }

      fragment.appendChild(div);
    }
  });

  if (visibleCount === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-msg';
    empty.innerHTML = filter ? strings.emptySearch : (store.state.currentTab === TABS.FAV ? strings.emptyFav : "");
    listEl.appendChild(empty);
  } else {
    listEl.appendChild(fragment);
  }
}

export function renderShortcuts(onRun, onEdit, onDelete) {
  const listEl = $('#list');
  const scs = store.state.userShortcuts;
  const strings = I18N[store.state.currentLang];

  if (scs.length === 0) {
    listEl.innerHTML = `<div class="empty-msg">${strings.emptyShortcuts}</div>`;
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'shortcut-grid';

  scs.forEach(sc => {
    const card = document.createElement('div');
    const name = sc.name || "";
    const stepsCount = (sc.steps && sc.steps.length) || 0;

    card.className = 'widget-card';
    card.innerHTML = `
      <div class="widget-icon">${ICONS.rocket}</div>
      <div class="widget-title">${name}</div>
      <div class="widget-steps-count">${stepsCount} STEPS</div>
      <div class="widget-actions">
        <button class="widget-action-btn edit-sc" title="수정"><span class="svg-icon">${ICONS.edit}</span></button>
        <button class="widget-action-btn delete-sc" title="삭제"><span class="svg-icon">${ICONS.trash}</span></button>
      </div>
      <div class="widget-play-icon">${ICONS.play}</div>
    `;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.edit-sc')) onEdit(sc);
      else if (e.target.closest('.delete-sc')) onDelete(sc);
      else onRun(sc);
    });

    grid.appendChild(card);
  });

  listEl.appendChild(grid);
}

function createActionButtons(tip, div) {
  const lang = store.state.currentLang;
  const shortcutObj = (lang === LANG.EN && tip.shortcut_en) ? tip.shortcut_en : tip.shortcut;
  const shortcutText = (shortcutObj && shortcutObj[store.state.currentOS]) || "";
  const strings = I18N[store.state.currentLang];

  const chromeUrlMatch = shortcutText && shortcutText.match(/chrome:\/\/[^\s]+/);
  if (chromeUrlMatch) {
    const url = chromeUrlMatch[0];
    const btn = document.createElement('button');
    btn.className = 'go-btn';
    btn.innerHTML = `<span class="svg-icon" style="margin-right: 6px;">${ICONS.external}</span>${strings.goToAction}`;
    btn.onclick = (e) => {
      e.stopPropagation();
      chrome.tabs.create({ url });
    };
    div.appendChild(btn);
  }
  
  if (tip.link && !chromeUrlMatch) {
    const btn = document.createElement('button');
    btn.className = 'go-btn';
    btn.innerHTML = `<span class="svg-icon" style="margin-right: 6px;">${ICONS.external}</span>${strings.goToSettings}`;
    btn.onclick = (e) => {
      e.stopPropagation();
      chrome.tabs.create({ url: tip.link });
    };
    div.appendChild(btn);
  }
}

export function setRandomPlaceholder() {
  const placeholders = I18N[store.state.currentLang].searchPlaceholders;
  const randomText = placeholders[Math.floor(Math.random() * placeholders.length)];
  if ($('#search')) $('#search').placeholder = randomText;
}

export function switchTab(callbacks) {
  // 실제 탭 버튼들만 클래스 정리 (통계 버튼 제외)
  $$('.nav button[id^="tab-"]').forEach(b => b.classList.remove('active'));
  
  $('#tab-all')?.classList.toggle('active', store.state.currentTab === TABS.ALL);
  $('#tab-fav')?.classList.toggle('active', store.state.currentTab === TABS.FAV);
  $('#tab-shortcuts')?.classList.toggle('active', store.state.currentTab === TABS.SHORTCUTS);

  const isShortcuts = store.state.currentTab === TABS.SHORTCUTS;
  if ($('#cat-nav')) $('#cat-nav').style.display = isShortcuts ? 'none' : 'flex';
  if ($('#shortcut-controls')) $('#shortcut-controls').style.display = isShortcuts ? 'block' : 'none';

  renderTips($('#search')?.value || "", callbacks);
}

export function addDragDropHandlers(container, onDrop) {
  let draggedItem = null;

  container.addEventListener('dragstart', (e) => {
    draggedItem = e.target;
    e.target.classList.add('dragging');
  });

  container.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
  });

  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const target = e.target.closest('button');
    if (target && target !== draggedItem) {
      target.classList.add('drag-over');
    }
  });

  container.addEventListener('dragleave', (e) => {
    const target = e.target.closest('button');
    if (target) target.classList.remove('drag-over');
  });

  container.addEventListener('drop', (e) => {
    e.preventDefault();
    const target = e.target.closest('button');
    if (target && draggedItem && target !== draggedItem) {
      onDrop(draggedItem.dataset.cat, target.dataset.cat);
    }
    container.querySelectorAll('button').forEach(btn => btn.classList.remove('drag-over'));
  });
}
