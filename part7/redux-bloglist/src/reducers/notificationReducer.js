import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    set(_, action) {
      return action.payload;
    },
    clear(_, action) {
      return null;
    },
  },
});

export const notificationToShow = (notification) => {
  return async (dispatch) => {
    dispatch(set(notification));
    setTimeout(() => {
      dispatch(clear());
    }, 10000);
  };
};

export const { set, clear } = notificationSlice.actions;
export default notificationSlice.reducer;
