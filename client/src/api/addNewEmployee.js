import { API_URL } from "./baseUrl";

export default async function addNewEmployee(firstName, lastName, dateHired, 
    dateOfBirth, shiftRole, hourlyRate, password){
    const endpoint = `${API_URL}/employees`

    
        const request = {
            method : 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            credentials : "include",
            body : JSON.stringify({
                firstName, 
                lastName, 
                dateHired,
                dateOfBirth, 
                shiftRole, 
                hourlyRate, 
                password
        })
        }
            const response = await fetch(endpoint, request)
            const data = await response.json().catch(() => ({})) 
            if (!response.ok){
                throw new Error (
                    data.message || `HTTP Error: ${response.status}`
            );
        }
      

        console.log(data.body)
        return {
            data
        } 

}