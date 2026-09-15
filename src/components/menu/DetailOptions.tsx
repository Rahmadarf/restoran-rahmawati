import type { OptionSet } from '../../data/options'
import { money } from '../../lib/currency'

type DetailOptionsProps = {
  options: OptionSet
  variant: number
  spice: string
  extra: number[]
  onVariantChange: (index: number) => void
  onSpiceChange: (value: string) => void
  onExtraToggle: (index: number, checked: boolean) => void
  disabled?: boolean
}

/** VariantSelector, level pedas, dan tambahan untuk satu menu. */
export function DetailOptions({
  options,
  variant,
  spice,
  extra,
  onVariantChange,
  onSpiceChange,
  onExtraToggle,
  disabled,
}: DetailOptionsProps) {
  return (
    <div id="detail-options">
      <fieldset className="choice-group" data-component="VariantSelector">
        <legend>
          Pilih varian <small>Wajib · pilih satu</small>
        </legend>
        <div className="choice-grid">
          {options.variants.map(([label, price], index) => (
            <label className="choice-card" key={label}>
              <input
                type="radio"
                name="variant"
                value={index}
                checked={index === variant}
                disabled={disabled}
                onChange={() => onVariantChange(index)}
              />
              <span>
                <strong>{label}</strong>
                <small>{price ? '+' + money(price) : 'Harga dasar'}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {options.spicy.length ? (
        <fieldset className="choice-group">
          <legend>
            Level pedas <small>Pilih satu</small>
          </legend>
          <div className="chip-options">
            {options.spicy.map((label) => (
              <label key={label}>
                <input
                  type="radio"
                  name="spice"
                  value={label}
                  checked={label === spice}
                  disabled={disabled}
                  onChange={() => onSpiceChange(label)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <fieldset className="choice-group">
        <legend>
          Biar makin lengkap <small>Opsional</small>
        </legend>
        <div className="addon-options">
          {options.extras.map(([label, price], index) => (
            <label key={label}>
              <input
                type="checkbox"
                name="extra"
                value={index}
                checked={extra.includes(index)}
                disabled={disabled}
                onChange={(event) => onExtraToggle(index, event.target.checked)}
              />
              <span>{label}</span>
              <strong>+{money(price)}</strong>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
