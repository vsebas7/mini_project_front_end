import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import "../../Form.scss"
import { verify_account } from "../../store/slices/auth/slices"



function VerifyAccountPage () {    
    // @hooks
    const dispatch = useDispatch()
    const { id, isVerified, email } = useSelector(state => {
        return {
            id : state.auth.id,
            email : state.auth.email,
            isVerified : state.auth.isVerified
        }
    })

    // @event handler
    const onButtonVerify = () => {
      dispatch(verify_account())
    }
    // @redirect
    if (id && isVerified) {
      return <Navigate to="/profile" replace/>
    }
    
    return (
      <div className="container">

        <h1>Verification Account</h1>
        <p> Click button bellow to verify this {email} account</p>
        <br/>
        <button
          type="button"
          className="btn btn-neutral"
          onClick={onButtonVerify}
        >
          Verify My Account
        </button>
      </div>
    )
}

export default VerifyAccountPage