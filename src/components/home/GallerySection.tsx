export function GallerySection() {
  return (
    <section className="section gallery-section" id="galeri">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">Sepotong suasana</span>
            <h2>
              Ada cerita
              <br />
              di setiap sudut.
            </h2>
          </div>
          <p style={{ color: '#c5c2b7' }}>
            Makanan hangat, suasana akrab,
            <br />
            dan waktu yang terasa lebih santai.
          </p>
        </div>
        <div className="gallery-grid">
          <figure>
            <img
              src="/assets/interior.jpg"
              alt="Contoh suasana ruang makan keluarga"
              loading="lazy"
              width={800}
              height={600}
            />
            <figcaption>Tempat cerita bertemu.</figcaption>
          </figure>
          <figure>
            <img
              src="/assets/nasi-goreng.jpg"
              alt="Sepiring nasi goreng hangat"
              loading="lazy"
              width={500}
              height={600}
            />
            <figcaption>Rasa yang dirindukan.</figcaption>
          </figure>
          <figure>
            <img
              src="/assets/es-teh.jpg"
              alt="Minuman teh dingin"
              loading="lazy"
              width={500}
              height={600}
            />
            <figcaption>Teman ngobrol lama.</figcaption>
          </figure>
        </div>
        <div className="testimonial">
          <div>
            <div className="stars" aria-label="5 dari 5 bintang">
              ★★★★★
            </div>
            <p
              className="small"
              style={{ color: '#c5c2b7', marginTop: '10px' }}
            >
              Kata teman semeja
              <br />
              <span style={{ fontSize: '12px' }}>Contoh testimoni</span>
            </p>
          </div>
          <blockquote>
            “Ayam bakarnya meresap sampai dalam. Anak-anak suka, orang tua juga
            nyaman. Jadi tempat langganan kalau kumpul keluarga.”
            <cite>— Dina, bersama keluarga · Testimoni ilustrasi</cite>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
