import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading:false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false,
            state.error = null
        },
        loginFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        logoutSuccess: (state) => {
            state.currentUser = null,
            state.loading = false,
            state.error = null
        },
        logoutFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false
        }
    }
})

export const {logoutFailure, logoutSuccess, loginFailure, loginStart, loginSuccess} = userSlice.actions

export default userSlice.reducer