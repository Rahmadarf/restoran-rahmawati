export type CartRow = {
  /** Identitas baris keranjang, bukan identitas menu. */
  key: string
  id: string
  qty: number
  /** Indeks varian pada `optionsFor(id).variants`. */
  variant: number
  spice: string
  /** Indeks tambahan pada `optionsFor(id).extras`. */
  extra: number[]
  note: string
}

/** Isian mentah dari form atau storage sebelum dinormalisasi. */
export type CartRowInput = {
  key?: string
  id: string
  qty?: number
  variant?: number
  spice?: string
  extra?: number[]
  note?: string
}
