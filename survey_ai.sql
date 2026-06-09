-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 08, 2026 at 06:31 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `survey_ai`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int NOT NULL,
  `nama` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `nama`, `username`, `password`, `last_login`, `created_at`) VALUES
(1, 'Fitrohtun Nisha', 'admin', 'admin123', '2026-06-07 04:04:41', '2026-05-18 03:08:14'),
(2, 'Poltek Baja Tegal', 'pbjt.com', 'adminpolbaja', '2026-05-29 17:25:23', '2026-05-29 17:20:20');

-- --------------------------------------------------------

--
-- Table structure for table `jurusan`
--

CREATE TABLE `jurusan` (
  `id` int NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `status` enum('aktif','nonaktif') DEFAULT 'aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jurusan`
--

INSERT INTO `jurusan` (`id`, `kode`, `nama`, `status`) VALUES
(1, 'TI', 'Teknik Informatika', 'aktif'),
(2, 'TM', 'Teknik Mesin', 'aktif'),
(3, 'TO', 'Teknik Otomotif', 'aktif'),
(4, 'TEI', 'Teknik Elektronika Industri', 'aktif');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int NOT NULL,
  `pesan` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('unread','read') DEFAULT 'unread'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `pesan`, `created_at`, `status`) VALUES
(19, 'Survey baru dari TM', '2026-05-22 15:44:44', 'unread'),
(20, 'Survey baru dari TI', '2026-05-22 15:45:16', 'unread'),
(21, 'Survey baru dari TM', '2026-05-22 16:53:10', 'unread'),
(22, 'Survey baru dari TO', '2026-05-22 16:53:30', 'unread'),
(23, 'Survey baru dari TM', '2026-05-22 16:59:48', 'unread'),
(24, 'Survey baru dari TM', '2026-05-22 16:59:59', 'unread'),
(25, 'Survey baru dari TEI', '2026-05-22 17:00:06', 'unread'),
(26, 'Survey baru dari TI', '2026-05-22 17:00:13', 'unread'),
(27, 'Survey baru dari TI', '2026-05-22 17:02:48', 'unread'),
(28, 'Survey baru dari TEI', '2026-05-22 17:03:04', 'unread'),
(29, 'Survey baru dari TI', '2026-05-23 12:12:01', 'unread'),
(30, 'Survey baru dari TI', '2026-05-23 12:28:58', 'unread'),
(31, 'Survey baru dari TI', '2026-05-23 12:29:22', 'unread'),
(32, 'Survey baru dari TI', '2026-05-23 23:08:10', 'unread'),
(33, 'Survey baru dari TO', '2026-05-23 23:08:41', 'unread'),
(34, 'Survey baru dari TEI', '2026-05-23 23:08:52', 'unread'),
(35, 'Survey baru dari TEI', '2026-05-24 04:53:07', 'unread'),
(36, 'Survey baru dari TO', '2026-05-24 04:54:08', 'unread'),
(37, 'Survey baru dari TO', '2026-05-24 10:23:40', 'unread'),
(38, 'Survey baru dari TI', '2026-05-24 12:35:51', 'unread'),
(39, 'Survey baru dari TM', '2026-05-26 14:31:20', 'unread'),
(40, 'Survey baru dari TI', '2026-05-26 17:32:31', 'unread'),
(41, 'Survey baru dari TI', '2026-05-29 17:14:06', 'unread'),
(42, 'Survey baru dari TEI', '2026-05-30 06:37:39', 'unread'),
(43, 'Survey baru dari TI', '2026-05-30 13:43:56', 'unread'),
(44, 'Survey baru dari TEI', '2026-05-30 13:45:26', 'unread'),
(45, 'Survey baru dari TI', '2026-05-30 13:50:47', 'unread'),
(46, 'Survey baru dari TEI', '2026-05-30 13:55:37', 'unread'),
(47, 'Survey baru dari TO', '2026-06-03 03:50:05', 'unread'),
(48, 'Survey baru dari TI', '2026-06-03 04:24:39', 'unread'),
(49, 'Survey baru dari TM', '2026-06-06 05:48:30', 'unread'),
(50, 'Survey baru dari TEI', '2026-06-07 02:36:52', 'unread'),
(51, 'Survey baru dari TEI', '2026-06-07 04:04:29', 'unread');

-- --------------------------------------------------------

--
-- Table structure for table `sentiment_analysis`
--

