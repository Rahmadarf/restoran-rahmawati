import { createContext, useContext } from 'react'

export type InfoType = 'reservation' | 'contact' | 'next'

export type OverlayContextValue = {
  showInfo: (type: InfoType) => void
  openCart: (emptyPreview?: boolean) => void
}

export const OverlayContext = createContext<OverlayContextValue | null>(null)

export function useOverlay() {
  const context = useContext(OverlayContext)
  if (!context)
    throw new Error('useOverlay harus dipakai di dalam OverlayProvider')
  return context
}
