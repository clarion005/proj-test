import { API_URL } from "./baseUrl";

export async function createPayPeriod({ startDate, endDate }) {
    const endpoint = `${API_URL}/pay-periods`
    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            startDate,
            endDate
        })
    })

    const data = await res.json().catch(() => ({}))

    console.log(data)

    if (!res.ok) {
        throw new Error(`${res.status} ${data.message}`)
    }

    return data
}

export async function getCurrentPayPeriod() {
    const endpoint = `${API_URL}/pay-periods/current`
    const res = await fetch(endpoint, {
        credentials: "include"
    })
    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
        throw new Error(`${res.status} ${data.message}`)
    }

    return data
}