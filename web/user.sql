-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 28 Lis 2018, 18:22
-- Wersja serwera: 10.1.26-MariaDB
-- Wersja PHP: 7.1.9

--
-- Baza danych: `web_project`
--

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
  `MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `user`
--

INSERT INTO `user` (`ID`, `NAME`, `SURNAME`, `EMAIL`, `PASSWORD`, `ROLE`, `CREATED`, `MODIFIED`) VALUES
(1, 'Stefan', 'Jarecki', 'kupa@gówna.pl', 'stefan', 1, '2018-11-23 09:38:42', '2018-11-23 08:38:42'),
(2, ':name', ':surname', ':email', ':password', 2, '2018-11-23 09:44:36', '2018-11-24 22:03:18'),
(3, 'Mike', 'Dalisay', 'mike@codeofaninja.com', '$2y$10$pCP7Q60Mf1kvnpoH6gJC6OjatvkhFpZLvN3gz/Bnmz.ilPnp1jSbK', 2, '2018-11-23 09:47:34', '2018-11-24 22:03:24');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
