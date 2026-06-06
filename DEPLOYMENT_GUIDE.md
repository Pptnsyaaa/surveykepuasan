## 📋 Setup Guide - Deployment Vercel + ngrok + XAMPP

### ✅ Status Sekarang (Update 06 Juni 2026)
- ✅ Backend: Running on localhost:5000 (with MySQL Connection Pool)
- ✅ Database: MySQL XAMPP (localhost:3306)
- ✅ Tunneling: ngrok / cloudflared
- ✅ Frontend: Built & Ready for Vercel
- ✅ API Configuration: Centralized (api.js)
- ✅ Keamanan: Dilengkapi Route Guard & Anti-Direct URL Access
- ✅ UI/UX: Teroptimasi penuh (Animasi Mulus & Auto-Refresh 30s)

---

## 🚀 Deployment ke Vercel

### 1. Update ngrok URL di Vercel Environment Variables

**Setiap kali ngrok URL berubah, update di Vercel:**

1. Buka Vercel Dashboard: https://vercel.com/dashboard
2. Pilih project **survey_mahasiswa**
3. Go to **Settings** → **Environment Variables**
4. Update atau tambah:
   ```
   VITE_API_URL=https://YOUR-NGROK-URL.ngrok-free.dev
   ```
   
5. Contoh ngrok URL yang aktif sekarang:
   ```
   https://silica-purging-durable.ngrok-free.dev
   ```

### 2. Trigger Redeploy setelah Update Environment

Setiap kali update env vars:
- Push perubahan ke Git, ATAU
- Manual redeploy di Vercel: Settings → Deployments → Redeploy

---

## 🔌 Jalankan Backend + ngrok (Lokal Development)

### Terminal 1: Backend + Database

```bash
# Start XAMPP MySQL dulu (Control Panel XAMPP)
# Atau jalankan: xampp_start.exe

# Kemudian start backend
cd backend
npm run dev

# Output yang benar:
# 🚀 Server running on port 5000
# ✅ Database connected
# MySQL Connected
```

### Terminal 2: ngrok Tunnel

```bash
# Jika sudah install ngrok:
ngrok http 5000

# Output:
# Forwarding    https://silica-purging-durable.ngrok-free.dev -> http://localhost:5000
# Copy URL ini untuk Vercel environment variable
```

⚠️ **PENTING**: ngrok URL berubah setiap kali restart!

---

## 📝 File Konfigurasi API

### `frontend/src/api.js`
```javascript
const API_BASE_URL = 
  import.meta.env.VITE_API_URL || 
  'https://silica-purging-durable.ngrok-free.dev'
```

✅ Semua API calls sekarang centralized di sini!

### `frontend/.env.local` (Development)
```
VITE_API_URL=https://silica-purging-durable.ngrok-free.dev
```

### Vercel Environment Variables (Production)
```
VITE_API_URL=https://your-ngrok-url.ngrok-free.dev
```

---

## 🧪 Testing Lokal sebelum Deploy

### 1. Test Backend API

```bash
# Test apakah backend bisa diakses
curl https://silica-purging-durable.ngrok-free.dev/api/survey

# Atau check dari browser
# https://silica-purging-durable.ngrok-free.dev/api/survey
```

### 2. Test Frontend Lokal

```bash
cd frontend
npm run dev

# Buka http://localhost:5173
# Cek Console → apakah API_URL sudah benar?
```

### 3. Test from Vercel Deployment

Buka: https://survey-mahasiswa.vercel.app (atau URL Vercel Anda)
- Login ke Admin Dashboard
- Cek apakah data tampil

---

## ⚠️ Troubleshooting

### Data kosong di Dashboard Vercel?

**Kemungkinan Penyebab:**
1. ❌ ngrok URL stale/expired
   - **Solusi**: Restart ngrok dan update Vercel env var

2. ❌ Backend offline
   - **Solusi**: `npm run dev` di terminal backend

3. ❌ XAMPP database offline
   - **Solusi**: Start XAMPP, pastikan MySQL running

4. ❌ CORS issue
   - **Solusi**: Backend sudah allow `origin: '*'` ✅

### Cek Browser Console

Buka DevTools → Console → cari pesan error API

---

## 📦 Production Setup (Permanent)

Saat siap production, gunakan:
- Backend: Cloud Server (Railway, Render, atau VPS)
- Database: Managed Database (PlanetScale, AWS RDS)
- Frontend: Vercel (sudah maintained)

Untuk sekarang, ngrok + XAMPP lokal cukup untuk testing!

---

## 🔄 Workflow Summary

```
1. Pastikan XAMPP MySQL running
2. Jalankan Backend: npm run dev
3. Jalankan ngrok: ngrok http 5000
4. Update Vercel env var dengan ngrok URL terbaru
5. Trigger redeploy di Vercel
6. Test dashboard: buka link Vercel Anda
```

---

**Created**: 2026-05-26
**Last Updated**: 2026-06-06
**Status**: Ready for Vercel Deployment (Fully Optimized & Secured)
