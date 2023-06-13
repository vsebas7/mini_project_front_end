import { useRef, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Navigate } from "react-router-dom"
import { change_password } from "../../store/slices/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {changePasswordSchema} from "../../store/slices/auth/validation.js"
import * as Yup from "yup";
import YupPassword from 'yup-password';
import "../../Form.scss"
YupPassword(Yup);

const token = localStorage.getItem("token")
const initialValuesChangePassword = {
        oldPassword : "",
        password: "",
        confirm:""
    };


function ChangePasswordPage () {
    // @ref
    const oldPasswordRef = useRef()
    const passwordRef = useRef()
    const confirmpasswordRef = useRef()

    // @hooks
    const dispatch = useDispatch()
    
    const eye = <FontAwesomeIcon icon={faEye} />;
    const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;
    const [passwordShown, setPasswordShown] = useState({value:false,field_name:""});

    
    // @event handler
    const onButtonSavePassword = () => {
        dispatch(change_password({
            oldPassword :oldPasswordRef.current?.value,
            password : passwordRef.current?.value,
            confirmPassword : confirmpasswordRef.current?.value
        }))
    }

    // @redirect
    if(token==null)  return <Navigate to="/login" replace/>

    return (
        <Formik
            initialValues={initialValuesChangePassword}
            validationSchema={changePasswordSchema}
        >
        {(formik) => {
            const { errors, touched } = formik;
            return (
            <div className="container">
                <h1>Change Password</h1>
                <Form>
                <div className="form-row">
                    <label htmlFor="password">Old Password</label>
                    <div className="form-row-pass">
                        <Field
                            type={passwordShown.value && passwordShown.field_name=="oldpassword" ? "text" : "password"}
                            name="oldpassword"
                            id="oldpassword"
                            innerRef={oldPasswordRef}
                            className={
                                errors.oldpassword && touched.oldpassword ? "input-error" : null
                            }
                        />
                        <i className="eye-password" 
                            onClick={()=>{
                                setPasswordShown({value : !passwordShown.value, field_name :"oldpassword"})
                            }}
                            onMouseLeave={()=>{
                                setPasswordShown({value : passwordShown.value,field_name : ""})
                            }}
                        >
                            {passwordShown.value==true && passwordShown.field_name=="oldpassword" ? eye_slash : eye }
                        </i>
                    </div>
                    <ErrorMessage
                        name="oldpassword"
                        component="span"
                        className="error"
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="password">New Password</label>
                    <div className="form-row-pass">
                    <Field
                        type={passwordShown.value && passwordShown.field_name=="password" ? "text" : "password"}
                        name="password"
                        id="password"
                        innerRef={passwordRef}
                        className={
                        errors.password && touched.password ? "input-error" : null
                        }
                    />
                    <i className="eye-password" 
                        onClick={()=>{
                                setPasswordShown({value : !passwordShown.value, field_name:"password"})
                        }}
                        onMouseLeave={()=>{
                            setPasswordShown({value : !passwordShown.value,field_name : ""})
                        }}
                    >
                         {passwordShown.value==true && passwordShown.field_name=="password" ? eye_slash : eye }
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
                        type={passwordShown.value && passwordShown.field_name=="confirm" ? "text" : "password"}
                        name="confirm"
                        id="confirm"
                        innerRef={confirmpasswordRef}
                        className={
                        errors.confirm && touched.confirm ? "input-error" : null
                        }
                    />
                    <i className="eye-password" 
                        onClick={()=>{
                            setPasswordShown({value : !passwordShown.value, field_name:"confirm"})
                        }}
                        onMouseLeave={()=>{
                            setPasswordShown({value : !passwordShown.value,field_name : ""})
                        }}
                    >
                         {passwordShown.value==true && passwordShown.field_name=="confirm" ? eye_slash : eye}
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
                    onClick={onButtonSavePassword}
                >
                    Save
                </button>

                <button
                    type="button"
                    // onClick={}
                >
                    Cancel
                </button>
                </Form>
            </div>
            );
        }}
        </Formik>
    )
}

export default ChangePasswordPage