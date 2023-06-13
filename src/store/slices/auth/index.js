import { createSlice } from "@reduxjs/toolkit";

import {
    login,
    keepLogin,
    register,
    verify_account,
    forgot,
    reset_password,
    changeUsername,
    changePhone,
    changeEmail,
    changePass,
} from "./slices"

const INITIAL_STATE = {
    id : null,
    username: "",
    email: "",
    phone : "",
    imgProfile : null,
    isVerified : false,
    isLoginLoading : false,
    isKeepLoginLoading : false,
}

// @create slice
const authSlice = createSlice({
    name : "auth",
    initialState : INITIAL_STATE,
    reducers : {

    },
    extraReducers : {
        [login.pending] : (state, action) => {
            state.isLoginLoading = true
        },
        [login.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                id : action.payload?.id,
                username : action.payload?.username,
                email : action.payload?.email,
                phone : action.payload?.phone,
                imgProfile : action.payload?.imgProfile,
                isVerified : action.payload?.isVerified,
                isLoginLoading : false,
            })
        },
        [login.rejected] : (state, action) => {
            state.isLoginLoading = false
        },
        [keepLogin.pending] : (state, action) => {
            state.isKeepLoginLoading = true
        },
        [keepLogin.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                id : action.payload?.id,
                username : action.payload?.username,
                email : action.payload?.email,
                phone : action.payload?.phone,
                password : action.payload?.password,
                imgProfile : action.payload?.imgProfile,
                isVerified : action.payload?.isVerified,
                isKeepLoginLoading : false,
            })
        },
        [keepLogin.rejected] : (state, action) => {
            state.isKeepLoginLoading = false
        },
        [register.pending] : (state, action) => {
            state.isKeepLoginLoading = true
        },
        [register.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                id : action.payload?.id,
                username : action.payload?.username,
                email : action.payload?.email,
                phone : action.payload?.phone,
                isVerified : false,
                isKeepLoginLoading : false,
            })
        },
        [register.rejected] : (state, action) => {
            state.isKeepLoginLoading = false
        },
        [verify_account.pending] : (state, action) => {
            state.isKeepLoginLoading = true
        },
        [verify_account.fulfilled] : (state, action) => {
            state.isKeepLoginLoading = false
            state.isVerified = true
        },
        [verify_account.rejected] : (state, action) => {
            state.isKeepLoginLoading = false
        },
        [forgot.pending] : (state, action) => {
            state.isKeepLoginLoading = true
        },
        [forgot.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isKeepLoginLoading : false,
                password : "",
            })
        },
        [forgot.rejected] : (state, action) => {
            state.isKeepLoginLoading = false
        },
        [reset_password.pending] : (state, action) => {
            state.isKeepLoginLoading = true
        },
        [reset_password.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isKeepLoginLoading : false,
            })
        },
        [reset_password.rejected] : (state, action) => {
            state.isKeepLoginLoading = false
        },
        [changeUsername.pending] : (state, action) => {
            state.loading = true
        },
        [changeUsername.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isKeepLoginLoading : false,
                username : action.payload?.username
            })
        },
        [changeUsername.rejected] : (state, action) => {
            state.loading = false
        },
        [changeEmail.pending] : (state, action) => {
            state.loading = true
        },
        [changeEmail.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isKeepLoginLoading : false,
                email : action.payload?.email
            })
        },
        [changeEmail.rejected] : (state, action) => {
            state.loading = false
        },
        [changePhone.pending] : (state, action) => {
            state.loading = true
        },
        [changePhone.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isKeepLoginLoading : false,
                phone : action.payload?.phone
            })
        },
        [changePhone.rejected] : (state, action) => {
            state.loading = false
        },

        
    }
})

// export reducer
export default authSlice.reducer
