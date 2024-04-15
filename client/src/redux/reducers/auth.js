import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  idAdmin: false,
  loader: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },

    userNotExits: (state, action) => {
      state.user = "";
      state.loader = false;
    },
  },
});

export default authSlice;
export const { userExists, userNotExits } = authSlice.actions;
