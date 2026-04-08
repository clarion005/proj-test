import express from 'express'

import { getTable, getTables, createTable, updateTable, deleteTable, getCurrentTransactionByTable } from '../database.js'
import isAuthorized from '../utils/auth.js'

const tablesRouter = express.Router()

tablesRouter.use(isAuthorized)

tablesRouter.get("/", async (req, res) => {
    try {
        const tables = await getTables()
        res.json(tables)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

tablesRouter.get("/:tableID/current-transaction", async (req, res) => {
    const tableID = req.params.tableID

    try {
        const table = await getTable(tableID)

        if (!table) {
            return res.status(404).json({
                message: "Table not found"
            })
        }

        const transaction = await getCurrentTransactionByTable(tableID)

        if (!transaction) {
            return res.status(404).json({
                message: "Current transaction not found"
            })
        }

        return res.send(transaction)
    } catch (err) {
        return res.status(500).json({
            message: "Server error"
        })
    }
})

tablesRouter.get("/:tableID", async (req, res) => {
    const tableID = req.params.tableID
    try {
        const table = await getTable(tableID)

        if (!table) {
            return res.status(404).json({
                message: "Table not found"
            })
        }

        res.send(table)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

tablesRouter.post("/", async (req, res) => {
    const { capacity, sectionID } = req.body

    try {
        const table = await createTable(capacity, sectionID)
        res.status(201).send(table)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

tablesRouter.put("/:tableID", async (req, res) => {
    const tableID = req.params.tableID
    const { capacity, sectionID } = req.body

    try {
        const table = await getTable(tableID)

        if (!table) {
            return res.status(404).json({
                message: "Table not found"
            })
        }

        const updatedTable = await updateTable(capacity, sectionID, tableID)
        res.send(updatedTable)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

tablesRouter.delete("/:tableID", async (req, res) => {
    const tableID = req.params.tableID

    try {
        const table = await getTable(tableID)

        if (!table) {
            return res.status(404).json({
                message: "Table not found"
            })
        }

        await deleteTable(tableID)
        res.sendStatus(204)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

tablesRouter.get("/employeeTables", isAuthorized, async (req, res) => {
    const { employeeID } = req.session.employee

    try {
        const section = await getSectionByEmployeeID(employeeID)
        if (!section) {
            res.status(400).json({
                message: "Could not find section"
            })
        }

        // const tables = await getTablesFromSectionID(section.sectionID)
        const tables = []
        if (!tables) {
            res.status(400).json({
                message: "Could not find tables"
            })
        }

        for (const table in tables) {
            console.log("TODO")
        }
    } catch (err) {
        return res.status(500).json({
            message: "Server error"
        })
    }
})

export default tablesRouter