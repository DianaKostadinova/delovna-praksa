import { useEffect, useState } from 'react'
import { api } from '../api/client'
import type { Product } from '../api/types'
import { useLanguage } from '../i18n/LanguageContext'
import { translateProduct } from '../i18n/content'
import { useCart } from '../context/CartContext'
import { Reveal } from '../components/Reveal'

const CUTE_FONT = { fontFamily: "'Baloo 2', cursive" }

const ROUTINE_STEPS = [
  { emoji: '🧼', key: 'routineCleanse' as const },
  { emoji: '💧', key: 'routineTone' as const },
  { emoji: '✨', key: 'routineTreat' as const },
  { emoji: '🧴', key: 'routineMoisturize' as const },
  { emoji: '☀️', key: 'routineProtect' as const },
]

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
    <div className="bg-gradient-to-b from-pink-50 via-rose-50 to-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-pink-200 via-rose-200 to-pink-100 px-8 py-10 text-center shadow-sm">
          <h1 style={CUTE_FONT} className="text-3xl font-bold text-pink-800 sm:text-4xl">
            {t.kbeauty.title} 🌸
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-pink-900/70">{t.kbeauty.subtitle}</p>
        </div>

        <Reveal className="mb-10 rounded-3xl border border-pink-100 bg-white/70 p-6 shadow-sm sm:p-8">
          <h2 style={CUTE_FONT} className="text-center text-xl font-bold text-pink-800">
            {t.kbeauty.routineTitle}
          </h2>
          <p className="mx-auto mt-1 max-w-lg text-center text-xs text-pink-900/60">{t.kbeauty.routineSubtitle}</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            {ROUTINE_STEPS.map((step, i) => (
              <div key={step.key} className="flex items-center gap-3 sm:flex-col sm:gap-1.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-200 to-rose-200 text-xl shadow-sm">
                  {step.emoji}
                </div>
                <span style={CUTE_FONT} className="text-sm font-semibold text-pink-800 sm:text-xs">
                  {t.kbeauty[step.key]}
                </span>
                {i < ROUTINE_STEPS.length - 1 && <span className="hidden text-pink-300 sm:block">→</span>}
              </div>
            ))}
          </div>
        </Reveal>

        {loading ? (
          <p className="text-sm text-pink-400">{t.pharmacy.loading}</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {translatedProducts.map((product, i) => {
              const isWishlisted = wishlist.has(product.id)
              const isBestSeller = i % 3 === 1 && !product.pharmacistRecommended
              return (
                <Reveal key={product.id} delay={i * 80}>
                  <div className="group flex h-full flex-col rounded-3xl border border-pink-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-lg hover:shadow-pink-100">
                    <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100">
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
                        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-pink-600 shadow">
                          💗 {t.kbeauty.pick}
                        </span>
                      )}
                      {isBestSeller && (
                        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-rose-600 shadow">
                          🔥 {t.kbeauty.bestSeller}
                        </span>
                      )}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        title={isWishlisted ? t.kbeauty.wishlistRemove : t.kbeauty.wishlistAdd}
                        aria-label={isWishlisted ? t.kbeauty.wishlistRemove : t.kbeauty.wishlistAdd}
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-sm shadow transition-transform hover:scale-110 active:scale-95"
                      >
                        {isWishlisted ? '❤️' : '🤍'}
                      </button>
                    </div>
                    <div className="flex-1">
                      <h3 style={CUTE_FONT} className="text-sm font-semibold text-pink-900">
                        {product.name}
                      </h3>
                      <p className="text-xs text-pink-900/60">{product.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-bold text-pink-600">{product.price.toFixed(0)} ден.</span>
                        <span className="text-xs font-medium text-rose-400">{t.stock[product.stock]}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="mt-3 w-full rounded-full bg-pink-500 py-2 text-xs font-semibold text-white transition-transform duration-150 hover:bg-pink-600 active:scale-95"
                    >
                      🛍️ {t.pharmacy.addToCart}
                      {cart[product.id] ? ` (${cart[product.id]})` : ''}
                    </button>
                  </div>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
