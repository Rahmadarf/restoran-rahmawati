import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { isValidTable } from '../../lib/validation'
import type { TableContext } from '../../types/dining-session'
import {
  DiningSessionContext,
  type DiningSessionContextValue,
} from './dining-session-context'

const TABLE_KEY = 'rahmawati-table'
const NOTE_KEY = 'rahmawati-general-note'

function read<T>(key: string, fallback: T): T {
  try {
    return (JSON.parse(sessionStorage.getItem(key) as string) as T) ?? fallback
  } catch {
    /* Ketersediaan storage berbeda antarbrowser. */
    return fallback
  }
}

function save(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* Abaikan jika storage diblokir. */
  }
}

function normalizeTable(raw: Partial<TableContext> | null): TableContext {
  const valid = raw?.table != null && isValidTable(raw.table)
  return {
    table: valid ? Number(raw.table) : null,
    takeaway: !valid && raw?.takeaway === true,
  }
}

/**
 * Konteks meja dari sesi sebelumnya, ditimpa parameter URL saat aplikasi dibuka
 * (scan QR `?table=12` atau `?order=takeaway`). Nomor tidak valid dikosongkan,
 * tidak pernah ditebak.
 */
function readInitialTable(): TableContext {
  const params = new URLSearchParams(window.location.search)
  if (params.get('order') === 'takeaway') return { table: null, takeaway: true }
  if (params.has('table')) {
    return normalizeTable({ table: Number(params.get('table')), takeaway: false })
  }
  return normalizeTable(read<Partial<TableContext> | null>(TABLE_KEY, null))
}

export function DiningSessionProvider({ children }: { children: ReactNode }) {
  const [tableContext, setTableState] = useState<TableContext>(readInitialTable)
  const [generalNote, setNoteState] = useState(() =>
    String(read(NOTE_KEY, '')).slice(0, 300),
  )

  useEffect(() => save(TABLE_KEY, tableContext), [tableContext])
  useEffect(() => save(NOTE_KEY, generalNote), [generalNote])

  const setTableContext = useCallback(
    (context: TableContext) => setTableState(normalizeTable(context)),
    [],
  )
  const setGeneralNote = useCallback(
    (note: string) => setNoteState(note.slice(0, 300)),
    [],
  )

  const value = useMemo<DiningSessionContextValue>(
    () => ({ ...tableContext, generalNote, setTableContext, setGeneralNote }),
    [tableContext, generalNote, setTableContext, setGeneralNote],
  )

  return (
    <DiningSessionContext.Provider value={value}>
      {children}
    </DiningSessionContext.Provider>
  )
}
