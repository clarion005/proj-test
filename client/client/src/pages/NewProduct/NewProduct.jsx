import React from "react"
import NewProductForm from "./NewProduct/new_product_form.js"
import NavBar from "../../components/NavBar.jsx"

function NewProduct(){
    
    const submitNewProduct = ({productID, _name, price, 
                               menuType, stationID}) => {}     
    //TODO: post fetch request to backend app.js 
        
   
    return (
        <>
            <NavBar />

            <div className='flex flex-col items-center justify-center h-screen bg-[rgb(206,226,240)]'>
                <div className="flex flex-col items-center bg-[rgb(248,247,246)] rounded-2xl gap-6 px-10 py-8 shadow">
                    <h1 className='font-bold text-4xl text-[#5eb5f3a6]'>Register New Employee</h1>
                    <NewProductForm handleSubmit={submitNewProduct}/>
                </div>
            </div>
        </>

    )
}

export default NewEmployee