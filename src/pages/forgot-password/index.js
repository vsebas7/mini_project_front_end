import { useRef } from "react"
import { useDispatch } from "react-redux"
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
    // @ref
    const emailRef = useRef()
    // @event handler
    const onButtonSendLink = () => {
        const email = emailRef.current?.value.toString()
        dispatch(forgot({ email }))
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
            <div className="form card w-96 bg-base-100 shadow-xl">
              <Form>
                <h1>Forgot Password</h1>
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
                <button
                  type="button"
                  className="btn btn-neutral"
                  onClick={onButtonSendLink}
                >
                  Send Reset Password Link
                </button>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
    )
}

export default ForgotPasswordPage