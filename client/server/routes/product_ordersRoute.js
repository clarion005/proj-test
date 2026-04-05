import express from 'express'

import { getProduct_Order, getProduct_Orders, createProduct_Order } from '../database.js'
import isAuthorized from '../utils/auth.js'

const product_ordersRouter = express.Router()

product_ordersRouter.use(isAuthorized)

product_ordersRouter.get("/", async (req, res) => {
    try {
        const orders = await getProduct_Orders()
        res.json(orders)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

product_ordersRouter.get("/:transactionID/:productID", async (req, res) => {
    const { transactionID, productID } = req.params

    try {
        const order = await getProduct_Order(transactionID, productID)

        if (!order) {
            return res.status(404).json({
                message: "Product order not found"
            })
        }

        res.send(order)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

product_ordersRouter.post("/", async (req, res) => {
    const { quantity, productID, transactionID } = req.body

    try {
        const order = await createProduct_Order(quantity, productID, transactionID)
        res.status(201).send(order)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default product_ordersRouter