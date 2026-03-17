const tips = [
  // ── 탭 / 창 관리 ──────────────────────────────
  {
    id: 1, category: "탭/창",
    title: "실수로 닫은 탭 복구",
    title_en: "Reopen Closed Tab",
    desc: "방금 닫은 탭을 순서대로 다시 열어줍니다.",
    desc_en: "Reopens the last closed tab in order.",
    shortcut: { win: "Ctrl + Shift + T", mac: "Cmd + Shift + T" },
    tags: ["탭", "복구", "실수", "되돌리기", "삭제", "방금", "살리기", "되살리기", "실수로닫음", "방금닫은"],
    tags_en: ["tab", "recovery", "mistake", "undo", "delete", "just now", "back", "reopen", "restore", "bring back", "unclose", "tab recovery"]
  },
  {
    id: 2, category: "탭/창",
    title: "새 탭 열기",
    title_en: "Open New Tab",
    desc: "새 탭을 빠르게 엽니다.",
    desc_en: "Quickly opens a new tab.",
    shortcut: { win: "Ctrl + T", mac: "Cmd + T" },
    tags: ["새탭", "탭", "열기", "추가", "플러스", "탭추가"],
    tags_en: ["new tab", "tab", "open", "add tab", "plus", "newtab", "open tab", "new"]
  },
  {
    id: 3, category: "탭/창",
    title: "현재 탭 닫기",
    title_en: "Close Current Tab",
    desc: "현재 보고 있는 탭을 닫습니다.",
    desc_en: "Closes the currently active tab.",
    shortcut: { win: "Ctrl + W", mac: "Cmd + W" },
    tags: ["탭닫기", "닫기", "종료", "끄기", "꺼짐", "탭끄기", "닫아"],
    tags_en: ["close tab", "close", "exit", "quit", "exit tab", "bye"]
  },
  {
    id: 4, category: "탭/창",
    title: "다음 / 이전 탭 이동",
    title_en: "Next / Previous Tab",
    desc: "탭을 순서대로 오가며 빠르게 전환합니다.",
    desc_en: "Quickly switch between tabs in order.",
    shortcut: { win: "Ctrl + Tab / Ctrl + Shift + Tab", mac: "Cmd + Option + → / ← (또는 Ctrl + Tab / Shift + Tab)" },
    shortcut_en: { win: "Ctrl + Tab / Ctrl + Shift + Tab", mac: "Cmd + Option + → / ← (or Ctrl + Tab / Shift + Tab)" },
    tags: ["탭이동", "전환", "다음탭", "이전탭", "바꾸기", "옆으로", "순서", "오른쪽", "왼쪽"],
    tags_en: ["tab switch", "switch", "next tab", "previous tab", "prev tab", "change", "side", "order", "next", "previous", "move", "right", "left"]
  },
  {
    id: 5, category: "탭/창",
    title: "특정 탭으로 바로 이동",
    desc: "1번~8번 탭으로 즉시 이동합니다. 9는 마지막 탭.",
    title_en: "Go to a Specific Tab",
    desc_en: "Instantly jump to tabs 1 through 8. 9 is the last tab.",
    shortcut: { win: "Ctrl + 1 ~ 9", mac: "Cmd + 1 ~ 9" },
    tags: ["탭번호", "탭이동", "빠른탭", "숫자", "바로가기", "점프", "고속이동", "번호이동", "1번", "9번"],
    tags_en: ["tab number", "go to tab", "quick tab", "number", "shortcut", "jump", "fast move", "go to number", "tab 1", "tab 9", "last tab"]
  },
  {
    id: 6, category: "탭/창",
    title: "탭을 새 창으로 분리",
    title_en: "Detach Tab into New Window",
    desc: "탭을 드래그해서 새 창으로 떼어냅니다.",
    desc_en: "Drag a tab out of the window to detach it.",
    shortcut: { win: "탭 드래그 > 창 밖으로", mac: "탭 드래그 > 창 밖으로" },
    shortcut_en: { win: "Drag tab > out of window", mac: "Drag tab > out of window" },
    tags: ["분리", "새창", "드래그", "떼기", "따로", "창분리", "꺼내기", "바깥으로"],
    tags_en: ["detach", "new window", "drag", "split", "separate", "move tab", "pull out"]
  },
  {
    id: 7, category: "탭/창",
    title: "새 창 열기",
    title_en: "Open New Window",
    desc: "별도의 크롬 창을 새로 엽니다.",
    desc_en: "Opens a separate new Chrome window.",
    shortcut: { win: "Ctrl + N", mac: "Cmd + N" },
    tags: ["새창", "창열기", "추가창", "별도창", "새로운창", "윈도우"],
    tags_en: ["new window", "open window", "window", "add window", "separate window", "newwin"]
  },
  {
    id: 8, category: "탭/창",
    title: "시크릿 모드 (사생활 보호)",
    title_en: "Incognito Mode (Privacy)",
    desc: "기록을 남기지 않고 웹서핑을 합니다.",
    desc_en: "Browse the web without saving your history.",
    shortcut: { win: "Ctrl + Shift + N", mac: "Cmd + Shift + N" },
    tags: ["몰래", "기록", "비밀", "야동", "선물", "사생활", "보안", "숨기기", "남기지않기", "히든", "인코그니토", "기록안남기기", "몰컴"],
    tags_en: ["private", "incognito", "security", "hide", "no history", "hidden", "secret", "privacy"]
  },
  {
    id: 9, category: "탭/창",
    title: "탭 그룹화",
    title_en: "Group Tabs",
    desc: "탭들을 주제별로 묶어 깔끔하게 정리하세요.",
    desc_en: "Organize your tabs by grouping them by topic.",
    shortcut: { win: "탭 우클릭 > 그룹 추가", mac: "탭 우클릭 > 그룹 추가" },
    shortcut_en: { win: "Right-click tab > Add to group", mac: "Right-click tab > Add to group" },
    tags: ["정리", "그룹", "지저분", "복잡", "모으기", "묶기", "정렬", "폴더", "정리정돈", "깔끔하게", "뭉치기"],
    tags_en: ["organize", "group", "messy", "complex", "gather", "clean", "folder", "sort", "tab group"]
  },
  {
    id: 10, category: "탭/창",
    title: "현재 탭 음소거",
    title_en: "Mute Current Tab",
    desc: "시끄러운 탭을 클릭 한 번으로 음소거합니다.",
    desc_en: "Mute a noisy tab with a single click.",
    shortcut: { win: "탭 우클릭 > 사이트 음소거", mac: "탭 우클릭 > 사이트 음소거" },
    shortcut_en: { win: "Right-click tab > Mute site", mac: "Right-click tab > Mute site" },
    tags: ["소리", "시끄러워", "광고", "음소거", "뮤트", "끄기", "조용히", "소리끄기", "조용"],
    tags_en: ["sound", "noisy", "ad", "mute", "volume", "off", "quiet", "speaker", "no sound", "silent"]
  },
  {
    id: 84, category: "탭/창",
    title: "열려있는 탭 검색하기",
    title_en: "Search Open Tabs",
    desc: "수많은 탭 중에서 원하는 탭을 키워드로 빠르게 찾아냅니다.",
    desc_en: "Quickly find a specific tab among many by keyword.",
    shortcut: { win: "Ctrl + Shift + A", mac: "Cmd + Shift + A" },
    tags: ["탭검색", "찾기", "탭찾기", "수많은탭", "탭관리", "검색", "필터"],
    tags_en: ["tab search", "find", "find tab", "many tabs", "tab management", "search", "filter", "filter tabs"]
  },
  // ── 탐색 ──────────────────────────────────────
  {
    id: 11, category: "탐색",
    title: "페이지 맨 위 / 맨 아래로",
    title_en: "To Page Top / Bottom",
    desc: "스크롤 없이 페이지 처음이나 끝으로 이동합니다.",
    desc_en: "Go to the beginning or end of the page without scrolling.",
    shortcut: { win: "Home / End", mac: "Cmd + ↑ / Cmd + ↓" },
    tags: ["맨위", "맨아래", "스크롤", "끝", "처음", "끝으로", "시작으로", "가장위", "가장아래"],
    tags_en: ["top", "bottom", "scroll", "end", "beginning", "up", "down", "home", "end", "page top", "page bottom"]
  },
  {
    id: 12, category: "탐색",
    title: "한 화면씩 스크롤",
    title_en: "Scroll by Screen",
    desc: "페이지를 한 화면 단위로 부드럽게 내립니다.",
    desc_en: "Smoothly scrolls the page one screen at a time.",
    shortcut: { win: "Space / Shift + Space", mac: "Space / Shift + Space" },
    tags: ["스크롤", "내리기", "올리기", "페이지", "단위", "화면단위", "한칸씩", "스페이스"],
    tags_en: ["scroll", "page down", "page up", "space", "unit", "screen unit", "pagedown", "pageup"]
  },
  {
    id: 13, category: "탐색",
    title: "앞으로 / 뒤로 이동",
    title_en: "Go Forward / Back",
    desc: "브라우저 히스토리를 앞뒤로 이동합니다.",
    desc_en: "Navigates forward and backward through your browser history.",
    shortcut: { win: "Alt + ← / Alt + →", mac: "Cmd + [ / Cmd + ] (또는 Cmd + ← / →)" },
    shortcut_en: { win: "Alt + ← / Alt + →", mac: "Cmd + [ / Cmd + ] (or Cmd + ← / →)" },
    tags: ["뒤로", "앞으로", "이전", "다음", "히스토리", "브라우징", "이전페이지", "다음페이지", "뒤가기", "앞가기"],
    tags_en: ["back", "forward", "previous", "next", "history", "browsing", "go back", "go forward", "backspace"]
  },
  {
    id: 14, category: "탐색",
    title: "페이지 새로고침",
    title_en: "Reload Page",
    desc: "현재 페이지를 새로 불러옵니다.",
    desc_en: "Reloads the current page.",
    shortcut: { win: "F5 또는 Ctrl + R", mac: "Cmd + R" },
    shortcut_en: { win: "F5 or Ctrl + R", mac: "Cmd + R" },
    tags: ["새로고침", "리로드", "갱신", "다시읽기", "고침", "새로", "페이지새로고침", "다시", "또읽기"],
    tags_en: ["refresh", "reload", "update", "retry", "reload page", "f5", "re-fresh"]
  },
  {
    id: 15, category: "탐색",
    title: "강력 새로고침 (캐시 무시)",
    title_en: "Hard Refresh (Ignore Cache)",
    desc: "캐시를 무시하고 페이지를 완전히 다시 불러옵니다.",
    desc_en: "Completely reloads the page, ignoring the cache.",
    shortcut: { win: "Ctrl + Shift + R", mac: "Cmd + Shift + R" },
    tags: ["캐시", "강력", "새로고침", "안바뀌어", "완전", "클린", "캐시무시", "지우고새로고침", "포스리로드"],
    tags_en: ["cache", "hard refresh", "force reload", "not changing", "complete", "clean", "clean reload", "hard", "ignore cache"]
  },
  {
    id: 16, category: "탐색",
    title: "주소창으로 바로 이동",
    title_en: "Jump to Address Bar",
    desc: "마우스 없이 URL 입력창으로 포커스를 옮깁니다.",
    desc_en: "Moves the focus to the URL input field without using the mouse.",
    shortcut: { win: "Ctrl + L 또는 F6", mac: "Cmd + L" },
    shortcut_en: { win: "Ctrl + L or F6", mac: "Cmd + L" },
    tags: ["주소창", "URL", "검색", "이동", "입력", "타이핑", "링크입력", "옴니박스", "주소입력", "링크창"],
    tags_en: ["address bar", "URL", "search", "go to", "search bar", "input", "typing", "urlbar", "omnibox", "go to url"]
  },
  {
    id: 17, category: "탐색",
    title: "페이지 내 단어 검색",
    title_en: "Find in Page",
    desc: "현재 페이지에서 특정 단어를 빠르게 찾습니다.",
    desc_en: "Quickly finds a specific word on the current page.",
    shortcut: { win: "Ctrl + F", mac: "Cmd + F" },
    tags: ["찾기", "검색", "단어", "하이라이트", "문구", "텍스트찾기", "텍스트", "찾아내기", "검색어", "찾어"],
    tags_en: ["find", "search", "word", "highlight", "phrase", "find text", "ctrlf", "cmdf", "text"]
  },
  {
    id: 18, category: "탐색",
    title: "링크를 새 탭에서 열기",
    title_en: "Open Link in New Tab",
    desc: "현재 탭을 유지한 채 링크를 새 탭으로 엽니다.",
    desc_en: "Opens a link in a new tab while keeping the current tab.",
    shortcut: { win: "Ctrl + 링크 클릭", mac: "Cmd + 링크 클릭" },
    shortcut_en: { win: "Ctrl + Click link", mac: "Cmd + Click link" },
    tags: ["링크", "새탭", "열기", "유지", "뒤에서", "몰래열기", "탭추가", "새탭열기", "배경탭"],
    tags_en: ["link", "new tab", "open", "keep", "link new tab", "background tab", "behind", "new tab link"]
  },
  {
    id: 19, category: "탐색",
    title: "링크를 새 창에서 열기",
    title_en: "Open Link in New Window",
    desc: "링크를 새 창으로 엽니다.",
    desc_en: "Opens a link in a new window.",
    shortcut: { win: "Shift + 링크 클릭", mac: "Shift + 링크 클릭" },
    shortcut_en: { win: "Shift + Click link", mac: "Shift + Click link" },
    tags: ["링크", "새창", "따로열기", "창열기", "새창으로", "바깥으로"],
    tags_en: ["link", "new window", "shift", "link new window", "window open", "separate", "window link", "open in new window"]
  },
  {
    id: 20, category: "탐색",
    title: "페이지 전체 화면",
    title_en: "Toggle Full Screen",
    desc: "브라우저를 전체 화면으로 전환합니다.",
    desc_en: "Switches the browser to full-screen mode.",
    shortcut: { win: "F11", mac: "Cmd + Ctrl + F" },
    tags: ["전체화면", "풀스크린", "숨기기", "최대화", "꽉찬화면", "집중모드", "영화모드", "큰화면"],
    tags_en: ["fullscreen", "full screen", "hide", "maximize", "movie mode", "focus mode", "big screen"]
  },
  {
    id: 85, category: "탐색",
    title: "페이지 정보 및 보안 확인",
    title_en: "Check Page Info & Security",
    desc: "주소창의 자물쇠 아이콘을 클릭하여 사이트의 보안 상태, 인증서, 권한 설정을 확인합니다.",
    desc_en: "Click the lock icon in the address bar to check the site's security status, certificate, and permissions.",
    shortcut: { win: "주소창 자물쇠 아이콘 클릭", mac: "주소창 자물쇠 아이콘 클릭" },
    shortcut_en: { win: "Click lock icon in address bar", mac: "Click lock icon in address bar" },
    tags: ["보안", "자물쇠", "https", "인증서", "권한", "안전"],
    tags_en: ["security", "lock", "https", "certificate", "permissions", "safe", "lock icon", "site info"]
  },
  {
    id: 87, category: "화면",
    title: "동영상 PIP(Picture-in-Picture) 모드",
    title_en: "Video Picture-in-Picture (PIP) Mode",
    desc: "재생 중인 동영상을 작은 팝업 창으로 띄워 다른 작업을 하면서 시청할 수 있습니다.",
    desc_en: "Watch a video in a small floating window while doing other tasks.",
    shortcut: { win: "영상 위에서 우클릭 두 번", mac: "영상 위에서 우클릭 두 번" },
    shortcut_en: { win: "Right-click twice on video", mac: "Right-click twice on video" },
    tags: ["동영상", "팝업", "멀티태스킹", "작은화면", "영상보기", "유튜브"],
    tags_en: ["pip", "picture in picture", "video", "popup", "multitasking", "small screen", "watch video", "youtube"]
  },
  // ── 화면 ──────────────────────────────────────
  {
    id: 21, category: "화면",
    title: "페이지 확대 / 축소",
    title_en: "Zoom In / Out",
    desc: "글씨가 작을 때 화면을 확대하세요.",
    desc_en: "Zoom in on the screen when the text is too small.",
    shortcut: { win: "Ctrl + + / Ctrl + -", mac: "Cmd + + / Cmd + -" },
    tags: ["확대", "축소", "글씨", "작아", "잘안보여", "치우기", "크게", "작게", "보기", "노안", "돋보기", "보이게"],
    tags_en: ["zoom", "zoom in", "zoom out", "text", "small", "can't see", "bigger", "smaller", "size", "font size", "view", "magnify", "scale"]
  },
  {
    id: 22, category: "화면",
    title: "줌 초기화",
    title_en: "Reset Zoom",
    desc: "확대/축소된 화면을 기본 100%로 되돌립니다.",
    desc_en: "Resets the zoom level to the default 100%.",
    shortcut: { win: "Ctrl + 0", mac: "Cmd + 0" },
    tags: ["초기화", "원래대로", "줌", "100", "정상", "기본", "100퍼센트", "원상복구", "되돌리기"],
    tags_en: ["reset", "default", "zoom", "100%", "reset zoom", "normal", "back to normal"]
  },
  {
    id: 23, category: "화면",
    title: "읽기 모드 (사이드 패널)",
    title_en: "Reading Mode (Side Panel)",
    desc: "기사를 읽기 편하게 광고와 불필요한 레이아웃을 제거합니다.",
    desc_en: "Removes ads and unnecessary layouts for a comfortable reading experience.",
    shortcut: { win: "도구 더보기 > 읽기 모드", mac: "도구 더보기 > 읽기 모드" },
    shortcut_en: { win: "More tools > Reading mode", mac: "More tools > Reading mode" },
    tags: ["읽기", "광고제거", "깔끔", "집중", "클린", "리더", "글자만", "포커스", "글보기", "기사보기", "사이드패널"],
    tags_en: ["read", "remove ads", "clean", "focus", "reader", "reading mode", "text only", "readability", "side panel"]
  },
  // ── 북마크 ────────────────────────────────────
  {
    id: 24, category: "북마크",
    title: "현재 페이지 북마크 추가",
    title_en: "Bookmark Current Page",
    desc: "지금 보는 페이지를 즐겨찾기에 저장합니다.",
    desc_en: "Save the current page to your bookmarks.",
    shortcut: { win: "Ctrl + D", mac: "Cmd + D" },
    tags: ["북마크", "즐겨찾기", "저장", "별", "저장하기", "찜", "기억", "나중에보기", "북마클", "즐겨찾기추가"],
    tags_en: ["bookmark", "favorite", "save", "star", "add bookmark", "remember", "read later", "add fav"]
  },
  {
    id: 25, category: "북마크",
    title: "모든 탭 한꺼번에 북마크",
    title_en: "Bookmark All Tabs",
    desc: "열린 탭 전부를 폴더 하나로 저장합니다.",
    desc_en: "Saves all open tabs into a single folder.",
    shortcut: { win: "Ctrl + Shift + D", mac: "Cmd + Shift + D" },
    tags: ["전체북마크", "다저장", "탭저장", "폴더저장", "일괄저장", "전체저장", "모두저장", "탭백업", "몽땅저장"],
    tags_en: ["bookmark all", "save all tabs", "tab save", "all tabs", "folder save", "batch save", "save all", "tab backup", "backup", "all favorites"]
  },
  {
    id: 26, category: "북마크",
    title: "북마크 바 보이기/숨기기",
    title_en: "Show/Hide Bookmarks Bar",
    desc: "주소창 아래 북마크 바를 토글합니다.",
    desc_en: "Toggles the visibility of the bookmarks bar below the address bar.",
    shortcut: { win: "Ctrl + Shift + B", mac: "Cmd + Shift + B" },
    tags: ["북마크바", "즐겨찾기바", "보이기", "숨기기", "메뉴바", "바", "토글", "즐찾바", "막대", "툴바"],
    tags_en: ["bookmark bar", "favorites bar", "show", "hide", "menu bar", "bar", "toggle", "toolbar", "show bookmark bar"]
  },
  {
    id: 27, category: "북마크",
    title: "방문 기록 보기",
    title_en: "View Browsing History",
    desc: "그동안 방문한 페이지 전체 목록을 확인합니다.",
    desc_en: "See a complete list of all the pages you have visited.",
    shortcut: { win: "Ctrl + H", mac: "Cmd + Y" },
    link: "chrome://history",
    tags: ["히스토리", "기록", "방문", "기록보기", "기록찾기", "어디갔지", "내역", "갔던곳", "봤던것", "방문링크", "어제본거", "오늘본거", "로그"],
    tags_en: ["history", "record", "visit", "view history", "find history", "browsing history", "past", "log"]
  },
  {
    id: 28, category: "북마크",
    title: "다운로드 목록 보기",
    title_en: "View Downloads",
    desc: "다운로드한 파일 목록을 확인합니다.",
    desc_en: "Check the list of downloaded files.",
    shortcut: { win: "Ctrl + J", mac: "Cmd + Shift + J" },
    link: "chrome://downloads",
    tags: ["다운로드", "다운", "파일", "받은파일", "목록", "파일함", "받기", "내려받기", "받은거", "저장된파일", "파일목록", "겟"],
    tags_en: ["download", "file", "downloaded file", "list", "downloads", "get", "get file"]
  },
  {
    id: 88, category: "북마크",
    title: "북마크 관리자 열기",
    title_en: "Open Bookmark Manager",
    desc: "저장된 모든 북마크를 검색, 편집, 정리할 수 있는 전체 관리 페이지를 엽니다.",
    desc_en: "Opens the full manager page to search, edit, and organize all saved bookmarks.",
    shortcut: { win: "Ctrl + Shift + O", mac: "Cmd + Option + B" },
    tags: ["북마크관리자", "북마크정리", "즐겨찾기관리", "정리", "편집", "폴더", "검색", "관리"],
    tags_en: ["bookmark manager", "organize bookmarks", "manage favorites", "organize", "edit", "folder", "search", "manage"]
  },
  // ── 편집 ──────────────────────────────────────
  {
    id: 29, category: "편집",
    title: "전체 선택",
    title_en: "Select All",
    desc: "페이지의 모든 텍스트를 선택합니다.",
    desc_en: "Selects all text on the page.",
    shortcut: { win: "Ctrl + A", mac: "Cmd + A" },
    tags: ["전체", "선택", "복사", "몽땅", "모두", "전부", "다하기", "전부다"],
    tags_en: ["select all", "all", "copy", "ctrl a", "cmd a", "every", "selectall"]
  },
  {
    id: 30, category: "편집",
    title: "복사 / 붙여넣기",
    title_en: "Copy / Paste",
    desc: "텍스트나 이미지를 복사하고 붙여넣습니다.",
    desc_en: "Copies and pastes text or images.",
    shortcut: { win: "Ctrl + C / Ctrl + V", mac: "Cmd + C / Cmd + V" },
    tags: ["복사", "붙여넣기", "카피", "복붙", "담기", "카피앤페이스트", "클립보드", "글복사", "담아두기"],
    tags_en: ["copy", "paste", "copy paste", "ctrl c", "ctrl v", "cmd c", "cmd v", "duplicate", "clipboard"]
  },
  {
    id: 31, category: "편집",
    title: "서식 없이 붙여넣기",
    title_en: "Paste without Formatting",
    desc: "폰트·색상 없이 순수 텍스트로만 붙여넣습니다.",
    desc_en: "Pastes as plain text without any font or color styling.",
    shortcut: { win: "Ctrl + Shift + V", mac: "Cmd + Shift + V (또는 Cmd + Option + Shift + V)" },
    shortcut_en: { win: "Ctrl + Shift + V", mac: "Cmd + Shift + V (or Cmd + Option + Shift + V)" },
    tags: ["서식없이", "붙여넣기", "깔끔", "텍스트만", "글자만", "서식제거", "걍붙이기", "스타일없이", "텍스트로만", "글씨만", "단순붙여넣기"],
    tags_en: ["paste without formatting", "plain text", "paste", "clean", "plain paste", "text only", "clean paste", "remove style"]
  },
  {
    id: 32, category: "편집",
    title: "실행 취소 / 다시 실행",
    title_en: "Undo / Redo",
    desc: "방금 한 작업을 되돌리거나 다시 합니다.",
    desc_en: "Undoes or redoes the last action.",
    shortcut: { win: "Ctrl + Z / Ctrl + Y", mac: "Cmd + Z / Cmd + Shift + Z" },
    tags: ["취소", "되돌리기", "되살리기", "원상복구", "실수", "다시하기", "작업취소", "언두", "리두"],
    tags_en: ["undo", "redo", "z", "revert", "mistake", "undo redo", "back", "next", "recover"]
  },
  // ── 개발자 ────────────────────────────────────
  {
    id: 33, category: "개발자",
    title: "개발자 도구 열기",
    title_en: "Open Developer Tools",
    desc: "HTML·CSS·콘솔을 확인하는 개발자 도구입니다.",
    desc_en: "The developer tools for inspecting HTML, CSS, and the console.",
    shortcut: { win: "F12 또는 Ctrl + Shift + I", mac: "Cmd + Option + I" },
    shortcut_en: { win: "F12 or Ctrl + Shift + I", mac: "Cmd + Option + I" },
    tags: ["개발자", "콘솔", "디버그", "코딩", "공부", "검사기"],
    tags_en: ["developer", "devtools", "console", "debug", "dev", "debugger", "inspector", "f12", "coding", "study", "developer tools", "web inspector"]
  },
  {
    id: 34, category: "개발자",
    title: "요소 선택 검사",
    title_en: "Inspect Element",
    desc: "마우스로 가리킨 요소의 HTML을 바로 확인합니다.",
    desc_en: "Instantly inspect the HTML of the element you hover over.",
    shortcut: { win: "Ctrl + Shift + C", mac: "Cmd + Shift + C" },
    tags: ["요소", "검사", "HTML", "CSS", "선택", "코드확인", "콕찍기", "피커", "클릭검사"],
    tags_en: ["element", "inspect", "HTML", "CSS", "pick", "select", "check code", "selector", "picker"]
  },
  {
    id: 35, category: "개발자",
    title: "자바스크립트 콘솔",
    title_en: "JavaScript Console",
    desc: "콘솔 탭으로 바로 이동해 JS를 실행합니다.",
    desc_en: "Go directly to the Console tab to execute JavaScript.",
    shortcut: { win: "Ctrl + Shift + J", mac: "Cmd + Option + J" },
    tags: ["콘솔", "JS", "자바스크립트", "스크립트", "로그", "명령어", "코딩", "터미널", "자바", "js콘솔"],
    tags_en: ["console", "JS", "javascript", "script", "log", "command", "coding", "terminal", "js console", "console log"]
  },
  {
    id: 36, category: "개발자",
    title: "페이지 소스 보기",
    title_en: "View Page Source",
    desc: "현재 페이지의 HTML 전체 소스를 확인합니다.",
    desc_en: "View the full HTML source code of the current page.",
    shortcut: { win: "Ctrl + U", mac: "Cmd + Option + U" },
    tags: ["소스", "HTML", "코드", "뷰소스", "원문", "코딩보기", "원본보기", "프로그래밍"],
    tags_en: ["source", "HTML", "code", "view source", "source code", "page source", "ctrl u", "programming", "raw data"]
  },
  {
    id: 37, category: "개발자",
    title: "네트워크 요청 확인",
    title_en: "Monitor Network Requests",
    desc: "페이지가 주고받는 네트워크 요청을 모니터링합니다.",
    desc_en: "Monitor the network requests made by the page.",
    shortcut: { win: "F12 > Network 탭", mac: "Cmd + Option + I > Network 탭" },
    shortcut_en: { win: "F12 > Network tab", mac: "Cmd + Option + I > Network tab" },
    tags: ["네트워크", "요청", "API", "느려", "통신", "트래픽", "패킷", "데이터", "속도", "응답", "api요청"],
    tags_en: ["network", "request", "API", "slow", "communication", "traffic", "packet", "data", "speed", "response", "api request"]
  },
  // ── 설정 ──────────────────────────────────────
  {
    id: 38, category: "설정",
    title: "크롬 설정 열기",
    title_en: "Open Chrome Settings",
    desc: "크롬 전반적인 설정 페이지로 이동합니다.",
    desc_en: "Navigates to the main Chrome settings page.",
    shortcut: { win: "chrome://settings 입력", mac: "chrome://settings 입력" },
    shortcut_en: { win: "Type chrome://settings", mac: "Type chrome://settings" },
    link: "chrome://settings",
    tags: ["설정", "세팅", "옵션", "환경설정", "구성", "셋팅", "제어판", "관리", "크롬설정", "설정창", "환경"],
    tags_en: ["settings", "option", "configuration", "config", "chrome settings", "control panel", "manage"]
  },
  {
    id: 39, category: "설정",
    title: "메모리 절약 모드",
    title_en: "Memory Saver Mode",
    desc: "안 쓰는 탭의 메모리를 회수해 속도를 높입니다.",
    desc_en: "Frees up memory from inactive tabs to improve speed.",
    shortcut: { win: "설정 > 성능", mac: "설정 > 성능" },
    shortcut_en: { win: "Settings > Performance", mac: "Settings > Performance" },
    link: "chrome://settings/performance",
    tags: ["렉", "느려", "버벅", "무거워", "성능", "최적화", "램", "렉걸려", "빨리", "탭잠자기", "배터리", "메모리부족"],
    tags_en: ["lag", "slow", "performance", "optimization", "RAM", "speed", "memory", "saver", "fast", "tab sleep", "battery", "low memory"]
  },
  {
    id: 40, category: "설정",
    title: "크롬 비밀번호 관리자",
    title_en: "Chrome Password Manager",
    desc: "저장된 비밀번호를 한눈에 관리하세요.",
    desc_en: "Manage your saved passwords at a glance.",
    shortcut: { win: "설정 > 비밀번호", mac: "설정 > 비밀번호" },
    shortcut_en: { win: "Settings > Passwords", mac: "Settings > Passwords" },
    link: "chrome://settings/passwords",
    tags: ["비번", "암호", "로그인", "자동완성", "계정", "로그인 정보", "패스워드", "비밀번호", "키체인", "저장된비번"],
    tags_en: ["password", "login", "autocomplete", "account", "manager", "login info", "keychain", "saved password", "pass"]
  },
  {
    id: 41, category: "설정",
    title: "크롬 작업 관리자",
    title_en: "Chrome Task Manager",
    desc: "어떤 탭이 리소스를 많이 먹는지 확인하세요.",
    desc_en: "Check which tabs are consuming the most resources.",
    shortcut: { win: "Shift + Esc", mac: "상단 메뉴 > 창 > 작업 관리자" },
    shortcut_en: { win: "Shift + Esc", mac: "Top Menu > Window > Task Manager" },
    tags: ["관리자", "프로세스", "강제종료", "응답없음", "점유율", "종료하기", "작업관리자", "꺼", "멈춤", "응답", "죽이기"],
    tags_en: ["manager", "process", "force quit", "not responding", "task", "task manager", "cpu", "usage", "kill", "freeze", "response"]
  },
  {
    id: 42, category: "설정",
    title: "확장 프로그램 관리",
    title_en: "Manage Extensions",
    desc: "설치된 확장 프로그램을 켜고 끄고 삭제합니다.",
    desc_en: "Enable, disable, or remove installed extensions.",
    shortcut: { win: "chrome://extensions 입력", mac: "chrome://extensions 입력" },
    shortcut_en: { win: "Type chrome://extensions", mac: "Type chrome://extensions" },
    link: "chrome://extensions",
    tags: ["확장", "플러그인", "관리", "앱", "추가기능", "프러그인", "익스텐션", "끄기", "켜기", "삭제"],
    tags_en: ["extension", "plugin", "manage", "app", "add-on", "addons", "disable", "enable", "remove"]
  },
  {
    id: 43, category: "설정",
    title: "인쇄 미리보기 / PDF 저장",
    title_en: "Print Preview / Save as PDF",
    desc: "현재 페이지를 인쇄하거나 PDF로 저장합니다.",
    desc_en: "Print the current page or save it as a PDF.",
    shortcut: { win: "Ctrl + P", mac: "Cmd + P" },
    tags: ["인쇄", "PDF", "저장", "프린트", "뽑기", "종이", "피디에프", "프린터", "출력", "인쇄하기", "내보내기"],
    tags_en: ["print", "PDF", "save", "paper", "save as pdf", "printer", "output", "export"]
  },
  {
    id: 44, category: "설정",
    title: "페이지를 파일로 저장",
    title_en: "Save Page As",
    desc: "현재 페이지를 HTML 파일로 내 PC에 저장합니다.",
    desc_en: "Saves the current page as an HTML file on your PC.",
    shortcut: { win: "Ctrl + S", mac: "Cmd + S" },
    tags: ["저장", "다운로드", "HTML", "파일", "내려받기", "다운", "페이지저장", "문서저장", "백업", "다운받기"],
    tags_en: ["save", "download", "HTML", "file", "page save", "ctrl s", "save as", "backup"]
  },
  {
    id: 45, category: "설정",
    title: "크롬 캐시·쿠키 삭제",
    title_en: "Clear Chrome Cache & Cookies",
    desc: "저장된 캐시와 쿠키를 지워 오류를 해결합니다.",
    desc_en: "Clears saved cache and cookies to resolve errors.",
    shortcut: { win: "Ctrl + Shift + Delete", mac: "Cmd + Shift + Backspace" },
    link: "chrome://settings/clearBrowserData",
    tags: ["캐시", "쿠키", "삭제", "초기화", "오류", "느려", "지우기", "탈퇴", "삭제하기", "인터넷 기록 삭제", "방문기록 삭제", "클리어", "포맷"],
    tags_en: ["cache", "cookie", "delete", "clear", "error", "slow", "clear cache", "cleaning", "clear browsing data", "format"]
  },
  // ── 이스터에그 ────────────────────────────────
  {
    id: 46, category: "이스터에그",
    title: "전설의 공룡 게임 (Dino)",
    title_en: "Legendary Dino Game",
    desc: "인터넷이 끊겼을 때 나타나는 그 게임! 주소창에 직접 쳐서 실행할 수도 있습니다.",
    desc_en: "The game that appears when the internet is down! You can also run it by typing directly in the address bar.",
    shortcut: { win: "chrome://dino 입력", mac: "chrome://dino 입력" },
    shortcut_en: { win: "Type chrome://dino", mac: "Type chrome://dino" },
    link: "chrome://dino",
    tags: ["공룡", "게임", "심심해", "오프라인", "점프", "런닝", "공룡게임", "인터넷끊김", "크롬게임", "🦖"],
    tags_en: ["dino", "game", "bored", "offline", "dinosaur", "jump", "running", "t-rex", "chrome game", "run", "jump game"]
  },
  {
    id: 47, category: "이스터에그",
    title: "공룡 게임 무적 치트키",
    title_en: "Dino Game Invincibility Cheat",
    desc: "공룡이 장애물을 그냥 통과하게 만듭니다. (개발자 도구 콘솔에 입력)",
    desc_en: "Makes the dinosaur pass through obstacles. (Enter in Developer Tools Console)",
    shortcut: { win: "Runner.prototype.gameOver = function(){}", mac: "Runner.prototype.gameOver = function(){}" },
    tags: ["공룡", "치트", "무적", "해킹", "점수", "짱", "일등", "치트키", "무적모드", "코드", "공룡치트"],
    tags_en: ["dino", "cheat", "invincible", "hack", "score", "god mode", "code", "console cheat"]
  },
  {
    id: 48, category: "이스터에그",
    title: "구글 화면 360도 회전",
    title_en: "Google 360-Degree Spin",
    desc: "구글 검색창에 입력하면 화면이 한 바퀴 빙글 돕니다.",
    desc_en: "Type this in the Google search bar and the screen will do a barrel roll.",
    shortcut: { win: "'do a barrel roll' 검색", mac: "'do a barrel roll' 검색" },
    shortcut_en: { win: "Search 'do a barrel roll'", mac: "Search 'do a barrel roll'" },
    tags: ["회전", "돌아", "신기", "배럴롤", "빙글", "360", "구르기", "한바퀴", "돌리기", "빙글빙글"],
    tags_en: ["rotation", "spin", "amazing", "barrel roll", "rotate", "360", "roll", "do a barrel roll"]
  },
  {
    id: 49, category: "이스터에그",
    title: "기우뚱한 구글 화면",
    title_en: "Tilted Google Screen",
    desc: "화면이 오른쪽으로 살짝 기울어집니다.",
    desc_en: "The screen will tilt slightly to the right.",
    shortcut: { win: "'askew' 검색", mac: "'askew' 검색" },
    shortcut_en: { win: "Search 'askew'", mac: "Search 'askew'" },
    tags: ["기울기", "삐딱", "이상해", "비뚤", "기우뚱", "사선", "삐딱하게", "기울어짐", "기울"],
    tags_en: ["tilt", "askew", "slanted", "crooked", "skew"]
  },
  {
    id: 50, category: "이스터에그",
    title: "깜빡이는 검색 결과",
    title_en: "Blinking Search Results",
    desc: "검색 결과 속 특정 단어들이 실제로 깜빡거립니다.",
    desc_en: "Certain words in the search results will actually blink.",
    shortcut: { win: "'blink html' 검색", mac: "'blink html' 검색" },
    shortcut_en: { win: "Search 'blink html'", mac: "Search 'blink html'" },
    tags: ["깜빡", "반짝", "태그", "깜빡깜빡", "반짝반짝", "깜박", "블링크"],
    tags_en: ["blink", "twinkle", "tag", "light", "flash", "html blink", "shining"]
  },
  {
    id: 51, category: "이스터에그",
    title: "1998년의 구글",
    title_en: "Google in 1998",
    desc: "구글이 처음 탄생했을 때의 레트로한 디자인을 구경하세요.",
    desc_en: "See the retro design of Google from when it was first created.",
    shortcut: { win: "'google in 1998' 검색", mac: "'google in 1998' 검색" },
    shortcut_en: { win: "Search 'google in 1998'", mac: "Search 'google in 1998'" },
    tags: ["레트로", "과거", "옛날", "추억", "1998", "구글역사", "처음", "탄생", "초기", "초창기", "레트로구글"],
    tags_en: ["retro", "past", "old", "memory", "google in 1998", "vintage", "classic"]
  },
  {
    id: 52, category: "이스터에그",
    title: "무한 반복 질문 (재귀)",
    title_en: "Infinite Loop Question (Recursion)",
    desc: "구글이 똑같은 질문을 계속 던지는 재귀의 늪에 빠져보세요.",
    desc_en: "Fall into a recursive loop where Google keeps asking the same question.",
    shortcut: { win: "'recursion' 검색", mac: "'recursion' 검색" },
    shortcut_en: { win: "Search 'recursion'", mac: "Search 'recursion'" },
    tags: ["재귀", "반복", "무한", "도돌이표", "무한반복", "되풀이", "구글재귀", "늪", "끝나지않는"],
    tags_en: ["recursion", "repeat", "infinite", "loop", "endless", "recursion loop"]
  },
  {
    id: 53, category: "이스터에그",
    title: "화면을 굴리는 '괴혼'",
    title_en: "Roll the Screen with 'Katamari'",
    desc: "검색 결과의 정보 카드에 있는 괴혼 공 아이콘을 클릭한 후, 화살표 키로 글자들을 뭉쳐보세요!",
    desc_en: "Click the Katamari ball icon in the search result's info card, then use the arrow keys to roll up the text!",
    shortcut: { win: "'katamari' 검색 > 아이콘 클릭", mac: "'katamari' 검색 > 아이콘 클릭" },
    shortcut_en: { win: "Search 'katamari' > Click icon", mac: "Search 'katamari' > Click icon" },
    tags: ["괴혼", "뭉치기", "굴리기", "게임", "카타마리", "블록", "굴려", "글자뭉치기", "공굴리기"],
    tags_en: ["katamari", "roll up", "roll", "game", "ball", "rolling", "katamari damacy"]
  },
  {
    id: 54, category: "이스터에그",
    title: "화면에 남는 강아지 발자국",
    title_en: "Puppy Paws on Screen",
    desc: "검색 결과의 정보 카드에 있는 발바닥 아이콘을 누르고 화면을 클릭해 보세요. 귀여운 발자국이 남습니다.",
    desc_en: "Press the paw icon in the search result's info card and click on the screen. Cute paw prints will appear.",
    shortcut: { win: "'강아지' 검색 > 발바닥 클릭", mac: "'강아지' 검색 > 발바닥 클릭" },
    shortcut_en: { win: "Search 'dog' > Click paw", mac: "Search 'dog' > Click paw" },
    tags: ["강아지", "개", "발자국", "귀여워", "동물", "멍멍", "개소리", "멍멍이", "댕댕이", "도그", "애견", "왈왈"],
    tags_en: ["dog", "puppy", "paw print", "cute", "animal", "bark"]
  },
  {
    id: 55, category: "이스터에그",
    title: "화면에 남는 고양이 발자국",
    title_en: "Kitty Paws on Screen",
    desc: "검색 결과의 정보 카드에 있는 고양이 발바닥을 누르면 클릭할 때마다 고양이 소리가 나며 발자국이 남습니다.",
    desc_en: "Press the cat paw icon in the info card, and each click will make a meow sound and leave a paw print.",
    shortcut: { win: "'고양이' 검색 > 발바닥 클릭", mac: "'고양이' 검색 > 발바닥 클릭" },
    shortcut_en: { win: "Search 'cat' > Click paw", mac: "Search 'cat' > Click paw" },
    tags: ["고양이", "냥이", "발자국", "귀여워", "야옹", "발바닥", "묘", "냐옹", "미야오", "나비", "애묘", "캣"],
    tags_en: ["cat", "kitty", "paw print", "cute", "meow", "paw"]
  },
  {
    id: 56, category: "이스터에그",
    title: "삶의 우주, 그리고 모든 것",
    title_en: "The Answer to Life, the Universe, and Everything",
    desc: "우주에 대한 궁극적인 질문의 답을 구글 계산기가 알려줍니다.",
    desc_en: "The Google calculator will give you the answer to the ultimate question.",
    shortcut: { win: "'the answer to life...' 검색", mac: "'the answer to life...' 검색" },
    shortcut_en: { win: "Search 'the answer to life...'", mac: "Search 'the answer to life...'" },
    tags: ["우주", "답", "42", "계산기", "궁극", "은하수", "더글러스", "히치하이커", "42의비밀"],
    tags_en: ["universe", "answer", "42", "calculator", "ultimate", "galaxy", "douglas adams", "hitchhiker", "life", "everything"]
  },
  {
    id: 57, category: "시스템",
    title: "실험적 기능 설정 (Flags)",
    title_en: "Experimental Features (Flags)",
    desc: "크롬의 최신 실험적 기능들을 미리 써보거나 조정합니다.",
    desc_en: "Try out or adjust Chrome's latest experimental features.",
    link: "chrome://flags",
    shortcut: { win: "chrome://flags", mac: "chrome://flags" },
    tags: ["설정", "실험", "테스트", "고급", "기능", "미리보기", "플래그"],
    tags_en: ["settings", "experimental", "test", "flags", "advanced", "feature", "preview"]
  },
  {
    id: 58, category: "시스템",
    title: "메모리 점유율 진단",
    title_en: "Diagnose Memory Usage",
    desc: "현재 브라우저가 사용하는 메모리 상세 내역을 확인합니다.",
    desc_en: "Check the detailed memory usage of the current browser.",
    link: "chrome://memory-internals",
    shortcut: { win: "chrome://memory-internals", mac: "chrome://memory-internals" },
    tags: ["메모리", "점유", "렉", "느림", "관리자", "진단", "누수"],
    tags_en: ["memory", "usage", "lag", "slow", "manager", "diagnose", "leak"]
  },
  {
    id: 59, category: "시스템",
    title: "네트워크 패킷 추적",
    title_en: "Trace Network Packets",
    desc: "네트워크 연결 소켓 및 API 호출 패킷을 캡처합니다.",
    desc_en: "Capture network connection sockets and API call packets.",
    link: "chrome://net-internals",
    shortcut: { win: "chrome://net-internals", mac: "chrome://net-internals" },
    tags: ["네트워크", "통신", "패킷", "캡처", "트래킹"],
    tags_en: ["network", "communication", "packet", "capture", "tracking", "net", "debug"]
  },
  {
    id: 62, category: "시스템",
    title: "메모리 확보 (Tab Discarding)",
    title_en: "Free Up Memory (Tab Discarding)",
    desc: "오랫동안 안 쓴 탭을 수동으로 일시 중지하여 RAM을 확보합니다.",
    desc_en: "Manually suspend long-unused tabs to free up RAM.",
    link: "chrome://discards",
    shortcut: { win: "chrome://discards", mac: "chrome://discards" },
    tags: ["메모리", "점유율", "램", "확보", "탭중지", "슬립", "최적화"],
    tags_en: ["memory", "usage", "RAM", "free up", "tab suspend", "sleep", "discard", "optimization"]
  },
  // ── 주소창 / 검색 (Omnibox) ──────────────────
  {
    id: 65, category: "주소창/검색",
    title: "Chrome 작업으로 바로 실행",
    title_en: "Execute Chrome Actions Directly",
    desc: "주소창에 '비밀번호 관리', '쿠키 삭제'처럼 문장을 치면, 설정 화면으로 바로 이동하는 작업 버튼이 나타납니다.",
    desc_en: "Type phrases like 'manage passwords' or 'clear cookies' in the address bar, and an action button will appear to take you directly to the settings screen.",
    shortcut: { win: "주소창 명령어 입력", mac: "주소창 명령어 입력" },
    shortcut_en: { win: "Type command in address bar", mac: "Type command in address bar" },
    tags: ["액션", "작업", "주소창", "옴니박스", "비밀번호관리", "쿠키삭제", "설정열기", "명령어", "바로실행"],
    tags_en: ["chrome actions", "action", "task", "address bar", "omnibox", "manage passwords", "clear cookies", "open settings", "command", "run directly"]
  },
  {
    id: 66, category: "주소창/검색",
    title: "@탭 / @북마크 / @기록 검색",
    title_en: "Search with @tabs / @bookmarks / @history",
    desc: "주소창에 @탭, @북마크, @기록을 먼저 입력하면 그 영역 안에서만 빠르게 검색할 수 있습니다.",
    desc_en: "Type @tabs, @bookmarks, or @history in the address bar to quickly search within that specific area.",
    shortcut: { win: "@탭 [검색어]", mac: "@탭 [검색어]" },
    shortcut_en: { win: "@tabs [keyword]", mac: "@tabs [keyword]" },
    tags: ["탭검색", "북마크검색", "기록검색", "필터", "@탭", "@북마크", "@기록", "옴니박스", "주소창", "검색필터", "특정검색"],
    tags_en: ["tab search", "bookmark search", "history search", "filter", "@tabs", "@bookmarks", "@history", "omnibox", "address bar", "search filter"]
  },
  {
    id: 67, category: "주소창/검색",
    title: "사이트 전용 검색 단축키",
    title_en: "Site-Specific Search Shortcuts",
    desc: "설정에서 사이트별 키워드(예: yt, so)를 등록하고 주소창에서 바로 특정 사이트를 검색하세요.",
    desc_en: "Register site-specific keywords (e.g., yt, so) in settings and search specific sites directly from the address bar.",
    shortcut: { win: "[키워드] + Tab", mac: "[키워드] + Tab" },
    shortcut_en: { win: "[keyword] + Tab", mac: "[keyword] + Tab" },
    link: "chrome://settings/searchEngines",
    tags: ["검색엔진", "단축키", "유튜브검색", "사이트검색", "커스텀", "주소창검색", "빠른검색", "커스텀검색"],
    tags_en: ["search engine", "shortcut", "youtube search", "site search", "custom", "yt", "so", "omnibox search", "quick search", "custom search"]
  },
  {
    id: 86, category: "주소창/검색",
    title: "주소창에서 바로 계산하기",
    title_en: "Calculate Directly in Address Bar",
    desc: "계산기 없이 주소창에 '5*99-13'과 같은 수식을 입력하면 바로 결과가 나타납니다.",
    desc_en: "Enter a formula like '5*99-13' in the address bar, and the result will appear instantly without a calculator.",
    shortcut: { win: "주소창에 수식 입력", mac: "주소창에 수식 입력" },
    shortcut_en: { win: "Enter formula in address bar", mac: "Enter formula in address bar" },
    tags: ["계산기", "계산", "수식", "주소창", "사칙연산", "빠른계산", "암산"],
    tags_en: ["calculator", "calculate", "formula", "math", "omnibox", "address bar", "quick calculation"]
  },
  // ── 프로필 / 공간 ──────────────────────────
  {
    id: 68, category: "프로필/공간",
    title: "프로필로 업무/개인 분리",
    title_en: "Separate Work/Personal with Profiles",
    desc: "크롬 프로필을 여러 개 만들어, 업무용/개인용 북마크와 확장 프로그램을 완전히 분리해서 쓸 수 있습니다.",
    desc_en: "Create multiple Chrome profiles to completely separate work and personal bookmarks and extensions.",
    shortcut: { win: "우측 상단 프로필 아이콘", mac: "우측 상단 프로필 아이콘" },
    shortcut_en: { win: "Top-right profile icon", mac: "Top-right profile icon" },
    tags: ["프로필", "멀티프로필", "분리", "업무용", "개인용", "계정", "다중계정", "정리", "공간분리"],
    tags_en: ["profile", "multi-profile", "separate", "work", "personal", "account", "multiple accounts", "organize", "space separation"]
  },
  {
    id: 69, category: "프로필/공간",
    title: "읽기 목록으로 임시 스크랩",
    title_en: "Temporary Scrap with Reading List",
    desc: "나중에 다시 보고 싶은 페이지는 '읽기 목록'에 담아두면 작업용 북마크를 어지럽히지 않습니다.",
    desc_en: "Save pages you want to read later to the 'Reading List' to avoid cluttering your work bookmarks.",
    shortcut: { win: "탭 우클릭 > 읽기 목록에 탭 추가", mac: "탭 우클릭 > 읽기 목록에 탭 추가" },
    shortcut_en: { win: "Right-click tab > Add to Reading List", mac: "Right-click tab > Add to Reading List" },
    tags: ["읽기목록", "스크랩", "나중에", "기억", "임시저장", "북마크정리", "뉴스레터", "저장", "스크랩북"],
    tags_en: ["reading list", "scrap", "later", "remember", "temporary save", "organize bookmarks", "newsletter", "save", "scrapbook"]
  },
  {
    id: 89, category: "프로필/공간",
    title: "게스트 모드로 탐색",
    title_en: "Browse in Guest Mode",
    desc: "다른 사람이 내 컴퓨터를 잠시 사용할 때, 내 기록이나 북마크에 영향을 주지 않는 깨끗한 세션을 제공합니다.",
    desc_en: "Provides a clean session that doesn't affect your history or bookmarks when someone else uses your computer temporarily.",
    shortcut: { win: "프로필 아이콘 > 게스트", mac: "프로필 아이콘 > 게스트" },
    shortcut_en: { win: "Profile icon > Guest", mac: "Profile icon > Guest" },
    tags: ["게스트", "손님", "임시사용", "보안", "사생활보호", "분리", "다른사람", "빌려주기", "공용"],
    tags_en: ["guest", "visitor", "guest mode", "temporary use", "security", "privacy", "separate", "other people", "lend", "public"]
  },
  // ── 추가 이스터에그 / 게임 ──────────────────
  {
    id: 70, category: "이스터에그",
    title: "검색창 속 팩맨 게임",
    title_en: "Pac-Man Game in Search",
    desc: "고전 명작 팩맨을 구글 검색 결과에서 즉시 즐길 수 있습니다.",
    desc_en: "Enjoy the classic masterpiece Pac-Man instantly from Google search results.",
    shortcut: { win: "'pac-man' 검색", mac: "'pac-man' 검색" },
    shortcut_en: { win: "Search 'pac-man'", mac: "Search 'pac-man'" },
    tags: ["팩맨", "게임", "아케이드", "심심할때", "구글게임", "오락실", "레트로게임", "추억"],
    tags_en: ["pac-man", "game", "arcade", "bored", "google game", "retro game", "classic"]
  },
  {
    id: 71, category: "이스터에그",
    title: "솔리테어 카드 게임",
    title_en: "Solitaire Card Game",
    desc: "혼자서 즐기는 추억의 카드 게임, 솔리테어를 검색창에서 바로 시작하세요.",
    desc_en: "Start the nostalgic single-player card game, Solitaire, right from the search bar.",
    shortcut: { win: "'solitaire' 검색", mac: "'solitaire' 검색" },
    shortcut_en: { win: "Search 'solitaire'", mac: "Search 'solitaire'" },
    tags: ["솔리테어", "카드게임", "혼자하기", "카드", "심심해", "게임", "구글게임", "트럼프", "클론다이크"],
    tags_en: ["solitaire", "card game", "single player", "card", "bored", "game", "google game", "klondike"]
  },
  {
    id: 72, category: "이스터에그",
    title: "틱택토 게임",
    title_en: "Tic-Tac-Toe Game",
    desc: "친구 혹은 구글 AI와 함께하는 간단한 틱택토 대결!",
    desc_en: "A simple game of Tic-Tac-Toe against a friend or Google's AI!",
    shortcut: { win: "'tic tac toe' 검색", mac: "'tic tac toe' 검색" },
    shortcut_en: { win: "Search 'tic tac toe'", mac: "Search 'tic tac toe'" },
    tags: ["틱택토", "3줄", "게임", "심심할때", "두뇌회전", "간단한게임", "구글게임", "대결"],
    tags_en: ["tic tac toe", "game", "bored", "brain teaser", "simple game", "google game", "match", "ai"]
  },
  {
    id: 77, category: "이스터에그",
    title: "스네이크 게임",
    title_en: "Snake Game",
    desc: "고전 명작 '뱀 게임'을 검색 결과 창에서 바로 플레이할 수 있습니다.",
    desc_en: "Play the classic 'Snake Game' directly in the search results window.",
    shortcut: { win: "'snake game' 검색", mac: "'snake game' 검색" },
    shortcut_en: { win: "Search 'snake game'", mac: "Search 'snake game'" },
    tags: ["스네이크", "뱀게임", "게임", "고전게임", "심심할때", "구글게임", "꼬리잡기"],
    tags_en: ["snake", "snake game", "game", "classic game", "bored", "google game"]
  },
  {
    id: 80, category: "이스터에그",
    title: "슈퍼 마리오 브라더스",
    title_en: "Super Mario Bros.",
    desc: "지식 정보 카드에 있는 물음표 상자를 클릭하면 동전과 함께 익숙한 소리가 나옵니다.",
    desc_en: "Click the question mark box in the knowledge card to hear a familiar sound along with a coin.",
    shortcut: { win: "'super mario bros' 검색", mac: "'super mario bros' 검색" },
    shortcut_en: { win: "Search 'super mario bros'", mac: "Search 'super mario bros'" },
    tags: ["슈퍼마리오", "마리오", "닌텐도", "게임", "동전", "코인"],
    tags_en: ["super mario", "mario", "nintendo", "game", "coin"]
  },
  {
    id: 91, category: "이스터에그",
    title: "흐르는 검색 결과 (Marquee)",
    title_en: "Scrolling Search Results (Marquee)",
    desc: "검색 결과 상단의 통계 부분이 예전 홈페이지처럼 왼쪽으로 흘러갑니다.",
    desc_en: "The stats section at the top of the search results scrolls to the left like an old-school webpage.",
    shortcut: { win: "'marquee html' 검색", mac: "'marquee html' 검색" },
    shortcut_en: { win: "Search 'marquee html'", mac: "Search 'marquee html'" },
    tags: ["흐르는", "html", "옛날", "레트로", "움직이는", "텍스트"],
    tags_en: ["marquee", "scrolling", "html", "old", "retro", "moving", "text", "scrolling text"]
  },
  {
    id: 92, category: "이스터에그",
    title: "소닉 더 헤지혹",
    title_en: "Sonic the Hedgehog",
    desc: "검색 결과의 정보 카드에 있는 소닉을 계속 클릭하면 슈퍼 소닉으로 변신합니다.",
    desc_en: "Keep clicking Sonic in the search result's info card, and he will transform into Super Sonic.",
    shortcut: { win: "'sonic the hedgehog' 검색", mac: "'sonic the hedgehog' 검색" },
    shortcut_en: { win: "Search 'sonic the hedgehog'", mac: "Search 'sonic the hedgehog'" },
    tags: ["소닉", "게임", "세가", "슈퍼소닉", "고슴도치"],
    tags_en: ["sonic", "game", "sega", "super sonic", "hedgehog"]
  },
  {
    id: 93, category: "이스터에그",
    title: "지뢰찾기 게임",
    title_en: "Minesweeper Game",
    desc: "추억의 윈도우 기본 게임, 지뢰찾기를 바로 플레이할 수 있습니다.",
    desc_en: "Play the nostalgic default Windows game, Minesweeper, right away.",
    shortcut: { win: "'minesweeper' 검색", mac: "'minesweeper' 검색" },
    shortcut_en: { win: "Search 'minesweeper'", mac: "Search 'minesweeper'" },
    tags: ["지뢰찾기", "게임", "고전게임", "윈도우", "두뇌게임", "심심할때", "구글게임"],
    tags_en: ["minesweeper", "game", "classic game", "windows", "brain game", "bored", "google game"]
  },
  {
    id: 94, category: "이스터에그",
    title: "주사위 굴리기 / 동전 던지기",
    title_en: "Roll a Die / Flip a Coin",
    desc: "결정이 필요할 때, 구글이 대신 주사위를 굴리거나 동전을 던져줍니다.",
    desc_en: "When you need to make a decision, Google can roll a die or flip a coin for you.",
    shortcut: { win: "'roll a die' 또는 'flip a coin' 검색", mac: "'roll a die' 또는 'flip a coin' 검색" },
    shortcut_en: { win: "Search 'roll a die' or 'flip a coin'", mac: "Search 'roll a die' or 'flip a coin'" },
    tags: ["주사위", "동전", "결정", "선택", "운", "도구", "랜덤"],
    tags_en: ["die", "coin", "decision", "choice", "luck", "roll a die", "flip a coin", "tool", "random"]
  },
  {
    id: 95, category: "이스터에그",
    title: "철자 바꾸기 (Anagram)",
    title_en: "Anagram",
    desc: "구글이 'anagram'의 철자를 바꾼 'nag a ram'을 찾아주겠다고 제안합니다.",
    desc_en: "Google suggests searching for 'nag a ram' as an anagram of 'anagram'.",
    shortcut: { win: "'anagram' 검색", mac: "'anagram' 검색" },
    shortcut_en: { win: "Search 'anagram'", mac: "Search 'anagram'" },
    tags: ["애너그램", "철자", "언어유희", "단어", "말장난"],
    tags_en: ["anagram", "spelling", "wordplay", "nag a ram", "word"]
  },
  {
    id: 96, category: "이스터에그",
    title: "차차 슬라이드 (Cha-Cha Slide)",
    title_en: "Cha-Cha Slide",
    desc: "마이크 아이콘을 노래 가사에 맞춰 클릭하면, 화면이 가사대로 움직입니다.",
    desc_en: "Click the microphone icon in time with the song lyrics, and the screen will move according to the lyrics.",
    shortcut: { win: "'cha-cha slide' 검색", mac: "'cha-cha slide' 검색" },
    shortcut_en: { win: "Search 'cha-cha slide'", mac: "Search 'cha-cha slide'" },
    tags: ["차차슬라이드", "음악", "춤", "노래", "인터랙티브"],
    tags_en: ["cha-cha slide", "music", "dance", "song", "interactive"]
  },
  {
    id: 97, category: "이스터에그",
    title: "1분 호흡 운동",
    title_en: "1-Minute Breathing Exercise",
    desc: "복잡한 머리를 식히고 싶을 때, 1분간의 호흡 명상 가이드를 따라해보세요.",
    desc_en: "When you want to clear your head, follow this 1-minute guided breathing meditation.",
    shortcut: { win: "'breathing exercise' 검색", mac: "'breathing exercise' 검색" },
    shortcut_en: { win: "Search 'breathing exercise'", mac: "Search 'breathing exercise'" },
    tags: ["호흡", "명상", "휴식", "쉼", "안정", "진정"],
    tags_en: ["breathing", "meditation", "rest", "breathing exercise", "relax", "calm"]
  },
  {
    id: 98, category: "이스터에그",
    title: "K-POP 아이돌 응원하기",
    title_en: "Cheer for K-POP Idols",
    desc: "아이브, 블랙핑크 등 특정 아이돌을 검색하면 나타나는 아이콘을 클릭해 화려한 응원 효과를 보세요.",
    desc_en: "Search for specific idols like IVE or BLACKPINK and click the icon that appears to see a spectacular cheering effect.",
    shortcut: { win: "'아이브' 또는 '블랙핑크' 검색", mac: "'아이브' 또는 '블랙핑크' 검색" },
    shortcut_en: { win: "Search 'ive' or 'blackpink'", mac: "Search 'ive' or 'blackpink'" },
    tags: ["아이브", "블랙핑크", "kpop", "아이돌", "불꽃놀이", "응원", "팬심", "덕질"],
    tags_en: ["ive", "blackpink", "kpop", "idol", "fireworks", "cheer", "fandom"]
  },
  {
    id: 100, category: "이스터에그",
    title: "메트로놈 도구",
    title_en: "Metronome Tool",
    desc: "BPM을 조절할 수 있는 디지털 메트로놈을 사용해 보세요.",
    desc_en: "Use a digital metronome where you can adjust the BPM.",
    shortcut: { win: "'metronome' 검색", mac: "'metronome' 검색" },
    shortcut_en: { win: "Search 'metronome'", mac: "Search 'metronome'" },
    tags: ["메트로놈", "박자", "음악", "도구", "리듬", "템포"],
    tags_en: ["metronome", "beat", "music", "bpm", "tool", "rhythm", "tempo"]
  },
  {
    id: 101, category: "이스터에그",
    title: "타이머 / 스톱워치",
    title_en: "Timer / Stopwatch",
    desc: "간단한 타이머나 스톱워치가 필요할 때 바로 사용할 수 있습니다.",
    desc_en: "You can use a simple timer or stopwatch right away when you need one.",
    shortcut: { win: "'timer' 또는 'stopwatch' 검색", mac: "'timer' 또는 'stopwatch' 검색" },
    shortcut_en: { win: "Search 'timer' or 'stopwatch'", mac: "Search 'timer' or 'stopwatch'" },
    tags: ["타이머", "스톱워치", "시간", "측정", "알람", "카운트다운", "도구"],
    tags_en: ["timer", "stopwatch", "time", "measure", "alarm", "countdown", "tool"]
  },
  {
    id: 102, category: "이스터에그",
    title: "난수 생성기",
    title_en: "Random Number Generator",
    desc: "지정한 범위 내에서 무작위 숫자를 생성해 줍니다.",
    desc_en: "Generates a random number within a specified range.",
    shortcut: { win: "'random number generator' 검색", mac: "'random number generator' 검색" },
    shortcut_en: { win: "Search 'random number generator'", mac: "Search 'random number generator'" },
    tags: ["난수", "랜덤", "무작위", "숫자", "생성기", "도구", "뽑기"],
    tags_en: ["random number", "random", "number", "generator", "tool", "draw"]
  },
  {
    id: 103, category: "이스터에그",
    title: "컬러 피커",
    title_en: "Color Picker",
    desc: "HEX, RGB, CMYK 등 다양한 형식의 색상 코드를 확인할 수 있는 컬러 피커입니다.",
    desc_en: "A color picker that lets you check color codes in various formats like HEX, RGB, and CMYK.",
    shortcut: { win: "'color picker' 검색", mac: "'color picker' 검색" },
    shortcut_en: { win: "Search 'color picker'", mac: "Search 'color picker'" },
    tags: ["컬러피커", "색상", "코드", "디자인", "도구", "색상선택"],
    tags_en: ["color picker", "color", "code", "hex", "rgb", "design", "tool", "color selection"]
  },
  {
    id: 104, category: "이스터에그",
    title: "Festivus의 기적",
    title_en: "The Miracle of Festivus",
    desc: "미국 시트콤 '사인펠드'에 나온 가짜 공휴일, Festivus를 기념하는 알루미늄 기둥이 화면 왼쪽에 나타납니다.",
    desc_en: "An aluminum pole appears on the left side of the screen to celebrate Festivus, the fake holiday from the American sitcom 'Seinfeld'.",
    shortcut: { win: "'festivus' 검색", mac: "'festivus' 검색" },
    shortcut_en: { win: "Search 'festivus'", mac: "Search 'festivus'" },
    tags: ["페스티버스", "사인펠드", "기둥", "미드", "공휴일", "기념일"],
    tags_en: ["festivus", "seinfeld", "pole", "sitcom", "holiday", "anniversary"]
  },
  {
    id: 105, category: "이스터에그",
    title: "오로라 애니메이션",
    title_en: "Aurora Animation",
    desc: "검색 결과의 정보 카드에서 버튼을 누르면 화면 위로 아름다운 오로라가 펼쳐집니다.",
    desc_en: "Press the button in the search result's info card, and a beautiful aurora will unfold across the top of the screen.",
    shortcut: { win: "'aurora borealis' 검색", mac: "'aurora borealis' 검색" },
    shortcut_en: { win: "Search 'aurora borealis'", mac: "Search 'aurora borealis'" },
    tags: ["오로라", "북극광", "애니메이션", "밤하늘", "별똥별", "자연"],
    tags_en: ["aurora", "aurora borealis", "northern lights", "animation", "night sky", "shooting star", "nature"]
  },
  // ── 개발자 고급 ──────────────────────────
  {
    id: 74, category: "개발자",
    title: "콘솔 명령어 기록 탐색",
    title_en: "Navigate Console Command History",
    desc: "콘솔에서 이전에 쳤던 명령어들을 위/아래 화살표로 빠르게 찾아냅니다.",
    desc_en: "Quickly find previously entered commands in the console using the up/down arrow keys.",
    shortcut: { win: "↑ / ↓", mac: "↑ / ↓" },
    tags: ["콘솔", "기록", "명령어", "탐색", "화살표", "이전명령어", "다시쓰기"],
    tags_en: ["console", "history", "command", "navigate", "up", "down", "arrow", "previous command", "rewrite"]
  },
  {
    id: 75, category: "개발자",
    title: "콘솔 깨끗하게 비우기",
    title_en: "Clear Console",
    desc: "어지러운 콘솔 창의 모든 로그를 한 번에 삭제합니다.",
    desc_en: "Deletes all logs in a cluttered console window at once.",
    shortcut: { win: "Ctrl + L (또는 clear())", mac: "Cmd + K (또는 Ctrl + L)" },
    shortcut_en: { win: "Ctrl + L (or clear())", mac: "Cmd + K (or Ctrl + L)" },
    tags: ["콘솔비우기", "삭제", "비우기", "지우기", "로그삭제", "깔끔", "정리"],
    tags_en: ["clear console", "delete", "clear", "console", "clean", "empty", "erase", "clear log", "tidy"]
  },
  {
    id: 76, category: "개발자",
    title: "패널 간 빠른 이동",
    title_en: "Quickly Switch Between Panels",
    desc: "DevTools 상단 탭을 마우스 없이 순차적으로 오갑니다.",
    desc_en: "Navigate sequentially through the DevTools top tabs without using the mouse.",
    shortcut: { win: "Ctrl + [ / Ctrl + ]", mac: "Cmd + [ / Cmd + ]" },
    tags: ["탭이동", "패널이동", "빠른이동", "탭전환", "콘솔에서네트워크로"],
    tags_en: ["tab switch", "panel switch", "devtools", "switch panel", "quick move", "next panel", "previous panel"]
  },
  {
    id: 90, category: "개발자",
    title: "모바일 기기 에뮬레이션",
    title_en: "Mobile Device Emulation",
    desc: "개발자 도구에서 다양한 스마트폰, 태블릿 화면으로 어떻게 보이는지 실시간으로 테스트합니다.",
    desc_en: "Test in real-time how your site looks on various smartphone and tablet screens in the developer tools.",
    shortcut: { win: "Ctrl + Shift + M", mac: "Cmd + Shift + M" },
    tags: ["모바일", "반응형", "에뮬레이터", "테스트", "스마트폰", "화면크기"],
    tags_en: ["mobile", "responsive", "emulator", "test", "device", "emulation", "smartphone", "screen size"]
  },
  // ── 숨겨진 시스템 / 고급 꿀팁 ──────────────────
  {
    id: 110, category: "시스템",
    title: "크롬 즉시 재시작",
    title_en: "Restart Chrome Instantly",
    desc: "브라우저를 닫았다가 현재 탭들을 유지한 채 즉시 다시 엽니다.",
    desc_en: "Closes and immediately reopens Chrome while preserving your current tabs.",
    shortcut: { win: "chrome://restart 입력", mac: "chrome://restart 입력" },
    shortcut_en: { win: "Type chrome://restart", mac: "Type chrome://restart" },
    link: "chrome://restart",
    tags: ["재시작", "리스타트", "초기화", "렉", "끄고켜기", "업데이트"],
    tags_en: ["restart", "reboot", "refresh", "lag", "re-open", "chrome restart"]
  },
  {
    id: 111, category: "시스템",
    title: "크롬 버전 및 정보 확인",
    title_en: "Chrome Version & Info",
    desc: "현재 사용 중인 크롬의 버전, 프로필 경로 등 상세 정보를 확인합니다.",
    desc_en: "Check detailed information about your Chrome version, profile path, and more.",
    shortcut: { win: "chrome://version 입력", mac: "chrome://version 입력" },
    shortcut_en: { win: "Type chrome://version", mac: "Type chrome://version" },
    link: "chrome://version",
    tags: ["버전", "정보", "업데이트", "프로필", "빌드", "크롬정보"],
    tags_en: ["version", "info", "update", "profile", "build", "chrome info"]
  },
  {
    id: 112, category: "주소창/검색",
    title: "주소창에서 바로 검색하기",
    title_en: "Quick Search in Address Bar",
    desc: "어디서든 주소창으로 포커스를 옮기고 검색 모드로 전환합니다.",
    desc_en: "Moves focus to the address bar and switches to search mode from anywhere.",
    shortcut: { win: "Ctrl + K 또는 Ctrl + E", mac: "Cmd + K 또는 Cmd + E" },
    shortcut_en: { win: "Ctrl + K or Ctrl + E", mac: "Cmd + K or Cmd + E" },
    tags: ["검색", "주소창", "빠른검색", "구글검색", "찾기", "입력"],
    tags_en: ["search", "address bar", "quick search", "google search", "omnibox"]
  },
  {
    id: 113, category: "탐색",
    title: "최근 방문한 페이지 목록 보기",
    title_en: "View Recent History List",
    desc: "뒤로가기/앞으로가기 버튼을 길게 누르거나 우클릭하여 최근 기록을 봅니다.",
    desc_en: "Long-press or right-click the back/forward button to see a list of recently visited pages.",
    shortcut: { win: "뒤로가기 버튼 우클릭", mac: "뒤로가기 버튼 우클릭" },
    shortcut_en: { win: "Right-click Back button", mac: "Right-click Back button" },
    tags: ["히스토리", "뒤로가기", "기록", "빠른이동", "방문기록"],
    tags_en: ["history", "back button", "quick move", "recent sites", "browsing history"]
  },
  {
    id: 114, category: "탭/창",
    title: "여러 탭 한꺼번에 선택",
    title_en: "Select Multiple Tabs",
    desc: "Ctrl 키를 누른 채 탭을 클릭하여 여러 개를 선택하고 한 번에 이동하거나 닫습니다.",
    desc_en: "Hold the Ctrl key and click tabs to select multiple ones to move or close them all at once.",
    shortcut: { win: "Ctrl + 탭 클릭", mac: "Cmd + 탭 클릭" },
    shortcut_en: { win: "Ctrl + Click tabs", mac: "Cmd + Click tabs" },
    tags: ["다중선택", "탭관리", "정리", "여러탭", "일괄선택"],
    tags_en: ["multiple selection", "tab management", "organize", "batch select", "multi-tab"]
  },
  {
    id: 115, category: "탐색",
    title: "홈 페이지로 이동",
    title_en: "Go to Home Page",
    desc: "설정된 홈 페이지로 즉시 이동합니다.",
    desc_en: "Instantly navigate to your designated home page.",
    shortcut: { win: "Alt + Home", mac: "Cmd + Shift + H" },
    tags: ["홈", "시작페이지", "홈으로", "첫화면"],
    tags_en: ["home", "home page", "start page", "go home"]
  },
  {
    id: 116, category: "탐색",
    title: "툴바의 첫 번째 항목으로 이동",
    title_en: "Focus on Toolbar",
    desc: "주소창이나 확장 프로그램 등 툴바 영역으로 포커스를 이동합니다.",
    desc_en: "Moves focus to the toolbar area, including the address bar and extensions.",
    shortcut: { win: "Shift + Alt + T", mac: "Ctrl + F2" },
    tags: ["툴바", "포커스", "단축키", "상단바", "메뉴이동"],
    tags_en: ["toolbar", "focus", "shortcut", "top bar", "navigation"]
  }
];

