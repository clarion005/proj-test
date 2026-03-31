import { useState } from "react"
import Button from "../../components/Button"
import { createPayPeriod } from "../../api/PayPeriodCalls"

export default function CreatePayrollPeriodForm() {
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()

        createPayPeriod({ startDate, endDate })
            .then((data) => console.log(`${data.payPeriodID} ${data.startDate} ${data.endDate}`))
            .catch((err) => console.log(err.message))
    }

    return (
        <form className='flex flex-col items-center gap-5' onSubmit={handleSubmit}>
            <div className="flex flex-col text-lg gap-5">
                <div className='flex flex-col gap-1'>
                    <label htmlFor="startDate">Starting Date</label>
                    <input className='border border-[#7ebeeba6] rounded-md px-2' type="date" name="startDate" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required/>
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="endDate">Ending Date</label>
                    <input className='border border-[#7ebeeba6] rounded-md px-2' type="date" name="endDate" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required/>
                </div>
            </div>

            <Button type="submit" name="Submit"/>
        </form>
    )
}