# Frontend Plan Website Restoran Rahmawati

## Ringkasan Proyek

Website Restoran Rahmawati akan dibangun sebagai aplikasi frontend untuk dua kebutuhan utama:

1. Landing page pemasaran yang memperkenalkan restoran, menu unggulan, promo, suasana, lokasi, dan informasi kontak.
2. Sistem pemesanan dari QR meja atau input nomor meja yang diteruskan ke WhatsApp restoran untuk dikonfirmasi secara manual.
3. Sistem reservasi meja yang diteruskan ke WhatsApp restoran untuk dikonfirmasi secara manual.

Proyek menggunakan React, TypeScript, dan Vite yang sudah tersedia di repository. Website tidak menggunakan backend, database, autentikasi, atau payment gateway pada tahap MVP.

Referensi utama untuk pengalaman katalog dan pemesanan adalah [Mie Gacoan OlaClick](https://mie-gacoan.ola.click/products). Pola yang diambil meliputi informasi outlet, status buka, pencarian, kategori menu, detail produk, catatan pesanan, dan akses WhatsApp. Identitas visual dan struktur landing page tetap dibuat khusus untuk Restoran Rahmawati.

## Tujuan

- Memperkenalkan Restoran Rahmawati secara profesional melalui website.
- Memudahkan pelanggan menemukan menu, harga, promo, lokasi, dan jam operasional.
- Memungkinkan pelanggan menyusun pesanan melalui katalog dan keranjang.
- Memungkinkan pelanggan memulai pesanan dengan memindai QR unik di meja.
- Mengisi nomor meja secara otomatis dari QR atau secara manual sebagai alternatif.
- Mendukung pembayaran cash atau transfer manual.
- Memungkinkan pelanggan mengajukan reservasi meja.
- Mengirim ringkasan pesanan dan reservasi ke WhatsApp restoran.
- Mengutamakan pengalaman mobile karena mayoritas pelanggan kemungkinan mengakses melalui ponsel.

## Ruang Lingkup MVP

### Termasuk

- Landing page pemasaran.
- Katalog menu berdasarkan kategori.
- Pencarian menu.
- Detail produk dan pilihan varian.
- QR unik untuk setiap meja dengan URL seperti `/menu?table=12`.
- Deteksi, validasi, konfirmasi, dan input manual nomor meja.
- Keranjang belanja.
- Checkout frontend.
- Pembayaran cash dan transfer manual.
- Pengiriman ringkasan pesanan ke WhatsApp.
- Form reservasi meja.
- Pengiriman permintaan reservasi ke WhatsApp.
- Penyimpanan keranjang dan draft form di `localStorage`.
- Penyimpanan konteks nomor meja selama sesi browser di `sessionStorage`.
- Desain responsif untuk mobile, tablet, dan desktop.
- State loading, empty, error, unavailable, dan success.
- Metadata dasar untuk SEO dan berbagi tautan.

### Tidak Termasuk

- Dashboard admin.
- Database dan penyimpanan pesanan terpusat.
- Login pelanggan atau staf.
- Verifikasi bahwa pengguna benar-benar berada di meja yang dipilih.
- Stok dan ketersediaan meja secara realtime.
- Verifikasi pembayaran otomatis.
- Upload serta penyimpanan bukti transfer.
- Payment gateway.
- Perhitungan ongkir otomatis.
- Pelacakan pengiriman.
- Notifikasi otomatis dari server.

## Pendekatan Operasional Frontend-Only

Website menjadi alat untuk menyusun data pesanan, bukan sistem kasir penuh. Setelah pelanggan menyelesaikan checkout, website membuka WhatsApp dengan ringkasan yang sudah terisi.

Staf restoran kemudian:

1. Memeriksa ketersediaan menu atau meja.
2. Mengonfirmasi total dan waktu pesanan.
3. Mengirim instruksi pembayaran jika pelanggan memilih transfer.
4. Meminta pelanggan mengirim bukti transfer melalui WhatsApp.
5. Memberikan konfirmasi akhir kepada pelanggan.

Website tidak boleh menampilkan status `Pesanan berhasil` atau `Reservasi berhasil` sebelum ada konfirmasi staf. Gunakan status seperti `Permintaan telah dikirim dan menunggu konfirmasi restoran`.

## Pemesanan Melalui QR Meja

Setiap meja memiliki QR unik yang mengarah ke halaman menu dengan nomor meja di URL.

Contoh:

```text
https://restoranrahmawati.com/menu?table=12
```

Saat QR dipindai:

1. Website membaca parameter `table` dari URL.
2. Nomor meja divalidasi terhadap daftar meja yang tersedia pada konfigurasi frontend.
3. Website menampilkan konfirmasi seperti `Anda memesan dari Meja 12`.
4. Pelanggan dapat mengoreksi nomor meja jika QR rusak, salah, atau berpindah meja.
5. Nomor meja disimpan di `sessionStorage` agar tetap tersedia selama pengguna berpindah halaman.
6. Nomor meja dimasukkan ke ringkasan checkout dan pesan WhatsApp.

Jika pelanggan tidak memindai QR, halaman menu menampilkan input nomor meja. Untuk pesanan makan di tempat, nomor meja wajib dikonfirmasi sebelum checkout. Untuk pesanan ambil sendiri, nomor meja tidak diperlukan.

Karena aplikasi masih frontend-only, parameter meja dapat diubah oleh pengguna dan tidak membuktikan keberadaan fisik pelanggan. Checkout harus selalu menampilkan nomor meja secara jelas agar pelanggan dapat memeriksanya sebelum mengirim pesanan. Validasi yang lebih kuat memerlukan backend dan token QR yang ditandatangani.

## Target Pengguna

- Pelanggan baru yang ingin mengenal restoran.
- Pelanggan lama yang ingin melihat menu dan harga terbaru.
- Pelanggan yang ingin memesan untuk diambil sendiri.
- Pelanggan yang duduk di restoran dan memesan melalui QR meja.
- Pelanggan yang ingin makan di tempat dan menyiapkan pesanan lebih awal.
- Keluarga atau kelompok yang ingin melakukan reservasi meja.

## Struktur Halaman

### 1. Beranda `/`

Tujuan halaman ini adalah pemasaran dan mengarahkan pelanggan ke pemesanan atau reservasi.

Bagian yang direncanakan:

- Navbar dengan logo dan navigasi utama.
- Hero dengan foto makanan unggulan.
- CTA utama `Pesan Sekarang`.
- CTA sekunder `Reservasi Meja`.
- Menu terlaris.
- Promo atau paket keluarga.
- Cerita singkat Restoran Rahmawati.
- Keunggulan restoran.
- Galeri makanan dan suasana restoran.
- Testimoni pelanggan.
- Informasi lokasi, jam buka, kontak, dan Google Maps.
- Footer.
- Tombol WhatsApp mengambang.

### 2. Menu `/menu?table=:nomor`

Tujuan halaman ini adalah membantu pelanggan menemukan dan memilih menu dengan cepat.

Fitur:

- Header outlet dengan foto sampul, logo, alamat, dan status buka.
- Informasi meja aktif seperti `Meja 12`.
- Input atau tombol ganti nomor meja.
- Tombol informasi outlet.
- Tombol WhatsApp.
- Kolom pencarian.
- Navigasi kategori horizontal dan sticky.
- Daftar produk berdasarkan kategori.
- Foto, nama, deskripsi singkat, harga, dan status produk.
- Penanda menu favorit, baru, pedas, atau habis.
- Tombol tambah ke keranjang.
- Sticky cart bar saat keranjang berisi produk.

Contoh kategori awal:

- Makanan utama.
- Lauk dan tambahan.
- Camilan.
- Minuman.
- Paket keluarga.
- Promo.

### 3. Detail Menu `/menu/:slug`

Detail menu dapat berupa halaman tersendiri atau bottom sheet pada mobile dengan URL yang tetap dapat dibagikan.

Isi:

- Foto produk.
- Nama dan harga dasar.
- Deskripsi.
- Pilihan varian.
- Pilihan tingkat pedas jika tersedia.
- Pilihan tambahan.
- Jumlah produk.
- Catatan khusus.
- Perubahan harga secara langsung.
- Tombol `Tambah ke Keranjang`.

Satu produk sebaiknya menampung varian di dalam detail produk. Contohnya, level pedas tidak dibuat menjadi banyak produk terpisah seperti `Level 1`, `Level 2`, dan seterusnya.

### 4. Keranjang `/cart`

Fitur:

- Daftar produk yang dipilih.
- Rincian varian dan tambahan.
- Mengubah jumlah.
- Menghapus produk.
- Catatan per produk.
- Catatan umum pesanan.
- Subtotal dan total.
- Empty state saat keranjang kosong.
- Tombol `Lanjut Checkout`.

### 5. Checkout `/checkout`

Data pelanggan:

- Nama.
- Nomor WhatsApp.
- Jenis pemesanan.
- Nomor meja jika memilih makan di tempat.
- Waktu kedatangan atau pengambilan.
- Catatan tambahan.

Jenis pemesanan MVP:

- Ambil sendiri.
- Makan di tempat melalui QR atau input nomor meja.

Metode pembayaran:

- Cash saat mengambil pesanan atau tiba di restoran.
- Transfer manual ke rekening restoran.

Untuk transfer manual, tampilkan:

- Nama bank.
- Nomor rekening.
- Nama pemilik rekening.
- Tombol salin nomor rekening.
- Instruksi mengirim bukti transfer melalui WhatsApp.

Tahap akhir checkout:

- Ringkasan pesanan.
- Nomor meja untuk pesanan makan di tempat.
- Total pembayaran.
- Data pelanggan.
- Metode pembayaran.
- Persetujuan bahwa pesanan menunggu konfirmasi.
- Tombol `Kirim ke WhatsApp`.

### 6. Reservasi `/reservasi`

Form reservasi:

- Nama pelanggan.
- Nomor WhatsApp.
- Tanggal.
- Jam.
- Jumlah tamu.
- Pilihan area atau jenis meja jika tersedia.
- Keperluan acara.
- Permintaan tambahan.

Validasi:

- Tanggal tidak boleh berada di masa lalu.
- Jam harus berada dalam jam operasional.
- Jumlah tamu minimal satu.
- Nomor WhatsApp wajib valid.
- Reservasi yang terlalu dekat dengan waktu sekarang diberi peringatan.

Tahap akhir:

- Tampilkan ringkasan reservasi.
- Jelaskan bahwa meja belum otomatis diamankan.
- Kirim permintaan ke WhatsApp.
- Tampilkan status menunggu konfirmasi restoran.

## Alur Pengguna

### Alur Pemesanan

```text
Scan QR meja atau buka halaman menu
  -> Nomor meja terisi otomatis atau dimasukkan manual
  -> Konfirmasi nomor meja
  -> Pilih kategori atau cari menu
  -> Buka detail produk
  -> Pilih varian, jumlah, dan catatan
  -> Tambah ke keranjang
  -> Periksa keranjang
  -> Isi data checkout
  -> Pilih cash atau transfer manual
  -> Kirim ringkasan ke WhatsApp
  -> Menunggu konfirmasi restoran
```

### Alur Reservasi

```text
Landing page
  -> Buka reservasi
  -> Pilih tanggal, jam, dan jumlah tamu
  -> Isi data pelanggan
  -> Periksa ringkasan
  -> Kirim permintaan ke WhatsApp
  -> Menunggu konfirmasi restoran
```

## Format Pesan WhatsApp

### Contoh Pesanan

```text
Pesanan Baru Restoran Rahmawati

Nama: Kumar
WhatsApp: 08xxxxxxxxxx
Jenis pesanan: Makan di tempat
Nomor meja: 12
Pembayaran: Transfer manual

2x Ayam Bakar
- Sambal: Pedas
- Nasi: Nasi putih

1x Es Teh Manis

Catatan: Sambal salah satu dipisah
Total: Rp85.000

Mohon konfirmasi ketersediaan dan total pesanan ini.
```

### Contoh Reservasi

```text
Permintaan Reservasi Restoran Rahmawati

Nama: Kumar
WhatsApp: 08xxxxxxxxxx
Tanggal: 20 September 2026
Jam: 19.00 WIB
Jumlah tamu: 6 orang
Area: Indoor
Keperluan: Makan keluarga
Catatan: Membawa satu anak kecil

Mohon konfirmasi ketersediaan meja.
```

## Arah Desain

### Design Read

Landing page restoran lokal untuk pelanggan mobile dengan tampilan yang menggugah selera, ramah keluarga, cepat digunakan, dan tidak terlihat seperti template pemesanan generik.

### Design Dials

- `DESIGN_VARIANCE: 7`
- `MOTION_INTENSITY: 4`
- `VISUAL_DENSITY: 5`

### Prinsip Visual

- Gunakan foto makanan asli sebagai elemen utama.
- Gunakan satu warna aksen utama yang berasal dari identitas restoran.
- Gunakan warna dasar off-white dan charcoal untuk menjaga keterbacaan.
- Gunakan font sans-serif ramah dan modern seperti Plus Jakarta Sans atau Outfit.
- Gunakan sistem radius konsisten, misalnya kartu 16px, input 12px, dan tombol berbentuk pill.
- Hindari terlalu banyak kartu dekoratif.
- Gunakan layout hero asimetris pada desktop dan satu kolom pada mobile.
- Navigasi desktop maksimal satu baris.
- Semua CTA harus memiliki kontras WCAG AA.
- Jangan menaruh teks panjang di atas foto tanpa lapisan kontras.

### Motion

Animasi digunakan untuk memberikan feedback, bukan sebagai dekorasi berlebihan.

- Transisi ringan saat kategori berubah.
- Feedback saat produk masuk ke keranjang.
- Perubahan angka pada sticky cart bar.
- Transisi bottom sheet atau modal detail menu.
- Feedback copy nomor rekening.
- Hormati `prefers-reduced-motion`.

## Perilaku Responsif

### Mobile, kurang dari 768px

- Semua layout menjadi satu kolom.
- Kategori dapat digeser secara horizontal.
- Sticky cart bar berada di bawah layar.
- Detail produk tampil sebagai halaman atau bottom sheet penuh.
- Form menggunakan input berukuran nyaman untuk sentuhan.
- CTA utama selalu mudah dijangkau.

### Tablet, 768px sampai 1023px

- Menu menggunakan dua kolom.
- Checkout dapat tetap satu kolom untuk keterbacaan.
- Hero menggunakan komposisi yang lebih padat.

### Desktop, mulai 1024px

- Menu menggunakan dua atau tiga kolom sesuai ukuran konten.
- Checkout dapat menggunakan dua kolom: form dan ringkasan.
- Navigasi berada dalam satu baris dengan tinggi maksimal 80px.

## Arsitektur Frontend

Stack awal yang digunakan:

- React 19.
- TypeScript.
- Vite.
- React Router untuk navigasi.
- Context dan reducer untuk state keranjang.
- CSS Modules, native CSS, atau styling yang disepakati saat implementasi.
- `localStorage` untuk keranjang dan draft form.

Struktur folder yang disarankan:

```text
src/
├── assets/
│   ├── images/
│   └── icons/
├── components/
│   ├── forms/
│   ├── layout/
│   ├── menu/
│   └── ui/
├── data/
│   ├── menu.ts
│   ├── promotions.ts
│   └── restaurant.ts
├── features/
│   ├── cart/
│   ├── checkout/
│   └── reservation/
├── hooks/
├── lib/
│   ├── currency.ts
│   ├── local-storage.ts
│   ├── validation.ts
│   └── whatsapp.ts
├── pages/
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│   ├── HomePage.tsx
│   ├── MenuDetailPage.tsx
│   ├── MenuPage.tsx
│   └── ReservationPage.tsx
├── styles/
│   ├── globals.css
│   └── tokens.css
├── types/
│   ├── cart.ts
│   ├── dining-session.ts
│   ├── menu.ts
│   └── reservation.ts
├── App.tsx
└── main.tsx
```

## Model Data

### Menu

```ts
type MenuItem = {
  id: string
  slug: string
  name: string
  description: string
  categoryId: string
  basePrice: number
  image: string
  available: boolean
  featured?: boolean
  spicy?: boolean
  variants?: MenuVariantGroup[]
}
```

### Keranjang

```ts
type CartItem = {
  id: string
  menuItemId: string
  name: string
  quantity: number
  unitPrice: number
  selectedVariants: SelectedVariant[]
  note?: string
}
```

### Sesi Meja

```ts
type DiningSession = {
  orderType: 'dine-in' | 'pickup'
  tableNumber?: string
  tableSource?: 'qr' | 'manual'
  confirmed: boolean
}
```

Nomor meja disimpan di `sessionStorage`, bukan `localStorage`, untuk mengurangi risiko nomor meja lama terbawa ke kunjungan berikutnya.

### Reservasi

```ts
type ReservationDraft = {
  customerName: string
  whatsappNumber: string
  date: string
  time: string
  guestCount: number
  seatingArea?: string
  occasion?: string
  note?: string
}
```

## Komponen Utama

### Layout

- `SiteHeader`
- `MobileNavigation`
- `SiteFooter`
- `PageContainer`
- `WhatsAppButton`

### Landing Page

- `HeroSection`
- `FeaturedMenuSection`
- `PromotionSection`
- `AboutSection`
- `GallerySection`
- `TestimonialsSection`
- `LocationSection`

### Menu dan Pesanan

- `OutletHeader`
- `OpenStatus`
- `TableContextBanner`
- `TableNumberInput`
- `TableConfirmation`
- `MenuSearch`
- `CategoryTabs`
- `MenuGrid`
- `MenuCard`
- `MenuDetail`
- `VariantSelector`
- `QuantitySelector`
- `StickyCartBar`
- `CartItemRow`
- `OrderSummary`

### Checkout dan Reservasi

- `CustomerForm`
- `OrderTypeSelector`
- `PaymentMethodSelector`
- `BankTransferInstructions`
- `ReservationForm`
- `ConfirmationNotice`

## State yang Wajib Ditangani

### Menu

- Loading.
- Produk tersedia.
- Hasil pencarian kosong.
- Kategori kosong.
- Produk habis.
- Data gagal dimuat.

### Keranjang

- Keranjang kosong.
- Keranjang berisi produk.
- Produk yang tersimpan sudah tidak tersedia.
- Harga produk berubah pada data lokal versi baru.

### Nomor Meja

- QR berisi nomor meja yang valid.
- QR tidak memiliki parameter meja.
- Nomor meja tidak dikenali.
- Nomor meja dimasukkan manual.
- Nomor meja diganti oleh pelanggan.
- Pesanan makan di tempat belum memiliki nomor meja.
- Pesanan ambil sendiri tidak membutuhkan nomor meja.

### Form

- Kondisi awal.
- Field sedang diisi.
- Validasi gagal.
- Data valid dan siap dikirim.
- WhatsApp gagal dibuka.
- Permintaan sudah diarahkan ke WhatsApp.

## Tahapan Implementasi

### Fase 1: Persiapan dan Design System

- Mengumpulkan logo, warna, foto, konten, dan data restoran.
- Menentukan token warna, tipografi, spacing, radius, dan shadow.
- Menentukan struktur routing.
- Membuat tipe data menu, keranjang, dan reservasi.
- Menentukan daftar atau rentang nomor meja yang valid.
- Menentukan format URL untuk QR setiap meja.
- Membuat data dummy yang mudah diganti dengan data asli.

Output:

- Fondasi proyek.
- Design tokens.
- Routing.
- Struktur data.
- Komponen UI dasar.

### Fase 2: Landing Page

- Membuat navbar dan footer.
- Membuat hero.
- Membuat bagian menu unggulan dan promo.
- Membuat bagian tentang, galeri, testimoni, serta lokasi.
- Menghubungkan CTA ke menu dan reservasi.

Output:

- Landing page lengkap dan responsif.

### Fase 3: Katalog Menu

- Membuat header outlet.
- Membaca parameter nomor meja dari URL QR.
- Membuat validasi, konfirmasi, dan input manual nomor meja.
- Menyimpan konteks meja selama sesi browser.
- Membuat pencarian dan filter kategori.
- Membuat daftar serta detail menu.
- Membuat pilihan varian, jumlah, dan catatan.
- Menangani status tersedia dan habis.

Output:

- Katalog menu interaktif.

### Fase 4: Keranjang dan Checkout

- Membuat cart state dan persistensi `localStorage`.
- Membuat sticky cart bar.
- Membuat halaman keranjang.
- Membuat form checkout.
- Membuat pilihan cash dan transfer manual.
- Memastikan nomor meja muncul pada ringkasan checkout dan pesan WhatsApp.
- Membuat generator ringkasan WhatsApp.

Output:

- Alur pemesanan frontend dari menu hingga WhatsApp.

### Fase 5: Reservasi

- Membuat form reservasi.
- Membuat validasi tanggal, jam, jumlah tamu, dan nomor WhatsApp.
- Membuat ringkasan reservasi.
- Membuat generator pesan WhatsApp.

Output:

- Alur reservasi frontend hingga WhatsApp.

### Fase 6: QA dan Optimasi

- Menguji mobile, tablet, dan desktop.
- Menguji semua state dan validasi.
- Menguji tautan WhatsApp pada Android dan iOS.
- Menguji keyboard navigation.
- Memeriksa kontras, label form, alt text, dan focus state.
- Mengoptimalkan gambar.
- Menjalankan lint dan production build.
- Menjalankan audit Lighthouse.

Output:

- MVP siap dipublikasikan.

## Estimasi Waktu

Estimasi pengerjaan MVP adalah 7 sampai 9 hari kerja jika semua konten dan aset sudah tersedia. Penambahan waktu mencakup integrasi QR, validasi nomor meja, penyimpanan konteks sesi, dan pengujian setiap QR meja.

| Fase | Estimasi |
| --- | ---: |
| Persiapan dan design system | 1 hari |
| Landing page | 1 sampai 2 hari |
| Katalog menu dan QR meja | 2 sampai 3 hari |
| Keranjang dan checkout | 1 sampai 2 hari |
| Reservasi | 1 hari |
| QA dan optimasi | 1 hari |

Estimasi dapat berubah berdasarkan jumlah menu, jumlah varian, kesiapan foto, dan revisi visual.

## Kriteria Penerimaan MVP

- Semua route dapat dibuka secara langsung tanpa error.
- Website responsif mulai lebar 320px.
- Pengguna dapat mencari dan memfilter menu.
- Pengguna dapat membuka detail produk.
- Pengguna dapat memilih varian, jumlah, dan catatan.
- Pengguna dapat menambah, mengubah, dan menghapus isi keranjang.
- Keranjang tetap tersedia setelah halaman direfresh.
- Harga dan total dihitung dengan benar.
- Checkout cash dan transfer manual memiliki instruksi yang jelas.
- Ringkasan WhatsApp sesuai dengan isi keranjang.
- Setiap QR meja membuka menu dengan nomor meja yang benar.
- Nomor meja dari QR divalidasi dan ditampilkan kepada pelanggan.
- Pelanggan dapat memasukkan atau mengubah nomor meja secara manual.
- Checkout makan di tempat tidak dapat dilanjutkan tanpa nomor meja yang valid.
- Nomor meja ikut tercantum dalam ringkasan checkout dan pesan WhatsApp.
- Pesanan ambil sendiri tidak mewajibkan nomor meja.
- Nomor meja tidak terbawa setelah sesi browser berakhir.
- Form reservasi menolak tanggal lampau dan data wajib yang kosong.
- Ringkasan reservasi sesuai dengan data form.
- Website menjelaskan bahwa pesanan dan reservasi menunggu konfirmasi restoran.
- Semua komponen interaktif dapat digunakan dengan keyboard.
- Semua gambar memiliki ukuran yang disediakan untuk mencegah layout shift.
- Tidak ada error TypeScript, lint, atau production build.
- Tidak ada data pembayaran sensitif yang disimpan di browser.

## Data dan Aset yang Dibutuhkan

Sebelum implementasi final, siapkan:

- Logo Restoran Rahmawati.
- Warna atau panduan identitas merek.
- Foto hero.
- Foto setiap menu.
- Foto interior dan eksterior restoran.
- Daftar kategori menu.
- Nama, deskripsi, harga, dan varian setiap menu.
- Informasi menu unggulan dan promo.
- Nomor WhatsApp restoran.
- Nama bank, nomor rekening, dan nama pemilik rekening.
- Alamat lengkap.
- Tautan Google Maps.
- Jam operasional.
- Jumlah meja dan daftar nomor meja yang valid.
- Format penamaan meja jika menggunakan area, misalnya `A12` atau `Outdoor-04`.
- URL publik yang akan digunakan untuk membuat QR.
- Desain cetak QR dan penempatan pada setiap meja.
- Kapasitas atau pilihan area meja.
- Aturan reservasi.
- Testimoni pelanggan yang telah mendapat izin.
- Tautan media sosial.

## Pengembangan Tahap Berikutnya

Setelah MVP berjalan dan kebutuhan operasional meningkat, website dapat dikembangkan dengan:

- Backend dan database.
- Dashboard pengelolaan menu.
- Status pesanan realtime.
- Pengaturan slot reservasi.
- Payment gateway.
- Upload bukti transfer.
- Pesanan delivery dan ongkir otomatis.
- Akun pelanggan dan riwayat pesanan.
- Promo dengan kode voucher.
- Integrasi printer kasir atau POS.
- Analitik konversi pemesanan dan reservasi.

## Definition of Done

MVP dianggap selesai ketika landing page, katalog menu, detail menu, keranjang, checkout, dan reservasi dapat digunakan secara responsif; QR setiap meja mengisi nomor meja yang benar; pelanggan dapat memasukkan nomor meja secara manual; pesanan serta reservasi menghasilkan ringkasan WhatsApp yang benar; seluruh validasi utama berjalan; dan proyek lolos lint serta production build.
