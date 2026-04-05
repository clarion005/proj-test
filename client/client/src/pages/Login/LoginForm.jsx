import Button from '../../components/Button'
import '../../index.css'

export default function LoginForm({handleSubmit}) {
    const onSubmit = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        handleSubmit({ employeeID: form.get('employeeID'), password: form.get('password') })
    }

    return (
        <div>
            <form onSubmit={onSubmit} className='flex flex-col items-center gap-5'>
                <div className='flex flex-col text-lg gap-5'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="employeeID" className=''>Employee ID</label>
                        <input type="text" name="employeeID" id="employeeID" required className='border border-[#7ebeeba6] rounded-md px-2'/>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" required className='border border-[#7ebeeba6] rounded-md px-2'/>
                    </div>
                </div>
                <Button type="submit" name="Login" />
            </form>
        </div>
    )
}