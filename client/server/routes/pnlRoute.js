import express from 'express'
import { getRevenue_Summary, getFoodCost, getLaborCost } from '../database.js'
import isAuthorized from '../utils/auth.js'

const pnlRouter = express.Router()

//pnlRouter.use(isAuthorized)

pnlRouter.get('/', async (req, res) => {
    const { start, end } = req.query
    try {
        if (!start || !end) {
            return res.status(400).json({ message: 'Start and end dates required' })
        }
        const startDate = `${start} 00:00:00`
        const endDate = `${end} 23:59:59`

        const revenue = await getRevenue_Summary(startDate, endDate)
        const foodCost = await getFoodCost(startDate, endDate)
        const laborCost = await getLaborCost(startDate, endDate)

        const totalRevenue = revenue.totalRevenue ?? 0
        const totalFoodCost = foodCost.totalFoodCost ?? 0
        const totalLaborCost = laborCost.totalLaborCost ?? 0

        res.status(200).json({
            totalRevenue,
            totalFoodCost,
            totalLaborCost,
            profit: totalRevenue - totalFoodCost - totalLaborCost
        })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

export default pnlRouter