import express from 'express'
import { getItemsSoldReport, getRevenue_Summary, getRevenueBy_Employee, getTopSpenders, getTopVisitors } from '../database.js'
import isAuthorized from '../utils/auth.js'

const dataReportsRouter = express.Router()
dataReportsRouter.use(isAuthorized)

dataReportsRouter.get('/revenue', async (req, res) => {
    const { start, end } = req.query
    try {
        if (!start || !end) {
            return res.status(400).json({ message: 'Start and end dates required' })
        }
        const startDate = `${start} 00:00:00`
        const endDate = `${end} 23:59:59`
        const summary = await getRevenue_Summary(startDate, endDate)
        const byEmployee = await getRevenueBy_Employee(startDate, endDate)
        res.status(200).json({ summary, byEmployee })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

dataReportsRouter.get('/items-sold', async (req, res) => {
    const { startDate, endDate } = req.query
    try {
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'A start and end date are required' })
        }
        const rows = await getItemsSoldReport(startDate, endDate)
        res.json(rows)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

dataReportsRouter.get('/top-spenders', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const result = await getTopSpenders(startDate, endDate);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get top spenders' });
    }
})

dataReportsRouter.get('/top-visitors', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const result = await getTopVisitors(startDate, endDate);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get top visitors' });
    }
})

export default dataReportsRouter