-- USE RESTAURANTTESTCOPYDB;

-- LOW INGREDIENT TRIGGER --

-- DELIMITER //
-- 
-- CREATE TRIGGER lowInventory 
-- BEFORE UPDATE ON ingredients
-- 
-- FOR EACH ROW
-- 
-- BEGIN
-- 
-- IF (NEW.quantity < 25 AND OLD.quantity >= 25)
-- THEN
-- 
-- INSERT INTO purchase_orders (supplierName, ingredientID, quantity)
-- VALUES('SupplierInc', NEW.ingredientID, 300);
-- 
-- SET NEW.quantity = NEW.quantity + 300;
-- 
-- END IF;
-- 
-- END// -- this works
-- 
-- 
-- -- CUSTOMER DISCOUNT TRIGGER --
-- 
-- DELIMITER $$
-- 
-- CREATE TRIGGER custDiscount -- if the difference in reward points is (this number) then apply a certain discount to transaction
-- AFTER UPDATE ON customers
-- 
-- FOR EACH ROW
-- 
-- BEGIN
-- 
-- DECLARE latestCustTransactionID INT; -- declares local variable in mySQL
-- 
-- IF ( (OLD.rewardPoints - NEW.rewardPoints) > 25) -- if the difference between old points and new points is greater than 25, 10 discount on customerID's transaction
-- THEN
-- 
-- SELECT transactionID
-- INTO latestCustTransactionID -- select into takes a query result and stores it in a variable
-- FROM transactions
-- WHERE customerID = NEW.customerID
-- ORDER BY transactionID DESC
-- LIMIT 1;
-- 
-- 
-- UPDATE transactions
-- SET total = total - (total * 0.10) -- applies 10% discount to total
-- WHERE transactionID = latestCustTransactionID;
-- 
-- END IF;
-- 
-- END$$ -- this works

-- USE INGREDIENT TRIGGER --

-- DELIMITER //

-- CREATE TRIGGER useIngredients
-- AFTER INSERT ON product_orders
-- 
-- FOR EACH ROW
-- 
-- BEGIN
-- 
-- UPDATE ingredients
-- INNER JOIN recipes r ON r.ingredientID = ingredients.ingredientID
-- INNER JOIN products p ON r.finishedProductID = p.productID
-- INNER JOIN product_orders po ON p.productID = po.productID
-- SET ingredients.quantity = ingredients.quantity - (r.quantity * NEW.quantity) -- original was 319
-- WHERE r.finishedProductID = NEW.productID; -- this works!
-- 
-- END// -- THIS WORKS AS INTENDED

-- DELIMITER //
-- 
-- CREATE TRIGGER addToTabTotal -- WORKS AS INTENDED
-- AFTER INSERT on product_orders
-- 
-- FOR EACH ROW
-- 
-- BEGIN
-- 
-- UPDATE transactions
-- INNER JOIN products p ON p.productID = NEW.productID
-- SET transactions.total = transactions.total + (NEW.quantity * p.price)
-- WHERE transactions.transactionID = NEW.transactionID;
-- 
-- END//
-- 
-- 
--

-- DELIMITER //
--  
-- CREATE TRIGGER deleteFromTabTotal -- WORKS AS INTENDED
-- AFTER DELETE on product_orders
-- 
-- FOR EACH ROW
-- 
-- BEGIN
-- 
-- UPDATE transactions
-- INNER JOIN products p ON p.productID = OLD.productID
-- SET transactions.total = transactions.total - (OLD.quantity * p.price)
-- WHERE transactions.transactionID = OLD.transactionID;
-- 
-- END//
-- 
--

-- DELIMITER //
--  
-- CREATE TRIGGER updateTabTotal
-- AFTER UPDATE on product_orders
-- 
-- FOR EACH ROW
-- 
-- BEGIN
-- 
-- UPDATE transactions
-- INNER JOIN products p_Old ON p_Old.productID = OLD.productID
-- INNER JOIN products p_New ON p_New.productID = NEW.productID
-- SET transactions.total = transactions.total - (OLD.quantity * p_Old.price) + (NEW.quantity * p_New.price)
-- WHERE transactions.transactionID = NEW.transactionID;
-- 
-- END//






