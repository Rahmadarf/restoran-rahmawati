import { Link } from 'react-router-dom'

import { useOverlay } from '../../features/ui/overlay-context'
import { useMenuHref } from '../../hooks/useMenuHref'
import { ArrowUpRightIcon } from '../ui/Icons'

type SiteFooterProps = { variant?: 'home' | 'menu' }

export function SiteFooter({ variant = 'home' }: SiteFooterProps) {
  const { showInfo } = useOverlay()
  const menuHref = useMenuHref()

  return (
    <footer
      className={variant === 'menu' ? 'site-footer menu-footer' : 'site-footer '}
      data-component="SiteFooter"
    >
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link className="brand" to="/">
              <span className="brand-mark" aria-hidden="true">
                R
              </span>
              <span className="brand-name">
                RAHMAWATI<small>RESTORAN KELUARGA</small>
              </span>
            </Link>
            <p>
              Rasa yang akrab.
              <br />
              Tempat untuk selalu kembali.
            </p>
          </div>
          <nav className="footer-links" aria-label="Navigasi footer">
            <Link to={menuHref()}>Menu Kami</Link>
            <Link to="/#cerita">Cerita Kami</Link>
            <Link to="/#lokasi">Lokasi &amp; Jam Buka</Link>
            <button
              className="btn btn-outline btn-light"
              type="button"
              data-info="contact"
              onClick={() => showInfo('contact')}
            >
              Hubungi Kami <ArrowUpRightIcon />
            </button>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Restoran Rahmawati</span>
          <span>
            Prototype visual · Foto &amp; informasi restoran merupakan contoh.
          </span>
        </div>
      </div>
    </footer>
  )
}
