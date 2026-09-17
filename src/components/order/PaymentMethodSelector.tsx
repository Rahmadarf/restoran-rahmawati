import { useRef } from 'react'

import { useToast } from '../ui/toast-context'

export type PaymentMethod = 'cash' | 'transfer'

const METHODS: { value: PaymentMethod; title: string; hint: string }[] = [
  { value: 'cash', title: 'Tunai / cash', hint: 'Bayar langsung di restoran' },
  {
    value: 'transfer',
    title: 'Transfer manual',
    hint: 'Setelah dikonfirmasi staf',
  },
]

/** Rekening dummy untuk ilustrasi; bukan tujuan pembayaran. */
const DEMO_ACCOUNT = '0000000000'

type PaymentMethodSelectorProps = {
  value: PaymentMethod
  onChange: (value: PaymentMethod) => void
}

export function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  const toast = useToast()
  const accountRef = useRef<HTMLElement>(null)

  async function copyAccount() {
    try {
      await navigator.clipboard.writeText(DEMO_ACCOUNT)
      toast('Nomor rekening contoh disalin')
    } catch {
      // Clipboard bisa ditolak (http, izin); pilihkan teksnya sebagai gantinya.
      const account = accountRef.current
      const selection = window.getSelection()
      if (account && selection) {
        const range = document.createRange()
        range.selectNodeContents(account)
        selection.removeAllRanges()
        selection.addRange(range)
      }
      toast('Nomor dipilih. Gunakan Salin di browser Anda.')
    }
  }

  return (
    <div className="panel" data-component="PaymentMethodSelector">
      <h2 className="form-heading">
        <span>03</span>Cara pembayaran
      </h2>
      <fieldset className="choice-group">
        <legend>Pilih metode *</legend>
        <div className="choice-grid">
          {METHODS.map((method) => (
            <label className="choice-card" key={method.value}>
              <input
                type="radio"
                name="payment"
                value={method.value}
                checked={value === method.value}
                onChange={() => onChange(method.value)}
              />
              <span>
                <strong>{method.title}</strong>
                <small>{method.hint}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      {value === 'transfer' ? (
        <div className="bank-info">
          <span className="eyebrow">Data bank ilustrasi</span>
          <strong>Bank Contoh · Restoran Rahmawati</strong>
          <div className="bank-account">
            <code ref={accountRef}>{DEMO_ACCOUNT}</code>
            <button
              type="button"
              className="btn btn-outline"
              onClick={copyAccount}
            >
              Salin rekening
            </button>
          </div>
          <p className="small">
            Rekening dummy, bukan tujuan pembayaran. Tunggu konfirmasi dan
            rekening resmi dari restoran sebelum transfer.
          </p>
        </div>
      ) : null}
    </div>
  )
}
