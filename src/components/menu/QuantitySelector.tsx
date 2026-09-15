import { RESTAURANT } from '../../data/restaurant'

type QuantitySelectorProps = {
  name: string
  quantity: number
  onChange: (delta: number) => void
}

export function QuantitySelector({
  name,
  quantity,
  onChange,
}: QuantitySelectorProps) {
  return (
    <div className="quantity" data-component="QuantitySelector">
      <button
        type="button"
        aria-label={`Kurangi ${name}`}
        onClick={() => onChange(-1)}
      >
        −
      </button>
      <output aria-label={`Jumlah ${name}`}>{quantity}</output>
      <button
        type="button"
        aria-label={`Tambah ${name}`}
        disabled={quantity >= RESTAURANT.maxQtyPerItem}
        onClick={() => onChange(1)}
      >
        +
      </button>
    </div>
  )
}
