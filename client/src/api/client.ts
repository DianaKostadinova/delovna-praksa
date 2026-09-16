import type {
  Article,
  HealthFact,
  Product,
  SymptomCheckRequest,
  SymptomCheckResponse,
  PageViewRequest,
  ContactRequest,
} from './types'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
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
