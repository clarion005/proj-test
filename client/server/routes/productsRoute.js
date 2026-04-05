import express from 'express'

import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from '../database.js'
import isAuthorized from '../utils/auth.js'

const productsRouter = express.Router()

productsRouter.use(isAuthorized)

productsRouter.get("/", async (req, res) => {
    try {
        const products = await getProducts()
        res.json(products)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

productsRouter.get("/:productID", async (req, res) => {
    const productID = req.params.productID
    try {
        const product = await getProduct(productID)

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        res.send(product)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

productsRouter.post("/", async (req, res) => {
    const { productID, _name, price, menuType, isAvailable, stationID } = req.body

    try {
        const product = await createProduct(productID, _name, price, menuType, isAvailable, stationID)
        res.status(201).send(product)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

productsRouter.put("/", async (req, res) => {
    const { _name, price, menuType, isAvailable, stationID, productID } = req.body

    try {
        const product = await updateProduct(_name, price, menuType, isAvailable, stationID, productID)
        res.status(200).send(product)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

productsRouter.delete("/", async (req, res) => {
    const { productID, _name } = req.body

    try {
        const product = await deleteProduct(productID, _name)
        res.sendStatus(204)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default productsRouter