-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 20.11.2018 klo 19:00
-- Palvelimen versio: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laiterekisteri`
--

-- --------------------------------------------------------

--
-- Rakenne taululle `kayttaja`
--

DROP TABLE IF EXISTS `kayttaja`;
CREATE TABLE IF NOT EXISTS `kayttaja` (
  `avain` int(11) NOT NULL AUTO_INCREMENT,
  `tunnus` varchar(45) NOT NULL,
  `salasana` varchar(45) NOT NULL,
  `nimi` varchar(45) NOT NULL,
  `puhnro` varchar(45) NOT NULL,
  `osoite` varchar(45) NOT NULL,
  PRIMARY KEY (`avain`),
  UNIQUE KEY `login_id_UNIQUE` (`avain`),
  UNIQUE KEY `username_UNIQUE` (`tunnus`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Vedos taulusta `kayttaja`
--

INSERT INTO `kayttaja` (`avain`, `tunnus`, `salasana`, `nimi`, `puhnro`, `osoite`) VALUES
(1, 'nappe', 'salasana', 'Lauri', '050123456', 'Nappekatu 69'),
(2, 'admin', 'admin', 'admin', 'admin', 'adminkatu'),
(3, 'qwe', 'qwe', 'qwe', '123', 'qwe'),
(4, 'riku', 'riku', 'Riku Helin', '0123124', 'Laneillaeikätöissä'),
(5, 'homo', 'petteri', 'homo petteri', '24124151224', 'rikukakka'),
(6, 'sdafs', 'sdfsdf', 'sdfsd', 'sdfsd', 'sdfs');

-- --------------------------------------------------------

--
-- Rakenne taululle `laite`
--

DROP TABLE IF EXISTS `laite`;
CREATE TABLE IF NOT EXISTS `laite` (
  `laite_id` int(11) NOT NULL AUTO_INCREMENT,
  `tyyppi_id` int(11) NOT NULL,
  `merkki` varchar(45) NOT NULL,
  `malli` varchar(45) NOT NULL,
  `omistaja` varchar(45) NOT NULL,
  PRIMARY KEY (`laite_id`),
  UNIQUE KEY `sarjanumero_UNIQUE` (`laite_id`),
  KEY `tyyppi_id` (`tyyppi_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Vedos taulusta `laite`
--

INSERT INTO `laite` (`laite_id`, `tyyppi_id`, `merkki`, `malli`, `omistaja`) VALUES
(1, 0, 'Nokia', '3310', 'Nappe'),
(2, 1, 'nokia', '3310', 'meitsi');

-- --------------------------------------------------------

--
-- Rakenne taululle `laitetyyppi`
--

DROP TABLE IF EXISTS `laitetyyppi`;
CREATE TABLE IF NOT EXISTS `laitetyyppi` (
  `tyyppi_id` int(11) NOT NULL AUTO_INCREMENT,
  `laitetyyppi` varchar(45) NOT NULL,
  PRIMARY KEY (`tyyppi_id`),
  UNIQUE KEY `laite_id_UNIQUE` (`tyyppi_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Rakenne taululle `varaus`
--

DROP TABLE IF EXISTS `varaus`;
CREATE TABLE IF NOT EXISTS `varaus` (
  `varaus_id` int(11) NOT NULL AUTO_INCREMENT,
  `avain` int(20) NOT NULL,
  `laite_id` int(10) NOT NULL,
  `status` varchar(45) NOT NULL,
  `varauspvm` datetime DEFAULT NULL,
  `lainauspvm` datetime DEFAULT NULL,
  `palautuspvm` datetime DEFAULT NULL,
  PRIMARY KEY (`varaus_id`),
  UNIQUE KEY `varaus_id_UNIQUE` (`varaus_id`),
  KEY `avain` (`avain`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Rajoitteet vedostauluille
--

--
-- Rajoitteet taululle `varaus`
--
ALTER TABLE `varaus`
  ADD CONSTRAINT `varaus_ibfk_1` FOREIGN KEY (`avain`) REFERENCES `kayttaja` (`avain`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
