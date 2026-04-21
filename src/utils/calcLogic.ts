import { Character, Dimensions, sbtiCharacters } from '../data/characters';
export function calculateUserDimensions(answers: any[]): Dimensions {
    const finalScore: Dimensions = {
        AGG: 0, MEN: 0, HUS: 0, TEC: 0, CLU: 0, PRE: 0, DUR: 0, FLA: 0
    };

    // 遍历所有答案
    answers.forEach(ans => {
        // 确保 ans 和 ans.weights 存在
        if (ans && ans.weights && Array.isArray(ans.weights)) {
            // 遍历权重数组：[{ dimension: 'MEN', value: 1 }, ...]
            ans.weights.forEach((w: { dimension: keyof Dimensions; value: number }) => {
                finalScore[w.dimension] += w.value;
            });
        }
    });

    return finalScore;
}

// 核心匹配算法
export function getBestMatchCharacter(userScore: Dimensions): Character {
    let bestMatch: Character | null = null;
    let minDistance = Infinity;

    // 1. 过滤掉神级和里模式角色，只在 common 里匹配
    const commonCharacters = sbtiCharacters.filter(c => c.rarity === 'common');

    commonCharacters.forEach(char => {
        let distance = 0;
        const charTarget = char.dimensions;

        // 2. 计算欧几里得多维距离 (差值的平方和)
        for (const key of Object.keys(userScore) as (keyof Dimensions)[]) {
            const diff = userScore[key] - charTarget[key];
            distance += diff * diff;
        }

        // 3. 距离越小，说明匹配度越高
        if (distance < minDistance) {
            minDistance = distance;
            bestMatch = char;
        }
    });

    return bestMatch || commonCharacters[0];
}