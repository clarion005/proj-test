import { API_URL } from "./baseUrl"

export async function loginEmployee(employeeID, password) {
    const endpoint = `${API_URL}/login`
    const request = {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            employeeID,
            password
        })
    }

    const response = await fetch(endpoint, request)
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
        throw new Error(`${response.status} ${data.message}`)
    }

    return {
        data: data
    }
}
