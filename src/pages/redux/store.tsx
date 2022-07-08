import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import Login from './Reducer/LoginSlice'
// import submitCredentialsReducer from './Reducer/submitCredentialsSlice';

const reducer = combineReducers({
    Login,
    // submitCredentialsReducer
})

const store = configureStore({
    reducer,
})

export default store