import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Menyamakan perilaku multi-halaman: pindah halaman kembali ke atas,
 * tautan anchor menggulir ke bagian tujuan.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
