import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface StartScreenProps {
  onStart: () => void;
  onTrump: () => void;
  onViewCharacter?: (char: any) => void;
  onGoSubmit: () => void;
  unlockedIds: string[];
  sbtiCharacters: any[];
  exchangeInput: string;
  setExchangeInput: (val: string) => void;
  onExchange: () => void;
}

export function StartScreen({
  onStart, onTrump, onViewCharacter, unlockedIds, sbtiCharacters,
  exchangeInput, setExchangeInput, onExchange, onGoSubmit
}: StartScreenProps) {
  const [showGrid, setShowGrid] = useState(false);

  // ── 署名交互逻辑 (保留最后 11 次点击记录) ──────────────
  const [clickSequence, setClickSequence] = useState<string[]>([]);
  const targetSequence = ['C', 'J', 'O', 'N', 'T', 'H', 'E', 'B', 'E', 'A', 'T'];
  const signatureText = "CREATED BY C J O N T H E B E A T";

  const handleCharClick = (char: string) => {
    // 忽略空格点击
    if (char === ' ') return;

    const newSeq = [...clickSequence, char].slice(-11);
    setClickSequence(newSeq);

    if (newSeq.join('') === targetSequence.join('')) {
      onTrump(); // 🎉 触发彩蛋
      setClickSequence([]); // 触发后清空记录
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center p-6"
      style={{
        backgroundColor: '#fafafa',
        backgroundImage: `repeating-linear-gradient(-45deg, rgba(0,0,0,0.01) 0, rgba(0,0,0,0.01) 1px, transparent 1px, transparent 12px)`,
      }}
    >
      {/* ── 1. 主体内容区 ── */}
      <div className="max-w-2xl w-full flex flex-col items-center mt-4">

        {/* 档案与口令集成模块 */}
        <div className="w-full max-w-[1000px] bg-white border border-neutral-200/60 mb-8 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-neutral-400" />
          <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-neutral-400" />

          <div className="p-5 pb-4">
            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <h2 className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.3em]">Archive Progress</h2>
                <p className="text-lg font-light text-neutral-900 leading-none">
                  已收集人格档案 <span className="font-semibold text-blue-600">
                    {((unlockedIds.length / sbtiCharacters.length) * 100).toFixed(0)}%
                  </span>
                </p>
              </div>
              <button onClick={() => setShowGrid(!showGrid)} className="text-[9px] font-bold text-neutral-400 underline underline-offset-4 hover:text-blue-600 transition-colors uppercase tracking-widest">
                {showGrid ? 'Close / 收起' : 'Detail / 详情'}
              </button>
            </div>

            <AnimatePresence>
              {showGrid && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="mt-4 border-t border-neutral-100 pt-4 max-h-[45vh] overflow-y-auto pr-1">
                    {[
                      { key: 'god', label: '超稀有彩蛋角色', color: 'border-amber-500', hover: 'hover:border-amber-500' },
                      { key: 'inner', label: '里模式角色（SS级）', color: 'border-red-600', hover: 'hover:border-red-600' },
                      { key: 'common', label: '普通角色', color: 'border-blue-600', hover: 'hover:border-blue-600' }
                    ].map((group) => (
                      <div key={group.key} className="mb-6">
                        <h3 className={`text-[9px] font-bold text-neutral-800 uppercase tracking-[0.2em] mb-2 border-l-2 pl-2 ${group.color}`}>
                          {group.label}
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                          {sbtiCharacters.filter(c => c.rarity === group.key).map(char => {
                            const isUnlocked = unlockedIds.includes(char.id);
                            const isGod = group.key === 'god';
                            const isInner = group.key === 'inner';
                            const isCommon = group.key === 'common';

                            let gradientFrom = isGod ? 'from-amber-900/80' : isInner ? 'from-red-900/80' : isCommon ? 'from-blue-900/80' : 'from-black/80';

                            return (
                              <div key={char.id} onClick={() => isUnlocked && onViewCharacter?.(char)}
                                className={`aspect-square border transition-all duration-300 relative overflow-hidden group ${isUnlocked ? `bg-neutral-50 border-neutral-200 cursor-pointer ${group.hover}` : 'bg-transparent border-neutral-100 opacity-40 grayscale saturate-0'}`}>
                                {isUnlocked ? (
                                  <>
                                    <img src={`/Image/${char.code}.png`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${gradientFrom} via-transparent to-transparent opacity-90 z-10`} />
                                    <span className="absolute bottom-1 w-full text-[10px] font-bold text-white text-center z-20 px-0.5 truncate drop-shadow-sm">{char.nickname}</span>
                                  </>
                                ) : (
                                  <div className="flex flex-col items-center justify-center h-full p-1 bg-neutral-50/30">
                                    <span className="text-[12px] text-neutral-300 mb-0.5">?</span>
                                    <span className="text-[11px] text-neutral-500 font-extrabold text-center truncate w-full px-0.5">{char.nickname}</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-neutral-50/50 border-t border-neutral-100 p-4">
            <div className="max-w-[300px] mx-auto text-center space-y-3">
              <h4 className="text-[12px] font-bold text-neutral-400 uppercase tracking-[0.2em]">口令兑换区</h4>
              <div className="flex gap-2">
                <input value={exchangeInput} onChange={(e) => setExchangeInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onExchange()}
                  placeholder="输入11位口令解锁档案"
                  className="flex-1 bg-white border border-neutral-200 px-3 py-1.5 text-[12px] rounded-sm outline-none focus:border-slate-900 transition-all font-mono text-center tracking-widest uppercase placeholder:text-neutral-300" />
                <button onClick={onExchange} className="bg-neutral-900 text-white px-4 py-1.5 text-[12px] font-bold uppercase rounded-sm hover:bg-blue-600 transition-all active:scale-95">兑换</button>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. 主标题 ── */}
        <div className="text-center mb-10 mt-8">
          <h1 className="text-7xl font-medium tracking-tighter text-blue-600 italic flex items-baseline justify-center">
            SBTI
            {/* 加入 v1.0，调小字号、调整粗细，并拉开一点左侧边距 */}
            <span className="text-2xl font-light ml-2 tracking-normal">v1.0</span>
          </h1>
          <p className="text-[13px] font-regular text-neutral-300 uppercase tracking-[0.3em] mt-1 pl-1">
            Stamford Bridge Type Indicator
          </p>
        </div>

        {/* ── 3. 开始测试按钮 ── */}
        <div className="w-full max-w-[1000px] mb-12">
          <button onClick={onStart} className="w-full p-7 text-left border bg-neutral-900 border-neutral-900 text-white transition-all active:scale-[0.98] group relative overflow-hidden">
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-normal tracking-tight mb-0.5">开始测试</h3>
                <p className="text-[9px] uppercase tracking-widest text-neutral-400">20 题 · 切尔西SBTI测试</p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-blue-600 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </div>
            </div>
          </button>
        </div>

        <button onClick={onGoSubmit} className="px-8 py-3 border border-neutral-200 text-neutral-400 text-[13px] font-regular uppercase hover:text-blue-600 hover:border-blue-200 transition-all mb-4">
          点子转会窗口 / Idea Transfer Window
        </button>

      </div>

      {/* ── 3. 署名彩蛋区 (仅 CJONTHEBEAT 可点) ── */}
      <div className="relative z-50 w-full pb-32 pt-6 text-center text-[10px] text-neutral-400 tracking-[0.2em] select-none">

        {/* 静态文字部分：独立禁用点击，防止误触 */}
        <span className="opacity-80 mr-2 pointer-events-none">MADE BY</span>

        {/* 交互字母部分 */}
        {"CJONTHEBEAT".split('').map((char, index) => (
          <span
            key={index}
            // 核心修复 1：将 onClick 替换为 onPointerDown，实现“按下即触发”，拒绝判定延迟
            onPointerDown={() => handleCharClick(char)}
            // 核心修复 2：加入 touch-manipulation 禁止双击放大，保证高频连击能 100% 录入
            className="inline-block cursor-pointer transition-all duration-100 active:text-neutral-900 active:scale-150 md:hover:text-neutral-900 py-3 px-1.5 sm:py-2 sm:px-[3px] touch-manipulation"
          >
            {char}
          </span>
        ))}
      </div>
    </motion.div>
  );
}