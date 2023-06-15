import { configureStore } from "@reduxjs/toolkit"

// @import all reducer from slices
import authReducer from "./slices/auth"
import blogsReducer from "./slices/blogs"
import categoryReducer from "./slices/blogs/getCategory"
import favBlogsReducer from "./slices/blogs/favBlogs"

// @create store
const store = configureStore({
    reducer : {
        auth : authReducer,
        blogs : blogsReducer,
        category : categoryReducer,
        favorites : favBlogsReducer,
    },
})

// @export store
export default store