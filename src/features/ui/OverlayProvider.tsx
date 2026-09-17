import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { CartItemRow } from '../../components/menu/CartItemRow'
import { Dialog } from '../../components/ui/Dialog'
import { useToast } from '../../components/ui/toast-context'
import { money } from '../../lib/currency'
import { useCart } from '../cart/cart-context'
import {
  OverlayContext,
  type InfoType,
  type OverlayContextValue,
} from './overlay-context'

const INFO: Record<InfoType, { title: string; body: ReactNode }> = {
  contact: {
    title: 'Hubungi Rahmawati',
    body: (
      <>
        <p>
          Nomor WhatsApp resmi restoran belum tersedia. Tombol ini akan membuka
          percakapan WhatsApp setelah kontak asli ditambahkan.
        </p>
        <div className="notice">
          <strong>Prototype visual</strong>Belum ada pesan atau permintaan yang
          dikirim.
        </div>
      </>
    ),
  },
}

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [info, setInfo] = useState<InfoType | null>(null)
  // Konten terakhir dipertahankan supaya tidak kosong selama fade-out dialog.
  const [shownInfo, setShownInfo] = useState<InfoType | null>(null)
  if (info && info !== shownInfo) setShownInfo(info)
  const [cartOpen, setCartOpen] = useState(false)
  const [emptyPreview, setEmptyPreview] = useState(false)
  const pendingFocus = useRef(false)

  const { rows, count, total, changeQuantity, remove } = useCart()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const showInfo = useCallback((type: InfoType) => setInfo(type), [])
  const openCart = useCallback((empty = false) => {
    setEmptyPreview(empty)
    setCartOpen(true)
  }, [])

  const value = useMemo<OverlayContextValue>(
    () => ({ showInfo, openCart }),
    [showInfo, openCart],
  )

  const showEmpty = !count || emptyPreview

  useEffect(() => {
    if (!pendingFocus.current) return
    pendingFocus.current = false
    const fallback =
      document.querySelector<HTMLButtonElement>('#browse-menu') ??
      document.querySelector<HTMLButtonElement>('#next-preview')
    fallback?.focus()
  })

  return (
    <OverlayContext.Provider value={value}>
      {children}

      <Dialog
        id="cart-dialog"
        titleId="cart-title"
        title="Pilihan Anda"
        closeLabel="Tutup ringkasan keranjang"
        open={cartOpen}
        // emptyPreview di-reset oleh openCart berikutnya, bukan saat tutup,
        // supaya isi dialog tidak berganti selama fade-out.
        onClose={() => setCartOpen(false)}
      >
        <div className="dialog-body" id="cart-preview">
          {showEmpty ? (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">
                ＋
              </span>
              <h3>
                Mejanya siap.
                <br />
                Pilihannya belum.
              </h3>
              <p>Yuk, temukan menu favorit untuk menemani waktu bersama.</p>
              <button
                className="btn"
                type="button"
                id="browse-menu"
                onClick={() => {
                  setCartOpen(false)
                  if (location.pathname !== '/menu') navigate('/menu')
                }}
              >
                Jelajahi Menu
              </button>
            </div>
          ) : (
            <>
              <p className="small muted">Ringkasan pilihan · simulasi prototype</p>
              {rows.map((row) => (
                <CartItemRow
                  key={row.key}
                  row={row}
                  onChangeQuantity={(delta) => {
                    if (row.qty + delta <= 0) pendingFocus.current = true
                    changeQuantity(row.key, delta)
                    toast('Pilihan diperbarui')
                  }}
                  onRemove={() => {
                    pendingFocus.current = true
                    remove(row.key)
                    toast('Menu dihapus dari pilihan')
                  }}
                />
              ))}
              <div className="cart-summary">
                <strong>Subtotal</strong>
                <strong>{money(total)}</strong>
              </div>
              <div className="notice">
                Harga contoh. Pilihan ini belum dikirim ke restoran.
              </div>
              <button
                className="btn"
                type="button"
                id="next-preview"
                onClick={() => {
                  setCartOpen(false)
                  navigate('/cart')
                }}
              >
                Lihat Keranjang →
              </button>
            </>
          )}
        </div>
      </Dialog>
      <Dialog
        id="info-dialog"
        titleId="info-title"
        title={shownInfo ? INFO[shownInfo].title : 'Informasi'}
        closeLabel="Tutup informasi"
        open={info !== null}
        onClose={() => setInfo(null)}
      >
        <div className="dialog-body" id="info-body">
          {shownInfo ? INFO[shownInfo].body : null}
        </div>
      </Dialog>

    </OverlayContext.Provider>
  )
}
