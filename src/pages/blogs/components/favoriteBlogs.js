function FavoriteBlogs ({
    title = "",
    total_fav = "",
    category = "",
}) {
    return (
        <div className="carousel-item p-4 space-x-4 bg-base-100 rounded-box shadow-xl ">
            <div className="card-body rounded-box p-4 space-x-4">
                <div class="card-actions justify-end">
                    <div class="badge badge-outline">
                        {category}
                    </div>
                </div>
                <h2 className="card-title">
                    {title}
                </h2>
                <div class="badge badge-neutral">
                    Total Likes : {total_fav}
                </div>
            </div>
        </div>
    )
}

export default function RenderFavoriteBlogs ({
    favorites = [],
}) {
    return favorites.map((favorite, index) => {
        return (
            <FavoriteBlogs key={favorite.id}
                title={favorite.title}
                total_fav={favorite.total_fav}
                category={favorite.Category.name}
            />
        )
    })
}