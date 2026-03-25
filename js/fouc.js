// [최적화 1] 다크모드 눈뽕(FOUC) 방지 스크립트
(function() {
  chrome.storage.local.get('dark', (data) => {
    if (data.dark) document.body.classList.add('dark');
  });
})();
