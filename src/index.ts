// Modul untuk membaca input dari terminal
import { createInterface } from "node:readline/promises";
import { createInterface } from "node:readline/promises";

// ==========================================================
// BLOK 1: STRUKTUR DATA (interface)
// ==========================================================

// Tipe data untuk satu menu yang dijual di kantin
interface MenuKantin {
  id: number;         // number: ID unik menu
  nama: string;       // string: nama menu
  kategori: string;   // string: kategori menu (Makanan / Minuman / Snack)
  harga: number;      // number: harga satuan dalam rupiah
  stok: number;       // number: jumlah stok tersedia
  tersedia: boolean;  // boolean: true jika menu masih dijual
}

// ==========================================================
// BLOK 2: DATA AWAL (seed) - disimpan di memori dengan array
// ==========================================================

// Array data awal, memakai let karena isinya akan berubah (Create/Update/Delete)
let dataMenu: MenuKantin[] = [
  { id: 1, nama: "Nasi Goreng", kategori: "Makanan", harga: 15000, stok: 20, tersedia: true },
  { id: 2, nama: "Mie Ayam", kategori: "Makanan", harga: 12000, stok: 15, tersedia: true },
  { id: 3, nama: "Es Teh", kategori: "Minuman", harga: 5000, stok: 30, tersedia: true },
  { id: 4, nama: "Kopi Susu", kategori: "Minuman", harga: 10000, stok: 0, tersedia: false },
  { id: 5, nama: "Roti Bakar", kategori: "Snack", harga: 8000, stok: 10, tersedia: true },
];

// Konstanta garis pemisah agar tampilan rapi (const karena nilainya tetap)
const GARIS: string = "=".repeat(44);

// ==========================================================
// BLOK 3: FUNGSI-FUNGSI BERTIPE
// ==========================================================

// Fungsi dengan parameter dan MENGEMBALIKAN nilai hitung (number)
// Menghitung nilai stok satu menu (harga x stok)
function hitungNilaiStok(menu: MenuKantin): number {
  // Operator aritmatika perkalian
  return menu.harga * menu.stok;
}

// Fungsi dengan parameter dan MENGEMBALIKAN nilai hitung (number)
// Menghitung rata-rata harga seluruh menu
function hitungRataRataHarga(daftar: MenuKantin[]): number {
  // Jika data kosong, kembalikan 0 agar tidak terjadi pembagian dengan nol
  if (daftar.length === 0) {
    return 0;
  }

  let jumlahHarga: number = 0; // let karena nilainya terus bertambah

  // Perulangan for...of untuk menjumlahkan harga tiap menu
  for (const menu of daftar) {
    jumlahHarga += menu.harga; // operator compound +=
  }

  // Operator aritmatika pembagian
  return jumlahHarga / daftar.length;
}

// Fungsi dengan parameter dan MENGEMBALIKAN nilai boolean
// Memeriksa apakah input menu valid (angka bulat 0 sampai 6)
function pilihanValid(input: string): boolean {
  // Ubah teks menjadi angka
  const angka: number = Number(input);

  // Input kosong atau bukan angka dianggap tidak valid
  if (input.trim() === "" || isNaN(angka)) {
    return false;
  }
  // Operator logika (&&) dan perbandingan untuk cek bilangan bulat rentang 0-6
  return Number.isInteger(angka) && angka >= 0 && angka <= 6;
}

// Fungsi dengan parameter, TANPA return (void)
// Menampilkan satu menu ke layar
function tampilkanMenuKantin(menu: MenuKantin): void {
  // Seleksi kondisi if-else untuk menentukan teks status
  let status: string;
  if (menu.tersedia && menu.stok > 0) {
    status = "Tersedia";
  } else {
    status = "Habis";
  }

  console.log(`ID       : ${menu.id}`);
  console.log(`Nama     : ${menu.nama}`);
  console.log(`Kategori : ${menu.kategori}`);
  console.log(`Harga    : Rp${menu.harga}`);
  console.log(`Stok     : ${menu.stok} (${status})`);
}

