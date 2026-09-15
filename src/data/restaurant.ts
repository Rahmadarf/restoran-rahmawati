export const RESTAURANT = {
  name: 'Restoran Rahmawati',
  tagline: 'RESTORAN KELUARGA',
  address: 'Jl. Melati No. 12, Bandung, Jawa Barat',
  addressShort: 'Jl. Melati No. 12, Bandung · Alamat contoh',
  hours: 'Setiap hari · 10.00–21.00 WIB',
  hoursShort: '10.00–21.00 WIB',
  lastOrder: 'Pesanan terakhir pukul 20.30 WIB.',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Restoran%20Rahmawati',
  /** Rentang nomor meja contoh pada prototype. */
  tableRange: { min: 1, max: 50 },
  maxQtyPerItem: 99,
} as const
