import { useRef, type FormEvent } from 'react'

import { RESTAURANT } from '../../data/restaurant'
import { Dialog } from '../ui/Dialog'
import { ArrowRightIcon } from '../ui/Icons'

type TableDialogProps = {
  open: boolean
  value: string
  error: string | null
  onClose: () => void
  onValueChange: (value: string) => void
  /** Mengembalikan `true` jika nomor meja diterima. */
  onSubmit: (value: string) => boolean
  onTakeaway: () => void
}

export function TableDialog({
  open,
  value,
  error,
  onClose,
  onValueChange,
  onSubmit,
  onTakeaway,
}: TableDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!onSubmit(value.trim())) inputRef.current?.focus()
  }

  return (
    <Dialog
      id="table-dialog"
      titleId="table-title"
      title="Nomor meja Anda"
      closeLabel="Tutup pilihan meja"
      open={open}
      onClose={onClose}
    >
      <form
        className="dialog-body"
        id="table-form"
        noValidate
        data-component="TableNumberInput"
        onSubmit={handleSubmit}
      >
        <p>
          Lihat nomor di meja Anda atau scan QR yang tersedia. Untuk contoh ini,
          nomor meja {RESTAURANT.tableRange.min}–{RESTAURANT.tableRange.max}.
        </p>
        <div className="field">
          <label htmlFor="table-number">Nomor meja</label>
          <input
            id="table-number"
            ref={inputRef}
            name="table"
            type="number"
            inputMode="numeric"
            min={RESTAURANT.tableRange.min}
            max={RESTAURANT.tableRange.max}
            step={1}
            placeholder="Contoh: 12"
            aria-describedby="table-error"
            aria-invalid={error ? true : undefined}
            value={value}
            onChange={(event) => onValueChange(event.target.value)}
          />
          <span
            className="field-error"
            id="table-error"
            hidden={!error}
            role="alert"
          >
            {error ?? 'Masukkan nomor meja 1–50.'}
          </span>
        </div>
        <button className="btn" type="submit">
          Simpan Nomor Meja <ArrowRightIcon />
        </button>
        <button
          className="btn btn-outline"
          id="takeaway"
          type="button"
          onClick={onTakeaway}
        >
          Saya pesan untuk dibawa pulang
        </button>
      </form>
    </Dialog>
  )
}
