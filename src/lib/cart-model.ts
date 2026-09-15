import { productById } from '../data/menu'
import { optionsFor } from '../data/options'
import { RESTAURANT } from '../data/restaurant'
import type { CartRow, CartRowInput } from '../types/cart'

export const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7)

/**
 * Menyaring isian menjadi baris keranjang yang valid.
 * Menu yang tidak dikenal atau habis ditolak agar pilihan lama tidak terbawa.
 */
export function normalizeRow(raw: CartRowInput | null): CartRow | null {
  const product = raw ? productById(raw.id) : undefined
  if (!raw || !product || product.sold) return null

  const options = optionsFor(raw.id)
  const variant =
    Number.isInteger(raw.variant) && options.variants[raw.variant as number]
      ? (raw.variant as number)
      : 0
  const extra = Array.isArray(raw.extra)
    ? [
        ...new Set(
          raw.extra.filter(
            (index) => Number.isInteger(index) && options.extras[index],
          ),
        ),
      ]
    : []

  return {
    key:
      typeof raw.key === 'string' && /^[a-z0-9-]+$/i.test(raw.key)
        ? raw.key
        : uid(),
    id: raw.id,
    qty: Math.max(
      1,
      Math.min(
        RESTAURANT.maxQtyPerItem,
        Math.floor(Number(raw.qty) || 1),
      ),
    ),
    variant,
    spice:
      raw.spice && options.spicy.includes(raw.spice)
        ? raw.spice
        : options.spicy[0] || '',
    extra,
    note: String(raw.note || '').slice(0, 300),
  }
}

/** Harga satu porsi: harga dasar + varian + seluruh tambahan. */
export function unitPrice(row: CartRow) {
  const options = optionsFor(row.id)
  const base = productById(row.id)?.price ?? 0
  return (
    base +
    options.variants[row.variant][1] +
    row.extra.reduce((sum, index) => sum + options.extras[index][1], 0)
  )
}

/** Ringkasan pilihan: varian · level pedas · tambahan. */
export function describeRow(row: CartRow) {
  const options = optionsFor(row.id)
  return [
    options.variants[row.variant][0],
    row.spice,
    ...row.extra.map((index) => options.extras[index][0]),
  ]
    .filter(Boolean)
    .join(' · ')
}

/** Dua baris digabung ketika menu dan seluruh pilihannya sama. */
export const sameSelection = (a: CartRow, b: CartRow) =>
  a.id === b.id &&
  a.variant === b.variant &&
  a.spice === b.spice &&
  JSON.stringify(a.extra) === JSON.stringify(b.extra) &&
  a.note === b.note
