/** Waktu mengikuti jam perangkat, diasumsikan zona Asia/Jakarta (WIB). */
const pad = (value: number) => String(value).padStart(2, '0')

/** Tanggal lokal `YYYY-MM-DD`, sama dengan format `input[type=date]`. */
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** Jam lokal `HH:MM`, sama dengan format `input[type=time]`. */
export function localTime(date = new Date()) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function dateLabel(value: string) {
  if (!value) return 'Belum dipilih'
  const date = new Date(value + 'T12:00:00')
  return Number.isNaN(date.getTime())
    ? 'Tanggal belum valid'
    : date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
}

/** `18:30` → `18.30 WIB`. */
export const timeLabel = (value: string) => value.replace(':', '.') + ' WIB'
