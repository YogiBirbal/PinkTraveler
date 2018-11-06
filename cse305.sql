-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 04, 2018 at 02:29 PM
-- Server version: 5.6.38
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cse305`
--

-- --------------------------------------------------------

--
-- Table structure for table `Accommodation`
--

CREATE TABLE `Accommodation` (
  `ID` int(11) NOT NULL,
  `Type` varchar(25) NOT NULL,
  `Name` varchar(46) NOT NULL,
  `Rate` double NOT NULL,
  `LocationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Accommodation`
--

INSERT INTO `Accommodation` (`ID`, `Type`, `Name`, `Rate`, `LocationID`) VALUES
(8877, 'Inn', 'Three Village Inn', 132, 88),
(8899, 'Inn', 'Hilton Garden Inn Stony Brook', 149, 88),
(9911, 'B&B', 'West 10th Street Central Park View B&B', 147, 99),
(9922, 'Hotel', 'The Gotham', 392, 99),
(9933, 'Hotel', 'The Bryant Park Hotel', 439, 99),
(123123, 'Hotel', 'River\'s Edge Hotel & Spa', 266, 123456),
(124124, 'Motel', 'Palms Motel', 90, 123456),
(456456, 'Hotel', 'Le Belleval', 307, 121212),
(987987, 'Hotel', 'Hotel Des Arts Paris Montmartre', 194, 121212);

-- --------------------------------------------------------

--
-- Table structure for table `Activity`
--

CREATE TABLE `Activity` (
  `ID` int(11) NOT NULL,
  `Name` varchar(46) NOT NULL,
  `Description` varchar(400) DEFAULT NULL,
  `locationID` int(11) NOT NULL,
  `Cost` double(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Activity`
--

INSERT INTO `Activity` (`ID`, `Name`, `Description`, `locationID`, `Cost`) VALUES
(111, 'Eiffel Tower Summit Tour', 'Survey the city from the viewing platforms while listening to commentary about Paris culture, traditions, and history. Then, proceed to the summit to see Gustave Eiffel\'s private apartments and sip Champagne from the onsite bar (own expense).', 121212, 72),
(222, 'Loire Valley Castles Tour', 'The beautiful vineyards and fairy-tale castles of the Loire Valley lie just two hours south of Paris. This tour visits two of the most famous châteaux— Chenonceau and Chambord— and ensures you maximise your time with hotel pickup, skip-the-line entrance, and round-trip transport from Paris.', 121212, 177),
(333, 'Paris Catacombs Special Access Tour', 'Venture beneath the City of Light to explore the dark underworld of the Paris Catacombs. Skip the entrance lines and head inside this fantastically macabre tunnel system filled with the skeletal remains of more than 6 million Parisians. ', 121212, 97),
(444, 'Columbia River Gorge Waterfalls Tour', 'Explore the largest National Scenic Area in the US in just a few hours when you visit the Columbia River Gorge on a guided tour from Portland.', 123456, 60),
(555, 'Downtown Portland Bike Tour', 'Experience Portland’s vibrant, bike-friendly culture on two wheels on this tour of the city’s best known spots. Coast through the city’s west side, where you’ll visit breweries, food carts, hip art galleries, and historic 19th-century architecture.', 123456, 59),
(666, 'Columbia River Gorge Brunch Cruise', 'Start your day with a 2-hour brunch cruise on the Columbia River and then take a scenic drive toward Mt. Hood, stopping to admire picturesque views of the mountains and explore the historical Timberline Lodge.', 123456, 200),
(8811, 'LI Museum of American Art and Carriages', 'The Long Island Museum is dedicated to inspiring people of all ages with an understanding and enjoyment of American art, history and carriages as expressed through the heritage of Long Island and its diverse communities.', 88, 20),
(8822, 'The Escape Room Game Long Island', 'Each Escape Room will present a series of challenges and more than one room to escape. You have 60 minutes. Think you have what it takes? Challenging and fun experience guaranteed!!!', 88, 60),
(9900, 'The Metropolitan Museum of Art', 'At New York City\'s most visited museum and attraction, you will experience over 5,000 years of art from around the world. The Met is for anyone as a source of inspiration, insight and understanding. You can learn, escape, play, dream, discover, connect.', 99, 25),
(9922, 'Statue of Liberty and Ellis Island Guided Tour', 'Enjoy a seamless visit to the Statue of Liberty and Ellis Island in New York Harbor.Your guide takes you through Lady Liberty’s pedestal and to its observation decks, as well as through the Great Hall exhibits at Ellis Island.', 99, 57),
(9933, 'Manhattan Sky Tour: New York Helicopter Flight', 'From downtown skyscrapers to the Statue of Liberty, New York City is larger than life, with an iconic skyline. This helicopter flight across Manhattan and the Hudson River gives you panoramic views of the city that you can’t get from street level.', 99, 209);

-- --------------------------------------------------------

--
-- Table structure for table `Car`
--

