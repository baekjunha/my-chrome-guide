# 2차 최적화 및 리팩토링 제안서

코드베이스 분석 결과, 이전 보고서의 주요 개선 사항(파일 분리, 모듈화, 스타일 통합 등)은 대부분 반영되었습니다. 추가적으로 성능과 유지보수성을 높일 수 있는 요소들을 정리했습니다.

---

## 1. 성능 및 엔진 최적화 (Priority: High)

### 🚀 자동화 엔진(Content Script) Throttling 적용
현재 `content_script.js`의 `MutationObserver`는 DOM이 조금이라도 변경될 때마다 `runEngine()`을 호출합니다. 비록 내부 가드가 있지만, 매우 빈번한 DOM 변경이 일어나는 페이지에서는 불필요한 연산이 발생할 수 있습니다.
- **제안**: `MutationObserver` 콜백에 `throttle`(예: 500ms)을 적용하여 실행 빈도를 제한합니다.

---

## 2. 디자인 시스템 및 유지보수 (Priority: Medium)

### 🎨 하드코딩된 색상값 추출 (ui.js)
`ui.js`의 `applyTheme()` 함수 내부에 강조색(`#4285f4`) 등이 자바스크립트에 직접 하드코딩되어 있습니다. 
- **제안**: 모든 색상 정의를 `popup.css` 내의 CSS 변수(`--accent`)로 일원화하고, JS에서는 클래스 토글만 수행하거나 `getComputedStyle`을 통해 변수값을 가져오도록 수정합니다.

### ♿ 접근성(Accessibility) 강화
아이콘 버튼(`#stats-btn`, `#dark-btn`, `.fav-btn` 등)에 시각 장애인을 위한 `aria-label`이나 스크린 리더용 텍스트가 부족한 곳이 있습니다.
- **제안**: 모든 아이콘 전용 버튼에 적절한 `aria-label` 또는 `title` 속성을 보강합니다.

---

## 3. 코드 QUALITY 및 로직 (Priority: Low)

### 📜 DocumentFragment 활용
`renderTips`에서 다량의 팁을 반복문으로 생성할 때, 매번 `listEl.appendChild()`를 호출하면 레이아웃 리플로우가 여러 번 발생할 수 있습니다. 
- **제안**: `DocumentFragment`에 먼저 모든 요소를 붙인 뒤, 마지막에 한 번만 `listEl.appendChild()`를 수행하여 렌더링 성능을 개선합니다.

### 🌐 I18N 누락 확인 및 정리
`manifest.json`의 설명과 일부 특수 상황(에러 처리 등)에서 사용되는 문자열이 `i18n.js`에 모두 포함되어 있는지 재점검이 필요합니다.

---

## 요약 추천 순서
1. **자동화 엔진 Throttling**: 성능에 가장 큰 도움을 줄 수 있습니다.
2. **접근성(a11y) 보강**: 사용자 친화적인 확장을 위해 필수적입니다.
3. **색상값 일원화**: 디자인 변경 시 유지보수가 쉬워집니다.
