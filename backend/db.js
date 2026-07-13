import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_survey_ai',
  port: process.env.DB_PORT || 3306,
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