export type MenuCategory =
  | 'Ayam & Ikan'
  | 'Nasi & Mi'
  | 'Kuah & Sayur'
  | 'Minuman'
  | 'Paket Keluarga'

export type MenuItem = {
  id: string
  name: string
  desc: string
  price: number
  img: string
  cat: MenuCategory
  badge: string
  sold?: boolean
}

/** Filter kategori pada CategoryTabs, termasuk pintasan non-kategori. */
export type CategoryFilter = 'Semua' | 'Favorit' | MenuCategory
