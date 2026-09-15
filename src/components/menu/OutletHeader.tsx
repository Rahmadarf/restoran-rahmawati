import { RESTAURANT } from '../../data/restaurant'
import { CutleryIcon } from '../ui/Icons'

export function OutletHeader() {
  return (
    <section data-component="OutletHeader" aria-label="Informasi outlet">
      <div className="outlet-cover">
        <img
          src="/assets/interior.jpg"
          alt="Ilustrasi suasana ruang makan Rahmawati"
          width={1400}
          height={400}
        />
        <div className="cover-title">Selera boleh beda. Meja tetap satu.</div>
      </div>
      <div className="wrap outlet-info">
        <span className="brand-mark" aria-hidden="true">
          R
        </span>
        <div>
          <h1>{RESTAURANT.name}</h1>
          <p>{RESTAURANT.addressShort}</p>
          <div className="outlet-status">
            <span className="status-open">Buka · contoh</span>
            <span>{RESTAURANT.hoursShort}</span>
            <span className="muted">· Masakan Indonesia</span>
          </div>
        </div>
        <div className="outlet-extra">
          <CutleryIcon />
          <span>
            Dimasak saat dipesan
            <br />
            <span className="muted">Nikmati selagi hangat.</span>
          </span>
        </div>
      </div>
    </section>
  )
}
