import { API_URL } from "./baseUrl";

export async function loadEmployee() {
    const endpoint = `${API_URL}/dashboard`;
    const response = await fetch(endpoint, {
        credentials: "include",
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(`${response.status} ${data.message}`);
    }

    return data.employee ?? null;
}
