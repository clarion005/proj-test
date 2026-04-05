#recipe foreign keys
ALTER TABLE recipes
ADD CONSTRAINT fkFinishedProductID
FOREIGN KEY (finishedProductID) REFERENCES products(productID) ON DELETE RESTRICT,
ADD CONSTRAINT fkIntermediateProductID
FOREIGN KEY (intermediateProductID) REFERENCES products(productID) ON DELETE RESTRICT,
ADD CONSTRAINT fkIngredientID
FOREIGN KEY (ingredientID) REFERENCES ingredients(ingredientID) ON DELETE RESTRICT;

#transactions foreign keys
ALTER TABLE transactions
ADD CONSTRAINT fkTableID
FOREIGN KEY (tableID) REFERENCES `tables`(tableID) ON DELETE SET NULL,
ADD CONSTRAINT fkEmployeeID
FOREIGN KEY (employeeID) REFERENCES employees(employeeID) ON DELETE RESTRICT;

#product_order foreign keys
ALTER TABLE product_orders
ADD CONSTRAINT fkTransactionID
FOREIGN KEY (transactionID) REFERENCES transactions(transactionID) ON DELETE RESTRICT,
ADD CONSTRAINT fkProductID
FOREIGN KEY (productID) REFERENCES products(productID) ON DELETE RESTRICT;

#table foreign keys
ALTER TABLE `tables`
ADD CONSTRAINT fkSectionID
FOREIGN KEY (sectionID) REFERENCES sections(sectionID) ON DELETE RESTRICT;

#payrollRecords foreign keys
ALTER TABLE payroll_records
ADD CONSTRAINT fkPayrollRecordsEmployeeID
FOREIGN KEY (employeeID) REFERENCES employees (employeeID) ON DELETE RESTRICT,
ADD CONSTRAINT fkPayrollRecordsPayPeriodID
FOREIGN KEY (payPeriodID) REFERENCES pay_periods (payPeriodID) ON DELETE RESTRICT;

#timeclockEntries
ALTER TABLE timeclock_entries
ADD CONSTRAINT fkTimeClockEntriesPayPeriodID
FOREIGN KEY (payPeriodID) REFERENCES pay_periods (payPeriodID) ON DELETE RESTRICT,
ADD CONSTRAINT fkTimeClockEntriesEmployeeID
FOREIGN KEY (employeeID) REFERENCES employees (employeeID) ON DELETE RESTRICT,
ADD CONSTRAINT fkTimeClockEntriesScheduledShiftID
FOREIGN KEY (scheduledShiftID) REFERENCES scheduled_shifts (scheduledShiftID) ON DELETE RESTRICT;

#sections foreign keys
ALTER TABLE sections
ADD CONSTRAINT fkSectionsEmployeeID
FOREIGN KEY (employeeID) REFERENCES employees(employeeID) ON DELETE SET NULL;