import { useState, type FormEvent } from 'react'

import { Layout } from '../components/layout/Layout'
import { EmptyCartState } from '../components/order/EmptyCartState'
import { OrderTotals } from '../components/order/OrderTotals'
import {
  PaymentMethodSelector,
  type PaymentMethod,
} from '../components/order/PaymentMethodSelector'
import { StepIndicator } from '../components/order/StepIndicator'
import { FormField } from '../components/ui/FormField'
import { RequestDialog } from '../components/ui/RequestDialog'
import { productById } from '../data/menu'
import { RESTAURANT } from '../data/restaurant'
import { useCart } from '../features/cart/cart-context'
import { useDiningSession } from '../features/dining-session/dining-session-context'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { describeRow, unitPrice } from '../lib/cart-model'
import { money } from '../lib/currency'
import { checkoutMessage } from '../lib/request-message'
import {
  validateCheckout,
  type CheckoutValues,
  type FieldErrors,
} from '../lib/validation'

/** Urutan fokus saat validasi gagal mengikuti urutan field di form. */
const FIELD_IDS: Record<keyof CheckoutValues, string> = {
  name: 'customer-name',
  whatsapp: 'customer-wa',
  orderType: 'order-type',
  table: 'checkout-table',
  orderTime: 'order-time',
  pickupTime: 'pickup-time',
}

