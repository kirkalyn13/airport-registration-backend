-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 18, 2022 at 04:41 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `airportdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userNumber` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `sex` varchar(2) NOT NULL DEFAULT 'NA',
  `birthday` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `contactNumber` int(30) DEFAULT NULL,
  `photo` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userNumber`, `username`, `password`, `lastName`, `firstName`, `middleName`, `sex`, `birthday`, `address`, `email`, `contactNumber`, `photo`) VALUES
(1, 'kasantos', '12131996', 'Santos', 'Kirk Alyn', 'Limbitco', 'M', '1996-12-13', 'Bacolor, Pampanga', 'kasantos@test.com', 123456789, NULL),
(2, 'jpdeguzman', '06101996', 'de Guzman', 'Johannes Paulus', 'del Rosario', 'M', '1996-06-10', 'Angeles City, Pampanga', 'jpdeguzman@test.com', 123456789, NULL),
(3, 'cjvillanueva', '06191997', 'Villanueva', 'Carlos Joseph', 'Nuqui', 'M', '1997-06-19', 'San Fernando, Pampanga', 'cjvillanueva@test.com', 123456789, NULL),
(4, 'testuser', '$2b$10$dghzO673Nkl5spHO7oK.qucDLkfO6mfW4fJycJUJnP5S549C.MuGO', 'last', 'first', 'middle', 'M', '2022-03-17', 'ROSE ST', 'email.com', 1234567, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userNumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
