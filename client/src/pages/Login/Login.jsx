import LoginForm from './LoginForm'
import { loginEmployee } from '../../api/loginEmployee'
import { useAuth } from '../../context/AuthProvider'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const { setEmployee } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async ({employeeID, password}) => {
        try {
            const { data } = await loginEmployee(employeeID, password)        
            setEmployee(data.employee)
            navigate("/dashboard", { replace: true })

        } catch(err) {
            console.log(err.message)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-[rgb(206,226,240)]'>
            <div className="flex flex-col items-center bg-[rgb(248,247,246)] rounded-2xl gap-6 px-10 py-8 shadow">
                <h1 className='font-bold text-4xl text-[#5eb5f3a6]'>Employee Login</h1>
                <LoginForm handleSubmit={handleLogin}/>
            </div>
        </div>
    )
}
