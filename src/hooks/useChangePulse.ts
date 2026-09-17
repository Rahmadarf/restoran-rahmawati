import { useState } from 'react'

/**
 * `true` setelah nilai pernah berubah sejak mount. Dipasang bersama
 * `key={value}` supaya animasi pulse diputar ulang tiap perubahan, tapi tidak
 * saat halaman dibuka dengan nilai tersimpan.
 */
export function useChangePulse<T>(value: T) {
  const [previous, setPrevious] = useState(value)
  const [changed, setChanged] = useState(false)
  if (value !== previous) {
    setPrevious(value)
    setChanged(true)
  }
  return changed
}
