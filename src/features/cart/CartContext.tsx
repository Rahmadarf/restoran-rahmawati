import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { RESTAURANT } from '../../data/restaurant'
import { normalizeRow, sameSelection, unitPrice } from '../../lib/cart-model'
import type { CartRow } from '../../types/cart'
import {
  CartContext,
  type AddResult,
  type CartContextValue,
} from './cart-context'

const STORAGE_KEY = 'rahmawati-cart-v2'
const LEGACY_KEY = 'rahmawati-preview-cart'

function read<T>(key: string, fallback: T): T {
  try {
    return (JSON.parse(sessionStorage.getItem(key) as string) as T) ?? fallback
  } catch {
    /* Ketersediaan storage berbeda antarbrowser. */
    return fallback
  }
}

/** Memuat keranjang v2, dengan migrasi dari keranjang preview tahap pertama. */
function readStoredCart(): CartRow[] {
  const stored = read<unknown>(STORAGE_KEY, null)
  if (Array.isArray(stored)) {
    return stored.map((row) => normalizeRow(row)).filter((row) => row !== null)
  }

  const legacy = read<Record<string, number> | null>(LEGACY_KEY, null)
  if (legacy && typeof legacy === 'object') {
    return Object.entries(legacy)
      .map(([id, qty]) => normalizeRow({ id, qty }))
      .filter((row) => row !== null)
  }
  return []
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [rows, setRows] = useState<CartRow[]>(readStoredCart)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rows))
    } catch {
      /* Abaikan jika storage diblokir. */
    }
  }, [rows])

  const addRow = useCallback<CartContextValue['addRow']>((input) => {
    const row = normalizeRow(input)
    if (!row) return 'rejected'

    let result: AddResult = 'added'
    setRows((current) => {
      const existing = current.find((item) => sameSelection(item, row))
      if (existing && existing.qty + row.qty > RESTAURANT.maxQtyPerItem) {
        result = 'max'
        return current
      }
      if (existing) {
        return current.map((item) =>
          item.key === existing.key
            ? { ...item, qty: item.qty + row.qty }
            : item,
        )
      }
      return [...current, row]
    })
    return result
  }, [])

  const updateRow = useCallback<CartContextValue['updateRow']>((key, input) => {
    const row = normalizeRow({ ...input, key })
    if (!row) return
    setRows((current) => current.map((item) => (item.key === key ? row : item)))
  }, [])

  const changeQuantity = useCallback<CartContextValue['changeQuantity']>(
    (key, delta) => {
      setRows((current) =>
        current
          .map((item) =>
            item.key === key
              ? {
                  ...item,
                  qty: Math.min(RESTAURANT.maxQtyPerItem, item.qty + delta),
                }
              : item,
          )
          .filter((item) => item.qty > 0),
      )
    },
    [],
  )

  const remove = useCallback<CartContextValue['remove']>((key) => {
    setRows((current) => current.filter((item) => item.key !== key))
  }, [])

  const value = useMemo<CartContextValue>(() => {
    const count = rows.reduce((sum, row) => sum + row.qty, 0)
    const total = rows.reduce((sum, row) => sum + unitPrice(row) * row.qty, 0)
    return {
      rows,
      count,
      total,
      addRow,
      updateRow,
      changeQuantity,
      remove,
      rowByKey: (key: string) => rows.find((row) => row.key === key),
    }
  }, [rows, addRow, updateRow, changeQuantity, remove])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
