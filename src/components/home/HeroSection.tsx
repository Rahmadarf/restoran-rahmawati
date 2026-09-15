import { Link } from 'react-router-dom'

import { useOverlay } from '../../features/ui/overlay-context'
import { useMenuHref } from '../../hooks/useMenuHref'
import { ArrowRightIcon } from '../ui/Icons'

export function HeroSection() {
  const { showInfo } = useOverlay()
  const menuHref = useMenuHref()

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero-copy">
          <span className="eyebrow">Dari dapur kami, untuk keluarga Anda</span>
          <h1 id="hero-title">
            Beda selera.
            <br />
            Satu meja.
            <br />
            <span>Sama nikmat.</span>
          </h1>
          <p>
            Masakan Indonesia yang bikin kangen.
            <br />
            Lebih hangat kalau dinikmati bersama.
          </p>
          <div className="hero-actions">
            <Link className="btn" to={menuHref()}>
              Pesan Sekarang <ArrowRightIcon />
            </Link>
            <button
              className="btn btn-outline"
              type="button"
              data-info="reservation"
              onClick={() => showInfo('reservation')}
            >
              Reservasi Meja
            </button>
          </div>
          <div className="hero-meta">
            <span>
              <b>✦</b> Dimasak saat dipesan
            </span>
            <span>Untuk semua selera</span>
          </div>
        </div>
      </div>
      <div className="hero-image">
        <img
          src="/assets/ayam-bakar.jpg"
          alt="Ayam bakar dengan bumbu kecap, sambal, dan lalapan"
          fetchPriority="high"
          width={1000}
          height={1000}
        />
        <div className="hero-stamp">
          <small>DARI DAPUR</small>Sepenuh
          <br />
          hati.<small>RAHMAWATI</small>
        </div>
        <div className="photo-caption">
          <div>
            <span>JAGOAN DAPUR KAMI</span>
            <strong>Ayam Bakar Rahmawati</strong>
          </div>
          <span>Rp32.000</span>
        </div>
      </div>
    </section>
  )
}
