import { NavLink, Outlet } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { CookieConsent } from './CookieConsent'

export function Layout() {
  const { t } = useLanguage()

  const navItems = [
    { to: '/', label: t.nav.home },
    { to: '/pharmacy', label: t.nav.pharmacy },
    { to: '/ai-checker', label: t.nav.aiChecker },
    { to: '/dashboard', label: t.nav.dashboard },
    { to: '/team', label: t.nav.team },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <nav className="flex items-center gap-8 text-sm font-medium text-slate-600">
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
          <LanguageToggle />
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <CookieConsent />
    </div>
  )
}

function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-slate-300 bg-white p-0.5 text-xs font-semibold"
      title={t.languageToggle.label}
    >
      <button
        onClick={() => setLanguage('en')}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          language === 'en' ? 'bg-blue-700 text-white' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('mk')}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          language === 'mk' ? 'bg-blue-700 text-white' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        МК
      </button>
    </div>
  )
}

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="mt-12 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <div className="mb-2 flex items-center gap-2 text-lg font-semibold text-white">
            <span className="inline-block h-5 w-5 rounded bg-blue-600" />
            Zegin Health
          </div>
          <p className="text-sm text-slate-400">{t.footer.tagline}</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-blue-400">{t.footer.resources}</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>{t.footer.healthEncyclopedia}</li>
            <li>{t.footer.prescriptionGuide}</li>
            <li>{t.footer.doctorConsultations}</li>
            <li>{t.footer.insurancePartners}</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-blue-400">{t.footer.contact}</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>support@zegin.com</li>
            <li>+1 (555) 013-3456</li>
            <li>Global Health Plaza, NY</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 px-6 py-4 text-center text-xs text-slate-500">{t.footer.rights}</div>
    </footer>
  )
}
