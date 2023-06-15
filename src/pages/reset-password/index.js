import { useRef, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Navigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { reset_password } from "../../store/slices/auth/slices"
import {resetPasswordValidationSchema} from "../../store/slices/auth/validation.js"

import "../../Form.scss"


function ResetPasswordPage () {

    const passwordRef = useRef()
    const confirmpasswordRef = useRef()


    const dispatch = useDispatch()
    const { isResetPassword } = useSelector(state => {
        return {
            isResetPassword : state.auth.isResetPassword,
        }
    })

    
    const eye = <FontAwesomeIcon icon={faEye} />;
    const eye_slash =<FontAwesomeIcon icon={faEyeSlash} />;
    const [passwordShown, setPasswordShown] = useState({value : false, field_name : ""});
    

    const onButtonResetPassword = () => {
        dispatch(reset_password({
            password : passwordRef.current?.value,
            confirmPassword : confirmpasswordRef.current?.value
        }))
    }

    // @redirect
    if(!isResetPassword){
        return <Navigate to="/login" replace/>
    }
    return (
        <Formik
            initialValues={{ password: "", confirm:""}}
            validationSchema={resetPasswordValidationSchema}
        >
        {({ errors, touched }) => {
            return (
            <div className="container">
                <div className="form card w-96 bg-base-100 shadow-xl">
                    <Form>
                    <h1>Reset Password</h1>
                    <div className="form-row">
                        <label htmlFor="password">New Password</label>
                        <div className="form-row-pass">
                        <Field
                            type={passwordShown.value && passwordShown.field_name == "password" ? "text" : "password"}
                            name="password"
                            id="password"
                            innerRef={passwordRef}
                            className={
                            errors.password && touched.password ? "input-error input input-md w-full max-w-xs" : "input input-bordered input-md w-full max-w-xs"
                            }
                        />
                        <i className="eye-password" 
                            onClick={()=>{
                                setPasswordShown({value : !passwordShown.value, field_name : "password" })
                            }}
                            onMouseLeave={()=>{
                                setPasswordShown({value : !passwordShown.value, field_name : "" })
                            }}
                        >
                            {passwordShown.value && passwordShown.field_name == "password" ? eye_slash : eye}
                        </i>
                        </div>
                        <ErrorMessage
                            name="password"
                            component="span"
                            className="error"
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="password">Confirm Password</label>
                        <div className="form-row-pass">
                        <Field
                            type={passwordShown.value && passwordShown.field_name == "confirm" ? "text" : "password"}
                            name="confirm"
                            id="confirm"
                            innerRef={confirmpasswordRef}
                            className={
                            errors.confirm && touched.confirm ? "input-error input input-md w-full max-w-xs" : "input input-bordered input-md w-full max-w-xs"
                            }
                        />
                        <i className="eye-password" 
                            onClick={()=>{
                                setPasswordShown({value : !passwordShown.value, field_name : "confirm" })
                            }}
                            onMouseLeave={()=>{
                                setPasswordShown({value : !passwordShown.value, field_name : "" })
                            }}
                        >
                            {passwordShown.value && passwordShown.field_name == "confirm" ? eye_slash : eye}
                        </i>
                        </div>
                        <ErrorMessage
                            name="confirm"
                            component="span"
                            className="error"
                        />
                    </div>

                    <button
                        type="button"
                        className="btn btn-neutral"
                        onClick={onButtonResetPassword}
                    >
                        Reset Password
                    </button>
                    </Form>
                </div>
            </div>
            );
        }}
        </Formik>
    )
}

export default ResetPasswordPage