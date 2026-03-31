import express from 'express'

import { getScheduled_Shift, getScheduled_Shifts, createScheduled_Shift, updateScheduled_Shift, deleteScheduled_Shift } from '../database.js'
import isAuthorized from '../utils/auth.js'

const scheduled_shiftsRouter = express.Router()

scheduled_shiftsRouter.use(isAuthorized)

scheduled_shiftsRouter.get("/", async (req, res) => {
    try {
        const scheduledShifts = await getScheduled_Shift()
        res.json(scheduledShifts)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

scheduled_shiftsRouter.get("/:scheduledShiftID", async (req, res) => {
    const scheduledShiftID = req.params.scheduledShiftID
    try {
        const scheduledShift = await getScheduled_Shifts(scheduledShiftID)

        if (!scheduledShift) {
            res.status(404).json({
                message: "Scheduled shift not found"
            })
        }

        res.send(scheduledShift)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

scheduled_shiftsRouter.post("/", async (req, res) => {
    const { startTime, endTime, shiftRole } = req.body

    try {
        const scheduledShift = await createScheduled_Shift(startTime, endTime, shiftRole)
        res.status(201).send(scheduledShift)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

scheduled_shiftsRouter.put("/:scheduledShiftID", async (req, res) => {
    const scheduledShiftID = req.params.scheduledShiftID
    const { startTime, endTime, shiftRole } = req.body

    try {
        const scheduledShift = await getScheduled_Shifts(scheduledShiftID)

        if (!scheduledShift) {
            return res.status(404).json({ message: "Scheduled shift not found" })
        }

        const updatedScheduledShift = await updateScheduled_Shift(
            startTime,
            endTime,
            shiftRole,
            scheduledShiftID
        )

        res.json(updatedScheduledShift)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

scheduled_shiftsRouter.delete("/:scheduledShiftID", async (req, res) => {
    const scheduledShiftID = req.params.scheduledShiftID

    try {
        const scheduledShift = await getScheduled_Shifts(scheduledShiftID)

        if (!scheduledShift) {
            return res.status(404).json({ message: "Scheduled shift not found" })
        }

        await deleteScheduled_Shift(scheduledShiftID)

        res.sendStatus(204)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

export default scheduled_shiftsRouter