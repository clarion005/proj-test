import express from 'express'

import { getTimeclock_Entry, getTimeclock_Entries, createTimeclock_Entry, updateTimeclock_Entry, deleteTimeclock_Entry, getCurrentPayPeriod, getActiveTimeclockEntry, clockInEmployee, clockOutEmployee } from '../database.js'
import isAuthorized from '../utils/auth.js'

const timeclock_entriesRouter = express.Router()

timeclock_entriesRouter.use(isAuthorized)

timeclock_entriesRouter.get("/", async (req, res) => {
    try {
        const entries = await getTimeclock_Entries()
        res.json(entries)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

timeclock_entriesRouter.get("/:entryID", async (req, res) => {
    const entryID = req.params.entryID
    try {
        const entry = await getTimeclock_Entry(entryID)

        if (!entry) {
            res.status(404).json({
                message: "Entry not found"
            })
        }

        res.send(entry)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

timeclock_entriesRouter.post("/", async (req, res) => {
    const { clockIn, clockOut, payPeriodID, employeeID, scheduledShiftID } = req.body

    try {
        const entry = await createTimeclock_Entry(clockIn, clockOut, payPeriodID, employeeID, scheduledShiftID)
        res.status(201).send(entry)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

timeclock_entriesRouter.put("/:entryID", async (req, res) => {
    const entryID = req.params.entryID

    try {
        const { clockIn, clockOut, payPeriodID, employeeID, scheduledShiftID } = req.body
        const entry = await getTimeclock_Entry(entryID)

        if (!entry) {
            return res.status(404).json({
                message: "Entry not found"
            })
        }

        const updatedEntry = await updateTimeclock_Entry(
            clockIn,
            clockOut,
            payPeriodID,
            employeeID,
            scheduledShiftID,
            entryID
        )

        res.send(updatedEntry)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

timeclock_entriesRouter.delete("/:entryID", async (req, res) => {
    const entryID = req.params.entryID

    try {
        const entry = await getTimeclock_Entry(entryID)

        if (!entry) {
            return res.status(404).json({
                message: "Entry not found"
            })
        }

        await deleteTimeclock_Entry(entryID)
        res.sendStatus(204)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

timeclock_entriesRouter.post("/clock-in", async (req, res) => {
    try {
        const employeeID = req.session.employee.employeeID
        const payPeriod = await getCurrentPayPeriod()

        if (!payPeriod) {
            return res.status(409).json({
                message: "Could not find pay period"
            })
        }

        const activeEntry = await getActiveTimeclockEntry(employeeID)
        if(activeEntry) {
            return res.status(409).json({
                message: "Timeclock is active",
                entryID: activeEntry.entryID
            })
        }

        const createdEntry = await clockInEmployee(employeeID, payPeriod.payPeriodID)

        return res.status(201).json({
            message: "Clocked in",
            entryID: createdEntry.entryID,
            payPeriodID: payPeriod.payPeriodID
        })

    } catch(err) {
        return res.status(500).json({
            message: "Server error",
            errMsg: err.message
        })
    }
})

timeclock_entriesRouter.post("/clock-out", async (req, res) => {
    try {
        const employeeID = req.session.employee.employeeID

        const activeEntry = await getActiveTimeclockEntry(employeeID)
        if(!activeEntry) {
            return res.status(409).json({
                message: "Could not find active timeclock"
            })
        }

        const affectedRows = await clockOutEmployee(activeEntry.entryID)
        if (affectedRows !== 1) {
            return res.status(500).json({
                message: "Failed to clock out"
            })
        }

        const alteredEntry = await getTimeclock_Entry(activeEntry.entryID)
        return res.status(200).json({
            message: "Clocked out",
            entry: alteredEntry
        })

    } catch(err) {
        return res.status(500).json({
            message: "Server error"
        })
    }
})

export default timeclock_entriesRouter