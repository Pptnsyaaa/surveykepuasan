CREATE DATABASE IF NOT EXISTS survey_mahasiswa;
USE survey_mahasiswa;

CREATE TABLE IF NOT EXISTS surveys (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fakultas VARCHAR(255),
  average_rating FLOAT,
  responses JSON,
  submitted_at DATETIME
);

CREATE TABLE IF NOT EXISTS survey_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id INT,
  layanan VARCHAR(255),
  rating INT,
  komentar TEXT,
  service_id VARCHAR(255),
  created_at DATETIME
);

CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pesan VARCHAR(255),
  created_at DATETIME,
  status VARCHAR(50) DEFAULT 'unread'
);

CREATE TABLE IF NOT EXISTS sentiment_analysis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id INT,
  hasil VARCHAR(50),
  skor FLOAT
);

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(255),
  username VARCHAR(255),
  password VARCHAR(255),
  last_login DATETIME
);

-- Insert default admin
INSERT INTO admins (nama, username, password) 
VALUES ('Administrator', 'admin', 'admin123') 
ON DUPLICATE KEY UPDATE username=username;
