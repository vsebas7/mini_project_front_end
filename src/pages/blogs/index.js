import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getArticles} from "../../store/slices/blogs/slices"
import { getCategories } from "../../store/slices/blogs/getCategory/slices"
import { getFavBlogs } from "../../store/slices/blogs/favBlogs/slices"
import { getLikedArticles } from "../../store/slices/blogs/myLikedArticles/slices"
import RenderFavoriteBlogs from "./components/favoriteBlogs"
import RenderCategoryBlogs from "./components/categoryBlogs"
import RenderBlogCards from "./components/listArticles"
import RenderTop3Articles from "./components/top3Articles"
import Pagination from "./components/pagination"
import Footer from "../../components/footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpAZ, faArrowDownZA  } from "@fortawesome/free-solid-svg-icons"

function BlogsPage () {
    const dispatch = useDispatch()
    const { isLogoutLoading, loading, loadingTop3, currentPage, totalPage, articles, username, categories ,favorites, top3s} = useSelector(state => {
        return {
            isLogoutLoading : state.auth.isLogoutLoading,
            loading : state.blogs.isLoading,
            articles : state.blogs.articles,
            currentPage : state.blogs.currentPage,
            totalPage : state.blogs.totalPage,
            username : state.auth.username,
            categories : state.category.categories,
            favorites : state.favorites.favorites,
            top3s :state.favorites.top3,
            loadingTop3 : state.favorites.isLoading
        }
    })

    const [valueCategory, setValue] = useState({id:"",name:""});
    
    useEffect(() => {
        dispatch(getArticles({
            id_cat : "", 
            page : 1,
            sort : "DESC",
            username : {username}
        }))
        dispatch(getCategories())
        dispatch(getFavBlogs(" "))
    }, [])
    
    
    const onChangePagination = (type) => {
        dispatch(getArticles({ 
            id_cat : valueCategory.id , 
            page : type === "prev" ? currentPage - 1 : currentPage + 1, 
            sort : "DESC" 
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
            sort : "DESC" 
        }))
        dispatch(getFavBlogs({
            cat_name:event.target.value
        }))
    }
    
    const sortingChange = (e)=>{
        e.target.checked 
        ? dispatch(getArticles({
                id_cat : "", 
                page : 1,
                sort : "ASC",
            }))
        : dispatch(getArticles({
                id_cat : "", 
                page : 1,
                sort : "DESC",
            }))
    }
    if(isLogoutLoading) return (
        <div className="h-screen w-screen flex flex-col align-middle">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    )
    return (
        <div>
            <div className="flex flex-col gap-5 rounded">
                <h1 className="text-bold text-[28pt] place-self-center flex-wrap"> Top 10 Popular Articles </h1>
                <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
                    <RenderFavoriteBlogs favorites={favorites}/>
                </div>
            </div>
            
            <div className="flex flex-col flex-wrap gap-5 justify-between py-20">
                    <h2 className="text-bold text-[25pt] place-self-center flex-wrap">List of All Articles</h2>
                <div className="flex flex-col place-self-center w-[35vw] flex-wrap">
                    <div className="flex flex-row w-full h-auto gap-5 justify-start">
                        <div className="flex flex-col">
                            <label className="swap pt-2">
                                <input 
                                    type="checkbox" 
                                    onClick={sortingChange}
                                />
                                <div className="swap-on"><FontAwesomeIcon icon={faArrowUpAZ} size="2xl" /> </div>
                                <div className="swap-off"><FontAwesomeIcon icon={faArrowDownZA} size="2xl"/></div>
                            </label>
                        </div>
                        <select 
                            value={valueCategory?.name} 
                            onChange={handleChange}
                            className="select select-bordered w-full max-w-xs"
                        >
                            <option selected value="allCategory">All Category</option>
                            <RenderCategoryBlogs categories={categories} />
                        </select>
                        <div className="flex-grow pb-5">
                            <Pagination 
                                onChangePagination={onChangePagination}
                                disabledPrev={currentPage === 1}
                                disabledNext={currentPage >= totalPage}
                            />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col w-full lg:flex-row h-full mt-8 pb-2 ">                
                    <div class="flex flex-grow-0 card w-[350px] carousel carousel-vertical rounded-box place-items-start flex-wrap gap-5 py-5">
                        <a className="text-bold text-[18pt]">
                            {
                                valueCategory?.name == "allCategory" || valueCategory?.name == "" 
                                ? "Popular Article(s) by Category Will Appear Here" 
                                : `Top 3 Popular Articles by Category of ${valueCategory?.name}`
                            } 
                        </a>
                        {loadingTop3
                            ?   <div>
                                    <span className="loading loading-spinner loading-md"></span>
                                </div>
                            :   <RenderTop3Articles top3s={top3s}/>
                        }
                    </div>
                    <div class="divider lg:divider-horizontal"></div> 
                    <div class="grid flex-grow card w-[100%] h-full carousel carousel-vertical rounded-box place-items-start flex-wrap gap-5 justify-between py-5">
                     {loading 
                     ? 
                         <div className="h-screen w-screen flex flex-col align-middle">
                             <span className="loading loading-dots loading-lg"></span>
                         </div>
                     :
                        <RenderBlogCards articles={articles} />
                     }
                        <Pagination 
                            onChangePagination={onChangePagination}
                            disabledPrev={currentPage === 1}
                            disabledNext={currentPage >= totalPage}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        
    )
}

export default BlogsPage