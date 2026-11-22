# VOKASIR
## Anggota Tim

| No | Nama | NIM | Akun GitHub |
|----|------|-----|-------------|
| 1 | Dhia Mirza Handhiono | 2631407001111043 | [@dhiamirza27-arch](https://github.com/dhiamirza27-arch) |
| 2 | Melviano Putra Anugrah | 2631407001111051 | [@Epin21](https://github.com/Epin21) |
| 3 | Ahmad Faris Abdurrasyid | 2631407001111055 | [@raysheet](https://github.com/raysheet) |

## Pembagian Tugas dan Kontribusi

| Nama | Akun GitHub | Fitur / Bagian Kode yang Dikerjakan | Link Pull Request Utama |
|------|-------------|---------------------------------------|---------------------------|
| Dhia Mirza Handhiono | @dhiamirza27-arch | Menu utama Vokasir (loop & navigasi switch), fitur READ (daftar semua menu & detail menu by ID beserta harga setelah pajak), flowchart (Bab II) | (menyusul) |
| Melviano Putra Anugrah | @Epin21 | Setup repo, struktur data menu kantin (id, nama, kategori, harga, stok, status tersedia), data awal menu, fungsi validasi harga & stok, fitur CREATE (tambah menu baru), README & dokumentasi | (menyusul) |
| Ahmad Faris Abdurrasyid | @raysheet | Fungsi tampilan, fitur READ (semua data, detail per ID, ringkasan) dan fitur UPDATE | (menyusul) |

## 1.1 Deskripsi Masalah

| Komponen | Uraian Lengkap |
|---|---|
| **Latar Belakang Masalah** | Perkembangan teknologi informasi mendorong berbagai kegiatan usaha untuk memanfaatkan sistem digital guna meningkatkan efektivitas dan efisiensi operasional. Salah satu kegiatan yang membutuhkan pengelolaan secara terstruktur adalah proses transaksi penjualan. Pencatatan transaksi secara manual berpotensi menimbulkan kesalahan perhitungan, kehilangan data, serta memperlambat proses rekapitulasi penjualan. Oleh karena itu, dikembangkan aplikasi kasir **VOKASIR** sebagai solusi digital yang bertujuan untuk mempermudah proses transaksi, membantu pencatatan penjualan, serta meningkatkan ketepatan dan efisiensi dalam pengelolaan kegiatan usaha. |
| **Pengguna Sistem (User)** | Kasir |
| **Data Input** | - **Create:** ID barang, nama barang, stok, harga.<br>- **Update:** Nama barang, stok, harga.<br>- **Delete:** Data barang yang akan dihapus.<br>- **Search:** Nama/ID barang. |
| **Data Output** | Detail Belanja, meliputi nama barang, jumlah (qty), harga, promo atau diskon, total pembayaran, metode pembayaran, nominal uang yang dibayarkan, serta uang kembalian. |
| **Entitas Data & Properti** | - **ID Barang:** string (kode unik item).<br>- **Nama Barang:** string (nama item).<br>- **Harga:** number (nilai numerik).<br>- **Jumlah/Stok:** number (nilai numerik).<br>- **Tersedia/Aktif:** boolean (status ketersediaan). |


## 1.2 Decomposition (Dekomposisi Masalah)

Aplikasi VOKASIR dibagi menjadi beberapa bagian utama untuk mempermudah proses pengelolaan data dan transaksi penjualan, yaitu:

1. **Menu Utama:** Menampilkan halaman utama sebagai navigasi untuk mengakses fitur-fitur aplikasi.
2. **Create (Tambah Data):** Digunakan untuk menambahkan data barang baru ke dalam sistem, seperti nama barang dan harga.
3. **Read (Lihat Data):** Digunakan untuk menampilkan daftar barang serta melihat informasi detail barang yang tersedia.
4. **Update (Ubah Data):** Digunakan untuk memperbarui informasi barang apabila terdapat perubahan nama atau harga.
5. **Delete (Hapus Data):** Digunakan untuk menghapus data barang yang sudah tidak diperlukan.
6. **Search (Pencarian):** Digunakan untuk mencari barang berdasarkan nama atau informasi tertentu agar lebih mudah ditemukan.
7. **Transaksi Penjualan:** Digunakan untuk memilih barang, menentukan jumlah pembelian, menerapkan promo, dan menghitung total pembayaran.
8. **Pembayaran:** Digunakan untuk menentukan metode pembayaran, memasukkan nominal pembayaran, serta menghitung uang kembalian.
9. **Detail Belanja:** Menampilkan rincian transaksi yang meliputi nama barang, jumlah (qty), harga, promo, total bayar, metode pembayaran, nominal bayar, dan kembalian.

---

## 1.3 Pattern Recognition (Pengenalan Pola)

Dalam perancangan aplikasi VOKASIR, terdapat beberapa pola berulang yang ditemukan dalam proses pengelolaan data dan transaksi penjualan, yaitu:

1. Setiap data barang memiliki struktur informasi yang sama, seperti nama barang dan harga.
2. Proses pengelolaan barang memiliki pola yang sama, yaitu menambahkan, menampilkan, mengubah, dan menghapus data.
3. Setiap transaksi memiliki proses pemilihan barang dan penentuan jumlah barang yang dibeli.
4. Perhitungan total pembayaran dilakukan berdasarkan harga dan jumlah barang yang dipilih.
5. Setiap transaksi memiliki proses pembayaran yang mencakup pemilihan metode pembayaran dan pemasukan nominal uang.
6. Setiap transaksi menghasilkan rincian belanja yang menampilkan informasi barang hingga hasil pembayaran.

---

## 1.4 Abstraction (Abstraksi)

Dalam aplikasi VOKASIR, informasi yang digunakan difokuskan pada data yang berhubungan langsung dengan pengelolaan barang dan proses transaksi penjualan.

| Informasi yang Relevan | Informasi yang Tidak Relevan |
|---|---|
| Nama barang. | Warna kemasan barang. |
| Harga barang. | Bentuk fisik kemasan. |
| Jumlah barang (qty). | Desain atau tampilan merek barang. |
| Promo atau diskon. | Preferensi pribadi pembeli. |
| Total pembayaran. | Aktivitas pembeli di luar transaksi. |
| Metode pembayaran. | Informasi lain yang tidak berhubungan dengan proses penjualan. |
| Nominal pembayaran. | - |
| Uang kembalian. | - |

Dengan demikian, sistem hanya berfokus pada informasi yang diperlukan untuk mendukung pengelolaan data barang dan kelancaran transaksi penjualan.

---

## 1.5 Algorithmic Thinking (Berpikir Algoritmik)

Berikut merupakan urutan langkah kerja aplikasi VOKASIR dalam menjalankan proses pengelolaan data dan transaksi penjualan:

1. Mulai.
2. Sistem menampilkan menu utama aplikasi VOKASIR.
3. Pengguna memilih menu yang ingin dijalankan.
4. Jika pengguna memilih menu pengelolaan barang, sistem menampilkan daftar data barang.
5. Pengguna dapat memilih tindakan Create, Read, Update, Delete, atau Search sesuai kebutuhan.
6. Jika memilih Create, pengguna memasukkan data barang baru, kemudian sistem menyimpan data tersebut.
7. Jika memilih Read, sistem menampilkan informasi barang yang tersimpan.
8. Jika memilih Update, pengguna memilih barang dan mengubah informasi yang diperlukan, kemudian sistem memperbarui data.
9. Jika memilih Delete, pengguna memilih data barang yang ingin dihapus, kemudian sistem menghapus data tersebut.
10. Jika memilih Search, pengguna memasukkan kata kunci dan sistem menampilkan barang yang sesuai.
11. Jika pengguna memilih menu transaksi, sistem menampilkan daftar barang yang tersedia.
12. Pengguna memilih barang dan memasukkan jumlah barang (qty) yang ingin dibeli.
13. Sistem mengambil informasi harga barang dan menghitung subtotal pembelian.
14. Sistem memeriksa apakah terdapat promo atau diskon yang dapat digunakan.
15. Sistem menghitung total pembayaran setelah promo diterapkan.
16. Sistem menampilkan detail belanja yang meliputi barang, qty, harga, promo, dan total bayar.
17. Pengguna memilih metode pembayaran dan memasukkan nominal pembayaran.
18. Sistem memeriksa apakah nominal pembayaran mencukupi.
19. Jika nominal pembayaran mencukupi, sistem menghitung uang kembalian. Jika tidak mencukupi, pengguna diminta memasukkan nominal pembayaran kembali.
20. Sistem menyimpan transaksi dan menampilkan detail pembayaran.
21. Selesai.
