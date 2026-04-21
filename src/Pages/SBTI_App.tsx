import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { StartScreen } from '../components/StartScreen';
import { QuestionScreen } from '../components/QuestionScreen';
import { InnerTransitionScreen } from '../components/InnerTransitionScreen';
import { InnerQuizScreen } from '../components/InnerQuizScreen';
import { ResultScreen } from '../components/ResultScreen';
import { IdeaScreen } from '../components/IdeaScreen';

import { allQuestions } from '../data/questions';
import { sbtiCharacters, Character } from '../data/characters';
import {
    calculateResult,
    getTrumpCharacter,
} from '../utils/engine';
import { DimensionWeight } from '../data/questions';

type AppState = 'start' | 'test' | 'inner_transition' | 'inner_quiz' | 'result' | 'submit_idea';

const STORAGE_KEY = 'sbti_unlocked_v4';

// 生成兑换码逻辑
export const generateExchangeCode = (charId: string) => {
    if (!charId) return '';
    try {
        const salt = "BLUE_PRIDE";
        const scrambled = charId.split('').reverse().join('') + salt;
        const hash = btoa(encodeURIComponent(scrambled)).replace(/[/+=]/g, '');
        const randomPart = hash.substring(0, 6).toUpperCase();
        return `SBTI-${randomPart}`;
    } catch (e) {
        return `SBTI-ERR${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    }
};

export default function SBTI_App() {
    // ── 核心状态 ──
    const [appState, setAppState] = useState<AppState>('start');
    const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
    const [exchangeInput, setExchangeInput] = useState('');
    const [result, setResult] = useState<Character | null>(null);

    // ── 答题进度状态 ──
    const [currentQIdx, setCurrentQIdx] = useState(0);
    const [normalAnswers, setNormalAnswers] = useState<{ idx: number; weights: DimensionWeight[] }[]>([]);
    const [innerTargetCharId, setInnerTargetCharId] = useState<string | null>(null);

    // ── 初始化：从 LocalStorage 加载已解锁档案 ──
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setUnlockedIds(JSON.parse(saved));
            } catch (e) {
                console.error("加载存档失败", e);
            }
        }
    }, []);

    // ── 持久化保存解锁状态 ──
    const saveUnlocked = (id: string) => {
        setUnlockedIds(prev => {
            if (prev.includes(id)) return prev;
            const next = [...prev, id];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            return next;
        });
    };
    useEffect(() => {
        const requirementIds = [
            'mourinho', 'conte', 'tuchel', 'ancelotti', 'dimatteo', 'lampard'
        ];

        const isAbraUnlocked = unlockedIds.includes('abramovich');

        if (!isAbraUnlocked) {
            const allRequirementsMet = requirementIds.every(id => unlockedIds.includes(id));

            if (allRequirementsMet) {
                // 触发自动解锁
                saveUnlocked('abramovich');

                const abra = sbtiCharacters.find(c => c.id === 'abramovich');
                if (abra) {
                    // 延迟一点点，体验更好
                    setTimeout(() => {
                        alert("💎 蓝桥遗产集齐！\n\n检测到您已集齐五位功勋主帅与传奇中场，“俄罗斯寡头”档案已自动归档。");
                        setResult(abra);
                        setAppState('result');
                    }, 300);
                }
            }
        }
    }, [unlockedIds]);
    // ── 处理口令兑换 (带 CJ 专属后门拦截系统) ──
    const handleExchange = () => {
        const rawInput = exchangeInput.trim().toUpperCase();
        if (!rawInput) return;

        // 🌟 1. 识别是否触发了“开发者后门”
        // 只要你输入的是 CJ- 开头，系统就判定你是上帝模式
        const isBackdoor = rawInput.startsWith('CJ-');

        // 🌟 2. 还原真实的比对口令
        // 如果你用了特权码，系统悄悄把 CJ- 换回 SBTI- 去比对；否则就用普通的输入
        const inputToVerify = isBackdoor ? rawInput.replace('CJ-', 'SBTI-') : rawInput;

        // 🌟 3. 去数据库里寻找这个口令对应的人
        const matchedChar = sbtiCharacters.find(char => generateExchangeCode(char.id) === inputToVerify);

        if (matchedChar) {
            // 🌟 4. 核心拦截：普通玩家想用 SBTI- 偷渡隐藏角色？直接拦截！
            if (!isBackdoor && matchedChar.rarity !== 'common') {
                alert("🔒 该档案为隐藏/神级彩蛋，无法通过常规口令直接兑换！请在测试中亲自探索。");
                return; // 强行中断，不给他们解锁
            }

            // 🌟 5. 通过安检，执行发牌逻辑
            if (unlockedIds.includes(matchedChar.id)) {
                alert('该档案已在记录中，无需重复兑换');
            } else {
                saveUnlocked(matchedChar.id);
                alert(`🎉 成功解锁档案：${matchedChar.nickname}`);
                setExchangeInput('');
            }
        } else {
            alert('无效的访问口令');
        }
    };

    // ── 处理普通 20 题答题推进 ──
    const handleNormalAnswer = (optIdx: number) => {
        const currentQ = allQuestions[currentQIdx];
        const newAnswers = [
            ...normalAnswers,
            { idx: currentQIdx, weights: currentQ.options[optIdx].weights }
        ];
        setNormalAnswers(newAnswers);

        if (currentQIdx < allQuestions.length - 1) {
            setCurrentQIdx(prev => prev + 1);
        } else {
            // 20 题全部完成，执行计算并进入结果页
            const res = calculateResult(newAnswers);
            setResult(res);
            saveUnlocked(res.id);
            setAppState('result');
        }
    };

    // ── 处理隐藏彩蛋触发 (坎特、兰帕德等) ──
    const handleSpecialTrigger = (charId: string) => {
        setInnerTargetCharId(charId);
        setAppState('inner_transition');
    };

    // ── 返回首页并彻底重置所有中间状态 ──
    const handleHome = () => {
        setAppState('start');
        setCurrentQIdx(0);
        setNormalAnswers([]);
        setResult(null);
        setInnerTargetCharId(null);
    };

    return (
        <div className="min-h-screen font-sans antialiased overflow-x-hidden selection:bg-blue-100">

            <AnimatePresence mode="wait">

                {/* 1. 首页模式 */}
                {appState === 'start' && (
                    <StartScreen
                        key="start"
                        onStart={() => setAppState('test')}
                        onTrump={() => {
                            const t = getTrumpCharacter();
                            saveUnlocked(t.id);
                            setResult(t);
                            setAppState('result');
                        }}
                        onViewCharacter={(char) => {
                            setResult(char);
                            setAppState('result');
                        }}
                        onGoSubmit={() => setAppState('submit_idea')}
                        unlockedIds={unlockedIds}
                        sbtiCharacters={sbtiCharacters}
                        exchangeInput={exchangeInput}
                        setExchangeInput={setExchangeInput}
                        onExchange={handleExchange}
                    />
                )}

                {/* 2. 普通 20 题答题模式 */}
                {appState === 'test' && (
                    <QuestionScreen
                        key={`q-${currentQIdx}`}
                        question={allQuestions[currentQIdx]}
                        index={currentQIdx}
                        total={allQuestions.length}
                        onAnswer={handleNormalAnswer}
                        onSpecialTrigger={handleSpecialTrigger}
                        onBack={() => {
                            if (currentQIdx > 0) {
                                setCurrentQIdx(prev => prev - 1);
                                setNormalAnswers(prev => prev.slice(0, -1));
                            }
                        }}
                        onHome={handleHome}
                    />
                )}

                {/* 3. 里模式转场 (黑屏过场) */}
                {appState === 'inner_transition' && (
                    <InnerTransitionScreen
                        key="inner_transition"
                        characterId={innerTargetCharId || 'ivanovic'}
                        onComplete={() => setAppState('inner_quiz')}
                        onIgnore={() => {
                            // 🌟 核心修复 1：根据是谁触发的，决定忽略后退回到哪里
                            if (innerTargetCharId === 'ivanovic') {
                                setAppState('result'); // 伊万是从结果页来的，退回结果页
                            } else {
                                setAppState('test');   // 其他人是做题中途来的，退回做题页继续
                            }
                        }}
                    />
                )}

                {/* 4. 里模式核心答题 (6题挑战) */}
                {appState === 'inner_quiz' && (
                    <InnerQuizScreen
                        key={`inner-quiz-${innerTargetCharId}`}
                        characterId={innerTargetCharId || 'ivanovic'}
                        onSuccess={(charId) => {
                            // 精确匹配角色档案
                            const char = sbtiCharacters.find(c => c.id.toLowerCase() === charId.toLowerCase());
                            if (char) {
                                setResult(char);
                                saveUnlocked(char.id);
                                setAppState('result'); // 成功跳转
                            } else {
                                console.warn(`未匹配到角色档案: ${charId}，执行保底跳转`);
                                setAppState('result');
                            }
                        }}
                        onFail={() => {
                            // 🌟 核心修复 2：答题失败或主动退出时的“智能退回”
                            if (innerTargetCharId === 'ivanovic') {
                                setAppState('result');
                            } else {
                                setAppState('test'); // 完美保留进度，继续当前的普通测试！
                            }
                        }}
                    />
                )}

                {/* 5. 创意投递页 */}
                {appState === 'submit_idea' && (
                    <IdeaScreen key="idea" onBack={handleHome} />
                )}

                {/* 6. 最终结果显示页 */}
                {appState === 'result' && result && (
                    <ResultScreen
                        key={`result-${result.id}`}
                        character={result}
                        onRetry={handleHome}
                        shareCode={generateExchangeCode(result.id)}
                        onIvanovicTrigger={() => {
                            setInnerTargetCharId('ivanovic');
                            setAppState('inner_transition');
                        }}
                    />
                )}

            </AnimatePresence>
        </div>
    );
}