import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { CookieIcon } from './icons'
import { trackPageView } from '../analytics'

const STORAGE_KEY = 'zegin-cookie-consent'

type Consent = 'accepted' | 'declined'

function readStoredConsent(): Consent | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'accepted' || stored === 'declined' ? stored : null
  } catch {
    return null
  }
}

export function CookieConsent() {
  const { t, language } = useLanguage()
  const location = useLocation()
  const [consent, setConsent] = useState<Consent | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setConsent(readStoredConsent())
    setHydrated(true)
  }, [])

  function choose(value: Consent) {
    setConsent(value)
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // ignore — e.g. private browsing without storage access
    }
    if (value === 'accepted') {
      // Track the page the visitor is already on — otherwise analytics would miss it, since
      // the route-change tracker only fires on navigation, not on this consent change.
      trackPageView(location.pathname, language)
    }
  }

  if (!hydrated || consent) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 w-72 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:w-80">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
        <CookieIcon className="h-5 w-5 text-blue-700" />
      </span>
      <h3 className="mt-3 text-sm font-semibold text-slate-800">{t.cookies.title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">{t.cookies.message}</p>
      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={() => choose('accepted')}
          className="w-full rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
        >
          {t.cookies.acceptButton}
        </button>
        <button
          onClick={() => choose('declined')}
          className="w-full rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          {t.cookies.declineButton}
        </button>
      </div>
    </div>
  )
}
