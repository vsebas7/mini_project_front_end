import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

export const getArticles = createAsyncThunk(
    "blogs/getArticles",
    async (payload, { rejectWithValue }) => {
        try {
            const { id_cat, page, sort,username } = payload

            const PARAMETER = `id_cat=${id_cat}&sort=${sort}&page=${page}`

            const { data } = await api.get("/blog?" + encodeURI(PARAMETER))
            
            let response =[]

            for (let i=1; i <= data.page; i++) {
                let response2 = await api.get(`/blog?page=${i}`)
                let output = response2.data.result
                response = response.concat(output)
            }
             
            let outputFilter = response.filter(function (article) {
                return article.User.username == "dummy1"
            })
            console.log(outputFilter)

            return {data,response,outputFilter}
            
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

// export const getArticles = createAsyncThunk(
//     "blogs/getArticles",
//     async (payload, { rejectWithValue }) => {
//         try {
//             let page = 1
//             const PARAMETER = `page=${page}`
//             let {data} = await api.get("/blog?" + encodeURI(PARAMETER))
//             let response =[]
//             for (let i=page; i < data.page; i++) {
//                 let {data} = await api.get(`/blog?page=${i}`)
//                 let output = data.result
//                 response = response.concat(output)
//             } 
//             let outputFilter = response.filter(function (article) {
//                 return article.User.username == "dummy1"
//             })
//             console.log(response)
//             console.log(outputFilter)
//             return outputFilter
            
//         } catch (error) {
//             console.error(error)
//             Toast.error(error.response.data)
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