const I18N = {
  ko: {
    dailyLabel: "⭐ 오늘의 추천", 
    searchPlaceholders: [
      "검색 (예: 새탭, 단축키, 개발자)",
      "검색 (예: 다운로드, 복사, 설정)",
      "검색 (예: 북마크, 게임, 탭)",
      "검색 (예: 전체화면, 새로고침, 검색)",
      "검색 (예: 뒤로가기, 개발자, 링크)",
      "검색 (예: 다시 열기, 설정, 단축키)",
    ],
    allTips: "전체 팁",
    myLibrary: "내 보관함 ⭐",
    myShortcuts: "나의 지름길 🚀",
    statsBtnTitle: "자주 본 팁 통계",
    statsModalTitle: "📊 자주 본 팁 Top 10",
    noteModalTitle: "메모",
    noteInputPlaceholder: "이 팁에 대한 메모나 의견을 입력하세요...",
    noteDelete: "삭제",
    noteSave: "저장",
    darkMode: "다크모드 전환",
    loading: "로딩 중...",
    clearSearchTitle: "검색 초기화",
    categories: { "전체": "전체", "탭/창": "탭/창", "탐색": "탐색", "주소창/검색": "주소창/검색", "화면": "화면", "북마크": "북마크", "편집": "편집", "프로필/공간": "프로필/공간", "개발자": "개발자", "설정": "설정", "이스터에그": "이스터에그" },
    emptyFav: "아직 저장된 보관함이 없습니다 ⭐<br><small style=\"font-weight:400; opacity:0.7\">팁에 있는 별표를 눌러보세요.</small>",
    emptySearch: "검색 결과가 없습니다 😅",
    emptyShortcuts: "아직 등록된 지름길이 없습니다 🚀<br><small style=\"font-weight:400; opacity:0.7\">'+ 새 지름길 만들기' 버튼을 눌러보세요.</small>",
    relatedTipsLabel: "💡 관련 팁",
    copyShortcutTitle: "클릭하여 검색어 복사",
    writeNoteTitle: "메모 작성",
    copiedToast: (text) => `'${text}'가 복사되었습니다!`,
    emptyStats: "아직 본 팁이 없습니다 👀<br><small>팁을 클릭하면 통계가 기록됩니다.</small>",
    views: (count) => `${count}회`,
    emptyNote: "작성된 메모가 없습니다",
    confirmDeleteNote: "모든 메모를 삭제하시겠어요? 복구할 수 없습니다.",
    confirmDeleteShortcut: "이 지름길을 삭제하시겠습니까?",
    goToAction: "바로 이동 →",
    goToSettings: "설정으로 이동 →",
    runShortcut: "지름길 실행 ⚡"
  },
  en: {
    dailyLabel: "⭐ Tip of the Day", 
    searchPlaceholders: [
      "Search (e.g., new tab, shortcut, developer)",
      "Search (e.g., download, copy, settings)",
      "Search (e.g., bookmark, game, tab)",
      "Search (e.g., fullscreen, refresh, search)",
      "Search (e.g., go back, developer, link)",
      "Search (e.g., reopen, settings, shortcut)",
    ],
    allTips: "All Tips",
    myLibrary: "My Library ⭐",
    myShortcuts: "My Shortcuts 🚀",
    statsBtnTitle: "View Statistics",
    statsModalTitle: "📊 Top 10 Most Viewed Tips",
    noteModalTitle: "Note",
    noteInputPlaceholder: "Enter your notes or thoughts about this tip...",
    noteDelete: "Delete",
    noteSave: "Save",
    darkMode: "Toggle Dark Mode",
    loading: "Loading...",
    clearSearchTitle: "Clear search",
    categories: { "전체": "All", "탭/창": "Tab/Window", "탐색": "Navigation", "주소창/검색": "Omnibox", "화면": "Screen", "북마크": "Bookmarks", "편집": "Editing", "프로필/공간": "Profile/Space", "개발자": "Developer", "설정": "Settings", "이스터에그": "Easter Eggs" },
    emptyFav: "No items saved to your library yet ⭐<br><small style=\"font-weight:400; opacity:0.7\">Press the star icon on a tip to save it.</small>",
    emptySearch: "No search results found 😅",
    emptyShortcuts: "No shortcuts registered yet 🚀<br><small style=\"font-weight:400; opacity:0.7\">Click the '+ Create New Shortcut' button.</small>",
    relatedTipsLabel: "💡 Related Tips",
    copyShortcutTitle: "Click to copy search term",
    writeNoteTitle: "Write a note",
    copiedToast: (text) => `Copied '${text}' to clipboard!`,
    emptyStats: "No tips viewed yet 👀<br><small>Click on a tip to record statistics.</small>",
    views: (count) => `${count} views`,
    emptyNote: "No notes written yet",
    confirmDeleteNote: "Are you sure you want to delete all notes? This cannot be undone.",
    confirmDeleteShortcut: "Are you sure you want to delete this shortcut?",
    goToAction: "Go to →",
    goToSettings: "Go to Settings →",
    runShortcut: "Run Shortcut ⚡"
  }
};

