-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 18 Gru 2018, 22:09
-- Wersja serwera: 10.1.26-MariaDB
-- Wersja PHP: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `web_project`
--
DROP DATABASE IF EXISTS `web_project`;
CREATE DATABASE IF NOT EXISTS `web_project` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `web_project`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `answer`
--

CREATE TABLE `answer` (
  `ID` int(11) NOT NULL,
  `ID_QUESTION` int(11) NOT NULL,
  `TEXT` blob NOT NULL,
  `STATUS` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `courses`
--

CREATE TABLE `courses` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `question`
--

CREATE TABLE `question` (
  `ID` int(11) NOT NULL,
  `ID_SUBJECT` int(11) NOT NULL,
  `CATEGORY` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `TEXT` blob NOT NULL,
  `CODE` blob,
  `IMAGE` blob
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `subject`
--

CREATE TABLE `subject` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `ID_AUTHOR` int(11) DEFAULT NULL,
  `N_O_QUESTIONS` int(11) DEFAULT NULL,
  `MULTIPLE_CHOICE` int(1) DEFAULT NULL,
  `SEPARATE_PAGE` int(1) DEFAULT NULL,
  `CAN_BACK` int(1) DEFAULT NULL,
  `LIMITED_TIME` int(1) DEFAULT NULL,
  `TIME` int(11) DEFAULT NULL,
  `COURSE` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DESCRIPTION` blob,
  `SHARED` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(64) NOT NULL,
  `SURNAME` varchar(64) NOT NULL,
  `EMAIL` varchar(128) NOT NULL,
  `PASSWORD` varchar(2048) NOT NULL,
  `ROLE` int(11) NOT NULL,
  `CREATED` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `COURSE` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_result`
--

CREATE TABLE `user_result` (
  `ID` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `ID_SUBJECT` int(11) NOT NULL,
  `RESULT` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_QUESTION` (`ID_QUESTION`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`),
  ADD KEY `ID_SUBJECT` (`ID_SUBJECT`),
  ADD KEY `ID_CATEGORY` (`CATEGORY`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`),
  ADD KEY `ID_2` (`ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `user_result`
--
ALTER TABLE `user_result`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `answer`
--
ALTER TABLE `answer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `courses`
--
ALTER TABLE `courses`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `question`
--
ALTER TABLE `question`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `subject`
--
ALTER TABLE `subject`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `user_result`
--
ALTER TABLE `user_result`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `ANSWER_ibfk_1` FOREIGN KEY (`ID_QUESTION`) REFERENCES `question` (`ID`);

--
-- Ograniczenia dla tabeli `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `QUESTION_ibfk_1` FOREIGN KEY (`ID_SUBJECT`) REFERENCES `subject` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
