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