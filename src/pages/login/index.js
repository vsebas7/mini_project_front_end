import { useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
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
    const state = useState()
    const { token, loading } = useSelector(state => {
        return {
            token : state.auth.token,
            loading : state.auth.loading
        }
    })

    // @ref
    const emailRef = useRef()
    const passwordRef = useRef()

    // @event handler
    const onButtonLogin = () => {
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        dispatch(login({ email, password }))
    }

    // @redirect
    if (token) {
        return <Navigate to="/" replace/>
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
                      {passwordShown && passwordShown.field_name == "password" ? eye : eye_slash}
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
          </div>
        );
      }}
    </Formik>
    )
}

export default LoginPage