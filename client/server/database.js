// has database functions stored here
import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getEmployees(){ // exporting allows it to be used in different files (like app.js)
    const [rows] = await pool.query("SELECT * FROM employees")
    return rows
}

export async function getEmployeeCredentials(employeeID) {
    const [employee] = await pool.query(`SELECT employeeID, firstName, lastName, shiftRole, hashedPassword FROM employees WHERE employeeID = ?`, [employeeID])
    return employee[0] ?? null
}

export async function getEmployee(employeeID){
    const [employee] = await pool.query(`SELECT * FROM employees WHERE employeeID = ?`, [employeeID]) // we send the [id] separately to the query, mySQL will manage it and make sure the untrusted data (the ?) isn't a part of the query
    return employee[0] ?? null
}

export async function createEmployee(firstName, lastName, dateHired, dateOfBirth, shiftRole, hourlyRate, hashedPassword){
    const [result] = await pool.query(`INSERT INTO employees (firstName, lastName, dateHired, dateOfBirth, shiftRole, hourlyRate, hashedPassword)
    VALUES (?, ?, ?, ?, ?, ?, ?)`, [firstName, lastName, dateHired, dateOfBirth, shiftRole, hourlyRate, hashedPassword])
    return {
        employeeID: result.insertId,
        firstName,
        lastName,
        dateHired,
        dateOfBirth,
        shiftRole,
        hourlyRate,
        hashedPassword
    }
}

export async function deleteEmployee(employeeID){
    const [employee] = await pool.query(`DELETE FROM employees WHERE employeeID = ?`, [employeeID])
    return employee ?? null
}

export async function updateEmployee(firstName, lastName, dateHired, dateOfBirth, shiftRole, hourlyRate, hashedPassword, employeeID){
    const result = await pool.query(`UPDATE employees SET firstName = ?, lastName = ?, dateHired = ?, dateOfBirth = ?, shiftRole = ?, hourlyRate = ?, hashedPassword = ? WHERE employeeID = ?`, [firstName, lastName, dateHired, dateOfBirth, shiftRole, hourlyRate, hashedPassword, employeeID])
    return {
        firstName,
        lastName,
        dateHired,
        dateOfBirth,
        shiftRole,
        hourlyRate,
        hashedPassword,
        employeeID
    }
}

export async function updateEmployeePassword(employeeID, newHashedPassword) {
    const [result] = await pool.query(`UPDATE employees SET hashedPassword =  ? WHERE employeeID = ?`, [newHashedPassword, employeeID])
}

export async function getCustomers(){ // exporting allows it to be used in different files (like app.js)
    const [rows] = await pool.query("SELECT * FROM customers")
    return rows
}

export async function getCustomer(customerID){
    const [customers] = await pool.query(`SELECT * FROM customers WHERE customerID = ?`, [customerID])
    return customers[0] ?? null
}

export async function getCustomerByEmail(email){
    const [customer] = await pool.query('SELECT customerID FROM customers WHERE email = ?', [email])
    return customer[0] ?? null
}

