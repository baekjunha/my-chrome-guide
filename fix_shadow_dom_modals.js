const fs = require('fs');

let code = fs.readFileSync('content_script.js', 'utf8');

// 1. Inject querySelectorAllDeep and autoDismissModals before captureContextMap
const querySelectorAllDeepCode = `
    function querySelectorAllDeep(selector, root = document) {
      const results = Array.from(root.querySelectorAll(selector));
      const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node) => node.shadowRoot ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
      });
      let node = treeWalker.nextNode();
      while (node) {
        if (node.shadowRoot) {
          results.push(...querySelectorAllDeep(selector, node.shadowRoot));
        }
        node = treeWalker.nextNode();
      }
      return results;
    }

    function autoDismissModals() {
      const dismissPatterns = ['닫기', '오늘하루보지않기', '오늘하루열지않기', '건너뛰기', '나중에', 'close', 'dismiss', 'skip', 'remindmelater', 'x', '아니오', 'no'];
      const clickable = querySelectorAllDeep('button, a, [role="button"], .close-btn, .btn-close');
      let dismissed = false;
      
      const isVisible = (el) => {
        const style = window.getComputedStyle(el);
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length) && 
               style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      };

      for (const el of clickable) {
        if (!el) continue;
        const text = (el.innerText || el.getAttribute('aria-label') || '').toLowerCase().replace(/\\s+/g, '');
        if (dismissPatterns.some(p => text === p || text.includes(p))) {
           let isModalLike = false;
           let parent = el.parentElement;
           let depth = 0;
           while(parent && depth < 7) {
             const pStyle = window.getComputedStyle(parent);
             if (pStyle.position === 'fixed' || pStyle.position === 'absolute' || parseInt(pStyle.zIndex) > 100) {
               isModalLike = true;
               break;
             }
             parent = parent.parentElement;
             depth++;
           }
           
           // If z-index is high, we aggressively try to close it.
           if (isModalLike && isVisible(el)) {
             console.debug("[Shortcut] Auto-dismissing popup:", text);
             try { el.click(); dismissed = true; break; } catch(e) {}
           }
        }
      }
      return dismissed;
    }

    function captureContextMap`;

code = code.replace(/function captureContextMap/g, querySelectorAllDeepCode);

// 2. Replace document.querySelectorAll with querySelectorAllDeep in engine functions
code = code.replace(/document\.querySelectorAll/g, 'querySelectorAllDeep');

// 3. Integrate autoDismissModals in retry logic
code = code.replace(
  /if \(retryCount === 8 \|\| retryCount === 15\) \{/,
  `if (retryCount % 4 === 0) {
              if (autoDismissModals()) {
                 setTimeout(() => runEngine(), 1000);
                 return;
              }
            }
            if (retryCount === 8 || retryCount === 15) {`
);

fs.writeFileSync('content_script.js', code, 'utf8');
console.log('Shadow DOM & Modal fixes applied.');
