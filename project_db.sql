-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- host: 127.0.0.1
-- generation time: apr 28, 2025 at 03:45 pm
-- server version: 10.4.32-mariadb
-- php version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 set @old_character_set_client=@@character_set_client */;
/*!40101 set @old_character_set_results=@@character_set_results */;
/*!40101 set @old_collation_connection=@@collation_connection */;
/*!40101 set names utf8mb4 */;

--
-- database: `gproject_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE `links` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `link` varchar(2083) NOT NULL,
  `visit` int(11) DEFAULT 0,
  `lastvisit` varchar(99) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `links`
--

INSERT INTO `links` (`id`, `userId`, `name`, `link`, `visit`, `lastvisit`) VALUES
(28, 1, 'tiktok', 'https://www.tiktok.com/foryou', 6, '04/28/2025'),
(31, 1, 'try', 'https://www.tiktok.com/@philosophy.pulse/video/7482833232908537110', 4, '04/28/2025'),
(32, 1, 'gg', 'https://www.tiktok.com/en/', 2, '04/28/2025'),
(38, 3, 'hahaha', 'https://www.tiktok.com/', 3, '04/28/2025'),
(41, 3, 'AI', 'https://www.tiktok.com/@aiexplorer59/photo/7663202007972416790', 6, '04/28/2025');

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(99) DEFAULT NULL,
  `content` text NOT NULL,
  `dcreate` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quotes`
--

INSERT INTO `quotes` (`id`, `userId`, `title`, `content`, `dcreate`) VALUES
(74, 3, 'test', 'test', '04/17/2025'),
(78, 3, 'asd', 'asdasdasdasd', '04/17/2025'),
(108, 3, 'qweqwe', 'qweqweqwe', '04/17/2025'),
(109, 3, 'BSIT', 'ayaw ko na', '04/17/2025'),
(111, 3, 'fdsf', 'fdsfds', '04/18/2025'),
(112, 1, 'hi', 'asdfgqwertyasdfgqwerty', '04/19/2025'),
(113, 3, 'asdfgqwerty', 'asdfgqwerty', '04/20/2025');

-- --------------------------------------------------------

--
-- Table structure for table `todos`
--

CREATE TABLE `todos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `descript` text DEFAULT NULL,
  `dueDate` varchar(99) NOT NULL,
  `status` varchar(99) NOT NULL,
  `dcreated` varchar(99) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `todos`
--

INSERT INTO `todos` (`id`, `userId`, `title`, `descript`, `dueDate`, `status`, `dcreated`) VALUES
(4, 3, 'Adobo', 'Masarap na adobo ni nanay', '04/29/2025', 'inprogress', '04/20/2025'),
(6, 3, 'Sinigang na Baboy', 'Pampaasim', '04/29/2025', 'inprogress', '04/20/2025'),
(7, 3, 'Kare-Kare', 'May bagoong dapat', '04/20/2025', 'completed', '04/20/2025'),
(8, 3, 'Lechon Kawali', 'Lutong bahay', '04/30/2025', 'inprogress', '04/20/2025'),
(9, 3, 'Sisig', 'Pampulutan', '04/25/2025', 'inprogress', '04/20/2025'),
(10, 3, 'Tinola', 'May sayote o papaya?', '08/24/2025', 'inprogress', '04/20/2025'),
(14, 3, 'Bicol Express', 'Maanghang', '04/21/2025', 'inprogress', '04/21/2025'),
(15, 3, 'Lumpia', 'Handaan default', '04/23/2025', 'inprogress', '04/21/2025'),
(16, 1, 'Pancit Canton', 'Pang meryenda', '04/21/2025', 'completed', '04/21/2025'),
(17, 3, 'Bulalo', 'Mainit na sabaw', '04/21/2025', 'inprogress', '04/21/2025'),
(23, 3, 'Dinuguan', 'Puto partner', '04/22/2025', 'completed', '04/22/2025'),
(24, 3, 'Tortang Talong', 'Masarap with ketchup', '04/22/2025', 'completed', '04/22/2025'),
(25, 3, 'Menudo', 'Maraming hotdog', '04/22/2025', 'inprogress', '04/22/2025'),
(27, 1, 'Caldereta', 'Paborito sa pista', '04/22/2025', 'inprogress', '04/22/2025'),
(29, 3, 'Pinakbet', 'Gulay is life', '04/23/2025', 'inprogress', '04/23/2025'),
(30, 3, 'Chop Suey', 'Healthy options', '04/23/2025', 'inprogress', '04/23/2025'),
(31, 3, 'Tocino', 'Silog breakfast', '04/24/2025', 'inprogress', '04/23/2025');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(99) NOT NULL,
  `password` varchar(99) NOT NULL,
  `profile` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `profile`) VALUES
(1, 'asd', 'asd', 7),
(2, 'marco', 'marco', 0),
(3, 'sundae', 'sundae', 1),
(4, '123', '123', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `links`
--
ALTER TABLE `links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `todos`
--
ALTER TABLE `todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `links`
--
ALTER TABLE `links`
  ADD CONSTRAINT `links_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `quotes`
--
ALTER TABLE `quotes`
  ADD CONSTRAINT `quotes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `todos`
--
ALTER TABLE `todos`
  ADD CONSTRAINT `todos_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 set character_set_client=@old_character_set_client */;
/*!40101 set character_set_results=@old_character_set_results */;
/*!40101 set collation_connection=@old_collation_connection */;
