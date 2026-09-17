import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Layout } from '../components/layout/Layout'
import { CategoryTabs } from '../components/menu/CategoryTabs'
import { MenuCard } from '../components/menu/MenuCard'
import { MenuSearch } from '../components/menu/MenuSearch'
import { OutletHeader } from '../components/menu/OutletHeader'
import { ReviewTools, type ReviewState } from '../components/menu/ReviewTools'
import { StickyCartBar } from '../components/menu/StickyCartBar'
import { TableContextBanner } from '../components/menu/TableContextBanner'
import { TableDialog } from '../components/menu/TableDialog'
import { useToast } from '../components/ui/toast-context'
import { CATEGORIES } from '../data/categories'
import { MENU, isFavorite } from '../data/menu'
import { RESTAURANT } from '../data/restaurant'
import { useCart } from '../features/cart/cart-context'
import { useDiningSession } from '../features/dining-session/dining-session-context'
import { useOverlay } from '../features/ui/overlay-context'
import { badgeLabel } from '../lib/badges'
import { money } from '../lib/currency'
import { isValidTable } from '../lib/validation'
import type { CategoryFilter, MenuItem } from '../types/menu'

/**
 * State awal halaman dari URL. Nilai meja sendiri disimpan DiningSessionProvider;
 * di sini hanya menentukan apakah dialog error perlu dibuka.
 */
function readInitialState() {
  const params = new URLSearchParams(window.location.search)
  const rawTable = params.get('table')
  const rawCategory = params.get('category')
  const category =
    CATEGORIES.find((item) => item.value === rawCategory)?.value ??
    ('Semua' as CategoryFilter)
  const invalidTable = rawTable !== null && !isValidTable(rawTable)

  return {
    dialogOpen: invalidTable,
    error: invalidTable
      ? `Nomor meja pada URL tidak valid. Masukkan nomor meja ${RESTAURANT.tableRange.min}–${RESTAURANT.tableRange.max}.`
      : null,
    category,
  }
}

const addButtonLabel = (item: MenuItem) =>
  item.sold ? 'Habis hari ini' : '+ Tambah'

/** Menyalin perilaku pencarian referensi: nama + seluruh teks kartu. */
const haystack = (item: MenuItem) =>
  (
    item.name +
    ' ' +
    badgeLabel(item) +
    item.name +
    item.desc +
    money(item.price) +
    addButtonLabel(item)
  ).toLocaleLowerCase('id')

