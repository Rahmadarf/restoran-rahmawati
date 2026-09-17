import { useEffect, useRef } from 'react'

import { prefersReducedMotion } from '../lib/motion'

/**
 * Menandai elemen di bawah viewport sebagai `data-reveal="pending"`, lalu
 * `"shown"` sekali saat masuk layar. Tanpa JS, atribut tidak pernah dipasang
 * sehingga konten tetap tampil normal.
 */
export function useScrollReveal<T extends HTMLElement>(selector: string) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || prefersReducedMotion() || !('IntersectionObserver' in window)) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const element = entry.target as HTMLElement
          element.dataset.reveal = 'shown'
          observer.unobserve(element)
        }
      },
      // Section tertinggi (#terlaris) masih mencapai rasio ±0,43 di viewport 700px.
      { threshold: 0.15 },
    )

    for (const element of root.querySelectorAll<HTMLElement>(selector)) {
      if (element.dataset.reveal === 'shown') continue
      // Yang sudah terlihat saat halaman dibuka tidak disembunyikan ulang.
      if (element.getBoundingClientRect().top < window.innerHeight) {
        delete element.dataset.reveal
        continue
      }
      element.dataset.reveal = 'pending'
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [selector])

  return ref
}
