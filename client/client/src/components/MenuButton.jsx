import React from 'react'
import addToTab from '../api/modifyTab'

export default function MenuButton({product}){
    const sendOrder = async () => {
        const response = await addToTab(1, productID, tableID)
        console.log(response.message);
        
    }

    return(
        <button onClick={sendOrder} name = {product._name}/>
    )
}