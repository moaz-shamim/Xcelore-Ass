import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSucess: (state, action) => {
      state.currentUser = action.payload;
    },

    deleteUserSuccess: (state) => {
      state.currentUser = null;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signInSucess, deleteUserSuccess, signOut } = userSlice.actions;

export default userSlice.reducer;

// securepassword
