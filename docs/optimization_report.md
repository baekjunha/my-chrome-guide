# my-chrome-guide 최적화 리팩토링 분석 보고서

## 프로젝트 개요

| 파일 | 크기 | 줄 수 |
|------|------|--------|
| `popup.js` | 122 KB | 2,383줄 |
| `popup.html` | 25 KB | 1,031줄 |
| `content_script.js` | 3 KB | 96줄 |

---

## 🔴 우선순위: 높음 (성능 / 구조적 문제)

### 1. 데이터와 로직의 혼재 — 파일 분리 필요

`popup.js` 한 파일에 팁 데이터 배열(`tips`, ~1,300줄), i18n 문자열(`I18N`), 상태 관리, 렌더링, 이벤트 핸들러가 모두 섞여있다.  

```
현재 구조:
popup.js ─ tips 데이터(1~1369줄) + 로직(1370~2383줄)

권장 구조:
tips.js    → 팁 데이터만 분리
i18n.js    → I18N 문자열 분리
state.js   → 상태 + 초기화
render.js  → DOM 렌더링 함수
events.js  → 이벤트 핸들러
```

> [!IMPORTANT]
> Manifest V3은 Service Worker를 사용하므로, 모듈 분리 시 `popup.html`에서 각 스크립트를 `type="module"` 없이 순서대로 로드하거나, 번들러를 도입해야 한다. 곧바로 ES module로 이행하기보다는 단순 파일 분리 → 스크립트 태그 순서 로드로 시작하는 것이 안전하다.

---

### 2. `renderTips()` 함수 — 매번 전체 DOM 재생성

```js
// 현재: 매 호출마다 innerHTML=""로 초기화 후 전체 재생성
function renderTips(filter = "") {
  listEl.innerHTML = "";   // ← 매번 전체 파괴
  filtered.forEach(tip => {
    const div = document.createElement('div');
    // ...복잡한 innerHTML 조합...
    listEl.appendChild(div);
  });
}
```

- **문제**: 검색어 한 글자 입력마다 `tips` 배열 전체를 필터링 + DOM을 전부 다시 그림
- **개선 방향**:
  - `input` 이벤트에 **debounce** 300ms 적용 (현재 아무 debounce 없음)
  - 팁 카드를 **DocumentFragment**로 먼저 구성 후 한 번에 append (현재 `forEach`마다 개별 append)
  - 이미 렌더링된 상태와 필터 결과가 같으면 re-render Skip 로직 추가

```js
// debounce 적용 예시
let debounceTimer;
$('#search').addEventListener('input', (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => renderTips(e.target.value), 300);
});
```

---

### 3. `findRelatedTips()` — 렌더링마다 O(n²) 연산

```js
// renderTips 내부에서 tip마다 호출됨 (약 140개 팁이라면 140번 × 140번 = ~19,600회 연산)
const related = findRelatedTips(tip.id);
```

- **문제**: 팁을 렌더링할 때마다 모든 팁의 태그를 교차 비교
- **개선 방향**:
  - `tips` 데이터 로드 시점에 **관련 팁 관계를 전처리(pre-compute)**하여 Map으로 캐싱
  - 렌더링 시에는 캐시 조회만 수행

```js
// 초기화 시 1회만 연산
const relatedTipsCache = new Map();
tips.forEach(tip => {
  relatedTipsCache.set(tip.id, findRelatedTips(tip.id));
});

// renderTips 내부 (O(1) 조회)
const related = relatedTipsCache.get(tip.id) ?? [];
```

---

## 🟡 우선순위: 중간 (유지보수성 / 코드 품질)

### 4. `popup.html`의 CSS `<style>` 태그 3개 분산

```html
<!-- 현재: 3군데로 나뉜 <style> 태그 -->
<style>/* 메인 스타일 (라인 6~838) */</style>
<style>/* 복사 단축키 스타일 (라인 839~852) */</style>
<style>/* 토스트 스타일 (라인 853~876) */</style>
```

- **개선 방향**: 외부 `popup.css` 파일로 통합 분리, `<link rel="stylesheet">` 로드

---

### 5. `content_script.js` 의 MutationObserver — 과도한 호출 가능성

```js
// 모든 DOM 변경(childList, subtree)마다 runEngine() 실행
const observer = new MutationObserver(() => {
  runEngine(); // ← isProcessing 가드가 있지만, 이벤트 자체가 매우 빈번할 수 있음
});
observer.observe(document.body, { childList: true, subtree: true });
```

