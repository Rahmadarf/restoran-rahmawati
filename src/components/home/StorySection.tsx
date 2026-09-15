import { FamilyIcon, HeartIcon, LeafIcon } from '../ui/Icons'
import { ArrowUpRightIcon } from '../ui/Icons'

export function StorySection() {
  return (
    <section className="section wrap" id="cerita">
      <div className="story">
        <div className="story-image">
          <img
            src="/assets/interior.jpg"
            alt="Ilustrasi ruang makan hangat dengan meja untuk keluarga"
            loading="lazy"
            width={800}
            height={850}
          />
        </div>
        <div className="story-copy">
          <span className="eyebrow">Kenalan dengan Rahmawati</span>
          <h2>
            Rasa rumah.
            <br />
            Tempat
            <br />
            berkumpul.
          </h2>
          <p>
            Kami percaya, makanan yang baik membuat percakapan mengalir lebih
            lama. Karena itu, setiap sajian kami berangkat dari bumbu yang akrab
            dan perhatian pada rasa.
          </p>
          <p>
            Dari makan siang sederhana sampai kumpul keluarga besar, selalu ada
            tempat untuk Anda di meja kami.
          </p>
          <a className="text-link" href="#lokasi">
            Mampir ke Rahmawati <ArrowUpRightIcon />
          </a>
        </div>
      </div>
      <div className="values">
        <div className="value">
          <LeafIcon />
          <div>
            <h3>Bumbu dari dapur sendiri</h3>
            <p>Diracik setiap hari untuk rasa yang akrab di lidah.</p>
          </div>
        </div>
        <div className="value">
          <FamilyIcon />
          <div>
            <h3>Nyaman untuk keluarga</h3>
            <p>Ruang untuk makan, berbagi, dan menikmati kebersamaan.</p>
          </div>
        </div>
        <div className="value">
          <HeartIcon />
          <div>
            <h3>Dimasak dengan perhatian</h3>
            <p>Pesan sesuai selera. Sampaikan kebutuhan Anda kepada kami.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
