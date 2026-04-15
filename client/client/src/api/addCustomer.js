import {API_URL} from '../api/baseUrl.js'

export default async function addCustomer(fName, lName, dateOfBirth, dateJoined, phNumber, em, stat, rp){
    const endpoint = `${API_URL}/customers`
    
    const request = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : 'include',
        body : JSON.stringify({
            firstName : fName,
            lastName : lname,
            dob : dateOfBirth,
            dateJoined : dateJoined,
            phoneNumber : phNumber,
            email : em,
            status : stat, 
            rewardPoints : rp
        })
    }

}