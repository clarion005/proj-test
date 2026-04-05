import express from 'express'

import { getPayroll_Record, getPayroll_Records, createPayroll_Record } from '../database.js'
import isAuthorized from '../utils/auth.js'

const payroll_recordsRouter = express.Router()

payroll_recordsRouter.use(isAuthorized)

payroll_recordsRouter.get("/", async (req, res) => {
    try {
        const records = await getPayroll_Records()
        res.json(records)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

payroll_recordsRouter.get("/:employeeID/:payPeriodID", async (req, res) => {
    const { employeeID, payPeriodID } = req.params

    try {
        const record = await getPayroll_Record(employeeID, payPeriodID)

        if (!record) {
            return res.status(404).json({
                message: "Payroll record not found"
            })
        }

        res.send(record)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

payroll_recordsRouter.post("/", async (req, res) => {
    const { employeeID, payPeriodID, totalHours, totalPay } = req.body

    try {
        const record = await createPayroll_Record(employeeID, payPeriodID, totalHours, totalPay)
        res.status(201).send(record)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default payroll_recordsRouter