CREATE TABLE `Car` (
  `ID` int(11) NOT NULL,
  `CarType` varchar(15) DEFAULT NULL,
  `Rent` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Car`
--

INSERT INTO `Car` (`ID`, `CarType`, `Rent`) VALUES
(103, 'Honda', 8),
(104, 'Jeep', 38),
(110, 'Subaru', 29.99),
(111, 'Jeep', 41);

-- --------------------------------------------------------

--
-- Table structure for table `Cruise`
--

CREATE TABLE `Cruise` (
  `ID` int(11) NOT NULL,
  `Cost` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Cruise`
--

INSERT INTO `Cruise` (`ID`, `Cost`) VALUES
(102, 550),
(105, 700),
(113, 860),
(114, 238);

-- --------------------------------------------------------

--
-- Table structure for table `family`
--

CREATE TABLE `family` (
  `FamilyID` int(11) NOT NULL,
  `Size` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `family`
--

INSERT INTO `family` (`FamilyID`, `Size`) VALUES
(123, 32),
(654, 1),
(655, 1),
(656, 2),
(657, 1),
(658, 2),
(659, 1),
(660, 1),
(661, 1),
(662, 1),
(663, 1),
(664, 1),
(665, 1),
(666, 1),
(667, 1),
(668, 1),
(669, 1),
(670, 1),
(671, 1),
(672, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Flight`
--

CREATE TABLE `Flight` (
  `ID` int(11) NOT NULL,
  `Fare` double DEFAULT NULL,
  `Class` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Flight`
--

INSERT INTO `Flight` (`ID`, `Fare`, `Class`) VALUES
(100, 160, 'Business'),
(101, 199, 'Business'),
(106, 115, 'Economy'),
(107, 79, 'Economy'),
(108, 189, 'Business'),
(109, 310, 'First'),
(112, 299, 'First');

-- --------------------------------------------------------

--
-- Table structure for table `Location`
--

CREATE TABLE `Location` (
  `ID` int(11) NOT NULL,
  `City` varchar(25) NOT NULL,
  `State` varchar(25) NOT NULL DEFAULT '',
  `Country` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Location`
--

INSERT INTO `Location` (`ID`, `City`, `State`, `Country`) VALUES
(88, 'Stony Brook', 'New York', 'USA'),
(99, 'New York', 'New York', 'USA'),
(121212, 'Paris', ' ', 'France'),
(123456, 'Portland', 'Oregon', 'USA');

-- --------------------------------------------------------

--
-- Table structure for table `passenger`
--

CREATE TABLE `passenger` (
  `PassengerID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Age` int(3) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `GroupID` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `passenger`
--

INSERT INTO `passenger` (`PassengerID`, `Name`, `Password`, `Age`, `Gender`, `GroupID`) VALUES
(52, 'kim', 'master', 21, 'f', '123'),
(444444, '', '', 23, '', NULL),
(3333333, '', '', 15, '', NULL),
(3333334, 'kiki', 'zlzl', 38, 'f', '667'),
(3333335, 'jojo', 'whwh', 42, 'm', '668'),
(3333336, 'haha', 'haha', 43, 'm', '669'),
(3333337, 'li', 'li', 19, 'f', '670'),
(3333338, 'user', 'dbwj', 20, 'f', '671'),
(3333339, 'Yogi', 'cse', 19, 'm', '672');

-- --------------------------------------------------------

--
-- Table structure for table `Payment`
--

CREATE TABLE `Payment` (
  `ID` int(10) NOT NULL,
  `CardNumber` varchar(16) NOT NULL,
  `Expiration` date NOT NULL,
  `Name` varchar(46) NOT NULL,
  `ReservationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Payment`
--

INSERT INTO `Payment` (`ID`, `CardNumber`, `Expiration`, `Name`, `ReservationID`) VALUES
(11, '1111222233334444', '2018-06-01', 'john john', 17),
(12, '5678567856785678', '2018-06-28', 'Merong', 17),
(14, '7777777777777777', '2018-07-13', 'LEE LEE', 19),
(15, '7777777777777777', '2018-07-13', 'LEE LEE', 19),
(19, '1234123412341234', '2018-06-09', 'LEE LEE', 28),
(21, '1234123412341234', '2018-06-09', 'LEE LEE', 28),
(22, '2929292929292929', '2018-06-07', 'LEE LEE', 36),
(23, '3456345634563456', '2020-10-01', 'Chen Chen', 38),
(31, '2929292929292929', '2018-05-30', 'Chen Chen', 78),
(32, '7777777777777777', '2020-11-24', 'Chen Chen', 101),
(35, '3456345634563456', '2018-05-31', 'John Doe', 102),
(36, '2929292929292929', '2018-06-07', 'LEE LEE', 103),
(37, '2929292929292929', '2018-05-31', 'Chen Chen', 14);

-- --------------------------------------------------------

--
-- Table structure for table `Reservation`
--

CREATE TABLE `Reservation` (
  `reservationId` int(11) NOT NULL,
  `typeId` int(11) NOT NULL,
  `type` varchar(45) NOT NULL,
  `sourceLocation` int(11) NOT NULL,
  `destinationLocation` int(11) DEFAULT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `paymentId` int(11) DEFAULT NULL,
  `userID` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Reservation`
--

INSERT INTO `Reservation` (`reservationId`, `typeId`, `type`, `sourceLocation`, `destinationLocation`, `startDate`, `endDate`, `paymentId`, `userID`) VALUES
(14, 107, 'flight', 99, 123456, '2018-06-04', '2018-06-09', 37, '3333336'),
(15, 103, 'car', 88, 99, '2018-05-25', '2018-05-26', NULL, '3333336'),
(17, 112, 'flight', 123456, 99, '2018-05-02', '2018-05-23', NULL, '3333336'),
(18, 112, 'flight', 123456, 99, '2018-06-19', '2018-06-20', NULL, '3333336'),
(19, 112, 'flight', 123456, 99, '2018-04-11', '2018-05-16', NULL, '3333336'),
(23, 8899, 'accommodation', 0, NULL, '2018-05-08', '2018-05-25', NULL, '3333336'),
(24, 8811, 'activity', 0, NULL, '2018-05-16', NULL, NULL, '3333336'),
(25, 112, 'flight', 123456, 99, '2018-06-01', '2018-06-02', NULL, '3333336');

-- --------------------------------------------------------

--
-- Table structure for table `Transportation`
--

CREATE TABLE `Transportation` (
  `ID` int(11) NOT NULL,
  `Type` varchar(10) NOT NULL,
  `Source` int(11) NOT NULL,
  `Destination` int(11) NOT NULL,
  `Name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Transportation`
--

INSERT INTO `Transportation` (`ID`, `Type`, `Source`, `Destination`, `Name`) VALUES
(100, 'flight', 99, 121212, 'Flamingo Air'),
(101, 'flight', 99, 121212, 'Delta Airlines'),
(102, 'cruise', 99, 121212, 'JetBlue Airways'),
(103, 'car', 88, 99, 'CarRental8'),
(104, 'car', 88, 99, 'Speedy Rentals'),
(105, 'cruise', 99, 121212, 'Viking Cruises'),
(106, 'flight', 99, 123456, 'Panam'),
(107, 'flight', 99, 123456, 'SouthWestern Airlines'),
(108, 'flight', 121212, 99, 'Oceanic Airlines'),
(109, 'flight', 121212, 99, 'Oceanic Airlines'),
(110, 'car', 99, 123456, 'RentACar'),
(111, 'car', 123456, 123456, 'Rent-A-Car'),
(112, 'flight', 123456, 99, 'United Airlines'),
(113, 'cruise', 121212, 99, 'Titanic Cruiselines'),
(114, 'cruise', 99, 121212, 'Seabourn Cruises');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Accommodation`
--
ALTER TABLE `Accommodation`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `LocationID` (`LocationID`);

--
-- Indexes for table `Activity`
--
ALTER TABLE `Activity`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `locationID` (`locationID`);

--
-- Indexes for table `Car`
--
ALTER TABLE `Car`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Cruise`
--
ALTER TABLE `Cruise`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `family`
--
ALTER TABLE `family`
  ADD UNIQUE KEY `FamilyID` (`FamilyID`);

--
-- Indexes for table `Flight`
--
ALTER TABLE `Flight`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Location`
--
ALTER TABLE `Location`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `passenger`
--
ALTER TABLE `passenger`
  ADD PRIMARY KEY (`PassengerID`);

--
-- Indexes for table `Payment`
--
ALTER TABLE `Payment`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ReservationID_2` (`ReservationID`);

--
-- Indexes for table `Reservation`
--
ALTER TABLE `Reservation`
  ADD PRIMARY KEY (`reservationId`);

--
-- Indexes for table `Transportation`
--
ALTER TABLE `Transportation`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `transportation_ibfk_1` (`Source`),
  ADD KEY `Destination` (`Destination`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Payment`
--
ALTER TABLE `Payment`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `Reservation`
--
ALTER TABLE `Reservation`
  MODIFY `reservationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Accommodation`
--
ALTER TABLE `Accommodation`
  ADD CONSTRAINT `accommodation_ibfk_1` FOREIGN KEY (`LocationID`) REFERENCES `Location` (`ID`);

--
-- Constraints for table `Activity`
--
ALTER TABLE `Activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`locationID`) REFERENCES `Location` (`ID`);

--
-- Constraints for table `Car`
--
ALTER TABLE `Car`
  ADD CONSTRAINT `car_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `Transportation` (`ID`);

--
-- Constraints for table `Cruise`
--
ALTER TABLE `Cruise`
  ADD CONSTRAINT `cruise_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `Transportation` (`ID`);

--
-- Constraints for table `Flight`
--
ALTER TABLE `Flight`
  ADD CONSTRAINT `flight_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `Transportation` (`ID`);

--
-- Constraints for table `Payment`
--
ALTER TABLE `Payment`
  ADD CONSTRAINT `rsvpid-foreign` FOREIGN KEY (`ReservationID`) REFERENCES `Reservation` (`reservationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Transportation`
--
ALTER TABLE `Transportation`
  ADD CONSTRAINT `transportation_ibfk_1` FOREIGN KEY (`Source`) REFERENCES `Location` (`ID`),
  ADD CONSTRAINT `transportation_ibfk_2` FOREIGN KEY (`Destination`) REFERENCES `Location` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
