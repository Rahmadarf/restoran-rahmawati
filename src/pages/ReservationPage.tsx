import { useState, type FormEvent } from 'react'

import { Layout } from '../components/layout/Layout'
import { FormField } from '../components/ui/FormField'
import { RequestDialog } from '../components/ui/RequestDialog'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { dateLabel, localDate, timeLabel } from '../lib/datetime'
import { reservationMessage } from '../lib/request-message'
import {
  MAX_GUESTS,
  validateReservation,
  type FieldErrors,
  type ReservationValues,
} from '../lib/validation'

/** Slot tiap 30 menit, 10.00–20.00 WIB (pesanan terakhir 20.30). */
const TIME_SLOTS = Array.from({ length: 21 }, (_, index) => {
  const minutes = 10 * 60 + index * 30
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
})

const AREAS = [
  ['Indoor', 'Indoor · ruang keluarga'],
  ['Teras', 'Teras · udara terbuka'],
  ['Bebas', 'Bebas, sesuai ketersediaan'],
] as const

const PURPOSES = [
  'Makan bersama',
  'Ulang tahun',
  'Arisan',
  'Pertemuan',
  'Lainnya',
]

const FIELD_IDS: Record<keyof ReservationValues, string> = {
  name: 'guest-name',
  whatsapp: 'guest-wa',
  date: 'visit-date',
  time: 'visit-time',
  guests: 'guest-count',
  area: 'table-area',
}

export function ReservationPage() {
  const mainRef = useScrollReveal<HTMLElement>(
    '.flow-main > .panel, .reservation-aside',
  )
  const [values, setValues] = useState<ReservationValues>({
    name: '',
    whatsapp: '',
    date: '',
    time: '',
    guests: '',
    area: '',
  })
  const [purpose, setPurpose] = useState(PURPOSES[0])
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState<FieldErrors<keyof ReservationValues>>({})
  const [errorCount, setErrorCount] = useState(0)
  const [message, setMessage] = useState<string | null>(null)

  function update(field: keyof ReservationValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({
      ...current,
      [field]: undefined,
      // Jam divalidasi terhadap tanggal; ganti tanggal berarti cek ulang jam.
      ...(field === 'date' ? { time: undefined } : {}),
    }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const found = validateReservation(values)
    const invalid = Object.keys(found) as (keyof ReservationValues)[]
    setErrors(found)
    setErrorCount(invalid.length)
    if (invalid.length) {
      document.getElementById(FIELD_IDS[invalid[0]])?.focus()
      return
    }
    setMessage(reservationMessage({ ...values, purpose, note }))
  }

  const summary: [string, string][] = [
    ['Atas nama', values.name.trim() || 'Nama Anda'],
    ['Tanggal', dateLabel(values.date)],
    ['Jam', values.time ? timeLabel(values.time) : 'Belum dipilih'],
    ['Jumlah tamu', values.guests ? `${values.guests} orang` : 'Belum dipilih'],
    ['Area', values.area || 'Belum dipilih'],
    ['Acara', purpose],
  ]

  return (
    <Layout page="reservation" title="Reservasi — Restoran Rahmawati">
      <main id="main" ref={mainRef}>
        <section className="flow-intro wrap">
          <span className="eyebrow">Sisakan waktu untuk bersama</span>
          <h1>
            Mejanya kami siapkan.
            <br />
            Ceritanya Anda bawa.
          </h1>
          <p>
            Makan keluarga, arisan, atau sekadar bertemu. Ceritakan rencana
            Anda.
          </p>
        </section>

        <section className="wrap flow-layout reservation-layout">
          <form
            className="flow-main"
            id="reservation-form"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="panel">
              <h2 className="form-heading">
                <span>01</span>Siapa yang akan datang?
              </h2>
              <p className="small muted">Kolom bertanda * wajib diisi.</p>
              <div className="field-grid">
                <FormField
                  id="guest-name"
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
                  id="guest-wa"
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
                <span>02</span>Rencana kunjungan
              </h2>
              <div className="field-grid">
                <FormField
                  id="visit-date"
                  label="Tanggal"
                  required
                  error={errors.date}
                >
                  {(control) => (
                    <input
                      {...control}
                      type="date"
                      required
                      min={localDate()}
                      value={values.date}
                      onChange={(event) => update('date', event.target.value)}
                    />
                  )}
                </FormField>
                <FormField
                  id="visit-time"
                  label="Jam"
                  required
                  error={errors.time}
                >
                  {(control) => (
                    <select
                      {...control}
                      required
                      value={values.time}
                      onChange={(event) => update('time', event.target.value)}
                    >
                      <option value="">Pilih jam</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {timeLabel(slot)}
                        </option>
                      ))}
                    </select>
                  )}
                </FormField>
                <FormField
                  id="guest-count"
                  label="Jumlah tamu"
                  required
                  error={errors.guests}
                >
                  {(control) => (
                    <input
                      {...control}
                      type="number"
                      placeholder="Contoh: 4"
                      required
                      min={1}
                      max={MAX_GUESTS}
                      step={1}
                      inputMode="numeric"
                      value={values.guests}
                      onChange={(event) => update('guests', event.target.value)}
                    />
                  )}
                </FormField>
                <FormField
                  id="table-area"
                  label="Area meja"
                  required
                  error={errors.area}
                >
                  {(control) => (
                    <select
                      {...control}
                      required
                      value={values.area}
                      onChange={(event) => update('area', event.target.value)}
                    >
                      <option value="">Pilih area</option>
                      {AREAS.map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                </FormField>
                <FormField id="visit-purpose" label="Keperluan acara" optional>
                  {(control) => (
                    <select
                      {...control}
                      value={purpose}
                      onChange={(event) => setPurpose(event.target.value)}
                    >
                      {PURPOSES.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  )}
                </FormField>
              </div>
              <FormField id="reservation-note" label="Catatan tambahan" optional>
                {(control) => (
                  <textarea
                    {...control}
                    rows={3}
                    maxLength={300}
                    placeholder="Contoh: perlu kursi anak atau tempat yang mudah diakses."
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                  />
                )}
              </FormField>
              <div className="notice reservation-notice">
                Untuk lebih dari {MAX_GUESTS} tamu atau kebutuhan khusus,
                silakan hubungi restoran. Area meja mengikuti ketersediaan dan
                konfirmasi staf.
              </div>
            </div>

            <div className="notice" role="alert" hidden={errorCount === 0}>
              Ada {errorCount} kolom yang perlu diperiksa. Perbaiki isian yang
              ditandai.
            </div>
          </form>

          <aside className="reservation-aside">
            <div className="reservation-image">
              <img src="/assets/interior.jpg" alt="Ilustrasi area makan keluarga" />
              <div>
                Tempat yang hangat.
                <br />
                <strong>Untuk momen yang dekat.</strong>
              </div>
            </div>
            <div className="order-summary">
              <span className="eyebrow">Rencana Anda</span>
              <h2>
                Sampai bertemu
                <br />
                di meja kami.
              </h2>
              <dl className="reservation-summary">
                {summary.map(([term, detail]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{detail}</dd>
                  </div>
                ))}
              </dl>
              <button
                className="btn btn-light wide"
                type="submit"
                form="reservation-form"
              >
                Tinjau Reservasi →
              </button>
              <p className="summary-footnote">
                Reservasi belum pasti sampai tim Rahmawati mengonfirmasi melalui
                WhatsApp.
              </p>
            </div>
          </aside>
        </section>
      </main>

      <RequestDialog message={message} onClose={() => setMessage(null)} />
    </Layout>
  )
}
