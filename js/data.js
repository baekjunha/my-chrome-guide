export const tips = [
  // ── 탭 / 창 관리 ──────────────────────────────
  {
    id: 1, category: "탭/창",
    title: "실수로 닫은 탭 복구",
    title_en: "Reopen Closed Tab",
    desc: "실수로 탭을 닫았을 때, 마지막 탭부터 순서대로 다시 열어줍니다.",
    desc_en: "Reopens the last closed tab in order.",
    shortcut: { win: "Ctrl + Shift + T", mac: "Cmd + Shift + T" },
    tags: ["탭", "복구", "실수", "되돌리기", "삭제", "방금", "살리기", "되살리기", "실수로닫음", "방금닫은"],
    tags_en: ["tab", "recovery", "mistake", "undo", "delete", "just now", "back", "reopen", "restore", "bring back", "unclose", "tab recovery"]
  },
  {
    id: 2, category: "탭/창",
    title: "새 탭 열기",
    title_en: "Open New Tab",
    desc: "새로운 웹페이지를 열고 싶을 때, 현재 창에 새로운 탭을 추가해줍니다.",
    desc_en: "Quickly opens a new tab.",
    shortcut: { win: "Ctrl + T", mac: "Cmd + T" },
    tags: ["새탭", "탭", "열기", "추가", "플러스", "탭추가"],
    tags_en: ["new tab", "tab", "open", "add tab", "plus", "newtab", "open tab", "new"]
  },
  {
    id: 3, category: "탭/창",
    title: "현재 탭 닫기",
    title_en: "Close Current Tab",
    desc: "작업이 끝난 페이지를 닫고 싶을 때, 현재 활성화된 탭을 종료해줍니다.",
    desc_en: "Closes the currently active tab.",
    shortcut: { win: "Ctrl + W", mac: "Cmd + W" },
    tags: ["탭닫기", "닫기", "종료", "끄기", "꺼짐", "탭끄기", "닫아"],
    tags_en: ["close tab", "close", "exit", "quit", "exit tab", "bye"]
  },
  {
    id: 4, category: "탭/창",
    title: "다음 / 이전 탭 이동",
    title_en: "Next / Previous Tab",
    desc: "마우스를 사용하지 않고 여러 탭 사이를 빠르게 이동할 때 사용합니다.",
    desc_en: "Quickly switch between tabs in order.",
    shortcut: { win: "Ctrl + Tab / Ctrl + Shift + Tab", mac: "Cmd + Option + → / ← (또는 Ctrl + Tab / Ctrl + Shift + Tab)" },
    shortcut_en: { win: "Ctrl + Tab / Ctrl + Shift + Tab", mac: "Cmd + Option + → / ← (or Ctrl + Tab / Ctrl + Shift + Tab)" },
    tags: ["탭이동", "전환", "다음탭", "이전탭", "바꾸기", "옆으로", "순서", "오른쪽", "왼쪽"],
    tags_en: ["tab switch", "switch", "next tab", "previous tab", "prev tab", "change", "side", "order", "next", "previous", "move", "right", "left"]
  },
  {
    id: 5, category: "탭/창",
    title: "특정 탭으로 바로 이동",
    desc: "여러 개의 탭 중 특정 순서의 탭으로 즉시 이동하고 싶을 때 사용합니다.",
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
    desc: "특정 탭을 별도의 창으로 분리하여 보고 싶을 때 사용합니다.",
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
    desc: "현재 창과 별개로 완전히 새로운 브라우저 창을 열고 싶을 때 사용합니다.",
    desc_en: "Opens a separate new Chrome window.",
    shortcut: { win: "Ctrl + N", mac: "Cmd + N" },
    tags: ["새창", "창열기", "추가창", "별도창", "새로운창", "윈도우"],
    tags_en: ["new window", "open window", "window", "add window", "separate window", "newwin"]
  },
  {
    id: 8, category: "탭/창",
    title: "시크릿 모드 (사생활 보호)",
    title_en: "Incognito Mode (Privacy)",
    desc: "방문 기록이나 쿠키를 남기지 않고 안전하게 웹서핑을 할 수 있습니다.",
    desc_en: "Browse the web privately without saving your history. (Note: School, employer, or ISP may still see activity)",
    shortcut: { win: "Ctrl + Shift + N", mac: "Cmd + Shift + N" },
    tags: ["몰래", "기록", "비밀", "야동", "선물", "사생활", "보안", "숨기기", "남기지않기", "히든", "인코그니토", "기록안남기기", "몰컴"],
    tags_en: ["private", "incognito", "security", "hide", "no history", "hidden", "secret", "privacy"],
    steps: ["단축키를 눌러 새 시크릿 창을 엽니다.", "이제 방문 기록, 쿠키, 사이트 데이터가 기기에 저장되지 않습니다.", "학교, 회사, 인터넷 서비스 제공업체(ISP)는 사용자의 활동을 여전히 볼 수 있으니 주의하세요.", "다운로드한 파일이나 북마크는 유지되니 안심하세요."],
    steps_en: ["Use the shortcut to open a new Incognito window.", "Browsing history, cookies, and site data won't be saved on this device.", "Note: Your school, employer, or ISP might still see your activity.", "Downloaded files and bookmarks are still kept."]
  },
  {
    id: 9, category: "탭/창",
    title: "탭 그룹화",
    title_en: "Group Tabs",
    desc: "열려 있는 탭이 많을 때, 주제별로 그룹을 만들어 깔끔하게 정리합니다.",
    desc_en: "Organize multiple tabs with colors and names to manage them together.",
    shortcut: { win: "탭 우클릭 > 탭을 새 그룹에 추가", mac: "탭 우클릭 > 탭을 새 그룹에 추가" },
    shortcut_en: { win: "Right-click tab > Add tab to new group", mac: "Right-click tab > Add tab to new group" },
    tags: ["정리", "그룹", "지저분", "복잡", "모으기", "묶기", "정렬", "폴더", "정리정돈", "깔끔하게", "뭉치기"],
    tags_en: ["organize", "group", "messy", "complex", "gather", "clean", "folder", "sort", "tab group"],
    steps: ["그룹화할 탭 하나 또는 여러 개(Ctrl 누른 채 클릭)를 선택하세요.", "선택한 탭 위에서 마우스 우클릭을 하세요.", "'탭을 새 그룹에 추가'를 클릭하세요.", "그룹의 이름과 색상을 지정하여 관리하세요."],
    steps_en: ["Select one or more tabs (Ctrl+Click to select multiples).", "Right-click on the selected tab(s).", "Select 'Add tab to new group'.", "Assign a name and color to the group."]
  },
  {
    id: 10, category: "탭/창",
    title: "현재 탭 음소거",
    title_en: "Mute Current Tab",
    desc: "탭에서 갑자기 소리가 날 때, 다른 탭에 영향을 주지 않고 해당 탭만 음소거할 수 있습니다.",
    desc_en: "Quickly mutes the sound coming from a tab.",
    shortcut: { win: "탭 우클릭 > 사이트 음소거", mac: "탭 우클릭 > 사이트 음소거" },
    shortcut_en: { win: "Right-click tab > Mute site", mac: "Right-click tab > Mute site" },
    tags: ["소리", "시끄러워", "광고", "음소거", "뮤트", "끄기", "조용히", "소리끄기", "조용", "미디어제어"],
    tags_en: ["sound", "noisy", "ad", "mute", "volume", "off", "quiet", "speaker", "no sound", "silent", "media control"],
    steps: ["소리가 나는 탭을 마우스 우클릭 하세요.", "'사이트 음소거'를 클릭하세요.", "다시 소리를 켜려면 같은 방법으로 '사이트 음소거 해제'를 누르세요."],
    steps_en: ["Right-click the tab that is making sound.", "Select 'Mute site'.", "To unmute, follow the same steps and select 'Unmute site'."]
  },
  {
    id: 84, category: "탭/창",
    title: "열려있는 탭 검색하기",
    title_en: "Search Open Tabs",
    desc: "열려 있는 탭이 너무 많을 때, 키워드 검색으로 원하는 탭을 빠르게 찾을 수 있습니다.",
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
    desc: "페이지 내용이 길 때, 스크롤 없이 페이지의 최상단이나 최하단으로 즉시 이동합니다.",
    desc_en: "Go to the beginning or end of the page without scrolling.",
    shortcut: { win: "Home / End", mac: "Cmd + ↑ / Cmd + ↓" },
    tags: ["맨위", "맨아래", "스크롤", "끝", "처음", "끝으로", "시작으로", "가장위", "가장아래"],
    tags_en: ["top", "bottom", "scroll", "end", "beginning", "up", "down", "home", "end", "page top", "page bottom"]
  },
  {
    id: 12, category: "탐색",
    title: "한 화면씩 스크롤",
    title_en: "Scroll by Screen",
    desc: "긴 문서를 읽을 때, 화면 단위로 페이지를 넘기며 편하게 읽을 수 있습니다.",
    desc_en: "Smoothly scrolls the page one screen at a time.",
    shortcut: { win: "Space / Shift + Space", mac: "Space / Shift + Space" },
    tags: ["스크롤", "내리기", "올리기", "페이지", "단위", "화면단위", "한칸씩", "스페이스"],
    tags_en: ["scroll", "page down", "page up", "space", "unit", "screen unit", "pagedown", "pageup"]
  },
  {
    id: 13, category: "탐색",
    title: "앞으로 / 뒤로 이동",
    title_en: "Go Forward / Back",
    desc: "이전에 방문했던 페이지나 다음 페이지로 빠르게 이동하고 싶을 때 사용합니다.",
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
    desc: "페이지 내용이 최신이 아니거나 오류가 있을 때, 현재 페이지를 다시 불러옵니다.",
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
    desc: "서버의 변경 사항이 반영되지 않을 때, 브라우저 캐시를 무시하고 페이지를 완전히 새로 고칩니다.",
    desc_en: "Useful when site updates aren't appearing on your screen. Completely reloads the page, ignoring the cache.",
    shortcut: { win: "Ctrl + Shift + R", mac: "Cmd + Shift + R" },
    tags: ["캐시", "강력", "새로고침", "안바뀌어", "완전", "클린", "캐시무시", "지우고새로고침", "포스리로드"],
    tags_en: ["cache", "hard refresh", "force reload", "not changing", "complete", "clean", "clean reload", "hard", "ignore cache"]
  },
  {
    id: 16, category: "탐색",
    title: "주소창으로 바로 이동",
    title_en: "Jump to Address Bar",
    desc: "마우스를 사용하지 않고 즉시 새로운 주소를 입력하거나 검색하고 싶을 때 사용합니다.",
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
    desc: "현재 페이지 내에서 특정 단어나 문장을 빠르게 찾고 싶을 때 사용합니다.",
    desc_en: "Quickly finds a specific word on the current page.",
    shortcut: { win: "Ctrl + F", mac: "Cmd + F" },
    tags: ["찾기", "검색", "단어", "하이라이트", "문구", "텍스트찾기", "텍스트", "찾아내기", "검색어", "찾어"],
    tags_en: ["find", "search", "word", "highlight", "phrase", "find text", "ctrlf", "cmdf", "text"]
  },
  {
    id: 18, category: "탐색",
    title: "링크를 새 탭에서 열기",
    title_en: "Open Link in New Tab",
    desc: "현재 페이지를 유지하면서 특정 링크의 내용을 새로운 탭에 미리 열어두고 싶을 때 사용합니다.",
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
    desc: "현재 창과 별개로 특정 링크를 새로운 창에서 열어 비교하며 보고 싶을 때 사용합니다.",
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
    desc: "브라우저의 메뉴바 등을 숨기고 웹페이지 화면만 꽉 차게 보고 싶을 때 사용합니다.",
    desc_en: "Switches the browser to full-screen mode.",
    shortcut: { win: "F11", mac: "Cmd + Ctrl + F" },
    tags: ["전체화면", "풀스크린", "숨기기", "최대화", "꽉찬화면", "집중모드", "영화모드", "큰화면"],
    tags_en: ["fullscreen", "full screen", "hide", "maximize", "movie mode", "focus mode", "big screen"]
  },
  {
    id: 85, category: "탐색",
    title: "페이지 정보 및 보안 확인",
    title_en: "Check Page Info & Security",
    desc: "접속 중인 사이트의 보안 상태와 권한 설정 등을 확인하고 싶을 때 사용합니다.",
    desc_en: "Click the lock icon in the address bar to check the site's security status, certificate, and permissions.",
    shortcut: { win: "주소창 자물쇠 아이콘 클릭", mac: "주소창 자물쇠 아이콘 클릭" },
    shortcut_en: { win: "Click lock icon in address bar", mac: "Click lock icon in address bar" },
    tags: ["보안", "자물쇠", "https", "인증서", "권한", "안전"],
    tags_en: ["security", "lock", "https", "certificate", "permissions", "safe", "lock icon", "site info"]
  },
  {
    id: 87, category: "화면",
    title: "동영상 PIP (유튜브 등)",
    title_en: "Video PIP (Youtube, etc.)",
    desc: "다른 작업을 하면서 동영상을 계속 시청하고 싶을 때, 화면 구석에 작은 플로팅 창으로 띄워줍니다.",
    desc_en: "Watch video in a floating window. Note: YouTube requires two right-clicks!",
    shortcut: { win: "우클릭 두 번 (유튜브) / 미디어 제어 아이콘", mac: "우클릭 두 번 (유튜브) / 미디어 제어 아이콘" },
    shortcut_en: { win: "Right-click twice (YouTube) / Media icon", mac: "Right-click twice (YouTube) / Media icon" },
    tags: ["동영상", "팝업", "멀티태스킹", "작은화면", "영상보기", "유튜브", "도구", "플로팅"],
    tags_en: ["pip", "picture in picture", "video", "popup", "multitasking", "small screen", "watch video", "youtube", "tool", "floating"],
    steps: ["유튜브: 영상 위에서 우클릭을 두 번 해서 브라우저 메뉴를 여세요.", "기타 사이트: 주소창 우측의 '미디어 제어(음표 모양)' 아이콘을 눌러 PIP를 켤 수도 있습니다.", "'PIP 모드'를 선택하면 화면 구석에 작은 창이 생깁니다."],
    steps_en: ["YouTube: Right-click twice on the video to see the browser's context menu.", "Other sites: You can also use the 'Media Control' icon (music note) next to the address bar.", "Select 'Picture in picture' to create a small floating window."]
  },
  // ── 화면 ──────────────────────────────────────
  {
    id: 21, category: "화면",
    title: "페이지 확대 / 축소",
    title_en: "Zoom In / Out",
    desc: "페이지의 글자나 이미지가 너무 작거나 커서 보기 불편할 때, 화면 크기를 조절할 수 있습니다.",
    desc_en: "Zoom in on the screen when the text is too small.",
    shortcut: { win: "Ctrl + + / Ctrl + -", mac: "Cmd + + / Cmd + -" },
    tags: ["확대", "축소", "글씨", "작아", "잘안보여", "치우기", "크게", "작게", "보기", "노안", "돋보기", "보이게"],
    tags_en: ["zoom", "zoom in", "zoom out", "text", "small", "can't see", "bigger", "smaller", "size", "font size", "view", "magnify", "scale"]
  },
  {
    id: 22, category: "화면",
    title: "줌 초기화",
    title_en: "Reset Zoom",
    desc: "확대 또는 축소된 화면 비율을 기본 크기(100%)로 즉시 되돌리고 싶을 때 사용합니다.",
    desc_en: "Resets the zoom level to the default 100%.",
    shortcut: { win: "Ctrl + 0", mac: "Cmd + 0" },
    tags: ["초기화", "원래대로", "줌", "100", "정상", "기본", "100퍼센트", "원상복구", "되돌리기"],
    tags_en: ["reset", "default", "zoom", "100%", "reset zoom", "normal", "back to normal"]
  },
  {
    id: 23, category: "화면",
    title: "읽기 모드 (사이드 패널)",
    title_en: "Reading Mode (Side Panel)",
    desc: "주변 광고나 복잡한 레이아웃을 제외하고 본문 텍스트에만 집중하여 읽고 싶을 때 사용합니다.",
    desc_en: "Removes ads and unnecessary layouts for a comfortable reading experience.",
    shortcut: { win: "도구 더보기 > 읽기 모드", mac: "도구 더보기 > 읽기 모드" },
    shortcut_en: { win: "More tools > Reading mode", mac: "More tools > Reading mode" },
    tags: ["읽기", "광고제거", "깔끔", "집중", "클린", "리더", "글자만", "포커스", "글보기", "기사보기", "사이드패널"],
    tags_en: ["read", "remove ads", "clean", "focus", "reader", "reading mode", "text only", "readability", "side panel"],
    steps: ["기사나 블로그 등 텍스트가 많은 페이지에서 실행하세요.", "우측 상단 '더보기(⋮)' > '도구 더보기' > '읽기 모드'를 선택하세요.", "사이드바에 본문만 깔끔하게 추출되어 나타납니다.", "글꼴 크기, 배경색, 줄 간격 등을 취향껏 조절해 보세요."],
    steps_en: ["Open a page with lots of text like an article or blog.", "Go to 'More(⋮)' > 'More Tools' > 'Reading Mode'.", "The text will appear cleanly extracted in the sidebar.", "Adjust font size, background color, and line spacing to your liking."]
  },
  // ── 북마크 ────────────────────────────────────
  {
    id: 24, category: "북마크",
    title: "현재 페이지 북마크 추가",
    title_en: "Bookmark Current Page",
    desc: "나중에 다시 방문하고 싶은 페이지를 북마크에 저장하여 쉽게 찾아볼 수 있습니다.",
    desc_en: "Save the current page to your bookmarks.",
    shortcut: { win: "Ctrl + D", mac: "Cmd + D" },
    tags: ["북마크", "즐겨찾기", "저장", "별", "저장하기", "찜", "기억", "나중에보기", "북마클", "즐겨찾기추가"],
    tags_en: ["bookmark", "favorite", "save", "star", "add bookmark", "remember", "read later", "add fav"]
  },
  {
    id: 25, category: "북마크",
    title: "모든 탭 한꺼번에 북마크",
    title_en: "Bookmark All Tabs",
    desc: "현재 열려 있는 모든 탭을 하나의 폴더에 한꺼번에 북마크로 저장하고 싶을 때 사용합니다.",
    desc_en: "Saves all open tabs into a single folder.",
    shortcut: { win: "Ctrl + Shift + D", mac: "Cmd + Shift + D" },
    tags: ["전체북마크", "다저장", "탭저장", "폴더저장", "일괄저장", "전체저장", "모두저장", "탭백업", "몽땅저장"],
    tags_en: ["bookmark all", "save all tabs", "tab save", "all tabs", "folder save", "batch save", "save all", "tab backup", "backup", "all favorites"]
  },
  {
    id: 26, category: "북마크",
    title: "북마크 바 보이기/숨기기",
    title_en: "Show/Hide Bookmarks Bar",
    desc: "자주 방문하는 사이트에 빠르게 접속하거나, 화면을 넓게 쓰기 위해 북마크 바를 켜고 끌 수 있습니다.",
    desc_en: "Toggles the visibility of the bookmarks bar below the address bar.",
    shortcut: { win: "Ctrl + Shift + B", mac: "Cmd + Shift + B" },
    tags: ["북마크바", "즐겨찾기바", "보이기", "숨기기", "메뉴바", "바", "토글", "즐찾바", "막대", "툴바"],
    tags_en: ["bookmark bar", "favorites bar", "show", "hide", "menu bar", "bar", "toggle", "toolbar", "show bookmark bar"]
  },
  {
    id: 27, category: "북마크",
    title: "방문 기록 보기",
    title_en: "View Browsing History",
    desc: "이전에 방문했던 웹사이트 목록을 확인하거나 특정 방문 기록을 찾고 싶을 때 사용합니다.",
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
    desc: "브라우저를 통해 내려받은 파일들의 목록을 확인하고 관리하고 싶을 때 사용합니다.",
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
    desc: "저장된 북마크들을 검색, 수정하거나 폴더별로 정리하고 싶을 때 사용합니다.",
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
    desc: "페이지 내의 모든 텍스트나 요소를 한꺼번에 선택하여 복사하고 싶을 때 사용합니다.",
    desc_en: "Selects all text on the page.",
    shortcut: { win: "Ctrl + A", mac: "Cmd + A" },
    tags: ["전체", "선택", "복사", "몽땅", "모두", "전부", "다하기", "전부다"],
    tags_en: ["select all", "all", "copy", "ctrl a", "cmd a", "every", "selectall"]
  },
  {
    id: 30, category: "편집",
    title: "복사 / 붙여넣기",
    title_en: "Copy / Paste",
    desc: "텍스트나 이미지를 복사하여 다른 곳으로 간편하게 옮길 수 있습니다.",
    desc_en: "Copies and pastes text or images.",
    shortcut: { win: "Ctrl + C / Ctrl + V", mac: "Cmd + C / Cmd + V" },
    tags: ["복사", "붙여넣기", "카피", "복붙", "담기", "카피앤페이스트", "클립보드", "글복사", "담아두기"],
    tags_en: ["copy", "paste", "copy paste", "ctrl c", "ctrl v", "cmd c", "cmd v", "duplicate", "clipboard"]
  },
  {
    id: 31, category: "편집",
    title: "서식 없이 붙여넣기",
    title_en: "Paste without Formatting",
    desc: "복사한 텍스트의 원래 서식을 무시하고 글자 내용만 깔끔하게 붙여넣고 싶을 때 사용합니다.",
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
    desc: "입력 실수나 잘못된 작업을 이전 상태로 되돌리거나, 취소한 작업을 다시 실행합니다.",
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
    desc: "웹페이지의 HTML, CSS 코드를 분석하거나 자바스크립트 오류를 디버깅할 때 사용합니다.",
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
    desc: "웹페이지의 특정 요소가 어떤 코드로 이루어져 있는지 즉시 확인하고 싶을 때 사용합니다.",
    desc_en: "Instantly inspect the HTML of the element you hover over.",
    shortcut: { win: "Ctrl + Shift + C", mac: "Cmd + Shift + C" },
    tags: ["요소", "검사", "HTML", "CSS", "선택", "코드확인", "콕찍기", "피커", "클릭검사"],
    tags_en: ["element", "inspect", "HTML", "CSS", "pick", "select", "check code", "selector", "picker"],
    steps: ["F12(또는 Cmd + Option + I)를 눌러 개발자 도구를 먼저 여세요.", "단축키를 눌러 요소 선택 모드를 활성화합니다.", "확인하고 싶은 화면 요소를 마우스로 클릭하면 해당 HTML 코드로 즉시 이동합니다."],
    steps_en: ["Press F12 (or Cmd + Option + I) to open Developer Tools first.", "Press the shortcut to activate element selection mode.", "Click on a screen element to jump directly to its HTML code."]
  },
  {
    id: 35, category: "개발자",
    title: "자바스크립트 콘솔",
    title_en: "JavaScript Console",
    desc: "자바스크립트 코드를 직접 실행하거나 브라우저의 로그 메시지를 확인하고 싶을 때 사용합니다.",
    desc_en: "Go directly to the Console tab to execute JavaScript.",
    shortcut: { win: "Ctrl + Shift + J", mac: "Cmd + Option + J" },
    tags: ["콘솔", "JS", "자바스크립트", "스크립트", "로그", "명령어", "코딩", "터미널", "자바", "js콘솔"],
    tags_en: ["console", "JS", "javascript", "script", "log", "command", "coding", "terminal", "js console", "console log"],
    steps: ["F12(또는 Cmd + Option + I)를 눌러 개발자 도구를 먼저 여세요.", "단축키를 눌러 Console 탭으로 즉시 이동합니다.", "입력창에 자바스크립트 코드를 입력하고 엔터를 눌러 실행하세요."],
    steps_en: ["Press F12 (or Cmd + Option + I) to open Developer Tools first.", "Press the shortcut to jump to the Console tab immediately.", "Type your JavaScript code in the input and press Enter to execute."]
  },
  {
    id: 36, category: "개발자",
    title: "페이지 소스 보기",
    title_en: "View Page Source",
    desc: "현재 페이지의 전체 HTML 소스 코드를 별도의 탭에서 확인하고 싶을 때 사용합니다.",
    desc_en: "View the full HTML source code of the current page.",
    shortcut: { win: "Ctrl + U", mac: "Cmd + Option + U" },
    tags: ["소스", "HTML", "코드", "뷰소스", "원문", "코딩보기", "원본보기", "프로그래밍"],
    tags_en: ["source", "HTML", "code", "view source", "source code", "page source", "ctrl u", "programming", "raw data"]
  },
  {
    id: 37, category: "개발자",
    title: "네트워크 요청 확인",
    title_en: "Monitor Network Requests",
    desc: "웹페이지에서 발생하는 모든 네트워크 통신 상태와 데이터 전송 속도를 확인합니다.",
    desc_en: "Monitor the network requests made by the page.",
    shortcut: { win: "F12 > Network 탭 선택", mac: "Cmd + Option + I > Network 탭 선택" },
    shortcut_en: { win: "F12 > Select Network tab", mac: "Cmd + Option + I > Select Network tab" },
    tags: ["네트워크", "요청", "API", "느려", "통신", "트래픽", "패킷", "데이터", "속도", "응답", "api요청"],
    tags_en: ["network", "request", "API", "slow", "communication", "traffic", "packet", "data", "speed", "response", "api request"],
    steps: ["F12(또는 Cmd + Option + I)를 눌러 개발자 도구를 먼저 여세요.", "상단 탭에서 'Network'를 선택하세요.", "페이지를 새로고침(F5)하면 발생하는 모든 통신 목록을 확인할 수 있습니다."],
    steps_en: ["Press F12 (or Cmd + Option + I) to open Developer Tools first.", "Select the 'Network' tab from the top.", "Reload the page (F5) to see a list of all network communications."]
  },
  // ── 설정 ──────────────────────────────────────
  {
    id: 38, category: "설정",
    title: "크롬 설정 열기",
    title_en: "Open Chrome Settings",
    desc: "브라우저의 전반적인 설정을 변경하거나 사용자 맞춤 기능을 조절하고 싶을 때 사용합니다.",
    desc_en: "Navigates to the main Chrome settings page.",
    shortcut: { win: "chrome://settings 입력", mac: "Cmd + , (쉼표)" },
    shortcut_en: { win: "Type chrome://settings", mac: "Cmd + , (comma)" },
    link: "chrome://settings",
    tags: ["설정", "세팅", "옵션", "환경설정", "구성", "셋팅", "제어판", "관리", "크롬설정", "설정창", "환경"],
    tags_en: ["settings", "option", "configuration", "config", "chrome settings", "control panel", "manage"]
  },
  {
    id: 39, category: "설정",
    title: "메모리 절약 모드",
    title_en: "Memory Saver Mode",
    desc: "사용하지 않는 탭의 메모리를 회수하여 브라우저 속도를 높여줍니다.",
    desc_en: "Frees up memory from inactive tabs to improve speed.",
    shortcut: { win: "설정 > 성능 > 메모리 절약", mac: "설정 > 성능 > 메모리 절약" },
    shortcut_en: { win: "Settings > Performance > Memory Saver", mac: "Settings > Performance > Memory Saver" },
    link: "chrome://settings/performance",
    tags: ["렉", "느려", "버벅", "무거워", "성능", "최적화", "램", "렉걸려", "빨리", "탭잠자기", "배터리", "메모리부족"],
    tags_en: ["lag", "slow", "performance", "optimization", "RAM", "speed", "memory", "saver", "fast", "tab sleep", "battery", "low memory"],
    steps: ["설정 페이지(chrome://settings/performance)로 이동합니다.", "'성능' 카테고리에서 '메모리 절약' 스위치를 켭니다.", "이제 활성 상태가 아닌 탭의 메모리를 확보해 크롬이 더 빨라집니다.", "특정 사이트는 항상 활성 상태로 유지하도록 예외를 설정할 수도 있습니다."],
    steps_en: ["Go to the Settings page (chrome://settings/performance).", "Toggle on the 'Memory Saver' switch in the 'Performance' category.", "Chrome will now free up memory from inactive tabs to run faster.", "You can also add exception sites to always keep them active."]
  },
  {
    id: 40, category: "설정",
    title: "크롬 비밀번호 관리자",
    title_en: "Chrome Password Manager",
    desc: "각 사이트별로 저장된 아이디와 비밀번호를 확인하고 안전하게 관리할 수 있습니다.",
    desc_en: "Manage your saved passwords at a glance.",
    shortcut: { win: "설정 > 비밀번호", mac: "설정 > 비밀번호" },
    shortcut_en: { win: "Settings > Passwords", mac: "Settings > Passwords" },
    link: "chrome://password-manager",
    tags: ["비번", "암호", "로그인", "자동완성", "계정", "로그인 정보", "패스워드", "비밀번호", "키체인", "저장된비번"],
    tags_en: ["password", "login", "autocomplete", "account", "manager", "login info", "keychain", "saved password", "pass"]
  },
  {
    id: 41, category: "설정",
    title: "크롬 작업 관리자",
    title_en: "Chrome Task Manager",
    desc: "메모리나 CPU를 많이 사용하는 탭을 찾아 종료하여 브라우저의 성능을 개선할 수 있습니다.",
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
    desc: "설치된 확장 프로그램들을 확인하고 필요에 따라 켜거나 끌 수 있습니다.",
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
    desc: "현재 웹페이지를 종이로 인쇄하거나 PDF 파일로 변환하여 저장할 수 있습니다.",
    desc_en: "Print the current page or save it as a PDF.",
    shortcut: { win: "Ctrl + P", mac: "Cmd + P" },
    tags: ["인쇄", "PDF", "저장", "프린트", "뽑기", "종이", "피디에프", "프린터", "출력", "인쇄하기", "내보내기"],
    tags_en: ["print", "PDF", "save", "paper", "save as pdf", "printer", "output", "export"]
  },
  {
    id: 44, category: "설정",
    title: "페이지를 파일로 저장",
    title_en: "Save Page As",
    desc: "현재 페이지의 내용을 오프라인에서도 볼 수 있도록 HTML 파일로 저장합니다.",
    desc_en: "Saves the current page as an HTML file on your PC.",
    shortcut: { win: "Ctrl + S", mac: "Cmd + S" },
    tags: ["저장", "다운로드", "HTML", "파일", "내려받기", "다운", "페이지저장", "문서저장", "백업", "다운받기"],
    tags_en: ["save", "download", "HTML", "file", "page save", "ctrl s", "save as", "backup"]
  },
  {
    id: 45, category: "설정",
    title: "크롬 캐시·쿠키 삭제",
    title_en: "Clear Chrome Cache & Cookies",
    desc: "브라우저 오류를 해결하거나 개인정보를 보호하기 위해 방문 기록, 쿠키, 캐시를 삭제합니다.",
    desc_en: "Clear browsing data to resolve errors and protect privacy. (Note: You will be logged out of most sites)",
    shortcut: { win: "Ctrl + Shift + Delete", mac: "Cmd + Shift + Backspace" },
    link: "chrome://settings/clearBrowserData",
    tags: ["캐시", "쿠키", "삭제", "초기화", "오류", "느려", "지우기", "탈퇴", "삭제하기", "인터넷 기록 삭제", "방문기록 삭제", "클리어", "포맷"],
    tags_en: ["cache", "cookie", "delete", "clear", "error", "slow", "clear cache", "cleaning", "clear browsing data", "format"],
    steps: {
      win: ["단축키 Ctrl + Shift + Delete를 누르세요.", "모든 사이트에서 로그아웃되므로 중요한 작업은 저장 후 진행하세요.", "기간을 '전체 기간'으로 선택하세요.", "'쿠키 및 기타 사이트 데이터', '캐시된 이미지 및 파일'을 체크하고 [데이터 삭제]를 누릅니다."],
      mac: ["단축키 Cmd + Shift + Backspace를 누르세요.", "모든 사이트에서 로그아웃되므로 중요한 작업은 저장 후 진행하세요.", "기간을 '전체 기간'으로 선택하세요.", "'쿠키 및 기타 사이트 데이터', '캐시된 이미지 및 파일'을 체크하고 [데이터 삭제]를 누릅니다."]
    },
    steps_en: {
      win: ["Press Ctrl + Shift + Delete.", "Be careful: You will be logged out of most websites.", "Select 'All time' as the time range.", "Check 'Cookies' and 'Cache', then click [Clear data]."],
      mac: ["Press Cmd + Shift + Backspace.", "Be careful: You will be logged out of most websites.", "Select 'All time' as the time range.", "Check 'Cookies' and 'Cache', then click [Clear data]."]
    }
  },
  // ── 이스터에그 ────────────────────────────────
  {
    id: 46, category: "이스터에그",
    title: "전설의 공룡 게임 (Dino)",
    title_en: "Legendary Dino Game",
    desc: "인터넷 연결이 끊겼을 때나 간단한 게임을 즐기고 싶을 때 실행할 수 있습니다.",
    desc_en: "The game that appears when the internet is down! You can also run it by typing directly in the address bar.",
    shortcut: { win: "chrome://dino 입력", mac: "chrome://dino 입력" },
    shortcut_en: { win: "Type chrome://dino", mac: "Type chrome://dino" },
    link: "chrome://dino",
    tags: ["공룡", "게임", "심심해", "오프라인", "점프", "런닝", "공룡게임", "인터넷끊김", "크롬게임"],
    tags_en: ["dino", "game", "bored", "offline", "dinosaur", "jump", "running", "t-rex", "chrome game", "run", "jump game"]
  },
  {
    id: 47, category: "이스터에그",
    title: "공룡 게임 무적 치트키",
    title_en: "Dino Game Invincibility Cheat",
    desc: "공룡 게임에서 장애물에 부딪혀도 게임이 끝나지 않도록 설정하여 높은 점수를 얻을 수 있습니다.",
    desc_en: "Makes the dinosaur pass through obstacles. To revert, simply press F5 (Reload).",
    shortcut: { win: "Runner.prototype.gameOver = function(){}", mac: "Runner.prototype.gameOver = function(){}" },
    tags: ["공룡", "치트", "무적", "해킹", "점수", "짱", "일등", "치트키", "무적모드", "코드", "공룡치트"],
    tags_en: ["dino", "cheat", "invincible", "hack", "score", "god mode", "code", "console cheat"],
    steps: ["F12(또는 Cmd + Option + I)를 눌러 개발자 도구를 먼저 여세요.", "chrome://dino 접속 후 'Console' 탭에 코드를 입력하세요.", "무적을 해제하고 원래대로 돌리려면 F5키를 눌러 페이지를 새로고침하면 됩니다."],
    steps_en: ["First, open Developer Tools by pressing F12 (or Cmd + Option + I).", "Go to chrome://dino and enter the code in 'Console'.", "To disable the cheat and go back to normal, press F5 to reload the page."]
  },
  {
    id: 48, category: "이스터에그",
    title: "구글 화면 360도 회전",
    title_en: "Google 360-Degree Spin",
    desc: "구글 검색 결과 화면이 360도 회전하는 재미있는 효과를 볼 수 있습니다.",
    desc_en: "Type this in the Google search bar and the screen will do a barrel roll.",
    shortcut: { win: "구글 검색창(google.com)에 'do a barrel roll' 검색", mac: "구글 검색창(google.com)에 'do a barrel roll' 검색" },
    shortcut_en: { win: "Search 'do a barrel roll' on Google", mac: "Search 'do a barrel roll' on Google" },
    tags: ["회전", "돌아", "신기", "배럴롤", "빙글", "360", "구르기", "한바퀴", "돌리기", "빙글빙글"],
    tags_en: ["rotation", "spin", "amazing", "barrel roll", "rotate", "360", "roll", "do a barrel roll"]
  },
  {
    id: 49, category: "이스터에그",
    title: "기우뚱한 구글 화면",
    title_en: "Tilted Google Screen",
    desc: "구글 검색 결과 화면이 오른쪽으로 약간 기울어지는 효과를 볼 수 있습니다.",
    desc_en: "The screen will tilt slightly to the right.",
    shortcut: { win: "구글 검색창(google.com)에 'askew' 검색", mac: "구글 검색창(google.com)에 'askew' 검색" },
    shortcut_en: { win: "Search 'askew' on Google", mac: "Search 'askew' on Google" },
    tags: ["기울기", "삐딱", "이상해", "비뚤", "기우뚱", "사선", "삐딱하게", "기울어짐", "기울"],
    tags_en: ["tilt", "askew", "slanted", "crooked", "skew"]
  },
  {
    id: 50, category: "이스터에그",
    title: "깜빡이는 검색 결과",
    title_en: "Blinking Search Results",
    desc: "검색 결과 중 특정 단어들이 화면에서 깜빡거리는 효과를 확인할 수 있습니다.",
    desc_en: "Certain words in the search results will actually blink.",
    shortcut: { win: "구글 검색창(google.com)에 'blink html' 검색", mac: "구글 검색창(google.com)에 'blink html' 검색" },
    shortcut_en: { win: "Search 'blink html' on Google", mac: "Search 'blink html' on Google" },
    tags: ["깜빡", "반짝", "태그", "깜빡깜빡", "반짝반짝", "깜박", "블링크"],
    tags_en: ["blink", "twinkle", "tag", "light", "flash", "html blink", "shining"]
  },
  {
    id: 51, category: "이스터에그",
    title: "1998년의 구글",
    title_en: "Google in 1998",
    desc: "구글 서비스 초창기인 1998년 당시의 웹사이트 디자인을 확인할 수 있습니다.",
    desc_en: "See the retro design of Google from when it was first created.",
    shortcut: { win: "구글 검색창(google.com)에 'google in 1998' 검색", mac: "구글 검색창(google.com)에 'google in 1998' 검색" },
    shortcut_en: { win: "Search 'google in 1998' on Google", mac: "Search 'google in 1998' on Google" },
    tags: ["레트로", "과거", "옛날", "추억", "1998", "구글역사", "처음", "탄생", "초기", "초창기", "레트로구글"],
    tags_en: ["retro", "past", "old", "memory", "google in 1998", "vintage", "classic"]
  },
  {
    id: 52, category: "이스터에그",
    title: "무한 반복 질문 (재귀)",
    title_en: "Infinite Loop Question (Recursion)",
    desc: "구글이 검색어 제안을 통해 동일한 질문을 반복하게 만드는 재미있는 효과를 볼 수 있습니다.",
    desc_en: "Fall into a recursive loop where Google keeps asking the same question.",
    shortcut: { win: "구글 검색창(google.com)에 'recursion' 검색", mac: "구글 검색창(google.com)에 'recursion' 검색" },
    shortcut_en: { win: "Search 'recursion' on Google", mac: "Search 'recursion' on Google" },
    tags: ["재귀", "반복", "무한", "도돌이표", "무한반복", "되풀이", "구글재귀", "늪", "끝나지않는"],
    tags_en: ["recursion", "repeat", "infinite", "loop", "endless", "recursion loop"]
  },
  {
    id: 53, category: "이스터에그",
    title: "화면을 굴리는 '괴혼'",
    title_en: "Roll the Screen with 'Katamari'",
    desc: "구글 검색 결과 화면의 텍스트와 이미지를 공으로 뭉쳐서 굴리는 게임을 즐길 수 있습니다.",
    desc_en: "Click the Katamari ball icon in the search result's info card, then use the arrow keys to roll up the text!",
    shortcut: { win: "구글 검색창(google.com)에 'katamari' 검색 > 아이콘 클릭", mac: "구글 검색창(google.com)에 'katamari' 검색 > 아이콘 클릭" },
    shortcut_en: { win: "Search 'katamari' on Google > Click icon", mac: "Search 'katamari' on Google > Click icon" },
    tags: ["괴혼", "뭉치기", "굴리기", "게임", "카타마리", "블록", "굴려", "글자뭉치기", "공굴리기"],
    tags_en: ["katamari", "roll up", "roll", "game", "ball", "rolling", "katamari damacy"],
    steps: ["구글 검색창(google.com)에서 'katamari'를 검색하세요. (주소창이 아닌 검색창에 입력해야 합니다)", "상단/우측의 정보 카드에 있는 '괴혼 공' 아이콘을 클릭하세요.", "화면에 나타난 공을 키보드 방향키로 움직여 보세요.", "검색 결과에 있는 글자와 이미지들을 공으로 뭉쳐서 굴릴 수 있습니다!"],
    steps_en: ["Search for 'katamari' in the Google search box (not the address bar).", "Click the 'Katamari ball' icon in the info card.", "Use the arrow keys to move the ball on the screen.", "Roll over text and images to stick them to your ball!"]
  },
  {
    id: 54, category: "이스터에그",
    title: "화면에 남는 강아지 발자국",
    title_en: "Puppy Paws on Screen",
    desc: "구글 검색 화면을 클릭할 때마다 귀여운 강아지 발자국이 남는 효과를 즐길 수 있습니다.",
    desc_en: "Press the paw icon in the search result's info card and click on the screen. Cute paw prints will appear.",
    shortcut: { win: "구글 검색창(google.com)에 '강아지' 검색 > 발바닥 클릭", mac: "구글 검색창(google.com)에 '강아지' 검색 > 발바닥 클릭" },
    shortcut_en: { win: "Search 'dog' on Google > Click paw", mac: "Search 'dog' on Google > Click paw" },
    tags: ["강아지", "개", "발자국", "귀여워", "동물", "멍멍", "개소리", "멍멍이", "댕댕이", "도그", "애견", "왈왈"],
    tags_en: ["dog", "puppy", "paw print", "cute", "animal", "bark"]
  },
  {
    id: 55, category: "이스터에그",
    title: "화면에 남는 고양이 발자국",
    title_en: "Kitty Paws on Screen",
    desc: "구글 검색 화면을 클릭할 때마다 고양이 손이 나타나 발자국을 남기는 효과를 볼 수 있습니다.",
    desc_en: "Press the cat paw icon in the info card, and each click will make a meow sound and leave a paw print.",
    shortcut: { win: "구글 검색창(google.com)에 '고양이' 검색 > 발바닥 클릭", mac: "구글 검색창(google.com)에 '고양이' 검색 > 발바닥 클릭" },
    shortcut_en: { win: "Search 'cat' on Google > Click paw", mac: "Search 'cat' on Google > Click paw" },
    tags: ["고양이", "냥이", "발자국", "귀여워", "야옹", "발바닥", "묘", "냐옹", "미야오", "나비", "애묘", "캣"],
    tags_en: ["cat", "kitty", "paw print", "cute", "meow", "paw"],
    steps: ["구글 검색창(google.com)에서 '고양이'(또는 'cat')를 검색하세요. (주소창이 아닌 검색창에 입력해야 합니다)", "정보 카드에 있는 주황색 고양이 발바닥 버튼을 클릭하세요.", "이제 화면 어디든 클릭해 보세요. 귀여운 고양이 손이 나타나 발자국을 남깁니다.", "화면 하단의 [X]를 누르거나 ESC 키를 누르면 원래대로 돌아옵니다."],
    steps_en: ["Search for 'cat' in the Google search box (not the address bar).", "Click the orange paw print button in the info card.", "Now click anywhere on the screen for a cute meow and a paw print.", "Press [X] at the bottom or the ESC key to clear the screen."]
  },
  {
    id: 56, category: "이스터에그",
    title: "삶의 우주, 그리고 모든 것",
    title_en: "The Answer to Life, the Universe, and Everything",
    desc: "특정 문구를 검색하여 소설 속에서 유래한 삶과 우주에 대한 답변을 확인할 수 있습니다.",
    desc_en: "The Google calculator will give you the answer to the ultimate question.",
    shortcut: { win: "구글 검색창(google.com)에 'the answer to life...' 검색", mac: "구글 검색창(google.com)에 'the answer to life...' 검색" },
    shortcut_en: { win: "Search 'the answer to life...' on Google", mac: "Search 'the answer to life...' on Google" },
    tags: ["우주", "답", "42", "계산기", "궁극", "은하수", "더글러스", "히치하이커", "42의비밀"],
    tags_en: ["universe", "answer", "42", "calculator", "ultimate", "galaxy", "douglas adams", "hitchhiker", "life", "everything"]
  },
  {
    id: 57, category: "시스템",
    title: "실험적 기능 설정 (Flags)",
    title_en: "Experimental Features (Flags)",
    desc: "정식 출시 전인 크롬의 최신 실험적 기능들을 미리 활성화하여 사용해 볼 수 있습니다.",
    desc_en: "Try out or adjust Chrome's latest experimental features. (Warning: Incorrect settings may cause instability)",
    link: "chrome://flags",
    shortcut: { win: "chrome://flags", mac: "chrome://flags" },
    tags: ["설정", "실험", "테스트", "고급", "기능", "미리보기", "플래그"],
    tags_en: ["settings", "experimental", "test", "flags", "advanced", "feature", "preview"],
    steps: ["주소창에 chrome://flags를 입력합니다.", "원하는 기능을 찾아 Enabled로 변경하여 적용하세요.", "문제가 발생하거나 브라우저가 이상해지면 우측 상단의 [Reset all] 버튼을 클릭해 초기화하세요."],
    steps_en: ["Type chrome://flags in the address bar.", "Find a feature and change it to 'Enabled' to apply.", "If issues occur, click the [Reset all] button at the top right to restore defaults."]
  },
  {
    id: 58, category: "시스템",
    title: "메모리 점유율 진단",
    title_en: "Diagnose Memory Usage",
    desc: "브라우저 내부의 상세한 메모리 사용량을 진단하고 메모리 누수 여부를 확인할 수 있습니다.",
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
    desc: "브라우저와 서버 사이에서 오가는 상세한 네트워크 패킷 정보를 분석할 때 사용합니다.",
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
    desc: "오랫동안 사용하지 않은 탭을 수동으로 비활성화하여 시스템 메모리를 확보할 수 있습니다.",
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
    desc: "설정 메뉴를 일일이 찾지 않고 주소창에 명령어를 입력하여 원하는 작업을 즉시 실행합니다.",
    desc_en: "Type 'pass' or 'clear history' in the address bar to see buttons that jump directly to settings.",
    shortcut: { win: "주소창 명령어 입력", mac: "주소창 명령어 입력" },
    shortcut_en: { win: "Type command in address bar", mac: "Type command in address bar" },
    tags: ["액션", "작업", "주소창", "옴니박스", "비밀번호관리", "쿠키삭제", "설정열기", "명령어", "바로실행"],
    tags_en: ["chrome actions", "action", "task", "address bar", "omnibox", "manage passwords", "clear cookies", "open settings", "command", "run directly"],
    steps: {
      win: ["주소창을 클릭하거나 단축키(Ctrl+L)를 누릅니다.", "'비밀번호', '기록 삭제', '번역' 등 실행하고 싶은 작업을 입력하세요.", "검색어 아래에 나타나는 [비밀번호 관리], [인터넷 사용 기록 삭제] 등의 버튼을 클릭합니다."],
      mac: ["주소창을 클릭하거나 단축키(Cmd+L)를 누릅니다.", "'비밀번호', '기록 삭제', '번역' 등 실행하고 싶은 작업을 입력하세요.", "검색어 아래에 나타나는 [비밀번호 관리], [인터넷 사용 기록 삭제] 등의 버튼을 클릭합니다."]
    },
    steps_en: {
      win: ["Click the address bar or use the shortcut (Ctrl+L).", "Type the action you want to perform, such as 'pass', 'clear', or 'translate'.", "Click the action button that appears below the search bar, such as [Manage passwords] or [Clear browsing data]."],
      mac: ["Click the address bar or use the shortcut (Cmd+L).", "Type the action you want to perform, such as 'pass', 'clear', or 'translate'.", "Click the action button that appears below the search bar, such as [Manage passwords] or [Clear browsing data]."]
    }
  },
  {
    id: 66, category: "주소창/검색",
    title: "@탭 / @북마크 / @기록 검색",
    title_en: "Search with @tabs / @bookmarks / @history",
    desc: "주소창에서 특정 기호를 사용하여 탭, 북마크, 방문 기록 내에서만 원하는 정보를 빠르게 검색합니다.",
    desc_en: "Type @tabs, @bookmarks, or @history in the address bar to quickly search within that specific area.",
    shortcut: { win: "@탭 [검색어]", mac: "@탭 [검색어]" },
    shortcut_en: { win: "@tabs [keyword]", mac: "@tabs [keyword]" },
    tags: ["탭검색", "북마크검색", "기록검색", "필터", "@탭", "@북마크", "@기록", "옴니박스", "주소창", "검색필터", "특정검색"],
    tags_en: ["tab search", "bookmark search", "history search", "filter", "@tabs", "@bookmarks", "@history", "omnibox", "address bar", "search filter"],
    steps: ["주소창에 @를 입력하거나, @탭, @북마크, @기록 중 하나를 입력합니다.", "Space 키 또는 Tab 키를 누르면 해당 카테고리 검색 모드로 전환됩니다.", "찾고 있는 키워드를 입력해 해당 영역에서만 검색 결과를 확인하세요."],
    steps_en: ["Type @ in the address bar, or type @tabs, @bookmarks, or @history.", "Press Space or Tab to enter the specific search mode.", "Type your keyword to find results only within that category."]
  },
  {
    id: 67, category: "주소창/검색",
    title: "사이트 전용 검색 단축키",
    title_en: "Site-Specific Search Shortcuts",
    desc: "자주 방문하는 웹사이트를 단축키로 등록하여 주소창에서 해당 사이트의 내용을 즉시 검색할 수 있습니다.",
    desc_en: "Set up keywords to search your favorite sites directly from the address bar.",
    shortcut: { win: "[키워드] + Tab", mac: "[키워드] + Tab" },
    shortcut_en: { win: "[keyword] + Tab", mac: "[keyword] + Tab" },
    link: "chrome://settings/searchEngines",
    tags: ["검색엔진", "단축키", "유튜브검색", "사이트검색", "커스텀", "주소창검색", "빠른검색", "커스텀검색"],
    tags_en: ["search engine", "shortcut", "youtube search", "site search", "custom", "yt", "so", "omnibox search", "quick search", "custom search"],
    steps: ["주소창에 chrome://settings/searchEngines를 입력하세요.", "'사이트 검색' 항목에서 [추가] 버튼을 클릭하세요.", "'바로가기' 칸에 @커스텀키워드(예: @n)를 입력하세요.", "'URL' 칸에 검색 페이지 URL(%s 포함)을 입력하세요.", "이제 주소창에 @n 입력 후 탭(Tab)키를 누르면 해당 사이트에서 즉시 검색됩니다."],
    steps_en: ["Type chrome://settings/searchEngines in the address bar.", "Click the [Add] button under 'Site search'.", "Enter a keyword (e.g., @n) in the 'Shortcut' field.", "Enter the search result URL with %s in the 'URL' field.", "Now type @n and press Tab in the address bar to search that site instantly."]
  },
  {
    id: 86, category: "주소창/검색",
    title: "주소창에서 바로 계산하기",
    title_en: "Calculate Directly in Address Bar",
    desc: "주소창에 수식을 입력하면 별도의 계산기를 켜지 않고도 결과값을 즉시 확인할 수 있습니다.",
    desc_en: "Enter a formula like '5*99-13' in the address bar, and the result will appear instantly without a calculator.",
    shortcut: { win: "주소창에 수식 입력", mac: "주소창에 수식 입력" },
    shortcut_en: { win: "Enter formula in address bar", mac: "Enter formula in address bar" },
    tags: ["계산기", "계산", "수식", "주소창", "사칙연산", "빠른계산", "암산"],
    tags_en: ["calculator", "calculate", "formula", "math", "omnibox", "address bar", "quick calculation"],
    steps: {
      win: ["주소창(단축키 Ctrl+L)으로 이동합니다.", "수식(예: 125 * 8, 50/2)을 입력합니다.", "엔터를 치지 않아도 검색 제안 영역에 계산 결과가 즉시 나타납니다."],
      mac: ["주소창(단축키 Cmd+L)으로 이동합니다.", "수식(예: 125 * 8, 50/2)을 입력합니다.", "엔터를 치지 않아도 검색 제안 영역에 계산 결과가 즉시 나타납니다."]
    },
    steps_en: {
      win: ["Go to the address bar (Shortcut Ctrl+L).", "Type a math formula (e.g., 125 * 8, 50/2).", "The result will appear instantly in the search suggestions without pressing Enter."],
      mac: ["Go to the address bar (Shortcut Cmd+L).", "Type a math formula (e.g., 125 * 8, 50/2).", "The result will appear instantly in the search suggestions without pressing Enter."]
    }
  },
  // ── 프로필 / 공간 ──────────────────────────
  {
    id: 68, category: "프로필/공간",
    title: "프로필로 업무/개인 분리",
    title_en: "Separate Work/Personal with Profiles",
    desc: "업무용과 개인용으로 프로필을 분리하여 북마크, 방문 기록, 확장 프로그램 등을 독립적으로 관리합니다.",
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
    desc: "당장 읽기 힘든 페이지를 임시로 저장해 두었다가 나중에 다시 읽고 싶을 때 사용합니다.",
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
    desc: "다른 사람에게 컴퓨터를 빌려줄 때, 내 개인 정보나 기록이 남지 않는 깨끗한 창을 열어줍니다.",
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
    desc: "구글 검색 결과에서 별도의 설치 없이 고전 아케이드 게임인 팩맨을 즐길 수 있습니다.",
    desc_en: "Enjoy the classic masterpiece Pac-Man instantly from Google search results.",
    shortcut: { win: "구글 검색창(google.com)에 'pac-man' 검색", mac: "구글 검색창(google.com)에 'pac-man' 검색" },
    shortcut_en: { win: "Search 'pac-man' on Google", mac: "Search 'pac-man' on Google" },
    tags: ["팩맨", "게임", "아케이드", "심심할때", "구글게임", "오락실", "레트로게임", "추억"],
    tags_en: ["pac-man", "game", "arcade", "bored", "google game", "retro game", "classic"]
  },
  {
    id: 71, category: "이스터에그",
    title: "솔리테어 카드 게임",
    title_en: "Solitaire Card Game",
    desc: "구글 검색 창에서 추억의 카드 게임인 솔리테어를 즉시 실행하여 즐길 수 있습니다.",
    desc_en: "Start the nostalgic single-player card game, Solitaire, right from the search bar.",
    shortcut: { win: "구글 검색창(google.com)에 'solitaire' 검색", mac: "구글 검색창(google.com)에 'solitaire' 검색" },
    shortcut_en: { win: "Search 'solitaire' on Google", mac: "Search 'solitaire' on Google" },
    tags: ["솔리테어", "카드게임", "혼자하기", "카드", "심심해", "게임", "구글게임", "트럼프", "클론다이크"],
    tags_en: ["solitaire", "card game", "single player", "card", "bored", "game", "google game", "klondike"]
  },
  {
    id: 72, category: "이스터에그",
    title: "틱택토 게임",
    title_en: "Tic-Tac-Toe Game",
    desc: "구글 AI 또는 친구와 함께 간단한 틱택토 게임을 즐기며 시간을 보낼 수 있습니다.",
    desc_en: "A simple game of Tic-Tac-Toe against a friend or Google's AI!",
    shortcut: { win: "구글 검색창(google.com)에 'tic tac toe' 검색", mac: "구글 검색창(google.com)에 'tic tac toe' 검색" },
    shortcut_en: { win: "Search 'tic tac toe' on Google", mac: "Search 'tic tac toe' on Google" },
    tags: ["틱택토", "3줄", "게임", "심심할때", "두뇌회전", "간단한게임", "구글게임", "대결"],
    tags_en: ["tic tac toe", "game", "bored", "brain teaser", "simple game", "google game", "match", "ai"]
  },
  {
    id: 77, category: "이스터에그",
    title: "스네이크 게임",
    title_en: "Snake Game",
    desc: "구글 검색 창에서 방향키를 이용해 사과를 먹으며 뱀을 키우는 스네이크 게임을 즐길 수 있습니다.",
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
    desc: "구글 검색 결과에서 마리오의 물음표 박스를 클릭하며 재미있는 효과음을 들을 수 있습니다.",
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
    desc: "구글 검색 결과의 일부 텍스트가 옆으로 계속 흘러가는 레트로 스타일의 효과를 볼 수 있습니다.",
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
    desc: "구글 검색 창에서 소닉 캐릭터를 클릭하여 다양한 모션을 확인하고 변신하는 모습을 볼 수 있습니다.",
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
    desc: "숫자 힌트를 이용해 지뢰가 숨겨진 위치를 찾는 고전 게임 지뢰찾기를 즐길 수 있습니다.",
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
    desc: "메뉴 결정이나 선택이 필요할 때, 구글을 통해 무작위로 주사위를 굴리거나 동전을 던질 수 있습니다.",
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
    desc: "단어의 철자 순서를 바꾼 애너그램을 검색하여 구글이 제안하는 재미있는 문구를 확인할 수 있습니다.",
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
    desc: "특정 노래를 검색하여 노래 가사에 맞춰 화면이 움직이는 인터랙티브한 효과를 즐길 수 있습니다.",
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
    desc: "안내가 제공되는 1분 동안 깊은 호흡을 따라 하며 마음의 안정을 찾을 수 있습니다.",
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
    desc: "특정 아이돌 그룹을 검색하고 아이콘을 클릭하여 화려한 응원 효과를 감상할 수 있습니다.",
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
    desc: "악기 연습이나 일정한 박자가 필요할 때, 원하는 템포(BPM)로 메트로놈을 사용할 수 있습니다.",
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
    desc: "작업 시간을 측정하거나 알람이 필요할 때, 별도의 프로그램 없이 타이머와 스톱워치를 사용합니다.",
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
    desc: "이벤트 추첨이나 무작위 숫자가 필요할 때, 설정한 범위 내에서 난수를 생성할 수 있습니다.",
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
    desc: "원하는 색상을 선택하여 HEX, RGB, CMYK 등 다양한 형식의 색상 코드를 즉시 확인합니다.",
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
    desc: "미국 시트콤에서 유래한 가상의 공휴일을 기념하는 독특한 화면 효과를 볼 수 있습니다.",
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
    desc: "구글 검색 창에서 신비로운 오로라가 나타나는 애니메이션 효과를 감상할 수 있습니다.",
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
    desc: "개발자 도구 콘솔에서 이전에 입력했던 명령어들을 키보드 방향키로 빠르게 찾아 다시 사용할 수 있습니다.",
    desc_en: "Quickly find previously entered commands in the console using the up/down arrow keys.",
    shortcut: { win: "↑ / ↓", mac: "↑ / ↓" },
    tags: ["콘솔", "기록", "명령어", "탐색", "화살표", "이전명령어", "다시쓰기"],
    tags_en: ["console", "history", "command", "navigate", "up", "down", "arrow", "previous command", "rewrite"],
    steps: ["F12(또는 Cmd + Option + I)를 눌러 개발자 도구를 먼저 여세요.", "Console 탭을 클릭해 활성화합니다.", "키보드의 위(↑) 또는 아래(↓) 화살표 키를 눌러 이전에 입력했던 명령어를 확인하세요."],
    steps_en: ["Press F12 (or Cmd + Option + I) to open Developer Tools first.", "Click the Console tab to activate it.", "Use the Up (↑) or Down (↓) arrow keys to navigate through previously entered commands."]
  },
  {
    id: 75, category: "개발자",
    title: "콘솔 깨끗하게 비우기",
    title_en: "Clear Console",
    desc: "개발자 도구 콘솔 창에 쌓인 많은 로그들을 한꺼번에 삭제하여 깨끗하게 비울 수 있습니다.",
    desc_en: "Deletes all logs in a cluttered console window at once.",
    shortcut: { win: "Ctrl + L (또는 clear())", mac: "Cmd + K (또는 Ctrl + L)" },
    shortcut_en: { win: "Ctrl + L (or clear())", mac: "Cmd + K (or Ctrl + L)" },
    tags: ["콘솔비우기", "삭제", "비우기", "지우기", "로그삭제", "깔끔", "정리"],
    tags_en: ["clear console", "delete", "clear", "console", "clean", "empty", "erase", "clear log", "tidy"],
    steps: ["F12(또는 Cmd + Option + I)를 눌러 개발자 도구를 먼저 여세요.", "Console 탭에서 단축키를 누르거나 clear()를 입력하세요.", "지저분했던 이전 로그들이 모두 사라지고 깨끗해집니다."],
    steps_en: ["Press F12 (or Cmd + Option + I) to open Developer Tools first.", "Press the shortcut in the Console tab or type clear().", "The previous logs will be cleared, leaving the console clean."]
  },
  {
    id: 76, category: "개발자",
    title: "패널 간 빠른 이동",
    title_en: "Quickly Switch Between Panels",
    desc: "마우스를 사용하지 않고 개발자 도구 상단의 여러 패널 사이를 빠르게 이동할 때 사용합니다.",
    desc_en: "Navigate sequentially through the DevTools top tabs without using the mouse.",
    shortcut: { win: "Ctrl + [ / Ctrl + ]", mac: "Cmd + [ / Cmd + ]" },
    tags: ["탭이동", "패널이동", "빠른이동", "탭전환", "콘솔에서네트워크로"],
    tags_en: ["tab switch", "panel switch", "devtools", "switch panel", "quick move", "next panel", "previous panel"],
    steps: ["F12(또는 Cmd + Option + I)를 눌러 개발자 도구를 먼저 여세요.", "개발자 도구가 활성화된 상태에서 단축키를 누르세요.", "Elements, Console, Network 등 상단 패널들이 순서대로 전환됩니다."],
    steps_en: ["Press F12 (or Cmd + Option + I) to open Developer Tools first.", "While the DevTools window is active, press the shortcut.", "The top panels like Elements, Console, and Network will switch in order."]
  },
  {
    id: 90, category: "개발자",
    title: "모바일 기기 에뮬레이션",
    title_en: "Mobile Device Emulation",
    desc: "웹사이트가 모바일이나 태블릿 화면에서 어떻게 보이는지 다양한 기기 환경으로 테스트할 수 있습니다.",
    desc_en: "Test in real-time how your site looks on various smartphone and tablet screens in the developer tools.",
    shortcut: { win: "Ctrl + Shift + M", mac: "Cmd + Shift + M" },
    tags: ["모바일", "반응형", "에뮬레이터", "테스트", "스마트폰", "화면크기"],
    tags_en: ["mobile", "responsive", "emulator", "test", "device", "emulation", "smartphone", "screen size"],
    steps: ["먼저 F12(또는 Cmd + Option + I)를 눌러 개발자 도구를 엽니다.", "개발자 도구 창이 활성화된 상태에서 단축키(Ctrl + Shift + M / Cmd + Shift + M)를 누르세요.", "화면 상단에 기기 선택 메뉴가 나타나면 원하는 모델(iPhone, Pixel 등)을 골라 테스트하세요.", "화면 상단의 'Dimensions' 메뉴를 통해 해상도를 자유롭게 조절할 수도 있습니다."],
    steps_en: ["First, open Developer Tools by pressing F12 (or Cmd + Option + I).", "While the DevTools window is active, press the shortcut (Ctrl + Shift + M / Cmd + Shift + M).", "Select the desired model (iPhone, Pixel, etc.) from the device menu at the top.", "You can also manually adjust the resolution via the 'Dimensions' menu."]
  },
  // ── 숨겨진 시스템 / 고급 꿀팁 ──────────────────
  {
    id: 110, category: "시스템",
    title: "크롬 즉시 재시작",
    title_en: "Restart Chrome Instantly",
    desc: "브라우저 작동이 원활하지 않을 때, 열려 있는 탭을 유지하면서 크롬을 즉시 재시작할 수 있습니다.",
    desc_en: "Closes and reopens Chrome. Be careful: unsaved text will be lost!",
    shortcut: { win: "chrome://restart 입력", mac: "chrome://restart 입력" },
    shortcut_en: { win: "Type chrome://restart", mac: "Type chrome://restart" },
    link: "chrome://restart",
    tags: ["재시작", "리스타트", "초기화", "렉", "끄고켜기", "업데이트"],
    tags_en: ["restart", "reboot", "refresh", "lag", "re-open", "chrome restart"],
    steps: ["주소창에 chrome://restart를 입력하고 엔터를 누르세요.", "현재 열린 모든 탭이 닫혔다가 다시 열립니다.", "중요한 작업이나 작성 중인 글은 반드시 먼저 저장하세요!"],
    steps_en: ["Type chrome://restart in the address bar and press Enter.", "All open tabs will close and reopen automatically.", "Make sure to save any important work or text before restarting!"]
  },
  {
    id: 111, category: "시스템",
    title: "크롬 버전 및 정보 확인",
    title_en: "Chrome Version & Info",
    desc: "현재 사용 중인 크롬의 버전 정보와 프로필 경로 등 상세한 시스템 정보를 확인합니다.",
    desc_en: "Check detailed information about your Chrome version, profile path, and more.",
    shortcut: { win: "chrome://version 입력", mac: "chrome://version 입력" },
    shortcut_en: { win: "Type chrome://version", mac: "Type chrome://version" },
    link: "chrome://version",
    tags: ["버전", "정보", "업데이트", "프로필", "빌드", "크롬정보"],
    tags_en: ["version", "info", "update", "profile", "build", "chrome info"]
  },
  {
    id: 112, category: "주소창/검색",
    title: "주소창 빠른 검색",
    title_en: "Quick Search in Address Bar",
    desc: "어떤 페이지에서든 즉시 주소창으로 포커스를 이동하여 새로운 검색을 시작할 수 있습니다.",
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
    desc: "최근에 방문했던 페이지들의 목록을 한눈에 확인하여 원하는 지점으로 빠르게 돌아갈 수 있습니다.",
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
    desc: "여러 개의 탭을 한꺼번에 선택하여 그룹을 만들거나 동시에 닫는 등 일괄적으로 관리할 수 있습니다.",
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
    desc: "어느 페이지에 있든 미리 설정해 둔 홈페이지(시작 페이지)로 즉시 이동하고 싶을 때 사용합니다.",
    desc_en: "Instantly navigate to your designated home page.",
    shortcut: { win: "Alt + Home", mac: "Cmd + Shift + H" },
    tags: ["홈", "시작페이지", "홈으로", "첫화면"],
    tags_en: ["home", "home page", "start page", "go home"]
  },
  {
    id: 116, category: "탐색",
    title: "툴바의 첫 번째 항목으로 이동",
    title_en: "Focus on Toolbar",
    desc: "마우스를 사용하지 않고 상단 툴바의 주소창이나 확장 프로그램 아이콘으로 포커스를 이동합니다.",
    desc_en: "Moves focus to the toolbar area, including the address bar and extensions.",
    shortcut: { win: "Shift + Alt + T", mac: "Ctrl + F2" },
    tags: ["툴바", "포커스", "단축키", "상단바", "메뉴이동"],
    tags_en: ["toolbar", "focus", "shortcut", "top bar", "navigation"]
  },
  // ── AI 기능 ──────────────────────────────────
  {
    id: 117, category: "AI 기능",
    title: "[AI] 탭 정리 (Tab Organizer)",
    title_en: "[AI] Tab Organizer",
    desc: "열려 있는 탭이 많을 때, AI가 비슷한 주제의 탭들을 자동으로 분류하여 그룹을 만들어줍니다.",
    desc_en: "AI automatically groups similar tabs together when you have too many open.",
    link: "chrome://settings/ai",
    shortcut: { win: "탭 5개 이상 열기 > 창 왼쪽 위 '▼' 아이콘 클릭", mac: "탭 5개 이상 열기 > 창 왼쪽 위 '▼' 아이콘 클릭" },
    shortcut_en: { win: "Open 5+ tabs > Click '▼' icon (top-left)", mac: "Open 5+ tabs > Click '▼' icon (top-left)" },
    tags: ["ai", "탭정리", "그룹", "자동", "정리", "인공지능", "실험적"],
    tags_en: ["ai", "tab organize", "group", "auto", "clean", "artificial intelligence", "experimental"],
    steps: {
      win: [
        "개인 Google 계정(만 18세 이상 성인)으로 로그인했는지 확인하세요. (Workspace/학교 계정 및 미성년자 불가)",
        "Chrome 설정(chrome://settings/ai)에서 'AI 기능'을 켭니다.",
        "탭을 5개 이상 열어둔 상태에서 창 왼쪽 상단의 '▼' 아이콘을 누르세요.",
        "'탭 정리'를 선택하면 AI가 그룹화를 제안합니다."
      ],
      mac: [
        "개인 Google 계정(만 18세 이상 성인)으로 로그인했는지 확인하세요. (Workspace/학교 계정 및 미성년자 불가)",
        "Chrome 설정(chrome://settings/ai)에서 'AI 기능'을 켭니다.",
        "탭을 5개 이상 열어둔 상태에서 창 왼쪽 상단의 '▼' 아이콘을 누르세요.",
        "'탭 정리'를 선택하면 AI가 그룹화를 제안합니다."
      ]
    },
    steps_en: [
      "Use a personal Google account (18+). Enterprise/Edu accounts are not supported.",
      "Enable 'AI features' in Chrome settings (chrome://settings/ai).",
      "Open 5+ tabs and click the '▼' icon in the top-left corner.",
      "Select 'Organize Tabs' to see AI suggestions."
    ]
  },
  {
    id: 118, category: "AI 기능",
    title: "[AI] Gemini Compose (글쓰기 비서)",
    title_en: "[AI] Gemini Compose",
    desc: "이메일이나 리뷰 등 글을 작성할 때, AI의 도움을 받아 문장을 다듬거나 새로운 초안을 작성할 수 있습니다.",
    desc_en: "Latest 2026 Feature: Click the Gemini icon in text fields or type '@' to compose or refine sentences instantly.",
    shortcut: { win: "텍스트 영역 클릭 > Gemini 아이콘 클릭", mac: "텍스트 영역 클릭 > Gemini 아이콘 클릭" },
    shortcut_en: { win: "Click text area > Click Gemini icon", mac: "Click text area > Click Gemini icon" },
    tags: ["ai", "gemini", "제미나이", "글쓰기", "도움", "작성", "수정", "교정", "인공지능"],
    tags_en: ["ai", "gemini", "write", "refine", "helper", "compose", "grammar", "artificial intelligence"],
    steps: {
      win: [
        "텍스트 입력창(리뷰, 이메일, 게시글 등)에 마우스 커서를 두세요.",
        "커서 주변에 나타나는 'Gemini(별 모양)' 아이콘을 클릭합니다.",
        "원하는 글쓰기 주제를 입력하거나 스타일(전문적으로, 간결하게 등)을 선택하세요.",
        "AI가 제안한 글을 '삽입' 버튼을 눌러 본문에 반영합니다."
      ],
      mac: [
        "텍스트 입력창(리뷰, 이메일, 게시글 등)에 마우스 커서를 두세요.",
        "커서 주변에 나타나는 'Gemini(별 모양)' 아이콘을 클릭합니다.",
        "원하는 글쓰기 주제를 입력하거나 스타일(전문적으로, 간결하게 등)을 선택하세요.",
        "AI가 제안한 글을 '삽입' 버튼을 눌러 본문에 반영합니다."
      ]
    },
    steps_en: [
      "Place your cursor in a text field (reviews, emails, posts).",
      "Click the floating 'Gemini (star)' icon near the cursor.",
      "Enter a topic or select a style (Professional, Concise, etc.).",
      "Click 'Insert' to add the AI-generated text to your field."
    ]
  },
  {
    id: 119, category: "AI 기능",
    title: "[AI] Gemini AI와 바로 대화",
    title_en: "[AI] Chat with Gemini AI",
    desc: "별도의 사이트 접속 없이 주소창에서 AI에게 질문을 던지고 즉시 답변을 받을 수 있습니다.",
    desc_en: "Ask questions and get answers from Gemini directly from the address bar.",
    shortcut: { win: "주소창에 @gemini 입력 후 질문", mac: "주소창에 @gemini 입력 후 질문" },
    shortcut_en: { win: "Type @gemini in address bar", mac: "Type @gemini in address bar" },
    tags: ["ai", "제미나이", "챗봇", "질문", "검색", "인공지능"],
    tags_en: ["ai", "gemini", "chatbot", "ask", "search", "artificial intelligence"],
    steps: {
      win: [
        "개인 Google 계정(만 18세 이상 성인 권장)으로 로그인했는지 확인하세요. (Workspace 계정 불가)",
        "주소창(Ctrl+L)으로 이동하여 @gemini 를 입력합니다.",
        "스페이스바(Space)를 한 번 누르면 'Gemini와 대화하기' 모드로 바뀝니다.",
        "질문을 입력하고 엔터를 누르세요."
      ],
      mac: [
        "개인 Google 계정(만 18세 이상 성인 권장)으로 로그인했는지 확인하세요. (Workspace 계정 불가)",
        "주소창(Cmd+L)으로 이동하여 @gemini 를 입력합니다.",
        "스페이스바(Space)를 한 번 누르면 'Gemini와 대화하기' 모드로 바뀝니다.",
        "질문을 입력하고 엔터를 누르세요."
      ]
    },
    steps_en: [
      "Requires a personal Google account login.",
      "Go to the address bar and type @gemini.",
      "Press Space to enter chat mode.",
      "Type your question and press Enter."
    ]
  },
  {
    id: 120, category: "AI 기능",
    title: "[AI] 테마 생성 (Create with AI)",
    title_en: "[AI] Create Theme with AI",
    desc: "원하는 주제와 스타일을 설명하는 텍스트를 입력하여 AI가 생성한 나만의 크롬 테마를 적용합니다.",
    desc_en: "Create your own custom Chrome theme with just a text description.",
    shortcut: { win: "새 탭 > 'Chrome 맞춤설정' > 테마 변경 > AI로 생성", mac: "새 탭 > 'Chrome 맞춤설정' > 테마 변경 > AI로 생성" },
    shortcut_en: { win: "New Tab > Customize Chrome > Change theme > Create with AI", mac: "New Tab > Customize Chrome > Change theme > Create with AI" },
    tags: ["ai", "테마", "디자인", "배경", "커스텀", "인공지능"],
    tags_en: ["ai", "theme", "design", "background", "custom", "artificial intelligence"],
    steps: {
      win: [
        "개인 Google 계정(만 18세 이상 성인) 및 영어 언어 설정이 필요합니다.",
        "새 탭 페이지 오른쪽 하단의 'Chrome 맞춤설정(연필 모양)'을 누르세요.",
        "'테마 변경' > 'AI로 생성'을 선택합니다.",
        "주제, 스타일, 분위기를 선택하고 [생성]을 누르세요."
      ],
      mac: [
        "개인 Google 계정(만 18세 이상 성인) 및 영어 언어 설정이 필요합니다.",
        "새 탭 페이지 오른쪽 하단의 'Chrome 맞춤설정(연필 모양)'을 누르세요.",
        "'테마 변경' > 'AI로 생성'을 선택합니다.",
        "주제, 스타일, 분위기를 선택하고 [생성]을 누르세요."
      ]
    },
    steps_en: [
      "Requires personal Google account (18+) and English language.",
      "Click 'Customize Chrome' (pencil icon) on a New Tab page.",
      "Select 'Change theme' > 'Create with AI'.",
      "Pick a subject, style, and mood, then click 'Create'."
    ]
  },
  {
    id: 121, category: "AI 기능",
    title: "[AI] 지능형 방문 기록 검색",
    title_en: "[AI] Intelligent History Search",
    desc: "방문했던 페이지의 정확한 제목이 기억나지 않을 때, 일상적인 문장으로 검색하여 기록을 찾을 수 있습니다.",
    desc_en: "Search history using everyday language like 'the shoe site I saw yesterday' and get AI answers.",
    shortcut: { win: "Ctrl + H > 검색창에 자연어로 질문", mac: "Cmd + Y > 검색창에 자연어로 질문" },
    shortcut_en: { win: "Ctrl + H > Search with natural language", mac: "Cmd + Y > Search with natural language" },
    tags: ["ai", "기록", "방문기록", "찾기", "검색", "인공지능"],
    tags_en: ["ai", "history", "visit", "find", "search", "artificial intelligence"],
    steps: {
      win: [
        "미국 거주 중이며 만 18세 이상 성인의 개인 Google 계정이 필요합니다.",
        "Chrome 브라우저 언어를 '영어'로 설정하고 다시 시작하세요.",
        "고성능 사양의 컴퓨터가 필요하며, 구글 계정에 로그인되어 있어야 합니다.",
        "방문 기록(Ctrl+H) 페이지 검색창에 질문을 입력해 답변을 확인하세요."
      ],
      mac: [
        "미국 거주 중이며 만 18세 이상 성인의 개인 Google 계정이 필요합니다.",
        "Chrome 브라우저 언어를 '영어'로 설정하고 다시 시작하세요.",
        "고성능 사양의 컴퓨터가 필요하며, 구글 계정에 로그인되어 있어야 합니다.",
        "방문 기록(Cmd+Y) 페이지 검색창에 질문을 입력해 답변을 확인하세요."
      ]
    },
    steps_en: [
      "Requires personal Google account (18+) and US location.",
      "Set Chrome language to English and restart.",
      "Use a high-performance computer and sign in to your Google account.",
      "Go to History (Ctrl+H/Cmd+Y) and type your question in the search bar."
    ]
  },
  {
    id: 122, category: "설정",
    title: "에너지 절약 모드",
    title_en: "Energy Saver Mode",
    desc: "노트북 배터리가 부족할 때 백그라운드 활동을 제한하여 배터리 사용 시간을 늘려줍니다.",
    desc_en: "Reduces background activity to extend battery life when low.",
    link: "chrome://settings/performance",
    shortcut: { win: "설정 > 성능 > 에너지 절약", mac: "설정 > 성능 > 에너지 절약" },
    shortcut_en: { win: "Settings > Performance > Energy Saver", mac: "Settings > Performance > Energy Saver" },
    tags: ["배터리", "절약", "노트북", "에너지", "성능", "최적화", "배터리부족"],
    tags_en: ["battery", "save", "laptop", "energy", "performance", "optimization"]
  },
  {
    id: 123, category: "탐색",
    title: "[실험적] 링크 미리보기 (Link Preview)",
    title_en: "[Exp] Link Preview",
    desc: "링크를 클릭하여 이동하기 전에 팝업 창을 통해 미리 페이지 내용을 확인하고 싶을 때 사용합니다.",
    desc_en: "Preview page content in a small popup before clicking. Requires enabling chrome://flags/#link-preview.",
    shortcut: { win: "링크 위에서 우클릭 > 미리보기", mac: "링크 위에서 우클릭 > 미리보기" },
    shortcut_en: { win: "Right-click link > Preview", mac: "Right-click link > Preview" },
    tags: ["미리보기", "링크", "팝업", "빠른확인", "탐색"],
    tags_en: ["preview", "link", "popup", "quick view", "navigation"],
    steps: [
      "주소창에 chrome://flags/#link-preview 를 입력해 이동하세요.",
      "해당 항목을 'Enabled'로 변경하세요.",
      "화면 하단에 나타나는 [Relaunch] 버튼을 눌러 브라우저를 재시작해야 기능이 활성화됩니다.",
      "이제 링크 위에서 마우스 우클릭 시 '미리보기' 메뉴가 나타납니다."
    ],
    steps_en: [
      "Go to chrome://flags/#link-preview in the address bar.",
      "Change the setting to 'Enabled'.",
      "Click the [Relaunch] button at the bottom to restart Chrome.",
      "Now, right-click any link to see the 'Preview' option."
    ]
  },
  {
    id: 124, category: "탭/창",
    title: "탭 그룹 저장 및 동기화",
    title_en: "Save & Sync Tab Groups",
    desc: "만들어둔 탭 그룹을 저장하여 나중에 다시 열거나 다른 기기와 동기화하여 사용할 수 있습니다.",
    desc_en: "Save tab groups to reopen them later or sync across your devices.",
    shortcut: { win: "그룹 이름 우클릭 > 그룹 저장", mac: "그룹 이름 우클릭 > 그룹 저장" },
    shortcut_en: { win: "Right-click group name > Save group", mac: "Right-click group name > Save group" },
    tags: ["탭그룹", "저장", "동기화", "북마크", "정리"],
    tags_en: ["tab group", "save", "sync", "bookmark", "organize"]
  },
  {
    id: 125, category: "시스템",
    title: "다운로드 속도 가속 (Parallel)",
    title_en: "Parallel Downloading",
    desc: "대용량 파일을 다운로드할 때 여러 연결을 동시에 사용하여 전송 속도를 높여줍니다.",
    desc_en: "Enable this hidden feature to speed up large file downloads.",
    link: "chrome://flags/#enable-parallel-downloading",
    shortcut: { win: "검색창에 'Parallel' 입력 > Enable로 변경", mac: "검색창에 'Parallel' 입력 > Enable로 변경" },
    shortcut_en: { win: "Search 'Parallel' > Change to 'Enabled'", mac: "Search 'Parallel' > Change to 'Enabled'" },
    tags: ["다운로드", "속도", "가속", "빨리", "플래그"],
    tags_en: ["download", "speed", "fast", "parallel", "flags"],
    steps: [
      "주소창에 chrome://flags/#enable-parallel-downloading 을 입력해 이동하세요.",
      "'Parallel downloading' 항목을 'Enabled'로 변경하세요.",
      "화면 하단에 나타나는 [Relaunch] 버튼을 눌러 브라우저를 재시작해야 기능이 활성화됩니다."
    ],
    steps_en: [
      "Go to chrome://flags/#enable-parallel-downloading in the address bar.",
      "Change the 'Parallel downloading' setting to 'Enabled'.",
      "Click the [Relaunch] button at the bottom to restart Chrome and activate the feature."
    ]
  },
  {
    id: 138, category: "주소창/검색",
    title: "사이트별 검색 단축키 (@)",
    title_en: "Site-Specific Search (@)",
    desc: "주소창에 @ 기호를 입력하여 유튜브나 구글 드라이브 등 특정 사이트 내의 결과를 즉시 검색합니다.",
    desc_en: "Type @ in the address bar to search directly within YouTube, Drive, and more.",
    shortcut: { win: "주소창에 @ 입력", mac: "주소창에 @ 입력" },
    shortcut_en: { win: "Type @ in address bar", mac: "Type @ in address bar" },
    tags: ["검색", "주소창", "유튜브검색", "바로가기", "골뱅이"],
    tags_en: ["search", "address bar", "site search", "shortcut", "at sign"],
    steps: ["주소창을 클릭하거나 단축키(Ctrl+L / Cmd+L)를 누르세요.", "@ 기호를 입력합니다.", "나타나는 목록에서 유튜브, 드라이브 등 원하는 사이트를 선택(화살표/탭)하세요.", "검색어를 입력하고 엔터를 누르면 해당 사이트 내 결과로 바로 이동합니다."],
    steps_en: ["Click the address bar or use shortcut (Ctrl+L / Cmd+L).", "Type the '@' symbol.", "Select a site (YouTube, Drive, etc.) from the dropdown using arrow/Tab keys.", "Enter your search term and press Enter to search within that site."]
  },
  {
    id: 127, category: "설정",
    title: "크롬 안전 확인 (Safety Check)",
    title_en: "Chrome Safety Check",
    desc: "보안 업데이트 상태, 비밀번호 유출 여부, 유해한 확장 프로그램 등을 한꺼번에 검사하여 보안을 강화합니다.",
    desc_en: "Check for compromised passwords, bad extensions, and updates all at once.",
    link: "chrome://settings/safetyCheck",
    shortcut: { win: "설정 > 개인정보 보호 및 보안", mac: "설정 > 개인정보 보호 및 보안" },
    shortcut_en: { win: "Settings > Privacy and security", mac: "Settings > Privacy and security" },
    tags: ["보안", "안전", "비밀번호", "해킹", "검사"],
    tags_en: ["security", "safety", "password", "hack", "check"]
  },
  {
    id: 128, category: "화면",
    title: "사이드바에 북마크 고정",
    title_en: "Pin Bookmarks to Side Panel",
    desc: "주소창 아래의 북마크 바를 숨기는 대신 사이드 패널에 북마크를 고정하여 화면을 더 넓게 쓸 수 있습니다.",
    desc_en: "Hide the bookmarks bar and use the side panel to gain more vertical space.",
    shortcut: { win: "주소창 우측 사이드 패널 아이콘", mac: "주소창 우측 사이드 패널 아이콘" },
    shortcut_en: { win: "Side panel icon next to address bar", mac: "Side panel icon next to address bar" },
    tags: ["북마크", "사이드바", "화면", "정리", "고정"],
    tags_en: ["bookmarks", "sidebar", "screen", "organize", "pin"]
  },
  {
    id: 129, category: "편집",
    title: "텍스트 하이라이트로 링크 복사",
    title_en: "Copy Link to Highlight",
    desc: "페이지의 특정 문장을 강조한 상태로 공유하여, 상대방이 링크를 클릭했을 때 해당 위치로 바로 이동하게 합니다.",
    desc_en: "Generate a link that shares a specific sentence on a page with a highlight.",
    shortcut: { win: "문장 드래그 > 우클릭 > 강조표시로 링크 복사", mac: "문장 드래그 > 우클릭 > 강조표시로 링크 복사" },
    shortcut_en: { win: "Drag text > Right-click > Copy link to highlight", mac: "Drag text > Right-click > Copy link to highlight" },
    tags: ["하이라이트", "링크공유", "특정문장", "공유", "편집"],
    tags_en: ["highlight", "link sharing", "specific text", "share", "edit"]
  },
  {
    id: 130, category: "프로필/공간",
    title: "프로필별 바탕화면 바로가기",
    title_en: "Desktop Shortcut for Profiles",
    desc: "특정 프로필로 바로 접속할 수 있는 바탕화면 아이콘을 생성하여 업무 공간을 빠르게 분리합니다.",
    desc_en: "Create a desktop icon that launches Chrome with a specific profile.",
    shortcut: { win: "설정 > 디자인 > 프로필 바로가기 만들기", mac: "설정 > 디자인 > 프로필 바로가기 만들기" },
    shortcut_en: { win: "Settings > Appearance > Create desktop shortcut", mac: "Settings > Appearance > Create desktop shortcut" },
    tags: ["프로필", "바탕화면", "바로가기", "업무분리", "공간"],
    tags_en: ["profile", "desktop", "shortcut", "work separation", "space"]
  },
  {
    id: 131, category: "화면",
    title: "사이드 패널에 웹사이트 고정",
    title_en: "Pin Website to Side Panel",
    desc: "자주 사용하는 웹사이트를 사이드 패널에 고정하여 메인 화면과 동시에 보며 작업할 수 있습니다.",
    desc_en: "Pin frequently used sites to the side panel to view them alongside the main window.",
    shortcut: { win: "사이드 패널 아이콘 > 검색 또는 URL 입력", mac: "사이드 패널 아이콘 > 검색 또는 URL 입력" },
    shortcut_en: { win: "Side panel icon > Search or enter URL", mac: "Side panel icon > Search or enter URL" },
    tags: ["사이드패널", "화면분할", "멀티태스킹", "고정", "화면"],
    tags_en: ["side panel", "split screen", "multitasking", "pin", "screen"]
  },
  {
    id: 139, category: "북마크",
    title: "북마크 별칭(키워드) 지정",
    title_en: "Bookmark Keywords/Aliases",
    desc: "북마크에 짧은 별칭을 지정하여 주소창에 해당 단어만 입력해도 사이트에 즉시 접속할 수 있습니다.",
    desc_en: "Assign short keywords to bookmarks to access them by typing just the word in the address bar.",
    shortcut: { win: "북마크 관리자 > 북마크 편집 > 별칭", mac: "북마크 관리자 > 북마크 편집 > 별칭" },
    shortcut_en: { win: "Bookmark Manager > Edit > Keyword", mac: "Bookmark Manager > Edit > Keyword" },
    tags: ["북마크", "키워드", "별칭", "빠른접속", "주소창"],
    tags_en: ["bookmark", "keyword", "alias", "quick access", "omnibox"],
    steps: {
      win: ["북마크 관리자(Ctrl+Shift+O)를 엽니다.", "원하는 북마크 우측의 '작업 더보기(⋮)' > '수정'을 누르세요.", "'별칭' 칸에 원하는 짧은 단어(예: n)를 입력하고 저장합니다.", "이제 주소창에 n만 치고 엔터를 누르면 해당 사이트가 열립니다."],
      mac: ["북마크 관리자(Cmd+Option+B)를 엽니다.", "원하는 북마크 우측의 '작업 더보기(⋮)' > '수정'을 누르세요.", "'별칭' 칸에 원하는 짧은 단어(예: n)를 입력하고 저장합니다.", "이제 주소창에 n만 치고 엔터를 누르면 해당 사이트가 열립니다."]
    },
    steps_en: {
      win: ["Open Bookmark Manager (Ctrl+Shift+O).", "Click 'More actions(⋮)' > 'Edit' on a bookmark.", "Enter a short keyword (e.g., 'n') in the 'Keyword' field and save.", "Now just type 'n' in the address bar and press Enter to open it."],
      mac: ["Open Bookmark Manager (Cmd+Option+B).", "Click 'More actions(⋮)' > 'Edit' on a bookmark.", "Enter a short keyword (e.g., 'n') in the 'Keyword' field and save.", "Now just type 'n' in the address bar and press Enter to open it."]
    }
  },
  {
    id: 134, category: "AI 기능",
    title: "AI 페이지 요약 (읽기 모드)",
    title_en: "AI Page Summarization",
    desc: "긴 뉴스 기사나 블로그 글의 핵심 내용을 AI가 3줄 내외로 간략하게 요약해 줍니다.",
    desc_en: "In the side panel's 'Reading mode', click 'Summarize' to get a 3-line AI summary of complex articles.",
    shortcut: { win: "사이드 패널 > 읽기 모드 > '요약하기' 클릭", mac: "사이드 패널 > 읽기 모드 > '요약하기' 클릭" },
    shortcut_en: { win: "Side panel > Reading mode > Click 'Summarize'", mac: "Side panel > Reading mode > Click 'Summarize'" },
    tags: ["ai", "요약", "기사", "읽기모드", "생산성", "인공지능"],
    tags_en: ["ai", "summarize", "article", "reading mode", "productivity", "summary"],
    steps: ["기사나 긴 글이 있는 페이지를 엽니다.", "주소창 옆의 '사이드 패널' 아이콘을 누르고 '읽기 모드'를 선택하세요.", "본문 위에 나타나는 [요약하기] 버튼을 클릭합니다.", "AI가 본문을 분석하여 핵심 내용을 3줄 요약해 줍니다."],
    steps_en: ["Open a page with a long article or text.", "Open the side panel and select 'Reading Mode'.", "Click the [Summarize] button that appears above the text.", "AI will analyze the content and provide a 3-line summary."]
  },
  {
    id: 135, category: "AI 기능",
    title: "AI 이미지 검색 (Google Lens)",
    title_en: "AI Image Search (Google Lens)",
    desc: "웹페이지의 이미지를 분석하여 비슷한 제품을 찾거나 이미지 속 텍스트를 즉시 번역할 수 있습니다.",
    desc_en: "Right-click an image and select 'Search with Google'. AI finds products or translates text within the image.",
    shortcut: { win: "이미지 우클릭 > 'Google로 이미지 검색'", mac: "이미지 우클릭 > 'Google로 이미지 검색'" },
    shortcut_en: { win: "Right-click image > 'Search with Google'", mac: "Right-click image > 'Search with Google'" },
    tags: ["lens", "렌즈", "이미지검색", "ai", "번역", "쇼핑"],
    tags_en: ["lens", "google lens", "image search", "ai", "translate", "shopping"]
  },
  {
    id: 136, category: "탐색",
    title: "사이드 패널에서 검색 결과 유지",
    title_en: "Side Search Results",
    desc: "검색 결과 목록을 사이드 패널에 띄워둔 채로 여러 페이지를 자유롭게 이동하며 비교할 수 있습니다.",
    desc_en: "After searching, click the 'G' icon in the address bar to keep your search list in the side panel while browsing.",
    shortcut: { win: "주소창 오른쪽 'G' 아이콘 클릭", mac: "주소창 오른쪽 'G' 아이콘 클릭" },
    shortcut_en: { win: "Click 'G' icon in address bar", mac: "Click 'G' icon in address bar" },
    tags: ["검색", "사이드패널", "탐색", "비교", "멀티태스킹"],
    tags_en: ["search", "side panel", "navigation", "compare", "multitasking"],
    steps: ["Google에서 무언가를 검색하고 검색 결과 중 하나를 클릭해 들어가세요.", "이제 주소창(URL창) 오른쪽 끝에 나타난 작은 'Google' 로고(G) 아이콘을 클릭합니다.", "브라우저 오른쪽에 검색 결과 목록이 고정되어 나타납니다.", "이제 목록을 보면서 여러 페이지를 바로바로 눌러보며 비교할 수 있습니다."],
    steps_en: ["Search for something on Google and click one of the results.", "Look for a small 'Google' logo (G) icon at the right end of the address bar and click it.", "The search results will now be pinned to a side panel on the right.", "You can now browse and compare multiple sites without going back to the search page."]
  },
  {
    id: 137, category: "설정",
    title: "비밀번호 관리자 앱 설치",
    title_en: "Install Password Manager App",
    desc: "브라우저를 열지 않고도 저장된 비밀번호를 즉시 확인하고 관리할 수 있도록 전용 앱을 설치합니다.",
    desc_en: "Install Chrome Password Manager as a standalone app on your desktop for quick access without opening the browser.",
    shortcut: { win: "설정 > 비밀번호 관리자 > '앱으로 설치'", mac: "설정 > 비밀번호 관리자 > '앱으로 설치'" },
    shortcut_en: { win: "Settings > Password Manager > 'Install as App'", mac: "Settings > Password Manager > 'Install as App'" },
    tags: ["비밀번호", "보안", "앱설치", "매니저", "설정"],
    tags_en: ["password", "security", "install app", "manager", "settings"]
  },
  {
    id: 140, category: "AI 기능",
    title: "주소창에서 @Gemini 호출",
    title_en: "Call @Gemini in Omnibox",
    desc: "별도 사이트 이동 없이 주소창에서 직접 Gemini에게 질문하고 답변을 얻을 수 있습니다.",
    desc_en: "Type '@gemini' in the address bar and press space to ask questions directly to AI.",
    shortcut: { win: "주소창에 @gemini 입력 > 스페이스", mac: "주소창에 @gemini 입력 > 스페이스" },
    shortcut_en: { win: "Type @gemini in address bar > Space", mac: "Type @gemini in address bar > Space" },
    tags: ["ai", "gemini", "제미나이", "질문", "주소창", "검색", "대화"],
    tags_en: ["ai", "gemini", "question", "omnibox", "address bar", "chat", "search"]
  },
  {
    id: 141, category: "AI 기능",
    title: "AI로 열린 탭 자동 정리",
    title_en: "Organize Tabs with AI",
    desc: "수십 개의 열려 있는 탭을 AI가 분석하여 주제별로 자동으로 그룹화해 줍니다. (현재 일부 지역 및 언어에서만 지원됩니다)",
    desc_en: "AI analyzes your many open tabs and automatically organizes them into relevant groups. (Currently available in select regions and languages)",
    shortcut: { win: "Ctrl+Shift+A > '탭 정리'", mac: "Cmd+Shift+A > '탭 정리'" },
    shortcut_en: { win: "Ctrl+Shift+A > 'Organize Tabs'", mac: "Cmd+Shift+A > 'Organize Tabs'" },
    tags: ["ai", "탭정리", "그룹화", "정리", "자동", "수많은탭", "생산성"],
    tags_en: ["ai", "organize tabs", "grouping", "cleanup", "auto", "many tabs", "productivity"],
    steps: ["단축키(Ctrl+Shift+A)를 누르거나, 창 위쪽의 '탭 검색' 아이콘(아래 화살표 모양)을 클릭하세요.", "아이콘은 창의 맨 왼쪽 또는 맨 오른쪽 끝에 위치할 수 있습니다.", "팝업창 상단의 '탭 정리' 메뉴를 선택합니다. (열린 탭이 5개 이상일 때 나타납니다)", "[정리] 버튼을 누르고 AI가 제안하는 그룹 이름을 확인하여 [그룹 만들기]를 클릭하세요."],
    steps_en: ["Press the shortcut (Ctrl+Shift+A) or click the 'Tab Search' icon (down arrow) at the top of the window.", "The icon may be located at the far left or far right of the tab bar.", "Select the 'Organize tabs' menu at the top of the popup. (Requires 5+ open tabs)", "Click [Organize], review the suggested group names, and click [Create group]."]
  },
  {
    id: 142, category: "AI 기능",
    title: "AI 글쓰기 도우미 (Help me write)",
    title_en: "Help Me Write (AI Assistant)",
    desc: "이메일, 댓글, 게시글 초안 작성이 막막할 때 AI가 맥락에 맞는 문장을 제안합니다. (현재 일부 지역 및 언어에서만 지원됩니다)",
    desc_en: "Stuck on a draft? Right-click in a text field and select 'Help me write' for AI-generated suggestions. (Currently available in select regions and languages)",
    shortcut: { win: "텍스트 입력창 우클릭 > '글쓰기 도움받기'", mac: "텍스트 입력창 우클릭 > '글쓰기 도움받기'" },
    shortcut_en: { win: "Right-click text field > 'Help me write'", mac: "Right-click text field > 'Help me write'" },
    tags: ["ai", "글쓰기", "도우미", "작문", "메일", "초안", "생성형ai"],
    tags_en: ["ai", "writing", "assistant", "draft", "email", "generative ai", "help me write"],
    steps: ["웹사이트의 댓글창, 메일 작성창 등 글을 쓸 수 있는 빈 칸을 클릭하세요.", "마우스 우클릭을 한 뒤 메뉴에서 '글쓰기 도움받기'를 선택합니다.", "원하는 주제나 키워드(예: 여행 후기, 정중한 거절)를 입력하세요.", "[생성]을 누르면 AI가 맥락에 맞는 초안을 작성해 줍니다."],
    steps_en: ["Click inside any empty text field (e.g., email draft, comment box).", "Right-click and select 'Help me write' from the menu.", "Enter a few keywords or the topic you want to write about.", "Click [Create] and AI will generate a draft for you to use."]
  },
  {
    id: 143, category: "AI 기능",
    title: "AI로 나만의 테마 만들기",
    title_en: "Create AI Custom Themes",
    desc: "분위기, 색상, 주제를 선택하면 AI가 세상에 하나뿐인 크롬 배경 테마를 생성해 줍니다. (현재 일부 지역 및 언어에서만 지원됩니다)",
    desc_en: "Choose a mood and subject, and AI will generate a unique Chrome theme just for you. (Currently available in select regions and languages)",
    shortcut: { win: "새 탭 > Chrome 맞춤설정 > AI로 만들기", mac: "새 탭 > Chrome 맞춤설정 > AI로 만들기" },
    shortcut_en: { win: "New Tab > Customize Chrome > Create with AI", mac: "New Tab > Customize Chrome > Create with AI" },
    link: "chrome://settings/customize",
    tags: ["ai", "테마", "배경", "맞춤설정", "디자인", "배경화면", "생성"],
    tags_en: ["ai", "theme", "background", "customize", "design", "wallpaper", "create"],
    steps: ["크롬에서 새 탭(Ctrl+T)을 여세요.", "화면 오른쪽 맨 아래에 있는 [Chrome 맞춤설정] 버튼(연필 아이콘)을 클릭합니다.", "사이드 패널에서 '테마 변경' > 'AI로 만들기'를 선택하세요.", "주제, 스타일, 분위기를 선택하고 [만들기]를 누르면 나만의 배경이 적용됩니다."],
    steps_en: ["Open a New Tab (Ctrl+T) in Chrome.", "Click the [Customize Chrome] button (pencil icon) at the very bottom right of the screen.", "In the side panel, select 'Change theme' > 'Create with AI'.", "Choose your subject, style, and mood, then click [Create] to apply your unique background."]
  },
  {
    id: 144, category: "AI 기능",
    title: "AI 방문 기록 스마트 검색",
    title_en: "Smart History Search with AI",
    desc: "정확한 사이트 주소가 기억나지 않을 때, 자연어로 질문하여 방문 기록을 찾을 수 있습니다. (현재 일부 지역 및 언어에서만 지원됩니다)",
    desc_en: "Can't remember the URL? Ask AI something like 'What was that shoe site I saw yesterday?' to find it in your history. (Currently available in select regions and languages)",
    shortcut: { win: "방문 기록(Ctrl+H) > AI 검색창", mac: "방문 기록(Cmd+Y) > AI 검색창" },
    shortcut_en: { win: "History(Ctrl+H) > AI Search", mac: "History(Cmd+Y) > AI Search" },
    tags: ["ai", "방문기록", "찾기", "검색", "자연어", "히스토리", "어제본거"],
    tags_en: ["ai", "history", "find", "search", "natural language", "smart search"]
  },
  {
    id: 145, category: "AI 기능",
    title: "Gemini Live로 대화하기",
    title_en: "Chat Live with Gemini",
    desc: "실시간 음성 또는 텍스트를 통해 Gemini와 끊김 없는 대화를 나누고 복잡한 작업을 지시할 수 있습니다.",
    desc_en: "Use voice or text to have fluid, real-time conversations with Gemini for complex task assistance.",
    shortcut: { win: "사이드 패널 > Gemini 아이콘 클릭", mac: "사이드 패널 > Gemini 아이콘 클릭" },
    shortcut_en: { win: "Side panel > Click Gemini icon", mac: "Side panel > Click Gemini icon" },
    tags: ["ai", "gemini", "제미나이", "대화", "실시간", "음성", "비서"],
    tags_en: ["ai", "gemini", "chat", "live", "voice", "assistant", "real-time"]
  },
  {
    id: 146, category: "AI 기능",
    title: "AI 기반 웹 이미지 수정",
    title_en: "AI Web Image Editing",
    desc: "웹상에 있는 이미지를 Gemini와 함께 분석하고, 원하는 스타일로 즉시 수정하거나 변형할 수 있습니다.",
    desc_en: "Analyze web images with Gemini and instantly edit or transform them into your desired style.",
    shortcut: { win: "이미지 우클릭 > Gemini로 편집", mac: "이미지 우클릭 > Gemini로 편집" },
    shortcut_en: { win: "Right-click image > Edit with Gemini", mac: "Right-click image > Edit with Gemini" },
    tags: ["ai", "이미지", "편집", "수정", "변형", "디자인", "gemini"],
    tags_en: ["ai", "image", "edit", "transform", "design", "gemini", "image editing"]
  },
  {
    id: 147, category: "AI 기능",
    title: "AI에게 질문하여 정보 찾기",
    title_en: "Ask AI for Web Info",
    desc: "현재 보고 있는 웹사이트의 방대한 내용을 AI가 분석하여 질문에 답하거나 핵심을 요약해 줍니다.",
    desc_en: "AI analyzes the current website and answers your questions or summarizes key information.",
    shortcut: { win: "주소창 @gemini 입력 > '이 페이지 요약해줘'", mac: "주소창 @gemini 입력 > '이 페이지 요약해줘'" },
    shortcut_en: { win: "Type @gemini in address bar > 'Summarize this page'", mac: "Type @gemini in address bar > 'Summarize this page'" },
    tags: ["ai", "요약", "분석", "정보", "웹사이트", "내용찾기", "생산성"],
    tags_en: ["ai", "summarize", "analyze", "info", "website", "content", "productivity"]
  },
  {
    id: 148, category: "AI 기능",
    title: "온디바이스 AI 모델 관리",
    title_en: "Manage On-Device AI Models",
    desc: "개인정보 보호를 위해 내 컴퓨터에서 직접 실행되는 생성형 AI 모델의 용량과 최적화 상태를 관리합니다. (현재 일부 지역 및 언어에서만 지원됩니다)",
    desc_en: "Manage the generative AI models running locally on your device for enhanced privacy and optimization. (Currently available in select regions and languages)",
    shortcut: { win: "설정 > 성능 > 생성형 AI 모델", mac: "설정 > 성능 > 생성형 AI 모델" },
    shortcut_en: { win: "Settings > Performance > Generative AI models", mac: "Settings > Performance > Generative AI models" },
    link: "chrome://settings/performance",
    tags: ["ai", "모델", "온디바이스", "개인정보", "보안", "최적화", "설정"],
    tags_en: ["ai", "model", "on-device", "privacy", "security", "optimization", "settings"]
  },
  {
    id: 149, category: "설정",
    title: "비밀번호 없는 로그인: 패스키(Passkeys)",
    title_en: "Login without Passwords: Passkeys",
    desc: "복잡한 비밀번호 대신 지문, 얼굴 인식, 화면 잠금 번호로 더 쉽고 안전하게 로그인할 수 있습니다.",
    desc_en: "Use fingerprint, face scan, or screen lock to sign in more securely and easily without typing passwords.",
    shortcut: { win: "설정 > 비밀번호 관리자 > 패스키", mac: "설정 > 비밀번호 관리자 > 패스키" },
    shortcut_en: { win: "Settings > Password Manager > Passkeys", mac: "Settings > Password Manager > Passkeys" },
    link: "chrome://password-manager/passkeys",
    tags: ["보안", "패스키", "로그인", "지문", "얼굴인식", "비밀번호", "passkey"],
    tags_en: ["security", "passkey", "login", "fingerprint", "face id", "password", "no password"]
  },
  {
    id: 150, category: "주소창/검색",
    title: "온라인 결제용 가상 카드 번호",
    title_en: "Virtual Card Numbers for Shopping",
    desc: "실제 카드 번호 대신 1회용 가상 번호를 사용하여 카드 정보 유출 위험을 원천 차단합니다. (현재 주로 미국 내 카드사에서 지원됩니다)",
    desc_en: "Use a virtual card number instead of your actual card details to protect your financial information online. (Currently mainly supported by US issuers)",
    shortcut: { win: "설정 > 결제 수단 > '가상 카드 번호' 활성화", mac: "설정 > 결제 수단 > '가상 카드 번호' 활성화" },
    shortcut_en: { win: "Settings > Payment methods > Enable 'Virtual card'", mac: "Settings > Payment methods > Enable 'Virtual card'" },
    link: "chrome://settings/payments",
    tags: ["쇼핑", "결제", "카드", "보안", "가상카드", "구글페이", "해킹방지"],
    tags_en: ["shopping", "payment", "card", "security", "virtual card", "google pay", "hack protection"]
  },
  {
    id: 151, category: "설정",
    title: "유출된 비밀번호 즉시 확인",
    title_en: "Check for Leaked Passwords",
    desc: "내 비밀번호가 외부에 유출되었는지 AI가 실시간으로 확인하고 위험한 사이트를 알려줍니다.",
    desc_en: "AI checks if your saved passwords have been compromised in a data breach and alerts you immediately.",
    shortcut: { win: "설정 > 비밀번호 관리자 > 진단", mac: "설정 > 비밀번호 관리자 > 진단" },
    shortcut_en: { win: "Settings > Password Manager > Checkup", mac: "Settings > Password Manager > Checkup" },
    link: "chrome://password-manager/checkup",
    tags: ["보안", "비밀번호", "유출", "해킹", "진단", "점검", "위험"],
    tags_en: ["security", "password", "leak", "hack", "checkup", "safety", "danger"]
  },
  {
    id: 152, category: "설정",
    title: "비밀번호/패스키 가져오기/내보내기",
    title_en: "Import/Export Passwords",
    desc: "다른 브라우저나 비밀번호 관리 앱에서 사용하던 데이터를 크롬으로 옮기거나 백업할 수 있습니다.",
    desc_en: "Easily move your saved passwords and passkeys between Chrome and other browsers or manager apps.",
    shortcut: { win: "설정 > 비밀번호 관리자 > 설정 > 가져오기", mac: "설정 > 비밀번호 관리자 > 설정 > 가져오기" },
    shortcut_en: { win: "Settings > Password Manager > Settings > Import", mac: "Settings > Password Manager > Settings > Import" },
    tags: ["데이터", "비밀번호", "백업", "가져오기", "내보내기", "이사", "이동"],
    tags_en: ["data", "password", "backup", "import", "export", "migration", "move"]
  },
  {
    id: 153, category: "주소창/검색",
    title: "주소 및 결제 자동 완성 관리",
    title_en: "Manage Address & Payment Autofill",
    desc: "주소나 카드 정보를 한 번만 저장해두면, 쇼핑몰 양식을 일일이 입력할 필요 없이 자동으로 채워줍니다.",
    desc_en: "Save your address and card info once, and Chrome will automatically fill out shopping forms for you.",
    shortcut: { win: "설정 > 주소 및 기타 정보", mac: "설정 > 주소 및 기타 정보" },
    shortcut_en: { win: "Settings > Addresses and more", mac: "Settings > Addresses and more" },
    link: "chrome://settings/addresses",
    tags: ["자동완성", "주소", "카드", "쇼핑", "편리", "양식", "입력"],
    tags_en: ["autofill", "address", "card", "shopping", "convenient", "form", "fill"]
  },
  {
    id: 154, category: "주소창/검색",
    title: "Google Pay로 카드 혜택 관리",
    title_en: "Manage Card Benefits via Google Pay",
    desc: "결제 시 가장 많은 혜택(포인트, 할인 등)을 받을 수 있는 카드를 AI가 추천하고 자동 적용합니다. (현재 일부 지역 및 언어에서만 지원됩니다)",
    desc_en: "AI recommends and applies the best card for points or discounts during checkout via Google Pay. (Currently available in select regions and languages)",
    shortcut: { win: "설정 > 결제 수단 > 카드 혜택", mac: "설정 > 결제 수단 > 카드 혜택" },
    shortcut_en: { win: "Settings > Payment methods > Card benefits", mac: "Settings > Payment methods > Card benefits" },
    tags: ["결제", "카드", "혜택", "포인트", "할인", "구글페이", "쇼핑"],
    tags_en: ["payment", "card", "benefit", "points", "discount", "google pay", "shopping"]
  },
  {
    id: 155, category: "시스템",
    title: "보안 점검(Safety Check) 실행",
    title_en: "Run Chrome Safety Check",
    desc: "업데이트 상태, 비밀번호 노출 여부, 위험한 확장 프로그램을 한 번에 검사하여 브라우저를 보호합니다.",
    desc_en: "Protects your browser by checking updates, password leaks, and harmful extensions all at once.",
    shortcut: { win: "설정 > 개인정보 보호 및 보안 > '지금 확인'", mac: "설정 > 개인정보 보호 및 보안 > '지금 확인'" },
    shortcut_en: { win: "Settings > Privacy and security > 'Check now'", mac: "Settings > Privacy and security > 'Check now'" },
    link: "chrome://settings/safetyCheck",
    tags: ["보안", "점검", "업데이트", "확장프로그램", "비밀번호", "검사", "바이러스"],
    tags_en: ["security", "checkup", "update", "extension", "password", "scan", "virus"]
  },
  {
    id: 156, category: "다른 기기로 Chrome 사용",
    platform: "mac",
    title: "iPhone Dock에 Chrome 추가",
    title_en: "Add Chrome to iPhone Dock",
    desc: "iPhone의 기본 브라우저를 Chrome으로 설정하고 Dock에 고정하여 편리하게 사용하세요.",
    desc_en: "Set Chrome as your default browser and pin it to the iPhone Dock for quick access.",
    shortcut: { win: "설정 > 기본 앱 > Chrome", mac: "설정 > 기본 앱 > Chrome" },
    tags: ["mac", "iphone", "ios", "아이폰", "연동", "기본브라우저"],
    tags_en: ["mac", "iphone", "ios", "sync", "default browser"]
  },
  {
    id: 157, category: "다른 기기로 Chrome 사용",
    platform: "mac",
    title: "Mac Touch Bar 컨트롤 활용",
    title_en: "Mac Touch Bar Controls",
    desc: "MacBook의 Touch Bar에 Chrome의 '뒤로 가기', '새 탭' 버튼 등을 표시하여 더 빠르게 제어합니다.",
    desc_en: "Use Chrome controls (Back, New Tab, etc.) on your MacBook's Touch Bar for faster navigation.",
    shortcut: { win: "시스템 설정 > 키보드 > Touch Bar", mac: "시스템 설정 > 키보드 > Touch Bar" },
    tags: ["mac", "맥북", "터치바", "touchbar", "제어", "단축키"],
    tags_en: ["mac", "macbook", "touch bar", "control", "shortcut"]
  }
];

