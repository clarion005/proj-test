import express from 'express'
import { compare, hash } from 'bcrypt'

import { getEmployeeCredentials, updateEmployeePassword } from '../database.js'
import isAuthorized from '../utils/auth.js'
import getRoleName from '../utils/getRoleName.js'


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
                shiftRole : getRoleName(employee.shiftRole)
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

authRouter.put('/change-password', isAuthorized, async (req, res) => {
    const { employeeID } = req.session.employee
    const { password, newPassword } = req.body

    if (!password || !newPassword) {
        return res.status(400).json({
            message: "Did not enter fields"
        })
    }
    
    try {
        if (await compare(password, newPassword)) {
            return res.status(400).json({
                message: "Password must be different"
            })
        }

        const { hashedPassword } = await getEmployeeCredentials(employeeID)
        const matchPasswords = await compare(password, hashedPassword)

        if (!matchPasswords) {
            return res.status(401).json({
                message: "Invalid Password"
            })
        }

        
        const saltRounds = 10
        const newHashedPassword = await hash(newPassword, saltRounds)
        await updateEmployeePassword(employeeID, newHashedPassword)

        return res.status(200).json({
            message: "Changed password"
        })

    } catch(err) {
        return res.status(500).json({
            message: "Server error"
        })
    }
})

export default authRouter