// Fungsi dengan parameter, TANPA return (void)
// Menampilkan seluruh data menu
function tampilkanSemuaData(daftar: MenuKantin[]): void {
  console.log(GARIS);
  console.log("DAFTAR MENU KANTIN");
  console.log(GARIS);

  // Pesan khusus jika data masih kosong
  if (daftar.length === 0) {
    console.log("Belum ada data menu.");
    return;
  }

  // Perulangan for biasa untuk menampilkan tiap menu
  for (let i = 0; i < daftar.length; i++) {
    tampilkanMenuKantin(daftar[i]);

    // Operator modulus: baris genap memakai garis putus, baris ganjil garis strip
    if (i % 2 === 0) {
      console.log("- ".repeat(22));
    } else {
      console.log("-".repeat(44));
    }
  }
}

// Fungsi dengan parameter, TANPA return (void)
// Menampilkan ringkasan data menu
function tampilkanRingkasan(daftar: MenuKantin[]): void {
  let jumlahTersedia: number = 0;
  let totalNilaiStok: number = 0;

  // Perulangan forEach untuk menghitung menu tersedia dan nilai stok
  daftar.forEach((menu: MenuKantin) => {
    // Operator logika (&&) dan perbandingan: tersedia DAN stok lebih dari 0
    if (menu.tersedia === true && menu.stok > 0) {
      jumlahTersedia++;
    }
    totalNilaiStok += hitungNilaiStok(menu); // operator compound +=
  });

  // Operator aritmatika pengurangan
  const jumlahHabis: number = daftar.length - jumlahTersedia;

  console.log(GARIS);
  console.log("RINGKASAN MENU KANTIN");
  console.log(GARIS);
  console.log(`Total menu          : ${daftar.length}`);
  console.log(`Menu tersedia       : ${jumlahTersedia}`);
  console.log(`Menu habis          : ${jumlahHabis}`);
  console.log(`Rata-rata harga     : Rp${hitungRataRataHarga(daftar)}`);
  console.log(`Total nilai stok    : Rp${totalNilaiStok}`);
}

// Fungsi TANPA parameter dan TANPA return (void)
// Menampilkan daftar pilihan menu utama
function tampilkanMenuUtama(): void {
  console.log("\n" + GARIS);
  console.log("MENU UTAMA - KASIR KANTIN");
  console.log(GARIS);
  console.log("1. Tampilkan semua menu");
  console.log("2. Tampilkan ringkasan");
  console.log("3. Tambah menu     (Progress 3)");
  console.log("4. Ubah menu       (Progress 5)");
  console.log("5. Hapus menu      (Progress 5)");
  console.log("6. Cari menu       (Progress 6)");
  console.log("0. Keluar");
}

// ==========================================================
// BLOK 4: MENU UTAMA (perulangan sampai pengguna keluar)
// ==========================================================

async function jalankanMenu(): Promise<void> {
  // Membuat pembaca input dari terminal
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  let berjalan: boolean = true; // penanda loop, let karena akan berubah

  // Perulangan while: menu terus tampil sampai pengguna memilih keluar
  while (berjalan) {
    tampilkanMenuUtama();
    const input: string = await rl.question("Pilih menu (0-6): ");

    // Tangani input tidak valid, lalu ulangi menu
    if (!pilihanValid(input)) {
      console.log("Input tidak valid! Masukkan angka 0 sampai 6.");
      continue;
    }

    // Seleksi kondisi switch untuk menjalankan menu yang dipilih
    switch (Number(input)) {
      case 1:
        tampilkanSemuaData(dataMenu);
        break;
      case 2:
        tampilkanRingkasan(dataMenu);
        break;
      case 3:
      case 4:
      case 5:
      case 6:
        // Fitur ini dikerjakan pada progress berikutnya
        console.log("Fitur ini belum tersedia, akan dibuat di progress berikutnya.");
        break;
      case 0:
        console.log("Terima kasih, program kasir kantin selesai.");
        berjalan = false; // hentikan perulangan menu
        break;
      default:
        console.log("Pilihan tidak dikenal.");
        break;
    }
  }

  // Tutup pembaca input agar program benar benar berhenti
  rl.close();
}

// ==========================================================
// BLOK 5: TITIK MASUK PROGRAM
// ==========================================================
jalankanMenu();
