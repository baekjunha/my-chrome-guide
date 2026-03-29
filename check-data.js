/**
 * check-data.js (v3.0)
 * 팁 데이터, 다국어 설정, 매니페스트, 에셋, 그리고 프로젝트 전체의 무결성을 검사하는 심화 스크립트입니다.
 * 
 * 실행: node check-data.js
 */

const fs = require('fs');
const path = require('path');

// ── 설정 및 상태 ────────────────────────────────────
const ROOT = __dirname;
const JS_DIR = path.join(ROOT, 'js');
const LOCALES_DIR = path.join(ROOT, '_locales');
const IMAGES_DIR = path.join(ROOT, 'images');

let errors = 0;
let warnings = 0;
let passed = 0;

// ── 유틸리티 ────────────────────────────────────────
function reportError(section, msg, detail = '') {
  console.error(`  ❌ [\x1b[31m${section}\x1b[0m] ${msg}${detail ? ` (${detail})` : ''}`);
  errors++;
}

function reportWarning(section, msg, detail = '') {
  console.warn(`  ⚠️  [\x1b[33m${section}\x1b[0m] ${msg}${detail ? ` (${detail})` : ''}`);
  warnings++;
}

function reportPass(section, msg) {
  console.log(`  ✅ [\x1b[32m${section}\x1b[0m] ${msg}`);
  passed++;
}

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    reportError('파일', `파일을 읽을 수 없음: ${filePath}`);
    return null;
  }
}

function readJsonSafe(filePath) {
  const content = readFileSafe(filePath);
  if (!content) return null;
  try {
    return JSON.parse(content);
  } catch (e) {
    reportError('JSON', `JSON 파싱 오류: ${filePath}`, e.message);
    return null;
  }
}

// ── 메인 검사 로직 ──────────────────────────────────
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  🔍 [my-chrome-guide] 통합 무결성 검사 v3.0');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// 1. 프로젝트 필수 파일 및 구조 검사
console.log('📋 1. 프로젝트 구조 및 필수 파일 검사');
const criticalFiles = [
  'manifest.json',
  'PROJECT_GUIDE.md',
  'popup.html',
  'popup.js',
  'popup.css',
  'content_script.js',
  'js/data.js',
  'js/i18n.js',
  'js/store.js',
  'js/ui.js',
  'js/actions.js',
  'js/constants.js',
  'js/utils.js',
  '_locales/ko/messages.json',
  '_locales/en/messages.json'
];

criticalFiles.forEach(file => {
  if (fs.existsSync(path.join(ROOT, file))) {
    reportPass('구조', `${file} 존재함`);
  } else {
    reportError('구조', `${file} 누락됨!`);
  }
});

// 2. 매니페스트(manifest.json) 검증
console.log('\n📋 2. 매니페스트(manifest.json) 정밀 검증');
const manifest = readJsonSafe(path.join(ROOT, 'manifest.json'));
if (manifest) {
  // 아이콘 존재 여부
  const icons = { ...manifest.icons, ...(manifest.action?.default_icon || {}) };
  Object.values(icons).forEach(iconPath => {
    if (!fs.existsSync(path.join(ROOT, iconPath))) {
      reportError('매니페스트', `아이콘 파일 누락: ${iconPath}`);
    } else {
      reportPass('매니페스트', `아이콘 확인: ${iconPath}`);
    }
  });

  // 스크립트 존재 여부
  const scripts = [
    ...(manifest.background?.service_worker ? [manifest.background.service_worker] : []),
    ...(manifest.content_scripts?.flatMap(cs => cs.js) || []),
    manifest.action?.default_popup
  ].filter(Boolean);

  scripts.forEach(script => {
    if (!fs.existsSync(path.join(ROOT, script))) {
      reportError('매니페스트', `스크립트/HTML 누락: ${script}`);
    } else {
      reportPass('매니페스트', `리소스 확인: ${script}`);
    }
  });
}

// 3. 다국어(I18N) 메시지 일관성 검사
console.log('\n📋 3. 다국어(I18N) 메시지 일관성 검사');
const koMsg = readJsonSafe(path.join(LOCALES_DIR, 'ko', 'messages.json'));
const enMsg = readJsonSafe(path.join(LOCALES_DIR, 'en', 'messages.json'));

if (koMsg && enMsg) {
  const koKeys = Object.keys(koMsg);
  const enKeys = Object.keys(enMsg);

  // 키 개수 및 일치 확인
  koKeys.forEach(key => {
    if (!enMsg[key]) reportError('I18N', `영어(en) 메시지 누락: ${key}`);
  });
  enKeys.forEach(key => {
    if (!koMsg[key]) reportError('I18N', `한국어(ko) 메시지 누락: ${key}`);
  });

  if (koKeys.length === enKeys.length) reportPass('I18N', `메시지 키 일치 (총 ${koKeys.length}개)`);

  // 플레이스홀더 일관성 확인
  koKeys.forEach(key => {
    if (enMsg[key]) {
      const koPh = Object.keys(koMsg[key].placeholders || {}).sort();
      const enPh = Object.keys(enMsg[key].placeholders || {}).sort();
      if (JSON.stringify(koPh) !== JSON.stringify(enPh)) {
        reportError('I18N', `플레이스홀더 불일치: ${key}`);
      }
    }
  });
}

