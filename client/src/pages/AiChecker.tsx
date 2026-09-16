import { useEffect, useState, type FormEvent } from 'react'
import { api } from '../api/client'
import type { Product, SymptomCheckResponse } from '../api/types'
import { useLanguage } from '../i18n/LanguageContext'
import { translateSymptomCheck, translateProduct } from '../i18n/content'
import { useCart } from '../context/CartContext'
import { SparklesIcon, InfoIcon, ArrowRightIcon, ShoppingCartIcon } from '../components/icons'

export function AiChecker() {
  const { t, language } = useLanguage()
  const { cart, addToCart } = useCart()
  const [age, setAge] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [result, setResult] = useState<SymptomCheckResponse | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.getProducts().then(setProducts)
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!symptoms.trim()) return
    setLoading(true)
    setError(null)
    try {
      const response = await api.checkSymptoms({ age: age ? Number(age) : null, symptoms })
      setResult(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const displayResult = result ? translateSymptomCheck(result, language) : null
  const urgencyLabel = displayResult ? (t.urgency as Record<string, string>)[displayResult.urgency] ?? displayResult.urgency : ''

  const suggestedProducts = (result?.suggestedProducts ?? [])
    .map((name) => products.find((p) => p.name === name))
    .filter((p): p is Product => p !== undefined)
    .map((p) => translateProduct(p, language))

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {t.aiChecker.badge}
        </span>
        <h1 className="text-3xl font-bold text-slate-900">{t.aiChecker.title}</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-500">{t.aiChecker.subtitle}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6">
          <label className="mb-1 block text-sm font-medium text-slate-700">{t.aiChecker.ageLabel}</label>
          <input
            type="number"
            min={0}
            max={120}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder={t.aiChecker.agePlaceholder}
            className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />

          <label className="mb-1 block text-sm font-medium text-slate-700">{t.aiChecker.symptomsLabel}</label>
          <textarea
            required
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder={t.aiChecker.symptomsPlaceholder}
            rows={5}
            className="mb-3 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />

          <p className="mb-4 flex items-start gap-2 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">
            <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
            {t.aiChecker.disclaimerNote}
          </p>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-700 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
          >
            {loading ? t.aiChecker.submitting : t.aiChecker.submitButton}
            {!loading && <ArrowRightIcon className="h-4 w-4" />}
          </button>
        </form>

        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6">
          {error && <p className="text-sm text-red-600">{error}</p>}

          {!displayResult && !error && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <SparklesIcon className="h-6 w-6 text-slate-400" />
              </span>
              <h3 className="text-sm font-semibold text-slate-700">{t.aiChecker.waitingTitle}</h3>
              <p className="mt-1 max-w-xs text-xs text-slate-400">{t.aiChecker.waitingCopy}</p>
            </div>
          )}

          {displayResult && (
            <div>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  displayResult.urgency === 'Low'
                    ? 'bg-green-100 text-green-700'
                    : displayResult.urgency === 'Moderate'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                }`}
              >
                {t.aiChecker.urgencyLabel}: {urgencyLabel}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-slate-800">{displayResult.summary}</h3>

              <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                {displayResult.recommendations.map((r, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue-600">•</span> {r}
                  </li>
                ))}
              </ul>

              {suggestedProducts.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">{t.aiChecker.suggestedProducts}</p>
                  <div className="mt-2 space-y-2">
                    {suggestedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 rounded-lg border border-slate-200 p-2"
                      >
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-slate-100 to-slate-200">
                          {product.imageUrl && (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-slate-800">{product.name}</p>
                          <p className="text-xs font-bold text-blue-700">{product.price.toFixed(0)} ден.</p>
                        </div>
                        <button
                          onClick={() => addToCart(product.id)}
                          className="flex shrink-0 items-center gap-1 rounded-md bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-800"
                        >
                          <ShoppingCartIcon className="h-3.5 w-3.5" />
                          {cart[product.id] ? ` (${cart[product.id]})` : ''}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-4 text-[11px] text-slate-400">{displayResult.disclaimer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
