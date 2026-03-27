/**
 * check-data.js (v2.0)
 * 팁 데이터, 다국어 설정, JS 모듈 간 의존성의 무결성을 검사하는 스크립트입니다.
 * 팁이 표시되지 않거나 런타임 오류가 발생하는 원인을 사전에 차단하기 위해 사용합니다.
 * 
 * 실행: node check-data.js
 */

const fs = require('fs');
const path = require('path');

// ── 파일 읽기 ──────────────────────────────────────
const jsDir = path.join(__dirname, 'js');
const files = {
  data:    fs.readFileSync(path.join(jsDir, 'data.js'), 'utf8'),
  i18n:    fs.readFileSync(path.join(jsDir, 'i18n.js'), 'utf8'),
  ui:      fs.readFileSync(path.join(jsDir, 'ui.js'), 'utf8'),
  store:   fs.readFileSync(path.join(jsDir, 'store.js'), 'utf8'),
  actions: fs.readFileSync(path.join(jsDir, 'actions.js'), 'utf8'),
  utils:   fs.readFileSync(path.join(jsDir, 'utils.js'), 'utf8'),
  constants: fs.readFileSync(path.join(jsDir, 'constants.js'), 'utf8'),
};
const contentScript = fs.readFileSync(path.join(__dirname, 'content_script.js'), 'utf8');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  🔍 [my-chrome-guide] 데이터 무결성 검사 v2.0');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

let errors = 0;
let warnings = 0;
let passed = 0;

function reportError(section, msg) {
  console.error(`  ❌ [${section}] ${msg}`);
  errors++;
}

function reportWarning(section, msg) {
  console.warn(`  ⚠️  [${section}] ${msg}`);
  warnings++;
}

function reportPass(section, msg) {
  console.log(`  ✅ [${section}] ${msg}`);
  passed++;
}

// ═══════════════════════════════════════════════════
// 1. I18N 카테고리 검사
// ═══════════════════════════════════════════════════
console.log('📋 1. I18N 카테고리 검사');

