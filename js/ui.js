import { $, $$, TABS, CATEGORY_ALL, LANG, OS } from './constants.js';
import { store } from './store.js';
import { I18N } from './i18n.js';
import { tips } from './data.js';
import { ICONS } from './icons.js';
import { getPlatform, levenshtein } from './utils.js';

export function applyTheme() {
  const body = document.body;
  if (!body) return;

  // 1. 테마 전환 순간에만 모든 애니메이션 강제 중지 (200개 아이템 렉 방지 핵심)
  body.classList.add('no-transition');

  requestAnimationFrame(() => {
    body.classList.toggle('dark', store.state.isDark);

    // [UX 개선] OS 전용 클래스 부여 (디자인 차별화)
    body.classList.remove('os-mac', 'os-win');
    body.classList.add(`os-${store.state.currentOS}`);

    const darkBtn = $('#dark-btn');
    if (darkBtn) {
      darkBtn.textContent = "";
      darkBtn.insertAdjacentHTML('beforeend', `<span aria-hidden="true">${store.state.isDark ? ICONS.sun : ICONS.moon}</span>`);
    }

    // 2. 브라우저가 스타일 업데이트를 마친 후 애니메이션 복구
    setTimeout(() => {
      body.classList.remove('no-transition');
    }, 50); // 짧은 딜레이 후 복구
  });
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
  if ($('#header-logo')) {
    $('#header-logo').textContent = "";
    $('#header-logo').insertAdjacentHTML('beforeend', `<span aria-hidden="true">${ICONS.logo}</span>`);
  }

  const dailyLabel = $('#daily-label');
  if (dailyLabel) {
    dailyLabel.textContent = "";
    dailyLabel.insertAdjacentHTML('beforeend', `<span class="svg-icon" aria-hidden="true">${ICONS.sparkles}</span>${strings.dailyLabel}`);
  }

  if ($('#tab-all')) $('#tab-all').textContent = strings.allTips;

  const tabFav = $('#tab-fav');
  if (tabFav) {
    tabFav.textContent = "";
    tabFav.insertAdjacentHTML('beforeend', `<span class="svg-icon" aria-hidden="true" style="margin-right: 4px;">${ICONS.star}</span>${strings.myLibrary}`);
  }

  const tabShortcuts = $('#tab-shortcuts');
  if (tabShortcuts) {
    tabShortcuts.textContent = "";
    tabShortcuts.insertAdjacentHTML('beforeend', `<span class="svg-icon" aria-hidden="true">${ICONS.rocket}</span>${strings.myShortcuts}`);
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
    clearBtn.textContent = "";
    clearBtn.insertAdjacentHTML('beforeend', `<span aria-hidden="true">${ICONS.close}</span>`);
  }

  // 모달 닫기 버튼들 일괄 적용
  $$('.modal-close').forEach(el => {
    el.textContent = "";
    el.insertAdjacentHTML('beforeend', `<span aria-hidden="true">${ICONS.close}</span>`);
  });

  // 새 매크로 만들기 버튼 아이콘
  const addShortcutBtn = $('#add-shortcut-btn');
  if (addShortcutBtn) {
    addShortcutBtn.textContent = "";
    addShortcutBtn.insertAdjacentHTML('beforeend', `<span>${strings.addShortcut || '🔴 매크로 녹화하기'}</span>`);
    addShortcutBtn.style.background = 'var(--accent)';
    addShortcutBtn.style.color = 'white';
    addShortcutBtn.style.border = 'none';
  }

  // 모달 정보 및 아이콘
  [['.sc-tag-icon', ICONS.tag], ['.sc-globe-icon', ICONS.globe], ['.sc-bot-icon', ICONS.bot], ['.sc-rocket-icon', ICONS.rocket], ['.sc-lightbulb-icon', ICONS.lightbulb], ['.sc-pencil-icon', ICONS.pencil]].forEach(([selector, icon]) => {
    $$(selector).forEach(el => {
      el.textContent = "";
      el.insertAdjacentHTML('beforeend', icon);
    });
  });

  const macroExportBtn = $('#macro-export-btn');
  if (macroExportBtn) {
    macroExportBtn.textContent = "";
    macroExportBtn.insertAdjacentHTML('beforeend', ICONS.download);
  }

  const macroImportBtn = $('#macro-import-btn');
  if (macroImportBtn) {
    macroImportBtn.textContent = "";
    macroImportBtn.insertAdjacentHTML('beforeend', ICONS.upload);
  }

  const noteInput = $('#note-input');
  if (noteInput) noteInput.placeholder = strings.noteInputPlaceholder;
  const noteDelBtn = $('#note-delete-btn');
  if (noteDelBtn) noteDelBtn.textContent = strings.noteDelete;
  const noteSaveBtn = $('#note-save-btn');
  if (noteSaveBtn) noteSaveBtn.textContent = strings.noteSave;
}

