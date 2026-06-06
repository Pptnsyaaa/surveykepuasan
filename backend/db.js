import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const db = mysql.createPool({

  host: process.env.DB_HOST,

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,

  port: process.env.DB_PORT,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0

})

// Test the connection pool
db.getConnection((err, connection) => {
  if (err) {
    console.log('MYSQL ERROR:', err)
  } else {
    console.log('✅ Database connected')
    connection.release()
  }
})

export default db