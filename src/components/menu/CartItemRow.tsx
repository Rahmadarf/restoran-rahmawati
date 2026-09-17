import { Link } from 'react-router-dom'

import { productById } from '../../data/menu'
import { describeRow, unitPrice } from '../../lib/cart-model'
import { money } from '../../lib/currency'
import type { CartRow } from '../../types/cart'
import { QuantitySelector } from './QuantitySelector'

type CartItemRowProps = {
  row: CartRow
  onChangeQuantity: (delta: number) => void
  onRemove: () => void
  /** `compact` untuk dialog ringkasan, `full` untuk halaman Keranjang. */
  variant?: 'compact' | 'full'
  /** Wajib pada varian `full`: catatan per item bisa diubah langsung. */
  onNoteChange?: (note: string) => void
}

export function CartItemRow({
  row,
  onChangeQuantity,
  onRemove,
  variant = 'compact',
  onNoteChange,
}: CartItemRowProps) {
  const item = productById(row.id)
  if (!item) return null

  const quantity = (
    <QuantitySelector
      name={item.name}
      quantity={row.qty}
      onChange={onChangeQuantity}
    />
  )
  const removeButton = (
    <button
      className="remove"
      type="button"
      aria-label={`Hapus ${item.name}`}
      onClick={onRemove}
    >
      Hapus
    </button>
  )

  if (variant === 'compact') {
    return (
      <article className="cart-row" data-component="CartItemRow">
        <img src={`/assets/${item.img}`} alt={item.name} />
        <div className="cart-row-info">
          <h3>{item.name}</h3>
          <p>
            {describeRow(row)} · {money(unitPrice(row))}
          </p>
          {quantity}
        </div>
        {removeButton}
      </article>
    )
  }

  const editHref = `/detail-menu?edit=${row.key}`
  const noteId = `note-${row.key}`

  return (
    <article className="cart-item-full" data-component="CartItemRow">
      <Link
        className="cart-item-image"
        to={editHref}
        aria-label={`Ubah pilihan ${item.name}`}
      >
        <img src={`/assets/${item.img}`} alt={item.name} />
      </Link>
      <div className="cart-item-details">
        <div className="cart-item-heading">
          <h3>{item.name}</h3>
          <strong>{money(unitPrice(row) * row.qty)}</strong>
        </div>
        <p className="small muted">{describeRow(row)}</p>
        <p className="unit-price">{money(unitPrice(row))} / porsi</p>
        <div className="cart-item-actions">
          {quantity}
          <Link className="text-link small" to={editHref}>
            Ubah pilihan
          </Link>
          {removeButton}
        </div>
        <div className="field item-note-field">
          <label htmlFor={noteId}>
            Catatan item <span className="optional">(opsional)</span>
          </label>
          <input
            id={noteId}
            value={row.note}
            maxLength={300}
            placeholder="Contoh: tanpa timun"
            onChange={(event) => onNoteChange?.(event.target.value)}
          />
        </div>
      </div>
    </article>
  )
}
