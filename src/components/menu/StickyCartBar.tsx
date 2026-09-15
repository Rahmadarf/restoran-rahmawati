import { money } from '../../lib/currency'
import { ArrowRightIcon } from '../ui/Icons'

type StickyCartBarProps = {
  count: number
  total: number
  onOpen: () => void
}

export function StickyCartBar({ count, total, onOpen }: StickyCartBarProps) {
  return (
    <button
      id="cart-bar"
      className="cart-bar"
      type="button"
      data-component="StickyCartBar"
      data-cart-open
      hidden={count === 0}
      aria-label={`Lihat pilihan Anda, ${count} item, ${money(total)}`}
      onClick={onOpen}
    >
      <span className="cart-start">
        <span className="cart-count" id="cart-count">
          {count}
        </span>
        <span className="cart-label">Lihat Pilihan Anda</span>
      </span>
      <span className="cart-total" id="cart-total">
        {money(total)}
      </span>
      <ArrowRightIcon />
    </button>
  )
}
