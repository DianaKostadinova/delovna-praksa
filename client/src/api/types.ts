export interface Article {
  id: number
  title: string
  excerpt: string
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

export type PrescriptionStatus = 'Active' | 'Completed' | 'Pending'

export interface Prescription {
  id: number
  patientId: number
  rxId: string
  medication: string
  dosageInfo: string
  dosage: string
  physician: string
  status: PrescriptionStatus
  datePrescribed: string
}

export interface Patient {
  id: number
  patientCode: string
  fullName: string
  dateOfBirth: string
  bloodType: string
  allergies: string
  insuranceStatus: string
  photoUrl: string | null
  prescriptions: Prescription[]
}

export interface DashboardStats {
  pending: number
  filledToday: number
}
