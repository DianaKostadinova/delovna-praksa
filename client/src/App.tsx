import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Pharmacy } from './pages/Pharmacy'
import { KBeauty } from './pages/KBeauty'
import { Cart } from './pages/Cart'
import { AiChecker } from './pages/AiChecker'
import { Team } from './pages/Team'
import { Blog } from './pages/Blog'
import { ArticleDetail } from './pages/ArticleDetail'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/k-beauty" element={<KBeauty />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ai-checker" element={<AiChecker />} />
        <Route path="/team" element={<Team />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
      </Route>
    </Routes>
  )
}

export default App
