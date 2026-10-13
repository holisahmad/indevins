# Tutorial — Menjalankan & Menerbitkan Website IDI

Panduan lengkap menjalankan website **PT Indonesia Development Inspire** di komputer dan menerbitkannya ke internet (production).

Website ini bersifat **statis** (HTML + CSS + JavaScript murni): tidak ada Node.js, tidak ada database, tidak ada proses build. Cukup sajikan file-file statis, maka website langsung jalan.

---

## Daftar Isi

1. [Prasyarat](#1-prasyarat)
2. [Menjalankan di Komputer (Local)](#2-menjalankan-di-komputer-local)
3. [Menerbitkan ke Internet (Production)](#3-menerbitkan-ke-internet-production)
4. [Mengubah Konten & Foto](#4-mengubah-konten--foto)
5. [Troubleshooting](#5-troubleshooting)
6. [Checklist Sebelum Publikasi](#6-checklist-sebelum-publikasi)

---

## 1. Prasyarat

- **Browser** (Chrome, Safari, Firefox, Edge) — untuk melihat website.
- **Editor teks** (disarankan VS Code) — untuk mengubah konten.
- **Git** — untuk push ke GitHub. Cek dengan `git --version`.
- *(Opsyal)* **Python 3** atau **Node.js** — untuk server lokal yang lebih akurat.

Struktur file yang harus ada di satu folder yang sama:

```
indevins/
├── index.html          ← halaman utama (satu file berisi semua section)
├── README.md
├── TUTORIAL.md
├── assets/
│   ├── css/styles.css  ← seluruh tampilan & warna
│   ├── js/main.js      ← menu mobile, animasi muncul, penanda section aktif
│   └── img/            ← logo, foto, bagan struktur (sudah dioptimasi)
└── data/               ← file sumber asli (docx & foto original) — tidak dibutuhkan website
```

---

## 2. Menjalankan di Komputer (Local)

### Cara A — Buka langsung (paling cepat)

1. Klik dua kali `index.html`.
2. Website terbuka di browser.
3. Catatan: untuk website ini semua file lokal (tidak ada fetch/API), jadi cara ini berfungsi penuh.

### Cara B — Server lokal (disarankan, paling mirip production)

**Dengan Python 3** (sudah terpasang di macOS):

```bash
cd /path/ke/indevins
python3 -m http.server 8080
```

Lalu buka **http://127.0.0.1:8080** di browser.

**Dengan Node.js** (alternatif):

```bash
npx serve .
```

**Dengan ekstensi VS Code:** pasang ekstensi "Live Server", klik kanan `index.html` → *Open with Live Server*.

Untuk berhenti server Python: tekan `Ctrl + C` di terminal.

### Uji tampilan di berbagai ukuran layar

Buka DevTools (`F12` atau `Cmd + Option + I`) → klik ikon perangkat mobile (tombol `Cmd + Shift + M`) → coba ukuran 390px (HP), 768px (tablet), dan lebar penuh (desktop). Layout dirancang menyesuaikan otomatis.

---

## 3. Menerbitkan ke Internet (Production)

### Opsi A — GitHub Pages (disarankan, gratis, cocok untuk repo ini)

Repo tujuan: `https://github.com/holisahmad/indevins.git`

**Langkah 1 — Push kode ke GitHub** (sekali saja):

```bash
cd /path/ke/indevins
git init -b main                      # inisialisasi repo (sekali saja)
git add .                             # tandai semua file
git commit -m "Company profile PT Indonesia Development Inspire"
git remote add origin https://github.com/holisahmad/indevins.git
git push -u origin main
```

Jika GitHub meminta autentikasi, gunakan Personal Access Token (bukan password) sebagai password, atau atur `gh auth login`.

**Langkah 2 — Aktifkan GitHub Pages:**

1. Buka halaman repo di GitHub: `https://github.com/holisahmad/indevins`.
2. Buka tab **Settings** → menu kiri **Pages**.
3. Pada bagian **Build and deployment**:
   - *Source:* **Deploy from a branch**
   - *Branch:* **main**
   - *Folder:* **/ (root)**
4. Klik **Save**.
5. Tunggu 1–2 menit, muncul notifikasi: `Your site is live at https://holisahmad.github.io/indevins/`.

**Langkah 3 — Update setelah ada perubahan:**

```bash
git add .
git commit -m "Perbarui konten"
git push
```

GitHub Pages akan membangun ulang otomatis (±1 menit).

### Opsi B — Hosting konvensional (cPanel / shared hosting)

1. Siapkan seluruh isi folder website (kecuali `data/` dan folder tersembunyi).
2. Login cPanel → **File Manager** → masuk ke `public_html`.
3. Upload `index.html` dan folder `assets/` ke `public_html`.
4. Pastikan `index.html` berada tepat di `public_html/index.html` (bukan di subfolder).
5. Buka domain Anda di browser; HTTPS biasanya otomatis aktif dari Let's Encrypt.

### Opsi C — Netlify / Vercel (tanpa terminal, drag & drop)

1. Buka **app.netlify.com/drop** (atau vercel.com).
2. Seret (drag & drop) **folder `indevins`** ke halaman tersebut.
3. Dalam hitungan detik Anda mendapat URL publik, mis. `https://indevins-site.netlify.app`.
4. *(Opsyal)* Hubungkan domain sendiri lewat menu *Domain management*.

> Untuk perubahan berikutnya di Netlify/Vercel: cukup seret folder yang sudah diperbarui lagi ke halaman yang sama, atau hubungkan ke repo GitHub agar update otomatis.

---

## 4. Mengubah Konten & Foto

### Teks

Seluruh teks berada di `index.html`. Peta section:

| Bagian di halaman | Kata kunci cari di `index.html` |
|---|---|
| Judul browser & SEO | `<title>` dan `<meta name="description">` di `<head>` |
| Hero (judul besar) | `id="hero-title"` |
| Tentang Kami | `id="tentang"` |
| Visi & Misi | `id="visi-misi"` (8 poin `<li>` pada `.misi-list`) |
| Divisi | `id="divisi"` (baris `.division-row`) |
| Foto / Ruang Kami | `id="ruang-kami"` |
| Struktur Manajemen | `id="struktur"` |
| Kontak (alamat, email, telepon) | `id="kontak"` |

Simpan file, lalu muat ulang browser (`Cmd + Shift + R` untuk hard refresh).

### Foto

Ganti file di `assets/img/` dengan **nama yang sama** agar otomatis tampil:

| File | Kegunaan | Rasio saran |
|---|---|---|
| `hero.jpg` | foto besar di hero | potret 3:4 |
| `g-pelatihan.jpg`, `g-konsultasi.jpg`, `g-presentasi.jpg`, `g-dokumentasi.jpg` | galeri (lanskap) | 3:2 |
| `g-teknologi.jpg`, `g-kreatif.jpg` | galeri (potret) | 2:3 |
| `struktur.jpg` | bagan struktur manajemen | potret A4 |
| `logo.png` | logo (transparan) | persegi |

Agar cepat dimuat, kompres dulu (maksimal ±1600px sisi terpanjang, JPEG kualitas ±75):

```bash
sips -s format jpeg -s formatOptions 75 -Z 1600 foto_asli.jpg --out assets/img/hero.jpg
```

### Warna & font

Semua warna, ukuran teks, dan jarak didefinisikan sebagai variabel di bagian atas `assets/css/styles.css` (blok `:root`), mis. `--color-ink`, `--color-accent`. Ubah nilai di sana untuk mengganti tampilan seluruh website secara konsisten.

---

## 5. Troubleshooting

| Gejala | Penyebab | Solusi |
|---|---|---|
| Foto tidak tampil | nama file salah / huruf besar-kecil | sesuaikan persis nama file di `assets/img/` |
| Tampilan berantakan setelah edit | CSS rusak (kurung `}` hilang) | periksa bagian terakhir yang diubah di `styles.css` |
| Perubahan tidak terlihat | cache browser | hard refresh: `Cmd + Shift + R` |
| Menu mobile tidak berfungsi | `main.js` gagal dimuat | pastikan `assets/js/main.js` ada & path benar |
| Setelah push, website lama terus tampil | cache/CDN GitHub Pages | tunggu ±2 menit, cek tab **Actions** repo |
| `git push` ditolak (403) | autentikasi belum diatur | gunakan Personal Access Token, atau `gh auth login` |

---

## 6. Checklist Sebelum Publikasi

- [ ] Foto stok diganti dengan dokumentasi asli IDI (bila tersedia).
- [ ] Nama & jabatan direksi diverifikasi (tercantum di `struktur.jpg`).
- [ ] Nomor telepon, email, dan alamat dicek ulang di section Kontak.
- [ ] Tautan WhatsApp (`wa.me/6281215400332`) dan Google Maps terbuka dengan benar.
- [ ] Dilihat di HP asli (ukuran kecil) dan desktop.
- [ ] Judul & deskripsi SEO di `<head>` sesuai keinginan.
