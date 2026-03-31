-- USE RESTAURANTTESTCOPYDB;

-- LOW INGREDIENT TRIGGER --

DELIMITER //

CREATE TRIGGER lowInventory 
BEFORE UPDATE ON ingredients

FOR EACH ROW

BEGIN

IF (NEW.quantity < 25 AND OLD.quantity >= 25)
THEN

INSERT INTO purchase_orders (supplierName, ingredientID, quantity)
VALUES('SupplierInc', NEW.ingredientID, 300);

SET NEW.quantity = NEW.quantity + 300;

END IF;

END// -- this works


-- CUSTOMER DISCOUNT TRIGGER --

DELIMITER $$

CREATE TRIGGER custDiscount -- if the difference in reward points is (this number) then apply a certain discount to transaction
AFTER UPDATE ON customers

FOR EACH ROW

BEGIN

DECLARE latestCustTransactionID INT; -- declares local variable in mySQL

IF ( (OLD.rewardPoints - NEW.rewardPoints) > 25) -- if the difference between old points and new points is greater than 25, 10 discount on customerID's transaction
THEN

SELECT transactionID
INTO latestCustTransactionID -- select into takes a query result and stores it in a variable
FROM transactions
WHERE customerID = NEW.customerID
ORDER BY transactionID DESC
LIMIT 1;


UPDATE transactions
SET total = total - (total * 0.10) -- applies 10% discount to total
WHERE transactionID = latestCustTransactionID;

END IF;

END$$ -- this works





