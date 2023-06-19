import { useDispatch, useSelector } from "react-redux"
import { likeArticle } from "../../../store/slices/blogs/slices"
import { getFavBlogs } from "../../../store/slices/blogs/favBlogs/slices"
import dateFormat from 'dateformat'
function BlogCard ({
    title = "",
    content = "",
    thumbnail = "",
    BlogId = "",
    author ="", 
    createdAt ="",
    cat_name = ""
}) {
    const dispatch = useDispatch()
    const likeButton = ()=>{
        dispatch(likeArticle({BlogId}))
        dispatch(getFavBlogs({cat_name}))
    }
    const{isLogin} = useSelector(state =>{
        return{
            isLogin : state.auth.isLogin
        }
    })
    const id = localStorage.getItem("token")
    return (

        <div className="card card-side bg-base-100 shadow-xl w-[100%]">
            <figure className="object-scale-down w-[30%] p-5">
                <img 
                    src={process.env.REACT_APP_IMAGE_URL + thumbnail} 
                    className="rounded-lg" 
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <h5>by {author} | { dateFormat(createdAt, "dd mmmm yyyy")}</h5>
                <p>{content}</p>
                {cat_name}
                <div className="card-actions justify-end">
                    <div 
                        className="tooltip" 
                        data-tip={!id ? "Please login first" : "Like me please"}
                    >
                        <button 
                            className="btn"
                            disabled={!id}
                            onClick={likeButton}
                        >
                            Like
                        </button>
                    </div>
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
                author = {article.User.username}
                createdAt = {article.createdAt}
                cat_name = {article.Category.name}
            />
        )
    })
}