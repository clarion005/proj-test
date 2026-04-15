import { API_URL } from "./baseUrl";

//TODO: implement options to allow for selective loading of part of menu
export default async function loadMenu(){
    const endpoint = `${API_URL}/products`
    try {
        const response = await fetch(endpoint, {credentials : 'include'});
        const data = await response.json()
        console.log(data)
        return {
            data :data 
        }
    }
       
    catch(error){
        console.error('fetch error: ', error)
        throw error;
    }

}