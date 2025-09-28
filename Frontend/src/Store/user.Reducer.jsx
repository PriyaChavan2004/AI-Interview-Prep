import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null, // <-- store user info
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload; // <-- set user info on login
    },
    removeUser: (state) => {
      state.isAuthenticated = false;
      state.user = null; // <-- clear user info on logout
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
