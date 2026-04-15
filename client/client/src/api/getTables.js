import { API_URL } from "./baseUrl"; 

export async function getTablesByEmployee(employeeID){
    const res = await fetch(`${API_URL}/employeeTables`, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            employeeID
        })
    })

    data = res.json().catch(() => ({}))

    if (!res.ok) {
        throw new Error (
            data.message || `HTTP Error: ${res.status}`
        );    
    }

    return data
}