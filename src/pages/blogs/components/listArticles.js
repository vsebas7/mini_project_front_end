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
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={process.env.REACT_APP_IMAGE_URL + thumbnail} className="rounded-xl object-cover " />
            </figure>
            <div className="card-body items-center text-center text-ellipsis">
                <h2 className="card-title">{title}</h2>
                <div>
                <p className= "text-clip overflow-hidden ...">{content}</p>
                </div>
                <div className="card-actions">
                <button 
                    className="btn"
                    disabled={!isLogin}
                    onClick={likeButton}
                >
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> */}
                    Like
                </button>
                </div>
            </div>
        </div>
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