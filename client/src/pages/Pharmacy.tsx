import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import type { Product } from '../api/types'
import { useLanguage } from '../i18n/LanguageContext'
import { translateProduct } from '../i18n/content'
import { useCart } from '../context/CartContext'
import { MapPinIcon, SearchIcon, ShieldCheckIcon, ShoppingCartIcon, UsersIcon } from '../components/icons'
import { ParallaxBand } from '../components/ParallaxBand'

const QUICK_FILTERS = ['Allergies', 'Pain Relief', 'Antibiotics', 'Skincare', 'Supplements'] as const
const PAGE_SIZE = 8
const FEATURED_COUNT = 4

// Product photos are transparent cut-outs: larger ones get a soft shadow instead of a box.
function ProductImage({ product, className = '', shadow = true }: { product: Product; className?: string; shadow?: boolean }) {
  return (
    <div className={`overflow-hidden bg-slate-50 ${className}`}>
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`h-full w-full object-contain ${shadow ? 'product-shot p-[10%]' : 'p-1'}`}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}
    </div>
  )
}

export function Pharmacy() {
  const { t, language } = useLanguage()
  const { cart, totalItems, addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [featuredSource, setFeaturedSource] = useState<Product[]>([])
  const [featuredId, setFeaturedId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const STOCK_LABEL: Record<Product['stock'], { text: string; className: string }> = {
    InStock: { text: t.stock.InStock, className: 'text-emerald-700' },
    LowStock: { text: t.stock.LowStock, className: 'text-amber-700' },
    OutOfStock: { text: t.stock.OutOfStock, className: 'text-red-700' },
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

  // The featured box is fetched once, unfiltered, so it stays put while the user searches below.
  useEffect(() => {
    api
      .getProducts()
      .then((data) => setFeaturedSource(data.filter((p) => p.category !== 'K-Beauty')))
      .catch(() => setFeaturedSource([]))
  }, [])

  // "/" jumps to the search field, unless the user is already typing somewhere.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(target.tagName) && !target.isContentEditable) {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const translatedProducts = products.map((p) => translateProduct(p, language))

  const totalPages = Math.max(1, Math.ceil(translatedProducts.length / PAGE_SIZE))
  const pageItems = translatedProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // Over-the-counter items with a photo, pharmacist picks first, one per category.
  const featured = featuredSource
    .filter((p) => !p.requiresPrescription && p.imageUrl)
    .sort((a, b) => Number(b.pharmacistRecommended) - Number(a.pharmacistRecommended))
    .filter((p, i, all) => all.findIndex((q) => q.category === p.category) === i)
    .slice(0, FEATURED_COUNT)
    .map((p) => translateProduct(p, language))
  const spotlight = featured.find((p) => p.id === featuredId) ?? featured[0]

  const categoryName = (p: Product) => (t.categories as Record<string, string>)[p.category] ?? p.category

  const filterOptions: { key: string | null; label: string }[] = [
    { key: null, label: t.pharmacy.all },
    ...QUICK_FILTERS.map((f) => ({ key: f, label: t.categories[f] })),
  ]

  const trust = [
    { icon: UsersIcon, title: t.pharmacy.trustPharmacists, detail: t.pharmacy.trustPharmacistsDetail },
    { icon: MapPinIcon, title: t.pharmacy.trustStock, detail: t.pharmacy.trustStockDetail },
    { icon: ShieldCheckIcon, title: t.pharmacy.trustRx, detail: t.pharmacy.trustRxDetail },
  ]

  return (
    <div className="font-['Inter',ui-sans-serif,system-ui,sans-serif] text-slate-900 antialiased">
      {/* ---------- Intro ---------- */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{t.nav.pharmacy}</p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[1fr_minmax(0,440px)] lg:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">{t.pharmacy.title}</h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">{t.pharmacy.subtitle}</p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-stretch border border-slate-300 bg-white focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700"
            >
              <span className="flex items-center pl-3">
                <SearchIcon className="h-4 w-4 text-slate-400" />
              </span>
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.pharmacy.searchPlaceholder}
                className="w-full min-w-0 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-400"
              />
              <button className="shrink-0 bg-blue-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-800">
                <span className="hidden sm:inline">{t.pharmacy.searchButton}</span>
                <SearchIcon className="h-4 w-4 sm:hidden" />
              </button>
            </form>
          </div>

          <dl className="mt-8 grid grid-cols-1 border border-slate-200 sm:grid-cols-3">
            {trust.map(({ icon: Icon, title, detail }, i) => (
              <div
                key={title}
                className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? 'border-t border-slate-200 sm:border-l sm:border-t-0' : ''}`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-blue-50 text-blue-700">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <dt className="text-sm font-semibold">{title}</dt>
                  <dd className="text-xs text-slate-500">{detail}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Featured ---------- */}
      {spotlight && (
        <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight">{t.pharmacy.featured}</h2>
            <p className="text-sm text-slate-500">{t.pharmacy.featuredNote}</p>
          </div>

          <div className="grid border border-slate-200 bg-white lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            {/* Selected product */}
            <article className="grid sm:grid-cols-2">
              <ProductImage
                product={spotlight}
                className="aspect-[4/3] border-b border-slate-200 sm:aspect-square sm:border-b-0 sm:border-r"
              />
              <div className="flex flex-col p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="border border-slate-200 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    {categoryName(spotlight)}
                  </span>
                  {spotlight.pharmacistRecommended && (
                    <span className="flex items-center gap-1 bg-blue-700 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
                      <ShieldCheckIcon className="h-3 w-3" />
                      {t.pharmacy.pharmacistRecommended}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight">{spotlight.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{spotlight.description}</p>

                <dl className="mt-5 border-y border-slate-100 text-sm">
                  <div className="flex justify-between gap-4 py-2">
                    <dt className="text-slate-500">{t.pharmacy.trustStock}</dt>
                    <dd className={`font-medium ${STOCK_LABEL[spotlight.stock].className}`}>
                      {STOCK_LABEL[spotlight.stock].text}
                    </dd>
                  </div>
                </dl>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPinIcon className="h-3.5 w-3.5" />
                  {spotlight.nearbyStoreCount > 1
                    ? t.pharmacy.nearbyStores(spotlight.nearbyStoreCount)
                    : t.pharmacy.onlyOneLeft}
                </p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                  <p className="text-2xl font-semibold tabular-nums">
                    {spotlight.price.toFixed(0)}
                    <span className="ml-1 text-sm font-medium text-slate-400">ден.</span>
                  </p>
                  <button
                    onClick={() => addToCart(spotlight.id)}
                    className="flex items-center gap-2 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    <ShoppingCartIcon className="h-4 w-4" />
                    {t.pharmacy.addToCart}
                    {cart[spotlight.id] ? <span className="tabular-nums">({cart[spotlight.id]})</span> : null}
                  </button>
                </div>
              </div>
            </article>

            {/* Other featured items: pick one to show it on the left */}
            <ul className="border-t border-slate-200 lg:border-l lg:border-t-0">
              {featured.map((p, i) => {
                const active = p.id === spotlight.id
                return (
                  <li key={p.id} className={i > 0 ? 'border-t border-slate-200' : ''}>
                    <button
                      onClick={() => setFeaturedId(p.id)}
                      aria-pressed={active}
                      className={`flex w-full items-center gap-4 p-3 text-left transition-colors sm:p-4 ${
                        active ? 'bg-blue-50/70 shadow-[inset_3px_0_0_#1d4ed8]' : 'hover:bg-slate-50'
                      }`}
                    >
                      <ProductImage product={p} shadow={false} className="h-16 w-16 shrink-0 border border-slate-200" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          {categoryName(p)}
                        </p>
                        <p className="truncate text-sm font-semibold">{p.name}</p>
                        <p className="text-sm tabular-nums text-slate-600">{p.price.toFixed(0)} ден.</p>
                      </div>
                      <span className={`text-lg ${active ? 'text-blue-700' : 'text-slate-300'}`}>›</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      )}

      {/* ---------- Filter toolbar (sticks under the 69px site header) ---------- */}
      <div className="sticky top-[69px] z-30 mt-10 border-y border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:px-6">
          <div className="-mx-1 flex flex-1 gap-1.5 overflow-x-auto px-1 py-0.5 [scrollbar-width:none]">
            {filterOptions.map(({ key, label }) => {
              const active = activeFilter === key
              return (
                <button
                  key={label}
                  onClick={() => setActiveFilter(key === activeFilter ? null : key)}
                  className={`shrink-0 border px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
          <span className="hidden shrink-0 text-sm text-slate-500 md:block">
            {loading ? '…' : t.pharmacy.results(translatedProducts.length)}
          </span>
          <Link
            to="/cart"
            className="flex shrink-0 items-center gap-2 bg-blue-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{t.pharmacy.cart}</span>
            <span className="bg-white/20 px-1.5 text-xs tabular-nums">{totalItems}</span>
          </Link>
        </div>
      </div>

      {/* ---------- Catalogue ---------- */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {error && (
          <p className="mb-6 border border-l-4 border-red-200 border-l-red-600 bg-red-50 px-4 py-3 text-sm text-red-800">
            {t.pharmacy.loadError} {error}
          </p>
        )}

        {!loading && !error && translatedProducts.length === 0 && (
          <div className="border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <SearchIcon className="mx-auto h-7 w-7 text-slate-300" />
            <p className="mt-3 text-sm text-slate-600">{t.pharmacy.empty}</p>
            <button
              onClick={() => {
                setSearch('')
                setActiveFilter(null)
              }}
              className="mt-3 text-sm font-semibold text-blue-700 hover:underline"
            >
              {t.pharmacy.clearFilters}
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {loading
            ? Array.from({ length: PAGE_SIZE }, (_, i) => (
                <div key={i} className="border border-slate-200 bg-white">
                  <div className="aspect-square animate-pulse bg-slate-100" />
                  <div className="space-y-2 p-3">
                    <div className="h-3 w-1/3 animate-pulse bg-slate-100" />
                    <div className="h-4 w-3/4 animate-pulse bg-slate-100" />
                    <div className="h-9 animate-pulse bg-slate-100" />
                  </div>
                </div>
              ))
            : pageItems.map((product) => {
                const stock = STOCK_LABEL[product.stock]
                const quantity = cart[product.id]
                return (
                  <article
                    key={product.id}
                    className="flex flex-col border border-slate-200 bg-white transition-colors hover:border-slate-400"
                  >
                    <div className="relative border-b border-slate-200">
                      <Link to={`/products/${product.id}`} aria-label={product.name}>
                        <ProductImage product={product} className="aspect-square" />
                      </Link>
                      <div className="absolute left-0 top-0 flex flex-col items-start">
                        {product.requiresPrescription && (
                          <span className="bg-amber-400 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-950">
                            ℞ <span className="hidden sm:inline">{t.pharmacy.prescriptionRequired}</span>
                          </span>
                        )}
                        {product.pharmacistRecommended && (
                          <span className="flex items-center gap-1 bg-blue-700 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                            <ShieldCheckIcon className="h-3 w-3" />
                            <span className="hidden sm:inline">{t.pharmacy.pharmacistRecommended}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-3 sm:p-4">
                      <div className="flex items-center justify-between gap-2 text-[11px] font-medium">
                        <span className="truncate uppercase tracking-wider text-slate-400">{categoryName(product)}</span>
                        <span className={`flex shrink-0 items-center gap-1.5 ${stock.className}`}>
                          <span className="h-1.5 w-1.5 bg-current" />
                          <span className="hidden sm:inline">{stock.text}</span>
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-sm font-semibold leading-snug sm:text-[15px]">
                        <Link to={`/products/${product.id}`} className="hover:text-blue-700 hover:underline">
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 hidden text-xs leading-relaxed text-slate-500 line-clamp-2 sm:block">
                        {product.description}
                      </p>
                      <p className="mt-3 text-lg font-semibold tabular-nums">
                        {product.price.toFixed(0)}
                        <span className="ml-1 text-xs font-medium text-slate-400">ден.</span>
                      </p>
                      <p
                        className={`text-[11px] leading-snug ${
                          product.requiresPrescription ? 'text-amber-800' : 'text-slate-400'
                        }`}
                      >
                        {product.requiresPrescription
                          ? t.pharmacy.prescriptionNote
                          : product.nearbyStoreCount > 1
                            ? t.pharmacy.nearbyStores(product.nearbyStoreCount)
                            : t.pharmacy.onlyOneLeft}
                      </p>
                      <div className="mt-auto pt-3">
                        <button
                          onClick={() => addToCart(product.id)}
                          className={`flex w-full items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
                            product.requiresPrescription
                              ? 'border border-amber-400 bg-amber-50 text-amber-900 hover:bg-amber-100'
                              : 'bg-slate-900 text-white hover:bg-blue-700'
                          }`}
                        >
                          {product.requiresPrescription ? <span>℞</span> : <ShoppingCartIcon className="h-4 w-4" />}
                          {t.pharmacy.addToCart}
                          {quantity ? <span className="tabular-nums">({quantity})</span> : null}
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
        </div>

        {!loading && translatedProducts.length > 0 && totalPages > 1 && (
          <nav className="mt-10 flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
            <span className="text-sm tabular-nums text-slate-500">
              {page} / {totalPages}
            </span>
            <div className="flex">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex h-9 w-9 items-center justify-center border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30"
                aria-label="Previous page"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`-ml-px h-9 w-9 border text-sm font-semibold tabular-nums ${
                    p === page
                      ? 'relative z-10 border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="-ml-px flex h-9 w-9 items-center justify-center border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30"
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          </nav>
        )}
      </div>

      <ParallaxBand
        image="/images/article-blood-pressure.webp"
        eyebrow={t.pharmacy.bandEyebrow}
        title={t.pharmacy.bandTitle}
        copy={t.pharmacy.bandCopy}
        cta={{ to: '/team', label: t.pharmacy.bandButton }}
        className="mt-6"
      />
    </div>
  )
}
