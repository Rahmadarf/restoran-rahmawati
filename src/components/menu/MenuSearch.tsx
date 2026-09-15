import type { RefObject } from 'react'

import { SearchIcon } from '../ui/Icons'

type MenuSearchProps = {
  value: string
  onChange: (value: string) => void
  inputRef?: RefObject<HTMLInputElement | null>
}

export function MenuSearch({ value, onChange, inputRef }: MenuSearchProps) {
  return (
    <div className="menu-tools">
      <label className="search" data-component="MenuSearch">
        <SearchIcon />
        <input
          id="menu-search"
          ref={inputRef}
          type="search"
          placeholder="Lagi ingin makan apa?"
          aria-label="Cari menu"
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
      <span className="menu-note">Dari dapur kami, untuk selera Anda.</span>
    </div>
  )
}
