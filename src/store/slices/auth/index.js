import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// @create async thunk
export const login = createAsyncThunk(
    "auth/login",
     
    async (payload, { rejectWithValue }) => {
        try {
            const data = {
                username : payload.username,
                email : payload.email,
                phone : payload.phone,
                password : payload.password,
            }
            const response = await axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/login", data)

            // @save token to local storage
            localStorage.setItem("token", response.data.token)
            const token = localStorage.getItem("token")

            // @get data user
            const response2 = await axios.get("https://minpro-blog.purwadhikabootcamp.com/api/auth/",
                {headers : {"Authorization":`Bearer ${token}`}}
            )
            return response2.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const keepLogin = createAsyncThunk(
    "auth/keepLogin",
    async (payload, { rejectWithValue }) => {
        try {
            // get token from local storage
            const token = localStorage.getItem("token")

            // @get data user
            const response = await axios.get("https://minpro-blog.purwadhikabootcamp.com/api/auth/",
                {headers : {"Authorization":`Bearer ${token}`}}
            )
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

            // @save data to database
            const data = {
                username : payload.username ,
                email : payload.email,
                phone : payload.phone,
                password : payload.password,
                confirmPassword : payload.confirmPassword,
            }
            const response = await axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/",data)

            // @save token to local storage
            localStorage.setItem("token", response.data.token)

            const token = localStorage.getItem("token")
            
            // @get data user
            const response2 = await axios.get("https://minpro-blog.purwadhikabootcamp.com/api/auth/",
                {headers : {"Authorization":`Bearer ${token}`}}
            )

            return response2.data,response.data
        } catch (error) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const change_password = createAsyncThunk(
    "auth/change_password",
    async (payload, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token")
            const data = {
                currentPassword : payload.oldPassword,
                password : payload.password,
                confirmPassword : payload.confirmPassword
            }
            
            const response = await axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass/",
                {headers : {"Authorization":`Bearer ${token}`}},
                data
            )
            return response.data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const forgot = createAsyncThunk(
    "auth/forgot",
    async (payload, { rejectWithValue }) => {
        try {
            const data = {
                email : payload.email
            }
            const response = await axios.put("https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass",data)
            return response.data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const reset_password = createAsyncThunk(
    "auth/reset_password",
    async (payload, { rejectWithValue }) => {
        try {

            const token = localStorage.getItem("token")
            // @save data to database
            const data = {
                password : payload.password,
                confirmPassword : payload.confirmPassword
            }
            const response = await axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth", 
                {headers : {"Authorization":`Bearer ${token}`}},    
                data
            )

            return response.data
            
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)


export const verify_account = createAsyncThunk(
    "auth/verification",
    async (payload, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token")
            await axios.patch(`https://minpro-blog.purwadhikabootcamp.com/api/auth/verify/`,
                {headers : {"Authorization":`Bearer ${token}`}},
            )
            // return response.data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const changeUsername = createAsyncThunk(
    "auth/changeUsername",
    async (payload, { rejectWithValue }) => {
        try {
            const data ={
                currentUsername : payload.currentUsername,
                newUsername : payload.newUsername,
                token : payload.token
            }
            // @get data user
            const response = await axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername/",
                {headers : {"Authorization":`Bearer ${data.token}`}},
                data
            )
            return response.data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const changeEmail = createAsyncThunk(
    "auth/changeEmail",
    async (payload, { rejectWithValue }) => {
        try {
            const data ={
                currentEmail : payload.currentEmail,
                newEmail : payload.newEmail,
                token : payload.token
            }
            // @get data user
            const response = await axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername/",
                {headers : {"Authorization":`Bearer ${data.token}`}},
                data
            )
            return response.data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const changePhone = createAsyncThunk(
    "auth/changePhone",
    async (payload, { rejectWithValue }) => {
        try {
            const data ={
                currentPhone : payload.currentPhone,
                newPhone : payload.newPhone,
                token : payload.token
            }
            // @get data user
            const response = await axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername/",
                {headers : {"Authorization":`Bearer ${data.token}`}},
                data
            )
            return response.data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

// @create slice
const authSlice = createSlice({
    name : "auth",
    initialState : {
        loading : false,
        id : null,
        username : null,
        password : null,
        phone : null,
        email : null,
        token : null,
        isVerified :false,
        imgProfile :null,
        isLogin : false,
        isRegistered : false
    },
    reducers : {

    },
    extraReducers : {
        [login.pending] : (state, action) => {
            state.loading = true
        },
        [login.fulfilled] : (state, action) => {
            state.loading = false
            state.username = action.payload?.username
            state.password = action.payload?.password
            state.email = action.payload?.email 
            state.phone = action.paylaod?.phone
            state.token = action.payload?.token
            state.isLogin = true
        },
        [login.rejected] : (state, action) => {
            state.loading = false
            alert(action.payload)
        },
        [keepLogin.pending] : (state, action) => {
            state.loading = true
        },
        [keepLogin.fulfilled] : (state, action) => {
            state.loading = false
            state.id = action.payload?.id
            state.username = action.payload?.username
            state.password = action.payload?.password
            state.email = action.payload?.email
            state.phone = action.payload?.phone
            state.token = localStorage.getItem("token")     
            state.imgProfile = action.payload?.imgProfile    
            state.isLogin = true  
        },
        [keepLogin.rejected] : (state, action) => {
            state.loading = false
        },
        [register.pending] : (state, action) => {
            state.loading = true
        },
        [register.fulfilled] : (state, action) => {
            state.loading = false
            state.username = action.payload?.username
            state.email = action.payload?.email
            state.password = action.payload?.password
            state.phone = action.payload?.phone
            state.token = action.payload?.token
            state.isRegistered = true
        },
        [register.rejected] : (state, action) => {
            state.loading = false
            alert(action.payload)
        },
        [forgot.pending] : (state, action) => {
            state.loading = true
        },
        [forgot.fulfilled] : (state, action) => {
            state.loading = false
            state.email = action.payload?.email
            alert(action.payload?.message)
        },
        [forgot.rejected] : (state, action) => {
            state.loading = false
            alert(action.payload)
        },
        [change_password.pending] : (state, action) => {
            state.loading = true
        },
        [change_password.fulfilled] : (state, action) => {
            state.loading = false
            state.password = action.payload?.password
        },
        [change_password.rejected] : (state, action) => {
            state.loading = false
        },
        [reset_password.pending] : (state, action) => {
            state.loading = true
        },
        [reset_password.fulfilled] : (state, action) => {
            state.loading = false
            state.password = action.payload?.password
        },
        [reset_password.rejected] : (state, action) => {
            state.loading = false
        },
        [verify_account.pending] : (state, action) => {
            state.loading = true
        },
        [verify_account.fulfilled] : (state, action) => {
            state.loading = false
            state.isVerified = true
            state.token = action.payload?.token
        },
        [verify_account.rejected] : (state, action) => {
            state.loading = false
        },
        [changeUsername.pending] : (state, action) => {
            state.loading = true
        },
        [changeUsername.fulfilled] : (state, action) => {
            state.loading = false
            state.username = action.payload?.username
            state.email = action.payload?.email
            state.phone = action.payload?.phone
            state.password = action.payload?.password
        },
        [changeUsername.rejected] : (state, action) => {
            state.loading = false
        }
    }
})

// export reducer
export default authSlice.reducer
