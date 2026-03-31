import express from 'express'

import { getTransaction, getTransactions, createTransaction, updateTransaction, deleteTransaction } from '../database.js'
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

transactionsRouter.get("/:transactionID", async (req, res) => {
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

transactionsRouter.post("/", async (req, res) => {
    const { tableID, employeeID, customerID, timePlaced, total, tipAmount, paymentMethod } = req.body

    try {
        const transaction = await createTransaction(tableID, employeeID, customerID, timePlaced, total, tipAmount, paymentMethod)
        res.status(201).send(transaction)
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
            res.status(500).json({
                message: "Transaction creation failed"
            })
        }
    })

    transactionsRouter.post("/addOrder", async (req, res) => {
        try{
            const {quantity, productID, tableID} = req.body
            const transID = await getCurrentTransactionByTable(tableID)
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

export default transactionsRouter