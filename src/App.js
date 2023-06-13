import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./protected.routes"
import { keepLogin } from "./store/slices/auth/slices"

import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"
import VerifyAccountPage from "./pages/verify-account"
import ForgotPasswordPage from "./pages/forgot-password"
import ResetPasswordPage from "./pages/reset-password"
import ProfileUser from "./pages/profile"
// import ChangePasswordPage from "./pages/change-password"



// import PublishBlog from "./pages/post_blog"
// import Homepage from "./pages/homepage"

function App() {
	// @hooks
	const dispatch = useDispatch()

	// @side effect
	useEffect(() => {
		dispatch(keepLogin())
	}, [])

	return (
		<div className="h-screen w-screen bg-white">
			<Routes>
				<Route 
					path="/" 
					element={
						<ProtectedRoute>
						</ProtectedRoute>
					} 
				/>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/verification" element={<VerifyAccountPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/reset-password" element={<ResetPasswordPage />} />
				<Route path="/profile" element={<ProfileUser />} />
				{/* <Route path="/change-password" element={<ChangePasswordPage />} /> */}
				{/* <Route path="/post-blog" element={<PublishBlog />} /> */}
				{/* <Route path="/home" element={<Homepage />} /> */}
			</Routes>
			<Toaster/>
		</div>
	);
}

export default App