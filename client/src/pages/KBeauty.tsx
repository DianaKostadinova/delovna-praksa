import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import type { Product } from '../api/types'
import { useLanguage } from '../i18n/LanguageContext'
import { translateProduct } from '../i18n/content'
import { useCart } from '../context/CartContext'
import { Reveal } from '../components/Reveal'
import { ParallaxBand } from '../components/ParallaxBand'
import { Product3D } from '../components/Product3D'
import { ShoppingCartIcon } from '../components/icons'

// Each routine step is illustrated by a product from the K-Beauty range that does that job.
const ROUTINE_STEPS = [
  { key: 'routineCleanse', image: '/images/product-kbeauty-roundlab.png' },
  { key: 'routineTone', image: '/images/product-kbeauty-somebymi.png' },
  { key: 'routineTreat', image: '/images/product-kbeauty-skin1004.png' },
  { key: 'routineMoisturize', image: '/images/product-kbeauty-joseon-cream.webp' },
  { key: 'routineProtect', image: '/images/product-kbeauty-tirtir.png' },
] as const

// Static so the intro collage shows even before (or without) the product request.
const INTRO_IMAGES = [
  '/images/product-kbeauty-anua-serum.png',
  '/images/product-kbeauty-joseon-cream.webp',
  '/images/product-kbeauty-roundlab.png',
]

function HeartIcon({ filled, className = '' }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} strokeLinejoin="round" aria-hidden>
      <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10z" />
    </svg>
  )
}

