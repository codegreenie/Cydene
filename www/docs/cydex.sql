-- phpMyAdmin SQL Dump
-- version 3.2.0.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 07, 2018 at 07:52 PM
-- Server version: 5.1.36
-- PHP Version: 5.3.0

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cydene`
--

-- --------------------------------------------------------

--
-- Table structure for table `cydene_buyers`
--

CREATE TABLE IF NOT EXISTS `cydene_buyers` (
  `SN` int(10) NOT NULL AUTO_INCREMENT,
  `First_Name` varchar(50) NOT NULL,
  `Last_Name` varchar(50) NOT NULL,
  `Mail` varchar(100) NOT NULL,
  `PIN` varchar(100) NOT NULL,
  `PIN_Salt` varchar(100) NOT NULL,
  `Account_Status` text NOT NULL,
  `Phone_Data` int(20) NOT NULL,
  PRIMARY KEY (`SN`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `cydene_buyers`
--


-- --------------------------------------------------------

--
-- Table structure for table `cydene_buyers_addr`
--

CREATE TABLE IF NOT EXISTS `cydene_buyers_addr` (
  `SN` int(10) NOT NULL AUTO_INCREMENT,
  `Addr_Name` varchar(100) NOT NULL,
  `The_Addr` varchar(1000) NOT NULL,
  `Lat` float(10,6) NOT NULL,
  `Long` float(10,6) NOT NULL,
  `Addr_Owner` varchar(10) NOT NULL,
  PRIMARY KEY (`SN`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `cydene_buyers_addr`
--


-- --------------------------------------------------------

--
-- Table structure for table `cydene_sellers`
--

CREATE TABLE IF NOT EXISTS `cydene_sellers` (
  `SN` int(10) NOT NULL AUTO_INCREMENT,
  `Seller_Name` varchar(50) NOT NULL,
  `Mail` varchar(100) NOT NULL,
  `Seller_Address` text NOT NULL,
  `Lat` float(10,6) NOT NULL,
  `Long` float(10,6) NOT NULL,
  `Account_Status` text NOT NULL,
  `Phone_Data` int(20) NOT NULL,
  `Availability` text NOT NULL,
  `Logo` varchar(200) NOT NULL,
  PRIMARY KEY (`SN`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `cydene_sellers`
--

INSERT INTO `cydene_sellers` (`SN`, `Seller_Name`, `Mail`, `Seller_Address`, `Lat`, `Long`, `Account_Status`, `Phone_Data`, `Availability`, `Logo`) VALUES
(1, 'Lasgidi Gas', 'lasgidi@gas.com', '190 Murtala Muhammed Way, Lagos, Nigeria', 6.493154, 3.378551, 'Active', 6, 'available', 'cylinder.png'),
(2, 'Laspamas Gas', 'laspamasgas@gmail.com', 'Aminu Kano Crescent, Abuja, Nigeria', 9.083428, 7.469273, 'Active', 2, 'available', 'cylinder.png');

-- --------------------------------------------------------

--
-- Table structure for table `cydene_users`
--

CREATE TABLE IF NOT EXISTS `cydene_users` (
  `SN` int(10) NOT NULL AUTO_INCREMENT,
  `Phone_Number` varchar(20) NOT NULL,
  `OTP` varchar(10) NOT NULL,
  PRIMARY KEY (`SN`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `cydene_users`
--

INSERT INTO `cydene_users` (`SN`, `Phone_Number`, `OTP`) VALUES
(1, '+2348127632058', '820692'),
(2, '+2348110097532', '819986'),
(3, '+2348090919697', '727457'),
(4, '+2348025184092', '118028'),
(5, '+2347056984834', '803086'),
(6, '+2348052628651', '666856'),
(7, '+2348052628652', '802761');

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

CREATE TABLE IF NOT EXISTS `offers` (
  `SN` int(20) NOT NULL AUTO_INCREMENT,
  `Offer_Name` varchar(50) NOT NULL,
  `Offer_Details` varchar(150) NOT NULL,
  `Offer_Code` varchar(20) NOT NULL,
  `Offer_Value` int(10) NOT NULL,
  `Offer_Expiry_Date` date NOT NULL,
  `Offer_Status` text NOT NULL,
  PRIMARY KEY (`SN`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `offers`
--

INSERT INTO `offers` (`SN`, `Offer_Name`, `Offer_Details`, `Offer_Code`, `Offer_Value`, `Offer_Expiry_Date`, `Offer_Status`) VALUES
(1, 'Cylinder Santa', 'Get your cylinders refilled this xmas season at 45% discount in Lagos. Offer valid only once. Hurry Now and refill your cylinder.', 'XMASNG17', 45, '2018-01-27', 'active'),
(2, 'Valentine Special', 'Special moments for special love beds. 65% off!', 'VAL14', 65, '2018-01-26', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `offers_usage`
--

CREATE TABLE IF NOT EXISTS `offers_usage` (
  `SN` bigint(10) NOT NULL AUTO_INCREMENT,
  `Coupon_SN` bigint(10) NOT NULL,
  `Coupon_User` bigint(10) NOT NULL,
  `Date_Used` date NOT NULL,
  PRIMARY KEY (`SN`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `offers_usage`
--


-- --------------------------------------------------------

--
-- Table structure for table `price_quotes`
--

CREATE TABLE IF NOT EXISTS `price_quotes` (
  `SN` bigint(10) NOT NULL AUTO_INCREMENT,
  `cylinder_size` varchar(10) NOT NULL,
  `price` bigint(20) NOT NULL,
  `quote_owner` bigint(10) NOT NULL,
  PRIMARY KEY (`SN`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `price_quotes`
--


-- --------------------------------------------------------

--
-- Table structure for table `scheduled_booking`
--

CREATE TABLE IF NOT EXISTS `scheduled_booking` (
  `SN` bigint(20) NOT NULL AUTO_INCREMENT,
  `buyer` bigint(20) NOT NULL,
  `size` varchar(10) NOT NULL,
  `quantity` bigint(5) NOT NULL,
  `recurring_date` date NOT NULL,
  `delivery_address` bigint(10) NOT NULL,
  `seller` int(20) NOT NULL,
  `transaction_status` text NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`SN`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `scheduled_booking`
--


-- --------------------------------------------------------

--
-- Table structure for table `scheduled_booking_history`
--

CREATE TABLE IF NOT EXISTS `scheduled_booking_history` (
  `SN` bigint(20) NOT NULL AUTO_INCREMENT,
  `Tnx_SN` bigint(20) NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`SN`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `scheduled_booking_history`
--


-- --------------------------------------------------------

--
-- Table structure for table `sellers_wallet`
--

CREATE TABLE IF NOT EXISTS `sellers_wallet` (
  `SN` bigint(5) NOT NULL AUTO_INCREMENT,
  `Wallet_owner` bigint(20) NOT NULL,
  `Wallet_balance` bigint(20) NOT NULL,
  `Wallet_status` text NOT NULL,
  PRIMARY KEY (`SN`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `sellers_wallet`
--


-- --------------------------------------------------------

--
-- Table structure for table `seller_bank_accounts`
--

CREATE TABLE IF NOT EXISTS `seller_bank_accounts` (
  `SN` bigint(10) NOT NULL AUTO_INCREMENT,
  `Bank_Name` text NOT NULL,
  `Account_Name` varchar(100) NOT NULL,
  `Account_Number` text NOT NULL,
  `Account_Bvn_Number` text NOT NULL,
  `Account_Owner` bigint(10) NOT NULL,
  PRIMARY KEY (`SN`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `seller_bank_accounts`
--


-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE IF NOT EXISTS `transactions` (
  `SN` bigint(20) NOT NULL AUTO_INCREMENT,
  `cylinder_size` varchar(10) NOT NULL,
  `quantity` bigint(10) NOT NULL,
  `total_price` bigint(10) NOT NULL,
  `transaction_id` varchar(50) NOT NULL,
  `buyer` bigint(20) NOT NULL,
  `seller` bigint(20) NOT NULL,
  `transaction_status` text NOT NULL,
  `transaction_date` date NOT NULL,
  `payment_method` text NOT NULL,
  `delivery_address` bigint(10) NOT NULL,
  PRIMARY KEY (`SN`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `transactions`
--


-- --------------------------------------------------------

--
-- Table structure for table `version_control`
--

CREATE TABLE IF NOT EXISTS `version_control` (
  `SN` int(5) NOT NULL AUTO_INCREMENT,
  `current_version` varchar(20) NOT NULL,
  PRIMARY KEY (`SN`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `version_control`
--

INSERT INTO `version_control` (`SN`, `current_version`) VALUES
(1, '1.0.4');

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE IF NOT EXISTS `wallet` (
  `SN` bigint(5) NOT NULL AUTO_INCREMENT,
  `Wallet_owner` bigint(20) NOT NULL,
  `Wallet_balance` bigint(10) NOT NULL,
  `Wallet_status` text NOT NULL,
  PRIMARY KEY (`SN`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `wallet`
--


-- --------------------------------------------------------

--
-- Table structure for table `wallet_transactions`
--

CREATE TABLE IF NOT EXISTS `wallet_transactions` (
  `SN` bigint(20) NOT NULL AUTO_INCREMENT,
  `Wallet_owner` bigint(20) NOT NULL,
  `Action_type` varchar(20) NOT NULL,
  `Amount` bigint(10) NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`SN`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `wallet_transactions`
--

