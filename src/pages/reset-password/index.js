import { useRef, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Navigate } from "react-router-dom"
import { reset_password } from "../../store/slices/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {resetPasswordValidationSchema} from "../../store/slices/auth/validation.js"
import * as Yup from "yup";
import YupPassword from 'yup-password';
import "../../Form.scss"
YupPassword(Yup);

const initialValuesResetPassword = {
        password: "",
        confirm:""
    };


function ResetPasswordPage () {
    // @ref
    const passwordRef = useRef()
    const confirmpasswordRef = useRef()

    // @hooks
    const dispatch = useDispatch()
    const { token } = useSelector(state => {
        return {
            token : state.auth.token
        }
    })

    
    const eye = <FontAwesomeIcon icon={faEye} />;
    const eye_slash =<FontAwesomeIcon icon={faEyeSlash} />;
    const [passwordShown, setPasswordShown] = useState({value : false, field_name : ""});
    
    // @event handler
    const onButtonResetPassword = () => {
        // dispatch(reset_password({
        //     password : passwordRef.current?.value,
        // }))
        console.log(passwordRef.current?.value)
    }

    // @redirect
    if (token) return <Navigate to="/" replace/>

    return (
        <Formik
            initialValues={initialValuesResetPassword}
            validationSchema={resetPasswordValidationSchema}
        >
        {(formik) => {
            const { errors, touched } = formik;
            return (
            <div className="container">
                <h1>Forgot Password</h1>
                <Form>
                <div className="form-row">
                    <label htmlFor="password">New Password</label>
                    <div className="form-row-pass">
                    <Field
                        type={passwordShown.value && passwordShown.field_name == "password" ? "text" : "password"}
                        name="password"
                        id="password"
                        innerRef={passwordRef}
                        className={
                        errors.password && touched.password ? "input-error" : null
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
                        {passwordShown.value && passwordShown.field_name == "password" ? eye : eye_slash}
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
                        errors.confirm && touched.confirm ? "input-error" : null
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
                        {passwordShown.value && passwordShown.field_name == "confirm" ? eye : eye_slash}
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
                    onClick={onButtonResetPassword}
                >
                    Confirm
                </button>
                </Form>
            </div>
            );
        }}
        </Formik>
    )
}

export default ResetPasswordPage