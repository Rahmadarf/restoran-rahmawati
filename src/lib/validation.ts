import { RESTAURANT } from '../data/restaurant'
import { localDate, localTime } from './datetime'

/** Nomor meja contoh: bilangan bulat 1–50. */
export function isValidTable(raw: string | number) {
  const value = String(raw)
  return (
    /^\d{1,2}$/.test(value) &&
    Number(value) >= RESTAURANT.tableRange.min &&
    Number(value) <= RESTAURANT.tableRange.max
  )
}

/** Format Indonesia: +62 / 62 / 08 diikuti 7–12 digit; spasi dan tanda baca diabaikan. */
export function isValidWhatsApp(raw: string) {
  return /^(?:\+62|62|08)\d{7,12}$/.test(raw.replace(/[\s()-]/g, ''))
}

/** Pesan per field; field tanpa kunci berarti valid. Urutan kunci = urutan fokus. */
export type FieldErrors<Field extends string> = Partial<Record<Field, string>>

const REQUIRED = 'Kolom ini wajib diisi.'
const INVALID_WHATSAPP = 'Gunakan nomor WhatsApp valid, misalnya 081234567890.'

export type CheckoutValues = {
  name: string
  whatsapp: string
  orderType: 'dinein' | 'takeaway'
  table: string
  orderTime: 'now' | 'later'
  pickupTime: string
}

export function validateCheckout(
  values: CheckoutValues,
  now = new Date(),
): FieldErrors<keyof CheckoutValues> {
  const errors: FieldErrors<keyof CheckoutValues> = {}
  const name = values.name.trim()
  const whatsapp = values.whatsapp.trim()
  const table = values.table.trim()

  if (!name) errors.name = REQUIRED
  if (!whatsapp) errors.whatsapp = REQUIRED
  else if (!isValidWhatsApp(whatsapp)) errors.whatsapp = INVALID_WHATSAPP

  if (values.orderType === 'dinein') {
    if (!table) errors.table = REQUIRED
    else if (!isValidTable(table))
      errors.table = `Masukkan nomor meja bulat ${RESTAURANT.tableRange.min}–${RESTAURANT.tableRange.max}.`
  }

  if (values.orderTime === 'later') {
    const time = values.pickupTime
    if (!time) errors.pickupTime = REQUIRED
    else if (time < '10:00' || time > '20:30')
      errors.pickupTime = 'Pilih waktu antara 10.00–20.30 WIB.'
    else if (time <= localTime(now))
      errors.pickupTime =
        'Waktu hari ini sudah lewat. Pilih waktu yang akan datang.'
  }

  return errors
}

export type ReservationValues = {
  name: string
  whatsapp: string
  date: string
  time: string
  guests: string
  area: string
}

export const MAX_GUESTS = 30

export function validateReservation(
  values: ReservationValues,
  now = new Date(),
): FieldErrors<keyof ReservationValues> {
  const errors: FieldErrors<keyof ReservationValues> = {}
  const whatsapp = values.whatsapp.trim()
  const guests = values.guests.trim()

  if (!values.name.trim()) errors.name = REQUIRED
  if (!whatsapp) errors.whatsapp = REQUIRED
  else if (!isValidWhatsApp(whatsapp)) errors.whatsapp = INVALID_WHATSAPP

  const today = localDate(now)
  if (!values.date) errors.date = REQUIRED
  else if (values.date < today)
    errors.date = 'Tanggal sudah lewat. Pilih hari ini atau sesudahnya.'

  if (!values.time) errors.time = REQUIRED
  else if (values.date === today && values.time <= localTime(now))
    errors.time = 'Jam sudah lewat. Pilih jam berikutnya atau tanggal lain.'

  if (!guests) errors.guests = REQUIRED
  else if (
    !Number.isInteger(Number(guests)) ||
    Number(guests) < 1 ||
    Number(guests) > MAX_GUESTS
  )
    errors.guests = `Jumlah tamu harus 1–${MAX_GUESTS} orang.`

  if (!values.area) errors.area = REQUIRED

  return errors
}
