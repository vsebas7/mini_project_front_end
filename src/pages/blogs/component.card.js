function BlogCard ({
    title = "",
    content = "",
    thumbnail = "",
}) {
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
                <button className="btn btn-primary">Buy Now</button>
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
            />
        )
    })
}