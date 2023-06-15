import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

export const getArticles = createAsyncThunk(
    "blogs/getArticles",
    async (payload, { rejectWithValue }) => {
        try {
            const { id_cat, page, sort } = payload

            const PARAMETER = `id_cat=${id_cat}&sort=${sort}&page=${page}`

            const { data } = await api.get("/blog?" + encodeURI(PARAMETER))

            return data
            
        } catch (error) {
            console.error(error)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)


export const likeArticle = createAsyncThunk(
    "blogs/likeArticle",
    async (payload, { rejectWithValue }) => {
        try {
            await api.post("/blog/like",payload)
            Toast("Thankyou! You're Awesome")
        } catch (error) {
            console.error(error)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)