import express from 'express'

import { getPurchase_Order, getPurchase_Orders, createPurchase_Order, updatePurchase_Order, deletePurchase_Order } from '../database.js'
import isAuthorized from '../utils/auth.js'

const purchase_ordersRouter = express.Router()

purchase_ordersRouter.use(isAuthorized)

purchase_ordersRouter.get("/", async (req, res) => {
    try {
        const orders = await getPurchase_Orders()
        res.json(orders)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

purchase_ordersRouter.get("/:orderID", async (req, res) => {
    const orderID = req.params.orderID
    try {
        const order = await getPurchase_Order(orderID)

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }

        res.send(order)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

purchase_ordersRouter.post("/", async (req, res) => {
    const { supplierName, ingredientID, quantity, dateOrdered } = req.body

    try {
        const order = await createPurchase_Order(supplierName, ingredientID, quantity, dateOrdered)
        res.status(201).send(order)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

purchase_ordersRouter.put("/", async (req, res) => {
    const {supplierName, ingredientID, quantity, dateOrdered, orderID} = req.body

    try {
        const puord = await updatePurchase_Order(supplierName, ingredientID, quantity, dateOrdered, orderID)
        res.status(200).send(puord)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

purchase_ordersRouter.delete("/", async (req, res) => {
    const { orderID } = req.body

    try {
        await deletePurchase_Order(orderID)
        res.sendStatus(204)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default purchase_ordersRouter