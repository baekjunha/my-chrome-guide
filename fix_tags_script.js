const fs = require('fs');

const path = 'js/data.js';
let content = fs.readFileSync(path, 'utf8');

// The file format has tags: ["..."], and tags_en: ["..."]
// This regex specifically searches for tags and tags_en arrays locally
let count = 0;
content = content.replace(/(tags:\s*\[[\s\S]*?\]),\s*(tags_en:\s*\[[\s\S]*?\])/g, (match, tagsStr, tagsEnStr) => {
  try {
    // extract just the array parts
    let koArrRaw = tagsStr.match(/\[(.*)\]/s)[1];
    let enArrRaw = tagsEnStr.match(/\[(.*)\]/s)[1];
    
    // naive parsing by splitting by comma.
    // However, string values might contain commas... but tags probably don't.
    // Safer to evaluate the arrays.
    let koArr = eval(`[${koArrRaw}]`);
    let enArr = eval(`[${enArrRaw}]`);
    
    if (koArr.length !== enArr.length) {
      count++;
      let minLen = Math.min(koArr.length, enArr.length);
      koArr = koArr.slice(0, minLen);
      enArr = enArr.slice(0, minLen);
      
      let newTagsStr = `tags: [${koArr.map(t => '"'+t+'"').join(', ')}]`;
      let newTagsEnStr = `tags_en: [${enArr.map(t => '"'+t+'"').join(', ')}]`;
      return `${newTagsStr},\n    ${newTagsEnStr}`; // Keep indenting
    }
  } catch (e) {
    console.error("Parse error for match", match, e);
  }
  return match;
});

fs.writeFileSync(path, content, 'utf8');
console.log(`Fixed ${count} tags mismatches.`);
