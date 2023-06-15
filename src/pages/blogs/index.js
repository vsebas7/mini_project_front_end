import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getArticles} from "../../store/slices/blogs/slices"
import { getCategories } from "../../store/slices/blogs/getCategory/slices"

import Navbar from "../../components/navbar"

import RenderFavoriteBlogs from "./components/favoriteBlogs"
import RenderCategoryBlogs from "./components/categoryBlogs"
import Pagination from "./components/pagination"
import RenderBlogCards from "./components/listArticles"
import { getFavBlogs } from "../../store/slices/blogs/favBlogs/slices"

function BlogsPage () {

    const dispatch = useDispatch()
    const { loading, currentPage, totalPage, articles} = useSelector(state => {
        return {
            loading : state.blogs.isLoading,
            articles : state.blogs.articles,
            currentPage : state.blogs.currentPage,
            totalPage : state.blogs.totalPage,
        }
    })
    
    const { categories } = useSelector(state => {
        return {
            categories : state.category.categories,
        }
    })

    const { favorites } = useSelector(state => {
        return {
            favorites : state.favorites.favorites,
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
        dispatch(getFavBlogs())
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
    // if ({loading}) return (
    //     <div className="h-screen w-screen flex flex-row align-bottom justify-center">
    //         <span className="loading loading-dots loading-lg"></span>
    //     </div>
    // )

    return (
        <div className="w-full h-full px-40 py-10">
            <Navbar />
            <div className="flex flex-row flex-wrap gap-5 rounded">
                <h1 className="place-content-center">Favorite Blogs</h1>
                <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
                    <RenderFavoriteBlogs favorites={favorites}/>
                </div>
            </div>

            <div className="flex flex-row flex-wrap gap-5 justify-between py-20">
                <h2>List Blogs</h2>
                <div className="flex flex-row w-full h-auto gap-5 justify-between">
                <select 
                    value={valueCategory.name} 
                    onChange={handleChange}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option selected value="allCategory">All Category</option>
                    <RenderCategoryBlogs categories={categories} />
                </select>
                    <Pagination 
                        onChangePagination={onChangePagination}
                        disabledPrev={currentPage === 1}
                        disabledNext={currentPage >= totalPage}
                    />
                </div>
                <RenderBlogCards articles={articles} />
            </div>

        </div>
    )
}

export default BlogsPage