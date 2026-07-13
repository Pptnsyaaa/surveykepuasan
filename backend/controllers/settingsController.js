import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import db from '../db.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const backupFilePath = path.join(__dirname, '../data/settings_backup.json')

const DEFAULT_DEPARTMENTS = [
  { id: 'TI', name: 'Teknik Informatika', code: 'TI' },
  { id: 'TM', name: 'Teknik Mesin', code: 'TM' },
  { id: 'TO', name: 'Teknik Otomotif', code: 'TO' },
  { id: 'TEI', name: 'Teknik Elektronika Industri', code: 'TEI' }
]

const DEFAULT_QUESTIONS = [
  {
    id: 'pengajaran',
    name: 'Kualitas Pengajaran',
    question: 'Bagaimana kepuasan Anda terhadap kompetensi, kedisiplinan, dan metode pengajaran dosen perkuliahan?'
  },
  {
    id: 'perpustakaan',
    name: 'Perpustakaan',
    question: 'Bagaimana kepuasan Anda terhadap kelengkapan koleksi buku, ruang baca, dan pelayanan perpustakaan?'
  },
  {
    id: 'laboratorium',
    name: 'Laboratorium & Praktikum',
    question: 'Bagaimana kepuasan Anda terhadap kelengkapan peralatan dan kenyamanan kegiatan praktikum di laboratorium?'
  },
  {
    id: 'keuangan',
    name: 'Layanan Keuangan',
    question: 'Bagaimana kepuasan Anda terhadap kemudahan pelayanan administrasi keuangan (UKT/beasiswa)?'
  },
  {
    id: 'kemahasiswaan',
    name: 'Layanan & Fasilitas Kampus',
    question: 'Bagaimana kepuasan Anda terhadap layanan kemahasiswaan, dukungan BEM/Ormawa, dan kegiatan mahasiswa?'
  },
  {
    id: 'karir_magang',
    name: 'Bimbingan Karir & Magang',
    question: 'Bagaimana kepuasan Anda terhadap layanan informasi magang (Kampus Merdeka), bimbingan karir, dan konseling?'
  },
  {
    "id": "fasilitas",
    "name": "Fasilitas Kampus",
    "question": "Bagaimana kepuasan Anda terhadap kebersihan dan kenyamanan fasilitas umum kampus (ruang kelas, toilet, parkir)?"
  },
  {
    id: 'layanan_it',
    name: 'Layanan IT & Wi-Fi',
    question: 'Bagaimana kepuasan Anda terhadap keandalan jaringan internet (Wi-Fi) dan portal sistem informasi digital kampus?'
  },
  {
    id: 'pelayanan_staf',
    name: 'Responsivitas Staf',
    question: 'Bagaimana kepuasan Anda terhadap keramahan, kecepatan, dan responsivitas petugas/staf kampus dalam memberikan pelayanan?'
  }
]

let memoryCache = {
  departments: DEFAULT_DEPARTMENTS,
  questions: DEFAULT_QUESTIONS
}

// Load backup file if exists
try {
  if (fs.existsSync(backupFilePath)) {
    const data = JSON.parse(fs.readFileSync(backupFilePath, 'utf8'))
    if (data.departments) memoryCache.departments = data.departments
    if (data.questions) memoryCache.questions = data.questions
  } else {
    const dataDir = path.dirname(backupFilePath)
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
    fs.writeFileSync(backupFilePath, JSON.stringify(memoryCache, null, 2))
  }
} catch (e) {
  console.log('Note: Using memory settings cache:', e.message)
}

// Ensure table exists
const initSettingsTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS survey_settings (
      setting_key VARCHAR(100) PRIMARY KEY,
      setting_value JSON,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `
  db.query(createTableQuery, (err) => {
    if (err) {
      console.log('⚠️ Could not check/create survey_settings table, using backup file:', err.message)
      return
    }
    // Seed departments if missing
    db.query('SELECT setting_value FROM survey_settings WHERE setting_key = ?', ['departments'], (err, results) => {
      if (!err && results && results.length > 0 && results[0].setting_value) {
        try {
          const val = typeof results[0].setting_value === 'string' ? JSON.parse(results[0].setting_value) : results[0].setting_value
          if (Array.isArray(val) && val.length > 0) memoryCache.departments = val
        } catch (e) {}
      } else if (!err && (!results || results.length === 0)) {
        db.query('INSERT INTO survey_settings (setting_key, setting_value) VALUES (?, ?)', ['departments', JSON.stringify(DEFAULT_DEPARTMENTS)])
      }
    })
    // Seed questions if missing
    db.query('SELECT setting_value FROM survey_settings WHERE setting_key = ?', ['questions'], (err, results) => {
      if (!err && results && results.length > 0 && results[0].setting_value) {
        try {
          const val = typeof results[0].setting_value === 'string' ? JSON.parse(results[0].setting_value) : results[0].setting_value
          if (Array.isArray(val) && val.length > 0) memoryCache.questions = val
        } catch (e) {}
      } else if (!err && (!results || results.length === 0)) {
        db.query('INSERT INTO survey_settings (setting_key, setting_value) VALUES (?, ?)', ['questions', JSON.stringify(DEFAULT_QUESTIONS)])
      }
    })
  })
}

initSettingsTable()

const saveToBackupAndDb = (key, val, callback) => {
  memoryCache[key] = val
  try {
    fs.writeFileSync(backupFilePath, JSON.stringify(memoryCache, null, 2))
  } catch (e) {}

  db.query(
    'INSERT INTO survey_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)',
    [key, JSON.stringify(val)],
    (err) => {
      if (err) console.log(`⚠️ DB save warning for ${key}:`, err.message)
      if (callback) callback()
    }
  )
}

export const getSettings = (req, res) => {
  res.json({
    status: 'success',
    departments: memoryCache.departments,
    questions: memoryCache.questions
  })
}

export const saveDepartments = (req, res) => {
  const { departments } = req.body
  if (!Array.isArray(departments)) {
    return res.status(400).json({ status: 'error', message: 'Format departments harus berupa array' })
  }
  // Sanitize array elements
  const cleanList = departments
    .filter(item => item && typeof item === 'object')
    .map(item => ({
      id: String(item.id || item.code || item.name || '').trim(),
      code: String(item.code || item.id || item.name || '').trim(),
      name: String(item.name || '').trim()
    }))
    .filter(item => item.name && (item.id || item.code))

  saveToBackupAndDb('departments', cleanList, () => {
    res.json({ status: 'success', message: 'Daftar Program Studi berhasil disimpan', departments: memoryCache.departments })
  })
}

export const saveQuestions = (req, res) => {
  const { questions } = req.body
  if (!Array.isArray(questions)) {
    return res.status(400).json({ status: 'error', message: 'Format questions harus berupa array' })
  }
  // Sanitize array elements
  const cleanList = questions
    .filter(item => item && typeof item === 'object')
    .map((item, idx) => ({
      id: String(item.id || item.name || `q-${idx + 1}`).trim(),
      name: String(item.name || '').trim(),
      question: String(item.question || '').trim()
    }))
    .filter(item => item.name && item.question)

  saveToBackupAndDb('questions', cleanList, () => {
    res.json({ status: 'success', message: 'Daftar Pertanyaan Survei berhasil disimpan', questions: memoryCache.questions })
  })
}
