import { useDispatch, useSelector } from "react-redux"
import { useNavigate  } from "react-router-dom"
import { logout } from "../../store/slices/auth/slices"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

export default function Navbar () {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userAvatar = <FontAwesomeIcon icon={faUser} />
	const { username } = useSelector(state => {
        return {
			username : state.auth.username
        }
    })
	const id = localStorage.getItem("id")
	const onButtonLogout = () => {
		navigate("/login")
        dispatch(logout()) 
    }

	return (
		<div className="navbar bg-base-100">
			<div className={`${!id ? "flex-grow" : "w-[85%]" }`}>
				<a className="link link-hover normal-case text-[35pt]" onClick={() =>{navigate("/")}}>Vsebas7 Blogs</a>
			</div>
			<div className="flex">
				{!id   
					?""
					:
						<div className="text-xl pr-5">
							{username}
						</div>
				}
				<div className="dropdown dropdown-end">
					<label 
						tabIndex={0} 
						className="flex flex-col btn btn-ghost btn-circle avatar placeholder"
					>
						<div className="bg-neutral-focus text-neutral-content rounded-full w-12">
							<span>{userAvatar}</span>
						</div>
					</label>
					{!id 
						?
						<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10">
							<li><a className="cursor-pointer" onClick={() =>{navigate("/login")}}>Login</a></li>
							<li><a className="cursor-pointer" onClick={() =>{navigate("/register")}}>Register</a></li>
						</ul>
						:
						<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10">
							<li><a className="cursor-pointer" onClick={() =>{navigate("/myblogs")}}>My Blogs</a></li>
							<li><a className="cursor-pointer" onClick={() =>{navigate("/profile")}}>Profile</a></li>
							<li><a className="cursor-pointer" onClick={onButtonLogout}>Logout</a></li>
						</ul>
					}
				</div>
			</div>
		</div>
	)
}
