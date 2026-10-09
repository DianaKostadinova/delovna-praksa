import { Fragment, useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { NavLink, Outlet, useLocation, useNavigationType } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'
import { CookieConsent } from './CookieConsent'
import { trackPageView } from '../analytics'
import { api } from '../api/client'
import { ShoppingCartIcon, MapPinIcon } from './icons'
import { LocationsMap } from './LocationsMap'
import { ScrollPulse } from './ScrollPulse'
import { BRANCHES } from '../data/branches'

export function Layout() {
  const { t, language } = useLanguage()
  const location = useLocation()
  const navigationType = useNavigationType()
  const scrollPositions = useRef(new Map<string, number>()).current
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setMenuOpen(false), [location.key])
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    // Fires on route changes only — a language switch alone shouldn't count as a new pageview.
    trackPageView(location.pathname, language)
  }, [location.pathname])

  useEffect(() => {
    // The browser's own scroll restoration (history.scrollRestoration = 'auto') turned out
    // unreliable for this SPA — it landed Back navigations near the bottom of the page instead
    // of where the user actually left off. Track positions ourselves per history entry instead.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    const key = location.key
    const onScroll = () => scrollPositions.set(key, window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.key, scrollPositions])

  useEffect(() => {
    if (navigationType !== 'POP') {
      // A genuine forward navigation (e.g. clicking into an article) always starts at the top.
      window.scrollTo(0, 0)
      return
    }

    const saved = scrollPositions.get(location.key)
    if (saved === undefined) return

    // The destination page may still be loading data (articles, products, …) and grow taller
    // after this first paint, so keep re-applying the saved position until it settles rather
    // than restoring once against a page that's still short.
    window.scrollTo(0, saved)
    const observer = new MutationObserver(() => window.scrollTo(0, saved))
    observer.observe(document.body, { childList: true, subtree: true })
    const stopObserving = setTimeout(() => observer.disconnect(), 2500)
    return () => {
      observer.disconnect()
      clearTimeout(stopObserving)
    }
  }, [location.pathname, location.key, navigationType, scrollPositions])

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-blue-700 font-semibold' : 'hover:text-blue-700 transition-colors'

  const navItems = [
    { to: '/', label: t.nav.home },
    { to: '/blog', label: t.nav.blog },
    { to: '/pharmacy', label: t.nav.pharmacy },
    { to: '/ai-checker', label: t.nav.aiChecker },
    { to: '/team', label: t.nav.team },
  ]

  return (
    <div className="relative isolate flex min-h-screen flex-col">
      {/* Fixed tile wall behind every page, fading out toward the bottom of the viewport. */}
      <div className="pharmacy-tiles pointer-events-none fixed inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_0%,rgb(0_0_0/0.55)_100%)]" />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-slate-50" />
      {/* Blurred pharmacy photo across the top of the page, fading into the tiles below. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] min-h-[420px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]"
      >
        <img src="/images/hero-pharmacy.jpg" alt="" className="hero-drift h-full w-full object-cover blur-[4px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/45 to-white/70" />
      </div>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <NavLink to="/" className="flex shrink-0 items-center gap-2 text-base font-semibold tracking-tight text-slate-900">
            <ZeginMark className="h-6 w-6" />
            Zegin
          </NavLink>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex lg:gap-8">
            {navItems.map((item) => (
              <Fragment key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={navLinkClass}>
                  {item.label}
                </NavLink>
                {item.to === '/pharmacy' && <KBeautyNavLink label={t.nav.kbeauty} />}
              </Fragment>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <CartIconLink />
            <LanguageToggle />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-9 w-9 items-center justify-center border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 md:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        <ScrollPulse />

        {/* Mobile menu: drops below the header so the header itself never changes height. */}
        {menuOpen && (
          <>
            <div className="fixed inset-0 top-[69px] bg-slate-900/20 md:hidden" onClick={() => setMenuOpen(false)} />
            <nav
              id="mobile-menu"
              className="absolute inset-x-0 top-full border-b border-slate-200 bg-white shadow-lg md:hidden"
            >
              <ul className="mx-auto max-w-6xl divide-y divide-slate-100 px-4">
                {[...navItems.slice(0, 3), { to: '/k-beauty', label: t.nav.kbeauty }, ...navItems.slice(3)].map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `flex items-center justify-between py-3.5 text-[15px] font-medium ${
                          isActive ? 'text-blue-700' : 'text-slate-700'
                        }`
                      }
                    >
                      {item.label}
                      <span className="text-slate-300">›</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </header>

      {/* Keyed by path so each page plays its rise-in entrance on navigation. */}
      <main key={location.pathname} className="animate-rise flex-1">
        <Outlet />
      </main>

      <Footer />
      <CookieConsent />
    </div>
  )
}

// Brand mark: a pharmacy cross knocked out of a solid blue square.
function ZeginMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect width="24" height="24" fill="#1d4ed8" />
      <path d="M10 5h4v5h5v4h-5v5h-4v-5H5v-4h5z" fill="white" />
    </svg>
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
            <ZeginMark className="h-6 w-6" />
            Zegin
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

      <div className="border-t border-slate-800 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <h4 className="mb-1 text-sm font-semibold text-blue-400">{t.footer.locationsTitle}</h4>
          <p className="mb-4 text-xs text-slate-500">{t.footer.locationsSubtitle}</p>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="h-80 overflow-hidden rounded-lg">
              <LocationsMap />
            </div>
            <div className="max-h-80 space-y-2 overflow-y-auto pr-2">
              {BRANCHES.map((branch) => (
                <div key={branch.id} className="flex items-start gap-2 rounded-md bg-slate-800/60 p-3 text-xs">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                  <div>
                    <p className="font-semibold text-slate-200">{branch.name}</p>
                    <p className="text-slate-400">{branch.address}</p>
                    <p className="text-slate-400">
                      {branch.phone} · {branch.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
