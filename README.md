# Website Company Profile — PT Indonesia Development Inspire (IDI)

Website resmi company profile **PT Indonesia Development Inspire**: lembaga pengembangan sumber daya manusia, bisnis, teknologi, dan kreativitas di Bantul, Yogyakarta.

> *Membangun Negeri dengan Inovasi.*

## Fitur

- Satu halaman (single page) dengan **topbar kontak, hero slider 3 slide (otomatis + panah/tombol), Tentang, Visi & Misi, Divisi (kartu layanan), Jadwal Pelatihan, Ruang Kami (galeri), Struktur Manajemen, Kontak, footer 3 kolom**, serta **tombol WhatsApp mengambang**.
- **Jadwal pelatihan mudah diedit** tanpa menyentuh HTML: cukup ubah `assets/js/jadwal.js` (panduan di [TUTORIAL.md](TUTORIAL.md)). Jika kosong, halaman menampilkan pesan "Belum ada jadwal terbaru" — tanpa data fiktif.
- Desain editorial *ink-on-paper* dengan aksen perunggu yang diambil dari logo resmi — bukan template generik.
- 5 divisi (Training Center, Web & Technology, Business Consulting, Creative Studio, Digital Marketing) disajikan sebagai kartu layanan berfoto ala situs lembaga pelatihan profesional.
- Kontak siap pakai: tombol WhatsApp, email, telepon, dan Google Maps.
- **Mobile-first**, responsif dari 360px hingga layar lebar.
- Aksesibilitas: landmark HTML, skip link, fokus keyboard terlihat, kontras lolos WCAG AA, dukungan *reduced motion*.
- Performa: tanpa framework, tanpa font/CDN eksternal, gambar sudah dioptimasi (total ±1,8 MB).

## Menjalankan Lokal

Cara tercepat — buka `index.html` di browser.  
Cara disarankan (server lokal):

```bash
python3 -m http.server 8080
# lalu buka http://127.0.0.1:8080
```

Panduan lengkap (termasuk upload ke production): **[TUTORIAL.md](TUTORIAL.md)**.

## Struktur Proyek

```
.
├── index.html          # seluruh konten halaman
├── assets/
│   ├── css/styles.css  # design system (token warna, tipografi, layout)
│   ├── js/main.js      # menu mobile, penanda section aktif, reveal on scroll
│   └── img/            # logo, foto galeri, bagan struktur (sudah dikompres)
├── README.md
└── TUTORIAL.md
```

> Folder `data/` (file sumber .docx & foto original) dan `UI_Design_Intelligence_Pack/` (dokumen proses desain) sengaja **tidak ikut di-commit** — keduanya hanya materi kerja, bukan bagian website.

## Teknologi

HTML, CSS, dan JavaScript murni. Tanpa framework, tanpa proses build, tanpa dependensi. Cocok untuk hosting apa pun: GitHub Pages, Netlify, Vercel, atau shared hosting (cPanel).

## Sumber Konten

Seluruh teks, visi/misi, data divisi, dan kontak berasal dari dokumen resmi perusahaan. Foto yang tampil saat ini masih foto stok pengganti dan direncanakan diganti dengan dokumentasi kegiatan asli.

## Lisensi

Konten, teks, dan aset adalah milik PT Indonesia Development Inspire.
