import { RESTAURANT } from '../../data/restaurant'
import { useChangePulse } from '../../hooks/useChangePulse'

type QuantitySelectorProps = {
  /** Nama menu untuk label tombol, misalnya "Kurangi Ayam Bakar". */
  name: string
  quantity: number
  onChange: (delta: number) => void
  /**
   * Batas bawah; tombol kurangi nonaktif saat tercapai. Default 0: di
   * keranjang, mengurangi sampai nol berarti menghapus baris.
   */
  min?: number
  disabled?: boolean
  outputId?: string
}

export function QuantitySelector({
  name,
  quantity,
  onChange,
  min = 0,
  disabled,
  outputId,
}: QuantitySelectorProps) {
  const bumped = useChangePulse(quantity)

  return (
    <div className="quantity" data-component="QuantitySelector">
      <button
        type="button"
        aria-label={`Kurangi ${name}`}
        disabled={disabled || quantity <= min}
        onClick={() => onChange(-1)}
      >
        −
      </button>
      {/* Live region tetap stabil; hanya angka yang di-remount untuk pulse. */}
      <output id={outputId} aria-label={`Jumlah ${name}`} aria-live="polite">
        <span key={quantity} data-bump={bumped || undefined}>
          {quantity}
        </span>
      </output>
      <button
        type="button"
        aria-label={`Tambah ${name}`}
        disabled={disabled || quantity >= RESTAURANT.maxQtyPerItem}
        onClick={() => onChange(1)}
      >
        +
      </button>
    </div>
  )
}
