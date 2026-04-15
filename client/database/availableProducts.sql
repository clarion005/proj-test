CREATE VIEW availableProducts AS
SELECT 
    p.productID,
    p._name,
    p.price,
    p.menuType,
    p.stationID,
    
    CASE 
        WHEN p.isAvailable = 0 THEN 0 -- if already set to not available, then leave as is 
        WHEN NOT EXISTS ( 			  -- if product is recipeless, use the product's default availablity
            SELECT 1 FROM recipes r 
            WHERE r.finishedProductID = p.productID
        ) THEN p.isAvailable
        WHEN EXISTS (	-- when a product with a recipe doesn't have enough ingredients
            SELECT 1            -- or is out of stock, set to not available
            FROM recipes r
            LEFT JOIN ingredients i ON r.ingredientID = i.ingredientID
            WHERE r.finishedProductID = p.productID
            AND (
                i.ingredientID IS NULL OR           
                i.quantity IS NULL OR                
                i.quantity < r.quantity OR           -- not enough ingredients
                i.quantity <= 0                      -- out of stock
            )
        ) THEN 0
        ELSE 1
    END AS isAvailable
FROM products p;