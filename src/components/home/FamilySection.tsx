import { Link } from 'react-router-dom'

import { useMenuHref } from '../../hooks/useMenuHref'
import { ArrowRightIcon } from '../ui/Icons'

export function FamilySection() {
  const menuHref = useMenuHref()

  return (
    <section className="family" id="paket">
      <div className="family-photo">
        <img
          src="/assets/sate-ayam.jpg"
          alt="Sajian sate ayam dengan bumbu kacang untuk dinikmati bersama"
          loading="lazy"
          width={900}
          height={700}
        />
      </div>
      <div className="family-copy">
        <span className="eyebrow">Meja penuh, cerita panjang</span>
        <h2>
          Rame-rame
          <br />
          lebih enak.
        </h2>
        <p>
          Kumpulkan orang-orang tersayang. Urusan makan, biar dapur kami yang
          siapkan.
        </p>
        <div className="family-price">
          <strong>Rp149.000</strong>
          <span>
            Paket Kumpul Berempat
            <br />4 ayam bakar · nasi · es teh
          </span>
        </div>
        <Link
          className="btn btn-light"
          to={menuHref({ category: 'Paket Keluarga' })}
        >
          Lihat Paket Keluarga <ArrowRightIcon />
        </Link>
        <p className="small">
          Foto ilustrasi suasana makan bersama. Isi paket sesuai deskripsi.
        </p>
      </div>
    </section>
  )
}
