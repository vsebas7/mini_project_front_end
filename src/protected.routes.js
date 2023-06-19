// import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute ({
    children
}) {
    // const { isLogin } = useSelector(state => {
    //     return {
    //         isLogin : state.auth.isLogin
    //     }
    // })
    
    const id = localStorage.getItem("token")

    return id ? children : <Navigate to="/login" replace/>
}