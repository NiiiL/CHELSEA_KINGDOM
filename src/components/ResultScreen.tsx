import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { toPng } from 'html-to-image';
import { Character, Dimensions } from '../data/characters';

interface ResultScreenProps {
  character: Character;
  onRetry: () => void;
  shareCode: string;
  onIvanovicTrigger: () => void;
}

const dimInfo: Record<keyof Dimensions, { name: string; desc: string }> = {
  AGG: { name: '侵略性 (AGG)', desc: '冲劲、对抗欲、脏活意愿' },
  MEN: { name: '心理韧性 (MEN)', desc: '大场面抗压、逆境表现' },
  HUS: { name: '积极性 (HUS)', desc: '跑动意愿、投入度' },
  TEC: { name: '技术流 (TEC)', desc: '传球/脚法/细腻程度' },
  CLU: { name: '关键时刻 (CLU)', desc: '决赛/补时/终结能力' },
  PRE: { name: '存在感 (PRE)', desc: '统治力、场上领袖感' },
  DUR: { name: '出勤率 (DUR)', desc: '全勤/伤病抵抗力' },
  FLA: { name: '风格感 (FLA)', desc: '个人风格、辨识度' },
};

const SPECIAL_STATS: Record<string, Dimensions> = {
  'lampard': { AGG: 8, MEN: 8, HUS: 8, TEC: 8, CLU: 8, PRE: 8, DUR: 99, FLA: 8 },
  'hazard': { AGG: 99, MEN: 10, HUS: 1, TEC: 99, CLU: 10, PRE: 10, DUR: 10, FLA: 10 },
  'costa': { AGG: 99, MEN: 10, HUS: 7, TEC: 7, CLU: 10, PRE: 8, DUR: 8, FLA: 10 },
  'palmer': { AGG: 7, MEN: 8, HUS: 6, TEC: 8, CLU: 10, PRE: 99, DUR: 8, FLA: 10 },
  'kante': { AGG: 7, MEN: 10, HUS: 99, TEC: 7, CLU: 7, PRE: 10, DUR: 10, FLA: 7 },
  'werner': { AGG: 8, MEN: 99, HUS: 10, TEC: 1, CLU: 5, PRE: 3, DUR: 9, FLA: 10 },
  'trump': { AGG: 99, MEN: 99, HUS: 99, TEC: 99, CLU: 99, PRE: 99, DUR: 99, FLA: 99 },
  'abramovich': { AGG: 100, MEN: 100, HUS: 100, TEC: 100, CLU: 100, PRE: 100, DUR: 100, FLA: 100 },
  'ivanovic': { AGG: 10, MEN: 8, HUS: 7, TEC: 6, CLU: 99, PRE: 10, DUR: 8, FLA: 7 },
  'lukaku': { AGG: 9, MEN: 1, HUS: 3, TEC: 8, CLU: 5, PRE: 4, DUR: 6, FLA: 99 },
};

