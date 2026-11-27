// Modul untuk membaca input dari terminal
import { createInterface } from "node:readline/promises";

// Tipe data untuk satu menu yang dijual di kantin
interface MenuKantin {
  id: number;         // ID unik menu
  nama: string;       // nama menu
  kategori: string;   // kategori: Makanan / Minuman / Snack
  harga: number;      // harga satuan (rupiah)
  stok: number;       // jumlah stok
  tersedia: boolean;  // true jika menu masih dijual
}

// Data awal disimpan di array (let karena nanti bisa berubah saat Create/Delete)
let dataMenu: MenuKantin[] = [
  { id: 1, nama: "Nasi Goreng", kategori: "Makanan", harga: 15000, stok: 20, tersedia: true },
  { id: 2, nama: "Mie Ayam", kategori: "Makanan", harga: 12000, stok: 15, tersedia: true },
  { id: 3, nama: "Es Teh", kategori: "Minuman", harga: 5000, stok: 30, tersedia: true },
  { id: 4, nama: "Kopi Susu", kategori: "Minuman", harga: 10000, stok: 0, tersedia: false },
  { id: 5, nama: "Roti Bakar", kategori: "Snack", harga: 8000, stok: 10, tersedia: true },
];

// Garis pemisah tampilan (const karena nilainya tetap)
const GARIS: string = "-".repeat(44);

// FUNGSI 1: dengan parameter, mengembalikan nilai hitung (number)
// Menghitung nilai stok satu menu = harga x stok
function hitungNilaiStok(menu: MenuKantin): number {
  return menu.harga * menu.stok; // operator aritmatika perkalian
}

// FUNGSI 2: dengan parameter, mengembalikan boolean
// Mengecek apakah pilihan menu valid (angka bulat 0 sampai 5)
function pilihanValid(input: string): boolean {
  const angka: number = Number(input); // ubah teks jadi angka

  // Input kosong atau bukan angka -> tidak valid
  if (input.trim() === "" || isNaN(angka)) {
    return false;
  }

  // Harus bilangan bulat dan berada di rentang 0-5 (operator logika &&)
  return Number.isInteger(angka) && angka >= 0 && angka <= 5;
}

// FUNGSI 3: tanpa parameter, tanpa return (void)
// Menampilkan pilihan menu utama
function tampilkanMenuUtama(): void {
  console.log("\n" + GARIS);
  console.log("MENU UTAMA - KASIR KANTIN");
  console.log(GARIS);
  console.log("1. Tampilkan semua menu");
  console.log("2. Tambah menu  (Progress 3)");
  console.log("3. Ubah menu    (Progress 5)");
  console.log("4. Hapus menu   (Progress 5)");
  console.log("5. Cari menu    (Progress 6)");
  console.log("0. Keluar");
}

// FUNGSI 4: dengan parameter, tanpa return (void)
// Menampilkan semua menu beserta ringkasannya
function tampilkanSemuaData(daftar: MenuKantin[]): void {
  console.log(GARIS);
  console.log("DAFTAR MENU KANTIN");
  console.log(GARIS);

  // Jika data kosong, tampilkan pesan lalu berhenti
  if (daftar.length === 0) {
    console.log("Belum ada data menu.");
    return;
  }

  let jumlahTersedia: number = 0;
  let jumlahHarga: number = 0;
  let totalNilaiStok: number = 0;

  // Perulangan for: tampilkan tiap menu
  for (let i = 0; i < daftar.length; i++) {
    const menu: MenuKantin = daftar[i];

    // Tentukan status menu (if dengan dua kondisi)
    let status: string;
    if (menu.tersedia && menu.stok > 0) {
      status = "Tersedia";
    } else {
      status = "Habis";
    }

    console.log(`${menu.id}. ${menu.nama} (${menu.kategori})`);
    console.log(`   Harga: Rp${menu.harga} | Stok: ${menu.stok} | ${status}`);

    // Operator modulus: beri garis putus pada baris genap
    if (i % 2 === 0) {
      console.log("- ".repeat(22));
    } else {
      console.log(GARIS);
    }
  }

  // Perulangan for...of: hitung data untuk ringkasan
  for (const menu of daftar) {
    if (menu.tersedia === true && menu.stok > 0) {
      jumlahTersedia++;
    }
    jumlahHarga += menu.harga;                // operator compound +=
    totalNilaiStok += hitungNilaiStok(menu);  // operator compound +=
  }

  const jumlahHabis: number = daftar.length - jumlahTersedia; // pengurangan
  const rataRataHarga: number = jumlahHarga / daftar.length;  // pembagian

  console.log(`Total menu       : ${daftar.length}`);
  console.log(`Menu tersedia    : ${jumlahTersedia}`);
  console.log(`Menu habis       : ${jumlahHabis}`);
  console.log(`Rata-rata harga  : Rp${rataRataHarga}`);
  console.log(`Total nilai stok : Rp${totalNilaiStok}`);
}

// Menu utama: berulang sampai pengguna memilih keluar
async function jalankanMenu(): Promise<void> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  let berjalan: boolean = true; // penanda perulangan menu

  // Perulangan while: menu terus tampil sampai pilih 0
  while (berjalan) {
    tampilkanMenuUtama();
    const input: string = await rl.question("Pilih menu (0-5): ");

    // Input tidak valid -> beri pesan lalu ulangi menu
    if (!pilihanValid(input)) {
      console.log("Input tidak valid! Masukkan angka 0 sampai 5.");
      continue;
    }

    // Switch untuk menjalankan menu yang dipilih
    switch (Number(input)) {
      case 1:
        tampilkanSemuaData(dataMenu);
        break;
      case 2:
      case 3:
      case 4:
      case 5:
        // Fitur dikerjakan pada progress berikutnya
        console.log("Fitur ini belum tersedia, akan dibuat di progress berikutnya.");
        break;
      case 0:
        console.log("Terima kasih, program selesai.");
        berjalan = false; // hentikan perulangan
        break;
      default:
        console.log("Pilihan tidak dikenal.");
        break;
    }
  }

  rl.close(); // tutup pembaca input
}

// Jalankan program
jalankanMenu();
