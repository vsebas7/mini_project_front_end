import {React,useState,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/slices/auth"
import * as Yup from "yup";
import YupPassword from 'yup-password';
import "../../Form/Form.scss";
YupPassword(Yup);

const initialValuesSignIn = {
  email: "",
  password: "",
};



export const SignInForm = () => {
  const dispatch = useDispatch()
  const eye = <FontAwesomeIcon icon={faEye} />;
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const usernameRef = useRef()
  const passwordRef = useRef()

  const onButtonLogin = () => {
        const username = usernameRef.current.value
        const password = passwordRef.current.value

        dispatch(login({ username, password }))
    }

  return (
    <Formik
      initialValues={initialValuesSignIn}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container">
            <h1>Sign in to continue</h1>
            <Form>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  ref={usernameRef}
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
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    id="password"
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
              <button
                type="submit"
              >
                Login
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};



export default SignInForm;