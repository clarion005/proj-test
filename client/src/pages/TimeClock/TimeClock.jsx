import { useEffect, useState } from "react";
import Button from "../../components/Button";
import NavBar from "../../routes/NavBar";
import { useAuth } from "../../context/AuthProvider";
import { fetchClockIn, fetchClockOut } from "../../api/timeClockEntry";

export default function TimeClock() {
    const [currentDate, setCurrentDate] = useState(new Date())

    useEffect(() => {
        const dateInterval = setInterval(() => {
            setCurrentDate(new Date())
        }, 1000);

        return () => clearInterval(dateInterval)
    }, [])

    const formattedDate = currentDate.toLocaleDateString()
    const formattedTime = currentDate.toLocaleTimeString()

    const handleClockIn = async () => {
        fetchClockIn()
            .then((data) => console.log(`Clocked in: ${data.entryID}`))
            .catch((err) => console.log(err.message))
    }

    const handleClockOut = () => {
        fetchClockOut()
            .then((data) => console.log(`Clocked out: ${data.entry.clockIn} ${data.entry.clockOut}`))
            .catch((err) => console.log(err.message))
    }

    return (
        <>
            <NavBar />

            <div className='flex flex-col items-center justify-center h-screen bg-[rgb(206,226,240)] text-[#5eb5f3a6]'>
                <div className="flex flex-col items-center bg-[rgb(248,247,246)] rounded-2xl px-10 py-8 shadow">
                    <h1 className='font-bold text-4xl'>Time Clock</h1>
                    
                    <div className="flex flex-col items-center font-bold">
                        <p className="text-2xl">{formattedTime}</p>
                        <p className="text-[18px]">{formattedDate}</p>
                    </div>

                    <div className="flex flex-row gap-3 mt-3">
                        <Button onClick={handleClockIn} type="button" name="Clock In"/>
                        <Button onClick={handleClockOut} type="button" name="Clock Out"/>
                    </div>
                </div>
            </div>
        </>
    )
}