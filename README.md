# Website Restoran Rahmawati

Website Restoran Rahmawati adalah proyek frontend untuk memperkenalkan restoran, menampilkan menu, menerima pesanan, dan membantu pelanggan mengajukan reservasi meja.

Proyek menggunakan React, TypeScript, dan Vite. Versi MVP dibuat tanpa backend. Pesanan serta reservasi akan disusun oleh website lalu dikirim ke WhatsApp restoran untuk dikonfirmasi secara manual.

## Fitur Utama

- Landing page pemasaran restoran.
- Katalog menu dengan kategori dan pencarian.
- Detail menu, pilihan varian, jumlah, dan catatan.
- Pemesanan dari QR unik yang tersedia di setiap meja.
- Nomor meja terisi otomatis dari QR atau dapat dimasukkan manual.
- Keranjang belanja.
- Checkout dengan pembayaran cash atau transfer manual.
- Ringkasan pesanan yang dikirim ke WhatsApp.
- Form reservasi meja yang dikirim ke WhatsApp.
- Informasi lokasi, jam operasional, promo, dan kontak.
- Tampilan responsif untuk mobile, tablet, dan desktop.

## Struktur Halaman

| Halaman | Fungsi |
| --- | --- |
| `/` | Landing page, menu unggulan, promo, galeri, lokasi, dan informasi restoran |
| `/menu?table=:nomor` | Katalog, pencarian, kategori, pemilihan menu, dan identitas meja dari QR |
| `/menu/:slug` | Detail menu, varian, jumlah, dan catatan |
| `/cart` | Mengelola produk yang akan dipesan |
| `/checkout` | Data pelanggan, metode pembayaran, dan pengiriman pesanan ke WhatsApp |
| `/reservasi` | Form dan pengiriman permintaan reservasi meja |

## Alur Pemesanan

```text
Scan QR meja atau masukkan nomor meja
  -> Nomor meja dikonfirmasi
  -> Pilih menu
  -> Atur varian dan jumlah
  -> Masukkan ke keranjang
  -> Isi data checkout
  -> Pilih cash atau transfer manual
  -> Kirim ringkasan ke WhatsApp
  -> Menunggu konfirmasi restoran
```

## Alur Reservasi

```text
Pilih tanggal, jam, dan jumlah tamu
  -> Isi data pelanggan
  -> Periksa ringkasan
  -> Kirim ke WhatsApp
  -> Menunggu konfirmasi restoran
```

## Batasan MVP

Karena proyek masih frontend-only, website belum memiliki:

- Database atau dashboard admin.
- Ketersediaan menu dan meja secara realtime.
- Verifikasi pembayaran otomatis.
- Upload bukti transfer.
- Payment gateway.
- Pesanan delivery dan perhitungan ongkir otomatis.

Konfirmasi ketersediaan, pembayaran, pesanan, dan reservasi dilakukan oleh staf restoran melalui WhatsApp.

QR hanya membantu mengisi nomor meja. Karena belum ada backend, sistem belum dapat membuktikan bahwa pelanggan benar-benar berada di meja tersebut atau mencegah perubahan nomor meja melalui URL. Nomor meja akan selalu ditampilkan kembali pada checkout agar dapat diperiksa pelanggan.

## Tahapan Pengerjaan

1. Menyiapkan identitas visual, konten, foto, dan data menu.
2. Membuat fondasi proyek dan design system.
3. Membangun landing page.
4. Membangun katalog, detail menu, dan identifikasi meja melalui QR.
5. Membangun keranjang dan checkout.
6. Membangun form reservasi.
7. Melakukan pengujian responsif, aksesibilitas, dan production build.

Estimasi pengerjaan MVP adalah 7 sampai 9 hari kerja jika seluruh konten dan aset sudah tersedia. Estimasi ini sudah mencakup integrasi dan pengujian QR meja.

## Plan Lengkap

Penjelasan lengkap mengenai scope, arsitektur, komponen, model data, validasi, tahapan implementasi, kebutuhan aset, dan kriteria penerimaan tersedia di:

**[Baca Frontend Plan Lengkap](./FRONTEND_PLAN.md)**

## Menjalankan Proyek

```bash
npm install
npm run dev
```

Pemeriksaan sebelum publikasi:

```bash
npm run lint
npm run build
```
