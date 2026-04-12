const fs = require('fs');

// 1. Refactor popup.html
let html = fs.readFileSync('popup.html', 'utf8');

html = html.replace(
  /<div class="rbac-bar"[\s\S]*?>([\s\S]*?)<\/div>\s*<div id="daily-card">/m,
  `<div class="rbac-bar">
    <div class="rbac-group">
      <span class="rbac-label">Workspace:</span>
      <select id="workspace-select" class="rbac-select">
        <option value="personal">🏠 개인용 (Personal)</option>
        <option value="company">🏢 회사용 (Antigravity)</option>
      </select>
    </div>
    <div class="rbac-group">
      <span class="rbac-label">Role:</span>
      <select id="role-select" class="rbac-select">
        <option value="admin">👑 관리자 (Admin)</option>
        <option value="viewer">👀 뷰어 (Viewer)</option>
      </select>
    </div>
  </div>

  <div id="daily-card">`
);

html = html.replace(
  /<div id="shortcut-controls"[\s\S]*?>([\s\S]*?)<\/div>\s*<!-- 통계 전용 영역/m,
  `<div id="shortcut-controls" class="shortcut-controls">
    <!-- 작고 미니멀한 우측 정렬 공유 버튼들 -->
    <div class="macro-share-actions">
      <button id="macro-export-btn" class="icon-btn macro-share-btn" title="매크로 내보내기"><span class="svg-icon" style="pointer-events:none;"></span></button>
      <button id="macro-import-btn" class="icon-btn macro-share-btn" title="매크로 불러오기"><span class="svg-icon" style="pointer-events:none;"></span></button>
      <input type="file" id="macro-import-file" accept=".json" style="display: none;">
    </div>

    <!-- 메인 생성 버튼 (방해받지 않음) -->
    <button id="add-shortcut-btn" class="go-btn add-shortcut-btn">+ 새 매크로 만들기</button>
  </div>

  <!-- 통계 전용 영역`
);

html = html.replace(
  /<div id="analytics-container".*?>([\s\S]*?)<\/div>/,
  `<div id="analytics-container" class="analytics-container">$1</div>`
);

html = html.replace(
  /<div id="shortcut-modal" class="modal".*?>([\s\S]*?)<!-- 메모 모달 -->/m,
  `<div id="shortcut-modal" class="modal">
    <div class="modal-content shortcut-modal-content">
      <div class="modal-header">
        <h3 id="shortcut-modal-title"><span class="svg-icon sc-rocket-icon modal-title-icon"></span> 1클릭 매크로 설계</h3>
        <button class="modal-close shortcut-close" aria-label="닫기">✕</button>
      </div>
      
      <!-- 안내 섹션 -->
      <div class="shortcut-info-box">
        <p class="shortcut-info-text">
          <strong><span class="svg-icon sc-lightbulb-icon shortcut-info-icon"></span> 매크로란?</strong><br>
          복잡한 메뉴 깊숙이 숨겨진 페이지를 버튼 하나로 찾아가는 '자율주행 북마크'입니다.
        </p>
      </div>

      <div class="shortcut-form-container">
        <!-- 1. 이름 -->
        <div class="form-group">
          <label class="form-label">
            <span class="svg-icon sc-tag-icon form-label-icon"></span> 매크로 이름
          </label>
          <input type="text" id="sc-name" placeholder="예: 네이버 메일 수신확인, 학사행정">
        </div>

        <!-- 2. 시작 주소 -->
        <div class="form-group">
          <label class="form-label">
            <span class="svg-icon sc-globe-icon form-label-icon"></span> 시작 URL
          </label>
          <input type="text" id="sc-url" placeholder="https://...">
        </div>

        <!-- 3. 여정 설계 (녹화 중심) -->
        <div class="shortcut-steps-box">
          <label class="form-label center-label">
            <span class="svg-icon sc-bot-icon form-label-icon"></span> 매크로 동작 정의
          </label>
          
          <div class="shortcut-actions-row">
            <button id="record-shortcut-btn" class="btn-record">
              <span class="svg-icon record-indicator">●</span> <span id="record-btn-text">녹화 시작</span>
            </button>
            <button id="add-step-item-btn" class="btn-add-step">
              + 수동 스텝 추가
            </button>
          </div>

          <div id="sc-steps-container" class="steps-container">
            <!-- Steps will be dynamically injected here -->
          </div>
          
          <button id="save-shortcut-btn" class="btn-save-macro">
            <span class="svg-icon sc-check-icon">✓</span> <span>변경사항 저장</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 메모 모달 -->`
);

