import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
    setUsers(_, action) {
      return action.payload;
    },
  },
});

export const { setUser, setUsers } = userSlice.actions;

export const SignedUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user));
  };
};

export const initialUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export default userSlice.reducer;
