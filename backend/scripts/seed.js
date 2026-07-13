import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_survey_ai',
  port: process.env.DB_PORT || 3306
});

const fakultasOptions = [
  'TI',
  'TM',
  'TO',
  'TEI'
];

const serviceIds = ['akademik', 'fasilitas', 'kemahasiswaan', 'keuangan', 'perpustakaan'];
const serviceNames = ['Layanan Akademik', 'Fasilitas Kampus', 'Layanan Kemahasiswaan', 'Layanan Keuangan', 'Perpustakaan'];

async function seedData() {
  console.log('Menghapus data lama (opsional)...');
  await db.query('TRUNCATE TABLE surveys');
  await db.query('TRUNCATE TABLE survey_responses');
  
  console.log('Memulai generasi data untuk 45 hari terakhir...');
  const now = new Date();
  let totalInserted = 0;

  for (let i = 45; i >= 0; i--) {
    const targetDate = new Date(now);
    targetDate.setDate(targetDate.getDate() - i);
    
    // Randomize number of surveys per day (5 to 15 surveys per day)
    const surveysToday = Math.floor(Math.random() * 11) + 5;
    
    for (let s = 0; s < surveysToday; s++) {
      // Create random hours and minutes for the submission time
      const submitTime = new Date(targetDate);
      submitTime.setHours(Math.floor(Math.random() * 14) + 8); // 8 AM to 10 PM
      submitTime.setMinutes(Math.floor(Math.random() * 60));
      
      const fakultas = fakultasOptions[Math.floor(Math.random() * fakultasOptions.length)];
      
      // Generate 2 to 5 random responses per survey
      const numResponses = Math.floor(Math.random() * 4) + 2;
      const responses = [];
      let totalRating = 0;
      
      // Base rating trend (e.g. older dates had slightly lower ratings, newer dates have higher)
      // This creates a nice "Trend" for the chart
      const trendBonus = (45 - i) / 45; // 0 to 1
      
      for (let r = 0; r < numResponses; r++) {
        const serviceIndex = Math.floor(Math.random() * serviceIds.length);
        
        // Random rating biased by trend (1 to 5)
        let ratingBase = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
        if (Math.random() < trendBonus) ratingBase += 1; // More 5s later on
        let rating = Math.min(5, Math.max(1, ratingBase + Math.floor(Math.random() * 2))); 
        
        responses.push({
          serviceId: serviceIds[serviceIndex],
          layanan: serviceNames[serviceIndex],
          rating: rating,
          komentar: 'Layanan cukup memadai.'
        });
        totalRating += rating;
      }
      
      const averageRating = (totalRating / numResponses).toFixed(2);
      
      // Insert Survey
      const [result] = await db.query(
        'INSERT INTO surveys (fakultas, average_rating, responses, submitted_at) VALUES (?, ?, ?, ?)',
        [fakultas, parseFloat(averageRating), JSON.stringify(responses), submitTime]
      );
      
      const surveyId = result.insertId;
      
      // Insert individual responses
      for (const res of responses) {
        await db.query(
          'INSERT INTO survey_responses (survey_id, layanan, rating, komentar, service_id, created_at) VALUES (?, ?, ?, ?, ?, ?)',
          [surveyId, res.layanan, res.rating, res.komentar, res.serviceId, submitTime]
        );
      }
      totalInserted++;
    }
  }
  
  console.log(`✅ Berhasil menginjeksi ${totalInserted} data survey selama 45 hari terakhir!`);
  process.exit(0);
}

seedData().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
