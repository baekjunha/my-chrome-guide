const fs = require('fs');

// 1. Update locales
const locales = ['ko', 'en'];
const newKeys = {
  ko: {
    macroCompleteTitle: { message: "🎉 매크로 완료!" },
    macroLoginWaitTitle: { message: "🔐 로그인 대기 중" },
    macroAIWaitTitle: { message: "🤖 AI 상호작용 중" },
    macroRunningTitle: { message: "실행 중" },
    macroCompleteDesc: { message: "모든 단계가 성공적으로 완료되었습니다." },
    macroTargetPrefix: { message: "타겟: " },
    macroRetryPrefix: { message: "(재시도 " },
    macroLoginWaitDesc: { message: "로그인이 필요해 보입니다. 로그인 후 계속됩니다..." },
    macroAIWaitDesc: { message: "AI가 대체 요소를 찾고 있습니다..." },
    macroTargetNotFound: { message: "요소를 찾을 수 없습니다." }
  },
  en: {
    macroCompleteTitle: { message: "🎉 Macro Complete!" },
    macroLoginWaitTitle: { message: "🔐 Waiting for Login" },
    macroAIWaitTitle: { message: "🤖 AI Interaction" },
    macroRunningTitle: { message: "Running" },
    macroCompleteDesc: { message: "All steps have been completed successfully." },
    macroTargetPrefix: { message: "Target: " },
    macroRetryPrefix: { message: "(Retry " },
    macroLoginWaitDesc: { message: "Login required. Will resume after login..." },
    macroAIWaitDesc: { message: "AI is finding alternative elements..." },
    macroTargetNotFound: { message: "Element not found." }
  }
};

locales.forEach(lang => {
  const path = `_locales/${lang}/messages.json`;
  if (fs.existsSync(path)) {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    Object.assign(data, newKeys[lang]);
    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
  }
});

// 2. Update content_script.js
let code = fs.readFileSync('content_script.js', 'utf8');

// I18N updates in updateStatusBadge
code = code.replace(
  /const title = complete \? "🎉 매크로 완료!" : \(isLogin \? "🔐 로그인 대기 중" : \(isAI \? "🤖 AI 상호작용 중" : `실행 중 \(\$\{current\}\/\$\{total\}\)`\)\);/,
  `const title = complete ? chrome.i18n.getMessage('macroCompleteTitle') : (isLogin ? chrome.i18n.getMessage('macroLoginWaitTitle') : (isAI ? chrome.i18n.getMessage('macroAIWaitTitle') : \`\${chrome.i18n.getMessage('macroRunningTitle')} (\${current}/\${total})\`));`
);

code = code.replace(
  /const subTitle = customMsg \|\| \(complete \? "모든 단계가 성공적으로 완료되었습니다." : `타겟: \$\{targetName\} \$\{retry > 0 \? `\(재시도 \$\{retry\}\)` : ''\}`\);/,
  `const subTitle = customMsg || (complete ? chrome.i18n.getMessage('macroCompleteDesc') : \`\${chrome.i18n.getMessage('macroTargetPrefix')}\${targetName} \${retry > 0 ? \`\${chrome.i18n.getMessage('macroRetryPrefix')}\${retry})\` : ''}\`);`
);

// I18N updates in runEngine
code = code.replace(/"로그인 대기 중\.\.\. 완료 후 자동으로 재개됩니다\."/g, "chrome.i18n.getMessage('macroLoginWaitDesc')");
code = code.replace(/"모든 단계가 성공적으로 완료되었습니다\."/g, "chrome.i18n.getMessage('macroCompleteDesc')");
code = code.replace(/"로그인이 필요해 보입니다\. 로그인 후 계속됩니다\.\.\."/g, "chrome.i18n.getMessage('macroLoginWaitDesc')");
code = code.replace(/"AI가 대체 요소를 찾고 있습니다\.\.\."/g, "chrome.i18n.getMessage('macroAIWaitDesc')");
code = code.replace(/"요소를 찾을 수 없습니다\."/g, "chrome.i18n.getMessage('macroTargetNotFound')");

// Performance Improvement: Replace MutationObserver with Polling
code = code.replace(
  /let observer = null;/,
  `let engineInterval = null;`
);

const oldObserverCode = `    function startObserver() {
      if (observer) return;
      const throttledRunEngine = throttle(() => runEngine(), 500);
      observer = new MutationObserver(throttledRunEngine);
      observer.observe(document.body, { childList: true, subtree: true });
    }

    function stopObserver() {
      if (observer) { observer.disconnect(); observer = null; }
    }`;

const newObserverCode = `    function startObserver() {
      if (engineInterval) return;
      engineInterval = setInterval(() => {
        if (!isProcessing) runEngine();
      }, 800); // Reduce DOM polling frequency to save battery and CPU
    }

    function stopObserver() {
      if (engineInterval) { clearInterval(engineInterval); engineInterval = null; }
    }`;

code = code.replace(oldObserverCode, newObserverCode);

fs.writeFileSync('content_script.js', code, 'utf8');
console.log('Script transformations applied successfully.');