export function KBeauty() {
  const { t, language } = useLanguage()
  const { cart, addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState<Set<number>>(new Set())

  useEffect(() => {
    setLoading(true)
    api
      .getProducts({ category: 'K-Beauty' })
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  const translatedProducts = products.map((p) => translateProduct(p, language))

  const STOCK_CLASS: Record<Product['stock'], string> = {
    InStock: 'text-emerald-700',
    LowStock: 'text-amber-700',
    OutOfStock: 'text-red-700',
  }

  function toggleWishlist(id: number) {
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="bg-gradient-to-b from-pink-50/80 to-transparent text-slate-900">
      {/* ---------- Intro ---------- */}
      <section className="overflow-hidden border-b border-pink-200 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 lg:grid-cols-[1fr_minmax(0,460px)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-600">{t.kbeauty.badge}</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{t.kbeauty.title}</h1>
            <div className="rule-grow mt-4 h-1 w-20 bg-pink-600" style={{ transformOrigin: 'left' }} />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500 sm:text-base">{t.kbeauty.subtitle}</p>
          </div>
          <div className="grid grid-cols-3 items-end gap-4">
            {INTRO_IMAGES.map((src, i) => (
              <div
                key={src}
                className={`animate-rise border border-slate-200 bg-pink-50 p-3 shadow-[6px_6px_0_0_#db2777] ${i === 1 ? 'aspect-[3/4]' : 'aspect-square'}`}
                style={{ animationDelay: `${200 + i * 120}ms` }}
              >
                <img src={src} alt="" className="product-shot h-full w-full object-contain p-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* ---------- Routine: hovered step expands, like the home page's fact strip ---------- */}
        <section className="mb-14">
          <h2 className="border-l-4 border-pink-500 pl-3 text-lg font-semibold">{t.kbeauty.routineTitle}</h2>
          <p className="mt-1 pl-4 text-sm text-slate-500">{t.kbeauty.routineSubtitle}</p>
          <Reveal className="mt-6 flex flex-col gap-3 lg:h-72 lg:flex-row">
            {ROUTINE_STEPS.map(({ key, image }, i) => (
              <div
                key={key}
                className="group relative flex min-h-56 min-w-0 flex-col overflow-hidden border border-slate-200 bg-white p-5 transition-[flex-grow,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-pink-600 hover:bg-pink-600 lg:min-h-0 lg:flex-1 lg:hover:flex-[2.4]"
              >
                {/* Transparent product cut-out: faint at rest, full strength once the step expands. */}
                <img
                  src={image}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-0 h-[72%] w-[80%] object-contain object-right-top p-3 opacity-30 transition-[opacity,scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:opacity-100"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-pink-700 via-pink-600/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative font-mono text-4xl font-black text-pink-600 transition-colors duration-500 group-hover:text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="relative mt-auto pt-4 text-sm font-semibold uppercase tracking-wider transition-colors duration-500 group-hover:text-white">
                  {t.kbeauty[key]}
                </h3>
                <p className="relative mt-1 text-xs leading-relaxed text-slate-500 transition-colors duration-500 group-hover:text-pink-100 lg:line-clamp-2 lg:group-hover:line-clamp-none">
                  {t.kbeauty.routineDetails[i]}
                </p>
              </div>
            ))}
          </Reveal>
        </section>
      </div>

      <ParallaxBand
        tone="pink"
        image="/images/article-sunscreen-myths.webp"
        eyebrow={t.kbeauty.bandEyebrow}
        title={t.kbeauty.bandTitle}
        copy={t.kbeauty.bandCopy}
      />

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* ---------- Products ---------- */}
        {loading ? (
          <p className="text-sm text-slate-400">{t.pharmacy.loading}</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {translatedProducts.map((product, i) => {
              const isWishlisted = wishlist.has(product.id)
              const isBestSeller = i % 3 === 1 && !product.pharmacistRecommended
              const quantity = cart[product.id]
              return (
                <Reveal key={product.id} delay={(i % 4) * 80}>
                  <article className="group flex h-full flex-col border border-pink-100 bg-white transition-colors hover:border-pink-400">
                    <div className="relative">
                      <Link to={`/products/${product.id}`} aria-label={product.name} className="block">
                        {product.imageUrl && <Product3D src={product.imageUrl} alt={product.name} className="aspect-square" />}
                      </Link>
                      {(product.pharmacistRecommended || isBestSeller) && (
                        <span
                          className={`absolute left-0 top-0 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white ${
                            product.pharmacistRecommended ? 'bg-pink-600' : 'bg-slate-900'
                          }`}
                        >
                          {product.pharmacistRecommended ? t.kbeauty.pick : t.kbeauty.bestSeller}
                        </span>
                      )}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        title={isWishlisted ? t.kbeauty.wishlistRemove : t.kbeauty.wishlistAdd}
                        aria-label={isWishlisted ? t.kbeauty.wishlistRemove : t.kbeauty.wishlistAdd}
                        aria-pressed={isWishlisted}
                        className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center border bg-white transition-colors ${
                          isWishlisted ? 'border-pink-600 text-pink-600' : 'border-slate-200 text-slate-400 hover:border-pink-600 hover:text-pink-600'
                        }`}
                      >
                        <HeartIcon filled={isWishlisted} className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex flex-1 flex-col p-3 sm:p-4">
                      <h3 className="text-sm font-semibold leading-snug sm:text-[15px]">
                        <Link to={`/products/${product.id}`} className="hover:text-pink-600 hover:underline">
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 hidden text-xs leading-relaxed text-slate-500 line-clamp-2 sm:block">{product.description}</p>
                      <div className="mt-3 flex items-baseline justify-between gap-2">
                        <p className="text-lg font-semibold tabular-nums">
                          {product.price.toFixed(0)}
                          <span className="ml-1 text-xs font-medium text-slate-400">ден.</span>
                        </p>
                        <span className={`flex items-center gap-1.5 text-[11px] font-medium ${STOCK_CLASS[product.stock]}`}>
                          <span className="h-1.5 w-1.5 bg-current" />
                          <span className="hidden sm:inline">{t.stock[product.stock]}</span>
                        </span>
                      </div>
                      <div className="mt-auto pt-3">
                        <button
                          onClick={() => addToCart(product.id)}
                          className="flex w-full items-center justify-center gap-2 bg-pink-600 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-pink-700 sm:text-sm"
                        >
                          <ShoppingCartIcon className="h-4 w-4" />
                          {t.pharmacy.addToCart}
                          {quantity ? <span className="tabular-nums">({quantity})</span> : null}
                        </button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
