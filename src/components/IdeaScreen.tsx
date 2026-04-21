import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createClient } from '@supabase/supabase-js';

// 1. 初始化 Supabase
const supabase = createClient(
    'https://jtqcnfeqhrqetffgjcjz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cWNuZmVxaHJxZXRmZmdqY2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NDgyNDgsImV4cCI6MjA5MjEyNDI0OH0.4mbdjRaz5a7UFfgC8pdHokz80Hk_bntIdRVAPkebNf8'
);

export function IdeaScreen({ onBack }: { onBack: () => void }) {
    const [formData, setFormData] = useState({ nickname: '', target: '', idea: '', credit: '' });
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 获取留言列表
    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('idea_feedback')
                .select('*'); // 先简单获取所有字段

            if (error) {
                console.error("读取数据库失败:", error.message);
            } else {
                console.log("获取到的原始数据:", data); // 在 F12 控制台看看有没有东西

                // 安全排序：防止 created_at 为空导致报错
                const safeData = (data || []).sort((a, b) => {
                    const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
                    const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
                    return timeB - timeA;
                });

                setSubmissions(safeData);
            }
        } catch (err) {
            console.error("代码运行异常:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchSubmissions(); }, []);

    // 2. 修正后的提交逻辑 (移除了嵌套)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('idea_feedback')
                .insert([{
                    nickname: formData.nickname,
                    target: formData.target,
                    idea: formData.idea,
                    credit: formData.credit || '匿名'
                }]);

            if (error) throw error;

            // 成功后重置表单
            setFormData({ nickname: '', target: '', idea: '', credit: '' });
            alert('✨ 创意已成功上墙！');
            await fetchSubmissions();
        } catch (err: any) {
            console.error('详细错误:', err);
            alert('提交失败: ' + (err.message || '未知错误'));
        } finally {
            setIsSubmitting(false); // 确保按钮状态恢复
        }
    };

    // 点赞逻辑
    const handleLike = async (id: string, currentLikes: number) => {
        const { error } = await supabase
            .from('idea_feedback')
            .update({ likes: (currentLikes || 0) + 1 })
            .eq('id', id);

        if (!error) {
            setSubmissions(submissions.map(s => s.id === id ? { ...s, likes: (s.likes || 0) + 1 } : s));
        }
    };

    // 删除逻辑
    const handleDelete = async (id: string) => {
        const password = window.prompt('请输入管理员删除密码:');
        if (password !== 'Cjyan09010722') {
            alert('密码错误，无法删除');
            return;
        }

        const { error } = await supabase
            .from('idea_feedback')
            .delete()
            .eq('id', id);

        if (!error) {
            setSubmissions(submissions.filter(s => s.id !== id));
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#fafafa] p-6 pb-20 font-sans antialiased">
            <div className="max-w-2xl mx-auto space-y-12">

                {/* 表单卡片 */}
                <section className="bg-white p-8 rounded-xl shadow-sm border border-neutral-100">
                    <div className="text-center mb-10">
                        <h2 className="text-xl font-light tracking-tight text-neutral-800">点子转会窗口</h2>
                        <p className="text-[10px] text-neutral-300 uppercase tracking-[0.3em] mt-1">Idea Transfer Window</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input required placeholder="角色昵称" className="border-b border-neutral-100 py-2 outline-none text-sm focus:border-blue-500 transition-all bg-transparent" value={formData.nickname} onChange={e => setFormData({ ...formData, nickname: e.target.value })} />
                            <input required placeholder="对应人物" className="border-b border-neutral-100 py-2 outline-none text-sm focus:border-blue-500 transition-all bg-transparent" value={formData.target} onChange={e => setFormData({ ...formData, target: e.target.value })} />
                        </div>
                        <textarea required rows={3} placeholder="形象/服装/道具的想法..." className="w-full border border-neutral-100 p-3 rounded-lg text-sm outline-none focus:border-blue-500 transition-all" value={formData.idea} onChange={e => setFormData({ ...formData, idea: e.target.value })} />
                        <input placeholder="如何引用你 (例如 @小明)" className="w-full border-b border-neutral-100 py-2 outline-none text-sm focus:border-blue-500 transition-all bg-transparent" value={formData.credit} onChange={e => setFormData({ ...formData, credit: e.target.value })} />

                        <div className="flex gap-4 pt-4">
                            <button type="button" onClick={onBack} className="flex-1 py-3 border border-neutral-100 text-neutral-400 text-xs uppercase tracking-widest hover:bg-neutral-50 transition-all">回到主页</button>
                            <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-blue-600 text-white text-xs uppercase tracking-widest font-bold hover:bg-blue-700 transition-all shadow-md">
                                {isSubmitting ? '同步中...' : '提交创意'}
                            </button>
                        </div>
                    </form>
                </section>

                {/* 留言列表 */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-neutral-200 opacity-50"></div>
                        <span className="text-[10px] text-neutral-400 uppercase tracking-[0.4em]">近期收到的想法</span>
                        <div className="h-[1px] flex-1 bg-neutral-200 opacity-50"></div>
                    </div>

                    {loading ? (
                        <div className="text-center py-10 text-neutral-300 text-xs animate-pulse">正在从蓝色星辰获取数据...</div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            <AnimatePresence>
                                {submissions.map((item) => (
                                    <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-6 border border-neutral-100 rounded-lg shadow-sm group hover:border-blue-200 transition-all">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-blue-600 font-bold text-xs uppercase">[{item.nickname}]</span>
                                            <div className="flex items-center gap-4">
                                                <span className="text-[9px] text-neutral-300 font-mono">{new Date(item.created_at).toLocaleDateString()}</span>
                                                <button onClick={() => handleDelete(item.id)} className="opacity-0 group-hover:opacity-100 text-neutral-300 hover:text-red-500 transition-all text-[10px]">删除</button>
                                            </div>
                                        </div>

                                        <p className="text-[14px] text-neutral-700 leading-relaxed mb-6 italic">"{item.idea}"</p>

                                        <div className="flex justify-between items-center pt-4 border-t border-neutral-50">
                                            <span className="text-[10px] text-neutral-400 uppercase">Target: {item.target}</span>

                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => handleLike(item.id, item.likes)}
                                                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                                                >
                                                    <span className="text-xs">💙</span>
                                                    <span className="text-[10px] font-bold">{item.likes || 0}</span>
                                                </button>
                                                <span className="text-[10px] text-blue-900/40 font-bold tracking-widest uppercase">CREDIT: {item.credit}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </section>
            </div>
        </motion.div>
    );
}