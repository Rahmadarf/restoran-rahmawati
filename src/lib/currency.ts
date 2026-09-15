const formatter = new Intl.NumberFormat('id-ID')

export const money = (value: number) => 'Rp' + formatter.format(value)
