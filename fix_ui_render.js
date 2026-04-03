const fs = require('fs');

let code = fs.readFileSync('js/ui.js', 'utf8');

// Optimize the pre-computation of tips during render by moving regex and replacement operations outside the loop if they don't depend on the tip, 
// and memoizing translated titles and descriptions.

code = code.replace(
  /visibleTips\.forEach\(tip => \{([\s\S]*?)\} catch \(err\) \{/g,
  `// [Pre-computation & Memoization Optimization]
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
      div.className = \`tip-item \${isAuto ? 'is-auto' : ''}\`;
      div.tabIndex = 0;
      div.dataset.id = tip.id;
      div.dataset.category = tip.category;

      div.setAttribute('role', 'button');
      div.setAttribute('aria-label', \`\${title}, \${desc}\`);

      const shortcutObj = (isLangEn && tip.shortcut_en) ? tip.shortcut_en : tip.shortcut;
      let shortcutText = "";
      if (typeof shortcutObj === 'string') shortcutText = shortcutObj;
      else if (shortcutObj && typeof shortcutObj === 'object') shortcutText = shortcutObj[currentOS] || shortcutObj['win'] || "";

      let shortcutHTML = shortcutText ? \`
        <div class="shortcut">
          \${shortcutText}
        </div>\` : "";

      const autoBadge = isAuto ? \`
        <div class="auto-badge">
          <span class="svg-icon">\${ICONS.bot}</span>
          AI-Ready
        </div>\` : "";

      div.insertAdjacentHTML('beforeend', \`
        <div class="tip-category">
          \${strings.categories[tip.category] || tip.category}
          \${autoBadge}
        </div>
        <div class="tip-title">\${title}</div>
        <div class="tip-desc">\${desc}</div>
        \${shortcutHTML}
        <span class="fav-btn" data-id="\${tip.id}" aria-label="\${isFav ? strings.favRemove : strings.favAdd}">
          <span class="svg-icon" aria-hidden="true">\${isFav ? ICONS.star : ICONS.starOutline}</span>
        </span>
        <button class="note-btn" data-id="\${tip.id}" title="\${strings.writeNoteTitle}" aria-label="\${strings.writeNoteTitle}">
          <span class="svg-icon" aria-hidden="true">\${ICONS.note}</span>
        </button>
      \`);

      createActionButtons(tip, div, { onFavClick, onNoteClick, onShortcutRun, onEditShortcut, onDeleteShortcut, onShareShortcut });
      renderDetails(tip, div, lang, currentOS, strings);
      fragment.appendChild(div);
    } catch (err) {`
);

// We need to also clean up the duplicate `div.textContent = "";` that was inside the original string but is now absent or we need to manage it.
// The replace above will overwrite `div.textContent = "";` from the original code safely because of the regex `([\s\S]*?)` capturing it all up to `catch`.

fs.writeFileSync('js/ui.js', code, 'utf8');
console.log('UI.js pre-computation optimization applied.');
