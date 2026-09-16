import type {
  Article,
  HealthFact,
  Product,
  SymptomCheckRequest,
  SymptomCheckResponse,
  Patient,
  DashboardStats,
  Prescription,
  PageViewRequest,
  AnalyticsSummaryResponse,
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

  getDashboardStats: () => request<DashboardStats>('/dashboard/stats'),
  getRecentPrescriptions: () =>
    request<Pick<Prescription, 'rxId' | 'medication' | 'status'>[]>('/dashboard/prescriptions'),
  getPatient: (patientCode: string) => request<Patient>(`/dashboard/patients/${encodeURIComponent(patientCode)}`),

  trackPageView: (payload: PageViewRequest) =>
    request<void>('/analytics/pageview', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getAnalyticsSummary: () => request<AnalyticsSummaryResponse>('/analytics/summary'),
}
