import { Link } from 'react-router-dom'

import { useMenuHref } from '../../hooks/useMenuHref'

type EmptyCartStateProps = {
  title?: string
}

export function EmptyCartState({
  title = 'Mejanya siap. Pilihannya belum.',
}: EmptyCartStateProps) {
  const menuHref = useMenuHref()

  return (
    <div className="empty-state" data-component="EmptyCartState">
      <span className="empty-icon" aria-hidden="true">
        ＋
      </span>
      <h3>{title}</h3>
      <p>Yuk, pilih makanan favorit untuk menemani waktu bersama.</p>
      <Link className="btn" id="browse-menu" to={menuHref()}>
        Jelajahi Menu →
      </Link>
    </div>
  )
}
