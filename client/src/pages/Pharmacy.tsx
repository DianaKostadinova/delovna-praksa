import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import type { Product } from '../api/types'
import { useLanguage } from '../i18n/LanguageContext'
import { translateProduct } from '../i18n/content'
import { useCart } from '../context/CartContext'

const QUICK_FILTERS = ['Allergies', 'Pain Relief', 'Antibiotics', 'Skincare', 'Supplements'] as const
const PAGE_SIZE = 8

export function Pharmacy() {
  const { t, language } = useLanguage()
  const { cart, totalItems, addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const STOCK_LABEL: Record<Product['stock'], { text: string; className: string }> = {
    InStock: { text: t.stock.InStock, className: 'text-green-700' },
    LowStock: { text: t.stock.LowStock, className: 'text-amber-600' },
    OutOfStock: { text: t.stock.OutOfStock, className: 'text-red-600' },
  }

  useEffect(() => {
    setLoading(true)
    api
      .getProducts({ category: activeFilter ?? undefined, search: search || undefined })
      .then((data) => setProducts(data.filter((p) => p.category !== 'K-Beauty')))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [activeFilter, search])

  useEffect(() => setPage(1), [activeFilter, search])

  const translatedProducts = products.map((p) => translateProduct(p, language))

  const totalPages = Math.max(1, Math.ceil(translatedProducts.length / PAGE_SIZE))
  const pageItems = translatedProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t.pharmacy.title}</h1>
          <p className="mt-1 max-w-xl text-sm text-slate-500">{t.pharmacy.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800"
          >
            {t.pharmacy.cart} ({totalItems})
          </Link>
        </div>
      </div>

      <div className="mb-4 flex gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2">
          <span className="text-slate-400">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.pharmacy.searchPlaceholder}
            className="w-full text-sm outline-none"
          />
        </div>
        <button className="rounded-md bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800">
          {t.pharmacy.searchButton}
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {QUICK_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(activeFilter === f ? null : f)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeFilter === f
                ? 'border-blue-700 bg-blue-700 text-white'
                : 'border-slate-300 bg-white text-slate-600 hover:border-blue-400'
            }`}
          >
            {t.categories[f]}
          </button>
        ))}
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600">
          {t.pharmacy.loadError} {error}
        </p>
      )}
      {loading ? (
        <p className="text-sm text-slate-400">{t.pharmacy.loading}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pageItems.map((product) => {
            const stock = STOCK_LABEL[product.stock]
            const category = (t.categories as Record<string, string>)[product.category] ?? product.category
            return (
              <div
                key={product.id}
                className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-200">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                  {product.pharmacistRecommended && (
                    <span className="absolute left-2 top-2 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 shadow">
                      🛡 {t.pharmacy.pharmacistRecommended}
                    </span>
                  )}
                  {product.requiresPrescription && (
                    <span className="absolute right-2 top-2 rounded bg-amber-100/95 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800 shadow">
                      🔒 {t.pharmacy.prescriptionRequired}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-medium text-slate-400">{category}</p>
                  <h3 className="text-sm font-semibold text-slate-800">{product.name}</h3>
                  <p className="text-xs text-slate-500">{product.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-blue-700">{product.price.toFixed(0)} ден.</span>
                    <span className={`text-xs font-medium ${stock.className}`}>{stock.text}</span>
                  </div>
                  {product.requiresPrescription ? (
                    <p className="mt-1 text-[11px] font-medium text-amber-700">⚠ {t.pharmacy.prescriptionNote}</p>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-400">
                      {product.nearbyStoreCount > 1 ? t.pharmacy.nearbyStores(product.nearbyStoreCount) : t.pharmacy.onlyOneLeft}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => addToCart(product.id)}
                  className={`mt-3 w-full rounded-md py-2 text-xs font-semibold text-white transition-transform duration-150 active:scale-95 ${
                    product.requiresPrescription ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-700 hover:bg-blue-800'
                  }`}
                >
                  {product.requiresPrescription ? '🔒' : '🛒'} {t.pharmacy.addToCart}
                  {cart[product.id] ? ` (${cart[product.id]})` : ''}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {!loading && translatedProducts.length > 0 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-md border border-slate-300 px-3 py-1 text-sm disabled:opacity-40"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`h-8 w-8 rounded-md text-sm font-medium ${
                p === page ? 'bg-blue-700 text-white' : 'border border-slate-300 text-slate-600'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-md border border-slate-300 px-3 py-1 text-sm disabled:opacity-40"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
