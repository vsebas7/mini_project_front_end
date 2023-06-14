import { configureStore } from "@reduxjs/toolkit"

// @import all reducer from slices
import authReducer from "./slices/auth"
import blogsReducer from "./slices/blogs"
import categoryReducer from "./slices/blogs/getCategory"

// @create store
const store = configureStore({
    reducer : {
        auth : authReducer,
        blogs : blogsReducer,
        category : categoryReducer
    },
})

// @export store
export default store