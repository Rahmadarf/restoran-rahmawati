import { useSearchParams } from 'react-router-dom'

import { isValidTable } from '../lib/validation'

/**
 * Tautan ke halaman menu yang membawa konteks meja aktif.
 * Nomor meja hanya ikut ketika URL saat ini memang berisi meja yang valid,
 * sehingga pengunjung tanpa scan QR tidak pernah menerima meja tebakan.
 */
export function useMenuHref() {
  const [params] = useSearchParams()
  const table = params.get('table')
  const valid = table !== null && isValidTable(table)

  return (extra?: Record<string, string>) => {
    const search = new URLSearchParams()
    for (const [key, value] of Object.entries(extra ?? {})) {
      search.set(key, value)
    }
    if (valid) search.set('table', String(Number(table)))
    const query = search.toString()
    return query ? `/menu?${query}` : '/menu'
  }
}
