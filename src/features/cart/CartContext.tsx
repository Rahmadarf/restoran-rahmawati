import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { productById } from '../../data/menu'
import { RESTAURANT } from '../../data/restaurant'
import { CartContext, type Cart, type CartContextValue } from './cart-context'

const STORAGE_KEY = 'rahmawati-preview-cart'

function readStoredCart(): Cart {
  const cart: Cart = {}
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}')
    for (const [id, qty] of Object.entries(stored ?? {})) {
      const product = productById(id)
      if (
        product &&
        !product.sold &&
        Number.isInteger(qty) &&
        (qty as number) > 0 &&
        (qty as number) <= RESTAURANT.maxQtyPerItem
      ) {
        cart[id] = qty as number
      }
    }
  } catch {
    /* Ketersediaan storage berbeda antarbrowser. */
  }
  return cart
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(readStoredCart)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      /* Abaikan jika storage diblokir. */
    }
  }, [cart])

  const add = useCallback<CartContextValue['add']>((id) => {
    const product = productById(id)
    if (!product || product.sold) return 'rejected'
    let result: 'added' | 'max' = 'added'
    setCart((current) => {
      if ((current[id] || 0) >= RESTAURANT.maxQtyPerItem) {
        result = 'max'
        return current
      }
      return { ...current, [id]: (current[id] || 0) + 1 }
    })
    return result
  }, [])

  const changeQuantity = useCallback<CartContextValue['changeQuantity']>(
    (id, delta) => {
      setCart((current) => {
        const next = { ...current }
        next[id] = Math.min(RESTAURANT.maxQtyPerItem, (next[id] || 0) + delta)
        if (next[id] <= 0) delete next[id]
        return next
      })
    },
    [],
  )

  const remove = useCallback<CartContextValue['remove']>((id) => {
    setCart((current) => {
      const next = { ...current }
      delete next[id]
      return next
    })
  }, [])

  const value = useMemo<CartContextValue>(() => {
    const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0)
    const total = Object.entries(cart).reduce(
      (sum, [id, qty]) => sum + (productById(id)?.price ?? 0) * qty,
      0,
    )
    return { cart, count, total, add, changeQuantity, remove }
  }, [cart, add, changeQuantity, remove])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
