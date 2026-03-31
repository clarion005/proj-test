import { createContext, useContext, useEffect, useState } from "react";
import { loadEmployee } from "../api/loadEmployee";

export const AuthContext = createContext(null)

export default function AuthProvider({ children }) {
    const [employee, setEmployee] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadEmployee()
            .then(employee => setEmployee(employee))
            .catch(() => setEmployee(null))
            .finally(() => setLoading(false))
    }, [])

    return (
        <AuthContext.Provider value={{ employee, setEmployee, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}