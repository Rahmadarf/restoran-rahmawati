/** Varian, level pedas, dan tambahan per menu. Data contoh untuk prototype. */
export type PricedOption = [label: string, price: number]

export type OptionSet = {
  variants: PricedOption[]
  spicy: string[]
  extras: PricedOption[]
}

const defaults: OptionSet = {
  variants: [['Porsi standar', 0]],
  spicy: ['Tidak pedas', 'Sedang', 'Pedas'],
  extras: [
    ['Nasi putih', 6000],
    ['Tempe goreng', 6000],
    ['Sambal ekstra', 4000],
  ],
}

const byId: Record<string, OptionSet> = {
  ayam: {
    ...defaults,
    variants: [
      ['Paha', 0],
      ['Dada', 0],
    ],
  },
  nasi: {
    ...defaults,
    variants: [
      ['Kampung', 0],
      ['Spesial + bakso', 8000],
    ],
    extras: [
      ['Telur ceplok', 5000],
      ['Ayam ekstra', 8000],
    ],
  },
  sate: {
    ...defaults,
    variants: [
      ['10 tusuk', 0],
      ['15 tusuk', 15000],
    ],
    extras: [
      ['Lontong', 5000],
      ['Saus kacang ekstra', 4000],
    ],
  },
  teh: {
    variants: [
      ['Manis', 0],
      ['Tawar', 0],
    ],
    spicy: [],
    extras: [['Lemon', 3000]],
  },
  keluarga: {
    ...defaults,
    variants: [
      ['4 orang', 0],
      ['6 orang', 65000],
    ],
    extras: [
      ['Tempe 4 potong', 12000],
      ['Sambal ekstra', 4000],
    ],
  },
  'soto-baru': {
    ...defaults,
    variants: [
      ['Nasi terpisah', 0],
      ['Nasi dicampur', 0],
    ],
    extras: [
      ['Telur rebus', 5000],
      ['Ayam ekstra', 8000],
    ],
  },
}

export const optionsFor = (id: string): OptionSet => byId[id] ?? defaults
