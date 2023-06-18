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
import Footer from "../../../components/footer"


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
        <div className="flex flex-col flex-wrap gap-5 pt-10 w-full">
            <a className="text-bold text-[20pt]">My Published Blogs</a>  
            {
                filteredArticles.length == 0 
                ? 
                    <div className="flex flex-col w-full">
                        <a 
                            className="btn btn-ghost btn-lg justify-center w-[25%] place-self-center"
                            href="/post-blog"
                        >
                            Please Publish a Article
                        </a>
                    </div>
                :   
                    <div className="overflow-x-auto">
                    <a 
                        href="/post-blog"
                        className="text-[14pt]"
                    >
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
            <div class="flex flex-col w-full lg:flex-row h-1/2 mt-8 pb-2 ">                
                <div class="flex flex-grow-0 card w-auto carousel carousel-vertical rounded-box place-items-start flex-wrap gap-5 py-5">
                    <a className="text-bold text-[18pt] place-self-center">My Favorite Blogs</a>
                    <Pagination 
                        onChangePagination={onLikedArticles}
                        disabledPrev={currentLikedPages === 1}
                        disabledNext={likedArticles.length == 0}
                    />
                </div>
                <div class="divider lg:divider-horizontal"></div> 
                <div class="grid flex-grow card w-[100%] h-[460px] carousel carousel-vertical rounded-box place-items-start flex-wrap gap-5 justify-between py-5">
                    {
                        likedArticles.length == 0 
                        ? 
                            <div className="h-full w-full text-center">
                                <a 
                                    className="text-[30px] w-full"
                                    href="/"
                                >
                                    Your Favorite Article(s) will appear here after you like an articles
                                </a>
                            </div>
                        :   
                        <RenderLikedBlogCards likedArticles={likedArticles}/>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MyBlogsPage