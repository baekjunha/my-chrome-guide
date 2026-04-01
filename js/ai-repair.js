/**
 * My Chrome Handbook - AI Macro Repair Module (v1.0)
 * Handles communication with LLM (Chrome window.ai or External API).
 */
(function(global) {
  const MacroAI = {
    /**
     * AI를 통해 새로운 타겟 식별자를 탐색합니다.
     */
    async repairTarget(originalIntent, contextMap) {
      const target = typeof originalIntent === 'string' ? originalIntent : (originalIntent?.target || "");
      console.debug('[MacroAI] Repairing target for:', target);
      
      // 1. Chrome 내장 Gemini Nano 지원 확인 (window.ai)
      if (global.ai && global.ai.canCreateTextSession) {
        try {
          const status = await global.ai.canCreateTextSession();
          if (status === 'readily') {
            return await this._repairWithLocalAI(originalIntent, contextMap);
          }
        } catch (e) {
          console.warn('[MacroAI] Local AI check failed, falling back...');
        }
      }

      // 2. Fallback: Mock 처리 (향후 서버 API 연동 지점)
      return await this._repairWithHeuristics(originalIntent, contextMap);
    },

    /**
     * Chrome Built-in AI (Gemini Nano)를 활용한 복구
     */
    async _repairWithLocalAI(intent, context) {
      const session = await global.ai.createTextSession();
      const prompt = this._buildPrompt(intent, context);
      
      try {
        const response = await session.prompt(prompt);
        return this._parseAIResponse(response, context);
      } finally {
        session.destroy();
      }
    },

    /**
     * 전용 프롬프트 생성 (지능형 매칭 유도)
     */
    _buildPrompt(intent, context) {
      return `
        Task: Find the best replacement for a missing element in a web page.
        Current URL: ${window.location.href}
        Original Intent: ${intent.type} on "${intent.target}"
        
        Available Elements (Context Map):
        ${JSON.stringify(context.slice(0, 40))} 

        Instructions:
        1. Analyze original intent and text.
        2. Consider synonyms (e.g., "Login" matches "Sign in").
        3. Even if the text doesn't match perfectly, pick the one that serves the same purpose.
        4. Return ONLY the index of the element.
      `;
    },

    /**
     * AI 응답 파싱 및 유효성 검사
     */
    _parseAIResponse(response, context) {
      const match = response.match(/\d+/);
      if (match) {
        const index = parseInt(match[0], 10);
        if (context[index]) {
          return {
            success: true,
            index: index,
            text: context[index].text || context[index].id || context[index].ariaLabel,
            confidence: 0.9
          };
        }
      }
      return { success: false };
    },

    /**
     * AI 미지원 시 휴리스틱 기반 유사도 매칭 (Fuzzy Fallback)
     */
    async _repairWithHeuristics(intent, context) {
      const targetText = (typeof intent === 'string' ? intent : (intent?.target || "")).toLowerCase().trim();
      if (!targetText) return { success: false };
      
      // 가중치 기반 정밀 매칭 (Weight-based Heuristic)
      const scored = context.map((el, index) => {
        let score = 0;
        const elText = (el.text || "").toLowerCase().trim();
        const elLabel = (el.ariaLabel || "").toLowerCase().trim();
        const elPlaceholder = (el.placeholder || "").toLowerCase().trim();
        const elId = (el.id || "").toLowerCase().trim();
        const elName = (el.name || "").toLowerCase().trim();
        
        // 1. 완전 일치 (Exact Match)
        if (elText === targetText || elLabel === targetText) score += 100;
        
        // 2. 포함 관계 (Partial Match)
        else if (elText.includes(targetText) || targetText.includes(elText)) score += 60;
        else if (elLabel.includes(targetText) || targetText.includes(elLabel)) score += 50;
        
        // 3. 속성 매칭 (Attribute Match)
        if (elPlaceholder.includes(targetText)) score += 40;
        if (elId.includes(targetText) || elName.includes(targetText)) score += 30;

        // 4. 의미론적 유사성 보정 (Semantic Boost)
        // 'Login' -> 'Signin', 'Join' -> 'Signup' 등
        const semantics = [
          ['login', 'signin', 'sign in', '로그인', '접속', '시트'],
          ['signup', 'join', 'register', '회원가입', '등록'],
          ['search', 'find', 'query', '검색', '찾기'],
          ['confirm', 'submit', 'ok', 'yes', '확인', '전송'],
          ['cancel', 'close', 'no', '취소', '닫기']
        ];

        semantics.forEach(group => {
          if (group.some(word => targetText.includes(word))) {
            if (group.some(word => elText.includes(word) || elLabel.includes(word))) {
              score += 40;
            }
          }
        });
        
        return { index, score };
      }).filter(s => s.score > 0).sort((a, b) => b.score - a.score);

      if (scored.length > 0 && scored[0].score > 40) {
        const best = context[scored[0].index];
        return {
          success: true,
          index: scored[0].index,
          text: best.text || best.ariaLabel || best.placeholder || best.id,
          confidence: Math.min(scored[0].score / 100, 0.95)
        };
      }

      return { success: false };
    }
  };

  global.MacroAI = MacroAI;
})(window);
