import express from 'express'

import { getPrinter, getPrinters, createPrinter } from '../database.js'
import isAuthorized from '../utils/auth.js'

const printersRouter = express.Router()

printersRouter.use(isAuthorized)

printersRouter.get("/", async (req, res) => {
    try {
        const printers = await getPrinters()
        res.json(printers)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

printersRouter.get("/:stationID", async (req, res) => {
    const stationID = req.params.stationID
    try {
        const printer = await getPrinter(stationID)

        if (!printer) {
            res.status(404).json({
                message: "Printer not found"
            })
        }

        res.send(printer)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

printersRouter.post("/", async (req, res) => {
    const { stationID } = req.body

    try {
        const printer = await createPrinter(stationID)
        res.status(201).send(printer)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default printersRouter