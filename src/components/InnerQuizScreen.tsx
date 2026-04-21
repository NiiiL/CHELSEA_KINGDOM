import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getInnerCharacterData, InnerChoiceQuestion } from '../data/innerQuestions';

interface InnerQuizScreenProps {
  characterId: string;
  onSuccess: (charId: string) => void;
  onFail: () => void;
}

// 随机打乱数组
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 文字答案归一化（去空格、转小写、去标点）
function normalizeAnswer(s: string): string {
  return s.trim().toLowerCase().replace(/[\s\u3000]/g, '').replace(/[+＋]/g, '+');
}

export function InnerQuizScreen({ characterId, onSuccess, onFail }: InnerQuizScreenProps) {
  const data = getInnerCharacterData(characterId);
  const [questions, setQuestions] = useState<(InnerChoiceQuestion | { type: 'text'; text: string; correctAnswers: string[] })[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [textInput, setTextInput] = useState('');
  const [textState, setTextState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [failMessage, setFailMessage] = useState(false);
  const lockRef = useRef(false);

  useEffect(() => {
    if (!data) return;
    const picked = shuffle(data.pool).slice(0, 5);
    const allQs = [...picked, data.finalQuestion];
    const shuffledQs = allQs.map(q => {
      if (q.type === 'choice') {
        const originalOptions = [...q.options];
        const correctAnswerText = originalOptions[q.correctIndex]; // 记住正确答案的文字

        const newOptions = shuffle(originalOptions); // 打乱选项
        const newCorrectIndex = newOptions.indexOf(correctAnswerText); // 找到正确答案在新数组里的位置

        return {
          ...q,
          options: newOptions,
          correctIndex: newCorrectIndex
        };
      }
      return q; // 填空题原样返回
    });

    setQuestions(shuffledQs);
  }, [characterId, data]);


  if (!data || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p className="text-sm text-gray-400">加载中...</p>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const totalQ = questions.length; // 6

  const handleChoiceClick = (optIdx: number) => {
    if (lockRef.current || answerState !== 'idle') return;
    lockRef.current = true;

    const q = currentQ as InnerChoiceQuestion;
    const isCorrect = optIdx === q.correctIndex;
    setSelectedOpt(optIdx);
    setAnswerState(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setTimeout(() => {
        if (currentIdx < totalQ - 1) {
          setCurrentIdx(prev => prev + 1);
          setSelectedOpt(null);
          setAnswerState('idle');
          lockRef.current = false;
        } else {
          onSuccess(characterId);
        }
      }, 800);
    } else {
      // 答错 → 显示提示 → 失败
      setTimeout(() => {
        setFailMessage(true);
        setTimeout(() => {
          onFail();
        }, 1500);
      }, 600);
    }
  };

  const handleTextSubmit = () => {
    if (lockRef.current || textState !== 'idle') return;
    const q = currentQ as { type: 'text'; text: string; correctAnswers: string[] };
    const norm = normalizeAnswer(textInput);
    const isCorrect = q.correctAnswers.some(a => normalizeAnswer(a) === norm);
    lockRef.current = true;
    setTextState(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setTimeout(() => {
        onSuccess(characterId);
      }, 800);
    } else {
      setTimeout(() => {
        setFailMessage(true);
        setTimeout(() => {
          onFail();
        }, 1500);
      }, 600);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen bg-black text-white p-6 pt-12"
    >
      <div className="max-w-xl w-full mx-auto flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.4em] mb-1">Inner Quiz</p>
            <h3 className="text-3xl font-light text-white leading-none">
              Q{String(currentIdx + 1).padStart(2, '0')}
              <span className="text-neutral-600 text-lg ml-1">/ {totalQ}</span>
            </h3>
          </div>
          <div className="w-24 h-[1px] bg-neutral-800 overflow-hidden">
            <motion.div
              animate={{ scaleX: (currentIdx + 1) / totalQ }}
              className="h-full bg-red-600 origin-left"
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1"
          >
            <p className="text-lg font-light text-gray-200 leading-relaxed mb-10">
              {currentQ.text}
            </p>

            {/* Choice */}
            {currentQ.type === 'choice' && (
              <div className="space-y-3">
                {(currentQ as InnerChoiceQuestion).options.map((opt, i) => {
                  const q = currentQ as InnerChoiceQuestion;
                  let bg = 'bg-transparent border-neutral-800 text-gray-300 hover:border-neutral-600 hover:text-white';
                  if (selectedOpt === i) {
                    if (answerState === 'correct') bg = 'bg-emerald-900/40 border-emerald-500 text-emerald-200';
                    else if (answerState === 'wrong') bg = 'bg-red-900/40 border-red-500 text-red-200';
                  } else if (answerState === 'wrong' && i === q.correctIndex) {
                    bg = 'bg-emerald-900/20 border-emerald-700 text-emerald-400';
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleChoiceClick(i)}
                      disabled={answerState !== 'idle'}
                      className={`w-full p-5 text-left border transition-all text-sm font-normal tracking-wide ${bg}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Text Input */}
            {currentQ.type === 'text' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={textInput}
                  onChange={e => setTextInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleTextSubmit()}
                  disabled={textState !== 'idle'}
                  placeholder="输入你的答案..."
                  className={`w-full p-5 bg-transparent border text-sm font-light text-white placeholder-neutral-700 outline-none transition-colors
                    ${textState === 'correct' ? 'border-emerald-500 text-emerald-200'
                      : textState === 'wrong' ? 'border-red-500 text-red-200'
                        : 'border-neutral-700 focus:border-neutral-400'}`}
                />
                <button
                  onClick={handleTextSubmit}
                  disabled={textState !== 'idle' || !textInput.trim()}
                  className="w-full p-4 bg-transparent border border-neutral-700 text-gray-400 text-xs font-bold uppercase tracking-widest hover:border-white hover:text-white transition-colors disabled:opacity-30"
                >
                  确认 / CONFIRM
                </button>
                {textState === 'correct' && (
                  <p className="text-emerald-400 text-xs text-center tracking-widest">✓ 正确</p>
                )}
                {textState === 'wrong' && (
                  <p className="text-red-400 text-xs text-center tracking-widest">✗ 答案错误</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* 失败提示 */}
        <AnimatePresence>
          {failMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
            >
              <div className="text-center space-y-3">
                <p className="text-3xl font-light text-red-400 tracking-widest">未解锁</p>
                <p className="text-xs text-neutral-600 uppercase tracking-[0.3em]">Returning to test...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
