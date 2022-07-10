import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
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
        userId: action.payload.userId,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        token: action.payload.token,
        loggedIn: action.payload.loggedIn,
      });
    },
    clearUserInfos: (state) => {
      return (state = {
        userId: "",
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
