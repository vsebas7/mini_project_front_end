import { useRef, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Navigate } from "react-router-dom"
import { change_password } from "../../store/slices/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
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
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    
    // @event handler
    const onButtonResetPassword = () => {
        // dispatch(change_password({
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