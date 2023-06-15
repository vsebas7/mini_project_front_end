import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { getArticles, likeArticle } from "./slices"

const INITIAL_STATE = {
    articles : [],
    totalPage : 1,
    currentPage : 1,
    categories :[],
    isLoading : false,  
}

const blogsSlice = createSlice({
    name : "blogs",
    initialState : INITIAL_STATE,
    extraReducers : {
        [getArticles.pending] : (state, action) => {
            state.isLoading = true
        },
        [getArticles.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isLoading : false,
                articles : action.payload?.result,
                totalPage : action.payload?.page,
                currentPage : action.payload?.blogPage,
            })
        },
        [getArticles.rejected] : (state, action) => {
            state.isLoading = false
        },
        [likeArticle.pending] : (state, action) => {
            state.isLoading = true
        },
        [likeArticle.fulfilled] : (state, action) => {
            state.isLoading = false
        },
        [likeArticle.rejected] : (state, action) => {
            state.isLoading = false
        }
    }
})

export default blogsSlice.reducer