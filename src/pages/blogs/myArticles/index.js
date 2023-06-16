import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { getArticles} from "../../../store/slices/blogs/slices"
import { getLikedArticles } from "../../../store/slices/blogs/myLikedArticles/slices"
import RenderMyBlogCards from "./listMyArticles"
import RenderLikedBlogCards from "../components/userLikedBlog"
import Pagination from "../components/pagination"
import { useNavigate } from "react-router-dom"


function MyBlogsPage () {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { filteredArticles, likedArticles, currentLikedPages } = useSelector(state => {
        return {
            filteredArticles : state.blogs.filteredArticles,
            likedArticles : state.liked.likedArticles,
            currentLikedPages : state.liked.currentPage,
        }
    })

    const onLikedArticles = (type) => {
        dispatch(getLikedArticles({ 
            page : type === "prev" ? currentLikedPages - 1 : currentLikedPages + 1, 
        }))
    }

    const writeIcon = <FontAwesomeIcon icon={faPenToSquare} />

    useEffect(() => {
        dispatch(getLikedArticles({
            page : 1
        }))
        dispatch(getArticles({
            id_cat : "", 
            page : 1,
            sort : "ASC"
        }))
    }, [])

    // @render loading
    // if ({loading}) return (
    //     <div className="h-screen w-screen flex flex-row align-bottom justify-center">
    //         <span className="loading loading-dots loading-lg"></span>
    //     </div>
    // )

    return (
        <div >
            <div className="flex flex-row flex-wrap gap-5 py-10">
                <h1>My Published Blogs</h1>  

                {
                    filteredArticles.length == 0 
                    ? 
                        <div className="flex flex-col w-full">
                            <a 
                                className="btn btn-ghost btn-lg justify-center w-[25%]"
                                href="/post-blog"
                            >
                                Please Publish a Article
                            </a>
                        </div>
                    :   
                        <div className="overflow-x-auto">
                        <a href="/post-blog">
                            Publish a New Article {writeIcon}
                        </a> 
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Thumbnail</th>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th>Category</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <RenderMyBlogCards filteredArticles={filteredArticles}/>
                                </tbody>
                            </table>
                        </div>
                }
                <div class="flex flex-col w-full lg:flex-row h-1/2 mt-8 pb-10 ">                
                    <div class="flex flex-grow-0 card w-auto carousel carousel-vertical rounded-box place-items-start flex-wrap gap-5 py-5">
                        <h2>My Favorite Blogs</h2>
                        <Pagination 
                            onChangePagination={onLikedArticles}
                            disabledPrev={currentLikedPages === 1}
                            disabledNext={likedArticles.length == 0}
                        />
                    </div>
                    <div class="divider lg:divider-horizontal"></div> 
                    <div class="grid flex-grow card w-[100%] h-[430px] carousel carousel-vertical rounded-box place-items-start flex-wrap gap-5 justify-between py-5">
                        <RenderLikedBlogCards likedArticles={likedArticles}/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default MyBlogsPage