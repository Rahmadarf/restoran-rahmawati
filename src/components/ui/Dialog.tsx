import { useEffect, useRef, type ReactNode } from 'react'

import { CloseIcon } from './Icons'

type DialogProps = {
  id: string
  open: boolean
  onClose: () => void
  title: string
  titleId: string
  closeLabel: string
  children: ReactNode
}

/**
 * Bungkus elemen `dialog` native: fokus terkurung saat terbuka, Escape menutup,
 * dan klik di luar panel menutup dialog.
 */
export function Dialog({
  id,
  open,
  onClose,
  title,
  titleId,
  closeLabel,
  children,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  return (
    <dialog
      id={id}
      ref={ref}
      aria-labelledby={titleId}
      onClick={(event) => {
        const dialog = ref.current
        if (!dialog || event.target !== dialog) return
        const rect = dialog.getBoundingClientRect()
        const outside =
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        if (outside) dialog.close()
      }}
    >
      <div className="dialog-head">
        <h2 id={titleId}>{title}</h2>
        <button
          className="circle-btn"
          type="button"
          data-close
          aria-label={closeLabel}
          onClick={() => ref.current?.close()}
        >
          <CloseIcon />
        </button>
      </div>
      {children}
    </dialog>
  )
}
