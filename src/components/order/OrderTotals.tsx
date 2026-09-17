import { money } from '../../lib/currency'

type OrderTotalsProps = {
  count: number
  total: number
}

/** Subtotal, biaya tambahan, dan total; dipakai Keranjang dan Checkout. */
export function OrderTotals({ count, total }: OrderTotalsProps) {
  return (
    <div>
      <div className="summary-line">
        <span>Subtotal ({count} item)</span>
        <span>{money(total)}</span>
      </div>
      <div className="summary-line">
        <span>Biaya tambahan</span>
        <span>Rp0</span>
      </div>
      <div className="summary-line grand">
        <strong>Total</strong>
        <strong>{money(total)}</strong>
      </div>
    </div>
  )
}