export function MenuPage() {
  const [initial] = useState(readInitialState)
  const [, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const { table, takeaway, setTableContext } = useDiningSession()
  const [tableDialogOpen, setTableDialogOpen] = useState(initial.dialogOpen)
  const [tableValue, setTableValue] = useState('')
  const [tableError, setTableError] = useState<string | null>(initial.error)

  const [category, setCategory] = useState<CategoryFilter>(initial.category)
  /** Animasi ganti isi grid hanya setelah kategori pernah dipilih, bukan saat load. */
  const [categoryTouched, setCategoryTouched] = useState(false)
  const [search, setSearch] = useState('')
  const [state, setState] = useState<ReviewState>('normal')
  const scrollToHeading = useRef(false)

  const searchRef = useRef<HTMLInputElement>(null)
  const { count, total, addRow } = useCart()
  const { openCart } = useOverlay()
  const toast = useToast()

  const query = search.trim().toLocaleLowerCase('id')

  const visible = useMemo(
    () =>
      MENU.filter((item) => {
        const matchCategory =
          category === 'Semua' ||
          (category === 'Favorit' && isFavorite(item.id)) ||
          item.cat === category
        const matchQuery = haystack(item).includes(query)
        return (
          matchCategory && matchQuery && (state !== 'sold' || item.sold === true)
        )
      }),
    [category, query, state],
  )

  const showLoading = state === 'loading'
  const showEmpty = !showLoading && (state === 'empty' || visible.length === 0)

  const heading = query
    ? 'Hasil pencarian'
    : category === 'Semua'
      ? 'Semua yang enak.'
      : category

  const resultCount = showLoading
    ? 'Memuat…'
    : showEmpty
      ? '0 pilihan menu'
      : `${visible.length} pilihan menu`

  useEffect(() => {
    if (!scrollToHeading.current) return
    scrollToHeading.current = false
    document.querySelector('#menu-title')?.scrollIntoView({ block: 'start' })
  })

  function updateTableUrl(nextTable: number | null, nextTakeaway: boolean) {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current)
        if (nextTable) next.set('table', String(nextTable))
        else next.delete('table')
        if (nextTakeaway) next.set('order', 'takeaway')
        else next.delete('order')
        return next
      },
      { replace: true },
    )
  }

  function resetMenu() {
    setState('normal')
    setSearch('')
    setCategory('Semua')
    searchRef.current?.focus()
  }

  function handleStateSelect(requested: ReviewState) {
    if (requested === 'validation') {
      setTableValue('')
      setTableError('Nomor meja wajib diisi untuk makan di tempat.')
      setTableDialogOpen(true)
      return
    }
    if (requested === 'cart-empty') {
      openCart(true)
      return
    }
    setState(requested)
    setSearch(requested === 'no-results' ? 'Pizza rendang' : '')
    setCategory('Semua')
    scrollToHeading.current = true
  }

  return (
    <Layout page="menu" title="Menu — Restoran Rahmawati">
      <main id="main">
        <OutletHeader />

        <div className="wrap">
          <TableContextBanner
            table={table}
            takeaway={takeaway}
            onChange={() => {
              setTableError(null)
              setTableValue(table ? String(table) : '')
              setTableDialogOpen(true)
            }}
          />
          <MenuSearch
            value={search}
            inputRef={searchRef}
            onChange={(value) => {
              setState('normal')
              setSearch(value)
            }}
          />
        </div>

        <CategoryTabs
          category={category}
          onSelect={(value) => {
            setState('normal')
            setCategory(value)
            setCategoryTouched(true)
          }}
        />

        <section className="wrap menu-content" aria-labelledby="menu-title">
          <div className="menu-heading">
            <h2 id="menu-title">{heading}</h2>
            <span id="result-count" aria-live="polite">
              {resultCount}
            </span>
          </div>

          <div
            key={category}
            className="product-grid menu-grid"
            id="menu-grid"
            data-swap={categoryTouched || undefined}
            hidden={showLoading || showEmpty}
          >
            {visible.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                variant="menu"
                onAdd={() => {
                  const result = addRow({ id: item.id, qty: 1 })
                  if (result === 'max') {
                    toast(
                      `Maksimal ${RESTAURANT.maxQtyPerItem} porsi per menu untuk preview ini.`,
                    )
                    return
                  }
                  if (result === 'added') toast(`${item.name} ditambahkan`)
                }}
              />
            ))}
          </div>

          <div id="menu-state" role="status" hidden={!showLoading && !showEmpty}>
            {showLoading ? (
              <>
                <p style={{ marginBottom: '20px' }}>Sedang menyiapkan menu…</p>
                <div className="product-grid" aria-hidden="true">
                  {Array.from({ length: 6 }, (_, index) => (
                    <div className="skeleton" key={index}>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ))}
                </div>
              </>
            ) : showEmpty ? (
              <div className="empty-state">
                <span className="empty-icon" aria-hidden="true">
                  ⌕
                </span>
                <h3>
                  {state === 'empty'
                    ? 'Dapur sedang menyiapkan menu.'
                    : 'Belum ketemu yang dicari.'}
                </h3>
                <p>
                  {state === 'empty'
                    ? 'Daftar menu belum tersedia. Silakan tanyakan pilihan hari ini kepada staf restoran.'
                    : query
                      ? `Tidak ada menu untuk “${search.trim()}”. Coba kata lain atau pilih semua kategori.`
                      : 'Belum ada menu di kategori ini. Coba lihat kategori lainnya.'}
                </p>
                <button
                  className="btn btn-outline"
                  type="button"
                  id="reset-menu"
                  onClick={resetMenu}
                >
                  Lihat Semua Menu
                </button>
              </div>
            ) : null}
          </div>

          <ReviewTools state={state} onSelect={handleStateSelect} />
        </section>

        <StickyCartBar
          count={count}
          total={total}
          onOpen={() => navigate('/cart')}
        />
      </main>

      <TableDialog
        open={tableDialogOpen}
        value={tableValue}
        error={tableError}
        onClose={() => setTableDialogOpen(false)}
        onValueChange={(value) => {
          setTableValue(value)
          setTableError(null)
        }}
        onSubmit={(value) => {
          if (!isValidTable(value)) {
            setTableError(
              `Masukkan nomor meja bulat antara ${RESTAURANT.tableRange.min}–${RESTAURANT.tableRange.max}.`,
            )
            return false
          }
          const next = Number(value)
          setTableContext({ table: next, takeaway: false })
          updateTableUrl(next, false)
          setTableDialogOpen(false)
          toast(`Nomor meja disimpan: Meja ${next}`)
          return true
        }}
        onTakeaway={() => {
          setTableContext({ table: null, takeaway: true })
          updateTableUrl(null, true)
          setTableDialogOpen(false)
          toast('Jenis pesanan: dibawa pulang')
        }}
      />
    </Layout>
  )
}
