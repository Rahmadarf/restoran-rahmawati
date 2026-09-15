import { createContext, useContext } from 'react'

export type Cart = Record<string, number>

export type CartContextValue = {
  cart: Cart
  count: number
  total: number
  /** `max` ketika batas porsi per menu tercapai, `rejected` untuk menu habis. */
  add: (id: string) => 'added' | 'max' | 'rejected'
  changeQuantity: (id: string, delta: number) => void
  remove: (id: string) => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart harus dipakai di dalam CartProvider')
  return context
}
