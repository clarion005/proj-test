import React from 'react'
import Button from "../../components/Button.jsx"
import { useNavigate } from 'react-router-dom'
import NavBar from '../../routes/NavBar.jsx'
import loadMenu from '../../api/loadMenu.js'

//pretty much just using this to test the api
export default function Dashboard(){
    const nav = useNavigate() 

    const goToOpenTab = () => {
        try{
            console.log("redirect to open tab")
            nav("/Tab", {replace : true})
        }
        catch(error){
            console.log(error.message)
        }
    }

    const getMenu = async () => {
        const obj = await loadMenu()
        console.log(JSON.stringify(obj))
    }

    const registerNewEmployee = () => {
        try{
            console.log("redirect to employee registration")
            nav("/newemployee", {replace : true})
        } 
        catch(error){
            console.log(error)
        }
    }

    const addNewProduct = () => {
        try{
            console.log("redirect to new product page")
            nav("/newproduct", {replace : true})
        }
        catch(error){
            console.log(error.message)
        }
    }

    return(
        <>
            <NavBar />
           <div style = {{display: "flex", alignItems : "center" , height : "100%"}}>
                <div>
                    <Button onClick = {registerNewEmployee} type = "button" name = "Register New Employee"/>
                </div>
                <div>
                    <Button onClick = {addNewProduct} type  = "button" name  = "Add New Product"/>
                </div>
                <div>
                    <Button onClick = {getMenu}  type  = "button" name  = "load menu"/>
                </div>
            </div> 
        </>
    )
}
