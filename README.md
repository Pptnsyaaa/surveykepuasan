# Project Pipit — Sistem Survei Kampus Cerdas & Deteksi Emosi Wajah AI

Platform evaluasi kepuasan berkelas enterprise yang dipersembahkan khusus untuk **Politeknik Baja Tegal**. Sistem ini menggabungkan pengenalan wajah berbasis kecerdasan buatan dengan analitik survei secara real-time untuk menghasilkan wawasan yang objektif dan actionable terhadap kualitas layanan akademik serta administrasi.

---

## 🌟 Ringkasan Eksekutif

Survei kepuasan konvensional sering kali mengalami bias respon dan kelelahan partisipan. **Project Pipit** mengatasi hal tersebut dengan mengintegrasikan **Deteksi Emosi Wajah AI** langsung ke dalam alur survei. Saat mahasiswa mengevaluasi layanan institusi seperti Administrasi Akademik, Kualitas Pengajaran, Fasilitas Perpustakaan, dan Infrastruktur TI, sistem menganalisis ekspresi wajah mereka secara real-time dalam kategori seperti `Happy`, `Surprised`, `Neutral`, `Sad`, dan `Angry` untuk memperkuat serta mengonfirmasi masukan yang diberikan.

### Sorotan Utama
- **Pemetaan Ekspresi Wajah Real-Time**: Ditenagai oleh jaringan saraf ringan TensorFlow melalui paket `@vladmandic/face-api` yang berjalan langsung di browser pengguna tanpa latensi server.
- **Governance Administratif Lengkap**: Panel kontrol dinamis yang memungkinkan administrator menambah, mengedit, mengkategorikan, dan mengurutkan ulang pertanyaan survei serta program studi tanpa perlu redeploy kode.
- **Dashboard Analitik Mendalam**: Suite visualisasi data beresolusi tinggi untuk menampilkan tren kepuasan berdasarkan waktu, perbandingan antar departemen, dan analitik responden secara rinci.
- **Arsitektur Tersedia Tinggi**: Dirancang dengan koneksi MySQL pooling yang terpusat dan strategi fallback otomatis untuk memastikan stabilitas tinggi di beban concurrent yang besar.

---

## 🏗️ Arsitektur Sistem & Stack Teknologi

```
+-------------------------------------------------------------------------+
|                              LAPISAN KLIEN                               |
|   React 18 + Vite | Tailwind CSS | Framer Motion | Chart.js / Canvas    |
|   Inferensi AI: @vladmandic/face-api (Client-side WebGL/WASM)          |
+-------------------------------------------------------------------------+
                                     │
                                     ▼ (REST API / JSON / Cloudflare Tunnel)
+-------------------------------------------------------------------------+
|                              LAPISAN SERVER                              |
|   Node.js + Express.js | Unified Connection Pooling | CORS & Route Guard |
+-------------------------------------------------------------------------+
                                     │
                                     ▼ (SQL Queries)
+-------------------------------------------------------------------------+
|                             LAPISAN BASIS DATA                           |
|   MySQL Relational Database (Surveys, Departments, Questions, Admins)   |
+-------------------------------------------------------------------------+
```

### Teknologi Inti
* **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Chart.js.
* **Artificial Intelligence**: `@vladmandic/face-api` (SSD Mobilenet V1, Face Landmark 68, Expression Recognition).
* **Backend API**: Node.js (ES Modules), Express.js v5, `mysql2/promise` (Unified Pool).
* **Jaringan & Tunneling**: Cloudflare Tunnel (`cloudflared`) untuk akses publik aman melalui HTTP/3 QUIC.

---

## 🚀 Fitur & Kapabilitas Utama

### 1. Alur Survei Berbasis AI (`/`)
* **Input Profil Mahasiswa Dinamis**: Selector program studi tersinkronisasi dengan data live dari basis data.
* **Panel Pertanyaan Interaktif**: Navigasi kartu yang halus dengan pelacakan progres dan UX yang intuitif.
* **Pencapture Emosi Kamera Langsung**: Mengevaluasi ekspresi mikro melalui webcam, memberikan konteks emosi objektif selain penilaian numerik (`1 - 5 Bintang`).
* **Ringkasan Analitik Instan**: Menampilkan recap respons segera setelah selesai sebelum pengiriman data ke basis data.

