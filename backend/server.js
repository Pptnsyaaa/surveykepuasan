import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mysql from 'mysql2'

import surveyRoutes from './routes/surveyRoutes.js'
import notificationsRoutes from './routes/notificationsRoutes.js'

dotenv.config()

const app = express()

// ===============================
// KONEKSI DATABASE MYSQL
// ===============================

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,

  ssl: {
  rejectUnauthorized: false
}
})

db.connect((err) => {

  if (err) {

    console.error(
      'Database connection failed:',
      err
    )

    process.exit(1)

  }

  console.log('✅ Database connected')

})

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors({

  origin: [
    'https://surveykepuasan-seven.vercel.app'
  ],

  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],

  credentials: true

}))

app.use(express.json())

// ===============================
// ROUTES MODULAR
// ===============================

app.use('/api/survey', surveyRoutes)

app.use(
  '/api/notifications',
  notificationsRoutes
)

// ===============================
// SAVE SURVEY
// ===============================

app.post('/api/save-survey', (req, res) => {

  try {

    const {
      averageRating,
      responses

    } = req.body

    // support fakultas provided either at root or nested under `student`
    const fakultas = req.body.fakultas
      || req.body.student?.fakultas
      || req.body.student?.jurusan
      || null

    // ===============================
    // VALIDASI
    // ===============================

    if (
      !responses ||
      !Array.isArray(responses)
    ) {

      return res.status(400).json({

        status: 'error',

        message:
          'Responses tidak valid'

      })

    }

    // ===============================
    // INSERT KE TABEL surveys
    // ===============================

    const surveyQuery = `
      INSERT INTO surveys
      (
        fakultas,
        average_rating,
        responses,
        submitted_at
      )
      VALUES (?, ?, ?, NOW())
    `

    db.query(

      surveyQuery,

      [

        fakultas,

        averageRating,

        JSON.stringify(responses)

      ],

      (err, surveyResult) => {

        if (err) {

          console.error(
            '❌ Insert Survey Error:',
            err
          )

          return res.status(500).json({

            status: 'error'

          })

        }

        // ambil id survey terbaru
        const surveyId =
          surveyResult.insertId

        // ===============================
        // INSERT DETAIL RESPON
        // ===============================

        for (const item of responses) {

          const responseQuery = `
            INSERT INTO survey_responses
            (
              survey_id,
              layanan,
              rating,
              komentar,
              service_id,
              created_at
            )
            VALUES (?, ?, ?, ?, ?, NOW())
          `

          db.query(

            responseQuery,

            [

              surveyId,

              item.serviceName,

              item.rating,

              item.comment || null,

              item.serviceId || null

            ],

            (err) => {

              if (err) {

                console.error(
                  '❌ Insert Response Error:',
                  err
                )

              }

            }

          )

        }

        // ===============================
        // RESPONSE SUCCESS
        // ===============================

        const notifQuery = `
  INSERT INTO notifications
  (
    pesan,
    created_at,
    status
  )
  VALUES (?, NOW(), ?)
`

        db.query(
          notifQuery,

          [
            `Survey baru dari ${fakultas || '-'}`,
            'unread'
          ],

          (err) => {

            if(err){

              console.error(
                '❌ Notification Error:',
                err
              )

            }

          }

        )

        // ===============================
        // SENTIMENT ANALYSIS INSERT
        // ===============================

        try {

          const avg = Number(averageRating) || 0

          let hasil = 'Netral'

          if (avg >= 4) {
            hasil = 'Positif'
          } else if (avg <= 2) {
            hasil = 'Negatif'
          }

          const sentimentQuery = `
            INSERT INTO
            sentiment_analysis
            (
              survey_id,
              hasil,
              skor
            )
            VALUES (?,?,?)
          `

          db.query(
            sentimentQuery,
            [
              surveyId,
              hasil,
              avg
            ],
            (sentErr) => {
              if (sentErr) {
                console.error('❌ ERROR SENTIMENT:', sentErr)
              } else {
                console.log('✅ Sentiment berhasil')
              }
            }
          )

        } catch (e) {
          console.error('❌ Sentiment processing error:', e)
        }

        return res.status(200).json({
          status: 'success',
          message: 'Survey berhasil disimpan'
        })

      }

    )

  } catch (err) {
    console.error('❌ Save survey error:', err)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }

})

// ===============================
// GET SURVEY DATA
// ===============================
// ===============================
// TEST API
// ===============================

app.get('/', (req, res) => {

  res.send(
    '🚀 Backend Survey AI Running'
  )

})

// ===============================
// LOGIN ADMIN MYSQL
// ===============================

app.post('/api/admin/login', (req, res) => {

  const {
    username,
    password
  } = req.body

  // validasi kosong
  if (!username || !password) {

    return res.status(400).json({

      success: false,

      message:
        'Username dan password wajib diisi'

    })

  }

  // query mysql
  const query = `
    SELECT *
    FROM admins
    WHERE username = ?
    AND password = ?
    LIMIT 1
  `

  db.query(

    query,

    [
      username,
      password
    ],

    (err, results) => {

      if (err) {

        console.error(
          '❌ Login Error:',
          err
        )

        return res.status(500).json({

          success: false,

          message:
            'Server error'

        })

      }

      // kalau user tidak ditemukan
      if (results.length === 0) {

        return res.status(401).json({

          success: false,

          message:
            'Username atau password salah'

        })

      }

      // ambil data admin
      const admin = results[0]

      // update last login
      const updateLogin = `
        UPDATE admins
        SET last_login = NOW()
        WHERE id = ?
      `

      db.query(
        updateLogin,
        [admin.id]
      )

      // login sukses
      return res.status(200).json({

        success: true,

        message:
          'Login berhasil',

        admin: {

          id: admin.id,

          nama: admin.nama,

          username:
            admin.username

        }

      })

    }

  )

})

// ===============================
// RUN SERVER
// ===============================

const PORT =
  process.env.PORT || 5000

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  )

})
