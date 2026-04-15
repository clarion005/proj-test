import express from 'express'

import { getTransaction, getTransactions, createTransaction, updateTransaction, deleteTransaction, getCurrentTransactionIDByTable, createProduct_Order, openTransactionTab, closeTransactionTab, getCustomerByEmail, closeTabWithEmail, updateRewardPoints, updateProduct_Order, deleteProduct_Order, addTip, getTransactionTotal } from '../database.js'
import isAuthorized from '../utils/auth.js'

const transactionsRouter = express.Router()

transactionsRouter.use(isAuthorized)

transactionsRouter.get("/", async (req, res) => {
    try {
        const transactions = await getTransactions()
        res.json(transactions)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

transactionsRouter.get("/transactionID", async (req, res) => {
    const transactionID = req.params.transactionID
    try {
        const transaction = await getTransaction(transactionID)

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            })
        }

        res.send(transaction)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

transactionsRouter.put("/", async (req, res) => {
    const {tableID, employeeID, customerID, timePlaced, total, tipAmount, paymentMethod, transactionID} = req.body

    try {
        const trans = await updateTransaction(tableID, employeeID, customerID, timePlaced, total, tipAmount, paymentMethod, transactionID)
        res.status(201).send(trans)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

transactionsRouter.delete("/", async (req, res) => {
    const { transactionID } = req.body

    try {
        await deleteTransaction(transactionID)
        res.sendStatus(204)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

transactionsRouter.post("/openTab", async (req, res) => { // this successfully opens a transaction (tab)
        try{

            // creates the transaction
            const {tableID} = req.body
            const employeeID = req.session.employee.employeeID
            await openTransactionTab(tableID, employeeID)

            res.status(201).json({
                message: "Transaction successfully created"
            })

        } catch (err) {
            console.log(err)
            if (err.errno = 1452){
                res.status(404).json({
                    message : "tableID not in database"
                })
            }
            else{
            res.status(500).json({
                message: "Transaction creation failed"
            })
            }
        }
    })

transactionsRouter.post("/addOrder", async (req, res) => {
        try{
            const {quantity, productID, tableID} = req.body
            const transID = await getCurrentTransactionIDByTable(tableID)
            await createProduct_Order(quantity, productID, transID)

            res.status(201).json({
                message: "Order sucessfully added to transaction"
            })

        } catch (err) {
            res.status(500).json({
                message: "Failed to add order to transaction"
            })

        }
    })

transactionsRouter.put("/modifyOrder", async (req, res) => {
    try {
        const { quantity, productID, tableID } = req.body
        const transID = await getCurrentTransactionIDByTable(tableID)
        await updateProduct_Order(quantity, productID, transID)
        res.status(200).json({
            message: "Order successfully updated"
        })
    } catch (err) {
        res.status(500).json({
            message: "Failed to update order"
        })
    }
})

transactionsRouter.delete("/deleteOrder", async (req, res) => {
    try {
        const { productID, tableID } = req.body
        const transID = await getCurrentTransactionIDByTable(tableID)
        await deleteProduct_Order(transID, productID)
        res.status(200).json({
            message: "Order successfully removed"
        })
    } catch (err) {
        res.status(500).json({
            message: "Failed to remove order"
        })
    }
})

transactionsRouter.put("/closeTab", async (req, res) => {
        try{
            // first we need to grab the employeeID and the correct transaction for that employee
            const {tableID, email, tipAmount, paymentMethod} = req.body
            const employeeID = req.session.employee.employeeID
            const transID = await getCurrentTransactionIDByTable(tableID) // whenever need ID, call trans.transactionID
            // then we need to add the rest of the attributes
            // server is supposed to receive customer email to find the customerID if registered
            if(!email){
                await addTip(tipAmount, transID)
                await closeTransactionTab(tipAmount, paymentMethod, employeeID, transID, tableID)
            }
            else{
                // retrieve customer by email
                const customer = await getCustomerByEmail(email)
                if(!customer){
                    res.status(404).json({
                        message: "Customer not found"
                    })
                }
                else{
                    await addTip(tipAmount, transID)
                    await closeTabWithEmail(tipAmount, paymentMethod, customer.customerID, employeeID, transID, tableID)
                    const total = await getTransactionTotal(transID)
                    // // grab customerID and total (add the total amount to customerID's reward points) this will prob be done in a couple methods
                    await updateRewardPoints(total, customer.customerID)
                }
            }
            res.status(201).json({
                message: "Successfully closed transaction"
            })
        } catch (err) {
            res.status(500).json({
                message: "Failed to close transaction"
            })
        }
    })

export default transactionsRouter