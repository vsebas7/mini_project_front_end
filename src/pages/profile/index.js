import {React,useState,useRef, } from "react";
import {useDropzone} from 'react-dropzone';
import { Navigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { editProfileSchema } from "../../store/slices/auth/validation";
import { useDispatch, useSelector } from "react-redux";
import { changeEmail, changePhone, changeUsername, uploadProfilePic } from "../../store/slices/auth/slices";
import bgimage from '../../assets/image.svg'

import "../../Form.scss"

const ProfileUser = () => {
  const dispatch = useDispatch() 
  const {id,username, email, phone,imgProfile} = useSelector(state=>{
    return {
      id : state.auth.id,
      username : state.auth.username,
      phone : state.auth.phone,
      email : state.auth.email,
      imgProfile : state.auth.imgProfile,
    }
  })
  
  const [file,setFile] = useState(null)
  
  const onDrop = (acceptedFiles,FileRejection) => {
    FileRejection.length == 0 
    ?
    setFile(acceptedFiles[0])
    :
    setFile(FileRejection[0].errors[0])
  }
  
  const {getRootProps , getInputProps , open, isDragActive} = useDropzone({onDrop , 
    maxFiles:1 , 
    accept : {'image/*' : ['.jpg','.jpeg','.webp','.png']} ,
    maxSize :1000000,
    noClick : true ,
    noKeyboard : true
  })
  
  const formData = new FormData()

  const onButtonSave = () =>{
    formData.append('file',file)
  }

  const onButtonCancelUpload = () =>{
    setFile([])
  }
  
  const usernameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()

  // if (id) {
  //   return <Navigate to="/login" replace/>
  // }
    
  const onButtonSaveProfile = () => {
    if(usernameRef.current.value != {username} && usernameRef.current.value != "") {
      dispatch(changeUsername({
        currentUsername : username,
        newUsername : usernameRef.current.value,
      }))
    }
    if(emailRef.current.value != {email} && emailRef.current.value != ""){
      dispatch(changeEmail({
        currentEmail : email,
        newEmail : emailRef.current.value,
      }))
    }
    if(phoneRef.current.value != {phone} && phoneRef.current.value != ""){
      dispatch(changePhone({
        currentPhone : phone,
        newPhone : phoneRef.current.value,
      }))
    } 
    if(file?.name){
      dispatch(uploadProfilePic(formData))
    }
    onButtonCancelUpload()
    window.my_modal_1.close()
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
      {({ errors, touched,}) => {
        return (
          <div className="container">
            <div className="form card w-96 bg-base-100 shadow-xl">
              <Form>
              <h1>User Details</h1>
              <div className="avatar flex flex-row justify-center align-middle">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={process.env.REACT_APP_IMAGE_URL + imgProfile} />
                </div>
              </div>
              {/* <img src={process.env.REACT_APP_IMAGE_URL + imgProfile}></img> */}
              <br/>
                <div className="form-row">
                  {/* <label>Profile Picture</label> */}
                  <div className="flex flex-row gap-5">
                    <button className="btn flex-grow-0" onClick={()=>window.my_modal_5.showModal()}>{file?.name ? file.name : "Upload Profile Picture"} </button> 
                    <button className={`btn btn-square btn-outline flex-none ${file?.name ? "" : "hidden"}`} onClick={onButtonCancelUpload}>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button> 
                  </div>
                  <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <form method="dialog" className="modal-box">
                      <h3 className="font-bold text-lg">Upload your image</h3>
                      <p className="py-4">File should be jpg, jpeg, webp or png and less than 1Mb</p>
                      <div className={`alert alert-error ${file?.code ? "" : "hidden"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{file?.code}</span>
                      </div>
                      {file?.name 
                        ? 
                          <div className="stats shadow">
                            <div className="stat">
                              <div className="stat-title">{file.name}</div>
                            </div>                            
                          </div> 
                        : 
                          <div className='flex flex-col h-auto drop-shadow-lg p-5 justify-between bg-white w-full rounded-md'>
                            <div  {...getRootProps({className :`h-auto] w-full bg-light-grey ${isDragActive ? 'border-amber-950':'border-light-blue'} border-2 border-dashed rounded-md`})}>
                              <input {...getInputProps({name : 'image'})}/>
                              <img src={bgimage} className='max-w-1/3 mx-auto mt-4' />
                              <p className='text-slate-400 md:text-md text-md text-center mt-2 mb-4 '>Drag & Drop your image here</p>
                            </div>
                            <div className="flex flex-col">
                              <p className='text-center font-normal text-slate-400 text-md mt-2 mb-2'>Or</p>
                              <a onClick={open} className='link link-hover bg-blue text-amber-950 font-normal p-1 rounded-lg w-auto mx-auto px-4 py-2 text-md '>Choose a file</a>
                            </div>
                          </div>
                      }
                      <div className="modal-action">
                        <button className="btn" onClick={onButtonCancelUpload}>Cancel</button>
                        <button className="btn btn-accent" onClick={onButtonSave}>Save</button>
                      </div>
                    </form>
                  </dialog>
                  <br/>
                  <label htmlFor="username">Username</label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    defaultValue = {username}
                    placeholder = {username}
                    innerRef = {usernameRef}
                    className={
                      errors.username && touched.username ? "input-error input input-md w-full max-w-xs" : "input input-bordered input-md w-full max-w-xs"
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
                      errors.email && touched.email ? "input-error input input-md w-full max-w-xs" : "input input-bordered input-md w-full max-w-xs"
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
                    defaultValue = {phone}
                    placeholder = {phone}
                    innerRef = {phoneRef}
                    className={
                      errors.phone && touched.phone ? "input-error input input-md w-full max-w-xs" : "input input-bordered input-md w-full max-w-xs"
                    }
                  />
                  <ErrorMessage
                    name="phone"
                    component="span"
                    className="error"
                  />
                </div>

                <button 
                  className={`btn btn-neutral`} 
                  onClick={()=>window.my_modal_1.showModal()}
                >
                  Save Changes
                </button>
                <dialog id="my_modal_1" className="modal">
                  <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Confirmation!</h3>
                    <p className="py-4">Are you sure wanna apply this change(s)</p>
                    <div className="modal-action">
                      <button className="btn">Close</button>
                      <button
                        type="button"
                        className="btn btn-accent"
                        onClick={onButtonSaveProfile}
                      >
                        Apply
                      </button>
                    </div>
                  </form>
                </dialog>

                <a href='/change-password' >Change Password?</a>
                
              </Form>
              <br/>
              <a href='#' >My Favorite Blog</a>
              <a href='#' >My Published Blog</a>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}
export default ProfileUser