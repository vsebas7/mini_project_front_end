import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
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
import ChangePasswordPage from "./pages/change-password"
import BlogsPage from "./pages/blogs"
import MyBlogsPage from "./pages/blogs/myArticles"
// import Homepage from "./pages/homepage"



// import PublishBlog from "./pages/post_blog"

function App() {
	const dispatch = useDispatch()
	const { isKeepLoginLoading } = useSelector(state => {
		return {
			isKeepLoginLoading : state.auth?.isKeepLoginLoading
		}
	})

	useEffect(() => {
		dispatch(keepLogin())
	}, [])

	if (isKeepLoginLoading) return (
		<div className="h-screen w-screen flex flex-row align-bottom justify-center">
			<span className="loading loading-spinner loading-md"></span>
		</div>
	)

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
				{/* <Route path="/home" element={<Homepage />} /> */}
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/verification/:token" element={<VerifyAccountPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/reset-password/:token" element={<ResetPasswordPage />} />
				<Route path="/profile" element={<ProfileUser />} />
				<Route path="/change-password" element={<ChangePasswordPage />} />
				<Route path="/blogs" element={<BlogsPage />} />
				<Route path="/myblogs" element ={<MyBlogsPage/>} />
				{/* <Route path="/post-blog" element={<PublishBlog />} /> */}
			</Routes>
			<Toaster/>
		</div>
	);
}

export default App