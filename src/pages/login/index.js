import { React, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { login } from "../../store/slices/auth/slices"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {loginValidationSchema} from "../../store/slices/auth/validation.js"
import "../../Form.scss"

function LoginPage () {
  
  const dispatch = useDispatch()
  const { id } = useSelector(state => {
    return {
      id : state.auth.id,
    }
  })

    const eye = <FontAwesomeIcon icon={faEye} />;
    const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;
    const [passwordShown, setPasswordShown] = useState({value : false, field_name : ""});

    const textRef = useRef()
    const passwordRef = useRef()
    
    const onButtonLogin = () => {
      const input = textRef.current?.value
      const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      const phone_pattern = /0[0-9]/
      let username = ""
      let email = ""
      let phone = ""
      const password = passwordRef.current?.value

      email_pattern.test(input) ? email = input : phone_pattern.test(input) ? phone = input : username = input


      dispatch(login({ username, email, phone, password }))
    }
    
    
    // @redirect
    if (id) {
        return <Navigate to="/profile" replace/>
    }

    return (
        <Formik
            initialValues={{text : "" , password : ""}}
            validationSchema={loginValidationSchema}
        >
      {({ errors, touched}) => {
        return (
          <div className="container">
            <div className="form card w-96 bg-base-100 shadow-xl">
              <Form>
              <h1>Login to continue</h1>
                <div className="form-row">
                  <label>Email/Username/Phone</label>
                  <Field
                    type="text"
                    name="text"
                    id="text"
                    innerRef={textRef}
                    className={
                      errors.text && touched.text ? "input-error input input-md w-full max-w-xs" : "input input-bordered input-md w-full max-w-xs"
                    }
                  />
                  <ErrorMessage name="text" component="span" className="error" />
                </div>

                <div className="form-row">
                  <label>Password</label>
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
                        setPasswordShown({value : !passwordShown.value, field_name : "password"})
                      }}>
                        {passwordShown.value && passwordShown.field_name == "password" ? eye : eye_slash}
                    </i>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="error"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-neutral"
                  onClick={onButtonLogin}
                >
                  Login
                </button>
              </Form>
              <a className="link link-hover" href="/register">Sign Up</a>
              <a className="link link-hover" href="/forgot-password">Forgot Password</a>
              <br/>
            </div>
          </div>
        );
      }}
    </Formik>
    )
}

export default LoginPage