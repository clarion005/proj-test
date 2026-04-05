import React from 'react'
import Button from '../../components/Button.jsx'


export default function OpenTabForm({handleSubmit}){
    const onSubmit = (e) => {
        e.preventDefault()
        
        const date = new Date()
        const datetimePlaced = date.toISOString().slice(0,19).replace('T', ' ')
        const form = new FormData(e.target)
        handleSubmit({
            tableID : form.get('tableID'),
            employeeID : form.get('employeeID'),
            customerID : form.get('customerID'),
            timePlaced : datetimePlaced
        })
    }

    return (
        <div>
            <form method = "post" onSubmit={onSubmit} className = 'flex flex-col items-center gap-5'>
                <div className = 'flex flex-col gap-1'>
                    <label htmlFor = "tableID">Table ID</label>
                    <input type = "number" name = "tableID" id = "tableID" required className = 'border border-[#7ebeeba6] rounded-md px-2'/>
                </div>
                <div className = 'flex flex-col gap-1'>
                    <label htmlFor = "employeeID">Employee ID</label>
                    <input type = "number" name = "employeeID" id = "employeeID" required className = 'border border-[#7ebeeba6] rounded-md px-2'/>
                </div>
                <div className = 'flex flex-col gap-1'>
                    <label htmlFor = "customerID">Customer ID</label>
                    <input type = "number" name = "customerID" id = "customerID" required className = 'border border-[#7ebeeba6] rounded-md px-2'/>
                </div>
                <Button type = "submit" name = "Submit"/>
            </form>
        </div>
    );
}