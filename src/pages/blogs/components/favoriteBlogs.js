function FavoriteBlogs ({
    index = "",
    title = "",
    total_fav = "",
    category = "",
}) {
    return (
        <div className="carousel-item p-4 space-x-4 bg-base-100 rounded-box shadow-xl" >
            <a className="text-semibold text-[18pt] px-0">
                {index+1}
            </a>
            <div className="card-body rounded-box p-4">
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">
                        {category}
                    </div>
                </div>
                <h2 className="card-title">
                    {title}
                </h2>
                <div className="badge badge-neutral">
                    Total Likes : {total_fav}
                </div>
            </div>
        </div>
    )
}

export default function RenderFavoriteBlogs ({
    favorites = [],
}) {
    return favorites.filter((favorite, index)=>index<10).map((favorite,index) => {
        return (
            <FavoriteBlogs key={favorite.id}
                index={index}
                title={favorite.title}
                total_fav={favorite.total_fav}
                category={favorite.Category.name}
            />
        )
    })
}