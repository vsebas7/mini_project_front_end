import { Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import "../../Form.scss"
import { verify_account } from "../../store/slices/auth"



function VerifyAccountPage () {    
    // @hooks
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")

    // @event handler
    const onButtonVerify = () => {
      dispatch(verify_account({token}))
    }
    // @redirect
    if (token == null) {
      return <Navigate to="/" replace/>
    }
    
    return (
      <div className="container">

        <h1>Verify Account</h1>
        <button
          type="button"
          onClick={onButtonVerify}
        >
          Verify Account
        </button>
      </div>
    )
}

export default VerifyAccountPage