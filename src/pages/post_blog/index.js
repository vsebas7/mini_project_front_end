import { useRef, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Navigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik";
import {publishBlogSchema} from "../../store/slices/auth/validation.js"
import * as Yup from "yup";
import YupPassword from 'yup-password';
import "../../Form.scss"
YupPassword(Yup);


const initialValuesPublishBlog = {
    title:"",
    author: "",
    date:"",
    picture: "",
    category: "",
    content:"",
    video:"",
    keywords:""
};
function PublishBlog () {
    const titleRef = useRef()
    const authorRef = useRef()
    const dateRef = useRef()
    const pictureRef = useRef()
    const categoryRef = useRef()
    const contentRef = useRef()
    const videoRef = useRef()
    const keywordsRef = useRef()

    // @hooks
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const [file, setFile] = useState({name:""});

     // @event handler
    const onButtonPublishBlog = () => {
        // dispatch(PublishBlog({
        //     title : titleRef.current?.value,
        //     author : authorRef.current?.value,
        //     date : dateRef.current?.value,
        //     picture : pictureRef.current?.value,
        //     category : categoryRef.current?.value,
        //     content : contentRef.current?.value,
        //     video : videoRef.current?.value,
        //     keyword : keywordRef.current?.value
        // }))
        console.log(
            titleRef.current?.value,
            authorRef.current?.value,
            contentRef.current?.value,
            dateRef.current?.value,
            pictureRef.current?.value,
            categoryRef.current?.value,
            videoRef.current?.value,
            keywordsRef.current?.value
        )
    }

    // @redirect
    if(token==null)  return <Navigate to="/login" replace/>

    return (
        <Formik
            initialValues={initialValuesPublishBlog}
            validationSchema={publishBlogSchema}
        >
        {(formik) => {
            const { errors, touched } = formik;
            return (
            <div className="container">
                <div className="form card w-96 bg-base-100 shadow-xl">
                    <Form>
                    <h1>Publish a Blog</h1>
                    <div className="form-row">
                        <label htmlFor="title">Title</label>
                        <Field
                            type="text"
                            name="title"
                            id="title"
                            innerRef = {titleRef}
                            className={
                                errors.title && touched.title ? "input-error input input-md w-full max-w-xs" : "input input-bordered input-md w-full max-w-xs"
                            }
                        />
                        <ErrorMessage name="title" component="span" className="error" />
                    </div>

                    <div className="form-row">
                        <label htmlFor="author">Author</label>
                        <Field
                            type="text"
                            name="author"
                            id="author"
                            innerRef = {authorRef}
                            className={
                                errors.author && touched.author ? "input-error input input-md w-full max-w-xs" : "input input-bordered input-md w-full max-w-xs"
                            }
                        />
                        <ErrorMessage name="author" component="span" className="error" />
                    </div>

                    <div className="form-row">
                        <label htmlFor="content">Content</label>
                        <Field
                            as="textarea"
                            name="content"
                            id="content"
                            innerRef = {contentRef}
                            className={
                                errors.content && touched.content ? "notlisted-error textarea textarea-bordered textarea-sm w-full max-w-xs" : "notlisted textarea textarea-bordered textarea-sm w-full max-w-xs"
                            }
                        />
                        <ErrorMessage name="content" component="span" className="error" />
                    </div>

                    <div className="form-row">
                        <label htmlFor="date">Date</label>
                        <Field
                            type="date"
                            name="date"
                            id="date"
                            innerRef = {dateRef}
                            className={
                                errors.date && touched.date ? "input-error input input-md w-full max-w-xs" : "input input-bordered input-md w-full max-w-xs"
                            }
                        />
                        <ErrorMessage name="date" component="span" className="error" />
                    </div>

                    <div className="form-row">
                        <label htmlFor="picture">Picture</label>
                        <input
                            type="file"
                            name="picture"
                            id="picture"
                            ref = {pictureRef}
                            className={
                                errors.picture && touched.picture ? "input-error file-input file-input-bordered file-input-xxl w-full max-w-xs" : "file-input-bordered file-input-xxl w-full max-w-xs"
                            }
                            onChange={(event)=>{
                                setFile({name:URL.createObjectURL(event.target.files[0]),hidden : true})
                            }} 
                        />
                        <ErrorMessage name="picture" component="span" className="error" />
                    </div>

                    <div className="form-row">
                        <label htmlFor="category">Category</label>
                        <Field
                            as="select"
                            name="category"
                            id="category"
                            innerRef = {categoryRef}
                            className={
                                errors.category && touched.category ? "notlisted-error select select-bordered select-lg w-full max-w-xs" : "notlisted select select-bordered select-lg w-full max-w-xs"
                            }
                        >   
                            <option value="" disabled selected>Choose here</option>
                            <option value="red" >Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                        </Field>
                        <ErrorMessage name="category" component="span" className="error" />
                    </div>

                    <div className="form-row">
                        <label htmlFor="video">Video</label>
                        <input
                            type="file"
                            // accept="video/*"
                            name="video"
                            id="video"
                            ref = {videoRef}
                            className={
                                errors.video && touched.video ? "input-error file-input file-input-bordered file-input-xxl w-full max-w-xs" : "file-input-bordered file-input-xxl w-full max-w-xs"
                            }
                            onChange={(event)=>{
                                setFile({name:URL.createObjectURL(event.target.files[0]),hidden : true})
                            }} 
                        />
                        <ErrorMessage name="video" component="span" className="error" />
                    </div>

                    <div className="form-row">
                        <label htmlFor="keywords">Keywords</label>
                        <Field
                            type="text"
                            name="keywords"
                            id="keywords"
                            innerRef = {keywordsRef}
                            className={
                                errors.keywords && touched.keywords ? "input-error input input-md w-full max-w-xs" : "input input-bordered input-md w-full max-w-xs"
                            }
                        />
                        <ErrorMessage name="keywords" component="span" className="error" />
                    </div>

                    <button
                        type="button"
                        className="btn btn-neutral"
                        onClick={onButtonPublishBlog}
                    >
                        Publish Blog
                    </button>
                    </Form>
                </div>
            </div>
            );
        }}
        </Formik>
    )
}

export default PublishBlog