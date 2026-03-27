/**
 * check-data.js (v2.1)
 * 팁 데이터, 다국어 설정, JS 모듈 간 의존성, 그리고 프로젝트 구조의 무결성을 검사하는 스크립트입니다.
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

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  🔍 [my-chrome-guide] 통합 무결성 검사 v2.1');
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
// 0. 프로젝트 구조 검사
// ═══════════════════════════════════════════════════
console.log('📋 0. 프로젝트 구조 검사');

const criticalFiles = [
  'manifest.json',
  'PROJECT_GUIDE.md',
  'landing/index.html',
  'landing/style.css',
  'popup.html',
  'popup.js',
  'popup.css',
  'content_script.js'
];

criticalFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    reportPass('구조', `${file} 존재함`);
  } else {
    reportError('구조', `${file} 누락됨!`);
  }
});

// ═══════════════════════════════════════════════════
// 1. I18N 카테고리 검사
// ═══════════════════════════════════════════════════
console.log('\n📋 1. I18N 카테고리 검사');

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

if (koCategories.length > 0) reportPass('I18N', `한국어 카테고리 ${koCategories.length}개 발견`);
if (enCategories.length > 0) reportPass('I18N', `영어 카테고리 ${enCategories.length}개 발견`);
if (koCategories.length !== enCategories.length) reportWarning('I18N', '다국어 개수 불일치');

// ═══════════════════════════════════════════════════
// 2. 팁 데이터 상세 검사
// ═══════════════════════════════════════════════════
console.log('\n📋 2. 팁 데이터 상세 검사');

function extractTipBlocks(content) {
  const tips = [];
  const idMatches = [...content.matchAll(/{\s*\n?\s*id:\s*(\d+)/g)];
  for (let i = 0; i < idMatches.length; i++) {
    const startIdx = idMatches[i].index;
    const id = idMatches[i][1];
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

const usedIds = new Map();
const categoryUsage = {};

tipBlocks.forEach(({ id, block, startLine }) => {
  const section = `ID:${id}`;
  if (usedIds.has(id)) reportError(section, `중복 ID (라인 ${usedIds.get(id)})`);
  usedIds.set(id, startLine);

  const fields = ['category', 'title', 'desc', 'tags'];
  fields.forEach(f => {
    if (!block.match(new RegExp(`${f}:`))) reportError(section, `${f} 필드 누락`);
  });

  const catMatch = block.match(/category:\s*['"](.+?)['"]/);
  if (catMatch) {
    const cat = catMatch[1];
    categoryUsage[cat] = (categoryUsage[cat] || 0) + 1;
    if (!koCategories.includes(cat)) reportError(section, `정의되지 않은 카테고리: ${cat}`);
  }

  // Related ID validation
  const relatedMatch = block.match(/related:\s*\[([\s\S]*?)\]/);
  if (relatedMatch) {
    const rIds = relatedMatch[1].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
    rIds.forEach(rId => {
      // usedIds strings comparison
      if (![...usedIds.keys()].includes(rId) && !tipBlocks.some(t => t.id === rId)) {
        // Since we are iterating, we check against all IDs found in extraction
        if (!tipBlocks.some(t => t.id === rId)) {
          reportError(section, `존재하지 않는 관련 팁 ID: ${rId}`);
        }
      }
    });
  }
});

// ═══════════════════════════════════════════════════
// 3. 문법 및 안티패턴 검사
// ═══════════════════════════════════════════════════
console.log('\n📋 3. 문법 및 안티패턴 검사');

function checkBrackets(content, filename) {
  const stack = [];
  const opening = ['{', '[', '('];
  const closing = ['}', ']', ')'];
  const pairs = { '}': '{', ']': '[', ')': '(' };
  for (let i = 0; i < content.length; i++) {
    if (opening.includes(content[i])) stack.push(content[i]);
    else if (closing.includes(content[i])) {
      const last = stack.pop();
      if (last !== pairs[content[i]]) {
        reportError('문법', `${filename}: 괄호 짝 불일치`);
        return false;
      }
    }
  }
  if (stack.length > 0) {
    reportError('문법', `${filename}: 괄호가 닫히지 않음`);
    return false;
  }
  reportPass('문법', `${filename} 정상`);
  return true;
}

Object.entries(files).forEach(([name, content]) => checkBrackets(content, `js/${name}.js`));

// ═══════════════════════════════════════════════════
// 결과 요약
// ═══════════════════════════════════════════════════
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`  📊 결과: ✅ ${passed} / ⚠️ ${warnings} / ❌ ${errors}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (errors > 0) process.exit(1);