export async function createCustomer(firstName, lastName, dob, dateJoined, phoneNumber, email, status, rewardPoints){ // this works!
    const [result] = await pool.query(`INSERT INTO customers (firstName, lastName, dob, dateJoined, phoneNumber, email, status, rewardPoints)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [firstName, lastName, dob, dateJoined, phoneNumber, email, status, rewardPoints])
        return {
            customerID: result.insertId,
            firstName,
            lastName,
            dob,
            dateJoined,
            phoneNumber,
            email,
            status,
            rewardPoints
        }
}

export async function deleteCustomer(customerID){
    const [customer] = await pool.query(`DELETE FROM customers WHERE customerID = ?`, [customerID])
    return customer ?? null
}

export async function updateCustomer(firstName, lastName, dob, dateJoined, phoneNumber, email, status, rewardPoints, customerID){ // this works!
    const [result] = await pool.query(`UPDATE customers SET firstName = ?, lastName = ?, dob = ?, dateJoined = ?, phoneNumber = ?, email = ?, status = ?, rewardPoints = ? WHERE customerID = ?`, [firstName, lastName, dob, dateJoined, phoneNumber, email, status, rewardPoints, customerID])
        return {
            firstName,
            lastName,
            dob,
            dateJoined,
            phoneNumber,
            email,
            status,
            rewardPoints,
            customerID
        }
}

export async function getIngredients(){
    const [rows] = await pool.query(`SELECT * FROM ingredients`)
    return rows
}

export async function getIngredient(ingredientID){
    const [ingredients] = await pool.query(`SELECT * FROM ingredients WHERE ingredientID = ?`, [ingredientID])
    return ingredients[0] ?? null
}

export async function createIngredient(ingredientID, _name, pricePerUnit, quantity){
    const [result] = await pool.query(`INSERT INTO ingredients (ingredientID, _name, pricePerUnit, quantity)
    VALUES (?, ?, ?, ?)`, [ingredientID, _name, pricePerUnit, quantity])
        return {
            ingredientID,
            _name,
            pricePerUnit,
            quantity
        }
}

export async function deleteIngredient(ingredientID, _name){
    const [ingredient] = await pool.query(`DELETE FROM ingredients WHERE ingredientID = ? AND _name = ?`, [ingredientID, _name])
    return ingredient ?? null
}

export async function updateIngredient(_name, pricePerUnit, quantity, ingredientID){
    const [result] = await pool.query(`UPDATE ingredients SET _name = ?, pricePerUnit = ?, quantity = ? WHERE ingredientID = ?`, [_name, pricePerUnit, quantity, ingredientID])
        return {
            _name,
            pricePerUnit,
            quantity,
            ingredientID
        }
}

export async function getPay_Periods(){
    const [rows] = await pool.query(`SELECT * FROM pay_periods`)
    return rows
}

export async function getCurrentPayPeriod() {
    const [rows] = await pool.query(
        `
        SELECT payPeriodID, startDate, endDate
        FROM pay_periods
        WHERE CURDATE() BETWEEN startDate AND endDate
        LIMIT 1
        `
    )

    return rows[0] ?? null
}

export async function getPay_Period(payPeriodID){
    const [pay_periods] = await pool.query(`SELECT * FROM pay_periods WHERE payPeriodID = ?`, [payPeriodID])
    return pay_periods[0] ?? null
}

export async function createPay_Period(startDate, endDate){
    const [result] = await pool.query(`INSERT INTO pay_periods (startDate, endDate)
    VALUES (? ,?)`, [startDate, endDate])
    return {
        payPeriodID: result.insertId,
        startDate,
        endDate
    }
}

export async function deletePay_Period(payPeriodID){
    const [pay_per] = await pool.query(`DELETE FROM pay_periods WHERE payPeriodID = ?`, [payPeriodID])
    return pay_per ?? null
}

export async function updatePay_Period(startDate, endDate, payPeriodID){
    const [result] = await pool.query(`UPDATE pay_periods SET startDate = ?, endDate = ? WHERE payPeriodID = ?`, [startDate, endDate, payPeriodID])
        return {
            startDate,
            endDate,
            payPeriodID
        }
}

export async function getPayroll_Records(){
    const [payroll_records] = await pool.query(`SELECT * FROM payroll_records`)
    return payroll_records
}

export async function getPayroll_Record(employeeID, payPeriodID){
    const [payroll_records] = await pool.query(`SELECT * FROM payroll_records WHERE employeeID = ? AND payPeriodID = ?`, [employeeID, payPeriodID])
    return payroll_records[0] ?? null
}

export async function createPayroll_Record(employeeID, payPeriodID, totalHours, totalPay){
    const [result] = await pool.query(`INSERT INTO payroll_records (employeeID, payPeriodID, totalHours, totalPay)
        VALUES (?, ?, ?, ?)`, [employeeID, payPeriodID, totalHours, totalPay])
            return {
                employeeID,
                payPeriodID,
                totalHours,
                totalPay
            }
}

export async function deletePayroll_Record(employeeID, payPeriodID){
    const [payr_rec] = await pool.query(`DELETE FROM payroll_records WHERE employeeID = ? AND payPeriodID = ?`, [employeeID, payPeriodID])
    return payr_rec ?? null
}

export async function updatePayroll_Record(totalHours, totalPay, employeeID, payPeriodID){
    const [result] = await pool.query(`UPDATE payroll_records SET totalHours = ?, totalPay = ? WHERE payPeriodID = ? AND employeeID = ?`, [totalHours, totalPay, employeeID, payPeriodID])
            return {
                totalHours,
                totalPay,
                payPeriodID,
                employeeID,
            }
}

export async function getPrinters(){
    const [rows] = await pool.query(`SELECT * FROM printers`)
    return rows
}

export async function getPrinter(stationID){
    const [printers] = await pool.query(`SELECT * FROM printers WHERE stationID = ?`, [stationID])
    return printers[0] ?? null
}

export async function createPrinter(stationID){ 
    const [result] = await pool.query(`INSERT INTO printers (stationID)
        VALUES (?)`, [stationID])
        return {
            stationID: result.insertId
        }
}

export async function deletePrinter(stationID){
    const [print] = await pool.query(`DELETE FROM printers WHERE stationID = ?`, [stationID])
    return print ?? null
}

export async function getProduct_Orders(){
    const [rows] = await pool.query(`SELECT * FROM product_orders`)
    return rows
}

export async function getProduct_Order(transactionID, productID){
    const [product_orders] = await pool.query(`SELECT * FROM product_orders WHERE transactionID = ? AND productID = ?`, [transactionID, productID])
    return product_orders[0] ?? null
}

export async function createProduct_Order(quantity, productID, transactionID){
    const [result] = await pool.query(`INSERT INTO product_orders (quantity, productID, transactionID)
        VALUES (?, ?, ?)`, [quantity, productID, transactionID])
            return {
                quantity,
                productID,
                transactionID
            }
}

export async function deleteProduct_Order(transactionID, productID){
    const [prod_ord] = await pool.query(`DELETE FROM product_orders WHERE transactionID = ? AND productID = ?`, [transactionID, productID])
    return prod_ord ?? null
}

export async function updateProduct_Order(quantity, productID, transactionID){
    const [result] = await pool.query(`UPDATE product_orders SET quantity = ? WHERE productID = ? AND transactionID = ?`, [quantity, productID, transactionID])
            return {
                quantity,
                productID,
                transactionID
            }
}

export async function getProducts(){
    const [rows] = await pool.query(`SELECT * FROM products`)
    return rows
}

export async function getProduct(productID){
    const [products] = await pool.query(`SELECT * FROM products WHERE productID = ?`, [productID])
    return products[0] ?? null
}

export async function createProduct(productID, _name, price, menuType, isAvailable, stationID){ // we need to change stationID to stationType, no foreign key required
    const [result] = await pool.query(`INSERT INTO products (productID, _name, price, menuType, isAvailable, stationID)
    VALUES (?, ?, ?, ?, ?, ?)`, [productID, _name, price, menuType, isAvailable, stationID])
        return {
            productID,
            _name,
            price,
            menuType,
            isAvailable,
            stationID
        }
}

export async function deleteProduct(productID, _name){
    const [product] = await pool.query(`DELETE FROM products WHERE productID = ? AND _name = ?`, [productID, _name])
    return product ?? null
}

export async function updateProduct(_name, price, menuType, isAvailable, stationID, productID){ // we need to change stationID to stationType, no foreign key required
    const [result] = await pool.query(`UPDATE products SET _name = ?, price = ?, menuType = ?, isAvailable = ?, stationID = ? WHERE productID = ?`, [_name, price, menuType, isAvailable, stationID, productID])
        return {
            _name,
            price,
            menuType,
            isAvailable,
            stationID,
            productID
        }
}

export async function getPurchase_Orders(){
    const [rows] = await pool.query(`SELECT * FROM purchase_orders`)
    return rows
}

export async function getPurchase_Order(orderID){
    const [purchase_orders] = await pool.query(`SELECT * FROM purchase_orders WHERE orderID = ?`, [orderID])
    return purchase_orders[0] ?? null
}

export async function createPurchase_Order(supplierName, ingredientID, quantity, dateOrdered){ // i think we need a foreign key for ingredientID here
    const [result] = await pool.query(`INSERT INTO purchase_orders (supplierName, ingredientID, quantity, dateOrdered)
    VALUES (?, ?, ?, ?)`, [supplierName, ingredientID, quantity, dateOrdered])
    return{
        orderID: result.insertId,
        supplierName,
        ingredientID,
        quantity,
        dateOrdered
    }
}

export async function deletePurchase_Order(orderID){
    const [purch_ord] = await pool.query(`DELETE FROM purchase_orders WHERE orderID = ?`, [orderID])
    return purch_ord ?? null
}

export async function updatePurchase_Order(supplierName, ingredientID, quantity, dateOrdered, orderID){ // i think we need a foreign key for ingredientID here
    const [result] = await pool.query(`UPDATE purchase_orders SET supplierName = ?, ingredientID = ?, quantity = ?, dateOrdered = ? WHERE orderiD = ?`, [supplierName, ingredientID, quantity, dateOrdered, orderID])
    return{
        supplierName,
        ingredientID,
        quantity,
        dateOrdered,
        orderID
    }
}

export async function getRecipes(){
    const [rows] = await pool.query(`SELECT * FROM recipes`)
    return rows
}

export async function getRecipe(recipeID){
    const [recipes] = await pool.query(`SELECT * FROM recipes WHERE recipeID = ?`, [recipeID])
    return recipes[0] ?? null
}

export async function createRecipe(recipeID, ingredientID, finishedProductID, intermediateProductID){ // foreign keys
    const [result] = await pool.query(`INSERT INTO recipes (recipeID, ingredientID, finishedProductID, intermediateProductID)
        VALUES (?, ?, ?, ?)`, [recipeID, ingredientID, finishedProductID, intermediateProductID])
        return{
            recipeID,
            ingredientID,
            finishedProductID,
            intermediateProductID
        }
}

export async function deleteRecipe(recipeID, finishedProductID){
    const [reci] = await pool.query(`DELETE FROM recipes WHERE recipeID = ? AND finishedProductID = ?`, [recipeID, finishedProductID])
    return reci ?? null
}

export async function updateRecipe(ingredientID, finishedProductID, intermediateProductID, recipeID){ // foreign keys
    const [result] = await pool.query(`UPDATE recipes SET ingredientID = ?, finishedProductID = ?, intermediateProductID = ? WHERE recipeID= ?`, [ingredientID, finishedProductID, intermediateProductID, recipeID])
        return{
            ingredientID,
            finishedProductID,
            intermediateProductID,
            recipeID
        }
}

export async function getScheduled_Shift(){
    const [rows] = await pool.query(`SELECT * FROM scheduled_shifts`)
    return rows
}

export async function getScheduled_Shifts(scheduledShiftID){
    const [scheduled_shift] = await pool.query(`SELECT * FROM scheduled_shifts WHERE scheduledShiftID = ?`, [scheduledShiftID])
    return scheduled_shift[0] ?? null
}

export async function createScheduled_Shift(startTime, endTime, shiftRole){
    const [result] = await pool.query(`INSERT INTO scheduled_shifts (startTime, endTime, shiftRole)
    VALUES (?, ?, ?)`, [startTime, endTime, shiftRole])
        return {
            scheduledShiftID: result.insertId,
            startTime,
            endTime,
            shiftRole
        }
}

export async function deleteScheduled_Shift(scheduledShiftID){
    const [sched_sh] = await pool.query(`DELETE FROM scheduled_shifts WHERE scheduledShiftID = ?`, [scheduledShiftID])
    return sched_sh ?? null
}

export async function updateScheduled_Shift(startTime, endTime, shiftRole, scheduledShiftID){
    const [result] = await pool.query(`UPDATE scheduled_shifts SET startTime= ?, endTime = ?, shiftRole = ? WHERE scheduledShiftID = ?`, [startTime, endTime, shiftRole, scheduledShiftID])
        return {
            startTime,
            endTime,
            shiftRole,
            scheduledShiftID
        }
}

export async function getSection(){
    const [rows] = await pool.query(`SELECT * FROM sections`)
    return rows
}

export async function getSections(sectionID){
    const [sections] = await pool.query(`SELECT * FROM sections WHERE sectionID = ?`, [sectionID])
    return sections[0] ?? null
}

export async function createSection(employeeID){
    const [result] = await pool.query(`INSERT INTO sections (employeeID)
    VALUES (?)`, [employeeID])
        return {
            sectionID: result.insertId,
            employeeID
        }
}

export async function deleteSection(sectionID){
    const [sect] = await pool.query(`DELETE FROM sections WHERE sectionID = ?`, [sectionID])
    return sect ?? null
}

export async function updateSection(employeeID, sectionID){
    const [result] = await pool.query(`UPDATE sections SET employeeID = ? WHERE sectionID = ?`, [employeeID, sectionID])
        return {
            employeeID,
            sectionID
        }
}

export async function getTables(){
    const [rows] = await pool.query(`SELECT * FROM tables`)
    return rows
}

export async function getTable(tableID){
    const [tables] = await pool.query(`SELECT * FROM tables WHERE tableID = ?`, [tableID])
    return tables[0] ?? null
}

export async function createTable(capacity, sectionID){
    const [result] = await pool.query(`INSERT INTO tables (capacity, sectionID)
    VALUES (?, ?)`, [capacity, sectionID])
        return {
            tableID: result.insertId,
            capacity,
            sectionID
        }
}

export async function deleteTable(tableID){
    const [table] = await pool.query(`DELETE FROM tables WHERE tableID = ?`, [tableID])
    return table ?? null
}

export async function updateTable(capacity, sectionID, tableID){
    const [result] = await pool.query(`UPDATE tables SET capacity = ?, sectionID = ? WHERE tableID = ?`, [capacity, sectionID, tableID])
        return {
            capacity,
            sectionID,
            tableID
        }
}

export async function getTimeclock_Entries(){
    const [rows] = await pool.query(`SELECT * FROM timeclock_entries`)
    return rows
}

export async function getTimeclock_Entry(entryID){
    const [rows] = await pool.query(`SELECT * FROM timeclock_entries WHERE entryID = ?`, [entryID])
    return rows[0] ?? null
}

export async function createTimeclock_Entry(clockIn, clockOut, payPeriodID, employeeID, scheduledShiftID){
    const [result] = await pool.query(`INSERT INTO timeclock_entries (clockIn, clockOut, payPeriodID, employeeID, scheduledShiftID)
    VALUES (?, ?, ?, ?, ?)`, [clockIn, clockOut, payPeriodID, employeeID, scheduledShiftID])
    return {
        entryID: result.insertId,
        clockIn,
        clockOut,
        payPeriodID,
        employeeID,
        scheduledShiftID
    }
}

export async function clockInEmployee(employeeID, payPeriodID, scheduledShift = null) {
    const [result] = await pool.query(
        `INSERT INTO timeclock_entries (clockIn, clockOut, payPeriodID, employeeID, scheduledShiftID)VALUES (NOW(), NULL, ?, ?, ?)`,
        [payPeriodID, employeeID, scheduledShift]
    )

    return {
        entryID: result.insertId
    }
}

export async function clockOutEmployee(entryID) {
    const [result] = await pool.query(
        `UPDATE timeclock_entries SET clockOut = Now() WHERE entryID = ?`,
        [entryID]
    )

    return result.affectedRows
}

export async function getActiveTimeclockEntry(employeeID) {
    const [rows] = await pool.query(
        `SELECT entryID FROM timeclock_entries WHERE employeeID = ? AND clockOut is NULL ORDER BY clockIn DESC LIMIT 1`,
        [employeeID]
    )

    return rows[0] ?? null
}

export async function deleteTimeclock_Entry(entryID){
    const [time] = await pool.query(`DELETE FROM timeclock_entries WHERE entryID = ?`, [entryID])
    return time ?? null
}

export async function updateTimeclock_Entry(clockIn, clockOut, payPeriodID, employeeID, scheduledShiftID, entryID){
    const [result] = await pool.query(`UPDATE timeclock_entries SET clockIn = ?, clockOut = ?, payPeriodID = ?, employeeID = ?, scheduledShiftID = ? WHERE entryID = ?`, [clockIn, clockOut, payPeriodID, employeeID, scheduledShiftID, entryID])
    return {
        clockIn,
        clockOut,
        payPeriodID,
        employeeID,
        scheduledShiftID,
        entryID
    }
}

export async function getTransactions(){
    const [rows] = await pool.query(`SELECT * FROM transactions`)
    return rows
}

export async function getTransaction(transactionID){
    const [transactions] = await pool.query(`SELECT * FROM transactions WHERE transactionID = ?`, [transactionID])
    return transactions[0] ?? null
}

export async function getCurrentTransactionByTable(tableID){
    const [transactions] = await pool.query(
        `SELECT * FROM transactions WHERE tableID = ? AND paymentMethod IS NULL ORDER BY timePlaced DESC LIMIT 1`, [tableID])
    return transactions[0] ?? null
}

export async function getCurrentTransactionIDByTable(tableID){
    const [transactionID] = await pool.query(`SELECT * FROM transactions WHERE tableID = ? AND paymentMethod IS NULL ORDER BY timePlaced DESC LIMIT 1`, [tableID])
    return transactionID[0].transactionID ?? null
}

export async function openTransactionTab(tableID, employeeID){
    const [result] = await pool.query(`INSERT INTO transactions (tableID, employeeID, timePlaced)
    VALUES (?, ?, NOW())`, [tableID, employeeID])
        return {
            transactionID: result.insertId,
            tableID,
            employeeID
        }
}

export async function closeTransactionTab(total, tipAmount, paymentMethod, employeeID, transID, tableID){ // find a way to get customerID and check for loyalties
    const [result] = await pool.query(`UPDATE transactions SET total = ?, tipAmount = ?, paymentMethod = ? 
WHERE employeeID = ? AND transactionID = ? AND tableID = ?;`, [total, tipAmount, paymentMethod, employeeID, transID, tableID])
    return {
        total,
        tipAmount,
        paymentMethod,
        employeeID,
        transID,
        tableID
    }
}

export async function closeTabWithEmail(total, tipAmount, paymentMethod, custID, employeeID, transID, tableID){ // find a way to get customerID and check for loyalties
    const [result] = await pool.query(`UPDATE transactions SET total = ?, tipAmount = ?, paymentMethod = ?, customerID = ? WHERE employeeID = ? AND transactionID = ? AND tableID = ?`, [total, tipAmount, paymentMethod, custID, employeeID, transID, tableID])
        return {
            total,
            tipAmount,
            paymentMethod,
            custID,
            employeeID,
            transID,
            tableID
        }
}


export async function getRewardPoints(customerID) {
    const [rewardPoints] = await pool.query('SELECT rewardPoints FROM customers WHERE customerID = ?', [customerID])
    return rewardPoints[0].rewardPoints
}

// const rp = await getRewardPoints(1)
// console.log(rp) works!

// export async function updateRewardPoints(customerID, total) {
//     const [result] = await pool.query(`UPDATE customers JOIN transactions on  SET rewardPoints = rewardPoints + total WHERE customerID = 1;`, [customerID, total])
// }

//const getrp = await getRewardPoints(1)
// console.log(getrp) works!

// const rp = await updateRewardPoints(1, 3)
// console.log(rp)

export async function getSectionByEmployeeID(employeeID) {
    const [section] = await pool.query(`SELECT sectionID FROM employees WHERE employeeID = ?`, [employeeID])
    return section[0] ?? null
}

export async function getTablesBySectionID(sectionID) {
    const [tables] = await pool.query(`SELECT tableID FROM tables WHERE sectionID = ?`, [sectionID])
    return tables[0] ?? null
}

export async function tableHasTransaction(tableID) {
    const [openTrans] = await pool.query(`SELECT transactionID FROM transactions WHERE tableID = ? AND paymentMethod IS NULL`, [tableID])
    return openTrans[0] ?? null
}

export async function createTransaction(tableID, employeeID, customerID, timePlaced, total, tipAmount, paymentMethod){
    const [result] = await pool.query(`INSERT INTO transactions (tableID, employeeID, customerID, timePlaced, total, tipAmount, paymentMethod)
    VALUES (?, ?, ?, ?, ?, ?, ?)`, [tableID, employeeID, customerID, timePlaced, total, tipAmount, paymentMethod])
        return {
            transactionID: result.insertId,
            tableID,
            employeeID,
            customerID,
            timePlaced,
            total,
            tipAmount,
            paymentMethod
        }
}

export async function deleteTransaction(transactionID){
    const [trans] = await pool.query(`DELETE FROM transactions WHERE transactionID = ?`, [transactionID])
    return trans ?? null
}

export async function updateTransaction(tableID, employeeID, customerID, timePlaced, total, tipAmount, paymentMethod, transactionID){
    const [result] = await pool.query(`UPDATE transactions SET tableID = ?, employeeID = ?, customerID = ?, timePlaced = ?, total = ?, tipAmount = ?, paymentMethod = ? WHERE transactionID = ?`, [tableID, employeeID, customerID, timePlaced, total, tipAmount, paymentMethod, transactionID])
        return {
            tableID,
            employeeID,
            customerID,
            timePlaced,
            total,
            tipAmount,
            paymentMethod,
            transactionID
        }
}

export async function getItemsSoldReport(startDate, endDate) {
    const [result] = await pool.query(
        `SELECT
            p._name AS productName,
            p.price,
            SUM(po.quantity) AS totalQuantitySold,
            ROUND(SUM(po.quantity * p.price), 2) AS totalRevenue
        FROM product_orders po
        JOIN products p ON po.productID = p.productID
        JOIN transactions t ON po.transactionID = t.transactionID
        WHERE t.timePlaced BETWEEN ? AND ?
        GROUP BY p.productID, p._name, p.price
        ORDER BY totalQuantitySold DESC`, [startDate, endDate])
        return result ?? []
}

export async function getRevenue_Summary(startDate, endDate){
    const [rows] = await pool.query(
        `SELECT
            COUNT(t.transactionID) AS numberOfTransactions,
            SUM(t.total) AS totalRevenue,
            SUM(COALESCE(t.tipAmount, 0)) AS totalTips,
            AVG(t.total) AS averageTransactionValue
        FROM transactions t
        JOIN employees e ON t.employeeID = e.employeeID
        WHERE t.timePlaced BETWEEN ? AND ?`,
        [startDate, endDate])
    return rows[0] ?? null
}

export async function getRevenueBy_Employee(startDate, endDate){
    const [rows] = await pool.query(
        `SELECT
            e.firstName,
            e.lastName,
            COUNT(t.transactionID) AS transactionsHandled,
            SUM(t.total) AS revenue,
            SUM(COALESCE(t.tipAmount, 0)) AS tips
        FROM transactions t
        JOIN employees e ON t.employeeID = e.employeeID
        WHERE t.timePlaced BETWEEN ? AND ?
        GROUP BY e.employeeID, e.firstName, e.lastName
        ORDER BY revenue DESC`,
        [startDate, endDate])
    return rows
}

export async function getTopSpenders(startDate, endDate) {
    const [result] = await pool.query(
        `SELECT
            c.customerID, c.firstName, c.lastName, c.rewardPoints,
            COUNT(DISTINCT DATE(t.timePlaced)) AS totalVisits,
            ROUND(SUM(t.total), 2) AS totalSpent
        FROM customers c
        JOIN transactions t ON c.customerID = t.customerID
        WHERE t.customerID IS NOT NULL
        AND t.timePlaced BETWEEN ? AND ?
        GROUP BY c.customerID
        ORDER BY totalSpent DESC
        LIMIT 5`,
        [startDate, endDate])
    return result ?? []
}

export async function getTopVisitors(startDate, endDate) {
    const [result] = await pool.query(
        `SELECT
            c.customerID, c.firstName, c.lastName, c.rewardPoints,
            COUNT(DISTINCT DATE(t.timePlaced)) AS totalVisits,
            ROUND(SUM(t.total), 2) AS totalSpent
        FROM customers c
        JOIN transactions t ON c.customerID = t.customerID
        WHERE t.customerID IS NOT NULL
        AND t.timePlaced BETWEEN ? AND ?
        GROUP BY c.customerID
        ORDER BY totalVisits DESC
        LIMIT 5`,
        [startDate, endDate]
    )
    return result ?? []
}

export async function getLaborCost(startDate, endDate) {
    const [result] = await pool.query(
        `SELECT
            ROUND(SUM(TIMESTAMPDIFF(MINUTE, tce.clockIn, tce.clockOut) / 60 * e.hourlyRate), 2) AS totalLaborCost
        FROM timeclock_entries tce
        JOIN employees e ON tce.employeeID = e.employeeID
        WHERE tce.clockIn BETWEEN ? AND ?
        AND tce.clockOut IS NOT NULL`,
        [startDate, endDate]
    )
    return result[0] ?? null
}

export async function getFoodCost(startDate, endDate) {
    const [rows] = await pool.query(
        `SELECT
            ROUND(SUM(po.quantity * i.pricePerUnit), 2) AS totalFoodCost
        FROM purchase_orders po
        JOIN ingredients i ON po.ingredientID = i.ingredientID
        WHERE po.dateOrdered BETWEEN ? AND ?`,
        [startDate, endDate]
    )
    return rows[0] ?? null
}