import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getArticles} from "../../store/slices/blogs/slices"
import { getCategories } from "../../store/slices/blogs/getCategory/slices"
import { getFavBlogs } from "../../store/slices/blogs/favBlogs/slices"
import { getLikedArticles } from "../../store/slices/blogs/myLikedArticles/slices"

import Navbar from "../../components/navbar"

import RenderFavoriteBlogs from "./components/favoriteBlogs"
import RenderCategoryBlogs from "./components/categoryBlogs"
import Pagination from "./components/pagination"
import RenderBlogCards from "./components/listArticles"
import RenderLikedBlogCards from "./components/userLikedBlog"

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

    const { loadingLikedArticles, likedArticles, currentLikedPages} = useSelector(state => {
        return {
            loadingLikedArticles : state.liked.isLoading,
            likedArticles : state.liked.likedArticles,
            currentLikedPages : state.liked.currentPage
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
    const [pageshow, changePage] = useState("");

    
    useEffect(() => {
        dispatch(getArticles({
            id_cat : "", 
            page : 1,
            sort : "ASC" 
        }))
        dispatch(getCategories())
        dispatch(getFavBlogs())
        dispatch(getLikedArticles({
            page : 1
        }))
    }, [])
    
    // @event handler
    const onChangePagination = (type) => {
        dispatch(getArticles({ 
            id_cat : valueCategory.id , 
            page : type === "prev" ? currentPage - 1 : currentPage + 1, 
            sort : "ASC" 
        }))
    }

    const onLikedArticles = (type) => {
        dispatch(getLikedArticles({ 
            page : type === "prev" ? currentLikedPages - 1 : currentLikedPages + 1, 
        }))
    }
    
    
    const handleChange = (event) => {
        setValue({
            id:event.target.selectedOptions[0].className, 
            name:event.target.value 
        })
        dispatch(getArticles({
            id_cat : event.target.selectedOptions[0].className,
            page : 1,
            sort : "ASC" 
        }))
        dispatch(getLikedArticles({
            page : 1
        }))
    };

    const switchPage = (event) =>{
        console.log(event.target.nextSibling.className)
        // changePage(event.)
    }


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
                <div className="flex flex-row w-full h-auto gap-5 justify-start">
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
            
            {/* <label className="swap">
                <input 
                    type="checkbox" 
                    onChange={switchPage}
                />
                <div className="swap-on">
                    Switch to see My Favorite Articles
                </div>
                <div className="swap-off">
                    Switch to see All Articles
                </div>
            </label> */}
            <div class="flex flex-col w-full lg:flex-row h-3/4 mt-8 pb-10 ">
                    <h2>Favorite Blogs by All User</h2>
                <div class="grid flex-grow-0 card rounded-box place-items-end h-auto space-y-4 carousel carousel-vertical">
                    <RenderFavoriteBlogs favorites={favorites}/>
                </div> 
                
                <div class="divider lg:divider-horizontal"></div> 
                    <h2>My Liked Blogs</h2>
                <div class="grid flex-grow card w-auto h-auto carousel carousel-vertical rounded-box place-items-start flex-wrap gap-5 justify-between py-5">
                    <RenderLikedBlogCards likedArticles={likedArticles}/>
                </div>
                    <Pagination 
                        onChangePagination={onLikedArticles}
                        disabledPrev={currentLikedPages === 1}
                        disabledNext={likedArticles.length == 0}
                    />
            </div>

            {/* <div className="flex flex-row flex-wrap gap-5 justify-between py-20 ">
                <h2>My List Blogs</h2>
                <div className="flex flex-row w-full h-auto gap-5 justify-start">
                    <Pagination 
                        className = ""
                        onChangePagination={onLikedArticles}
                        disabledPrev={currentLikedPages === 1}
                        disabledNext={likedArticles.length == 0}
                    />
                </div>
                    <RenderLikedBlogCards likedArticles={likedArticles}/>
            </div> */}

            
            

        </div>
        
    )
}

export default BlogsPage