function extractCategories(content, lang) {
  const regex = new RegExp(`${lang}:[\\s\\S]*?categories:\\s*{([\\s\\S]*?)}`, 'm');
  const match = content.match(regex);
  if (!match) return [];
  return match[1].split(',').map(item => {
    const parts = item.split(':');
    if (parts[0]) return parts[0].trim().replace(/['"]/g, '');
    return null;
  }).filter(Boolean);
}

const koCategories = extractCategories(files.i18n, 'ko');
const enCategories = extractCategories(files.i18n, 'en');

if (koCategories.length > 0) {
  reportPass('I18N', `한국어 카테고리 ${koCategories.length}개 발견: ${koCategories.join(', ')}`);
} else {
  reportError('I18N', '한국어 카테고리를 추출할 수 없습니다.');
}

if (enCategories.length > 0) {
  reportPass('I18N', `영어 카테고리 ${enCategories.length}개 발견: ${enCategories.join(', ')}`);
} else {
  reportError('I18N', '영어 카테고리를 추출할 수 없습니다.');
}

if (koCategories.length !== enCategories.length) {
  reportWarning('I18N', `다국어 카테고리 개수 불일치 (KO: ${koCategories.length}, EN: ${enCategories.length})`);
}

// KO에만 있거나 EN에만 있는 카테고리 체크
const koSet = new Set(koCategories);
const enSet = new Set(enCategories);
koCategories.forEach(cat => {
  if (!enSet.has(cat)) reportWarning('I18N', `카테고리 "${cat}"가 KO에만 존재합니다.`);
});
enCategories.forEach(cat => {
  if (!koSet.has(cat)) reportWarning('I18N', `카테고리 "${cat}"가 EN에만 존재합니다.`);
});

// ═══════════════════════════════════════════════════
// 2. 팁 데이터 상세 검사
// ═══════════════════════════════════════════════════
console.log('\n📋 2. 팁 데이터 상세 검사');

// 더 정밀한 팁 블록 추출 (중첩 객체 포함)
function extractTipBlocks(content) {
  const tips = [];
  // 'id:' 로 시작하는 패턴을 찾아서 하나씩 파싱
  const idMatches = [...content.matchAll(/{\s*\n?\s*id:\s*(\d+)/g)];
  
  for (let i = 0; i < idMatches.length; i++) {
    const startIdx = idMatches[i].index;
    const id = idMatches[i][1];
    
    // 중첩 괄호를 고려하여 블록 끝 찾기
    let depth = 0;
    let endIdx = startIdx;
    for (let j = startIdx; j < content.length; j++) {
      if (content[j] === '{') depth++;
      else if (content[j] === '}') {
        depth--;
        if (depth === 0) { endIdx = j + 1; break; }
      }
    }
    
    const block = content.substring(startIdx, endIdx);
    tips.push({ id, block, startLine: content.substring(0, startIdx).split('\n').length });
  }
  return tips;
}

const tipBlocks = extractTipBlocks(files.data);
console.log(`  📊 총 ${tipBlocks.length}개의 팁 발견`);

const usedIds = new Map(); // id -> line number
const categoryUsage = {};

tipBlocks.forEach(({ id, block, startLine }) => {
  const section = `ID:${id}`;
  
  // ── 2a. 중복 ID 검사 ──
  if (usedIds.has(id)) {
    reportError(section, `중복 ID! (라인 ${usedIds.get(id)}에서 이미 사용됨, 현재 라인 ${startLine})`);
  }
  usedIds.set(id, startLine);
  
  // ── 2b. 필수 필드 존재 여부 ──
  const catMatch = block.match(/category:\s*['"](.+?)['"]/);
  const titleMatch = block.match(/title:\s*['"](.+?)['"]/);
  const titleEnMatch = block.match(/title_en:\s*['"](.+?)['"]/);
  const descMatch = block.match(/desc:\s*['"]/);
  const descEnMatch = block.match(/desc_en:\s*['"]/);
  const tagsMatch = block.match(/tags:\s*\[/);
  const tagsEnMatch = block.match(/tags_en:\s*\[/);
  const shortcutMatch = block.match(/shortcut:\s*{/);
  
  if (!catMatch)     reportError(section, `category 필드 누락 (라인 ~${startLine})`);
  if (!titleMatch)   reportError(section, `title 필드 누락 (라인 ~${startLine})`);
  if (!titleEnMatch) reportWarning(section, `title_en 필드 누락 (영문 모드에서 한국어로 표시됨)`);
  if (!descMatch)    reportError(section, `desc 필드 누락 (라인 ~${startLine})`);
  if (!descEnMatch)  reportWarning(section, `desc_en 필드 누락 (영문 모드에서 한국어로 표시됨)`);
  if (!tagsMatch)    reportError(section, `tags 배열 누락 — 검색에서 제외됩니다!`);
  if (!tagsEnMatch)  reportWarning(section, `tags_en 배열 누락 (영문 검색 불가)`);
  
  // ── 2c. 카테고리 존재 여부 ──
  if (catMatch) {
    const category = catMatch[1];
    categoryUsage[category] = (categoryUsage[category] || 0) + 1;
    
    if (!koCategories.includes(category)) {
      reportError(section, `카테고리 "${category}"가 I18N(ko)에 정의되지 않음 — 팁이 안 보일 수 있습니다!`);
    }
    if (!enCategories.includes(category)) {
      reportWarning(section, `카테고리 "${category}"가 I18N(en)에 정의되지 않음`);
    }
  }
  
  // ── 2d. shortcut 구조 검증 ──
  if (shortcutMatch) {
    // shortcut: { ... } 중첩 구조를 고려하여 키 존재 여부만 체크
    const hasWin = block.match(/shortcut:\s*{[\s\S]*?\bwin:/);
    const hasMac = block.match(/shortcut:\s*{[\s\S]*?\bmac:/);
    if (!hasWin) reportWarning(section, `shortcut에 'win' 키 누락`);
    if (!hasMac) reportWarning(section, `shortcut에 'mac' 키 누락`);
  }
  
  // ── 2e. 빈 tags 배열 검사 ──
  if (tagsMatch) {
    const emptyTagsMatch = block.match(/tags:\s*\[\s*\]/);
    if (emptyTagsMatch) reportWarning(section, `tags 배열이 비어있음 — 검색에서 찾을 수 없습니다`);
  }
  
  // ── 2f. steps 구조 검증 (Array 또는 {win:[], mac:[]} 형태) ──
  const stepsMatch = block.match(/steps:\s*[\[{]/);
  if (stepsMatch) {
    const stepsEnMatch2 = block.match(/steps_en:\s*[\[{]/);
    if (!stepsEnMatch2) {
      reportWarning(section, `steps는 있으나 steps_en 누락 (영문에서 한국어 단계가 보임)`);
    }
  }
  
  // ── 2g. 자동화 매크로 전용 검증 ──
  const isAutomation = catMatch && catMatch[1] === '자동화';
  if (isAutomation) {
    const urlMatch = block.match(/url:\s*['"](.+?)['"]/);
    if (!urlMatch) reportWarning(section, `자동화 팁에 url 필드 누락 (매크로 실행 불가)`);
    
    // steps 내 type 유효성
    const stepTypes = [...block.matchAll(/type:\s*['"](\w+)['"]/g)];
    stepTypes.forEach(m => {
      if (m[1] !== 'click' && m[1] !== 'input') {
        reportError(section, `알 수 없는 step type: "${m[1]}" (click 또는 input만 허용)`);
      }
    });
  }
});

// 카테고리별 팁 수 출력
console.log('\n  📊 카테고리별 팁 분포:');
Object.entries(categoryUsage)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => console.log(`     ${cat}: ${count}개`));

// I18N에 정의되어 있으나 data.js에서 사용되지 않는 카테고리 체크
koCategories.forEach(cat => {
  if (cat !== '전체' && !categoryUsage[cat]) {
    reportWarning('카테고리', `"${cat}"가 I18N에 정의되어 있으나 사용하는 팁이 없습니다.`);
  }
});

// ═══════════════════════════════════════════════════
// 3. 문법 검사 (괄호 균형)
// ═══════════════════════════════════════════════════
console.log('\n📋 3. 문법 검사 (괄호 균형)');

function checkBrackets(content, filename) {
  const stack = [];
  const opening = ['{', '[', '('];
  const closing = ['}', ']', ')'];
  const pairs = { '}': '{', ']': '[', ')': '(' };
  let inString = false;
  let stringChar = '';
  let escaped = false;
  let inComment = false;
  let inLineComment = false;
  let inTemplateLiteral = false;
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const next = content[i + 1];
    
    // 이스케이프 문자 처리
    if (escaped) { escaped = false; continue; }
    if (char === '\\') { escaped = true; continue; }
    
    // 주석 처리
    if (!inString && !inTemplateLiteral) {
      if (inLineComment) {
        if (char === '\n') inLineComment = false;
        continue;
      }
      if (inComment) {
        if (char === '*' && next === '/') { inComment = false; i++; }
        continue;
      }
      if (char === '/' && next === '/') { inLineComment = true; i++; continue; }
      if (char === '/' && next === '*') { inComment = true; i++; continue; }
    }
    
    // 문자열 처리
    if (char === '`') {
      inTemplateLiteral = !inTemplateLiteral;
      continue;
    }
    if (inTemplateLiteral) continue;
    
    if ((char === '"' || char === "'") && !inString) {
      inString = true; stringChar = char; continue;
    }
    if (inString && char === stringChar) {
      inString = false; continue;
    }
    if (inString) continue;
    
    // 괄호 검사
    if (opening.includes(char)) {
      stack.push({ char, line: content.substring(0, i).split('\n').length });
    } else if (closing.includes(char)) {
      const last = stack.pop();
      if (!last || last.char !== pairs[char]) {
        const line = content.substring(0, i).split('\n').length;
        reportError('문법', `${filename}: '${char}' 괄호 짝 불일치 (라인 ${line})`);
        return false;
      }
    }
  }
  
  if (stack.length > 0) {
    reportError('문법', `${filename}: 닫히지 않은 '${stack[stack.length - 1].char}' (라인 ${stack[stack.length - 1].line})`);
    return false;
  }
  
  reportPass('문법', `${filename}: 괄호 균형 정상`);
  return true;
}

// 모든 JS 파일에 대해 괄호 검사 실행
Object.entries(files).forEach(([name, content]) => checkBrackets(content, `js/${name}.js`));
checkBrackets(contentScript, 'content_script.js');

// ═══════════════════════════════════════════════════
// 4. 모듈 의존성 검사
// ═══════════════════════════════════════════════════
console.log('\n📋 4. 모듈 의존성 검사');

// store.js에서 export하는 메서드들이 ui.js에서 올바르게 사용되는지
const storeExports = [...files.store.matchAll(/export\s+(?:const|class|function)\s+(\w+)/g)].map(m => m[1]);

// ui.js에서 store.xxx 형태로 호출하는 메서드들
const storeMethodCalls = [...files.ui.matchAll(/store\.(\w+)\s*\(/g)].map(m => m[1]);

// store 클래스 내 메서드들 추출
const storeClassMethods = [...files.store.matchAll(/^\s+(?:async\s+)?(\w+)\s*\(/gm)].map(m => m[1])
  .filter(m => !['constructor', 'if', 'for', 'while', 'switch', 'catch', 'try'].includes(m));

storeMethodCalls.forEach(method => {
  if (!storeClassMethods.includes(method)) {
    reportError('의존성', `ui.js에서 store.${method}()를 호출하지만, store.js에 정의되지 않았습니다!`);
  }
});

if (storeMethodCalls.length > 0 && errors === 0) {
  reportPass('의존성', `ui.js → store.js 메서드 호출 ${storeMethodCalls.length}개 검증 완료`);
}

// ═══════════════════════════════════════════════════
// 5. 런타임 안티패턴 검사 (this 오용 등)
// ═══════════════════════════════════════════════════
console.log('\n📋 5. 런타임 안티패턴 검사');

// export function 내에서 this 사용 탐지 (ESM strict mode에서 undefined)
function checkThisInExportedFunctions(content, filename) {
  // export function 블록 내에서 this. 사용 여부 체크
  const exportFuncRegex = /export\s+function\s+(\w+)\s*\([^)]*\)\s*{/g;
  let match;
  let foundIssue = false;
  
  while ((match = exportFuncRegex.exec(content)) !== null) {
    const funcName = match[1];
    const funcStart = match.index;
    
    // 함수 본문 범위 찾기 (중첩 괄호 고려)
    let depth = 0;
    let funcEnd = funcStart;
    let started = false;
    for (let i = funcStart; i < content.length; i++) {
      if (content[i] === '{') { depth++; started = true; }
      else if (content[i] === '}') {
        depth--;
        if (started && depth === 0) { funcEnd = i; break; }
      }
    }
    
    const funcBody = content.substring(funcStart, funcEnd);
    // this. 사용 검사 (콜백 내 arrow function 포함)
    // class 내부의 메서드가 아닌 standalone function에서만
    const thisMatches = [...funcBody.matchAll(/\bthis\./g)];
    if (thisMatches.length > 0) {
      reportError('안티패턴', `${filename}: export function ${funcName}() 내에서 'this.' 사용 (${thisMatches.length}회) — ESM strict mode에서 this는 undefined입니다!`);
      foundIssue = true;
    }
  }
  
  if (!foundIssue) {
    reportPass('안티패턴', `${filename}: export function 내 'this' 오용 없음`);
  }
}

Object.entries(files).forEach(([name, content]) => checkThisInExportedFunctions(content, `js/${name}.js`));

// ═══════════════════════════════════════════════════
// 6. ID 연속성 검사
// ═══════════════════════════════════════════════════
console.log('\n📋 6. ID 연속성 및 범위 검사');

const allIds = [...usedIds.keys()].map(Number).sort((a, b) => a - b);
const minId = allIds[0];
const maxId = allIds[allIds.length - 1];

console.log(`  📊 ID 범위: ${minId} ~ ${maxId} (${allIds.length}개 사용)`);

// 큰 간격(gap) 경고
let gaps = [];
for (let i = 1; i < allIds.length; i++) {
  const gap = allIds[i] - allIds[i - 1];
  if (gap > 10) {
    gaps.push(`${allIds[i - 1]} → ${allIds[i]} (차이: ${gap})`);
  }
}
if (gaps.length > 0) {
  console.log(`  📊 큰 ID 간격(GAP > 10): ${gaps.join(', ')}`);
} else {
  reportPass('ID범위', 'ID 간격이 정상 범위 내에 있습니다.');
}

// ═══════════════════════════════════════════════════
// 7. 관련 팁 ID 유효성 검사
// ═══════════════════════════════════════════════════
console.log('\n📋 7. 관련 팁 ID 유효성 검사');

let relatedIdErrors = 0;
const usedIdsStrings = new Set(Array.from(usedIds.keys()).map(String));

tipBlocks.forEach(({ id, block }) => {
  const relatedMatch = block.match(/related:\s*\[([\s\S]*?)\]/);
  if (relatedMatch) {
    const ids = relatedMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    ids.forEach(relatedId => {
      if (!usedIdsStrings.has(relatedId)) {
        reportError('관련 팁 ID', `팁 ID ${id}에 정의된 관련 팁 ID ${relatedId}가 존재하지 않습니다.`);
        relatedIdErrors++;
      }
    });
  }
});

if (relatedIdErrors === 0) {
  reportPass('관련 팁 ID', '✅ 모든 관련 팁 ID가 데이터셋에 존재합니다.');
}

// ═══════════════════════════════════════════════════
// 결과 요약
// ═══════════════════════════════════════════════════
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  📊 검사 결과 요약');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`  ✅ 통과: ${passed}개`);
console.log(`  ⚠️  경고: ${warnings}개`);
console.log(`  ❌ 오류: ${errors}개`);

if (errors === 0 && warnings === 0) {
  console.log('\n  🎉 모든 검사를 통과했습니다! 팁들이 정상적으로 표시됩니다.');
} else if (errors === 0) {
  console.log('\n  ✅ 치명적 오류는 없습니다. 경고 사항을 확인해 주세요.');
} else {
  console.log('\n  🚨 오류를 먼저 수정해 주세요! 팁이 표시되지 않을 수 있습니다.');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (errors > 0) process.exit(1);
