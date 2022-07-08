import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  token: "",
  loggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateUserInfos: (state, action) => {
      return (state = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        token: action.payload.token,
        loggedIn: action.payload.loggedIn,
      });
    },
    clearUserInfos: (state) => {
      return (state = {
        firstName: "",
        lastName: "",
        token: "",
        loggedIn: false,
      });
    },
  },
});

export const { updateUserInfos, clearUserInfos } = loginSlice.actions;

export default loginSlice.reducer;
