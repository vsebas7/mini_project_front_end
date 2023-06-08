import { useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { forgot } from "../../store/slices/auth"
import { Formik, Form, Field, ErrorMessage } from "formik";
import {forgotValidationSchema} from "../../store/slices/auth/validation.js"
import "../../Form.scss"


const initialValuesForgot = {
  email: "",
};

function ForgotPasswordPage () {
    
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
    // @event handler
    const onButtonSendLink = () => {
        // const email = emailRef.current?.value

        // dispatch(forgot({ email }))
        console.log(emailRef.current?.value)
    }

    // @redirect
    if (token) {
        return <Navigate to="/" replace/>
    }

    return (
        <Formik
            initialValues={initialValuesForgot}
            validationSchema={forgotValidationSchema}
        >
      {(formik) => {
        const { errors, touched} = formik;
        return (
          <div className="container">
            <h1>Forgot Password</h1>
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
              <button
                type="button"
                onClick={onButtonSendLink}
              >
                Send Reset Password Link
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
    )
}

export default ForgotPasswordPage