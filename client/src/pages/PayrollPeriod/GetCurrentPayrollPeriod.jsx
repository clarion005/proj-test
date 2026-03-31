import { useEffect, useState } from "react";
import { getCurrentPayPeriod } from "../../api/PayPeriodCalls";

export default function GetCurrentPayrollPeriod() {
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    useEffect(() => {
        getCurrentPayPeriod()
            .then((data) => {
                setStartDate(new Date(data.payPeriod.startDate).toLocaleDateString())
                setEndDate(new Date(data.payPeriod.endDate).toLocaleDateString())
            })
            .catch((err) => console.log(err.message))
    }, [])

    return (
        <div className="flex flex-col gap-2 text-2xl font-semibold items-center">
            <p>Start Date: {startDate}</p>
            <p>End Date: {endDate}</p>
        </div>
    )
}