// 4. 팁 데이터(js/data.js) 심층 검증
console.log('\n📋 4. 팁 데이터(js/data.js) 심층 검증');
const dataRaw = readFileSafe(path.join(JS_DIR, 'data.js'));
let tips = [];
if (dataRaw) {
  // ES6 export 제거 후 JSON-like 파싱 시도 (간단하게 객체 추출)
  try {
    const dataClean = dataRaw
      .replace(/export const tips =/g, 'return')
      .replace(/export function [\s\S]*$/g, '');
    tips = new Function(dataClean)();
  } catch (e) {
    reportError('데이터', 'data.js 파싱 실패 (JS 문법 오류)', e.message);
  }

  if (tips.length > 0) {
    reportPass('데이터', `총 ${tips.length}개의 팁 로드 완료`);
    const usedIds = new Set();
    const titles = new Set();

    tips.forEach((tip, idx) => {
      const idTag = `ID:${tip.id || 'N/A'}`;
      
      // 필수 필드
      const required = ['id', 'category', 'title', 'desc', 'tags'];
      required.forEach(f => {
        if (!tip[f]) reportError('데이터', `${idTag} - 필수 필드 누락: ${f}`);
      });

      // ID 중복 및 유효성
      if (tip.id) {
        if (usedIds.has(tip.id)) reportError('데이터', `${idTag} - 중복된 ID 발견`);
        usedIds.add(tip.id);
      }

      // 제목 중복 (경고)
      if (tip.title) {
        if (titles.has(tip.title)) reportWarning('데이터', `${idTag} - 중복된 제목: ${tip.title}`);
        titles.add(tip.title);
      }

      // 플랫폼 유효성
      if (tip.platform && !['win', 'mac', 'all'].includes(tip.platform)) {
        reportError('데이터', `${idTag} - 잘못된 플랫폼 값: ${tip.platform}`);
      }

      // 태그 검사
      if (Array.isArray(tip.tags)) {
        if (tip.tags.length === 0) reportWarning('데이터', `${idTag} - 태그가 비어 있음`);
        tip.tags.forEach(t => {
          if (typeof t !== 'string' || t.trim() === '') reportError('데이터', `${idTag} - 빈 태그 포함`);
        });
      }

      // 다국어 필드 쌍 확인 (제목/설명/태그)
      if (tip.title && !tip.title_en) reportWarning('데이터', `${idTag} - 영어 제목(title_en) 누락`);
      if (tip.desc && !tip.desc_en) reportWarning('데이터', `${idTag} - 영어 설명(desc_en) 누락`);
      if (tip.tags && !tip.tags_en) reportWarning('데이터', `${idTag} - 영어 태그(tags_en) 누락`);

      // 관련 팁 ID 유효성
      if (Array.isArray(tip.related)) {
        tip.related.forEach(rId => {
          if (!tips.find(t => t.id === rId)) reportError('데이터', `${idTag} - 존재하지 않는 관련 팁 ID: ${rId}`);
        });
      }

      // TODO/FIXME 키워드 검사
      const tipStr = JSON.stringify(tip);
      if (tipStr.includes('TODO') || tipStr.includes('FIXME') || tipStr.includes('TBD')) {
        reportWarning('데이터', `${idTag} - 미완성 키워드(TODO/FIXME) 발견`);
      }
    });
  }
}

// 5. HTML/JS/CSS 교차 참조 검사
console.log('\n📋 5. 리소스 교차 참조(Cross-reference) 검사');
const html = readFileSafe(path.join(ROOT, 'popup.html'));
const css = readFileSafe(path.join(ROOT, 'popup.css'));
const jsFiles = ['popup.js', 'js/ui.js', 'js/actions.js', 'js/utils.js'].map(f => readFileSafe(path.join(ROOT, f))).filter(Boolean).join('\n');

