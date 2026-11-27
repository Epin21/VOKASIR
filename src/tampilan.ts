// Fungsi menampilkan detail satu barang berdasarkan ID
export function tampilDetailBarang(id: number): boolean {
    // Cari barang yang ID-nya cocok dengan find
    const barang: Barang | undefined = daftarBarang.find((b: Barang) => b.id === id);

    // Jika tidak ditemukan, beri pesan dan kembalikan false
    if (barang === undefined) {
        console.log(` Barang dengan ID ${id} tidak ditemukan.`);
        return false;
    }

    // Status tersedia jika barang aktif DAN stok masih ada
    const status: string = barang.tersedia && barang.stok > 0 ? "Tersedia" : "Habis";
    const hargaFormat: string = "Rp " + barang.harga.toLocaleString("id-ID");

    console.log(`\n DETAIL BARANG ID ${barang.id}`);
    console.log(` Nama     : ${barang.nama}`);
    console.log(` Kategori : ${barang.kategori}`);
    console.log(` Harga    : ${hargaFormat}`);
    console.log(` Stok     : ${barang.stok}`);
    console.log(` Status   : ${status}`);
    return true;
}

// Fungsi menampilkan ringkasan data barang
export function tampilRingkasan(): void {
    let jumlahHabis: number = 0;
    let totalNilaiStok: number = 0;
    let jumlahHarga: number = 0;

    // Hitung data ringkasan dengan perulangan for...of
    for (const b of daftarBarang) {
        if (!b.tersedia || b.stok === 0) {
            jumlahHabis++;
        }
        jumlahHarga += b.harga;
        totalNilaiStok += b.harga * b.stok;
    }

    const jumlahTersedia: number = daftarBarang.length - jumlahHabis;
    // Hindari pembagian dengan nol jika data kosong
    const rataRataHarga: number = daftarBarang.length > 0 ? jumlahHarga / daftarBarang.length : 0;

    console.log("\n RINGKASAN BARANG");
    console.log(` Total barang     : ${daftarBarang.length}`);
    console.log(` Barang tersedia  : ${jumlahTersedia}`);
    console.log(` Barang habis     : ${jumlahHabis}`);
    console.log(` Rata-rata harga  : Rp ${rataRataHarga.toLocaleString("id-ID")}`);
    console.log(` Total nilai stok : Rp ${totalNilaiStok.toLocaleString("id-ID")}`);
}