export function ResultScreen({ character, onRetry, shareCode, onIvanovicTrigger }: ResultScreenProps) {
  const resultRef = useRef<HTMLDivElement>(null);
  const [authorOpen, setAuthorOpen] = useState(true);

  const handleShare = async () => {
    if (!resultRef.current) return;
    try {
      const el = resultRef.current;

      const dataUrl = await toPng(el, {
        cacheBust: true,      // 核心修复：强制刷新缓存，避免缓存导致图片抓取失败
        quality: 1,           // 最高质量
        backgroundColor: '#fafafa',
        pixelRatio: 2,        // 保持 2 倍清晰度，适配移动端且不至于内存溢出
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          margin: '0',
        },
      });

      const link = document.createElement('a');
      link.download = `SBTI-${character.code}-${character.prototype}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('保存报告失败:', err);
      alert('保存失败，请尝试长按截图');
    }
  };

  const imagePath = `/Image/${character.code}.png`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen font-light text-neutral-800 antialiased selection:bg-neutral-200 selection:text-black"
      style={{
        backgroundColor: '#fafafa',
        backgroundImage:
          'repeating-linear-gradient(-45deg, rgba(0,0,0,0.015) 0, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 12px)',
      }}
    >
      <main ref={resultRef} className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col gap-2 bg-[#fafafa]">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative bg-white border border-neutral-200/60 shadow-sm">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-400 z-10" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-400 z-10" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-400 z-10" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-400 z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-transparent to-neutral-100 opacity-50 pointer-events-none" />

          <div className="relative flex flex-col items-center text-center p-8 sm:p-12">
            {/* Character Image */}
            <div className="relative w-full aspect-square max-w-[580px] sm:max-w-[580px] mb-8 sm:mb-12 z-10 mx-auto">
              <img
                src={imagePath}
                alt={character.prototype}
                // 核心修复：允许跨域抓取，解决截图时不显示图片的问题
                crossOrigin="anonymous"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/600x600/f8f9fa/adb5bd?text=' + character.code;
                }}
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>

            {/* Names */}
            <div className="space-y-2 relative z-10 w-full mb-10">
              <p className="text-sm font-bold text-neutral-400 uppercase tracking-[0.3em]">你的人格类型是</p>
              <h2 className="text-4xl sm:text-8xl font-regular tracking-tight text-neutral-900 mt-2">
                {character.nickname}
              </h2>
              <div className="text-base sm:text-xl text-neutral-500 font-normal tracking-widest uppercase mt-1 mb-4">
                {character.prototype}
              </div>

              {(character.rarity === 'inner' || character.rarity === 'god') && (
                <div className="flex flex-col items-center">
                  {character.rarity === 'inner' && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-red-200/50 bg-red-50/50 rounded-sm">
                      <div className="w-1 h-1 rounded-full bg-red-400" />
                      <span className="text-[10px] text-red-700 font-medium">SS 级 · 模式解锁</span>
                    </div>
                  )}
                  {character.rarity === 'god' && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-amber-200/50 bg-amber-50/50 rounded-sm">
                      <div className="w-1 h-1 rounded-full bg-amber-400" />
                      <span className="text-[10px] text-amber-700 font-medium">神级彩蛋 · 隐藏解锁</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="text-[16px] text-neutral-500 leading-tight max-w-xl mx-auto relative z-10 border-t border-neutral-100 pt-4">
              {character.prototype} 的精神内核正在你的潜意识中共振。
            </p>
          </div>
        </section>

        {/* ── 解读 ─────────────────────────────────────────────── */}
        <section className="relative bg-white border border-neutral-200/60 p-6 sm:p-8 md:p-10">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-400" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-400" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-400" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-400" />

          <h3 className="text-base font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            该人格的简单解读
          </h3>
          <div className="text-[20px] font-regular text-neutral-800 leading-loose space-y-4">
            <p>{character.description}</p>
            <p className="text-bolditalic text-blue-900 border-t border-neutral-50 pt-4 font-medium">
              「{character.tagline}」
            </p>
          </div>
        </section>

        {/* ── 维度标签 ────────────────────────────────────────── */}
        <section className="relative bg-white border border-neutral-200/60 p-6 sm:p-8 md:p-10">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-400 z-10" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-400 z-10" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-400 z-10" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-400 z-10" />

          <h3 className="text-base font-bold text-neutral-900 mb-1 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
              <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 8v8" /><path d="M8 12h8" />
            </svg>
            维度标签
          </h3>

          <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-neutral-50">
            {character.tags.map((tag) => (
              <span key={tag} className="text-[18px] text-neutral-900 border border-neutral-300/80 px-3 py-1 rounded-sm">
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {/* ── 战术数据面板 ──────────────────────────────────────── */}
        <section className="relative bg-white border border-blue-900/10 p-6 md:p-8 mt-2">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-900/30" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-900/30" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-900/30" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-900/30" />

          <h3 className="text-base font-bold text-blue-900 mb-6 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
            </svg>
            战术数据面板 (Match Stats)
          </h3>

          <div className="space-y-4">
            {(Object.keys(dimInfo) as (keyof Dimensions)[]).map(key => {
              let val = SPECIAL_STATS[character.id]?.[key] ?? character.dimensions[key] ?? 0;
              const barWidth = Math.min((val / 10) * 100, 100);
              const isOverLimit = val > 10;

              return (
                <div key={key} className="flex items-center gap-4 text-sm">
                  <span className="w-24 text-right text-blue-900/70 font-medium text-xs">
                    {dimInfo[key].name}
                  </span>

                  <div className="flex-1 h-2.5 bg-neutral-200/50 rounded-sm overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-sm relative ${isOverLimit
                        ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500'
                        : 'bg-blue-500'
                        }`}
                    >
                      {isOverLimit && (
                        <motion.div
                          animate={{ opacity: [0, 0.6, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="absolute inset-0 bg-white"
                        />
                      )}
                    </motion.div>
                  </div>

                  <span className={`w-8 font-bold text-xs ${isOverLimit ? 'text-red-600 animate-pulse' : 'text-blue-900'
                    }`}>
                    {val}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 作者的话 ─────────────────────────────────────────── */}
        <section className="relative bg-white border border-neutral-200/60">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-400 z-10" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-400 z-10" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-400 z-10" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-400 z-10" />

          <div className="flex items-center justify-between p-6 border-b border-neutral-100">
            <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              作者的话
            </h3>
            <button
              onClick={() => setAuthorOpen(v => !v)}
              className="text-sm px-3 py-1 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors rounded-sm"
            >
              {authorOpen ? '收起' : '展开'}
            </button>
          </div>
          {authorOpen && (
            <div className="p-6 md:p-8 text-[16px] text-neutral-600 leading-loose space-y-4">
              <p>
                搞这个 SBTI 测试，初衷其实很简单：看球已经够累了，总得整点花活儿让自己开心。
                如果这个小测试能让你在看球之余乐呵一下，我这段时间的脑细胞就没白费。当然，现在的 26 个角色肯定装不下蓝军漫长历史里那些有趣的灵魂。如果你有任何炸裂的创意或想看的“新片场”，欢迎去主页的“创意投递窗口”砸向我。
                优秀的创意会被我直接收录进后续的更新计划里。Keep the Blue Flag Flying High!
              </p>
            </div>
          )}
        </section>


        {/* ── 友情提示 ─────────────────────────────────────────── */}
        <section className="relative bg-transparent border border-neutral-200/60 p-6 md:p-8">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-400" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-400" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-400" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-400" />
          <h3 className="text-base font-bold text-neutral-900 mb-3 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
              <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
            </svg>
            友情提示
          </h3>
          <p className="text-[16px] text-neutral-500 leading-relaxed">
            本测试仅供娱乐，别拿它去相亲，也别指望靠它
            <span
              onClick={onIvanovicTrigger}
              className="underline decoration-dotted cursor-help hover:text-red-500 transition-colors"
            >
              招魂
            </span>
            。如果测出来的结果让你不爽……那说明测试很准。感觉好玩的话记得发给朋友一起测！关注CJ的微博和小红书@CJONTHEBEAT了解更多内容和更新！
          </p>
        </section>

        {/* ── 操作按钮组 ─────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-12 w-full relative z-50">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={onRetry}
              className="px-8 py-3 border border-neutral-300 bg-white text-neutral-900 text-sm font-normal hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              重新测试
            </button>

            <button
              onClick={handleShare}
              className="px-8 py-3 bg-neutral-900 text-white text-sm font-normal hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              保存鉴定报告
            </button>
          </div>

          {(!character.rarity || character.rarity === 'common') && <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (shareCode) {
                navigator.clipboard.writeText(shareCode);
                alert(`序列号已复制：${shareCode}`);
              }
            }}
            className="w-full sm:w-auto px-8 py-3 border border-blue-600 text-blue-600 text-sm font-bold hover:bg-blue-50 transition-colors tracking-widest cursor-pointer"
          >
            生成分享口令
          </motion.button>}
        </div>
      </main>
    </motion.div>
  );
}