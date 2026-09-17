import { useEffect, useRef } from 'react'

type ConfirmationNoticeProps = {
  onBack: () => void
}

/**
 * State setelah permintaan dikirim: selalu "menunggu konfirmasi", tidak pernah
 * "berhasil". Pesanan dan reservasi baru pasti setelah restoran menghubungi
 * lewat WhatsApp.
 */
export function ConfirmationNotice({ onBack }: ConfirmationNoticeProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Konten dialog berganti; fokus dipindah supaya pembaca layar ikut membaca.
  useEffect(() => ref.current?.focus(), [])

  return (
    <div
      id="request-waiting"
      ref={ref}
      tabIndex={-1}
      data-component="ConfirmationNotice"
    >
      <span className="pending-icon" aria-hidden="true">
        ◷
      </span>
      <span className="eyebrow">Simulasi · menunggu konfirmasi</span>
      <h3>Permintaan telah dikirim dan menunggu konfirmasi restoran</h3>
      <p>
        Ini contoh tampilan setelah pengiriman. Pada prototype ini belum ada
        pesan yang benar-benar dikirim.
      </p>
      <div className="notice">
        <strong>Belum menjadi pesanan atau reservasi terkonfirmasi.</strong>
        Tim restoran akan memeriksa ketersediaan dan menghubungi Anda melalui
        WhatsApp.
      </div>
      <button className="btn btn-outline" type="button" onClick={onBack}>
        Lihat kembali ringkasan
      </button>
    </div>
  )
}
