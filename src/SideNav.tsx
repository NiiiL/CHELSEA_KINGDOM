import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';

export function SideNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);

    // 预判状态，用于错峰防卡顿
    const [targetIdx, setTargetIdx] = useState<number | null>(null);

    const isSBTI = location.pathname.includes('/sbti');
    const activeIdx = targetIdx !== null ? targetIdx : (isSBTI ? 1 : 0);

    const navItems = [
        { id: 'kingdom', label: 'KINGDOM', sup: '01', url: '/' },
        { id: 'sbti', label: 'SBTI', sup: '02', url: '/sbti' }
    ];

    // 页面跳转完成后，重置预判状态
    useEffect(() => {
        setTargetIdx(null);
    }, [location.pathname]);

    const handleNavClick = (e: React.MouseEvent, index: number, url: string) => {
        e.preventDefault();

        // 🌟 优化 1：如果点的就是当前页面，直接收起菜单，不刷新
        if (window.location.pathname === url) {
            setIsExpanded(false);
            return;
        }

        setTargetIdx(index);

        // 🌟 优化 2：立刻触发菜单收起动画，不干等！
        setIsExpanded(false);

        // 🌟 优化 3：等菜单收起动画（大约 400ms）一播完，丝滑跳转！
        setTimeout(() => {
            navigate(url);
        }, 400);
    };
    return (
        // 🌟 核心升级：双形态外壳！
        // 手机端：bottom-8 居于底部中心；电脑端 (md:)：靠左居中
        // pointer-events-none：让外壳像空气一样，不阻挡鼠标点击背后的卡片
        <div className="fixed z-[9999] pointer-events-none inset-x-0 bottom-8 flex justify-center md:inset-x-auto md:bottom-auto md:left-4 lg:left-6 md:top-0 md:h-full md:items-center">

            <motion.nav
                initial={false}
                animate={{
                    width: isExpanded ? 124 : 64,
                    height: isExpanded ? 220 : 64
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                // pointer-events-auto：恢复导航栏本身的点击能力
                className="pointer-events-auto relative flex flex-col items-center bg-[#1a1a1a]/95 backdrop-blur-md p-2 rounded-[30px] shadow-2xl border border-white/5 overflow-hidden"
            >
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="relative z-20 shrink-0 w-[48px] h-[48px] rounded-full flex items-center justify-center transition-transform hover:scale-105 outline-none cursor-pointer"
                >
                    <img
                        src="/Title_svg/mylogo.png"
                        alt="Logo"
                        className="w-10 h-10 object-contain"
                    />
                </button>

                <div className="flex flex-col w-[108px] shrink-0">
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                className="flex flex-col gap-1 mt-1"
                            >
                                {navItems.map((item, index) => {
                                    const isActive = activeIdx === index;
                                    return (
                                        <a
                                            key={item.id}
                                            href={item.url}
                                            onClick={(e) => handleNavClick(e, index, item.url)}
                                            className={`relative z-10 h-[48px] w-full flex items-center justify-center transition-colors duration-300 rounded-full select-none cursor-pointer ${isActive ? 'text-[#1a1a1a]' : 'text-white/60 hover:text-white'
                                                }`}
                                            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="vertical-island-pill"
                                                    className="absolute inset-0 bg-[#e5e5e5] rounded-full -z-10 shadow-sm"
                                                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                                                />
                                            )}
                                            <span className="font-bold tracking-tight text-[14px] uppercase">{item.label}</span>
                                            <sup className="text-[9px] ml-[2px] opacity-70 -translate-y-[4px]">{item.sup}</sup>
                                        </a>
                                    );
                                })}

                                <div className="flex items-center justify-between w-full mt-1 px-1.5 gap-1.5">
                                    <a href="https://weibo.com/u/6303450848" target="_blank" rel="noopener noreferrer" className="flex-1 h-[36px] flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/15 hover:text-white transition-all">
                                        <span className="font-bold text-[10px] tracking-widest" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>微博</span>
                                    </a>
                                    <a href="https://www.xiaohongshu.com/user/profile/629504180000000021021d31" target="_blank" rel="noopener noreferrer" className="flex-1 h-[36px] flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-[#ff2442]/80 hover:text-white hover:border-[#ff2442] transition-all">
                                        <span className="font-bold text-[10px] tracking-widest" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>小红书</span>
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>
        </div>
    );
}