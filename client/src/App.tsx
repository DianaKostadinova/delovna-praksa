import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Pharmacy } from './pages/Pharmacy'
import { KBeauty } from './pages/KBeauty'
import { Cart } from './pages/Cart'
import { AiChecker } from './pages/AiChecker'
import { Dashboard } from './pages/Dashboard'
import { Team } from './pages/Team'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/k-beauty" element={<KBeauty />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ai-checker" element={<AiChecker />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/team" element={<Team />} />
      </Route>
    </Routes>
  )
}

export default App
