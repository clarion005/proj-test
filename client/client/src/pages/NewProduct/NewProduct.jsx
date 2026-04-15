import React from "react"
import NewProductForm from "./new_product_form"
import addProduct from "../../api/addProduct.js"
import NavBar from "../../routes/NavBar.jsx"

export default function NewProduct(){
    
    const submitNewProduct = async ({
        productID,
         _name, 
         price, 
        menuType, 
        stationID}) => {
            console.log("price in component: ", price)
            try{
                const data  = await addProduct (productID, _name, price, 
                               menuType, stationID)
            }
            catch(err){
                console.log(err)
            }
                               }   
        
   
    return (
        <>
            <NavBar />

            <div className='flex flex-col items-center justify-center h-screen bg-[rgb(206,226,240)]'>
                <div className="flex flex-col items-center bg-[rgb(248,247,246)] rounded-2xl gap-6 px-10 py-8 shadow">
                    <h1 className='font-bold text-4xl text-[#5eb5f3a6]'>Add a New Product</h1>
                    <NewProductForm handleSubmit={submitNewProduct}/>
                </div>
            </div>
        </>

    )
}
