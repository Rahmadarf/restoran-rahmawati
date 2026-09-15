import { RESTAURANT } from '../../data/restaurant'
import { useOverlay } from '../../features/ui/overlay-context'
import { ArrowRightIcon, ArrowUpRightIcon } from '../ui/Icons'

export function LocationSection() {
  const { showInfo } = useOverlay()

  return (
    <section className="section wrap location" id="lokasi">
      <div>
        <span className="eyebrow">Kami tunggu di sini</span>
        <h2>
          Satu meja
          <br />
          untuk Anda.
        </h2>
        <div className="location-list">
          <div>
            <strong>{RESTAURANT.name}</strong>
            <p>
              {RESTAURANT.address}
              <br />
              <span className="small">
                Alamat contoh — menunggu lokasi asli.
              </span>
            </p>
          </div>
          <div>
            <strong>{RESTAURANT.hours}</strong>
            <p>
              {RESTAURANT.lastOrder}
              <br />
              <span className="small">Jam operasional contoh.</span>
            </p>
          </div>
        </div>
        <button
          className="btn"
          type="button"
          data-info="reservation"
          onClick={() => showInfo('reservation')}
        >
          Reservasi Meja <ArrowRightIcon />
        </button>
      </div>
      <div className="location-panel">
        <span className="brand-mark" aria-hidden="true">
          R
        </span>
        <h3>
          Perjalanan menuju
          <br />
          makan enak.
        </h3>
        <p className="muted">
          Titik lokasi asli akan ditambahkan setelah alamat restoran
          dikonfirmasi.
        </p>
        <a
          className="text-link"
          href={RESTAURANT.mapsUrl}
          target="_blank"
          rel="noopener"
        >
          Cari di Google Maps <ArrowUpRightIcon />
        </a>
        <span className="small muted" style={{ marginTop: '12px' }}>
          Membuka pencarian, bukan pin outlet terverifikasi.
        </span>
      </div>
    </section>
  )
}
