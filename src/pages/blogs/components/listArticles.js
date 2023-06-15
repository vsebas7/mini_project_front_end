import { useDispatch, useSelector } from "react-redux"
import { likeArticle } from "../../../store/slices/blogs/slices"

function BlogCard ({
    title = "",
    content = "",
    thumbnail = "",
    BlogId= "",
}) {
    const dispatch = useDispatch()
    const likeButton = ()=>{
        const BlogIdLiked = {BlogId}
        dispatch(likeArticle(BlogIdLiked))
    }
    const{isLogin} = useSelector(state =>{
        return{
            isLogin : state.auth.isLogin
        }
    })
    return (
        // <div className="card-body rounded-box p-4 space-x-4">
        //     <div className="card w-96 bg-base-100 shadow-xl image-full">
        //         <figure>
        //             <img src={process.env.REACT_APP_IMAGE_URL + thumbnail} className="rounded-xl object-cover " />
        //         </figure>
        //         <div className="card-body">
        //             <h2 className="card-title">{title}</h2>
        //             <p>{content}</p>
        //             <div className="card-actions justify-end">
        //                 <div 
        //                     className="tooltip" 
        //                     data-tip={!isLogin ? "Please login first" : "Like me please"}
        //                 >
        //                     <button 
        //                         className="btn"
        //                         disabled={!isLogin}
        //                         onClick={likeButton}
        //                     >
        //                         Like
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="card card-side bg-base-100 shadow-xl w-fit">
            <figure className="w-2/4">
                <img src={process.env.REACT_APP_IMAGE_URL + thumbnail} className="rounded-lg object-scale-down " />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{content}</p>
                <div className="card-actions justify-end">
                    <div 
                        className="tooltip" 
                        data-tip={!isLogin ? "Please login first" : "Like me please"}
                    >
                        <button 
                            className="btn"
                            disabled={!isLogin}
                            onClick={likeButton}
                        >
                            Like
                        </button>
                    </div>
                </div>
            </div>
        </div>

        // <div className="card w-96 bg-base-100 shadow-xl">
        //     <figure className="px-10 pt-10">
        //         <img src={process.env.REACT_APP_IMAGE_URL + thumbnail} className="rounded-xl object-cover " />
        //     </figure>
        //     <div className="card-body items-center text-center text-ellipsis">
        //         <h2 className="card-title">{title}</h2>
        //         <div>
        //         <p className= "text-clip overflow-hidden ...">{content}</p>
        //         </div>
        //         <div className="card-actions">
        //         <div 
        //             className="tooltip" 
        //             data-tip={!isLogin ? "Please login first" : ""}
        //         >
        //             <button 
        //                 className="btn"
        //                 disabled={!isLogin}
        //                 onClick={likeButton}
        //             >
        //                 Like
        //             </button>
        //         </div>
        //         </div>
        //     </div>
        // </div>
    )
}


export default function RenderBlogCards ({
    articles = [],
}) {
    return articles.map((article, index) => {
        return (
            <BlogCard key={article.id}
                title={article.title}
                content={article.content}
                thumbnail={article.imageURL}
                BlogId = {article.id}
            />
        )
    })
}