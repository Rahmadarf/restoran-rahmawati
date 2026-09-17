import { createContext, useContext } from 'react'

import type { TableContext } from '../../types/dining-session'

export type DiningSessionContextValue = TableContext & {
  /** Catatan umum untuk restoran, diisi di Keranjang dan dibawa ke Checkout. */
  generalNote: string
  setTableContext: (context: TableContext) => void
  setGeneralNote: (note: string) => void
}

export const DiningSessionContext =
  createContext<DiningSessionContextValue | null>(null)

export function useDiningSession() {
  const context = useContext(DiningSessionContext)
  if (!context)
    throw new Error(
      'useDiningSession harus dipakai di dalam DiningSessionProvider',
    )
  return context
}
