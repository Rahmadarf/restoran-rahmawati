import { productById } from '../data/menu'
import type { CartRow } from '../types/cart'
import { describeRow, unitPrice } from './cart-model'
import { money } from './currency'
import { dateLabel, localDate } from './datetime'
import type { CheckoutValues, ReservationValues } from './validation'

/** Teks permintaan pesanan untuk ditinjau sebelum dikirim ke WhatsApp. */
export function checkoutMessage(
  values: CheckoutValues & { payment: 'cash' | 'transfer'; note: string },
  rows: CartRow[],
  total: number,
) {
  const items = rows
    .map((row) =>
      [
        `${row.qty}× ${productById(row.id)?.name ?? row.id}`,
        describeRow(row),
        row.note ? `Catatan: ${row.note}` : null,
        money(unitPrice(row) * row.qty),
      ]
        .filter(Boolean)
        .join('\n'),
    )
    .join('\n\n')

  return [
    'PERMINTAAN PESANAN · RAHMAWATI',
    '',
    `Nama: ${values.name.trim()}`,
    `WhatsApp: ${values.whatsapp.trim()}`,
    `Jenis: ${values.orderType === 'dinein' ? `Makan di tempat · Meja ${values.table.trim()}` : 'Ambil sendiri'}`,
    `Waktu: ${values.orderTime === 'now' ? 'Sesegera mungkin' : `${localDate()} ${values.pickupTime} WIB`}`,
    '',
    items,
    '',
    `Subtotal: ${money(total)}`,
    'Biaya tambahan: Rp0',
    `Total: ${money(total)}`,
    `Bayar: ${values.payment === 'cash' ? 'Tunai / cash' : 'Transfer manual setelah konfirmasi'}`,
    `Catatan umum: ${values.note.trim() || '—'}`,
    '',
    'Mohon konfirmasi ketersediaan dan waktu penyajian. Permintaan ini belum terkonfirmasi.',
  ].join('\n')
}

/** Teks permintaan reservasi untuk ditinjau sebelum dikirim ke WhatsApp. */
export function reservationMessage(
  values: ReservationValues & { purpose: string; note: string },
) {
  return [
    'PERMINTAAN RESERVASI · RAHMAWATI',
    '',
    `Nama: ${values.name.trim()}`,
    `WhatsApp: ${values.whatsapp.trim()}`,
    `Tanggal: ${dateLabel(values.date)}`,
    `Jam: ${values.time} WIB`,
    `Tamu: ${values.guests.trim()} orang`,
    `Area: ${values.area}`,
    `Acara: ${values.purpose}`,
    `Catatan: ${values.note.trim() || '—'}`,
    '',
    'Mohon konfirmasi ketersediaan meja. Reservasi belum pasti sebelum dikonfirmasi restoran.',
  ].join('\n')
}
