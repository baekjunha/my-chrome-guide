import { TABS, CATEGORY_ALL, OS, LANG } from './constants.js';

/**
 * StorageUtility: chrome.storage.local 접근을 래핑하여 에러 핸들링 및 데이터 검증 수행
 */
const StorageUtility = {
  /**
   * 단일 또는 다수 키의 데이터를 로드하고 유효성 검사 수행
   * @param {Object} schema { storageKey: { defaultValue, type } }
   */
  async load(schema) {
    const keys = Object.keys(schema);
    try {
      const result = await chrome.storage.local.get(keys);
      const data = {};

      for (const storageKey of keys) {
        const { defaultValue, type } = schema[storageKey];
        let value = result[storageKey];

        // 데이터가 없거나 유효하지 않을 경우 기본값 사용
        if (value === undefined || value === null || !this._isValid(value, type)) {
          if (value !== undefined && value !== null) {
            console.warn(`[StorageUtility] Validation failed for "${storageKey}". Expected ${type}, got ${typeof value}. Falling back to default.`);
          }
          data[storageKey] = defaultValue;
        } else {
          data[storageKey] = value;
        }
      }
      return data;
    } catch (error) {
      console.warn('[StorageUtility] Load error:', error);
      // 에러 발생 시 모든 키에 대해 기본값 반환
      return Object.keys(schema).reduce((acc, key) => {
        acc[key] = schema[key].defaultValue;
        return acc;
      }, {});
    }
  },

  /**
   * 데이터를 저장소에 업데이트
   * @param {Object} data { storageKey: value }
   */
  async save(data) {
    try {
      await chrome.storage.local.set(data);
    } catch (error) {
      console.warn('[StorageUtility] Save error:', error);
    }
  },

  /**
   * 데이터 타입 유효성 검사
   */
  _isValid(value, type) {
    if (type === 'array') return Array.isArray(value);
    if (type === 'object') return typeof value === 'object' && value !== null && !Array.isArray(value);
    if (type === 'boolean') return typeof value === 'boolean';
    if (type === 'string') return typeof value === 'string';
    if (type === 'number') return typeof value === 'number';
    return true; // type이 정의되지 않은 경우 통과
  }
};

/**
 * AppStore: 프로젝트의 상태(State)와 저장소(Storage)를 관리하는 중앙 모듈
 */
class AppStore {
  constructor() {
    // 기본 설정값 정의
    this.defaults = {
      favorites: [],
      userShortcuts: [
        {
          id: 'youtube-shorts-auto',
          name: "유튜브 쇼츠(Shorts) 바로가기",
          url: 'https://www.youtube.com',
          steps: [
            { type: 'wait', target: '페이지 로딩', value: '1500' },
            { type: 'click', target: 'Shorts' }
          ]
        },
        {
          id: 'github-new-repo',
          name: "GitHub 새 저장소(Repository) 생성",
          url: 'https://github.com',
          steps: [
            { type: 'wait', target: '대시보드 로딩', value: '1000' },
            { type: 'click', target: 'New' },
            { type: 'click', target: 'New repository' }
          ]
        },
        {
          id: 'google-calendar-new',
          name: "구글 캘린더 새 일정 만들기",
          url: 'https://calendar.google.com',
          steps: [
            { type: 'wait', target: '캘린더 로딩', value: '1500' },
            { type: 'click', target: '만들기' },
            { type: 'wait', target: '메뉴 애니메이션', value: '500' },
            { type: 'click', target: '이벤트' }
          ]
        },
        {
          id: 'naver-mail-me',
          name: "네이버 메일 - 내게 쓰기",
          url: 'https://mail.naver.com',
          steps: [
            { type: 'wait', target: '메일함 로딩', value: '1000' },
            { type: 'click', target: '내게쓰기' }
          ]
        },
        {
          id: 'papago-en-ko',
          name: "파파고 영어 번역기 준비",
          url: 'https://papago.naver.com',
          steps: [
            { type: 'wait', target: '로딩', value: '1000' },
            { type: 'click', target: '한국어' },
            { type: 'wait', target: '언어 교체', value: '300' },
            { type: 'input', target: 'textarea#txtSource', value: 'Hello! I am ready to translate.' }
          ]
        }
      ],
      currentTab: TABS.ALL,
      currentCategory: CATEGORY_ALL,
      currentOS: navigator.platform.toUpperCase().indexOf('MAC') >= 0 ? OS.MAC : OS.WIN,
      isDark: false,
      tipNotes: {},
      currentLang: LANG.KO,
      categoryOrder: ["전체", "탭/창", "탐색", "주소창/검색", "화면", "북마크", "편집", "프로필/공간", "AI 기능", "개발자", "설정", "이스터에그", "시스템"],
      hasSeenOnboarding: false
    };

    // 상태 초기화
    this.state = {
      ...this.defaults,
      relatedTipsCache: new Map(),
      debounceTimer: null,
      currentNoteId: null,
      editingShortcutId: null,
      visibleCount: 20, // [최적화] 현재 노출된 아이템 개수
      ITEM_PER_PAGE: 20  // [최적화] 한 번에 추가로 로드할 개수
    };

    // State 키와 Storage 키 간의 매핑 및 스키마 정의
    this.storageSchema = {
      'favs': { stateKey: 'favorites', defaultValue: this.defaults.favorites, type: 'array' },
      'userShortcuts': { stateKey: 'userShortcuts', defaultValue: this.defaults.userShortcuts, type: 'array' },
      'os': { stateKey: 'currentOS', defaultValue: this.defaults.currentOS, type: 'string' },
      'dark': { stateKey: 'isDark', defaultValue: this.defaults.isDark, type: 'boolean' },
      'notes': { stateKey: 'tipNotes', defaultValue: this.defaults.tipNotes, type: 'object' },
      'lang': { stateKey: 'currentLang', defaultValue: this.defaults.currentLang, type: 'string' },
      'categoryOrder': { stateKey: 'categoryOrder', defaultValue: this.defaults.categoryOrder, type: 'array' },
      'onboarding': { stateKey: 'hasSeenOnboarding', defaultValue: this.defaults.hasSeenOnboarding, type: 'boolean' }
    };

    // State 키 -> Storage 키 역매핑 사전 계산
    this.reverseMapping = Object.entries(this.storageSchema).reduce((acc, [storageKey, config]) => {
      acc[config.stateKey] = storageKey;
      return acc;
    }, {});
  }

