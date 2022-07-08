import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: '',
    lastName: '',
}

const LoginReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        Login: (state, action) => {
            return state = {
                firstName: action.payload.email,
                lastName: action.payload.password,
            }
        }
    }
})

export const { Login } = LoginReducer.actions

export default LoginReducer.reducer