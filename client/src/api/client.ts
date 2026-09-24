import type {
  Article,
  HealthFact,
  Product,
  SymptomCheckRequest,
  SymptomCheckResponse,
  PageViewRequest,
  ContactRequest,
} from './types'

// In local dev this stays empty and Vite proxies /api to the backend, so the browser only ever
// sees a same-origin request. Once the frontend is deployed on its own host (Vercel) the API
// lives somewhere else entirely, and VITE_API_BASE_URL points at it — e.g.
// https://zegin-health-hub-api.onrender.com. Vite inlines this at build time, so changing it
// on the host requires a redeploy, not just a restart.
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.message ?? `Request failed: ${res.status}`)
  }
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export const api = {
  getArticles: (section?: string) => request<Article[]>(`/articles${section ? `?section=${encodeURIComponent(section)}` : ''}`),
  getArticleById: (id: number) => request<Article>(`/articles/${id}`),
  getHealthFacts: () => request<HealthFact[]>('/articles/facts'),

  getProducts: (params?: { category?: string; search?: string }) => {
    const query = new URLSearchParams()
    if (params?.category) query.set('category', params.category)
    if (params?.search) query.set('search', params.search)
    const qs = query.toString()
    return request<Product[]>(`/products${qs ? `?${qs}` : ''}`)
  },
  getCategories: () => request<string[]>('/products/categories'),

  checkSymptoms: (payload: SymptomCheckRequest) =>
    request<SymptomCheckResponse>('/symptomcheck', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  trackPageView: (payload: PageViewRequest) =>
    request<void>('/analytics/pageview', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  submitContact: (payload: ContactRequest) =>
    request<void>('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}
