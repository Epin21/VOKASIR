// VOKASIR — Sistem Kasir Kantin
import * as readline from "readline";

// Struktur data barang / menu kantin
export interface Barang {
    readonly id: number;
    nama: string;
    kategori: string;
    harga: number;
    stok: number;
    tersedia: boolean;
}

// Struktur data item dalam keranjang belanja
export interface KeranjangItem {
    idBarang: number;
    namaBarang: string;
    harga: number;
    qty: number;
    subtotal: number;
}

// Struktur data riwayat transaksi pembayaran
export interface Transaksi {
    readonly idTransaksi: number;
    tanggal: string;
    items: KeranjangItem[];
    subtotalBelanja: number;
    promo: number;
    totalBayar: number;
    metodePembayaran: string;
    nominalBayar: number;
    kembalian: number;
}

// Array data awal barang kantin
export const daftarBarang: Barang[] = [
    { id: 1, nama: "Nasi Goreng", kategori: "Makanan", harga: 15000, stok: 20, tersedia: true },
    { id: 2, nama: "Mie Ayam", kategori: "Makanan", harga: 13000, stok: 15, tersedia: true },
    { id: 3, nama: "Es Teh Manis", kategori: "Minuman", harga: 5000, stok: 30, tersedia: true },
    { id: 4, nama: "Jus Jeruk", kategori: "Minuman", harga: 8000, stok: 0, tersedia: false },
    { id: 5, nama: "Risol Mayo", kategori: "Snack", harga: 5000, stok: 25, tersedia: true },
    { id: 6, nama: "Kentang Goreng", kategori: "Snack", harga: 10000, stok: 10, tersedia: true },
];

// Array keranjang belanja sementara untuk transaksi aktif
export let keranjang: KeranjangItem[] = [];

// Array riwayat seluruh transaksi yang telah selesai
export const riwayatTransaksi: Transaksi[] = [];

// Penomoran ID otomatis untuk barang dan transaksi baru
export let nextIdBarang: number = daftarBarang.length + 1;
export let nextIdTransaksi: number = 1;

// 3. FUNGSI-FUNGSI BERTIPE (VALIDASI, PROSES, & TAMPILAN)

// Fungsi validasi harga barang
export function validasiHarga(harga: number): boolean {
    if (harga > 0 && Number.isInteger(harga)) {
        return true;
    } else {
        return false;
    }
}

// Fungsi validasi stok barang
export function validasiStok(stok: number): boolean {
    if (stok >= 0 && Number.isInteger(stok)) {
        return true;
    } else {
        return false;
    }
}

// Fungsi menampilkan seluruh daftar barang
export function tampilDaftarBarang(): void {
    console.log("\n DAFTAR BARANG KANTIN\n");
    console.log(" ID  Nama              Kategori   Harga        Stok  Status");
    console.log(" --  ----              --------   -----        ----  ------");

    for (let i: number = 0; i < daftarBarang.length; i++) {
        const barang: Barang | undefined = daftarBarang[i];
        if (barang !== undefined) {
            const status: string = barang.tersedia ? "Ada" : "Habis";
            const hargaFormat: string = "Rp " + barang.harga.toLocaleString("id-ID");
            console.log(
                ` ${String(barang.id).padEnd(3)} ${barang.nama.padEnd(17)} ${barang.kategori.padEnd(10)} ${hargaFormat.padEnd(12)} ${String(barang.stok).padStart(4)}  ${status}`
            );
        }
    }
}

// Fungsi mencari barang berdasarkan kata kunci
export function cariBarang(kataKunci: string): boolean {
    let ditemukan: boolean = false;
    const keyword: string = kataKunci.toLowerCase();

    for (let i: number = 0; i < daftarBarang.length; i++) {
        const barang: Barang | undefined = daftarBarang[i];
        if (
            barang !== undefined &&
            (barang.nama.toLowerCase().includes(keyword) ||
                barang.kategori.toLowerCase().includes(keyword))
        ) {
            const hargaFormat: string = "Rp " + barang.harga.toLocaleString("id-ID");
            console.log(` [${barang.id}] ${barang.nama} (${barang.kategori}) - ${hargaFormat} | Stok: ${barang.stok}`);
            ditemukan = true;
        }
    }

    if (!ditemukan) {
        console.log(" Barang tidak ditemukan.");
    }

    return ditemukan;
}

// Fungsi menjumlahkan seluruh subtotal item di keranjang
export function hitungTotal(items: KeranjangItem[]): number {
    let total: number = 0;

    for (let i: number = 0; i < items.length; i++) {
        const item: KeranjangItem | undefined = items[i];
        if (item !== undefined) {
            total += item.subtotal;
        }
    }

    return total;
}

// Fungsi menghitung total bayar setelah dikurangi promo/diskon (%)
export function hitungTotalBayar(totalBelanja: number, persenPromo: number): number {
    if (persenPromo > 0 && persenPromo <= 100) {
        const potongan: number = totalBelanja * (persenPromo / 100);
        return totalBelanja - potongan;
    } else {
        return totalBelanja;
    }
}

// Fungsi menghitung uang kembalian pelanggan
export function hitungKembalian(nominalBayar: number, totalBayar: number): number {
    return nominalBayar - totalBayar;
}

// 4. UTILITAS INPUT TERMINAL (READLINE)

// Inisialisasi antarmuka readline untuk membaca input dari terminal
const rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Fungsi bantu untuk meminta input pengguna secara asynchronous
function tanya(pertanyaan: string): Promise<string> {
    return new Promise<string>((resolve) => {
        rl.question(pertanyaan, (jawaban: string) => {
            resolve(jawaban.trim());
        });
    });
}

// 5. KERANGKA FITUR & MENU UTAMA

// Fungsi menampilkan pilihan menu utama VOKASIR
function tampilMenu(): void {
    console.log("\n==============================");
    console.log("   VOKASIR - KASIR KANTIN");
    console.log("==============================");
    console.log(" 1. Kelola Barang");
    console.log(" 2. Transaksi");
    console.log(" 3. Keluar");
    console.log("------------------------------");
}

// Kerangka fungsi Kelola Barang
function kelolaBarang(): void {
    tampilDaftarBarang();
    console.log("\n[Info] Fitur Kelola Barang (Create, Read, Update, Delete, Search) akan diimplementasikan pada tahap berikutnya.");
}

// Kerangka fungsi Transaksi
function transaksi(): void {
    console.log("\n[Info] Fitur Transaksi & Pembayaran akan diimplementasikan pada tahap berikutnya.");
}

// Fungsi utama yang menjalankan perulangan menu sampai pengguna keluar
async function main(): Promise<void> {
    console.log("Selamat datang di VOKASIR - Sistem Kasir Kantin!");

    let berjalan: boolean = true;

    // Perulangan utama program selama status berjalan bernilai true
    while (berjalan) {
        tampilMenu();
        const pilihan: string = await tanya("Pilih menu [1-3]: ");

        // Seleksi kondisi pilihan menu utama
        switch (pilihan) {
            case "1": {
                kelolaBarang();
                break;
            }
            case "2": {
                transaksi();
                break;
            }
            case "3": {
                berjalan = false;
                console.log("\nTerima kasih telah menggunakan VOKASIR!");
                break;
            }
            default: {
                console.log("\nPilihan tidak valid. Silakan masukkan angka 1, 2, atau 3.");
                break;
            }
        }
    }

    // Menutup stream readline setelah program selesai
    rl.close();
}

// Menjalankan fungsi utama program
main();