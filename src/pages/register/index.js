import { useRef, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Navigate } from "react-router-dom"
import { register } from "../../store/slices/auth/slices"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {registerValidationSchema} from "../../store/slices/auth/validation.js"

import "../../Form.scss"


const initialValuesSignUp = {
        username:"",
        email: "",
        phone:"",
        password: "",
        confirmpassword: "",
    };


function RegisterPage () {

    const usernameRef = useRef()
    const emailRef = useRef()
    const phoneRef = useRef()
    const passwordRef = useRef()
    const confirmpasswordRef = useRef()


    const dispatch = useDispatch()
    const { id, isVerified } = useSelector(state => {
        return {
            id : state.auth.id,
            isVerified : state.auth.isVerified
        }
    })

    
    const eye = <FontAwesomeIcon icon={faEye} />;
    const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;
    const [passwordShown, setPasswordShown] = useState({value : false, field_name : ""});

    
    const onButtonRegister = () => {
        dispatch(register({
            username : usernameRef.current?.value.toString(),
            email : emailRef.current?.value.toString(),
            phone : phoneRef.current?.value.toString(),
            password : passwordRef.current?.value.toString(),
            confirmPassword : confirmpasswordRef.current?.value.toString()
        }))
    }

    // @redirect
    if (id && isVerified == true) return <Navigate to="/" replace/>
    if (isVerified == false  && id != null) return <Navigate to="/verification" replace/>

    return (
        <Formik
            initialValues={initialValuesSignUp}
            validationSchema={registerValidationSchema}
        >
        {(formik) => {
            const { errors, touched } = formik;
            return (
            <div className="container">
                <div className="form card w-96 bg-base-100 shadow-xl">
                    <Form>
                    <h1>Sign up to continue</h1>
                    <a class="link link-hover" href="/login">Already have account?</a>
                    <div className="form-row">
                        <label htmlFor="username">Username</label>
                        <Field
                            type="username"
                            name="username"
                            id="username"
                            innerRef = {usernameRef}
                            className={
                                errors.username && touched.username ? "input-error input input-md w-full max-w-xs" : "input input-bordered input-md w-full max-w-xs"
                            }
                        />
                        <ErrorMessage name="username" component="span" className="error" />
                    </div>

                    <div className="form-row">
                        <label htmlFor="email">Email</label>
                        <Field
                            type="email"
                            name="email"
                            id="email"
                            innerRef={emailRef}
                            className={
                                errors.email && touched.email ? "input-error input input-md w-full max-w-xs" : "input input-bordered input-md w-full max-w-xs"
                            }
                        />
                        <ErrorMessage name="email" component="span" className="error" />
                    </div>

                    <div className="form-row">
                        <label htmlFor="phone">Phone</label>
                        <Field
                            type="phone"
                            name="phone"
                            id="phone"
                            innerRef={phoneRef}
                            className={
                                errors.phone && touched.phone ? "input-error input input-md w-full max-w-xs" : "input input-bordered input-md w-full max-w-xs"
                            }
                        />
                        <ErrorMessage
                            name="phone"
                            component="span"
                            className="error"
                        />
                    </div>

                    <div className="form-row">
                        <label htmlFor="password">Password</label>
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
                            type={passwordShown.value && passwordShown.field_name =="confirm" ? "text" : "password"}
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
                            {passwordShown.value && passwordShown.field_name =="confirm" ? eye_slash : eye}
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
                        onClick={onButtonRegister}
                    >
                        Register
                    </button>
                    </Form>
                </div>
            </div>
            );
        }}
        </Formik>
    )
}

export default RegisterPage