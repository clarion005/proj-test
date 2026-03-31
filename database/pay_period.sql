CREATE TABLE pay_periods(
    payPeriodID INT AUTO_INCREMENT PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    CONSTRAINT endDateAfterStartDate CHECK (endDate > startDate)
);