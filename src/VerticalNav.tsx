import { useState } from 'react';
import { motion } from 'motion/react';

const menuItems = [
  { id: 'home', label: 'CHELSEA KINGDOM', desc: '返回主页', url: '/' },
  { id: 'projects', label: 'WORK', desc: '作品集', url: '/projects' },
  { id: 'about', label: 'ABOUT', desc: '关于我', url: '/about' },
  // 🌟 你的 SBTI 项目入口
  { id: 'sbti', label: 'SBTI', desc: '人格档案 (New)', url: 'https://你的SBTI网址.com', isExternal: true },
  { id: 'contact', label: 'CONTACT', desc: '联系方式', url: '/contact' },
];

export function VerticalNav() {
  // 记录当前鼠标悬浮的是哪一项
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    // 整个导航栏固定在屏幕左侧垂直居中 (如果你想放右边，把 left-8 改成 right-8)
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50">
      
      {/* 苹果风毛玻璃外壳 */}
      <nav 
        className="relative flex flex-col p-2 bg-neutral-100/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {menuItems.map((item, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <a
              key={item.id}
              href={item.url}
              target={item.isExternal ? "_blank" : "_self"}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              onMouseEnter={() => setHoveredIndex(index)}
              className="relative px-6 py-4 flex flex-col cursor-pointer group outline-none"
            >
              {/* 🌟 核心魔法：上下滑动的白色胶囊背景 */}
              {isHovered && (
                <motion.div
                  // 只要 layoutId 相同，Framer Motion 就会自动在这几个元素之间做平滑移动！
                  layoutId="apple-nav-pill"
                  className="absolute inset-0 bg-white rounded-xl shadow-sm border border-neutral-200/50 z-0"
                  // 弹簧物理参数：stiffness(硬度) 和 damping(阻尼) 控制滑动的Q弹感
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}

              {/* 导航文字内容 */}
              <div className="relative z-10 flex flex-col items-start transition-transform duration-300 group-hover:translate-x-1">
                <span className={`text-sm font-black tracking-widest uppercase transition-colors duration-300
                  ${isHovered ? 'text-blue-600' : 'text-neutral-500'}
                `}>
                  {item.label}
                </span>
                
                {/* 悬浮时显示的小副标题，增加细节高级感 */}
                <span className={`text-[10px] font-medium tracking-wider transition-all duration-300
                  ${isHovered ? 'text-neutral-500 opacity-100' : 'text-neutral-300 opacity-0'}
                `}>
                  {item.desc}
                </span>
              </div>
            </a>
          );
        })}
      </nav>
    </div>
  );
}