-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: restauranttestdb
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customerID` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `dob` date DEFAULT NULL,
  `dateJoined` date DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `rewardPoints` int DEFAULT '0',
  PRIMARY KEY (`customerID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employeeID` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `dateHired` date NOT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `ShiftRole` smallint DEFAULT NULL,
  `hourlyRate` float DEFAULT NULL,
  `sectionID` int DEFAULT NULL,
  PRIMARY KEY (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `ingredientID` int NOT NULL,
  `_name` varchar(20) DEFAULT NULL,
  `pricePerUnit` float NOT NULL,
  `quantity` float DEFAULT NULL,
  PRIMARY KEY (`ingredientID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay_periods`
--

DROP TABLE IF EXISTS `pay_periods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pay_periods` (
  `payPeriodID` int NOT NULL AUTO_INCREMENT,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  PRIMARY KEY (`payPeriodID`),
  CONSTRAINT `endDateAfterStartDate` CHECK ((`endDate` > `startDate`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_periods`
--

LOCK TABLES `pay_periods` WRITE;
/*!40000 ALTER TABLE `pay_periods` DISABLE KEYS */;
/*!40000 ALTER TABLE `pay_periods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_records`
--

DROP TABLE IF EXISTS `payroll_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payroll_records` (
  `employeeID` int NOT NULL,
  `payPeriodID` int NOT NULL,
  `totalHours` float DEFAULT NULL,
  `totalPay` float DEFAULT NULL,
  PRIMARY KEY (`employeeID`,`payPeriodID`),
  KEY `fkPayrollRecordsPayPeriodID` (`payPeriodID`),
  CONSTRAINT `fkPayrollRecordsEmployeeID` FOREIGN KEY (`employeeID`) REFERENCES `employees` (`employeeID`) ON DELETE RESTRICT,
  CONSTRAINT `fkPayrollRecordsPayPeriodID` FOREIGN KEY (`payPeriodID`) REFERENCES `pay_periods` (`payPeriodID`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_records`
--

LOCK TABLES `payroll_records` WRITE;
/*!40000 ALTER TABLE `payroll_records` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `printers`
--

DROP TABLE IF EXISTS `printers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `printers` (
  `stationID` smallint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`stationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `printers`
--

LOCK TABLES `printers` WRITE;
/*!40000 ALTER TABLE `printers` DISABLE KEYS */;
/*!40000 ALTER TABLE `printers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_orders`
--

DROP TABLE IF EXISTS `product_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_orders` (
  `quantity` smallint DEFAULT NULL,
  `productID` int NOT NULL,
  `transactionID` int NOT NULL,
  PRIMARY KEY (`transactionID`,`productID`),
  KEY `fkProductID` (`productID`),
  CONSTRAINT `fkProductID` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`) ON DELETE RESTRICT,
  CONSTRAINT `fkTransactionID` FOREIGN KEY (`transactionID`) REFERENCES `transactions` (`transactionID`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_orders`
--

LOCK TABLES `product_orders` WRITE;
/*!40000 ALTER TABLE `product_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productID` int NOT NULL,
  `_name` varchar(20) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `menuType` smallint DEFAULT NULL,
  `isAvailable` tinyint(1) NOT NULL,
  `stationID` smallint DEFAULT NULL,
  PRIMARY KEY (`productID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_orders`
--

DROP TABLE IF EXISTS `purchase_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_orders` (
  `orderID` int NOT NULL AUTO_INCREMENT,
  `supplierName` varchar(50) DEFAULT NULL,
  `ingredientID` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `dateOrdered` datetime DEFAULT NULL,
  PRIMARY KEY (`orderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_orders`
--

LOCK TABLES `purchase_orders` WRITE;
/*!40000 ALTER TABLE `purchase_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `recipeID` int NOT NULL,
  `ingredientID` int DEFAULT NULL,
  `finishedProductID` int DEFAULT NULL,
  `intermediateProductID` int DEFAULT NULL,
  PRIMARY KEY (`recipeID`),
  KEY `fkFinishedProductID` (`finishedProductID`),
  KEY `fkIntermediateProductID` (`intermediateProductID`),
  KEY `fkIngredientID` (`ingredientID`),
  CONSTRAINT `fkFinishedProductID` FOREIGN KEY (`finishedProductID`) REFERENCES `products` (`productID`) ON DELETE RESTRICT,
  CONSTRAINT `fkIngredientID` FOREIGN KEY (`ingredientID`) REFERENCES `ingredients` (`ingredientID`) ON DELETE RESTRICT,
  CONSTRAINT `fkIntermediateProductID` FOREIGN KEY (`intermediateProductID`) REFERENCES `products` (`productID`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scheduled_shifts`
--

DROP TABLE IF EXISTS `scheduled_shifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scheduled_shifts` (
  `scheduledShiftID` int NOT NULL AUTO_INCREMENT,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `shiftRole` smallint DEFAULT NULL,
  PRIMARY KEY (`scheduledShiftID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheduled_shifts`
--

LOCK TABLES `scheduled_shifts` WRITE;
/*!40000 ALTER TABLE `scheduled_shifts` DISABLE KEYS */;
/*!40000 ALTER TABLE `scheduled_shifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sections` (
  `sectionID` int NOT NULL AUTO_INCREMENT,
  `employeeID` int DEFAULT NULL,
  PRIMARY KEY (`sectionID`),
  KEY `fkSectionsEmployeeID` (`employeeID`),
  CONSTRAINT `fkSectionsEmployeeID` FOREIGN KEY (`employeeID`) REFERENCES `employees` (`employeeID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tables` (
  `tableID` int NOT NULL AUTO_INCREMENT,
  `capacity` int NOT NULL,
  `sectionID` int NOT NULL,
  PRIMARY KEY (`tableID`),
  KEY `fkSectionID` (`sectionID`),
  CONSTRAINT `fkSectionID` FOREIGN KEY (`sectionID`) REFERENCES `sections` (`sectionID`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tables`
--

LOCK TABLES `tables` WRITE;
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timeclock_entries`
--

DROP TABLE IF EXISTS `timeclock_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timeclock_entries` (
  `entryID` int NOT NULL AUTO_INCREMENT,
  `clockIn` datetime DEFAULT NULL,
  `clockOUT` datetime DEFAULT NULL,
  `payPeriodID` int NOT NULL,
  `employeeID` int NOT NULL,
  `scheduledShiftID` int DEFAULT NULL,
  PRIMARY KEY (`entryID`),
  KEY `fkTimeClockEntriesPayPeriodID` (`payPeriodID`),
  KEY `fkTimeClockEntriesEmployeeID` (`employeeID`),
  KEY `fkTimeClockEntriesScheduledShiftID` (`scheduledShiftID`),
  CONSTRAINT `fkTimeClockEntriesEmployeeID` FOREIGN KEY (`employeeID`) REFERENCES `employees` (`employeeID`) ON DELETE RESTRICT,
  CONSTRAINT `fkTimeClockEntriesPayPeriodID` FOREIGN KEY (`payPeriodID`) REFERENCES `pay_periods` (`payPeriodID`) ON DELETE RESTRICT,
  CONSTRAINT `fkTimeClockEntriesScheduledShiftID` FOREIGN KEY (`scheduledShiftID`) REFERENCES `scheduled_shifts` (`scheduledShiftID`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeclock_entries`
--

LOCK TABLES `timeclock_entries` WRITE;
/*!40000 ALTER TABLE `timeclock_entries` DISABLE KEYS */;
/*!40000 ALTER TABLE `timeclock_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transactionID` int NOT NULL AUTO_INCREMENT,
  `tableID` int DEFAULT NULL,
  `employeeID` int NOT NULL,
  `customerID` int DEFAULT NULL,
  `timePlaced` datetime NOT NULL,
  `total` float DEFAULT NULL,
  `tipAmount` float DEFAULT NULL,
  `paymentMethod` smallint DEFAULT NULL,
  PRIMARY KEY (`transactionID`),
  KEY `fkTableID` (`tableID`),
  KEY `fkEmployeeID` (`employeeID`),
  CONSTRAINT `fkEmployeeID` FOREIGN KEY (`employeeID`) REFERENCES `employees` (`employeeID`) ON DELETE RESTRICT,
  CONSTRAINT `fkTableID` FOREIGN KEY (`tableID`) REFERENCES `tables` (`tableID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-04 18:09:49
