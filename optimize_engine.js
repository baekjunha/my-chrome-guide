const fs = require('fs');

let code = fs.readFileSync('content_script.js', 'utf8');

// Optimize querySelectorAllDeep to memoize shadow roots to prevent full DOM traversal every 800ms
const optimizedQuerySelector = `
    let cachedShadowRoots = new Set();
    let shadowObserver = null;

    function initShadowObserver() {
      if (shadowObserver) return;
      // Gather initial shadow roots
      findShadowRoots(document);
      
      shadowObserver = new MutationObserver(mutations => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === 1) { // Element
              findShadowRoots(node);
            }
          }
        }
      });
      shadowObserver.observe(document.documentElement, { childList: true, subtree: true });
    }

    function findShadowRoots(root) {
      if (root.shadowRoot) cachedShadowRoots.add(root.shadowRoot);
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
      let node;
      while ((node = walker.nextNode())) {
        if (node.shadowRoot) {
          cachedShadowRoots.add(node.shadowRoot);
        }
      }
    }

    function querySelectorAllDeep(selector, root = document) {
      const results = Array.from(root.querySelectorAll(selector));
      for (const shadow of cachedShadowRoots) {
        if (root.contains(shadow.host)) { // Only query relevant shadow roots
           results.push(...Array.from(shadow.querySelectorAll(selector)));
        }
      }
      return results;
    }

    // Initialize the observer
    initShadowObserver();
`;

code = code.replace(
  /function querySelectorAllDeep\(selector, root = document\) \{[\s\S]*?return results;\n    \}/,
  optimizedQuerySelector
);

fs.writeFileSync('content_script.js', code, 'utf8');
console.log('Optimized querySelectorAllDeep applied.');