const TABS = { ALL: 'all', FAV: 'fav', SHORTCUTS: 'shortcuts' };
const OS = { WIN: 'win', MAC: 'mac' };
const LANG = { KO: 'ko', EN: 'en' };
const CATEGORY_ALL = "전체";

const $ = (selector) => document.querySelector(selector);

const state = {
  favorites: [],
  userShortcuts: [],
  currentTab: TABS.ALL,
  currentCategory: '전체',
  currentOS: 'win',
  isDark: false,
  viewCounts: {},
  tipNotes: {},
  currentNoteId: null,
  editingShortcutId: null, // 수정 중인 지름길 ID 저장
  currentLang: LANG.KO,
  categoryOrder: ["전체", "탭/창", "탐색", "주소창/검색", "화면", "북마크", "편집", "프로필/공간", "개발자", "설정", "이스터에그"]
};
// ── 초기화 ────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  const data = await chrome.storage.local.get(['favs', 'os', 'dark', 'views', 'notes', 'lang', 'categoryOrder', 'userShortcuts']);

  // 기본 예시 지름길 설정
  let initialShortcuts = data.userShortcuts || [];
  if (initialShortcuts.length === 0) {
    initialShortcuts = [{
      id: 'example-1',
      name: '[예시] 네이버 메일 수신확인',
      url: 'https://www.naver.com',
      steps: ['메일', '보낸메일함', '수신확인']
    }];
    await chrome.storage.local.set({ userShortcuts: initialShortcuts });
  }

  Object.assign(state, {
    favorites: data.favs || [],
    userShortcuts: initialShortcuts,
    currentOS: data.os || OS.WIN,
    isDark: data.dark || false,
    viewCounts: data.views || {},
    tipNotes: data.notes || {},
    currentCategory: CATEGORY_ALL,
    currentLang: data.lang || LANG.KO,
    categoryOrder: data.categoryOrder || state.categoryOrder
  });

  applyTheme();
  applyLanguage();
  setOSBtn(state.currentOS);
  buildCategoryNav();
  showDailyTip();
  renderTips();
  setRandomPlaceholder();

  // 검색창 클릭 시 추천 검색어 복사
  $('#search').addEventListener('click', handleSearchClick);
  
  // 통계 버튼 이벤트
  $('#stats-btn').addEventListener('click', openStatsModal);
  
  // 모달 닫기 버튼
  $('.stats-close').addEventListener('click', closeStatsModal);
  $('.note-close').addEventListener('click', closeNoteModal);
  $('.shortcut-close').addEventListener('click', closeShortcutModal);

  // 지름길 추가 버튼
  $('#add-shortcut-btn').addEventListener('click', () => openShortcutModal());
  $('#save-shortcut-btn').addEventListener('click', saveShortcut);
  $('#add-step-item-btn').addEventListener('click', () => addStepInput());

  // 언어 변경 버튼
  $('#lang-ko').addEventListener('click', () => handleLangChange(LANG.KO));
  $('#lang-en').addEventListener('click', () => handleLangChange(LANG.EN));
  
  initClearButton();
  initCanvas();
});


