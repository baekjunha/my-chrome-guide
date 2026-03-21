import { TABS, CATEGORY_ALL, OS, LANG } from './constants.js';

export const state = {
  favorites: [],
  userShortcuts: [],
  currentTab: TABS.ALL,
  currentCategory: CATEGORY_ALL,
  currentOS: OS.WIN,
  isDark: false,
  viewCounts: {},
  tipNotes: {},
  currentNoteId: null,
  editingShortcutId: null, // 수정 중인 지름길 ID 저장
  currentLang: LANG.KO,
  categoryOrder: ["전체", "탭/창", "탐색", "주소창/검색", "화면", "북마크", "편집", "프로필/공간", "AI 기능", "개발자", "설정", "이스터에그"],
  relatedTipsCache: new Map()
};
