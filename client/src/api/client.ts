import type {
  Article,
  HealthFact,
  Product,
  SymptomCheckRequest,
  SymptomCheckResponse,
  Patient,
  DashboardStats,
  Prescription,
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
  return res.json() as Promise<T>
}

export const api = {
  getArticles: () => request<Article[]>('/articles'),
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
}
