import React from "react"
import Button from "../../components/Button.jsx"
import '../../index.css'

function NewEmployeeForm({handleSubmit}){

    const onSubmit = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        handleSubmit({
            firstName : form.get('firstName'),
            lastName : form.get('lastName'),
            dateHired : form.get('hireDate'),
            dateOfBirth : form.get('dob'),
            shiftRole : form.get('role'),
            hourlyRate : form.get('hourlyRate'),
            password : form.get('password')
        })
    }

    return(
        <div>
            <form method = "post" onSubmit={onSubmit} className = 'flex flex-col items-center gap-5'>
              <div className='flex flex-col text-lg gap-5'>
                <div className = 'flex flex-col gap-1'>
                    <label htmlFor = "firstName">First Name</label>
                    <input type = "text" name = "firstName" id = "firstName" required className = 'border border-[#7ebeeba6] rounded-md px-2'/>
                </div>

                <div className = 'flex flex-col gap-1'>
                    <label htmlFor="lastName">Last Name</label>
                    <input type = "text" name = "lastName" id = "lastName" required className = 'border border=[#7ebeeba6] rounded-md px-2'/>
                </div>

                <div className = 'flex flex-col gap-1'>
                    <label htmlFor="hireDate">Hire Date </label>
                    <input type = "date" name = "hireDate" id = "hireDate" required className = 'border border=[#7ebeeba6] rounded-md px-2'/>
                </div>

                <div className = 'flex flex-col gap-1'>
                    <label htmlFor="dob">Date of Birth </label>
                    <input type = "date" name = "dob" id = "dob" required className = 'border border=[#7ebeeba6] rounded-md px-2'/>
                </div>

                <div className = 'flex flex-col gap-1'>
                    <label htmlFor="role">Role </label>
                    <input type = "number" inputMode = "decimal" name = "role" id = "role" required className = 'border border=[#7ebeeba6] rounded-md px-2'/>
                </div>

                <div className = 'flex flex-col gap-1'>
                    <label htmlFor="hourlyRate">Hourly Rate</label>
                    <input type = "number" name = "hourlyRate" id = "hourlyRate" required className = 'border border=[#7ebeeba6] rounded-md px-2'/>
                </div>
                <div className = 'flex flex-col gap-1'>
                    <label htmlFor="password">Password</label>
                    <input type = "password" name = "password" id = "password" required className = 'border border=[#7ebeeba6] rounded-md px-2'/>
                </div>
                </div>
                <Button type="submit" name="Submit" />
            </form>
        </div>
    );
}

export default NewEmployeeForm