let canvas, ctx;
let particles = [];
let animatingParticles = false;

function initCanvas() {
  canvas = $('#effect-canvas');
  ctx = canvas.getContext('2d');
  resizeCanvas();
  window.onresize = resizeCanvas;
}

function createParticleGroupAt(x, y, color = null) {
  for (let i = 0; i < 10; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 5,
      vy: (Math.random() - 0.5) * 5 - 2,
      life: 1.0,
      size: Math.random() * 4 + 1,
      color: color || (state.isDark ? '#669df6' : '#4285f4')
    });
  }
  if (!animatingParticles) updateParticles();
}

function updateParticles() {
  animatingParticles = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.03;

    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.life;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    return p.life > 0;
  });

  if (particles.length > 0) {
    requestAnimationFrame(updateParticles);
  } else {
    animatingParticles = false;
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initClearButton() {
  $('#clear-btn').onclick = () => {
    $('#search').value = "";
    renderTips("");
  };
}






// ── 다크모드 ──────────────────────────────────
function applyTheme() {
  document.body.classList.toggle('dark', state.isDark);
  $('#dark-btn').textContent = state.isDark ? '☀️' : '🌙';

  const CHROME_BLUE = '#4285f4';
  const CHROME_GREEN = '#0f9d58';

  const accentColor = state.isDark ? '#669df6' : CHROME_BLUE;
  const dailyFrom = state.isDark ? '#669df6' : CHROME_BLUE;
  const dailyTo = state.isDark ? '#34a853' : CHROME_GREEN;

  document.documentElement.style.setProperty('--accent', accentColor);
  document.documentElement.style.setProperty('--daily-from', dailyFrom);
  document.documentElement.style.setProperty('--daily-to', dailyTo);
}

$('#dark-btn').onclick = async () => {
  state.isDark = !state.isDark;
  applyTheme();
  await chrome.storage.local.set({ dark: state.isDark });
};

// ── 언어 변경 ──────────────────────────────────
function applyLanguage() {
  const lang = state.currentLang;
  const strings = I18N[lang];

  $('#lang-ko').classList.toggle('active', lang === LANG.KO);
  $('#lang-en').classList.toggle('active', lang === LANG.EN);

  $('#daily-label').textContent = strings.dailyLabel;
  $('#tab-all').textContent = strings.allTips;
  $('#tab-fav').textContent = strings.myLibrary;
  $('#tab-shortcuts').textContent = strings.myShortcuts;
  $('#stats-btn').title = strings.statsBtnTitle;
  $('#dark-btn').title = strings.darkMode;
  $('#daily-title').textContent = strings.loading;
  $('#clear-btn').title = strings.clearSearchTitle;

  $('#stats-modal h3').textContent = strings.statsModalTitle;
  $('#note-input').placeholder = strings.noteInputPlaceholder;
  document.querySelector('.btn-delete').textContent = strings.noteDelete;
  document.querySelector('.btn-save').textContent = strings.noteSave;
}

async function handleLangChange(lang) {
  if (state.currentLang === lang) return;
  state.currentLang = lang;
  await chrome.storage.local.set({ lang });

  applyLanguage();
  setRandomPlaceholder();
  buildCategoryNav();
  showDailyTip();
  renderTips($('#search').value);
}

// ── OS 토글 ───────────────────────────────────
function setOSBtn(os) {
  $('#os-win').classList.toggle('active', os === OS.WIN);
  $('#os-mac').classList.toggle('active', os === OS.MAC);
}

const handleOSChange = async (os) => {
  if (state.currentOS === os) return;
  state.currentOS = os;
  setOSBtn(os);
  await chrome.storage.local.set({ os });
  showDailyTip();
  renderTips($('#search').value);
};

$('#os-win').onclick = () => handleOSChange(OS.WIN);
$('#os-mac').onclick = () => handleOSChange(OS.MAC);

// ── 카테고리 버튼 동적 생성 ───────────────────
function buildCategoryNav() {
  const nav = $('#cat-nav');
  nav.innerHTML = "";
  const lang = state.currentLang;
  const categoryStrings = I18N[lang].categories;

  state.categoryOrder.forEach(catKey => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = categoryStrings[catKey] || catKey;
    btn.dataset.cat = catKey;
    btn.draggable = true;
    
    if (catKey === state.currentCategory) btn.classList.add('active');

    btn.onclick = () => {
      state.currentCategory = catKey;
      $('#cat-nav').querySelectorAll('button').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      renderTips($('#search').value);
    };
    nav.appendChild(btn);
  });

  addDragDropHandlers(nav);
}

