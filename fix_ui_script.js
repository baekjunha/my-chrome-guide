const fs = require('fs');

let code = fs.readFileSync('js/ui.js', 'utf8');

// 1. innerHTML = ""; (빈 문자열)
code = code.replace(/\.innerHTML\s*=\s*""\s*;/g, ".textContent = '';");

// 2. 화살표 함수 내의 innerHTML: el => el.innerHTML = ICONS.close;
code = code.replace(/el => el\.innerHTML\s*=\s*(ICONS\.\w+)/g, "el => { el.textContent = ''; el.insertAdjacentHTML('beforeend', $1); }");

// 3. 한 줄 명령어 (예: darkBtn.innerHTML = store.state.isDark ? ICONS.sun : ICONS.moon;)
code = code.replace(/^(\s*)([\w\.$]+(?:\(['"][\w.-]+['"]\))?(?:\[\d+\])?(?:(?:\.\w+)*)?)\.innerHTML\s*=\s*([^`][\s\S]*?);$/gm, (match, indent, variable, content) => {
  // content가 단순 문자열 따옴표인 경우 제외 (이미 1번에서 잡혔지만 혹시 모를 대비)
  if (content === '""' || content === "''" || content === "``") {
    return `${indent}${variable}.textContent = "";`;
  }
  // el => 로 시작하는 건 이미 위에서 잡혀야 하므로 제외 안전장치 (매칭이 단일 라인만 됨)
  return `${indent}${variable}.textContent = "";\n${indent}${variable}.insertAdjacentHTML('beforeend', ${content});`;
});

// 4. 여러 줄 템플릿 리터럴 (예: div.innerHTML = `...`;)
code = code.replace(/^(\s*)([\w\.$]+(?:\(['"][\w.-]+['"]\))?)\.innerHTML\s*=\s*`([\s\S]*?)`;$/gm, (match, indent, variable, content) => {
  return `${indent}${variable}.textContent = "";\n${indent}${variable}.insertAdjacentHTML('beforeend', \`${content}\`);`;
});

fs.writeFileSync('js/ui.js', code);
console.log('Fixed js/ui.js innerHTML usages.');
