import { motion } from 'motion/react';

interface InnerTransitionScreenProps {
  onComplete: () => void;
  // 🌟 新增一个关闭函数
  onIgnore: () => void;
  characterId: string;
}

export function InnerTransitionScreen({ onComplete, onIgnore }: InnerTransitionScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6"
    >
      <div className="max-w-md w-full space-y-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-xl font-serif italic text-gray-300"
        >
          「CJ检测到异常信号...你似乎解锁了一个隐藏角色，是否进入该角色专属答题通道？」
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-sm text-gray-600 font-mono tracking-widest"
        >
          SYSTEM OVERRIDE: 发现隐藏角色路径
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
          className="flex flex-col gap-4 pt-8"
        >
          <button
            // 🌟 核心修复：调用父组件传来的 onIgnore 函数，而不是刷新页面
            onClick={onIgnore}
            className="p-4 text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-[0.2em]"
          >
            忽略信号，继续测试 (IGNORE)
          </button>

          <button
            onClick={onComplete}
            className="p-5 bg-red-950/20 text-red-400 border border-red-900/30 hover:bg-red-900/30 hover:text-red-300 transition-all font-black uppercase tracking-widest cursor-pointer relative z-50"
          >
            进入隐藏专属答题通道 →
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}