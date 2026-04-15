import React from 'react'
import Button from '../../components/Button.jsx'
import '../../index.css'

export default function NewProductForm({handleSubmit}){


    const onSubmit= (e) =>{
        e.preventDefault()
        const form = new FormData(e.target)
        handleSubmit({
                productID : form.get('productID'),
                _name : form.get('_name'),
                price : form.get('price'),
                menuType : form.get('menuType'),
                stationID : form.get('stationID')
        })
        console.log("price in form: ", price)
    };

    return(
        <div>
            <form method = "post" onSubmit = {onSubmit} className = 'flex flex-col items-center gap-5'>
                <div className = 'flex flex-col gap-1'>
                    <label htmlFor = "productID"> ProductID </label>
                    <input type = "number" name = "productID" id = "productID" required className = 'border border-[#7ebeeba6] rounded-md px-2'/>
                </div>

                <div className = 'flex flex-col gap-1'>
                    <label htmlFor = "_name"> Name </label>
                    <input type = "text" name = "_name" id = "_name" required className = 'border border-[#7ebeeba6] rounded-md px-2'/>
                </div>

                <div className = 'flex flex-col gap-1'>
                    <label htmlFor = "price"> Price </label>
                    <input type = "number" name = "price" id = "price" required className = 'border border-[#7ebeeba6] rounded-md px-2'/>
                </div>

                <div className = 'flex flex-col gap-1'>
                    <label htmlFor = "menuType"> Menu Type </label>
                    <input type = "number" name = "menuType" id = "menuType" required className = 'border border-[#7ebeeba6] rounded-md px-2'/>
                </div>
                <div className = 'flex flex-col gap-1'>
                    <label htmlFor = "stationID"> Station ID </label>
                    <input type = "number" name = "stationID" id = "stationID" required className = 'border border-[#7ebeeba6] rounded-md px-2'/>
                </div>
                <Button type="submit" name="Submit" />
                
            </form>
        </div>
    );
}


