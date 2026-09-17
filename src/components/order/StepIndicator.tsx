import { Link } from 'react-router-dom'

import { useMenuHref } from '../../hooks/useMenuHref'

type StepIndicatorProps = {
  /** Langkah aktif: 1 Pilih menu, 2 Keranjang, 3 Checkout. */
  current: 1 | 2 | 3
}

/**
 * Tahapan pesanan lintas halaman. Hanya langkah yang sudah dilewati yang bisa
 * diklik; maju tetap lewat CTA supaya pengecekan tiap langkah tidak terlewat.
 */
export function StepIndicator({ current }: StepIndicatorProps) {
  const menuHref = useMenuHref()
  const steps = [
    { label: 'Pilih menu', to: menuHref() },
    { label: 'Keranjang', to: '/cart' },
    { label: 'Checkout', to: '/checkout' },
  ]

  return (
    <nav className="steps" aria-label="Tahapan pesanan">
      {steps.map((step, index) => {
        const number = index + 1
        const content = (
          <>
            <b>{String(number).padStart(2, '0')}</b>
            {step.label}
          </>
        )
        if (number < current) {
          return (
            <Link key={step.label} to={step.to}>
              {content}
            </Link>
          )
        }
        return (
          <span
            key={step.label}
            aria-current={number === current ? 'step' : undefined}
          >
            {content}
          </span>
        )
      })}
    </nav>
  )
}
