import type { CategoryFilter } from '../types/menu'

export const CATEGORIES: { value: CategoryFilter; label: string }[] = [
  { value: 'Semua', label: 'Semua' },
  { value: 'Favorit', label: '✦ Favorit' },
  { value: 'Ayam & Ikan', label: 'Ayam & Ikan' },
  { value: 'Nasi & Mi', label: 'Nasi & Mi' },
  { value: 'Kuah & Sayur', label: 'Kuah & Sayur' },
  { value: 'Minuman', label: 'Minuman' },
  { value: 'Paket Keluarga', label: 'Paket Keluarga' },
]
