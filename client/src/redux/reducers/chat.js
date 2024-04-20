import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationCount: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotificationCount: (state, action) => {
      state.notificationCount = state.notificationCount + 1;
    },
    resetNotificationCount: (state, action) => {
      state.notificationCount = 0;
    },
  },
});

export default chatSlice;
export const { incrementNotificationCount, resetNotificationCount } =
  chatSlice.actions;
