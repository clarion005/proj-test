CREATE TABLE timeclock_entries(
    entryID INT AUTO_INCREMENT PRIMARY KEY,
    clockIn DATETIME,
    clockOut DATETIME,
    payPeriodID INT NOT NULL,
    employeeID INT NOT NULL,
    scheduledShiftID INT,
);