let draggedItem = null;

function addDragDropHandlers(container) {
  if (container.dataset.dragInit) return;
  container.dataset.dragInit = 'true';

  container.addEventListener('dragstart', e => {
    if (e.target.tagName === 'BUTTON') {
      draggedItem = e.target;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', e.target.dataset.cat);
      setTimeout(() => {
        e.target.classList.add('dragging');
      }, 0);
    }
  });

  container.addEventListener('dragend', e => {
    if (draggedItem) {
      draggedItem.classList.remove('dragging');
      draggedItem = null;
    }
    $('#cat-nav').querySelectorAll('button').forEach(btn => btn.classList.remove('drag-over'));
  });

  container.addEventListener('dragover', e => {
    e.preventDefault();
    const target = e.target.closest('button');
    if (target && target !== draggedItem) {
      $('#cat-nav').querySelectorAll('button').forEach(btn => btn.classList.remove('drag-over'));
      target.classList.add('drag-over');
    }
  });
  
  container.addEventListener('dragleave', e => {
    const target = e.target.closest('button');
    if (target) {
      target.classList.remove('drag-over');
    }
  });

  container.addEventListener('drop', async e => {
    e.preventDefault();
    const target = e.target.closest('button');
    if (target && draggedItem && target !== draggedItem) {
      const sourceCat = draggedItem.dataset.cat;
      const targetCat = target.dataset.cat;

      const newOrder = [...state.categoryOrder];
      newOrder.splice(newOrder.indexOf(sourceCat), 1);
      newOrder.splice(newOrder.indexOf(targetCat), 0, sourceCat);
      state.categoryOrder = newOrder;

      await chrome.storage.local.set({ categoryOrder: state.categoryOrder });
      buildCategoryNav();
    }
    $('#cat-nav').querySelectorAll('button').forEach(btn => btn.classList.remove('drag-over'));
  });
}

