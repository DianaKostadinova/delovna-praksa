export interface Article {
  id: number
  title: string
  excerpt: string
  content: string | null
  author: string | null
  readTime: string | null
  imageUrl: string | null
  section: string
  tag: string | null
  isFeatured: boolean
  publishedAt: string
}

export interface HealthFact {
  id: number
  title: string
  detail: string
  icon: string
}

export type StockStatus = 'InStock' | 'LowStock' | 'OutOfStock'

export interface Product {
  id: number
  name: string
  category: string
  description: string
  price: number
  stock: StockStatus
  nearbyStoreCount: number
  imageUrl: string | null
  pharmacistRecommended: boolean
  requiresPrescription: boolean
}

export interface SymptomCheckRequest {
  age: number | null
  symptoms: string
}

export interface SymptomCheckResponse {
  summary: string
  urgency: string
  recommendations: string[]
  suggestedProducts: string[]
  disclaimer: string
}

export interface PageViewRequest {
  visitorId: string
  path: string
  language: string
}

export interface ContactRequest {
  name: string
  email: string
  subject: string
  message: string
}

export interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  branchName: string
  branchAddress: string
  email: string
  phone: string
  photoUrl: string | null
  isHeadOffice: boolean
  sortOrder: number
}
