const fs = require('fs');
let code = fs.readFileSync('content_script.js', 'utf-8');

code = code.replace(
  /const lowerText = text.toLowerCase\(\).trim\(\);/g,
  `const lowerText = text.toLowerCase().trim();
      const strippedText = lowerText.replace(/\\s+/g, '');`
);

// Because it was already replaced once in checkElementExists, I'll remove the duplicate if it exists.
code = code.replace(
  /const lowerText = text.toLowerCase\(\).trim\(\);\n      const strippedText = lowerText.replace\(\/\\\\s\+\/g, ''\);\n      const strippedText = lowerText.replace\(\/\\\\s\+\/g, ''\);/g,
  `const lowerText = text.toLowerCase().trim();
      const strippedText = lowerText.replace(/\\s+/g, '');`
);

fs.writeFileSync('content_script.js', code);
