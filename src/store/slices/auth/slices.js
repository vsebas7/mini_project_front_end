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
            localStorage.setItem("id", data?.isAccountExist?.id)
            Toast.success("login success")
            return data?.isAccountExist
        } catch (error) {
            Toast.error(error.response.data.err)
            return rejectWithValue(error.response.data.err)
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async (payload, { rejectWithValue }) => {
        try {
            localStorage.removeItem("token")
            localStorage.removeItem("id")
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error)
        }
    }
)

export const keepLogin = createAsyncThunk(
    "auth/keepLogin",
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.get("/auth")
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.post("/auth/",payload)
            localStorage.setItem("token", data?.token)
            localStorage.setItem("id", data?.data?.id)
            Toast.success(data?.message)
            return data?.data
        } catch (error) {
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const verification = createAsyncThunk(
    "auth/verification",
    async (payload, { rejectWithValue }) => {
        try {
            localStorage.setItem("token",payload)
            const {data} = await api.patch("/auth/verify")
            Toast.success(data.message)
        } catch (error) {
            Toast.error("Failed to Verify Your Account")
            return rejectWithValue(error.reponse.data.err)
        }
    }
)

export const forgot = createAsyncThunk(
    "auth/forgot",
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.put("/auth/forgotPass",payload)
            Toast.success(data.message) 
            localStorage.setItem("token",data.data)
            console.log(data)
        } catch (error) {
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const reset_password = createAsyncThunk(
    "auth/reset_password",
    async (payload, { rejectWithValue }) => {
        try {
            
            localStorage.setItem("token",payload.token)
            const response= await api.patch("/auth/resetPass",payload.data)
            Toast.success(response?.data?.message) 
        } catch (error) {
            Toast.error(error?.response?.data?.err)
            return rejectWithValue(error?.response?.data?.err)
        }
    }
)


export const changeUsername = createAsyncThunk(
    "auth/changeUsername",
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.patch("/auth/changeUsername",payload)
            Toast.success(data.message)             
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            return data
        } catch (error) {
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data.err)
        }
    }
)

export const changeEmail = createAsyncThunk(
    "auth/changeEmail",
    async (payload, { rejectWithValue }) => {
        try {            
            const {data} = await api.patch("auth/changeEmail",payload)
            Toast.success(data.message) 
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            return data
        } catch (error) {
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data.err)
        }
    }
)

export const changePhone = createAsyncThunk(
    "auth/changePhone",
    async (payload, { rejectWithValue }) => {
        try {            
            const {data} = await api.patch("auth/changePhone",payload)
            Toast.success(data.message) 
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            return data
        } catch (error) {
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data.err)
        }
    }
)

export const changePass = createAsyncThunk(
    "auth/changePass",
    async (payload, { rejectWithValue }) => {
        try {            
            const {data} = await api.patch("auth/changePass",payload)
            Toast.success(data.message) 
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            return data
        } catch (error) {
            Toast.error(error.response.data.err)
            return rejectWithValue(error.response.data)
        }
    }
)

export const uploadProfilePic = createAsyncThunk(
    "auth/uploadProfilePic",
    async (payload, { rejectWithValue }) => {
        try {            
            const {data} = await api.post("/profile/single-uploaded",payload)
            Toast.success("Image Changed Success") 
            return data
        } catch (error) {
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)