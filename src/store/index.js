import { configureStore } from "@reduxjs/toolkit"

// @import all reducer from slices
import authReducer from "./slices/auth"
import blogsReducer from "./slices/blogs"

// @create store
const store = configureStore({
    reducer : {
        auth : authReducer,
        blogs : blogsReducer,
    },
})

// @export store
export default store