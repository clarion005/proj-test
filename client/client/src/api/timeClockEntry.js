import { API_URL } from "./baseUrl"

export async function fetchClockIn() {
    const endpoint = `${API_URL}-entries/clock-in`
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({})
    })
    
    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
        throw new Error(`${res.status} ${data.message}`)
    }

    return data
}

export async function fetchClockOut() {
    const endpoint = `${API_URL}-entries/clock-out`
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({})
    })

    const data = await res.json().catch(() => ({}))

    if(!res.ok) {
        throw new Error(`${res.status} ${data.message}`)
    }

    return data
}