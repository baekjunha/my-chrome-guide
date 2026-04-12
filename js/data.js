export let tips = [];

let tagToTipsMap = null;

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

export async function loadTips() {
  if (tips.length > 0) return tips;
  try {
    let res;
    try {
      res = await fetch('data/tips.json');
    } catch (e) {
      res = await fetch('../data/tips.json');
    }
    
    if (!res.ok) {
      throw new Error("HTTP Error: " + res.status);
    }
    
    const data = await res.json();
    // Use push to keep the array reference, though ES modules bindings are live
    tips.push(...data);
    return tips;
  } catch (e) {
    console.error("Failed to load tips data:", e);
    return [];
  }
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
