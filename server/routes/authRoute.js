import express from 'express'
import { compare } from 'bcrypt'

import { getEmployeeCredentials } from '../database.js'
import isAuthorized from '../utils/auth.js'


const authRouter = express.Router()

authRouter.post('/login', async (req, res) => {
    const { employeeID, password } = req.body

    try {
        if (!employeeID || !password) {
            return res.status(400).json({
                message: "Fields not entered"
            })
        }
        
        const employee = await getEmployeeCredentials(employeeID)
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            })
        }
        
        const match = await compare(password, employee.hashedPassword)
        if (!match) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).json({ message : "Session error" }) 
            }

            req.session.employee = {
                employeeID : employee.employeeID,
                firstName : employee.firstName,
                lastName : employee.lastName,
                shiftRole : employee.shiftRole
            }

            req.session.save((err2) => {
                if (err2) {
                    return res.status(500).json({
                        message: "Session save error"
                    })
                }

                return res.status(200).json({
                    employee: req.session.employee
                })
            })
        })

        
    } catch(err) {
        res.status(500).json({
            message: "Server error"
        })
    }

})

authRouter.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                message: "Logout Failed"
            })
        }
        
        res.status(200).json({ 
            message: "Logout successful"
        })
    })
})

authRouter.get('/dashboard', isAuthorized, (req, res) => {
    res.status(200).json({
        employee : req.session.employee
    })
})

export default authRouter