- **개선 방향**:
  - `activeShortcutTask` 가 없을 때는 observer를 `disconnect()` 해두었다가, 작업 시작 시 다시 연결
  - 또는 `throttle` 적용하여 최소 500ms 간격으로 호출 제한

```js
// 개선안: 작업이 없으면 관찰 중지
chrome.storage.onChanged.addListener((changes) => {
  if (changes.activeShortcutTask?.newValue) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    observer.disconnect();
  }
});
```

---

### 6. 이벤트 리스너 등록 방식 혼용

```js
// 방식 1: DOMContentLoaded 내부에서 addEventListener
$('#stats-btn').addEventListener('click', openStatsModal);

// 방식 2: 최상위 스코프에서 onclick 직접 할당
$('#dark-btn').onclick = async () => { ... };
$('#os-win').onclick = () => handleOSChange(OS.WIN);

// 방식 3: HTML에 인라인 onlick
<button onclick="deleteNote()">삭제</button>
<button onclick="saveNote()">저장</button>
```

- **문제**: 세 가지 방식이 혼용되어 이벤트 등록 흐름이 불분명하고, 인라인 `onclick`은 Content Security Policy(CSP) 위반 위험이 있음
- **개선 방향**: 모든 이벤트를 `DOMContentLoaded` 콜백 안에서 `addEventListener`로 통일

---

### 7. 중복된 팁 항목 (ID 중복 가능성)

- `id: 117` "AI 기반 탭 정리" 와 `id: 140` "AI 스마트 탭 정리"는 내용이 거의 동일
- `id: 120` "AI 테마 생성" 과 `id: 138` "AI로 나만의 테마 생성"도 사실상 중복
- **개선 방향**: 중복 팁 정리 및 ID 체계를 순차 정수로 정규화

---

### 8. `lang` 변수 재선언 (`renderTips` 내부)

```js
function renderTips(filter = "") {
  const lang = state.currentLang;  // ← 여기서 선언
  // ...
  filtered.forEach(tip => {
    const lang = state.currentLang; // ← 동일 변수 재선언 (shadowing)
    // ...
  });
}
```

- `forEach` 콜백 안에서 `const lang`을 한 번 더 선언하는 변수 섀도잉 발생
- **개선 방향**: 콜백 내부의 중복 선언 제거

---

## 🟢 우선순위: 낮음 (코드 정리 / 소소한 개선)

### 9. `$()` 헬퍼 함수 활용 일관성

```js
const $ = (selector) => document.querySelector(selector);

// ✅ 사용하는 곳
$('#search').value

// ❌ 직접 호출하는 곳도 존재
document.querySelector('.btn-delete').textContent = strings.noteDelete;
document.querySelector('.btn-save').textContent = strings.noteSave;
```

- **개선 방향**: `document.querySelector` 직접 호출 대신 `$()` 헬퍼로 통일

---

### 10. 하드코딩된 색상값

```js
function applyTheme() {
  const CHROME_BLUE = '#4285f4';
  const CHROME_GREEN = '#0f9d58';
  // ...
}
```

- CSS 변수와 JS 코드에 색상값이 분산됨
- **개선 방향**: CSS 변수를 JS에서 직접 읽거나(`getComputedStyle`), 색상을 CSS에만 정의하고 JS에서 CSS 변수명으로 참조

---

## 📋 최적화 우선순위 요약

| # | 항목 | 효과 | 난이도 |
|---|------|------|--------|
| 2 | `renderTips` debounce 추가 | 🚀 성능 | ⭐ 쉬움 |
| 3 | `findRelatedTips` 결과 캐싱 | 🚀 성능 | ⭐ 쉬움 |
| 5 | MutationObserver 조건부 연결/해제 | 🚀 성능 | ⭐⭐ 보통 |
| 6 | 이벤트 리스너 방식 통일 | 🔧 안정성 | ⭐⭐ 보통 |
| 7 | 중복 팁 정리 | 📦 유지보수 | ⭐ 쉬움 |
| 8 | 변수 섀도잉 제거 | 🔧 코드 품질 | ⭐ 쉬움 |
| 4 | CSS 파일 분리 | 📦 유지보수 | ⭐ 쉬움 |
| 1 | JS 파일 모듈화 분리 | 📦 유지보수 | ⭐⭐⭐ 어려움 |
| 9 | `$()` 헬퍼 일관 적용 | 🔧 코드 품질 | ⭐ 쉬움 |
| 10 | 색상 변수 일원화 | 🔧 코드 품질 | ⭐ 쉬움 |
