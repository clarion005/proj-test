import { API_URL } from "./baseUrl";

export default async function addIngredient(){
    const endpoint = `${API_URL}/ingredients`
    const request = {
        method : 'POST',
        headers : {
            "Content-Type" : "application/json"
        },
        credentials: "include",
        body : JSON.stringify({
            ingredientID, _name, pricePerUnit, quantity
        })
    }
    const response = await fetch(endpoint, request)
    const data = await response.json().catch(()=>({}))
    if(!response.ok){
        throw new Error(
            data.message || `HTTP Error: ${response.status}`
        )
    }
    return data
}
