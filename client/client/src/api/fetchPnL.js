import { API_URL } from "./baseUrl";

export default async function fetchPnL(startDate, endDate){
    const endpoint = `${API_URL}/pnl`

    const response= await fetch(endpoint, {
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : "include",
        body : {
            start : startDate,
            end : endDate

        }
    })
    if (!response.ok){
        const err = await response.json().catch(() => ({}))
        throw new Error(
            err.message || `HTTP Error: ${response.status}`
        );
    }
    return await response.json()
}
