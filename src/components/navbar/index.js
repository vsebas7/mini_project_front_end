import { useDispatch, useSelector } from "react-redux"
import { useNavigate  } from "react-router-dom"
import { logout } from "../../store/slices/auth/slices"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

export default function Navbar () {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userAvatar = <FontAwesomeIcon icon={faUser} />

	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a className="btn btn-ghost normal-case text-xl">Blogs</a>
			</div>
			<div className="flex-none">
				<div className="dropdown dropdown-end">
				<label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
					<div className="bg-neutral-focus text-neutral-content rounded-full w-12">
						<span>{userAvatar}</span>
					</div>
				</label>
				<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10">
					<li><a className="cursor-pointer" onClick={() =>{navigate("/profile")}}>Profile</a></li>
					<li><a className="cursor-pointer" onClick={() => dispatch(logout())}>Logout</a></li>
				</ul>
				</div>
			</div>
		</div>
	)
}
