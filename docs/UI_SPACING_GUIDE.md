# 📐 UI Spacing Guide: My Chrome Guide

이 가이드는 "My Chrome Guide" 프로젝트의 시각적 일관성과 프리미엄 사용자 경험을 보장하기 위한 **스페이싱 시스템(Spacing System)**을 정의합니다. 모든 컴포넌트의 Padding, Margin, Gap은 아래 정의된 **4px 그리드 시스템**을 기반으로 설계되어야 합니다.

---

## 🏗️ 4px 그리드 시스템 (Core Philosophy)

본 프로젝트는 모든 수치가 4의 배수인 **4px 그리드**를 기본 단위로 채택합니다. 이는 서로 다른 화면 크기와 해상도에서도 수학적으로 완벽한 균형을 유지하고 디자인의 직관성을 높여줍니다.

- **Base Unit**: `4px`
- **Rule of Thumb**: 모든 레이아웃의 간격은 `4px`로 나누어떨어져야 합니다.

---

## 📏 스페이싱 스케일 (Spacing Scale)

프로젝트에서 공통적으로 사용할 스페이싱 단계입니다. 각 단계는 직관적인 이름과 픽셀 값을 갖습니다.

| Token | Pixels | Multiplier | 주요 용도 (Usage Examples) |
| :--- | :--- | :--- | :--- |
| **`xs`** | 4px | 1 | 아이콘-텍스트 간격, 미세한 조절 |
| **`sm`** | 8px | 2 | 카드 내부 요소 간격, 헤더 컨트롤 간격 |
| **`md`** | 12px | 3 | 버튼 패딩, 카테고리 칩 간격 |
| **`lg`** | 16px | 4 | 리스트 아이템 간 간격, 표준 카드 패딩 (Internal) |
| **`xl`** | 20px | 5 | 메인 컨테이너 패딩, 큰 섹션 간 간격 |
| **`2xl`** | 24px | 6 | 모달 패딩, 주요 레이아웃 블록 간격 |
| **`3xl`** | 32px | 8 | 히어로 섹션 패딩 (Landing), 푸터 패딩 |
| **`4xl`** | 40px | 10 | 큰 섹션 간 상하 마진 |
| **`6xl`** | 64px | 16 | 페이지 최상단/최하단 여백 |

---

## 🏷️ 의미론적 사용 가이드 (Semantic Usage)

단순히 수치만 맞추는 것이 아니라, UI 요소의 **관계**에 따라 적절한 스케일을 선택해야 합니다.

### 1. 내부 패딩 (Internal Padding)
컴포넌트 안에 텍스트나 아이콘이 배치될 때 사용합니다.
- **Micro (xs/sm)**: 작은 툴팁, 배지, 미니 버튼
- **Standard (md/lg)**: 일반적인 카드, 리스트 아이템, 인풋 필드
- **Comfortable (xl/2xl)**: 모달, 메인 팝업 레이아웃

### 2. 요소 간 간격 (Component Gaps)
서로 다른 요소가 나열될 때의 거리입니다.
- **Tight (xs/sm)**: 제목과 설명 사이, 아이콘과 텍스트 사이
- **Normal (md/lg)**: 리스트 내 아이템들 사이, 버튼 그룹 사이
- **Loose (xl/2xl)**: 헤더와 바디 사이, 검색창과 리스트 사이

### 3. 레이아웃 마진 (Layout Margins)
페이지의 전체적인 여백을 설정할 때 사용합니다.
- **Side Margin**: `xl` (20px) 또는 `lg` (16px) 권장
- **Section Margin**: `4xl` (40px) 이상을 사용하여 시각적 그룹화를 명확히 함

---

## 🎨 CSS 변수 활용 제안 (CSS Tokens)

`popup.css` 및 `style.css`의 `:root`에 아래 변수를 추가하여 수치 하드코딩을 방지합니다.

```css
:root {
  /* Spacing Scale Tokens */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 20px;
  --space-2xl: 24px;
  --space-3xl: 32px;
  --space-4xl: 40px;
  --space-6xl: 64px;

  /* Semantic Aliases (Recommended) */
  --padding-card: var(--space-lg);
  --padding-page: var(--space-xl);
  --gap-items: var(--space-md);
}
```

---

## 💡 예시: 현재 UI 적용 가이드

- **팝업 바디 패딩**: `var(--space-xl)` (20px)
- **팁 아이템 패딩**: `var(--space-lg) var(--space-xl)` (16px 20px)
- **헤더 컨트롤 간격**: `var(--space-xs)` (4px)
- **리스트 아이템 간격**: `var(--space-lg)` (16px)

> [!TIP]
> 디자인 작업 시 **8px (Standard)** 단위를 우선적으로 고려하고, 더 세밀한 조정이 필요할 때 **4px** 단위를 보조적으로 사용하세요.

---
최종 업데이트: 2026-04-01  
Antigravity UI/UX Design System
