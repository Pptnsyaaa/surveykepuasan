import mysql from 'mysql2';
import fs from 'fs';
import path from 'path';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  multipleStatements: true
});

connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL:', err);
    process.exit(1);
  }
  
  const sql = fs.readFileSync(path.join(process.cwd(), 'database.sql'), 'utf8');
  
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL:', err);
    } else {
      console.log('Database and tables created successfully!');
    }
    connection.end();
    process.exit(err ? 1 : 0);
  });
});