html = html.replace(
  /<div id="onboarding-modal" class="modal".*?>([\s\S]*?)<\/script>/m,
  `<div id="onboarding-modal" class="modal">
    <div class="modal-content onboarding-content">
      <div id="onboarding-icon" class="onboarding-icon-wrapper">
        <span class="svg-icon sc-rocket-icon onboarding-icon"></span>
      </div>
      
      <h2 class="onboarding-title">환영합니다! 🎉</h2>
      
      <p class="onboarding-desc">
        크롬 전문가들이 선별한 <strong>130여 개의 꿀팁</strong>과,<br>
        귀찮은 작업을 자동화하는 <strong>1클릭 매크로</strong>가 준비되었습니다.<br>
        이제 더 빠르고 똑똑한 브라우징을 시작하세요.
      </p>

      <div class="onboarding-features-grid">
        <div class="feature-card">
          <div class="feature-emoji">📚</div>
          <div class="feature-title">139+ 팁 뱅크</div>
        </div>
        <div class="feature-card">
          <div class="feature-emoji">⚡</div>
          <div class="feature-title">1클릭 매크로</div>
        </div>
        <div class="feature-card">
          <div class="feature-emoji">✍️</div>
          <div class="feature-title">개인 메모</div>
        </div>
        <div class="feature-card">
          <div class="feature-emoji">🔒</div>
          <div class="feature-title">100% 보안 준수</div>
        </div>
      </div>

      <button id="start-onboarding-btn" class="btn-start-onboarding">
        네, 완벽해요! 시작하기
      </button>
    </div>
  </div>

  <script type="module" src="popup.js"></script>\`
);
fs.writeFileSync('popup.html', html);


// 2. Refactor popup.css
let css = fs.readFileSync('popup.css', 'utf8');

// Deduplicate variables
css = css.replace(
  /  --font-base: 13px;\n  --font-md: 15px;\n  --font-lg: 18px;\n  --font-xl: 22px;\n\n  --font-base: 13px;\n  --font-md: 15px;\n  --font-lg: 18px;\n  --font-xl: 22px;\n  --font-2xl: 32px;\n  --font-3xl: 40px;\n  --font-4xl: 52px;/,
  `  --font-base: 13px;
  --font-md: 15px;
  --font-lg: 18px;
  --font-xl: 22px;
  --font-2xl: 32px;
  --font-3xl: 40px;
  --font-4xl: 52px;`
);

// Apply 4px Grid Spacing rules and Typography tokens
css = css.replace(/padding: 22px;/g, 'padding: var(--space-2xl); /* 24px */');
css = css.replace(/padding: 14px 20px;/g, 'padding: var(--space-lg) var(--space-xl); /* 16px 20px */');
css = css.replace(/padding: 7px 16px;/g, 'padding: var(--space-sm) var(--space-lg); /* 8px 16px */');
css = css.replace(/gap: 6px;/g, 'gap: var(--space-sm); /* 8px */');
css = css.replace(/margin-bottom: 10px;/g, 'margin-bottom: var(--space-md); /* 12px */');
css = css.replace(/margin-bottom: 6px;/g, 'margin-bottom: var(--space-sm); /* 8px */');
css = css.replace(/padding: 6px 14px;/g, 'padding: var(--space-sm) var(--space-lg); /* 8px 16px */');
css = css.replace(/padding: 6px 10px;/g, 'padding: var(--space-sm) var(--space-md); /* 8px 12px */');
css = css.replace(/padding: 18px;/g, 'padding: var(--space-xl); /* 20px */');
css = css.replace(/width: 30px;\n  height: 30px;/g, 'width: 32px;\n  height: 32px;');

const newClasses = `

/* ── [리팩토링] HTML 인라인 스타일 추출 클래스 ── */

/* RBAC Bar */
.rbac-bar {
  display: flex;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
  background: var(--surface);
  border: 1px solid var(--border);
  align-items: center;
  box-shadow: var(--shadow);
  margin-bottom: var(--space-xs);
}
.rbac-group {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
}
.rbac-label {
  font-weight: var(--weight-bold);
  color: var(--text-sub);
  font-size: var(--font-sm);
  letter-spacing: 0.3px;
}
.rbac-select {
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 7px 12px;
  font-size: var(--font-sm);
  font-weight: var(--weight-medium);
  font-family: inherit;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}
.rbac-select:hover {
  border-color: var(--accent);
  background: var(--surface-opaque);
}
.rbac-select:focus {
  border-color: var(--accent);
  box-shadow: var(--focus-ring);
}

/* Shortcut Controls */
.shortcut-controls {
  display: none;
  margin-bottom: var(--space-lg);
}
.macro-share-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}
.macro-share-btn {
  width: var(--space-2xl);
  height: var(--space-2xl);
  background: transparent;
  border: none;
  box-shadow: none;
  opacity: 0.5;
  transition: opacity 0.2s;
}
.macro-share-btn:hover {
  opacity: 1;
}
.add-shortcut-btn {
  margin-top: 0;
  box-shadow: 0 var(--space-xs) var(--space-md) rgba(30, 64, 175, 0.15);
}

