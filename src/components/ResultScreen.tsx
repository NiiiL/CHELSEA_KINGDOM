import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
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
      // 这里的配置针对移动端导出做了优化
      const dataUrl = await toPng(resultRef.current, {
        cacheBust: true, // 强制重新拉取图片，避免缓存污染 canvas
        backgroundColor: '#fafafa',
        pixelRatio: 2,   // 2倍清晰度，iOS 不易崩溃
        style: {
          transform: 'none', // 确保导出时没有 CSS 变换导致的偏移
        },
      });

      const link = document.createElement('a');
      link.download = `SBTI-${character.code}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('导出图片失败:', err);
      alert('保存失败，请尝试直接截图');
    }
  };

  const imagePath = `/Image/${character.code}.png`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen font-light text-neutral-800 antialiased"
      style={{
        backgroundColor: '#fafafa',
        backgroundImage:
          'repeating-linear-gradient(-45deg, rgba(0,0,0,0.015) 0, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 12px)',
      }}
    >
      <main ref={resultRef} className="max-w-4xl mx-auto py-12 px-4 flex flex-col gap-2 bg-[#fafafa]">
        {/* ── Hero Section ─────────────────────────────────────── */}
        <section className="relative bg-white border border-neutral-200/60 shadow-sm overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-400 z-20" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-400 z-20" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-400 z-20" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-400 z-20" />

          <div className="relative flex flex-col items-center text-center p-8 sm:p-12">
            {/* Character Image - 修正点 */}
            <div className="relative w-full aspect-square max-w-[580px] mb-8 z-10 mx-auto">
              <img
                src={imagePath}
                alt={character.prototype}
                // 重要：必须设置 crossOrigin，否则移动端导出时该图会消失
                crossOrigin="anonymous"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/600x600/f8f9fa/adb5bd?text=' + character.code;
                }}
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>

            <div className="space-y-2 relative z-10 w-full mb-6">
              <p className="text-sm font-bold text-neutral-400 uppercase tracking-[0.3em]">你的人格类型是</p>
              <h2 className="text-5xl sm:text-8xl font-regular tracking-tight text-neutral-900 mt-2">
                {character.nickname}
              </h2>
              <div className="text-base sm:text-xl text-neutral-500 font-normal tracking-widest uppercase mt-1 mb-4">
                {character.prototype}
              </div>

              {(character.rarity === 'inner' || character.rarity === 'god') && (
                <div className="flex flex-col items-center">
                  <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 border rounded-sm ${character.rarity === 'inner' ? 'border-red-200/50 bg-red-50/50' : 'border-amber-200/50 bg-amber-50/50'
                    }`}>
                    <div className={`w-1 h-1 rounded-full ${character.rarity === 'inner' ? 'bg-red-400' : 'bg-amber-400'}`} />
                    <span className={`text-[10px] font-medium ${character.rarity === 'inner' ? 'text-red-700' : 'text-amber-700'}`}>
                      {character.rarity === 'inner' ? 'SS 级 · 模式解锁' : '神级彩蛋 · 隐藏解锁'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── 解读 ─────────────────────────────────────────────── */}
        <section className="relative bg-white border border-neutral-200/60 p-6 md:p-10">
          <h3 className="text-base font-bold text-neutral-900 mb-6 flex items-center gap-2">解读该人格</h3>
          <div className="text-[18px] md:text-[20px] font-regular text-neutral-800 leading-relaxed space-y-4">
            <p>{character.description}</p>
            <p className="italic text-blue-900 border-t border-neutral-50 pt-4">
              「{character.tagline}」
            </p>
          </div>
        </section>

        {/* ── 维度标签 ────────────────────────────────────────── */}
        <section className="relative bg-white border border-neutral-200/60 p-6 md:p-10">
          <div className="flex flex-wrap gap-2">
            {character.tags.map((tag) => (
              <span key={tag} className="text-[16px] md:text-[18px] text-neutral-900 border border-neutral-300/80 px-3 py-1 rounded-sm">
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {/* ── 战术数据面板 ──────────────────────────────────────── */}
        <section className="relative bg-white border border-blue-900/10 p-6 md:p-8">
          <h3 className="text-base font-bold text-blue-900 mb-6 flex items-center gap-2">
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
                      className={`h-full rounded-sm relative ${isOverLimit ? 'bg-gradient-to-r from-yellow-400 to-red-500' : 'bg-blue-500'}`}
                    />
                  </div>
                  <span className={`w-8 font-bold text-xs ${isOverLimit ? 'text-red-600 animate-pulse' : 'text-blue-900'}`}>
                    {val}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 按钮组 (截图不包含此部分) ─────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-12 w-full">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={onRetry}
              className="px-8 py-3 border border-neutral-300 bg-white text-neutral-900 text-sm hover:bg-neutral-50 transition-colors"
            >
              重新测试
            </button>
            <button
              onClick={handleShare}
              className="px-8 py-3 bg-neutral-900 text-white text-sm hover:bg-neutral-800 transition-colors"
            >
              保存鉴定报告
            </button>
          </div>
        </div>
      </main>
    </motion.div>
  );
}