# 🔤 UI Typography Guide: My Chrome Guide

이 가이드는 "My Chrome Guide" 프로젝트의 타이포그래피 시스템을 정의합니다. 일관된 글꼴 크기, 두께, 행간을 사용하여 사용자에게 명확한 정보 계층 구조와 프리미엄 읽기 경험을 제공합니다.

---

## 🏗️ 글꼴 구성 (Font Family)

프로젝트는 플랫폼별 최적화된 시스템 폰트와 프리미엄 한글 폰트를 조합하여 사용합니다.

- **Primary (All)**: `Pretendard`, `Inter`
- **macOS**: `-apple-system`, `BlinkMacSystemFont`, `SF Pro Display`
- **Windows**: `Segoe UI`, `Malgun Gothic`

---

## 📏 타이포그래피 스케일 (Typography Scale)

글꼴 크기는 6단계의 단계별 스케일로 관리됩니다.

| Token | Size | 주요 용도 (Usage Examples) |
| :--- | :--- | :--- |
| **`xs`** | 10px | 캡션, 미세 보조 텍스트, 작은 배지 |
| **`sm`** | 11px | 단축키 라벨, 메타 데이터, 하단 팁 카테고리 |
| **`base`** | 13px | **본문 텍스트 (Standard)**, 팁 상세 설명 |
| **`md`** | 15px | 카드 제목, 내비게이션 버튼, 입력창 텍스트 |
| **`lg`** | 18px | 섹션 헤더, 모달 제목, 빈 검색 결과 메시지 |
| **`xl`** | 22px | 일반 제목, 중간 강조 텍스트 |
| **`2xl`** | 32px | 통계 수치, 소형 히어로 제목 |
| **`3xl`** | 40px | 섹션 제목, 주요 타이틀 |
| **`4xl`** | 52px | 대형 히어로 제목 (Landing Page) |

---

## ⚖️ 폰트 웨이트 (Font Weight)

의미론적으로 명확한 대비를 위해 3가지 두께를 권장합니다.

- **Regular (`400`)**: 일반 본문용
- **Medium (`500`) / SemiBold (`700`)**: 보조 제목, 버튼 텍스트
- **Bold (`800` / `900`)**: 메인 제목, 강조 텍스트, 브랜드 로고

---

## ↕️ 행간 (Line Height)

가독성을 위해 텍스트의 성격에 따라 다른 행간을 적용합니다.

- **Tight (`1.2`)**: 대문자 제목, 단축키 라벨
- **Normal (`1.4`)**: 일반 제목, 리스트 설명
- **Relaxed (`1.5`)**: 긴 문장의 본문 설명 (읽기 위주)

---

## 🎨 CSS 변수 활용 (CSS Tokens)

추천하는 프로젝트 전역 CSS 변수 구성입니다.

```css
:root {
  /* Font Size Tokens */
  --font-xs: 10px;
  --font-sm: 11px;
  --font-base: 13px;
  --font-md: 15px;
  --font-lg: 18px;
  --font-xl: 22px;
  --font-2xl: 32px;
  --font-3xl: 40px;
  --font-4xl: 52px;

  /* Font Weight Tokens */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-bold: 800;

  /* Line Height Tokens */
  --lh-tight: 1.2;
  --lh-base: 1.4;
  --lh-relaxed: 1.5;
}
```

---

## 💡 적용 예시

- **팁 제목**: `font-size: var(--font-md); font-weight: var(--weight-bold);`
- **팁 설명**: `font-size: var(--font-base); line-height: var(--lh-relaxed);`
- **대시보드 헤더**: `font-size: var(--font-lg); font-weight: 900;`

---
최종 업데이트: 2026-03-30
Antigravity UI/UX Design System
