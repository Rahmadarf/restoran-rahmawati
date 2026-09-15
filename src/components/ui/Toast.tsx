import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import { ToastContext } from './toast-context'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const toast = useCallback((value: string) => {
    window.clearTimeout(timer.current)
    setMessage(value)
    timer.current = window.setTimeout(() => setMessage(null), 2500)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const value = useMemo(() => toast, [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast" id="toast" role="status" hidden={message === null}>
        {message}
      </div>
    </ToastContext.Provider>
  )
}
