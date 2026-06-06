# 🌐 Panduan Penggunaan Cloudflare Tunnel (`cloudflared`)

Dokumen ini adalah panduan alternatif (dan **sangat direkomendasikan**) sebagai pengganti `ngrok`. 

Berbeda dengan `ngrok` versi gratis yang URL-nya akan selalu berubah-ubah setiap kali Anda mematikan laptop, **Cloudflare Tunnel** jauh lebih stabil, cepat, dan tidak memiliki batasan sesi yang ketat. Ini sangat cocok untuk menghubungkan *backend* (localhost) Anda ke aplikasi *frontend* yang sudah di-*deploy* di Vercel.

---

## 1. Kenapa Menggunakan Cloudflare Tunnel?
- **Tanpa Batas Waktu**: Tunnel tidak akan tiba-tiba mati sendiri (ngrok sering memutus koneksi jika idle).
- **Gratis Sepenuhnya**: Tidak ada limitasi koneksi HTTP/HTTPS.
- **Lebih Aman**: Routing langsung menggunakan infrastruktur Cloudflare.

---

## 2. Cara Instalasi `cloudflared` (Windows)

Jika Anda belum memiliki `cloudflared` di komputer Anda:
1. Unduh file `.exe` resminya dari GitHub Cloudflare: [Download cloudflared-windows-amd64.exe](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe)
2. Ganti nama file tersebut menjadi `cloudflared.exe`.
3. Pindahkan file tersebut ke folder yang mudah diakses (misalnya `C:\cloudflared\`).
4. Buka *Environment Variables* di Windows Anda, lalu tambahkan folder `C:\cloudflared\` ke dalam **PATH** agar Anda bisa mengetik perintah `cloudflared` dari terminal mana pun.

*(Atau jika Anda menggunakan package manager `winget` di Terminal/PowerShell):*
```bash
winget install --id Cloudflare.cloudflared
```

---

## 3. Cara Menjalankan Tunnel untuk Backend API

Pastikan server *backend* XAMPP/Node.js Anda sudah menyala di **Port 5000** (`npm start` di folder backend).

Buka Terminal/PowerShell baru, lalu jalankan perintah berikut:
```bash
cloudflared tunnel --url http://localhost:5000
```

**Output yang Diharapkan:**
Nantinya di terminal akan muncul banyak teks log. Carilah baris yang berisi URL acak dengan akhiran `.trycloudflare.com`.
Contoh:
```text
INF +------------------------------------------------------------+
INF |  Your quick Tunnel has been created! Visit it at (it may   |
INF |  require some time to be reachable):                       |
INF |  https://nama-acak-kucing-terbang.trycloudflare.com        |
INF +------------------------------------------------------------+
```

---

## 4. Menghubungkan ke Vercel (Frontend)

1. **Salin URL** yang berakhiran `.trycloudflare.com` dari terminal di atas.
2. Buka Dashboard Vercel Anda (https://vercel.com/dashboard)
3. Masuk ke proyek `survey_mahasiswa` -> **Settings** -> **Environment Variables**.
4. Edit (atau tambahkan) variabel `VITE_API_URL` dengan URL Cloudflare tadi.
   - **Key**: `VITE_API_URL`
   - **Value**: `https://nama-acak-kucing-terbang.trycloudflare.com`
5. Simpan (Save).
6. Pergi ke tab **Deployments** dan klik **Redeploy** agar Vercel membangun ulang website dengan URL API yang baru.

---

## 5. Jika Ingin Meng-Online-kan Frontend Secara Lokal
Terkadang Anda ingin membagikan tampilan *frontend* secara langsung ke teman/dosen dari komputer Anda sendiri (tanpa Vercel). 
Karena frontend berjalan di port `5173` (Vite), Anda cukup mengetik:

```bash
cloudflared tunnel --url http://localhost:5173
```
Salin link `.trycloudflare.com` yang muncul, dan bagikan link tersebut! Teman Anda bisa langsung membuka website-nya lewat HP atau laptop mereka dari jarak jauh.

---

## ⚠️ Tips Penting
- **Jangan Tutup Terminal**: Selama Terminal `cloudflared` ditutup/di-close, maka link akan langsung mati. Biarkan terminal terbuka (minimize) selama presentasi atau pengujian.
- **Link Berubah**: Jika Anda menggunakan fitur *Quick Tunnel* seperti di atas, URL akan selalu berubah setiap kali Anda mengetik ulang perintahnya. (Kecuali jika Anda membuat *Named Tunnel* berbayar/dengan domain pribadi).

**Dokumen ini dibuat secara khusus untuk mempermudah alur kerja Tugas Akhir (TA) Anda.**
Selamat mencoba! 🚀
