import { Fragment, useEffect, useMemo, useState, type FormEvent } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'
import { CookieConsent } from './CookieConsent'
import { trackPageView } from '../analytics'
import { api } from '../api/client'
import { ShoppingCartIcon } from './icons'

export function Layout() {
  const { t, language } = useLanguage()
  const location = useLocation()

  useEffect(() => {
    // Fires on route changes only — a language switch alone shouldn't count as a new pageview.
    trackPageView(location.pathname, language)
  }, [location.pathname])

  const navItems = [
    { to: '/', label: t.nav.home },
    { to: '/blog', label: t.nav.blog },
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
              <Fragment key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    isActive ? 'text-blue-700 font-semibold' : 'hover:text-blue-700 transition-colors'
                  }
                >
                  {item.label}
                </NavLink>
                {item.to === '/pharmacy' && <KBeautyNavLink label={t.nav.kbeauty} />}
              </Fragment>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <CartIconLink />
            <LanguageToggle />
          </div>
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

const PETAL_EMOJIS = ['🌸', '🌺', '💮']

function KBeautyNavLink({ label }: { label: string }) {
  const [hovering, setHovering] = useState(false)

  const petals = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        emoji: PETAL_EMOJIS[i % PETAL_EMOJIS.length],
        left: Math.random() * 100,
        duration: 1.2 + Math.random() * 1,
        delay: Math.random() * 1.2,
        size: 10 + Math.random() * 6,
        drift: `${Math.random() > 0.5 ? '' : '-'}${10 + Math.random() * 20}px`,
      })),
    [],
  )

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {hovering &&
        petals.map((petal) => (
          <span
            key={petal.id}
            className="petal"
            style={{
              left: `${petal.left}%`,
              fontSize: petal.size,
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
              ['--petal-drift' as string]: petal.drift,
            }}
          >
            {petal.emoji}
          </span>
        ))}
      <NavLink
        to="/k-beauty"
        className={({ isActive }) =>
          isActive ? 'text-blue-700 font-semibold' : 'hover:text-blue-700 transition-colors'
        }
      >
        {label}
      </NavLink>
    </span>
  )
}

function CartIconLink() {
  const { totalItems } = useCart()

  return (
    <NavLink
      to="/cart"
      className={({ isActive }) =>
        `relative flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
          isActive ? 'bg-blue-700 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-blue-700'
        }`
      }
    >
      <ShoppingCartIcon className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
          {totalItems}
        </span>
      )}
    </NavLink>
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
            <li>+389 70 512 384</li>
            <li>Skopje, North Macedonia</li>
          </ul>
          <ContactForm />
        </div>
      </div>
      <div className="border-t border-slate-800 px-6 py-4 text-center text-xs text-slate-500">{t.footer.rights}</div>
    </footer>
  )
}

function ContactForm() {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      await api.submitContact({ name, email, subject: 'Website contact form', message })
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="mt-4 text-sm text-green-400">{t.footer.contactFormSuccess}</p>
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder={t.footer.contactFormNamePlaceholder}
        className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder={t.footer.contactFormEmailPlaceholder}
        className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={3}
        placeholder={t.footer.contactFormMessagePlaceholder}
        className="w-full resize-none rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500"
      />
      {status === 'error' && <p className="text-xs text-red-400">{t.footer.contactFormError}</p>}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {status === 'submitting' ? t.footer.contactFormSubmitting : t.footer.contactFormSubmit}
      </button>
    </form>
  )
}
