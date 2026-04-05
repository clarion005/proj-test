CREATE TABLE payroll_records(
    employeeID INT,
    payPeriodID INT,
    totalHours FLOAT,
    totalPay FLOAT,

    PRIMARY KEY (employeeID, payPeriodID),
);