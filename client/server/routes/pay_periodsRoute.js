import express from 'express'

import { getPay_Period, getPay_Periods, createPay_Period, updatePay_Period, deletePay_Period, getCurrentPayPeriod } from '../database.js'
import isAuthorized from '../utils/auth.js'

const pay_periodsRouter = express.Router()

pay_periodsRouter.use(isAuthorized)

pay_periodsRouter.get("/", async (req, res) => {
    try {
        const periods = await getPay_Periods()
        res.json(periods)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

pay_periodsRouter.get("/current", async (req, res) => {
    try {
        const payPeriod = await getCurrentPayPeriod()

        if (!payPeriod) {
            return res.status(404).json({
                message: "Could not find pay period"
            })
        }

        return res.status(200).json({
            payPeriod: payPeriod
        })
    } catch(err) {
        return res.status(500).json({
            message: "Server error"
        })
    }
})

pay_periodsRouter.get("/:payPeriodID", async (req, res) => {
    const payPeriodID = req.params.payPeriodID
    try {
        const period = await getPay_Period(payPeriodID)

        if (!period) {
            return res.status(404).json({
                message: "Pay period not found"
            })
        }

        res.send(period)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

pay_periodsRouter.post("/", async (req, res) => {
    const { startDate, endDate } = req.body

    try {
        const period = await createPay_Period(startDate, endDate)
        res.status(201).send(period)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

pay_periodsRouter.put("/:payPeriodID", async (req, res) => {
    const payPeriodID = req.params.payPeriodID

    try {
        const { startDate, endDate } = req.body

        const period = await getPay_Period(payPeriodID)

        if (!period) {
            return res.status(404).json({
                message: "Pay period not found"
            })
        }

        const updatedPeriod = await updatePay_Period(startDate, endDate, payPeriodID)
        res.send(updatedPeriod)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

pay_periodsRouter.delete("/:payPeriodID", async (req, res) => {
    const payPeriodID = req.params.payPeriodID

    try {
        const period = await getPay_Period(payPeriodID)

        if (!period) {
            return res.status(404).json({
                message: "Pay period not found"
            })
        }

        await deletePay_Period(payPeriodID)
        res.sendStatus(204)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default pay_periodsRouter