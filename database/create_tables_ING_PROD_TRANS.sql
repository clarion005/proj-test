CREATE TABLE ingredients(
	ingredientID INT PRIMARY KEY,
    _name SMALLINT,
    pricePerUnit FLOAT,
    quantity FLOAT
);

CREATE TABLE product(
	productID INT PRIMARY KEY,
    ingredientID INT,
    _name SMALLINT,
    price FLOAT,
    menu_type SMALLINT,
    isAvailable BOOL,
    stationID SMALLINT
);

CREATE TABLE transactions(
	transactionID INT PRIMARY KEY,
    tableID INT,
    employeeID INT NOT NULL,
    customerID INT,
    timePlaced DATETIME,
    total FLOAT,
    tipAmount FLOAT,
    paymentMethod SMALLINT
);

CREATE TABLE recipe(
	ingredientID INT,
    finished_productID INT,
    intermediate_productID INT
);
