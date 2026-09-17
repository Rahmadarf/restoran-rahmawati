import type { ReactNode } from 'react'

export type FieldControlProps = {
  id: string
  'aria-describedby': string
  'aria-invalid': true | undefined
}

type FormFieldProps = {
  id: string
  label: ReactNode
  /** Tanda * visual; atribut `required` tetap dipasang di kontrolnya. */
  required?: boolean
  optional?: boolean
  error?: string
  /** Menerima atribut aksesibilitas yang sudah terhubung ke pesan error. */
  children: (control: FieldControlProps) => ReactNode
}

export function FormField({
  id,
  label,
  required,
  optional,
  error,
  children,
}: FormFieldProps) {
  const errorId = `${id}-error`

  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
        {optional ? <span className="optional"> (opsional)</span> : null}
      </label>
      {children({
        id,
        'aria-describedby': errorId,
        'aria-invalid': error ? true : undefined,
      })}
      <span className="field-error" id={errorId} hidden={!error}>
        {error}
      </span>
    </div>
  )
}