/* Analytics Container */
.analytics-container {
  display: none;
  padding: var(--space-md);
}

/* Shortcut Modal */
.shortcut-modal-content {
  width: 95%;
  max-width: 380px;
}
.modal-title-icon {
  color: var(--accent);
  margin-right: var(--space-xs);
}
.shortcut-info-box {
  background: var(--accent-bg);
  padding: var(--space-md) var(--space-lg);
  margin: var(--space-md) var(--space-xl) 0;
  border-radius: var(--space-md);
  border: 1px dashed var(--accent);
}
.shortcut-info-text {
  margin: 0;
  font-size: var(--font-sm);
  color: var(--accent-txt);
  line-height: var(--lh-relaxed);
}
.shortcut-info-icon {
  color: var(--accent);
  margin-right: 2px;
  vertical-align: middle;
}
.shortcut-form-container {
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}
.form-label {
  font-size: var(--font-base);
  font-weight: var(--weight-bold);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}
.center-label {
  justify-content: center;
  margin-bottom: var(--space-md);
}
.form-label-icon {
  color: var(--accent);
}
.shortcut-steps-box {
  background: var(--bg);
  padding: var(--space-xl);
  border-radius: var(--space-lg);
  border: 1px solid var(--border);
  text-align: center;
}
.shortcut-actions-row {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}
.btn-record {
  flex: 1;
  padding: var(--space-md);
  background: var(--accent);
  border: none;
  border-radius: var(--space-sm);
  color: white;
  font-size: var(--font-base);
  cursor: pointer;
  font-weight: var(--weight-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
}
.record-indicator {
  color: #fff;
  font-size: var(--font-md);
}
.btn-add-step {
  flex: 1;
  padding: var(--space-md);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--space-sm);
  color: var(--text);
  font-size: var(--font-base);
  cursor: pointer;
  font-weight: var(--weight-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
}
.steps-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
  text-align: left;
  max-height: 250px;
  overflow-y: auto;
  padding-right: var(--space-xs);
}
.btn-save-macro {
  width: 100%;
  padding: var(--space-lg);
  background: #10b981;
  border: none;
  border-radius: var(--space-md);
  color: white;
  font-size: var(--font-md);
  cursor: pointer;
  font-weight: var(--weight-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  box-shadow: 0 var(--space-xs) var(--space-md) rgba(16, 185, 129, 0.2);
}

/* Onboarding Modal */
.onboarding-content {
  max-width: 420px;
  text-align: center;
  padding: var(--space-4xl) var(--space-2xl);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.onboarding-icon-wrapper {
  background: var(--accent-bg); /* Use accent-bg instead of hardcoded color */
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-2xl);
  box-shadow: 0 var(--space-sm) var(--space-xl) rgba(37, 99, 235, 0.15);
}
.onboarding-icon {
  color: var(--accent);
  width: 36px;
  height: 36px;
}
.onboarding-title {
  margin: 0 0 var(--space-md);
  font-size: var(--font-2xl);
  letter-spacing: -0.5px;
  color: var(--text);
  font-weight: 900;
}
.onboarding-desc {
  margin: 0 0 var(--space-3xl);
  color: var(--text-sub);
  line-height: var(--lh-relaxed);
  font-size: var(--font-md);
  font-weight: var(--weight-medium);
}
.onboarding-features-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-bottom: var(--space-3xl);
}
.feature-card {
  background: var(--bg-high);
  padding: var(--space-lg);
  border-radius: var(--space-lg);
  border: 1px solid var(--border);
}
.feature-emoji {
  font-size: var(--font-lg);
  margin-bottom: var(--space-sm);
}
.feature-title {
  font-size: var(--font-base);
  font-weight: var(--weight-bold);
  color: var(--text);
}
.btn-start-onboarding {
  width: 100%;
  padding: var(--space-lg);
  background: var(--accent);
  border: none;
  border-radius: var(--space-md);
  color: white;
  font-weight: 900;
  font-size: var(--font-lg);
  cursor: pointer;
  box-shadow: 0 var(--space-sm) var(--space-lg) rgba(37, 99, 235, 0.2);
  transition: transform 0.2s;
}
.btn-start-onboarding:hover {
  transform: translateY(-2px);
}
`;

css += newClasses;

fs.writeFileSync('popup.css', css);
console.log('UI Refactoring Complete');