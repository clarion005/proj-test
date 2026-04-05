import { NavLink } from "react-router";
import { useAuth } from "../context/AuthProvider";

export default function NavBar() {
    {/* 
    Server
        Open Tab
        Clock-in
        Add customer
        Hours/Revenue
    */}
    {/* 
    Host
        Clock-in
        Puts customer to table
    */}
    {/* 
    Bussers/Food-Runners
        Clock-in
        Hours/Revenue
    */}
    {/* 
    Managers
        Everything
        New/Delete Employees
        Modify hours for employees
        Modify clock-in/out
        Modify menu
        Any data reports
    */}
    const { employee } = useAuth()

    return (
        <nav className="flex flex-row justify-between bg-[#5eb5f3a6] text-[rgb(255,255,255)] font-bold text-xl items-center py-2 px-5">
            <div className="flex flex-row gap-7">
                <NavLink to={'/opentab'}>Tab</NavLink>
                <NavLink to={'/newemployee'}>New Employee</NavLink>
                <NavLink to={'/timeclock'}>Time Clock</NavLink>
                <NavLink to={'/payrollperiod'}>Payroll Period</NavLink>
            </div>

            <div>
                <NavLink to={'/dashboard'}>
                    <p>{ `${employee.firstName}  ${employee.lastName}` }</p>
                </NavLink>
            </div>
        </nav>
    )
}
