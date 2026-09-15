import { Link } from 'react-router-dom'

import { useOverlay } from '../../features/ui/overlay-context'
import { useMenuHref } from '../../hooks/useMenuHref'
import { BagIcon, CalendarIcon, CutleryIcon, HomeIcon } from '../ui/Icons'

type MobileNavigationProps = { page: 'home' | 'menu' | 'detail' }

export function MobileNavigation({ page }: MobileNavigationProps) {
  const { showInfo, openCart } = useOverlay()
  const menuHref = useMenuHref()

  return (
    <nav
      className="mobile-nav"
      data-component="MobileNavigation"
      aria-label="Navigasi bawah"
    >
      <Link className={page === 'home' ? 'active' : ''} to="/">
        <HomeIcon />
        Beranda
      </Link>
      <Link className={page === 'menu' ? 'active' : ''} to={menuHref()}>
        <CutleryIcon />
        Menu
      </Link>
      <button
        type="button"
        data-info="reservation"
        onClick={() => showInfo('reservation')}
      >
        <CalendarIcon />
        Reservasi
      </button>
      <button type="button" data-cart-open onClick={() => openCart()}>
        <BagIcon />
        Keranjang
      </button>
    </nav>
  )
}
