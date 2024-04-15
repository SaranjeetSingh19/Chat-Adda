import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    // We can aslo name it as "auth", if we want the name as static not dynamic (auth: authSlice.reducer)
  },
});

export default store;
