const fs = require('fs');
const path = require('path');

function checkSyntax(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      checkSyntax(fullPath);
    } else if (fullPath.endsWith('.js')) {
      try {
        let code = fs.readFileSync(fullPath, 'utf8');
        // Node.js vm.Script does not support ES modules natively.
        // If the code contains import/export, we skip the basic vm.Script check to avoid false positives.
        if (/^(?:export|import) /m.test(code)) {
          // ES Module detected, skipping basic syntax check
          continue;
        }
        new (require('vm').Script)(code);
      } catch (err) {
        console.error(`Syntax Error in ${fullPath}:`, err.message);
      }
    }
  }
}
checkSyntax('.');
console.log('Syntax check complete.');
