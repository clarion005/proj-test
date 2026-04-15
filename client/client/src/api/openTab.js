import {API_URL } from '../api/baseUrl'


export default async function openTab(tableID){
    const endpoint = `${API_URL}/transactions/openTab`
    
    const req = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : 'include',
        body : JSON.stringify({
            tableID
        })
    }
    const response = await fetch(endpoint,req)
    const data = await response.json().catch(() => ({}))
    console.log(data.message)
    
    if (!response.ok){
        throw new Error (`${response.status} ${data.message}`)
    }

    return data
}