  /**
   * 초기 데이터 로드 (Storage -> State)
   */
  async load() {
    // StorageUtility에 전달할 스키마 추출
    const schema = Object.keys(this.storageSchema).reduce((acc, storageKey) => {
      acc[storageKey] = {
        defaultValue: this.storageSchema[storageKey].defaultValue,
        type: this.storageSchema[storageKey].type
      };
      return acc;
    }, {});

    const loadedData = await StorageUtility.load(schema);

    // 로드된 데이터를 State에 반영
    const newState = {};
    for (const [storageKey, value] of Object.entries(loadedData)) {
      const stateKey = this.storageSchema[storageKey].stateKey;
      newState[stateKey] = value;
    }

    // [기능 추가] 누락된 기본 매크로 자동 동기화
    if (Array.isArray(newState.userShortcuts)) {
      const existingIds = newState.userShortcuts.map(s => s.id);
      const missingDefaults = this.defaults.userShortcuts.filter(s => !existingIds.includes(s.id));
      
      if (missingDefaults.length > 0) {
        newState.userShortcuts = [...newState.userShortcuts, ...missingDefaults];
        // 저장소에도 즉시 반영
        await chrome.storage.local.set({ userShortcuts: newState.userShortcuts });
      }
    }

    Object.assign(this.state, newState);

    // [최적화] 모듈을 즉시 로드하여 findRelatedTips 함수를 메모리에 확보
    // (for lazy loading later)
    try {
      const dataModule = await import('./data.js');
      this._findRelatedTips = dataModule.findRelatedTips;
    } catch (e) {
      console.warn('[AppStore] Failed to import data.js for related tips');
    }

    return this.state;
  }

  /**
   * [최적화] 관련 팁 데이터 지연 로딩 (Lazy Loading)
   * 필요한 시점에만 계산하고 결과를 캐싱하여 초기 로딩 속도 개선
   */
  getRelatedTips(tipId) {
    if (this.state.relatedTipsCache.has(tipId)) {
      return this.state.relatedTipsCache.get(tipId);
    }

    if (typeof this._findRelatedTips === 'function') {
      const related = this._findRelatedTips(tipId);
      this.state.relatedTipsCache.set(tipId, related);
      return related;
    }

    return [];
  }

  /**
   * 상태 업데이트 및 자동 저장
   * @param {Object} newState 업데이트할 상태 조각
   * @param {Boolean} persist 저장소 저장 여부
   */
  async update(newState, persist = true) {
    Object.assign(this.state, newState);
    
    if (persist) {
      const toSave = {};
      
      for (const [key, value] of Object.entries(newState)) {
        const storageKey = this.reverseMapping[key];
        if (storageKey) {
          toSave[storageKey] = value;
        }
      }

      if (Object.keys(toSave).length > 0) {
        await StorageUtility.save(toSave);
      }
    }
  }

  get(key) {
    return this.state[key];
  }

  /**
   * [UX 확장] 다중 검색 및 가중치 필터링 로직 (Store로 통합)
   * @param {Array} allTips 전체 팁 데이터 배열 (data.js에서 전달)
   * @param {String} filter 검색어
   */
  getFilteredTips(allTips, filter = "") {
    const query = (filter || "").toLowerCase().trim();
    const { currentOS, currentTab, favorites, currentCategory, currentLang } = this.state;
    
    // 1. 기본 필터링 (플랫폼, 탭, 카테고리)
    const baseFiltered = allTips.filter(tip => {
      if (tip.platform && tip.platform !== currentOS) return false;
      
      const matchesTab = (currentTab === TABS.ALL) || 
                         (currentTab === TABS.FAV && favorites.includes(tip.id));
      
      const matchesCat = (currentCategory === CATEGORY_ALL || !currentCategory || tip.category === currentCategory);
      
      return matchesTab && matchesCat;
    });

    if (!query) return baseFiltered;

    const terms = query.split(/\s+/);
    
    return baseFiltered
      .map(tip => {
        let score = 0;
        const lang = currentLang;
        const title = ((lang === LANG.EN && tip.title_en) ? tip.title_en : tip.title || "").toLowerCase();
        const desc = ((lang === LANG.EN && tip.desc_en) ? tip.desc_en : tip.desc || "").toLowerCase();
        const tags = [...(tip.tags || []), ...(tip.tags_en || [])];

        let matchedTerms = 0;
        terms.forEach(term => {
          let termScore = 0;
          if (title === term) termScore += 40;
          else if (title.includes(term)) termScore += 20;

          if (desc.includes(term)) termScore += 10;

          const tagMatch = tags.some(tag => tag.toLowerCase().includes(term));
          if (tagMatch) termScore += 15;

          if (termScore > 0) {
            score += termScore;
            matchedTerms++;
          }
        });

        if (matchedTerms === terms.length) score += 30;
        if (title.includes(query)) score += 20;

        return { tip, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.tip);
  }
}

export const store = new AppStore();
