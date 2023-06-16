import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik";
import {publishBlogSchema} from "../../store/slices/auth/validation.js"
import { getCategories } from "../../store/slices/blogs/getCategory/slices.js";
import { getArticles, postBlog } from "../../store/slices/blogs/slices.js";
import RenderCategoryBlogs from "../blogs/components/categoryBlogs.js";
import Navbar from "../../components/navbar"
import "../../Form.scss"


const initialValuesPublishBlog = {
    title:"",
    content: "",
    country:"",
    CategoryId: "",
    url:"",
    picture: "",
    keywords:""
};

function PublishBlog () {
    const titleRef = useRef()
    const countryRef = useRef()
    const pictureRef = useRef()
    const categoryRef = useRef()
    const contentRef = useRef()
    const keywordsRef = useRef()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [file, setFile] = useState("")

    const [valueCategory, setValue] = useState({id:"",name:""});

    const { categories } = useSelector(state => {
        return {
            categories : state.category.categories,
        }
    })

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    const handleChange = (event) => {
        console.log(event.target.selectedOptions[0].className)
        setValue({
            id:event.target.selectedOptions[0].className, 
            name:event.target.value 
        })
    }

    const formData = new FormData()

    const onButtonPublishBlog = () => {
        let output ={ 
            data : { 
                "title":titleRef.current?.value,
                "content":contentRef.current?.value,
                "country":countryRef.current?.value,
                "CategoryId":categoryRef.current?.selectedIndex,
                "url":"",
                "keywords":keywordsRef.current?.value
            },
            file : file    
        }
        formData.append("data",JSON.stringify(output.data))
        formData.append("file",output.file)
    }

    const onConfirmPublish = () => {
        dispatch(postBlog(formData))
        navigate('/myblogs')
        dispatch(getArticles({
            id_cat : "", 
            page : 1,
            sort : "ASC"
        }))
    }

    

    return (
        <Formik
            initialValues={initialValuesPublishBlog}
            validationSchema={publishBlogSchema}
        >
        {({ errors, touched}) => {
            return (
                <div className="container pb-10">
                    <div className="form card w-4/12 bg-base-100 shadow-xl">
                        <Form>
                        <h1>Publish a Blog</h1>
                        <div className="form-row mt-5">
                            <label>Title</label>
                            <Field
                                type="text"
                                name="title"
                                id="title"
                                innerRef = {titleRef}
                                className={
                                    errors.title && touched.title 
                                    ? "input-error input input-md w-full" 
                                    : "input input-bordered input-md w-full"
                                }
                            />
                            <ErrorMessage name="title" component="span" className="error" />
                        </div>

                        <div className="form-row">
                            <label >Country</label>
                            <Field
                                type="text"
                                name="country"
                                id="country"
                                innerRef = {countryRef}
                                className={
                                    errors.country && touched.country 
                                    ? "input-error input input-md w-full" 
                                    : "input input-bordered input-md w-full"
                                }
                            />
                            <ErrorMessage name="author" component="span" className="error" />
                        </div>

                        <div className="form-row">
                            <label >Content</label>
                            <Field
                                as="textarea"
                                name="content"
                                id="content"
                                innerRef = {contentRef}
                                className={
                                    errors.content && touched.content 
                                    ? "notlisted-error textarea textarea-bordered textarea-sm w-full" 
                                    : "notlisted textarea textarea-bordered textarea-sm w-full"
                                }
                            />
                            <ErrorMessage name="content" component="span" className="error" />
                        </div>

                        {/* <div className="form-row">
                            <label >Date</label>
                            <Field
                                type="date"
                                name="date"
                                id="date"
                                innerRef = {dateRef}
                                className={
                                    errors.date && touched.date 
                                    ? "input-error input input-md w-full" 
                                    : "input input-bordered input-md w-full"
                                }
                            />
                            <ErrorMessage name="date" component="span" className="error" />
                        </div> */}

                        <div className="form-row">
                            <label>Picture</label>
                            <input
                                type="file"
                                name="picture"
                                id="picture"
                                ref = {pictureRef}
                                className={
                                    errors.picture && touched.picture 
                                    ? "input-error file-input file-input-bordered file-input-md w-full" 
                                    : "file-input-bordered file-input-md w-full"
                                }
                                onChange={(event)=>{
                                    setFile(event.target.files[0])
                                }} 
                            />
                            <ErrorMessage name="picture" component="span" className="error" />
                        </div>

                        <div className="form-row">
                            <label >Category</label>
                            <Field
                                as="select"
                                name="category"
                                id="category"
                                innerRef = {categoryRef}
                                value={valueCategory.name}
                                onChange={handleChange}
                                className={
                                    valueCategory.name == "Select a Category" && touched.category
                                    ? "notlisted-error select select-bordered select-lg w-full" 
                                    : "notlisted select select-bordered select-lg w-full"
                                }
                            >   
                                <option defaultValue="Select a Category" >Select a Category</option>
                                <RenderCategoryBlogs categories={categories} />
                            </Field>
                            {
                                valueCategory.name == "Select a Category" && touched.category
                                ? <span className="error">Please Select a Category</span>
                                : null
                            }
                        </div>

                        {/* <div className="form-row">
                            <label >Video</label>
                            <input
                                type="file"
                                // accept="video/*"
                                name="video"
                                id="video"
                                ref = {videoRef}
                                className={
                                    errors.video && touched.video 
                                    ? "input-error file-input file-input-bordered file-input-xxl w-full" 
                                    : "file-input-bordered file-input-xxl w-full"
                                }
                                onChange={(event)=>{
                                    setFile({name:URL.createObjectURL(event.target.files[0]),hidden : true})
                                }} 
                            />
                            <ErrorMessage name="video" component="span" className="error" />
                        </div> */}

                        <div className="form-row">
                            <label htmlFor="keywords">Keywords</label>
                            <Field
                                type="text"
                                name="keywords"
                                id="keywords"
                                innerRef = {keywordsRef}
                                className={
                                    errors.keywords && touched.keywords 
                                    ? "input-error input input-md w-full" 
                                    : "input input-bordered input-md w-full"
                                }
                            />
                            <ErrorMessage name="keywords" component="span" className="error" />
                        </div>

                        <button 
                            className={`btn btn-neutral`} 
                            onClick={()=>{
                                window.modalConfirmation.showModal()
                                onButtonPublishBlog()
                            }}
                        >
                            Save Changes
                            </button>
                            <dialog id="modalConfirmation" className="modal">
                            <Form method="dialog" className="modal-box">
                                <h3 className="font-bold text-lg">Confirmation!</h3>
                                <p className="py-4">Are You Sure Wanna Publish This Blog?</p>
                                <div className="modal-action">
                                <button className="btn">Close</button>
                                <button
                                    type="button"
                                    className="btn btn-accent"
                                    onClick={()=>{
                                        onConfirmPublish()
                                        window.modalConfirmation.close()

                                    }}
                                >
                                    Apply
                                </button>
                                </div>
                            </Form>
                            </dialog>           
                        {/* <button
                            type="button"
                            className="btn btn-neutral"
                            onClick={onButtonPublishBlog}
                        >
                            Publish Blog
                        </button> */}
                        </Form>
                    </div>
                </div>
            );
        }}
        </Formik>
    )
}

export default PublishBlog