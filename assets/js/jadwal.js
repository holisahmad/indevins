/* =============================================================================
   JADWAL PELATIHAN PT INDONESIA DEVELOPMENT INSPIRE
   -----------------------------------------------------------------------------
   File INI SATU-SATUNYA tempat mengubah jadwal di website. Ikuti langkahnya:

   1. Salin satu blok { ... } di bawah sebagai template.
   2. Isi data training sesuai kebutuhan, misal:
      training A di kota B pada waktu C.
   3. Simpan file, lalu refresh website (Cmd/Ctrl + Shift + R untuk hard refresh).

   PENJELASAN TIAP FIELD (semua wajib kecuali catatan):
   ---------------------------------------------------------------------------
   nama        : Nama kegiatan, contoh "Pelatihan Digital Marketing"
   kota        : Kota penyelenggaraan, contoh "Yogyakarta" / "Online (Zoom)"
   tanggal     : Tanggal mulai dalam format YYYY-MM-DD (dipakai untuk urutan)
   tanggalTampil: Tanggal yang tampil ke pengunjung, bebas tulis,
                  contoh "12–14 November 2026" atau "Setiap Sabtu, mulai 3 Jan 2027"
   status      : "daftar"  = pendaftaran dibuka (muncul tombol Daftar)
                 "penuh"   = kuota penuh (muncul label, tanpa tombol daftar)
   catatan     : (opsional) keterangan singkat, misal "Early bird sampai 1 Nov"
                 Tulis "" jika tidak perlu.

   CATATAN PENTING:
   - Urutan otomatis mengikuti field "tanggal" (terbaru di atas).
   - Jika daftar dikosongkan ([]), website menampilkan pesan
     "Belum ada jadwal terbaru" — bukan error.
   - Perubahan tampil di website setelah file ini di-commit & di-push ke GitHub
     (GitHub Pages membangun ulang otomatis ±1 menit). Lihat TUTORIAL.md.
   ========================================================================== */

window.IDI_JADWAL = [
  /* ==== TEMPLATE — salin, ubah isinya, hapus tanda komentar ====

  {
    nama: "Pelatihan Digital Marketing",
    kota: "Yogyakarta",
    tanggal: "2026-12-10",
    tanggalTampil: "10–12 Desember 2026",
    status: "daftar",
    catatan: "Early bird sampai 1 Desember"
  },
  {
    nama: "Workshop AI untuk Bisnis",
    kota: "Bantul",
    tanggal: "2027-01-15",
    tanggalTampil: "15 Januari 2027",
    status: "daftar",
    catatan: ""
  }

  ==== akhir template ==== */
];
