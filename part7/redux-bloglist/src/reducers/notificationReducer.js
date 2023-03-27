import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return (state = action.payload);
    },
  },
});

export const { showNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
