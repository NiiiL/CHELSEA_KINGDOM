import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, DimensionWeight } from '../data/questions';

interface QuestionScreenProps {
  question: Question;
  index: number;
  total: number;
  onAnswer: (optionIndex: number) => void;
  onSpecialTrigger?: (charId: string, answer: { idx: number; weights: DimensionWeight[] }) => void;
  onBack: () => void;
  onHome: () => void;
}

export function QuestionScreen({
  question,
  index,
  total,
  onAnswer,
  onSpecialTrigger,
  onBack,
  onHome,
}: QuestionScreenProps) {
  const questionNumber = index + 1; // 1-based

  // ── 通用选中状态 ───────────────────────────────────────────
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // ── Q10 阿扎尔: 汉堡状态 ──────────────────────────────────
  const [showBurger, setShowBurger] = useState(false);

  // ── Q09 卢卡库: 煲汤状态 ──────────────────────────────────
  const [lukakuState, setLukakuState] = useState<'idle' | 'brewing' | 'catch' | 'missed'>('idle');
  const lukakuTimer1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lukakuTimer2 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lukakuTimer3 = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Q07 坎特: 蓝点状态 ────────────────────────────────────
  const [showBlueDot, setShowBlueDot] = useState(false);
  const [blueDotPos, setBlueDotPos] = useState({ x: 50, y: 50 });
  const blueDotTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blueDotAnim = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Q08 兰帕德: 进度条"8"点击状态 ─────────────────────────
  const [lampardNumClicked, setLampardNumClicked] = useState(false);

  // ── Q19 科斯塔: 快速点击计数 ──────────────────────────────
  const costaClickCount = useRef(0);
  const costaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [costaShake, setCostaShake] = useState(false);

  // 题目切换时清理状态
  useEffect(() => {
    setSelectedIdx(null);
    setShowBlueDot(false);
    setLampardNumClicked(false);
    setShowBurger(false); // 切换题目时隐藏汉堡
    costaClickCount.current = 0;
    setCostaShake(false);

    setLukakuState('idle');
    if (lukakuTimer1.current) clearTimeout(lukakuTimer1.current);
    if (lukakuTimer2.current) clearTimeout(lukakuTimer2.current);
    if (lukakuTimer3.current) clearTimeout(lukakuTimer3.current);

    if (blueDotTimer.current) clearTimeout(blueDotTimer.current);
    if (blueDotAnim.current) clearInterval(blueDotAnim.current);
    if (costaTimer.current) clearTimeout(costaTimer.current);
  }, [question.id]);

  // ── 蓝点弹跳动画 ──────────────────────────────────────────
  const startBlueDotBounce = useCallback(() => {
    setBlueDotPos({ x: 20 + Math.random() * 60, y: 20 + Math.random() * 60 });
    blueDotAnim.current = setInterval(() => {
      setBlueDotPos({ x: 5 + Math.random() * 80, y: 10 + Math.random() * 70 });
    }, 800);
  }, []);

  // ── 核心点击处理 ──────────────────────────────────────────
  const processNormalAnswer = (optIdx: number) => {
    setSelectedIdx(optIdx);
    setTimeout(() => {
      onAnswer(optIdx);
      setSelectedIdx(null);
    }, 400);
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLButtonElement>, optIdx: number) => {
    if (selectedIdx !== null) return;

    // 如果在阿扎尔这题不小心点了正常的选项按钮，就把汉堡收回去
    if (showBurger) setShowBurger(false);

    const isTriggerOption = question.triggerOption === optIdx && !!question.triggerChar;

    // ══════════════════════════════════════════════════════
    // Q09 卢卡库 — “煲汤：传给 3 秒后的自己”
    // ══════════════════════════════════════════════════════
    if (questionNumber === 9) {
      if (lukakuState === 'brewing' || lukakuState === 'missed') {
        return;
      }
      if (lukakuState === 'catch') {
        if (isTriggerOption) {
          if (lukakuTimer2.current) clearTimeout(lukakuTimer2.current);
          setLukakuState('idle');
          onSpecialTrigger?.(question.triggerChar!, {
            idx: optIdx,
            weights: question.options[optIdx].weights,
          });
        }
        return;
      }
      if (isTriggerOption && lukakuState === 'idle') {
        setLukakuState('brewing');
        lukakuTimer1.current = setTimeout(() => {
          setLukakuState('catch');
          lukakuTimer2.current = setTimeout(() => {
            setLukakuState('missed');
            lukakuTimer3.current = setTimeout(() => {
              processNormalAnswer(optIdx);
            }, 500);
          }, 500);
        }, 800);
        return;
      }
    }

    // ══════════════════════════════════════════════════════
    // Q07 坎特 — 蓝点触发
    // ══════════════════════════════════════════════════════
    if (questionNumber === 7 && isTriggerOption) {
      if (showBlueDot) return;
      setShowBlueDot(true);
      startBlueDotBounce();
      blueDotTimer.current = setTimeout(() => {
        if (blueDotAnim.current) clearInterval(blueDotAnim.current);
        setShowBlueDot(false);
        processNormalAnswer(optIdx);
      }, 10000);
      return;
    }

    // ══════════════════════════════════════════════════════
    // Q08 兰帕德 — 必须先点进度条"8"
    // ══════════════════════════════════════════════════════
    if (questionNumber === 8 && isTriggerOption) {
      if (lampardNumClicked) {
        onSpecialTrigger?.(question.triggerChar!, {
          idx: optIdx,
          weights: question.options[optIdx].weights,
        });
        return;
      }
      processNormalAnswer(optIdx);
      return;
    }

    // ══════════════════════════════════════════════════════
    // Q11 维尔纳 — 点击选项右侧空白区触发
    // ══════════════════════════════════════════════════════
    if (questionNumber === 11 && isTriggerOption) {
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      if (relX > rect.width * 0.70) {
        onSpecialTrigger?.(question.triggerChar!, {
          idx: optIdx,
          weights: question.options[optIdx].weights,
        });
        return;
      }
      processNormalAnswer(optIdx);
      return;
    }

    // ══════════════════════════════════════════════════════
    // Q19 科斯塔 — 连续点击
    // ══════════════════════════════════════════════════════
    if (questionNumber === 19 && isTriggerOption) {
      costaClickCount.current += 1;
      setCostaShake(true);
      setTimeout(() => setCostaShake(false), 300);

      if (costaClickCount.current >= 3) {
        if (costaTimer.current) clearTimeout(costaTimer.current);
        costaClickCount.current = 0;
        onSpecialTrigger?.(question.triggerChar!, {
          idx: optIdx,
          weights: question.options[optIdx].weights,
        });
        return;
      }

      if (costaTimer.current) clearTimeout(costaTimer.current);
      costaTimer.current = setTimeout(() => {
        costaClickCount.current = 0;
        processNormalAnswer(optIdx);
      }, 2000);
      return;
    }

    // ══════════════════════════════════════════════════════
    // Q20 帕尔默 — 精准点击按钮中心
    // ══════════════════════════════════════════════════════
    if (questionNumber === 20 && isTriggerOption) {
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const inCenterX = relX > rect.width * 0.375 && relX < rect.width * 0.625;
      const inCenterY = relY > rect.height * 0.375 && relY < rect.height * 0.625;
      if (inCenterX && inCenterY) {
        onSpecialTrigger?.(question.triggerChar!, {
          idx: optIdx,
          weights: question.options[optIdx].weights,
        });
        return;
      }
      processNormalAnswer(optIdx);
      return;
    }

    // ── 普通答题 ───────────────────────────────────────────
    processNormalAnswer(optIdx);
  };

  const handleBlueDotClick = () => {
    if (blueDotTimer.current) clearTimeout(blueDotTimer.current);
    if (blueDotAnim.current) clearInterval(blueDotAnim.current);
    setShowBlueDot(false);
    onSpecialTrigger?.(question.triggerChar!, {
      idx: question.triggerOption!,
      weights: question.options[question.triggerOption!].weights,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen p-6 pt-12 md:pt-24"
      style={{
        backgroundColor: '#fafafa',
        backgroundImage: `repeating-linear-gradient(-45deg, rgba(0,0,0,0.015) 0, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 12px)`,
      }}
    >
      <div className="max-w-xl w-full mx-auto flex flex-col flex-1 relative bg-white border border-neutral-200/60 p-10 shadow-sm">
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-400" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-400" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-400" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-400" />

        {/* Progress Header */}
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-[0.4em]">Survey Module</span>
            <h3 className="text-4xl font-light text-neutral-900 leading-none">
              Q
              {questionNumber === 8 ? (
                <span
                  onClick={() => setLampardNumClicked(true)}
                  className={`cursor-pointer transition-colors ${lampardNumClicked ? 'text-blue-600' : 'text-neutral-900 hover:text-blue-400'}`}
                  title=""
                >
                  08
                </span>
              ) : (
                String(questionNumber).padStart(2, '0')
              )}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              {questionNumber} / {total}
            </span>
            <div className="w-20 h-[1px] bg-neutral-100 mt-2 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: questionNumber / total }}
                className="h-full bg-blue-600 origin-left"
              />
            </div>
          </div>
        </div>

        {/* Question Text */}
        <div className="flex-1 mb-12">
          <motion.p
            key={question?.id || 'empty-q'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl font-normal text-neutral-800 leading-tight"
          >
            {question?.text || '加载题目中...'}
          </motion.p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-12">
          {question?.options?.map((opt, i) => {
            const isWerner = questionNumber === 11 && question.triggerOption === 2 && i === 2;

            // 🌟 判断当前选项是否是阿扎尔的特殊选项
            const isHazardTarget = questionNumber === 10 && question.triggerOption === i && !!question.triggerChar;

            // 卢卡库判定与文字/样式状态
            const isLukakuTarget = questionNumber === 9 && question.triggerOption === 1 && i === 1;

            let optText = opt.text;
            if (isLukakuTarget) {
              if (lukakuState === 'brewing') optText = '⚽ 爆趟！传给3秒后的自己...';
              else if (lukakuState === 'catch') optText = '🔥 追上了！快点击接球！';
              else if (lukakuState === 'missed') optText = '👍 跑太快球出界了，给队友点个赞吧';
            }

            const lukakuClasses =
              isLukakuTarget && lukakuState === 'brewing' ? 'opacity-70 border-dashed cursor-wait' :
                isLukakuTarget && lukakuState === 'catch' ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-md animate-pulse' :
                  isLukakuTarget && lukakuState === 'missed' ? 'bg-neutral-100 text-neutral-400 line-through' : '';

            return (
              <div key={i} className="relative w-full">
                <motion.button
                  onClick={(e) => handleOptionClick(e, i)}
                  transition={{ duration: 0.15 }}
                  className={`w-full p-6 text-left border transition-all duration-300 relative group select-none
                    ${selectedIdx === i
                      ? 'bg-neutral-900 border-neutral-900 text-white translate-x-1 outline-none'
                      : 'bg-white border-neutral-200/60 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900'
                    }
                    ${costaShake && questionNumber === 19 && question.triggerOption === 0 && i === 0 ? 'animate-[shake_0.3s_ease]' : ''}
                    ${lukakuClasses}
                  `}
                >
                  {/* Werner 空白触发区提示 */}
                  {isWerner && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] text-neutral-200 select-none pointer-events-none">
                      ...
                    </span>
                  )}

                  {/* 选项文字显示 (加大了右边距 pr-12，防止文字和隐形热区重叠) */}
                  <span className="text-sm font-medium tracking-tight pr-12 block">{optText}</span>

                  {/* 🌟 核心修改点：把原有的细线放进一个 48x48 的隐形热区里，完美适配手机手指点击 */}
                  <div
                    onClick={(e) => {
                      if (isHazardTarget) {
                        e.preventDefault();
                        e.stopPropagation(); // 阻止按钮普通的跳转逻辑
                        setShowBurger(true); // 呼叫汉堡！
                      }
                    }}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center
                      ${isHazardTarget ? 'cursor-pointer z-20 pointer-events-auto' : 'pointer-events-none'}
                    `}
                  >
                    {/* 这是原本那根一模一样的细线 */}
                    <div className={`h-[1px] transition-all
                      ${selectedIdx === i ? 'bg-blue-400 w-8' : 'bg-neutral-200 group-hover:bg-neutral-400 w-4'}`}
                    />
                  </div>
                </motion.button>

                {/* 🌟 向上弹出的 Q弹汉堡 */}
                <AnimatePresence>
                  {isHazardTarget && showBurger && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.3, y: 0 }}
                      animate={{ opacity: 1, scale: 1, y: -45 }}
                      exit={{ opacity: 0, scale: 0, y: 0 }}
                      transition={{ type: "spring", bounce: 0.6, duration: 0.5 }}
                      onClick={(e) => {
                        e.stopPropagation(); // 阻止跳转
                        setShowBurger(false);
                        onSpecialTrigger?.(question.triggerChar!, {
                          idx: i,
                          weights: opt.weights,
                        });
                      }}
                      className="absolute right-4 top-1/2 text-4xl cursor-pointer z-50 drop-shadow-xl hover:scale-110 transition-transform origin-bottom"
                      title="享用汉堡"
                    >
                      🍔
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-neutral-50">
          <button
            onClick={onBack}
            className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] hover:text-neutral-900 transition-colors"
          >
            {index > 0 ? '← Previous / 返回' : ''}
          </button>
          <button
            onClick={onHome}
            className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] hover:text-red-600 transition-colors"
          >
            Exit / 退出
          </button>
        </div>
      </div>

      {/* ── Q05 坎特蓝点 ── */}
      {showBlueDot && (
        <motion.button
          onClick={handleBlueDotClick}
          animate={{ left: `${blueDotPos.x}%`, top: `${blueDotPos.y}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 10 }}
          className="fixed z-50 flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white text-[10px] font-bold shadow-lg shadow-blue-300 cursor-pointer select-none"
          style={{ translateX: '-50%', translateY: '-50%' }}
        >
          坎特
        </motion.button>
      )}
    </motion.div>
  );
}