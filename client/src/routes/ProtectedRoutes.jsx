import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function ProtectedRoutes() {
    const { employee } = useAuth()
    return employee ? <Outlet /> : <Navigate to={"/login"} replace/>
}