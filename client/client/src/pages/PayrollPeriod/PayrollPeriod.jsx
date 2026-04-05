import { useState } from "react";
import Button from "../../components/Button";
import NavBar from "../../routes/NavBar";
import CreatePayrollPeriodForm from "./CreatePayrollPeriodForm";
import GetCurrentPayrollPeriod from "./GetCurrentPayrollPeriod";

export default function PayrollPeriod() {
    const [view, setView] = useState("create")

    return (
        <>
            <NavBar/>
            
            <div className='flex flex-col items-center justify-center h-screen bg-[rgb(206,226,240)]'>
                <div className="flex flex-col items-center bg-[rgb(248,247,246)] rounded-2xl gap-6 px-10 py-8 shadow">
                    <div className="flex gap-2">
                        <Button onClick={() => setView("create")} name={'Create'} type={'button'}/>
                        <Button onClick={() => setView("current")} name={'Current Period'} type={'button'}/>
                    </div>

                    {
                        view === "create" ? (
                            <>
                                <h1 className='font-bold text-4xl text-[#5eb5f3a6]'>Create Payroll Period</h1>
                                <CreatePayrollPeriodForm/>
                            </>
                        ) : (
                            <>
                                <h1 className='font-bold text-4xl text-[#5eb5f3a6]'>Current Payroll Period</h1>
                                <GetCurrentPayrollPeriod/>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}
