import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { login } from "../../store/slices/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {loginValidationSchema} from "../../store/slices/auth/validation.js"
import "../../Form.scss"


const initialValuesSignIn = {
  email: "",
  password: "",
};

function LoginPage () {
    const eye = <FontAwesomeIcon icon={faEye} />;
    const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;
    const [passwordShown, setPasswordShown] = useState({value : false, field_name : ""});
    // @hooks
    const dispatch = useDispatch()
    // @ref
    const textRef = useRef()
    const passwordRef = useRef()

    // @event handler
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

    return (
        <Formik
            initialValues={initialValuesSignIn}
            validationSchema={loginValidationSchema}
        >
      {(formik) => {
        const { errors, touched} = formik;
        return (
          <div className="container">
            <h1>Login to continue</h1>
            <Form>
              <div className="form-row">
                <label htmlFor="text">Email/Username/Phone</label>
                <Field
                  type="text"
                  name="text"
                  id="text"
                  innerRef={textRef}
                  className={
                    errors.text && touched.text ? "input-error" : null
                  }
                />
                <ErrorMessage name="text" component="span" className="error" />
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
                      errors.password && touched.password ? "input-error" : null
                    }
                  />
                  <i className="eye-password" 
                    onClick={()=>{
                      setPasswordShown({value : !passwordShown.value, field_name : "password"})
                    }}>
                      {passwordShown && passwordShown.field_name == "password" ? eye_slash : eye}
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
                onClick={onButtonLogin}
              >
                Login
              </button>
            </Form>
            <br/>
            <a href="/register">Sign Up</a>
            <a href="/forgot-password">Forgot Password</a>
          </div>
        );
      }}
    </Formik>
    )
}

export default LoginPage