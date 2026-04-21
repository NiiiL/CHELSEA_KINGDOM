import { sbtiCharacters, Character, Dimensions } from '../data/characters';
// 📢 重点修复：在这里引入了 DimensionType
import { DimensionWeight, DimensionType } from '../data/questions';

export function calculateResult(answers: { idx: number; weights: DimensionWeight[] }[]): Character {
  // 1. 累加用户的维度得分
  const userScore: Record<DimensionType, number> = {
    AGG: 0, MEN: 0, HUS: 0, TEC: 0, CLU: 0, PRE: 0, DUR: 0, FLA: 0
  };

  answers.forEach(ans => {
    ans.weights.forEach(w => {
      userScore[w.dimension] += w.value;
    });
  });

  // 2. 过滤掉特殊角色（里模式/神级彩蛋不参与常规匹配）
  // 确保过滤后的数组有值，避免越界
  const normalChars = sbtiCharacters.filter(c => !c.rarity || c.rarity === 'common');

  if (normalChars.length === 0) {
    throw new Error("没有找到任何普通角色，请检查 characters.ts 配置");
  }

  let bestMatch = normalChars[0];
  let highestSimilarity = -Infinity;

  // 3. 计算余弦相似度 (Cosine Similarity)
  for (const char of normalChars) {
    let dotProduct = 0;
    let userMagnitudeSq = 0;
    let charMagnitudeSq = 0;

    (Object.keys(userScore) as DimensionType[]).forEach(dim => {
      const uVal = userScore[dim] || 0;
      const cVal = char.dimensions[dim] || 0;

      dotProduct += uVal * cVal;
      userMagnitudeSq += uVal * uVal;
      charMagnitudeSq += cVal * cVal;
    });

    // 防止分母为 0
    const magnitude = Math.sqrt(userMagnitudeSq) * Math.sqrt(charMagnitudeSq);
    const similarity = magnitude === 0 ? 0 : dotProduct / magnitude;

    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      bestMatch = char;
    }
  }

  return bestMatch;
}

// ============================================================
// 辅助函数
// ============================================================
export function getCharacterById(id: string): Character {
  return sbtiCharacters.find(c => c.id === id)!;
}

// 注意：这里把 common 改为了 normal，与现在的逻辑保持一致
export function checkAbramovichUnlock(unlockedIds: string[]): boolean {
  return sbtiCharacters
    .filter(c => !c.rarity || c.rarity === 'common')
    .every(c => unlockedIds.includes(c.id));
}

export function getTrumpCharacter(): Character {
  return sbtiCharacters.find(c => c.id === 'trump')!;
}

export function getAbramovichCharacter(): Character {
  return sbtiCharacters.find(c => c.id === 'abramovich')!;
}