-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2026 at 08:39 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `learniverse`
--

-- --------------------------------------------------------

--
-- Table structure for table `attempts`
--

CREATE TABLE `attempts` (
  `id` int(11) NOT NULL,
  `student_id` varchar(8) NOT NULL,
  `level` enum('easy','medium','hard') NOT NULL,
  `set_number` int(11) DEFAULT 1,
  `current_question` int(11) DEFAULT 0,
  `score` int(11) DEFAULT 0,
  `total_questions` int(11) DEFAULT 0,
  `percentage` float DEFAULT 0,
  `status` enum('in_progress','completed') DEFAULT 'in_progress',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `attempts`
--

INSERT INTO `attempts` (`id`, `student_id`, `level`, `set_number`, `current_question`, `score`, `total_questions`, `percentage`, `status`, `created_at`, `updated_at`) VALUES
(1, 'S3269', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-07 18:01:41', '2026-05-07 18:01:41'),
(2, 'S3269', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-07 18:01:41', '2026-05-07 18:01:41'),
(3, 'S3269', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-07 18:01:41', '2026-05-07 18:01:41'),
(4, 'S3269', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-07 18:02:01', '2026-05-07 18:02:01'),
(5, 'S3269', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-07 18:02:01', '2026-05-07 18:02:01'),
(6, 'S3269', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-07 18:02:01', '2026-05-07 18:02:01'),
(7, 's830', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-07 18:08:45', '2026-05-07 18:08:45'),
(8, 's830', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-07 18:08:45', '2026-05-07 18:08:45'),
(9, 'S1554', 'easy', 1, 5, 0, 5, 0, 'completed', '2026-05-08 14:45:52', '2026-05-08 14:45:52'),
(10, 'S1554', 'easy', 1, 5, 0, 5, 0, 'completed', '2026-05-08 14:45:52', '2026-05-08 14:45:52'),
(11, 's1554', 'easy', 1, 5, 0, 5, 0, 'completed', '2026-05-08 15:13:03', '2026-05-08 15:13:03'),
(12, 's1554', 'easy', 1, 5, 0, 5, 0, 'completed', '2026-05-08 15:13:03', '2026-05-08 15:13:03'),
(13, 'S2147', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 17:06:01', '2026-05-08 17:06:01'),
(14, 'S2147', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 17:06:01', '2026-05-08 17:06:01'),
(15, 'S2147', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 17:06:02', '2026-05-08 17:06:02'),
(16, 'S4975', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 19:45:39', '2026-05-08 19:45:39'),
(17, 'S4975', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 19:45:39', '2026-05-08 19:45:39'),
(18, 'S4975', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 19:59:32', '2026-05-08 19:59:32'),
(19, 'S4975', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 19:59:32', '2026-05-08 19:59:32'),
(20, 's1272', 'easy', 1, 5, 3, 5, 60, 'completed', '2026-05-08 20:04:41', '2026-05-08 20:04:41'),
(21, 's1272', 'easy', 1, 5, 3, 5, 60, 'completed', '2026-05-08 20:04:41', '2026-05-08 20:04:41'),
(22, 's1272', 'easy', 1, 5, 3, 5, 60, 'completed', '2026-05-08 20:04:41', '2026-05-08 20:04:41'),
(23, 's1272', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:05:12', '2026-05-08 20:05:12'),
(24, 's1272', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:05:13', '2026-05-08 20:05:13'),
(25, 's1272', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:05:13', '2026-05-08 20:05:13'),
(26, 's1272', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:06:14', '2026-05-08 20:06:14'),
(27, 's1272', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:06:15', '2026-05-08 20:06:15'),
(28, 's1272', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:06:15', '2026-05-08 20:06:15'),
(29, 's1272', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:06:51', '2026-05-08 20:06:51'),
(30, 's1272', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:06:51', '2026-05-08 20:06:51'),
(31, 's4635', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:10:08', '2026-05-08 20:10:08'),
(32, 's4635', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:10:08', '2026-05-08 20:10:08'),
(33, 's4635', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:10:08', '2026-05-08 20:10:08'),
(34, 's4635', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:10:37', '2026-05-08 20:10:37'),
(35, 's4635', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:10:37', '2026-05-08 20:10:37'),
(36, 's4635', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:10:37', '2026-05-08 20:10:37'),
(37, 's4635', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:11:24', '2026-05-08 20:11:24'),
(38, 's4635', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:11:24', '2026-05-08 20:11:24'),
(39, 's4635', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:11:24', '2026-05-08 20:11:24'),
(40, 's4635', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:13:17', '2026-05-08 20:13:17'),
(41, 's4635', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:13:17', '2026-05-08 20:13:17'),
(42, 's962', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:23:15', '2026-05-08 20:23:15'),
(43, 's962', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:23:15', '2026-05-08 20:23:15'),
(44, 's962', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:23:15', '2026-05-08 20:23:15'),
(45, 's962', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:23:33', '2026-05-08 20:23:33'),
(46, 's962', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:23:33', '2026-05-08 20:23:33'),
(47, 's962', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:24:27', '2026-05-08 20:24:27'),
(48, 's962', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:24:27', '2026-05-08 20:24:27'),
(49, 's962', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:25:24', '2026-05-08 20:25:24'),
(50, 's962', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:25:24', '2026-05-08 20:25:24'),
(51, 's962', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:25:24', '2026-05-08 20:25:24'),
(52, 's962', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:25:33', '2026-05-08 20:25:33'),
(53, 's962', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:25:33', '2026-05-08 20:25:33'),
(54, 's962', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:29:00', '2026-05-08 20:29:00'),
(55, 's962', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:29:00', '2026-05-08 20:29:00'),
(56, 's962', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:29:00', '2026-05-08 20:29:00'),
(57, 's962', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:29:40', '2026-05-08 20:29:40'),
(58, 's962', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:29:40', '2026-05-08 20:29:40'),
(59, 's2658', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:34:13', '2026-05-08 20:34:13'),
(60, 's2658', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:34:13', '2026-05-08 20:34:13'),
(61, 's2658', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:36:05', '2026-05-08 20:36:05'),
(62, 's2658', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-08 20:36:05', '2026-05-08 20:36:05'),
(63, 's2658', 'hard', 1, 5, 3, 5, 60, 'completed', '2026-05-08 20:39:11', '2026-05-08 20:39:11'),
(64, 's2658', 'hard', 1, 5, 3, 5, 60, 'completed', '2026-05-08 20:39:11', '2026-05-08 20:39:11'),
(65, 's2658', 'hard', 1, 5, 3, 5, 60, 'completed', '2026-05-08 20:41:46', '2026-05-08 20:41:46'),
(66, 's2658', 'hard', 1, 5, 3, 5, 60, 'completed', '2026-05-08 20:41:46', '2026-05-08 20:41:46'),
(67, 's2658', 'hard', 1, 5, 3, 5, 60, 'completed', '2026-05-08 20:42:13', '2026-05-08 20:42:13'),
(68, 's2658', 'hard', 1, 5, 3, 5, 60, 'completed', '2026-05-08 20:42:13', '2026-05-08 20:42:13'),
(69, 'S3017', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 22:50:40', '2026-05-08 22:50:40'),
(70, 'S3017', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 22:50:41', '2026-05-08 22:50:41'),
(71, 'S3017', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 22:50:41', '2026-05-08 22:50:41'),
(72, 'S3017', 'medium', 1, 5, 4, 5, 80, 'completed', '2026-05-08 22:52:23', '2026-05-08 22:52:23'),
(73, 'S3017', 'medium', 1, 5, 4, 5, 80, 'completed', '2026-05-08 22:52:24', '2026-05-08 22:52:24'),
(74, 'S3017', 'medium', 1, 5, 4, 5, 80, 'completed', '2026-05-08 22:52:24', '2026-05-08 22:52:24'),
(75, 'S3017', 'medium', 1, 5, 4, 5, 80, 'completed', '2026-05-08 22:52:24', '2026-05-08 22:52:24'),
(76, 'S3017', 'hard', 1, 5, 3, 5, 60, 'completed', '2026-05-08 22:58:07', '2026-05-08 22:58:07'),
(77, 'S3017', 'hard', 1, 5, 3, 5, 60, 'completed', '2026-05-08 22:58:07', '2026-05-08 22:58:07'),
(78, 'S3017', 'hard', 1, 5, 3, 5, 60, 'completed', '2026-05-08 22:58:07', '2026-05-08 22:58:07'),
(79, 'S3017', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 22:59:43', '2026-05-08 22:59:43'),
(80, 'S3017', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 22:59:43', '2026-05-08 22:59:43'),
(81, 'S3017', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 22:59:43', '2026-05-08 22:59:43'),
(82, 'S3017', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 23:00:58', '2026-05-08 23:00:58'),
(83, 'S3017', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 23:00:58', '2026-05-08 23:00:58'),
(84, 's4854', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 23:05:08', '2026-05-08 23:05:08'),
(85, 's4854', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 23:05:08', '2026-05-08 23:05:08'),
(86, 's4854', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-08 23:05:08', '2026-05-08 23:05:08'),
(87, 's4854', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-08 23:05:21', '2026-05-08 23:05:21'),
(88, 's4854', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-08 23:05:21', '2026-05-08 23:05:21'),
(89, 's4854', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-08 23:05:21', '2026-05-08 23:05:21'),
(90, 's4854', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 23:06:02', '2026-05-08 23:06:02'),
(91, 's4854', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 23:06:02', '2026-05-08 23:06:02'),
(92, 's4854', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 23:06:02', '2026-05-08 23:06:02'),
(93, 's4854', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 23:09:50', '2026-05-08 23:09:50'),
(94, 's4854', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-08 23:09:50', '2026-05-08 23:09:50'),
(95, 's3017', 'medium', 1, 5, 0, 5, 0, 'completed', '2026-05-09 01:01:51', '2026-05-09 01:01:51'),
(96, 's3017', 'medium', 1, 5, 0, 5, 0, 'completed', '2026-05-09 01:01:51', '2026-05-09 01:01:51'),
(97, 's3017', 'medium', 1, 5, 0, 5, 0, 'completed', '2026-05-09 01:01:51', '2026-05-09 01:01:51'),
(98, 's3017', 'medium', 1, 5, 0, 5, 0, 'completed', '2026-05-09 01:01:51', '2026-05-09 01:01:51'),
(99, 's3017', 'hard', 1, 5, 0, 5, 0, 'completed', '2026-05-09 01:06:19', '2026-05-09 01:06:19'),
(100, 's3017', 'hard', 1, 5, 0, 5, 0, 'completed', '2026-05-09 01:06:19', '2026-05-09 01:06:19'),
(101, 's3017', 'hard', 1, 5, 0, 5, 0, 'completed', '2026-05-09 01:06:19', '2026-05-09 01:06:19'),
(102, 's3017', 'hard', 1, 5, 0, 5, 0, 'completed', '2026-05-09 01:06:19', '2026-05-09 01:06:19'),
(103, 'S4005', 'medium', 1, 5, 0, 5, 0, 'completed', '2026-05-09 11:05:08', '2026-05-09 11:05:08'),
(104, 'S4005', 'medium', 1, 5, 0, 5, 0, 'completed', '2026-05-09 11:05:08', '2026-05-09 11:05:08'),
(105, 'S4005', 'medium', 1, 5, 0, 5, 0, 'completed', '2026-05-09 11:05:13', '2026-05-09 11:05:13'),
(106, 'S4005', 'medium', 1, 5, 0, 5, 0, 'completed', '2026-05-09 11:05:14', '2026-05-09 11:05:14'),
(107, 's1554', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-10 00:11:46', '2026-05-10 00:11:46'),
(108, 's1554', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-10 00:11:46', '2026-05-10 00:11:46'),
(109, 'S3017', 'easy', 1, 5, 0, 5, 0, 'completed', '2026-05-10 13:31:00', '2026-05-10 13:31:00'),
(110, 'S3017', 'easy', 1, 5, 0, 5, 0, 'completed', '2026-05-10 13:31:00', '2026-05-10 13:31:00'),
(111, 'S3017', 'easy', 1, 5, 0, 5, 0, 'completed', '2026-05-10 14:32:23', '2026-05-10 14:32:23'),
(112, 'S3017', 'easy', 1, 5, 0, 5, 0, 'completed', '2026-05-10 14:32:23', '2026-05-10 14:32:23'),
(113, 'S3017', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-10 14:41:14', '2026-05-10 14:41:14'),
(114, 'S3017', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-10 14:41:14', '2026-05-10 14:41:14'),
(115, 'S3017', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-10 14:41:14', '2026-05-10 14:41:14'),
(116, 'S3017', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-10 14:41:59', '2026-05-10 14:41:59'),
(117, 'S3017', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-10 14:42:00', '2026-05-10 14:42:00'),
(118, 'S3017', 'medium', 1, 5, 5, 5, 100, 'completed', '2026-05-10 14:42:00', '2026-05-10 14:42:00'),
(119, 'S3017', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-10 14:42:57', '2026-05-10 14:42:57'),
(120, 'S3017', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-10 14:42:57', '2026-05-10 14:42:57'),
(121, 'S3017', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-10 14:42:57', '2026-05-10 14:42:57'),
(122, 'S3017', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-10 14:44:18', '2026-05-10 14:44:18'),
(123, 'S3017', 'hard', 1, 5, 5, 5, 100, 'completed', '2026-05-10 14:44:18', '2026-05-10 14:44:18'),
(124, 's1554', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-10 14:46:36', '2026-05-10 14:46:36'),
(125, 's1554', 'easy', 1, 5, 5, 5, 100, 'completed', '2026-05-10 14:46:36', '2026-05-10 14:46:36'),
(126, 's1554', 'medium', 1, 5, 4, 5, 80, 'completed', '2026-05-10 14:47:47', '2026-05-10 14:47:47'),
(127, 's1554', 'medium', 1, 5, 4, 5, 80, 'completed', '2026-05-10 14:47:47', '2026-05-10 14:47:47');

-- --------------------------------------------------------

--
-- Table structure for table `attempts_ks2`
--

CREATE TABLE `attempts_ks2` (
  `id` int(11) NOT NULL,
  `student_id` varchar(8) NOT NULL,
  `level` varchar(20) NOT NULL,
  `topic` varchar(50) NOT NULL,
  `score` int(11) NOT NULL,
  `total_questions` int(11) NOT NULL,
  `percentage` decimal(5,2) NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `attempts_ks2`
--

INSERT INTO `attempts_ks2` (`id`, `student_id`, `level`, `topic`, `score`, `total_questions`, `percentage`, `status`, `created_at`) VALUES
(1, 'S1554', 'easy', 'place_value', 5, 5, 100.00, 'completed', '2026-05-07 16:34:31'),
(2, 'S1554', 'medium', 'arrays', 5, 5, 100.00, 'completed', '2026-05-07 16:34:55'),
(3, 's830', 'easy', 'place_value', 5, 5, 100.00, 'completed', '2026-05-07 18:08:45'),
(4, 'S1554', 'easy', 'place_value', 0, 5, 0.00, 'completed', '2026-05-08 14:44:33'),
(5, 'S1554', 'easy', 'place_value', 0, 5, 0.00, 'completed', '2026-05-08 14:44:40'),
(6, 's1554', 'easy', 'place_value', 0, 5, 0.00, 'completed', '2026-05-08 15:13:03'),
(7, 's1554', 'easy', 'place_value', 0, 5, 0.00, 'completed', '2026-05-08 15:13:03'),
(8, 'S4975', 'easy', 'place_value', 5, 5, 100.00, 'completed', '2026-05-08 19:45:39'),
(9, 's2658', 'easy', 'place_value', 5, 5, 100.00, 'completed', '2026-05-08 20:34:13'),
(10, 's2658', 'medium', 'arrays', 5, 5, 100.00, 'completed', '2026-05-08 20:36:05'),
(11, 's2658', 'hard', 'multi_step', 3, 5, 60.00, 'completed', '2026-05-08 20:39:11'),
(12, 's1554', 'easy', 'place_value', 5, 5, 100.00, 'completed', '2026-05-10 00:11:46'),
(13, 's1554', 'medium', 'arrays', 0, 5, 0.00, 'completed', '2026-05-10 00:12:00'),
(14, 'S3017', 'easy', 'place_value', 0, 5, 0.00, 'completed', '2026-05-10 13:31:00'),
(15, 'S3017', 'easy', 'place_value', 0, 5, 0.00, 'completed', '2026-05-10 13:31:00'),
(16, 's1554', 'easy', 'place_value', 5, 5, 100.00, 'completed', '2026-05-10 14:46:36'),
(17, 's1554', 'medium', 'arrays', 4, 5, 80.00, 'completed', '2026-05-10 14:47:47');

-- --------------------------------------------------------

--
-- Table structure for table `parents`
--

CREATE TABLE `parents` (
  `id` int(11) NOT NULL,
  `parent_id` varchar(8) NOT NULL,
  `title` varchar(20) NOT NULL,
  `parent_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `relationship` varchar(20) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `parents`
--

INSERT INTO `parents` (`id`, `parent_id`, `title`, `parent_name`, `email`, `contact_number`, `relationship`, `password`, `created_at`) VALUES
(1, 'P2276', 'Mr', 'mo', 'mo@gmial.com', '07875983768', 'Father', '$2y$10$Q7goowl4Hzn.3SBFNziCrOViEHhEa8ArA1YjW2nsK8E5MQZKzGSqa', '2026-05-07 13:23:52'),
(2, 'P1052', 'Mr', 'Hussain', 'hussain@gmail.com', '07465892456', 'Father', '$2y$10$Wl7c47zN0lDSfYOPo8.6neRVdM1yszDoqBwMVcb9zOWUtathqVJe6', '2026-05-08 22:19:22');

-- --------------------------------------------------------

--
-- Table structure for table `parent_children`
--

CREATE TABLE `parent_children` (
  `id` int(11) NOT NULL,
  `parent_id` varchar(8) NOT NULL,
  `student_id` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `parent_children`
--

INSERT INTO `parent_children` (`id`, `parent_id`, `student_id`) VALUES
(4, 'P1052', 'S2658'),
(3, 'P1052', 'S962'),
(2, 'P2276', 's830');

-- --------------------------------------------------------

--
-- Table structure for table `parent_students`
--

CREATE TABLE `parent_students` (
  `id` int(11) NOT NULL,
  `parent_id` varchar(8) NOT NULL,
  `student_id` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions_maths`
--

CREATE TABLE `questions_maths` (
  `id` int(11) NOT NULL,
  `key_stage` enum('KS1','KS2') NOT NULL,
  `level` enum('easy','medium','hard') NOT NULL,
  `type` varchar(50) NOT NULL,
  `start_value` int(11) DEFAULT NULL,
  `target_value` int(11) DEFAULT NULL,
  `object_name` varchar(100) DEFAULT NULL,
  `instruction_template` varchar(255) NOT NULL,
  `interaction_type` varchar(50) DEFAULT 'select',
  `hint` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `topic` varchar(50) DEFAULT NULL,
  `value1` int(11) DEFAULT NULL,
  `value2` int(11) DEFAULT NULL,
  `hint1` text DEFAULT NULL,
  `hint2` text DEFAULT NULL,
  `hint3` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `questions_maths`
--

INSERT INTO `questions_maths` (`id`, `key_stage`, `level`, `type`, `start_value`, `target_value`, `object_name`, `instruction_template`, `interaction_type`, `hint`, `created_at`, `topic`, `value1`, `value2`, `hint1`, `hint2`, `hint3`) VALUES
(1, 'KS1', 'easy', 'count', NULL, 1, 'apple', 'Drag 1 apple into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'KS1', 'easy', 'count', NULL, 2, 'balloon', 'Drag 2 balloon into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'KS1', 'easy', 'count', NULL, 3, 'star', 'Drag 3 star into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'KS1', 'easy', 'count', NULL, 4, 'banana', 'Drag 4 banana into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'KS1', 'easy', 'count', NULL, 5, 'carrot', 'Drag 5 carrot into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'KS1', 'easy', 'count', NULL, 6, 'peelBanana', 'Drag 6 peeled bananas into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'KS1', 'easy', 'count', NULL, 7, 'berry', 'Drag 7 berry into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'KS1', 'easy', 'count', NULL, 8, 'candy', 'Drag 8 candy into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'KS1', 'easy', 'count', NULL, 9, 'bug', 'Drag 9 bug into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'KS1', 'easy', 'count', NULL, 10, 'apple', 'Drag 10 apple into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'KS1', 'easy', 'count', NULL, 2, 'banana', 'Drag 2 banana into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'KS1', 'easy', 'count', NULL, 3, 'carrot', 'Drag 3 carrot into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(13, 'KS1', 'easy', 'count', NULL, 4, 'lion', 'Drag 4 lion into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'KS1', 'easy', 'count', NULL, 5, 'berry', 'Drag 5 berry into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(15, 'KS1', 'easy', 'count', NULL, 6, 'snake', 'Drag 6 snake into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'KS1', 'easy', 'count', NULL, 7, 'bee', 'Drag 7 bee into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'KS1', 'easy', 'count', NULL, 8, 'apple', 'Drag 8 apple into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(18, 'KS1', 'easy', 'count', NULL, 9, 'balloon', 'Drag 9 balloons into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'KS1', 'easy', 'count', NULL, 10, 'star', 'Drag 10 star into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(20, 'KS1', 'easy', 'count', NULL, 1, 'banana', 'Drag 1 banana into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(21, 'KS1', 'easy', 'count', NULL, 3, 'fly', 'Drag 3 fly into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(22, 'KS1', 'easy', 'count', NULL, 4, 'panda', 'Drag 4 pandas into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(23, 'KS1', 'easy', 'count', NULL, 5, 'bug', 'Drag 5 bugs into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(24, 'KS1', 'easy', 'count', NULL, 6, 'apple', 'Drag 6 apples into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(25, 'KS1', 'easy', 'count', NULL, 7, 'balloon', 'Drag 7 balloons into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(26, 'KS1', 'easy', 'count', NULL, 8, 'banana', 'Drag 8 bananas into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(27, 'KS1', 'easy', 'count', NULL, 9, 'carrot', 'Drag 9 carrots into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(28, 'KS1', 'easy', 'count', NULL, 10, 'peelBanana', 'Drag 10 peeled bananas into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(29, 'KS1', 'easy', 'count', NULL, 2, 'strawberry', 'Drag 2 Strawberry into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(30, 'KS1', 'easy', 'count', NULL, 5, 'star', 'Drag 5 stars into the basket', 'drag', NULL, '2026-05-06 11:14:37', NULL, NULL, NULL, NULL, NULL, NULL),
(31, 'KS1', 'medium', 'comparison_more', 3, 5, 'banana', 'Which basket has MORE bananas?', 'select', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(32, 'KS1', 'medium', 'comparison_more', 2, 7, 'star', 'Which basket has MORE stars?', 'select', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(33, 'KS1', 'medium', 'comparison_more', 4, 6, 'lion', 'Which basket has MORE lions?', 'select', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(34, 'KS1', 'medium', 'comparison_more', 1, 9, 'peelBanana', 'Which basket has MORE bananas?', 'select', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(35, 'KS1', 'medium', 'comparison_more', 5, 8, 'fly', 'Which basket has MORE flies?', 'select', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(36, 'KS1', 'medium', 'comparison_less', 3, 5, 'bee', 'Which basket has FEWER bees?', 'select', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(37, 'KS1', 'medium', 'comparison_less', 2, 7, 'balloon', 'Which basket has FEWER balloons?', 'select', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(38, 'KS1', 'medium', 'comparison_less', 4, 6, 'snake', 'Which basket has FEWER snakes?', 'select', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(39, 'KS1', 'medium', 'comparison_less', 1, 9, 'bear', 'Which basket has FEWER bears?', 'select', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(40, 'KS1', 'medium', 'comparison_less', 5, 8, 'candy', 'Which basket has FEWER candies?', 'select', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(41, 'KS1', 'medium', 'make_more', 3, 5, 'cat', 'Add cats so this basket has MORE cats', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(42, 'KS1', 'medium', 'make_more', 4, 6, 'monkey', 'Add monkeys so this basket has MORE monkeys', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(43, 'KS1', 'medium', 'make_more', 2, 4, 'giraffe', 'Add giraffes so this basket has MORE giraffes', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(44, 'KS1', 'medium', 'make_more', 5, 7, 'mouse', 'Add mice so this basket has MORE mice', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(45, 'KS1', 'medium', 'make_more', 1, 3, 'balloon', 'Add balloons so this basket has MORE balloons', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(46, 'KS1', 'medium', 'make_less', 6, 4, 'candy', 'Remove candies so this basket has LESS', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(47, 'KS1', 'medium', 'make_less', 7, 3, 'chocolate', 'Remove chocolates so this basket has LESS', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(48, 'KS1', 'medium', 'make_less', 8, 5, 'watermelon', 'Remove watermelons so this basket has LESS', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(49, 'KS1', 'medium', 'make_less', 9, 6, 'berry', 'Remove berries so this basket has LESS', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(50, 'KS1', 'medium', 'make_less', 10, 7, 'butterfly', 'Remove butterflies so this basket has LESS', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(51, 'KS1', 'medium', 'comparison_equal', 4, 4, 'banana', 'Make both baskets have the SAME number of bananas', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(52, 'KS1', 'medium', 'comparison_equal', 6, 6, 'apple', 'Make both baskets have the SAME number of apples', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(53, 'KS1', 'medium', 'comparison_equal', 2, 2, 'star', 'Make both baskets have the SAME number of stars', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(54, 'KS1', 'medium', 'comparison_equal', 5, 5, 'panda', 'Make both baskets have the SAME number of pandas', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(55, 'KS1', 'medium', 'comparison_equal', 3, 3, 'candy', 'Make both baskets have the SAME number of candies', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(56, 'KS1', 'medium', 'comparison_more', 6, 9, 'apple', 'Which basket has MORE apples?', 'select', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(57, 'KS1', 'medium', 'comparison_less', 7, 4, 'banana', 'Which basket has FEWER bananas?', 'select', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(58, 'KS1', 'medium', 'make_more', 2, 6, 'star', 'Add stars so this basket has MORE stars', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(59, 'KS1', 'medium', 'make_less', 9, 5, 'apple', 'Remove apples so this basket has LESS', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(60, 'KS1', 'medium', 'comparison_equal', 7, 7, 'balloon', 'Make both baskets have the SAME number of balloons', 'drag', NULL, '2026-05-06 11:15:21', NULL, NULL, NULL, NULL, NULL, NULL),
(61, 'KS1', 'hard', 'addition_total', 7, 12, 'apple', 'There are 7 apples in the basket. Add 5 more. How many apples are there now?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(62, 'KS1', 'hard', 'addition_total', 9, 15, 'banana', 'There are 9 bananas. Add 6 more. How many bananas now?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(63, 'KS1', 'hard', 'addition_total', 6, 14, 'star', 'There are 6 stars. Add 8 more. How many stars now?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(64, 'KS1', 'hard', 'addition_total', 8, 13, 'ball', 'There are 8 balls. Add 5 more. How many balls now?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(65, 'KS1', 'hard', 'addition_total', 5, 11, 'berry', 'There are 5 berries. Add 6 more. How many berries now?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(66, 'KS1', 'hard', 'addition_total', 10, 18, 'apple', 'There are 10 apples. Add 8 more. How many apples now?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(67, 'KS1', 'hard', 'addition_total', 4, 13, 'banana', 'There are 4 bananas. Add 9 more. How many bananas now?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(68, 'KS1', 'hard', 'addition_total', 11, 17, 'star', 'There are 11 stars. Add 6 more. How many stars now?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(69, 'KS1', 'hard', 'addition_total', 3, 12, 'ball', 'There are 3 balls. Add 9 more. How many balls now?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(70, 'KS1', 'hard', 'addition_total', 12, 19, 'berry', 'There are 12 berries. Add 7 more. How many berries now?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(71, 'KS1', 'hard', 'subtraction_remaining', 15, 9, 'apple', 'There are 15 apples. 6 are taken away. How many apples are left?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(72, 'KS1', 'hard', 'subtraction_remaining', 18, 10, 'banana', 'There are 18 bananas. 8 are taken away. How many remain?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(73, 'KS1', 'hard', 'subtraction_remaining', 14, 7, 'star', 'There are 14 stars. 7 disappear. How many stars remain?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(74, 'KS1', 'hard', 'subtraction_remaining', 16, 12, 'ball', 'There are 16 balls. 4 roll away. How many balls remain?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(75, 'KS1', 'hard', 'subtraction_remaining', 13, 5, 'berry', 'There are 13 berries. 8 are eaten. How many remain?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(76, 'KS1', 'hard', 'subtraction_remaining', 20, 14, 'apple', 'There are 20 apples. 6 are removed. How many remain?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(77, 'KS1', 'hard', 'subtraction_remaining', 17, 9, 'banana', 'There are 17 bananas. 8 are taken. How many remain?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(78, 'KS1', 'hard', 'subtraction_remaining', 19, 11, 'star', 'There are 19 stars. 8 fall down. How many remain?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(79, 'KS1', 'hard', 'subtraction_remaining', 12, 4, 'ball', 'There are 12 balls. 8 roll away. How many remain?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(80, 'KS1', 'hard', 'subtraction_remaining', 18, 13, 'berry', 'There are 18 berries. 5 are eaten. How many remain?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(81, 'KS1', 'hard', 'addition_missing_number', 6, 10, 'apple', 'There are 6 apples. How many more apples are needed to make 10?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(82, 'KS1', 'hard', 'addition_missing_number', 8, 13, 'banana', 'There are 8 bananas. How many more bananas are needed to make 13?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(83, 'KS1', 'hard', 'addition_missing_number', 5, 12, 'star', 'There are 5 stars. How many more stars are needed to make 12?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(84, 'KS1', 'hard', 'addition_missing_number', 9, 14, 'ball', 'There are 9 balls. How many more balls are needed to make 14?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(85, 'KS1', 'hard', 'addition_missing_number', 7, 15, 'berry', 'There are 7 berries. How many more berries are needed to make 15?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(86, 'KS1', 'hard', 'addition_missing_number', 4, 11, 'apple', 'There are 4 apples. How many more apples are needed to make 11?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(87, 'KS1', 'hard', 'addition_missing_number', 10, 16, 'banana', 'There are 10 bananas. How many more bananas are needed to make 16?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(88, 'KS1', 'hard', 'addition_missing_number', 3, 9, 'star', 'There are 3 stars. How many more stars are needed to make 9?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(89, 'KS1', 'hard', 'addition_missing_number', 12, 20, 'ball', 'There are 12 balls. How many more balls are needed to make 20?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(90, 'KS1', 'hard', 'addition_missing_number', 11, 18, 'berry', 'There are 11 berries. How many more berries are needed to make 18?', 'select', NULL, '2026-05-06 11:15:53', NULL, NULL, NULL, NULL, NULL, NULL),
(91, 'KS2', 'easy', 'place_value_build', NULL, 4, 'block', 'Build the number 124.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 1, 2, '1 hundred', '2 tens', '4 ones'),
(92, 'KS2', 'easy', 'place_value_build', NULL, 5, 'block', 'Build the number 235.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 2, 3, '2 hundreds', '3 tens', '5 ones'),
(93, 'KS2', 'easy', 'place_value_build', NULL, 6, 'block', 'Build the number 346.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 3, 4, '3 hundreds', '4 tens', '6 ones'),
(94, 'KS2', 'easy', 'place_value_build', NULL, 7, 'block', 'Build the number 417.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 4, 1, '4 hundreds', '1 ten', '7 ones'),
(95, 'KS2', 'easy', 'place_value_build', NULL, 2, 'block', 'Build the number 582.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 5, 8, '5 hundreds', '8 tens', '2 ones'),
(96, 'KS2', 'easy', 'place_value_build', NULL, 3, 'block', 'Build the number 603.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 6, 0, '6 hundreds', '0 tens', '3 ones'),
(97, 'KS2', 'easy', 'place_value_build', NULL, 8, 'block', 'Build the number 718.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 7, 1, '7 hundreds', '1 ten', '8 ones'),
(98, 'KS2', 'easy', 'place_value_build', NULL, 0, 'block', 'Build the number 840.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 8, 4, '8 hundreds', '4 tens', '0 ones'),
(99, 'KS2', 'easy', 'place_value_build', NULL, 6, 'block', 'Build the number 956.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 9, 5, '9 hundreds', '5 tens', '6 ones'),
(100, 'KS2', 'easy', 'place_value_build', NULL, 1, 'block', 'Build the number 271.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 2, 7, '2 hundreds', '7 tens', '1 one'),
(101, 'KS2', 'easy', 'place_value_build', NULL, 4, 'block', 'Build the number 134.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 1, 3, '1 hundred', '3 tens', '4 ones'),
(102, 'KS2', 'easy', 'place_value_build', NULL, 8, 'block', 'Build the number 248.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 2, 4, '2 hundreds', '4 tens', '8 ones'),
(103, 'KS2', 'easy', 'place_value_build', NULL, 5, 'block', 'Build the number 365.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 3, 6, '3 hundreds', '6 tens', '5 ones'),
(104, 'KS2', 'easy', 'place_value_build', NULL, 0, 'block', 'Build the number 490.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 4, 9, '4 hundreds', '9 tens', '0 ones'),
(105, 'KS2', 'easy', 'place_value_build', NULL, 1, 'block', 'Build the number 521.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 5, 2, '5 hundreds', '2 tens', '1 one'),
(106, 'KS2', 'easy', 'place_value_build', NULL, 8, 'block', 'Build the number 678.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 6, 7, '6 hundreds', '7 tens', '8 ones'),
(107, 'KS2', 'easy', 'place_value_build', NULL, 2, 'block', 'Build the number 702.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 7, 0, '7 hundreds', '0 tens', '2 ones'),
(108, 'KS2', 'easy', 'place_value_build', NULL, 5, 'block', 'Build the number 815.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 8, 1, '8 hundreds', '1 ten', '5 ones'),
(109, 'KS2', 'easy', 'place_value_build', NULL, 3, 'block', 'Build the number 943.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 9, 4, '9 hundreds', '4 tens', '3 ones'),
(110, 'KS2', 'easy', 'place_value_build', NULL, 6, 'block', 'Build the number 286.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 2, 8, '2 hundreds', '8 tens', '6 ones'),
(111, 'KS2', 'easy', 'place_value_build', NULL, 9, 'block', 'Build the number 309.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 3, 0, '3 hundreds', '0 tens', '9 ones'),
(112, 'KS2', 'easy', 'place_value_build', NULL, 7, 'block', 'Build the number 427.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 4, 2, '4 hundreds', '2 tens', '7 ones'),
(113, 'KS2', 'easy', 'place_value_build', NULL, 6, 'block', 'Build the number 516.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 5, 1, '5 hundreds', '1 ten', '6 ones'),
(114, 'KS2', 'easy', 'place_value_build', NULL, 2, 'block', 'Build the number 632.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 6, 3, '6 hundreds', '3 tens', '2 ones'),
(115, 'KS2', 'easy', 'place_value_build', NULL, 4, 'block', 'Build the number 754.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 7, 5, '7 hundreds', '5 tens', '4 ones'),
(116, 'KS2', 'easy', 'place_value_build', NULL, 1, 'block', 'Build the number 861.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 8, 6, '8 hundreds', '6 tens', '1 one'),
(117, 'KS2', 'easy', 'place_value_build', NULL, 8, 'block', 'Build the number 908.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 9, 0, '9 hundreds', '0 tens', '8 ones'),
(118, 'KS2', 'easy', 'place_value_build', NULL, 3, 'block', 'Build the number 193.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 1, 9, '1 hundred', '9 tens', '3 ones'),
(119, 'KS2', 'easy', 'place_value_build', NULL, 0, 'block', 'Build the number 250.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 2, 5, '2 hundreds', '5 tens', '0 ones'),
(120, 'KS2', 'easy', 'place_value_build', NULL, 4, 'block', 'Build the number 444.', 'click_build', NULL, '2026-05-06 11:32:49', 'place_value', 4, 4, '4 hundreds', '4 tens', '4 ones'),
(211, 'KS2', 'hard', 'multi_step_total', NULL, 29, 'fuel', 'A rocket had 25 fuel cells. It used 8 and then got 12 more. How many fuel cells does it have now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 25, 8, 'First subtract 8', 'Then add 12', '25 - 8 = 17, then 17 + 12 = 29'),
(212, 'KS2', 'hard', 'multi_step_total', NULL, 35, 'fuel', 'A rocket had 40 fuel cells. It used 15 and then got 10 more. How many fuel cells does it have now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 40, 15, 'First subtract 15', 'Then add 10', '40 - 15 = 25, then 25 + 10 = 35'),
(213, 'KS2', 'hard', 'multi_step_total', NULL, 23, 'star', 'A star ship had 30 stars. 12 disappeared and then 5 new stars appeared. How many stars are there now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 30, 12, 'Take away 12 first', 'Then add 5', '30 - 12 = 18, then 18 + 5 = 23'),
(214, 'KS2', 'hard', 'multi_step_total', NULL, 20, 'planet', 'An astronaut found 18 planets, lost 7, then found 9 more. How many planets now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 18, 7, 'Subtract 7 first', 'Then add 9', '18 - 7 = 11, then 11 + 9 = 20'),
(215, 'KS2', 'hard', 'multi_step_total', NULL, 45, 'rocket', 'A rocket had 50 bolts. 20 were used and then 15 more were added. How many bolts now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 50, 20, 'Take away 20 first', 'Then add 15', '50 - 20 = 30, then 30 + 15 = 45'),
(216, 'KS2', 'hard', 'multi_step_total', NULL, 45, 'alien', 'An alien collected 60 crystals, gave away 25, then found 10 more. How many crystals now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 60, 25, 'Subtract 25 first', 'Then add 10', '60 - 25 = 35, then 35 + 10 = 45'),
(217, 'KS2', 'hard', 'multi_step_total', NULL, 19, 'fuel', 'A rocket had 22 fuel cells. It used 9 and then got 6 more. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 22, 9, 'Take away 9 first', 'Then add 6', '22 - 9 = 13, then 13 + 6 = 19'),
(218, 'KS2', 'hard', 'multi_step_total', NULL, 29, 'star', 'A ship had 35 stars. 14 faded away and then 8 new stars appeared. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 35, 14, 'Subtract 14 first', 'Then add 8', '35 - 14 = 21, then 21 + 8 = 29'),
(219, 'KS2', 'hard', 'multi_step_total', NULL, 38, 'planet', 'A space explorer had 42 planets, lost 11, then found 7 more. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 42, 11, 'Take away 11 first', 'Then add 7', '42 - 11 = 31, then 31 + 7 = 38'),
(220, 'KS2', 'hard', 'multi_step_total', NULL, 19, 'rocket', 'A rocket had 28 parts. 13 were removed and then 4 more were added. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 28, 13, 'Subtract 13 first', 'Then add 4', '28 - 13 = 15, then 15 + 4 = 19'),
(221, 'KS2', 'hard', 'multi_step_total', NULL, 33, 'alien', 'An alien had 45 moon rocks, lost 17, then found 5 more. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 45, 17, 'Take away 17 first', 'Then add 5', '45 - 17 = 28, then 28 + 5 = 33'),
(222, 'KS2', 'hard', 'multi_step_total', NULL, 44, 'fuel', 'A rocket had 55 fuel cells. It used 19 and then got 8 more. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 55, 19, 'Subtract 19 first', 'Then add 8', '55 - 19 = 36, then 36 + 8 = 44'),
(223, 'KS2', 'hard', 'multi_step_total', NULL, 34, 'star', 'A ship had 33 stars. 8 disappeared and then 9 new stars appeared. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 33, 8, 'Take away 8 first', 'Then add 9', '33 - 8 = 25, then 25 + 9 = 34'),
(224, 'KS2', 'hard', 'multi_step_total', NULL, 30, 'planet', 'An explorer found 27 planets, lost 6, then found 9 more. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 27, 6, 'Subtract 6 first', 'Then add 9', '27 - 6 = 21, then 21 + 9 = 30'),
(225, 'KS2', 'hard', 'multi_step_total', NULL, 34, 'rocket', 'A rocket had 48 bolts. 21 were used and then 7 more were added. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 48, 21, 'Take away 21 first', 'Then add 7', '48 - 21 = 27, then 27 + 7 = 34'),
(226, 'KS2', 'hard', 'multi_step_total', NULL, 50, 'alien', 'An alien had 62 crystals, lost 18, then found 6 more. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 62, 18, 'Subtract 18 first', 'Then add 6', '62 - 18 = 44, then 44 + 6 = 50'),
(227, 'KS2', 'hard', 'multi_step_total', NULL, 17, 'fuel', 'A rocket had 19 fuel cells. It used 7 and then got 5 more. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 19, 7, 'Take away 7 first', 'Then add 5', '19 - 7 = 12, then 12 + 5 = 17'),
(228, 'KS2', 'hard', 'multi_step_total', NULL, 52, 'star', 'A ship had 70 stars. 24 faded away and then 6 new stars appeared. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 70, 24, 'Subtract 24 first', 'Then add 6', '70 - 24 = 46, then 46 + 6 = 52'),
(229, 'KS2', 'hard', 'multi_step_total', NULL, 29, 'planet', 'An explorer had 26 planets, lost 9, then found 12 more. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 26, 9, 'Take away 9 first', 'Then add 12', '26 - 9 = 17, then 17 + 12 = 29'),
(230, 'KS2', 'hard', 'multi_step_total', NULL, 25, 'rocket', 'A rocket had 38 parts. 16 were removed and then 3 more were added. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 38, 16, 'Subtract 16 first', 'Then add 3', '38 - 16 = 22, then 22 + 3 = 25'),
(231, 'KS2', 'hard', 'multi_step_total', NULL, 24, 'alien', 'An alien had 29 moon rocks, lost 10, then found 5 more. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 29, 10, 'Take away 10 first', 'Then add 5', '29 - 10 = 19, then 19 + 5 = 24'),
(232, 'KS2', 'hard', 'multi_step_total', NULL, 60, 'fuel', 'A rocket had 80 fuel cells. It used 35 and then got 15 more. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 80, 35, 'Subtract 35 first', 'Then add 15', '80 - 35 = 45, then 45 + 15 = 60'),
(233, 'KS2', 'hard', 'multi_step_total', NULL, 41, 'star', 'A ship had 44 stars. 12 disappeared and then 9 new stars appeared. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 44, 12, 'Take away 12 first', 'Then add 9', '44 - 12 = 32, then 32 + 9 = 41'),
(234, 'KS2', 'hard', 'multi_step_total', NULL, 26, 'planet', 'An explorer had 36 planets, lost 14, then found 4 more. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 36, 14, 'Subtract 14 first', 'Then add 4', '36 - 14 = 22, then 22 + 4 = 26'),
(235, 'KS2', 'hard', 'multi_step_total', NULL, 42, 'rocket', 'A rocket had 52 bolts. 18 were used and then 8 more were added. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 52, 18, 'Take away 18 first', 'Then add 8', '52 - 18 = 34, then 34 + 8 = 42'),
(236, 'KS2', 'hard', 'multi_step_total', NULL, 27, 'alien', 'An alien had 31 crystals, lost 11, then found 7 more. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 31, 11, 'Subtract 11 first', 'Then add 7', '31 - 11 = 20, then 20 + 7 = 27'),
(237, 'KS2', 'hard', 'multi_step_total', NULL, 36, 'fuel', 'A rocket had 47 fuel cells. It used 20 and then got 9 more. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 47, 20, 'Take away 20 first', 'Then add 9', '47 - 20 = 27, then 27 + 9 = 36'),
(238, 'KS2', 'hard', 'multi_step_total', NULL, 46, 'star', 'A ship had 58 stars. 22 faded away and then 10 new stars appeared. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 58, 22, 'Subtract 22 first', 'Then add 10', '58 - 22 = 36, then 36 + 10 = 46'),
(239, 'KS2', 'hard', 'multi_step_total', NULL, 22, 'planet', 'An explorer had 24 planets, lost 8, then found 6 more. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 24, 8, 'Take away 8 first', 'Then add 6', '24 - 8 = 16, then 16 + 6 = 22'),
(240, 'KS2', 'hard', 'multi_step_total', NULL, 50, 'rocket', 'A rocket had 66 parts. 27 were removed and then 11 more were added. How many now?', 'input', NULL, '2026-05-06 22:34:55', 'multi_step', 66, 27, 'Subtract 27 first', 'Then add 11', '66 - 27 = 39, then 39 + 11 = 50'),
(241, 'KS2', 'medium', 'arrays_total', NULL, 6, 'star', 'There are 2 rows of 3 stars. How many stars altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 2, 3, 'Count the rows', 'Count how many stars are in each row', '2 × 3 = 6'),
(242, 'KS2', 'medium', 'arrays_total', NULL, 8, 'planet', 'There are 2 rows of 4 planets. How many planets altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 2, 4, 'Count the rows', 'Count how many planets are in each row', '2 × 4 = 8'),
(243, 'KS2', 'medium', 'arrays_total', NULL, 10, 'rocket', 'There are 2 rows of 5 rockets. How many rockets altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 2, 5, 'Count the rows', 'Count how many rockets are in each row', '2 × 5 = 10'),
(244, 'KS2', 'medium', 'arrays_total', NULL, 12, 'alien', 'There are 2 rows of 6 aliens. How many aliens altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 2, 6, 'Count the rows', 'Count how many aliens are in each row', '2 × 6 = 12'),
(245, 'KS2', 'medium', 'arrays_total', NULL, 6, 'star', 'There are 3 rows of 2 stars. How many stars altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 3, 2, 'Count the rows', 'Count how many stars are in each row', '3 × 2 = 6'),
(246, 'KS2', 'medium', 'arrays_total', NULL, 9, 'planet', 'There are 3 rows of 3 planets. How many planets altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 3, 3, 'Count the rows', 'Count how many planets are in each row', '3 × 3 = 9'),
(247, 'KS2', 'medium', 'arrays_total', NULL, 12, 'rocket', 'There are 3 rows of 4 rockets. How many rockets altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 3, 4, 'Count the rows', 'Count how many rockets are in each row', '3 × 4 = 12'),
(248, 'KS2', 'medium', 'arrays_total', NULL, 15, 'alien', 'There are 3 rows of 5 aliens. How many aliens altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 3, 5, 'Count the rows', 'Count how many aliens are in each row', '3 × 5 = 15'),
(249, 'KS2', 'medium', 'arrays_total', NULL, 18, 'star', 'There are 3 rows of 6 stars. How many stars altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 3, 6, 'Count the rows', 'Count how many stars are in each row', '3 × 6 = 18'),
(250, 'KS2', 'medium', 'arrays_total', NULL, 8, 'planet', 'There are 4 rows of 2 planets. How many planets altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 4, 2, 'Count the rows', 'Count how many planets are in each row', '4 × 2 = 8'),
(251, 'KS2', 'medium', 'arrays_total', NULL, 12, 'rocket', 'There are 4 rows of 3 rockets. How many rockets altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 4, 3, 'Count the rows', 'Count how many rockets are in each row', '4 × 3 = 12'),
(252, 'KS2', 'medium', 'arrays_total', NULL, 16, 'alien', 'There are 4 rows of 4 aliens. How many aliens altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 4, 4, 'Count the rows', 'Count how many aliens are in each row', '4 × 4 = 16'),
(253, 'KS2', 'medium', 'arrays_total', NULL, 20, 'star', 'There are 4 rows of 5 stars. How many stars altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 4, 5, 'Count the rows', 'Count how many stars are in each row', '4 × 5 = 20'),
(254, 'KS2', 'medium', 'arrays_total', NULL, 24, 'planet', 'There are 4 rows of 6 planets. How many planets altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 4, 6, 'Count the rows', 'Count how many planets are in each row', '4 × 6 = 24'),
(255, 'KS2', 'medium', 'arrays_total', NULL, 10, 'rocket', 'There are 5 rows of 2 rockets. How many rockets altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 5, 2, 'Count the rows', 'Count how many rockets are in each row', '5 × 2 = 10'),
(256, 'KS2', 'medium', 'arrays_total', NULL, 15, 'alien', 'There are 5 rows of 3 aliens. How many aliens altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 5, 3, 'Count the rows', 'Count how many aliens are in each row', '5 × 3 = 15'),
(257, 'KS2', 'medium', 'arrays_total', NULL, 20, 'star', 'There are 5 rows of 4 stars. How many stars altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 5, 4, 'Count the rows', 'Count how many stars are in each row', '5 × 4 = 20'),
(258, 'KS2', 'medium', 'arrays_total', NULL, 25, 'planet', 'There are 5 rows of 5 planets. How many planets altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 5, 5, 'Count the rows', 'Count how many planets are in each row', '5 × 5 = 25'),
(259, 'KS2', 'medium', 'arrays_total', NULL, 30, 'rocket', 'There are 5 rows of 6 rockets. How many rockets altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 5, 6, 'Count the rows', 'Count how many rockets are in each row', '5 × 6 = 30'),
(260, 'KS2', 'medium', 'arrays_total', NULL, 12, 'alien', 'There are 6 rows of 2 aliens. How many aliens altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 6, 2, 'Count the rows', 'Count how many aliens are in each row', '6 × 2 = 12'),
(261, 'KS2', 'medium', 'arrays_total', NULL, 18, 'star', 'There are 6 rows of 3 stars. How many stars altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 6, 3, 'Count the rows', 'Count how many stars are in each row', '6 × 3 = 18'),
(262, 'KS2', 'medium', 'arrays_total', NULL, 24, 'planet', 'There are 6 rows of 4 planets. How many planets altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 6, 4, 'Count the rows', 'Count how many planets are in each row', '6 × 4 = 24'),
(263, 'KS2', 'medium', 'arrays_total', NULL, 30, 'rocket', 'There are 6 rows of 5 rockets. How many rockets altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 6, 5, 'Count the rows', 'Count how many rockets are in each row', '6 × 5 = 30'),
(264, 'KS2', 'medium', 'arrays_total', NULL, 14, 'alien', 'There are 7 rows of 2 aliens. How many aliens altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 7, 2, 'Count the rows', 'Count how many aliens are in each row', '7 × 2 = 14'),
(265, 'KS2', 'medium', 'arrays_total', NULL, 21, 'star', 'There are 7 rows of 3 stars. How many stars altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 7, 3, 'Count the rows', 'Count how many stars are in each row', '7 × 3 = 21'),
(266, 'KS2', 'medium', 'arrays_total', NULL, 28, 'planet', 'There are 7 rows of 4 planets. How many planets altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 7, 4, 'Count the rows', 'Count how many planets are in each row', '7 × 4 = 28'),
(267, 'KS2', 'medium', 'arrays_total', NULL, 16, 'rocket', 'There are 8 rows of 2 rockets. How many rockets altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 8, 2, 'Count the rows', 'Count how many rockets are in each row', '8 × 2 = 16'),
(268, 'KS2', 'medium', 'arrays_total', NULL, 24, 'alien', 'There are 8 rows of 3 aliens. How many aliens altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 8, 3, 'Count the rows', 'Count how many aliens are in each row', '8 × 3 = 24'),
(269, 'KS2', 'medium', 'arrays_total', NULL, 18, 'star', 'There are 9 rows of 2 stars. How many stars altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 9, 2, 'Count the rows', 'Count how many stars are in each row', '9 × 2 = 18'),
(270, 'KS2', 'medium', 'arrays_total', NULL, 20, 'planet', 'There are 10 rows of 2 planets. How many planets altogether?', 'multiple_choice', NULL, '2026-05-07 08:57:19', 'arrays', 10, 2, 'Count the rows', 'Count how many planets are in each row', '10 × 2 = 20');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `student_id` varchar(8) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `year_group` int(11) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `student_id`, `first_name`, `surname`, `gender`, `year_group`, `avatar`, `password`, `created_at`) VALUES
(3, 'S1554', 'safica', 'mougamadou', 'female', 4, 'img2.png', '$2y$10$vFlvNiWoMPaTqL4Xq6QUgeKNAo9LLzuCgHDsR57VvpbHB/Bd4tyiC', '2026-05-06 15:58:40'),
(4, 'S3269', 'Hilmiya', 'Junaid', 'female', 2, 'Cat.png', '$2y$10$yHUrSqw9HAVocsT.n3hnQe8pY.ONVUYBmfaUpptj4Bxk51ry4tFUa', '2026-05-07 16:40:21'),
(6, 'S2147', 'safica', 'mougamadou', 'female', 2, 'Mice.png', '$2y$10$CQMm8y6Yl4EPunzN0lIGAuadGQFxY1vSw7wgKMNQBD.y2SpxCuaWG', '2026-05-08 17:04:44'),
(7, 'S2062', 'Ibrahim', 'Amin', 'male', 5, NULL, '$2y$10$bVTvtV5hWAw0Tj60CEgJ/.N14VTROgBirlPoDjJStUTqtt1Wplihy', '2026-05-08 19:43:22'),
(8, 'S4975', 'Ibrahim', 'Amin', 'male', 5, NULL, '$2y$10$p5OUe3KdBqp7a4sXr7IUA.Txoe1IW8PiSeDjmGJHybEFqZolb9AHy', '2026-05-08 19:43:22'),
(9, 'S1272', 'Yaqub', 'Amin', 'male', 2, NULL, '$2y$10$LJZpqGRSnlHGVEi.wDq.vOvkxL3x2sVzGQll4f9BuVIDPREoivCSK', '2026-05-08 20:02:17'),
(10, 'S4635', 'Maryam', 'Junaid', 'female', 1, 'Lion.png', '$2y$10$suN46VD9RtzNZeqX1wmAp.4MQFRCLpaYicpbwB8IZP1EjmbThjlm2', '2026-05-08 20:07:54'),
(11, 'S4109', 'Ishaq', 'Khan', 'male', 1, NULL, '$2y$10$WqJz6k2C8v0WpK5ntTlkGekyN5wAqqedUyAL8ZTmq6nPb4SqTfRAe', '2026-05-08 20:14:21'),
(12, 'S962', 'John', 'Dave', 'male', 2, 'fly.png', '$2y$10$oF.FPVwT.91TbDI9tq8EFudpct98c5qKfx1YVcAKUSUPU39stI9qa', '2026-05-08 20:18:05'),
(13, 'S2658', 'Aliyah', 'Khan', 'female', 4, 'img9.png', '$2y$10$DdxhbsWanqzOyLl0CNHeVedTfkbpygs8TjZfmwZ0GiT9iCJFsmttK', '2026-05-08 20:31:50'),
(14, 'S1239', 'Michael', 'David', 'male', 3, 'img5.png', '$2y$10$dWcAgqhfm3IxLhqL1UIoZOj1zvsiOANjeTb7UncgTUTMBRso27deq', '2026-05-08 22:26:16'),
(15, 'S4005', 'michael', 'David', 'male', 3, 'img5.png', '$2y$10$.PQc2E6y740eY7nWBIxhceqoJWa9W1pz05.5zZoDPIbz9hFMBLr5a', '2026-05-08 22:29:23'),
(16, 'S133', 'Michael', 'David', 'male', 3, NULL, '$2y$10$FI1GLcyNNAqaSD1Qx/RZZOIUUgbNkTPZtR/9odaHC2YMuNUjCLRcG', '2026-05-08 22:42:04'),
(17, 'S3017', 'James', 'Peter', 'male', 3, 'Bug.png', '$2y$10$R6kxYdlodf1hcDUYwrRy4.I8IUQKmRCaskHkgTsewCsPbFBziGcj2', '2026-05-08 22:48:28'),
(18, 'S4854', 'Example', 'mou', 'female', 3, NULL, '$2y$10$LQSmNtTkVQBeXAseQBb4z.nsSRDp0eY3SJ/DZWdZra6V3ouptqyRq', '2026-05-08 23:04:10');

-- --------------------------------------------------------

--
-- Table structure for table `student_interactions`
--

CREATE TABLE `student_interactions` (
  `id` int(11) NOT NULL,
  `student_id` varchar(8) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  `level` enum('easy','medium','hard') DEFAULT NULL,
  `question_type` varchar(50) DEFAULT NULL,
  `correct` tinyint(1) DEFAULT NULL,
  `response_time` float DEFAULT NULL,
  `lives_remaining` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_learning_info`
--

CREATE TABLE `student_learning_info` (
  `id` int(11) NOT NULL,
  `student_id` varchar(8) DEFAULT NULL,
  `key_stage` enum('KS1','KS2') NOT NULL,
  `current_level` enum('easy','medium','hard') DEFAULT 'easy'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `student_learning_info`
--

INSERT INTO `student_learning_info` (`id`, `student_id`, `key_stage`, `current_level`) VALUES
(2, 'S1554', 'KS2', 'easy'),
(3, 'S3269', 'KS1', 'easy'),
(5, 'S2147', 'KS1', 'easy'),
(6, 'S4975', 'KS2', 'easy'),
(7, 's1272', 'KS1', 'easy'),
(8, 's4635', 'KS1', 'easy'),
(9, 'S4109', 'KS1', 'easy'),
(10, 's962', 'KS1', 'easy'),
(11, 's2658', 'KS2', 'easy'),
(12, 'S1239', 'KS2', 'easy'),
(13, 'S4005', 'KS2', 'easy'),
(14, 'S133', 'KS1', 'easy'),
(15, 'S3017', 'KS1', 'easy'),
(16, 's4854', 'KS1', 'easy');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(11) NOT NULL,
  `subject_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subject_id`, `subject_name`) VALUES
(1, 'Maths'),
(2, 'Science'),
(3, 'Writing');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `title` varchar(20) DEFAULT NULL,
  `teacher_id` varchar(8) NOT NULL,
  `teacher_name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(50) DEFAULT NULL,
  `year_group` int(11) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `title`, `teacher_id`, `teacher_name`, `surname`, `email`, `subject`, `year_group`, `password`, `created_at`) VALUES
(1, 'Mr', 'T2951', 'Mark', 'Antony', 'mark@gmail.com', NULL, 3, '$2y$10$hiU3jMHznAvUf63WF94FduBofN2aoeuq6ixhljk9r8cf.tTy7ZHP2', '2026-05-06 23:34:00'),
(2, 'Miss', 'T1015', 'Safica', 'Mougamadou', 'safi18@gmail.com', NULL, 2, '$2y$10$SstMpyp0Jrr/bV8HGdHoa.y9TYCEcUMdXtCoScFLX.K/TujWIqqLa', '2026-05-08 22:21:53');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_subjects`
--

CREATE TABLE `teacher_subjects` (
  `id` int(11) NOT NULL,
  `teacher_id` varchar(8) NOT NULL,
  `subject_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `teacher_subjects`
--

INSERT INTO `teacher_subjects` (`id`, `teacher_id`, `subject_id`) VALUES
(1, 'T2951', 1),
(2, 'T1015', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attempts`
--
ALTER TABLE `attempts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attempts_ks2`
--
ALTER TABLE `attempts_ks2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parents`
--
ALTER TABLE `parents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `parent_id` (`parent_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `parent_children`
--
ALTER TABLE `parent_children`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_parent_child` (`parent_id`,`student_id`);

--
-- Indexes for table `parent_students`
--
ALTER TABLE `parent_students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `questions_maths`
--
ALTER TABLE `questions_maths`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`);

--
-- Indexes for table `student_interactions`
--
ALTER TABLE `student_interactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `student_learning_info`
--
ALTER TABLE `student_learning_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_id`),
  ADD UNIQUE KEY `subject_name` (`subject_name`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `teacher_id` (`teacher_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `teacher_subjects`
--
ALTER TABLE `teacher_subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attempts`
--
ALTER TABLE `attempts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT for table `attempts_ks2`
--
ALTER TABLE `attempts_ks2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `parents`
--
ALTER TABLE `parents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `parent_children`
--
ALTER TABLE `parent_children`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `parent_students`
--
ALTER TABLE `parent_students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questions_maths`
--
ALTER TABLE `questions_maths`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=271;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `student_interactions`
--
ALTER TABLE `student_interactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_learning_info`
--
ALTER TABLE `student_learning_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teacher_subjects`
--
ALTER TABLE `teacher_subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `parent_students`
--
ALTER TABLE `parent_students`
  ADD CONSTRAINT `parent_students_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `parents` (`parent_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `parent_students_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_interactions`
--
ALTER TABLE `student_interactions`
  ADD CONSTRAINT `student_interactions_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_interactions_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions_maths` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `student_learning_info`
--
ALTER TABLE `student_learning_info`
  ADD CONSTRAINT `student_learning_info_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE;

--
-- Constraints for table `teacher_subjects`
--
ALTER TABLE `teacher_subjects`
  ADD CONSTRAINT `teacher_subjects_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `teacher_subjects_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
