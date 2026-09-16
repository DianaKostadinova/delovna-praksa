import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import type { Product } from '../api/types'
import { useLanguage } from '../i18n/LanguageContext'
import { translateProduct } from '../i18n/content'
import { useCart } from '../context/CartContext'

type Step = 'cart' | 'details' | 'payment' | 'success'
type PaymentMethod = 'cash' | 'card'

export function Cart() {
  const { t, language } = useLanguage()
  const { cart, setQuantity, removeFromCart, clearCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState<Step>('cart')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')

  useEffect(() => {
    api
      .getProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  const cartIds = Object.keys(cart).map(Number)
  const items = cartIds
    .map((id) => {
      const product = products.find((p) => p.id === id)
      return product ? { product: translateProduct(product, language), quantity: cart[id] } : null
    })
    .filter((item): item is { product: Product; quantity: number } => item !== null)

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const detailsValid = firstName.trim() && lastName.trim() && address.trim() && contact.trim()
  const paymentValid = paymentMethod === 'cash' || (cardNumber.trim() && cardExpiry.trim() && cardCvv.trim())

  function handleConfirmOrder() {
    clearCart()
    setStep('success')
  }

  if (step === 'success') {
    return (
      <div className="mx-auto max-w-2xl px-6 py-8">
        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <span className="text-3xl text-green-600">✓</span>
          </div>
          <h1 className="mt-5 text-xl font-bold text-slate-900">{t.cartPage.successTitle}</h1>
          <p className="mt-1 max-w-xs text-sm text-slate-500">{t.cartPage.successCopy}</p>
          <Link
            to="/pharmacy"
            className="mt-6 rounded-md bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            {t.cartPage.continueShopping}
          </Link>
        </div>
      </div>
    )
  }

  if (step === 'details') {
    return (
      <div className="mx-auto max-w-md px-6 py-8">
        <h1 className="text-2xl font-bold text-slate-900">{t.cartPage.detailsTitle}</h1>
        <div className="mt-6 space-y-4">
          <Field label={t.cartPage.firstName} value={firstName} onChange={setFirstName} />
          <Field label={t.cartPage.lastName} value={lastName} onChange={setLastName} />
          <Field label={t.cartPage.address} value={address} onChange={setAddress} />
          <Field label={t.cartPage.contact} value={contact} onChange={setContact} />
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setStep('cart')}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-blue-400 hover:text-blue-700"
          >
            {t.cartPage.back}
          </button>
          <button
            onClick={() => detailsValid && setStep('payment')}
            disabled={!detailsValid}
            className="flex-1 rounded-md bg-blue-700 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t.cartPage.continueButton}
          </button>
        </div>
      </div>
    )
  }

  if (step === 'payment') {
    return (
      <div className="mx-auto max-w-md px-6 py-8">
        <h1 className="text-2xl font-bold text-slate-900">{t.cartPage.paymentTitle}</h1>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setPaymentMethod('cash')}
            className={`flex-1 rounded-md border py-3 text-sm font-semibold transition-colors ${
              paymentMethod === 'cash'
                ? 'border-blue-700 bg-blue-700 text-white'
                : 'border-slate-300 text-slate-600 hover:border-blue-400'
            }`}
          >
            💵 {t.cartPage.cash}
          </button>
          <button
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 rounded-md border py-3 text-sm font-semibold transition-colors ${
              paymentMethod === 'card'
                ? 'border-blue-700 bg-blue-700 text-white'
                : 'border-slate-300 text-slate-600 hover:border-blue-400'
            }`}
          >
            💳 {t.cartPage.card}
          </button>
        </div>

        {paymentMethod === 'card' && (
          <div className="mt-5 space-y-4">
            <Field label={t.cartPage.cardNumber} value={cardNumber} onChange={setCardNumber} placeholder="4242 4242 4242 4242" />
            <div className="flex gap-3">
              <Field label={t.cartPage.cardExpiry} value={cardExpiry} onChange={setCardExpiry} placeholder="MM/YY" />
              <Field label={t.cartPage.cardCvv} value={cardCvv} onChange={setCardCvv} placeholder="123" />
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setStep('details')}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-blue-400 hover:text-blue-700"
          >
            {t.cartPage.back}
          </button>
          <button
            onClick={() => paymentValid && handleConfirmOrder()}
            disabled={!paymentValid}
            className="flex-1 rounded-md bg-green-600 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t.cartPage.confirmOrder}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-2xl font-bold text-slate-900">{t.cartPage.title}</h1>
      <p className="mt-1 text-sm text-slate-500">{t.cartPage.subtitle}</p>

      {loading ? (
        <p className="mt-8 text-sm text-slate-400">{t.pharmacy.loading}</p>
      ) : items.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-16 text-center">
          <p className="text-lg font-semibold text-slate-800">{t.cartPage.emptyTitle}</p>
          <p className="mt-1 max-w-xs text-sm text-slate-500">{t.cartPage.emptyCopy}</p>
          <Link
            to="/pharmacy"
            className="mt-5 rounded-md bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            {t.cartPage.continueShopping}
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-200">
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
                  <h3 className="truncate text-sm font-semibold text-slate-800">{product.name}</h3>
                  <p className="truncate text-xs text-slate-500">{product.description}</p>
                  <p className="mt-1 text-sm font-bold text-blue-700">{product.price.toFixed(0)} ден.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(product.id, quantity - 1)}
                    className="h-7 w-7 rounded-md border border-slate-300 text-sm font-semibold text-slate-600 hover:border-blue-400 hover:text-blue-700"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-medium text-slate-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(product.id, quantity + 1)}
                    className="h-7 w-7 rounded-md border border-slate-300 text-sm font-semibold text-slate-600 hover:border-blue-400 hover:text-blue-700"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-xs font-medium text-red-600 hover:text-red-700"
                >
                  {t.cartPage.remove}
                </button>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">{t.cartPage.itemsCount(totalItems)}</p>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-base font-bold text-slate-900">
              <span>{t.cartPage.total}</span>
              <span>{total.toFixed(0)} ден.</span>
            </div>
            <button
              onClick={() => setStep('details')}
              className="mt-4 w-full rounded-md bg-blue-700 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              {t.cartPage.checkoutButton}
            </button>
            <Link
              to="/pharmacy"
              className="mt-2 block rounded-md border border-slate-300 py-2 text-center text-sm font-semibold text-slate-600 hover:border-blue-400 hover:text-blue-700"
            >
              {t.cartPage.continueShopping}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-400"
      />
    </label>
  )
}
