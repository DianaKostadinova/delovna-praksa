import { api } from './api/client'
import type { Language } from './i18n/translations'

const VISITOR_ID_KEY = 'zegin-visitor-id'
const CONSENT_KEY = 'zegin-cookie-consent'

// A random per-browser id — not an account, not derived from anything identifying (no IP, no
// fingerprinting). Created lazily, only once the visitor has accepted the cookie banner.
function getOrCreateVisitorId(): string {
  try {
    const existing = window.localStorage.getItem(VISITOR_ID_KEY)
    if (existing) return existing
    const id = crypto.randomUUID()
    window.localStorage.setItem(VISITOR_ID_KEY, id)
    return id
  } catch {
    return crypto.randomUUID()
  }
}

export function hasAnalyticsConsent(): boolean {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === 'accepted'
  } catch {
    return false
  }
}

let lastTracked: string | null = null

// Fire-and-forget: a failed analytics call should never disrupt the page. Also guards against
// React StrictMode's dev-only double-invoke of effects firing the same pageview twice in a row.
export function trackPageView(path: string, language: Language) {
  if (!hasAnalyticsConsent()) return
  if (lastTracked === path) return
  lastTracked = path
  const visitorId = getOrCreateVisitorId()
  api.trackPageView({ visitorId, path, language }).catch(() => {})
}

export function clearVisitorId() {
  try {
    window.localStorage.removeItem(VISITOR_ID_KEY)
  } catch {
    // ignore
  }
}
