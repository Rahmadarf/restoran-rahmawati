import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useOverlay } from '../../features/ui/overlay-context'
import { useMenuHref } from '../../hooks/useMenuHref'
import { ArrowRightIcon, MenuBarsIcon } from '../ui/Icons'

type SiteHeaderProps = { page: 'home' | 'menu' | 'detail' }

export function SiteHeader({ page }: SiteHeaderProps) {
  const [expanded, setExpanded] = useState(false)
  const { showInfo } = useOverlay()
  const menuHref = useMenuHref()

  return (
    <header className="site-header" data-component="SiteHeader">
      <div className="wrap header-inner">
        <Link className="brand" to="/" aria-label="Rahmawati — Beranda">
          <span className="brand-mark" aria-hidden="true">
            R
          </span>
          <span className="brand-name">
            RAHMAWATI<small>RESTORAN KELUARGA</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          <Link to="/" aria-current={page === 'home' ? 'page' : undefined}>
            Beranda
          </Link>
          <Link
            to={menuHref()}
            aria-current={page === 'menu' ? 'page' : undefined}
          >
            Menu Kami
          </Link>
          <Link to="/#cerita">Cerita Kami</Link>
          <Link to="/#lokasi">Lokasi</Link>
        </nav>
        <div className="header-actions">
          <button
            className="btn btn-outline"
            type="button"
            data-info="reservation"
            onClick={() => showInfo('reservation')}
          >
            Reservasi Meja
          </button>
          <Link className="btn" to={menuHref()}>
            Pesan Sekarang <ArrowRightIcon />
          </Link>
        </div>
        <button
          className="circle-btn mobile-toggle"
          type="button"
          aria-label={expanded ? 'Tutup navigasi' : 'Buka navigasi'}
          aria-controls="mobile-menu"
          aria-expanded={expanded}
          onClick={() => setExpanded((open) => !open)}
        >
          <MenuBarsIcon />
        </button>
      </div>
      <nav
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Navigasi seluler"
        hidden={!expanded}
      >
        <Link to="/">Beranda</Link>
        <Link to={menuHref()}>Menu Kami</Link>
        <Link to="/#cerita">Cerita Kami</Link>
        <Link to="/#lokasi">Lokasi &amp; jam buka</Link>
        <button
          type="button"
          data-info="reservation"
          onClick={() => showInfo('reservation')}
        >
          Reservasi Meja
        </button>
      </nav>
    </header>
  )
}
