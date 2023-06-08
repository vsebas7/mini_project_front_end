import {React,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import YupPassword from 'yup-password';
import "./Form.scss";
YupPassword(Yup);

const signInSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
  .required("Password is required")
  .min(6, 'password must contain 6 or more characters with at least one of each: uppercase, special character')
  .minUppercase(1, 'password must contain at least 1 upper case letter')
  .minSymbols(1, 'password must contain at least 1 special character'),
});


const initialValuesSignIn = {
  email: "",
  password: "",
};



export const SignInForm = () => {
  const eye = <FontAwesomeIcon icon={faEye} />;
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <Formik
      initialValues={initialValuesSignIn}
      validationSchema={signInSchema}
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
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
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