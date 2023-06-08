import {React,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import YupPassword from 'yup-password';
import "./Form.scss";
YupPassword(Yup);

 

const editProfileSchema = Yup.object().shape({
  username : Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string()
    .required()
    .matches(/[0-9]/,'phone must be a number')
    .matches(/0[0-9]/,'phone must start with 0')
    .min(10,'phone must contain 10 or more digits')
});


const initialValuesEditProfile = {
  username:"",
  email: "",
  phone:""
};


const ProfileUser = () => {
    let profile = <FontAwesomeIcon icon={faUser} />
    const [file, setFile] = useState();
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    return (
    <Formik
      initialValues={initialValuesEditProfile}
      validationSchema={editProfileSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container">
            <h1>{profile} User Details</h1>
            <img src={file} />
            <br/>
            <input type="file" onChange={handleChange} />
            <br/>
            <br/>
            <Form>
            {/* <div className="form-row">
                <label htmlFor="username">Username</label>
                <Field
                  type="username"
                  name="username"
                  id="username"
                  className={
                    errors.username && touched.username ? "input-error" : null
                  }
                />
                <ErrorMessage name="username" component="span" className="error" />
            </div> */}

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
                <label htmlFor="phone">Phone</label>
                <Field
                  type="phone"
                  name="phone"
                  id="phone"
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

              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Save
              </button>
            </Form>
            <a href='#' >Favorite Blog</a>
            <a href='#' >My Published Blog</a>
          </div>
        );
      }}
    </Formik>
  );
}
export default ProfileUser