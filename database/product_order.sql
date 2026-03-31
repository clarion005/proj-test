CREATE TABLE product_orders(
quantity SMALLINT,
productID INT,
transactionID INT,
PRIMARY KEY (transactionID, productID),
FOREIGN KEY (transactionID) REFERENCES transactions(transactionID),
FOREIGN KEY (productID) REFERENCES product(productID)
);