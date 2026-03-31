-- Active: 1773972300148@@127.0.0.1@3306@restauranttestdb
CREATE DATABASE RestaurantTestDB;
USE RestaurantTestDB;

CREATE TABLE ingredients(
	ingredientID INT PRIMARY KEY,
    _name VARCHAR(20),
    pricePerUnit FLOAT NOT NULL CONSTRAINT pricePerUnitCheck CHECK (pricePerUnit > 0),
    quantity FLOAT
);

CREATE TABLE products(
	productID INT PRIMARY KEY,
    _name VARCHAR(20) NOT NULL,
    price FLOAT NOT NULL CONSTRAINT priceCheck CHECK(price > 0),
    menuType SMALLINT,
    isAvailable BOOL NOT NULL,
    stationID SMALLINT

);

CREATE TABLE transactions(
	transactionID INT PRIMARY KEY AUTO_INCREMENT,
    tableID INT,
    employeeID INT NOT NULL,
    customerID INT,
    timePlaced DATETIME NOT NULL,
    total FLOAT,
    tipAmount FLOAT,
    paymentMethod SMALLINT
);

CREATE TABLE purchase_orders(
	orderID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    supplierName VARCHAR(50),
    ingredientID INT,
    quantity INT,
    dateOrdered DATETIME
);

CREATE TABLE product_orders(
	quantity SMALLINT,
	productID INT,
	transactionID INT,
	PRIMARY KEY (transactionID, productID)
);

CREATE TABLE recipes(
	recipeID INT PRIMARY KEY,
	ingredientID INT,
    finishedProductID INT,
    intermediateProductID INT
);

CREATE TABLE customers(
	customerID INT PRIMARY KEY AUTO_INCREMENT,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	dob DATE,
	dateJoined DATE,
	phoneNumber VARCHAR(20), -- made it a str for formatting purposes e.g. (XXX)-XXX-XXXX
	email VARCHAR(100) UNIQUE NOT NULL,
	`status` BOOL DEFAULT true,
	rewardPoints INT DEFAULT 0
);

CREATE TABLE employees (
  employeeID INT PRIMARY KEY AUTO_INCREMENT,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  dateHired DATE NOT NULL,
  dateOfBirth DATE,
  shiftRole SMALLINT,
  hourlyRate FLOAT,
  sectionID INT,
  hashedPassword VARCHAR(255)
);

CREATE TABLE pay_periods(
    payPeriodID INT AUTO_INCREMENT PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    CONSTRAINT endDateAfterStartDate CHECK (endDate > startDate)
);

CREATE TABLE payroll_records(
    employeeID INT,
    payPeriodID INT,
    totalHours FLOAT,
    totalPay FLOAT,

    PRIMARY KEY (employeeID, payPeriodID)
);

CREATE TABLE printers(
	stationID SMALLINT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE scheduled_shifts(
	scheduledShiftID INT PRIMARY KEY AUTO_INCREMENT,
	startTime DATETIME,
	endTime DATETIME,
	shiftRole SMALLINT
);

CREATE TABLE sections (
  sectionID INT PRIMARY KEY AUTO_INCREMENT,
  employeeID INT
);

CREATE TABLE `tables` (
  tableID INT PRIMARY KEY AUTO_INCREMENT,
  capacity INT NOT NULL,
  sectionID INT NOT NULL
);

CREATE TABLE timeclock_entries(
	entryID INT AUTO_INCREMENT PRIMARY KEY,
    clockIn DATETIME,
    clockOUT DATETIME,
    payPeriodID INT NOT NULL,
    employeeID INT NOT NULL,
    scheduledShiftID INT
);