function findRelatedTips(sourceTipId, count = 3) {
  const sourceTip = tips.find(t => t.id === sourceTipId);
  if (!sourceTip || !sourceTip.tags || sourceTip.tags.length === 0) return [];

  const sourceTags = new Set(sourceTip.tags);

  const scores = tips
    .map(tip => {
      if (tip.id === sourceTipId || !tip.tags) return { tip, score: 0 };
      const commonTags = tip.tags.filter(tag => sourceTags.has(tag));
      const categoryBonus = tip.category === sourceTip.category ? 1 : 0;
      const score = commonTags.length + categoryBonus;
      return { tip, score };
    })
    .filter(item => item.score > 1)
    .sort((a, b) => b.score - a.score);

  return scores.slice(0, count).map(item => item.tip);
}

function showDailyTip() {
  const contentEl = $('#daily-content');
  const titleEl = $('#daily-title');
  const shortcutEl = $('#daily-shortcut');

  contentEl.classList.add('fade-out');
  contentEl.classList.remove('fade-in');

  setTimeout(() => {
    const now = new Date();
    const lang = state.currentLang;
    const titleKey = lang === LANG.EN ? 'title_en' : 'title';

    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const pool = tips.filter(tip => tip.category !== '이스터에그');
    const t = pool[dayOfYear % pool.length];
    titleEl.innerText = t[titleKey] || t.title;

    const shortcutObj = (lang === LANG.EN && t.shortcut_en) ? t.shortcut_en : t.shortcut;
    shortcutEl.innerText = (shortcutObj && shortcutObj[state.currentOS]) || "";
    contentEl.classList.remove('fade-out');
    contentEl.classList.add('fade-in');
  }, 300);
}

