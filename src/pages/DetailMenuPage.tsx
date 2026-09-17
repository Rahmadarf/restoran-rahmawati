import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { Layout } from '../components/layout/Layout'
import { DetailOptions } from '../components/menu/DetailOptions'
import { QuantitySelector } from '../components/menu/QuantitySelector'
import { useToast } from '../components/ui/toast-context'
import { productById } from '../data/menu'
import { optionsFor } from '../data/options'
import { RESTAURANT } from '../data/restaurant'
import { useCart } from '../features/cart/cart-context'
import { useMenuHref } from '../hooks/useMenuHref'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { normalizeRow, unitPrice } from '../lib/cart-model'
import { money } from '../lib/currency'

export function DetailMenuPage() {
  const [params] = useSearchParams()
  const { rowByKey, addRow, updateRow } = useCart()
  const toast = useToast()
  const navigate = useNavigate()
  const menuHref = useMenuHref()

  const editKey = params.get('edit')
  const [existing] = useState(() => (editKey ? rowByKey(editKey) : undefined))
  const selectedId = existing?.id ?? params.get('id') ?? 'ayam'
  const item = productById(selectedId)
  const options = optionsFor(selectedId)

  const [qty, setQty] = useState(existing?.qty ?? 1)
  const [variant, setVariant] = useState(existing?.variant ?? 0)
  const [spice, setSpice] = useState(existing?.spice ?? options.spicy[0] ?? '')
  const [extra, setExtra] = useState<number[]>(existing?.extra ?? [])
  const [note, setNote] = useState(existing?.note ?? '')
  const [justAdded, setJustAdded] = useState(false)
  const addedTimer = useRef<number | undefined>(undefined)
  // Di mobile, isi pilihan berada di bawah foto dan baru terlihat setelah scroll.
  const mainRef = useScrollReveal<HTMLElement>('.detail-content')

  useEffect(() => () => window.clearTimeout(addedTimer.current), [])

  if (!item) {
    return (
      <Layout page="detail" title="Detail Menu — Restoran Rahmawati">
        <main id="main">
          <div className="wrap breadcrumb">
            <Link to={menuHref()}>← Kembali ke menu</Link>
            <span>Menu pilihan / Detail menu</span>
          </div>
          <section className="wrap detail-layout">
            <div className="detail-content">
              <span className="eyebrow">Menu tidak ditemukan</span>
              <h1>
                Pilih rasa
                <br />
                yang lain.
              </h1>
              <p>Menu ini tidak tersedia dalam katalog.</p>
              <Link className="btn" to={menuHref()}>
                Kembali ke Menu
              </Link>
            </div>
          </section>
        </main>
      </Layout>
    )
  }

  const sold = item.sold === true
  const draft = normalizeRow({
    key: existing?.key,
    id: item.id,
    qty,
    variant,
    spice,
    extra,
    note,
  })
  const totalLabel = draft ? money(unitPrice(draft) * qty) : money(item.price)

  const addLabel = sold
    ? 'Habis Hari Ini'
    : justAdded
      ? 'Ditambahkan ✓'
      : existing
        ? 'Simpan Perubahan'
        : 'Tambah ke Keranjang'

  function changeQty(delta: number) {
    setQty((current) =>
      Math.max(1, Math.min(RESTAURANT.maxQtyPerItem, current + delta)),
    )
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sold || !item) return

    const input = {
      id: item.id,
      qty,
      variant,
      spice,
      extra,
      note,
    }

    if (existing) {
      updateRow(existing.key, input)
      navigate('/cart')
      return
    }

    const result = addRow(input)
    if (result === 'max') {
      toast('Maksimal 99 porsi untuk pilihan yang sama.')
      return
    }
    if (result !== 'added') return

    toast(`${item.name} ditambahkan`)
    setJustAdded(true)
    window.clearTimeout(addedTimer.current)
    addedTimer.current = window.setTimeout(() => setJustAdded(false), 1600)
  }

  return (
    <Layout page="detail" title="Detail Menu — Restoran Rahmawati">
      <main id="main" ref={mainRef}>
        <div className="wrap breadcrumb">
          <Link to={menuHref()}>← Kembali ke menu</Link>
          <span>Menu pilihan / Detail menu</span>
        </div>
        <section className="wrap detail-layout">
          <div className="detail-visual">
            <img
              id="detail-photo"
              src={`/assets/${item.img}`}
              alt={`${item.name} — foto ilustrasi`}
            />
            <span className="badge badge-accent" id="detail-badge">
              {sold ? 'Habis hari ini' : item.badge || 'Dari dapur kami'}
            </span>
            <div className="detail-caption">
              Dari dapur kami.
              <br />
              <strong>Dibuat sesuai selera Anda.</strong>
            </div>
          </div>
          <div className="detail-content">
            <span className="eyebrow">Bikin pas di lidah.</span>
            <h1 id="detail-title">{item.name}</h1>
            <div className="detail-price" id="base-price">
              Mulai {money(item.price)}
            </div>
            <p className="muted" id="detail-desc">
              {item.desc}
            </p>
            <form id="detail-form" onSubmit={handleSubmit}>
              <DetailOptions
                options={options}
                variant={variant}
                spice={spice}
                extra={extra}
                disabled={sold}
                onVariantChange={setVariant}
                onSpiceChange={setSpice}
                onExtraToggle={(index, checked) =>
                  setExtra((current) =>
                    checked
                      ? [...new Set([...current, index])].sort((a, b) => a - b)
                      : current.filter((value) => value !== index),
                  )
                }
              />
              <div className="field">
                <label htmlFor="item-note">
                  Catatan khusus <span className="optional">(opsional)</span>
                </label>
                <textarea
                  id="item-note"
                  name="item-note"
                  rows={3}
                  maxLength={300}
                  placeholder="Contoh: sambal dipisah, tanpa timun."
                  value={note}
                  disabled={sold}
                  onChange={(event) => setNote(event.target.value)}
                />
              </div>
              <p className="small muted detail-note">
                Ada alergi makanan? Cantumkan di catatan dan konfirmasikan
                langsung kepada staf.
              </p>
              <div className="detail-action">
                <QuantitySelector
                  name={item.name}
                  quantity={qty}
                  min={1}
                  disabled={sold}
                  outputId="detail-quantity"
                  onChange={changeQty}
                />
                <button
                  className="btn"
                  type="submit"
                  id="detail-add"
                  disabled={sold}
                >
                  <span>{addLabel}</span>
                  <strong id="detail-total" aria-live="polite">
                    {totalLabel}
                  </strong>
                </button>
              </div>
            </form>
            <p className="small muted" id="detail-availability">
              {sold
                ? 'Menu ini belum bisa dipesan. Silakan pilih menu lain.'
                : 'Harga menyesuaikan pilihan dan jumlah porsi.'}
            </p>
            <Link className="text-link" to="/cart">
              Lihat Keranjang →
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  )
}
