import {React,useState,useRef, } from "react";
import { Navigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import YupPassword from 'yup-password';
import "../../Form.scss"
import { editProfileSchema } from "../../store/slices/auth/validation";
import { useDispatch, useSelector } from "react-redux";
import { changeEmail, changePhone, changeUsername } from "../../store/slices/auth";
YupPassword(Yup);




const ProfileUser = () => {
  const dispatch = useDispatch()

  let profile = <FontAwesomeIcon icon={faUser} />
  
  const [file, setFile] = useState({name:"",hidden:false});
  const {username, email, phone, imgProfile} = useSelector(state=>{
    return {
      username : state.auth.username,
      phone : state.auth.phone,
      email : state.auth.email,
      imgProfile : state.auth.imgProfile,
    }
  })

  const token = localStorage.getItem("token")
  
  const usernameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const picRef = useRef()

  // @redirect
  if (token == null) {
    return <Navigate to="/" replace/>
  }
    
  // @event handler
  const onButtonSaveProfile = () => {
    if({username} != usernameRef) {
      dispatch(changeUsername({
        currentUsername : username,
        newUsername : usernameRef.current?.value.toString() ? username : usernameRef.current?.value.toString(),
        token : token
      }))
    }
    if({email} != emailRef){
      dispatch(changeEmail({
        currentEmail : email,
        newEmail : emailRef.current?.value.toString() ? email : emailRef.current?.value.toString(),
        token : token
      }))
    }
    if({phone} != phoneRef){
      dispatch(changePhone({
        currentPhone : phone,
        newPhone : phoneRef.current?.value.toString() ? phone : phoneRef.current?.value.toString(),
        token : token
      }))
    } 
  }
    
    return (
    <Formik
      initialValues={
       { username:"",
        email: "",
        phone: ""
      }}
      validationSchema={editProfileSchema}
    >
      {(formik) => {
        const { errors, touched,} = formik;
        return (
          <div className="container">
            <h1>{profile} User Details</h1>
            <a href='/change-password' >Change Password?</a>
            <h1 className={file.hidden ? "hidden":"default_pic"}>{profile}</h1>
            <img src={file.name}/>
            <br/>
            <input 
              className="profile_picture" 
              ref = {picRef}
              type="file" 
              name="profilepic"
              id="profilepic"
              onChange={(event)=>{
                  setFile({name:URL.createObjectURL(event.target.files[0]),hidden : true})
              }}
            />
            <br/>
            <br/>
            <Form>
              <div className="form-row">
                <label htmlFor="username">Username</label>
                <Field
                  type="username"
                  name="username"
                  id="username"
                  placeholder = {username}
                  innerRef = {usernameRef}
                  className={
                    errors.username && touched.username ? "input-error" : null
                  }
                />
                <ErrorMessage name="username" component="span" className="error" />
              </div>

              <div className="form-row">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder = {email}
                  innerRef = {emailRef}
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
                  placeholder = {phone}
                  innerRef = {phoneRef}
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
                type="button"
                onClick={onButtonSaveProfile}
              >
                Save
              </button>
              <br/>
              <br/>
              
            </Form>
            <br/>
            <a href='#' >My Favorite Blog</a>
            <a href='#' >My Published Blog</a>
          </div>
        );
      }}
    </Formik>
  );
}
export default ProfileUser