CREATE TABLE `sentiment_analysis` (
  `id` int NOT NULL,
  `survey_id` int DEFAULT NULL,
  `skor` decimal(5,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `hasil` enum('Positif','Netral','Negatif') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sentiment_analysis`
--

INSERT INTO `sentiment_analysis` (`id`, `survey_id`, `skor`, `created_at`, `hasil`) VALUES
(1, 37, '3.60', '2026-05-19 15:07:31', 'Netral'),
(2, 38, '3.20', '2026-05-19 15:21:24', 'Netral'),
(3, 39, '3.00', '2026-05-20 03:19:00', 'Netral'),
(4, 40, '3.00', '2026-05-20 03:32:45', 'Netral'),
(5, 41, '3.00', '2026-05-22 02:05:22', 'Netral'),
(6, 42, '3.20', '2026-05-22 07:57:55', 'Netral'),
(7, 43, '3.60', '2026-05-22 08:00:04', 'Netral'),
(8, 50, '4.20', '2026-05-22 10:25:31', 'Positif'),
(9, 51, '3.00', '2026-05-22 15:44:44', 'Netral'),
(10, 52, '3.00', '2026-05-22 15:45:17', 'Netral'),
(11, 53, '3.00', '2026-05-22 16:53:10', 'Netral'),
(12, 54, '3.00', '2026-05-22 16:53:30', 'Netral'),
(13, 55, '3.00', '2026-05-22 16:59:48', 'Netral'),
(14, 56, '3.00', '2026-05-22 16:59:59', 'Netral'),
(15, 57, '3.00', '2026-05-22 17:00:06', 'Netral'),
(16, 58, '3.00', '2026-05-22 17:00:13', 'Netral'),
(17, 59, '3.00', '2026-05-22 17:02:48', 'Netral'),
(18, 60, '3.00', '2026-05-22 17:03:04', 'Netral'),
(19, 61, '2.20', '2026-05-23 12:12:01', 'Netral'),
(20, 62, '3.00', '2026-05-23 12:28:58', 'Netral'),
(21, 63, '3.00', '2026-05-23 12:29:22', 'Netral'),
(22, 64, '3.60', '2026-05-23 23:08:10', 'Netral'),
(23, 65, '3.00', '2026-05-23 23:08:41', 'Netral'),
(24, 66, '3.00', '2026-05-23 23:08:52', 'Netral'),
(25, 67, '2.80', '2026-05-24 04:53:07', 'Netral'),
(26, 68, '2.60', '2026-05-24 04:54:08', 'Netral'),
(27, 69, '3.40', '2026-05-24 10:23:40', 'Netral'),
(28, 70, '4.60', '2026-05-24 12:35:51', 'Positif'),
(29, 71, '3.40', '2026-05-26 14:31:20', 'Netral'),
(30, 72, '3.00', '2026-05-26 17:32:31', 'Netral'),
(31, 73, '3.80', '2026-05-29 17:14:06', 'Netral'),
(32, 74, '3.40', '2026-05-30 06:37:39', 'Netral'),
(33, 75, '3.40', '2026-05-30 13:43:56', 'Netral'),
(34, 76, '3.00', '2026-05-30 13:45:26', 'Netral'),
(35, 77, '3.40', '2026-05-30 13:50:47', 'Netral'),
(36, 78, '3.40', '2026-05-30 13:55:37', 'Netral'),
(37, 79, '3.20', '2026-06-03 03:50:05', 'Netral'),
(38, 80, '3.00', '2026-06-03 04:24:39', 'Netral'),
(39, 81, '3.80', '2026-06-06 05:48:30', 'Netral'),
(40, 82, '3.60', '2026-06-07 02:36:52', 'Netral'),
(41, 83, '3.60', '2026-06-07 04:04:29', 'Netral');

-- --------------------------------------------------------

--
-- Table structure for table `surveys`
--

CREATE TABLE `surveys` (
  `id` int NOT NULL,
  `fakultas` varchar(100) DEFAULT NULL,
  `average_rating` float DEFAULT NULL,
  `responses` json DEFAULT NULL,
  `submitted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `surveys`
--

INSERT INTO `surveys` (`id`, `fakultas`, `average_rating`, `responses`, `submitted_at`) VALUES
(1, 'TI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-09T01:19:21.801Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-09T01:19:22.462Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-09T01:19:23.146Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-09T01:19:23.701Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-09T01:19:24.602Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-09 01:19:25'),
(2, 'TM', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-09T01:47:17.374Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-09T01:47:18.118Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-09T01:47:18.742Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-09T01:47:20.349Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-09T01:47:21.134Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-09 01:47:21'),
(3, 'TM', 5, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-09T02:12:51.054Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-09T02:12:52.000Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-09T02:12:53.127Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-09T02:12:54.731Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-09T02:12:55.487Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-09 02:12:55'),
(4, 'TI', 2.6, '[{\"rating\": 2, \"comment\": \"\", \"emotion\": \"sad\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-09T04:30:44.411Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-09T04:30:45.627Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-09T04:30:46.465Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 2, \"comment\": \"\", \"emotion\": \"sad\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-09T04:30:53.513Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-09T04:30:55.645Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-09 04:30:55'),
(5, 'TI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-12T12:00:03.914Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-12T12:00:05.213Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-12T12:00:06.410Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-12T12:00:07.576Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-12T12:00:08.348Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-12 12:00:09'),
(6, 'TI', 4.6, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-12T12:15:45.742Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-12T12:15:47.898Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-12T12:15:52.742Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-12T12:15:56.347Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-12T12:16:00.049Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-12 12:16:00'),
(7, 'TI', 5, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-12T12:25:53.531Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-12T12:25:57.120Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-12T12:25:58.266Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-12T12:25:59.454Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-12T12:26:00.494Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-12 12:26:00'),
(8, 'TI', 5, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-12T12:30:38.449Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-12T12:30:39.344Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-12T12:30:40.014Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-12T12:30:41.601Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-12T12:30:42.523Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-12 12:30:42'),
(9, 'TI', 4.6, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-12T12:31:31.079Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-12T12:31:34.873Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-12T12:31:35.631Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-12T12:31:37.175Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-12T12:31:38.030Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-12 12:31:38'),
(10, 'TI', 5, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-12T12:38:16.819Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-12T12:38:17.835Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-12T12:38:18.620Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-12T12:38:19.956Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-12T12:38:20.988Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-12 12:38:21'),
(11, 'TI', 5, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-12T12:38:39.600Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-12T12:38:40.454Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-12T12:38:41.145Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-12T12:38:42.399Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-12T12:38:43.335Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-12 12:38:43'),
(12, 'TI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-12T13:24:17.588Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-12T13:24:19.121Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-12T13:24:19.125Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-12T13:24:19.138Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-12T13:24:19.148Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-12 13:24:19'),
(13, 'TI', 2.8, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-12T14:24:18.438Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 2, \"comment\": \"kurang\", \"emotion\": \"sad\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-12T14:24:44.779Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-12T14:24:47.039Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-12T14:24:49.166Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-12T14:24:55.741Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-12 14:24:55'),
(14, 'TI', 3.2, '[{\"rating\": 4, \"comment\": \"\", \"emotion\": \"surprised\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-13T03:08:28.254Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 4, \"comment\": \"\", \"emotion\": \"surprised\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-13T03:08:32.632Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-13T03:08:35.132Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-13T03:08:39.282Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 2, \"comment\": \"kurang\", \"emotion\": \"sad\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-13T03:08:46.752Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-13 03:08:47'),
(15, 'TM', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-13T03:09:11.619Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-13T03:09:12.486Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-13T03:09:13.253Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-13T03:09:14.620Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-13T03:09:22.378Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-13 03:09:22'),
(16, 'TI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-13T04:16:42.117Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-13T04:16:42.842Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-13T04:16:43.547Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-13T04:16:44.209Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-13T04:16:44.976Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-13 04:16:45'),
(17, 'TI', 3.8, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-13T05:01:26.524Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-13T05:02:34.411Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-13T05:02:40.485Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-13T05:02:42.675Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-13T05:02:44.638Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-13 05:02:44'),
(18, 'TM', 3.8, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-15T04:47:07.982Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-15T04:47:09.827Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-15T04:47:10.909Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-15T04:47:11.788Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-15T04:47:12.668Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-15 04:47:12'),
(19, 'TI', 3.4, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-15T06:56:16.411Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-15T06:56:18.579Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-15T06:56:33.546Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-15T06:56:33.761Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-15T06:56:48.447Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-15 06:56:48'),
(20, 'TM', 5, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-15T07:24:08.093Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-15T07:24:24.558Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-15T07:24:30.126Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-15T07:24:35.068Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-15T07:24:40.757Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-15 07:24:40'),
(21, 'TM', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-15T07:31:37.280Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-15T07:31:38.829Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-15T07:31:39.798Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-15T07:31:40.696Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-15T07:31:41.509Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-15 07:31:41'),
(22, 'TI', 4.4, '[{\"rating\": 4, \"comment\": \"\", \"emotion\": \"surprised\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-15T07:32:57.634Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-15T07:33:15.732Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-15T07:33:31.912Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-15T07:33:43.247Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-15T07:33:44.782Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-15 07:33:44'),
(23, 'TI', 3.6, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-15T14:55:05.499Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 2, \"comment\": \"jelek\", \"emotion\": \"sad\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-15T14:55:24.870Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-15T14:55:43.090Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-15T14:55:47.288Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-15T14:55:49.388Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-15 14:55:49'),
(24, 'TI', 3.4, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-15T14:56:35.648Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-15T14:57:12.048Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-15T14:57:14.588Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-15T14:57:20.259Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-15T14:57:21.975Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-15 14:57:22'),
(25, 'TM', 3.2, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-16T02:29:06.847Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-16T02:29:08.050Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 2, \"comment\": \"jelek\", \"emotion\": \"sad\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-16T02:29:22.012Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-16T02:29:29.363Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 1, \"comment\": \"kurang\", \"emotion\": \"angry\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-16T02:29:46.615Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-16 02:29:47'),
(26, 'TI', 4, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-16T02:42:58.551Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-16T02:43:15.676Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-16T02:43:18.581Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 2, \"comment\": \"kurang\", \"emotion\": \"sad\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-16T02:44:17.514Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-16T02:44:35.965Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-16 02:44:36'),
(27, 'TI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-16T02:49:56.131Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 2, \"comment\": \"kurang\", \"emotion\": \"sad\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-16T02:50:08.179Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-16T02:50:15.305Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 4, \"comment\": \"\", \"emotion\": \"surprised\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-16T02:50:20.858Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 1, \"comment\": \"kurang\", \"emotion\": \"angry\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-16T02:50:32.529Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-16 02:50:32'),
(28, 'TEI', 2.4, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-16T03:18:41.368Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 1, \"comment\": \"bukunya nggak lengkap\\n\", \"emotion\": \"angry\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-16T03:18:55.801Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-16T03:19:01.283Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-16T03:19:18.085Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 2, \"comment\": \"lantai nya kotor\", \"emotion\": \"sad\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-16T03:19:31.186Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-16 03:19:31'),
(29, 'TM', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-16T04:34:59.495Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 1, \"comment\": \"hm\", \"emotion\": \"angry\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-16T04:35:09.626Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-16T04:35:13.995Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-16T04:35:21.913Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-16T04:35:23.025Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-16 04:35:23'),
(30, 'TO', 3.6, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-16T08:00:07.033Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-16T08:00:12.434Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-16T08:00:16.081Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 4, \"comment\": \"\", \"emotion\": \"surprised\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-16T08:00:20.382Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-16T08:00:23.866Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-16 08:00:23'),
(31, 'TI', 3.2, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-18T01:31:19.113Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 2, \"comment\": \"b aja\\n\", \"emotion\": \"sad\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-18T01:31:28.078Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 4, \"comment\": \"\", \"emotion\": \"surprised\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-18T01:31:37.478Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-18T01:31:48.806Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 2, \"comment\": \"proyektor kurang\", \"emotion\": \"sad\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-18T01:32:06.475Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-18 01:32:09'),
(32, 'TM', 2.4, '[{\"rating\": 1, \"comment\": \"kurang \", \"emotion\": \"angry\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-18T03:51:56.005Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-18T03:51:59.375Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 4, \"comment\": \"\", \"emotion\": \"surprised\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-18T03:52:12.206Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 2, \"comment\": \"kurang\", \"emotion\": \"sad\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-18T03:52:34.292Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 2, \"comment\": \"kurang\", \"emotion\": \"sad\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-18T03:52:41.304Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-18 03:52:41'),
(33, 'TEI', 2.6, '[{\"rating\": 1, \"comment\": \"minus\", \"emotion\": \"angry\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-18T04:02:26.885Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 4, \"comment\": \"\", \"emotion\": \"surprised\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-18T04:02:30.868Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-18T04:02:34.909Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 2, \"comment\": \"djbcjshrfihiaeljdf\", \"emotion\": \"sad\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-18T04:02:41.467Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-18T04:02:42.950Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-18 04:02:43'),
(34, 'TM', 3.2, '[{\"rating\": 4, \"comment\": \"\", \"emotion\": \"surprised\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-18T06:15:23.351Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-18T06:15:30.758Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 4, \"comment\": \"\", \"emotion\": \"surprised\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-18T06:15:37.906Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-18T06:15:44.889Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 2, \"comment\": \"FVRVIHECFIOHEIAWOF\", \"emotion\": \"sad\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-18T06:15:53.124Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-18 06:15:54'),
(35, 'TEI', 2.8, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-18T06:30:06.942Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-18T06:30:10.894Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 2, \"comment\": \"KNIEJIWLJ3RHILJLIr\", \"emotion\": \"sad\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-18T06:30:17.586Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-18T06:30:19.692Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-18T06:30:20.751Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-18 06:30:21'),
(36, 'TO', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-19T14:58:23.300Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 2, \"comment\": \"pelayanan kurang bagus\", \"emotion\": \"sad\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-19T14:58:48.814Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 4, \"comment\": \"\", \"emotion\": \"surprised\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-19T14:58:53.931Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 4, \"comment\": \"\", \"emotion\": \"surprised\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-19T14:59:08.846Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 2, \"comment\": \"kekurangan kursi\", \"emotion\": \"sad\", \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-19T14:59:28.815Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-19 14:59:29'),
(37, 'TI', 3.6, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-19T15:06:53.554Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 2, \"comment\": \"buku tidak lengkap\", \"emotion\": \"sad\", \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-19T15:07:04.854Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-19T15:07:13.195Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-19T15:07:27.175Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-19T15:07:30.425Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-19 15:07:31'),
(38, 'TEI', 3.2, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-19T15:20:58.026Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-19T15:21:11.439Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-19T15:21:15.849Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 2, \"comment\": \"vhjgug\", \"emotion\": \"sad\", \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-19T15:21:22.624Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-19T15:21:23.591Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-19 15:21:23'),
(39, 'TI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-20T03:18:55.677Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-20T03:18:56.872Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-20T03:18:57.671Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-20T03:18:58.342Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-20T03:18:58.994Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-20 03:19:00'),
(40, 'TO', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-20T03:32:42.353Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-20T03:32:42.944Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-20T03:32:43.407Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-20T03:32:43.978Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-20T03:32:44.788Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-20 03:32:44'),
(41, 'TO', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T02:05:16.056Z\", \"serviceName\": \"Layanan Akademik\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T02:05:17.038Z\", \"serviceName\": \"Perpustakaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T02:05:18.575Z\", \"serviceName\": \"Layanan Keuangan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T02:05:18.589Z\", \"serviceName\": \"Kemahasiswaan\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T02:05:19.973Z\", \"serviceName\": \"Fasilitas Kampus\"}]', '2026-05-22 02:05:22'),
(42, 'TO', 3.2, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T07:56:41.812Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 2, \"comment\": \"jelek\", \"emotion\": \"sad\", \"ai_rating\": 2, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T07:57:00.365Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"sad\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T07:57:14.595Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T07:57:17.115Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T07:57:51.433Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": \"neutral\"}]', '2026-05-22 07:57:53'),
(43, 'TI', 3.6, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T07:59:22.846Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 2, \"comment\": \"jelek\", \"emotion\": \"sad\", \"ai_rating\": 2, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T07:59:44.295Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"sad\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T07:59:47.357Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T07:59:52.060Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T08:00:04.312Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": \"happy\"}]', '2026-05-22 08:00:04'),
(45, NULL, 4.2, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T09:34:03.551Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T09:34:07.748Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T09:34:10.484Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T09:34:11.233Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T09:34:11.932Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-22 09:34:13'),
(46, NULL, 3.4, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T09:47:31.417Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T09:47:32.159Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T09:47:32.914Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T09:47:40.642Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T09:47:42.157Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-22 09:47:42'),
(47, 'TEI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T10:01:05.634Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T10:01:06.435Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T10:01:07.201Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T10:01:07.868Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T10:01:08.599Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-22 10:01:08'),
(48, 'TI', 1, '[{\"rating\": 1, \"comment\": \"jelek\", \"emotion\": \"angry\", \"ai_rating\": 1, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T10:11:23.508Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"angry\"}, {\"rating\": 1, \"comment\": \"jelek\\n\", \"emotion\": \"angry\", \"ai_rating\": 1, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T10:11:29.560Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"angry\"}, {\"rating\": 1, \"comment\": \"jelek\", \"emotion\": \"angry\", \"ai_rating\": 1, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T10:11:35.855Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"angry\"}, {\"rating\": 1, \"comment\": \"jelek\", \"emotion\": \"angry\", \"ai_rating\": 1, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T10:11:41.089Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": \"angry\"}, {\"rating\": 1, \"comment\": \"jlek\", \"emotion\": \"angry\", \"ai_rating\": 1, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T10:11:54.424Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": \"angry\"}]', '2026-05-22 10:11:54'),
(50, 'TM', 4.2, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T10:25:08.088Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T10:25:09.006Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T10:25:10.322Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T10:25:13.125Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T10:25:31.141Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": \"neutral\"}]', '2026-05-22 10:25:31'),
(51, 'TM', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T15:44:42.025Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T15:44:42.691Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T15:44:43.241Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T15:44:43.812Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T15:44:44.473Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-22 15:44:44'),
(52, 'TI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T15:45:14.564Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T15:45:15.174Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T15:45:15.708Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T15:45:16.275Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T15:45:16.891Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-22 15:45:16'),
(53, 'TM', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T16:53:06.963Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T16:53:07.616Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T16:53:08.277Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T16:53:08.916Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T16:53:09.603Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-22 16:53:09');
INSERT INTO `surveys` (`id`, `fakultas`, `average_rating`, `responses`, `submitted_at`) VALUES
(54, 'TO', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T16:53:30.016Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T16:53:30.450Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T16:53:30.584Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T16:53:30.700Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T16:53:30.917Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-22 16:53:30'),
(55, 'TM', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T16:59:47.409Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T16:59:47.526Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T16:59:47.661Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T16:59:47.775Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T16:59:47.911Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-22 16:59:47'),
(56, 'TM', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T16:59:58.526Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T16:59:58.659Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T16:59:58.793Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T16:59:58.909Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T16:59:59.043Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-22 16:59:59'),
(57, 'TEI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T17:00:05.927Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T17:00:06.073Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T17:00:06.192Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T17:00:06.309Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T17:00:06.443Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-22 17:00:06'),
(58, 'TI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T17:00:13.121Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T17:00:13.258Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T17:00:13.426Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T17:00:13.561Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T17:00:13.790Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-22 17:00:13'),
(59, 'TI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T17:02:35.908Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T17:02:47.852Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T17:02:47.988Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T17:02:48.107Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T17:02:48.271Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-22 17:02:48'),
(60, 'TEI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-22T17:03:03.624Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-22T17:03:03.769Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-22T17:03:03.904Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-22T17:03:04.041Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-22T17:03:04.270Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-22 17:03:04'),
(61, 'TI', 2.2, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-23T12:11:25.489Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 1, \"comment\": \"vhjhbjhhgujhu\", \"emotion\": \"angry\", \"ai_rating\": 1, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-23T12:11:47.845Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"angry\"}, {\"rating\": 1, \"comment\": \"huhkhkihik\", \"emotion\": \"angry\", \"ai_rating\": 1, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-23T12:11:54.019Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"angry\"}, {\"rating\": 1, \"comment\": \" nb jbjknbkj\", \"emotion\": \"angry\", \"ai_rating\": 1, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-23T12:12:00.529Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": \"angry\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-23T12:12:01.420Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-23 12:12:01'),
(62, 'TI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-23T12:28:55.303Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-23T12:28:55.872Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-23T12:28:56.430Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-23T12:28:56.928Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-23T12:28:57.986Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": \"neutral\"}]', '2026-05-23 12:28:58'),
(63, 'TI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-23T12:29:19.667Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-23T12:29:20.300Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-23T12:29:21.121Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-23T12:29:21.744Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-23T12:29:22.915Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-23 12:29:22'),
(64, 'TI', 3.6, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-23T23:07:20.420Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-23T23:07:42.155Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 2, \"comment\": \"bbkh\", \"emotion\": \"sad\", \"ai_rating\": 2, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-23T23:08:01.893Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"sad\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-23T23:08:05.002Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-23T23:08:10.003Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": \"happy\"}]', '2026-05-23 23:08:10'),
(65, 'TO', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-23T23:08:40.884Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-23T23:08:41.035Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-23T23:08:41.155Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-23T23:08:41.320Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-23T23:08:41.435Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-23 23:08:41'),
(66, 'TEI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-23T23:08:52.199Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-23T23:08:52.334Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-23T23:08:52.451Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-23T23:08:52.632Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-23T23:08:52.784Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-23 23:08:52'),
(67, 'TEI', 2.8, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-24T04:52:50.560Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 2, \"comment\": \"kurang\", \"emotion\": \"sad\", \"ai_rating\": 2, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-24T04:52:57.775Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"sad\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-24T04:53:03.790Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-24T04:53:05.557Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-24T04:53:06.623Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-24 04:53:06'),
(68, 'TO', 2.6, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-24T04:53:59.447Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-24T04:54:00.183Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-24T04:54:00.798Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-24T04:54:02.054Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 1, \"comment\": \"minus\", \"emotion\": \"angry\", \"ai_rating\": 1, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-24T04:54:10.035Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": \"angry\"}]', '2026-05-24 04:54:08'),
(69, 'TO', 3.4, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-24T10:23:26.120Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-24T10:23:31.084Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-24T10:23:38.186Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-24T10:23:39.117Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-24T10:23:39.917Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-24 10:23:40'),
(70, 'TI', 4.6, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-24T12:35:20.833Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-24T12:35:24.400Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-24T12:35:33.606Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-24T12:35:49.602Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-24T12:35:50.401Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": \"happy\"}]', '2026-05-24 12:35:50'),
(71, 'TM', 3.4, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-26T14:31:07.364Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-26T14:31:12.616Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-26T14:31:13.281Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"fear\", \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-26T14:31:18.713Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": \"fear\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-26T14:31:19.814Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-26 14:31:20'),
(72, 'TI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-26T17:32:30.038Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-26T17:32:30.306Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-26T17:32:30.417Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-26T17:32:30.546Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-26T17:32:30.692Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-26 17:32:31'),
(73, 'TI', 3.8, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-29T17:13:50.349Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"fear\", \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-29T17:13:59.354Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"fear\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-29T17:14:04.301Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-29T17:14:05.368Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-29T17:14:06.184Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": \"happy\"}]', '2026-05-29 17:14:06'),
(74, 'TEI', 3.4, '[{\"rating\": 2, \"comment\": \"bbjbjkbj\", \"emotion\": \"sad\", \"ai_rating\": 2, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-30T06:36:08.089Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"sad\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-30T06:36:12.532Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 4, \"comment\": \"\", \"emotion\": \"surprised\", \"ai_rating\": 4, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-30T06:36:26.249Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"surprised\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-30T06:37:18.340Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-30T06:37:38.753Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": \"neutral\"}]', '2026-05-30 06:37:39'),
(75, 'TI', 3.4, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-30T13:43:40.307Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-30T13:43:45.657Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-30T13:43:52.223Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-30T13:43:54.503Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-30T13:43:55.323Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-30 13:43:55'),
(76, 'TEI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-30T13:45:23.914Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-30T13:45:24.578Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-30T13:45:25.077Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-30T13:45:25.615Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-30T13:45:26.299Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-30 13:45:26'),
(77, 'TI', 3.4, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-30T13:50:27.783Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-30T13:50:40.117Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-30T13:50:44.944Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-30T13:50:45.935Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-30T13:50:46.832Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-05-30 13:50:47'),
(78, 'TEI', 3.4, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-05-30T13:55:20.167Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-05-30T13:55:26.101Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-05-30T13:55:27.883Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-05-30T13:55:29.167Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"fear\", \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-05-30T13:55:37.284Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": \"fear\"}]', '2026-05-30 13:55:37'),
(79, 'TO', 3.2, '[{\"rating\": 4, \"comment\": \"\", \"emotion\": \"surprised\", \"ai_rating\": 4, \"serviceId\": \"akademik\", \"timestamp\": \"2026-06-03T03:50:03.223Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"surprised\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-06-03T03:50:03.856Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-06-03T03:50:03.996Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-06-03T03:50:04.110Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-06-03T03:50:04.231Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-06-03 03:50:04'),
(80, 'TI', 3, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-06-03T04:24:38.217Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-06-03T04:24:38.335Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-06-03T04:24:38.483Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-06-03T04:24:38.618Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-06-03T04:24:38.751Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-06-03 04:24:38'),
(81, 'TM', 3.8, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"akademik\", \"timestamp\": \"2026-06-06T05:48:19.287Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-06-06T05:48:24.396Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-06-06T05:48:25.791Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-06-06T05:48:27.055Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-06-06T05:48:28.326Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-06-06 05:48:30'),
(82, 'TEI', 3.6, '[{\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"akademik\", \"timestamp\": \"2026-06-07T02:36:27.280Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-06-07T02:36:32.528Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-06-07T02:36:34.306Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 2, \"comment\": \"djjeksncnnekwks\", \"emotion\": \"sad\", \"ai_rating\": 2, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-06-07T02:36:45.922Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": \"sad\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-06-07T02:36:51.921Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": \"happy\"}]', '2026-06-07 02:36:52'),
(83, 'TEI', 3.6, '[{\"rating\": 3, \"comment\": \"\", \"emotion\": \"neutral\", \"ai_rating\": 3, \"serviceId\": \"akademik\", \"timestamp\": \"2026-06-07T04:03:51.632Z\", \"serviceName\": \"Layanan Akademik\", \"raw_ai_emotion\": \"neutral\"}, {\"rating\": 5, \"comment\": \"\", \"emotion\": \"happy\", \"ai_rating\": 5, \"serviceId\": \"perpustakaan\", \"timestamp\": \"2026-06-07T04:04:00.597Z\", \"serviceName\": \"Perpustakaan\", \"raw_ai_emotion\": \"happy\"}, {\"rating\": 4, \"comment\": \"\", \"emotion\": \"surprised\", \"ai_rating\": 4, \"serviceId\": \"keuangan\", \"timestamp\": \"2026-06-07T04:04:26.394Z\", \"serviceName\": \"Layanan Keuangan\", \"raw_ai_emotion\": \"surprised\"}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"kemahasiswaan\", \"timestamp\": \"2026-06-07T04:04:27.426Z\", \"serviceName\": \"Kemahasiswaan\", \"raw_ai_emotion\": null}, {\"rating\": 3, \"comment\": \"\", \"emotion\": null, \"ai_rating\": 3, \"serviceId\": \"fasilitas\", \"timestamp\": \"2026-06-07T04:04:28.425Z\", \"serviceName\": \"Fasilitas Kampus\", \"raw_ai_emotion\": null}]', '2026-06-07 04:04:29');

-- --------------------------------------------------------

--
-- Table structure for table `survey_responses`
--

CREATE TABLE `survey_responses` (
  `id` int NOT NULL,
  `survey_id` int NOT NULL,
  `layanan` varchar(100) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `komentar` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `service_id` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `survey_responses`
--

INSERT INTO `survey_responses` (`id`, `survey_id`, `layanan`, `rating`, `komentar`, `created_at`, `service_id`) VALUES
(1, 1, 'Pelayanan Akademik', 5, NULL, '2026-05-18 03:15:31', NULL),
(2, 1, 'Perpustakaan', 2, 'Buku referensi kurang lengkap', '2026-05-18 03:15:31', NULL),
(3, 1, 'Layanan Keuangan', 4, NULL, '2026-05-18 03:15:31', NULL),
(4, 2, 'Kemahasiswaan', 1, 'Proses terlalu lama', '2026-05-18 03:15:31', NULL),
(5, 2, 'Fasilitas Kampus', 3, NULL, '2026-05-18 03:15:31', NULL),
(6, 37, NULL, 5, NULL, '2026-05-19 15:07:31', 'akademik'),
(7, 37, NULL, 2, NULL, '2026-05-19 15:07:31', 'perpustakaan'),
(8, 37, NULL, 5, NULL, '2026-05-19 15:07:31', 'keuangan'),
(9, 37, NULL, 3, NULL, '2026-05-19 15:07:31', 'kemahasiswaan'),
(10, 37, NULL, 3, NULL, '2026-05-19 15:07:31', 'fasilitas'),
(11, 38, 'Layanan Akademik', 5, NULL, '2026-05-19 15:21:23', 'akademik'),
(12, 38, 'Perpustakaan', 3, NULL, '2026-05-19 15:21:24', 'perpustakaan'),
(13, 38, 'Layanan Keuangan', 3, NULL, '2026-05-19 15:21:24', 'keuangan'),
(14, 38, 'Kemahasiswaan', 2, 'vhjgug', '2026-05-19 15:21:24', 'kemahasiswaan'),
(15, 38, 'Fasilitas Kampus', 3, NULL, '2026-05-19 15:21:24', 'fasilitas'),
(16, 39, 'Layanan Akademik', 3, NULL, '2026-05-20 03:19:00', 'akademik'),
(17, 39, 'Perpustakaan', 3, NULL, '2026-05-20 03:19:00', 'perpustakaan'),
(18, 39, 'Layanan Keuangan', 3, NULL, '2026-05-20 03:19:00', 'keuangan'),
(19, 39, 'Kemahasiswaan', 3, NULL, '2026-05-20 03:19:00', 'kemahasiswaan'),
(20, 39, 'Fasilitas Kampus', 3, NULL, '2026-05-20 03:19:00', 'fasilitas'),
(21, 40, 'Layanan Akademik', 3, NULL, '2026-05-20 03:32:45', 'akademik'),
(22, 40, 'Perpustakaan', 3, NULL, '2026-05-20 03:32:45', 'perpustakaan'),
(23, 40, 'Layanan Keuangan', 3, NULL, '2026-05-20 03:32:45', 'keuangan'),
(24, 40, 'Kemahasiswaan', 3, NULL, '2026-05-20 03:32:45', 'kemahasiswaan'),
(25, 40, 'Fasilitas Kampus', 3, NULL, '2026-05-20 03:32:45', 'fasilitas'),
(26, 41, 'Layanan Akademik', 3, NULL, '2026-05-22 02:05:22', 'akademik'),
(27, 41, 'Perpustakaan', 3, NULL, '2026-05-22 02:05:22', 'perpustakaan'),
(28, 41, 'Layanan Keuangan', 3, NULL, '2026-05-22 02:05:22', 'keuangan'),
(29, 41, 'Kemahasiswaan', 3, NULL, '2026-05-22 02:05:22', 'kemahasiswaan'),
(30, 41, 'Fasilitas Kampus', 3, NULL, '2026-05-22 02:05:22', 'fasilitas'),
(31, 42, 'Layanan Akademik', 5, NULL, '2026-05-22 07:57:55', 'akademik'),
(32, 42, 'Perpustakaan', 2, 'jelek', '2026-05-22 07:57:55', 'perpustakaan'),
(33, 42, 'Layanan Keuangan', 3, NULL, '2026-05-22 07:57:55', 'keuangan'),
(34, 42, 'Kemahasiswaan', 3, NULL, '2026-05-22 07:57:55', 'kemahasiswaan'),
(35, 42, 'Fasilitas Kampus', 3, NULL, '2026-05-22 07:57:55', 'fasilitas'),
(36, 43, 'Layanan Akademik', 3, NULL, '2026-05-22 08:00:04', 'akademik'),
(37, 43, 'Perpustakaan', 2, 'jelek', '2026-05-22 08:00:04', 'perpustakaan'),
(38, 43, 'Layanan Keuangan', 3, NULL, '2026-05-22 08:00:04', 'keuangan'),
(39, 43, 'Kemahasiswaan', 5, NULL, '2026-05-22 08:00:04', 'kemahasiswaan'),
(40, 43, 'Fasilitas Kampus', 5, NULL, '2026-05-22 08:00:04', 'fasilitas'),
(46, 45, 'Layanan Akademik', 5, NULL, '2026-05-22 09:34:13', 'akademik'),
(47, 45, 'Perpustakaan', 5, NULL, '2026-05-22 09:34:13', 'perpustakaan'),
(48, 45, 'Layanan Keuangan', 5, NULL, '2026-05-22 09:34:13', 'keuangan'),
(49, 45, 'Kemahasiswaan', 3, NULL, '2026-05-22 09:34:13', 'kemahasiswaan'),
(50, 45, 'Fasilitas Kampus', 3, NULL, '2026-05-22 09:34:13', 'fasilitas'),
(51, 46, 'Layanan Akademik', 5, NULL, '2026-05-22 09:47:42', 'akademik'),
(52, 46, 'Perpustakaan', 3, NULL, '2026-05-22 09:47:42', 'perpustakaan'),
(53, 46, 'Layanan Keuangan', 3, NULL, '2026-05-22 09:47:42', 'keuangan'),
(54, 46, 'Kemahasiswaan', 3, NULL, '2026-05-22 09:47:42', 'kemahasiswaan'),
(55, 46, 'Fasilitas Kampus', 3, NULL, '2026-05-22 09:47:42', 'fasilitas'),
(56, 47, 'Layanan Akademik', 3, NULL, '2026-05-22 10:01:08', 'akademik'),
(57, 47, 'Perpustakaan', 3, NULL, '2026-05-22 10:01:08', 'perpustakaan'),
(58, 47, 'Layanan Keuangan', 3, NULL, '2026-05-22 10:01:08', 'keuangan'),
(59, 47, 'Kemahasiswaan', 3, NULL, '2026-05-22 10:01:08', 'kemahasiswaan'),
(60, 47, 'Fasilitas Kampus', 3, NULL, '2026-05-22 10:01:08', 'fasilitas'),
(61, 48, 'Layanan Akademik', 1, 'jelek', '2026-05-22 10:11:54', 'akademik'),
(62, 48, 'Perpustakaan', 1, 'jelek\n', '2026-05-22 10:11:54', 'perpustakaan'),
(63, 48, 'Layanan Keuangan', 1, 'jelek', '2026-05-22 10:11:54', 'keuangan'),
(64, 48, 'Kemahasiswaan', 1, 'jelek', '2026-05-22 10:11:54', 'kemahasiswaan'),
(65, 48, 'Fasilitas Kampus', 1, 'jlek', '2026-05-22 10:11:54', 'fasilitas'),
(68, 50, 'Layanan Akademik', 5, NULL, '2026-05-22 10:25:31', 'akademik'),
(69, 50, 'Perpustakaan', 3, NULL, '2026-05-22 10:25:31', 'perpustakaan'),
(70, 50, 'Layanan Keuangan', 5, NULL, '2026-05-22 10:25:31', 'keuangan'),
(71, 50, 'Kemahasiswaan', 5, NULL, '2026-05-22 10:25:31', 'kemahasiswaan'),
(72, 50, 'Fasilitas Kampus', 3, NULL, '2026-05-22 10:25:31', 'fasilitas'),
(73, 51, 'Layanan Akademik', 3, NULL, '2026-05-22 15:44:44', 'akademik'),
(74, 51, 'Perpustakaan', 3, NULL, '2026-05-22 15:44:44', 'perpustakaan'),
(75, 51, 'Layanan Keuangan', 3, NULL, '2026-05-22 15:44:44', 'keuangan'),
(76, 51, 'Kemahasiswaan', 3, NULL, '2026-05-22 15:44:44', 'kemahasiswaan'),
(77, 51, 'Fasilitas Kampus', 3, NULL, '2026-05-22 15:44:44', 'fasilitas'),
(78, 52, 'Layanan Akademik', 3, NULL, '2026-05-22 15:45:16', 'akademik'),
(79, 52, 'Perpustakaan', 3, NULL, '2026-05-22 15:45:16', 'perpustakaan'),
(80, 52, 'Layanan Keuangan', 3, NULL, '2026-05-22 15:45:16', 'keuangan'),
(81, 52, 'Kemahasiswaan', 3, NULL, '2026-05-22 15:45:16', 'kemahasiswaan'),
(82, 52, 'Fasilitas Kampus', 3, NULL, '2026-05-22 15:45:16', 'fasilitas'),
(83, 53, 'Layanan Akademik', 3, NULL, '2026-05-22 16:53:10', 'akademik'),
(84, 53, 'Perpustakaan', 3, NULL, '2026-05-22 16:53:10', 'perpustakaan'),
(85, 53, 'Layanan Keuangan', 3, NULL, '2026-05-22 16:53:10', 'keuangan'),
(86, 53, 'Kemahasiswaan', 3, NULL, '2026-05-22 16:53:10', 'kemahasiswaan'),
(87, 53, 'Fasilitas Kampus', 3, NULL, '2026-05-22 16:53:10', 'fasilitas'),
(88, 54, 'Layanan Akademik', 3, NULL, '2026-05-22 16:53:30', 'akademik'),
(89, 54, 'Perpustakaan', 3, NULL, '2026-05-22 16:53:30', 'perpustakaan'),
(90, 54, 'Layanan Keuangan', 3, NULL, '2026-05-22 16:53:30', 'keuangan'),
(91, 54, 'Kemahasiswaan', 3, NULL, '2026-05-22 16:53:30', 'kemahasiswaan'),
(92, 54, 'Fasilitas Kampus', 3, NULL, '2026-05-22 16:53:30', 'fasilitas'),
(93, 55, 'Layanan Akademik', 3, NULL, '2026-05-22 16:59:48', 'akademik'),
(94, 55, 'Perpustakaan', 3, NULL, '2026-05-22 16:59:48', 'perpustakaan'),
(95, 55, 'Layanan Keuangan', 3, NULL, '2026-05-22 16:59:48', 'keuangan'),
(96, 55, 'Kemahasiswaan', 3, NULL, '2026-05-22 16:59:48', 'kemahasiswaan'),
(97, 55, 'Fasilitas Kampus', 3, NULL, '2026-05-22 16:59:48', 'fasilitas'),
(98, 56, 'Layanan Akademik', 3, NULL, '2026-05-22 16:59:59', 'akademik'),
(99, 56, 'Perpustakaan', 3, NULL, '2026-05-22 16:59:59', 'perpustakaan'),
(100, 56, 'Layanan Keuangan', 3, NULL, '2026-05-22 16:59:59', 'keuangan'),
(101, 56, 'Kemahasiswaan', 3, NULL, '2026-05-22 16:59:59', 'kemahasiswaan'),
(102, 56, 'Fasilitas Kampus', 3, NULL, '2026-05-22 16:59:59', 'fasilitas'),
(103, 57, 'Layanan Akademik', 3, NULL, '2026-05-22 17:00:06', 'akademik'),
(104, 57, 'Perpustakaan', 3, NULL, '2026-05-22 17:00:06', 'perpustakaan'),
(105, 57, 'Layanan Keuangan', 3, NULL, '2026-05-22 17:00:06', 'keuangan'),
(106, 57, 'Kemahasiswaan', 3, NULL, '2026-05-22 17:00:06', 'kemahasiswaan'),
(107, 57, 'Fasilitas Kampus', 3, NULL, '2026-05-22 17:00:06', 'fasilitas'),
(108, 58, 'Layanan Akademik', 3, NULL, '2026-05-22 17:00:13', 'akademik'),
(109, 58, 'Perpustakaan', 3, NULL, '2026-05-22 17:00:13', 'perpustakaan'),
(110, 58, 'Layanan Keuangan', 3, NULL, '2026-05-22 17:00:13', 'keuangan'),
(111, 58, 'Kemahasiswaan', 3, NULL, '2026-05-22 17:00:13', 'kemahasiswaan'),
(112, 58, 'Fasilitas Kampus', 3, NULL, '2026-05-22 17:00:13', 'fasilitas'),
(113, 59, 'Layanan Akademik', 3, NULL, '2026-05-22 17:02:48', 'akademik'),
(114, 59, 'Perpustakaan', 3, NULL, '2026-05-22 17:02:48', 'perpustakaan'),
(115, 59, 'Layanan Keuangan', 3, NULL, '2026-05-22 17:02:48', 'keuangan'),
(116, 59, 'Kemahasiswaan', 3, NULL, '2026-05-22 17:02:48', 'kemahasiswaan'),
(117, 59, 'Fasilitas Kampus', 3, NULL, '2026-05-22 17:02:48', 'fasilitas'),
(118, 60, 'Layanan Akademik', 3, NULL, '2026-05-22 17:03:04', 'akademik'),
(119, 60, 'Perpustakaan', 3, NULL, '2026-05-22 17:03:04', 'perpustakaan'),
(120, 60, 'Layanan Keuangan', 3, NULL, '2026-05-22 17:03:04', 'keuangan'),
(121, 60, 'Kemahasiswaan', 3, NULL, '2026-05-22 17:03:04', 'kemahasiswaan'),
(122, 60, 'Fasilitas Kampus', 3, NULL, '2026-05-22 17:03:04', 'fasilitas'),
(123, 61, 'Layanan Akademik', 5, NULL, '2026-05-23 12:12:01', 'akademik'),
(124, 61, 'Perpustakaan', 1, 'vhjhbjhhgujhu', '2026-05-23 12:12:01', 'perpustakaan'),
(125, 61, 'Layanan Keuangan', 1, 'huhkhkihik', '2026-05-23 12:12:01', 'keuangan'),
(126, 61, 'Kemahasiswaan', 1, ' nb jbjknbkj', '2026-05-23 12:12:01', 'kemahasiswaan'),
(127, 61, 'Fasilitas Kampus', 3, NULL, '2026-05-23 12:12:01', 'fasilitas'),
(128, 62, 'Layanan Akademik', 3, NULL, '2026-05-23 12:28:58', 'akademik'),
(129, 62, 'Perpustakaan', 3, NULL, '2026-05-23 12:28:58', 'perpustakaan'),
(130, 62, 'Layanan Keuangan', 3, NULL, '2026-05-23 12:28:58', 'keuangan'),
(131, 62, 'Kemahasiswaan', 3, NULL, '2026-05-23 12:28:58', 'kemahasiswaan'),
(132, 62, 'Fasilitas Kampus', 3, NULL, '2026-05-23 12:28:58', 'fasilitas'),
(133, 63, 'Layanan Akademik', 3, NULL, '2026-05-23 12:29:22', 'akademik'),
(134, 63, 'Perpustakaan', 3, NULL, '2026-05-23 12:29:22', 'perpustakaan'),
(135, 63, 'Layanan Keuangan', 3, NULL, '2026-05-23 12:29:22', 'keuangan'),
(136, 63, 'Kemahasiswaan', 3, NULL, '2026-05-23 12:29:22', 'kemahasiswaan'),
(137, 63, 'Fasilitas Kampus', 3, NULL, '2026-05-23 12:29:22', 'fasilitas'),
(138, 64, 'Layanan Akademik', 3, NULL, '2026-05-23 23:08:10', 'akademik'),
(139, 64, 'Perpustakaan', 5, NULL, '2026-05-23 23:08:10', 'perpustakaan'),
(140, 64, 'Layanan Keuangan', 2, 'bbkh', '2026-05-23 23:08:10', 'keuangan'),
(141, 64, 'Kemahasiswaan', 3, NULL, '2026-05-23 23:08:10', 'kemahasiswaan'),
(142, 64, 'Fasilitas Kampus', 5, NULL, '2026-05-23 23:08:10', 'fasilitas'),
(143, 65, 'Layanan Akademik', 3, NULL, '2026-05-23 23:08:41', 'akademik'),
(144, 65, 'Perpustakaan', 3, NULL, '2026-05-23 23:08:41', 'perpustakaan'),
(145, 65, 'Layanan Keuangan', 3, NULL, '2026-05-23 23:08:41', 'keuangan'),
(146, 65, 'Kemahasiswaan', 3, NULL, '2026-05-23 23:08:41', 'kemahasiswaan'),
(147, 65, 'Fasilitas Kampus', 3, NULL, '2026-05-23 23:08:41', 'fasilitas'),
(148, 66, 'Layanan Akademik', 3, NULL, '2026-05-23 23:08:52', 'akademik'),
(149, 66, 'Perpustakaan', 3, NULL, '2026-05-23 23:08:52', 'perpustakaan'),
(150, 66, 'Layanan Keuangan', 3, NULL, '2026-05-23 23:08:52', 'keuangan'),
(151, 66, 'Kemahasiswaan', 3, NULL, '2026-05-23 23:08:52', 'kemahasiswaan'),
(152, 66, 'Fasilitas Kampus', 3, NULL, '2026-05-23 23:08:52', 'fasilitas'),
(153, 67, 'Layanan Akademik', 3, NULL, '2026-05-24 04:53:07', 'akademik'),
(154, 67, 'Perpustakaan', 2, 'kurang', '2026-05-24 04:53:07', 'perpustakaan'),
(155, 67, 'Layanan Keuangan', 3, NULL, '2026-05-24 04:53:07', 'keuangan'),
(156, 67, 'Kemahasiswaan', 3, NULL, '2026-05-24 04:53:07', 'kemahasiswaan'),
(157, 67, 'Fasilitas Kampus', 3, NULL, '2026-05-24 04:53:07', 'fasilitas'),
(158, 68, 'Layanan Akademik', 3, NULL, '2026-05-24 04:54:08', 'akademik'),
(159, 68, 'Perpustakaan', 3, NULL, '2026-05-24 04:54:08', 'perpustakaan'),
(160, 68, 'Layanan Keuangan', 3, NULL, '2026-05-24 04:54:08', 'keuangan'),
(161, 68, 'Kemahasiswaan', 3, NULL, '2026-05-24 04:54:08', 'kemahasiswaan'),
(162, 68, 'Fasilitas Kampus', 1, 'minus', '2026-05-24 04:54:08', 'fasilitas'),
(163, 69, 'Layanan Akademik', 5, NULL, '2026-05-24 10:23:40', 'akademik'),
(164, 69, 'Perpustakaan', 3, NULL, '2026-05-24 10:23:40', 'perpustakaan'),
(165, 69, 'Layanan Keuangan', 3, NULL, '2026-05-24 10:23:40', 'keuangan'),
(166, 69, 'Kemahasiswaan', 3, NULL, '2026-05-24 10:23:40', 'kemahasiswaan'),
(167, 69, 'Fasilitas Kampus', 3, NULL, '2026-05-24 10:23:40', 'fasilitas'),
(168, 70, 'Layanan Akademik', 5, NULL, '2026-05-24 12:35:50', 'akademik'),
(169, 70, 'Perpustakaan', 5, NULL, '2026-05-24 12:35:51', 'perpustakaan'),
(170, 70, 'Layanan Keuangan', 3, NULL, '2026-05-24 12:35:51', 'keuangan'),
(171, 70, 'Kemahasiswaan', 5, NULL, '2026-05-24 12:35:51', 'kemahasiswaan'),
(172, 70, 'Fasilitas Kampus', 5, NULL, '2026-05-24 12:35:51', 'fasilitas'),
(173, 71, 'Layanan Akademik', 3, NULL, '2026-05-26 14:31:20', 'akademik'),
(174, 71, 'Perpustakaan', 5, NULL, '2026-05-26 14:31:20', 'perpustakaan'),
(175, 71, 'Layanan Keuangan', 3, NULL, '2026-05-26 14:31:20', 'keuangan'),
(176, 71, 'Kemahasiswaan', 3, NULL, '2026-05-26 14:31:20', 'kemahasiswaan'),
(177, 71, 'Fasilitas Kampus', 3, NULL, '2026-05-26 14:31:20', 'fasilitas'),
(178, 72, 'Layanan Akademik', 3, NULL, '2026-05-26 17:32:31', 'akademik'),
(179, 72, 'Perpustakaan', 3, NULL, '2026-05-26 17:32:31', 'perpustakaan'),
(180, 72, 'Layanan Keuangan', 3, NULL, '2026-05-26 17:32:31', 'keuangan'),
(181, 72, 'Kemahasiswaan', 3, NULL, '2026-05-26 17:32:31', 'kemahasiswaan'),
(182, 72, 'Fasilitas Kampus', 3, NULL, '2026-05-26 17:32:31', 'fasilitas'),
(183, 73, 'Layanan Akademik', 5, NULL, '2026-05-29 17:14:06', 'akademik'),
(184, 73, 'Perpustakaan', 3, NULL, '2026-05-29 17:14:06', 'perpustakaan'),
(185, 73, 'Layanan Keuangan', 3, NULL, '2026-05-29 17:14:06', 'keuangan'),
(186, 73, 'Kemahasiswaan', 3, NULL, '2026-05-29 17:14:06', 'kemahasiswaan'),
(187, 73, 'Fasilitas Kampus', 5, NULL, '2026-05-29 17:14:06', 'fasilitas'),
(188, 74, 'Layanan Akademik', 2, 'bbjbjkbj', '2026-05-30 06:37:39', 'akademik'),
(189, 74, 'Perpustakaan', 5, NULL, '2026-05-30 06:37:39', 'perpustakaan'),
(190, 74, 'Layanan Keuangan', 4, NULL, '2026-05-30 06:37:39', 'keuangan'),
(191, 74, 'Kemahasiswaan', 3, NULL, '2026-05-30 06:37:39', 'kemahasiswaan'),
(192, 74, 'Fasilitas Kampus', 3, NULL, '2026-05-30 06:37:39', 'fasilitas'),
(193, 75, 'Layanan Akademik', 5, NULL, '2026-05-30 13:43:55', 'akademik'),
(194, 75, 'Perpustakaan', 3, NULL, '2026-05-30 13:43:55', 'perpustakaan'),
(195, 75, 'Layanan Keuangan', 3, NULL, '2026-05-30 13:43:55', 'keuangan'),
(196, 75, 'Kemahasiswaan', 3, NULL, '2026-05-30 13:43:56', 'kemahasiswaan'),
(197, 75, 'Fasilitas Kampus', 3, NULL, '2026-05-30 13:43:56', 'fasilitas'),
(198, 76, 'Layanan Akademik', 3, NULL, '2026-05-30 13:45:26', 'akademik'),
(199, 76, 'Perpustakaan', 3, NULL, '2026-05-30 13:45:26', 'perpustakaan'),
(200, 76, 'Layanan Keuangan', 3, NULL, '2026-05-30 13:45:26', 'keuangan'),
(201, 76, 'Kemahasiswaan', 3, NULL, '2026-05-30 13:45:26', 'kemahasiswaan'),
(202, 76, 'Fasilitas Kampus', 3, NULL, '2026-05-30 13:45:26', 'fasilitas'),
(203, 77, 'Layanan Akademik', 3, NULL, '2026-05-30 13:50:47', 'akademik'),
(204, 77, 'Perpustakaan', 5, NULL, '2026-05-30 13:50:47', 'perpustakaan'),
(205, 77, 'Layanan Keuangan', 3, NULL, '2026-05-30 13:50:47', 'keuangan'),
(206, 77, 'Kemahasiswaan', 3, NULL, '2026-05-30 13:50:47', 'kemahasiswaan'),
(207, 77, 'Fasilitas Kampus', 3, NULL, '2026-05-30 13:50:47', 'fasilitas'),
(208, 78, 'Layanan Akademik', 3, NULL, '2026-05-30 13:55:37', 'akademik'),
(209, 78, 'Perpustakaan', 3, NULL, '2026-05-30 13:55:37', 'perpustakaan'),
(210, 78, 'Layanan Keuangan', 5, NULL, '2026-05-30 13:55:37', 'keuangan'),
(211, 78, 'Kemahasiswaan', 3, NULL, '2026-05-30 13:55:37', 'kemahasiswaan'),
(212, 78, 'Fasilitas Kampus', 3, NULL, '2026-05-30 13:55:37', 'fasilitas'),
(213, 79, 'Layanan Akademik', 4, NULL, '2026-06-03 03:50:05', 'akademik'),
(214, 79, 'Perpustakaan', 3, NULL, '2026-06-03 03:50:05', 'perpustakaan'),
(215, 79, 'Layanan Keuangan', 3, NULL, '2026-06-03 03:50:05', 'keuangan'),
(216, 79, 'Kemahasiswaan', 3, NULL, '2026-06-03 03:50:05', 'kemahasiswaan'),
(217, 79, 'Fasilitas Kampus', 3, NULL, '2026-06-03 03:50:05', 'fasilitas'),
(218, 80, 'Layanan Akademik', 3, NULL, '2026-06-03 04:24:38', 'akademik'),
(219, 80, 'Perpustakaan', 3, NULL, '2026-06-03 04:24:38', 'perpustakaan'),
(220, 80, 'Layanan Keuangan', 3, NULL, '2026-06-03 04:24:38', 'keuangan'),
(221, 80, 'Kemahasiswaan', 3, NULL, '2026-06-03 04:24:38', 'kemahasiswaan'),
(222, 80, 'Fasilitas Kampus', 3, NULL, '2026-06-03 04:24:39', 'fasilitas'),
(223, 81, 'Layanan Akademik', 5, NULL, '2026-06-06 05:48:30', 'akademik'),
(224, 81, 'Perpustakaan', 5, NULL, '2026-06-06 05:48:30', 'perpustakaan'),
(225, 81, 'Layanan Keuangan', 3, NULL, '2026-06-06 05:48:30', 'keuangan'),
(226, 81, 'Kemahasiswaan', 3, NULL, '2026-06-06 05:48:30', 'kemahasiswaan'),
(227, 81, 'Fasilitas Kampus', 3, NULL, '2026-06-06 05:48:30', 'fasilitas'),
(228, 82, 'Layanan Akademik', 5, NULL, '2026-06-07 02:36:52', 'akademik'),
(229, 82, 'Perpustakaan', 3, NULL, '2026-06-07 02:36:52', 'perpustakaan'),
(230, 82, 'Layanan Keuangan', 3, NULL, '2026-06-07 02:36:52', 'keuangan'),
(231, 82, 'Kemahasiswaan', 2, 'djjeksncnnekwks', '2026-06-07 02:36:52', 'kemahasiswaan'),
(232, 82, 'Fasilitas Kampus', 5, NULL, '2026-06-07 02:36:52', 'fasilitas'),
(233, 83, 'Layanan Akademik', 3, NULL, '2026-06-07 04:04:29', 'akademik'),
(234, 83, 'Perpustakaan', 5, NULL, '2026-06-07 04:04:29', 'perpustakaan'),
(235, 83, 'Layanan Keuangan', 4, NULL, '2026-06-07 04:04:29', 'keuangan'),
(236, 83, 'Kemahasiswaan', 3, NULL, '2026-06-07 04:04:29', 'kemahasiswaan'),
(237, 83, 'Fasilitas Kampus', 3, NULL, '2026-06-07 04:04:29', 'fasilitas');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `jurusan`
--
ALTER TABLE `jurusan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode` (`kode`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sentiment_analysis`
--
ALTER TABLE `sentiment_analysis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `survey_id` (`survey_id`);

--
-- Indexes for table `surveys`
--
ALTER TABLE `surveys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `survey_responses`
--
ALTER TABLE `survey_responses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_survey` (`survey_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jurusan`
--
ALTER TABLE `jurusan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `sentiment_analysis`
--
ALTER TABLE `sentiment_analysis`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `surveys`
--
ALTER TABLE `surveys`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `survey_responses`
--
ALTER TABLE `survey_responses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=238;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sentiment_analysis`
--
ALTER TABLE `sentiment_analysis`
  ADD CONSTRAINT `sentiment_analysis_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `survey_responses`
--
ALTER TABLE `survey_responses`
  ADD CONSTRAINT `fk_survey` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `survey_responses_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
