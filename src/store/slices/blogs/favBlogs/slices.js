import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api.instance";
import Toast from "react-hot-toast";

export const getFavBlogs = createAsyncThunk(
    "blogs/getFavBlogs",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/blog/pagFav")
            
            return data
        } catch (error) {
            console.error(error)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)