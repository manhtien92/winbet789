-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2016 at 12:59 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `hokibet188`
--

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2014_10_12_000000_create_users_table', 1),
('2014_10_12_100000_create_password_resets_table', 1),
('2016_02_21_135745_create_sessions_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8_unicode_ci,
  `payload` text COLLATE utf8_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL,
  UNIQUE KEY `sessions_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('78915c9d44c8f61b33769c8f0a991eaaaf585849', 29, '::1', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiWFlvTFJnekNGT0JhS3lZZG1jZGc2SG0wT1NnSzlBbHhtMlRQcFUyMSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NjM6Imh0dHA6Ly9sb2NhbGhvc3Qvd2luYmV0Nzg5L3Byb2plY3QvcHVibGljL2FwaS9hdXRoZW50aWNhdGUvdXNlciI7fXM6NToiZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0NTcxNzkxMjk7czoxOiJjIjtpOjE0NTcxNjYwNTQ7czoxOiJsIjtzOjE6IjAiO319', 1457179129),
('f8aff9f05c0bd34bf2872d4d780c43f94cabdd8d', 20, '::1', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiYUxSaUlVTUgyYU5iWTJhZVdPUWE4WFQ1ZHFmVGlnR292SHJ4Q2U3MSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NjM6Imh0dHA6Ly9sb2NhbGhvc3Qvd2luYmV0Nzg5L3Byb2plY3QvcHVibGljL2FwaS9hdXRoZW50aWNhdGUvdXNlciI7fXM6NToiZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0NTcxNTk4MDQ7czoxOiJjIjtpOjE0NTcxNTczMDc7czoxOiJsIjtzOjE6IjAiO319', 1457159804);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `main_balance` decimal(10,0) DEFAULT '0',
  `currency` varchar(3) COLLATE utf8_unicode_ci DEFAULT 'IDR',
  `bank_id` int(5) unsigned DEFAULT NULL,
  `bank_account_name` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bank_account_number` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `confirmation_code` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT '0',
  `phone` int(12) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=30 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `main_balance`, `currency`, `bank_id`, `bank_account_name`, `bank_account_number`, `created_at`, `updated_at`, `confirmation_code`, `confirmed`, `phone`) VALUES
(1, 'hokibet', 'hokibet@gmail.com', '$2y$10$e.luRAJlmgJBVnGJe/A3NOvri8RLfG4XG.x1n.8NrFfPE5gEFCQpC', '0', 'IDR', NULL, NULL, NULL, NULL, '2016-03-01 12:31:13', NULL, 0, NULL),
(29, 'huquduy', 'huquduy@gmail.com', '$2y$10$5tUgrYxwsPR4XVpU7.soT.mfPZTDwdWNVSTlkPjYaikYJEOCM/xOq', '0', 'IDR', 1, 'qwerty', 'qwerty', '2016-03-05 04:55:34', '2016-03-05 04:55:34', 'sPMWwnodtt8Ohi1HZ926Ih7ludXsVb', 0, 123456);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
