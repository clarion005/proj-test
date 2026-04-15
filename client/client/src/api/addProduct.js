import { API_URL } from "./baseUrl";

export default async function addProduct(productID, _name, price, menuType,  stationID){
    const endpoint = `${API_URL}/products`
    console.log("price: ", price)

    const request = {
        method : 'POST',
        headers : {
            'content-type' : 'application/json'
        },
        credentials : 'include',
        body : JSON.stringify({
           productID,
           _name,
           price,
           menuType,
           stationID 
        })
    }

    console.log("sending api request")
    const response = await fetch(endpoint, request)
    const data = await response.json().catch(() =>({}))
    console.log(data.message)

    if(!response.ok){
        throw new Error(
            data.message || `HTTP error: ${data.status}${data.message}`
            
        )
    }
    //console.log(response.body)
    return {
        data
    }
}