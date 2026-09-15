import { productById } from '../../data/menu'
import { describeRow, unitPrice } from '../../lib/cart-model'
import { money } from '../../lib/currency'
import type { CartRow } from '../../types/cart'
import { QuantitySelector } from './QuantitySelector'

type CartItemRowProps = {
  row: CartRow
  onChangeQuantity: (delta: number) => void
  onRemove: () => void
}

export function CartItemRow({
  row,
  onChangeQuantity,
  onRemove,
}: CartItemRowProps) {
  const item = productById(row.id)
  if (!item) return null

  return (
    <article className="cart-row" data-component="CartItemRow">
      <img src={`/assets/${item.img}`} alt={item.name} />
      <div className="cart-row-info">
        <h3>{item.name}</h3>
        <p>
          {describeRow(row)} · {money(unitPrice(row))}
        </p>
        <QuantitySelector
          name={item.name}
          quantity={row.qty}
          onChange={onChangeQuantity}
        />
      </div>
      <button
        className="remove"
        type="button"
        aria-label={`Hapus ${item.name}`}
        onClick={onRemove}
      >
        Hapus
      </button>
    </article>
  )
}
