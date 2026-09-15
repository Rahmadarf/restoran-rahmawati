export type ReviewState =
  | 'normal'
  | 'loading'
  | 'empty'
  | 'no-results'
  | 'sold'
  | 'validation'
  | 'cart-empty'

const STATES: { value: ReviewState; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'loading', label: 'Loading' },
  { value: 'empty', label: 'Menu kosong' },
  { value: 'no-results', label: 'Pencarian kosong' },
  { value: 'sold', label: 'Produk habis' },
  { value: 'validation', label: 'Error nomor meja' },
  { value: 'cart-empty', label: 'Keranjang kosong' },
]

type ReviewToolsProps = {
  state: ReviewState
  onSelect: (state: ReviewState) => void
}

/** Kontrol khusus prototype untuk membandingkan state tampilan. */
export function ReviewTools({ state, onSelect }: ReviewToolsProps) {
  return (
    <details className="review-tools">
      <summary>Mode review · Lihat variasi tampilan</summary>
      <div className="review-content">
        <p>
          Kontrol khusus prototype untuk membandingkan state. Keranjang di sini
          hanya ringkasan interaksi tambah; halaman Keranjang dibuat pada tahap
          berikutnya.
        </p>
        <div className="state-buttons" aria-label="Variasi tampilan">
          {STATES.map((item) => (
            <button
              key={item.value}
              type="button"
              data-state={item.value}
              aria-pressed={item.value === state}
              onClick={() => onSelect(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="component-list">
          SiteHeader · MobileNavigation · SiteFooter · WhatsAppButton ·
          OutletHeader · TableContextBanner · TableNumberInput · MenuSearch ·
          CategoryTabs · MenuCard · QuantitySelector · StickyCartBar
        </p>
      </div>
    </details>
  )
}