export function buildCategoryNav(onCategoryClick) {
  const nav = $('#cat-nav');
  nav.textContent = "";
  const lang = store.state.currentLang;
  const categoryStrings = I18N[lang].categories;

  store.state.categoryOrder.forEach(catKey => {
    // [Smart Hide] "전체" 카테고리 버튼은 내비게이션 바에서 숨김 (상단 탭으로 대체)
    if (catKey === CATEGORY_ALL) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = categoryStrings[catKey] || catKey;
    btn.dataset.cat = catKey;
    btn.draggable = true;

    if (catKey === store.state.currentCategory) btn.classList.add('active');

    btn.addEventListener('click', () => onCategoryClick(catKey, btn));
    nav.appendChild(btn);
  });

  addDragDropHandlers(nav, (newOrder) => {
    store.update({ categoryOrder: newOrder });
    // UI를 다시 그리지 않아도 이미 DOM은 정렬된 상태이지만, 
    // 상태 동기화를 위해 한 번 더 렌더링할 수 있습니다.
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

/**
 * [UX 개선] 검색어 하이라이팅 유틸리티
 */
function highlight(text, search) {
  if (!search) return text;
  const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="highlight">$1</mark>');
}
/**
 * [UX 확장] 프리미엄 스켈레톤 로딩 렌더링
 */
export function renderSkeletons(count = 3) {
  const listEl = $('#list');
  if (!listEl) return;
  listEl.textContent = "";

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const div = document.createElement('div');
    div.className = 'skeleton';
    div.textContent = "";
    div.insertAdjacentHTML('beforeend', `
      <div class="skeleton-title"></div>
      <div class="skeleton-desc"></div>
      <div class="skeleton-btn"></div>
    `);
    fragment.appendChild(div);
  }
  listEl.appendChild(fragment);
}


export function renderTips(filter = "", callbacks = {}, isAppend = false, targetId = null) {
  const { onFavClick, onNoteClick, onShortcutRun, onEditShortcut, onDeleteShortcut, onShareShortcut } = callbacks;
  const listEl = $('#list');
  if (!listEl) return;

  if (!isAppend && !targetId) {
    listEl.textContent = "";
    store.state.visibleCount = store.state.ITEM_PER_PAGE;
  } else if (isAppend) {
    $('.load-more-wrapper')?.remove();
    store.state.visibleCount += store.state.ITEM_PER_PAGE;
  }

  // 매크로 탭인 경우 예외 처리
  if (store.state.currentTab === TABS.SHORTCUTS) {
    listEl.textContent = "";
    renderShortcuts(onShortcutRun, onEditShortcut, onDeleteShortcut, onShareShortcut);
    return;
  }

  const allFiltered = store.getFilteredTips(tips, filter);
  const totalCount = allFiltered.length;

  if (targetId) {
    const targetIndex = allFiltered.findIndex(t => t.id === targetId);
    if (targetIndex !== -1 && targetIndex >= store.state.visibleCount) {
      store.state.visibleCount = targetIndex + 1;
    }
  }

  const visibleTips = allFiltered.slice(0, store.state.visibleCount);
  const visibleCount = visibleTips.length;
  const fragment = document.createDocumentFragment();
  const lang = store.state.currentLang;
  const currentOS = store.state.currentOS;
  const strings = I18N[lang];

  if (!isAppend || targetId) listEl.textContent = "";

  // [Pre-computation & Memoization Optimization]
  const isMac = currentOS === OS.MAC;
  const osRegexMac = /Ctrl|Win|Alt/g;
  const osRegexWin = /Cmd|Option/g;
  const macMap = { 'Ctrl': 'Cmd', 'Win': 'Cmd', 'Alt': 'Option' };
  const winMap = { 'Cmd': 'Ctrl', 'Option': 'Alt' };
  const isLangEn = lang === LANG.EN;

  visibleTips.forEach(tip => {
    try {
      // 1. Memoize basic data fetching
      let title = (isLangEn && tip.title_en) ? tip.title_en : (tip.title || "");
      let desc = (isLangEn && tip.desc_en) ? tip.desc_en : (tip.desc || "");
      desc = String(desc || "");

      // 2. Highlighting logic
      if (filter) {
        title = highlight(title, filter);
        desc = highlight(desc, filter);
      }

      // 3. Fast Regex Replacement for OS specific keys
      if (isMac) {
        desc = desc.replace(osRegexMac, m => macMap[m] || m);
      } else {
        desc = desc.replace(osRegexWin, m => winMap[m] || m);
      }

      const isFav = store.state.favorites.includes(tip.id);
      const isAuto = tip.url && tip.steps;
      
      const div = document.createElement('div');
      div.className = `tip-item ${isAuto ? 'is-auto' : ''}`;
      div.tabIndex = 0;
      div.dataset.id = tip.id;
      div.dataset.category = tip.category;

      div.setAttribute('role', 'button');
      div.setAttribute('aria-label', `${title}, ${desc}`);

      const shortcutObj = (isLangEn && tip.shortcut_en) ? tip.shortcut_en : tip.shortcut;
      let shortcutText = "";
      if (typeof shortcutObj === 'string') shortcutText = shortcutObj;
      else if (shortcutObj && typeof shortcutObj === 'object') shortcutText = shortcutObj[currentOS] || shortcutObj['win'] || "";

      let shortcutHTML = shortcutText ? `
        <div class="shortcut">
          ${shortcutText}
        </div>` : "";

      const autoBadge = isAuto ? `
        <div class="auto-badge">
          <span class="svg-icon">${ICONS.bot}</span>
          AI-Ready
        </div>` : "";

      div.insertAdjacentHTML('beforeend', `
        <div class="tip-category">
          ${strings.categories[tip.category] || tip.category}
          ${autoBadge}
        </div>
        <div class="tip-title">${title}</div>
        <div class="tip-desc">${desc}</div>
        ${shortcutHTML}
        <span class="fav-btn" data-id="${tip.id}" aria-label="${isFav ? strings.favRemove : strings.favAdd}">
          <span class="svg-icon" aria-hidden="true">${isFav ? ICONS.star : ICONS.starOutline}</span>
        </span>
        <button class="note-btn" data-id="${tip.id}" title="${strings.writeNoteTitle}" aria-label="${strings.writeNoteTitle}">
          <span class="svg-icon" aria-hidden="true">${ICONS.note}</span>
        </button>
      `);

      createActionButtons(tip, div, { onFavClick, onNoteClick, onShortcutRun, onEditShortcut, onDeleteShortcut, onShareShortcut });
      renderDetails(tip, div, lang, currentOS, strings);
      fragment.appendChild(div);
    } catch (err) {
      console.error(`Tip ID ${tip.id} rendering error:`, err);
    }
  });

  if (!isAppend && totalCount === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-msg';

    if (filter) {
      const suggestions = store.state.currentLang === LANG.KO
        ? ['단축키', '탭', '시크릿', '개발자', '메모리']
        : ['Shortcut', 'Tab', 'Incognito', 'Dev', 'Memory'];

      empty.textContent = "";
      empty.insertAdjacentHTML('beforeend', `
        <div class="empty-icon">${ICONS.search}</div>
        <h3>${strings.emptySearch || '검색 결과가 없어요'}</h3>
        <p>${strings.emptySearchDesc || '다른 키워드로 검색하거나 아래 추천 항목을 확인해 보세요.'}</p>
        <div class="suggestion-chips">
          ${suggestions.map(s => `<span class="suggestion-chip">${s}</span>`).join('')}
        </div>
        <button class="go-btn" id="empty-clear-btn" style="width: auto; padding: 10px 24px; margin-top: 12px;">
          ${strings.clearSearchCTA}
        </button>
      `);

      // 이벤트 위임 또는 개별 등록
      setTimeout(() => {
        $('#empty-clear-btn')?.addEventListener('click', () => {
          const searchInput = $('#search');
          if (searchInput) searchInput.value = "";
          renderTips("", { onFavClick, onNoteClick, onShortcutRun, onEditShortcut, onDeleteShortcut });
        });

        empty.querySelectorAll('.suggestion-chip').forEach(chip => {
          chip.addEventListener('click', () => {
            const searchInput = $('#search');
            if (searchInput) {
              searchInput.value = chip.textContent;
              renderTips(chip.textContent, { onFavClick, onNoteClick, onShortcutRun, onEditShortcut, onDeleteShortcut });
            }
          });
        });
      }, 0);
    } else {
      empty.textContent = "";
      empty.insertAdjacentHTML('beforeend', `
        <div class="empty-icon" style="background: var(--accent-bg);">${ICONS.starOutline}</div>
        <p>${store.state.currentTab === TABS.FAV ? strings.emptyFav : ""}</p>
      `);
    }
    listEl.appendChild(empty);
  } else {
    listEl.appendChild(fragment);

    // [최적화] 더보기 버튼 및 진행 표시 추가
    if (visibleCount < totalCount) {
      const moreWrapper = document.createElement('div');
      moreWrapper.className = 'load-more-wrapper';
      moreWrapper.textContent = "";
      moreWrapper.insertAdjacentHTML('beforeend', `
        <div class="load-more-status">${strings.showMoreStatus(Math.min(visibleCount, totalCount), totalCount)}</div>
        <button class="load-more-btn">${strings.loadMore}</button>
      `);
      moreWrapper.querySelector('.load-more-btn').onclick = () => {
        renderTips(filter, { onFavClick, onNoteClick, onShortcutRun, onEditShortcut, onDeleteShortcut, onShareShortcut }, true);
      };
      listEl.appendChild(moreWrapper);
    }
  }
}

/**
 * [Architecture] 상세 정보(단계 가이드, 관련 팁) 렌더링 분리
 */
function renderDetails(tip, div, lang, currentOS, strings) {
  // 1. 단계별 가이드 생성
  let rawSteps = lang === LANG.KO ? tip.steps : (tip.steps_en || tip.steps);
  let steps = [];
  if (rawSteps) {
    if (Array.isArray(rawSteps)) steps = rawSteps;
    else if (typeof rawSteps === 'object') steps = rawSteps[currentOS] || rawSteps['win'] || [];
  }

  if (steps && steps.length > 0) {
    const stepGuide = document.createElement('div');
    stepGuide.className = 'step-guide';
    stepGuide.textContent = "";
    stepGuide.insertAdjacentHTML('beforeend', `
      <div class="step-guide-header">
        <div class="step-guide-title">
          <span class="svg-icon">${ICONS.globe}</span>
          <span>${lang === LANG.KO ? '단계별 스텝 가이드' : 'Step-by-Step Guide'}</span>
        </div>
        <div class="step-toggle-icon">${ICONS.chevron}</div>
      </div>
      <div class="step-content">
        ${steps.map((step, idx) => {
          let p = "";
          let icon = ICONS.pencil; // 기본 아이콘: 연필
          
          if (typeof step === 'object' && step !== null) {
            const isClick = step.type === 'click';
            icon = isClick ? ICONS.globe : ICONS.pencil; // 클릭은 지구본(상호작용), 입력은 연필
            const actionName = isClick ? (lang === LANG.KO ? '클릭' : 'Click') : (lang === LANG.KO ? '입력' : 'Input');
            p = `<span class="step-action-tag">${actionName}</span> <strong>${step.target}</strong>${step.value ? ' &rarr; <code>' + step.value + '</code>' : ''}`;
          } else {
            p = String(step || "");
          }

          if (currentOS === OS.MAC) {
            p = p.replace(/Ctrl/g, 'Cmd').replace(/Win/g, 'Cmd').replace(/Alt/g, 'Option').replace(/우클릭/g, '이중 손가락 클릭(Control+클릭)');
          } else {
            p = p.replace(/Cmd/g, 'Ctrl').replace(/Option/g, 'Alt');
          }
          return `
            <div class="step-row">
              <div class="step-icon-wrapper">${icon}</div>
              <div class="step-text">${p}</div>
            </div>`;
        }).join('')}
      </div>
    `);
    div.appendChild(stepGuide);
  }

  // 2. 관련 팁 (Lazy Loading 사용)
  const related = store.getRelatedTips(tip.id);
  if (related && related.length > 0) {
    const relDiv = document.createElement('div');
    relDiv.className = 'related-tips';
    relDiv.textContent = "";
    relDiv.insertAdjacentHTML('beforeend', `
      <div class="related-tips-header">
        <div class="related-label">
          <span class="svg-icon">${ICONS.link}</span>
          ${strings.relatedTipsLabel}
        </div>
        <div class="related-toggle-icon">${ICONS.chevron}</div>
      </div>
      <div class="related-content">
        <div class="related-list"></div>
      </div>
    `);

    const relList = relDiv.querySelector('.related-list');
    related.forEach(rt => {
      const rtTitle = (lang === LANG.EN && rt.title_en) ? rt.title_en : rt.title;
      const rtBtn = document.createElement('span');
      rtBtn.className = 'related-item';
      rtBtn.dataset.id = rt.id;
      rtBtn.textContent = rtTitle;
      relList.appendChild(rtBtn);
    });
    div.appendChild(relDiv);
  }
}

export function renderShortcuts(onRun, onEdit, onDelete, onShare) {
  const listEl = $('#list');
  const scs = store.state.userShortcuts;
  const strings = I18N[store.state.currentLang];

  if (scs.length === 0) {
    listEl.textContent = "";
    listEl.insertAdjacentHTML('beforeend', `<div class="empty-msg">${strings.emptyShortcuts}</div>`);
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'shortcut-grid';

  scs.forEach(sc => {
    const card = document.createElement('div');
    const name = sc.name || "";
    const stepsCount = (sc.steps && sc.steps.length) || 0;

    card.className = 'widget-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Macro: ${name}, ${stepsCount} steps`);
    card.textContent = "";
    card.insertAdjacentHTML('beforeend', `
      <div class="widget-icon">${ICONS.rocket}</div>
      <div class="widget-title">${name}</div>
      <div class="widget-steps-count">${stepsCount} STEPS</div>
      <div class="widget-actions">
        <button class="widget-action-btn share-sc" title="내보내기/공유"><span class="svg-icon">${ICONS.download}</span></button>
        <button class="widget-action-btn edit-sc" title="수정"><span class="svg-icon">${ICONS.edit}</span></button>
        <button class="widget-action-btn delete-sc" title="삭제"><span class="svg-icon">${ICONS.trash}</span></button>
      </div>
      <div class="widget-play-icon">${ICONS.play}</div>
    `);

    card.addEventListener('click', (e) => {
      if (e.target.closest('.share-sc')) onShare(sc);
      else if (e.target.closest('.edit-sc')) onEdit(sc);
      else if (e.target.closest('.delete-sc')) onDelete(sc);
      else onRun(sc);
    });

    grid.appendChild(card);
  });

  listEl.appendChild(grid);
}

function createActionButtons(tip, div, callbacks = {}) {
  const lang = store.state.currentLang;
  const shortcutObj = (lang === LANG.EN && tip.shortcut_en) ? tip.shortcut_en : tip.shortcut;
  const shortcutText = (shortcutObj && shortcutObj[store.state.currentOS]) || "";
  const strings = I18N[store.state.currentLang];

  // 1. 내장 매크로(자동화) 처리
  if (tip.url && tip.steps && tip.category === '자동화') {
    const btn = document.createElement('button');
    btn.className = 'go-btn';
    btn.style.background = 'var(--accent-gold)';
    btn.textContent = "";
    btn.insertAdjacentHTML('beforeend', `<span class="svg-icon" style="margin-right: 6px;">${ICONS.play}</span>${strings.runShortcut}`);
    btn.onclick = (e) => {
      e.stopPropagation();
      if (typeof callbacks.onShortcutRun === 'function') {
        callbacks.onShortcutRun(tip);
      }
    };
    div.appendChild(btn);
    return; // 매크로 버튼이 있으면 다른 버튼은 생략하거나 추가 로직 결정
  }

  const chromeUrlMatch = shortcutText && shortcutText.match(/chrome:\/\/[^\s]+/);
  if (chromeUrlMatch) {
    const url = chromeUrlMatch[0];
    const btn = document.createElement('button');
    btn.className = 'go-btn';
    btn.textContent = "";
    btn.insertAdjacentHTML('beforeend', `<span class="svg-icon" style="margin-right: 6px;">${ICONS.external}</span>${strings.goToAction}`);
    btn.onclick = (e) => {
      e.stopPropagation();
      chrome.tabs.create({ url });
    };
    div.appendChild(btn);
  }

  if (tip.link && !chromeUrlMatch) {
    const btn = document.createElement('button');
    btn.className = 'go-btn';
    btn.textContent = "";
    btn.insertAdjacentHTML('beforeend', `<span class="svg-icon" style="margin-right: 6px;">${ICONS.external}</span>${strings.goToSettings}`);
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

  const isAllTab = store.state.currentTab === TABS.ALL;
  $('#tab-all')?.classList.toggle('active', isAllTab);
  $('#tab-fav')?.classList.toggle('active', store.state.currentTab === TABS.FAV);
  $('#tab-shortcuts')?.classList.toggle('active', store.state.currentTab === TABS.SHORTCUTS);

  // [Smart Fix] 상단 "전체 팁" 탭을 눌렀을 때, 하단 카테고리 필터도 "전체"로 초기화
  if (isAllTab) {
    store.update({ currentCategory: CATEGORY_ALL }, false);
    // 하단 모든 카테고리 버튼의 활성 상태 제거 (필터 없음 표시)
    $$('#cat-nav button').forEach(b => b.classList.remove('active'));
  }

  const isShortcuts = store.state.currentTab === TABS.SHORTCUTS;
  if ($('#cat-nav')) $('#cat-nav').style.display = isShortcuts ? 'none' : 'flex';
  if ($('#shortcut-controls')) $('#shortcut-controls').style.display = isShortcuts ? 'block' : 'none';

  renderTips($('#search')?.value || "", callbacks);
}

export function addDragDropHandlers(container, onDrop) {
  let draggedItem = null;

  container.addEventListener('dragstart', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    draggedItem = btn;
    btn.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    // 드래그 이미지 설정 (필요시)
    e.dataTransfer.setData('text/plain', btn.dataset.cat);
  });

  container.addEventListener('dragend', (e) => {
    if (draggedItem) draggedItem.classList.remove('dragging');
    container.querySelectorAll('button').forEach(btn => btn.classList.remove('drag-over'));
    draggedItem = null;
  });

  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const target = e.target.closest('button');
    if (target && target !== draggedItem) {
      const rect = target.getBoundingClientRect();
      const midX = rect.left + rect.width / 2;

      // 마우스가 타겟의 중간 지점을 넘어갔을 때만 DOM을 옮겨서 "비집고 들어가는" 효과 구현
      if (e.clientX < midX) {
        container.insertBefore(draggedItem, target);
      } else {
        container.insertBefore(draggedItem, target.nextSibling);
      }

      container.querySelectorAll('button').forEach(btn => btn.classList.remove('drag-over'));
      target.classList.add('drag-over');
    }
  });

  container.addEventListener('dragleave', (e) => {
    const target = e.target.closest('button');
    if (target) target.classList.remove('drag-over');
  });

  container.addEventListener('drop', (e) => {
    e.preventDefault();
    const newOrder = Array.from(container.querySelectorAll('button'))
      .map(btn => btn.dataset.cat);

    if (!newOrder.includes(CATEGORY_ALL)) {
      newOrder.unshift(CATEGORY_ALL);
    }

    onDrop(newOrder);
  });
}