### 2. Dashboard Admin yang Lengkap (`/admin/dashboard`)
* **Ringkasan Eksekutif**: Indikator kinerja utama seperti Total Responden, Indeks Kepuasan Keseluruhan, dan Benchmark Layanan.
* **Manajemen Survei (`Kelola Survei`)**: Mendukung operasi CRUD lengkap untuk:
  * **Pertanyaan & Kategori**: Menambah, mengubah, atau menonaktifkan kriteria evaluasi.
  * **Program Studi (`Program Studi`)**: Menambah atau memperbarui program studi seperti `TI`, `TM`, `TO`, `TEI`, dan lain-lain yang langsung terefleksi di seluruh form mahasiswa.
* **Analisis Tren (`Tren Waktu`)**: Grafik time-series animasi yang menggambarkan pergerakan kepuasan dalam rentang tanggal tertentu.
* **Catatan Responden Detail (`Data Responden`)**: Jejak audit lengkap atas semua entri survei dengan pencarian cepat dan kemampuan ekspor.

---

## 🛠️ Panduan Memulai Cepat

### Prasyarat
* **Node.js** `v18.x` atau yang lebih baru
* **MySQL Server** `v8.x` (contoh: XAMPP, Laragon, atau MySQL standalone)

### 1. Inisialisasi Basis Data
1. Buat basis data MySQL bernama `db_survey_ai`.
2. Impor skema utama yang ada di `database/survey_ai.sql`:
   ```bash
   mysql -u root -p db_survey_ai < database/survey_ai.sql
   ```

### 2. Menyiapkan Server Backend
Buka direktori backend, install dependensi, lalu jalankan server API:
```bash
cd backend
npm install
npm run dev
```
> Server backend akan berjalan pada `http://localhost:5000` dengan koneksi pooling MySQL yang terpusat (`Pool Active`).

### 3. Menyiapkan Aplikasi Frontend
Buka terminal baru, masuk ke direktori frontend, install dependensi, lalu jalankan server pengembangan Vite:
```bash
cd frontend
npm install
npm run dev -- --host --port 5173
```
> Akses antarmuka survei lokal di `http://localhost:5173/` dan portal admin di `http://localhost:5173/admin/login`.

---

## 🌐 Tunneling Publik (Cloudflare Tunnel)

Untuk membuat aplikasi bisa diakses aman dari perangkat mobile eksternal atau jaringan lain tanpa perlu port forwarding:

```bash
cloudflared tunnel --url http://localhost:5173
```
* Cloudflare akan menghasilkan domain publik terenkripsi (contoh: `https://<unique-id>.trycloudflare.com`).
* Semua panggilan API (`/api/*` dan `/analyze`) secara otomatis diproxy melalui Vite built-in ke backend lokal Anda di `http://localhost:5000`.

---

## 📁 Struktur Direktori

```
projectpipit/
├── backend/
│   ├── controllers/
│   │   ├── notificationsController.js  # Logika notifikasi sistem
│   │   ├── settingsController.js       # CRUD pertanyaan & program studi dinamis
│   │   └── surveyController.js         # Pengiriman & agregasi survei
│   ├── routes/                         # Deklarasi rute Express API
│   ├── scripts/                        # Utility seeding & migrasi basis data
│   ├── db.js                           # MySQL connection pool terpusat
│   └── server.js                       # Entry point aplikasi utama
├── database/
│   └── survey_ai.sql                   # Skema basis data relasional utama
├── docs/                               # Dokumentasi sistem & log perubahan
└── frontend/
    ├── public/                         # Aset statis & bobot model AI
    └── src/
        ├── components/
        │   ├── dashboard/              # Widget & tabel analitik admin
        │   ├── survey/                 # Form evaluasi mahasiswa & panel kamera AI
        │   └── ui/                     # Komponen desain reusable & efek latar belakang
        ├── pages/                      # Tampilan route aplikasi
        │   ├── AboutSystem.jsx         # Gambaran metodologi platform
        │   ├── SurveyPage.jsx          # Pengalaman evaluasi mahasiswa utama
        │   └── admin/                  # Tampilan administratif aman
        ├── api.js                      # Konfigurasi endpoint API terpusat
        └── App.jsx                     # Pengatur routing & layout aplikasi
```

---

## 🔒 Keamanan & Praktik Terbaik
* **Unified Database Pooling**: Mencegah kebocoran koneksi dan menangani disconnect idle basis data secara otomatis.
* **Strict Route Guards**: Melindungi endpoint admin dari akses tanpa autentikasi melalui verifikasi rute yang reaktif.
* **Sanitized State Handling**: Pengecekan defensive programming penuh pada parsing JSON dinamis dan manipulasi DOM untuk menjamin rendering tanpa crash.

---
*Dibuat untuk Politeknik Baja Tegal — Memberdayakan Keunggulan Akademik melalui Teknologi Cerdas.*
