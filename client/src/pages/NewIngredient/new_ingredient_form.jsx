import React from 'react'
import Button from "../../components/Button.jsx"

function NewIngredientForm(handleSubmit){
    const onSubmit= (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        handleSubmit({ingredientID : form.get('ingredientID'),
                      _name : form.get('name'),
                      pricePerUnit : form.get('pricePerUnit')
         })

    };
    return(
        <div>
            <form method = "post" onSubmit = {onSubmit} className = 'flex flex-col items-center gap-5'>
                <div className = 'flex flex-col gap-1'> <label htmlFor = "ingredientID"> IngredientID</label>
                    <input type = "text" name = "ingredientID" id = "ingredientID" required className = 'border border-[#7ebeeba6] rounded-md px-2'/>
                </div>
                <div className = 'flex flex-col gap-1'>
                    <label htmlFor = "name"> Name </label>
                    <input type = "text" name = "name" id = "name" required className = 'border border-[#7ebeeba6] rounded-md px-2'/>
                </div>
                <div className = 'flex flex-col gap-1'>
                    <label htmlFor = "pricePerUnit"> Price Per Unit </label>
                    <input type = "text" name = "pricePerUnit" id = "pricePerUnit" required className = 'border border-[#7ebeeba6] rounded-md px-2'/>
                </div>

            </form>
        </div>
    );
}

export default NewIngredientForm