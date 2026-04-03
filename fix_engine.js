const fs = require('fs');
let code = fs.readFileSync('content_script.js', 'utf-8');

function robustMatch(originalFnBody) {
  return originalFnBody.replace(
    /const lowerText = text.toLowerCase\(\).trim\(\);/,
    `const lowerText = text.toLowerCase().trim();
      const strippedText = lowerText.replace(/\\s+/g, '');`
  ).replace(
    /const elText = \(\(el.innerText \|\| el.value \|\| ""\)\).trim\(\).toLowerCase\(\);/g,
    `const elText = ((el.innerText || el.value || "")).trim().toLowerCase();
          const strippedElText = elText.replace(/\\s+/g, '');`
  ).replace(
    /const elText = \(el.innerText \|\| el.value \|\| ""\).trim\(\).toLowerCase\(\);/g,
    `const elText = (el.innerText || el.value || "").trim().toLowerCase();
          const strippedElText = elText.replace(/\\s+/g, '');`
  ).replace(
    /const elText = \(el.innerText \|\| ""\).toLowerCase\(\);/g,
    `const elText = (el.innerText || "").toLowerCase();
        const strippedElText = elText.replace(/\\s+/g, '');`
  ).replace(
    /const elAttr = \(el.getAttribute\('aria-label'\) \|\| el.getAttribute\('title'\) \|\| el.id \|\| el.name \|\| ""\).trim\(\).toLowerCase\(\);/g,
    `const elAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.id || el.name || "").trim().toLowerCase();
          const strippedElAttr = elAttr.replace(/\\s+/g, '');`
  ).replace(
    /const labelAttr = \(el.getAttribute\('aria-label'\) \|\| el.getAttribute\('title'\) \|\| el.id \|\| el.name \|\| ""\).toLowerCase\(\);/g,
    `const labelAttr = (el.getAttribute('aria-label') || el.getAttribute('title') || el.id || el.name || "").toLowerCase();
          const strippedLabelAttr = labelAttr.replace(/\\s+/g, '');`
  ).replace(
    /const placeholder = \(el.getAttribute\('placeholder'\) \|\| ""\).toLowerCase\(\);/g,
    `const placeholder = (el.getAttribute('placeholder') || "").toLowerCase();
          const strippedPlaceholder = placeholder.replace(/\\s+/g, '');`
  ).replace(
    /return \(elText === lowerText \|\| elAttr === lowerText\)/g,
    `return (strippedElText === strippedText || strippedElAttr === strippedText)`
  ).replace(
    /return \(elText.includes\(lowerText\) \|\| elAttr.includes\(lowerText\)\)/g,
    `return (strippedElText.includes(strippedText) || strippedElAttr.includes(strippedText))`
  ).replace(
    /return \(placeholder === lowerText \|\| labelAttr === lowerText\)/g,
    `return (strippedPlaceholder === strippedText || strippedLabelAttr === strippedText)`
  ).replace(
    /return \(placeholder.includes\(lowerText\) \|\| labelAttr.includes\(lowerText\)\)/g,
    `return (strippedPlaceholder.includes(strippedText) || strippedLabelAttr.includes(strippedText))`
  ).replace(
    /return \(placeholder === lowerText \|\| labelAttr === lowerText \|\| elText.includes\(lowerText\)\)/g,
    `return (strippedPlaceholder === strippedText || strippedLabelAttr === strippedText || strippedElText.includes(strippedText))`
  );
}

// target findAndClick, findAndInput, findAndEnter, checkElementExists
code = robustMatch(code);

fs.writeFileSync('content_script.js', code);
