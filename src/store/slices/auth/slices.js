import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance"
import Toast from "react-hot-toast";

// @create async thunk
export const login = createAsyncThunk(
    "auth/login",
     
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.post("/auth/login", payload)
            // @save token to local storage
            localStorage.setItem("token", data?.token)
            Toast.success("login success")
            return data?.isAccountExist
        } catch (error) {
            console.error(error)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const keepLogin = createAsyncThunk(
    "auth/keepLogin",
    async (payload, { rejectWithValue }) => {
        try {
            // get token from local storage
            const response = await api.get("/auth")
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/",payload)

            // @save token to local storage
            localStorage.setItem("token", data?.token)
            Toast.success(data?.message)
            return data?.data
        } catch (error) {
            console.log(error.response.data)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const verify_account = createAsyncThunk(
    "auth/verification",
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.patch("/auth/verify",
                {},
            )
            Toast.success(data.message)
        } catch (error) {
            console.error(error)
            Toast.error(error.reponse.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const forgot = createAsyncThunk(
    "auth/forgot",
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.put("/auth/forgotPass",payload)
            Toast.success(data.message) 
        } catch (error) {
            console.error(error)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const reset_password = createAsyncThunk(
    "auth/reset_password",
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.patch("/auth/resetPass", 
                payload
            )
            Toast.success(data.message) 
            localStorage.removeItem("token")
        } catch (error) {
            console.error(error)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)


export const changeUsername = createAsyncThunk(
    "auth/changeUsername",
    async (payload, { rejectWithValue }) => {
        try {
            
            // @get data user
            const {data} = await api.patch("/auth/changeUsername",
                payload
            )
            Toast.success("Change username success") 
            return data
        } catch (error) {
            console.error(error)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const changeEmail = createAsyncThunk(
    "auth/changeEmail",
    async (payload, { rejectWithValue }) => {
        try {            
            const {data} = await api.patch("auth/changeEmail",
                payload
            )
            Toast.success("Change email address success") 
            return data
        } catch (error) {
            console.error(error)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const changePhone = createAsyncThunk(
    "auth/changePhone",
    async (payload, { rejectWithValue }) => {
        try {            
            const {data} = await api.patch("auth/changePhone",
                payload
            )
            Toast.success("Change phone number success") 
            return data
        } catch (error) {
            console.error(error)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const changePass = createAsyncThunk(
    "auth/changePass",
    async (payload, { rejectWithValue }) => {
        try {            
            const {data} = await api.patch("auth/changePass",
                payload
            )
            Toast.success(data.message) 
            return data
        } catch (error) {
            console.error(error)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)









// export const changeEmail = createAsyncThunk(
//     "auth/changeEmail",
//     async (payload, { rejectWithValue }) => {
//         try {
//             const data ={
//                 currentEmail : payload.currentEmail,
//                 newEmail : payload.newEmail,
//                 token : payload.token
//             }
//             // @get data user
//             const response = await api.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername/",
//                 {headers : {"Authorization":`Bearer ${data.token}`}},
//                 data
//             )
//             return response.data
//         } catch (error) {
//             console.error(error)
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

// export const changePhone = createAsyncThunk(
//     "auth/changePhone",
//     async (payload, { rejectWithValue }) => {
//         try {
//             const data ={
//                 currentPhone : payload.currentPhone,
//                 newPhone : payload.newPhone,
//                 token : payload.token
//             }
//             // @get data user
//             const response = await api.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername/",
//                 {headers : {"Authorization":`Bearer ${data.token}`}},
//                 data
//             )
//             return response.data
//         } catch (error) {
//             console.error(error)
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
