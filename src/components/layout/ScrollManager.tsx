import { useLayoutEffect } from 'react'
import type { Location } from 'react-router-dom'

type ScrollManagerProps = {
  /** Lokasi yang sedang ditampilkan, bukan URL terbaru selama transisi. */
  location: Location
}

/**
 * Menyamakan perilaku multi-halaman: pindah halaman kembali ke atas,
 * tautan anchor menggulir ke bagian tujuan.
 */
export function ScrollManager({ location }: ScrollManagerProps) {
  const { pathname, hash } = location

  // Browser tidak boleh memulihkan scroll sendiri saat Back: posisi melompat
  // sebelum snapshot lama diambil dan halaman baru ikut membawa posisi lama.
  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  // Layout effect: berjalan di dalam flushSync transisi, jadi snapshot halaman
  // baru sudah berada di posisi atas.
  useLayoutEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView()
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
