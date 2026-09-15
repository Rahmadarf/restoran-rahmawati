import { RESTAURANT } from '../data/restaurant'

/** Nomor meja contoh: bilangan bulat 1–50. */
export function isValidTable(raw: string | number) {
  const value = String(raw)
  return (
    /^\d{1,2}$/.test(value) &&
    Number(value) >= RESTAURANT.tableRange.min &&
    Number(value) <= RESTAURANT.tableRange.max
  )
}
