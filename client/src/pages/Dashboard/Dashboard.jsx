import React from 'react'
import Button from "../../components/Button.jsx"
import { useNavigate } from 'react-router-dom'
import NavBar from '../../routes/NavBar.jsx'

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

    const registerNewEmployee = () => {
        try{
            console.log("redirect to employee registration")
            nav("/newemployee", {replace : true})
        } 
        catch(error){
            console.log(error)
        }
    }

    const addNewProduct = () => {}

    return(
        <>
            <NavBar />
           <div style = {{display: "flex", alignItems : "center" , height : "100%"}}>
                <div>
                    <Button onClick = {goToOpenTab}  type = "button" name = "Open Tab"/>     
                </div>  
                <div>
                    <Button onClick = {registerNewEmployee} type = "button" name = "Register New Employee"/>
                </div>
                <div>
                    <Button type  = "button" name  = "Add New Product"/>
                </div>
            </div> 
        </>
    )
}
