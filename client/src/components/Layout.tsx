import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/pharmacy', label: 'Pharmacy' },
  { to: '/ai-checker', label: 'AI Checker' },
  { to: '/dashboard', label: 'Dashboard' },
]

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-center gap-8 px-6 py-4 text-sm font-medium text-slate-600">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                isActive ? 'text-blue-700 font-semibold' : 'hover:text-blue-700 transition-colors'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-12 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <div className="mb-2 flex items-center gap-2 text-lg font-semibold text-white">
            <span className="inline-block h-5 w-5 rounded bg-blue-600" />
            Zegin Health
          </div>
          <p className="text-sm text-slate-400">
            Redefining the modern pharmacy experience through clinical expertise, digital agility, and a commitment
            to preventive health education.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-blue-400">Resources</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Health Encyclopedia</li>
            <li>Prescription Guide</li>
            <li>Doctor Consultations</li>
            <li>Insurance Partners</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-blue-400">Contact</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>support@zegin.com</li>
            <li>+1 (555) 013-3456</li>
            <li>Global Health Plaza, NY</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 px-6 py-4 text-center text-xs text-slate-500">
        © 2026 Zegin Pharmacy. All Rights Reserved. — demo project, not a real pharmacy.
      </div>
    </footer>
  )
}
