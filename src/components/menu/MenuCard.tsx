import { Link } from 'react-router-dom'

import { isFavorite } from '../../data/menu'
import { badgeIsAccent, badgeLabel } from '../../lib/badges'
import { money } from '../../lib/currency'
import type { MenuItem } from '../../types/menu'
import { ArrowRightIcon } from '../ui/Icons'

type MenuCardProps = {
  item: MenuItem
  /** `home` memakai tautan Pesan, `menu` memakai tombol tambah keranjang. */
  variant: 'home' | 'menu'
  orderHref?: string
  onAdd?: () => void
}

export function MenuCard({ item, variant, orderHref, onAdd }: MenuCardProps) {
  const badge = badgeLabel(item)
  const detailHref = `/detail-menu?id=${item.id}`
  const photo = (
    <img
      src={`/assets/${item.img}`}
      alt={`${item.name} — foto ilustrasi penyajian`}
      loading="lazy"
      width={600}
      height={400}
    />
  )

  return (
    <article
      className={`product ${item.sold ? 'sold-out' : ''}`}
      data-component="MenuCard"
      data-id={item.id}
      data-category={item.cat}
      data-name={item.name}
      data-favorite={String(isFavorite(item.id))}
    >
      <div className="product-photo">
        {item.sold ? (
          photo
        ) : (
          <Link to={detailHref} aria-label={`Lihat detail ${item.name}`}>
            {photo}
          </Link>
        )}
        {badge ? (
          <span className={`badge ${badgeIsAccent(item) ? 'badge-accent' : ''}`}>
            {badge}
          </span>
        ) : null}
      </div>
      <div className="product-body">
        <h3>
          {item.sold ? item.name : <Link to={detailHref}>{item.name}</Link>}
        </h3>
        <p>{item.desc}</p>
        <div className="product-bottom">
          <span className="price">{money(item.price)}</span>
          {variant === 'home' ? (
            <Link
              className="add-btn"
              to={orderHref ?? '/menu'}
              aria-label={`Pesan ${item.name}`}
            >
              Pesan <ArrowRightIcon />
            </Link>
          ) : (
            <button
              className="add-btn"
              type="button"
              data-add={item.id}
              aria-label={`Tambah ${item.name} ke keranjang`}
              disabled={item.sold}
              onClick={onAdd}
            >
              {item.sold ? 'Habis hari ini' : '+ Tambah'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
