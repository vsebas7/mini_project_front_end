import { useRef, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Navigate } from "react-router-dom"
import { register } from "../../store/slices/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {registerValidationSchema} from "../../store/slices/auth/validation.js"
import * as Yup from "yup";
import YupPassword from 'yup-password';
import "../../Form.scss"
YupPassword(Yup);

const initialValuesSignUp = {
        username:"",
        email: "",
        phone:"",
        password: "",
        confirmpassword: "",
    };


function RegisterPage () {
    // @ref
    const usernameRef = useRef()
    const emailRef = useRef()
    const phoneRef = useRef()
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
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    
    // @event handler
    const onButtonRegister = () => {
        dispatch(register({
            username : usernameRef.current?.value,
            email : emailRef.current?.value,
            phone : phoneRef.current?.value,
            password : passwordRef.current?.value,
            confirmPassword : confirmpasswordRef.current?.value
        }))
    }

    // @redirect
    if (token) return <Navigate to="/" replace/>

    return (
        <Formik
            initialValues={initialValuesSignUp}
            validationSchema={registerValidationSchema}
        >
        {(formik) => {
            const { errors, touched } = formik;
            return (
            <div className="container">
                <h1>Sign up to continue</h1>
                <Form>
                <div className="form-row">
                    <label htmlFor="username">Username</label>
                    <Field
                        type="username"
                        name="username"
                        id="username"
                        innerRef = {usernameRef}
                        className={
                            errors.username && touched.username ? "input-error" : null
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
                            errors.email && touched.email ? "input-error" : null
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
                            errors.phone && touched.phone ? "input-error" : null
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
                        type={passwordShown ? "text" : "password"}
                        name="password"
                        id="password"
                        innerRef={passwordRef}
                        className={
                        errors.password && touched.password ? "input-error" : null
                        }
                    />
                    <i className="eye-password" onClick={togglePasswordVisiblity}>{eye}</i>
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
                        type={passwordShown ? "text" : "password"}
                        name="confirm"
                        id="confirm"
                        innerRef={confirmpasswordRef}
                        className={
                        errors.confirm && touched.confirm ? "input-error" : null
                        }
                    />
                    <i className="eye-password" onClick={togglePasswordVisiblity}>{eye}</i>
                    </div>
                    <ErrorMessage
                        name="confirm"
                        component="span"
                        className="error"
                    />
                </div>

                <button
                    type="button"
                    onClick={onButtonRegister}
                >
                    Register
                </button>
                </Form>
            </div>
            );
        }}
        </Formik>
    )
}

export default RegisterPage