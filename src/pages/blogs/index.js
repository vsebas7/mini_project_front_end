import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getArticles} from "../../store/slices/blogs/slices"
import { getCategories } from "../../store/slices/blogs/getCategory/slices"

import Navbar from "../../components/navbar"

// @local component
import RenderBlogCards from "./component.card"
import Pagination from "./component.pagination"
import RenderCategoryBlogs from "./categoryBlogs"

function BlogsPage () {
    // @state and hooks
    const dispatch = useDispatch()
    const { isLoading, currentPage, totalPage, articles} = useSelector(state => {
        return {
            loading : state.blogs.isLoading,
            articles : state.blogs.articles,
            currentPage : state.blogs.currentPage,
            totalPage : state.blogs.totalPage,
        }
    })
    
    const { categories} = useSelector(state => {
        return {
            categories : state.category.categories,
        }
    })
    const [valueCategory, setValue] = useState({id:"",name:""});
    
    useEffect(() => {
        dispatch(getArticles({
            id_cat : "", 
            page : 1,
            sort : "ASC" 
        }))
        dispatch(getCategories())
    }, [])
    
    // @event handler
    const onChangePagination = (type) => {
        dispatch(getArticles({ 
            id_cat : valueCategory.id , 
            page : type === "prev" ? currentPage - 1 : currentPage + 1, 
            sort : "ASC" 
        }))
    }
    
    
    const handleChange = (e) => {
        setValue({
            id:e.target.selectedOptions[0].className, 
            name:e.target.value 
        })
        dispatch(getArticles({
            id_cat : e.target.selectedOptions[0].className,
            page : 1,
            sort : "ASC" 
        }))
    };


    // @render loading
    // if (loading) return (
    //     <div className="h-screen w-screen flex flex-row align-bottom justify-center">
    //         <span className="loading loading-dots loading-lg"></span>
    //     </div>
    // )

    return (
        <div className="w-full h-full px-40 py-10 flex flex-row flex-wrap gap-5 justify-between ">
            <Navbar />
            <select 
                value={valueCategory.name} 
                onChange={handleChange}
                className="select select-bordered w-full max-w-xs"
            >
                <option selected >Select Category</option> 
                <option value="allCategory">All Category</option>
                <RenderCategoryBlogs categories={categories} />
            </select>
            <div className="flex flex-row w-full h-auto justify-end">
                <Pagination 
                    onChangePagination={onChangePagination}
                    disabledPrev={currentPage === 1}
                    disabledNext={currentPage >= totalPage}
                />
            </div>
            <RenderBlogCards articles={articles} />
        </div>
    )
}

export default BlogsPage