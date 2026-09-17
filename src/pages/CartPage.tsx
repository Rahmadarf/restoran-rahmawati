import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { Layout } from '../components/layout/Layout'
import { CartItemRow } from '../components/menu/CartItemRow'
import { EmptyCartState } from '../components/order/EmptyCartState'
import { OrderTotals } from '../components/order/OrderTotals'
import { StepIndicator } from '../components/order/StepIndicator'
import { useToast } from '../components/ui/toast-context'
import { useCart } from '../features/cart/cart-context'
import { useDiningSession } from '../features/dining-session/dining-session-context'
import { useMenuHref } from '../hooks/useMenuHref'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function CartPage() {
  const { rows, count, total, changeQuantity, remove, updateRow } = useCart()
  const { table, takeaway, generalNote, setGeneralNote } = useDiningSession()
  const toast = useToast()
  const menuHref = useMenuHref()
  const mainRef = useScrollReveal<HTMLElement>('.flow-main > .panel, .order-summary')
  /** Baris yang dihapus membawa fokus keyboard ikut hilang; pindahkan ke CTA. */
  const pendingFocus = useRef(false)

  useEffect(() => {
    if (!pendingFocus.current) return
    pendingFocus.current = false
    document
      .querySelector<HTMLElement>('#checkout-link, #browse-menu')
      ?.focus()
  })

  const tableLabel = takeaway
    ? 'Ambil sendiri'
    : table
      ? `Makan di tempat · Meja ${table}`
      : 'Nomor meja bisa diisi saat checkout'

  return (
    <Layout page="cart" title="Keranjang — Restoran Rahmawati">
      <main id="main" ref={mainRef}>
        <section className="flow-intro wrap">
          <span className="eyebrow">Sebelum dapur mulai memasak</span>
          <h1>
            Pilihan Anda.
            <br />
            Siap dinikmati.
          </h1>
          <p>Cek lagi pesanan Anda. Semua selera dapat tempat di meja ini.</p>
          <StepIndicator current={2} />
        </section>

        {rows.length === 0 ? (
          <div className="wrap">
            <EmptyCartState />
          </div>
        ) : (
          <section className="wrap flow-layout">
            <div className="flow-main">
              <div className="panel">
                <div className="panel-title">
                  <h2>Isi keranjang</h2>
                  <Link className="text-link" to={menuHref()}>
                    Tambah menu +
                  </Link>
                </div>
                <div>
                  {rows.map((row) => (
                    <CartItemRow
                      key={row.key}
                      row={row}
                      variant="full"
                      onChangeQuantity={(delta) => {
                        if (row.qty + delta <= 0) pendingFocus.current = true
                        changeQuantity(row.key, delta)
                        toast('Jumlah diperbarui')
                      }}
                      onRemove={() => {
                        pendingFocus.current = true
                        remove(row.key)
                        toast('Menu dihapus dari keranjang')
                      }}
                      onNoteChange={(note) => updateRow(row.key, { ...row, note })}
                    />
                  ))}
                </div>
              </div>
              <div className="panel">
                <div className="field">
                  <label htmlFor="general-note">
                    Catatan untuk restoran{' '}
                    <span className="optional">(opsional)</span>
                  </label>
                  <textarea
                    id="general-note"
                    rows={3}
                    maxLength={300}
                    placeholder="Contoh: sajikan semua menu bersamaan."
                    value={generalNote}
                    onChange={(event) => setGeneralNote(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <aside className="order-summary">
              <span className="eyebrow">Sudah bikin lapar?</span>
              <h2>
                Ringkasan
                <br />
                pesanan.
              </h2>
              <div className="summary-table">{tableLabel}</div>
              <OrderTotals count={count} total={total} />
              <p className="small">
                Harga contoh. Tidak ada biaya layanan tambahan pada prototype
                ini.
              </p>
              <Link className="btn btn-light wide" id="checkout-link" to="/checkout">
                Lanjut Checkout →
              </Link>
              <p className="summary-footnote">
                Pesanan dikonfirmasi secara manual melalui WhatsApp.
              </p>
            </aside>
          </section>
        )}
      </main>
    </Layout>
  )
}