export function CheckoutPage() {
  const { rows, count, total } = useCart()
  const session = useDiningSession()
  const mainRef = useScrollReveal<HTMLElement>('.flow-main > .panel, .order-summary')

  const [values, setValues] = useState<CheckoutValues>(() => ({
    name: '',
    whatsapp: '',
    orderType: session.takeaway ? 'takeaway' : 'dinein',
    table: session.table ? String(session.table) : '',
    orderTime: 'now',
    pickupTime: '',
  }))
  const [payment, setPayment] = useState<PaymentMethod>('cash')
  const [errors, setErrors] = useState<FieldErrors<keyof CheckoutValues>>({})
  const [errorCount, setErrorCount] = useState(0)
  const [message, setMessage] = useState<string | null>(null)

  const dineIn = values.orderType === 'dinein'
  const later = values.orderTime === 'later'

  function update<K extends keyof CheckoutValues>(
    field: K,
    value: CheckoutValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({
      ...current,
      [field]: undefined,
      // Field bersyarat ikut hilang; error lamanya tidak boleh muncul lagi.
      ...(field === 'orderType' ? { table: undefined } : {}),
      ...(field === 'orderTime' ? { pickupTime: undefined } : {}),
    }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const found = validateCheckout(values)
    const invalid = Object.keys(found) as (keyof CheckoutValues)[]
    setErrors(found)
    setErrorCount(invalid.length)
    if (invalid.length) {
      document.getElementById(FIELD_IDS[invalid[0]])?.focus()
      return
    }

    session.setTableContext(
      dineIn
        ? { table: Number(values.table), takeaway: false }
        : { table: null, takeaway: true },
    )
    setMessage(
      checkoutMessage({ ...values, payment, note: session.generalNote }, rows, total),
    )
  }

  const context = [
    dineIn
      ? `Makan di tempat${values.table ? ` · Meja ${values.table}` : ''}`
      : 'Ambil sendiri',
    later ? values.pickupTime || 'Pilih jam' : 'Sesegera mungkin',
    payment === 'transfer' ? 'Transfer manual' : 'Tunai / cash',
  ].join(' · ')

  return (
    <Layout page="checkout" title="Checkout — Restoran Rahmawati">
      <main id="main" ref={mainRef}>
        <section className="flow-intro wrap">
          <span className="eyebrow">Selangkah menuju makan enak</span>
          <h1>
            Cek. Kirim.
            <br />
            Kami konfirmasi.
          </h1>
          <p>Lengkapi data agar tim kami bisa menghubungi Anda.</p>
          <StepIndicator current={3} />
        </section>

        {rows.length === 0 ? (
          <div className="wrap">
            <EmptyCartState title="Keranjang masih kosong." />
          </div>
        ) : (
          <section className="wrap flow-layout">
            <form
              className="flow-main"
              id="checkout-form"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="panel">
                <h2 className="form-heading">
                  <span>01</span>Data pelanggan
                </h2>
                <p className="small muted">Kolom bertanda * wajib diisi.</p>
                <div className="field-grid">
                  <FormField
                    id="customer-name"
                    label="Nama pemesan"
                    required
                    error={errors.name}
                  >
                    {(control) => (
                      <input
                        {...control}
                        type="text"
                        placeholder="Nama Anda"
                        required
                        autoComplete="name"
                        maxLength={80}
                        value={values.name}
                        onChange={(event) => update('name', event.target.value)}
                      />
                    )}
                  </FormField>
                  <FormField
                    id="customer-wa"
                    label="Nomor WhatsApp"
                    required
                    error={errors.whatsapp}
                  >
                    {(control) => (
                      <input
                        {...control}
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        maxLength={20}
                        value={values.whatsapp}
                        onChange={(event) =>
                          update('whatsapp', event.target.value)
                        }
                      />
                    )}
                  </FormField>
                </div>
              </div>

              <div className="panel">
                <h2 className="form-heading">
                  <span>02</span>Cara menikmati pesanan
                </h2>
                <fieldset className="choice-group">
                  <legend>Jenis pesanan *</legend>
                  <div className="choice-grid">
                    {(
                      [
                        ['dinein', 'Makan di tempat', 'Diantar ke meja Anda'],
                        ['takeaway', 'Ambil sendiri', 'Dikemas untuk dibawa'],
                      ] as const
                    ).map(([value, title, hint]) => (
                      <label className="choice-card" key={value}>
                        <input
                          type="radio"
                          name="order-type"
                          value={value}
                          checked={values.orderType === value}
                          onChange={() => update('orderType', value)}
                        />
                        <span>
                          <strong>{title}</strong>
                          <small>{hint}</small>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="field-grid">
                  {dineIn ? (
                    <FormField
                      id="checkout-table"
                      label="Nomor meja"
                      required
                      error={errors.table}
                    >
                      {(control) => (
                        <input
                          {...control}
                          type="number"
                          placeholder="Contoh: 12"
                          required
                          min={RESTAURANT.tableRange.min}
                          max={RESTAURANT.tableRange.max}
                          step={1}
                          inputMode="numeric"
                          value={values.table}
                          onChange={(event) =>
                            update('table', event.target.value)
                          }
                        />
                      )}
                    </FormField>
                  ) : null}
                  <FormField
                    id="order-time"
                    label="Waktu pesanan"
                    required
                    error={errors.orderTime}
                  >
                    {(control) => (
                      <select
                        {...control}
                        required
                        value={values.orderTime}
                        onChange={(event) =>
                          update(
                            'orderTime',
                            event.target.value as CheckoutValues['orderTime'],
                          )
                        }
                      >
                        <option value="now">Sesegera mungkin</option>
                        <option value="later">Pilih waktu hari ini</option>
                      </select>
                    )}
                  </FormField>
                  {later ? (
                    <FormField
                      id="pickup-time"
                      label="Jam yang diinginkan"
                      required
                      error={errors.pickupTime}
                    >
                      {(control) => (
                        <input
                          {...control}
                          type="time"
                          required
                          min="10:00"
                          max="20:30"
                          value={values.pickupTime}
                          onChange={(event) =>
                            update('pickupTime', event.target.value)
                          }
                        />
                      )}
                    </FormField>
                  ) : null}
                </div>
                <FormField id="checkout-note" label="Catatan pesanan" optional>
                  {(control) => (
                    <textarea
                      {...control}
                      rows={3}
                      maxLength={300}
                      placeholder="Contoh: akan diambil oleh anggota keluarga."
                      value={session.generalNote}
                      onChange={(event) =>
                        session.setGeneralNote(event.target.value)
                      }
                    />
                  )}
                </FormField>
              </div>

              <PaymentMethodSelector value={payment} onChange={setPayment} />

              <div
                className="form-error-summary notice"
                role="alert"
                hidden={errorCount === 0}
              >
                Ada {errorCount} kolom yang perlu diperiksa. Perbaiki isian yang
                ditandai.
              </div>
            </form>

            <aside className="order-summary">
              <span className="eyebrow">Satu kali cek lagi</span>
              <h2>
                Ringkasan
                <br />
                akhir.
              </h2>
              <div className="summary-items">
                {rows.map((row) => {
                  const item = productById(row.id)
                  if (!item) return null
                  return (
                    <div className="summary-product" key={row.key}>
                      <img src={`/assets/${item.img}`} alt="" />
                      <div>
                        <strong>
                          {row.qty}× {item.name}
                        </strong>
                        <small>{describeRow(row)}</small>
                        {row.note ? <small>Catatan: {row.note}</small> : null}
                      </div>
                      <span>{money(unitPrice(row) * row.qty)}</span>
                    </div>
                  )
                })}
              </div>
              <OrderTotals count={count} total={total} />
              <div className="summary-context">{context}</div>
              <button
                className="btn btn-light wide"
                form="checkout-form"
                type="submit"
              >
                Tinjau Permintaan →
              </button>
              <p className="summary-footnote">
                Di langkah berikutnya Anda bisa memeriksa teks sebelum mengirim
                ke WhatsApp. Belum ada pesanan yang dikonfirmasi.
              </p>
            </aside>
          </section>
        )}
      </main>

      <RequestDialog message={message} onClose={() => setMessage(null)} />
    </Layout>
  )
}
