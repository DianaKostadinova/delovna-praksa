import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { CookieIcon } from './icons'

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
  const { t } = useLanguage()
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
  }

  if (!hydrated || consent) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur px-6 py-4 shadow-[0_-4px_16px_rgba(15,23,42,0.08)]">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50">
            <CookieIcon className="h-4 w-4 text-blue-700" />
          </span>
          <p className="text-xs text-slate-600 sm:text-sm">{t.cookies.message}</p>
        </div>
        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
          <button
            onClick={() => choose('declined')}
            className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 sm:flex-none"
          >
            {t.cookies.declineButton}
          </button>
          <button
            onClick={() => choose('accepted')}
            className="flex-1 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 sm:flex-none"
          >
            {t.cookies.acceptButton}
          </button>
        </div>
      </div>
    </div>
  )
}
