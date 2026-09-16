import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type CartState = Record<number, number>

interface CartContextValue {
  cart: CartState
  totalItems: number
  addToCart: (id: number) => void
  removeFromCart: (id: number) => void
  setQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'zegin-cart'

function readStoredCart(): CartState {
  if (typeof window === 'undefined') return {}
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as CartState) : {}
  } catch {
    return {}
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>(readStoredCart)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // ignore — e.g. private browsing without storage access
    }
  }, [cart])

  const value = useMemo<CartContextValue>(() => {
    const addToCart = (id: number) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }))

    const removeFromCart = (id: number) =>
      setCart((c) => {
        const next = { ...c }
        delete next[id]
        return next
      })

    const setQuantity = (id: number, quantity: number) =>
      setCart((c) => {
        if (quantity <= 0) {
          const next = { ...c }
          delete next[id]
          return next
        }
        return { ...c, [id]: quantity }
      })

    const clearCart = () => setCart({})

    const totalItems = Object.values(cart).reduce((sum, n) => sum + n, 0)

    return { cart, totalItems, addToCart, removeFromCart, setQuantity, clearCart }
  }, [cart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
