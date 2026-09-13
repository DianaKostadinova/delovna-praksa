import { useEffect, useMemo, useState } from 'react'
import { api } from '../api/client'
import type { Product } from '../api/types'

const QUICK_FILTERS = ['Allergies', 'Pain Relief', 'Antibiotics', 'Skincare', 'Supplements']
const PAGE_SIZE = 6

const STOCK_LABEL: Record<Product['stock'], { text: string; className: string }> = {
  InStock: { text: 'In Stock', className: 'text-green-700' },
  LowStock: { text: 'Low Stock', className: 'text-amber-600' },
  OutOfStock: { text: 'Out of Stock', className: 'text-red-600' },
}

export function Pharmacy() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [cart, setCart] = useState<Record<number, number>>({})
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    api
      .getProducts({ category: activeFilter ?? undefined, search: search || undefined })
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [activeFilter, search])

  useEffect(() => setPage(1), [activeFilter, search])

  const totalCartItems = useMemo(() => Object.values(cart).reduce((sum, n) => sum + n, 0), [cart])

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE))
  const pageItems = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function addToCart(id: number) {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }))
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pharmacy Catalog</h1>
          <p className="mt-1 max-w-xl text-sm text-slate-500">
            Find essential medications, professional healthcare products, and wellness supplements with real-time
            stock availability.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-600">Filters</span>
          <span className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-600">Recommended</span>
          <span className="relative rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white">
            Cart ({totalCartItems})
          </span>
        </div>
      </div>

      <div className="mb-4 flex gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2">
          <span className="text-slate-400">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicine, brands, symptoms (e.g. Paracetamol, Ibuprofen...)"
            className="w-full text-sm outline-none"
          />
        </div>
        <button className="rounded-md bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800">
          Search Catalog
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
            {f}
          </button>
        ))}
      </div>

      {error && <p className="mb-4 text-sm text-red-600">Couldn't load products: {error}</p>}
      {loading ? (
        <p className="text-sm text-slate-400">Loading catalog…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pageItems.map((product) => {
            const stock = STOCK_LABEL[product.stock]
            return (
              <div key={product.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="relative mb-3 aspect-square rounded-lg bg-gradient-to-br from-slate-100 to-slate-200">
                  {product.pharmacistRecommended && (
                    <span className="absolute left-2 top-2 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 shadow">
                      🛡 Pharmacist Recommended
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-medium text-slate-400">{product.category}</p>
                <h3 className="text-sm font-semibold text-slate-800">{product.name}</h3>
                <p className="text-xs text-slate-500">{product.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-blue-700">${product.price.toFixed(2)}</span>
                  <span className={`text-xs font-medium ${stock.className}`}>{stock.text}</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  {product.nearbyStoreCount > 0
                    ? `Available at ${product.nearbyStoreCount} nearby store${product.nearbyStoreCount > 1 ? 's' : ''}`
                    : 'Only 1 nearby store left'}
                </p>
                <button
                  onClick={() => addToCart(product.id)}
                  className="mt-3 w-full rounded-md bg-blue-700 py-2 text-xs font-semibold text-white hover:bg-blue-800"
                >
                  🛒 Add to Cart{cart[product.id] ? ` (${cart[product.id]})` : ''}
                </button>
              </div>
            )
          })}

          <div className="col-span-full flex flex-col items-center justify-center rounded-xl bg-blue-600 p-6 text-white sm:col-span-2">
            <h3 className="text-lg font-semibold">Consult with our Pharmacists Online</h3>
            <p className="mt-1 max-w-xs text-center text-sm text-blue-100">
              Need advice on dosage or interactions? Our licensed pharmacists are available 24/7 for a secure video
              consultation.
            </p>
            <button className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Start Consultancy
            </button>
          </div>
        </div>
      )}

      {!loading && products.length > 0 && (
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
