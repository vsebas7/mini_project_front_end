import { configureStore } from "@reduxjs/toolkit"

// @import all reducer from slices
import authReducer from "./slices/auth"

// @create store
const store = configureStore({
    reducer : {
        auth : authReducer
    },
})

// @export store
export default store