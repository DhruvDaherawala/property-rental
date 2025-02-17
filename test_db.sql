-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2025 at 09:52 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `child_properties`
--

CREATE TABLE `child_properties` (
  `id` int(11) NOT NULL,
  `propertyId` int(11) NOT NULL,
  `floor` varchar(50) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `rooms` int(11) DEFAULT NULL,
  `washroom` varchar(50) DEFAULT NULL,
  `gas` varchar(50) DEFAULT NULL,
  `electricity` varchar(50) DEFAULT NULL,
  `deposit` varchar(50) DEFAULT NULL,
  `rent` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `child_properties`
--

INSERT INTO `child_properties` (`id`, `propertyId`, `floor`, `title`, `description`, `rooms`, `washroom`, `gas`, `electricity`, `deposit`, `rent`) VALUES
(1, 1, '1', 'Delux Rooms', 'Bed Rooms', 2, 'Yes', 'Yes', 'Yes', '25000', '7000'),
(2, 2, '1', 'Delux Rooms', 'Bed Rooms', 2, 'Yes', 'Yes', 'Yes', '25000', '7000'),
(3, 3, '', '', '', 0, '', '', '', '', ''),
(4, 3, '', '', '', 0, '', '', '', '', ''),
(5, 4, '1', 'Delux Rooms', 'With Two Bed Rooms', 2, 'Yes', 'No', 'Yes', '20000', '6000'),
(6, 5, '1', 'Delux Rooms', 'With Two Bed Rooms', 2, 'Yes', 'No', 'Yes', '20000', '6000');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `propertyName` varchar(255) NOT NULL,
  `ownerName` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `documents` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `propertyName`, `ownerName`, `address`, `documents`) VALUES
(1, 'Blue lagoon Villa ', 'Ronnie', 'At, Goa - Anjuna beach.', '05855e21306d9864f0b338f53f0a2b56'),
(2, 'Blue lagoon Villa ', 'Ronnie', 'At, Goa - Anjuna beach.', '075e260638fb6d46c3e54fd54008b670'),
(3, 'Blue lagoon Villa ', 'Ronnie', '', NULL),
(4, 'Blue lagoon Villa -2', 'Ronnie Bhai', 'At, Goa - Anjuna beach.', '5299022f74c21ce0640f0b465cc2cf94'),
(5, 'Blue lagoon Villa -2', 'Ronnie Bhai', 'At, Goa - Anjuna beach.', '8aae193aa1d42e561ba3a36c1752296b');

-- --------------------------------------------------------

--
-- Table structure for table `renters`
--

CREATE TABLE `renters` (
  `id` int(11) NOT NULL,
  `renterName` varchar(255) NOT NULL,
  `fullAddress` text DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `numberOfStayers` int(11) DEFAULT NULL,
  `aadhaarCard` varchar(255) DEFAULT NULL,
  `panCard` varchar(255) DEFAULT NULL,
  `passportPhoto` varchar(255) DEFAULT NULL,
  `otherDocument` varchar(255) DEFAULT NULL,
  `contact1` varchar(50) DEFAULT NULL,
  `contact2` varchar(50) DEFAULT NULL,
  `remarks` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `renters`
--

INSERT INTO `renters` (`id`, `renterName`, `fullAddress`, `age`, `numberOfStayers`, `aadhaarCard`, `panCard`, `passportPhoto`, `otherDocument`, `contact1`, `contact2`, `remarks`) VALUES
(1, 'Harsh Marvaniya', '2153 Curabitur Avenue 2', 21, 4, '1739510776967-Dish2.png', '1739510776977-Dish1.png', '1739510776988-avatar (1).png', '1739510776989-avatar.png', '1234567890', '0987654321', 'Note This data is fake!!'),
(2, 'Harsh Marvaniya', 'Diabetes-Prediction-System', 21, 4, '1739522514389-avatar.png', '1739522514390-avatar.png', '1739522514390-Dish1.png', '1739522514394-Dish2.png', '1234567890', '0987654321', 'Note: This is only demo data!!');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `child_properties`
--
ALTER TABLE `child_properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `propertyId` (`propertyId`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `renters`
--
ALTER TABLE `renters`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `child_properties`
--
ALTER TABLE `child_properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `renters`
--
ALTER TABLE `renters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `child_properties`
--
ALTER TABLE `child_properties`
  ADD CONSTRAINT `child_properties_ibfk_1` FOREIGN KEY (`propertyId`) REFERENCES `properties` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
