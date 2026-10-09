import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../api/client'
import type { Product } from '../api/types'
import { useLanguage } from '../i18n/LanguageContext'
import { translateProduct } from '../i18n/content'
import { useCart } from '../context/CartContext'
import { Reveal } from '../components/Reveal'
import { Product3D } from '../components/Product3D'
import { ArrowRightIcon, MapPinIcon, ShieldCheckIcon, ShoppingCartIcon } from '../components/icons'

// The API has no single-product endpoint and the catalogue is small, so load the list and pick
// the product (plus a few from the same category for "related") out of it.
export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { t, language } = useLanguage()
  const { cart, addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    api
      .getProducts()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const found = products.find((p) => p.id === Number(id))
  const product = found ? translateProduct(found, language) : null
  const related = found
    ? products
        .filter((p) => p.category === found.category && p.id !== found.id && p.imageUrl)
        .slice(0, 4)
        .map((p) => translateProduct(p, language))
    : []

  // K-Beauty keeps its pink accent; everything else uses the site blue.
  const pink = found?.category === 'K-Beauty'
  const accent = pink
    ? { text: 'text-pink-600', bg: 'bg-pink-600 hover:bg-pink-700', tile: 'bg-pink-50', shadow: 'shadow-[8px_8px_0_0_#db2777]' }
    : { text: 'text-blue-700', bg: 'bg-blue-700 hover:bg-blue-800', tile: 'bg-slate-50', shadow: 'shadow-[8px_8px_0_0_#1d4ed8]' }
  const backTo = pink ? '/k-beauty' : '/pharmacy'

  const STOCK_CLASS: Record<Product['stock'], string> = {
    InStock: 'text-emerald-700',
    LowStock: 'text-amber-700',
    OutOfStock: 'text-red-700',
  }
  const categoryName = (p: Product) => (t.categories as Record<string, string>)[p.category] ?? p.category

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link to={backTo} className={`mb-8 inline-flex items-center gap-1 text-sm font-medium ${accent.text} hover:underline`}>
        <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
        {pink ? t.nav.kbeauty : t.productPage.back}
      </Link>

      {loading && <p className="text-sm text-slate-400">{t.pharmacy.loading}</p>}
      {error && (
        <p className="text-sm text-red-600">
          {t.pharmacy.loadError} {error}
        </p>
      )}
      {!loading && !error && !product && <p className="text-sm text-slate-500">{t.productPage.notFound}</p>}

      {product && (
        <>
          <article className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className={`animate-rise relative aspect-square border border-slate-200 ${accent.tile} ${accent.shadow}`}>
              {product.imageUrl && (
                <Product3D src={product.imageUrl} alt={product.name} className="h-full w-full" pad="12%" />
              )}
              <div className="absolute left-0 top-0 flex flex-col items-start">
                {product.requiresPrescription && (
                  <span className="bg-amber-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-950">
                    ℞ {t.pharmacy.prescriptionRequired}
                  </span>
                )}
                {product.pharmacistRecommended && (
                  <span className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white ${pink ? 'bg-pink-600' : 'bg-blue-700'}`}>
                    <ShieldCheckIcon className="h-3.5 w-3.5" />
                    {pink ? t.kbeauty.pick : t.pharmacy.pharmacistRecommended}
                  </span>
                )}
              </div>
            </div>

            <div className="animate-rise [animation-delay:150ms]">
              <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${accent.text}`}>{categoryName(product)}</p>
              <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{product.name}</h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{product.description}</p>

              <p className="mt-6 text-4xl font-black tabular-nums">
                {product.price.toFixed(0)}
                <span className="ml-1.5 text-base font-medium text-slate-400">ден.</span>
              </p>

              <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200 text-sm">
                <div className="flex items-center justify-between py-3">
                  <dt className="text-slate-500">{t.productPage.availability}</dt>
                  <dd className={`flex items-center gap-1.5 font-medium ${STOCK_CLASS[product.stock]}`}>
                    <span className="h-1.5 w-1.5 bg-current" />
                    {t.stock[product.stock]}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-slate-500">{t.productPage.stores}</dt>
                  <dd className="flex items-center gap-1.5 font-medium text-slate-800">
                    <MapPinIcon className="h-4 w-4 text-slate-400" />
                    {product.nearbyStoreCount > 1 ? t.pharmacy.nearbyStores(product.nearbyStoreCount) : t.pharmacy.onlyOneLeft}
                  </dd>
                </div>
              </dl>

              {product.requiresPrescription && (
                <p className="mt-4 border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  {t.pharmacy.prescriptionNote}
                </p>
              )}

              <button
                onClick={() => addToCart(product.id)}
                className={`mt-6 flex w-full items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white transition-colors sm:w-auto sm:px-10 ${accent.bg}`}
              >
                <ShoppingCartIcon className="h-4 w-4" />
                {t.pharmacy.addToCart}
                {cart[product.id] ? <span className="tabular-nums">({cart[product.id]})</span> : null}
              </button>
            </div>
          </article>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className={`border-l-4 pl-3 text-lg font-semibold ${pink ? 'border-pink-500' : 'border-blue-600'}`}>
                {t.productPage.related(categoryName(product))}
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                {related.map((p, i) => (
                  <Reveal key={p.id} delay={i * 80}>
                    <Link to={`/products/${p.id}`} className="group block h-full border border-slate-200 bg-white">
                      <Product3D src={p.imageUrl!} alt={p.name} className="aspect-square" pad="12%" />
                      <div className="p-3 sm:p-4">
                        <h3 className="text-sm font-semibold leading-snug group-hover:underline">{p.name}</h3>
                        <p className="mt-2 font-semibold tabular-nums">
                          {p.price.toFixed(0)}
                          <span className="ml-1 text-xs font-medium text-slate-400">ден.</span>
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