if (html && css && jsFiles) {
  // HTML 내의 모든 ID 추출
  const idRegex = /id=["'](.+?)["']/g;
  const idsInHtml = [...html.matchAll(idRegex)].map(m => m[1]);
  
  // JS에서 사용되는 $() 또는 getElementById() 호출 추출
  const jsIdRegex = /\$=["']#(.+?)["']|getElementById\(["'](.+?)["']\)/g;
  const idsInJs = [...jsFiles.matchAll(jsIdRegex)].map(m => m[1] || m[2]).filter(Boolean);

  idsInJs.forEach(id => {
    if (!idsInHtml.includes(id) && !id.includes('${')) { // 동적 ID 제외
       // 일부 ID는 JS에서 생성될 수 있으므로 Warning
       reportWarning('참조', `JS에서 참조하는 ID가 HTML에 없음: #${id}`);
    }
  });

  reportPass('참조', `HTML ID ${idsInHtml.length}개 확인 및 교차 검증 완료`);
}

// 6. 안티패턴 및 코드 품질 검사
console.log('\n📋 6. 안티패턴 및 코드 품질 검사');
const allJsContent = criticalFiles.filter(f => f.endsWith('.js')).map(f => readFileSafe(path.join(ROOT, f))).filter(Boolean).join('\n');

const antiPatterns = [
  { p: /console\.log\(/g, m: '남아있는 console.log 발견 (개발 완료 후 제거 권장)', level: 'warning' },
  { p: /debugger;/g, m: 'debugger 문 발견', level: 'error' },
  { p: /innerHTML\s*=/g, m: 'innerHTML 사용 발견 (XSS 취약점 주의)', level: 'warning' },
  { p: /http:\/\//g, m: 'HTTP 링크 발견 (HTTPS 권장)', level: 'warning' }
];

antiPatterns.forEach(ap => {
  const matches = (allJsContent.match(ap.p) || []).length;
  if (matches > 0) {
    if (ap.level === 'error') reportError('품질', `${ap.m} (${matches}회)`);
    else reportWarning('품질', `${ap.m} (${matches}회)`);
  }
});

// 7. 다국어 카테고리 정의 검사 (js/i18n.js)
console.log('\n📋 7. I18N 카테고리 일관성 검사');
const i18nRaw = readFileSafe(path.join(JS_DIR, 'i18n.js'));
let koCats = [];
let enCats = [];
if (i18nRaw) {
  const extractCat = (lang) => {
    const regex = new RegExp(`${lang}:[\\s\\S]*?categories:\\s*{([\\s\\S]*?)}`, 'm');
    const match = i18nRaw.match(regex);
    if (!match) return [];
    return match[1].split(',').map(s => s.split(':')[0].trim().replace(/['"]/g, '')).filter(Boolean);
  };
  koCats = extractCat('ko');
  enCats = extractCat('en');

  if (koCats.length !== enCats.length) reportError('I18N-CAT', 'KO/EN 카테고리 개수 불일치');
  else reportPass('I18N-CAT', `다국어 카테고리 ${koCats.length}개 일치`);
}

// 8. 팁 데이터 카테고리 실제 사용 여부 검사
if (koCats.length > 0 && typeof tips !== 'undefined') {
  console.log('\n📋 8. 카테고리 정의 및 실제 사용 검사');
  const usedCats = new Set(tips.map(t => t.category));
  usedCats.forEach(cat => {
    if (!koCats.includes(cat)) {
      reportError('데이터', `i18n.js에 정의되지 않은 카테고리 사용됨: ${cat}`);
    }
  });
  koCats.forEach(cat => {
    if (!usedCats.has(cat)) {
      reportWarning('데이터', `정의되었으나 사용되지 않는 카테고리: ${cat}`);
    }
  });
}

// 9. 미사용 이미지 에셋 검사
console.log('\n📋 9. 미사용 이미지 에셋 검사');
const allFilesContent = criticalFiles.map(f => readFileSafe(path.join(ROOT, f))).filter(Boolean).join('\n') + html + css + jsFiles + JSON.stringify(manifest);
try {
  const images = fs.readdirSync(IMAGES_DIR);
  images.forEach(img => {
    if (img === '.DS_Store') return;
    const imgPath = `images/${img}`;
    if (!allFilesContent.includes(imgPath)) {
      reportWarning('에셋', `사용되지 않는 이미지 파일: ${imgPath}`);
    } else {
      reportPass('에셋', `이미지 사용 확인: ${imgPath}`);
    }
  });
} catch (e) {
  reportError('에셋', '이미지 디렉토리를 읽을 수 없음');
}

// ═══════════════════════════════════════════════════
// 결과 요약
// ═══════════════════════════════════════════════════
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`  📊 검사 완료: \x1b[32m✅ ${passed} 패스\x1b[0m / \x1b[33m⚠️ ${warnings} 경고\x1b[0m / \x1b[31m❌ ${errors} 오류\x1b[0m`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (errors > 0) {
  console.log('  \x1b[31m무결성 검사 실패! 오류를 해결해 주세요.\x1b[0m\n');
  process.exit(1);
} else {
  console.log('  \x1b[32m모든 주요 검사를 통과했습니다. 안전한 상태입니다.\x1b[0m\n');
}
