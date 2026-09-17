import { useEffect, useRef, useState } from 'react'

import { ConfirmationNotice } from './ConfirmationNotice'
import { Dialog } from './Dialog'

type RequestDialogProps = {
  /** Teks pesan WhatsApp; `null` berarti dialog tertutup. */
  message: string | null
  onClose: () => void
}

/**
 * Tinjau teks WhatsApp, lalu simulasi kirim. Nomor resmi belum tersedia, jadi
 * tidak ada percakapan yang dibuka atau pesan yang terkirim.
 */
export function RequestDialog({ message, onClose }: RequestDialogProps) {
  const open = message !== null
  const [waiting, setWaiting] = useState(false)
  const [wasOpen, setWasOpen] = useState(open)
  // Pesan terakhir dipertahankan supaya isi tidak kosong selama fade-out.
  const [shownMessage, setShownMessage] = useState(message)
  const sendRef = useRef<HTMLButtonElement>(null)
  const returning = useRef(false)

  // Setiap kali dibuka, mulai lagi dari tahap tinjau.
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) setWaiting(false)
  }
  if (message !== null && message !== shownMessage) setShownMessage(message)

  useEffect(() => {
    if (!returning.current) return
    returning.current = false
    sendRef.current?.focus()
  })

  return (
    <Dialog
      id="request-dialog"
      titleId="request-title"
      title={waiting ? 'Menunggu konfirmasi' : 'Periksa permintaan Anda'}
      closeLabel="Tutup permintaan"
      open={open}
      onClose={onClose}
    >
      <div className="dialog-body">
        {waiting ? (
          <ConfirmationNotice
            onBack={() => {
              returning.current = true
              setWaiting(false)
            }}
          />
        ) : (
          <div id="request-review">
            <p className="small muted">Ringkasan pesan untuk WhatsApp</p>
            <pre id="request-message">{shownMessage}</pre>
            <div className="notice">
              Nomor WhatsApp resmi belum tersedia. Tombol berikut hanya
              memperagakan state setelah pengiriman; tidak membuka percakapan
              atau mengirim pesan.
            </div>
            <button
              ref={sendRef}
              className="btn wide"
              type="button"
              onClick={() => setWaiting(true)}
            >
              Kirim ke WhatsApp ↗
            </button>
          </div>
        )}
      </div>
    </Dialog>
  )
}
