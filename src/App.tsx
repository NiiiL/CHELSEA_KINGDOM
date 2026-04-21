import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SideNav } from './SideNav';

// 引入你的两个子页面
import KingdomApp from './Pages/Kingdom_App';
// 如果你在 SBTIApp 里写的是 export default function App()，就这样引入：
import SBTIApp from './Pages/SBTI_App';

export default function App() {
  return (
    // Router 是整个网站的路由外壳
    <Router>
      <SideNav /> {/* 唯一的全局胶囊 */}
      <Routes>
        <Route path="/" element={<KingdomApp />} />
        <Route path="/sbti" element={<SBTIApp />} />
      </Routes>
    </Router>
  );
}