// ── 바로가기 버튼 생성 함수 ──────────────────
function createActionButtons(tip, div) {
  const lang = state.currentLang;
  const shortcutObj = (lang === LANG.EN && tip.shortcut_en) ? tip.shortcut_en : tip.shortcut;
  const shortcutText = (shortcutObj && shortcutObj[state.currentOS]) || "";
  const strings = I18N[state.currentLang];
  
  const chromeUrlMatch = shortcutText && shortcutText.match(/chrome:\/\/[^\s]+/);
  if (chromeUrlMatch) {
    const url = chromeUrlMatch[0];
    const btn = document.createElement('button');
    btn.className = 'go-btn';
    btn.innerText = strings.goToAction;
    btn.onclick = (e) => {
      e.stopPropagation();
      chrome.tabs.create({ url: url });
    };
    div.appendChild(btn);
    return;
  }

  if (shortcutText && (shortcutText.includes('[키워드]') || shortcutText.includes('[keyword]'))) {
    const btn = document.createElement('button');
    btn.className = 'go-btn';
    btn.innerText = strings.goToSettings;
    btn.onclick = (e) => {
      e.stopPropagation();
      chrome.tabs.create({ url: 'chrome://settings/searchEngines' });
    };
    div.appendChild(btn);
    return;
  }

  if (tip.link) {
    const btn = document.createElement('button');
    btn.className = 'go-btn';
    btn.innerText = strings.goToAction;
    btn.onclick = (e) => {
      e.stopPropagation();
      chrome.tabs.create({ url: tip.link });
    };
    div.appendChild(btn);
  }
}

// ── 렌더링 ────────────────────────────────────
function renderTips(filter = "") {
  const listEl = $('#list');
  listEl.innerHTML = "";
  const strings = I18N[state.currentLang];

  // 지름길 탭일 경우 별도 렌더링
  if (state.currentTab === TABS.SHORTCUTS) {
    renderShortcuts();
    return;
  }

  let pool = state.currentTab === TABS.ALL ? tips : tips.filter(t => state.favorites.includes(t.id));

  if (state.currentCategory !== CATEGORY_ALL) {
    pool = pool.filter(t => t.category === state.currentCategory);
  }

  const lang = state.currentLang;
  const searchLow = filter.toLowerCase();

  const filtered = pool.filter(t => {
    const title = (lang === LANG.EN && t.title_en) ? t.title_en : t.title;
    const desc = (lang === LANG.EN && t.desc_en) ? t.desc_en : t.desc;
    const searchTags = (lang === LANG.EN && t.tags_en) ? t.tags_en : t.tags;
    return (
      title.toLowerCase().includes(searchLow) ||
      desc.toLowerCase().includes(searchLow) ||
      searchTags.some(tag => tag.toLowerCase().includes(searchLow))
    );
  });

  if (filtered.length === 0) {
    if (state.currentTab === TABS.FAV) {
      listEl.innerHTML = `<div class="empty-msg">${strings.emptyFav}</div>`;
    } else {
      listEl.innerHTML = `<div class="empty-msg">${strings.emptySearch}</div>`;
    }
    return;
  }

  filtered.forEach(tip => {
    const isFav = state.favorites.includes(tip.id);
    const div = document.createElement('div');
    div.className = 'tip-item' + (tip.category === '이스터에그' ? ' actionable' : '');
    div.dataset.id = tip.id;

    const lang = state.currentLang;
    const titleKey = lang === LANG.EN ? 'title_en' : 'title';
    const descKey = lang === LANG.EN ? 'desc_en' : 'desc';

    const shortcutObj = (lang === LANG.EN && tip.shortcut_en) ? tip.shortcut_en : tip.shortcut;
    const shortcutText = (shortcutObj && shortcutObj[state.currentOS]) || "";
    let shortcutHTML;
    
    const isSearchableEasterEgg = tip.category === '이스터에그' && (shortcutText.includes('검색') || shortcutText.includes('Search')) && !tip.link;

    if (isSearchableEasterEgg) {
      const match = shortcutText.match(/'([^']+)'/);
      const textToCopy = match ? match[1] : '';
      if (textToCopy) {
        shortcutHTML = `<div class="shortcut copyable" title="${strings.copyShortcutTitle}" data-copy-text="${textToCopy}">${shortcutText}</div>`;
      } else {
        shortcutHTML = `<div class="shortcut">${shortcutText}</div>`;
      }
    } else {
      shortcutHTML = `<div class="shortcut">${shortcutText}</div>`;
    }

    div.innerHTML = `
      <div class="tip-category">${I18N[lang].categories[tip.category] || tip.category}</div>
      <div class="tip-title">${tip[titleKey] || tip.title}</div>
      <div class="tip-desc">${tip[descKey] || tip.desc}</div>
      ${shortcutHTML}
      <span class="fav-btn" data-id="${tip.id}">${isFav ? '⭐' : '☆'}</span>
      <button class="note-btn" data-id="${tip.id}" title="${strings.writeNoteTitle}">📝</button>
    `;

    createActionButtons(tip, div);

    const related = findRelatedTips(tip.id);
    if (related.length > 0) {
      const relatedSection = document.createElement('div');
      relatedSection.className = 'related-tips';
      relatedSection.innerHTML = `
        <div class="related-label">${strings.relatedTipsLabel}</div>
        <div class="related-list">
          ${related.map(r => `<span class="related-item" data-id="${r.id}">${r[titleKey] || r.title}</span>`).join('')}
        </div>
      `;
      div.appendChild(relatedSection);
    }

    listEl.appendChild(div);
  });
}

