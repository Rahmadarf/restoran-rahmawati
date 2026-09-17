import { useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { useLocation } from 'react-router-dom'

import { prefersReducedMotion } from '../lib/motion'

export type NavDirection = 'forward' | 'back'

/** BrowserRouter menyimpan urutan entri riwayat di `history.state.idx`. */
function historyIndex() {
  return (window.history.state as { idx?: number } | null)?.idx ?? 0
}

function canAnimate() {
  return (
    typeof document.startViewTransition === 'function' && !prefersReducedMotion()
  )
}

/**
 * Transisi route lewat View Transitions API. `BrowserRouter` tidak memanggil
 * `startViewTransition` sendiri (hanya `RouterProvider` yang bisa), jadi lokasi
 * yang ditampilkan ditahan satu langkah: snapshot lama diambil, lalu `flushSync`
 * memasang halaman baru di dalam callback transisi.
 *
 * Tanpa dukungan API atau dengan reduced motion, halaman langsung ditukar
 * tanpa memanggil `startViewTransition` sama sekali.
 */
export function usePageTransition() {
  const location = useLocation()
  const [displayed, setDisplayed] = useState(location)
  const latest = useRef(location)
  const lastIndex = useRef<number | null>(null)

  const pathChanged = location.pathname !== displayed.pathname

  // Tukar langsung tanpa slide: query/hash di halaman yang sama, transisi tidak
  // tersedia, atau tautan ke section (/#cerita) yang langsung menggulir ke bawah;
  // slide lalu scroll terasa dua gerakan beruntun.
  if (
    location.key !== displayed.key &&
    (!pathChanged || !canAnimate() || location.hash !== '')
  ) {
    setDisplayed(location)
  }

  useLayoutEffect(() => {
    latest.current = location
    const index = historyIndex()
    // Indeks mundur = tombol Back; maju/sama = klik link, Forward, atau replace.
    const direction: NavDirection =
      lastIndex.current !== null && index < lastIndex.current ? 'back' : 'forward'
    lastIndex.current = index

    if (!pathChanged) return

    document.documentElement.dataset.navDirection = direction
    // Saat user pindah lagi sebelum selesai, browser melewati transisi lama dan
    // tetap menjalankan callback-nya; `latest` membuat semua callback idempoten.
    document.startViewTransition(() => {
      flushSync(() => setDisplayed(latest.current))
    })
  }, [location, pathChanged])

  return displayed
}
