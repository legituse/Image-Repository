-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 14, 2021 at 02:58 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `repo`
--

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imagepath` varchar(128) DEFAULT NULL,
  `uploaduserid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `imagepath` (`imagepath`),
  KEY `imageToUser` (`uploaduserid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `imagepath`, `uploaduserid`) VALUES
(1, 'coast-sea-fog-rocky-rocky-coast.jpg', 1),
(2, 'leaves-seamless-pattern-pattern.jpg', 1),
(3, 'mountains-clouds-peak-summit-foggy.jpg', 1),
(4, 'palm-leaves-silhouette-fog-smoke.jpg', 1),
(5, 'toucan-bird-branch-perched-beak.jpg', 1),
(6, 'bird-emoji.png', 1),
(7, 'space-moon-clouds-sky-wallpaper.jpg', 1),
(8, 'emoji-sob-sunglasses.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE IF NOT EXISTS `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `password` varchar(128) NOT NULL,
  `permissions` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`id`, `username`, `password`, `permissions`) VALUES
(1, 'user1', '$2y$10$76EkX1r4pe3uDSd2.dZmw.ndmfP1y49/hMKHelnjUBpflujNl/CQG', 'a:1:{i:0;s:4:\"User\";}');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `imageToUser` FOREIGN KEY (`uploaduserid`) REFERENCES `userinfo` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
