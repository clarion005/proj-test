import express from 'express'

import { getIngredient, getIngredients, createIngredient, updateIngredient, deleteIngredient } from '../database.js'
import isAuthorized from '../utils/auth.js'

const ingredientsRouter = express.Router()

ingredientsRouter.use(isAuthorized)

ingredientsRouter.get("/", async (req, res) => {
    try {
        const ingredients = await getIngredients()
        res.json(ingredients)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

ingredientsRouter.get("/:ingredientID", async (req, res) => {
    const ingredientID = req.params.ingredientID
    try {
        const ingredient = await getIngredient(ingredientID)

        if (!ingredient) {
            res.status(404).json({
                message: "Ingredient not found"
            })
        }

        res.send(ingredient)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

ingredientsRouter.post("/", async (req, res) => {
    const { ingredientID, _name, pricePerUnit, quantity } = req.body

    try {
        const ingredient = await createIngredient(ingredientID, _name, pricePerUnit, quantity)
        res.status(201).send(ingredient)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

ingredientsRouter.put("/", async (req, res) => {
    const {_name, pricePerUnit, quantity, ingredientID} = req.body

    try {
        const ing = await updateIngredient(_name, pricePerUnit, quantity, ingredientID)
        res.status(201).send(ing)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

ingredientsRouter.delete("/", async (req, res) => {
    const {ingredientID, _name} = req.body

    try{
        const emp = await deleteIngredient(ingredientID, _name)
        res.status(201).send(emp)
    } catch (err){
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default ingredientsRouter