let tagToTipsMap = null;

/**
 * [최적화] 태그 별 팁 맵 (Inverted Index) 생성
 * 전체 팁을 순회하지 않고도 관련 팁을 빠르게 찾기 위함
 */
function getTagToTipsMap() {
  if (tagToTipsMap) return tagToTipsMap;
  tagToTipsMap = new Map();
  tips.forEach(tip => {
    const allTags = [...(tip.tags || []), ...(tip.tags_en || [])];
    allTags.forEach(tag => {
      const lowerTag = tag.toLowerCase();
      if (!tagToTipsMap.has(lowerTag)) tagToTipsMap.set(lowerTag, new Set());
      tagToTipsMap.get(lowerTag).add(tip);
    });
  });
  return tagToTipsMap;
}

export function findRelatedTips(sourceTipId, count = 3) {
  const sourceTip = tips.find(t => t.id === sourceTipId);
  if (!sourceTip || !sourceTip.tags || sourceTip.tags.length === 0) return [];

  const map = getTagToTipsMap();
  const sourceTags = sourceTip.tags.map(t => t.toLowerCase());
  const candidates = new Set();
  
  // 소스 팁의 태그를 포함하는 팁들만 후보군으로 선택
  sourceTags.forEach(tag => {
    if (map.has(tag)) {
      map.get(tag).forEach(tip => {
        if (tip.id !== sourceTipId) candidates.add(tip);
      });
    }
  });

  const scores = Array.from(candidates)
    .map(tip => {
      const commonTags = (tip.tags || []).filter(tag => sourceTags.includes(tag.toLowerCase()));
      const categoryBonus = tip.category === sourceTip.category ? 1 : 0;
      const score = commonTags.length + categoryBonus;
      return { tip, score };
    })
    .filter(item => item.score > 0) // 점수가 있는 경우만 포함
    .sort((a, b) => b.score - a.score);

  return scores.slice(0, count).map(item => item.tip);
}
