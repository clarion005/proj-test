import React from 'react'
import NewIngredientForm from './new_ingredient_form'
import NavBar from '../../components/NavBar'
import { API_URL } from '../../api/baseUrl'

function NewIngredient(){
    const submitNewIngredient = async({ingredientID, _name, pricePerUnit}) => {
        const endpoint = `${API_URL}` //update with proper path once it exists
        const req = await fetch(endpoint, {method : 'POST', body : JSON.stringify({ingredientID, _name, pricePerUnit})})
        const res = await req.text()
    }
    return(
        <>
            <NavBar/>

            <div className='flex flex-col items-center justify-center h-screen bg-[rgb(206,226,240)]'>
                <div className="flex flex-col items-center bg-[rgb(248,247,246)] rounded-2xl gap-6 px-10 py-8 shadow">
                    <h1 className='font-bold text-4xl text-[#5eb5f3a6]'>Add Ingredient</h1>
                    <NewIngredientForm handleSubmit={submitNewIngredient}/>
                </div>
            </div>
        </>
    )

}
export default NewIngredient