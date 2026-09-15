import { createContext, useContext } from 'react'

import type { CartRow, CartRowInput } from '../../types/cart'

export type AddResult = 'added' | 'max' | 'rejected'

export type CartContextValue = {
  rows: CartRow[]
  count: number
  total: number
  /** `max` ketika pilihan yang sama melewati batas porsi. */
  addRow: (row: CartRowInput) => AddResult
  /** Mengganti isi satu baris, dipakai saat mengubah pilihan dari detail menu. */
  updateRow: (key: string, row: CartRowInput) => void
  changeQuantity: (key: string, delta: number) => void
  remove: (key: string) => void
  rowByKey: (key: string) => CartRow | undefined
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart harus dipakai di dalam CartProvider')
  return context
}
