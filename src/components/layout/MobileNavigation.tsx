import { Link } from 'react-router-dom'

import { useMenuHref } from '../../hooks/useMenuHref'
import type { PageId } from '../../types/page'
import { BagIcon, CalendarIcon, CutleryIcon, HomeIcon } from '../ui/Icons'

type MobileNavigationProps = { page: PageId }

export function MobileNavigation({ page }: MobileNavigationProps) {
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
      <Link className={page === 'reservation' ? 'active' : ''} to="/reservasi">
        <CalendarIcon />
        Reservasi
      </Link>
      <Link className={page === 'cart' ? 'active' : ''} to="/cart">
        <BagIcon />
        Keranjang
      </Link>
    </nav>
  )
}
