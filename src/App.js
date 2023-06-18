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
import PublishBlog from "./pages/post_blog"
import Navbar from "./components/navbar"
import NotFoundPage from "./pages/not-found"

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
		<div className=" w-full h-[900px] px-40">
            <Navbar/>
			<Routes>
				<Route 
					path="/change-password" 
					element={
						<ProtectedRoute>
							<ChangePasswordPage />
						</ProtectedRoute>
					} 
				/>
				<Route 
					path="/myblogs" 
					element={
						<ProtectedRoute>
							<MyBlogsPage />
						</ProtectedRoute>
					} 
				/>
				<Route 
					path="/post-blog" 
					element={
						<ProtectedRoute>
							<PublishBlog />
						</ProtectedRoute>
					} 
				/>
				<Route 
					path="/profile" 
					element={
						<ProtectedRoute>
							<ProfileUser />
						</ProtectedRoute>
					} 
				/>
				<Route path="/" element={<BlogsPage />} />
				<Route path="*" element={<NotFoundPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/verification/:token" element={<VerifyAccountPage />} />
				<Route path="/verification-change-email/:token" element={<VerifyAccountPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/reset-password/:token" element={<ResetPasswordPage />} />
				{/* <Route path="/profile" element={<ProfileUser />} /> */}
			</Routes>
			<Toaster/>
		</div>
	);
}

export default App