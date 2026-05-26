## ✅ CHECKLIST - Sebelum Akses Website dari Vercel

### 1️⃣ Backend & Database (Lokal)

- [ ] **XAMPP MySQL**: Running
  - Buka XAMPP Control Panel
  - Klik **Start** untuk MySQL
  - Pastikan tombol warna HIJAU

- [ ] **Backend Server**: Running
  ```bash
  cd backend
  npm run dev
  
  # Tunggu sampai muncul:
  # 🚀 Server running on port 5000
  # ✅ Database connected
  ```

- [ ] **Test Backend**: Buka di browser
  ```
  http://localhost:5000/
  
  # Harus tampil: 🚀 Backend Survey AI Running
  ```

---

### 2️⃣ ngrok Tunnel

- [ ] **Start ngrok**:
  ```bash
  # Di terminal baru
  ngrok http 5000
  
  # Catat URL yang muncul, contoh:
  # https://silica-purging-durable.ngrok-free.dev
  ```

- [ ] **Test ngrok**: Buka URL ngrok di browser
  ```
  https://silica-purging-durable.ngrok-free.dev/
  
  # Harus tampil: 🚀 Backend Survey AI Running
  ```

- [ ] **Copy ngrok URL**: 
  Simpan di clipboard, siap untuk step berikutnya

---

### 3️⃣ Update Vercel Environment Variables

- [ ] **Buka Vercel Dashboard**
  - URL: https://vercel.com/dashboard
  - Pilih project: survey_mahasiswa

- [ ] **Go to Settings**
  - Click: Settings → Environment Variables

- [ ] **Update VITE_API_URL**
  - Key: `VITE_API_URL`
  - Value: `https://silica-purging-durable.ngrok-free.dev`
  - ⚠️ Ganti dengan ngrok URL Anda dari step 2

- [ ] **Save & Redeploy**
  - Click "Save"
  - Go to: Deployments
  - Click "Redeploy" di build terbaru

- [ ] **Tunggu Deploy Selesai**
  - Status: "Ready" (bukan "Building")
  - Check logo di Environment Variables sudah ✅

---

### 4️⃣ Test Dashboard Admin di Vercel

- [ ] **Buka Website Vercel**
  ```
  https://survey-mahasiswa.vercel.app
  (atau URL Vercel Anda)
  ```

- [ ] **Login Admin**
  - Username: (sesuai setup Anda)
  - Password: (sesuai setup Anda)

- [ ] **Check Dashboard**
  - Buka: Dashboard Admin → Overview
  - Cek: Data Responden should NOT EMPTY
  - Cek: Charts should show data
  - Cek: Notifications should load

---

### 5️⃣ Debugging (Jika Ada Error)

**Jika data masih kosong:**

1. Buka Browser Console (F12)
   - Check: Network tab
   - Check: Console tab untuk error message

2. Cek error yang tampil:
   - `Failed to fetch from https://...` 
     → ngrok offline, restart ngrok
   - `TypeError: data is null`
     → database kosong atau API error
   - `CORS error`
     → backend CORS config ada issue

3. Check backend logs:
   ```bash
   # Terminal backend harus show:
   # GET /api/survey
   # 200 OK
   ```

---

### 🎯 Hasil yang Diharapkan

✅ **Dashboard Admin:**
- Data Responden: Tampil dengan count
- Charts: Bar, Radar, Pie charts show data
- Notifications: List notifikasi tampil
- Filter, Export, Print: Semua berfungsi

✅ **API Response:**
- `/api/survey` → Return array of surveys
- `/api/notifications` → Return array of notifications
- Status: 200 OK (bukan 404 atau 500)

---

### 📞 Jika Masih Ada Error

Verifikasi dengan melakukan test API langsung:

```bash
# 1. Test lokal backend
curl http://localhost:5000/api/survey

# 2. Test via ngrok tunnel
curl https://silica-purging-durable.ngrok-free.dev/api/survey

# 3. Check browser console di Vercel:
# Buka https://survey-mahasiswa.vercel.app
# F12 → Console → Check API URLs
```

---

**Last Updated**: 2026-05-26
**Status**: Ready for Deployment
