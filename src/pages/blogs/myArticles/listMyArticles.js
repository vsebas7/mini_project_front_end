import { useDispatch, useSelector } from "react-redux"


function MyBlogCard ({
    title = "",
    content = "",
    thumbnail = "",
    BlogId = "",
    category = ""
}) {

    const dispatch = useDispatch()
    const onButtonDelete = ()=>{
        const BlogIdLiked = {BlogId}
        // dispatch(likeArticle(BlogIdLiked))
    }
    const{isLogin} = useSelector(state =>{
        return{
            isLogin : state.auth.isLogin
        }
    })

    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={process.env.REACT_APP_IMAGE_URL + thumbnail} />
                    </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="font-bold">{title}</div>
            </td>
            
            <td className="break-all w-1/2 ">
                {content}
            </td>
            
            <td>{category}</td>
            
            <th>
                <button 
                    className="btn btn-outline btn-error btn-xs"
                    // onClick={onButtonDelete}
                >
                    Delete
                </button>
            </th>
        </tr>
                

        // <div className="card w-96 bg-base-100 shadow-xl">
        //     <figure className="px-10 pt-10">
        //         <img src={process.env.REACT_APP_IMAGE_URL + thumbnail} className="rounded-xl object-cover " />
        //     </figure>
        //     <div className="card-body w-auto items-center text-center break-all">
        //         <h2 className="card-title">{title}</h2>
        //         <div>
        //         <p className= "break-all">{content}</p>
        //         <p className= "text-clip overflow-hidden ...">{category}</p>
        //         <p className= "text-clip overflow-hidden ...">{BlogId}</p>
        //         </div>
        //         <div className="card-actions">
        //         </div>
        //     </div>
        // </div>
    )
}







export default function RenderMyBlogCards ({
    filteredArticles = [],
}) {
    return filteredArticles.map((filteredArticle, index) => {
        return (
            <MyBlogCard key={filteredArticle.id}
                title={filteredArticle.title}
                content={filteredArticle.content}
                thumbnail={filteredArticle.imageURL}
                BlogId = {filteredArticle.id}
                category = {filteredArticle.Category.name}
            />
        )
    })
}