function renderShortcuts() {
  const listEl = $('#list');
  const strings = I18N[state.currentLang];
  
  if (state.userShortcuts.length === 0) {
    listEl.innerHTML = `<div class="empty-msg">${strings.emptyShortcuts}</div>`;
    return;
  }

  state.userShortcuts.forEach(sc => {
    const div = document.createElement('div');
    div.className = 'tip-item';
    div.innerHTML = `
      <div class="tip-category">USER SHORTCUT</div>
      <div class="tip-title">${sc.name}</div>
      <div class="tip-desc">${sc.url}</div>
      <div class="shortcut">${sc.steps.join(' → ')}</div>
      <div style="position: absolute; right: 18px; top: 18px; display: flex; gap: 10px;">
        <span class="edit-sc" data-id="${sc.id}" title="수정" style="cursor:pointer; font-size: 18px;">✏️</span>
        <span class="delete-sc" data-id="${sc.id}" title="삭제" style="cursor:pointer; font-size: 18px;">🗑️</span>
      </div>
      <button class="go-btn" style="margin-top: 14px; background: var(--accent);">${strings.runShortcut}</button>
    `;
    
    // 수정 버튼 이벤트
    div.querySelector('.edit-sc').onclick = (e) => {
      e.stopPropagation();
      openShortcutModal(sc);
    };

    // 삭제 버튼 이벤트
    div.querySelector('.delete-sc').onclick = (e) => {
      e.stopPropagation();
      if (confirm(strings.confirmDeleteShortcut)) {
        state.userShortcuts = state.userShortcuts.filter(s => s.id !== sc.id);
        chrome.storage.local.set({ userShortcuts: state.userShortcuts });
        renderTips();
      }
    };

    // 실행 버튼 이벤트
    div.querySelector('.go-btn').onclick = () => {
      runShortcut(sc);
    };

    listEl.appendChild(div);
  });
}

// ── 지름길 실행 엔진 ──────────────────────────
async function runShortcut(sc) {
  // 1. 자동화 작업 상태 생성
  const task = {
    id: sc.id,
    steps: sc.steps,
    currentStepIndex: 0,
    startTime: Date.now()
  };

  // 2. 저장소에 작업 등록
  await chrome.storage.local.set({ activeShortcutTask: task });

  // 3. 페이지 이동
  chrome.tabs.create({ url: sc.url });
  
  showToast(state.currentLang === LANG.KO ? '지름길 실행 중... 버튼을 자동으로 찾습니다.' : 'Running shortcut... Finding buttons automatically.');
}

// ── 이벤트 ────────────────────────────────────
$('#search').addEventListener('input', (e) => renderTips(e.target.value));

$('#list').addEventListener('click', async (e) => {
  const copyableEl = e.target.closest('.shortcut.copyable');
  if (copyableEl) {
    e.stopPropagation();
    const text = copyableEl.dataset.copyText;
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(I18N[state.currentLang].copiedToast(text));
      });
    }
    return;
  }

  if (e.target.classList.contains('fav-btn') && !e.target.classList.contains('delete-sc')) {
    e.stopPropagation();
    const id = parseInt(e.target.dataset.id);
    const isAdding = !state.favorites.includes(id);

    if (isAdding) {
      state.favorites.push(id);
      const starRect = e.target.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      const x = starRect.left + starRect.width / 2 - canvasRect.left;
      const y = starRect.top + starRect.height / 2 - canvasRect.top;
      createParticleGroupAt(x, y, 'var(--accent-gold)');
    } else {
      state.favorites = state.favorites.filter(f => f !== id);
    }

    await chrome.storage.local.set({ favs: state.favorites });
    renderTips($('#search').value);
    return;
  }
  
  if (e.target.classList.contains('note-btn')) {
    e.stopPropagation();
    const id = parseInt(e.target.dataset.id);
    openNoteModal(id);
    return;
  }
  
  if (e.target.classList.contains('related-item')) {
    e.stopPropagation();
    const targetId = parseInt(e.target.dataset.id);
    let targetEl = document.querySelector(`.tip-item[data-id="${targetId}"]`);

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetEl.classList.add('highlight');
      setTimeout(() => targetEl.classList.remove('highlight'), 600);
    } else {
      state.currentTab = TABS.ALL;
      state.currentCategory = CATEGORY_ALL;
      $('#search').value = '';
      $('#tab-all').classList.add('active');
      $('#tab-fav').classList.remove('active');
      $('#tab-shortcuts').classList.remove('active');
      renderTips();
      targetEl = document.querySelector(`.tip-item[data-id="${targetId}"]`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetEl.classList.add('highlight');
        setTimeout(() => targetEl.classList.remove('highlight'), 600);
      }
    }
    return;
  }
  
  const tipItem = e.target.closest('.tip-item');
  if (tipItem && !e.target.closest('.fav-btn, .note-btn, .related-item, .go-btn')) {
    const id = parseInt(tipItem.dataset.id);
    if (!isNaN(id)) {
      const currentCount = state.viewCounts[id] || 0;
      state.viewCounts[id] = currentCount + 1;
      await chrome.storage.local.set({ views: state.viewCounts });
    }
  }
});

$('#tab-all').onclick = () => {
  state.currentTab = TABS.ALL;
  switchTab();
};
$('#tab-fav').onclick = () => {
  state.currentTab = TABS.FAV;
  switchTab();
};
$('#tab-shortcuts').onclick = () => {
  state.currentTab = TABS.SHORTCUTS;
  switchTab();
};

function switchTab() {
  $('#tab-all').classList.toggle('active', state.currentTab === TABS.ALL);
  $('#tab-fav').classList.toggle('active', state.currentTab === TABS.FAV);
  $('#tab-shortcuts').classList.toggle('active', state.currentTab === TABS.SHORTCUTS);
  
  // 지름길 탭에서는 카테고리 숨기고 추가 컨트롤 보이기
  const isShortcuts = state.currentTab === TABS.SHORTCUTS;
  $('#cat-nav').style.display = isShortcuts ? 'none' : 'flex';
  $('#shortcut-controls').style.display = isShortcuts ? 'block' : 'none';
  $('.search-wrapper').style.display = isShortcuts ? 'none' : 'block';
  
  renderTips($('#search').value);
}

// ── 지름길 모달 함수 ────────────────────────────────
function addStepInput(value = "") {
  const container = $('#sc-steps-container');
  if (!container) return;
  const stepCount = container.children.length + 1;
  
  const stepDiv = document.createElement('div');
  stepDiv.className = 'step-item';
  stepDiv.style.display = 'flex';
  stepDiv.style.alignItems = 'center';
  stepDiv.style.gap = '8px';
  stepDiv.style.marginBottom = '8px';
  
  stepDiv.innerHTML = `
    <span style="font-size: 11px; font-weight: 800; color: var(--accent); min-width: 45px;">${stepCount}단계</span>
    <input type="text" class="sc-step-input" placeholder="버튼 글자" value="${value}" style="flex: 1; padding: 8px 12px; font-size: 12px; border-radius: 10px; border: 1px solid var(--border); background: var(--input-bg); color: var(--text);">
    <button class="remove-step-btn" style="background: none; border: none; cursor: pointer; font-size: 14px; padding: 0 5px; color: var(--text-mute);">✕</button>
  `;
  
  stepDiv.querySelector('.remove-step-btn').onclick = () => {
    stepDiv.remove();
    reorderSteps();
  };
  
  container.appendChild(stepDiv);
}

function reorderSteps() {
  const container = $('#sc-steps-container');
  Array.from(container.children).forEach((child, idx) => {
    child.querySelector('span').textContent = `${idx + 1}단계`;
  });
}

function openShortcutModal(shortcutToEdit = null) {
  const modalTitle = $('#shortcut-modal-title');
  const lang = state.currentLang;
  const container = $('#sc-steps-container');
  container.innerHTML = ''; // 기존 단계 초기화

  if (shortcutToEdit && shortcutToEdit.id) {
    // 수정 모드
    state.editingShortcutId = shortcutToEdit.id;
    modalTitle.textContent = lang === LANG.KO ? '🚀 지름길 수정하기' : '🚀 Edit Shortcut';
    $('#sc-name').value = shortcutToEdit.name;
    $('#sc-url').value = shortcutToEdit.url;
    
    if (shortcutToEdit.steps && shortcutToEdit.steps.length > 0) {
      shortcutToEdit.steps.forEach(step => addStepInput(step));
    } else {
      addStepInput(); 
    }
  } else {
    // 신규 생성 모드
    state.editingShortcutId = null;
    modalTitle.textContent = lang === LANG.KO ? '🚀 자동 지름길 설계하기' : '🚀 Create Journey';
    $('#sc-name').value = '';
    $('#sc-url').value = '';
    addStepInput(); // 첫 단계 입력창 자동 추가
  }
  
  $('#shortcut-modal').style.display = 'flex';
}

function closeShortcutModal() {
  $('#shortcut-modal').style.display = 'none';
  state.editingShortcutId = null;
}

async function saveShortcut() {
  const name = $('#sc-name').value.trim();
  const url = $('#sc-url').value.trim();
  
  // 모든 단계 입력값 가져오기
  const stepInputs = document.querySelectorAll('.sc-step-input');
  const steps = Array.from(stepInputs)
    .map(input => input.value.trim())
    .filter(val => val !== "");
  
  if (!name || !url) {
    showToast(state.currentLang === LANG.KO ? '이름과 URL을 입력해주세요.' : 'Please enter name and URL.');
    return;
  }

  if (state.editingShortcutId) {
    // 기존 지름길 업데이트
    const index = state.userShortcuts.findIndex(s => s.id === state.editingShortcutId);
    if (index !== -1) {
      state.userShortcuts[index] = {
        ...state.userShortcuts[index],
        name,
        url,
        steps
      };
    }
  } else {
    // 신규 지름길 추가
    const newShortcut = {
      id: Date.now(),
      name,
      url,
      steps
    };
    state.userShortcuts.push(newShortcut);
  }

  await chrome.storage.local.set({ userShortcuts: state.userShortcuts });
  
  closeShortcutModal();
  renderTips();
}

// ── 검색 placeholder 랜덤으로 변경 ──────────────────────
function setRandomPlaceholder() {
  const placeholders = I18N[state.currentLang].searchPlaceholders;
  const randomText = placeholders[Math.floor(Math.random() * placeholders.length)];
  $('#search').placeholder = randomText;
}

// ── 통계 모달 함수 ────────────────────────────────
function openStatsModal() {
  const strings = I18N[state.currentLang];
  const lang = state.currentLang;
  const titleKey = lang === LANG.EN ? 'title_en' : 'title';
  const top10 = Object.entries(state.viewCounts)
    .map(([id, count]) => {
      const tip = tips.find(t => t.id === parseInt(id));
      return { id, count, tip };
    })
    .filter(item => item.tip)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const listEl = $('#stats-list');
  if (top10.length === 0) {
    listEl.innerHTML = `<div class="stats-item empty">${strings.emptyStats}</div>`;
  } else {
    listEl.innerHTML = top10.map((item, idx) => `
      <div class="stats-item">
        <span class="stats-rank">#${idx + 1}</span>
        <div class="stats-info">
          <div class="stats-title">${item.tip[titleKey] || item.tip.title}</div>
          <div class="stats-category">${strings.categories[item.tip.category] || item.tip.category}</div>
        </div>
        <div class="stats-views">${strings.views(item.count)}</div>
      </div>
    `).join('');
  }

  $('#stats-modal').style.display = 'flex';
}

function closeStatsModal() {
  $('#stats-modal').style.display = 'none';
}

// ── 메모 모달 함수 ─────────────────────────────────
async function openNoteModal(tipId) {
  state.currentNoteId = tipId;
  const lang = state.currentLang;
  const titleKey = lang === LANG.EN ? 'title_en' : 'title';
  const tip = tips.find(t => t.id === tipId);
  if (!tip) return;

  $('#note-title').innerText = `📝 ${tip[titleKey] || tip.title}`;
  $('#note-input').value = '';
  $('#note-input').focus();

  const notes = state.tipNotes[tipId] || [];
  const noteListEl = $('#note-list');
  noteListEl.innerHTML = '';

  if (notes.length === 0) {
    noteListEl.innerHTML = `<div class="note-empty">${I18N[state.currentLang].emptyNote}</div>`;
  } else {
    const fragment = document.createDocumentFragment();
    notes.forEach(note => {
      const item = document.createElement('div');
      item.className = 'note-item';
      item.innerHTML = `<div class="note-date">${note.date}</div><div class="note-content"></div>`;
      item.querySelector('.note-content').textContent = note.content;
      fragment.appendChild(item);
    });
    noteListEl.appendChild(fragment);
  }

  $('#note-modal').style.display = 'flex';
}

function closeNoteModal() {
  $('#note-modal').style.display = 'none';
  state.currentNoteId = null;
}

async function saveNote() {
  const content = $('#note-input').value.trim();
  if (!content || state.currentNoteId === null) return;

  const today = new Date().toISOString().split('T')[0];
  if (!state.tipNotes[state.currentNoteId]) state.tipNotes[state.currentNoteId] = [];
  state.tipNotes[state.currentNoteId].push({ date: today, content });

  await chrome.storage.local.set({ notes: state.tipNotes });
  openNoteModal(state.currentNoteId);
}

function deleteNote() {
  if (!confirm(I18N[state.currentLang].confirmDeleteNote)) return;
  if (state.currentNoteId !== null) {
    delete state.tipNotes[state.currentNoteId];
    chrome.storage.local.set({ notes: state.tipNotes });
    openNoteModal(state.currentNoteId);
  }
}

// ── 검색어 복사 토스트 ──────────────────────────
let toastTimer;
function showToast(message) {
  const toast = $('#toast-notification');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

function handleSearchClick(e) {
  const input = e.target;
  const placeholder = input.placeholder;

  if (input.value.trim() !== '') return;

  const match = placeholder.match(/\(e\.g\., ([^,]+)|\(예: ([^,]+)/);
  if (match && (match[1] || match[2])) {
    const keyword = (match[1] || match[2]).trim();
    navigator.clipboard.writeText(keyword).then(() => {
      showToast(I18N[state.currentLang].copiedToast(keyword));
    }).catch(err => console.error('클립보드 복사 실패:', err));
  }
}

document.addEventListener('click', (e) => {
  const statsModal = $('#stats-modal');
  const noteModal = $('#note-modal');
  const shortcutModal = $('#shortcut-modal');
  
  if (e.target === statsModal) closeStatsModal();
  if (e.target === noteModal) closeNoteModal();
  if (e.target === shortcutModal) closeShortcutModal();
});