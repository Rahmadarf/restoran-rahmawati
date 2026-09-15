import { TableIcon } from '../ui/Icons'

type TableContextBannerProps = {
  table: number | null
  takeaway: boolean
  onChange: () => void
}

export function TableContextBanner({
  table,
  takeaway,
  onChange,
}: TableContextBannerProps) {
  const label = takeaway
    ? 'Dibawa pulang'
    : table
      ? `Meja ${table}`
      : 'Belum memilih meja'
  const description = takeaway
    ? 'Pesanan akan dikonfirmasi sebelum diambil.'
    : table
      ? 'Makan di tempat · Pastikan nomor sesuai meja Anda.'
      : 'Scan QR atau isi nomor meja untuk makan di tempat.'

  return (
    <div className="table-banner" data-component="TableContextBanner">
      <span className="icon">
        <TableIcon />
      </span>
      <div>
        <strong id="table-label">{label}</strong>
        <p id="table-description">{description}</p>
      </div>
      <button id="change-table" type="button" onClick={onChange}>
        {table || takeaway ? 'Ganti' : 'Pilih'}
      </button>
    </div>
  )
}
