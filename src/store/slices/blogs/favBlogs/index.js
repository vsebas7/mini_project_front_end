import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { getFavBlogs } from "./slices"

const INITIAL_STATE = {
    favorites : [],
    isLoading : false,  
}

const favBlogsSlice = createSlice({
    name : "favorites",
    initialState : INITIAL_STATE,
    extraReducers : {
        [getFavBlogs.pending] : (state, action) => {
            state.isLoading = true
        },
        [getFavBlogs.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isLoading : false,
                favorites : action.payload?.result,
            })
        },
        [getFavBlogs.rejected] : (state, action) => {
            state.isLoading = false
        }
    }
})

export default favBlogsSlice.reducer