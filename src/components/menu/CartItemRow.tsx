import { money } from '../../lib/currency'
import type { MenuItem } from '../../types/menu'
import { QuantitySelector } from './QuantitySelector'

type CartItemRowProps = {
  item: MenuItem
  quantity: number
  onChangeQuantity: (delta: number) => void
  onRemove: () => void
}

export function CartItemRow({
  item,
  quantity,
  onChangeQuantity,
  onRemove,
}: CartItemRowProps) {
  return (
    <article className="cart-row" data-component="CartItemRow">
      <img src={`/assets/${item.img}`} alt={item.name} />
      <div className="cart-row-info">
        <h3>{item.name}</h3>
        <p>Porsi standar · {money(item.price)}</p>
        <QuantitySelector
          name={item.name}
          quantity={quantity}
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
